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
import Addteam from './submits/addteam';
import { Button } from '@mui/material';
import { useRouter } from 'next/router'
export default function Users(props) {
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');

    console.log(selectedValue)
    var [team, setTeam] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/team/list")
            .then((res) => setTeam(res.data));
    }, []);

    const deleteUsers = (id,name) => {
       
            // <-- declare id parameter
            Axios
                .delete(`https://mindmadetech.in/api/team/delete/${id}`) // <-- remove ;
                .then(() => {
                    // Issue GET request after item deleted to get updated list
                    // that excludes note of id
                    alert(`${name} was deleted`);
                    Router.reload(window.location.pathname)
                })
        };

      
        const handleClose = () => {
            setOpen(false);
          };
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div className="container mainbody">


                <div className="userbody">
                    <div className='header-user'>
                        <h1>TEAM </h1>
                        <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                   <div className='right-user-btns'>
                        <FormDialog
                            className="float-enduser btn2 button"
                            dialogtitle="+ADD Team"
                            dialogbody={<Addteam />}
                        />
                     </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>

                                    <TableCell>TEAMID</TableCell>
                                    <TableCell align="left">USERNAME</TableCell>
                                    <TableCell align="left">PASSWORD</TableCell>
                                    <TableCell align="left">TEAM</TableCell>
                                </TableRow>
                            </TableHead>
                            {team.filter(val => {
                                if (search === "") {
                                    return val;
                                } else if (

                                    val.Username.toLowerCase().includes(search.toLowerCase()) 

                                ) {
                                    return val;
                                }
                            }).map((item) =>
                                <TableBody key={item.teamId}>

                                    <TableRow >

                                        <TableCell component="th" scope="row">{item.teamId}</TableCell>
                                        <TableCell align="left">{item.Username}</TableCell>
                                        <TableCell align="left">{item.Password}</TableCell>
                                        <TableCell align="left">{item.Team}</TableCell>
                                        <TableCell align="left"><FormDialog 
                                            dialogtitle="Delete"
                                            dialogbody={
                                                <div>
                                                <Button  onClick = {()=>deleteUsers(item.teamId,item.Username)}>YES</Button>
                                                <Button  onClose={handleClose}>NO</Button>
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