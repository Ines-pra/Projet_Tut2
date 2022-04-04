/* eslint-disable import/no-anonymous-default-export */
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import { Button, Container, FormControl, Grid, IconButton, InputLabel, ListItem, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Client } from "../Modele/metier/Client";
import { Filesystem, Directory } from "@capacitor/filesystem";
// import { FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { height, margin } from '@mui/system';
import { Link } from 'react-router-dom';
import DAOFactory from '../Modele/dao/factory/DAOFactory';
import { Case } from '../Modele/metier/Case';
import Form from "../Components/form";

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
    width : '100%'
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
const defaultEvent: Event[] | (() => Event[]) = []

export default function Folders(){
    const [SelectChoice, setSelectChoice] = React.useState('Afficher affaires en cours et clôturées');
    const [filter, setFilter] = useState("");
    const [casesList, setCasesList] = React.useState(defaultCase);
    const [eventsList, setEventsList] = React.useState(defaultEvent);
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);
    const daoF = DAOFactory.getDAOFactory();

    // const clients1 = [
    //     {'id':1,'lastname':'Labrio','firstname':'Jacques','adresse':'boulevard du café','Naissance':new Date(),'date':new Date()},
       
    //   ]
    
    //   const clients2 = [
    //     {'id':3,'lastname':'Frosh','firstname':'Frank','adresse':'boulevard du café','Naissance':new Date(),'date':new Date()},
        
    //   ]

    //   const clients = [
    //     {'id':5,'lastname':'Doni','firstname':'hubert','adresse':'boulevard du café','Naissance':new Date(),'date':new Date()},
      
    //   ]

    // const elements = [
    //     {'id':10, 'folder':23, 'clients':clients, 'status' : false, 'description':'bbbbbbb', 'date':'17/03/2021',},
    //     {'id':20, 'folder':123, 'clients':clients1, 'status' : false,'description':'bbbbbbb', 'date':'17/03/2021',},
    //     {'id':30, 'folder':44, 'clients':clients2,'status' : true,'description':'bbbbbbb', 'date':'17/03/2021',},
    // ]


    React.useEffect(() => {
     function handleResize() {
         setWindowSize(window.innerWidth);
       }
 
       window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
     }, []);
 
    // Récupération de la liste des dossiers //

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
    // Lecture du fichier case.json //
    const readCaseFile = async () => {
        let ca = await daoF!.getCaseDAO().findAll();
        console.log(ca);
    };
    // Ajout d'un dossier //
    const writeCaseFile = async () => {
        let client = new Client(2, "John", "Doe", "3 rue des potiers", new Date(), new Date());
        let code = "CC/" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
        let cas = new Case(1, code, "", new Date(), true, new Date(), [client], []);
        let id = await daoF!.getCaseDAO().create(cas);
        cas.id = id;
        setCasesList([...casesList, cas]);
    };
    // Suppression d'un dossier //
    const deleteCase = async (id: number) => {
      daoF!.getCaseDAO().delete(id);
      setCasesList(casesList.filter(c => c.id !== id));
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

    return (

    <Grid sx={StyleAll}>
        <Header/>
                <button
            onClick={() => {
                writeCaseFile()
            }}
        >
            Create case
        </button>
        <button
            onClick={() => {
                readCaseFile()
            }}
        >
            Read cases
        </button>
        <button
            onClick={() => {
                deleteCaseFile()
            }}
        >
            Delete case file
        </button>
                <button
            onClick={() => {
                deleteCase(2)
            }}
        >
            Delete case
        </button>
        <button
            onClick={() => {
                updateCaseFile()
            }}
        >
            Update case
        </button>
        <Box sx={{ display: 'flex', minWidth: 700 }}>
            <SideBar />
            <main className='main'>

                <Box maxWidth="lg" sx={MainStyle}>
                    <Grid sx={windowSize >= 750 ?{ display: 'flex', justifyContent:'space-between', marginTop:5}:{display: 'flex',marginTop:5}}>
                        <Box sx={{marginLeft:'2%',marginRight:'2%'}}>
                            <h3>Dossiers</h3>
                        </Box>
                        
                        <Box sx={ windowSize >= 750 ?{ display: 'flex', justifyContent: 'flex-end'}: {display:'flex', flexDirection:'column'}}>
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
                                return casee.clients.map((client: Client) => {
                                    let status = casee.status ? 'clôturée' : 'En cours'
                                    if ((client.firstname.toLowerCase().includes(filter.toLowerCase()) || client.lastname.toLowerCase().includes(filter.toLowerCase()) || casee.code.toLowerCase().includes(filter.toLowerCase())) && SelectChoice.toLowerCase().includes(status.toLowerCase())) {
                                        return (
                                            <TableRow key={casee.id}>
                                                <TableCell component="th" scope="row" align="center" width={'15%'} >{casee.code}</TableCell>
                                                <TableCell align="center" width={'15%'} sx={StyleCell}>{casee.status ? 'clôturée' : 'En cours '}</TableCell>
                                                <TableCell align="center" sx={StyleCell}>{client.firstname} {client.lastname}</TableCell>
                                                <TableCell align="center" width={'15%'} sx={StyleCell}>
                                                    <NoteAltIcon />
                                                    <DeleteIcon onClick={() => { deleteCase(casee.id) }}/>                    
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                })
                            })}
                        </TableBody>

                    </Table>
            </main>
        </Box>
        
    </Grid>
    );
} 