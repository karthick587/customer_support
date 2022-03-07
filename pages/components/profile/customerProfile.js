import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Typography } from "@mui/material";
export default function CustomerProfile(props) {
    const { customername } = props
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/customers/list/${customername}`)
            .then((res) => setUsers(res.data))
            .catch((err) => { return err; })
    }, [users]);
    return (
        <div className="profile-body">
            {users.map((users) =>
                <div className="row gutters-sm" key={users.usersId}>
                    <div className='header-user'>
                        <div><h1>PROFILE</h1></div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="profile-card">
                            <div className="profile-card-body">
                                <div className="d-flex flex-column">
                                    <img src="https://mindmadetech.in/public/images/file-1642586098635.png" alt="Admin" className="rounded-circle justify-content-center mb-4" width="179" height="179" />

                                    <div className="row">
                                        <div className="col">
                                            <h6 className="mb-0 profile-label">
                                                UserName
                                            </h6>
                                        </div>
                                        :
                                        <div className="col text-secondary">
                                            {users.Username}
                                        </div>
                                    </div>
                                    <h4 className="profile-label"></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="profile-card mb-3">
                            <div className="profile-card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 profile-label">Company Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {users.Companyname}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 profile-label">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {users.Username}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 profile-label">Email ID</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {users.Email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 profile-label">Phonenumber</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {users.Phonenumber}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0 profile-label">Client Id</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {users.usersId}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}