import React from 'react';
import Link from "next/link"
import Sidebar from './sidebar';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

export { Nav };

function Nav(props) {

 return (
        <nav className="navbar navbar-expand navbar-dark color">
            <div className="container">
                <div className="main-logo"> 
                    <img src="../logo.png" />
                </div>
                <div className="navbar-nav">
                    <Sidebar 
                        sidecontent={
                        <ul>
                            <li><PersonIcon />{props.profilename}</li>
                            <li><EmailIcon /><h4>karthickdurai587@gmail.com</h4></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>}
                    />
                    <Link href={props.home}  exact className="nav-item nav-link">Home</Link>
                
                    <Link href={props.logout} className="nav-item nav-link">Logout</Link>
                    {props.menuBar}
                </div>
            </div>
        </nav>
    );
}