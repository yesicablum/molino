import { useState, useEffect } from "react";
import { createEmpleado, getEmpleado, updateEmpleado } from "../../services/api.jsx";
import { useNavigate, useParams } from "react-router-dom";

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
            // modo edición: cargar datos
            getEmpleado(id).then((res) => {
                setEmpleado(res.data || {});
            }).catch(() => {
                // si falla, redirigir a lista
                navigate('/empleados');
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let newVal = value;
        // prevenir negativos en inputs numéricos
        if (type === 'number') {
            const num = Number(value);
            if (Number.isNaN(num)) newVal = '';
            else newVal = String(Math.max(0, num));
        }
        setEmpleado({ ...empleado, [name]: newVal });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateEmpleado(id, empleado);
        } else {
            await createEmpleado(empleado);
        }
        navigate("/empleados");
    };

    return (
        <div className="form-container">
            <h2>Registrar Empleado</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Número de Documento</label>
                    <input name="NRO_DOCUMENTO" value={empleado.NRO_DOCUMENTO} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Nombre</label>
                    <input name="NOMBRE" value={empleado.NOMBRE} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Apellido</label>
                    <input name="APELLIDO" value={empleado.APELLIDO} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Edad</label>
                    <input type="number" name="EDAD" min="0" value={empleado.EDAD} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Género</label>
                    <select name="GENERO" value={empleado.GENERO} onChange={handleChange}>
                        <option value="">Seleccionar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Cargo</label>
                    <input name="CARGO" value={empleado.CARGO} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Correo</label>
                    <input type="email" name="CORREO" value={empleado.CORREO} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Número de Contacto</label>
                    <input name="NRO_CONTACTO" value={empleado.NRO_CONTACTO} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Estado</label>
                    <select name="ESTADO" value={empleado.ESTADO} onChange={handleChange}>
                        <option value="Activo">Activo</option>
                        <option value="Retirado">Retirado</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Observaciones</label>
                    <textarea name="OBSERVACIONES" rows="3" value={empleado.OBSERVACIONES} onChange={handleChange}></textarea>
                </div>

                <div className="form-actions">
                    <button type="submit">Guardar Empleado</button>
                </div>
            </form>
        </div>
    );
}
