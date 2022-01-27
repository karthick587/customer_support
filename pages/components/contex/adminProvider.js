import {createContext,useState,useEffect} from "react";
import Axios from "axios";
export const CounterContext = createContext();

export default function CounterContextProvider(props){
    var [tickets, setTickets] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data));
    }, [tickets]);
     //notification count
     const [notificationcount, setnotificationcount] = useState()
     const [adminNewcount, setadminNewcount] = useState()
     const [adminStartedcount, setadminStartedcount] = useState()
     const [adminprogresscount, setadminprogresscount] = useState()
     const [adminCompletedcount, setadminCompletedcount] = useState()
     useEffect(() => {
         setnotificationcount(tickets.filter(val => { return val.Notification.toLowerCase().includes("unseen") }).map((ticket) => setnotificationcount(ticket.Notification.length)).length)
         setadminNewcount(tickets.filter(val => { return val.Status.toLowerCase().includes("New".toLowerCase()) }).map((ticket) => setadminNewcount(ticket.Status.length)).length)
         setadminStartedcount(tickets.filter(val => { return val.Status.toLowerCase().includes("started".toLowerCase()) }).map((ticket) => setadminStartedcount(ticket.Status.length)).length)
         setadminprogresscount(tickets.filter(val => { return val.Status.toLowerCase().includes("inprogress".toLowerCase()) }).map((ticket) => setadminprogresscount(ticket.Status.length)).length)
         setadminCompletedcount(tickets.filter(val => { return val.Status.toLowerCase().includes("completed".toLowerCase() )}).map((ticket) => setadminCompletedcount(ticket.Status.length)).length)
     }, [tickets])
     //tickets count 
    let ticketscount = 0;
    ticketscount = tickets.length
    return(
        <CounterContext.Provider value={{tickets,notificationcount,ticketscount,adminNewcount,adminStartedcount,adminprogresscount,adminCompletedcount}}>
            {props.children}
        </CounterContext.Provider>
    )
}
