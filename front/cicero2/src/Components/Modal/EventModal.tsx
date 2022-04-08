import { useState } from "react";
import { TextField, Stack } from "@mui/material";
import { Event } from "../../Modele/metier/Event";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
};

export default function EventModal(openEdit: any) {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(''); 
    const [duree, setDuree] = useState(''); 

    // Envoie des données //
    function setEvent(description: string, date: Date, duree: string){
        let message:Array<string> = [];
        let valid = true;
        let element = [{k:"description", v:description}, {k:"date", v:date}, {k:"duree", v:duree}];
        element.forEach(element => {
        if(element.v === ''){
            valid = false;
            message.push(element.k + ' is empty \n');
          }
        }); 
        if(valid) {
            let event = new Event(1, openEdit.caseId, description, date, parseInt(duree));
            openEdit.eventFunction(event);
            openEdit.handleClose();
        } else {
            alert(message);
        }
    }

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Modal
        open={openEdit.open}
        onClose={openEdit.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'white'}}>
                Ajouter un évènement
            </Typography>
            <TextField
                id="filled-basic"
                label="Description"
                variant="outlined"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                sx={{marginTop: 3}}
            /> 
            <TextField
                id="date"
                label="Date"
                type="date"
                variant="outlined"
                defaultValue={date}
                required
                sx={{marginTop: 3}}
                InputLabelProps={{
                shrink: true,
                }}
                fullWidth
                onChange={(e) => setDate(e.target.value)}
            />
            <TextField
                id="filled-basic"
                label="Durée"
                type="number"
                variant="outlined"
                required
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                fullWidth
                sx={{marginTop: 3}}
            />
          <Box height={'5vh'}/>
            <Stack direction='row' spacing={2}>
              <Button fullWidth variant="outlined" color="success" onClick= {() => setEvent(description, new Date(date), duree)}>
                Valider
              </Button> 
              <Button fullWidth variant="outlined" color="error"  onClick= {() => openEdit.handleClose()}>
                Annuler
              </Button>
            </Stack>
        </Box>
      </Modal>
      </ThemeProvider>
    </div>
  );
}