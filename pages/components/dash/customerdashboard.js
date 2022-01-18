import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Dashboard from "../common/navdashboard";
import Userissue from "../submits/userissues";
import { withRouter } from "next/router";
import router from "next/router";
import Userticket from "../tickets/userticket";
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
  useEffect(()=>{
    setUser(window.localStorage.getItem('clientname'))
    localStorage.setItem('updateclose', "open");
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


