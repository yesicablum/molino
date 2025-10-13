import { Link } from "react-router-dom";
import "../styles.css";
import "../styles/dashboard.css";




export default function Dashboard() {
    const logout = () => { localStorage.removeItem("token"); window.location.href = "/"; };

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <img src="/assets/logo.png" className="brand-large" alt="logo" onError={(e) => e.target.style.display = 'none'} />
                <h3>Molino de Arroz</h3>
                <p>Panel Talento Humano</p>

                <nav style={{ marginTop: 14 }}>
                    <Link className="nav-link" to="/empleados">Empleados</Link>
                    <Link className="nav-link" to="/contratos">Contratos</Link>
                </nav>

                <div style={{ marginTop: 18 }}>
                    <button className="btn" style={{ width: '100%' }} onClick={logout}>Cerrar sesión</button>
                </div>
            </aside>

            <main className="main">
                <h2 style={{ marginTop: 0 }}>Bienvenida/o a SIRH</h2>
                <p style={{ color: 'var(--muted)' }}>Elige un módulo para comenzar.</p>

                <div className="card-grid" style={{ marginTop: 20 }}>
                    <div className="card">
                        <div style={{ fontSize: 28 }}>👨‍🌾</div>
                        <h4>Gestión de Empleados</h4>
                        <p>Agregar, editar y exportar datos del personal.</p>
                        <Link to="/empleados" className="small-btn" style={{ marginTop: 12 }}>Ir a Empleados</Link>
                    </div>

                    <div className="card">
                        <div style={{ fontSize: 28 }}>📄</div>
                        <h4>Gestión de Contratos</h4>
                        <p>Control de contratos y exportaciones.</p>
                        <Link to="/contratos" className="small-btn" style={{ marginTop: 12 }}>Ir a Contratos</Link>
                    </div>
                </div>

                <div className="footer-small">Molino de Arroz • SIRH</div>
            </main>
        </div>
    );
}
