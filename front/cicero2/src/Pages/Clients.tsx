/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Client } from "../Modele/metier/Client";
import { Case } from "../Modele/metier/Case";
import { confirmAlert } from 'react-confirm-alert';
import SideBar from '../Components/SideBar';
import DAOFactory from '../Modele/dao/factory/DAOFactory';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ClientModal from '../Components/Modal/ClientModal';
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
    border:'2px solid black',
    margin:'0 auto',
    marginTop:5,
    maxWidth: '90%',
};
const StyleCell = {
   boder:'1px solid grey',
};

const defaultClient: Client[] | (() => Client[]) = [];
const defaultCase: Case[] | (() => Case[]) = [];

export default function Clients(){
    const [clientsList, setClientsList] = React.useState(defaultClient);
    const [casesList, setCasesList] = React.useState(defaultCase);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [filter, setFilter] = useState("");
    const [pageNumber, setPageNumber] = React.useState(0);

    const daoF = DAOFactory.getDAOFactory();
    const clientsPerPage = 5;
    const pagesVisited = pageNumber * clientsPerPage;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Récupération des clients et des dossiers //
    useEffect (() => {
        async function fetchData() {
            const response = await daoF!.getClientDAO().findAll();
            const response2 = await daoF!.getCaseDAO().findAll();
            setCasesList(response2);
            setClientsList(response);
            return response;
            }
            fetchData();
    }, []);
    // Filtre //
    const handleSearchChange = (e:any) => {
        setFilter(e.target.value);
    };
    // Suppression d'un client //
    const deleteClient = async (id: number) => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                    <h1>Etes-vous sur ?</h1>
                    <p>Etes-vous sur de vouloir supprimer ce client ?</p>
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
                            daoF!.getClientDAO().delete(id);
                            setClientsList(clientsList.filter(c => c.id !== id));
                            onClose();
                        }}>Confirmer</Button>
                </div>
              );
            }
        });
    };
    // Affichage du modal //
    function goToModal(id:number){
        handleOpen();
        setId(id);
    };
    // Ajout d'un client //
    const addClientTable = (cli: Client) => {
        let table = clientsList
        table = [...table, cli];
        setClientsList(table);
    };
    // Modification d'un client //
    const updateClientTable = (cli: Client) => {
        let table = clientsList.map(c => c.id === cli.id ? cli : c);
        setClientsList(table);
    };
    // Récupération des clients dans les dossiers //
    const getClientCases = (id: number) => {
        let listCaseClient: Case[] = [];
        let concat = '';
        
        if (casesList.length !== 0) {
            casesList.forEach(cases => {
                cases.clients.forEach(client => {                   
                    if (client.id === id) {
                        listCaseClient.push(cases);
                    }
                });
            });
        }
        if(listCaseClient.length === 0){
            return " / ";
        } else {
            for (let i = 0; i < listCaseClient.length; i++) {
                if (i === listCaseClient.length - 1) {
                    concat += listCaseClient[i].code;
                } else {
                    concat += listCaseClient[i].code + " - ";
                }
            }
            return concat;
        }
    };
    // Fonction de filtre du tableau //
    const checkFilter = (code: string, client: Client) => {
        if(client.firstname.toLowerCase().includes(filter.toLowerCase()) || client.lastname.toLowerCase().includes(filter.toLowerCase()) || code.toLowerCase().includes(filter.toLowerCase())) {
            return true;
        } 
        return false;
    };
    // Changement de page //
    const handlePageClick = ({ selected }: any) => {
        setPageNumber(selected);
    };
    // Affichage des clients en fonction de la pagination //
    const displayClients = clientsList
        .slice(pagesVisited, pagesVisited + clientsPerPage)
        .map((client) => {
            if (checkFilter(getClientCases(client.id), client)) {
                return <TableRow key={client.id}>
                            <TableCell component="th" scope="row" align="center" width={'15%'} >
                                    {client.firstname} {client.lastname}
                            </TableCell>
                            <TableCell align="center" sx={StyleCell}>
                                {getClientCases(client.id)}
                            </TableCell>
                            <TableCell align="center" width={'15%'} sx={StyleCell}>
                                <Link to={'/clientinfo/'+client.id} style={{ textDecoration: 'none' }} > <InfoIcon color="primary"/> </Link>
                                <NoteAltIcon onClick={()=>{ goToModal(client.id) }} color="success" className="cursor"/>
                                {getClientCases(client.id) === " / "? 
                                    <DeleteIcon onClick={() => { deleteClient(client.id) }} color="error" className="cursor"/>
                                    : 
                                    <DeleteIcon color="disabled"/> 
                                }           
                            </TableCell>
                        </TableRow>
            }
    });

    return (
        <Grid container style={styleAll}>
            <Header/>
            <ClientModal openNew={open} handleClose={handleClose} addFunction={addClientTable} updateFunction={updateClientTable} id={id}/>
            <Grid container style={{ height: '90%'}}>
                <Grid item xs={12} md={2} direction="column">
                    <SideBar />
                </Grid>
                <Grid item xs md style={{ margin: "15px" }}>
                    <Grid container xs={12} md={12} direction="row" alignItems="center"> 
                        <Grid item xs={5} md={2} sx={{ height: '100%' }}>
                            <Typography variant="h4" style={{ marginLeft: "15px" }}> Clients </Typography>
                        </Grid>
                        <Grid item xs={7} md={2}>
                            <Button variant="outlined" color="success" sx={{height:'45px', fontSize:'13px'}} fullWidth onClick={() => goToModal(0)}>Nouveau</Button>
                        </Grid> 
                        <Grid container xs={12} md={8} direction="row" justifyContent="end" sx={{height: '100%'}}>    
                            {/* <Grid item xs={12} md={10}> */}
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
                            {/* </Grid>                       */}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Table aria-label="customized table" sx={styletable}>
                            <TableHead style={{ backgroundColor:"#c6e5b3" }}>
                            <TableRow>
                                <TableCell align="center">Nom</TableCell>
                                <TableCell align="center">Affaires associées</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayClients}
                            </TableBody>   
                        </Table>
                        <Grid item xs={12} md={12}>
                            <ReactPaginate 
                                previousLabel={'<<'}
                                nextLabel={'>>'}
                                pageCount={Math.ceil(clientsList.length / clientsPerPage)}
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