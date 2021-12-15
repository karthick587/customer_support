// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Head from 'next/head';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import Sidebody from './login&singupSidebody';

  const schema = yup.object().shape({
    username : yup.string().required(),
    password : yup.string().required().min(6)
  });

export default function Login1(){
  
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
      <title>userlogin</title>
   
  </Head>
  <div class="">
  <div class="row">
    <div class="col-6">
     <div className="form login">
        <div className='login-header'>
          
           <h1>Login</h1>
                </div>
                   <form> 
                        <div className="form-group">
                          <label className="label">Username*</label>
                          <input className="form-input" name="username" type="text" placeholder="Username" {...register('username')} />
                          <p className="me-2 text-danger">{errors.username?.message}</p>
                        </div>
                        <div className="form-group log">
                          <label className="label">Password*</label>
                          <input className="form-input" name="password" type="password" placeholder="Password" {...register('password')} />
                          <p className="me-2 text-danger">{errors.password?.message}</p>
                        </div>
                        <div className="form-group log">
                            <label className="form-remember">
                              <input type="checkbox"/>Remember Me
                            </label>
                        </div>
                        <div className="form-group log">
                            <Button className="btn" type="submit" onClick={handleSubmit(adminLogin)}><a className="nav-link">Login</a></Button>
                        </div>
                        <h4 className="alert1">{loginStatus}</h4>
                  </form>
               </div>
    </div>
    <div class="col-6">
         <Sidebody />
    </div>
    </div>
 </div>

  
</div>
       
  )
}