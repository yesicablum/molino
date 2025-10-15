import { useState } from "react";
import { recoverPassword } from "../services/api.jsx";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [correo, setCorreo] = useState("");
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        setErr("");
        setLoading(true);
        try {
            const res = await recoverPassword({ correo });

            // Si la API retorna un campo message lo mostramos; si no, mostramos un mensaje neutral
            const data = res?.data;
            if (data && (data.message || (data.body && data.body.message))) {
                const message = data.message || data.body.message;
                setMsg(message);
            } else {
                // Mensaje neutral: si el backend procesa en background no podemos garantizar entrega
                setMsg("Si el correo existe en nuestro sistema, recibirás un mensaje con las instrucciones. Revisa spam o la carpeta de correo no deseado.");
            }
            setErr("");
        } catch (error) {
            // intentar extraer mensaje del body de error del proxy/backend
            const apiMessage = error?.response?.data?.body?.message || error?.response?.data?.message || error?.message;
            console.error('recoverPassword error', error);
            setErr(apiMessage || "No fue posible enviar el correo. Intenta más tarde.");
            setMsg("");
        } finally {
            setLoading(false);
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
