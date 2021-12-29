import React, { useState } from 'react';
import Axios from "axios";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router'
const schema = yup.object().shape({
    Name: yup.string().required(),
    Username: yup.string().required(),
    Password: yup.string().required(),
});
function Adduser(props) {
    var [addmember, setAddmember] = useState('');
    const Router = useRouter()
    var [show, setShow] = useState('');
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const addUser = ({ Name, Username, Password }) => {
        Axios.post(`https://mindmadetech.in/${addmember}`, {
            Name: Name,
            Username: Username,
            Password: Password,
        }).then((response) => {
            if (response.data.message) {
                setShow(response.data.message)
            } else {
                setShow("Registered Successfully");
                Router.reload(window.location.pathname)
            }
        });
    }
    return (
        <div>
            <div className="container mainbody">
                <div className="top-btn">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="customernew" onChange={(e) => setAddmember(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                            client
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="designnew" onChange={(e) => setAddmember(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                            design
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="developmentnew" onChange={(e) => setAddmember(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                            development
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="servernew" onChange={(e) => setAddmember(e.target.value)} />
                        <label class="form-check-label" for="flexRadioDefault1">
                            server
                        </label>
                    </div>
                </div>
                <div className="addform">
                    <form>
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
export default Adduser;