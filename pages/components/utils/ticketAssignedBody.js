import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function TicketAssignedBody(props) {
  return (
    <Email title='link'>
      <h3 className='red'>
        Dear Sir/Madam,
      </h3>
      <br />
      <p>
        Greetings from the MindMade Customer Support Team!!!<br /> 

       Ticket({props.TicketNo}) has been assigned to you. kindly check the ticket details in MindMade Customer Support.
      </p>
      <br />
      <h4>Best wishes,</h4>
      <h5>MindMade Team</h5>
    </Email>
  )
};