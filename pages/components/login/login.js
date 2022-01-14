import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Head from 'next/head';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import Sidebody from '../common/login&singupSidebody';
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(6)
});
export default function Login1() {
  const [user, setUser] = useState('');
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState('');
  const [userlogin,setUserlogin] = useState('');
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
 
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
      localStorage.setItem('user', userlogin);
      console.log(user)
    });
  return (
    <div className="login-page">
      <Head>
        <title>userlogin</title>
      </Head>
      <div >
        <div className="login-body">
          <div className="left-body">
            <div className="form login">
              <div className='sublogin'>
              <div className='login-header'>
                <h1>Login</h1>
              </div>
              <form>
                <div className="form-group">
                  <label className="label">Username*</label>
                  <input className="form-input" name="username" type="text"  {...register('username')} />
                  <p className="me-2 text-danger">{errors.username?.message}</p>
                </div>
                <div className="form-group log">
                  <label className="label">Password*</label>
                  <input className="form-input" name="password" type="password"  {...register('password')} />
                  <p className="me-2 text-danger">{errors.password?.message}</p>
                </div>
                <div className="form-group log">
                  <label className="form-remember">
                    <input type="checkbox" />Remember Me
                  </label>
                </div>
                <div className="form-group log">
                  <Button className="btn" type="submit" ><a className="nav-link">Login</a></Button>
                </div>
                <h4 className="alert1">{loginStatus}</h4>
              </form>
              </div>
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
