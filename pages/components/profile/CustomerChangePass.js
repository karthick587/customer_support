
import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { CounterContext } from '../contex/adminProvider';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Axios from 'axios';
import { Typography } from '@mui/material';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const schema = yup.object().shape({
    password: yup.string()
        .required('Password is mendatory')
        .min(6, 'Password must be at 6 char long'),
    confirmPwd: yup.string()
        .required('Password is mendatory')
        .oneOf([yup.ref('password')], 'Passwords does not match'),
});

export default function CustomerChangePass(props) {
    const { customername } = props
    console.log(customername)
    const { setdialogformopen, dialogformopen, setTesting, setshowvalue } = useContext(CounterContext);
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function Edit(data) {

        Axios.put(`https://mindmadetech.in/api/forgotpassword/reset_password`, {
            Email: customername,
            Password: data.password,
        }).then((response) => {
            if (response.data.statusCode === 400) {
                setTesting(true)
                setshowvalue(1 + response.data.message);
            } else {
                setTesting(true)
                setshowvalue(response.data.message);
                setOpen(false);
            }
        }).catch((err) => {
            return err;
        });
    }
    const [show5, setshow5] = useState(false)
    return (
        <div >
            <Typography textAlign="center" onClick={handleClickOpen}>
                Change Password
            </Typography>
            <Dialog open={open} >
                <div className='change-pass-userbody'>
                    <Typography variant="h6" className='mm-color mb-3'>
                        Reset Your Password
                    </Typography>
                    <div className="row">
                        <div className="col">
                            <h6 className="mb-0 profile-label ">
                                New Password
                            </h6>
                        </div>
                        :
                        <div className="col ">
                            <div className='flex'>
                                <input type={show5 === true ? "text" : "password"} name='password' {...register('password')} />
                                <Button onClick={() => setshow5(!show5)}>{!show5 ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</Button>
                            </div>
                            <p className="me-2 text-danger  h6">{errors.password?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h6 className="mb-0 profile-label ">
                                Confirm Password
                            </h6>
                        </div>
                        :
                        <div className="col ">
                        <div className='flex'>
                                <input type={show5 === true ? "text" : "password"}  name='confirmPwd' {...register('confirmPwd')} />
                                <Button onClick={() => setshow5(!show5)}>{!show5 ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</Button>
                            </div>
                           
                            <p className="me-2 text-danger h6">{errors.confirmPwd?.message}</p>
                        </div>
                    </div>
                    <div>
                        <Button className='float-end' size="small" onClick={handleSubmit(Edit)}>change</Button>
                        <Button className='float-end' size="small" onClick={() => setOpen(false) & setshowvalue("")}>Cancel</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
