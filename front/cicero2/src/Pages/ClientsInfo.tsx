/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import SideBar from '../Components/SideBar';
import { Grid, Button } from '@mui/material';
import Header from '../Components/Header';
import { Client } from "../Modele/metier/Client";
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Case } from '../Modele/metier/Case';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';


const defaultClient: Client[] | (() => Client[]) = []

// let defaultClient1: Client | (() => Client) 
const defaultClient1: Client = {
    id: 0,
    lastname: "",
    firstname: "",
    birthDate: new Date(),
    address: "",
    createdDate: new Date(),
  };
const defaultCase: Case[] | (() => Case[]) = []

export default function ClientsInfo(){

    const [client, setClient] = useState(defaultClient1);
    const [casesList, setCasesList] = useState(defaultCase);
    const daoF = DAOFactory.getDAOFactory();
    const { id } = useParams<{id:string}>();
    let navigate = useNavigate();

    useEffect (() => {
        async function fetchData() {
            const response2 = await daoF!.getCaseDAO().findAll();
            setCasesList(response2);
            console.log(response2);
            const response3 = await daoF!.getClientDAO().findById(parseInt(id!));
            setClient(response3);
            return response2;
            }
            fetchData();
    }, []);


    const styleAll = {
        height: "100%",
        width: "auto",
      }

    const StyleContainer = {
        margin: "15px",
        backgroundColor: "#c6e5b3",
        borderRadius: "5px",
        padding: "15px",
        color: "#000000",
      };
    
    // casesList.map((cases) =>
    // // {if (cases.clients === id)
    
    //     <p key={cases.id}>
    //         {cases.code} - {cases.status}
    //     </p>
    //     // }
    // );

    const getClientCases = (id: number) => {
        console.log(id);
        
        if (casesList.length === 0) {
            return " / ";
        }
        let clientCases = casesList.map(c => c.clients.map(cl => cl.id === id ? c : null));
        let concat = "";
        for(let i = 0; i < clientCases.length; i++){
            for(let y = 0; y < clientCases[i].length; y++){
                if(i + 1 === clientCases.length){
                    if(clientCases[i][y] !== null){
                        concat += clientCases[i][y]!.code.toString();
                    }
                } else {
                    if(clientCases[i][y] !== null){
                        concat += clientCases[i][y]!.code.toString() + " - ";
                    }
                }
            }
        }
        // console.log(clientCases);
        if(concat === ""){
            return " / ";
        } else {
            return concat;
        }
    }

    const deleteCase = async (id: number) => {
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
                            window.location.reload();
                            onClose();
                        }}>Confirmer</Button>
                </div>
              );
            }
        });
    };
  


    return (            
    <Grid container style={styleAll}>
        <Header/>
        <Grid container style={{ height: '90%'}}>
            <Grid item xs={12} md={2} direction="column">
            <SideBar />
            </Grid>
            <Grid item xs md style={{ margin: "20px"}}>
                <Grid container xs={12} md={12} direction="row" alignItems="center">
                    <Grid item xs={12} md={12} style={{ color: "#000000", fontSize: "16" }}>
                        <Link to={'/clients'} className='link'>Clients </Link> {' > ' + client.lastname + ' ' + client.firstname}
                    </Grid>

                    <Grid container xs={12} md={10} direction="row" style={StyleContainer} className="shadow" alignItems="center">
                        <Grid item xs={0} md={2} sx={{ height: '100%' }}>
                            <img src="/profil.png" alt="profil"/>
                        </Grid>
                        <Grid item xs={12} md={7} sx={{fontSize: 14, height: '100%'}}>
                            <Grid item xs={12} md={12}>
                            <h1> {client.lastname} {client.firstname}</h1>
                            </Grid>   
                            <Grid item xs={12} md={12} sx={{fontStyle: 'italic',fontSize: 11,}}>
                            <p> client depuis le {moment(client.createdDate).format('YYYY/MM/DD')} </p>
                            </Grid>                       
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button variant="contained" color="primary" sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} fullWidth>Modifier dossier</Button>
                            <Button variant="contained" color="error" sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} fullWidth onClick={() => deleteCase(parseInt(id!))}>Supprimer</Button>
                        </Grid>
                    </Grid>

                    <Grid container xs={12} md={12} justifyContent="flex-start" direction="row" >
                        <Grid item xs={12} md={4} direction="row" style={StyleContainer} className="shadow" alignItems="center">
                            <h2> Informations générales </h2>
                            <h3> Adresse </h3>
                            <p> {client.address} </p>
                            <h3> Date de naissance </h3>
                            <p> {moment(client.birthDate).format('YYYY/MM/DD')} </p>
                        </Grid>
                        <Grid item xs={12} md={5} direction="row" style={StyleContainer} className="shadow" alignItems="center">
                            <h3> Dossiers associés </h3>
                           
                            {getClientCases(parseInt(id!))}


                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
    
        </Grid>
    </Grid>
    )
        
  } 