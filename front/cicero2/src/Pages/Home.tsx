/* eslint-disable import/no-anonymous-default-export */
<<<<<<< HEAD
import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from '../Components/SideBar';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const styleHeader = {
    background: '#535454',
    color: '#fff',
    width: '100%',
};

export default function Home(){
    const env = useSelector((state: any) => state.env.environnement);
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
=======
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from "../Components/SideBar";
import { Container } from "@mui/material";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

const styleHeader = {
  background: "#535454",
  color: "#fff",
  width: "100%",
};

export default function Home() {
  const env = useSelector((state: any) => state.env.environnement);
  
  return (
    <Grid>
      <Stack sx={styleHeader}>
        <h1>HEADER</h1>
      </Stack>
      <Box sx={{ display: "flex" }}>
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
>>>>>>> e986bf99925d8a4f2ff1b93042ba64702b525d8d
