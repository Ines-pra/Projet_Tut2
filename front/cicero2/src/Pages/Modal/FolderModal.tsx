import React, { useState, useRef, createRef, RefObject,useEffect } from "react";
import DAOFactory from "../../Modele/dao/factory/DAOFactory";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Stack } from "@mui/material";
import { Case } from "../../Modele/metier/Case";
import '../main.css';
import { Client } from "../../Modele/metier/Client";
import moment from 'moment';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function FolderModal({openModal,handleClose,id}:{openModal:boolean,handleClose:any,id:number}) {

    const daoF = DAOFactory.getDAOFactory();

    const [CaseInfo,setCaseInfo] = React.useState({
      id: (new Date()).getTime(), 
      Code:'',
      Description:'',
      Clients: [],
      DateStart: new Date(),
      DateEnd: new Date(),
      Events:[],
      statut:false
    });

  //  React.useEffect(() => {
  //   function handleResize() {
  //       setWindowSize(window.innerWidth);
  //     }

  //     window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  //   }, []);


    let c1:Client = new Client(1,"", "", "", new Date(), new Date());

    const [Clients, setClients] = React.useState([]);

    const [ListClients, setListClients] = React.useState([c1]);
    const [ClientSeclect, setclient] = React.useState('');
    const [ContainClient, setContainClient] = React.useState<Client>();

    const [Events, setEvents] = React.useState([]);

    useEffect (() => {
      async function fetchData() {

        const response2 = await daoF!.getClientDAO().findAll();
        setListClients(response2 as any);

        if (id != 0) {
          const response = await daoF!.getCaseDAO().findById(id);          

          setCaseInfo({
            id: id, 
            Code:response.code,
            Description:response.description,
            Clients:response.clients as any,
            DateStart: response.startedAt,
            DateEnd: response.endedAt,
            Events:response.events as any,
            statut:false
          })

          }

          else{
            setCaseInfo({
              id: 0, 
              Code:'',
              Description:'',
              Clients:[],
              DateStart: new Date(),
              DateEnd: new Date(),
              Events:[],
              statut:false
            })
          }
        }
        fetchData();
        
      }, [id]);

    //A revoir
    const refSelect = createRef<HTMLSelectElement>();
    //

      
      function handleChange(evt:any) {
        const value = evt.target.value;
  
        // setFormElement({
        //   ...formElement,
        //   [evt.target.name]: value  
        // });

        setCaseInfo({
          ...CaseInfo,
          [evt.target.name]: value  
        });

        //console.log(formElement.statut)
      }



      function handleChangeClient(evt:any) {
        const value = evt.target.value;

        
        setclient(
          value
        );
  
        console.log('après ' + ClientSeclect)
      }



      function addClient(evt:any){

        const value = refSelect.current?.value;

        //---- Code Flavien ------
        // let table = CaseInfo;
        // let newTable = [...table.Events, ContainClient];
        // table.Events = newTable;
        // setCaseInfo(table);


        console.log(ClientSeclect)

        ListClients.map((client)=>{

          if (client.lastname == ClientSeclect) {
            setContainClient(client);
            //Trouver Client en fonction du nom selection
          }
        })

        // console.log(ClientSeclect);

        // setClients(
        //   [...Clients].reduce((acc, value) => acc.concat(value), [])
        //   [...Clients].concat(ContainClient)
        //   Clients.push(ContainClient)
          
        //   [...clients, ContainClient];
        // )
        console.log(ContainClient);
        
      }

      
      const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(id);
        if(id==0){
          daoF!.getCaseDAO().create(new Case(0, CaseInfo.Code, CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), Clients, Events));
        }else{
          daoF!.getCaseDAO().update(new Case(id, CaseInfo.Code, CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), Clients, Events));
        }
        handleClose();
        //Associer à client
      }

      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        height:'auto',
        overflowY: 'scroll',
        transform: "translate(-50%, -50%)",
        width: 'auto',
        borderRadius: 3,
        bgcolor: "#202121",
        border: "2px solid #FFF",
        boxShadow: 24,
        p: 4,
        color:"white"
      };

  return (      
    <ThemeProvider theme={theme}>
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" 
      > 

        <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
    
            
            <Box  >
             { id==0 ? "Création d'un dossier" : "Modification du dossier " + id}
            </Box>
  
            
              <Stack spacing={2}>
                          
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="text"                                                                                                                                                                                                
                        name="Description"
                        multiline
                        fullWidth

                        value={CaseInfo.Description}
                        //value={formElement.Description}
                        placeholder="Description"
                        onChange={handleChange}  
                        
                    />        
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        type="text"                                                                                                                                                                                                
                        name="Code"
                        multiline
                        fullWidth
                        value={CaseInfo.Code}
                        placeholder="Code"
                        onChange={handleChange}  
                        
                  /> 
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      type="date"
                      name="DateStart"
                      placeholder="DateStart"
                      onChange={handleChange}
                      value={moment(CaseInfo.DateStart).format('YYYY-MM-DD')}
                    />

                  
                  <FormControl fullWidth>
                    <InputLabel id="clientInput">Client</InputLabel>
                    <Select
                      labelId="client"
                      id="client"
                      name="client"
                      value={ClientSeclect}
                      ref={refSelect}
                      label="Client"
                      sx={{marginBottom:'10px'}}
                      onChange={handleChangeClient}
                    >
                      
                      { ListClients?.map((client)=> {
                        
                        // Client restant :
                        //if (!Clients.includes(client) ) {

                        // console.log(client);
                          return <MenuItem value={client?.lastname}> {client?.lastname} {client?.firstname}</MenuItem>
                        //}
                        
                            
                        })}
                      
                    </Select>
                </FormControl>

                <Button 
                    type="submit"
                    color="primary"
                    onClick={addClient}
                    fullWidth
                    >
                      Ajouter Client
                </Button>
                  

                <Button variant="contained" sx={{marginRight:1}} color="warning">
                      Cloturés    
                </Button>
  
              </Stack>
  
                
                  { Clients.map((client:any)=> {
                      return <div>{client?.nom} {client?.prenom}</div>
                  })}


          <Box width={10}>
            
          </Box>       
          
          <Button variant="outlined" sx={{marginRight:1}} color="success" type="submit">
            Valider
          </Button>

          <Button variant="outlined" color="error"  onClick= {() => handleClose()}>
            Annuler
          </Button>

        </Box>
      </Modal>
      </ThemeProvider>
      );
}

export default FolderModal;