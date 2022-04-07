/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Case } from '../Modele/metier/Case';
import { confirmAlert } from 'react-confirm-alert';
import { Grid, Button, Typography } from '@mui/material';
import { Client } from "../Modele/metier/Client";
import { Box } from '@mui/system';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import moment from 'moment';
import ClientModal from '../Components/Modal/ClientModal';
import '../Styles/main.css';

const styleAll = {
    height: "100%",
    width: "auto",
};
const StyleContainer = {
    margin: "15px",
    backgroundColor: "#c6e5b3",
    borderRadius: "5px",
    padding: "15px",
    color: "#000000",
};
const StyleContainer2 = {
    margin: "15px",
    // backgroundColor: "#c6e5b3",
    borderRadius: "5px",
    padding: "15px",
    // color: "#000000",
    border:"1px solid black"
};
const defaultClient1: Client = {
    id: 0,
    lastname: "",
    firstname: "",
    birthDate: new Date(),
    address: "",
    createdDate: new Date(),
};
const defaultCase: Case[] | (() => Case[]) = [];

export default function ClientsInfo(){
    const [client, setClient] = useState(defaultClient1);
    const [casesList, setCasesList] = useState(defaultCase);
    const [open, setOpen] = React.useState(false);

    const daoF = DAOFactory.getDAOFactory();
    const { id } = useParams<{id:string}>();
    let navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Récupération des données //
    useEffect (() => {
        async function fetchData() {
            const response2 = await daoF!.getCaseDAO().findAll();
            setCasesList(response2);
            const response = await daoF!.getClientDAO().findById(parseInt(id!));
            setClient(response);
            return response;
            }
            fetchData();
    }, []);
    // Récupération des dossiers pour le client //
    const getClientCases = (id: number) => {
        let listCaseClient: Case[] = [];
        
        if (casesList.length !== 0) {
            casesList.forEach(cases => {
                cases.clients.forEach(client => {                   
                    if (client.id === id) {
                        listCaseClient.push(cases);
                    }
                });
            });
        }
        return listCaseClient;
    }
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
                            navigate("/clients");
                            if(process.env.REACT_APP_ENV === "web"){
                                window.location.reload();
                            }
                            onClose();
                        }}>Confirmer</Button>
                </div>
              );
            }
        });
    };
    // Ouverture du modal //
    function goToModal(id:number){
        handleOpen();
    };
    // Mise a jour du client //
    const updateClient = (cli: Client) => {
        setClient(cli);
    };
  
    return (            
    <Grid container style={styleAll}>
        <Header/>
        <ClientModal openNew={open} handleClose={handleClose} updateFunction={updateClient} id={parseInt(id!)}/>
        <Grid container style={{ height: '90%'}}>
            <Grid item xs={12} md={2} direction="column">
            <SideBar />
            </Grid>
            <Grid item xs md style={{ margin: "20px"}}>
                <Grid container xs={12} md={12} direction="row" alignItems="center">
                    <Grid item xs={12} md={12} style={{ color: "#000000", fontSize: "16" }}>
                        <Link to={'/clients'} className='link'>Clients </Link> {' > ' + client.lastname + ' ' + client.firstname}
                    </Grid>
                    <Grid container xs={12} md={12} direction="row" style={StyleContainer2}  alignItems="center">
                        <Grid item xs={0} md={3} sx={{ height: '100%' }}>
                            <Box
                                component="img"
                                sx={{ height: 260, maxHeight: { xs: 150, md: 200 }, padding: "25px"}}
                                alt="Profil"
                                src="/profil.png"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{fontSize: 14, height: '100%'}}>
                            <Grid item xs={12} md={12}>
                            <Typography variant="h3"> {client.lastname} {client.firstname}</Typography>
                            </Grid>   
                            <Grid item xs={12} md={12} sx={{fontStyle: 'italic',fontSize: 11,}}>
                            <Typography variant="subtitle2"> client depuis le {moment(client.createdDate).format('YYYY/MM/DD')} </Typography>
                            </Grid>                       
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button variant="contained" color="success" sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} fullWidth onClick={() => goToModal(parseInt(id!))}>Modifier Client</Button>
                            {getClientCases(client.id).length !== 0 ? 
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} 
                                    fullWidth
                                    disabled={true}>
                                        Supprimer
                                </Button> 
                                : 
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} 
                                    fullWidth 
                                    onClick={() => deleteClient(parseInt(id!))}>
                                        Supprimer
                                </Button>
                            }
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={12} justifyContent="space-around" direction="row" >
                        <Grid item xs={12} md={5} direction="row" style={StyleContainer} className="overflow" alignItems="center">
                            <Typography style={{padding:"7px"}} variant="h4"> Informations générales </Typography>
                            <Typography style={{padding:"7px"}} variant="h6"> Adresse </Typography>
                            <Typography style={{padding:"7px"}} variant="body2"> {client.address} </Typography>
                            <Typography style={{padding:"7px"}} variant="h6"> Date de naissance </Typography>
                            <Typography style={{padding:"7px"}} variant="body2"> {moment(client.birthDate).format('YYYY/MM/DD')} </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} direction="row" style={StyleContainer} alignItems="center">
                            <Typography style={{padding:"7px"}} variant="h4"> Dossiers associés </Typography>
                            {getClientCases(client.id).map(cases => (
                                    <Typography style={{padding:"7px"}} variant="body2"><Link to={'/dossierinfo/' + cases.id} className='innerLink'>{cases.code}</Link> - {cases.status ? "Clôturée" : "En cours"}</Typography>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    )     
  } 