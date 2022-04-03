/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Client } from "../Modele/metier/Client";
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { NavLink } from 'react-router-dom';

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
const MainStyle = {
    justifyContent : 'flex-end'
}
const defaultClient: Client[] | (() => Client[]) = []

export default function Clients(){
    const [clientsList, setClientsList] = React.useState(defaultClient);
    const [filter, setFilter] = useState("");
    const daoF = DAOFactory.getDAOFactory();

    // Récupération de la liste des clients //
    useEffect (() => {
        async function fetchData() {
            const response = await daoF!.getClientDAO().findAll();
            console.log(response);
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
    // Suppression d'un client //
    const deleteClient = async (id: number) => {
      daoF!.getClientDAO().delete(id);
      setClientsList(clientsList.filter(c => c.id !== id));
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

    const handleSearchChange = (e:any) => {
        setFilter(e.target.value);
      };

    return (
        <Grid sx={StyleAll}>
                <Header/>
                        <button
            onClick={() => {
                writeClientFile()
            }}
        >
            Write client
        </button>
        <button
            onClick={() => {
                readClientFile()
            }}
        >
            Read file
        </button>
        <button
            onClick={() => {
                deleteClientFile()
            }}
        >
            Delete file
        </button>
                <button
            onClick={() => {
                deleteClient(2)
            }}
        >
            Delete client
        </button>
        <button
            onClick={() => {
                updateClientFile()
            }}
        >
            Update client
        </button>
                <Box sx={{ display: 'flex', minWidth: 700 }}>
                    <SideBar />
                    <main className='main'>

                        <Box maxWidth="lg" sx={MainStyle}>
                            <Grid sx={{ display: 'flex', justifyContent:'space-between', marginTop:5}}>
                                <h3>Clients</h3>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
                                        if (client.firstname.toLowerCase().includes(filter.toLowerCase())) {
                                            return <TableRow key={client.id}>
                                                        <TableCell component="th" scope="row" align="center" width={'15%'} >{client.firstname} {client.lastname}</TableCell>
                                                        <TableCell align="center" sx={StyleCell}>{client.id}</TableCell>
                                                        <TableCell align="center" width={'15%'} sx={StyleCell}>
                                                        <NavLink to={'/modify'}>
                                                           <NoteAltIcon />
                                                        </NavLink>
                                                            <DeleteIcon onClick={() => { deleteClient(client.id) }}/>                    
                                                        </TableCell>
                                                    </TableRow>
                                            }
                                            })}
                                </TableBody>   
                            </Table>
                    </main>
                </Box>
            </Grid>
    );
} 