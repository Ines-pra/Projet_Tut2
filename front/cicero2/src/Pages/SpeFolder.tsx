/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from "react";
import { Button, Grid} from "@mui/material";
import { Case } from "../Modele/metier/Case";
import { Event } from "../Modele/metier/Event";
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import { Client } from '../Modele/metier/Client';
import { ListItem, ListItemText } from '@mui/material';
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

const StyleContainer = {
  marginTop: "12px",
  backgroundColor: "#c6e5b3",
  borderRadius: "5px",
  padding: "15px",
  color: "#000000",
};
const styleAll = {
  height: "100%",
  width: "auto",
}
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
    <Grid container style={styleAll}>
        <Header/>
      <Grid container style={{ height: '90%'}}>
        <Grid item xs={12} md={2} direction="column">
          <SideBar />
        </Grid>
        <Grid item xs md style={{ margin: "20px"}}>
          <Grid container xs={12} md={12} direction="row" alignItems="center">
            <Grid item xs={12} md={12} style={{ color: "#000000", fontSize: "16" }}>
              <span><NavLink to={'/dossiers'} className='link'>Dossier</NavLink> {' > ' + caseInfo.code}</span>
            </Grid>
            <Grid container xs={12} md={12} direction="row" style={StyleContainer} className="shadow" alignItems="center">
              <Grid item xs={4} md={1} sx={{ height: '100%' }}>
                <FolderOpenIcon fontSize='large' sx={{fontSize: 85}}/>
              </Grid>
              <Grid item xs={8} md={8} sx={{fontSize: 14, height: '100%'}}>
                <Grid item xs={12} md={12}>
                  <p><b>{caseInfo.code}</b>{ caseInfo.status ? <span> <Brightness1Icon style={{ color: "red", fontSize: "13px"}}/> Clôturée </span> : <span> <Brightness1Icon style={{ color: "green", fontSize: "13px"}}/> En cours </span>}</p>   
                </Grid>   
                <Grid item xs={12} md={12} sx={{fontStyle: 'italic',fontSize: 11,}}>
                  Affaire ouverte le {moment(caseInfo.startedAt).format('YYYY/MM/DD')}   
                </Grid>                       
              </Grid>
            <Grid item xs={12} md={3}>
              <Button variant="contained" color="primary" sx={{height:'45px', marginLeft:'3%', fontSize:'13px', marginBottom:'10px'}} fullWidth>Modifier dossier</Button>
              <Button variant="contained" color="error" sx={{height:'45px', marginLeft:'3%', fontSize:'13px', marginBottom:'10px'}} fullWidth onClick={() => deleteCase(caseId)}>Supprimer</Button>
            </Grid>
            </Grid>
            <Grid item xs={12} md={12} style={StyleContainer} className="shadow">
              <h3>Description</h3>
              <p>{caseInfo.description}</p>
            </Grid>
            <Grid item xs={12} md={12} style={StyleContainer} className="shadow">
              <h3>Clients concernés</h3>
                <ListItem sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                  {caseInfo.clients.map((client : Client)=> {
                    return <ListItemText  key={client?.firstname + client?.lastname}> {client?.firstname} {client?.lastname}</ListItemText >
                  })}
                </ListItem>
            </Grid>
            <Grid item xs={12} md={12} style={StyleContainer} className="shadow">
              <h2>Evènements</h2>
                <ListItem sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                  {caseInfo.events.map((event: Event)=> {
                    total += event?.duration;
                    return <ListItemText key={event?.id} sx={{display:'flex'}}><RadioButtonCheckedIcon sx={{fontSize: 12,}} /> {moment(event?.createdDate).format('YYYY/MM/DD') + " (" + event?.duration + ") " + event?.description} </ListItemText >
                  })}
                </ListItem>
                <Grid item xs={12} md={2}>
                  <Button variant="contained" color="success" sx={{width:'100%', fontSize: '10px', paddingTop:'10px'}} onClick={()=> setOpen(true)}>Ajouter un évènement</Button> 
                </Grid>
                <Grid item xs={12} md={12}>
                  <p><b>Total: {total}h</b></p>  
                </Grid>
                <ModalEvent open={open} handleClose={handleClose} eventFunction={createEvent} caseId={caseId}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
} 
