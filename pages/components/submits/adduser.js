import React,{useState} from 'react';
import Axios from "axios";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router'

const schema = yup.object().shape({
	firstname : yup.string().required(),
	lastname : yup.string().required(),
	username : yup.string().required(),
	email : yup.string().required(),
    password : yup.string().required(),
  });

function Adduser(props) {
    const Router = useRouter()
    var[show,setShow]=useState('');

    const {register,handleSubmit, formState } = useForm({
        resolver : yupResolver(schema),
    });
    const { errors } = formState;
       
const addUser=({firstname,lastname,username,email,password})=>{
           
    Axios.post("http://mindmadetech.in/adduser",{
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
                Router.reload(window.location.pathname)
            }
    });
}
       
 return (
       <div>
             <div className="container mainbody">
                 <div className="top-btn">
             </div>
            <div className="addform">
                <form>
                    <div className="form-group">
                        <label className="label">First Name</label>
                        <input className="form-input" name="firstname" type="text" {...register('firstname')} />
                        <p className="me-2 text-danger">{errors.firstname?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="label">Last Name</label>
                        <input className="form-input" name="lastname" type="text" {...register('lastname')} />
                        <p className="me-2 text-danger">{errors.lastname?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="label">Username</label>
                        <input className="form-input" name="username" type="text" {...register('username')} />
                        <p className="me-2 text-danger">{errors.username?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="col label">email</label>
                        <input className="form-input" name="email" type="email" {...register('email')} />
                        <p className="me-2 text-danger">{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="col label">Password</label>
                        <input className="form-input" name="password" type="password" {...register('password')} />
                        <p className="me-2 text-danger">{errors.password?.message}</p>
                    </div>
                    <div className="row justify-content-center">
                        <div>
                            <button type="submit" onClick={handleSubmit(addUser)} className="btn2 float-end"> Add user</button>
                        </div>
                    </div>
                </form>
                <h4 className="alert1 text-center">{show}</h4>
            </div>
        </div>
       </div>
    );
}
export default Adduser ;