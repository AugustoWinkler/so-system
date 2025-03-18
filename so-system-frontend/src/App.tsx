import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Clientes from "./components/Clientes";
import ClienteDetalhes from "./components/ClienteDetalhes";
import MotorcycleDetails from "./components/MotorcycleDetails";
import CreateOrder from "./components/CreateOrder";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/cliente/:id" element={<ClienteDetalhes />} />
        <Route path="/motorcycle/:motorcycleId" element={<MotorcycleDetails />} />
        <Route path="/create-order/:motorcycleId" element={<CreateOrder />} />
      </Routes>
    </Router>
  );
};

export default App;