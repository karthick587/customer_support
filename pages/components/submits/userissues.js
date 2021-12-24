import React, {useState} from "react";
import Axios from "axios";

export default  Userissue ;

function Userissue() {

    const[username,setUserName]=useState('');
    const[domainName,setDomainName]=useState('');
  
    const[email,setEmail]=useState('');
    const[description,setDescription]=useState('');
 const[file,setFile]=useState('');
 var today = new Date();
    const date = today.getDate()+ '-' +(today.getMonth() + 1)+ '-' +today.getFullYear() + ' ' +
                    today.getHours() + ':' + today.getMinutes();
 const addIssues=()=>{
    Axios.post("http://mindmadetech.in/addIssues",{
          UserName:username,
          DomainName:domainName,
          IssuesFoundIn:date,
          Description:description,
          Email:email,
          File:file
    }).then((response)=>{
           console.log(response);
    });
 }

 return (
        <div className="container">
            <div>
               
                    <form className="form2">
                    <h4 className="issue-head">Submit your Issues Here!!!</h4>
                        <div className="form-group">
                            <label className="label">User Name</label>
                            <input className="form-input" name="userame" type="text" onChange={(e)=>{setUserName(e.target.value);}}  />
                        </div>
                        <div className="form-group">
                            <label className="label">Domain Name</label>
                            <input className="form-input" name="domainName" type="text" onChange={(e)=>{setDomainName(e.target.value);}}  />
                        </div>
                        <div className="form-group">
                            <label className="label">Email</label>
                            <input className="form-input" name="domainName" type="text" onChange={(e)=>{setEmail(e.target.value);}}  />
                        </div>
                        <div className="form-group">
                            <label className="label">Description</label>
                            <textarea className="form-input" name="description" rows="4" cols="50" maxLength="200" onChange={(e)=>{setDescription(e.target.value)}} />
                        </div>
                         <div className="form-group">
                           
                              <input className="form-input mt-4" name="file" type="file"  onChange={(e)=>{setFile(e.target.value);}} />
                        </div>
                        <div className="">
                            <button className="btn2 mt-3 mb-4" type="submit" onClick={addIssues}>Submit</button>
                        </div>
                    </form>
            </div>
        </div>
 );
}
