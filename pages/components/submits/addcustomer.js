import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router'
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
const schema = yup.object().shape({
    Name: yup.string().required(),
    Username: yup.string().required(),
    Password: yup.string().required(),
    Email: yup.string().required(),
    Phonenumber: yup.string().required(),
});
function Addcustomer(props) {
    var [addmember, setAddmember] = useState('');
    var [addteam, setAddteam] = useState('');
    const Router = useRouter();
    var [show2, setShow2] = useState('');
    const [show, setShow] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const addUser = ({ Name, Username, Password, Email, Phonenumber }) => {
        Axios.post(`https://mindmadetech.in/api/customer/new`, {
            Name: Name,
            Username: Username,
            Password: Password,
            Email: Email,
            Phonenumber: Phonenumber,
        }).then((response) => {
            if (response.data.message) {
                setShow(response.data.message)
            } else {
                setShow("Registered Successfully");
                Router.reload(window.location.pathname)
            }
        });
    }
    const [login, setLogin] = useState()
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'))
        console.log(login)
        if (login === "false") {
            router.push("/components/login/login")
        } else if (login === null) {
            router.push("/components/login/login")
        }

    })
    return (
        <div>
            <div className="container mainbody">
                <div className="addform">
                    <form>
                        <div className="form-group upload">
                            <label htmlFor="contained-button-file">
                                <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" />
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: 56, height: 56 }}
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="label">Name</label>
                            <input className="form-input" name="Name" type="text" {...register('Name')} />
                            <p className="me-2 text-danger">{errors.Name?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="label">Username</label>
                            <input className="form-input" name="Username" type="text" {...register('Username')} />
                            <p className="me-2 text-danger">{errors.Username?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Password</label>
                            <input className="form-input" name="Password" type="password" {...register('Password')} />
                            <p className="me-2 text-danger">{errors.Password?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">EMail ID</label>
                            <input className="form-input" name="Email" type="text" {...register('Email')} />
                            <p className="me-2 text-danger">{errors.Email?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Phone Number</label>
                            <input className="form-input" name="Phonenumber" type="text" {...register('Phonenumber')} />
                            <p className="me-2 text-danger">{errors.Phonenumber?.message}</p>
                        </div>
                        <div className="row justify-content-center">
                            <div className='bottom-area'>
                                <button type="submit" onClick={handleSubmit(addUser)} className="btn2 float-end"> Add {addmember}</button>
                            </div>
                        </div>
                    </form>
                    <h4 className="alert1 text-center">{show}</h4>
                </div>
            </div>
        </div>
    );
}
export default Addcustomer;
