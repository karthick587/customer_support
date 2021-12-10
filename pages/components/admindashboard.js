import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Typography from '@mui/material/Typography';
import AdminProfile from './adminprofile';
import Dashboard from './navdashboard';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleIcon from '@mui/icons-material/People';
import ListItemText from '@mui/material/ListItemText';               
import Users from './users';
import router from 'next/router';
import Adminticket from './adminticket';
import { withRouter } from "next/router";

const adminDashboard=(props)=>{
  
  const[user,setUser]=useState([]);
  const [finishStatus, setfinishStatus] = useState(false);
  var adminId = props.router.query.name;

  useEffect(()=>{
      Axios.get(`http://localhost:3001/adminlogin/${props.router.query.name}`)
          .then((res)=>setUser(res.data));
  },[]);
     
     
  const onBackButtonEvent = (e) => {
      e.preventDefault();

     if (!finishStatus) {
        if (window.confirm("Do you want to Logout ?")) {
            setfinishStatus(true)
            // your logic
            router.push("./adminLogin")
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
  },[]);
  const onBackButtonEvent2 = () =>{
    router.push("./adminLogin")
  }
 return(
        <div >
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
                        <button className="nav-link" id="v-pills-messages-tab"  data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" href="./users" ><ListItem  button>
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
                        
                            </div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            <AdminProfile admin={user} adminId={adminId}/>
                              </div>
                              <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                  <Users />
                              </div>
                              <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                  <Adminticket />
                              </div>
                          </div>
                        </div>
                      }
                    />
                  </div>    
        </div>  
  )
}
export default withRouter(adminDashboard);