import React, { useEffect} from "react";
import Head from 'next/head';

import {useRouter} from 'next/router';
import {Dropdown,DropdownButton} from'react-bootstrap'


export default function Landingpage() {
    const router = useRouter();

    function handleSelect(value){
       console.log(value)
       router.push({
        pathname:'./components/login/userLogin',
        query:{value:value}});
    } 



    const onBackButtonEvent = (e) => {
        e.preventDefault();
              router.push("/")
      }
      useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);  
        };
      },[]);
    return (
        <div>
            <Head>
                <title>Customer Support</title>
            </Head>
            <header className="main-header">
                <div className="header-wrapper">
                    <div className="main-logo"> 
                       
                    </div>
                    <nav>
                        <ul className="main-menu">
                            <li><a href="#section-2">About</a></li>
                            <li><a href="#section-5">Service</a></li>
                            <li><a  onClick={() => router.push("./components/login/userLogin")}>Login</a></li>
                            <li><a  onClick={() => router.push("./components/login/adminLogin")} >Admin</a></li>
                            <li>
                            <DropdownButton
                                    
                                    title="Login"
                                    id="dropdown-menu-align-right"
                                    onSelect={handleSelect}
                                    
                                >
                                    <Dropdown.Item eventKey="admin" className="text-dark">admin</Dropdown.Item>
                                    <Dropdown.Item eventKey="users" className="text-dark">users</Dropdown.Item>
                                    <Dropdown.Item eventKey="teamlogin" className="text-dark">Team Login</Dropdown.Item>
                                </DropdownButton>
                            </li>
                            <li><a href="#"><span className="fa fa-shopping-cart"></span></a></li>
                            <li><a href="#"><span className="fa fa-search"></span></a></li>
                        </ul>
                    </nav>
                </div>
            </header>
           
        </div>
    )
}