import React, { useState } from "react";
import Axios from "axios";

export default Userissue;

function Userissue() {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [domainName, setDomainName] = useState('');
    const [description, setDescription] = useState('');
    const [screenshots, setScreenshots] = useState('');
    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const addIssues = () => {
        Axios.post("https://mindmadetech.in/ticketsnew", {
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

    return (
        <div className="container">
            <div>

                <form className="form3">
                    <h4 className="issue-head">Submit your Issues Here!!!</h4>
                    <div className="form-group">
                        <label className="label">User Name</label>
                        <input className="form-input" name="username" type="text" onChange={(e) => { setUserName(e.target.value); }} />
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

                        <input className="form-input mt-4" name="screenshots" type="file" onChange={(e) => { setScreenshots(e.target.value); }} />
                    </div>
                    <div className="">
                        <button className="btn2 mt-3 mb-4" type="submit" onClick={addIssues}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
