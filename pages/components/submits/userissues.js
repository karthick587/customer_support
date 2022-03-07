import React, { useEffect, useState,useRef, useContext } from "react";
import Axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { CounterContext } from "../contex/adminProvider";
import { CurrentDateContext } from '../contex/currentdateProvider';
import { Typography } from "@mui/material";
export default Userissue;

function Userissue(props) {
    const { currentDate } = useContext(CurrentDateContext);
const{setTesting,setshowvalue}=useContext(CounterContext)
    const [loader,setloader]=useState(false);
    const { customername } = props;
    const [Email, setEmail] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');
    const [DomainName, setDomainName] = useState('');
    const [Description, setDescription] = useState('');
    const [Screenshots, setScreenshots] = useState('x');
    const[projectcode,setProjectcode] = useState('');
    const EmailR = useRef();
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
        
        if(EmailR.current.value!==""&&PhonenumberR.current.value!==""&&DomainnameR.current.value!==""&&DescriptionR.current.value!==""){
            setloader(true);
            setValidate(false)
            if(Screenshots!=='x'){
                const data = new FormData();
                data.append("Username", customername);
                data.append("Email", EmailR.current.value);
                data.append("Phonenumber", PhonenumberR.current.value);
                data.append("DomainName", DomainnameR.current.value);
                data.append("Description",  DescriptionR.current.value);
                for(let i=0; i<Screenshots.length; i++){
                    data.append("files",Screenshots[i]);  
                }
                data.append("Cus_CreatedOn", currentDate)
                Axios.post("https://mindmadetech.in/api/tickets/new", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((res) => {
                    setloader(false);
                    setTesting(true)
                    setshowvalue("Submitted Successfully");
                    EmailR.current.value = " ";
                    PhonenumberR.current.value = " ";
                    DomainnameR.current.value = " ";
                    DescriptionR.current.value = " ";
                    FileR.current.value = null;
                })
                .catch((err)=>{ 
                    setTesting(true)
                    setshowvalue("Submitted Failed");
                    setloader(false);
                    return err; })
            }else{
                const data = new FormData();
                data.append("Username", customername);
                data.append("Email", EmailR.current.value);
                data.append("Phonenumber", PhonenumberR.current.value);
                data.append("DomainName", DomainnameR.current.value);
                data.append("Description",  DescriptionR.current.value);
                data.append("Cus_CreatedOn", currentDate)
                Axios.post("https://mindmadetech.in/api/tickets/new", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((res) => {
                    setloader(false);
                    setTesting(true)
                    setshowvalue("Submitted Successfully");
                    EmailR.current.value = " ";
                    PhonenumberR.current.value = " ";
                    DomainnameR.current.value = " ";
                    DescriptionR.current.value = " ";
                    FileR.current.value = null;
                })
                .catch((err)=>{
                    setTesting(true)
                    setloader(false);
                    setshowvalue(1+"Submitted Failed");
                    return err; })
            }
        }else{
            setValidate(true)
        }
      
        
    };

    return (
        <div>
        <form className="form5" action="/" method="post">
            <Typography >RAISE YOUR TICKETS</Typography>
            <div className="form-group mt-2 mb-2 flex" >
                <label className="label width-25">User Name</label>
                <h5 className="issue-form-input">{props.customername}</h5>
            </div>
            <div className="form-group mb-2 flex">
                <label className="label width-25">Email ID</label>
                <input className="issue-form-input" name="email" type="text" ref={EmailR} />
            </div>
            <div className="form-group mb-2 flex">
                <label className="label width-25">Phonenumber</label>
                <input className="issue-form-input" name="phonenumber" type="text" ref={PhonenumberR}/>
            </div>
            <div className="form-group mb-2 flex">
                <label className="label width-25">Domain Name</label>
                <input className="issue-form-input" name="domainName" type="text" ref={DomainnameR} />
            </div>
            <div className="form-group scrolable  mb-2">
                <label className="label">Description</label>
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
                            onChange={handleScreenshot} multiple="true"
                        />
                    </label>
                </form>
            </div>
            {validate===true ? <div className="alert1">All Fields are required</div>:<></>}
            <div className="">
            {loader===false ? <><button className="btn2 mt-3" type="button" onClick={addIssues}>Submit</button></>:<> <CircularProgress size={25} /></>} 
           
            </div>
        </form>
       
    </div>
    );
}
