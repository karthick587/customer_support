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
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useForm } from "react-hook-form";


function Userticket() {

    

var[issues,setIssues]=useState([]);
  var[search,setSearch] = useState('');
 
  var[selectedValue,setSelectedValue] = useState('');
  console.log(selectedValue)
  useEffect(()=>{
     Axios.get("http://localhost:3001/addIssues")
        .then((res)=>setIssues(res.data));
     },[]);
     
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
                            
                               val.username.toLowerCase().includes(search.toLowerCase())
                                          
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
export default Userticket ;