import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EmpleadosList from "./components/Empleados/EmpleadosList.jsx";
import EmpleadoForm from "./components/Empleados/EmpleadoForm.jsx";
import ContratosList from "./components/Contratos/ContratosList.jsx";
import ContratoForm from "./components/Contratos/ContratoForm.jsx";

// 🔓 Desactivar protección temporal para diseño
function PrivateRoute({ children }) {
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/recuperar" element={<ForgotPassword />} />

      {/* Páginas privadas (ahora libres) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/empleados"
        element={
          <PrivateRoute>
            <EmpleadosList />
          </PrivateRoute>
        }
      />
      <Route
        path="/empleados/nuevo"
        element={
          <PrivateRoute>
            <EmpleadoForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/empleados/editar/:id"
        element={
          <PrivateRoute>
            <EmpleadoForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/contratos"
        element={
          <PrivateRoute>
            <ContratosList />
          </PrivateRoute>
        }
      />
      <Route
        path="/contratos/nuevo"
        element={
          <PrivateRoute>
            <ContratoForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/contratos/editar/:id"
        element={
          <PrivateRoute>
            <ContratoForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}





/*
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EmpleadosList from "./components/Empleados/EmpleadosList.jsx";
import EmpleadoForm from "./components/Empleados/EmpleadoForm.jsx";
import ContratosList from "./components/Contratos/ContratosList.jsx";
import ContratoForm from "./components/Contratos/ContratoForm.jsx";





function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recuperar" element={<ForgotPassword />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/empleados"
        element={
          <PrivateRoute>
            <EmpleadosList />
          </PrivateRoute>
        }
      />
      <Route
        path="/empleados/nuevo"
        element={
          <PrivateRoute>
            <EmpleadoForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/empleados/editar/:id"
        element={
          <PrivateRoute>
            <EmpleadoForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/contratos"
        element={
          <PrivateRoute>
            <ContratosList />
          </PrivateRoute>
        }
      />
      <Route
        path="/contratos/nuevo"
        element={
          <PrivateRoute>
            <ContratoForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/contratos/editar/:id"
        element={
          <PrivateRoute>
            <ContratoForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
*/