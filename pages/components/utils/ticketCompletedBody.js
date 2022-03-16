import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function TicketCompletedBody(props) {
  return (
    <Email title='link'>
      <h3>
        Dear Sir/Madam
      </h3>
      <br />
      <p>
        Greetings from MindMade Customer Support Team!!! <br />

        We're reaching out to you in regards to the ticket (props.TicketNo) we completed for you. kindly check the ticket details in MindMade Customer Support.<br />

        Dont hesitate to contact us if you have questions or concerns.
      </p>
      <br />
      <h4>Best wishes,</h4>
      <h5>MindMade Team</h5>
    </Email>
  )
};