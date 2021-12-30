import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import { useRouter } from 'next/router'

function Adminticket() {
    const [open, setOpen] = React.useState(false);
    const Router = useRouter()
    var [show, setShow] = useState('');
    var [tickets, setTickets,] = useState([]);
    var [selectedTeam, setSelectedTeam] = useState('');
    var [selectedStatus, setSelectedStatus] = useState('');
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');
    console.log(selectedValue)
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data));
    }, []);
    function handleTeam(e) {
        setSelectedTeam(e.target.value)
    }
    function handleStatus(e) {
        setSelectedStatus(e.target.value)
    }
    function handleUpdate(ticketsId) {
        console.log(ticketsId)

        Axios.put(`https://mindmadetech.in/api/tickets/new/${ticketsId}`, {
            Team: selectedTeam,
            Status: selectedStatus,
            ticketsId: ticketsId,
        }).then((response) => {

            setShow("update Successfully");
            Router.reload(window.location.pathname)

        });
    }
    const admintickets = () => {
        console.log("hello")
    }

    return (
        <div>
            <div className="container mainbody">
                <Head>
                    <title>Admin Dashboard</title>
                </Head>

                <div className="userbody">
                    <div className='adminticket-head'>
                        <h1>Tickets</h1>
                        <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <TableContainer component={Paper}>
                        <div className='tickets-bodyrow2'>
                            <div >TicketId</div>
                            <div>Username</div>
                            <div >Date</div>
                            <div>Team</div>
                            <div>Status</div>
                            <div></div>
                        </div>
                        {tickets.filter(val => {
                            if (search === "") {
                                return val;
                            } else if (
                                val.ticketsId.toString().includes(search.toString()) ||
                                val.Username.toLowerCase().includes(search.toLowerCase()) ||
                                val.Status.toLowerCase().includes(search.toLowerCase()) ||
                                val.Team.toString().includes(search.toString())
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
                                                <td>{tickets.Username}</td>
                                                <td>{tickets.Date}</td>
                                                <td>{tickets.Team}</td>
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
                                <FormDialog
                                    dialogtitle="Assign"
                                    className="btn3 ticket-update2"
                                    dialogbody={
                                        <div className="form dialog">
                                            <div className="form-toggle"></div>
                                            <div className="form-panel update one">
                                                <div className="form-header">
                                                    <h1>Update Ticket {tickets.ticketsId}</h1>
                                                </div>
                                                <div className="addform">
                                                    <form>
                                                        <div className="form-group">
                                                            <label className="label">Status</label>
                                                            <select className="form-input" name="Status" onChange={handleStatus}>
                                                                <option value="">--Select--</option>
                                                                <option className='new' value="new">New</option>
                                                                <option className='inprogress' value="inprogress">In progress</option>
                                                                <option className='completed' value="completed">Completed</option>
                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <button className="btn2 float-end mt-3 mb-3" onClick={() => handleUpdate(tickets.ticketsId)}>Assign</button>
                                            <h4 className="alert1 text-center">{show}</h4>
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
export default Adminticket;
