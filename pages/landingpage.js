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
                
                       
                            <DropdownButton
                                    className="btn-login"
                                    title="Login"
                                    id=""
                                    onSelect={handleSelect}
                                    
                                >
                                    <Dropdown.Item eventKey="admin" className="text-dark">admin</Dropdown.Item>
                                    <Dropdown.Item eventKey="users" className="text-dark">users</Dropdown.Item>
                                    <Dropdown.Item eventKey="teamlogin" className="text-dark">Team Login</Dropdown.Item>
                                </DropdownButton>
                           
                           
                  
            </header>
           
        </div>
    )
}