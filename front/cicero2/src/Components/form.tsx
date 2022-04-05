import React, { useState, useRef, createRef, RefObject,useEffect } from "react";
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { Case } from "../Modele/metier/Case";
import { Event } from "../Modele/metier/Event";
import { Label } from "@mui/icons-material";
import { textAlign, width } from "@mui/system";
import './main.css';
import CloseIcon from '@mui/icons-material/Close';
import { Client } from "../Modele/metier/Client";
import moment from 'moment'

function Form({openModal,handleClose,id}:{openModal:any,handleClose:any,id:number}) {

    const daoF = DAOFactory.getDAOFactory();
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);
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

    const [modifStartedDate, setmodifStartedDate] = React.useState(false);
    const [modifEndedDate, setmodifEndedDate] = React.useState(false);

    const [ClientsList, setClientsList] = React.useState({});

   React.useEffect(() => {
    function handleResize() {
        setWindowSize(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [] = useState('');


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

          console.log(ClientsList)
          console.log(CaseInfo)

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


          console.log(CaseInfo.Clients);

          return response;
          }

          else{
            setCaseInfo({
              id: (new Date()).getTime(), 
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
        
      }, []);

      
      const [formElement, setFormElement] = React.useState(
        
        id != 0 ? 
        
              {
              id: (new Date()).getTime(), 
              Code:'',
              Description:'',
              Cloturee:false,
              Clients:[],
              DateStart: new Date(),
              DateEnd: new Date(),
              Events:[],
              statut:'En cours'
            }
            :
            {
              id: id, 
              Code: '',
              Description:'',
              Cloturee:false,
              Clients:[],
              DateStart: new Date(),
              DateEnd: new Date(),
              Events:[],
              statut:'En cours'
            }
        
      );
      

    // const [Client, setClient] = React.useState(clients[0].nom + clients[0].prenom);
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
        
        daoF!.getCaseDAO().create(new Case(Date.now(), CaseInfo.Code, CaseInfo.Description, CaseInfo.DateStart, CaseInfo.statut, CaseInfo.DateEnd, Clients, Events));
        //Associer à client
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

      const [open, setOpen] = React.useState(openModal);
     
      const style = {
        position: 'absolute' as 'absolute',
        left:'50%',
        top:'45%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'white',
        border: '2px solid black',
        boxShadow: 24,
        p: 4,
        mt: 3
      };
      console.log(CaseInfo.statut)

  return (      

    id != 0 ?  (
    
    <Modal
      open={openModal}
      onClose={handleClose}>
  
        
  
        <Box component="form" noValidate onSubmit={handleSubmit} sx={style} >
       
          <Button sx={{alignSelf:'flex-end',color:'black'}}  onClick={()=>setOpen(false)}>
            <CloseIcon />
          </Button>
        
          <Grid container spacing={2} sx={StyleBoxContainer}>
  
            
            <Box sx={StyleTitle} >
              Modification du dossier {id}
            </Box>
  
              <Grid item xs={12} sm={6}>
  
  
              </Grid>
  
              <Grid sx={(windowSize >= 650 && CaseInfo.statut === false) ? StyleBoxRow : StyleBoxColumn}>
  
                <Grid item  sm={12} sx={ windowSize >= 650 ? {marginRight:'10%'} : {}} >
                
                  
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
                  </Grid>
                    <Grid item xs={6} sm={3} sx={windowSize <= 650 ? {display:'flex',flexDirection:'column',justifyContent:'space-between',minWidth:'400px',}: {display:'flex', flexDirection:'row', minWidth:'260px', justifyContent:'space-between'}}>
                      <Grid sx={{marginRight:'5%'}}>
                        <div className="labelDate">Date de création</div>

                          
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

                      </Grid>
                      <Grid sx={{alignSelf:'center'}}>
                          { CaseInfo.statut === false ?

                          (
                            <Grid sx={{marginLeft:'3%', alignSelf:'center'}}>


                              <Button onClick={()=> setCaseInfo({...CaseInfo,statut:true})}>Dossier clôturée?</Button>
                            </Grid>
                          ):
                          (
                            <Grid>

                               <div className="labelDate">Date de fin</div>

                      
                                <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  type="date"
                                  name="DateEnd"
                                  placeholder="DateEnd"
                                  onChange={handleChange}
                                  value={moment(CaseInfo.DateEnd).format('YYYY-MM-DD')}
                                />
                                <Button onClick={()=> setCaseInfo({...CaseInfo,statut:false})}>Ne pas clôturer</Button>
                            </Grid>
                          )
                          }
                        </Grid>
                      
                  
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
                    <Button 
                    type="submit"
                    
                    onClick={addClient}
                    fullWidth
                    >
                      Ajouter Client
                    </Button>
                  </FormControl>
                 
                </Grid>
  
                  
  
          
    
            <Button fullWidth variant="contained" type="submit" sx={{width:'50%', height:'15%', alignSelf:'center',fontSize: 'h6.fontSize', }}> Créer un dossier</Button>
        
        </Grid>
      
        </Box>
      </Modal>
      ) : (
          
        <Modal
      open={openModal}
      onClose={handleClose}>
  
        
  
        <Box component="form" noValidate onSubmit={handleSubmit} sx={style} >
       
          <Button sx={{alignSelf:'flex-end',color:'black'}}  onClick={()=>setOpen(false)}>
            <CloseIcon />
          </Button>
        
          <Grid container spacing={2} sx={StyleBoxContainer}>
  
            
            <Box sx={StyleTitle} >
              Création de Dossier
            </Box>
  
              <Grid item xs={12} sm={6}>
  
  
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
                      
                      
                      { Clients.map((client:any)=> {
                        
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
  
                  
  
          
    
            {/* <Button fullWidth variant="contained" type="submit" sx={{width:'50%', height:'15%', alignSelf:'center',fontSize: 'h6.fontSize', }}> Créer un dossier</Button> */}
        
        </Grid>
      
        </Box>
      </Modal>
        ) 
    
  );
}

export default Form;