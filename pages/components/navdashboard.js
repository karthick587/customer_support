import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'

const drawerWidth = 200;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
         position: 'relative',
         whiteSpace: 'nowrap',
         width: drawerWidth,
         transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
         }),
         boxSizing: 'border-box',
         ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  const mdTheme = createTheme();

export default function Dashboard(props) {
 
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
 
  return (
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
              <AppBar position="absolute" open={open}>
                  <Toolbar
                      sx={{
                      pr: '24px', // keep right padding when drawer closed
                      }}
                  >
                  <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={toggleDrawer}
                      sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                      }}
                  >
                      <MenuIcon />
                  </IconButton>
                      {props.navcontent}
                  <IconButton color="inherit">
                      <Badge badgeContent={4} color="secondary">
                          <NotificationsIcon />
                      </Badge>
                  </IconButton>
                  <a onClick={props.logout} className="text-white">Logout</a>
                      {props.menuBar}
                  </Toolbar>
              </AppBar>
                <div className="d-flex align-items-start">
                  <Drawer variant="permanent" open={open}>
                      <Toolbar
                          sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              px: [1],
                          }}
                      >
                      <IconButton onClick={toggleDrawer}>
                          <ChevronLeftIcon />
                      </IconButton>
                      </Toolbar>
                      <Divider />
                      <List>
                          <div>
                              <div className="nav flex-column nav-pills silebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                  <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"> <ListItem button>
                                      <ListItemIcon>
                                          <DashboardIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="Dashboard" />
                                      </ListItem>
                                  </button>
                                  <button className="nav-link"  id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"> <ListItem button>
                                      <ListItemIcon>
                                          <AccountCircleIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="Profile" />
                                      </ListItem>
                                  </button>
                                  {props.sidenavcontent}
                                  <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><ListItem button>
                                      <ListItemIcon>
                                          <FontAwesomeIcon icon={faTicketAlt} /> 
                                      </ListItemIcon>
                                      <ListItemText primary="Ticket" />
                                      </ListItem>
                                  </button>
                              </div>
                          </div>
                      </List>
                      <Divider />
                  </Drawer>
                </div>
                <Box
                    component="main"
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[100]
                          : theme.palette.grey[900],
                      flexGrow: 1,
                      height: '100vh',
                      overflow: 'auto',
                    }}
                  >
                    <Toolbar />
                    {props.tabbody}
                  </Box>
          </Box>  
        </ThemeProvider>
  );
}