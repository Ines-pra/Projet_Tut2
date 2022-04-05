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
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/clients" element={<Clients />}>
          </Route>  
          <Route path="/dossiers" element={<Folders />}>
          </Route>
          <Route path="/create" element={<Create />}>
          </Route> 
          <Route path="/clientsInfo/:id" element={<ClientsInfo />}>
          </Route> 
          <Route path="/dossierinfo/:id" element={<SpeFolder />}> 
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
