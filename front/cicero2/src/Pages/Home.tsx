/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from '../Components/SideBar';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Header from '../Components/Header';
import { height } from '@mui/system';

const styleAll = {
  height: "100%",
  width: "auto",
}

export default function Home(){
    const env = useSelector((state: any) => state.env.environnement);
    return (

    <Grid container style={styleAll}>
        <Header/>
            <Grid container style={{ height: '90%'}}>
                <Grid item xs={12} md={2} direction="column">
                    <SideBar />
                </Grid>
                <Grid item xs md style={{ margin: "20px"}}>
                    <h2>CONTENU Accueil</h2>
                    <p>{env}</p>
                </Grid>
            </Grid>
    </Grid>
    );
} 
