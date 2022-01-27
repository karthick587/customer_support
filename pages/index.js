import React from 'react';
import Head from 'next/head';
import Landingpage from './landingpage';
import Login1 from './components/login/login';

export default function Home() {
  return (
    
    <div>
      <Head>
        <title>Customer Support</title>
      </Head>
      <Login1 />
    </div>
   
  )
}
