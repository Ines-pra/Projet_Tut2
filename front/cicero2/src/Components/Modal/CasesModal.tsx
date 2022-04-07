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
const defaultClient: Array<Client> = [];

function CasesModal({openModal, handleClose, id, addFunction, updateFunction}:{openModal: boolean, handleClose: any, id: number, addFunction: any, updateFunction: any}) {
   
    // State de l'alerte success qui s'affiche a chaque fois qu'on ajoute un client
    const [openSucc, setOpenSucc] = React.useState(false);

    // Ce sont les state nécessaire pour vérifier qu'un client n'est pas en double
      // ce state regroupe tout les client précdemment ajouter lors de la création ou d'une ancienne modif
    const [Clients, setClients] = React.useState(defaultClient);
      // celle-ci tout les clients durant la modif actuelle
    const [newClient, setNewClient] = React.useState(defaultClient);
      // celui ci récupére l'id dans la value de l'item de la selectbox
    const [lstIdC, setIdCliL] = useState('');

    /*
      cette façon de faire un peu spécial vise à évité les conflit dans la base de données,
      étant donnée que l'on rentre 2 clés primaire dans une table formant une clé unique, le faite 
      que l'on veut créer 2 fois une même clé unique crash la base de données.

      D'autres façon de faire aurait pu être abordé mais au vue du temps, c'était la meilleur solutions
    */

    // State pour la récupération de la liste des clients afin de les affiché dans le selectbox
    const [ListClients, setListClients] = React.useState(defaultClient);

    // Fonction pour changer le state pour l'ouverture de l'alert success
    const handleOpenSucc = () => setOpenSucc(true);
    const handleCloseSucc = () => setOpenSucc(false);

    // Appel du singleton pour la DAO
    const daoF = DAOFactory.getDAOFactory();

    // State pour la modification du dossier courant 
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
    // Création d'un code aléatoire //
    function makeid() {
        let code = (Math.floor(Math.random() * (99 - 10 + 1)) + 10);
        let length = 8;
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
          setListClients(response2 as any);
          // Si l'id est à 0, cela veut dire que c'est un ajout, sinon c'est une modif
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
          } else {
              resetState();
          }
        } fetchData();
      }, [id]);

      // Seulement pour récupérer valeur de la selectbox //
    function handleChangeClient(evt:any) {
      const value = evt.target.value;
      console.log(value);
         
      setIdCliL(value);        
    }

    // Fonction et logique de l'ajout d'un client //
    async function addClient(id:number) {
        const res = await daoF!.getClientDAO().findById(id);
        console.log(res);
        console.log(id);
        
        let tabAll;
        let exist:boolean = false;
        // on vérifie que le client n'est pas déjà présent dans la liste
        Clients.forEach(element => {
            if(element.id == id){
              // si oui le boolean passe a true
              exist = true;
            }
        });

          if(exist == false){
            // Si il n'existe pas alors:

            // On ajoute celui ci a une table
            tabAll = [...Clients, res];

            // Que l'on attribura au state des clients précedement ajouter (Pour ne pas pouvoir avoir de fois le même)
            setClients(tabAll);

            // Ainsi que dans le state des nouveaux client pour facilité l'ajout et éviter les crashs
            setNewClient([...newClient, res]);

            // Enfin on affiche l'alert de succés
            handleOpenSucc();
          }else{
            // Message d'erreur
            alert('Client déjà ajouté'); 
          }
    }

    // Seulement pour la récupértion des données écrite dans les inputs //
    function handleChange(evt:any) {
        const value = evt.target.value;
        setCaseInfo({
          ...CaseInfo,
          [evt.target.name]: value  
        });

    }

    // Fonction de validation //
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // Test si les champs sont pas vide
        if(CaseInfo.Code != '' || CaseInfo.Description != '' ){
          // Verifie si c'est une mise à jour ou une insertion
        if(id == 0){
          let idCase = await daoF!.getCaseDAO().create(new Case(0, makeid(), CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), newClient, []));
          addFunction(new Case(idCase, makeid(), CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), Clients, []));
        }else{
          if (process.env.REACT_APP_ENV === 'web') {
            daoF!.getCaseDAO().update(new Case(id, CaseInfo.Code, CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), newClient, []));
            updateFunction(new Case(id, CaseInfo.Code, CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), Clients, []));
          } else {
            daoF!.getCaseDAO().update(new Case(id, CaseInfo.Code, CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), Clients, []));
            updateFunction(new Case(id, CaseInfo.Code, CaseInfo.Description, new Date(), CaseInfo.statut, new Date(), Clients, []));
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
        {console.log(newClient)
        }
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
                    {/* <TextField
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
                  /> */}
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