/* eslint-disable import/no-anonymous-default-export */

import SideBar from '../Components/SideBar';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Header from '../Components/Header';
import Form from "../Components/form";
import './main.css';
import React, { useState, useRef, createRef, RefObject } from "react";
import { useMutation } from "@apollo/client";
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Case } from "../Modele/metier/Case";
import { Event } from "../Modele/metier/Event";
import { Label } from "@mui/icons-material";
import { textAlign, width } from "@mui/system";
import './main.css'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";

  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
  });

export default function SpeFolder(){
    const env = useSelector((state: any) => state.env.environnement);

    const daoF = DAOFactory.getDAOFactory();
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);


   React.useEffect(() => {
    function handleResize() {
        setWindowSize(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [] = useState('');

    const [formElement, setFormElement] = React.useState({
        id: (new Date()).getTime(), 
        Code:'',
        Description:'',
        Cloturee:false,
        Clients:[],
        DateStart: new Date(),
        DateEnd: new Date(),
        Events:[],
        statut:'En cours'
      });
      const clients = [
        {'id':1,'nom':'Labrio','prenom':'Jacque','adresse':'boulevard du café','Naissance':new Date(),'date':new Date()},
        {'id':2,'nom':'Evra','prenom':'Emanuel','adresse':'boulevard du café','Naissance':new Date(),'date':new Date()},
      ]

      const elements = [
        {'id':1,  'description':'bbbbbbb', 'date':'17/03/2021', 'durée':'10'},
        {'id':2, 'description':'bbbbbbb', 'date':'17/03/2021', 'durée':'10'},
        {'id':3, 'description':'bbbbbbb', 'date':'17/03/2021', 'durée':'10'},
        {'id':4, 'description':'bbbbbbb', 'date':'17/03/2021', 'durée':'10'},
    ]

    const dossier = [{
        'id':1,
        'code':232332,
        'statut':false,
        'description':'Ceci est une description',
        'date':(new Date()).getTime(),
        'Event': elements,
        'clients': clients
    }]

    const [Clients, setClients] = React.useState([]);
    const [Events, setEvents] = React.useState([]);

    const [Client, setClient] = React.useState(clients[0].nom + clients[0].prenom);
    const [EventElement, setEventElement] = React.useState({
      id:(new Date()).getTime(),
      Description:'',
      Date: new Date(),
      Duree: 0
    });
    
    const refSelect = createRef<HTMLSelectElement>();

    const StyleBoxContainer = {
      margin : '0 auto',
      display:'flex',
      flexDirection: 'column',
      padding:1,
      width:'90%'
    }

    const StyleTitle = {
      fontWeight: 'bold',
      fontSize: 'h3.fontSize',

    }
      
      function handleChange(evt:any) {
        const value = evt.target.value;
  
        setFormElement({
          ...formElement,
          [evt.target.name]: value  
        });
  
        //console.log(formElement.status)
      }

      function handleChangeClient(evt:any) {
        const value = evt.target.value;

        console.log(value);
        setClient(
          value
        );
  
        //console.log(formElement.status)
      }

      function handleChangeEvent(evt:any) {
        const value = evt.target.value;
  
        setEventElement({
          ...EventElement,
          [evt.target.name]: value  
        });
      }

      function addEvent(){

        let idEvent = (new Date()).getTime();
        daoF!.getEventDAO().create(new Event(idEvent, formElement.id, EventElement.Description, EventElement.Date, EventElement.Duree, ))


        const event = {
          id: idEvent,
          idCase:formElement.id,
          Description: EventElement.Description,
          Date: EventElement.Date,
          Duree: EventElement.Duree
        }

        console.log(event);

        // setEvents(
        //   [...Events].concat(event)
        //   )
      }

      function addClient(evt:any){

        const value = refSelect.current?.value;

        console.log(value + 'client : ' + Client);
        const client = [
          Client
        ]

        setClients(
          //[...Clients].reduce((acc, value) => acc.concat(value), [])
          [...Clients].concat()
          //Clients.push(Client)
        )
        console.log(Clients);
        
      }

      const handleSubmit = (e:any) => {
      
        e.preventDefault();
        
        daoF!.getCaseDAO().create(new Case(Date.now(), formElement.Code, formElement.Description, formElement.DateStart, formElement.Cloturee, formElement.DateEnd, Clients, Events));
      }

      const StyleBoxRow = {
        display:'flex',
        flexDirection:'row',
        padding:1,
        justifyContent:'space-between'
      }

      const StyleBoxColumn = {
        display:'flex',
        flexDirection:'column',
        padding:1
      }
    return (

    <Grid>

        <Header/>
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <main className="main">
                <Container maxWidth="lg">
                    <ApolloProvider client={client} >

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3}} >

                        <Grid container spacing={2} sx={StyleBoxContainer}>

                            <Box>
                                <span>Dossier {'>'} {dossier[0].code}</span>
                            </Box>


                            <Grid sx={windowSize >= 650 ? StyleBoxRow : StyleBoxColumn}>

                                <Grid  sx={ windowSize >= 650 ? {marginRight:'10%', display:'flex', flexDirection:'row', justifyContent:'space-between'} : {}} >
                                    
                                    <Grid sx={{display:'flex', flexDirection:'row'}}>
                                        <FolderOpenIcon fontSize='large' sx={{marginRight:"3%",fontSize: 75}}/>

                                        <Box sx={{display:'flex', flexDirection:'column', alignSelf:'center'}}>
                                            <Box sx={{display:'flex', flexDirection:'row'}}>
                                                <span className='SpaceFolder'>{dossier[0].code}</span>
                                                
                                                { dossier[0].statut ? <div>En cours</div> : <div>Clôturée</div>}

                                            
                                            </Box>

                                            <Box sx={{fontStyle: 'italic',fontSize: 10,}}>Affaire ouverte le {dossier[0].date}</Box>
                                        </Box>
                                    </Grid>

                                    <Grid>
                                        <Button variant="contained">Modicier dossier</Button>
                                        <Button variant="contained" >Supprimer</Button>
                                    </Grid>
                                    
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Box>

                    </ApolloProvider>
                    
                </Container>
            </main>
        </Box>
    </Grid>
    );
} 
