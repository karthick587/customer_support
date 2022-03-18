import React, { useState, useEffect, useContext } from 'react';
import Axios from "axios";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { CounterContext } from '../contex/adminProvider';
import { CircularProgress } from '@mui/material';
import moment from 'moment';
import CustomerCreatedBody from '../utils/CustomerCreatedBody';
import { renderEmail } from 'react-html-email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const schema = yup.object().shape({
    Companyname: yup.string().required("*required"),
    Clientname: yup.string().required("*required"),
    Email: yup.string().required("*required").email(),
    Phonenumber: yup.string().required("*required").max(10),
    Password: yup.string().required("*required").min(6),
});

export default function Addcustomer() {
    const { setdialogformopen, setTesting, setshowvalue, Email } = useContext(CounterContext);
    const [loader, setloader] = useState(false);
    const Router = useRouter();
    const [show, setShow] = useState(false);
    const [show5, setshow5] = useState(false);
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const [Createdby, setCreatedby] = useState();
    const [login, setLogin] = useState();

    useEffect(() => {
        setCreatedby(window.localStorage.getItem('user'));
    }, [setCreatedby]);
var email2=Email
    const addUser = ({ Companyname, Clientname, Email, Phonenumber, Password }) => {
        const messageHtml2 = renderEmail(<CustomerCreatedBody name={Clientname} email={Email} password={Password} />)
        setloader(true)
            const data = new FormData();
            data.append("Companyname", Companyname);
            data.append("Clientname", Clientname);
            data.append("Email", Email);
            data.append("Phonenumber", Phonenumber);
            data.append("Password", Password);
            data.append("CreatedOn", moment(new Date()).format('DD-MM-YYYY hh:mm A'));
            data.append("CreatedBy", Createdby)
            Axios.post(`https://mindmadetech.in/api/customer/new`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if (response.data.statusCode === 400) {
                    if (response.data.message === "Email already Exists!") {
                        setShow(response.data.message);
                        setloader(false);
                    } else {
                        setTesting(true)
                        setshowvalue(1 + response.data.message);
                        setdialogformopen("true");
                        setloader(false)
                    }
                } else {
                    setdialogformopen("true")
                    setTesting(true)
                    setshowvalue("Registered Successfully");
                    setloader(false)
                    email2.send({
                        Host: "mindmadetech.in",
                        Username: "_mainaccount@mindmadetech.in",
                        Password: "1boQ[(6nYw6H.&_hQ&",
                        To: Email,
                        From: "support@mindmade.in",
                        Subject: "MindMade Support",
                        Body: messageHtml2
                    }).then(
                        message => console.log(message)
                    )


                }
            })
            .catch((err) => {
                    setTesting(true)
                    setshowvalue(1 + "error");
                    setloader(false)
                    return err;
            })
       
    };

    useEffect(() => {
        setShow();
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/");
        } else if (login === null) {
            Router.push("/");
        }
    }, [login]);

    return (
        <div>
            <div className="container mainbody">
                <div className="addform">
                    <form>
                        <div className="form-group">
                            <label className="label">Company Name<span>*</span></label>
                            <input className="form-input" name="Companyname" type="text" {...register('Companyname')} />
                            <p className="me-2 text-danger">{errors.Companyname?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="label"> Client Name<span>*</span></label>
                            <input className="form-input" name="Clientname" type="text" {...register('Clientname')} />
                            <p className="me-2 text-danger">{errors.Clientname?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Email ID<span>*</span></label>
                            <input className="form-input" name="Email" type="text" {...register('Email')} />
                            <p className="me-2 text-danger">{errors.Email?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Phonenumber<span>*</span></label>
                            <input className="form-input" name="Phonenumber" type="text" {...register('Phonenumber')} />
                            <p className="me-2 text-danger">{errors.Phonenumber?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Password<span>*</span></label>
                            <div className='login-input-password'>
                                <input className="form-input" type={show5 === true ? "text" : "password"} name='Password' {...register('Password')} />
                                <Button className='login-password-i' onClick={() => setshow5(!show5)}>{!show5 ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</Button>
                            </div>
                            <p className="me-2 text-danger">{errors.Password?.message}</p>
                        </div>
                        <div className="row justify-content-center">
                            <div className='bottom-area'>
                                <p className="me-2 text-danger">{show}</p>
                                {loader === false ? <><button type="submit" onClick={handleSubmit(addUser)} className="btn2 float-end"> Add</button></> : <> <CircularProgress className="float-end" size={25} /></>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}