import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContratos, deleteContrato } from "../../services/api.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../../styles/contratos.css";


export default function ContratosList() {
    const [contratos, setContratos] = useState([]);

    useEffect(() => {
        getContratos().then((res) => setContratos(res.data));
    }, []);

    const eliminarContrato = async (idOrObj) => {
        // aceptar tanto id string como el objeto completo por seguridad
        const id = typeof idOrObj === "string" ? idOrObj : idOrObj?._id ?? idOrObj?.id;
        if (!id) {
            alert("No se pudo determinar el id del contrato a eliminar.");
            return;
        }

        if (confirm("¿Deseas eliminar este contrato?")) {
            await deleteContrato(id);
            setContratos((prev) => prev.filter((c) => (c._id ?? c.id) !== id));
        }
    };

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.text("Listado de Contratos - Molino de Arroz", 14, 10);
        // usar la API autoTable registrada
        autoTable(doc, {
            head: [["Empleado", "Fecha Inicio", "Fecha Fin", "Valor"]],
            body: contratos.map((c) => [
                c.empleado,
                c.fecha_inicio,
                c.fecha_fin,
                `$${c.valor_contrato}`,
            ]),
            startY: 18,
        });
        doc.save("contratos_molino.pdf");
    };

    const exportarXLSX = () => {
        const ws = XLSX.utils.json_to_sheet(contratos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Contratos");
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), "contratos_molino.xlsx");
    };

    return (
        <div className="contratos-page">
            <h2>Gestión de Contratos</h2>

            <div className="toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Link to="/dashboard" className="small-btn">← Volver</Link>
                    <Link to="/contratos/nuevo">➕ Nuevo Contrato</Link>
                </div>
                <div className="export-buttons">
                    <button className="btn-pdf" onClick={exportarPDF} aria-label="Exportar PDF">📄 Exportar PDF</button>
                    <button className="btn-xlsx" onClick={exportarXLSX} aria-label="Exportar XLSX">📊 Exportar XLSX</button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Empleado</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Valor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {contratos.map((c) => (
                        <tr key={c._id}>
                            <td>{c._id}{c.empleado}</td>
                            <td>{c.fecha_inicio}</td>
                            <td>{c.fecha_fin}</td>
                            <td>${c.valor_contrato}</td>
                            <td>
                                <Link to={`/contratos/editar/${c._id ?? c.id}`} state={{ contrato: c }}>✏️</Link>
                                <button onClick={() => eliminarContrato(c)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
