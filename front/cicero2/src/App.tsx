import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import Clients from './Pages/Clients';
import Folders from './Pages/Folders';
import ClientsInfo from './Pages/ClientsInfo';
import { Create } from '@mui/icons-material';
import SpeFolder from './Pages/SpeFolder';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/clients" element={<Clients />}/>  
          <Route path="/dossiers" element={<Folders />}/>
          <Route path="/create" element={<Create />}/> 
          <Route path="/clientsInfo/:id" element={<ClientsInfo />}/> 
          <Route path="/dossierinfo/:id" element={<SpeFolder />}/>
      </Routes>
    </Router>
  );
}

export default App;
