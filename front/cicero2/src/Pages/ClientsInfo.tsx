/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import { Container, Grid, Button, IconButton, InputLabel, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import Header from '../Components/Header';
import { Client } from "../Modele/metier/Client";
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { useParams, useSearchParams  } from 'react-router-dom';
import ClientModal from './Modal/ClientModal';
import CloseIcon from '@mui/icons-material/Close';
import { sqlClientDAO } from '../Modele/dao/sql/sqlClientDAO';
import { Case } from '../Modele/metier/Case';


const defaultClient: Client[] | (() => Client[]) = []
const defaultCase: Case[] | (() => Case[]) = []

export default function ClientsInfo(){

    const [modalOpen, setModalOpen] = useState(false);
    const [clientsList, setClientsList] = React.useState(defaultClient);
    const [casesList, setCasesList] = React.useState(defaultCase);
    const daoF = DAOFactory.getDAOFactory();
    const { id } = useParams<{id:string}>();

    useEffect (() => {
        async function fetchData() {
            const response = await daoF!.getClientDAO().findAll();
            setClientsList(response);
            const response2 = await daoF!.getCaseDAO().findAll();
            setCasesList(response2);
            return response;
            }
            fetchData();
    }, []);

    // const elements = [
    //     {'id':11, 'nom': 'PAS', 'adresse':23, 'prenom':'Tèque', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
    //     {'id':2, 'nom': 'KI', 'adresse':123, 'prenom':'Wi', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
    //     {'id':3, 'nom': 'BA', 'adresse':44, 'prenom':'Nane', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
    //     {'id':4, 'nom': 'AVO', 'adresse':11, 'prenom':'Cat', 'dateNaissance' : 'clôturée','createdAt' : 'en cours', 'dossier':123},
    // ];


    const StyleAll = {
        width : '100%'
    }
    const ModalStyle = {
        width: 1000,
        height: 750,
        backgroundColor: '#fff',
        border: '1px solid black'
    };

    const Style = {
        padding:'40px',
    }

    const cases = casesList.map((cases) =>
    // {if (cases.clients === id)
    
        <p key={cases.id}>
            {cases.code} - {cases.status}
        </p>
        // }
    );


    return (            
        <Grid sx={StyleAll}>
        <Header/>
        <Box sx={{ display: 'flex', minWidth: 700 }}>
            <SideBar />
            <main className='main'>
                    <Box sx={{ display:"flex"}}>
                        {/* <Container> */}
                            {clientsList.map((client) => {
                                 if ((client.id).toString() === (id!.toString()))
                                 return (
                                    <Box >
                                        <Grid>
                                            <h3> Clients {'>'} {client.lastname} {client.firstname} </h3>
                                        </Grid>
                                        <Grid container sx={{ padding: "30px"}}>
                                            <Grid container sx={{display:"flex"}}>
                                                <Grid item xs={12} md={4}>
                                                    <img src="/profil.png" alt="profil"/>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <h1> {client.lastname} {client.firstname}</h1>
                                                    <p> client depuis le {client.createdDate}</p>
                                                </Grid>  
                                                <Grid item xs={12} md={2}>
                                                <Button onClick={()=>{setModalOpen(true)}} sx={{ backgroundColor:"#008000", color:"white", 
                                                "&:hover": { backgroundColor: "#00800080" }}}> Modifier </Button>
                                                <Button sx={{ backgroundColor:"#ff0000", color: "white", marginTop:"10px",
                                            "&:hover": { backgroundColor: "#FF000080" }}}> Supprimer </Button>
                                                </Grid>
                                            </Grid> 
                                            <Grid item sx={{ padding:"30px"}}>
                                                <h3> Adresse </h3>
                                                <p> {client.address} </p>
                                                <h3> Date de naissance </h3>
                                                <p> {client.birthDate} </p>
                                                <h3> Dossiers associés </h3>
                                                {cases}

                                            </Grid>
                                        </Grid>
                                    </Box>
                                
                                 )
                            }
                                )}

                            {/* </Container> */}
                        {/* <Container> */}
                            {/* <Button onClick={()=>{setModalOpen(true)}}> Modifier </Button> */}
                            {/* <button onClick={()=>{setModalOpen(true);console.log('ok')}}> Modifier </button> */}
                        {/* </Container> */}

                    </Box>

                    
                <ClientModal modalOpen={modalOpen}>  
                    <Box sx={ModalStyle}>
                    <Grid sx={{ display: 'flex', justifyContent:'end', marginTop:2, marginRight:2}}>
                    
                        <IconButton onClick={()=> {setModalOpen(false);}}>
                            <CloseIcon />
                        </IconButton>
                        
                    </Grid>
                    <p> Modal Client Update </p>
                    </Box>
                </ClientModal>
            </main>
        </Box>
        </Grid>
    )
        
  } 