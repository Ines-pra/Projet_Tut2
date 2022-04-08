import { Grid, Box } from '@mui/material';
import React from 'react';
import logo from '../assets/img/cicero_logo.png';

const styleHeader = {
    background: '#000000',
    color: '#fff',
};

const styleSideBar = {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '100%',
    paddingRight: '50px',
    background: '#000000',
    color: '#fff',
    alignItems: 'center',
    border: '1px solid black',
    textAlign: "center"
};

export default function Header(){
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);

    // Récupération de la taille de la fenêtre //
    React.useEffect(() => {
     function handleResize() {
         setWindowSize(window.innerWidth);
       }
       window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
     }, []);

    return (
        <Grid sx={windowSize >= 900 ? styleHeader : styleSideBar} item xs={12} md={12} style={{ height: '10%'}}  >
            <Box
                component="img"
                sx={{ maxHeight: { xs: 60, md: 80 }, padding: "15px", marginLeft:"15px"}}
                alt="Logo"
                src={logo}
            />
        </Grid>
    );
} 