// src/components/Dashboard.jsx
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Sistema de Recursos Humanos - Molino de Arroz</h1>
      <nav>
        <Link to="/empleados">Gestión de Empleados</Link>
        <Link to="/contratos">Gestión de Contratos</Link>
      </nav>
    </div>
  );
}
