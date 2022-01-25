import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Dashboard from "../common/navdashboard";
import { withRouter } from "next/router";
import Axios from "axios";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import router from "next/router";
import Teamticket from "../tickets/teamticket";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import Dashcard from "../common/dashCard";
const TeamDashboard = (props) => {
  const [finishStatus, setfinishStatus] = useState(false);
  const [login, setLogin] = useState()
  //access for team dashboard
  useEffect(() => {
    setLogin(window.localStorage.getItem('loggedin'))
    if (login === "false") {
      router.push("/")
    } else if (login === null) {
      router.push("/")
    }
  })
  //alert to conform logout
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to Logout ?")) {
        setfinishStatus(true)
        // your logic
        router.push("/")
        localStorage.setItem('loggedin', false);
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false)
      }
    }
  }
  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);
  //logout function
  const onBackButtonEvent3 = () => {
    router.push("/")
    localStorage.setItem('loggedin', false);
    localStorage.removeItem('tm_name');
    localStorage.removeItem('activeTab');
  }
  //dashboard tab functions
  // dashtab
  const DashTabActive = () => {
    localStorage.setItem('activeTab', "Dashboard")
  }
  // tickettab
  const TicketTabActive = () => {
    localStorage.setItem('activeTab', 'ticket')
  }
  // usertab
  const profileTabActive = () => {
    localStorage.setItem('activeTab', 'profile')
  }
  // // activetab
  var [activeTab, setActivetab] = useState(" ")
  useEffect(() => {
    setActivetab(window.localStorage.getItem('activeTab'))
  }, [])

  //get tickets status count value from teamticket 
  const [inprogresscount, setinprogresscount] = useState()
  const [assignedcount, setassignedcount] = useState()
  const [completedcount, setcompletedcount] = useState()
  const [teamNotificationcount, setteamNotificationcount] = useState()
  const [tickets, setTickets] = useState([]);
  const assignedcallback = (childData) => {
    setassignedcount(childData)
  }
  const inprogresscallback = (childData) => {
    setinprogresscount(childData)
  }
  const completedcallback = (childData) => {
    setcompletedcount(childData)
  }
  const teamNotificationcallback = (childData) => {
    setteamNotificationcount(childData)
  }
  const ticketscallback = (childData) => {
    setTickets(childData)
  }
  return (
    <>{login === "false" ? <div className="access ">access denied</div> :
      <div>
        <Dashboard
          dashActive={activeTab === "Dashboard" ? "nav-link active" : "nav-link"}
          ticketActive={activeTab === "ticket" ? "nav-link active" : "nav-link"}
          TicketTabActive={TicketTabActive}
          DashTabActive={DashTabActive}
          logout={onBackButtonEvent3}
          sidenavcontent={
            <button className={activeTab === "profile" ? "nav-link active" : "nav-link"} onClick={profileTabActive} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"> <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            </button>
          }
          headertext="USER DASHBOARD"
          Notificationscount={teamNotificationcount}
          navcontent={
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              TEAM Dashboard
            </Typography>
          }
          tabbody={
            <div className="tab-body" maxwidth="lg" sx={{ mt: 4, mb: 4 }}>
              <div className="tab-content" id="v-pills-tabContent">
                <div className={activeTab === "Dashboard" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-dash" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <div className='main-dash'>
                    <div className='main-dash-sub' >
                      <div className='dash-head'>
                        <h2>Dashboaard</h2>
                      </div>
                      <div className='dash-body'>
                        <div className='dash-cards'>
                          <div className='row'>
                            <Dashcard
                              cardHead="Tickets assigned"
                              cardbody={assignedcount}
                              cardfooter="last Ticket no"
                              cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                            />
                            <Dashcard
                              cardHead="Tickets in inprogress"
                              cardbody={inprogresscount}
                              cardfooter="last Ticket no"
                              cardIcon={<FontAwesomeIcon icon={faUsers} />}
                            />
                            <Dashcard
                              cardHead="Tickets completed"
                              cardbody={completedcount}
                              cardfooter="last Ticket no"
                              cardIcon="icon3"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="dash-body-middle">
                        <div className="dash-cards-2">
                          <div className="row">
                            <div className="col">
                              <div className="dash-cards-2-left">
                                {tickets.filter(val => {
                                  return val.Status.toLowerCase().includes("new")
                                }).map((tickets) =>
                                  <div className="flex" key={tickets.ticketsId}>
                                      <div className='width-10'>{tickets.ticketsId}</div>
                                      <div className='width-20'>{tickets.Username}</div>
                                      <div className='width-20'>{tickets.Date}</div>
                                      <div className='width-20'>{tickets.Status}</div>
                                    </div>
                                  
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="dash-cards-2-right ">
                                right
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={activeTab === "profile" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  profile
                </div>
                <div className={activeTab === "ticket" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  <Teamticket
                    assignedcount={assignedcallback}
                    inprogresscount={inprogresscallback}
                    completedcount={completedcallback}
                    teamNotificationcount={teamNotificationcallback}
                    tickets={ticketscallback}
                  />
                </div>
              </div>
            </div>
          } />
      </div>}
    </>
  )
}
export default withRouter(TeamDashboard);
