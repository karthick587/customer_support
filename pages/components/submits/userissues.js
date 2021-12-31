import React, { useEffect, useState } from "react";
import Axios from "axios";
import Button from '@mui/material/Button';
export default Userissue;

function Userissue(props) {
    const { customername } = props
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [domainName, setDomainName] = useState('');
    const [description, setDescription] = useState('');
    const [screenshots, setScreenshots] = useState('');
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
   

   

    const addIssues = () => {
        Axios.post("https://mindmadetech.in/api/tickets/new", {
            UserName: username,
            Email: email,
            Phonenumber: phonenumber,
            DomainName: domainName,
            Date: date,
            Description: description,
            Screenshots: screenshots
        }).then((response) => {
            console.log(response);
        });
    }
    useEffect(() => {
        setUserName(customername);
    }, []);
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

                        <label htmlFor="contained-button-file">
                            <input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => { setScreenshots(e.target.value); }} />
                            <input type="file" name="image" accept='image/*' />
                            <input type="submit" value="Upload" />
                        </label>
                    </div>
                    <div className="">
                        <button className="btn2 mt-3 mb-4" type="submit" onClick={addIssues}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
