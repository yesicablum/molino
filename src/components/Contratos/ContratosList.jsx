// src/components/Contratos/ContratosList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.jsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ContratosList() {
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    api.get("/contratos").then((res) => setContratos(res.data));
  }, []);

  const eliminarContrato = async (id) => {
    if (confirm("¿Deseas eliminar este contrato?")) {
      await api.delete(`/contratos/${id}`);
      setContratos(contratos.filter((c) => c._id !== id));
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Contratos - Molino de Arroz", 14, 10);
    doc.autoTable({
      head: [["Empleado", "Fecha Inicio", "Fecha Fin", "Valor"]],
      body: contratos.map((c) => [
        c.empleado,
        c.fecha_inicio,
        c.fecha_fin,
        `$${c.valor_contrato}`,
      ]),
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
    <div className="dashboard">
      <h2>Gestión de Contratos</h2>

      <div className="toolbar">
        <Link to="/contratos/nuevo">➕ Nuevo Contrato</Link>
        <button onClick={exportarPDF}>📄 Exportar PDF</button>
        <button onClick={exportarXLSX}>📊 Exportar XLSX</button>
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
              <td>{c.empleado}</td>
              <td>{c.fecha_inicio}</td>
              <td>{c.fecha_fin}</td>
              <td>${c.valor_contrato}</td>
              <td>
                <Link to={`/contratos/editar/${c._id}`}>✏️</Link>
                <button onClick={() => eliminarContrato(c._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
