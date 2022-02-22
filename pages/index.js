import React from 'react';
import Head from 'next/head';
import Login1 from './components/login/login';

export default function Home() {

    return (
        <div>
           <Head>
            <link rel="shortcut icon" href="../public/favicon.png" type="image/png" />
                <title>Customer Support</title>
            </Head>
           
            <Login1 />
        </div>
    )
}
