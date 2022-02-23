import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function NonUserTickets(props) {
  

    const [showdetails, setShowdetails] = useState(false);

    

    //tickets status update functions 
  

    //status submit function
   function ShowDetail(){
    setShowdetails(true)
   }

    //current time and date 
   
    function closeDetails() {
        setShowdetails(false);
    };
    return (
        <div>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            {showdetails === false ?
                <div className="teambody">
                    <div className='adminticket-head'>
                        <h1>Non User Tickets</h1>
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
                          
                                <TableBody  className='update-right' >
                                    <TableRow className="tickets-bodyrow update6" onClick={ShowDetail}>
                                        <TableCell>test</TableCell>
                                        <TableCell >test</TableCell>
                                        <TableCell >test</TableCell>
                                        <TableCell >
                                            {/* {tickets.Design === "y" ? <div>Design</div> : <></>}{tickets.Development === "y" ? <div>Development</div> : <></>} {tickets.Seo === "y" ? <div>Seo</div> : <></>} {tickets.Server === "y" ? <div>Server</div> : <></>} {tickets.Server === "" && tickets.Design === "" && tickets.Seo === "" && tickets.Development === "" || tickets.Server === "n" && tickets.Design === "n" && tickets.Seo === "n" && tickets.Development === "n" ? <>Not assigned</> : <></>} */}
                                            test
                                        </TableCell>
                                        <TableCell > 
                                        test
                                            {/* {tickets.Status === "completed" ? <h5 className={tickets.Status}>Done</h5> : <h5 className={tickets.Status}>{tickets.Status}</h5>} */}
                                        </TableCell>
                                    </TableRow>
                                  
                                </TableBody>
                           
                        </Table>
                    </TableContainer>
                </div>
                :
                <>
                   test
                   <button onClick={closeDetails}>close</button>
                </>
            }
        </div>
    );
}
export default NonUserTickets;