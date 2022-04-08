import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Create } from '@mui/icons-material';
import Home from './Pages/Home';
import Clients from './Pages/Clients';
import Cases from './Pages/Cases';
import ClientsInfo from './Pages/ClientsInfo';
import CasesInfo from './Pages/CasesInfo';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/clients" element={<Clients />}/>  
          <Route path="/dossiers" element={<Cases />}/>
          <Route path="/create" element={<Create />}/> 
          <Route path="/clientinfo/:id" element={<ClientsInfo />}/> 
          <Route path="/dossierinfo/:id" element={<CasesInfo />}/>
      </Routes>
    </Router>
  );
}

export default App;
