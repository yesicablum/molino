import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmpleados, deleteEmpleado } from "../../services/api.jsx";

import "../../styles/empleados.css";


export default function EmpleadosList() {
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        getEmpleados().then(res => setEmpleados(res.data)).catch(() => setEmpleados([]));
    }, []);

    const eliminarEmpleado = async (id) => {
        if (!confirm("¿Eliminar empleado?")) return;
        await deleteEmpleado(id);
        setEmpleados(prev => prev.filter(e => e._id !== id));
    };

    return (
        <div className="empleados-page">
            <h2>Empleados</h2>
            <div className="table-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Link to="/empleados/nuevo" className="btn" style={{ width: 'auto', padding: '8px 14px' }}>+ Agregar Empleado</Link>
                    {/* aquí podrías añadir export botones */}
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Nombre</th>
                                <th>Cargo</th>
                                <th>Contacto</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map(e => (
                                <tr key={e._id}>
                                    <td>{e.NRO_DOCUMENTO}</td>
                                    <td>{e.NOMBRE} {e.APELLIDO}</td>
                                    <td>{e.CARGO}</td>
                                    <td>{e.NRO_CONTACTO}</td>
                                    <td>{e.ESTADO}</td>
                                    <td>
                                        <Link to={`/empleados/editar/${e._id}`} className="icon-btn action-edit">✏️</Link>
                                        <button onClick={() => eliminarEmpleado(e._id)} className="icon-btn action-delete">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
