import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Dashboard from "../common/navdashboard";
import UserProfile from '../userprofile';
import Userissue from "../submits/userissues";
import { withRouter } from "next/router";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import router from "next/router";
import Userticket from "../tickets/userticket";

const CustomerDashboard = (props) => {


  const [finishStatus, setfinishStatus] = useState(false);
  var userId = props.router.query.name;
  var Username = props.router.query.customername;
  console.log(userId)


  const onBackButtonEvent = (e) => {
    e.preventDefault();

    if (!finishStatus) {
      if (window.confirm("Do you want to Logout ?")) {
        setfinishStatus(true)
        // your logic
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

  const onBackButtonEvent3 = () => {
    router.push("/components/login/login")
  }
  return (
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
            USER Dashboard
          </Typography>
        }
        tabbody={
          <div className="tab-body" maxwidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-dash" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <Userissue customername={Username} />
              </div>
              <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <UserProfile userId={userId} />
              </div>
              <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
              </div>
              <div className="tab-pane fade" id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                <Userticket Username={Username} />
              </div>
            </div>
          </div>
        } />
    </div>
  )
}
export default withRouter(CustomerDashboard);