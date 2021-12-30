import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Head from 'next/head';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import Sidebody from '../common/login&singupSidebody';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(6)
});
export default function Login2() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    console.log(router.query.value)
    var [validate, setValidate] = useState('');
    var [loginStatus, setLoginStatus] = useState('');
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const adminLogin = ({ username, password }) => {
        Axios.post(`https://mindmadetech.in/api/${validate}/validate`, {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            }
            else {
                if (validate === "adminvalidate") {
                    router.push({
                        pathname: `../dash/admindashboard`,
                        query: { name: response.data[0].adminId }
                    });
                }
                else if (validate === "customervalidate") {
                    router.push({
                        pathname: `../dash/customerdashboard`,
                        query: {
                            name: response.data[0].usersId,
                            customername: response.data[0].Username
                        }
                    });
                }
            }
        })
    }
    const onBackButtonEvent = (e) => {
        e.preventDefault();
        router.push("/")
    }
    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);
    useEffect(() => {
        setOpen(true);
    }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="login-page">
            <div>
                <Dialog open={open} >
                    <DialogContent>
                        <div className='mobile-dialog'>
                            <a onChange={(e) => setValidate(e.target.value)} className='team-dialog-opstion' value="adminvalidate" onClick={handleClose}>   admin</a>
                            <a onChange={(e) => setValidate(e.target.value)} className='team-dialog-opstion' value="customervalidate" onClick={handleClose}>  customer</a>
                        </div>
                        <div className='main-dialog'>
                            <div className='dilog-icon'>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </div>
                            <div className=''>
                                <select className='team-dialog-box' value={validate} onChange={(e) => setValidate(e.target.value)} multiple>
                                    <option className='team-dialog-opstion' value="adminvalidate" onClick={handleClose}>   admin</option>
                                    <option className='team-dialog-opstion' value="customervalidate" onClick={handleClose}>  customer</option>
                                </select>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Head>
                <title>userlogin</title>
            </Head>
            <div>
                <div className="login-body">
                    <div className="left-body">
                        <div className="form login">
                            <div className='login-header'>
                                <h1>Login</h1>
                            </div>
                            <form>
                                <div className="form-group">
                                    <label className="label">Username*</label>
                                    <input className="form-input" name="username" type="text"  {...register('username')} />
                                    <p className="me-2 text-danger">{errors.username?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="label">Password*</label>
                                    <input className="form-input" name="password" type="password"  {...register('password')} />
                                    <p className="me-2 text-danger">{errors.password?.message}</p>
                                </div>
                                <div className="form-group">
                                    <label className="form-remember"><input type="checkbox" />Remember Me</label>
                                </div>
                                <div className="form-group">
                                    <Button className="btn" onClick={handleSubmit(adminLogin)}><a className="nav-link" >Login</a></Button>
                                </div>
                                <div className="alert1">{loginStatus}</div>
                            </form>
                        </div>
                    </div>
                    <div className="right-body">
                        <Sidebody />
                    </div>
                </div>
            </div>
        </div>



    )
}