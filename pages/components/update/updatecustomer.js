import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import FormDialog from '../common/dialogsform';
import EditIcon from '@mui/icons-material/Edit';
function Updatecustomer({ usersId }) {
    let router = useRouter();
    var [getCustomer, setGetCustomer] = useState([]);
    var [editCompanyname, setEditCompanyname] = useState('');
    var [editClientname, setEditClientname] = useState('');
    var [editUsername, setEditUsername] = useState('');
    var [editPassword, setEditPassword] = useState('');
    var [editEmail, setEditEmail] = useState('');
    var [editPhonenumber, setEditPhonenumber] = useState('');
    const[editLogo,setEditLogo] = useState();
    const[uploadLogo,setUploadLogo] = useState();
    const[selected,setSelected] = useState(false);
    var [show, setShow] = useState('');
    const Adminname = window.localStorage.getItem('user');
    const Modifiedby = Adminname.slice(3, 20);
     console.log(Modifiedby);

    console.log(usersId)

    useEffect(() => {
        axios.get(`https://mindmadetech.in/api/customer/list/${usersId}`)
            .then(res => setGetCustomer(res.data))
    }, [])

    function handleUpdate(Logo,Companyname,Clientname, Username, Password, Email, Phonenumber) {

        var Logo,Companyname,Clientname,Username,Password,Email,Phonenumber;
        switch (editLogo) {
            case "":
                Logo = Logo;
                console.log("empty");
                break;
            default:
                Logo = editLogo;
                console.log("editLogo");
                break;
        }
        console.log(Logo);

        switch (editCompanyname) {
            case "":
                Companyname = Companyname;
                console.log("empty");
                break;
            default:
                Companyname = editCompanyname;
                console.log("editCompanyname");
                break;
        }
        console.log(Companyname);

        switch (editClientname) {
            case "":
                Clientname = Clientname;
                console.log("empty");
                break;
            default:
                Clientname = editClientname;
                console.log("editCompanyname");
                break;
        }
        console.log(Clientname);

        switch (editUsername) {
            case "":
                Username = Username;
                console.log("empty");
                break;
            default:
                Username = editUsername;
                console.log("editUsername")
        }
        console.log(Username);

        switch (editPassword) {
            case "":
                Password = Password;
                console.log("empty");
                break;
            default:
                Password = editPassword;
                console.log("editPassword")
        }
        console.log(Password);

        switch (editEmail) {
            case "":
                Email = Email;
                console.log("empty");
                break;
            default:
                Email = editEmail;
                console.log("editEmail")
        }
        console.log(Email)

;

        switch (editPhonenumber) {
            case "":
                Phonenumber = Phonenumber;
                console.log("empty");
                break;
            default:
                Phonenumber = editPhonenumber;
                console.log("editPhonenumber")
        }
        console.log(Phonenumber);

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
       // console.log(fullTime)
        //console.log(date)

        const data = new FormData();
        data.append("Companyname", Companyname);
        data.append("Clientname", Clientname);
        data.append("Email", Email);
        data.append("Phonenumber", Phonenumber);
        data.append("Username", Username);
        data.append("Password", Password);
        data.append("Logo", Logo);
        data.append("Modifiedon",date + ' ' + fullTime);
        data.append("Modifiedby",Modifiedby)

        axios.put(`https://mindmadetech.in/api/customer/update/${usersId}`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
                setShow("Updated Successfully")
                router.reload(window.location.pathname)
            })
    }

    function handleScreenshot(Logo,e){
        console.log(e.target.files[0]);
       
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
                        <div className="container mainbody" key={data.usersId}>
                            <div className="addform">
                                <form>
                                <div className="form-group">
                                    <label htmlFor="contained-button-file">
                                        <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" onChange={(e)=>handleScreenshot(data.Logo,e)} />
                                        <Avatar
                                            alt="Remy Sharp"
                                            src = {selected === false ? data.Logo : uploadLogo}
                                            sx={{ width: 65, height: 65 }}
                                        />
                                    </label>
                                </div>

                                    <div className="form-group">
                                        <label className="label"> Comapany Name</label>
                                        <input className="form-input" name="Name" type="text" placeholder={data.Companyname} value={editCompanyname} onChange={(e) => setEditCompanyname(e.target.value)} />

                                    </div>
                                    <div className="form-group">
                                        <label className="label"> Client Name</label>
                                        <input className="form-input" name="Name" type="text" placeholder={data.Clientname} value={editClientname} onChange={(e) => setEditClientname(e.target.value)} />

                                    </div>
                                    <div className="form-group">
                                        <label className="label">Username</label>
                                        <input className="form-input" name="Username" type="text" placeholder={data.Username} value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />

                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Password</label>
                                        <input className="form-input" name="Password" type="text" placeholder={data.Password} value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />

                                    </div>
                                    <div className="form-group">
                                        <label className="col label">EMail ID</label>
                                        <input className="form-input" name="Email" type="text" placeholder={data.Email} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />

                                    </div>
                                    <div className="form-group">
                                        <label className="col label">Phone Number</label>
                                        <input className="form-input" name="Phonenumber" type="text" placeholder={data.Phonenumber} value={editPhonenumber} onChange={(e) => setEditPhonenumber(e.target.value)} />

                                    </div>
                                    <div className="row justify-content-center">
                                        <div className='bottom-area'>
                                            <button type="button" onClick={() => handleUpdate(data.Logo,data.Companyname,data.Clientname, data.Username, data.Password, data.Email, data.Phonenumber)} className="btn2 float-end"> Update </button>
                                        </div>
                                    </div>
                                    <h3>{show}</h3>
                                </form>

                            </div>
                        </div>
                    )}
                </div>}
        />

    );
}
export default Updatecustomer;