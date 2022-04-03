import React, { useState, useRef, createRef, RefObject } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Case } from "../Modele/metier/Case";
import { Event } from "../Modele/metier/Event";
import { Label } from "@mui/icons-material";
import { textAlign, width } from "@mui/system";
import './main.css'

function Form() {

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

    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3}} >

            <Grid container spacing={2} sx={StyleBoxContainer}>

              <Box sx={StyleTitle} >
                Création de Dossier
              </Box>

                <Grid item xs={12} sm={6}>

                  {/* <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      placeholder="Code"
                      name="Code"
                      onChange={handleChange}
                      autoFocus
                      
                  /> */}
                </Grid>

                <Grid sx={windowSize >= 650 ? StyleBoxRow : StyleBoxColumn}>

                  <Grid item xs={12} sm={6} sx={ windowSize >= 650 ? {marginRight:'10%'} : {}} >
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          type="text"                                                                                                                                                                                                
                          name="Description"
                          multiline
                          fullWidth
                          placeholder="Description"
                          onChange={handleChange}  
                          
                      />
                    </Grid>
                      <Grid item xs={6} sm={3} sx={{display:'flex', flexDirection:'row', minWidth:'230px'}}>
                        <div className="labelDate">Date de création</div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="date"
                            name="DateStart"
                            placeholder="DateStart"
                            onChange={handleChange}
                        />
                    
                  </Grid>

                </Grid>

                  <Grid>
                    { Clients.map((client:any)=> {
                        return <div>{client?.nom} {client?.prenom}</div>
                    })}
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{marginBottom:'5%'}}>

                    <FormControl fullWidth>
                      <InputLabel id="clientInput">Client</InputLabel>
                      <Select
                        labelId="client"
                        id="client"
                        name="client"
                        value={Client}
                        ref={refSelect}
                        label="Client"
                        sx={{marginBottom:'10px'}}
                        onChange={handleChangeClient}
                      >
                        
                        { clients.map((client)=> {
                          
                          // Client restant :
                          //if (!Clients.includes(client) ) {
                            return <MenuItem value={client?.nom + client?.prenom}> {client?.nom} {client?.prenom}</MenuItem>
                          //}
                          
                              
                          })}
                        
                      </Select>
                      <Button 
                      type="submit"
                      
                      onClick={addClient}
                      fullWidth
                      >
                        Ajouter Client
                      </Button>
                    </FormControl>
                  
                  </Grid>

                    <FormControl sx={{width:'100%', marginBottom: '30px'}}>

                      <Grid sx={windowSize >=650 ? StyleBoxRow : StyleBoxColumn}>
                        
                         
                        <Grid item xs={12} sm={6} sx={windowSize >= 650 ? {marginRight:'10%'} : {}} >
                          <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="Text"
                                name="description"
                                placeholder="Description"
                                onChange={handleChangeEvent}
                                sx={{width:'100%'}}
                            />
                        </Grid>
                       
                        <Grid item xs={6} sm={4} sx={{display:'flex', flexDirection:'row', minWidth:'205px',marginRight:'7%'}}>
                          <div className="labelDate">Date de création</div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="date"
                                name="Date"
                                placeholder="Date"
                                onChange={handleChangeEvent}
                            />
                      
                        </Grid>
                      

                        <Grid item xs={6} sm={2} >
                          <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="number"
                                name="Duree"
                                placeholder="Duree"
                                onChange={handleChangeEvent}
                            />
                        </Grid>

                      </Grid >
                      <Button 
                        type="submit"
                        
                        onClick={addEvent}
                        
                        >
                          Ajouter un Evenement
                        </Button>
                        
                    </FormControl>


            
      
              <Button fullWidth variant="contained" type="submit" sx={{width:'50%', height:'15%', alignSelf:'center',fontSize: 'h6.fontSize', }}> Créer un dossier</Button>
          
        </Grid>
    </Box>
  );
}

export default Form;