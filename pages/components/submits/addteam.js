import React, { useState, useEffect, useContext } from 'react';
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { CounterContext } from '../contex/adminProvider';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
const schema = yup.object().shape({
    Email: yup.string().required().email(),
    Password: yup.string().required(),
    Phonenumber: yup.string().required().min(6)
});

function Addteam() {
    const { setdialogformopen, setTesting, setshowvalue } = useContext(CounterContext)
    const [loader, setloader] = useState(false);
    const [show, setshow] = useState('')
    var [addteam, setAddteam] = useState('');
    const Router = useRouter();
    const [login, setLogin] = useState();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;

    const addTeam = ({ Email, Password, Phonenumber }) => {
        setloader(true)
        if(Email!=="" && Password!=="" && Phonenumber!=="" && addteam!==""){
            Axios.post(`https://mindmadetech.in/api/team/new`, {
            Email: Email,
            Password: Password,
            Team: addteam,
            Phonenumber: Phonenumber,
            CreatedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
            CreatedBy: window.localStorage.getItem('ad_email')
        }).then((response) => {
            if (response.data.statusCode === 400) {
                if (response.data.message === "Email already Exists!") {
                    setshow(response.data.message);
                    setloader(false);
                } else {
                    localStorage.setItem('updateclose', "close");
                    setTesting(true)
                    setshowvalue(1 + response.data.message);
                    setdialogformopen("true")
                    setloader(false);
                }

            } else {
                localStorage.setItem('updateclose', "close");
                setTesting(true)
                setshowvalue("Registered Successfully");
                setdialogformopen("true")
                setloader(false)
            }
        })
            .catch((err) => { return err; })
        }else{
            setshow("Please select ")
        } 
    };

    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/")
        } else if (login === null) {
            Router.push("/")
        }
    }, []);

    return (
        <div>
            <div className="container mainbody">
                <div className="top-btn">
                    <div className='team-dropdown'>
                        <div className='team-list'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Design" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >Design</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="server" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >server</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="development" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >development</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="SEO" onChange={(e) => setAddteam(e.target.value)} />
                                <label className="form-check-label" >SEO</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="addform">
                    <form>
                        <div className="form-group">
                            <label className="label">Email<span>*</span></label>
                            <input className="form-input" name="Email" type="email" {...register('Email')} />
                            <p className="me-2 text-danger">{errors.Email?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Password<span>*</span></label>
                            <input className="form-input" name="Password" type="password" {...register('Password')} />
                            <p className="me-2 text-danger">{errors.Password?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Phonenumber<span>*</span></label>
                            <input className="form-input" name="Phonenumber" type="text" {...register('Phonenumber')} />
                            <p className="me-2 text-danger">{errors.Phonenumber?.message}</p>
                        </div>
                        <div className="row justify-content-center">
                            <div className='bottom-area'>
                                <p className="me-2 text-danger">{show}</p>
                                {loader === false ? <> <button type="submit" onClick={handleSubmit(addTeam)} className="btn2 float-end"> Add </button></> : <> <CircularProgress className="float-end" size={25} /></>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Addteam;