/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Client } from "../Modele/metier/Client";

const styleHeader = {
    background: '#535454',
    color: '#fff',
    width: '100%',
};

const defaultClient: Client[] | (() => Client[]) = []

export default function Clients(){
    const [clientsList, setClientsList] = React.useState(defaultClient);
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
      let client = new Client(2, "electron", "", "", new Date(), new Date());
      setClientsList([...clientsList, client]);
      daoF!.getClientDAO().create(client);
    };
    // Suppression d'un client //
    const deleteClient = async () => {
      daoF!.getClientDAO().delete(6);
      setClientsList(clientsList.filter(c => c.id !== 6));
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

    return (

    <Box>
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
                deleteClient()
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
        <Stack sx={styleHeader}>
            <h1>HEADER</h1>
        </Stack>
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <main className="content">
                <Container maxWidth="lg">
                    <h2>CONTENU Clients</h2>
                    {clientsList.map((clientItem: Client) => (
                        <div key={clientItem.id}>
                            <p>{clientItem.firstname}</p>

                        </div>
                    ))}
                </Container>
            </main>
        </Box>
    </Box>
    );
} 