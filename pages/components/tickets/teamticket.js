import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from "axios";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import FormDialog from '../common/dialogsform';
import { useRouter } from 'next/router'

function Teamticket() {
    const Router = useRouter()

    var [show, setShow] = useState('');
    var [tickets, setTickets] = useState([]);

    var [statusUpdateTime, setStatusUpdateTime] = useState('');
    var [selectedValue, setSelectedValue] = useState('');

    console.log(selectedValue)
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/tickets/list")
            .then((res) => setTickets(res.data));
    }, []);

    var [selectedstatus, setSelectedstatus] = useState('');
    function handlestatus(e) {
        setSelectedstatus(e.target.value)
    }




    function handleUpdatestatus(ticketsId) {

        console.log(ticketsId)
        console.log(statusUpdateTime)

        Axios.put(`https://mindmadetech.in/api/tickets/updatestatus/${ticketsId}`, {
            Status: selectedstatus,
            ticketsId: ticketsId,
            statusUpdateTime: fulldate + ' ' + fullTime
        }).then((response) => {
            setShow("update Successfully");
            Router.reload(window.location.pathname)
        });


    }

    var date, TimeType, hour, minutes, seconds, fullTime, dateupadate, monthupadate, yearupadate, fulldate;
    date = new Date();
    hour = date.getHours();
    if (hour <= 11) {
        TimeType = 'AM';
    }
    else {
        TimeType = 'PM';
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour == 0) {
        hour = 12;
    }
    minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes.toString();
    }
    seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds.toString();
    }
    dateupadate = date.getDate();
    monthupadate = (date.getMonth() + 1);
    yearupadate = date.getFullYear();
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString()
    fulldate = dateupadate.toString() + '-' + monthupadate.toString() + '-' + yearupadate.toString()

    var [teamname, setTeamname] = useState(" ");

    var [search1, setSearch1] = useState('');
    useEffect(() => {
        setSearch1(window.localStorage.getItem('tm_name'))
    })
    console.log(teamname)
    console.log(search1)
    var [team, setTeam] = useState([]);
    useEffect(() => {
        Axios.get("https://mindmadetech.in/api/team/list")
            .then((res) => setTeam(res.data));
    }, []);
    useEffect(() => {
        {
            team.filter(val => {
                return val.Username.toLowerCase().includes(search1)
            }).map((item) => setTeamname(item.Team),

            )
        }

    })

    const [login, setLogin] = useState()
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'))
        console.log(login)
        if (login === "false") {
            router.push("/components/login/login")
        } else if (login === null) {
            router.push("/components/login/login")
        }

    })







    return (
        <div>

            <Head>
                <title>Admin Dashboard</title>
            </Head>

            <div className="teambody">
                <div className='adminticket-head'>
                    <h1>Tickets</h1>
                </div>
                <TableContainer component={Paper}>
                    <div className='tickets-bodyrow3'>
                        <div >TicketId</div>
                        <div>Username</div>
                        <div >Date</div>
                        <div>Team</div>
                        <div>Status</div>
                    </div>
                 
                </TableContainer>
            </div>


        </div>
    );
}
export default Teamticket;