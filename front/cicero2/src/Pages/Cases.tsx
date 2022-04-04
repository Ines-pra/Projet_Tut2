/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Case } from "../Modele/metier/Case";
import { Event } from "../Modele/metier/Event";
import { Client } from "../Modele/metier/Client";

const styleHeader = {
    background: '#535454',
    color: '#fff',
    width: '100%',
};

const defaultCase: Case[] | (() => Case[]) = []
const defaultEvent: Event[] | (() => Event[]) = []
 
export default function Cases(){
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
        let client = new Client(2, "electron", "", "", new Date(), new Date());
        let code = "CC/" + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
        let cas = new Case(1, code, "Vole à main armée", new Date(), false, new Date(), [client], []);
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

    //////\ EVENT /\\\\\\
    // Lecture du fichier event.json //
    const readEventFile = async () => {
      let events = await daoF!.getEventDAO().findAll();
      setEventsList(events);
      console.log(events);
    };
    // Ajout d'un événement //
    const writeEventFile = async () => {
      let event = new Event(1, 2, "electron", new Date(), 30);
      daoF!.getEventDAO().create(event);
    };
    // Suppression du fichier event.json //
    const deleteEventFile = async () => {
      await Filesystem.deleteFile({
        path: 'event.json',
        directory: Directory.Documents,
      });
    };

    return (
    <Box>
        <button
            onClick={() => {
                writeCaseFile()
            }}
        >
            Write case
        </button>
        <button
            onClick={() => {
                readCaseFile()
            }}
        >
            Read cases
        </button>
        {/* <button
            onClick={() => {
                deleteCaseFile()
            }}
        >
            Delete case file
        </button> */}
        <button
            onClick={() => {
                deleteCase()
            }}
        >
            Delete case
        </button>
        <button
            onClick={() => {
                updateCaseFile()
            }}
        >
            Update case
        </button>
        <Stack sx={styleHeader}>
            <h1>HEADER</h1>
        </Stack>
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <main className="content">
                <Container maxWidth="lg">
                    <h2>CONTENU Dossiers</h2>
                    <button
                        onClick={() => {
                            writeEventFile()
                        }}
                    >
                        Write event
                    </button>
                    <button
                        onClick={() => {
                            readEventFile()
                        }}
                    >
                        Read events
                    </button>
                    <button
                        onClick={() => {
                            deleteEventFile()
                        }}
                    >
                        Delete event file
                    </button>
                    {casesList.map((caseItem: Case) => (
                        <div key={caseItem.id}>
                            <p>{caseItem.code}</p>

                        </div>
                    ))}
                </Container>
            </main>
        </Box>
    </Box>
    );
} 