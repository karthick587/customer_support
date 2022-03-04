import React, { useEffect, useState,useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { TicketsContext } from '../contex/ticketsProvider';
export default function Resentticket(props) {
    const { tickets } = useContext(TicketsContext);
    const { teamticket } = props;
    const [team, seteam] = useState([]);
    useEffect(() => {
        if (teamticket === undefined) {
            seteam(tickets);
        } else {
            seteam(teamticket);
        }
    }, [teamticket, tickets, seteam]);
    return (
        <div className='resentticket'>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Recent Tickets
            </Typography>
            <div className='resentticket-table'>
                <Table size="small" >
                    <TableHead>
                        <TableRow className="resentticket-row">
                            <TableCell>Date</TableCell>
                            <TableCell>TicketId</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Domainname</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    {team.filter(val => {
                        return val.Status.toLowerCase().includes("New".toLowerCase())
                    }).map((tickets) =>
                        <TableBody key={tickets.ticketsId}>
                            <TableRow className="resentticket-row" >
                                <TableCell  >{tickets.Cus_CreatedOn}</TableCell>
                                <TableCell >{tickets.ticketsId}</TableCell>
                                <TableCell >{tickets.Username}</TableCell>
                                <TableCell > {tickets.DomainName}</TableCell>
                                <TableCell >{tickets.Status}</TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </div>
          
        </div>
    );
}