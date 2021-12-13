import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormDialog from './dialogsform';

function Adminticket() {
 
  var[issues,setIssues]=useState([]);
  var[selectedTeam,setSelectedTeam] = useState('');
  var[selectedStatus,setSelectedStatus] = useState('');
  
  useEffect(()=>{
     Axios.get("http://localhost:3001/addIssues")
        .then((res)=>setIssues(res.data));
     },[]);
    
 function handleTeam(e){
      setSelectedTeam(e.target.value)
 }

 function handleStatus(e){
      setSelectedStatus(e.target.value)
 }

function handleUpdate(id){
   console.log(id)

    Axios.put(`http://localhost:3001/addIssues`,{
        team : selectedTeam,
        status : selectedStatus,
        id:id,
    }).then((res)=>console.log(res)) 
  }

 return(
      <div> 
          <div className="container mainbody">
              <Head>
                  <title>Admin Dashboard</title>
              </Head>
              <div className="userbody">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">    
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell align="right">DomainName</TableCell>
                                <TableCell align="right">IssuesFoundIn</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Team</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">file</TableCell>
                            </TableRow>
                        </TableHead>
                        {issues.map((item)=>
                            <TableBody key={item.id}>
                                <TableRow >
                                  <TableCell component="th" scope="row">{item.id}</TableCell>
                                  <TableCell align="right">{item.username}</TableCell>
                                  <TableCell align="right">{item.DomainName}</TableCell>
                                  <TableCell align="right">{item.IssuesFoundIn}</TableCell>
                                  <TableCell align="right">{item.Description}</TableCell>
                                  <TableCell align="right">{item.Team}</TableCell>
                                  <TableCell align="right">{item.Status}</TableCell>
                                  <TableCell align="right"><img  src= {item.file} alt="pic" height="80vh" width="50%"   /></TableCell>
                                  <TableCell ><FormDialog 
                                      dialogtitle="update"
                                      dialogbody={
                                        <div className="form dialog">
                                            <div className="form-toggle"></div>
                                            <div className="form-panel update one">
                                              <div className="form-header">
                                                  <h1>Update Ticket{item.id}</h1>   
                                              </div>
                                              <div className="form-content">
                                                  <form>
                                                      <div className="form-group"> 
                                                            <label className="col-sm-3">username </label>
                                                            <input className="col-sm-3" value={item.username} name="firstname"  type="text" />
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="col-sm-3">DomainName </label>
                                                          <input className="col-sm-3" value={item.DomainName} name="firstname"  type="text"  />
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="col-sm-3">IssuesFoundIn </label>
                                                          <input className="col-sm-3" value={item.IssuesFoundIn} name="firstname"  type="text" />
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="col">Description</label>
                                                          <textarea className="col-sm-3" value= {item.Description} name="contact number"   type="text"   />
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="col-sm-3">Team :</label>
                                                              <select className="ticket-select" onChange={handleTeam}>
                                                                  <option value="">--Select--</option>
                                                                  <option value="team1">team1</option>
                                                                  <option value="team2">team2</option>
                                                                  <option value="team3">team3</option>
                                                              </select> 
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="col-sm-3">Status</label>
                                                              <select className="ticket-select"  onChange={handleStatus}>
                                                                  <option value="">--Select--</option>
                                                                  <option value="new">New</option>
                                                                  <option value="inprogress">In progress</option>
                                                                  <option value="completed">Completed</option>
                                                              </select>
                                                    </div>
                                                </form>
                                              </div>
                                          </div>
                                        <button className="button float-end" onClick={()=>handleUpdate(item.id)}>Update</button>
                                      </div>
                                      }
                                  /></TableCell>
                                </TableRow> 
                            </TableBody>
                        )}
                    </Table>
                  </TableContainer>
            </div>
      
          </div>
      </div>
    );
}
export default Adminticket ;