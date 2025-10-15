import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api.jsx";
import "../styles.css";

export default function Login() {
    const [form, setForm] = useState({ correo: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(form);
            if (res?.data?.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } else {
                // si tu backend no envía token, permitimos el flujo para dev:
                navigate("/dashboard");
            }
        } catch (err) {
            setError("Credenciales inválidas o error con el servidor");
        }
    };

    return (
        <div style={{ paddingTop: 40 }}>
            <div className="center-card">
                <img className="brand" src="/assets/logo.png" alt="logo" onError={(e) => e.target.style.display = 'none'} />
                <div className="h1">Sistema de Recursos Humanos</div>
                <div className="h2">Molino de Arroz - Talento Humano</div>

                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input name="correo" className="input" placeholder="Correo " value={form.correo} onChange={handleChange} required />
                    <input name="password" type="password" className="input" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
                    <button className="btn" type="submit">Ingresar</button>
                </form>

                <Link className="small-link" to="/recuperar">¿Olvidaste tu contraseña?</Link>
            </div>
        </div>
    );
}
