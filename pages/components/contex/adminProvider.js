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


     //team tickets filter function
     var [teamname, setTeamname] = useState(" ");
     var [search1, setSearch1] = useState('');
     useEffect(() => {
         setSearch1(window.localStorage.getItem('tm_name'))
     })
     var [team, setTeam] = useState([]);
     useEffect(() => {
         Axios.get("https://mindmadetech.in/api/team/list")
             .then((res) => setTeam(res.data));
     }, [team]);
     useEffect(() => {
         {
             team.filter(val => {
                 return val.Username.toLowerCase().includes(search1)
             }).map((item) => setTeamname(item.Team),
             )
         }
         localStorage.setItem('updateclose', "open");
     })
    //team ticket count
     // ticket count, ticket status count for team dashboard
     const [teamassignedcount, setassignedcount] = useState()
     const [teaminprogresscount, setinprogresscount] = useState()
     const [teamstartedcount, setstartedcount] = useState()
     const [teamcompletedcount, setcompletedcount] = useState()
     const [teamteamNotificationcount, setteamNotificationcount] = useState()
     useEffect(() => {
         setassignedcount(tickets.filter(val => { return val.Team.toLowerCase().includes(teamname) }).map((ticket) => setassignedcount(ticket.Team.length)).length)
         setstartedcount(tickets.filter(val => { return val.Team.toLowerCase().includes(teamname.toLowerCase()) && val.Status.toLowerCase().includes("started") }).map((ticket) => setstartedcount(ticket.Team.length)).length)
         setinprogresscount(tickets.filter(val => { return val.Team.toLowerCase().includes(teamname.toLowerCase()) && val.Status.toLowerCase().includes("inprogress") }).map((ticket) => setinprogresscount(ticket.Team.length)).length)
         setcompletedcount(tickets.filter(val => { return val.Team.toLowerCase().includes(teamname.toLowerCase()) && val.Status.toLowerCase().includes("completed") }).map((ticket) => setcompletedcount(ticket.Team.length)).length)
         setteamNotificationcount(tickets.filter(val => { return val.Team.toLowerCase().includes(teamname.toLowerCase()) && val.Status.toLowerCase().includes("new") }).map((ticket) => setteamNotificationcount(ticket.Team.length)).length)
     }, [tickets])
    return(
        <CounterContext.Provider value={{
            tickets,
            team,
            teamname,
            notificationcount,
            ticketscount,
            adminNewcount,
            adminStartedcount,
            adminprogresscount,
            adminCompletedcount,
            teamassignedcount,
            teaminprogresscount,
            teamstartedcount,
            teamcompletedcount,
            teamteamNotificationcount
            }}>
            {props.children}
        </CounterContext.Provider>
    )
}
