import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import Axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormDialog from './common/dialogsform';
import Adduser from './submits/adduser';
import Router from 'next/router';
export default function Users(){
    var[search,setSearch] = useState('');
  var[selectedValue,setSelectedValue] = useState('');
  console.log(selectedValue)
    var[users,setUsers]=useState([]);
    var[show,setShow]=useState('');
useEffect(()=>{
        Axios.get("http://localhost:3001/adduser")
        .then((res)=>setUsers(res.data));
    },[]);


    return(
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="container mainbody">
             
              
                <div className="userbody">
                <div className='header-user'>
               <h1>USERS</h1>
               <input placeholder='search' type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
               <FormDialog
               className="float-enduser btn2 button"
                    dialogtitle="+ADD USER"
                    dialogbody={<Adduser />}
                />
                 
               </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">FIRST_NAME</TableCell>
                                    <TableCell align="left">LAST_NAME</TableCell>
                                    <TableCell align="left">USERNAME</TableCell>
                                    <TableCell align="left">email</TableCell>
                                    <TableCell align="left">PASSWORD</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            {users.filter(val=>{
                           if(search === ""){
                               return val;
                           }else if(
                               val.firstname.toLowerCase().includes(search.toLowerCase()) ||
                               val.lastname.toLowerCase().includes(search.toLowerCase()) ||
                               val.username.toLowerCase().includes(search.toLowerCase()) ||   
                               val.password.toLowerCase().includes(search.toLowerCase())
                                         
                           ){
                               return val;
                           }
                       }).map((item)=>
                                <TableBody key={item.id}>
                                    <TableRow >
                                        <TableCell component="th" scope="row">{item.id}</TableCell>
                                        <TableCell align="left">{item.firstname}</TableCell>
                                        <TableCell align="left">{item.lastname}</TableCell>
                                        <TableCell align="left">{item.username}</TableCell>
                                        <TableCell align="left">{item.email}</TableCell>
                                        <TableCell align="left">{item.password}</TableCell>
                                        <TableCell align="left">  <button className="btn2" >Delete</button></TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}