/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from '../Components/SideBar';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Header from '../Components/Header';
import Form from "../Components/form";
import './main.css';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";

  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
  });

export default function Create(){
    const env = useSelector((state: any) => state.env.environnement);
    return (

    <Grid>
        <Header/>
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <main className="main">
                <Container maxWidth="lg">
                    <ApolloProvider client={client} >
                        <Form/>
                    </ApolloProvider>
                    
                </Container>
            </main>
        </Box>
    </Grid>
    );
} 
