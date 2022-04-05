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

const StyleAll = {
    width: '100%',
    height: '100%'
}

export default function Home(){
    const env = useSelector((state: any) => state.env.environnement);
    return (

    <Grid sx={StyleAll}>
        <Header/>
        <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
            <SideBar />
            <main className="content">
                <Container maxWidth="lg">
                    <h2>CONTENU Accueil</h2>
                    <p>{env}</p>
                </Container>
            </main>
        </Box>
    </Grid>
    );
} 
