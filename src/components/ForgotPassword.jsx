import { useState } from "react";
import { recoverPassword } from "../services/api.jsx";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [correo, setCorreo] = useState("");
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await recoverPassword({ correo });
            setMsg(res?.data?.message || "Se envió el enlace de recuperación.");
            setErr("");
        } catch (e) {
            setErr("No fue posible enviar el correo. Intenta más tarde.");
            setMsg("");
        }
    };

    return (
        <div style={{ paddingTop: 40 }}>
            <div className="center-card">
                <img className="brand" src="/assets/logo.png" alt="logo" onError={(e) => e.target.style.display = 'none'} />
                <div className="h1">Recuperar Contraseña</div>
                <div className="h2">Ingresa tu correo </div>

                {msg && <div className="alert-success">{msg}</div>}
                {err && <div className="alert-error">{err}</div>}

                <form onSubmit={handleSubmit}>
                    <input value={correo} onChange={(e) => setCorreo(e.target.value)} className="input" placeholder="correo@molino.com" required />
                    <button className="btn" type="submit">Enviar enlace</button>
                </form>

                <a className="small-link" onClick={() => navigate(-1)}>← Volver</a>
            </div>
        </div>
    );
}
