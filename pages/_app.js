import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import '../styles/style.css'
import '../styles/mainpage.css'
import { useEffect } from "react";
import Head from 'next/head'
import 'keen-slider/keen-slider.min.css'
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Router from 'next/router';
import CounterContextProvider from './components/contex/adminProvider';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
  NProgress.configure({ showSpinner: false });

  return <CounterContextProvider>
    <Head>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

    </Head>
    <Component {...pageProps} />
    </CounterContextProvider>
}

export default MyApp
