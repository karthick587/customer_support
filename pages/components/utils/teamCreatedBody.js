import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function TeamCreatedBody(props) {
  return (
    <Email title='link'>
    <h3>
                Dear Sir/Madam,
            </h3>
            <p>
                Greetings from MindMade Customer Support Team!!! <br />
                You have been registered as a Team member on MindMade Customer Support.<br />
                To log in, go to https://mm-customer-support-ten.vercel.app/ then enter the following credentials</p>
            <br />
            <p className='red'>Login credentials</p>
            <ul>
                <li>Email : {props.email}</li>
                <li>Password : {props.password}</li>
            </ul>
            <br />
            <h4>Best wishes,</h4>
            <h5>MindMade Team</h5>
</Email>
  )
};