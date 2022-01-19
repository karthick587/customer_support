import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import { useRouter } from 'next/router'
import MailIcon from '@mui/icons-material/Mail';
import emailjs from 'emailjs-com';
import Imageviewer from '../common/imageviewer'

function Adminticket(props) {
  
   
    const Router = useRouter()
    var [show, setShow] = useState('');
    var [selectedTeam, setSelectedTeam] = useState('');
    var [search, setSearch] = useState('');
    const [notificationcount, setnotificationcount] = useState()
    var [filteredTitle, setFilteredTitle] = useState('all');
    var [filteredStatus, setFilteredStatus] = useState('all');
    const [isOpenfilter, setIsOpenfilter] = useState(false);
    const [isOpenstatusfilter, setIsOpenstatusfilter] = useState(false);
    //console.log(selectedValue)
  
  
    var [tickets, setTickets,] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data));
    },[tickets]);
   

    function handleTeam(e) {
        setSelectedTeam(e.target.value)
    }
    function handleUpdate(ticketsId) {
        Axios.put(`https://mindmadetech.in/api/tickets/updateteam/${ticketsId}`, {
            Team: selectedTeam,
            ticketsId: ticketsId,
        }).then((_response) => {

            setShow("update Successfully");
           localStorage.setItem('updateclose', "close");
        });
    }
    useEffect(() => {
        if (filteredTitle === "all") {
            setIsOpenfilter(false);
            setSearch("")
        } else {
            setIsOpenfilter(true);
        }
      setShow()
    });
    useEffect(() => {
        if (filteredTitle === "Username") {
            setIsOpenstatusfilter(true);

        } else {
            setIsOpenstatusfilter(false);
        }
    });
    const [login, setLogin] = useState()
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'))
      
        if (login === "false") {
            Router.push("/")
        } else if (login === null) {
            Router.push("/")
        }
    })
    
    // emailjs
    function updateemail(ticketsId, Username) {
        setName(Username);
        setTicketid(ticketsId)
    }
    const [name, setName] = useState(" ")
    const [ticketid, setTicketid] = useState()
    const [showmailstatus, setShowmailstatus] = useState("")
    const SERVICE_ID = "service_56f9av6"
    const TEMPLATE_ID = "template_7g9sx6r";
    const USER_ID = "user_uy8zZ1SqoqelDq1TAvxL4"
    function SendEmail() {
       
        var data = {
            to_email: email,
            message: "status of Your Tickets no " + ticketid + "is " + selectedstatus,
            to_name: name
        };
        if (selectedstatus === "completed") {
            emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
                function (response) {
                   localStorage.setItem('updateclose', "close");
                    setShowmailstatus("EMail sended Successfully")
                },
                function (err) {
                  
                    setShowmailstatus("Sending Email Failed")
                  localStorage.setItem('updateclose', "close");
                }
            );
        }
        setTimeout(() => {
            setShowmailstatus()
        }, [4000])
    }
    //to get client email id 
    const [email, setEmail] = useState()
    var [users, setUsers] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/customer/list")
            .then((res) => setUsers(res.data))
    },[users]);
    useEffect(() => {
        {
            users.filter(val => {
                return val.Username.toLowerCase().includes(name)
            }).map((itemed) => setEmail(itemed.Email)
            )
        }
        localStorage.setItem('updateclose', "open");
    })
    var [selectedstatus, setSelectedstatus] = useState('');
    function handlestatus(e) {
        setSelectedstatus(e.target.value)
    }
    //emailjs
    // notificationupdate
  
    function Notificationupdate(ticketsId, Notification) {
        Axios.put(`https://mindmadetech.in/api/tickets/updateNotification/${ticketsId}`, {
            Notification: "seen",
            ticketsId: ticketsId,
        }).then((_response) => {
    });
 }
    return (
        <div>
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
                            <input className='filter-select' placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                        <div className='empty-col'></div>
                    </div>               
                            {tickets.filter(val => {
                                if(search === " "){
                                     return val;
                                }else{
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
                                }
                              
                            }).map((tickets) =>
                                <div key={tickets.ticketsId} className='tickets-table-row'>
                                    <FormDialog
                                        dialogtitle={
                                            <table  >
                                                <tbody>

                                                    <tr className={tickets.Notification === "unseen" ? "highlighted-row" : "tickets-bodyrow"} onClick={() => Notificationupdate(tickets.ticketsId, tickets.Notification)} >
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
                                                <div className='ticket details-Team'>
                                                    <label className="label">Screenshot</label>
                                                    <Imageviewer
                                                        imgdialogbutton={<img src={tickets.Screenshots} alt="screenshots" width={100} height={50} />}
                                                        imgdialogbody={<img className='screeshot-img-viewer' src={tickets.Screenshots} alt="screenshots" />}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    />
                                    <FormDialog
                                        dialog_className="Assign-team-dailog"
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
                                    <FormDialog
                                        dialog_className="send-email-dailog"
                                        dialogtitle={<a onClick={() => updateemail(tickets.ticketsId, tickets.Username)}><MailIcon /></a>}
                                        className="btn3 ticket-update2"
                                        dialogbody={
                                            <div className="form dialog emaildialog">

                                                <div className="form-group">
                                                    <label className="label">status</label>
                                                    <select className="form-input" onChange={handlestatus}>
                                                        <option value="">--Select stutus--</option>

                                                        <option className='completed' value="completed">completed</option>
                                                    </select>
                                                </div>
                                                <button className="btn2 float-end mt-3 mb-3" onClick={SendEmail}>Send Email</button>
                                                <h4 className="alert1 text-center">{showmailstatus}</h4>

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
export default Adminticket;
