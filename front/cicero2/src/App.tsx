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
import Modify from './Pages/Modify';
import ClientsInfo from './Pages/ClientsInfo';
import { Create } from '@mui/icons-material';
import SpeFolder from './Pages/SpeFolder';
import Cases from './Pages/Cases';

function App() {
  console.log(process.env.REACT_APP_ENV);
  console.log(process.env.APP_ENV);
  
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/clients" element={<Clients />}>
          </Route>  
          <Route path="/dossiers" element={<Folders />}>
          </Route>
          {/* <Route path="/modify" element={<Modify />}> */}
          {/* </Route> */}
          <Route path="/create" element={<Create />}>
          </Route> 
          <Route path="/dossier" element={<SpeFolder />}>
          </Route> 
          <Route path="/clientsInfo/:id" element={<ClientsInfo />}>
          </Route> 
      </Routes>
    </Router>
  );
}

export default App;
