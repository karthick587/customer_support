import React, { useState, useEffect } from 'react';
import Axios from "axios";
import FormDialog from '../common/dialogsform';
import AdminDashboard from '../dash/admindashboard';
import { useRouter } from 'next/router';
function AdminNotification(props) {
    let router = useRouter();
    var [tickets, setTickets,] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data));
    }, [tickets]);
    function Notificationupdate(ticketsId, Notification) {
        Axios.put(`https://mindmadetech.in/api/tickets/updateNotification/${ticketsId}`, {
            Notification: "seen",
            ticketsId: ticketsId,
        }).then((_response) => {
            console.log("viewed ticket No " + ticketsId)
        });       
    }

    return (
        <div>
            {tickets.filter(val => {
                return val.Notification.toLowerCase().includes("unseen")
            }).map((tickets) =>
                <div key={tickets.ticketsId} className='tickets-table-row3'>
                    <FormDialog
                        dialogtitle={
                            <table>
                                <tr className='adminnotification' onClick={() => Notificationupdate(tickets.ticketsId, tickets.Notification)}>
                                    <td>Ticket No {tickets.ticketsId}</td>
                                    <td>{tickets.Username}</td>
                                    <td>{tickets.Date}</td>
                                    <td>{tickets.Notification} </td>
                                </tr>
                            </table>
                        }
                        dialogbody={
                            <div className='ticket-details'>
                                <div className='ticket details-title'>Ticket NO {tickets.ticketsId}</div>
                                <div className='ticket details-name'>
                                    <label className="label">Username</label>
                                    <div className='ticket-input-details' >{tickets.Username}</div>
                                </div>
                                <div className='ticket details-no'>
                                    <label className="label">Phonenumber</label>
                                    <div className='ticket-input-details' >{tickets.Phonenumber}</div>
                                </div>
                                <div className='ticket details-domain'>
                                    <label className="label">DomainName</label>
                                    <div className='ticket-input-details' >{tickets.DomainName}</div>
                                </div>
                                <div className='ticket details-Date'>
                                    <label className="label">Date</label>
                                    <div className='ticket-input-details' > {tickets.Date}</div>
                                </div>
                                <div className='ticket details-Des'>
                                    <label className="label">Description</label>
                                    <div className='ticket-input-details' > {tickets.Description}</div>
                                </div>
                                <div className='ticket details-Status'><label className="label">Status</label>
                                    <div  >Updated at {tickets.statusUpdateTime}</div>
                                    <div className={tickets.Status} > {tickets.Status}</div>
                                </div>
                                <div className='ticket details-Team' ><label className="label">Team</label>
                                    <div className='ticket-input-details' > {tickets.Team}</div></div>
                                <div className='ticket details-screenshots'><img src={tickets.screenshots} alt="screenshots" height="80vh" width="50%" /></div>
                            </div>
                        }
                    />
                </div>
            )}
        </div>
    );
}
export default AdminNotification;