import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Dashboard from "../common/navdashboard";
import { withRouter } from "next/router";
import router from "next/router";
import Teamticket from "../tickets/teamticket";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import Dashcard from "../common/dashCard";
import Resentticket from "./resentTickets";
import Piechart from "./piechart";
import Axios from "axios";
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Copyrights from "../common/copyRight";
import FormAlert from "../common/alert";
import TeamPiechart from "./teamPiechart";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CustomerChangePass from "../profile/CustomerChangePass";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
const TeamDashboard = () => {
  const [finishStatus, setfinishStatus] = useState(false);
  const [login, setLogin] = useState();
  // activetab
  var [activeTab, setActivetab] = useState(" ");
  var [loginTmName, setloginTmName] = useState();
  var [teamticket, setteamticket] = useState([]);
  // ticket count, ticket status count for team dashboard
  const [teamassignedcount, setassignedcount] = useState();
  const [teaminprogresscount, setinprogresscount] = useState();
  const [teamstartedcount, setstartedcount] = useState();
  const [teamcompletedcount, setcompletedcount] = useState();
  const [teamteamNotificationcount, setteamNotificationcount] = useState();
  const[tmName,settmName]=useState()
  //access for team dashboard
  useEffect(() => {
    setLogin(window.localStorage.getItem('loggedin'));
    if (login === "false") {
      router.push("/");
    } else if (login === null) {
      router.push("/");
    }
  },[login]);
  //alert to conform logout
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to Logout ?")) {
        setfinishStatus(true);
        // your logic
        router.push("/");
        localStorage.setItem('loggedin', false);
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(true);
      }
    }
  };
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);
  //logout function
  const onBackButtonEvent3 = () => {
    router.push("/");
    localStorage.setItem('loggedin', false);
    localStorage.removeItem('activeTab');
  }
  // dashtab
  const DashTabActive = () => {
    localStorage.setItem('activeTab', "Dashboard");
  };
  // tickettab
  const TicketTabActive = () => {
    localStorage.setItem('activeTab', 'ticket');
  };
  // usertab
  const profileTabActive = () => {
    localStorage.setItem('activeTab', 'profile');
  };
   // activetab
  useEffect(() => {
    setActivetab(window.localStorage.getItem('activeTab'));
    settmName(window.localStorage.getItem('tm_name'))
  }, [setActivetab,settmName]);
  useEffect(() => {
      setloginTmName(loginTmName = window.localStorage.getItem('tm_name'));
        if (loginTmName !== "" || loginTmName !== undefined || loginTmName !== null) {
          Axios.get(`https://mindmadetech.in/api/tickets/teamtickets/${loginTmName}`)
            .then((res) => {
              setteamticket(res.data);
            })
            .catch((err) => { return err; })
        }
  },[teamticket,loginTmName]);
  // ticket count, ticket status count for team dashboard
  useEffect(() => {
    setassignedcount(teamticket.filter(val => { return val }).map((ticket) => setassignedcount(ticket.Status.length)).length);
    setstartedcount(teamticket.filter(val => { return val.Status.toLowerCase().includes("started") }).map((ticket) => setstartedcount(ticket.Status.length)).length);
    setinprogresscount(teamticket.filter(val => { return val.Status.toLowerCase().includes("inprogress") }).map((ticket) => setinprogresscount(ticket.Status.length)).length);
    setcompletedcount(teamticket.filter(val => { return val.Status.toLowerCase().includes("completed") }).map((ticket) => setcompletedcount(ticket.Status.length)).length);
    setteamNotificationcount(teamticket.filter(val => { return val.Status.toLowerCase().includes("new") }).map((ticket) => setteamNotificationcount(ticket.Status.length)).length);
  },[teamticket]);

  return (
    <>
      {login === "false" ? <div className="access ">access denied</div> :
        <div>
          <Dashboard
            dashActive={activeTab === "Dashboard" ? "nav-link active" : "nav-link"}
            ticketActive={activeTab === "ticket" ? "nav-link active" : "nav-link"}
            TicketTabActive={TicketTabActive}
            DashTabActive={DashTabActive}
            logout={onBackButtonEvent3}
            ChangePassword={<CustomerChangePass customername={tmName} />}
            profileAlt={tmName}
            email={tmName}
            headertext="TEAM DASHBOARD"
            shownotification={ <IconButton className='z-index' color="inherit" >
            <Badge badgeContent={teamteamNotificationcount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>}
            navcontent={
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                TEAM DASHBOARD
              </Typography>
            }
            tabbody={
              <div className="tab-body" maxwidth="lg" sx={{ mt: 4, mb: 4 }}>
                <div className="tab-content" id="v-pills-tabContent">
                  <div className={activeTab === "Dashboard" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-dash" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <div className='main-dash'>
                      <div className='main-dash-sub' >
                        <div className='dash-head'>
                          <h1>DASHBOARD</h1>
                        </div>
                        <div className='dash-body'>
                          <div className='dash-cards'>
                            <div className='row'>
                              <Dashcard
                                cardHead="Tickets assigned"
                                cardbody={teamassignedcount}
                              
                                cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                              />
                              <Dashcard
                                cardHead="Tickets in inprogress"
                                cardbody={teaminprogresscount}
                                
                                cardIcon={<HourglassTopIcon className='inprogress-icon' />}
                              />
                              <Dashcard
                                cardHead="Tickets completed"
                                cardbody={teamcompletedcount}
                                
                                cardIcon={<DoneAllIcon />}
                              />
                            </div>
                          </div>
                          <div className='Resentticket-page'>
                            <Resentticket teamticket={teamticket} />
                            <TeamPiechart
                              newcount={teamteamNotificationcount}
                              started={teamstartedcount}
                              inprogress={teaminprogresscount}
                              completed={teamcompletedcount}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='copyright-com'>
                        <Copyrights />
                      </div>
                    </div>
                  </div>
               
                  <div className={activeTab === "ticket" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  <Teamticket teamassignedcount={teamassignedcount} teamticket={teamticket} loginTmName={loginTmName} />
                  </div>
                </div>
              </div>
            } />
            <FormAlert />
        </div>
      }
    </>
  )
}
export default withRouter(TeamDashboard);
