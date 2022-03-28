/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from '../Components/SideBar';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';

const styleHeader = {
    background: '#535454',
    color: '#fff',
    width: '100%',
};

export default function Home(){
    return (

    <Grid>
        <Stack sx={styleHeader}>
            <h1>HEADER</h1>
        </Stack>
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <main className="content">
                <Container maxWidth="lg">
                    <h2>CONTENU Accueil</h2>
                </Container>
            </main>
        </Box>
    </Grid>
    );
} 