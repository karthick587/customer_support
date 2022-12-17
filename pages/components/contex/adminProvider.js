import {createContext,useState,useEffect} from "react";
import Axios from "axios";
export const CounterContext = createContext();

export default function CounterContextProvider(props){
    const[testing,setTesting]=useState(false)
    const[showvalue,setshowvalue]=useState("")
    const [dialogformopen, setdialogformopen] = useState(false);
    var [tickets, setTickets] = useState([]);
    //notification count
 
    //tickets count 
    let ticketscount = 0;
    ticketscount = tickets.length;
    //team tickets filter function
    var [search1, setSearch1] = useState('');
    const[designTeamList,setdesignTeamList]=useState([])
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data))
            .catch((err)=>{ return err; })
    },[]);
    
    //team tickets filter function
    useEffect(() => {
        setSearch1(window.localStorage.getItem('tm_name'))
    },[]);

   function addTeammember(teamId){
       
        setdesignTeamList([...designTeamList,teamId])     
   }
   function removeTeammember(teamId){
        setdesignTeamList([...designTeamList].filter((val)=> {if(val!==teamId){ return val }}))
   }
   const [notificationcount, setnotificationcount] = useState();
   const [adminNewcount, setadminNewcount] = useState();
   const [adminStartedcount, setadminStartedcount] = useState();
   const [adminprogresscount, setadminprogresscount] = useState();
   const [adminCompletedcount, setadminCompletedcount] = useState();
   useEffect(() => {
    setnotificationcount(tickets.filter(val => { return val.Notification.toLowerCase().includes("unseen") }).map((ticket) => setnotificationcount(ticket.Notification.length)).length);
    setadminNewcount(tickets.filter(val => { return val.Status.toLowerCase().includes("New".toLowerCase()) }).map((ticket) => setadminNewcount(ticket.Status.length)).length);
    setadminStartedcount(tickets.filter(val => { return val.Status.toLowerCase().includes("started".toLowerCase()) }).map((ticket) => setadminStartedcount(ticket.Status.length)).length);
    setadminprogresscount(tickets.filter(val => { return val.Status.toLowerCase().includes("inprogress".toLowerCase()) }).map((ticket) => setadminprogresscount(ticket.Status.length)).length);
    setadminCompletedcount(tickets.filter(val => { return val.Status.toLowerCase().includes("completed".toLowerCase() )}).map((ticket) => setadminCompletedcount(ticket.Status.length)).length);
},[tickets]);

  const Email = {
    send: function (a) {
        return new Promise(function (n, e) {
            (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
            var t = JSON.stringify(a);
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
                n(e);
            });
        });
    },
    ajaxPost: function (e, n, t) {
        var a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            (a.onload = function () {
                var e = a.responseText;
                null != t && t(e);
            }),
            a.send(n);
    },
    ajax: function (e, n) {
        var t = Email.createCORSRequest("GET", e);
        (t.onload = function () {
            var e = t.responseText;
            null != n && n(e);
        }),
            t.send();
    },
    createCORSRequest: function (e, n) {
        var t = new XMLHttpRequest();
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest()).open(e, n) : (t = null), t;
    },
};
const[onlogout,setonlogout]=useState(false)


    return(
        <CounterContext.Provider value={{
            setonlogout,
            onlogout,
            Email,
            showvalue,
            setshowvalue,
            testing,
            setTesting,
            designTeamList,
            setdesignTeamList,
            removeTeammember,
            addTeammember,
            setdialogformopen,
            tickets,
            notificationcount,
            ticketscount,
            adminNewcount,
            adminStartedcount,
            adminprogresscount,
            adminCompletedcount,
            dialogformopen
            }}>
            {props.children}
        </CounterContext.Provider>
    )
}
