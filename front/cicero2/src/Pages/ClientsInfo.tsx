/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import { Container, Grid, Button, IconButton, InputLabel, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import Header from '../Components/Header';
import { Client } from "../Modele/metier/Client";
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { useSearchParams  } from 'react-router-dom';
import ClientModal from './Modal/ClientModal';
import CloseIcon from '@mui/icons-material/Close';


const defaultClient: Client[] | (() => Client[]) = []

export default function ClientsInfo(){

    const [modalOpen, setModalOpen] = useState(false);
    const [clientsList, setClientsList] = React.useState(defaultClient);
    const daoF = DAOFactory.getDAOFactory();

    useEffect (() => {
        async function fetchData() {
            const response = await daoF!.getClientDAO().findAll();
            setClientsList(response);
            return response;
            }
            fetchData();
    }, []);

    const elements = [
        {'id':11, 'nom': 'PAS', 'adresse':23, 'prenom':'Tèque', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
        {'id':2, 'nom': 'KI', 'adresse':123, 'prenom':'Wi', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
        {'id':3, 'nom': 'BA', 'adresse':44, 'prenom':'Nane', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
        {'id':4, 'nom': 'AVO', 'adresse':11, 'prenom':'Cat', 'dateNaissance' : 'clôturée','createdAt' : 'en cours', 'dossier':123},
    ];

    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('id'));

    // // let params = new Nullable<string>(searchParams.get('id'));
    // let params = searchParams?.get('id');
    // // console.log(clientsList);
    // var client :Client[];
    // for (let i=0; i<clientsList.length; i++){
    //     // console.log(clientsList[i])
    //     if (clientsList[i].id===parseInt(params!.toString())) {
    //         console.log('ok');
    //         // var client = clientsList[i].filter(function(item) { return  item['id'] === parseInt(params!.toString()) });
    //         client = clientsList[i];
    //     }
    // }
    // // var client = elements.filter(function(item) { return  item['id'] === parseInt(params!.toString()) });
    // console.log(client);


    const StyleAll = {
        width : '100%'
    }
    const ModalStyle = {
        width: 1000,
        height: 750,
        backgroundColor: '#fff',
        border: '1px solid black'
    };


    return (            
        <Grid sx={StyleAll}>
        <Header/>
        <Box sx={{ display: 'flex', minWidth: 700 }}>
            <SideBar />
            <main className='main'>
                    <div>
                        {/* <h3> Clients {'>'}   {client!.map((client:any) => <span>{client.nom} {client.prenom}</span> )}</h3> */}
                    </div>
                    <Box sx={{ display:"flex" }}>
                        <Container>
                            
                            {/* {client!.map((client:any) => 

                            <Grid>
                                <Grid sx={{display:"flex"}}>
                                    <Container>
                                        <h2> Photo </h2>
                                    </Container>
                                    <Container>
                                        <h2> {client.nom} {client.prenom}</h2>
                                        <p> client depuis le {client.createdAt}</p>
                                    </Container>  
                                </Grid> 
                                <Grid>
                                    <h3> Adresse </h3>
                                    <p> {client.adresse} </p>
                                    <h3> Date de naissance </h3>
                                    <p> {client.dateNaissance} </p>
                                    <h3> Dossiers associés </h3>
                                    <p> {client.dossier} </p> 
                                </Grid>
                            </Grid>
                            

                            )} */}
                        </Container>
                        <Container>
                            {/* <Button onClick={setModalOpen(true)}> Modifier </Button> */}
                            <button onClick={()=>{setModalOpen(true);console.log('ok')}}> Modifier </button>
                        </Container>

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