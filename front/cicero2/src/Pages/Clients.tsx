/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Client } from "../Modele/metier/Client";
import { Case } from "../Modele/metier/Case";
import { Button } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ClientModal from './Modal/ClientModal';
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
const MainStyle = {
    justifyContent : 'flex-end'
}
const ModalStyle = {
    width: 500,
    height:500,
    backgroundColor: '#fff',
    border: '1px solid black'
};
const defaultClient: Client[] | (() => Client[]) = []
const defaultCase: Case[] | (() => Case[]) = []

export default function Clients(){
    const [clientsList, setClientsList] = React.useState(defaultClient);
    const [casesList, setCasesList] = React.useState(defaultCase);
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const daoF = DAOFactory.getDAOFactory();

    React.useEffect(() => {
     function handleResize() {
         setWindowSize(window.innerWidth);
       }
 
       window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    // Lecture du fichier client.json //
    const readClientFile = async () => {
      let client = await daoF!.getClientDAO().findAll();
      console.log(client);
    };
    // Ajout d'un client //
    const writeClientFile = async () => {
      let client = new Client(2, "John", "Doe", "3 rue des potiers", new Date(), new Date());
      let id = await daoF!.getClientDAO().create(client);
      client.id = id;
      setClientsList([...clientsList, client]);
    };
    // Suppression du fichier client.json //
    const deleteClientFile = async () => {
        await Filesystem.deleteFile({
          path: 'client.json',
          directory: Directory.Documents,
        });
      };
    // Mise à jour du fichier client.json //
    const updateClientFile = async () => {
        let client = new Client(5, "OwO", "Yolo", "UwU", new Date(), new Date());
        daoF!.getClientDAO().update(client);
        setClientsList(clientsList.map(c => c.id === client.id ? client : c));
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

    const handleSearchChange = (e:any) => {
        setFilter(e.target.value);
      };

    const getClientCases = (id: number) => {
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
        if(concat === ""){
            return " / ";
        } else {
            return concat;
        }
    }

    const checkFilter = (code: string, client: Client) => {
        if(client.firstname.toLowerCase().includes(filter.toLowerCase()) || client.lastname.toLowerCase().includes(filter.toLowerCase()) || code.toLowerCase().includes(filter.toLowerCase())) {
            return true;
        } 
        return false;
    }

    return (
        <Grid sx={StyleAll}>
            <Header/>
            <Box sx={{ display: 'flex', minWidth: 700, height: '100%' }}>
                <SideBar />
                <main className='main'>
                    <Box maxWidth="lg" sx={MainStyle}>
                        <Grid sx={windowSize >= 750 ? { display: 'flex', justifyContent:'space-between', marginTop:5} : {display:'flex', marginTop:5}}>
                            <Box sx={{marginLeft:'2%',marginRight:'2%'}}>
                                <h3>Clients</h3>
                            </Box>
                            <Box sx={windowSize >= 750 ? { display: 'flex', justifyContent: 'flex-end'} : {display:'flex', flexDirection:'column'}}>
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
                            <TableCell align="center">Nom</TableCell>
                            <TableCell align="center">Affaires associées</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientsList.map(client => { 
                                if (checkFilter(getClientCases(client.id), client)) {
                                    return <TableRow key={client.id}>
                                                <TableCell component="th" scope="row" align="center" width={'15%'} >
                                                        {client.firstname} {client.lastname}
                                                </TableCell>
                                                <TableCell align="center" sx={StyleCell}>
                                                    {getClientCases(client.id)}
                                                </TableCell>
                                                <TableCell align="center" width={'15%'} sx={StyleCell}>
                                                    <InfoIcon color="primary"/>
                                                    <NoteAltIcon onClick={()=>{ setModalOpen(true) }} color="success"/>
                                                    {getClientCases(client.id) === " / " ? <DeleteIcon onClick={() => { deleteClient(client.id) }} color="error"/> : <DeleteIcon color="disabled"/> }                   
                                                </TableCell>
                                            </TableRow>
                                }
                            })}
                        </TableBody>   
                    </Table>
                    <ClientModal modalOpen={modalOpen}>  
                        <Box maxWidth="lg" sx={ModalStyle}>
                            <button type="button" className="btn_modalContent" onClick={()=>
                                {setModalOpen(false);}}> X </button>
                            <p> Test Modal </p>
                        </Box>
                    </ClientModal>
                    <button
                        onClick={() => {
                            writeClientFile()
                        }}
                    >
                    Write client
                    </button>
                    <button
                        onClick={() => {
                            deleteClientFile()
                        }}
                    >
                        Delete file
                    </button>
                </main>
            </Box>
        </Grid>
    );
} 