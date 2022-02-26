import { useState, useEffect, useContext } from 'react';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';
import "@fortawesome/fontawesome-svg-core/styles.css";
import Dashboard from '../common/navdashboard';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleIcon from '@mui/icons-material/People';
import ListItemText from '@mui/material/ListItemText';
import Users from '../users';
import Team from '../team';
import { useRouter } from 'next/router';
import Adminticket from '../tickets/adminticket';
import Dashcard from '../common/dashCard';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminNotification from '../notification/adminNotifiction';
import Resentticket from './resentTickets';
import Copyrights from '../common/copyRight';
import { CounterContext } from '../contex/adminProvider';
import Piechart from './piechart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import NonUserTickets from '../tickets/non_userTickets';
import Adminissues from '../submits/adminIssues';
import SendIcon from '@mui/icons-material/Send';
const AdminDashboard = () => {

  const { tickets, notificationcount, ticketscount, adminNewcount, adminStartedcount, adminprogresscount, adminCompletedcount } = useContext(CounterContext);
  const router = useRouter();
  const [finishStatus, setfinishStatus] = useState(false);
  const [login, setLogin] = useState();
  // getactivetab
  const [activeTab, setActivetab] = useState();
  // usercount
  const [usercount, setusercount] = useState();
   //team members count
   const [teamcount, setteamcount] = useState();

  // cannot access page without login
  useEffect(() => {
    setLogin(window.localStorage.getItem('loggedin'));
    if (login === "false") {
      router.push("/");
    } else if (login === null) {
      router.push("/");
    }
  });

  // alert to conform logout white click back
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to Logout ?")) {
        setfinishStatus(true);
        localStorage.setItem('loggedin', false);
        router.push("/");
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
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

  // logout function
  const onBackButtonEvent2 = () => {
    localStorage.setItem('loggedin', false);
    localStorage.removeItem('activeTab');
    router.push("/");
  };
  // dashtab
  const DashTabActive = () => {
    localStorage.setItem('activeTab', 'Dashboard');
    setActivetab('Dashboard');
  };
  // tickettab
  const TicketTabActive = () => {
    localStorage.setItem('activeTab', 'ticket');
    setActivetab('ticket');
  };
  // usertab
  const UserTabActive = () => {
    localStorage.setItem('activeTab', 'user');
    setActivetab('user');
  };
  // teamtab
  const TeamTabActive = () => {
    localStorage.setItem('activeTab', 'team');
    setActivetab('team');
  };
   // NonUserTabActive
   const NonUserTabActive = () => {
    localStorage.setItem('activeTab', 'NonUser');
    setActivetab('NonUser');
  };
   // RaiseTicket
   const RaiseTicket = () => {
    localStorage.setItem('activeTab', 'RaiseTicket');
    setActivetab('RaiseTicket');
  };
  // getactivetab
  useEffect(() => {
    setActivetab(window.localStorage.getItem('activeTab'));
  }, []);
  // usercount
  const handleCallback3 = (childData) => {
    setusercount(childData);
  };
  //team members count
  const handleCallback4 = (childData) => {
    setteamcount(childData);
  }
  return (
    <>
      {login === "false" ? <div className="access ">access denied</div> :
        <div>
          <Dashboard
            dashActive={activeTab === "Dashboard" ? "nav-link active" : "nav-link"}
            ticketActive={activeTab === "ticket" ? "nav-link active" : "nav-link"}
            TicketTabActive={TicketTabActive}
            DashTabActive={DashTabActive}
            logout={onBackButtonEvent2}
            navcontent={
              <>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  ADMIN Dashboard
                </Typography>
              </>
            }
            shownotification={
              <AdminNotification 
              onclick={
              <IconButton className='z-index' color="inherit" >
              <Badge badgeContent={notificationcount} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              } Notification={notificationcount} />
               }         
            sidenavcontent={
              <>
                <button className={activeTab === "user" ? "nav-link active" : "nav-link"} onClick={UserTabActive} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-users" type="button" role="tab" href="/users" ><ListItem button>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
                </button>
                <button className={activeTab === "team" ? "nav-link active" : "nav-link"} onClick={TeamTabActive} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-team" type="button" role="tab" href="/users" ><ListItem button>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Team" />
                </ListItem>
                </button>
                <button className={activeTab === "NonUser" ? "nav-link active" : "nav-link"} onClick={NonUserTabActive} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-NonUser" type="button" role="tab" href="/users" ><ListItem button>
                  <ListItemIcon>
                    <PersonAddAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="NonUser" />
                </ListItem>
                </button>
                <button className={activeTab === "RaiseTicket" ? "nav-link active" : "nav-link"} onClick={RaiseTicket} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-RaiseTicket" type="button" role="tab" href="/users" ><ListItem button>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="Raise Tickets" />
                </ListItem>
                </button>
              </>
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
                                cardHead="No of Tickets"
                                cardbody={ticketscount}
                                cardfooter="Rised"
                                cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                              />
                              <Dashcard
                                cardHead="No of users"
                                cardbody={usercount}
                                cardfooter="Active"
                                cardIcon={<FontAwesomeIcon icon={faUser} />}
                              />
                              <Dashcard
                                cardHead="No of Team members"
                                cardbody={teamcount}
                                cardfooter="Active"
                                cardIcon={<FontAwesomeIcon icon={faUsers} />}
                              />
                            </div>
                          </div>
                          <div className='Resentticket-page'>
                            <Resentticket tickets={tickets} />
                            <Piechart
                              newcount={adminNewcount}
                              started={adminStartedcount}
                              inprogress={adminprogresscount}
                              completed={adminCompletedcount}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='copyright-com'>
                        <Copyrights />
                      </div>
                    </div>
                  </div>
                  <div className={activeTab === "user" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-users" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                    <Users usercountcallback={handleCallback3} />
                  </div>
                  <div className={activeTab === "ticket" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                    <Adminticket />
                  </div>
                  <div className={activeTab === "team" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-team" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                    <Team teamcountcallback={handleCallback4} />
                  </div>
                  <div className={activeTab === "NonUser" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-NonUser" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                   <NonUserTickets />
                  </div>
                  <div className={activeTab === "RaiseTicket" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-RaiseTicket" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                   <Adminissues />
                  </div>
                  <div className="tab-pane fade" id="v-pills-ticket" role="tabpanel" aria-labelledby="v-pills-ticket-tab">
                    product details
                  </div>
                </div>
              </div>
            }
          />
        </div>
      }
    </>
  )
}
export default AdminDashboard;