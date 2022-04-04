/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import { Container, Grid, Button, IconButton, InputLabel, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import Header from '../Components/Header';

import { useSearchParams  } from 'react-router-dom';
import ClientModal from './Modal/ClientModal';

export default function ClientsInfo(){
    const [modalOpen, setModalOpen] = useState(false);
    
    const elements = [
        {'id':1, 'nom': 'test nom', 'adresse':23, 'prenom':'Jacques', 'dateNaissance' : 'en cours','createdAt' : 'en cours'},
        {'id':2, 'nom': 'test nom', 'adresse':123, 'prenom':'Michel', 'dateNaissance' : 'en cours','createdAt' : 'en cours'},
        {'id':3, 'nom': 'test nom', 'adresse':44, 'prenom':'René', 'dateNaissance' : 'en cours','createdAt' : 'en cours'},
        {'id':4, 'nom': 'test nom', 'adresse':11, 'prenom':'Pierre', 'dateNaissance' : 'clôturée','createdAt' : 'en cours'},
    ];

    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('id'));

    // let params = new Nullable<string>(searchParams.get('id'));
    let params = searchParams?.get('id');
    
    var client = elements.filter(function(item) { return  item['id'] === parseInt(params!.toString()) });
    console.log(client);


    const StyleAll = {
        width : '100%'
    }

    return (            
        <Grid sx={StyleAll}>
        <Header/>
        <Box sx={{ display: 'flex', minWidth: 700 }}>
            <SideBar />
            <main className='main'>
                    <div>
                        <h3> Clients {'>'}   {client.map((client:any) => <span>{client.nom} {client.prenom}</span> )}</h3>
                    </div>
                    <Box sx={{ display:"flex" }}>
                        <Container>
                            Div 1
                        </Container>
                        <Container>
                            {/* <Button onClick={setModalOpen(true)}> Modifier </Button> */}
                            <button onClick={()=>{setModalOpen(true);console.log('ok')}}> Modifier </button>
                        </Container>

                    </Box>

                    <ClientModal modalOpen={modalOpen}>  
                        <div>
                            Test Modal
                        </div>
                    </ClientModal>
            </main>
        </Box>
        </Grid>
    )
        
  } 