import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import { useRouter } from 'next/router'
import MailIcon from '@mui/icons-material/Mail';
import emailjs from 'emailjs-com';
import ReactPaginate from 'react-paginate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Ticketviewer from '../common/ticketviewer';
import UpgradeIcon from '@mui/icons-material/Upgrade';
function Adminticket(props) {
    const Router = useRouter()
    var [show, setShow] = useState('');
    var [search, setSearch] = useState('');
    var [filteredTitle, setFilteredTitle] = useState('all');
    var [filteredStatus, setFilteredStatus] = useState('all');
    const [isOpenfilter, setIsOpenfilter] = useState(false);
    const [isOpenstatusfilter, setIsOpenstatusfilter] = useState(false);
    var [selectedValue, setSelectedValue] = useState([]);
    var [tickets, setTickets,] = useState([]);
    var [Adm_CreatedBy, setAdm_CreatedBy] = useState('')
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => {
                setTickets(res.data)
                if (localStorage.getItem("passValue") === true) {
                    setSelectedValue(team)
                } else {
                    setSelectedValue([])
                }
            });
    }, [selectedValue]);
    useEffect(() => {
        localStorage.setItem("passValue", false);
        setAdm_CreatedBy(localStorage.getItem('user'))
    })


    //current date and time
    var date, TimeType, hour, minutes, seconds, fullTime, dateupadate, monthupadate, yearupadate, fulldate;
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
    dateupadate = date.getDate();
    monthupadate = (date.getMonth() + 1);
    yearupadate = date.getFullYear();
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString()
    fulldate = dateupadate.toString() + '-' + monthupadate.toString() + '-' + yearupadate.toString()
    //filter function
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
    //page access
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
    const [ticketid, setTicketid] = useState()
   
    function updateemail(ticketsId, Username) {
        setName(Username);
        setTicketid(ticketsId)
    }
    console.log(ticketid)
    const [sendmail,setsendmail]=useState(false)
    const [name, setName] = useState(" ")
    
  
    const [showmailstatus, setShowmailstatus] = useState("")
    var [selectedstatus, setSelectedstatus] = useState('');
    const SERVICE_ID = "service_56f9av6"
    const TEMPLATE_ID = "template_7g9sx6r";
    const USER_ID = "user_uy8zZ1SqoqelDq1TAvxL4"
    function finalStatus(ticketsId,Tm_Complete_UpdatedOn,Tm_Complete_UpdatedBy) {
        if(selectedstatus==="Completed"){
            
            console.log(Tm_Complete_UpdatedOn)
            console.log(Tm_Complete_UpdatedBy)
            Axios.put(`https://mindmadetech.in/api/tickets/status/update/${ticketid}`, {
                Status: selectedstatus,
                ticketsId: ticketsId,
                Tm_Complete_UpdatedOn: Tm_Complete_UpdatedOn,
                Tm_Complete_UpdatedBy: Tm_Complete_UpdatedBy
            }).then((response) => {
                setShow("update started Successfully");
                localStorage.setItem('updateclose', "close");
                console.log("ad_completed")
            });
        }
       
        var data = {
            to_email: email,
            message: "status of Your Tickets no " + ticketid + "is " + selectedstatus,
            to_name: name
        };
        if (sendmail === "true") {
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
    
    function handlestatus(e) {
        setSelectedstatus(e.target.value)
    }
    //emailjs
    const [dticketsId, setdticketsId] = useState("")
    const[dticketsscreenshots,setdticketsscreenshots] = useState("")
    const Notificationupdate = (ticketsId,Screenshots) => {
        setdticketsId(ticketsId)
        setdticketsscreenshots(Screenshots)
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
    //ticket viewing page open and close
    const [showdetails, setShowdetails] = useState(false)
    function closeDetails() {
        setShowdetails(false)
    }
    //admin multiteam assign 
    const [selecteddesignTeam, setselecteddesignTeam] = useState('');
    const [selectedserverTeam, setselectedserverTeam] = useState('');
    const [selecteddevelopmentTeam, setselecteddevelopmentTeam] = useState('');
    const [selectedseoTeam, setselectedseoTeam] = useState('');
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checked3, setChecked3] = useState(false)
    const [checked4, setChecked4] = useState(false)
    useEffect(() => {
        if (checked1 === false) {
            setselecteddesignTeam('')
        }
        if (checked2 === false) {
            setselectedserverTeam('')
        }
        if (checked3 === false) {
            setselecteddevelopmentTeam('')
        }
        if (checked3 === false) {
            setselectedseoTeam('')
        }
    })
    const handleClick1 = () => setChecked1(!checked1)
    const handleClick2 = () => setChecked2(!checked2)
    const handleClick3 = () => setChecked3(!checked3)
    const handleClick4 = () => setChecked4(!checked4)
    const [selectedTeam, setselectedTeam] = useState('')
    useEffect(() => {
        setselectedTeam(selecteddesignTeam + selectedserverTeam + selecteddevelopmentTeam + selectedseoTeam)
    })
    function handleUpdate(ticketsId) {
        Axios.put(`https://mindmadetech.in/api/tickets/team/update/${ticketsId}`, {
            Team: selectedTeam.slice(1, 50),
            ticketsId: ticketsId,
            Adm_UpdatedOn: fulldate + ' ' + fullTime,
            Adm_UpdatedBy: "admin1"
        }).then((_response) => {
            setShow("update Successfully");
            localStorage.setItem('updateclose', "close");
            localStorage.setItem("passValue", true);
            setselecteddesignTeam('')
            setselectedserverTeam('')
            setselecteddevelopmentTeam('')
            setselectedseoTeam('')
            setChecked1(false)
            setChecked2(false)
            setChecked3(false)
            setChecked4(false)
        });
    }
    console.log(selectedTeam)
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            {showdetails === false ?
                <div className='container'>
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
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  >TicketId</TableCell>
                                        <TableCell align="left">Username</TableCell>
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Team</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                    </TableRow>
                                </TableHead>
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

                                }).reverse().slice((currentpage - 1) * datalimit, currentpage * datalimit).map((tickets) =>

                                    <TableBody className='update-right' key={tickets.ticketsId}>
                                        <TableRow className={tickets.Notification === "unseen" ? "highlighted-row" : "tickets-bodyrow"} onClick={() => Notificationupdate(tickets.ticketsId,tickets.Screenshots)}>



                                            <TableCell >{tickets.ticketsId}</TableCell>
                                            <TableCell >{tickets.Username}</TableCell>
                                            <TableCell >{tickets.Cus_CreatedOn}</TableCell>
                                            <TableCell >{tickets.Team}</TableCell>
                                            <TableCell > {tickets.Status==="completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>}
                                            </TableCell>


                                        </TableRow>
                                        <div className='updateadminpage flex'>

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

                                                                <div className="form-group">
                                                                    <label className="label">Team</label>
                                                                    <div className="dropdown">
                                                                        <button className="form-input dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Assign Team
                                                                        </button>
                                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                            <li className='flex'><div className="dropdown-item">design</div><input className="form-check-input" onClick={handleClick1} checked={checked1} type="checkbox" value=",design" onChange={(e) => setselecteddesignTeam(e.target.value)} /></li>
                                                                            <li className='flex'><div className="dropdown-item">server</div><input className="form-check-input" onClick={handleClick2} checked={checked2} type="checkbox" value=",server" onChange={(e) => setselectedserverTeam(e.target.value)} /></li>
                                                                            <li className='flex'><div className="dropdown-item">development</div><input className="form-check-input" onClick={handleClick3} checked={checked3} type="checkbox" value=",development" onChange={(e) => setselecteddevelopmentTeam(e.target.value)} /></li>
                                                                            <li className='flex'><div className="dropdown-item">seo</div><input className="form-check-input" onClick={handleClick4} checked={checked4} type="checkbox" value=",seo" onChange={(e) => setselectedseoTeam(e.target.value)} /></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="btn2 float-end mt-3 mb-3" onClick={() => handleUpdate(tickets.ticketsId)}>Assign</button>
                                                        <h4 className="alert1 text-center">{show}</h4>
                                                    </div>
                                                }
                                            />
                                            <FormDialog
                                                dialog_className="send-email-dailog"
                                                dialogtitle={<a onClick={() => updateemail(tickets.ticketsId, tickets.Username)}><UpgradeIcon /></a>}
                                                className="btn3 ticket-update2"
                                                dialogbody={
                                                    <div className="form dialog emaildialog">
                                                        <div className="form-group">
                                                        <div className="form-header">
                                                                <h1>Status Final Update</h1>
                                                            </div>
                                                            <select className="form-input" onChange={handlestatus}>
                                                                <option value="">--Select stutus--</option>
                                                                <option className='Completed' value="Completed">Completed</option>
                                                            </select>
                                                            <div className='flex'>
                                                            <input className="form-check-input" type="checkbox" value="true" onChange={(e) => setsendmail(e.target.value)} />
                                                            <div>Send mail to Client</div>
                                                            </div>                                                  
                                                        </div>
                                                        <button className="btn2 float-end mt-3 mb-3" onClick={()=>finalStatus(tickets.ticketsId,tickets.Tm_Complete_UpdatedOn,tickets.Tm_Complete_UpdatedBy)}>Update</button>
                                                        <h4 className="alert1 text-center">{show}</h4>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </TableBody>
                                )}
                            </Table>
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
                </div>
                :
                <>
                    <Ticketviewer
                        dticketsId={dticketsId}
                        dticketsscreenshots={dticketsscreenshots}
                        closeDetails={closeDetails}
                    />
                </>}
        </div>
    );
}
export default Adminticket;
