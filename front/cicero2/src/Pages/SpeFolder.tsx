/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from "react";
import { Box, Button, Grid} from "@mui/material";
import { Case } from "../Modele/metier/Case";
import { Event } from "../Modele/metier/Event";
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import { Client } from '../Modele/metier/Client';
import { Container, ListItem, ListItemText } from '@mui/material';
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import DAOFactory from "../Modele/dao/factory/DAOFactory";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import moment from 'moment'
import ModalEvent from './Modal/EventModal'
import './main.css';
import '../Styles/alert.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

const StyleBoxContainer = {
  margin : '0 auto',
  display:'flex',
  flexDirection: 'column',
  padding:1,
  width:'90%'
};
const defaultCase: Case = {
  id: 0,
  code: "",
  description: "",
  startedAt: new Date(),
  status: false,
  endedAt: new Date(),
  clients: [],
  events: [],
};

export default function SpeFolder(){
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);
  const [caseInfo, setCaseInfo] = React.useState(defaultCase);
  const [open, setOpen] = React.useState(false);
  const daoF = DAOFactory.getDAOFactory();
  const { id } = useParams<{ id: string }>();
  const handleClose = () => setOpen(false);
  let caseId = parseInt(id!);
  let total = 0;
  let navigate = useNavigate();

  useEffect (() => {
    async function fetchData() { 
      console.log("fetchData");
        const response = await daoF!.getCaseDAO().findById(caseId);
        setCaseInfo(response);
        return response;
        }
        fetchData();
  }, []);

  const createEvent = (event: Event) => {
    let table = caseInfo;
    let newTable = [...table.events, event];
    table.events = newTable;
    setCaseInfo(table);
    daoF!.getEventDAO().create(event);
    daoF!.getCaseDAO().update(table);
    window.location.reload();
  }

  useEffect(() => {
   function handleResize() {
       setWindowSize(window.innerWidth);
     }
     window.addEventListener("resize", handleResize);
   return () => window.removeEventListener("resize", handleResize);
  }, []);

      // Suppression d'un dossier //
  const deleteCase = async (id: number) => {
      confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                  <h1>Etes-vous sur ?</h1>
                  <p>Etes-vous sur de vouloir supprimer ce dossier ?</p>
                  <Button     
                      style={{
                      borderRadius: 5,
                      backgroundColor: "#d9534f",
                      padding: "12px 24px",
                      fontSize: "12px",
                      color: "white",
                      marginRight: "5px",
                      }} 
                      onClick={onClose}>Annuler</Button>
                  <Button
                      style={{
                      borderRadius: 5,
                      backgroundColor: "#0275d8",
                      padding: "12px 24px",
                      fontSize: "12px",
                      color: "white",
                      marginLeft: "5px",
                      }}
                      onClick={() => {
                          daoF!.getCaseDAO().delete(id);
                          navigate("/dossiers");
                          window.location.reload();
                          onClose();
                      }}>Confirmer</Button>
              </div>
            );
          }
      });
  };
  
  return (
    <Grid>
      <Header/>
        <Box sx={{ display: 'flex' }}>
          <SideBar />
            <main className="main">
              <Container maxWidth="lg">
                <Box component="form" sx={{ mt: 3}} >
                  <Box>
                    <span><NavLink to={'/dossiers'} className='link'>Dossier</NavLink> {' > ' + caseInfo.code}</span>
                  </Box>
                    <Grid container spacing={2} sx={StyleBoxContainer}>                      
                        <Grid  sx={ windowSize >= 700 ? { display:'flex', flexDirection:'row', justifyContent:'space-between'} : { display:'flex', flexDirection:'column', justifyContent:'space-between'}} >                      
                          <Grid sx={{display:'flex', flexDirection:'row'}}>
                            <FolderOpenIcon fontSize='large' sx={{marginRight:"3%",fontSize: 75}}/>
                              <Box sx={{display:'flex', flexDirection:'column', alignSelf:'center', width: '100%'}}>
                                <Box sx={windowSize >= 700 ? {display:'flex', flexDirection:'row', width: '350px'} : {display:'flex', flexDirection:'column'}}>
                                  <span className='SpaceFolder'><b>{caseInfo.code}</b></span>                             
                                    { caseInfo.status ? <span><Brightness1Icon style={{ color: "red", fontSize: "13px"}}/> Clôturée</span> : <span><Brightness1Icon style={{ color: "green", fontSize: "13px"}}/> En cours</span>}
                                </Box >
                                <Box sx={{fontStyle: 'italic',fontSize: 10,}}>
                                  Affaire ouverte le {moment(caseInfo.startedAt).format('YYYY/MM/DD')}
                                </Box>
                              </Box> 
                          </Grid>
                          <Grid sx={{display:'flex', flexDirection:'row', alignSelf:'center'}}>
                            <Button variant="contained" color="primary" sx={{height:'45px', marginLeft:'3%', fontSize:'13px'}}>Modifier dossier</Button>
                            <Button variant="contained" color="error" sx={{height:'45px', marginLeft:'3%', fontSize:'13px'}} onClick={() => deleteCase(caseId)}>Supprimer</Button>
                          </Grid>       
                        </Grid>    
                        <Grid>
                          <h2>Description</h2>
                          <Box>
                            <span>{caseInfo.description}</span>
                          </Box>
                        </Grid>
                        <Grid>
                          <h2>Clients concernés</h2>
                            <Box>
                              <ListItem sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                {caseInfo.clients.map((client : Client)=> {
                                  return <ListItemText  key={client?.firstname + client?.lastname}> {client?.firstname} {client?.lastname}</ListItemText >
                                  })}
                              </ListItem>
                            </Box>
                        </Grid>
                        <Grid>
                          <h2>Evènements</h2>
                            <Box>
                              <ListItem sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                {caseInfo.events.map((event: Event)=> {
                                  total += event?.duration;
                                  return <ListItemText key={event?.id} sx={{display:'flex'}}><RadioButtonCheckedIcon sx={{fontSize: 12,}} /> {moment(event?.createdDate).format('YYYY/MM/DD') + " (" + event?.duration + ") " + event?.description} </ListItemText >
                                })}
                              </ListItem>
                            </Box>
                        </Grid>
                        <Button sx={{width:'40%', marginTop:'10px'}} onClick={()=> setOpen(true)}>Ajouter un évènement</Button> 
                        <ModalEvent open={open} handleClose={handleClose} eventFunction={createEvent} caseId={caseId}/>
                        <p>Total: {total}h</p>  
                    </Grid>      
                </Box> 
              </Container>
                
            </main>
        </Box>
    </Grid>
    );
} 
