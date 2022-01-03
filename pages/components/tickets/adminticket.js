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
    var [search, setSearch] = useState('');
    var [statusUpdateTime, setStatusUpdateTime] = useState('');
    var [selectedstatus, setSelectedstatus] = useState('');
    var [selectedValue, setSelectedValue] = useState('');
    var [catSelect, setCatselect] = useState();
    var[test,setTest]=useState();
    console.log(selectedValue)
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data));
    }, []);
    function handleTeam(e) {
        setSelectedTeam(e.target.value)
    }
    function handlestatus(e) {
        setSelectedstatus(e.target.value)
    }
    function handleUpdate(ticketsId) {
        console.log(ticketsId)

        Axios.put(`https://mindmadetech.in/api/tickets/updateteam/${ticketsId}`, {
            Team: selectedTeam,
            ticketsId: ticketsId,

        }).then((response) => {

            setShow("update Successfully");
            Router.reload(window.location.pathname)

        });
    }
    function handleUpdatestatus(ticketsId) {
        console.log(ticketsId)
        console.log(statusUpdateTime)

        Axios.put(`https://mindmadetech.in/api/tickets/updatestatus/${ticketsId}`, {
            Status: selectedstatus,
            ticketsId: ticketsId,
            statusUpdateTime: fullTime
        }).then((response) => {
            setShow("update Successfully");
            Router.reload(window.location.pathname)
        });
    }

    var date, TimeType, hour, minutes, seconds, fullTime;
    date = new Date();
    hour = date.getHours();
    if (hour <= 11) {
        TimeType = 'AM';
    }
    else {
        TimeType = 'PM';
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour == 0) {
        hour = 12;
    }
    minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes.toString();
    }
    seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds.toString();
    }
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();
    console.log(fullTime)
   

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
                        <select className="form-input" onChange={(e) => setCatselect(e.target.value)}>
                            <option value="">--Select categary--</option>
                           
                            <option className='' value="ticketsId">TicketId</option>
                            <option className='' value="Username">Username</option>
                            <option className='' value="Team">Team</option>
                            <option className='' value="Status">Status</option>
                        </select>
                    </div>
                    <TableContainer component={Paper}>
                        <div className='tickets-bodyrow2'>
                            <div>TicketId</div>
                            <div>Username</div>
                            <div >Date</div>
                            <div>Team</div>
                            <div>Status</div>
                            <div></div>
                        </div>
                        {tickets.filter(val => {
                            if (search === "") {
                                return val;
                            } else if (catSelect === "ticketsId") {
                             return   val.ticketsId.toString().includes(search.toString()) 
                            } else if (catSelect === "Username") {
                             return   val.Username.toLowerCase().includes(search.toLowerCase()) 
                            } else if (catSelect === "Status") {
                              return  val.Status.toLowerCase().includes(search.toLowerCase()) 
                            } else if (catSelect === "Team") {
                              return  val.Team.toLowerCase().includes(search.toLowerCase())  
                            }else return val
                           
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
                                                <td ><h5 className='statusUpdateTime'>Updated at{tickets.statusUpdateTime}</h5><div className={tickets.Status}>{tickets.Status}</div></td>
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
                                                <div className={tickets.Status} >Updated at {tickets.statusUpdateTime}</div>
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
                                                            <label className="label">Team</label>
                                                            <select className="form-input" onChange={handleTeam}>
                                                                <option value="">--Select Team--</option>
                                                                <option className='new' value="design">Design Team</option>
                                                                <option className='inprogress' value="development">Development Team</option>
                                                                <option className='completed' value="server">Server Team</option>
                                                                <option className='completed' value="seo">SEO Team</option>
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
                                <FormDialog
                                    dialogtitle="update"
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
                                                            <label className="label">status</label>
                                                            <select className="form-input" onChange={handlestatus}>
                                                                <option value="">--Select Team--</option>
                                                                <option className='new' value="new">new</option>
                                                                <option className='inprogress' value="inprogress">inprogress</option>
                                                                <option className='completed' value="completed">completed</option>

                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <button className="btn2 float-end mt-3 mb-3" onClick={() => handleUpdatestatus(tickets.ticketsId)}>Assign</button>
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
