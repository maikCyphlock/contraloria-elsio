import { Home, PlusCircle, Users } from 'lucide-react';

function Header({ currentView, editingComplaint, onGoHome, onGoRegister, onGoAdmin }) {
  return (
    <header className="header-banner">
      <div className="logo-container">
        <div className="logo-badge">CMP</div>
        <div className="logo-text">
          <h1>Contraloría del Municipio Páez</h1>
          <p>Oficina de Atención al Ciudadano (OAC)</p>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onGoHome}
          className={`btn nav-link ${currentView === 'home' ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <Home size={16} /> Inicio
        </button>

        <button
          onClick={onGoRegister}
          className={`btn nav-link ${currentView === 'register' && !editingComplaint ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <PlusCircle size={16} /> Nueva Denuncia
        </button>

        <button
          onClick={onGoAdmin}
          className={`btn nav-link ${currentView === 'admin' ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <Users size={16} /> Panel Admin
        </button>
      </nav>
    </header>
  );
}

export default Header;
