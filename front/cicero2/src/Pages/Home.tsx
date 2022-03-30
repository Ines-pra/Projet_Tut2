/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from "../Components/SideBar";
import { Container } from "@mui/material";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Client } from "../Modele/metier/Client";

const styleHeader = {
  background: "#535454",
  color: "#fff",
  width: "100%",
};

const defaultClient: Client[] | (() => Client[]) = []

export default function Home() {
  const env = useSelector((state: any) => state.env.environnement);
  const [clientsList, setClientsList] = React.useState(defaultClient);

  const daoF = DAOFactory.getDAOFactory();

  const readSecretFile = async () => {
    let client = await daoF!.getClientDAO().findAll();
    setClientsList(client);
    console.log(client);
  };
  

  const writeSecretFile = async () => {
    let client = new Client(2, "electron", "", "", new Date(), new Date());
    let id = daoF!.getClientDAO().create(client);
  };
  const deleteClientFile = async () => {
    let client = daoF!.getClientDAO().delete(9);
  };

  const deleteSecretFile = async () => {
    await Filesystem.deleteFile({
      path: 'data.json',
      directory: Directory.Documents,
    });
  };
  
  return (
    <Grid>
      <button
        onClick={() => {
            writeSecretFile()
        }}
      >
        Write file
      </button>
      <button
        onClick={() => {
            readSecretFile()
        }}
      >
        Read file
      </button>
      <button
        onClick={() => {
            deleteSecretFile()
        }}
      >
        Delete file
      </button>
      <button
        onClick={() => {
            deleteClientFile()
        }}
      >
        Delete client
      </button>
      <Stack sx={styleHeader}>
        <h1>HEADER</h1>
      </Stack>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <main className="content">
          <Container maxWidth="lg">
            <h2>CONTENU Accueil</h2>
            <p>{env}</p>
          </Container>
        </main>
      </Box>
    </Grid>
  );
}
