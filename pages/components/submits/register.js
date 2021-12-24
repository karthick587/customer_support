import React,{useState} from 'react';
import Head from 'next/head';
import Axios from "axios";
import Link from 'next/link'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

  const schema = yup.object().shape({
    firstname : yup.string().required(),
    lastname : yup.string().required(),
    username : yup.string().required(),
    email : yup.string().required(),
    password : yup.string().required(),
  });

export default function Register() {
 
    var[show,setShow]=useState('');

  const {register,handleSubmit, formState } = useForm({
      resolver : yupResolver(schema),
  });
  const { errors } = formState;
    
const registerFunction=({firstname,lastname,username,email,password})=>{
      Axios.post("http://mindmadetech.in/register",{
          firstname:firstname,
          lastname:lastname,
          username:username,
          email:email,
          password:password,
      }).then((response)=>{
            if(response.data.message){
                setShow(response.data.message)
            }else{
                  setShow("Registered Successfully");
            }   
      });
}  
    
 return(
      <div className="login-page reg"> 
          <Head>
              <title>Register</title>
          </Head>
              <div className="form login">
                 <div className="form-toggle"></div>
                  <div className="form-panel loginform one">
                      <div className="form-header">
                          <h1>Register</h1>
                      </div>
                      <div className="form-content">
                          <form> 
                            <div className="form-group">
                                <label className="col-sm-3">First Name</label>
                                <input className="col-sm-3" name="firstname"  type="text" {...register('firstname')} />
                                <p className="me-2 text-danger">{errors.firstname?.message}</p><br />            
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3">Last Name</label>
                                <input className="col-sm-3"   name="lastname" type="text" {...register('lastname')} />
                                <p className="me-2 text-danger">{errors.lastname?.message}</p><br />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3">Username</label>
                                <input className="col-sm-3"   name="username" type="text"{...register('username')} />
                                <p className="me-2 text-danger">{errors.username?.message}</p><br />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3">Email</label>
                                <input className="col-sm-3"   name="email" type="email" {...register('email')}/>
                                <p className="me-2 text-danger">{errors.email?.message}</p><br />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3">Password</label>
                                <input className="col-sm-3" name="password" type="password" {...register('password')}/>
                                <p className="me-2 text-danger">{errors.password?.message}</p><br />
                            </div>
                            <div className="form-group">
                                <label className="form-remember">
                                    <input type="checkbox"/>Remember Me
                                </label>
                            </div>
                            <div className="form-group">
                              <button type="submit" onClick={handleSubmit(registerFunction)} className="btn btn-primary btn-md"> <a className="nav-link text-white">Register</a></button>
                            
                              <Link  className="navigation"  href="./adminLogin" >AdminLogin</Link>
                            </div>
                          </form>
                      </div>
                    <h4 className="alert1">{show}</h4>
                 </div>  
          </div>      
      </div>
  )
}
