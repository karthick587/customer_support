import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import Adminticket from '../tickets/adminticket';
import { withRouter } from "next/router";
import Dashcard from '../common/dashCard';
import Axios from 'axios';
const AdminDashboard = (props) => {

  const router = useRouter();
  console.log(router.query.name);
  const [user, setUser] = useState([]);
  const [finishStatus, setfinishStatus] = useState(false);
  var adminId = props.router.query.name;


  const onBackButtonEvent = (e) => {
    e.preventDefault();

    if (!finishStatus) {
      if (window.confirm("Do you want to Logout ?")) {
        setfinishStatus(true)
        // your logic
        router.push("/components/login/teamLogin")
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
    router.push("/components/login/teamLogin")
  }



  return (
    <div>
      <div>
        <Dashboard
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
            <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" href="./users" ><ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            </button>
          }

          tabbody={
            <div className="tab-body" maxwidth="lg" sx={{ mt: 4, mb: 4 }}>

              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
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

                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  <Users />
                </div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  <Adminticket />
                </div>
                <div className="tab-pane fade" id="v-pills-ticket" role="tabpanel" aria-labelledby="v-pills-ticket-tab">
                  product details
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
export default withRouter(AdminDashboard);