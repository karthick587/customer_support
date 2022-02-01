import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Dashboard from "../common/navdashboard";
import Userissue from "../submits/userissues";
import { withRouter } from "next/router";
import router from "next/router";
import Userticket from "../tickets/userticket";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import CustomerProfile from "../profile/customerProfile";
const CustomerDashboard = (props) => {
  const [user, setUser] = useState();
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
  useEffect(() => {
    setUser(window.localStorage.getItem('clientname'))
    
  })
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
  const onBackButtonEvent3 = () => {
    router.push("/")
    localStorage.setItem('loggedin', false);
    localStorage.removeItem('activeTab'); 
  }
  useEffect(() => {
    setUser(window.localStorage.getItem('user'))
  })
  //default tab
  // dashtab
  const DashTabActive = () => {
    localStorage.setItem('activeTab', "Dashboard")
  }
  // tickettab
  const TicketTabActive = () => {
    localStorage.setItem('activeTab', 'ticket')
  }
  const profileTabActive = () => {
    localStorage.setItem('activeTab', 'profile')
  }
  // usertab
  var [activeTab, setActivetab] = useState(" ")
  useEffect(() => {
    setActivetab(window.localStorage.getItem('activeTab'))
  }, [])
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
          navcontent={
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              USER Dashboard
            </Typography>
          }
          tabbody={
            <div className="tab-body" maxwidth="lg" sx={{ mt: 4, mb: 4 }}>
              <div className="tab-content" id="v-pills-tabContent">
                <div className={activeTab === "Dashboard" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-dash" role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <Userissue customername={user} />
                </div>
                <div className={activeTab === "profile" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  <CustomerProfile customername={user} />
                </div>
                <div className={activeTab === "ticket" ? "tab-pane fade show active" : "tab-pane fade"} id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  <Userticket Username={user} />
                </div>
              </div>
            </div>
          } />
      </div>
    }</>
  )
}
export default withRouter(CustomerDashboard);


