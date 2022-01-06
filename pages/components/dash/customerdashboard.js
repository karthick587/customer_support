import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Dashboard from "../common/navdashboard";
import Userissue from "../submits/userissues";
import { withRouter } from "next/router";
import router from "next/router";
import Userticket from "../tickets/userticket";





const CustomerDashboard = (props) => {
  
  const [user, setUser] =  useState();
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
  }

  useEffect(()=>{
    setUser(window.localStorage.getItem('user'))
  })
  
  return (
    <>{login==="false"? <div className="access ">access denied</div>:
    <div>
      <Dashboard
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
              <div className="tab-pane fade show active" id="v-pills-dash" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <Userissue customername={user} />
              </div>
              <div className="tab-pane fade" id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">
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


