import { Download, PlusCircle } from 'lucide-react';
import SearchBox from './SearchBox';
import ComplaintTable from './ComplaintTable';

function AdminPage({ complaints, searchQuery, onSearchChange, onClearSearch, onReport, onAdd, onEdit, onDelete, onToggleStatus }) {
  return (
    <main className="container animate-fade">
      <div className="premium-card">
        <div className="premium-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2>Panel de Control</h2>
            <p style={{ fontSize: '0.78rem', opacity: 0.7, marginTop: '2px', fontWeight: 400 }}>
              {complaints.length} registro{complaints.length !== 1 ? 's' : ''} encontrado{complaints.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={onReport} className="btn btn-accent" style={{ padding: '9px 18px' }}>
              <Download size={15} /> Reporte
            </button>
            <button onClick={onAdd} className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '9px 18px' }}>
              <PlusCircle size={15} /> Nuevo Registro
            </button>
          </div>
        </div>

        <div className="premium-card-body">
          <SearchBox value={searchQuery} onChange={onSearchChange} onClear={onClearSearch} />
          <ComplaintTable
            complaints={complaints}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </div>
      </div>
    </main>
  );
}

export default AdminPage;
