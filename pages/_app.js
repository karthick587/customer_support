import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import '../styles/style.css';
import Head from 'next/head';
import '../styles/mainpage.css';
import { useEffect } from "react";
import 'keen-slider/keen-slider.min.css';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Router from 'next/router';
import CounterContextProvider from './components/contex/adminProvider';
import CurrentDateContextProvider from './components/contex/currentdateProvider';
import ListContextProvider from './components/contex/ListProvider';
import TicketsContextProvider from './components/contex/ticketsProvider';
import FormAlert from './components/common/alert';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
  NProgress.configure({ showSpinner: false });

  return (
    <>
      {/* {/ Add the favicon /}
      {/ Add the favicon /} */}

      <CurrentDateContextProvider>
        <ListContextProvider>
          <TicketsContextProvider>
            <CounterContextProvider>
              <Head>
                <title>Customer Support</title>
              </Head>
              <Component {...pageProps} />
            </CounterContextProvider>
          </TicketsContextProvider>
        </ListContextProvider>
      </CurrentDateContextProvider>

      <div className='water-mark'><span>Designed by</span> MindMade</div>

    </>
  )
}

export default MyApp