import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function AdminTicketsBody(props) {
    return (
        <Email title='link'>
            <h3>
                Dear Sir/Madam,
            </h3>
            <br />
            <p>
                Greetings from MindMade Customer Support Team!!! <br />
                Your queries are raised as a ticket in mindmade customer support by admin. You will get credentials to login MindMade customer support as soon as possible.You can check the ticket details after logging in.
            </p>
            <h4>Thanks & Regards,</h4>
            <h5>MindMade Team</h5>
        </Email>
    )
};