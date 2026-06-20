import { Search, X } from 'lucide-react';

function SearchBox({ value, onChange, onClear }) {
  return (
    <div className="search-wrapper">
      <Search size={17} color="var(--muted)" style={{ flexShrink: 0 }} />
      <input
        type="text"
        placeholder="Buscar por expediente, nombre o cédula..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button onClick={onClear} className="btn-ghost" style={{ padding: '2px 6px' }} title="Limpiar búsqueda">
          <X size={15} />
        </button>
      )}
    </div>
  );
}

export default SearchBox;
