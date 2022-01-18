import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import FormDialog from '../common/dialogsform';
import EditIcon from '@mui/icons-material/Edit';
import { Formik, Form, Field } from 'formik';
function Updatecustomer({ usersId }) {
    let router = useRouter();
    var [getCustomer, setGetCustomer] = useState([]);
    const [editLogo, setEditLogo] = useState();
    const [uploadLogo, setUploadLogo] = useState();
    const [selected, setSelected] = useState(false);
    var [show, setShow] = useState('');
    const [Adminname, setAdminname] = useState([])
    useEffect(() => {
        setAdminname(window.localStorage.getItem('user'));
    }, [])
    const [Modifiedby, setModifiedby] = useState()
    useEffect(() => {
        setModifiedby(Adminname.slice(3, 20));
    })
    useEffect(() => {
        axios.get(`https://mindmadetech.in/api/customer/list/${usersId}`)
            .then(res => setGetCustomer(res.data))
    }, [getCustomer])
    function handleUpdate({ Companyname, Clientname, Username, Password, Email, Phonenumber },Logo,usersId) {
        var logo
        switch (editLogo) {
            case undefined:
                logo = Logo;
                break;
            default:
                logo = editLogo;  
                break;
        }
      
        const data = new FormData();
        data.append("Companyname", Companyname);
        data.append("Clientname", Clientname);
        data.append("Email", Email);
        data.append("Phonenumber", Phonenumber);
        data.append("Username", Username);
        data.append("Password", Password);
        data.append("file", logo);
        data.append("Modifiedon", date + ' ' + fullTime);
        data.append("Modifiedby", Modifiedby);
        axios.put(`https://mindmadetech.in/api/customer/update/${usersId}`,data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            setShow("Updated Successfully")
            localStorage.setItem('updateclose', "close");
        })
    }
   
    setTimeout(() => {
        setShow()
    }, [3500])
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var fullDate, TimeType, hour, minutes, seconds, fullTime;
    fullDate = new Date();
    hour = fullDate.getHours();
    if (hour <= 11) {
        TimeType = 'AM';
    }
    else {
        TimeType = 'PM';
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour == 0) {
        hour = 12;
    }
    minutes = fullDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes.toString();
    }
    seconds = fullDate.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds.toString();
    }
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString()
    function handleScreenshot(e) {
       
        setEditLogo(e.target.files[0]);
        setSelected(true);
        setUploadLogo(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <FormDialog
            className="float-enduser button"
            dialogtitle={<EditIcon />}
            dialogbody={
                <div>
                    {getCustomer.map((data) =>
                        <div className="container dialog-body" key={data.usersId}>
                            <Formik
                                className="addform"
                                initialValues={{ Logo: data.Logo, Companyname: data.Companyname, Clientname: data.Clientname, Username: data.Username, Password: data.Password, Email: data.Email, Phonenumber: data.Phonenumber }}
                                onSubmit={value => handleUpdate(value, data.Logo, data.usersId)}
                            >
                                <Form >
                                    <div className="form-group upload">
                                        <label htmlFor="contained-button-file">
                                            <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" onChange={(e) => handleScreenshot(e)} />
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={selected === false ? data.Logo : uploadLogo}
                                                sx={{ width: 65, height: 65 }}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Companyname</label>
                                        <Field className="form-input" name="Companyname" />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">Clientname</label>
                                        <Field className="form-input" name="Clientname" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Username</label>
                                        <Field className="form-input" name="Username" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Password</label>
                                        <Field className="form-input" name="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Email</label>
                                        <Field className="form-input" name="Email" />
                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Phonenumber</label>
                                        <Field className="form-input" name="Phonenumber" />
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className='bottom-area'>
                                            <button type="submit" className="btn2 float-end">Submit</button>
                                        </div>
                                    </div>
                                    <h3>{show}</h3>
                                </Form>
                            </Formik>
                        </div>
                    )}
            </div>}
        />
    );
}
export default Updatecustomer;
