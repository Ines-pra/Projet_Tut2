import { useEffect, useState } from "react";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { TextField, InputLabel, Stack } from "@mui/material";
import { Client } from "../../Modele/metier/Client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DAOFactory from "../../Modele/dao/factory/DAOFactory";

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

function ClientModal(openEdit:any) {

  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState(''); 
  const [address,setAddress] = useState(''); 
  const [birth, setBirth] = useState(new Date());

  const daoF = DAOFactory.getDAOFactory();
  // Récupération des données //
  useEffect (() => {
    async function fetchData() {
        // Si l'id est à 0, cela veut dire que c'est un ajout, sinon c'est une modif
        if(openEdit.id !== 0){
            let c1:Client = await daoF!.getClientDAO().findById(openEdit.id);
            setFirstname(c1.firstname);
            setLastname(c1.lastname);
            setAddress(c1.address);
            setBirth(c1.birthDate);
        }else{
            resetState();
        }
        return true;
        }
        fetchData();
    }, [openEdit.id]);

  // Pour reset les states //
  function resetState(){
    setFirstname('');
    setLastname('');
    setAddress('');
    setBirth(new Date());
  } 

  // Pour la fermeture de la modal et le reset //
  function closeDef(){
    resetState();
    openEdit.handleClose();
  }
  
  // Envoie des données //
  const setClient = async (lastname:string, firstname:string, address:string, birthDate:Date) => {
     let message:Array<string> = [];
     let vld = true;
     let cli = new Client(openEdit.id, lastname, firstname, address, birthDate, new Date());
     let element = [{k:"lastname", v:lastname}, {k:"firstname", v:firstname}, {k:"address", v:address}, {k:"birthDate", v:birthDate}];
     
    //  On verifie chaque input est on vérifie si il n'est pas vide
     element.forEach(element => {
         if(element.v === ''){
             vld = false;
             message.push(element.k + ' is empty \n');
         }
     }); 

    //  Test de la validité 
     if(vld){
         if (openEdit.id === 0 ){
              await daoF!.getClientDAO().create(cli);
              openEdit.addFunction(cli);
         }else{
              await daoF!.getClientDAO().update(cli);
              openEdit.updateFunction(cli);
         }
        //  Reset des states et femeture de la modal
        closeDef();

     }else{
         alert(message);
     }
  }

  return (
    <ThemeProvider theme={theme}>
    <div>
      <Modal
        open={openEdit.openNew}
        onClose={openEdit.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           {openEdit.id === 0 ? 'Ajouter un client'  :  'Edité client'}
          </Typography>
          <InputLabel sx={{marginTop:1}} id="modal-modal-titleCard">Prénom :</InputLabel>
          <TextField
            id="filled-basic"
            label="Firstname"
            variant="filled"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
          />
          <InputLabel sx={{marginTop:2}} id="modal-modal-titleCard">Nom :</InputLabel>
          <TextField
            id="filled-basic"
            label="Lastname"
            variant="filled"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
          />
          <InputLabel sx={{marginTop:2}} id="modal-modal-titleCard">Adresse :</InputLabel>
          <TextField
            id="filled-basic"
            label="Address"
            variant="filled"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
            <InputLabel sx={{marginTop:2}} id="modal-modal-titleCard">Date de naissance :</InputLabel>
            <TextField
                    id="date"
                    label="Birth Date"
                    type="date"
                    variant="filled"
                    defaultValue={birth}
                    fullWidth
                    onChange={(e) => setBirth(new Date(e.target.value))}
                    InputLabelProps={{
                    shrink: true,
                    }}                
            />
          <Box height={'5vh'}/>
            <Stack direction='row' spacing={2}>
              <Button fullWidth variant="outlined" sx={{marginRight:1}} color="success" onClick= {()=>setClient(lastname, firstname, address, birth)}>
                Valider
              </Button>
              <Button fullWidth variant="outlined" color="error"  onClick= {() => openEdit.handleClose()}>
                Annuler
              </Button>
            </Stack>
          </Box>
      </Modal>
    </div>
    </ThemeProvider>
  );
}


export default ClientModal;

