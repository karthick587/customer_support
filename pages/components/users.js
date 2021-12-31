import React, { useState, useEffect } from 'react';
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
import { Button } from '@mui/material';
import Addcustomer from './submits/addcustomer';
import { useRouter } from 'next/router';

export default function Users(props) {
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');
    const Router = useRouter();
    console.log(selectedValue)
    var [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/customer/list")
            .then((res) => setUsers(res.data));
    }, []);

    const deleteUsers = (id,name) => {
       
        // <-- declare id parameter
        Axios
            .delete(`https://mindmadetech.in/api/customer/delete/${id}`) // <-- remove ;
            .then(() => {
                // Issue GET request after item deleted to get updated list
                // that excludes note of id
                Router.reload(window.location.pathname);
            })
    };

  
     const handleClose = () => {
        Router.reload(window.location.pathname)
     };

    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="container mainbody">


                <div className="userbody">
                    <div className='header-user'>
                        <h1>USERS </h1>
                        <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                   <div className='right-user-btns'>
                        <FormDialog
                            className="float-enduser btn2 button"
                            dialogtitle="+ADD customer"
                            dialogbody={<Addcustomer />}
                        />
                     </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>

                                    <TableCell>USERID</TableCell>
                                    <TableCell align="left">NAME</TableCell>
                                    <TableCell align="left">USERNAME</TableCell>
                                    <TableCell align="left">PASSWORD</TableCell>
                                    <TableCell align="left">EMAIL</TableCell>
                                    <TableCell align="left">PHONE NUMBER</TableCell>
                                    <TableCell align="left">ADDRESS</TableCell>
                                </TableRow>
                            </TableHead>
                            {users.filter(val => {
                                if (search === "") {
                                    return val;
                                } else if (

                                    val.Username.toLowerCase().includes(search.toLowerCase()) ||
                                    val.Name.toString().includes(search.toString())

                                ) {
                                    return val;
                                }
                            }).map((item) =>
                                <TableBody key={item.usersId}>

                                    <TableRow >

                                        <TableCell component="th" scope="row">{item.usersId}</TableCell>
                                        <TableCell align="left">{item.Name}</TableCell>
                                        <TableCell align="left">{item.Username}</TableCell>
                                        <TableCell align="left">{item.Password}</TableCell>
                                        <TableCell align="left">{item.Email}</TableCell>
                                        <TableCell align="left">{item.Phonenumber}</TableCell>
                                        <TableCell align="left">{item.Address}</TableCell>
                                        <TableCell align="left"><FormDialog 
                                            dialogtitle="Delete"
                                            dialogbody="Are you sure you want to delete the team?"
                                            dialogactions={
                                                <div>
                                                    <Button onClick={()=>deleteUsers(item.usersId,item.Username)}>YES</Button>
                                                    <Button  onClick={handleClose}>NO</Button>
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
    )
}