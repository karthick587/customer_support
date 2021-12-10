import React, {useState} from "react";
import Axios from "axios";

export default  Userissue ;

function Userissue() {

    const[username,setUserName]=useState('');
    const[domainName,setDomainName]=useState('');
    const[date,setDate]=useState('');
    const[description,setDescription]=useState('');

 const addIssues=()=>{
    Axios.post("http://localhost:3001/addIssues",{
          UserName:username,
          DomainName:domainName,
          IssuesFoundIn:date,
          Description:description
    }).then((response)=>{
           console.log(response);
    });
 }

 return (
        <div className="container">
            <div>
                <h4 className="text-success pb-3">Submit your Issues Here!!!</h4>
                    <form className="form2">
                        <div className="pt-4">
                            <label className="col-sm-3">User Name</label>
                            <input className="col-sm-3" name="userame" type="text" onChange={(e)=>{setUserName(e.target.value);}}  />
                        </div>
                        <div className="  pt-4">
                            <label className="col-sm-3">Domain Name</label>
                            <input className="col-sm-3" name="domainName" type="text" onChange={(e)=>{setDomainName(e.target.value);}}  />
                        </div>
                        <div className=" pt-4">
                            <label className="col-sm-3">Issues found in</label>
                            <input className="col-sm-3" name="issuesFoundIn" type="date" onChange={(e)=>{setDate(e.target.value);}}  />
                        </div>
                        <div className=" pt-4 ">
                            <label className="col-sm-3 pb-2">Description</label>
                            <textarea className="col-sm-3" name="description" rows="4" cols="50" maxLength="200" onChange={(e)=>{setDescription(e.target.value)}} />
                        </div>
                        <div className="pt-3">
                            <button className="btn btn-primary btn-md" type="submit" onClick={addIssues}><a className="nav-link text-white">Submit</a></button>
                        </div>
                    </form>
            </div>
        </div>
 );
}
