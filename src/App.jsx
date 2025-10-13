// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EmpleadosList from "./components/Empleados/EmpleadosList.jsx";
import EmpleadoForm from "./components/Empleados/EmpleadoForm.jsx";
import ContratosList from "./components/Contratos/ContratosList.jsx";
import ContratoForm from "./components/Contratos/ContraroForm.jsx";
import ForgotPassword from "./components/ForgotPasswrod.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/empleados" element={<EmpleadosList />} />
      <Route path="/empleados/nuevo" element={<EmpleadoForm />} />
      <Route path="/empleados/editar/:id" element={<EmpleadoForm />} />

      <Route path="/contratos" element={<ContratosList />} />
      <Route path="/contratos/nuevo" element={<ContratoForm />} />
      <Route path="/contratos/editar/:id" element={<ContratoForm />} />
    </Routes>
  );
}

export default App;
