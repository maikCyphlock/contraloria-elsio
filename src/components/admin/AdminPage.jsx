import { Download, PlusCircle } from 'lucide-react';
import SearchBox from './SearchBox';
import ComplaintTable from './ComplaintTable';

function AdminPage({ complaints, searchQuery, onSearchChange, onClearSearch, onReport, onAdd, onEdit, onDelete, onToggleStatus }) {
  return (
    <main className="container animate-fade">
      <div className="premium-card">
        <div className="premium-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2>Panel de Control e Historial de Trámites</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={onReport} className="btn btn-accent">
              <Download size={16} /> Sacar Reporte Completo
            </button>
            <button onClick={onAdd} className="btn btn-primary" style={{ background: 'var(--white)', color: 'var(--navy)' }}>
              <PlusCircle size={16} /> Agregar Registro
            </button>
          </div>
        </div>

        <div className="premium-card-body">
          <SearchBox value={searchQuery} onChange={onSearchChange} onClear={onClearSearch} />
          <ComplaintTable complaints={complaints} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
        </div>
      </div>
    </main>
  );
}

export default AdminPage;
