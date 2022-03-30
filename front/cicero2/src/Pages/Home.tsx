/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from '../Components/SideBar';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import  DAOFactory from '../Modele/dao/factory/DAOFactory';

const styleHeader = {
    background: '#535454',
    color: '#fff',
    width: '100%',
};

export default function Home(){
    const env = useSelector((state: any) => state.env.environnement);

    const daoF = DAOFactory.getDAOFactory();
    const clients = daoF!.getClientDAO().findById(1);

    console.log(clients);

    const lastIdInserted = daoF!.getClientDAO().create(clients);

    console.log(lastIdInserted);

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
                    <p>{env}</p>
                </Container>
            </main>
        </Box>
    </Grid>
    );
} 