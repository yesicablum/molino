// src/components/Contratos/ContraroForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api.jsx";

export default function ContratoForm() {
  const [contrato, setContrato] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    valor_contrato: "",
    empleado: "",
  });
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api.get("/empleados").then((res) => setEmpleados(res.data));
    if (id) {
      api.get(`/contratos/${id}`).then((res) => setContrato(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setContrato({ ...contrato, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.put(`/contratos/${id}`, contrato);
    } else {
      await api.post("/contratos", contrato);
    }
    navigate("/contratos");
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Contrato" : "Nuevo Contrato"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Fecha Inicio:</label>
        <input
          type="date"
          name="fecha_inicio"
          value={contrato.fecha_inicio}
          onChange={handleChange}
        />

        <label>Fecha Fin:</label>
        <input
          type="date"
          name="fecha_fin"
          value={contrato.fecha_fin}
          onChange={handleChange}
        />

        <label>Valor del Contrato:</label>
        <input
          type="number"
          name="valor_contrato"
          value={contrato.valor_contrato}
          onChange={handleChange}
        />

        <label>Empleado:</label>
        <select name="empleado" value={contrato.empleado} onChange={handleChange}>
          <option value="">Seleccione un empleado</option>
          {empleados.map((e) => (
            <option key={e._id} value={e.NOMBRE}>
              {e.NOMBRE} {e.APELLIDO}
            </option>
          ))}
        </select>

        <button type="submit">Guardar Contrato</button>
      </form>
    </div>
  );
}
