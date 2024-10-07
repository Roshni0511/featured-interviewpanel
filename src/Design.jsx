import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from '@mui/material';

const drawerWidth = 280;

function Design({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const list = [
    { name: 'Dashboard', path: '/dashboard', icon: <SpaceDashboardIcon /> },
    { name: 'Today Interview', path: '/todayinterview', icon: <WatchLaterIcon /> },
    { name: 'Due Interview', path: '/dueinterview', icon: <HourglassFullIcon /> },
    { name: 'Courses', path: '/courses', icon: <MenuBookIcon /> },
    { name: 'Company', path: '/company', icon: <LocationCityIcon /> },
    { name: 'Students', path: '/student', icon: <PeopleAltIcon /> },
    { name: 'Interview', path: '/interview', icon: <ContentPasteIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogoutDialogOpen = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutDialogClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = () => {
    setOpenLogoutDialog(false);
    localStorage.removeItem('token');
  
  };

  const drawer = (
    <Box sx={{ height: '100%', backgroundColor: '#fff',  }}>
      <Toolbar sx={{ backgroundColor: '#4caf50', color: '#FFF', fontSize: '1.5rem' }}>
        CampusTalkHub
      </Toolbar>
      <List>
        {list.map((item, index) => (
          <Link
            href={item.path}
            sx={{
              color: 'gray',
              textDecoration: 'none',
              '&:hover': { backgroundColor: '#33475b' },
            }}
            key={index}
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ paddingLeft: 2 }}>
                <ListItemIcon sx={{ color: 'gray' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Box sx={{ marginTop: 'auto', padding: 2, textAlign: 'center' }}>
        <Button variant="contained" style={{backgroundColor:'#4caf50'}} onClick={handleLogoutDialogOpen} sx={{ width: '100%' }}>
          LOG OUT
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#4caf50',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>

      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutDialogClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        
      >
        <DialogTitle id="logout-dialog-title" sx={{background:'#4caf50',color:'#fff',padding:'10px 20px'}}>{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description" sx={{paddingTop:'20px'}}>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{paddingBottom:'15px'}}>
          <Button onClick={handleLogoutDialogClose} style={{background:'#D6EFD8',color:'black'}}>
            Cancel
          </Button>
          <Button onClick={handleLogout}style={{background:'#4caf50'}} autoFocus>
          <a href="/" style={{textDecoration:'none',color:'#fff'}}>Log Out</a>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

Design.propTypes = {
  children: PropTypes.node,
};

export default Design;

