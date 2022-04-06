/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { useSelector } from 'react-redux';
import Grid from "@mui/material/Grid";
import SideBar from '../Components/SideBar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const styleAll = {
  height: "100%",
  width: "auto",
};

const StyleContainer = {
    margin: "15px",
    backgroundColor: "#c6e5b3",
    borderRadius: "5px",
    padding: "15px",
    color: "#000000",
  };

const StyleContainer2 = {
    backgroundColor:"#7c3324",
    margin: "15px",
    borderRadius: "5px",
    padding: "15px",
    color: "#fff",
}

const StyleContainer3 = {
    backgroundColor:"#d99354 ",
    margin: "15px",
    borderRadius: "5px",
    padding: "15px",
    color: "#000000",
}

export default function Home(){
    let navigate = useNavigate();

    return (

    <Grid container style={styleAll}>
        <Header/>
            <Grid container style={{ height: '90%'}}>
                <Grid item xs={12} md={2} direction="column">
                    <SideBar />
                </Grid>
                <Grid item xs md style={{ margin: "20px"}}>
                    <Grid container xs={12} md={12} direction="row" alignItems="top" justifyContent="space-around">
                        <Grid container xs={12} md={12} direction="row" style={StyleContainer2} className="shadow" alignItems="center">
                            <Typography variant="h3"> Bienvenue dans votre application </Typography>
                        </Grid>
                        
                        <Grid container xs={12} md={8}  justifyContent="space-around">
                            <Grid container xs={12} md={12} direction="row" style={StyleContainer} className="shadow" alignItems="center">
                            <Typography variant="body1">
                                <p> Cette application est un petit bijou 
                                    de technologie pour vous permettre de 
                                    gérer parfaitement votre cabinet d'avocat.</p>
                                <p> Vous pourrez y gérer vos clients ainsi
                                    que leurs dossiers, et tout cela depuis 
                                    votre ordinateur, et même votre mobile.
                                    En espérant que vous apprecierez l'expérience. </p>
                                <p> Bien cordialement, l'équipe de Cicéro !</p>
                            </Typography>
                            </Grid>
                            <Grid container xs={12} md={5} direction="column" style={StyleContainer} justifyContent="space-between" className="shadow">
                                <Typography variant="h4">  Clients  </Typography>
                                <Typography variant="body1"> Consulter vos clients depuis ce bouton ou depuis le menu de navigation </Typography>
                                <Button variant="contained" color="inherit" sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} fullWidth onClick={() => navigate('/clients')}> Y aller ! </Button>
                            </Grid>
                            <Grid container xs={12} md={5} direction="column" style={StyleContainer} justifyContent="space-between" className="shadow">
                                <Typography variant="h4"> Dossiers </Typography>
                                <Typography variant="body1"> Consulter vos clients depuis ce bouton ou depuis le menu de navigation </Typography>
                                <Button variant="contained" color="inherit" sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} fullWidth onClick={() => navigate('/dossiers')}> Y aller ! </Button>
                            </Grid>
                            
                        </Grid>

                        <Grid container xs={12} md={3} direction="column" style={StyleContainer3} className="shadow" alignItems="center" textAlign="center">
                            <Typography variant="h4"> Cicéron </Typography>
                            <Typography variant="h6">  Marcus Tullius Cicero</Typography> 

                            <Box
                                component="img"
                                sx={{ height: 260, maxHeight: { xs: 240, md: 260 }, padding: "25px"}}
                                alt="Ciceron"
                                src="/ciceron.jpg"
                            />
                            <Typography variant="body1"> Homme d'État romain et brillant orateur est né le 3 janvier 106 av. J.-C. à Arpinum en Italie 
                                et est assassiné le 7 décembre 43 av. J.-C. (calendrier julien) à Formies. 
                                Il est à la fois un avocat, un philosophe, un rhéteur et un écrivain latin. </Typography>
                           </Grid>
                    </Grid>
                </Grid>
        </Grid>
    );
} 
