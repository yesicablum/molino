// src/components/Empleados/EmpleadosList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.jsx";

export default function EmpleadosList() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    api.get("/empleados").then((res) => setEmpleados(res.data));
  }, []);

  const eliminarEmpleado = async (id) => {
    if (confirm("¿Deseas eliminar este empleado?")) {
      await api.delete(`/empleados/${id}`);
      setEmpleados(empleados.filter((e) => e._id !== id));
    }
  };

  return (
    <div className="dashboard">
      <h2>Lista de Empleados</h2>
      <Link to="/empleados/nuevo">➕ Nuevo Empleado</Link>
      <table>
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((e) => (
            <tr key={e._id}>
              <td>{e.NRO_DOCUMENTO}</td>
              <td>{e.NOMBRE} {e.APELLIDO}</td>
              <td>{e.CARGO}</td>
              <td>{e.ESTADO}</td>
              <td>
                <Link to={`/empleados/editar/${e._id}`}>✏️</Link>
                <button onClick={() => eliminarEmpleado(e._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

