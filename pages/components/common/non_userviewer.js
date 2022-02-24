import React, { useState, useEffect } from 'react';
import Imageviewer from '../common/imageviewer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Axios from "axios";

function Non_userTickets(props) {

    const { registerId, closeDetails} = props;
   
    const [nonUserDetails, setNonUserDetails] = useState([]);
    // const [mimetype, setMimetype] = useState('');
    // const[downloadlink,setdownloadlink]=useState()

    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/unregisteredcustomer/list/${registerId}`)
            .then((res) => setNonUserDetails(res.data))
            .catch((err)=>{ return err;})
    }, [setNonUserDetails]);
    
    // useEffect(() => {
    //     setMimetype(dticketsscreenshots.slice(dticketsscreenshots.length - 4));
    // },[setMimetype]);

    // const downloadimg= (Screenshots) =>{
    //     setdownloadlink(`https://mindmadetech.in/download/${Screenshots.slice(38,100)}`);  
    // };
    
    return (
        <>
            {nonUserDetails.reverse().map((nonuser) =>
                <div className='ticket-details' key={nonuser.registerId}>
                    <div className='ticket-details-head'>
                        viewing Unregistered Customer Details
                        <div className='ticket-details-head-btn '>
                            <button className='btn2' onClick={closeDetails}>Back</button>
                        </div>
                    </div>
                    <div className='ticket-details-middle'>
                        {/* <div className='ticket-details-middle-1'>
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
                        </div> */}
                        <div className='ticket-details-middle-2 row'>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    ID
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.registerId}
                                </div>
                            </div>

                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Companyname
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Companyname}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Clientname
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Clientname}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Email Id
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Email}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='user-profile-ticket-details row'>
                    <div className='ticket-details-screenshot col'>
                                <div className='label-ticket-details'>
                                    Logo
                                </div>
                                    <Imageviewer
                                        imgdialogbutton={<img src={nonuser.Logo}  alt="screenshots" width={200} height={100} />}
                                        imgdialogbody={<img className='screeshot-img-viewer' src={nonuser.Logo} alt="screenshots" />}
                                    /> 
                        </div> 
                        <div className='user-profile-ticket-details-2 col flex'>
                            <div>
                                <div className='label-ticket-details'>
                                    Phonenumber
                                </div>
                                <div className='ticket-input-details' >
                                    {nonuser.Phonenumber}
                                </div>
                                <div className='label-ticket-details'>
                                    Date
                                </div>
                                <div className='ticket-input-details' >
                                    {nonuser.CreatedOn}
                                </div>
                            </div>
                        </div>
                       
                        <div className='user-profile-ticket-details-1 col'>
                        <div className='col'>
                                <div className='label-ticket-details'>
                                    DomainName
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.DomainName}
                                </div>
                            </div>
                            <div className='label-ticket-details'>
                                Description
                            </div>
                            <div className='ticket-input-details' >
                                {nonuser.Description}
                            </div>
                        </div>
                            </div>
                            
                        </div>
            )}
        </>
    );
}
export default Non_userTickets;