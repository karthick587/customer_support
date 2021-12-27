import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import { useRouter } from 'next/router'
function Adminticket() {
    const Router = useRouter()
    var [show, setShow] = useState('');
    var [tickets, setTickets,] = useState([]);
    var [selectedTeam, setSelectedTeam] = useState('');
    var [selectedStatus, setSelectedStatus] = useState('');
    var [search, setSearch] = useState('');
    var [selectedValue, setSelectedValue] = useState('');
    console.log(selectedValue)
    useEffect(() => {
        Axios.get("https://mindmadetech.in/ticketslist")
            .then((res) => setTickets(res.data));
    }, []);
    function handleTeam(e) {
        setSelectedTeam(e.target.value)
    }
    
    function handleStatus(e) {
        setSelectedStatus(e.target.value)
    }
    function handleUpdate(ticketsId) {
        console.log(ticketsId)

        Axios.put(`https://mindmadetech.in/ticketsupdate/${ticketsId}`, {
            Team: selectedTeam,
            Status: selectedStatus,
            ticketsId:ticketsId,
        }).then((response) => {
          
                setShow("update Successfully");
                Router.reload(window.location.pathname)
           
        });
    }
    return (
        <div>
            <div className="container mainbody">
                <Head>
                    <title>Admin Dashboard</title>
                </Head>
                <div className='adminticket-head'>
                    <h1>Tickets</h1>
                    <input placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="userbody">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Phonenumber</TableCell>
                                    <TableCell align="left">DomainName</TableCell>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="left">Team</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">file</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            {tickets.filter(val => {
                                if (search === "") {
                                    return val;
                                } else if (
                                    val.ticketsId.toString().includes(search.toString()) ||
                                    val.Username.toLowerCase().includes(search.toLowerCase())
                                ) {
                                    return val;
                                }
                            }).map((tickets) =>
                                <TableBody key={tickets.ticketsId}>
                                    <TableRow >
                                        <TableCell component="th" scope="row">{tickets.ticketsId}</TableCell>
                                        <TableCell align="left">{tickets.Username}</TableCell>
                                        <TableCell align="left">{tickets.Email}</TableCell>
                                        <TableCell align="left">{tickets.Phonenumber}</TableCell>
                                        <TableCell align="left">{tickets.DomainName}</TableCell>
                                        <TableCell align="left">{tickets.Date}</TableCell>
                                        <TableCell align="left">{tickets.Description}</TableCell>
                                        <TableCell align="left">{tickets.Team}</TableCell>
                                        <TableCell className={tickets.Status} align="left">{tickets.Status}</TableCell>
                                        <TableCell align="left"><img src={tickets.screenshots} alt="screenshots" height="80vh" width="50%" /></TableCell>
                                        <TableCell ><FormDialog
                                            dialogtitle="update"
                                            className="btn3"
                                            dialogbody={
                                                <div className="form dialog">
                                                    <div className="form-toggle"></div>
                                                    <div className="form-panel update one">
                                                        <div className="form-header">
                                                            <h1>Update Ticket {tickets.ticketsId}</h1>
                                                        </div>
                                                        <div className="addform">
                                                            <form>
                                                                <div className="form-group">
                                                                    <label className="label">Team :</label>
                                                                    <select className="form-input"  name="Team" onChange={handleTeam}>
                                                                        <option value="">--Select--</option>
                                                                        <option value="team1">team1</option>
                                                                        <option value="team2">team2</option>
                                                                        <option value="team3">team3</option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="label">Status</label>
                                                                    <select className="form-input"  name="Status" onChange={handleStatus}>
                                                                        <option value="">--Select--</option>
                                                                        <option className='new' value="new">New</option>
                                                                        <option className='inprogress' value="inprogress">In progress</option>
                                                                        <option className='completed' value="completed">Completed</option>
                                                                    </select>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <button className="btn2 float-end mt-3 mb-3" onClick={() => handleUpdate(tickets.ticketsId)}>Update</button>
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
export default Adminticket;