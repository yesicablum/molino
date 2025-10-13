// src/components/ForgotPasswrod.jsx
import { useState } from "react";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="login-container">
      <h2>Recuperar Contraseña</h2>
      {!enviado ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Ingrese su correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <button type="submit">Enviar enlace</button>
        </form>
      ) : (
        <p>Se ha enviado un enlace de recuperación a tu correo.</p>
      )}
    </div>
  );
}
