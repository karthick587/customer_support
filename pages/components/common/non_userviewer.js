import React, { useState, useEffect, useContext } from 'react';
import Imageviewer from '../common/imageviewer';
import Axios from "axios";
import FormDialog from '../common/dialogsform';
import { Button, Typography } from '@mui/material';
import { CounterContext } from '../contex/adminProvider';
import { CircularProgress } from '@mui/material';
import { renderEmail } from 'react-html-email'
import NonUserCreatedBody from '../utils/nonUserCreatedBody';
import moment from 'moment';
function Non_userviewer(props) {
    const { setdialogformopen, setTesting, setshowvalue, Email } = useContext(CounterContext);
    const { registerId, closeDetails } = props;
    const [nonUserDetails, setNonUserDetails] = useState([]);
    const [loader, setloader] = useState(false);

    useEffect(() => {
        Axios.get(`https://mindmadetech.in/api/unregisteredcustomer/list/${registerId}`)
            .then((res) => setNonUserDetails(res.data))
            .catch((err) => { return err; })
    }, [setNonUserDetails, nonUserDetails, registerId]);

    function handleRejection(Id) {
        setloader(true);
        Axios.put(`https://mindmadetech.in/api/unregisteredcustomer/statusupdate/${Id}`, {
            Status: "Rejected",
            Adm_UpdatedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
            Adm_UpdatedBy: window.localStorage.getItem('ad_email')
        }).then((response) => {
            setTesting(true)
            setshowvalue(response.data.message)
            setdialogformopen("true");
            setloader(false);
            }).catch((err)=>{
                return err;
            })
    }



    function handleApproval(nonuser) {
        setloader(true);
        const messageHtml = renderEmail(<NonUserCreatedBody name={nonuser.Clientname} email={nonuser.Email} password={nonuser.Password} />)

        const data = new FormData();
        data.append("Companyname", nonuser.Companyname);
        data.append("Clientname", nonuser.Clientname);
        data.append("Email", nonuser.Email);
        data.append("Phonenumber", nonuser.Phonenumber);
        data.append("Password", nonuser.Password);
        data.append("Logo", nonuser.Logo);
        data.append("CreatedOn", moment(new Date()).format('DD-MM-YYYY hh:mm A'));
        data.append("CreatedBy", window.localStorage.getItem('ad_email'))
        Axios.post(`https://mindmadetech.in/api/customer/new`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            if (response.data.statusCode === 400) {
                setTesting(true)
                setshowvalue(1 + response.data.message)
                setdialogformopen("true")
                setloader(false);
                return null;
            } else {
                setTesting(true)
                setshowvalue("Registered Successfully")
                setdialogformopen("true")
                setloader(false);
                Email.send({
                    Host: "mindmadetech.in",
                    Username: "_mainaccount@mindmadetech.in",
                    Password: "1boQ[(6nYw6H.&_hQ&",
                    To: nonuser.Email,
                    From: "support@mindmade.in",
                    Subject: "MindMade Support",
                    Body: messageHtml
                }).then(
                    message => console.log(message)
                );
                Axios.put(`https://mindmadetech.in/api/unregisteredcustomer/statusupdate/${nonuser.registerId}`, {
                    Status: "Approved",
                    Adm_UpdatedOn: moment(new Date()).format('DD-MM-YYYY hh:mm A'),
                    Adm_UpdatedBy: window.localStorage.getItem('ad_email')
                });
            }
        }).catch((err) => {
            setTesting(true)
            setshowvalue(1 + "Error");
            setloader(false);
        });
        const formData = new FormData();
        formData.append("Email", nonuser.Email);
        formData.append("Phonenumber", nonuser.Phonenumber);
        formData.append("DomainName", nonuser.DomainName);
        formData.append("Cus_CreatedOn", nonuser.CreatedOn);
        formData.append("Description", nonuser.Description);
        Axios.post("https://mindmadetech.in/api/tickets/new", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            setshowvalue("Ticket Raised  Successfully")
            setloader(false);
            return res;
        }).catch((err) => { return err });

    };

    return (
        <>
            {nonUserDetails.reverse().map((nonuser) =>
                <div className='ticket-details' key={nonuser.registerId}>
                    <div className='ticket-details-head'>
                        <div className='ticket-details-head-title dash-head'><h2>UNREGISTERED CLIENT&apos;S DETAILS</h2></div>

                        <div className='ticket-details-head-btn'>
                            <button className='btn2 float-end' onClick={closeDetails}>Back</button>
                        </div>
                    </div>
                    <div className='ticket-details-middle'>
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
                                    Company Name
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Companyname}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Client Name
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Clientname}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Email ID
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Email}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='label-ticket-details'>
                                    Phonenumber
                                </div>
                                <div className='user-label-ticket-details'>
                                    {nonuser.Phonenumber}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='user-profile-ticket-details row'>

                        <div className='user-profile-ticket-details-2 col flex'>
                            <div>
                                <div className='label-ticket-details'>
                                    Date
                                </div>
                                <div className='ticket-input-details' >
                                    {nonuser.CreatedOn}
                                </div>
                                <div className='label-ticket-details'>
                                    Domain Name
                                </div>
                                <div className='ticket-input-details' >
                                    {nonuser.DomainName}
                                </div>
                            </div>
                        </div>

                        <div className='user-profile-ticket-details-1 col'>
                            <div className='label-ticket-details' onClick={() => console.log(nonuser.Logo)}>
                                Description
                            </div>
                            <div className='ticket-input-details' >
                                {nonuser.Description}
                            </div>
                            {nonuser.Status === "Approved" || nonuser.Status === "Rejected" ? <Typography className='mt-4'>{nonuser.Status === "Approved" ? <>Approved</> : <>Rejected</>}</Typography> :
                                <div className='flex mt-4'>
                                    <FormDialog
                                        className="team-delete me-3"
                                        dialogtitle={<Button>Reject</Button>}
                                        headtitle={<div className='head-dialog'>Are you sure want to reject this ticket?</div>}
                                        dialogactions={
                                            <div>
                                                {loader === false ? <><Button onClick={() => handleRejection(nonuser.registerId)}>YES </Button>
                                                    <Button onClick={() => setdialogformopen("true")}>NO</Button></> 
                                                    : <> <CircularProgress className="float-end" size={25} /></>}
                                            </div>
                                        }
                                    />
                                    <FormDialog
                                        className="team-delete"
                                        dialogtitle={<button className='btn2'>Approve</button>}
                                        headtitle={<div className='head-dialog'>Are you sure want to Approve this ticket?</div>}
                                        dialogactions={
                                            <div>
                                                 {loader === false ? <><Button onClick={() => handleApproval(nonuser)}>YES </Button>
                                                    <Button onClick={() => setdialogformopen("true")}>NO</Button></> 
                                                    : <> <CircularProgress className="float-end" size={25} /></>}
                                            </div>
                                        }
                                    />
                                </div>
                            }


                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default Non_userviewer;