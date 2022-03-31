/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Case } from "../Modele/metier/Case";
import { Event } from "../Modele/metier/Event";

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

    //////\ CASE /\\\\\\
    const readCaseFile = async () => {
      let cases = await daoF!.getCaseDAO().findAll();
      setCasesList(cases);
      console.log(cases);
    };

    const writeCaseFile = async () => {
      let cas = new Case(1, "electron", "", new Date(), true, new Date(), 1, []);
      daoF!.getCaseDAO().create(cas);
    };
    const deleteCase = async () => {
      daoF!.getCaseDAO().delete(9);
    };

    const deleteCaseFile = async () => {
      await Filesystem.deleteFile({
        path: 'case.json',
        directory: Directory.Documents,
      });
    };

    const updateCaseFile = async () => {
      let cas = new Case(3, "OwO", "UwU", new Date(), true, new Date(), 1, []);
      daoF!.getCaseDAO().update(cas);
    };

    //////\ EVENT /\\\\\\
    const readEventFile = async () => {
      let events = await daoF!.getEventDAO().findAll();
      setEventsList(events);
      console.log(events);
    };

    const writeEventFile = async () => {
      let event = new Event(1, 2, "electron", new Date(), 30);
      daoF!.getEventDAO().create(event);
    };
    const deleteEvent = async () => {
      daoF!.getEventDAO().delete(9);
    };

    const deleteEventFile = async () => {
      await Filesystem.deleteFile({
        path: 'event.json',
        directory: Directory.Documents,
      });
    };

    const updateEventFile = async () => {
      let event = new Event(1, 2, "electron", new Date(), 30);
      daoF!.getEventDAO().update(event);
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
        <button
            onClick={() => {
                deleteCaseFile()
            }}
        >
            Delete case file
        </button>
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
                    <button
                        onClick={() => {
                            deleteEvent()
                        }}
                    >
                        Delete event
                    </button>
                    <button
                        onClick={() => {
                            updateEventFile()
                        }}
                    >
                        Update event
                    </button>
                </Container>
            </main>
        </Box>
    </Box>
    );
} 