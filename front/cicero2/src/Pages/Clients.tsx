/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, IconButton } from '@mui/material';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import CloseIcon from '@mui/icons-material/Close';
import './Folders.css';
import { Link } from 'react-router-dom';
import ClientModal from './Modal/ClientModal';
import { height , width } from '@mui/system';

export default function Clients(){

    const [filter, setFilter] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const elements = [
        {'id':1, 'nom': 'Pas', 'adresse':23, 'prenom':'Teque', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
        {'id':2, 'nom': 'Ki', 'adresse':123, 'prenom':'Wi', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
        {'id':3, 'nom': 'Ba', 'adresse':44, 'prenom':'Nane', 'dateNaissance' : 'en cours','createdAt' : 'en cours', 'dossier':123},
        {'id':4, 'nom': 'Avo', 'adresse':11, 'prenom':'Cat', 'dateNaissance' : 'clôturée','createdAt' : 'en cours', 'dossier':123},
    ];

    const elements2 = [
        {'id':1, 'employeeId':1, 'dossierId':1111},
        {'id':2, 'employeeId':2, 'dossierId':1222},
        {'id':3, 'employeeId':3, 'dossierId':1333},
        {'id':4, 'employeeId':4, 'dossierId':4441},
        {'id':5, 'employeeId':1, 'dossierId':1555},
        {'id':6, 'employeeId':2, 'dossierId':12244},
        {'id':7, 'employeeId':3, 'dossierId':16664},
        {'id':8, 'employeeId':4, 'dossierId':13335},
    ];
  

    // var test = elements2.filter(function(item) { return  item['employeeId'] === 3; });
    // console.log(test[0]['dossierId']);

    const MainStyle = {
        justifyContent : 'flex-end'
    };

    const ModalStyle = {
        width: 1000,
        height: 750,
        backgroundColor: '#fff',
        border: '1px solid black'
    };

    // const ModalStyle = {
    //     backgroundColor: '#fff',
    //     border: '1px solid black'
    // };
    
    const handleSearchChange = (e:any) => {
        setFilter(e.target.value);
    };

    const searchContainer = {
        display: "flex",
        //backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    };
    const searchIcon = {
        alignSelf: "flex-end",
        marginBottom: "5px",
    };

    const searchInput = {
        width: "160px",
        margin: "5px",
    };

    const StyleAll = {
        width : '100%'
    }

    const styletable = { 
        border:'2px solid black',
        margin:'0 auto',
        marginTop:5,
        //padding:4,
        maxWidth: '75%',
    }

    const StyleCell = {
       boder:'1px solid grey',
       height:40
    }

    const getElement = (id:number) => {

        // console.log(SelectChoice.toLowerCase() + ' | ' + elements[id].clôturé.toLowerCase())

        if (elements[id].prenom.toLowerCase().includes(filter.toLowerCase())) {

            return (
                <TableRow key={id}>
                    <TableCell component="th" scope="row" width={'15%'}>
                        <Link to={'/clientsInfo?id='+elements[id].id} style={{ textDecoration: 'none' }}> 
                         {elements[id].nom} {elements[id].prenom}</Link>
                    </TableCell>
                    <TableCell align="center" width={'15%'} sx={StyleCell}>{elements[id].dossier} </TableCell>
                    <TableCell align="center" width={'15%'} sx={StyleCell}>
                        <NoteAltIcon onClick={()=>{setModalOpen(true)}}/>
                        <DeleteIcon/>    
                        {/* <Link to={'/clientsInfo?id='+elements[id].id}>
                        <p> Voir informations ... </p> 
                        </Link> */}
                    </TableCell>
                
                </TableRow>    
            )
        }
        // else {
        //     return (
        //         <TableRow key={id}>
        //             <TableCell> Aucun client pour cette recherche ! </TableCell>
        //         </TableRow>
        //     )
        // }

        
    }

    return (

    <Grid sx={StyleAll}>
        <Header/>
        <Box sx={{ display: 'flex', minWidth: 700 }}>
            <SideBar />
            <main className='main'>
                <Box maxWidth="lg" sx={MainStyle}>
                    <Grid sx={{ display: 'flex', justifyContent:'space-between', marginTop:5}}>
                        <h3>Clients</h3>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <Toolbar>
                                <Box sx={searchContainer}>
                                    <SearchIcon sx={searchIcon} />
                                    <TextField
                                    sx={searchInput}
                                    onChange={handleSearchChange}
                                    label="Recherche"
                                    variant="standard"
                                    />
                                </Box>
                            </Toolbar>
                        </Box>
                    </Grid>
                </Box>
            
                <Table aria-label="customized table" sx={styletable}>
                    <TableHead>
                        <TableRow>
                            <TableCell>NOM Prenom</TableCell>
                            <TableCell align="center">Dossiers </TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(elements).map(                        
                            (id:any) => getElement(id)
                        )}
                    </TableBody>
                </Table>

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
    );
} 