/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import { Case } from '../Modele/metier/Case';
import { Button, Typography, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import { Client } from "../Modele/metier/Client";
import { NavLink } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DAOFactory from '../Modele/dao/factory/DAOFactory';
import CasesModal from "../Components/Modal/CasesModal";
import InfoIcon from '@mui/icons-material/Info';
import ReactPaginate from 'react-paginate';
import '../Styles/alert.css';
import '../Styles/pagination.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const styleAll = {
  height: "100%",
  width: "auto",
};
const searchIcon = {
    alignSelf: "flex-end",
    marginBottom: "5px",
};
const searchInput = {
    width: "250px",
    margin: "5px",
};
const styletable = {
    margin:'0 auto',
    marginTop:5,
    maxWidth: '90%',
};
const StyleCell = {
   boder:'1px solid grey',
};
const FormStyle = {
    minWidth:200,
};
const defaultCase: Case[] | (() => Case[]) = [];

export default function Folders(){
    const [SelectChoice, setSelectChoice] = React.useState('Afficher affaires en cours et clôturées');
    const [filter, setFilter] = useState("");
    const [casesList, setCasesList] = React.useState(defaultCase);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(0);

    const daoF = DAOFactory.getDAOFactory();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const casesPerPage = 5;
    const pagesVisited = pageNumber * casesPerPage;

    // Ouverture du modal //
    function goToModal(id:number){
        handleOpen();
        setId(id);  
    };
    // Selection du status du dossier //
    function handleChangeSelect(event:any){
        setSelectChoice(event.target.value)
    }
    // Filtre des dossiers //
    const handleSearchChange = (e:any) => {
        setFilter(e.target.value);
      };
 
    // Récupération de la liste des dossiers //
    useEffect (() => {
        async function fetchData() {
            const response = await daoF!.getCaseDAO().findAll();
            setCasesList(response);
            return response;
            }
            fetchData();
    }, []);
    
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

    // Fonction de filtre du tableau //
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
    };
    // Récupération des clients //
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
    };
    // Changement de page //
    const handlePageClick = ({ selected }: any) => {
        setPageNumber(selected);
    };
    // Mise a jour des dossier //
    const updateCase = (cas: Case) => {
        let table = casesList.map(c => c.id === cas.id ? cas : c);
        setCasesList(table);
        if (process.env.REACT_APP_ENV === "web") {
            window.location.reload();
        }
    };
    // Ajout d'un dossier //
    const addCaseTable = (cas: Case) => {
        let table = casesList
        table = [...table, cas];
        setCasesList(table);
    };
    // Affichage des dossiers en fonction de la pagination //
    const displayCases = casesList
    .slice(pagesVisited, pagesVisited + casesPerPage)
    .map((casee) => {
        let status = casee.status ? 'Clôturé' : 'En cours'
            if (checkFilter(casee.code, status, casee.clients)) {
                return (
                    <TableRow key={casee.id}>
                        <TableCell component="th" scope="row" align="center" width={'15%'} >{casee.code}</TableCell>
                        <TableCell align="center" width={'15%'} sx={StyleCell}>{casee.status ? 'Clôturé' : 'En cours'}</TableCell>
                        <TableCell align="center" sx={StyleCell}>{getClient(casee.clients)}</TableCell>
                        <TableCell align="center" width={'15%'} sx={StyleCell}>
                            <NavLink to={`/dossierinfo/`+ casee.id}>
                                <InfoIcon color="primary"/>
                            </NavLink>
                            {casee.status ?                             
                            <NoteAltIcon color="disabled" className="cursor"/> 
                            :
                            <NoteAltIcon onClick={()=> goToModal(casee.id)} color="success" className="cursor"/> }
                            <DeleteIcon onClick={() => { deleteCase(casee.id) }} color="error" className="cursor"/>                    
                        </TableCell>
                    </TableRow>
                )
            }
    });

    return (
        <Grid container style={styleAll}>
            <Header/>
            <Grid container style={{ height: '90%'}}>
                <Grid item xs={12} md={2} direction="column">
                    <SideBar />
                    <CasesModal id={id} openModal={open} handleClose={handleClose} addFunction={addCaseTable} updateFunction={updateCase}/>
                </Grid>
                <Grid item xs md style={{ margin: "15px" }}>
                    <Grid container xs={12} md={12} direction="row" alignItems="center"> 
                        <Grid item xs={5} md={2} sx={{ height: '100%' }}>
                            <Typography variant="h4">Dossiers</Typography>
                        </Grid>
                        <Grid item xs={7} md={2}>
                            <Button variant="contained" color="success" sx={{height:'45px', fontSize:'13px'}} fullWidth onClick={()=>goToModal(0)}>Nouveau</Button>
                        </Grid>  
                        <Grid container xs={12} md={8} direction="row" alignItems="end" justifyContent="end" sx={{height: '100%'}}>   
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
                                       <MenuItem value={'Afficher dossiers en cours et clôturés'}>Afficher dossiers en cours et clôturés</MenuItem>
                                       <MenuItem value={'En cours'}>En cours</MenuItem>
                                       <MenuItem value={'Clôturés'}>Clôturés</MenuItem>
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
                                {displayCases}
                            </TableBody>
                        </Table>
                        <Grid item xs={12} md={12}>
                            <ReactPaginate 
                                previousLabel={'<<'}
                                nextLabel={'>>'}
                                pageCount={Math.ceil(casesList.length / casesPerPage)}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                previousLinkClassName={'previousPage'}
                                nextLinkClassName={'nextPage'}
                                disabledClassName={'disabledPage'}
                                activeClassName={'activePage'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
} 