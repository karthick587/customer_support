import React, { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Axios from "axios";
import ViewTeam from './view_team';
import ViewScreenshots from './view_screenshots';

function Ticketviewer(props) {

    const { dticketsId, closeDetails} = props;
    const [ticket, setticket] = useState([]);
    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/tickets/list/${dticketsId}`)
            .then((res) => setticket(res.data))
            .catch((err)=>{ return err;})
    }, [setticket]);
    
    return (
        <>
            {ticket.reverse().map((tickets) =>
                <div className='ticket-details' key={tickets.ticketsId}>
                    <div className='ticket-details-head'>
                        <div className='ticket-details-head-title dash-head'>
                        <h2>TICKET'S DETAILS #{tickets.ticketsId}</h2>
                        </div>
                        
                        <div className='ticket-details-head-btn '>
                            <button className='btn2 float-end' onClick={closeDetails}>Back</button>
                        </div>
                    </div>
                    <div className='ticket-details-middle'>
                        <div className='ticket-details-middle-1'>
                            <div className='ticket-details-middle-1-1'>
                                Tickets Details
                                <div className='ticket-details-middle-1-2'>
                                {tickets.Status === "completed" ? <>Done</> : <>{tickets.Status}</>}
                                </div>
                            </div>
                            <div className='ticket-details-middle-1-3'>
                               
                                   
                                        <div className="ticket-status color-green">
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "New" ? <><div className='details-caption'>New<div className='details-caption-2'>Updated at <br />{tickets.Cus_CreatedOn}</div></div></> : <div className='details-caption-strike'>New<div className='details-caption-2'>Updated at <br />{tickets.Cus_CreatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "New" ? "ticket-status-line width-10 display-1" : "ticket-status-line width-10 display-1 color-green-line"}>
                                        </div>
                                        <div className={tickets.Status === "New" ? "ticket-status-line width-10 display-2" : "ticket-status-line width-10 display-2 color-green-line"}>
                                            |
                                        </div>
                                        <div className={tickets.Status === "started" || tickets.Status === "inprogress" || tickets.Status === "completed" || tickets.Status === "Completed" ? "ticket-status color-green" : "ticket-status"}>
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "started" ? <div className='details-caption'>Started<div className='details-caption-2'>Updated at<br /> {tickets.Tm_Start_UpdatedOn}</div></div> : <div className='details-caption-strike'>Started<div className='details-caption-2'>Updated at <br />{tickets.Tm_Start_UpdatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "New" || tickets.Status === "started" ? "ticket-status-line display-1 width-10" : "ticket-status-line width-10 display-1 color-green-line"}>
                                        </div>
                                        <div className={tickets.Status === "New" || tickets.Status === "started" ? "ticket-status-line width-10 display-2" : "ticket-status-line width-10 color-green-line display-2"}>
                                            |
                                        </div>
                                        <div className={tickets.Status === "New" || tickets.Status === "started" ? "ticket-status" : "ticket-status color-green"}>
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "inprogress" ? <div className='details-caption'>Inprogress<div className='details-caption-2'>Updated at <br />{tickets.Tm_Process_UpdatedOn}</div></div> : <div className='details-caption-strike'>Inprogress<div className='details-caption-2'>Updated at <br />{tickets.Tm_Process_UpdatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "completed" || tickets.Status === "Completed" ? "ticket-status-line width-10 display-1 color-green-line" : " ticket-status-line display-1 width-10 "}>
                                        </div>
                                        <div className={tickets.Status === "completed" || tickets.Status === "Completed" ? "ticket-status-line width-10 display-2 color-green-line" : " ticket-status-line width-10 display-2"}>
                                            |
                                        </div>
                                        <div className={tickets.Status === "completed" || tickets.Status === "Completed" ? "ticket-status  color-green" : "ticket-status"}>
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "completed" || tickets.Status === "Completed" ? <div className='details-caption'>{tickets.Status === "completed" ? <>Done</> : <>{tickets.Status}</>}<div className='details-caption-2'>Updated at <br />{tickets.Tm_Complete_UpdatedOn}</div></div> : <div className='details-caption-strike'>Completed<div className='details-caption-2'>Updated at <br />{tickets.Tm_Complete_UpdatedOn}</div></div>}
                                        </div>
                                   
                               
                            </div>
                        </div>
                        <div className='ticket-details-middle-2 row'>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Username
                                </div>
                                <div className='user-label-ticket-details'>
                                    {tickets.Username}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Ticket No
                                </div>
                                <div className='user-label-ticket-details'>
                                    {tickets.ticketsId}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Department
                                </div>
                                <div className='user-label-ticket-details'>
                                {tickets.TeamAssign.length<=0 ?<>Not assigned</>:<ViewTeam teamArray={tickets.TeamAssign} /> }
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    DomainName
                                </div>
                                <div className='user-label-ticket-details'>
                                    {tickets.DomainName}
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
                                {tickets.Description}
                            </div>
                        </div>
                        <div className='user-profile-ticket-details-2 col flex'>
                            <div>
                                <div className='label-ticket-details'>
                                    Phonenumber
                                </div>
                                <div className='ticket-input-details' >
                                    {tickets.Phonenumber}
                                </div>
                                <div className='label-ticket-details'>
                                    Date
                                </div>
                                <div className='ticket-input-details' >
                                {tickets.Cus_CreatedOn===null ? <>{tickets.Adm_CreatedOn}</>:<>{tickets.Cus_CreatedOn}</> }
                                </div>
                            </div>
                           

                        </div>
                        <div className='ticket-details-screenshot col'>
                                <div className='label-ticket-details'>
                                    Screenshot
                                </div>
                                {tickets.Files.length<=0 ?<div>No Attachments</div>
                                 :
                                <ViewScreenshots FileArray={tickets.Files} />
                                }
                                
                            </div>
                    </div>


                </div>
            )}
        </>
    );
}
export default Ticketviewer;