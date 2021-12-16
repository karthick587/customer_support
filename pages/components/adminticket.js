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
import { useRouter } from 'next/router'

function Adminticket() {

    const Router = useRouter()
    var[show,setShow]=useState('');
    var[issues,setIssues]=useState([]);
  var[selectedTeam,setSelectedTeam] = useState('');
  var[selectedStatus,setSelectedStatus] = useState('');
  var[search,setSearch] = useState('');
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
    }).then((response)=>{
        setShow("update Successfully");
            Router.reload(window.location.pathname)
        
});
      
    
  }

 return(
      <div> 
          <div className="container mainbody">
              <Head>
                  <title>Admin Dashboard</title>
              </Head>
              <div className='adminticket-head'>
                  <h1>Tickets</h1>
              <input placeholder='search' type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
              </div>
              <div className="userbody">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">    
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell align="left">DomainName</TableCell>
                               
                                <TableCell align="left">IssuesFoundIn</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Team</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">file</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                               
                        {issues.filter(val=>{
                           if(search === ""){
                               return val;
                           }else if(
                            val.id.toString().includes(search.toString()) ||
                               val.username.toLowerCase().includes(search.toLowerCase()) ||
                               val.DomainName.toLowerCase().includes(search.toLowerCase()) ||
                               val.Description.toLowerCase().includes(search.toLowerCase()) ||   
                               val.Team.toLowerCase().includes(search.toLowerCase()) || 
                               val.Status.toLowerCase().includes(search.toLowerCase()) ||
                               val.IssuesFoundIn.toString().includes(search.toString())              
                           ){
                               return val;
                           }
                       }).map((item)=>
                            <TableBody key={item.id}>
                                <TableRow >
                                  <TableCell component="th" scope="row">{item.id}</TableCell>
                                  <TableCell align="left">{item.username}</TableCell>
                                  <TableCell align="left">{item.DomainName}</TableCell>
                                 
                                  <TableCell align="left">{item.IssuesFoundIn}</TableCell>
                                  <TableCell align="left">{item.Description}</TableCell>
                                  <TableCell align="left">{item.Team}</TableCell>
                                  <TableCell  className={item.Status}  align="left">{item.Status}</TableCell>
                                  <TableCell align="left"><img  src= {item.file} alt="pic" height="80vh" width="50%"   /></TableCell>
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
                                                              <select className="form-input" name="team" onChange={handleTeam}>
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
                                        <h4 className="alert1 text-center">{show}</h4>
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