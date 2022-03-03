import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import { useRouter } from 'next/router'
import emailjs from 'emailjs-com';
import ReactPaginate from 'react-paginate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Ticketviewer from '../common/ticketviewer';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { CounterContext } from '../contex/adminProvider';
import { CurrentDateContext } from '../contex/currentdateProvider';
import DesignTeamList from './adminticketTeamList/designTeamList';
import { Button, Typography } from '@mui/material';
import AssignedMenber from '../common/assigned_members';
import ViewTeam from '../common/view_team';
import { ListContext } from '../contex/ListProvider';

function Adminticket() {
    const { setdialogformopen, designTeamList, setTesting, setshowvalue, setdesignTeamList } = useContext(CounterContext);
    const { currentDate } = useContext(CurrentDateContext);
    const { users, team } = useContext(ListContext);

    const Router = useRouter();
    var [show, setShow] = useState('');
    var [search, setSearch] = useState('');
    var [filteredTitle, setFilteredTitle] = useState('all');
    var [filteredStatus, setFilteredStatus] = useState('all');
    const [isOpenfilter, setIsOpenfilter] = useState(false);
    const [isOpenstatusfilter, setIsOpenstatusfilter] = useState(false);
    var [selectedValue, setSelectedValue] = useState([]);
    var [tickets, setTickets,] = useState([]);
    var[filteredTickets,setFilteredTickets] = useState([]);
    var [Adm_CreatedBy, setAdm_CreatedBy] = useState('');
    const [login, setLogin] = useState();
    const [ticketid, setTicketid] = useState();
    const [sendmail, setsendmail] = useState(false);
    const [name, setName] = useState(" ");
    const [showmailstatus, setShowmailstatus] = useState("");
    var [selectedstatus, setSelectedstatus] = useState('');
    const [email, setEmail] = useState();
    const [dticketsId, setdticketsId] = useState("");
    const [teamarray, setteamarray] = useState([]);
    const [dticketsscreenshots, setdticketsscreenshots] = useState("");
    const [datalimit, setdatalimit] = useState(10);
    const [currentpage, setCurrentpage] = useState(1);
    const [showdetails, setShowdetails] = useState(false);
    const [selectTeam, setselectTeam] = useState('x');
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => {
                setTickets(res.data)
                if (localStorage.getItem("passValue") === true) {
                    setSelectedValue(team)
                } else {
                    setSelectedValue([])
                }
            })
            .catch((err) => { return err; })
    }, [selectedValue]);
    // var [team, setTeam] = useState([]);
    // useEffect(() => {
    //     Axios.get("https://mindmadetech.in/api/team/list")
    //         .then((res) => setTeam(res.data))
    //         .catch((err) => { return err; })
    // },[]);
    useEffect(() => {
        localStorage.setItem("passValue", false);
        setAdm_CreatedBy(localStorage.getItem('user'));
    }, []);

    //filter function
    useEffect(() => {
        if (filteredTitle === "all") {
            setIsOpenfilter(false);
            setSearch("");
        } else {
            setIsOpenfilter(true);
        }
        setShow();
    }, [filteredTitle]);
    useEffect(() => {
        if (filteredTitle === "Username") {
            setIsOpenstatusfilter(true);

        } else {
            setIsOpenstatusfilter(false);
        }
    }, [filteredTitle]);
    //page access
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/");
        } else if (login === null) {
            Router.push("/");
        }
    }, []);
    // emailjs
    function updateemail(ticketsId, Username) {
        setName(Username);
        setTicketid(ticketsId);
    };
    const SERVICE_ID = "service_56f9av6";
    const TEMPLATE_ID = "template_7g9sx6r";
    const USER_ID = "user_uy8zZ1SqoqelDq1TAvxL4";
    function finalStatus(ticketsId, Tm_Complete_UpdatedOn, Tm_Complete_UpdatedBy) {
        if (selectedstatus === "Completed") {
            Axios.put(`https://mindmadetech.in/api/tickets/status/update/${ticketid}`, {
                Status: selectedstatus,
                ticketsId: ticketsId,
                Tm_Complete_UpdatedOn: Tm_Complete_UpdatedOn,
                Tm_Complete_UpdatedBy: Tm_Complete_UpdatedBy
            }).then((response) => {
                setShow("update started Successfully");
                setdialogformopen(true);
                setTesting(true)
                setshowvalue("Submitted Successfully");
            })
                .catch((err) => {
                    setTesting(true)
                    setshowvalue(1 + "Submitted Failed");
                    return err;
                })
        };
        var data = {
            to_email: email,
            message: "status of Your Tickets no " + ticketid + "is " + selectedstatus,
            to_name: name
        };
        if (sendmail === "true") {
            emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
                function (response) {
                    setdialogformopen(true)
                    setShowmailstatus("Email sent successfully")
                },
                function (err) {
                    setShowmailstatus(1 + "Sending Email Failed")
                    setdialogformopen(true)
                }
            );
        };
    }
    useEffect(() => {
        const Timer = setTimeout(() => {
            setShowmailstatus();
        }, [4000]);
        return () => {
            clearTimeout(Timer);
        }
    }, [])
    //to get client email id
    // useEffect(() => {
    //     Axios.get("https://mindmadetech.in/api/customer/list")
    //         .then((res) => setUsers(res.data))
    //         .catch((err) => { return err; })
    // }, [setUsers]);
    useEffect(() => {
        {
            users.filter(val => {
                return val.Username.toLowerCase().includes(name)
            }).map((itemed) => setEmail(itemed.Email)
            )
        }
        if (search !== "") {
            setCurrentpage(1)
        }
    }, [search]);
    function handlestatus(e) {
        setSelectedstatus(e.target.value);
    };
    //emailjs
    const Notificationupdate = (ticketsId, Screenshots, TeamAssign) => {
        setdticketsId(ticketsId);
        setteamarray(TeamAssign)
        setdticketsscreenshots(Screenshots);
        setShowdetails(true);
        Axios.put(`https://mindmadetech.in/api/tickets/updateNotification/${ticketsId}`, {
            Notification: "seen",
            ticketsId: ticketsId,
        }).then((_response) => {
            return _response;
        }).catch((err) => { return err; })
    };
    //pagination
    function handlePageChange(pageNumber) {
        setCurrentpage(pageNumber + 1);
    };
    const pagedatalimit = (e) => {
        setdatalimit(e.target.value);
    };
    //ticket viewing page open and close
    function closeDetails() {
        setShowdetails(false);
    };

    useEffect(()=>{
        setFilteredTickets(tickets.filter(values=>{
            if (search==='') {
                return values;
            }
        }))
    },[tickets,setFilteredTickets])

    function handleUpdate(ticketsId) {
        const teamId = designTeamList.map((o) => JSON.stringify(o));
        Axios.post(`https://mindmadetech.in/api/tickets/team/update`, {
            teamId: teamId,
            ticketsId: ticketsId,
            Adm_UpdatedBy: Adm_CreatedBy,
            Adm_UpdatedOn: currentDate,
        }).then((_response) => {

            setdialogformopen("true")
            localStorage.setItem("passValue", true);
            setTesting(true)
            setshowvalue("Assigned Successfully");
            setdesignTeamList([])
        })
            .catch((err) => {
                setTesting(true)
                setshowvalue(1 + "Assigned Failed");
                return err;
            })
    };
    function callback(childdata) {
        setdesignTeamList(childdata)
    }

    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            {showdetails === false ?
                <div className="userbody">
                    <div className='header-user'>
                        <h1>Tickets</h1>
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
                            {filteredTickets
                            // .filter(val => {
                            //     if (search === " ") {
                            //         return val;
                            //     } else {
                            //         if (filteredTitle === "all") {
                            //             return val
                            //         } else if (filteredTitle === "ticketsId") {
                            //             return val.ticketsId.toString().includes(search.toString())
                            //         } else if (filteredTitle === "Username") {
                            //             if (search === " ") {
                            //                 return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes(`${filteredStatus}`)
                            //             }
                            //             else if (filteredStatus === "all") {
                            //                 return val.Username.toLowerCase().includes(search.toLowerCase())
                            //             } else if (filteredStatus === "started") {
                            //                 return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('started')
                            //             } else if (filteredStatus === "new") {
                            //                 return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('new')
                            //             } else if (filteredStatus === "inprogress") {
                            //                 return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('inprogress')
                            //             } else if (filteredStatus === "completed") {
                            //                 return val.Username.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('completed')
                            //             } else return val;
                            //         } else if (filteredTitle === "Status") {
                            //             return val.Status.toLowerCase().includes(search.toLowerCase())
                            //         } else if (filteredTitle === "Team") {
                            //            ftf
                            //         } else if (filteredTitle === "Date") {
                            //             if (search === "" || search === " ") {
                            //                 return val
                            //             } else {
                            //                 return val.Cus_CreatedOn.includes(search)
                            //             }

                            //         } else if (filteredTitle === "Username") {
                            //             if (filteredStatus === "inprogress") {

                            //                 //return val.Status.toLowerCase().includes("inprogress")
                            //             } else if (filteredStatus === "completed") {

                            //                 // return val.Status.toLowerCase().includes("completed")
                            //             } else return val;
                            //         }
                            //     }
                            // })
                            .reverse().slice((currentpage - 1) * datalimit, currentpage * datalimit).map((tickets) =>
                                <TableBody className='update-right' key={tickets.ticketsId}>
                                    <TableRow className={tickets.Notification === "unseen" ? "highlighted-row" : "tickets-bodyrow"} onClick={() => Notificationupdate(tickets.ticketsId, tickets.Screenshots, tickets.TeamAssign)}>
                                        <TableCell >{tickets.ticketsId}</TableCell>
                                        <TableCell >{tickets.Username}</TableCell>
                                        <TableCell >{tickets.Cus_CreatedOn}</TableCell>
                                        <TableCell >{tickets.TeamAssign.length <= 0 ? <>Not assigned</> : <ViewTeam teamArray={tickets.TeamAssign} />}</TableCell>
                                        <TableCell > {tickets.Status === "completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>}
                                        </TableCell>
                                    </TableRow>
                                    <div className='updateadminpage flex'>
                                        <FormDialog
                                            dialog_className="Assign-team-dailog"
                                            dialogtitle={<div onClick={() => setselectTeam("x")}>Assign</div>}
                                            className="btn3 ticket-update2"
                                            dialogbody={
                                                <div className="form dialog">
                                                    <div className="form-toggle"></div>
                                                    <div className="form-panel update one">
                                                        <div className="form-header">
                                                            <h1>Update Ticket {tickets.ticketsId}</h1>
                                                        </div>
                                                        <div >
                                                            <div className="form-group">
                                                                <div className='flex'>
                                                                    <div className='check-input-list'>
                                                                        <ul>
                                                                            <li className='flex '><input className="form-check-input me-1" name="flexRadioDefault" id="flexRadioDefault1" type="radio" value="Design" onChange={(e) => setselectTeam(e.target.value)} /><div >design</div></li>

                                                                            <li className='flex'><input className="form-check-input me-1" name="flexRadioDefault" id="flexRadioDefault1" type="radio" value="Server" onChange={(e) => setselectTeam(e.target.value)} /><div >server</div></li>

                                                                            <li className='flex'><input className="form-check-input me-1" name="flexRadioDefault" id="flexRadioDefault1" type="radio" value="Development" onChange={(e) => setselectTeam(e.target.value)} /><div>development</div></li>

                                                                            <li className='flex'><input className="form-check-input me-1" name="flexRadioDefault" id="flexRadioDefault1" type="radio" value="Seo" onChange={(e) => setselectTeam(e.target.value)} /><div >seo</div></li>

                                                                        </ul>
                                                                    </div>
                                                                    <div className='TeamList-right'>
                                                                        <DesignTeamList selectedteam={selectTeam} designTeamList={callback} />
                                                                    </div>

                                                                </div>
                                                                <AssignedMenber />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex float-end'>
                                                        <Button onClick={() => setdesignTeamList([])&setdialogformopen("true")}>Cancel</Button>
                                                        <button className="btn2 mt-3 mb-3" onClick={() => handleUpdate(tickets.ticketsId)}>Assign</button>
                                                    </div>


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
                                                            <option value="">--Select status--</option>
                                                            <option className='Completed' value="Completed">Completed</option>
                                                        </select>
                                                        <div className='flex'>
                                                            <input className="form-check-input" type="checkbox" value="true" onChange={(e) => setsendmail(e.target.value)} />
                                                            <div>Send mail to Client</div>
                                                        </div>
                                                    </div>
                                                    <button className="btn2 float-end mt-3 mb-3" onClick={() => finalStatus(tickets.ticketsId, tickets.Tm_Complete_UpdatedOn, tickets.Tm_Complete_UpdatedBy)}>Update</button>
                                            
                                                </div>
                                            }
                                        />
                                    </div>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                    {tickets.length<10 ? <></>:
                    <div className='page-bottom'>
                        < ReactPaginate
                            previousLabel={""}
                            nextLabel={""}
                            pageCount={Math.ceil(tickets.length / datalimit)}
                            onPageChange={(e) => handlePageChange(e.selected)}
                            containerClassName={"pagination mt-3"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            activeClassName={"active"}
                        />
                        <div className='pagedata-limit flex'>
                            <Typography>Number of Tickets per page</Typography>
                            <select className='pagedatalimit-select' onChange={pagedatalimit}>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
}
                </div>
                :
                <>
                    <Ticketviewer
                        teamarray={teamarray}
                        dticketsId={dticketsId}
                        dticketsscreenshots={dticketsscreenshots}
                        closeDetails={closeDetails}
                    />
                </>}
        </div>
    );
}
export default Adminticket;
