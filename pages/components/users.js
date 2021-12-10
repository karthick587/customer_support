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
import FormDialog from './dialogsform';
import Adduser from './adduser';

export default function Users(){
    
    var[users,setUsers]=useState([]);
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
                <FormDialog
                    dialogtitle="ADD USER"
                    dialogbody={<div><Adduser /></div>}
                />
                <div className="userbody">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">FIRST_NAME</TableCell>
                                    <TableCell align="right">LAST_NAME</TableCell>
                                    <TableCell align="right">USERNAME</TableCell>
                                    <TableCell align="right">email</TableCell>
                                    <TableCell align="right">PASSWORD</TableCell>
                                </TableRow>
                            </TableHead>
                            {users.map((item)=>
                                <TableBody key={item.id}>
                                    <TableRow >
                                        <TableCell component="th" scope="row">{item.id}</TableCell>
                                        <TableCell align="right">{item.firstname}</TableCell>
                                        <TableCell align="right">{item.lastname}</TableCell>
                                        <TableCell align="right">{item.username}</TableCell>
                                        <TableCell align="right">{item.email}</TableCell>
                                        <TableCell align="right">{item.password}</TableCell>
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