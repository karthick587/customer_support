import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Ticketviewer from '../common/ticketviewer';
import { useRouter } from 'next/router'
function Userticket({Username}) {
    const Router = useRouter()
    console.log(Username)
    var [tickets, setTickets] = useState([]);
    useEffect(()=>{
        Axios.get(`https://mindmadetech.in/api/tickets/customertickets/${Username}`)
        .then((res)=>setTickets(res.data));
    })
    const [login, setLogin] = useState()
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'))
        if (login === "false") {
            Router.push("/")
        } else if (login === null) {
            Router.push("/")
        }
        localStorage.setItem('updateclose', "open");
    })
    const [showdetails, setShowdetails] = useState(false)
    const [dticketsId, setdticketsId] = useState("")
    const[dticketsscreenshots,setdticketsscreenshots] = useState("")
    const Openticket = (ticketsId,Screenshots) => {
        setdticketsId(ticketsId)
        setdticketsscreenshots(Screenshots)
        setShowdetails(true)
    }
    function closeDetails() {
        setShowdetails(false)
    }
    return (
        <div>

            <Head>
                <title>Admin Dashboard</title>
            </Head>
            {showdetails === false ?
            <div className='container'>
                <div className="teambody">
                    <div className='adminticket-head'>
                        <h1>Tickets</h1>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell  >TicketId</TableCell>
                                    <TableCell align="left">Username</TableCell>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Team</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            {tickets.map((tickets) =>                         
                                    <TableBody key={tickets.ticketsId} >
                                        <TableRow className="tickets-bodyrow" onClick={() => Openticket(tickets.ticketsId,tickets.Screenshots)}>                                            
                                            <TableCell>{tickets.ticketsId}</TableCell>
                                            <TableCell >{tickets.Username}</TableCell>
                                            <TableCell >{tickets.Cus_CreatedOn}</TableCell>
                                            <TableCell >{tickets.Team}</TableCell>
                                            <TableCell > {tickets.Status==="completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>}
                                               
                                            </TableCell>            
                                        </TableRow>                                       
                                    </TableBody>                                                              
                            )}
                        </Table>
                    </TableContainer>
                </div>
                </div> :
                <>
                   <Ticketviewer
                        dticketsId={dticketsId}
                        dticketsscreenshots={dticketsscreenshots}
                        closeDetails={closeDetails}
                    />
                </>
            }

        </div>
    );
}
export default Userticket;