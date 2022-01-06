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
        router.push("/components/login/login")
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
  const onBackButtonEvent3 = () => {
    router.push("/components/login/login")
    localStorage.setItem('loggedin', false);
    localStorage.removeItem('tm_name');
  }
  return  ( 

    
     <>{login==="false"? <div className="access ">access denied</div>:
     <div>
     <Dashboard
       logout={onBackButtonEvent3}
       sidenavcontent={
         <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"> <ListItem button>
           <ListItemIcon>
             <AccountCircleIcon />
           </ListItemIcon>
           <ListItemText primary="Profile" />
         </ListItem>
         </button>
       }
       headertext="USER DASHBOARD"
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
             <div className="tab-pane fade show active" id="v-pills-dash" role="tabpanel" aria-labelledby="v-pills-home-tab">
             <div className='main-dash'>
                   <div className='main-dash-sub' >
                     <div className='dash-head'>
                       <h2>Dashboaard</h2>
                     </div>
                     <div className='dash-body'>
                       <div className='dash-cards'>
                         <div className='row'>
                           <Dashcard
                             cardHead="No of Tickets assigned"
                             cardbody="50k"
                             cardfooter="last Ticket no"
                             cardIcon={<FontAwesomeIcon icon={faTicketAlt} />}
                           />
                           <Dashcard
                             cardHead="No of tickets inprogress"
                             cardbody="10k"
                             cardfooter="last Ticket no"
                             cardIcon={<FontAwesomeIcon icon={faUsers} />}
                           />
                           <Dashcard
                             cardHead="No of tickets in completed"
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
             <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-messages-tab">
              profile
             </div>
             <div className="tab-pane fade" id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
          <Teamticket  />
             </div>
           </div>
         </div>
       } />
   </div>}</>
    

  )
}
export default withRouter(TeamDashboard);