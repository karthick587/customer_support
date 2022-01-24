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
import ReactPaginate from 'react-paginate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagIcon from '@mui/icons-material/Flag';
import FiberNewIcon from '@mui/icons-material/FiberNew';
function Adminticket(props) {
    const Router = useRouter()
    var [show, setShow] = useState('');
    var [selectedTeam, setSelectedTeam] = useState('');
    var [search, setSearch] = useState('');
    var [filteredTitle, setFilteredTitle] = useState('all');
    var [filteredStatus, setFilteredStatus] = useState('all');
    const [isOpenfilter, setIsOpenfilter] = useState(false);
    const [isOpenstatusfilter, setIsOpenstatusfilter] = useState(false);
    var [selectedValue, setSelectedValue] = useState([]);
    var [tickets, setTickets,] = useState([]);
    var[Adm_CreatedBy,setAdm_CreatedBy] = useState('')
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => {
                setTickets(res.data)
                if(localStorage.getItem("passValue") === true){
                    setSelectedValue(team)
                }else{
                    setSelectedValue([])
                }
            });

    }, [selectedValue]);
    useEffect(()=>{
        localStorage.setItem("passValue",false);
        setAdm_CreatedBy(localStorage.getItem('user'))
    })
   
    let ticketscount = 0;
    ticketscount = tickets.length
    const [notificationcount, setnotificationcount] = useState()
    useEffect(() => {
        setnotificationcount(tickets.filter(val => { return val.Notification.toLowerCase().includes("unseen") }).map((ticket) => setnotificationcount(ticket.Notification.length)).length)
    }, [tickets])

    var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var fullDate, TimeType, hour, minutes, seconds, Adm_CreatedOn;
    fullDate = new Date();
    hour = fullDate.getHours();
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
    minutes = fullDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes.toString();
    }
    seconds = fullDate.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds.toString();
    }
    Adm_CreatedOn = date + ' ' + hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString()
    
    function handleTeam(e) {
        setSelectedTeam(e.target.value)
    }
    function handleUpdate(ticketsId) {
        Axios.put(`https://mindmadetech.in/api/tickets/updateteam/${ticketsId}`, {
            Team: selectedTeam,
            ticketsId: ticketsId,
            Adm_CreatedOn : Adm_CreatedOn,
            Adm_CreatedBy : Adm_CreatedBy
        }).then((_response) => {
            setShow("update Successfully");
            localStorage.setItem('updateclose', "close");
            localStorage.setItem("passValue",true);
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
        props.parentCallback(ticketscount);
        props.notificationcount(notificationcount);

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
    }, [users]);
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
    const [dticketsId, setdticketsId] = useState("")
    const [username, setusername] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    const [domainName, setdomainName] = useState("")
    //const [date, setdate] = useState("")
    const [description, setdescription] = useState("")
    const [dstatus, setdstatus] = useState("")
    const [statusUpdatetime, setstatusUpdateTime] = useState("")
    const [team, setteam] = useState("")
    const [screenshots, setscreenshots] = useState("")
    const Notificationupdate = (ticketsId, Username, Phonenumber, DomainName, Date, Description, Status, statusUpdateTime, Team, Screenshots) => {
        setdticketsId(ticketsId)
        setusername(Username)
        setphonenumber(Phonenumber)
        setdomainName(DomainName)
       // setdate(Date)
        setdescription(Description)
        setdstatus(Status)
        setstatusUpdateTime(statusUpdateTime)
        setteam(Team)
        setscreenshots(Screenshots)
        setShowdetails(true)
        Axios.put(`https://mindmadetech.in/api/tickets/updateNotification/${ticketsId}`, {
            Notification: "seen",
            ticketsId: ticketsId,
        }).then((_response) => {
        });
    }
    //pagination
    const [datalimit, setdatalimit] = useState(10);
    const [currentpage, setCurrentpage] = useState(1);
    function handlePageChange(pageNumber) {
        setCurrentpage(pageNumber + 1);
    }
    const pagedatalimit = (e) => {
        setdatalimit(e.target.value)
    }
    const [showdetails, setShowdetails] = useState(false)
    function closeDetails() {
        setShowdetails(false)
    }

    

    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            {showdetails === false ?
                <div className="userbody">
                    <div className='adminticket-head'>
                        <div><h1>Tickets</h1></div>
                        <div className='filter-head flex'>
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
                                    <option value="started">started</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            )}
                        </div>
                        <div className='pagedatalimit'>
                            <select className='pagedatalimit-select' onChange={pagedatalimit}>

                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <div className='float-end caption'>Number of Tickets per page</div>
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
                            if (search === " ") {
                                return val;
                            } else {
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
                                    } else if (filteredStatus === "started") {
                                        return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('started')
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
                                // } else if (filteredTitle === "Date") {
                                //     return val.Date.toString().includes(search.toString())
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

                        }).slice((currentpage - 1) * datalimit, currentpage * datalimit).map((tickets) =>
                            <div key={tickets.ticketsId} className='tickets-table-row'>

                                <table  >
                                    <tbody>

                                        <tr className={tickets.Notification === "unseen" ? "highlighted-row" : "tickets-bodyrow"} onClick={() => Notificationupdate(tickets.ticketsId, tickets.Username, tickets.Phonenumber, tickets.DomainName, tickets.Date, tickets.Description, tickets.Status, tickets.statusUpdateTime, tickets.Team, tickets.Screenshots)} >
                                            <td>{tickets.ticketsId}</td>
                                            <td>{tickets.Username}</td>
                                            {/* <td>{tickets.Date}</td> */}
                                            <td>{tickets.Team}</td>
                                            <td >
                                                <h5 className={tickets.Status}>
                                                    {tickets.Status}
                                                </h5>
                                                {/* <h5 className='statusUpdateTime'>Updated at {tickets.statusUpdateTime}</h5> */}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

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
                    < ReactPaginate
                            previousLabel={""}
                            nextLabel={""}
                            pageCount={tickets.length / datalimit}
                            onPageChange={(e) => handlePageChange(e.selected)}
                            containerClassName={"pagination justify-content-center mt-3"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            activeClassName={"active"}
                        />
                </div>
                :
                <div className='ticket-details'>
                    <div className='ticket-details-head'>
                        viewing Support Ticket #{dticketsId}
                        <div className='ticket-details-head-btn '>
                            <button className='btn2' onClick={closeDetails}>Back</button>
                        </div>
                    </div>
                    <div className='ticket-details-middle'>
                        <div className='ticket-details-middle-1 flex'>
                            <div className='ticket-details-middle-1-1'>
                                Tickets Details
                            </div>
                            <div className='ticket-details-middle-1-2'>
                                {dstatus}
                            </div>
                            <div className='ticket-details-middle-1-3'>
                                <div className=''>
                                    <div className='flex'>
                                        <div className="ticket-status color-green">
                                        <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {dstatus === "New" ? <><div className='details-caption'>New<div className='details-caption-2'>Updated at {statusUpdatetime}</div></div></> : <div className='details-caption-strike'>New</div>}
                                        </div>
                                        <div className={dstatus === "New" ? "ticket-status-line width-10" : "ticket-status-line width-10 color-green-line"}>

                                        </div>
                                        <div className={dstatus === "started" || dstatus === "inprogress" || dstatus === "completed" ? "ticket-status color-green" : "ticket-status"}>
                                        <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {dstatus === "started" ? <div className='details-caption'>Started<div className='details-caption-2'>Updated at {statusUpdatetime}</div></div> : <div className='details-caption-strike'>Started</div>}
                                        </div>
                                        <div className={dstatus === "New" || dstatus === "started" ? "ticket-status-line width-10" : "ticket-status-line width-10 color-green-line"}>

                                        </div>
                                        <div className={dstatus === "New" || dstatus === "started" ? "ticket-status" : "ticket-status color-green"}>
                                        <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {dstatus === "inprogress" ? <div className='details-caption'>Inprogress<div className='details-caption-2'>Updated at {statusUpdatetime}</div></div> : <div className='details-caption-strike'>Inprogress</div>}
                                        </div>
                                        <div className={dstatus === "completed" ? "ticket-status-line width-10 color-green-line" : " ticket-status-line width-10 "}>

                                        </div>
                                        <div className={dstatus === "completed" ? "ticket-status  color-green" : "ticket-status"}>
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {dstatus === "completed" ? <div className='details-caption'>Completed<div className='details-caption-2'>Updated at {statusUpdatetime}</div></div> : <div className='details-caption-strike'>Completed</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='ticket-details-middle-2 row'>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Username
                                </div>
                                <div className='user-label-ticket-details'>
                                    {username}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Ticket NO
                                </div>
                                <div className='user-label-ticket-details'>
                                    {dticketsId}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Department
                                </div>
                                <div className='user-label-ticket-details'>
                                    {team}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    DomainName
                                </div>
                                <div className='user-label-ticket-details'>
                                    {domainName}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='user-profile-ticket-details row'>
                        <div className='user-profile-ticket-details-1 col'>
                            <div className='label-ticket-details'>
                                Description
                            </div>
                            <div className='ticket-input-details' >
                                {description}
                            </div>
                        </div>
                        <div className='user-profile-ticket-details-2 col flex'>
                            <div className='width-20'>
                                <div className='label-ticket-details'>
                                    Phonenumber
                                </div>
                                <div className='ticket-input-details' >
                                    {phonenumber}
                                </div>
                                {/* <div className='label-ticket-details'>
                                    Date
                                </div>
                                <div className='ticket-input-details' >
                                    {date}
                                </div> */}

                            </div>
                            <div className='ticket-details-screenshot'>
                                <div className='label-ticket-details'>
                                    Screenshot
                                </div>
                                
                                <Imageviewer
                                    imgdialogbutton={<img src={screenshots} alt="screenshots" width={200} height={100} />}
                                    imgdialogbody={<img className='screeshot-img-viewer' src={screenshots} alt="screenshots" />}
                                />
                            </div>
                        </div>
                    </div>


                </div>
            }
        </div>
    );
}
export default Adminticket;
