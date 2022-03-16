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
import ReactPaginate from 'react-paginate';
import { Typography } from '@mui/material';
import moment from 'moment';
function Teamticket(props) {
    const { team } = useContext(ListContext);
    const { setdialogformopen,setTesting,setshowvalue } = useContext(CounterContext);
    const { currentDate } = useContext(CurrentDateContext);
    const { teamticket,loginTmName } = props;
    const [mapteamticket, setmapteamticket] = useState([]);
    const Router = useRouter();
    var [selectedstatus, setSelectedstatus] = useState('');
    const [disabled, setdisabled] = useState("enable");
    const [login, setLogin] = useState();
    const [dticketsId, setdticketsId] = useState("");
    const [dticketsscreenshots, setdticketsscreenshots] = useState("");
    const [showdetails, setShowdetails] = useState(false);
    var [search, setSearch] = useState('');

    function handlestatus(e) {
        setSelectedstatus(e.target.value);
    };
   
    //status submit function
    function handleUpdatestatus(ticketsId,TeamAssign) {
       var teamId = team.filter(Id=>{
           if(Id.Email.includes(loginTmName)){
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
                Tm_Start_UpdatedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
                Tm_Start_UpdatedBy: window.localStorage.getItem('tm_name')
            }).then((response) => {
                setdialogformopen("true");
                localStorage.setItem("passValue", true);
                setTesting(true)
                setshowvalue("Updated Successfully");
            }).catch((err) => {
                setTesting(true)
                setshowvalue(1+"Registered failed");
                return err; })
        } else if (selectedstatus === 'inprogress') {
            Axios.put(`https://mindmadetech.in/api/tickets/status/update`, {
                Status: selectedstatus,
                ticketsId: ticketsId,
                tickets_assignId : tickets_assignId[0],
                Tm_Process_UpdatedOn:  moment(new Date()).format('DD-MM-YYYY hh:mm A'),
                Tm_Process_UpdatedBy: window.localStorage.getItem('tm_name')
            }).then((response) => {
                setdialogformopen("true");
                localStorage.setItem("passValue", true);
                setTesting(true)
                setshowvalue("Updated Successfully");
            }).catch((err) => { 
                setTesting(true)
                setshowvalue(1+"Registered failed");
                return err; })
        } else if (selectedstatus === 'completed') {
            Axios.put(`https://mindmadetech.in/api/tickets/status/update`, {
                Status: selectedstatus,
                ticketsId: ticketsId,
                tickets_assignId : tickets_assignId[0],
                Tm_Complete_UpdatedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
                Tm_Complete_UpdatedBy: window.localStorage.getItem('tm_name')
            }).then((response) => {
                setdialogformopen("true");
                localStorage.setItem("passValue", true);
                setTesting(true)
                setshowvalue("Updated Successfully");
            }).catch((err) => { 
                setTesting(true)
                setshowvalue(1+"Registered failed");
                return err; })
        } else return null
    };


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
   
    const [datalimit, setdatalimit] = useState(10);
    const [currentpage, setCurrentpage] = useState(1);
    //pagination
    function handlePageChange(pageNumber) {
        setCurrentpage(pageNumber + 1);
    };

    const pagedatalimit = (e) => {
        setdatalimit(e.target.value);
    };
    return (
        <div>
            <Head>
                <title>Team Dashboard</title>
            </Head>
            {showdetails === false ?
                <div className="teambody">
                   <div className='dash-head mt-2 mb-3 header-user'>
                        <h1>TICKETS</h1>
                        <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                            {mapteamticket.filter(val => {
                                if (search === "") {
                                    return val;
                                } else if (val.Email.toLowerCase().includes(search.toLowerCase()) ||
                                    val.Status.toLowerCase().includes(search.toLowerCase()) ||
                                    val.ticketsId.toString().toLowerCase().includes(search.toLowerCase().toString())||
                                    val.Cus_CreatedOn.toString().includes(search.toString())) {
                                    return val;
                                } else null;
                            }).slice((currentpage - 1) * datalimit, currentpage * datalimit).map((tickets) =>
                                <TableBody key={tickets.ticketsId} className='update-right' >
                                    <TableRow className="tickets-bodyrow update6" onClick={() => Notificationupdate(tickets.ticketsId, tickets.Screenshots)}>
                                        <TableCell>{tickets.ticketsId}</TableCell>
                                        <TableCell >{tickets.Email}</TableCell>
                                        <TableCell >{tickets.Cus_CreatedOn===null ? <>{tickets.Adm_CreatedOn}</>:<>{tickets.Cus_CreatedOn}</> }</TableCell>
                                        <TableCell >
                                        <ViewTeam  teamArray={tickets.TeamAssign}  />
                                        </TableCell>
                                        <TableCell > {tickets.Status === "completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>}
                                        </TableCell>
                                    </TableRow>
                                    <FormDialog
                                        dialog_className="update7"
                                        dialogtitle={<div>update</div>}
                                        className="btn3 ticket-update2"
                                        dialogbody={<div>{tickets.Status==="Completed" ? <div className='ticket-update-alert'>Ticket has been completed</div> :
                                            <div className="form dialog" >
                                                <div className="form-toggle"></div>
                                                <div className="form-panel update one">
                                                    <div className="form-header">
                                                        <h1>Update Ticket {tickets.ticketsId}</h1>
                                                    </div>
                                                    <div className="addform">
                                                        <form>
                                                            <div className="form-group">
                                                                <label className="label">Status</label>
                                                                <select className="form-input" onChange={handlestatus}>
                                                                    <option value="">--Select Status--</option>
                                                                   {tickets.Status==="started"||tickets.Status==="inprogress"||tickets.Status==="completed" ? <></>:<option className='started' value="started">started</option>}
                                                                   {tickets.Status==="inprogress"||tickets.Status==="completed"|| tickets.Status==="new" ? <></>:<option className='inprogress' value="inprogress">inprogress</option>}
                                                                   {tickets.Status==="started"||tickets.Status==="completed"|| tickets.Status==="new" ? <></>:<option className='completed' value="completed">completed</option>}
                                                                </select>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <button className="btn2 float-end mt-3 mb-3" onClick={() => handleUpdatestatus(tickets.ticketsId,tickets.TeamAssign)}>update</button>                                  
                                            </div>
                                        }
                                        </div>
                                        }
                                    />
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                    {mapteamticket.length<10 ? <></>:
                     <div className='page-bottom'>
                     < ReactPaginate
                         previousLabel={""}
                         nextLabel={""}
                         pageCount={Math.ceil(mapteamticket.length / datalimit)}
                         onPageChange={(e) => handlePageChange(e.selected)}
                         containerClassName={"pagination mt-3"}
                         pageClassName={"page-item"}
                         pageLinkClassName={"page-link"}
                         activeClassName={"active"}
                     />
                     <div className='pagedata-limit flex'>
                         <Typography>Team per page</Typography>

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