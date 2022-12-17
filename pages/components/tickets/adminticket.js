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
import { TicketsContext } from '../contex/ticketsProvider';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { renderEmail } from 'react-html-email'
import TicketCompletedBody from '../utils/ticketCompletedBody';
import TicketAssignedBody from '../utils/ticketAssignedBody';
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import EmailIcon from '@mui/icons-material/Email';
function Adminticket() {
    const { Email, setdialogformopen, designTeamList, setTesting, setshowvalue, setdesignTeamList, addTeammember } = useContext(CounterContext);
    const [loader, setloader] = useState(false);
    const { currentDate } = useContext(CurrentDateContext);
    var Email2=Email
    const { users, team } = useContext(ListContext);
    const { tickets } = useContext(TicketsContext);
    const Router = useRouter();
    var [show, setShow] = useState('');
    var [search, setSearch] = useState('x');
    var [filteredTitle, setFilteredTitle] = useState('all');
    var [filteredStatus, setFilteredStatus] = useState('all');
    const [isOpenfilter, setIsOpenfilter] = useState(false);
    const [isOpenstatusfilter, setIsOpenstatusfilter] = useState(false);
    var [selectedValue, setSelectedValue] = useState([]);
    const [Adminname, setAdminname] = useState([]);
    const [Createdby, setCreatedby] = useState();
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
    const [isOpenDatefilter, setIsOpenDatefilter] = useState(false);
    const [teamselect, setteamselect] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [teamfilterArray, setteamfilterArray] = useState([])
    useEffect(() => {
        localStorage.setItem("passValue", false);
    }, []);
    useEffect(() => {
        setCreatedby(window.localStorage.getItem('ad_email'));
    }, []);
   
    //filter function
    useEffect(() => {
        if (filteredTitle === 'all') {
            setIsOpenfilter(false);
            setSearch("");
            setStartDate("");
            setteamselect(false)
            setIsOpenDatefilter(false);
            setteamfilterArray(tickets)
        } else {
            setIsOpenfilter(true);
        }
        setShow();
    }, [filteredTitle, tickets]);
    useEffect(() => {
        if (filteredTitle === "ticketsId") {
            setteamfilterArray(tickets)
            setteamselect(false)
            setIsOpenDatefilter(false);
        }

        if (filteredTitle === "Email") {
            setIsOpenstatusfilter(true);
            setteamfilterArray(tickets)
            setIsOpenDatefilter(false);
            setteamselect(false)
        } else {
            setIsOpenstatusfilter(false);
        }
        if (filteredTitle === "Status") {
            setIsOpenstatusfilter(true);
            setteamfilterArray(tickets)
            setIsOpenDatefilter(false);
            setIsOpenfilter(false)
            setteamselect(false)
        }
        if (filteredTitle === "Date") {
            setIsOpenDatefilter(true);
            setIsOpenfilter(false);
            setteamselect(false)
            setteamfilterArray(tickets)
        }

        if (filteredTitle === "Team Member") {
            setIsOpenDatefilter(false);
            setIsOpenfilter(false);
            setteamselect(true)
        }
    }, [filteredTitle, tickets]);
    //page access
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'));
        if (window.localStorage.getItem('loggedin') === "false") {
            Router.push("/");
        } else if (window.localStorage.getItem('loggedin') === null) {
            Router.push("/");
        }
    }, []);
    //get email details
    function updateemail(ticketsId, Username, Email) {
        setName(Username);
        setEmail(Email)
        setTicketid(ticketsId);
    };
    //final Status
   
    function finalStatus(ticketsId, Status,Email) {
        const messageHtml = renderEmail(<TicketCompletedBody name={Email} TicketNo={ticketsId} />)
        setloader(true)
        console.log(ticketsId, Status, currentDate, Createdby)
        if (Status === "completed") {
            Axios.put(`https://mindmadetech.in/api/tickets/status/finalupdate/${ticketsId}`, {
                Status: selectedstatus,
                FinalUpdate_CreatedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
                FinalUpdate_CreatedBy: Createdby
            }).then((response) => {
                setShow("updated Successfully");
                setdialogformopen("true");
                setTesting(true)
                setshowvalue("Submitted Successfully");
                setloader(false)
                if (sendmail === "true") {
                    Email2.send({
                        Host: "mindmadetech.in",
                        Username: "_mainaccount@mindmadetech.in",
                        Password: "1boQ[(6nYw6H.&_hQ&",
                        To: Email,
                        From: "karthickraja@mindmade.in",
                        Subject: "MindMade Support",
                        Body: messageHtml
                    }).then(
                        message => console.log(message)
                    );
                };
            })
                .catch((err) => {
                    setTesting(true)
                    setshowvalue(1 + "Submission Failed");
                    setdialogformopen("true");
                    setloader(false)
                })
        } else {
            setTesting(true)
            setshowvalue(1 + "Ticket is not Done");
            setloader(false)
        }
    }
    useEffect(() => {
        const Timer = setTimeout(() => {
            setShowmailstatus();
        }, [4000]);
        return () => {
            clearTimeout(Timer);
        }
    }, [])
    function handlestatus(e) {
        setSelectedstatus(e.target.value);
    };
    //Notification update
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
    //ticket Team assign function
    const teamId = designTeamList.map((o) => JSON.stringify(o));
    function handleUpdate(ticketsId) {
        console.log(ticketsId)
        setloader(true)
        const messageHtml2 = renderEmail(<TicketAssignedBody  TicketNo={ticketsId} />)
        Axios.post(`https://mindmadetech.in/api/tickets/team/update`, {
            teamId: teamId,
            ticketsId: ticketsId,
            Adm_UpdatedBy: Createdby,
            Adm_UpdatedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
        }).then((_response) => {
            setdialogformopen("true")
            localStorage.setItem("passValue", true);
            setTesting(true)
            setshowvalue("Assigned Successfully");
            setdesignTeamList([])
            setloader(false)
            {
                team.filter(val => {
                    for (let i = 0; i <= 20; i++) {
                        if (val.teamId === designTeamList[i]) {
                            return val;
                        }
                    }
                }).map((product) =>
                    Email.send({
                        Host: "mindmadetech.in",
                        Username: "_mainaccount@mindmadetech.in",
                        Password: "1boQ[(6nYw6H.&_hQ&",
                        To: product.Email,
                        From: "support@mindmade.in",
                        Subject: "MindMade Support",
                        Body: messageHtml2
                    }).then(
                        message => console.log(message)
                    )
                )
            }
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
    var idmailticket
    function reassign(TeamAssign, ticketsId) {
        var idmailticket = ticketsId
        var TeamList = [...designTeamList]
        TeamAssign.map((product) => {
            TeamList.push(product.teamId)
        })
        setdesignTeamList(TeamList)
    }
   
    function ReassignTicket(ticketsId) {
        const messageHtml1 = renderEmail(<TicketAssignedBody  TicketNo={ticketsId} />)
        setloader(true)
        console.log(ticketsId)
        Axios.put(`https://mindmadetech.in/api/tickets/team/reassign`, {
            ticketsId: ticketsId,
            Adm_ModifiedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
            Adm_ModifiedBy: Createdby,
            Isdeleted: "y"
        }).then((response) => {
            if (response.data.statusCode === 200) {
                console.log("deleted")
                Axios.post(`https://mindmadetech.in/api/tickets/team/update`, {
                    teamId: teamId,
                    ticketsId: ticketsId,
                    Adm_UpdatedBy: Createdby,
                    Adm_UpdatedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
                }).then((_response) => {
                    setdialogformopen("true")
                    localStorage.setItem("passValue", true);
                    setTesting(true)
                    setshowvalue("Re Assigned Successfully");
                    setdesignTeamList([])
                    setloader(false)
                    {
                        team.filter(val => {
                            for (let i = 0; i <= 20; i++) {
                                if (val.teamId === designTeamList[i]) {
                                    return val;
                                }
                            }
                        }).map((product) =>
                            Email.send({
                                Host: "mindmadetech.in",
                                Username: "_mainaccount@mindmadetech.in",
                                Password: "1boQ[(6nYw6H.&_hQ&",
                                To: product.Email,
                                From: "support@mindmade.in",
                                Subject: "MindMade Support",
                                Body: messageHtml1
                            }).then(
                                message => console.log(message)
                            )
                        )
                    }
                })
                    .catch((err) => {
                        setTesting(true)
                        setshowvalue(1 + "Re Assigned Failed");
                        return err;
                    })
            } else {
                console.log("not deleted")
            }
        })
            .catch((err) => {
                setTesting(true)
                setshowvalue(1 + "Assigned Failed");
                return err;
            })
    }
    function SelectTeamMember(Email) {
        Axios.get(`https://mindmadetech.in/api/tickets/teamtickets/${Email}`)
            .then((res) =>
                setteamfilterArray(res.data)
                // console.log(res.data)
            )
            .catch((err) => { return err; })
    }
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            {showdetails === false ?
                <div className="userbody">
                    <div className='header-user'>
                        <div><h1>TICKETS </h1></div>
                        <div className='filter-head flex'>
                            <select className='filter-select' onChange={(e) => setFilteredTitle(e.target.value)}>
                                <option value="all">All</option>
                                <option value="ticketsId">Tickets Id</option>
                                <option value="Email">Email</option>
                                <option value="Date">Date</option>
                                <option value="Status">Status</option>
                                <option value="Team Member">Team Member</option>
                            </select>
                            {isOpenfilter && (
                                <input className='filter-select ms-1' placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                            )}
                            {isOpenstatusfilter && (
                                <select className='filter-select' onChange={(e) => setFilteredStatus(e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="new">new</option>
                                    <option value="started">started</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Done</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            )}
                            {isOpenDatefilter && (
                                <DatePicker
                                    dateFormat="dd-MM-yyyy"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    isClearable
                                    placeholderText="DD-MM-YYYY"
                                />
                            )}
                            {teamselect && (
                                <select className='filter-select' onClick={(e) => SelectTeamMember(e.target.value)} >
                                    {team.map((item) =>
                                        <option key={item.Email} value={item.Email}  >{item.Email}</option>
                                    )}
                                </select>
                            )
                            }
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell  >TICKETS ID</TableCell>
                                    <TableCell align="left">EMAIL</TableCell>
                                    <TableCell align="left">DATE</TableCell>
                                    <TableCell align="left">TEAM</TableCell>
                                    <TableCell align="left">STATUS</TableCell>
                                </TableRow>
                            </TableHead>
                            {teamfilterArray
                                .filter(val => {
                                    if (search === " ") {
                                        return val;
                                    } else {
                                        if (filteredTitle === "all") {
                                            return val
                                        } else if (filteredTitle === "ticketsId") {
                                            if (search === '' || search === ' ') {
                                                return val
                                            } else {
                                                if (val.ticketsId.toString() === search.toString()) {
                                                    return val
                                                }
                                            }
                                        } else if (filteredTitle === "Email") {
                                            if (search === " ") {
                                                return val.Email.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes(`${filteredStatus}`)
                                            }
                                            else if (filteredStatus === "all") {
                                                return val.Email.toLowerCase().includes(search.toLowerCase())
                                            } else if (filteredStatus === "started") {
                                                return val.Email.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('started')
                                            } else if (filteredStatus === "new") {
                                                return val.Email.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('new')
                                            } else if (filteredStatus === "inprogress") {
                                                return val.Email.toLowerCase().includes(search.toLowerCase()) && val.Status.toLowerCase().includes('inprogress')
                                            } else if (filteredStatus === "completed") {
                                                return val.Email.toLowerCase().includes(search.toLowerCase()) && val.Status.includes('completed')
                                            } else if (filteredStatus === "Completed") {
                                                return val.Email.toLowerCase().includes(search.toLowerCase()) && val.Status.includes('Completed')
                                            } else return val;
                                        } else if (filteredTitle === "Status") {
                                            if (filteredStatus === "all") {
                                                return val;
                                            } else if (filteredStatus === "started") {
                                                return val.Status.toLowerCase().includes('started')
                                            } else if (filteredStatus === "new") {
                                                return val.Status.toLowerCase().includes('new')
                                            } else if (filteredStatus === "inprogress") {
                                                return val.Status.toLowerCase().includes('inprogress')
                                            } else if (filteredStatus === "completed") {
                                                return val.Status.includes('completed')
                                            } else if (filteredStatus === "Completed") {
                                                return val.Status.includes('Completed')
                                            } else return val;
                                        } else if (filteredTitle === "Date") {
                                            if (startDate === "" || startDate === Date.now() || startDate === undefined || startDate === null) {
                                                return val
                                            } else if (val.Cus_CreatedOn !== null) {
                                                if (val.Cus_CreatedOn.toString().includes(format((startDate), 'dd-MM-yyyy'))) {
                                                    return val
                                                }
                                            } else if (val.Adm_CreatedOn !== null) {
                                                return val.Adm_CreatedOn.toString().includes(format((startDate), 'dd-MM-yyyy'))
                                            }
                                        } else if (filteredTitle === "Email") {
                                            if (filteredStatus === "inprogress") {
                                                //return val.Status.toLowerCase().includes("inprogress")
                                            } else if (filteredStatus === "completed") {
                                                // return val.Status.toLowerCase().includes("completed")
                                            } else return val;
                                        } else if (filteredTitle === "Team Member") {
                                            return selectedValue

                                        }
                                    }
                                })
                                .reverse().slice((currentpage - 1) * datalimit, currentpage * datalimit).map((tickets) =>
                                    <TableBody className='update-right' key={tickets.ticketsId}>
                                        <TableRow className={tickets.Notification === "unseen" ? "highlighted-row" : "tickets-bodyrow"} onClick={() => Notificationupdate(tickets.ticketsId, tickets.Screenshots, tickets.TeamAssign)}>
                                            <TableCell >{tickets.ticketsId}</TableCell>
                                            <TableCell className='table_spacing' >{tickets.Email}</TableCell>
                                            <TableCell className='table_spacing' >{tickets.Cus_CreatedOn === null ? <>{tickets.Adm_CreatedOn}</> : <>{tickets.Cus_CreatedOn}</>}</TableCell>
                                            <TableCell className='table_spacing' >{tickets.TeamAssign.length <= 0 ? <>Not Assigned</> : <ViewTeam teamArray={tickets.TeamAssign} />}</TableCell>
                                            <TableCell > {tickets.Status === "completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>}
                                            </TableCell>
                                        </TableRow>
                                        <div className='updateadminpage flex'>
                                            <FormDialog
                                                closebuttonsec="display-non"
                                                dialog_className="Assign-team-dailog"
                                                dialogtitle={<div onClick={() => reassign(tickets.TeamAssign, tickets.ticketsId)} ><div onClick={() => setselectTeam("x")}>{tickets.TeamAssign.length <= 0 ? <> Assign</> : <>Re Assign</>}</div> </div>}
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
                                                            {loader === false ? <><Button onClick={() => setdesignTeamList([]) & setdialogformopen("true")}>Cancel</Button>
                                                                {tickets.TeamAssign.length <= 0 ? <><Button className="me-3" onClick={() => handleUpdate(tickets.ticketsId)}>Assign</Button></> : <buttun className="btn2 mt-3 mb-3" onClick={() => ReassignTicket(tickets.ticketsId)}>Re Assign</buttun>}
                                                            </> : <> <CircularProgress className="float-end" size={25} /></>}
                                                        </div>
                                                    </div>
                                                }
                                            />
                                            <FormDialog
                                                dialog_className="send-email-dailog"
                                                dialogtitle={<a onClick={() => updateemail(tickets.ticketsId, tickets.Username, tickets.Email)}><EmailIcon /></a>}
                                                className=""
                                                dialogbody={
                                                    <div className="form dialog emaildialog">
                                                        <div className="form-group">
                                                            <div className="form-header">
                                                                <h1>Status Final Update</h1>
                                                            </div>
                                                            <select className="form-input mt-3" onChange={handlestatus}>
                                                                <option value="">--Select Status--</option>
                                                                <option className='Completed' value="Completed">Completed</option>
                                                            </select>
                                                            <div className='flex'>
                                                                <input className="form-check-input" type="checkbox" value="true" onChange={(e) => setsendmail(e.target.value)} />
                                                                <div>Send mail to Client</div>
                                                                {showmailstatus}
                                                            </div>
                                                        </div>
                                                        {loader === false ? <>  <button className="btn2 float-end mt-3 mb-3" onClick={() => finalStatus(tickets.ticketsId, tickets.Status,tickets.Email)}>Update</button></> : <> <CircularProgress className="float-end" size={25} /></>}
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </TableBody>
                                )}
                        </Table>
                    </TableContainer>
                    {tickets.length < 10 ? <></> :
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
                                <Typography>Tickets per page</Typography>
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