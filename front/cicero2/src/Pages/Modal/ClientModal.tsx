import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, InputLabel } from "@mui/material";
import { Client } from "../../Modele/metier/Client";
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

function ClientModal(openEdit:any) {

  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState(''); 
  const [address,setAddress] = useState(''); 
  const [birth, setBirth] = useState(new Date());

  const daoF = DAOFactory.getDAOFactory();

  useEffect (() => {
    async function fetchData() {
        if(openEdit.id !== 0){
            let c1:Client = await daoF!.getClientDAO().findById(openEdit.id);
            // setClientId(c1);
            setFirstname(c1.firstname);
            setLastname(c1.lastname);
            setAddress(c1.address);
            setBirth(c1.birthDate);
        }else{
            setFirstname('');
            setLastname('');
            setAddress('');
            setBirth(new Date());
        }
        return true;
        }
        fetchData();
    }, [openEdit.id]);

     
     const setClient = async (lastname:string, firstname:string, address:string, birthDate:Date) => {
        let message:Array<string> = [];
        let vld = true;
        let cli = new Client(openEdit.id, lastname, firstname, address, birthDate, new Date());
        let element = [{k:"lastname", v:lastname}, {k:"firstname", v:firstname}, {k:"address", v:address}, {k:"birthDate", v:birthDate}];
        element.forEach(element => {
            if(element.v === ''){
                vld = false;
                message.push(element.k + ' is empty \n');
            }
        }); 
        
        console.log(vld);

        if(vld){
            if (openEdit.id === 0 ){
                 await daoF!.getClientDAO().create(cli);
                 openEdit.addFunction(cli);
            }else{
                 await daoF!.getClientDAO().update(cli);
                 openEdit.updateFunction(cli);
            }
            openEdit.handleClose();
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

          <InputLabel sx={{marginTop:1}} id="modal-modal-titleCard">Firstname :</InputLabel>
          <TextField
            id="filled-basic"
            label="Firstname"
            variant="filled"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
          />

          <InputLabel sx={{marginTop:2}} id="modal-modal-titleCard">Lastname :</InputLabel>
          <TextField
            id="filled-basic"
            label="Lastname"
            variant="filled"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
          />


          <InputLabel sx={{marginTop:2}} id="modal-modal-titleCard">Address :</InputLabel>
          <TextField
            id="filled-basic"
            label="Address"
            variant="filled"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
            <InputLabel sx={{marginTop:2}} id="modal-modal-titleCard">Birth Date :</InputLabel>
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
       
        

          <Button variant="outlined" sx={{marginRight:1}} color="success" onClick= {()=>setClient(lastname, firstname, address, birth)}>
            Valider
          </Button>

          <Button variant="outlined" color="error"  onClick= {() => openEdit.handleClose()}>
            Annuler
          </Button>
          
         

          </Box>
      </Modal>
    </div>
    </ThemeProvider>
  );
}


export default ClientModal;

