import { useState } from "react";
import { TextField, InputLabel } from "@mui/material";
import { Event } from "../../Modele/metier/Event";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '50%',
  borderRadius: 3,
  bgcolor: "#fff",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
};

export default function EventModal(openEdit: any) {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(''); 
    const [duree, setDuree] = useState(''); 

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
      <Modal
        open={openEdit.open}
        onClose={openEdit.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'black'}}>
                Ajouter un évènement
            </Typography>

            <InputLabel id="modal-modal-titleCard">Description :</InputLabel>
            <TextField
                id="filled-basic"
                label="Description"
                variant="filled"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
            /> 
            <InputLabel id="modal-modal-titleCard">Date :</InputLabel>
            <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue={date}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
                fullWidth
                onChange={(e) => setDate(e.target.value)}
            />
            <InputLabel id="modal-modal-titleCard">Durée :</InputLabel>
            <TextField
                id="filled-basic"
                label="Duration"
                type="number"
                variant="filled"
                value={duree}
                onChange={(e) => setDuree(e.target.value)}
                fullWidth
            />

           <Button variant="outlined" color="success" onClick= {() => setEvent(description, new Date(date), duree)}>
            Valider
          </Button> 

          <Button variant="outlined" color="error"  onClick= {() => openEdit.handleClose()}>
            Annuler
          </Button>
        </Box>
      </Modal>
    </div>
  );
}