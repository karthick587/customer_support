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
    var [selectedTeam, setSelectedTeam] = useState('');
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');
    var [filteredTitle, setFilteredTitle] = useState('all');
    var [filteredStatus, setFilteredStatus] = useState('all');
    const [isOpenfilter, setIsOpenfilter] = useState(false);
    const [isOpenstatusfilter, setIsOpenstatusfilter] = useState(false);
    //console.log(selectedValue)
    var [tickets, setTickets,] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data)); 
    }, []);


    function handleTeam(e) {
        setSelectedTeam(e.target.value)
    }

    function handleUpdate(ticketsId) {

        Axios.put(`https://mindmadetech.in/api/tickets/updateteam/${ticketsId}`, {
            Team: selectedTeam,
            ticketsId: ticketsId,
        }).then((_response) => {

            setShow("update Successfully");
            Router.reload(window.location.pathname)

        });
    }
    useEffect(() => {
        if (filteredTitle === "all") {
            setIsOpenfilter(false);
            setSearch("")
        } else {
            setIsOpenfilter(true);
        }
    });
    useEffect(() => {
        if (filteredTitle === "Username") {
            setIsOpenstatusfilter(true);

        } else {
            setIsOpenstatusfilter(false);
        }
    });

    const[login,setLogin]=useState()
    useEffect(()=>{
      setLogin(window.localStorage.getItem('loggedin'))
      console.log(login)
     if(login==="false"){
      router.push("/components/login/login")
     } else if(login === null){
      router.push("/components/login/login")
     }
  
    })
    return (
        <div>
            <div className="mainbody">
                <Head>
                    <title>Admin Dashboard</title>
                </Head>

                <div className="userbody">
                    <div className='adminticket-head'>
                        <div><h1>Tickets</h1></div>
                        <div className='filter-head '>
                            <select className='filter-select' onChange={(e) => setFilteredTitle(e.target.value)}>
                                <option value="all">All</option>
                                <option value="ticketsId">TicketsId</option>
                                <option value="Username">Username</option>
                                <option value="Date">Date</option>
                                <option value="Team">Team</option>
                                <option value="Status">Status</option>
                            </select>
                            {isOpenfilter && (
                                <input className='search-filter' placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                            )}
                            {isOpenstatusfilter && (
                                <select className='filter-select' onChange={(e) => setFilteredStatus(e.target.value)}>

                                    <option value="all">All</option>
                                    <option value="new">new</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            )}
                        </div>
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
                        {search === " " ?
                            <>
                                {tickets.map((tickets) =>
                                    <div key={tickets.ticketsId} className='tickets-table-row'>

                                        <FormDialog
                                            dialogtitle={
                                                <table >
                                                    <tbody>
                                                        <tr className='tickets-bodyrow' >
                                                            <td>{tickets.ticketsId}</td>
                                                            <td>{tickets.Username}</td>
                                                            <td>{tickets.Date}</td>
                                                            <td>{tickets.Team}</td>
                                                            <td >
                                                                <h5 className='statusUpdateTime'>Updated at {tickets.statusUpdateTime}</h5>
                                                                <h5 className='statusUpdateTime'>Updated at {tickets.statusUpdateTime}</h5>
                                                            </td>
                                                        </tr>
                                                    </tbody>
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
                                                        <h5 className='statusUpdateTime font1'>Updated at {tickets.statusUpdateTime}</h5>
                                                        <h5 className={tickets.Status} > {tickets.Status}</h5>
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
                                                                    <select className="form-input" name="Status" onChange={handleTeam}>
                                                                        <option value="">--Select--</option>
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
                                    </div>
                                )}
                            </> :
                            <>
                                {tickets.filter(val => {
                                    if (filteredTitle === "all") {
                                        return val
                                    } else if (filteredTitle === "ticketsId") {
                                        return val.ticketsId.toString().includes(search.toString())
                                    } else if (filteredTitle === "Username") {
                                        if (search === " ") {
                                            return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes(`${filteredStatus}`)
                                        }
                                        else if (filteredStatus === "all") {
                                            return val.Username.toLowerCase().includes(search.toLowerCase())
                                        } else if (filteredStatus === "new") {
                                            return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('new')
                                        } else if (filteredStatus === "inprogress") {
                                            return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('inprogress')
                                        } else if (filteredStatus === "completed") {
                                            return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('completed')
                                        } else return val;
                                    } else if (filteredTitle === "Status") {
                                        return val.Status.toLowerCase().includes(search.toLowerCase())
                                    } else if (filteredTitle === "Team") {
                                        return val.Team.toLowerCase().includes(search.toLowerCase())
                                    } else if (filteredTitle === "Date") {
                                        return val.Date.toString().includes(search.toString())
                                    } else if (filteredTitle === "Username") {
                                        if (filteredStatus === "inprogress") {
                                            console.log("inprogress selected")
                                            //return val.Status.toLowerCase().includes("inprogress")
                                        } else if (filteredStatus === "completed") {
                                            console.log("completed selected")
                                            // return val.Status.toLowerCase().includes("completed")
                                        } else return val;
                                    }
                                }).map((tickets) =>
                                    <div key={tickets.ticketsId} className='tickets-table-row'>
                                        <FormDialog
                                            dialogtitle={
                                                <table >
                                                    <tbody>
                                                        <tr className='tickets-bodyrow' >
                                                            <td>{tickets.ticketsId}</td>
                                                            <td>{tickets.Username}</td>
                                                            <td>{tickets.Date}</td>
                                                            <td>{tickets.Team}</td>
                                                            <td >
                                                                <h5 className={tickets.Status}>
                                                                    {tickets.Status}
                                                                </h5>
                                                                <h5 className='statusUpdateTime'>Updated at {tickets.statusUpdateTime}</h5>
                                                            </td>
                                                        </tr>
                                                    </tbody>
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

                                                        <h5 className={tickets.Status} > {tickets.Status}</h5>
                                                        <h5 className='statusUpdateTime'>Updated at {tickets.statusUpdateTime}</h5>
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
                                                                    <select className="form-input" name="Status" onChange={handleTeam}>
                                                                        <option value="">--Select--</option>
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
                                    </div>
                                )}
                            </>
                        }
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}
export default Adminticket;