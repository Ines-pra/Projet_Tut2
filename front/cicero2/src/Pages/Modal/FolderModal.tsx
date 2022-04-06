import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, Typography, InputLabel, MenuItem, Modal, Select, TextField,Alert, Snackbar, Stack } from "@mui/material";
import { Case } from "../../Modele/metier/Case";
import '../main.css';
import {Client} from "../../Modele/metier/Client"
import DAOFactory from "../../Modele/dao/factory/DAOFactory";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflowY: 'scroll',
  transform: "translate(-50%, -50%)",
  width: '50%',
  borderRadius: 3,
  bgcolor: "#000",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
  color:"white"
};

function FolderModal({openModal,handleClose,id}:{openModal:boolean,handleClose:any,id:number}) {

    const [openSucc, setOpenSucc] = React.useState(false);
    const handleOpenSucc = () => setOpenSucc(true);
    const handleCloseSucc = () => setOpenSucc(false);

    const daoF = DAOFactory.getDAOFactory();
    let c1:Array<Client> = [];
    const [Clients, setClients] = React.useState(c1);
    const [newClient, setNewClient] = React.useState(c1);
    const [lstIdC, setIdCliL] = useState('');
    const [ListClients, setListClients] = React.useState(c1);

    const [CaseInfo,setCaseInfo] = React.useState({
      id: (new Date()).getTime(), 
      Code:'',
      Description:'',
      Clients: [],
      DateStart: new Date(),
      DateEnd: new Date(),
      Events:[],
      statut: false
    });


    useEffect (() => {
      let c1:Array<Client> = [];
      setIdCliL('');
      setNewClient(c1);
      async function fetchData() { 
      
      const response2 = await daoF!.getClientDAO().findAll();
      setListClients(response2 as any);

        if (id != 0) {
          const response = await daoF!.getCaseDAO().findById(id);      
          setClients(response.clients);    
          setCaseInfo({
            id: id, 
            Code:response.code,
            Description:response.description,
            Clients:response.clients as any,
            DateStart: response.startedAt,
            DateEnd: response.endedAt,
            Events:response.events as any,
            statut:response.status as boolean
          })

          }

          else{
            setClients(c1);
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



      function handleChangeClient(evt:any) {
        const value = evt.target.value;   
        setIdCliL(value);    
        
    }

      async function addClient(id:number) {
          const res = await daoF!.getClientDAO().findById(id);
          let tabAll;
          let exist:boolean = false;
          Clients.forEach(element => {
            // console.log(element);
            console.log(id+ '--' +element.id)
              if(element.id == id){
                exist = true;
              }
            
          });
          console.log(exist);
          
          if(exist == false){
            tabAll = [...Clients, res];
            setClients(tabAll);
            setNewClient([...newClient, res]);
            handleOpenSucc();
            
          }else{
            alert('Client déjà ajouté'); 
          }
      }

      
      function handleChange(evt:any) {
        const value = evt.target.value;
  
        setCaseInfo({
          ...CaseInfo,
          [evt.target.name]: value  
        });

      }

      
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(CaseInfo.Code != '' || CaseInfo.Description != '' ){
        if(id==0){
          daoF!.getCaseDAO().create(new Case(0, CaseInfo.Code, CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), newClient, []));
        }else{
          daoF!.getCaseDAO().update(new Case(id, CaseInfo.Code, CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), newClient, []));
        }
        handleClose();
        }else{
          alert('veuillez remplir tout les champs');
        }
      }

  return (      
    <ThemeProvider theme={theme}>
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" 
      > 

        <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
    
            
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'white'}}>
             { id==0 ? "Création d'un dossier" : "Modification du dossier " + id}
        </Typography>
  
            
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

              <FormControl fullWidth>
                      <InputLabel id="clientInput">Client </InputLabel>
                      <Select
                        labelId="client"
                        id="client"
                        name="client"
                        value={lstIdC}
                        label="Client"
                        sx={{marginBottom:'10px'}}
                        onChange={handleChangeClient}
                      >
                        
                        { ListClients?.map((client)=> {
                            return <MenuItem value={client?.id}> {client?.lastname} {client?.firstname}</MenuItem>

                          })}
                        
                      </Select>
                  </FormControl>

                  <Button 
                      color="primary"
                      onClick={()=>addClient(Number.parseInt(lstIdC))}
                      fullWidth
                      >
                        Ajouter Client
                  </Button>
                                  
                { CaseInfo.statut != false ?
                    ''
                : 
                <Button onClick={()=>console.log('test')} variant="contained" sx={{ alignSelf:"center", marginRight:1, minWidth:'100px', bgColor:'F9EE16'}} >
                 Cloturés ?   
                </Button>
                }

              </Stack>

          <Box height={'5vh'}/>
            

          <Stack direction='row' spacing={2}>
              <Button fullWidth variant="outlined" sx={{marginRight:1}} color="success" type="submit">
                Valider
              </Button>

              <Button fullWidth variant="outlined" color="error"  onClick= {() => handleClose()}>
                Annuler
              </Button>
          </Stack>
          <Snackbar open={openSucc} autoHideDuration={2000} onClose={handleCloseSucc}>
            <Alert onClose={handleCloseSucc} severity="success" sx={{ width: '100%' }}>
              Client associés !
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
      </ThemeProvider>
      );
}

export default FolderModal;