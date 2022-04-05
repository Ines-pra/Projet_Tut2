/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import { Case } from '../Modele/metier/Case';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import { Client } from "../Modele/metier/Client";
import { Event } from "../Modele/metier/Event";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { NavLink } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DAOFactory from '../Modele/dao/factory/DAOFactory';
import InfoIcon from '@mui/icons-material/Info';
import '../Styles/alert.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const styleAll = {
  height: "100%",
  width: "auto",
}
const searchIcon = {
    alignSelf: "flex-end",
    marginBottom: "5px",
};
const searchInput = {
    width: "160px",
    margin: "5px",
};
const styletable = {
    border:'2px solid black',
    margin:'0 auto',
    marginTop:5,
    maxWidth: '90%',
}
const StyleCell = {
   boder:'1px solid grey',
}
const FormStyle = {
    minWidth:200
}
const defaultCase: Case[] | (() => Case[]) = []

export default function Folders(){
    const [SelectChoice, setSelectChoice] = React.useState('Afficher affaires en cours et clôturées');
    const [filter, setFilter] = useState("");
    const [casesList, setCasesList] = React.useState(defaultCase);
    const daoF = DAOFactory.getDAOFactory();
 
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
        <Grid container style={styleAll}>
            <Header/>
            <Grid container style={{ height: '90%'}}>
                <Grid item xs={12} md={2} direction="column">
                    <SideBar />
                </Grid>
                <Grid item xs md style={{ margin: "15px" }}>
                    <Grid container xs={12} md={12} direction="row" alignItems="center"> 
                        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
                            <h2>Dossiers</h2>
                        </Grid>
                        <Grid container xs={12} md={8} direction="row" alignItems="center" sx={{height: '100%'}}>   
                            <Grid item xs={12} md={5}>
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
                            </Grid>   
                            <Grid item xs={12} md={5}>
                                <Toolbar>
                                    <SearchIcon sx={searchIcon} />
                                    <TextField
                                        sx={searchInput}
                                        onChange={handleSearchChange}
                                        label="Recherche"
                                        variant="standard"
                                        fullWidth
                                    />
                                </Toolbar>   
                            </Grid>  
                            <Grid item xs={12} md={2}>
                                <Button variant="contained" color="primary" sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} fullWidth>Nouveau</Button>
                            </Grid>                     
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Table aria-label="customized table" sx={styletable}>
                            <TableHead style={{ backgroundColor:"#c6e5b3" }}>
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
                        <button onClick={() => {
                                writeCaseFile()
                            }}> Create case
                        </button>
                        <button onClick={() => {
                                deleteCaseFile()
                            }}> Delete case file
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
} 