// src/components/Empleados/EmpleadoForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api.jsx";

export default function EmpleadoForm() {
  const [empleado, setEmpleado] = useState({
    NRO_DOCUMENTO: "",
    NOMBRE: "",
    APELLIDO: "",
    EDAD: "",
    GENERO: "",
    CARGO: "",
    CORREO: "",
    NRO_CONTACTO: "",
    ESTADO: "Activo",
    OBSERVACIONES: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/empleados/${id}`).then((res) => setEmpleado(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.put(`/empleados/${id}`, empleado);
    } else {
      await api.post("/empleados", empleado);
    }
    navigate("/empleados");
  };

  return (
    <div className="form-container">
      <h2>{id ? "Editar Empleado" : "Nuevo Empleado"}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(empleado).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={empleado[key]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
