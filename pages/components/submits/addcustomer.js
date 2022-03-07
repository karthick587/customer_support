import React, { useState, useEffect, useContext } from 'react';
import Axios from "axios";
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { CounterContext } from '../contex/adminProvider';
import { CurrentDateContext } from '../contex/currentdateProvider';
import { CircularProgress } from '@mui/material';
const schema = yup.object().shape({
    Companyname: yup.string().required(),
    Clientname: yup.string().required(),
    Email: yup.string().required().email(),
    Phonenumber: yup.string().required().max(10),
    Username: yup.string().required(),
    Password: yup.string().required(),
});

export default function Addcustomer() {
    const { setdialogformopen,setTesting,setshowvalue } = useContext(CounterContext);
    const { currentDate } = useContext(CurrentDateContext);
    const [loader,setloader]=useState(false);
    var [addmember, setAddmember] = useState('');
    const Router = useRouter();
    var [showlogo, setShowlogo] = useState('');
    const [show, setShow] = useState(false);
    const [Logo, setLogo] = useState();
    const [uploadLogo, setUploadLogo] = useState();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const [Adminname, setAdminname] = useState([]);
    const [Createdby, setCreatedby] = useState();
    var [showlogo, setShowlogo] = useState('');
    const [logovalidate, setLogovalidate] = useState();
    const [login, setLogin] = useState();

    useEffect(() => {
        setAdminname(window.localStorage.getItem('user'));
    },[]);

    useEffect(() => {
        setCreatedby(Adminname.slice(3, 20));
    },[Adminname]);

    function handleScreenshot(e) {
        setLogovalidate(e.target.files[0]);
        setLogo(e.target.files[0]);
        setUploadLogo(URL.createObjectURL(e.target.files[0]));
    };
    
   
    const addUser = ({ Companyname, Clientname, Email, Phonenumber, Username, Password }) => {
        setloader(true)
        if (logovalidate === undefined) {
            setShowlogo("images is required")
        } else {
            const data = new FormData();
            data.append("Companyname", Companyname);
            data.append("Clientname", Clientname);
            data.append("Email", Email);
            data.append("Phonenumber", Phonenumber);
            data.append("Username", Username);
            data.append("Password", Password);
            data.append("file", Logo);
            data.append("Createdon", currentDate);
            data.append("Createdby", Createdby)
            Axios.post(`https://mindmadetech.in/api/customer/new`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                if (response.data.statusCode === 400) {
                    setTesting(true)
                    setshowvalue(1+response.data.message);
                } else {
                    setdialogformopen("true")
                    setTesting(true)
                    setshowvalue("Registered Successfully");
                    setloader(false)
                }
            })
                .catch((err) => { return err; })
        }
    };
   
    useEffect(() => {
        setShow();
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/");
        } else if (login === null) {
            Router.push("/");
        }
    },[login]);

    return (
        <div>
            <div className="container mainbody">
                <div className="addform">
                    <form>
                        <div className="form-group upload">
                            <label htmlFor="contained-button-file">
                                <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" onChange={(e) => handleScreenshot(e)} />
                                <p className="text-danger mt-3 ml-2">{showlogo}</p>
                                <Avatar
                                    alt="uploadlogo"
                                    src={uploadLogo}
                                    sx={{ width: 65, height: 65 }}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="label">Company Name</label>
                            <input className="form-input" name="Companyname" type="text" {...register('Companyname')} />
                            <p className="me-2 text-danger">{errors.Companyname?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="label"> Client Name</label>
                            <input className="form-input" name="Clientname" type="text" {...register('Clientname')} />
                            <p className="me-2 text-danger">{errors.Clientname?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Email ID</label>
                            <input className="form-input" name="Email" type="text" {...register('Email')} />
                            <p className="me-2 text-danger">{errors.Email?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Phonenumber</label>
                            <input className="form-input" name="Phonenumber" type="text" {...register('Phonenumber')} />
                            <p className="me-2 text-danger">{errors.Phonenumber?.message}</p>
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
                            {loader===false ? <><button type="submit" onClick={handleSubmit(addUser)} className="btn2 float-end"> Add {addmember}</button></>:<> <CircularProgress className="float-end" size={25} /></>} 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}