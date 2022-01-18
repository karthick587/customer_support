import { useState, useEffect } from 'react';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faUsers, faUser } from '@fortawesome/free-solid-svg-icons'
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
import Axios from 'axios';
import AdminNotification from '../notification/adminNotifiction';
const AdminDashboard = (props) => {
  const router = useRouter();
 
  const [finishStatus, setfinishStatus] = useState(false);
  const [login, setLogin] = useState()
  useEffect(() => {
    setLogin(window.localStorage.getItem('loggedin'))
   
    if (login === "false") {
      router.push("/")
    } else if (login === null) {
      router.push("/")
    }
  })
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to Logout ?")) {
        setfinishStatus(true)
        // your logic
        localStorage.setItem('loggedin', false);
        router.push("/")
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
  const onBackButtonEvent2 = () => {
    localStorage.setItem('loggedin', false)
    localStorage.removeItem('activeTab');
    router.push("/")
  }
  // dashtab
  const DashTabActive = () => {
    localStorage.setItem('activeTab', "Dashboard")
  }
  // tickettab
  const TicketTabActive = () => {
    localStorage.setItem('activeTab', 'ticket')
  }
  // usertab
  const UserTabActive = () => {
    localStorage.setItem('activeTab', 'user')
  }
  // teamtab
  const TeamTabActive = () => {
    localStorage.setItem('activeTab', 'team')
  }
  const[notificationcount,setnotificationcount]=useState()
  const [activeTab, setActivetab] = useState(" ")
  useEffect(() => {
    setActivetab(window.localStorage.getItem('activeTab'))
   
  }, [])
  // usercount
  var [users, setUsers] = useState([]);
  const [usercount, setusercount] = useState();
  useEffect(() => {
    Axios.get("https://mindmadetech.in/api/customer/list")
      .then((res) => setUsers(res.data))
  },[users]);

  useEffect(()=>{
    setusercount(users.filter(val => {return val.Isdeleted.toLowerCase().includes("n") }).map((userd) =>setusercount(userd.Status)).length)
   
  })
  
  // ticketscount
  var [tickets, setTickets,] = useState([]);
  useEffect(() => {
    Axios.get("https://mindmadetech.in/api/tickets/list")
      .then((res) => setTickets(res.data));
  },[tickets]);
  let ticketscount = 0;
  ticketscount = tickets.length
  //team members count
  var [team, setTeam] = useState([]);
  const [teamcount, setteamcount] = useState();
  useEffect(() => {
    Axios.get("https://mindmadetech.in/api/team/list")
      .then((res) => setTeam(res.data));
  },[team]);
  useEffect(()=>{
    setteamcount(team.filter(val => {return val.Isdeleted.toLowerCase().includes("n") }).map((teams) =>setteamcount(teams.Status)).length)
  })
 

  const[adminnotificationcount,adminsetnotificationcount]=useState()
 const handleCallback = (childData) =>{
  adminsetnotificationcount(childData)
}
  return (
    <>{login === "false" ? <div className="access ">access denied</div> :
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
          Notificationscount={adminnotificationcount}
          notificationbody={
            <><AdminNotification 
            parentCallback = {handleCallback}
            /></>
          }
          sidenavcontent={
            <>
              <button className={activeTab === "user" ? "nav-link active" : "nav-link"} onClick={UserTabActive} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-users" type="button" role="tab" href="./users" ><ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              </button>
              <button className={activeTab === "team" ? "nav-link active" : "nav-link"} onClick={TeamTabActive} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-team" type="button" role="tab" href="./users" ><ListItem button>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Team" />
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
                              cardfooter="last Ticket no"
                              cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                            />
                            <Dashcard
                              cardHead="No of users"
                              cardbody={usercount}
                              cardfooter="last Ticket no"
                              cardIcon={<FontAwesomeIcon icon={faUser} />}
                            />
                            <Dashcard
                              cardHead="No of Team members"
                              cardbody={teamcount}
                              cardfooter="last Ticket no"
                              cardIcon={<FontAwesomeIcon icon={faUsers} />}
                            />
                          </div>
                        </div>
                        <div className='piechart'>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={activeTab === "user" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-users" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  <Users />
                </div>
                <div className={activeTab === "ticket" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  <Adminticket  parentCallback = {handleCallback} />
                </div>
                <div className={activeTab === "team" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-team" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  <Team />

                </div>
                <div className="tab-pane fade" id="v-pills-ticket" role="tabpanel" aria-labelledby="v-pills-ticket-tab">
                  product details
                </div>
              </div>
            </div>
          }
        />
      </div>
    }</>
  )
}
export default AdminDashboard