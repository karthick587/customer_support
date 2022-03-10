import React from 'react';
import { Email, Item, A} from 'react-html-email';

export default function ForgetPasswordBody(props) {
  return (
  <Email title='link'>
    <Item>
       Hello  {props.name}
    </Item>
    <br/>
    <Item>
      {props.password}
    </Item>
  </Email>
)};