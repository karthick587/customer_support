// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Head from 'next/head';
import Axios from 'axios';
import Link from 'next/link'
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

  const schema = yup.object().shape({
    username : yup.string().required(),
    password : yup.string().required().min(6)
  });

export default function Login1(){
  const [finishStatus, setfinishStatus] = useState(false);
  const router=useRouter();
  var[loginStatus,setLoginStatus]=useState('');

  const {register,handleSubmit, formState } = useForm({
    resolver : yupResolver(schema),
  });
  const { errors } = formState;

const adminLogin=({username,password})=>{
    
    Axios.post("http://localhost:3001/adminlogin",{
        username:username,
        password:password,
    }).then((response)=>{
          if(response.data.message){
              setLoginStatus(response.data.message);
          }else{
              router.push({
              pathname:'./admindashboard',
              query:{name:response.data[0].id}});  
          }
    });       
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
},[]);
 return(
        <div className="login-page">
          <Head>
            <title>Adminlogin</title>
          </Head>
          <div className="form">
             <div className="form-toggle"></div>
              <div className="form-panel loginform one">
                <div className="form-header">
                  <h1>admin Login</h1>
                </div>
                <div className="form-content">
                    <form> 
                        <div className="form-group">
                          <label className="col-sm-3">Username</label>
                          <input className="col-sm-3" name="username" type="text" {...register('username')} />
                          <p className="me-2 text-danger">{errors.username?.message}</p><br />
                        </div>
                        <div className="form-group">
                          <label className="col-sm-3">Password</label>
                          <input className="col-sm-3" name="password" type="password" {...register('password')} />
                          <p className="me-2 text-danger">{errors.password?.message}</p><br />
                        </div>
                        <div className="form-group">
                            <label className="form-remember">
                              <input type="checkbox"/>Remember Me
                            </label>
                        </div>
                        <div className="form-group">
                            <Button className="btn btn-primary btn-md" type="submit" onClick={handleSubmit(adminLogin)}><a className="nav-link text-white">Login</a></Button>
                        </div>
                        <h4 className="alert1">{loginStatus}</h4>
                    </form>
                </div>
            </div>
       </div>
    </div>
  )
}