import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FormDialog from '../common/dialogsform';

function Userticket(props) {

    const { Username } = props;

    var [tickets, setTickets] = useState([]);
    var [search, setSearch] = useState('');

    var [selectedValue, setSelectedValue] = useState('');
    console.log(selectedValue)
    useEffect(() => {
        Axios.get("https://mindmadetech.in/ticketslist")
            .then((res) => setTickets(res.data));
    }, []);

    useEffect(() => {
        setSearch(Username);

    })
    return (
        <div>
            <div className="container mainbody">
                <Head>
                    <title>Admin Dashboard</title>
                </Head>
                <div className='adminticket-head'>
                    <h1>Tickets</h1>
                </div>
                <div className="userbody">
                    <TableContainer component={Paper}>
                        <tr className='tickets-bodyrow3'>
                            <td >TicketId</td>
                            <td>Username</td>
                            <td >Date</td>
                            <td>Team</td>
                            <td>Status</td>

                        </tr>
                        {tickets.filter(val => {
                            if (search === "") {
                                return val;
                            } else if (
                                val.Username.toLowerCase().includes(search.toLowerCase())

                            ) {
                                return val;
                            }
                        }).map((tickets) =>
                            <div key={tickets.ticketsId} className='tickets-table-row'>

                                <FormDialog
                                    dialogtitle={
                                        <table >
                                            <tr className='tickets-bodyrow' >
                                                <td>{tickets.ticketsId}</td>
                                                <td >{tickets.Username}</td>
                                                <td>{tickets.Date}</td>
                                                <td >{tickets.Team}</td>
                                                <td className={tickets.Status}>{tickets.Status}</td>
                                            </tr>
                                        </table>
                                    }
                                    dialogbody={
                                        <div className='ticket-details'>
                                            <div className='ticket details-title'>Ticket NO {tickets.ticketsId}</div>
                                            <div className='ticket details-name'>
                                                <label className="label">Username</label>
                                                <div className='ticket-input-details' >{tickets.Username}</div>
                                            </div>
                                            <div className='ticket details-no'>
                                                <label className="label">Phonenumber</label>
                                                <div className='ticket-input-details' >{tickets.Phonenumber}</div>
                                            </div>
                                            <div className='ticket details-domain'>
                                                <label className="label">DomainName</label>
                                                <div className='ticket-input-details' >{tickets.DomainName}</div>
                                            </div>
                                            <div className='ticket details-Date'>
                                                <label className="label">Date</label>
                                                <div className='ticket-input-details' > {tickets.Date}</div>
                                            </div>
                                            <div className='ticket details-Des'>
                                                <label className="label">Description</label>
                                                <div className='ticket-input-details' > {tickets.Description}</div>
                                            </div>
                                            <div className='ticket details-Status'><label className="label">Status</label>
                                                <div className={tickets.Status} > {tickets.Status}</div>
                                            </div>
                                            <div className='ticket details-Team' ><label className="label">Team</label>
                                                <div className='ticket-input-details' > {tickets.Team}</div></div>
                                            <div className='ticket details-screenshots'><img src={tickets.screenshots} alt="screenshots" height="80vh" width="50%" /></div>
                                        </div>
                                    }
                                />

                            </div>
                        )}
                    </TableContainer>
                </div>

            </div>
        </div>
    );
}
export default Userticket;