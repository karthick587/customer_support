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
    var[search,setSearch] = useState('');
  var[issues,setIssues]=useState([]);
  var[selectedTeam,setSelectedTeam] = useState('');
  var[selectedStatus,setSelectedStatus] = useState('');
  var[selectedValue,setSelectedValue] = useState('');
  console.log(selectedValue)
  
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
              <div>
                  <input placeholder='search' type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
              </div>
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
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        {issues.filter(val=>{
                           if(search === ""){
                               return val;
                           }else if(
                               val.username.toLowerCase().includes(search.toLowerCase()) ||
                               val.DomainName.toLowerCase().includes(search.toLowerCase()) ||
                               val.Description.toLowerCase().includes(search.toLowerCase()) ||   
                              
                               val.IssuesFoundIn.toString().includes(search.toString()) ||
                               val.Team.toLowerCase().includes(search.toLowerCase()) || 
                               val.Status.toLowerCase().includes(search.toLowerCase())
                                            
                           ){
                               return val;
                           }
                       }).map((item)=>
                            <TableBody key={item.id}>
                                <TableRow >
                                  <TableCell component="th" scope="row">{item.id}</TableCell>
                                  <TableCell align="right">{item.username}</TableCell>
                                  <TableCell align="right">{item.DomainName}</TableCell>
                                 
                                  <TableCell align="right">{item.IssuesFoundIn}</TableCell>
                                  <TableCell align="right">{item.Description}</TableCell>
                                  <TableCell align="right">{item.Team}</TableCell>
                                  <TableCell  className={item.Status}  align="right">{item.Status}</TableCell>
                                  <TableCell align="right"><img  src= {item.file} alt="pic" height="80vh" width="50%"   /></TableCell>
                                  <TableCell ><FormDialog 
                                      dialogtitle="update"
                                      className="btn3"
                                      dialogbody={
                                        <div className="form dialog">
                                            <div className="form-toggle"></div>
                                            <div className="form-panel update one">
                                              <div className="form-header">
                                                  <h1>Update Ticket {item.id}</h1>   
                                              </div>
                                              <div className="addform">
                                                  <form>
                                                      <div className="form-group"> 
                                                            <label className="label">username </label>
                                                            <input className="form-input" value={item.username} name="firstname"  type="text" />
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="label">DomainName </label>
                                                          <input className="form-input" value={item.DomainName} name="firstname"  type="text"  />
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="label">IssuesFoundIn </label>
                                                          <input className="form-input" value={item.Email} name="firstname"  type="text" />
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="label">IssuesFoundIn </label>
                                                          <input className="form-input" value={item.IssuesFoundIn} name="firstname"  type="text" />
                                                      </div>

                                                      <div className="form-group">
                                                          <label className="label">Description</label>
                                                          <textarea className="form-input" value= {item.Description} name="contact number"   type="text"   />
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="label">Team :</label>
                                                              <select className="form-input" onChange={handleTeam}>
                                                                  <option value="">--Select--</option>
                                                                  <option value="team1">team1</option>
                                                                  <option value="team2">team2</option>
                                                                  <option value="team3">team3</option>
                                                              </select> 
                                                      </div>
                                                      <div className="form-group">
                                                          <label className="label">Status</label>
                                                              <select className="form-input"  onChange={handleStatus}>
                                                                  <option value="">--Select--</option>
                                                                  <option className='new' value="new">New</option>
                                                                  <option className='inprogress' value="inprogress">In progress</option>
                                                                  <option className='completed' value="completed">Completed</option>
                                                              </select>
                                                    </div>
                                                </form>
                                              </div>
                                          </div>
                                        <button className="btn2 float-end mt-3 mb-3" onClick={()=>handleUpdate(item.id)}>Update</button>
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