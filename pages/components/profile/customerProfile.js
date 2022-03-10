import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function CustomerProfile(props) {
    const { customername } = props
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/customers/list/${customername}`)
            .then((res) => setUsers(res.data))
            .catch((err) => { return err; })
    }, [users]);

    const [show, setshow] = useState(false)
    const [show2, setshow2] = useState(false)

    const [passUpdate, setPassUpdate] = useState(false)
function Edit(){
    setshow2(!show2)
}
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
                                    <img src={users.Logo} alt="Admin" className="rounded-circle justify-content-center mb-4 profile-page-img" />
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
                                    {!show2 ? <div className="row">
                                        <div className="col">
                                            <h6 className="mb-0 profile-label">
                                                Password
                                            </h6>
                                        </div>
                                        :
                                        <div className="col flex password-input-div">
                                            
                                            <input className='password-input' value={users.Password} type={show === true ? "text" : "password"} />
                                            <Button onClick={() => setshow(!show)}>{!show ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}</Button>
                                            <Button onClick={() => setshow2(!show2)}><EditIcon fontSize="small" /></Button>
                                        </div>
                                    </div> :

                                        <div className='change-pass-body'>
                                            <div className="row">
                                                <div className="col">
                                                    <h6 className="mb-0 profile-label">
                                                        New Password
                                                    </h6>
                                                </div>
                                                :
                                                <div className="col ">
                                                <input className='password-input' />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <h6 className="mb-0 profile-label">
                                                        Confirm Password
                                                    </h6>
                                                </div>
                                                :
                                                <div className="col ">
                                                <input className='password-input' />
                                                </div>
                                            </div>
                                            <div>
                                                <Button size="small" onClick={Edit}>change</Button>
                                            </div>
                                            
                                           
                                        </div>
                                    }

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