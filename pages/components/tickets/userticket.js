import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Ticketviewer from '../common/ticketviewer';
import { useRouter } from 'next/router';
import Axios from 'axios';
import ViewTeam from '../common/view_team';

function Userticket(props) {
    const { tickets } = props;
    const [maptickets, setmaptickets] = useState([]);
    const Router = useRouter();
    const [login, setLogin] = useState();
    const [showdetails, setShowdetails] = useState(false);
    const [dticketsId, setdticketsId] = useState("");
    const [dticketsscreenshots, setdticketsscreenshots] = useState("");
    // var [team, setTeam] = useState([]);
    useEffect(() => {
        setmaptickets(tickets.reverse());
        setLogin(window.localStorage.getItem('loggedin'));
        if (login === "false") {
            Router.push("/");
        } else if (login === null) {
            Router.push("/");
        };
        localStorage.setItem('updateclose', "open");
    }, [tickets]);
    const Openticket = (ticketsId, Screenshots) => {
        setdticketsId(ticketsId);
        setdticketsscreenshots(Screenshots);
        setShowdetails(true);
    };
    function closeDetails() {
        setShowdetails(false);
    };

    // useEffect(() => {
    //     Axios.get("https://mindmadetech.in/api/team/list")
    //         .then((res) => setTeam(res.data))
    //         .catch((err) => { return err; })
    // },[]);

    return (
        <div>
            <Head>
                <title>Customer Dashboard</title>
            </Head>
            {showdetails === false ?
               
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
                                {maptickets.map((tickets) =>
                                    <TableBody key={tickets.ticketsId} >
                                        <TableRow className="tickets-bodyrow" onClick={() => Openticket(tickets.ticketsId, tickets.Screenshots)}>
                                            <TableCell>{tickets.ticketsId}</TableCell>
                                            <TableCell >{tickets.Username}</TableCell>
                                            <TableCell >{tickets.Cus_CreatedOn}</TableCell>
                                            <TableCell ><ViewTeam  teamArray={tickets.TeamAssign} /></TableCell>
                                            <TableCell > {tickets.Status === "completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>}

                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    
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