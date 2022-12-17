import React, { useEffect, useState, useRef, useContext } from "react";
import Axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { CounterContext } from "../contex/adminProvider";
import { CurrentDateContext } from '../contex/currentdateProvider';
import { renderEmail } from 'react-html-email';
import AdminTicketsBody from '../utils/adminTicketsBody';
import moment from "moment";
export default function Adminissues(props) {
    const { setTesting, setshowvalue,Email } = useContext(CounterContext)
    const [loader, setloader] = useState(false);
    const [show, setShow] = useState('');
    const EmailR = useRef();
    const PhonenumberR = useRef();
    const DomainnameR = useRef();
    const DescriptionR = useRef();
    const FileR = useRef();
    const [Createdby, setCreatedby] = useState('');
    const [Logo, setLogo] = useState('x');
    useEffect(() => {
        setCreatedby(window.localStorage.getItem('user'));
    }, []);
    
    function handleScreenshot(e) {
        setLogo(e.target.files);
    };
    function addIssues() {
        setloader(true);
        const EmailValidate = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if(EmailR.current.value!=="" && PhonenumberR.current.value!=="" && DomainnameR.current.value!=="" && DescriptionR.current.value!==""){
            const messageHtml = renderEmail(<AdminTicketsBody />)
            if(!EmailValidate.test(String(EmailR.current.value).toLowerCase())){
                setShow("Invalid Email");
                setloader(false);
            }else{
                if (Logo!=="x") {
                    const data = new FormData();
                    data.append("Email", EmailR.current.value);
                    data.append("Phonenumber", PhonenumberR.current.value);
                    data.append("DomainName", DomainnameR.current.value);
                    data.append("Description", DescriptionR.current.value);
                    data.append("Adm_CreatedOn", moment(new Date()).format('DD-MM-YYYY hh:mm A'));
                    data.append("Adm_CreatedBy", Createdby);
                    data.append("Cus_CreatedOn", "null")
                    for (let i = 0; i < Logo.length; i++) {
                        data.append("files", Logo[i]);
                    }
                    Axios.post("https://mindmadetech.in/api/tickets/new", data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }).then((res) => {
                        if(res.data.statusCode === 200){
                            setTesting(true)
                            setshowvalue(res.data.message);
                            setloader(false);
                            setShow("")
                            Email.send({
                                Host: "mindmadetech.in",
                                Username: "_mainaccount@mindmadetech.in",
                                Password: "1boQ[(6nYw6H.&_hQ&",
                                To: EmailR.current.value,
                                From: "support@mindmade.in",
                                Subject: "MindMade Support",
                                Body: messageHtml
                            }).then(
                                message => { return message; }
                            );
                            EmailR.current.value = " ";
                            PhonenumberR.current.value = " ";
                            DomainnameR.current.value = " ";
                            DescriptionR.current.value = " ";
                            FileR.current.value = null;
                        }else{    
                            setloader(false);
                            setTesting(true)
                            setshowvalue(1+res.data.message); 
                            setShow("");
                            }
                        
                    }).catch((err) => {
                        setTesting(true)
                        setshowvalue(1+"Submission failled");
                        setloader(false);
                        setShow("");
                    })
                } else {
                    const data = new FormData();
                    data.append("Email", EmailR.current.value);
                    data.append("Phonenumber", PhonenumberR.current.value);
                    data.append("DomainName", DomainnameR.current.value);
                    data.append("Description", DescriptionR.current.value);
                    data.append("Adm_CreatedOn", moment(new Date()).format('DD-MM-YYYY hh:mm A'));
                    data.append("Adm_CreatedBy", Createdby);
                    data.append("Cus_CreatedOn", "null")
        
                    Axios.post("https://mindmadetech.in/api/tickets/new", data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }).then((res) => {
                        if(res.data.statusCode === 400){
                            setloader(false);
                            setTesting(true)
                            setshowvalue(1+res.data.message); 
                            setShow("");
                        }else{
                            setTesting(true)
                            setshowvalue("Submitted Successfully");
                            setloader(false);
                            setShow("");
                            Email.send({
                                Host: "mindmadetech.in",
                                Username: "_mainaccount@mindmadetech.in",
                                Password: "1boQ[(6nYw6H.&_hQ&",
                                To: EmailR.current.value,
                                From: "support@mindmade.in",
                                Subject: "MindMade Support",
                                Body: messageHtml
                            }).then(
                                message => { return message; }
                            );
                            EmailR.current.value = " ";
                            PhonenumberR.current.value = " ";
                            DomainnameR.current.value = " ";
                            DescriptionR.current.value = " ";
                        }
                    }).catch((err) => {
                        setTesting(true)
                        setshowvalue(1+"Submission failled");
                        setloader(false);
                        setShow("");
                    })
                }
            }  
        }else{
            setShow("*Mandatory fields are required");
            setloader(false);
        }
        
    }

    return (
        <div className="userbody">
              <div className='header-user'>

<div><h1>RAISE THE TICKETS</h1></div>
            </div>
            <form className="form3" action="/" method="post">
                <div className="form-group mb-2 flex">
                    <label className="label width-25">Email ID<span>*</span></label>
                    <input className="issue-form-input" name="email" type="text" ref={EmailR} />
                </div>
                <div className="form-group mb-2 flex">
                    <label className="label width-25">Phonenumber<span>*</span></label>
                    <input className="issue-form-input" name="phonenumber" type="text" ref={PhonenumberR} />
                </div>
                <div className="form-group mb-2 flex">
                    <label className="label width-25">Domain Name<span>*</span></label>
                    <input className="issue-form-input" name="domainName" type="text" ref={DomainnameR} />
                </div>
                <div className="form-group scrolable  mb-2">
                    <label className="label">Description<span>*</span></label>
                    <textarea className="issue-form-input" name="description" ref={DescriptionR} rows="4" cols="50" maxLength="200" />
                </div>
                <div className="form-group  mb-2">
                    <form>
                        <label htmlFor="contained-button-file">
                            <input type="file"
                                className="upload-proof"
                                id="file"
                                ref={FileR}
                                accept="image/*,application/pdf,
                                                application/msword,
                                                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                                application/zip"
                                multiple
                                onChange={(e) => handleScreenshot(e)}
                            />
                        </label>
                    </form>
                </div>
                <div className="">
                    <p className='me-2 text-danger'>{show}</p>
                    {loader === false ? <><button className="btn2 mt-3" type="button" onClick={addIssues}>Submit</button></> : <> <CircularProgress size={30} /></>}
                </div>
            </form>
        </div>
    );
}