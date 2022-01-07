import { useState, useEffect } from 'react';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
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
import { withRouter } from "next/router";
import Dashcard from '../common/dashCard';
import GroupsIcon from '@mui/icons-material/Groups';



const AdminDashboard = (props) => {
  
  const router = useRouter();
  console.log(router.query.name);
  const [finishStatus, setfinishStatus] = useState(false);
  const[login,setLogin]=useState()
  useEffect(()=>{
    setLogin(window.localStorage.getItem('loggedin'))
    console.log(login)
   if(login==="false"){
    router.push("/components/login/login")
   } else if(login === null){
    router.push("/components/login/login")
   }

  })
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to Logout ?")) {
        setfinishStatus(true)
        // your logic
        localStorage.setItem('loggedin', false);
        router.push("/components/login/login")
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
    router.push("/components/login/login")
  }
 
// dashtab
  const DashTabActive=()=>{
    localStorage.setItem('activeTab', "Dashboard")
  }
// tickettab
  const TicketTabActive=()=>{
   localStorage.setItem('activeTab', 'ticket')
  }
  // usertab
  const UserTabActive=()=>{
    localStorage.setItem('activeTab', 'user')
  }
  // teamtab
  const TeamTabActive=()=>{
   localStorage.setItem('activeTab', 'team')
  }
  var[activeTab,setActivetab]=useState(" ")
useEffect(()=>{
  setActivetab(window.localStorage.getItem('activeTab'))
},[])
 
  return (
    <>{login==="false"? <div className="access ">access denied</div>:
      <div>
        <Dashboard

dashActive={activeTab==="Dashboard" ? "nav-link active":"nav-link"}
ticketActive={activeTab==="ticket" ? "nav-link active":"nav-link"}
TicketTabActive={TicketTabActive}
DashTabActive={DashTabActive}
          logout={onBackButtonEvent2}
          navcontent={
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              ADMIN Dashboard
            </Typography>
          }
          sidenavcontent={
            <>
              <button className={activeTab==="user" ? "nav-link active":"nav-link"} onClick={UserTabActive} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-users" type="button" role="tab" href="./users" ><ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              </button>
              <button className={activeTab==="team" ? "nav-link active":"nav-link"} onClick={TeamTabActive} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-team" type="button" role="tab" href="./users" ><ListItem button>
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
                <div className={activeTab==="Dashboard" ? "tab-pane fade show active":"tab-pane fade"} id="v-pills-dash" role="tabpanel" aria-labelledby="v-pills-home-tab">
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
                              cardbody="50k"
                              cardfooter="last Ticket no"
                              cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                            />
                            <Dashcard
                              cardHead="No of users"
                              cardbody="10k"
                              cardfooter="last Ticket no"
                              cardIcon={<FontAwesomeIcon icon={faUsers} />}
                            />
                            <Dashcard
                              cardHead="Tickets status"
                              cardbody="5k"
                              cardfooter="last Ticket no"
                              cardIcon="icon3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={activeTab==="user" ? "tab-pane fade show active":"tab-pane fade"} id="v-pills-users" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  <Users />
                </div>
                <div className={activeTab==="ticket" ? "tab-pane fade show active":"tab-pane fade"} id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  <Adminticket />
                </div>
                <div className={activeTab==="team" ? "tab-pane fade show active":"tab-pane fade"} id="v-pills-team" role="tabpanel" aria-labelledby="v-pills-settings-tab">
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