import { AppBar, Container, Divider, IconButton, List, ListItem, ListItemIcon, SwipeableDrawer, Toolbar } from '@mui/material';
import * as React from 'react';
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '../Styles/sidebar.css';

const styleIcon = {
    color: '#c6e5b3',
    fontSize: '2rem',
};
const navigationLinks = [
    { name: "Accueil", href: "/" , icon :<HomeIcon sx={styleIcon}/>},
    { name: "Clients", href: "/clients" , icon:<AccountCircleIcon sx={styleIcon}/>},
    { name: "Dossiers", href: "/dossiers" , icon:<FolderIcon sx={styleIcon}/>},
];
const styleSideBarLarge = {
  position: 'relative',
  whiteSpace: 'nowrap',
  width: '100%',
  height: '100%',
  paddingTop: '10px',
  paddingBottom: '10px',
  background: '#000000',
  color: '#fff',
  alignItems: 'center',
  border: '1px solid black',
};
const styleSideBar = {
  position: 'relative',
  whiteSpace: 'nowrap',
  width: '100%',
  paddingRight: '50px',
  background: '#535454',
  color: '#fff',
  alignItems: 'center',
  border: '1px solid black',
};

const styleListMenu = {
    width: '100%',
};

const styleItemMenu = {
    width: "240px",
};

export default function SideBar(){
    
    const [open, setOpen] = React.useState(false);
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);

   React.useEffect(() => {
    function handleResize() {
        setWindowSize(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <AppBar sx={windowSize >= 900 ? styleSideBarLarge : styleSideBar}>
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <List sx={styleListMenu}>
                        {navigationLinks.map((item) => (
                            <ListItem key={item.name} sx={styleItemMenu}>
                                <ListItemIcon >
                                    {item.icon}
                                </ListItemIcon>
                                <NavLink  
                                    style={({ isActive }) => isActive ? { textDecoration: "none", fontWeight: "bold", marginRight: 20, color: "white"}
                                                        : {marginRight: 20,textDecoration: "none", color: "rgb(193, 193, 194)"}}
                                    color="textPrimary"
                                    to={item.href}
                                    key={item.name}
                                    >
                                    {item.name}
                                </NavLink>
                            </ListItem>
                        ))}
                        </List>
                    </Box>
                    <Box sx={{ display: { xs: "block", md: "none" }}}>
                        <IconButton onClick={() => setOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </ Toolbar>
            </Container>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                
            >
                <div
                onClick={() => setOpen(false)}
                onKeyPress={() => setOpen(false)}
                role="button"
                tabIndex={0}
                >
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <List sx={styleListMenu}>
                {navigationLinks.map((item) => (
                    <ListItem key={item.name} sx={styleItemMenu}>
                        <ListItemIcon >
                            {item.icon}
                        </ListItemIcon>
                        <NavLink
                            style={({ isActive }) => isActive ? { textDecoration: "none", fontWeight: "bold", marginRight: 20}
                            : {marginRight: 20,textDecoration: "none",}}
                            color="textPrimary"
                            to={item.href}
                        >
                            {item.name}
                        </NavLink>
                    </ListItem>
                ))}
                </List>
            </SwipeableDrawer>
        </AppBar>
    );
}