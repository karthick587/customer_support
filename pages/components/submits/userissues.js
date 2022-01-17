import React, { useEffect, useState } from "react";
import Axios from "axios";
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import{ useDispatch,useSelector} from 'react-redux';
export default Userissue;
function Userissue(props) {
    const Router = useRouter();
    const { customername } = props
    //const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');
    const [DomainName, setDomainName] = useState('');
    const [Description, setDescription] = useState('');
    const [Screenshots, setScreenshots] = useState();
    const [show, setShow] =useState();
    var Team = 'not Assigned';
    var Status = 'New';
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //const time = today.getHours() + ':' + today.getMinutes();
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
    console.log(fullTime)
    function handleScreenshot(e){
        console.log(e.target.files[0]);
        setScreenshots(e.target.files[0]);
    }
    const addIssues = () => {
        const data = new FormData();
        data.append("UserName", customername);
        data.append("Email", Email);
        data.append("Phonenumber", Phonenumber);
        data.append("DomainName", DomainName);
        data.append("date", date);
        data.append("Description", Description);
        data.append("Team",Team);
        data.append("Status",Status);
        data.append("file", Screenshots);
        data.append("Notification", "unseen");
        data.append("statusUpdatedTime",date + ' ' + fullTime)
        Axios.post("https://mindmadetech.in/api/tickets/new",data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((res) => {
                setShow("Updated Successfully")
                router.reload(window.location.pathname)
            })
    }
    return (
        <div className="container">
            <div>
                <form className="form3" action="/" method="post">
                    <h4 className="issue-head">Submit your Issues Here!!!</h4>
                    <div className="form-group">
                        <label className="label">User Name</label>
                        <h5 className="form-input">{props.customername}</h5>
                    </div>
                    <div className="form-group">
                        <label className="label">Email</label>
                        <input className="form-input" name="email" type="text" onChange={(e) => { setEmail(e.target.value); }} />
                    </div>
                    <div className="form-group">
                        <label className="label">Phonenumber</label>
                        <input className="form-input" name="phonenumber" type="text" onChange={(e) => { setPhonenumber(e.target.value); }} />
                    </div>
                    <div className="form-group">
                        <label className="label">Domain Name</label>
                        <input className="form-input" name="domainName" type="text" onChange={(e) => { setDomainName(e.target.value); }} />
                    </div>
                    <div className="form-group">
                        <label className="label">Description</label>
                        <textarea className="form-input" name="description" rows="4" cols="50" maxLength="200" onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                    <div className="form-group">                       
                        <form>
                             <label htmlFor="contained-button-file">
                                <input type="file" id="file" accept="image/*" onChange={handleScreenshot} multiple="true" />
                            </label>                        
                        </form>
                    </div>                  
                    <div className="">
                        <button className="btn2 mt-3 mb-4" type="button" onClick={addIssues}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
