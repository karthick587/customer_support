import React from 'react';
import { Email, Item, A} from 'react-html-email';

export default function TicketCompletedBody(props) {
  return (
  <Email title='link'>
    <Item>
       Hello  {props.name}
    </Item>
    <br/>
    <Item>
     Your ticket No:{props.TicketNo} is Completed
    </Item>
    <br/>
    <h4>Best wishes,</h4>
    <h5>MindMade Team</h5>
  </Email>
)};