import { Search, X } from 'lucide-react';

function SearchBox({ value, onChange, onClear }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', background: '#fafbfc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
      <Search size={18} color="var(--muted)" />
      <input
        type="text"
        placeholder="Buscar por nro de expediente, nombre de solicitante o cédula..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{ flex: 1, border: 'none', background: 'transparent', padding: '4px', fontSize: '0.95rem' }}
      />
      {value && (
        <button onClick={onClear} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBox;
