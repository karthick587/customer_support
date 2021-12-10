import React,{useState} from 'react';
import Axios from "axios";
import {useRouter} from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Head from 'next/head';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    username : yup.string().required(),
    password : yup.string().required().min(6)
});

export default function Login2(){

    const router=useRouter();
    var[loginStatus,setLoginStatus]=useState('');
    
    const {register,handleSubmit, formState } = useForm({
        resolver : yupResolver(schema),
    });
    const { errors } = formState;

    const userLogin=({username,password})=>{
        Axios.post("http://localhost:3001/userlogin",{
                 username:username,
                 password:password,
        })
        .then((response)=>{
            if(response.data.message)
            {
                setLoginStatus(response.data.message);
            }
            else
            {
                router.push({
                    pathname:'./userdashboard',
                    query:{name:response.data[0].id}
                });
            }
        });
    }
    return(
        <div className="login-page">
            <Head>
                <title>userlogin</title>
            </Head>
            <div className="form login">
                <div className="form-toggle"></div>
                <div className="form-panel loginform one">
                    <div className="form-header">
                        <h1>user Login</h1>
                    </div>
                    <div className="form-content">
                        <form> 
                            <div className="form-group">
                                <label className="col-sm-3">Username</label>
                                <input className="col-sm-3" name="username" type="text" {...register('username')}/>
                                <p className="me-2 text-danger">{errors.username?.message}</p><br />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3">Password</label>
                                <input className="col-sm-3" name="password" type="password" {...register('password')}/>
                                <p className="me-2 text-danger">{errors.password?.message}</p><br />
                            </div>
                            <div className="form-group">
                                <label className="form-remember"><input type="checkbox"/>Remember Me</label>
                            </div>
                            <div className="form-group">
                                <Button className="btn btn-primary" onClick={handleSubmit(userLogin)}><a className="nav-link text-white" >Login</a></Button>
                            </div>
                            <div className="alert1">{loginStatus}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}