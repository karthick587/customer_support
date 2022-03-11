import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function NonUserCreatedBody(props) {
    return (
        <Email title='link'>
            <h3>
                Hello  {props.name}
            </h3>
            <p>ur Account as been created by admin and your issues Has been raised<br/> as a ticket</p>
            <br />
            <p className='red'>Login credentials</p>
            <ul>
                <li>{props.email}</li>
                <li>{props.password}</li>
            </ul>
            <br />
            <h4>Best wishes,</h4>
            <h5>MindMade Team</h5>
        </Email>
    )
};