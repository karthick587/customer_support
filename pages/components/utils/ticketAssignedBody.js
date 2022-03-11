import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function TicketAssignedBody(props) {
  return (
    <Email title='link'>
      <h3 className='red'>
        Hello  {props.name}
      </h3>
      <br />
      <p>
        Your ticket No:{props.TicketNo} has been Assigned to you Please Checkout
      </p>
      <br />
      <h4>Best wishes,</h4>
      <h5>MindMade Team</h5>
    </Email>
  )
};