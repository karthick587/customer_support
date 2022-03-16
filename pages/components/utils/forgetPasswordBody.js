import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function ForgetPasswordBody(props) {
  return (
    <Email title='link'>
      <h3>
        Dear Sir/Madam,
      </h3>
      <br />
      <p>
      Greetings from the MindMade Customer Support Team!!! <br />

      We have received a request to reset the password for your account.<br />

      Your System generated Password:{props.password} <br />

      To log in, go to https://mm-customer-support-ten.vercel.app/ then enter the Appropriate Email and above Password.<br />

      You can change your password once you logged in.
      </p>
      <br />
      <h4>Best wishes,</h4>
      <h5>MindMade Team</h5>
    </Email>
  )
};