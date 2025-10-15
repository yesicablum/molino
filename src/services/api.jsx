// src/services/api.jsx
import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-molino.onrender.com", // ⚙️ cambia si tu backend usa otro puerto o ruta
});

// ====================== EMPLEADOS ======================
export const getEmpleados = () => API.get("/empleados");
export const getEmpleado = (id) => API.get(`/empleados/${id}`);
export const createEmpleado = (data) => API.post("/empleados", data);
export const updateEmpleado = (id, data) => API.put(`/empleados/${id}`, data);
export const deleteEmpleado = (id) => API.delete(`/empleados/${id}`);

// ====================== CONTRATOS ======================
export const getContratos = () => API.get("/contratos");
export const getContrato = (id) => API.get(`/contratos/${id}`);
export const createContrato = (data) => API.post("/contratos", data);
export const updateContrato = (id, data) => API.put(`/contratos/${id}`, data);
export const deleteContrato = (id) => API.delete(`/contratos/${id}`);

// ====================== LOGIN ======================
export const loginUser = (data) => API.post("/login", data);
// Use the serverless proxy on the same origin to avoid CORS issues in production
export const recoverPassword = (data) => {
  // prefer local API route if available (deployed on Vercel)
  const useProxy = true;
  if (useProxy) {
    return axios.post('/api/recuperar', data);
  }
  return API.post("/recuperar", data);
};
