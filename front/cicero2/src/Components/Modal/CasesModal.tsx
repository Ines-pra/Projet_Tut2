import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, Typography, InputLabel, MenuItem, Modal, Select, TextField,Alert, Snackbar, Stack } from "@mui/material";
import { Case } from "../../Modele/metier/Case";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { Client } from "../../Modele/metier/Client";
import DAOFactory from "../../Modele/dao/factory/DAOFactory";
import '../../Styles/main.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '50%',
  borderRadius: 3,
  bgcolor: "#000",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
  color:"white"
};
const defaultClient: Array<Client> = [];
const defaultCase: Case = {
    id: (new Date()).getTime(), 
    code:'',
    description:'',
    clients: [],
    startedAt: new Date(),
    endedAt: new Date(),
    events:[],
    status: false
};

function CasesModal({openModal, handleClose, id, addFunction, updateFunction}:{openModal: boolean, handleClose: any, id: number, addFunction: any, updateFunction: any}) {
    const [openSucc, setOpenSucc] = React.useState(false);     // State de l'alerte success qui s'affiche a chaque fois qu'on ajoute un client
    const [clients, setClients] = React.useState(defaultClient);      // ce state regroupe tout les client précdemment ajouter lors de la création ou d'une ancienne modif
    const [newClient, setNewClient] = React.useState(defaultClient);      // celle-ci tout les clients durant la modif actuelle
    const [lstIdC, setIdCliL] = useState('');      // celui ci récupére l'id dans la value de l'item de la selectbox
    const [caseInfo, setCaseInfo] = React.useState(defaultCase);        // State pour la modification du dossier courant 
    const [description, setDescription] = React.useState('');
    /*
      cette façon de faire un peu spécial vise à évité les conflit dans la base de données,
      étant donnée que l'on rentre 2 clés primaire dans une table formant une clé unique, le faite 
      que l'on veut créer 2 fois une même clé unique crash la base de données.

      D'autres façon de faire aurait pu être abordé mais au vue du temps, c'était la meilleur solutions
    */
    const [Listclients, setListclients] = React.useState(defaultClient);
    // Fonction pour changer le state pour l'ouverture de l'alert success
    const handleOpenSucc = () => setOpenSucc(true);
    const handleCloseSucc = () => setOpenSucc(false);
    const daoF = DAOFactory.getDAOFactory();

    // Création d'un code aléatoire //
    function makeid() {
        let code = (Math.floor(Math.random() * (99 - 10 + 1)) + 10);
        let length = 8;
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        } 

        return code + "/" + result;
    }

    // Pour reset le state
    function resetState(){
      let c1:Array<Client> = [];
      setClients(c1);
      setNewClient(c1);
      setCaseInfo(defaultCase)
    }

    function closeDef(){
      resetState();
      handleClose();
    }

    // A chaque chargement de l'id en paramètre de se composant, plusieurs actions sont faites
    useEffect (() => {
      // On réinitialise les states de la liste clients actuelle ainsi que le state de la récupération de l'id
      let c1:Array<Client> = [];
      setIdCliL('');
      setNewClient(c1);
      // On récupère les bonne données et on les initalises 
        async function fetchData() { 
          const response2 = await daoF!.getClientDAO().findAll();
          setListclients(response2);
          // Si l'id est à 0, cela veut dire que c'est un ajout, sinon c'est une modif
          if (id != 0) {
            const response = await daoF!.getCaseDAO().findById(id);      
            setClients(response.clients);    
            setCaseInfo(response);
            setDescription(response.description);
          } else {
              resetState();
          }
        } fetchData();
      }, [id]);

    // Seulement pour récupérer valeur de la selectbox //
    function handleChangeClient(evt:any) {
      const value = evt.target.value;
      setIdCliL(value);        
    }

    // Fonction et logique de l'ajout d'un client //
    async function addClient(id:number) {
        const res = await daoF!.getClientDAO().findById(id);
        let tabAll;
        let exist:boolean = false;
        // on vérifie que le client n'est pas déjà présent dans la liste
        clients.forEach(element => {
            if(element.id == id){
              exist = true;
            }
        });

          if(exist == false){
            tabAll = [...clients, res]; // On ajoute celui ci a une table
            setClients(tabAll);  // Que l'on attribura au state des clients précedement ajouter (Pour ne pas pouvoir avoir de fois le même)
            setNewClient([...newClient, res]); // Ainsi que dans le state des nouveaux client pour facilité l'ajout et éviter les crashs
            handleOpenSucc();  // On affiche l'alert de succés
          }else{
            alert('Client déjà ajouté'); // Message d'erreur
          }
    }

    // Seulement pour la récupértion des données écrite dans les inputs //
    function handleChange(evt:any) {
        const value = evt.target.value;
        setDescription(value);
    }

    // Fonction de validation //
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        caseInfo.description = description;
        // Test si les champs sont pas vide
        if(caseInfo.code != '' || caseInfo.description != '' ){
          // Verifie si c'est une mise à jour ou une insertion
        if(id == 0){
          let idCase = await daoF!.getCaseDAO().create(new Case(0, makeid(), caseInfo.description, new Date(), caseInfo.status, new Date(), newClient, []));
          addFunction(new Case(idCase, makeid(), caseInfo.description, new Date(), caseInfo.status, new Date(), clients, []));
        }else{
          if (process.env.REACT_APP_ENV === 'web') {
            daoF!.getCaseDAO().update(new Case(id, caseInfo.code, caseInfo.description, new Date(), caseInfo.status, new Date(), newClient, []));
            updateFunction(new Case(id, caseInfo.code, caseInfo.description, new Date(), caseInfo.status, new Date(), clients, []));
          } else {
            daoF!.getCaseDAO().update(new Case(id, caseInfo.code, caseInfo.description, new Date(), caseInfo.status, new Date(), clients, []));
            updateFunction(new Case(id, caseInfo.code, caseInfo.description, new Date(), caseInfo.status, new Date(), clients, []));
          }
        }
        // On ferme la modal et reset
        closeDef();
        }else{
          alert('veuillez remplir tout les champs');
        }
      }

  return (      
    <ThemeProvider theme={theme}>
    <Modal
      open={openModal}
      onClose={() => closeDef}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" 
      > 
        <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>  
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'white'}}>
             { id == 0 ? "Création d'un dossier" : "Modification du dossier " + id}
        </Typography>
              <Stack spacing={2}>     
                    <TextField
                        margin="normal"
                        required
                        type="text"                                                                                                                                                                                                
                        label="description"
                        multiline
                        fullWidth
                        variant="outlined"
                        value={description}
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
                        variant="outlined"
                        sx={{marginBottom:'10px'}}
                        onChange={handleChangeClient}
                      >
                        { Listclients?.map((client)=> {
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

export default CasesModal;