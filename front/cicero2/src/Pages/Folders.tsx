/* eslint-disable import/no-anonymous-default-export */
import React, { useState,useEffect } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import { Button, Container, FormControl, Grid, IconButton, InputLabel, ListItem, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar } from '@mui/material';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import './main.css';
import { getElementError } from '@testing-library/react';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { height, margin } from '@mui/system';
import { Link } from 'react-router-dom';
import DAOFactory from '../Modele/dao/factory/DAOFactory';
import { Case } from '../Modele/metier/Case';
import { Client } from '../Modele/metier/Client';
import Form from "../Components/form";


// query Clients {
//     ""
// }


export default function Folders(){

    const [SelectChoice, setSelectChoice] = React.useState('Afficher affaires en cours et clôturées');
    const [filter, setFilter] = useState("");

    const clients1 = [
        {'id':1,'lastname':'Labrio','firstname':'Jacques','adresse':'boulevard du café','Naissance':new Date(),'date':new Date()},
       
      ]
    
      const clients2 = [
        {'id':3,'lastname':'Frosh','firstname':'Frank','adresse':'boulevard du café','Naissance':new Date(),'date':new Date()},
        
      ]

      const clients = [
        {'id':5,'lastname':'Doni','firstname':'hubert','adresse':'boulevard du café','Naissance':new Date(),'date':new Date()},
      
      ]

    const elements = [
        {'id':10, 'folder':23, 'clients':clients, 'status' : false, 'description':'bbbbbbb', 'date':'17/03/2021',},
        {'id':20, 'folder':123, 'clients':clients1, 'status' : false,'description':'bbbbbbb', 'date':'17/03/2021',},
        {'id':30, 'folder':44, 'clients':clients2,'status' : true,'description':'bbbbbbb', 'date':'17/03/2021',},
    ]

    const [windowSize, setWindowSize] = React.useState(window.innerWidth);


    React.useEffect(() => {
     function handleResize() {
         setWindowSize(window.innerWidth);
       }
 
       window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
     }, []);


    const defaultCase: Case[] | (() => Case[]) = []
const defaultEvent: Event[] | (() => Event[]) = []
 
    const [casesList, setCasesList] = React.useState(defaultCase);
    const [eventsList, setEventsList] = React.useState(defaultEvent);
    const daoF = DAOFactory.getDAOFactory();
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
      let cas = new Case(1, "electron", "", new Date(), true, new Date(), [], []);
      setCasesList([...casesList, cas]);
      daoF!.getCaseDAO().create(cas);
    };
    // Suppression d'un dossier //
    const deleteCase = async () => {
      daoF!.getCaseDAO().delete(3);
      setCasesList(casesList.filter(c => c.id !== 3));

    };
    // // Suppression du fichier case.json //
    // const deleteCaseFile = async () => {
    //   await Filesystem.deleteFile({
    //     path: 'case.json',
    //     directory: Directory.Documents,
    //   });
    // };
    // Mise à jour du fichier case.json //
    const updateCaseFile = async () => {
      let cas = new Case(5, "OwO", "UwU", new Date(), true, new Date(), [], []);
      setCasesList(casesList.map(c => c.id === cas.id ? cas : c));
      daoF!.getCaseDAO().update(cas);
    };

    function handleChangeSelect(event:any){
        setSelectChoice(event.target.value)
    }


    const FormStyle = {
        minWidth:200
    }

    const MainStyle = {
        justifyContent : 'flex-end'
    }

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
        width: "95px",
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

        //console.log(SelectChoice.toLowerCase() + ' | ' + elements[id].clôturé.toLowerCase())

        
             return elements[id]?.clients.map((client:any) => {

                let status = elements[id].status ? 'clôturée' : 'En cours'

                if ((client.firstname.toLowerCase().includes(filter.toLowerCase()) || client.lastname.toLowerCase().includes(filter.toLowerCase())) && SelectChoice.toLowerCase().includes(status.toLowerCase())) {
                    
                    console.log(status);
                    return (
                        
                        <TableRow key={client.id}>
                            <TableCell component="th" scope="row" align="center" width={'15%'} >{elements[id].id}</TableCell>
                            <TableCell align="center" width={'15%'} sx={StyleCell}>{elements[id].status ? 'clôturée' : 'En cours'}</TableCell>

                            <TableCell align="center" sx={StyleCell}>
                            {elements[id].clients.map((client:any) => {
                               return <span>{client.lastname} {client.firstname}</span>
                            })}
                            </TableCell>
                            
                            <TableCell align="center" width={'15%'} sx={StyleCell}>
                                
                            <Link to={'/dossier'}>
                                
                               <NoteAltIcon />
                            </Link>
                                <DeleteIcon/>                    
                            </TableCell>
                        </TableRow>
                        // /*{ // <ListItem key={id}>
                        // //     {elements[id].employee}
                        // //     {elements[id].clôturé}
                        // </ListItem> }*            
                    )  
                }         
           
            }
        )
       

        
    }

    return (

    <Grid sx={StyleAll}>
        <Header/>
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
                    <Grid item xs={12}>
                        <Table aria-label="customized table" sx={styletable} >
                            
                            <TableHead>
                                
                                <TableRow>
                                    <TableCell align="center">Code</TableCell>
                                    <TableCell align="center">Statut</TableCell>
                                    <TableCell align="center">Clients</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            
                            </TableHead>
                            
                            {/* <Grid> */}
                                <TableBody>
                                    {Object.keys(elements).map(                        
                                        (id:any) => getElement(id)
                                    )}
                                </TableBody>
                            {/* </Grid> */}

                               
                        </Table>
                        {/* <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> */}
                    </Grid>
            </main>
        </Box>
        
    </Grid>
    );
} 