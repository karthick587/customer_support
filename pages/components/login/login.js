import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Axios from 'axios';
import { CounterContext } from '../contex/adminProvider';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import Sidebody from '../common/login&singupSidebody';
import ScrollDialog from '../non_user';
import FormDialog from '../common/dialogsform';
import { Typography } from '@mui/material';
import { send } from 'emailjs-com';
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(6)
});
export default function Login1() {

  const { setTesting, setshowvalue, setdialogformopen } = useContext(CounterContext)
  const router = useRouter();
  const [userlogin, setUserlogin] = useState('');
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const adminLogin = ({ username, password }) => {
    var TableValidate = username.slice(0, 3);
    setUserlogin(username);
    var validate, SlicedName;
    switch (TableValidate) {
      case 'ad_':
        validate = "admin";
        SlicedName = username.slice(3, 20);
        break;
      case 'tm_':
        validate = "team";
        SlicedName = username.slice(3, 20);
        localStorage.setItem('tm_name', SlicedName);
        break;
      default:
        validate = "customer";
        SlicedName = username;
        localStorage.setItem('clientname', SlicedName);
    }
    Axios.post(`https://mindmadetech.in/api/${validate}/validate`, {
      username: SlicedName,
      password: password,
    }).then((response) => {
      if (response.data.statusCode === 400) {
        setTesting(true)
        setshowvalue(1 + "Invalid username or password");
      } else {
        localStorage.setItem('loggedin', true);
        localStorage.setItem('activeTab', "Dashboard");
        setTesting(true)
        setshowvalue("Logged in successfully");
        router.push({
          pathname: `/components/dash/${validate}dashboard`,
        });
      }
    }).catch((err) => { return err; })
  };
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    router.push("/");
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem('user', userlogin);
  }, [userlogin]);
  const [forgetValidate, setforgetValidate] = useState(false)
  const [forgetValue, setforgetValue] = useState()
  console.log(forgetValue)
  function forgetpassword() {
    console.log("1")
  }
  return (
    <div className="login-page">
      <div>
        <div className="login-body">
          <div className="left-body">
            <div className="form login">
              <div className='sublogin'>
                <div className='login-header'>
                  <h1>LOGIN</h1>
                </div>
                <form>
                  <div className="form-group mb-2">
                    <label className="label">Username*</label>
                    <input className="form-input" name="username" type="text"  {...register('username')} />
                    <p className="me-2 text-danger">{errors.username?.message}</p>
                  </div>
                  <div className="form-group mb-3 log">
                    <label className="label">Password*</label>
                    <input className="form-input" name="password" type="password"  {...register('password')} />
                    <p className="me-2 text-danger">{errors.password?.message}</p>
                  </div>

                  <div className="form-group log">
                    <Button className="btn" type="submit" onClick={handleSubmit(adminLogin)}><a className="nav-link">Login</a></Button>
                  </div>
                  <FormDialog
                    dialogbody_className="forget-body"
                    className="forget-text"
                    dialogtitle="forget password"
                    dialogbody={
                      <div>
                        <Typography variant="h5" className='text-center mb-2'>
                          Reset Your Password
                        </Typography>
                        <Typography variant="p" className='mt-2'>
                          Please enter and submit your Email id below. We'll send <br />
                          password reset instructions to the email address <br />
                          associated with your account.
                        </Typography>
                        <div className="form-group mt-3 mb-2 flex">
                          <label className="forget-label width-25">Email ID</label>
                          <input className="forget-input" name="email" type="text" onChange={(e) => setforgetValue(e.target.value)} />
                        </div>
                        <button className='forget-button' onClick={forgetpassword}>Send Password Reset Email</button>
                        <Button className='w-100' onClick={() => setdialogformopen("true")} >Cancel</Button>
                      </div>
                    }
                  />
                  <ScrollDialog />
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
