import React from 'react';
import { Email, Item, A } from 'react-html-email';

export default function NonUserBody(props) {
    return (
        <Email title='link'>
            <h3>
                Dear Sir/Madam,
            </h3>
            <br />
            <p>
                Greetings from MindMade Customer Support Team!!! <br />
                Thank you for raising your queries with us.Our Admin verify your queries if Admin approved you will get your login credentials as soon as possible.
            </p>
            <h4>Thanks & Regards,</h4>
            <h5>MindMade Team</h5>
        </Email>
    )
};