import React, { useState, useEffect, useContext } from 'react';
import Axios from "axios";
import FormDialog from '../common/dialogsform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import Drawer from "@mui/material/Drawer";
import { TicketsContext } from '../contex/ticketsProvider';
import { CounterContext } from '../contex/adminProvider';
function AdminNotification(props) {
    const { tickets } = useContext(TicketsContext);
    const { notificationcount } = useContext(CounterContext)
    const [open, setopen] = useState()
    const [state, setState] = React.useState({
        right: false
    });
    const openclose = () => {
        setopen(!open)
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    function Notificationupdate(ticketsId) {
        Axios.put(`https://mindmadetech.in/api/tickets/updateNotification/${ticketsId}`, {
            Notification: "seen",
            ticketsId: ticketsId,
        }).then((_response) => {
            return _response;
        })
            .catch((err) => { return err; })
    };
    return (
        <>
            <div>
                <React.Fragment>
                    <div onClick={openclose}><div onClick={toggleDrawer("right", !open)}>{props.onclick}</div></div>
                    <Drawer
                        anchor={"right"}
                        open={state["right"]}
                        onClose={toggleDrawer("right", false)}
                    >
                        <div className='notification-body'>
                            {notificationcount === 0 ? <div className='noNotification'>No Notification</div> : <>
                                {tickets.filter(val => {
                                    return val.Notification.toLowerCase().includes("unseen")
                                }).map((tickets) => <>
                                    <div className='' key={tickets.ticketsId}>
                                        <div>
                                            <div className='notification-table-row flex' onClick={() => Notificationupdate(tickets.ticketsId, tickets.Notification)}>
                                                <div className='notification-table-left'>
                                                    <FontAwesomeIcon icon={faTicketAlt} />
                                                </div>
                                                <div className='notification-table-right'>
                                                    <div className='notification-table-right1 flex'>
                                                        <div className='width-10'>Ticket No {tickets.ticketsId}</div>
                                                        <div className='width-10 ps-2'>{tickets.Username}</div>
                                                    </div>
                                                    <div className='notification-table-right2'>
                                                        {tickets.Cus_CreatedOn === null ? <>{tickets.Adm_CreatedOn}</> : <>{tickets.Cus_CreatedOn}</>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                )}
                            </>}

                        </div>
                    </Drawer>
                </React.Fragment>
            </div>
        </>
    );
}
export default AdminNotification;