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

const styleHeader = {
  background: "#535454",
  color: "#fff",
  width: "100%",
};

export default function Home() {
  const env = useSelector((state: any) => state.env.environnement);

  const daoF = DAOFactory.getDAOFactory();
  const clients = daoF!.getClientDAO().findById(1);
  const cas = daoF!.getCaseDAO().findById(1);
  const event = daoF!.getEventDAO().findById(1);

  console.log(clients);
  console.log(cas);
  console.log(event);

  return (
    <Grid>
      <button
        onClick={() => {
          Filesystem.writeFile({
            data: "Hello world uwu " + new Date().toISOString(),
            path: "data.txt",
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          });
        }}
      >
        Write file
      </button>
      <button
        onClick={() => {
          Filesystem.readFile({
            path: "data.txt",
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          })
            .then(console.log)
            .catch(console.error);
        }}
      >
        Read file
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
