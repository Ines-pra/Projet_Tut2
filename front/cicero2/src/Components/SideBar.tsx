import { AppBar, Container, Divider, Hidden, IconButton, List, ListItem, ListItemIcon, SwipeableDrawer, Toolbar } from '@mui/material';
import * as React from 'react';
import { Link, NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import '../Styles/sidebar.css';

const styleIcon = {
    color: 'darkgray',
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
    width: 240,
    height: '19%',
    paddingTop: '10px',
    paddingBottom: '10px',
    background: '#535454',
    color: '#fff',
    alignItems: 'center',
    border: '1px solid black',
  }

  const styleSideBar = {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '13%',
    height: '90vh',
    paddingTop: '10px',
    paddingBottom: '10px',
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
      console.log(windowSize)

      window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);



    console.log(window.innerWidth)
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
                                    
                                style={({ isActive }) => isActive ? { textDecoration: "none", fontWeight: "bold", marginRight: 20}
                                                    : {marginRight: 20,textDecoration: "none",}}
                        
                                
                                color="textPrimary"
                                //variant="button"
                                //underline="none"
                                to={item.href}
                                key={item.name}
                                >
                                {item.name}
                                </NavLink>
                            </ListItem>
                        ))}
                        </List>
                    </Box>
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
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
                            //variant="button"
                            //underline="none"
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




// const styleSideBar = {
//     position: 'relative',
//     whiteSpace: 'nowrap',
//     width: 240,
//     height: '85vh',
//     paddingTop: '10px',
//     paddingBottom: '10px',
//     background: '#535454',
//     color: '#fff',
//     alignItems: 'center',
//     border: '1px solid black',
// };

// const styleIcon = {
//     color: '#fff',
//     fontSize: '2rem',
// };

// const styleListMenu = {
//     width: '100%',
// };

// const styleItemMenu = {
//     width: "240px",
// };

// export default function SideBar() {
//     return (
//         <Box sx={styleSideBar}>
//             <List disablePadding sx={styleListMenu}>
//                 <ListItem button sx={styleItemMenu}>
//                     <ListItemIcon>
//                         <HomeIcon sx={styleIcon}/>
//                     </ListItemIcon>
//                     <NavLink to="/" style={({ isActive }) =>
//                         isActive ? { textDecoration: "none", fontWeight: "bold",}
//                           : {}} className="styleLink">Accueil</NavLink>
//                 </ListItem>
//                 <ListItem button sx={styleItemMenu}>
//                     <ListItemIcon>
//                         <AccountCircleIcon sx={styleIcon}/>
//                     </ListItemIcon>
//                     <NavLink to="/clients" style={({ isActive }) =>
//                         isActive ? { textDecoration: "none", fontWeight: "bold",}
//                           : {}} className="styleLink">Clients</NavLink>
//                 </ListItem>
//                 <ListItem button sx={styleItemMenu}>
//                     <ListItemIcon>
//                         <FolderIcon sx={styleIcon}/>
//                     </ListItemIcon>
//                     <NavLink to="/dossiers" style={({ isActive }) =>
//                         isActive ? { textDecoration: "none", fontWeight: "bold",}
//                           : {}} className="styleLink">Dossiers</NavLink>
//                 </ListItem>
//             </List>
//         </Box>
//   );
// }
