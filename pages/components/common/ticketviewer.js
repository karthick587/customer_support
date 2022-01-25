import React, { useState,useEffect } from 'react';
import Imageviewer from '../common/imageviewer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Axios from "axios";


function Ticketviewer(props) {
    const { dticketsId,closeDetails
}=props
const[ticket,settickets]=useState([])
useEffect(() => {
    Axios.get(`https://mindmadetech.in/api/tickets/list/${dticketsId}`)
        .then((res) => settickets(res.data))
}, [ticket]);
  return (
      <>
    {ticket.map((tickets) =>
    <div className='ticket-details'>
                    <div className='ticket-details-head'>
                        viewing Support Ticket #{tickets.ticketsId}
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
                                {tickets.Status}
                            </div>
                            <div className='ticket-details-middle-1-3'>
                                <div className=''>
                                
                                    <div className='flex'>
                                        <div className="ticket-status color-green">
                                        <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "New" ? <><div className='details-caption'>New<div className='details-caption-2'>Updated at <br />{tickets.Cus_CreatedOn}</div></div></> : <div className='details-caption-strike'>New<div className='details-caption-2'>Updated at <br />{tickets.Cus_CreatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "New" ? "ticket-status-line width-10" : "ticket-status-line width-10 color-green-line"}>

                                        </div>
                                        <div className={tickets.Status === "started" || tickets.Status === "inprogress" || tickets.Status === "completed" ? "ticket-status color-green" : "ticket-status"}>
                                        <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "started" ? <div className='details-caption'>Started<div className='details-caption-2'>Updated at<br /> {tickets.Tm_Start_UpdatedOn}</div></div> : <div className='details-caption-strike'>Started<div className='details-caption-2'>Updated at <br />{tickets.Tm_Start_UpdatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "New" || tickets.Status === "started" ? "ticket-status-line width-10" : "ticket-status-line width-10 color-green-line"}>

                                        </div>
                                        <div className={tickets.Status === "New" || tickets.Status === "started" ? "ticket-status" : "ticket-status color-green"}>
                                        <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "inprogress" ? <div className='details-caption'>Inprogress<div className='details-caption-2'>Updated at <br />{tickets.Tm_Process_UpdatedOn}</div></div> : <div className='details-caption-strike'>Inprogress<div className='details-caption-2'>Updated at <br />{tickets.Tm_Process_UpdatedOn}</div></div>}
                                        </div>
                                        <div className={tickets.Status === "completed" ? "ticket-status-line width-10 color-green-line" : " ticket-status-line width-10 "}>

                                        </div>
                                        <div className={tickets.Status === "completed" ? "ticket-status  color-green" : "ticket-status"}>
                                            <div className='ticket-icon'><CheckCircleIcon /></div>
                                            {tickets.Status === "completed" ? <div className='details-caption'>Completed<div className='details-caption-2'>Updated at <br />{tickets.Tm_Complete_UpdatedOn}</div></div> : <div className='details-caption-strike'>Completed<div className='details-caption-2'>Updated at <br />{tickets.Tm_Complete_UpdatedOn}</div></div>}
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
                                    {tickets.Username}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Ticket NO
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
                                    {tickets.Team}
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
                            <div className='width-20'>
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
                                    {tickets.Cus_CreatedOn}
                                </div> 

                            </div>
                            <div className='ticket-details-screenshot'>
                                <div className='label-ticket-details'>
                                    Screenshot
                                </div>
                                
                                <Imageviewer
                                    imgdialogbutton={<img src={tickets.Screenshots} alt="screenshots" width={200} height={100} />}
                                    imgdialogbody={<img className='screeshot-img-viewer' src={tickets.Screenshots} alt="screenshots" />}
                                />
                            </div>
                        </div>
                    </div>


                </div>
                )}
                </>
  );
}
export default Ticketviewer;