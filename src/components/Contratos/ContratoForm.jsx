import { useState, useEffect } from "react";
import { createContrato, getContrato, updateContrato } from "../../services/api.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function ContratoForm() {
    const [contrato, setContrato] = useState({
        fecha_inicio: "",
        fecha_fin: "",
        valor_contrato: "",
        empleado: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getContrato(id).then((res) => setContrato(res.data || {})).catch(() => navigate('/contratos'));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let newVal = value;
        if (type === 'number') {
            const num = Number(value);
            if (Number.isNaN(num)) newVal = '';
            else newVal = String(Math.max(0, num));
        }
        setContrato({ ...contrato, [name]: newVal });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateContrato(id, contrato);
        } else {
            await createContrato(contrato);
        }
        navigate("/contratos");
    };

    return (
        <div className="form-container">
            <h2>Registrar Contrato</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Fecha de Inicio</label>
                    <input type="date" name="fecha_inicio" value={contrato.fecha_inicio} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Fecha de Fin</label>
                    <input type="date" name="fecha_fin" value={contrato.fecha_fin} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Valor del Contrato</label>
                    <input type="number" min="0" name="valor_contrato" value={contrato.valor_contrato} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Empleado</label>
                    <input name="empleado" value={contrato.empleado} onChange={handleChange} required />
                </div>

                <div className="form-actions">
                    <button type="submit">Guardar Contrato</button>
                </div>
            </form>
        </div>
    );
}
