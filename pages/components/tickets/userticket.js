import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import Imageviewer from '../common/imageviewer'
function Userticket(props) {
    const { Username } = props;
    var [tickets, setTickets] = useState([]);
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data));
    }, [tickets]);
    useEffect(() => {
        setSearch(Username);

    })
    const [login, setLogin] = useState()
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'))
     
        if (login === "false") {
            router.push("/")
        } else if (login === null) {
            router.push("/")
        }

    })

    return (
        <div>

            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="userbody">
                <div className='adminticket-head'>
                    <h1>Tickets</h1>
                </div>
                <TableContainer component={Paper}>
                    <div className='tickets-bodyrow4'>
                        <div >TicketId</div>
                        <div>Username</div>
                        <div >Date</div>
                        <div>Team</div>
                        <div>Status</div>
                    </div>
                    {tickets.filter(val => {

                        return val.Username.toLowerCase().includes(search)

                    }).map((tickets) =>
                        <div key={tickets.ticketsId} className='tickets-table-row4'>
                            <FormDialog
                                dialogtitle={
                                    <table >
                                        <tr className='tickets-bodyrow4' >
                                            <td>{tickets.ticketsId}</td>
                                            <td >{tickets.Username}</td>
                                            <td>{tickets.Date}</td>
                                            <td >{tickets.Team}</td>
                                            <td >
                                                <h5 className={tickets.Status}>{tickets.Status}</h5>
                                                <h5 className='statusUpdateTime'>Updated at{tickets.statusUpdateTime}</h5>
                                            </td>
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

                                            <h5 className={tickets.Status}>{tickets.Status}</h5>
                                            <h5 className='statusUpdateTime'>Updated at {tickets.statusUpdateTime}</h5>
                                        </div>
                                        <div className='ticket details-Team' ><label className="label">Team</label>
                                            <div className='ticket-input-details' > {tickets.Team}</div>
                                        </div>
                                        <Imageviewer
                                            imgdialogbutton={<img src={tickets.Screenshots} alt="screenshots" width={60} height={40} />}
                                            imgdialogbody={<img className='screeshot-img-viewer' src={tickets.Screenshots} alt="screenshots" />}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    )}
                </TableContainer>
            </div>

        </div>
    );
}
export default Userticket;