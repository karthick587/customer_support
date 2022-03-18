import React, { useEffect, useState,useRef, useContext } from "react";
import Axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { CounterContext } from "../contex/adminProvider";
import { CurrentDateContext } from '../contex/currentdateProvider';
import { Typography } from "@mui/material";
import moment from "moment";
import { renderEmail } from 'react-html-email';
import CustomerTicketsBody from '../utils/customerTicketsBody';

 export default function Userissue(props) {
const{setTesting,setshowvalue,Email}=useContext(CounterContext)
    const [loader,setloader]=useState(false);
    const { customername } = props;
    const [Screenshots, setScreenshots] = useState('x');
    const[show,setShow] = useState('');
    const PhonenumberR = useRef();
    const DomainnameR = useRef();
    const DescriptionR = useRef();
    const FileR = useRef();
    useEffect(()=>{
        Axios.get(`https://mindmadetech.in/api/customers/list/${customername}`)
        .then(res =>{
            setProjectcode(res.data[0].Projectcode)
        }).catch(err=>{ return err; })
    },[]);
    function handleScreenshot(e) {
        setScreenshots(e.target.files);
    };
    const[validate,setValidate]=useState(false)
    const addIssues = () => {
        const messageHtml = renderEmail(<CustomerTicketsBody />)
        if(PhonenumberR.current.value!==""&&DomainnameR.current.value!==""&&DescriptionR.current.value!==""){ 
            setloader(true);
            if(Screenshots!=='x'){
                const data = new FormData();
                data.append("Email", customername);
                data.append("Phonenumber", PhonenumberR.current.value);
                data.append("DomainName", DomainnameR.current.value);
                data.append("Description",  DescriptionR.current.value);
                for(let i=0; i<Screenshots.length; i++){
                    data.append("files",Screenshots[i]);  
                }
                data.append("Cus_CreatedOn", moment(new Date()).format('DD-MM-YYYY hh:mm A'))
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
                        setloader(false);
                        setTesting(true)
                        setshowvalue(res.data.message);
                        setShow("");
                        Email.send({
                            Host: "mindmadetech.in",
                            Username: "_mainaccount@mindmadetech.in",
                            Password: "1boQ[(6nYw6H.&_hQ&",
                            To: customername,
                            From: "support@mindmade.in",
                            Subject: "MindMade Support",
                            Body: messageHtml
                        }).then(
                            message => { return message; }
                        );
                        PhonenumberR.current.value = " ";
                        DomainnameR.current.value = " ";
                        DescriptionR.current.value = " ";
                        FileR.current.value = null;
                    }   
                })
                .catch((err)=>{ 
                    setTesting(true)
                    setshowvalue(1+"Submitted Failed");
                    setloader(false);
                    setShow("");
                })
            }else{
                const data = new FormData();
                data.append("Email", customername);
                data.append("Phonenumber", PhonenumberR.current.value);
                data.append("DomainName", DomainnameR.current.value);
                data.append("Description",  DescriptionR.current.value);
                data.append("Cus_CreatedOn", moment(new Date()).format('DD-MM-YYYY hh:mm A'))
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
                        setloader(false);
                        setTesting(true)
                        setshowvalue(res.data.message);
                        setShow("");
                        Email.send({
                            Host: "mindmadetech.in",
                            Username: "_mainaccount@mindmadetech.in",
                            Password: "1boQ[(6nYw6H.&_hQ&",
                            To: customername,
                            From: "support@mindmade.in",
                            Subject: "MindMade Support",
                            Body: messageHtml
                        }).then(
                            message => { return message; }
                        );
                        PhonenumberR.current.value = " ";
                        DomainnameR.current.value = " ";
                        DescriptionR.current.value = " ";
                        FileR.current.value = null;
                    } 
                })
                .catch((err)=>{
                    setTesting(true)
                    setloader(false);
                    setshowvalue(1+"Submitted Failed");
                    setShow("");
                })
            }
        }else{
            setShow("*Mandatory fields are required");
            setloader(false);
        }
    };
    
    return (
        <div>
        <form className="form5" action="/" method="post">
            <Typography >RAISE YOUR TICKETS</Typography>
            <div className="form-group mt-2 mb-2 flex" >
                <label className="label width-25">Email ID<span>*</span></label>
                <h5 className="issue-form-input">{customername}</h5>
            </div>
           
            <div className="form-group mb-3 flex">
                <label className="label width-25">Phonenumber<span>*</span></label>
                <input className="issue-form-input" name="phonenumber" type="text" ref={PhonenumberR}/>
            </div>
            <div className="form-group mb-3 flex">
                <label className="label width-25">Domain Name<span>*</span></label>
                <input className="issue-form-input" name="domainName" type="text" ref={DomainnameR} />
            </div>
            <div className="form-group scrolable  mb-3">
                <label className="label">Description<span>*</span></label>
                <textarea className="issue-form-input" name="description" ref={DescriptionR} rows="4" cols="50" maxLength="200" />
            </div>
            <div className="form-group  mb-3">
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
                            onChange={handleScreenshot} multiple="true"
                        />
                    </label>
                </form>
            </div>
            <div className="">
            <p className="me-2 text-danger">{show}</p>
            {loader===false ? <><button className="btn2 mt-3" type="button" onClick={addIssues}>Submit</button></>:<> <CircularProgress size={25} /></>} 
           
            </div>
        </form>
       
    </div>
    );
}
