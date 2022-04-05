/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import { Case } from '../Modele/metier/Case';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import { Client } from "../Modele/metier/Client";
import { Event } from "../Modele/metier/Event";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { NavLink } from 'react-router-dom';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DAOFactory from '../Modele/dao/factory/DAOFactory';
import Form from "../Components/form";
import InfoIcon from '@mui/icons-material/Info';
import '../Styles/alert.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const searchContainer = {
    display: "flex",
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
    width : '100%',
    height: '100%'
}
const styletable = {
    border:'2px solid black',
    margin:'0 auto',
    marginTop:5,
    maxWidth: '75%',
}
const StyleCell = {
   boder:'1px solid grey',
   height:40
}
const FormStyle = {
    minWidth:200
}
const MainStyle = {
    justifyContent : 'flex-end'
}
const defaultCase: Case[] | (() => Case[]) = []

export default function Folders(){
    const [SelectChoice, setSelectChoice] = React.useState('Afficher affaires en cours et clôturées');
    const [filter, setFilter] = useState("");
    const [casesList, setCasesList] = React.useState(defaultCase);
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);
    const daoF = DAOFactory.getDAOFactory();

    React.useEffect(() => {
     function handleResize() {
         setWindowSize(window.innerWidth);
       }
 
    window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
 
    function handleChangeSelect(event:any){
        setSelectChoice(event.target.value)
    }

    const handleSearchChange = (e:any) => {
        setFilter(e.target.value);
      };

     // Récupération de la liste des dossiers //
    useEffect (() => {
        async function fetchData() {
            const response = await daoF!.getCaseDAO().findAll();
            console.log(response);
            setCasesList(response);
            return response;
            }
            fetchData();
    }, []);

    //////\ CASE /\\\\\\
    // Ajout d'un dossier //
    const writeCaseFile = async () => {
        let client = new Client(2, "John", "Doe", "3 rue des potiers", new Date(), new Date());
        let event = new Event(1, 1, "Description", new Date(), 10);
        let code = "CC/" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
        let cas = new Case(1, code, "Affaire de corruption", new Date(), true, new Date(), [client], [event]);
        let id = await daoF!.getCaseDAO().create(cas);
        cas.id = id;
        setCasesList([...casesList, cas]);
    };
    // Suppression d'un dossier //
    const deleteCase = async (id: number) => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                    <h1>Etes-vous sur ?</h1>
                    <p>Etes-vous sur de vouloir supprimer ce dossier ?</p>
                    <Button     
                        style={{
                        borderRadius: 5,
                        backgroundColor: "#d9534f",
                        padding: "12px 24px",
                        fontSize: "12px",
                        color: "white",
                        marginRight: "5px",
                        }} 
                        onClick={onClose}>Annuler</Button>
                    <Button
                        style={{
                        borderRadius: 5,
                        backgroundColor: "#0275d8",
                        padding: "12px 24px",
                        fontSize: "12px",
                        color: "white",
                        marginLeft: "5px",
                        }}
                        onClick={() => {
                            daoF!.getCaseDAO().delete(id);
                            setCasesList(casesList.filter(c => c.id !== id));
                            onClose();
                        }}>Confirmer</Button>
                </div>
              );
            }
        });
    };

    const deleteCaseFile = async () => {
      await Filesystem.deleteFile({
        path: 'case.json',
        directory: Directory.Documents,
      });
    };

    // Mise à jour du fichier case.json //
    const updateCaseFile = async () => {
      let cas = new Case(5, "OwO", "UwU", new Date(), true, new Date(), [], []);
      setCasesList(casesList.map(c => c.id === cas.id ? cas : c));
      daoF!.getCaseDAO().update(cas);
    };

    const checkFilter = (code: string, status: string, clients: Client[]) => {
        if(clients.length === 0) {
            if(code.toLowerCase().includes(filter.toLowerCase()) && SelectChoice.toLowerCase().includes(status.toLowerCase())) {
                return true;
            } 
        } else {
            for (let i = 0; i < clients.length; i++) {
                if((clients[i].firstname.toLowerCase().includes(filter.toLowerCase()) || clients[i].lastname.toLowerCase().includes(filter.toLowerCase()) || code.toLowerCase().includes(filter.toLowerCase())) && SelectChoice.toLowerCase().includes(status.toLowerCase())) {
                    return true;
                } 
            }
        }
        return false;
    }

    const getClient = (clients: Client[]) => {
        let client = "";
        for (let i = 0; i < clients.length; i++) {
            if (i + 1 === clients.length) {
                client += clients[i].firstname + " " + clients[i].lastname;
            } else {
                client += clients[i].firstname + " " + clients[i].lastname + ", ";
            }
        }
        return client;
    }

    return (

    <Grid sx={StyleAll}>
        <Header/>
        <Box sx={{ display: 'flex', minWidth: 700, height: '100%' }}>
            <SideBar />
            <main className='main'>
                <Box maxWidth="lg" sx={MainStyle}>
                    <Grid sx={windowSize >= 750 ?{ display: 'flex', justifyContent:'space-between', marginTop:5} : {display: 'flex', marginTop:5}}>
                        <Box sx={{marginLeft:'2%',marginRight:'2%'}}>
                            <h3>Dossiers</h3>
                        </Box>
                        <Box sx={ windowSize >= 750 ?{ display: 'flex', justifyContent: 'flex-end'} : {display:'flex', flexDirection:'column'}}>
                            <FormControl fullWidth sx={FormStyle}>
                                <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={SelectChoice}
                                    label="Trier par"
                                    onChange={handleChangeSelect}
                                >
                                    <MenuItem value={'Afficher affaires en cours et clôturées'}>Afficher affaires en cours et clôturées</MenuItem>
                                    <MenuItem value={'En cours'}>En cours</MenuItem>
                                    <MenuItem value={'Clôturées'}>Clôturées</MenuItem>
                                </Select>
                            </FormControl>
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
                        <Form />
                    </Grid>
                </Box>
                <Table aria-label="customized table" sx={styletable}>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Code</TableCell>
                        <TableCell align="center">Statut</TableCell>
                        <TableCell align="center">Clients</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {casesList.map(casee => {
                            let status = casee.status ? 'clôturée' : 'En cours'
                            console.log(casee);
                            if (checkFilter(casee.code, status, casee.clients)) {
                                return (
                                    <TableRow key={casee.id}>
                                        <TableCell component="th" scope="row" align="center" width={'15%'} >{casee.code}</TableCell>
                                        <TableCell align="center" width={'15%'} sx={StyleCell}>{casee.status ? 'clôturée' : 'En cours'}</TableCell>
                                        <TableCell align="center" sx={StyleCell}>{getClient(casee.clients)}</TableCell>
                                        <TableCell align="center" width={'15%'} sx={StyleCell}>
                                            <NavLink to={`/dossierinfo/`+ casee.id}>
                                                <InfoIcon color="primary"/>
                                            </NavLink>
                                            <NoteAltIcon color="success"/>
                                            <DeleteIcon onClick={() => { deleteCase(casee.id) }} color="error"/>                    
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
        <button
            onClick={() => {
                writeCaseFile()
            }}
        >
            Create case
        </button>
        <button
            onClick={() => {
                deleteCaseFile()
            }}
        >
            Delete case file
        </button>
            </main>
        </Box>
        
    </Grid>
    );
} 