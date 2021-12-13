import React, {useState, useEffect} from "react";
import Head from 'next/head';
import router from 'next/router';
import Image from "next/image";
import Logo from "../public/logo.png"
import Link from "next/link";
export default function Landingpage() {
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
                        <Image src={Logo} alt="mindmade" />
                    </div>
                    <nav>
                        <ul className="main-menu">
                            <li><a href="#section-2">About</a></li>
                            <li><a href="#section-5">Service</a></li>
                            <li><a href="#section-7">Work</a></li>
                            <li><a  onClick={() => router.push("./components/adminLogin")} >Admin</a></li>
                            <li><a href="#main-footer">Contact</a></li>
                            <li><a href="#"><span className="fa fa-shopping-cart"></span></a></li>
                            <li><a href="#"><span className="fa fa-search"></span></a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section id="section-1">
                <div className="content-slider">
                    <input type="radio" id="banner1" className="sec-1-input" name="banner" checked onChange={e => {}} />
                    <input type="radio" id="banner2" className="sec-1-input" name="banner" />
                    <input type="radio" id="banner3" className="sec-1-input" name="banner" />
                    <input type="radio" id="banner4" className="sec-1-input" name="banner" />
                    <div className="slider">
                        <div id="top-banner-1" className="banner">
                            <div className="banner-inner-wrapper">
                                <h2>Welcome to Mind Made Customer Support</h2>
                                <h1>How can I help<br /> You!!!</h1>
                                <div className="line"></div>
                                <div className="learn-more-button"><Link  href="./components/userLogin">Login</Link></div>
                            </div>
                        </div>
                        <div id="top-banner-2" className="banner">
                            <div className="banner-inner-wrapper">
                                <h2>What We Do</h2>
                                <h1>Great<br />MoGo</h1>
                                <div className="line"></div>
                                <div className="learn-more-button"><a href="#section-4">Learn More</a></div>
                            </div>
                        </div>
                        <div id="top-banner-3" className="banner">
                            <div className="banner-inner-wrapper">
                                <h2>Here We Are</h2>
                                <h1>We Are<br />MoGo</h1>
                                <div className="line"></div>
                                <div className="learn-more-button"><a href="#section-6">Learn More</a></div>
                            </div>
                        </div>
                        <div id="top-banner-4" className="banner">
                            <div className="banner-inner-wrapper">
                                <h2>Our Contacts</h2>
                                <h1>Welcome<br />to MoGo</h1>
                                <div className="line"></div>
                                <div className="learn-more-button"><a href="#main-footer">Learn More</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}