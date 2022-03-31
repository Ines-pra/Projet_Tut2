import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Clients from "./Pages/Clients";
import Folders from "./Pages/Cases";

function App() {
  console.log(process.env.REACT_APP_ENV);
  console.log(process.env.APP_ENV);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/clients" element={<Clients />}></Route>
        <Route path="/dossiers" element={<Folders />}></Route>
      </Routes>
    </Router>
  );  
}

export default App;
