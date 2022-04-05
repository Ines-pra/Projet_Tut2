/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Client } from "../Modele/metier/Client";
import { Case } from "../Modele/metier/Case";
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

const defaultClient: Client[] | (() => Client[]) = []
const defaultCase: Case[] | (() => Case[]) = []

export default function Clients(){
    const [clientsList, setClientsList] = React.useState(defaultClient);
    const [casesList, setCasesList] = React.useState(defaultCase);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [id, setId] = React.useState(0);
    const [filter, setFilter] = useState("");
    const daoF = DAOFactory.getDAOFactory();

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

    function goToModal(id:number){
        handleOpen();
        setId(id);
    }
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
        <Grid container style={styleAll}>
            <Header/>
            <ClientModal openEdit={open} handleClose={handleClose} id={id}/>
            <Grid container style={{ height: '90%'}}>
                <Grid item xs={12} md={2} direction="column">
                    <SideBar />
                </Grid>
                <Grid item xs md style={{ margin: "10px" }}>
                    <Grid container xs={12} md={12} direction="row" alignItems="center"> 
                        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
                            <h2>Clients</h2>
                        </Grid>
                        <Grid container xs={12} md={8} direction="row" alignItems="center" sx={{height: '100%'}}>    
                            <Grid item xs={12} md={10}>
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
                                <Button variant="contained" color="primary" sx={{height:'45px', fontSize:'13px', marginBottom:'10px'}} fullWidth onClick={() => goToModal(0)}>Nouveau</Button>
                            </Grid>                     
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
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
                                                        <NavLink to={'/clientsInfo/'+client.id} style={{ textDecoration: 'none' }} > <InfoIcon color="primary"/> </NavLink>
                                                        <NoteAltIcon onClick={()=>{ handleOpen() }} color="success"/>
                                                        <DeleteIcon onClick={() => { deleteClient(client.id) }} color="error"/>                    
                                                    </TableCell>
                                                </TableRow>
                                        }
                                        })}
                            </TableBody>   
                        </Table>
                        <button onClick={() => {
                                writeClientFile()
                            }}> Write client
                        </button>
                        <button onClick={() => {
                                deleteClientFile()
                            }}> Delete file
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    // return (
    //     <Grid sx={StyleAll}>
    //             <Header/>
    //     <ClientModal openEdit={open} handleClose={handleClose} id={id}/>
    //             <Box sx={{ display: 'flex', minWidth: 700 }}>
    //                 <SideBar />
    //                 <main className='main'>

    //                     <Box maxWidth="lg" sx={MainStyle}>
    //                         <Grid sx={{ display: 'flex', justifyContent:'space-between', marginTop:5}}>
    //                             <h3>Clients</h3>
    //                             <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
    //                                 <Toolbar>
    //                                     <Box sx={searchContainer}>
    //                                         <SearchIcon sx={searchIcon} />
    //                                         <TextField
    //                                         sx={searchInput}
    //                                         onChange={handleSearchChange}
    //                                         label="Recherche"
    //                                         variant="standard"
    //                                         />
    //                                     </Box>
    //                                 </Toolbar>
    //                             </Box>
    //                             <Button variant="contained" onClick={() => goToModal(0)}>
    //                                         Ajouter
    //                             </Button>
    //                         </Grid>
    //                     </Box>
    //                         <Table aria-label="customized table" sx={styletable}>
    //                             <TableHead>
    //                             <TableRow>
    //                                 <TableCell align="center">Nom</TableCell>
    //                                 <TableCell align="center">Affaires associées</TableCell>
    //                                 <TableCell align="center">Actions</TableCell>
    //                             </TableRow>
    //                             </TableHead>
    //                             <TableBody>
    //                                 {clientsList.map(client => { 
    //                                     if (checkFilter(getClientCases(client.id), client)) {
    //                                         return <TableRow key={client.id}>
    //                                                     <TableCell component="th" scope="row" align="center" width={'15%'} >
    //                                                             {client.firstname} {client.lastname}
    //                                                     </TableCell>
    //                                                     <TableCell align="center" sx={StyleCell}>
    //                                                         {getClientCases(client.id)}
    //                                                     </TableCell>
    //                                                     <TableCell align="center" width={'15%'} sx={StyleCell}>
    //                                                         <NavLink to={'/clientsInfo/'+client.id} style={{ textDecoration: 'none' }} > <InfoIcon color="primary"/> </NavLink>
    //                                                         <NoteAltIcon onClick={()=>{ handleOpen() }} color="success"/>
    //                                                         <DeleteIcon onClick={() => { deleteClient(client.id) }} color="error"/>                    
    //                                                     </TableCell>
    //                                                 </TableRow>
    //                                         }
    //                                         })}
    //                             </TableBody>   
    //                         </Table>
                            
    //                 </main>
    //             </Box>
    //         </Grid>
    // );
} 