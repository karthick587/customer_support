import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress';
export default Userissue;
function Userissue(props) {
    const Router = useRouter();
    const [loader,setloader]=useState(false)
    const { customername } = props
    //const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');
    const [DomainName, setDomainName] = useState('');
    const [Description, setDescription] = useState('');
    const [Screenshots, setScreenshots] = useState();
    const [show, setShow] = useState();
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

    function handleScreenshot(e) {

        setScreenshots(e.target.files[0]);
    }
    const addIssues = () => {
        setloader(true)
        const data = new FormData();
        data.append("UserName", customername);
        data.append("Email", Email);
        data.append("Phonenumber", Phonenumber);
        data.append("DomainName", DomainName);
        data.append("Date", date+ ' ' + fullTime);
        data.append("Description", Description);
        //data.append("Team", Team);
        //data.append("Status", Status);
        data.append("file", Screenshots);
        //data.append("Notification", "unseen");
        data.append("Cus_CreatedOn", date + ' ' + fullTime)
        Axios.post("https://mindmadetech.in/api/tickets/new", data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            setShow("Updated Successfully")
            setloader(false)
        })
    }
    setTimeout(() => {
        setShow()
    }, [3500])
    return (
            <div>
                <form className="form3" action="/" method="post">
                    <h4 className="issue-head">Submit your Issues Here!!!</h4>
                    <div className="form-group flex">
                        <label className="label width-25">User Name</label>
                        <h5 className="issue-form-input">{props.customername}</h5>
                    </div>
                    <div className="form-group flex">
                        <label className="label width-25">Email</label>
                        <input className="issue-form-input" name="email" type="text" onChange={(e) => { setEmail(e.target.value); }} />
                    </div>
                    <div className="form-group flex">
                        <label className="label width-25">Phonenumber</label>
                        <input className="issue-form-input" name="phonenumber" type="text" onChange={(e) => { setPhonenumber(e.target.value); }} />
                    </div>
                    <div className="form-group flex">
                        <label className="label width-25">Domain Name</label>
                        <input className="issue-form-input" name="domainName" type="text" onChange={(e) => { setDomainName(e.target.value); }} />
                    </div>
                    <div className="form-group">
                        <label className="label">Description</label>
                        <textarea className="issue-form-input" name="description" rows="4" cols="50" maxLength="200" onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <form>
                            <label htmlFor="contained-button-file">
                                <input type="file"
                                className="upload-proof"
                                    id="file"
                                    accept="image/*,application/pdf,
                                                application/msword,
                                                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                                application/zip"
                                    onChange={handleScreenshot} multiple="true"
                                />
                            </label>
                        </form>
                    </div>
                    <div className="">
                    {loader===false ? <><button className="btn2 mt-3" type="button" onClick={addIssues}>Submit</button></>:<> <CircularProgress size={30} /></>} 
                   
                    </div>
                </form>
                <h4 className="alert1 text-center">{show}</h4>
            </div>
    );
}
