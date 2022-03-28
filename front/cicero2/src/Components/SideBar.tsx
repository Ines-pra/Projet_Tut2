import { List, ListItem, ListItemIcon } from '@mui/material';
import * as React from 'react';
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import Box from "@mui/material/Box";

import '../Styles/sidebar.css'

const styleSideBar = {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    height: '85vh',
    paddingTop: '10px',
    paddingBottom: '10px',
    background: '#535454',
    color: '#fff',
    alignItems: 'center',
    border: '1px solid black',
};

const styleIcon = {
    color: '#fff',
    fontSize: '2rem',
};

const styleListMenu = {
    width: '100%',
};

const styleItemMenu = {
    width: "240px",
};

export default function SideBar() {
    return (
        <Box sx={styleSideBar}>
            <List disablePadding sx={styleListMenu}>
                <ListItem button sx={styleItemMenu}>
                    <ListItemIcon>
                        <HomeIcon sx={styleIcon}/>
                    </ListItemIcon>
                    <NavLink to="/" style={({ isActive }) =>
                        isActive ? { textDecoration: "none", fontWeight: "bold",}
                          : {}} className="styleLink">Accueil</NavLink>
                </ListItem>
                <ListItem button sx={styleItemMenu}>
                    <ListItemIcon>
                        <AccountCircleIcon sx={styleIcon}/>
                    </ListItemIcon>
                    <NavLink to="/clients" style={({ isActive }) =>
                        isActive ? { textDecoration: "none", fontWeight: "bold",}
                          : {}} className="styleLink">Clients</NavLink>
                </ListItem>
                <ListItem button sx={styleItemMenu}>
                    <ListItemIcon>
                        <FolderIcon sx={styleIcon}/>
                    </ListItemIcon>
                    <NavLink to="/dossiers" style={({ isActive }) =>
                        isActive ? { textDecoration: "none", fontWeight: "bold",}
                          : {}} className="styleLink">Dossiers</NavLink>
                </ListItem>
            </List>
        </Box>
  );
}
