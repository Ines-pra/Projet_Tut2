/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
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

    const readClientFile = async () => {
      let client = await daoF!.getClientDAO().findAll();
      setClientsList(client);
      console.log(client);
    };


    const writeClientFile = async () => {
      let client = new Client(2, "electron", "", "", new Date(), new Date());
      daoF!.getClientDAO().create(client);
    };
    const deleteClientFile = async () => {
      daoF!.getClientDAO().delete(9);
    };

    const deleteClient = async () => {
      await Filesystem.deleteFile({
        path: 'client.json',
        directory: Directory.Documents,
      });
    };

    const updateClientFile = async () => {
      let client = new Client(4, "OwO", "Yolo", "UwU", new Date(), new Date());
      daoF!.getClientDAO().update(client);
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
                </Container>
            </main>
        </Box>
    </Box>
    );
} 