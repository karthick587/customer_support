import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import { useRouter } from 'next/router'
import Imageviewer from '../common/imageviewer'
function Teamticket() {
    const Router = useRouter()
    var [show, setShow] = useState('');
    var [tickets, setTickets] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data));
    }, [tickets]);
    var [selectedstatus, setSelectedstatus] = useState('');
    function handlestatus(e) {
        setSelectedstatus(e.target.value)
    }
    const[disabled,setdisabled]=useState()
   
       

    const updateemail=(Status)=>{
       
     if(Status==="completed"){
        setdisabled("disabled")
     }else{
        setdisabled("undisabled")
     }      
    }
   
      function handleUpdatestatus(ticketsId,timeline){
        Axios.put(`https://mindmadetech.in/api/tickets/updatestatus/${ticketsId}`, {
            Status: selectedstatus,
            ticketsId: ticketsId,
            statusUpdateTime: fulldate + ' ' + fullTime
        }).then((response) => {
            setShow("update Successfully");
            localStorage.setItem('updateclose', "close");
        });
        if(selectedstatus==="started"){
            Axios.put(`https://mindmadetech.in/api/tickets/updatetimeline/${ticketsId}`, {
                timeline: fulldate + ' ' + fullTime,
                ticketsId: ticketsId,
            })
        } else if(selectedstatus==="completed"){
            Axios.put(`https://mindmadetech.in/api/tickets/updatetimeline/${ticketsId}`, {
                timeline: timeline+ ' to ' +fulldate + ' ' + fullTime,
                ticketsId: ticketsId,
            })
      }
    }
    setTimeout(() => {
        setShow()
    }, [3500])
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
    var [teamname, setTeamname] = useState(" ");
    var [search1, setSearch1] = useState('');
    useEffect(() => {
        setSearch1(window.localStorage.getItem('tm_name'))
    })
    var [team, setTeam] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/team/list")
            .then((res) => setTeam(res.data));
    }, [team]);
    useEffect(() => {
        {
            team.filter(val => {
                return val.Username.toLowerCase().includes(search1)
            }).map((item) => setTeamname(item.Team),
            )
        }
        localStorage.setItem('updateclose', "open");
      
    })
    const [login, setLogin] = useState()
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'))
        if (login === "false") {
            Router.push("/")
        } else if (login === null) {
            Router.push("/")
        }
    })
    //emailjs
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="teambody">
                <div className='adminticket-head'>
                    <h1>Tickets</h1>
                </div>
                <TableContainer component={Paper}>
                    <div className='tickets-bodyrow3'>
                        <div >TicketId</div>
                        <div>Username</div>
                        <div >Date</div>
                        <div>Team</div>
                        <div>Status</div>
                    </div>
                    {tickets.filter(val => {
                        return val.Team.toLowerCase().includes(teamname.toLowerCase())
                    }).map((tickets) =>
                        <div key={tickets.ticketsId} className='tickets-table-row3'>
                            <FormDialog
                                dialogtitle={
                                    <table  >
                                        <tr className='tickets-bodyrow3' >
                                            <td>{tickets.ticketsId}</td>
                                            <td >{tickets.Username}</td>
                                            <td>{tickets.Date}</td>
                                            <td >{tickets.Team}</td>
                                            <td >
                                                <h5 className={tickets.Status}>{tickets.Status}</h5>
                                                <h5 className='statusUpdateTime'>Updated at {tickets.statusUpdateTime}</h5>
                                            </td>
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
                                            <div  >Updated at {tickets.statusUpdateTime}</div>
                                            <div className={tickets.Status} > {tickets.Status}</div>
                                        </div>
                                        <div className='ticket details-Team' ><label className="label">Team</label>
                                            <div className='ticket-input-details' > {tickets.Team}</div>
                                        </div>
                                        <Imageviewer
                                            imgdialogbutton={<img src={tickets.Screenshots} alt="screenshots" width={60} height={40} />}
                                            imgdialogbody={<img className='screeshot-img-viewer' src={tickets.Screenshots} alt="screenshots" />}
                                        />
                                    </div>
                                }
                            />
                            <FormDialog
                                dialogtitle={<div  onClick={() => updateemail(tickets.Status)}>update</div>}
                                className="btn3 ticket-update2"
                                dialogbody={ <>   {disabled==="disabled" ? <div className='ticket-update-alert'>ticket has been completed</div>:
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
                                        <button className="btn2 float-end mt-3 mb-3" onClick={() => handleUpdatestatus(tickets.ticketsId,tickets.timeline)}>update</button>
                                        <h4 className="alert1 text-center">{show}</h4>
                                    </div>
                                       }  
                                       </> 
                                }
                            />
                        </div>
                    )}
                </TableContainer>
            </div>
        </div>
    );
}
export default Teamticket;
