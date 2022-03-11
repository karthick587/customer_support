import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function ForgetPasswordBody(props) {
  return (
    <Email title='link'>
      <h3>
        Hello  {props.name}
      </h3>
      <br />
      <p>
        {props.password}
      </p>
      <br />
      <h4>Best wishes,</h4>
      <h5>MindMade Team</h5>
    </Email>
  )
};