import React, { useEffect, useState,useRef, useContext } from "react";
import Axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { CounterContext } from "../contex/adminProvider";
import { CurrentDateContext } from '../contex/currentdateProvider';
 export default function Adminissues(props) {
    const { currentDate } = useContext(CurrentDateContext);
const{setTesting,setshowvalue}=useContext(CounterContext)
    const [loader,setloader]=useState(false);
    const [show, setShow] = useState();
    const UsernameR = useRef();
    const EmailR = useRef();
    const PhonenumberR = useRef();
    const DomainnameR = useRef();
    const DescriptionR = useRef();
    const FileR = useRef();
    const [Adminname, setAdminname] = useState([]);
    const [Createdby, setCreatedby] = useState();
    const [Logo, setLogo] = useState();
    useEffect(() => {
        setAdminname(window.localStorage.getItem('user'));
    }, []);
    useEffect(() => {
        setCreatedby(Adminname.slice(3, 20));
    },[]);
    function handleScreenshot(e) {
        setLogo(e.target.files)
    };
    function addIssues(){
        if(Logo!==undefined || Logo.length > 0){
         const data = new FormData();
         data.append("Username", UsernameR.current.value);
         data.append("Email", EmailR.current.value);
         data.append("Phonenumber", PhonenumberR.current.value);
         data.append("DomainName", DomainnameR.current.value);
         data.append("Description", DescriptionR.current.value);
         data.append("Adm_CreatedOn", currentDate);
         data.append("Adm_CreatedBy", Createdby);
         data.append("Cus_CreatedOn","null")
         for(let i=0; i<Logo.length; i++){
             data.append("files",Logo[i]);  
         }
      
         Axios.post("https://mindmadetech.in/api/tickets/new", data, {
                     headers: {
                         'Content-Type': 'multipart/form-data',
                     }
         }).then((res) => {
                     setShow("Updated Successfully");
                     setloader(false);
                     UsernameR.current.value = " ";
                     EmailR.current.value = " ";
                     PhonenumberR.current.value = " ";
                     DomainnameR.current.value = " ";
                     DescriptionR.current.value = " ";
                     FileR.current.value = null;
         }).catch((err)=>{ return err; })
     
        }else{
         const data = new FormData();
         data.append("Username", UsernameR.current.value);
         data.append("Email", EmailR.current.value);
         data.append("Phonenumber", PhonenumberR.current.value);
         data.append("DomainName", DomainnameR.current.value);
         data.append("Description", DescriptionR.current.value);
         data.append("Adm_CreatedOn", currentDate);
         data.append("Adm_CreatedBy", Createdby);
         data.append("Cus_CreatedOn","null")
         
         Axios.post("https://mindmadetech.in/api/tickets/new", data, {
                     headers: {
                         'Content-Type': 'multipart/form-data',
                     }
         }).then((res) => {
                   
                     setloader(false);
                     setTesting(true)
                     setshowvalue("Submitted Successfully");
                     setdialogformopen("true")
                     UsernameR.current.value = " ";
                     EmailR.current.value = " ";
                     PhonenumberR.current.value = " ";
                     DomainnameR.current.value = " ";
                     DescriptionR.current.value = " ";
                     FileR.current.value = null;
         }).catch((err)=>{ 
            setshowvalue(1+"Submission Failed");
            setTesting(true)
             return err; })
        }    
     }

    return (
            <div className="userbody">
                 <div className='header-user'>
                 <h1>Raise The Tickets</h1>
                 </div>
                <form className="form3" action="/" method="post">
                    <div className="form-group mt-2 mb-2 flex" >
                        <label className="label width-25">User Name</label>
                        <input className="issue-form-input" name="email" type="text" ref={UsernameR}  />
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Email</label>
                        <input className="issue-form-input" name="email" type="text" ref={EmailR}  />
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Phonenumber</label>
                        <input className="issue-form-input" name="phonenumber" type="text" ref={PhonenumberR}  />
                    </div>
                    <div className="form-group mb-2 flex">
                        <label className="label width-25">Domain Name</label>
                        <input className="issue-form-input" name="domainName" type="text" ref={DomainnameR} />
                    </div>
                    <div className="form-group scrolable  mb-2">
                        <label className="label">Description</label>
                        <textarea className="issue-form-input" name="description" ref={DescriptionR} rows="4" cols="50" maxLength="200"  />
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
                    {loader===false ? <><button className="btn2 mt-3" type="button" onClick={addIssues}>Submit</button></>:<> <CircularProgress size={30} /></>} 
                   
                    </div>
                </form>
                <h4 className="alert1 text-center">{show}</h4>
            </div>
    );
}