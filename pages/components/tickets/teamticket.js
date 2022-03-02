import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import { useRouter } from 'next/router'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Ticketviewer from '../common/ticketviewer';
import { CounterContext } from '../contex/adminProvider';
import { CurrentDateContext } from '../contex/currentdateProvider';
import ViewTeam from '../common/view_team';
import { ListContext } from '../contex/ListProvider';


function Teamticket(props) {
    const { team } = useContext(ListContext);
    const { setdialogformopen,setTesting,setshowvalue } = useContext(CounterContext);
    const { currentDate } = useContext(CurrentDateContext);
    const { teamticket,loginTmName } = props;
    const [mapteamticket, setmapteamticket] = useState([]);
    const Router = useRouter();
    var [show, setShow] = useState('');
    var [selectedstatus, setSelectedstatus] = useState('');
    const [disabled, setdisabled] = useState("enable");
    const [login, setLogin] = useState();
    const [dticketsId, setdticketsId] = useState("");
    const [dticketsscreenshots, setdticketsscreenshots] = useState("");
    const [showdetails, setShowdetails] = useState(false);

    function handlestatus(e) {
        setSelectedstatus(e.target.value);
    };
    
    //tickets status update functions 
    const updateemail = (Status) => {
        if (Status === "Completed") {
            setdisabled("disabled");
        } else {
            setdisabled("enable");
        }
    };
   
    //status submit function
    function handleUpdatestatus(ticketsId,TeamAssign) {
       var teamId = team.filter(Id=>{
           if(Id.Username.includes(loginTmName)){
               return Id;
           }
        }).map(team=>{
            return team.teamId
        });
       var tickets_assignId = TeamAssign.filter(id=>{
           if(id.teamId.toString().includes(teamId[0].toString())){
               return id;
           }
        }).map(assign=>{
            return assign.tickets_assignId;
        })
        
        if (selectedstatus === 'started') {
            Axios.put(`https://mindmadetech.in/api/tickets/status/update`, {
                Status: selectedstatus,
                ticketsId: ticketsId,
                tickets_assignId : tickets_assignId[0],
                Tm_Start_UpdatedOn: currentDate,
                Tm_Start_UpdatedBy: window.localStorage.getItem('tm_name')
            }).then((response) => {
                setShow("updated Successfully");
                setdialogformopen("true");
                localStorage.setItem("passValue", true);
                setTesting(true)
                setshowvalue("Registered Successfully");
            }).catch((err) => {
                setTesting(true)
                setshowvalue(1+"Registered failed");
                return err; })
        } else if (selectedstatus === 'inprogress') {
            Axios.put(`https://mindmadetech.in/api/tickets/status/update`, {
                Status: selectedstatus,
                ticketsId: ticketsId,
                tickets_assignId : tickets_assignId[0],
                Tm_Process_UpdatedOn: currentDate,
                Tm_Process_UpdatedBy: window.localStorage.getItem('tm_name')
            }).then((response) => {
                setShow("updated Successfully");
                setdialogformopen("true");
                localStorage.setItem("passValue", true);
                setTesting(true)
                setshowvalue("Registered Successfully");
            }).catch((err) => { 
                setTesting(true)
                setshowvalue(1+"Registered failed");
                return err; })
        } else if (selectedstatus === 'completed') {
            Axios.put(`https://mindmadetech.in/api/tickets/status/update`, {
                Status: selectedstatus,
                ticketsId: ticketsId,
                tickets_assignId : tickets_assignId[0],
                Tm_Complete_UpdatedOn: currentDate,
                Tm_Complete_UpdatedBy: window.localStorage.getItem('tm_name')
            }).then((response) => {
                setShow("updated Successfully");
                setdialogformopen("true");
                localStorage.setItem("passValue", true);
                setTesting(true)
                setshowvalue("Registered Successfully");
            }).catch((err) => { 
                setTesting(true)
                setshowvalue(1+"Registered failed");
                return err; })
        } else return null
    };

    useEffect(() => {
        const Timer = setTimeout(() => {
            setShow();
        }, [4000]);
        return () => {
            clearTimeout(Timer);
        }
    })
   
    //auth access for team ticket page
    useEffect(() => {
      
        setmapteamticket(teamticket.reverse());
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/");
        } else if (login === null) {
            Router.push("/");
        }
    }, [teamticket]);
    const Notificationupdate = (ticketsId, Screenshots) => {
        setdticketsscreenshots(Screenshots);
        setdticketsId(ticketsId);
        setShowdetails(true);
    };
    function closeDetails() {
        setShowdetails(false);
    };
    //  var [team, setTeam] = useState([]);
    //  useEffect(() => {
    //      Axios.get("https://mindmadetech.in/api/team/list")
    //          .then((res) => setTeam(res.data))
    //         .catch((err)=>{ return err; })
    //  });
    return (
        <div>
            <Head>
                <title>Team Dashboard</title>
            </Head>
            {showdetails === false ?
                <div className="teambody">
                    <div className='adminticket-head'>
                        <h1>Tickets</h1>
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
                            {mapteamticket.map((tickets) =>
                                <TableBody key={tickets.ticketsId} className='update-right' >
                                    <TableRow className="tickets-bodyrow update6" onClick={() => Notificationupdate(tickets.ticketsId, tickets.Screenshots)}>
                                        <TableCell>{tickets.ticketsId}</TableCell>
                                        <TableCell >{tickets.Username}</TableCell>
                                        <TableCell >{tickets.Cus_CreatedOn}</TableCell>
                                        <TableCell >
                                        <ViewTeam  teamArray={tickets.TeamAssign}  />
                                        </TableCell>
                                        <TableCell > {tickets.Status === "completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>}
                                        </TableCell>
                                    </TableRow>
                                    <FormDialog
                                        dialog_className="update7"
                                        dialogtitle={<div onClick={() => updateemail(tickets.Status)}>update</div>}
                                        className="btn3 ticket-update2"
                                        dialogbody={<div>{disabled === "disabled" ? <div className='ticket-update-alert'>ticket has been completed</div> :
                                            <div className="form dialog" >
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
                                                                    <option className='started' value="started">started</option>
                                                                    <option className='inprogress' value="inprogress">inprogress</option>
                                                                    <option className='completed' value="completed">completed</option>
                                                                </select>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <button className="btn2 float-end mt-3 mb-3" onClick={() => handleUpdatestatus(tickets.ticketsId,tickets.TeamAssign)}>update</button>
                                                <h4 className="alert1 text-center">{show}</h4>
                                            </div>
                                        }
                                        </div>
                                        }
                                    />
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </div>
                :
                <>
                    <Ticketviewer
                        dticketsId={dticketsId}
                        dticketsscreenshots={dticketsscreenshots}
                        closeDetails={closeDetails}
                    />
                </>
            }
        </div>
    );
}
export default Teamticket;