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
import FormAlert from '../common/alert';
import { ListContext } from '../contex/ListProvider';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import CustomerChangePass from '../profile/CustomerChangePass';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
const AdminDashboard = () => {

  const { notificationcount, ticketscount, adminNewcount, adminStartedcount, adminprogresscount, adminCompletedcount } = useContext(CounterContext);
  const {teamcount,usercount}=useContext(ListContext)
  const router = useRouter();
  const [finishStatus, setfinishStatus] = useState(false);
  const [login, setLogin] = useState();
  const [activeTab, setActivetab] = useState("x");
  const[adname,setadname]=useState()
  // cannot access page without login
  useEffect(() => {
    setLogin(window.localStorage.getItem('loggedin'));
    if (login === "false") {
      router.push("/");
    } else if (login === null) {
      router.push("/");
    }
    setadname(window.localStorage.getItem('ad_email'))
  },[login,setLogin]);
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
  },[]);
  // logout function
  const onBackButtonEvent2 = () => {
    localStorage.setItem('loggedin', false);
    localStorage.removeItem('activeTab');
    router.push("/");
  };
  // getactivetab
  useEffect(() => {
    if(activeTab==="x"){
      setActivetab(window.localStorage.getItem('activeTab'));
    }
   
  },[activeTab,setActivetab]);

  const[pendingCount,setpendingCount]=useState('')
  function callback(childData){
    setpendingCount(childData)
  }
  
  return (
    <>
      {login === "false" ? <div className="access "> <CircularProgress /></div> :
        <div>
          <Dashboard
            dashActive={activeTab === "Dashboard" ? "nav-link active" : "nav-link"}
            ticketActive={activeTab === "ticket" ? "nav-link active" : "nav-link"}
            TicketTabActive={()=>setActivetab('ticket')&localStorage.setItem('activeTab', 'ticket')}
            DashTabActive={()=>setActivetab('Dashboard')&localStorage.setItem('activeTab', 'Dashboard')}
            logout={onBackButtonEvent2}
            ChangePassword={<CustomerChangePass customername={adname} />}
            profileAlt={adname}
            email={adname}
            navcontent={
              <>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  ADMIN DASHBOARD
                </Typography>
              </>
            }
            shownotification={
              <AdminNotification 
              onclick={
              <IconButton className='z-index me-2' color="inherit"  >
              <Badge badgeContent={notificationcount} onClick={()=>setActivetab('ticket')&localStorage.setItem('activeTab', 'ticket')} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              } Notification={notificationcount} />
               }         
            sidenavcontent={
              <>
                <button className={activeTab === "user" ? "nav-link active" : "nav-link"} onClick={()=>setActivetab('user')&localStorage.setItem('activeTab', 'user')} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-users" type="button" role="tab" href="/users" ><ListItem button>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clients" />
                </ListItem>
                </button>
                <button className={activeTab === "team" ? "nav-link active" : "nav-link"} onClick={()=>setActivetab('team')&localStorage.setItem('activeTab', 'team')} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-team" type="button" role="tab" href="/users" ><ListItem button>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Team" />
                </ListItem>
                </button>
                <button className={activeTab === "NonUser" ? "nav-link active" : "nav-link"} onClick={()=>setActivetab('NonUser')&localStorage.setItem('activeTab', 'NonUser')} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-NonUser" type="button" role="tab" href="/users" ><ListItem button>
                  <ListItemIcon>
                  <Badge className='side-badge' badgeContent={pendingCount} color="secondary">
                    <PersonAddAltIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Unregistered" />
                </ListItem>
                </button>
                <button className={activeTab === "RaiseTicket" ? "nav-link active" : "nav-link"} onClick={()=>setActivetab('RaiseTicket')&localStorage.setItem('activeTab', 'RaiseTicket')} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-RaiseTicket" type="button" role="tab" href="/users" ><ListItem button>
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
                  <div className={activeTab === "Dashboard" ? "tab-pane fade show active" : "tab-pane fade"}>
                    <div className='main-dash'>
                      <div className='main-dash-sub' >
                      <div className='dash-head mt-1 mb-1'>
                          <h1>DASHBOARD</h1>
                        </div>
                        <div className='dash-body'>
                          <div className='dash-cards'>
                            <div className='row'>
                              <Dashcard
                                cardHead="No of Tickets"
                                cardbody={ticketscount}
                                cardfooter="Raised"
                                cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                              />
                              <Dashcard
                                cardHead="No of Clients"
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
                               <Dashcard
                                cardHead="No of Inprogress"
                                cardbody={adminprogresscount}
                                cardfooter="Tickets"
                                cardIcon={<HourglassTopIcon className='inprogress-icon' />}
                              />
                            </div>
                          </div>
                          <div className='Resentticket-page'>
                            <Resentticket />
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
                  <div className={activeTab === "user" ? "tab-pane fade show active" : "tab-pane fade"} >
                    <Users />
                  </div>
                  <div className={activeTab === "ticket" ? "tab-pane fade show active" : "tab-pane fade"} >
                    <Adminticket />
                  </div>
                  <div className={activeTab === "team" ? "tab-pane fade show active" : "tab-pane fade"} >
                    <Team  />
                  </div>
                  <div className={activeTab === "NonUser" ? "tab-pane fade show active" : "tab-pane fade"} >
                  <NonUserTickets callback={callback} />
                  </div>
                  <div className={activeTab === "RaiseTicket" ? "tab-pane fade show active" : "tab-pane fade"} >
                   <Adminissues />
                  </div>
                  <div className="tab-pane fade" id="v-pills-ticket" role="tabpanel" aria-labelledby="v-pills-ticket-tab">
                    product details
                  </div>
                </div>
              </div>
            }
          />
            <FormAlert />
        </div>
      }
    </>
  )
}
export default AdminDashboard;