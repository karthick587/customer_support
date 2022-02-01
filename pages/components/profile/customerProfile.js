import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function CustomerProfile(props) {
    const { customername } = props
    const [users, setUsers] = useState([])
    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/customers/list/${customername}`)
            .then((res) => setUsers(res.data))
    }, [users])
    return (
        <div class="container">
            <div class="profile-body">
                {users.map((users) =>
                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="profile-card">
                                <div class="profile-card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img src="https://mindmadetech.in/public/images/file-1642586098635.png" alt="Admin" class="rounded-circle" width="150"  height="150" />
                                       
                                            <h4 className="profile-label">{users.Username}</h4>
                                            <div class="row">
                                                <div class="col">
                                                    <h6 class="mb-0 profile-label">Project code</h6>
                                                </div>
                                                <div class="col text-secondary">
                                                    MMM000001
                                                </div>
                                            </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="profile-card mb-3">
                                <div class="profile-card-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0 profile-label">Full Name</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                        {users.Username}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0 profile-label">Email</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                        {users.Email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0 profile-label">Phone</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {users.Phonenumber}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0 profile-label">Companyname</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {users.Companyname}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0 profile-label">Address</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            Bay Area, San Francisco, CA
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}