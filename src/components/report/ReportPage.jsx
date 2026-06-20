import { useState, useMemo } from 'react';
import { Download, Filter, X } from 'lucide-react';

const TIPOS = ['denuncia', 'queja', 'reclamo', 'peticion'];

function ReportPage({ complaints, onClose }) {
  const [filters, setFilters] = useState({ from: '', to: '', tipo: '', estado: '', consulta: '' });

  const setFilter = (key, value) => setFilters(f => ({ ...f, [key]: value }));
  const hasFilters = Object.values(filters).some(v => v !== '');
  const clearFilters = () => setFilters({ from: '', to: '', tipo: '', estado: '', consulta: '' });

  const filtered = useMemo(() => complaints.filter(c => {
    if (filters.from && c.fecha < filters.from) return false;
    if (filters.to && c.fecha > filters.to) return false;
    if (filters.tipo && c.tipo_tramite !== filters.tipo) return false;
    if (filters.estado && c.estado !== filters.estado) return false;
    if (filters.consulta && c.es_consulta !== filters.consulta) return false;
    return true;
  }), [complaints, filters]);

  const stats = useMemo(() => {
    const byTipo = {};
    const byEstado = {};
    filtered.forEach(c => {
      byTipo[c.tipo_tramite] = (byTipo[c.tipo_tramite] || 0) + 1;
      byEstado[c.estado] = (byEstado[c.estado] || 0) + 1;
    });
    return { byTipo, byEstado };
  }, [filtered]);

  const activeFiltersLabel = [
    filters.from && `Desde ${filters.from}`,
    filters.to && `Hasta ${filters.to}`,
    filters.tipo && `Tipo: ${filters.tipo}`,
    filters.estado && `Estado: ${filters.estado}`,
    filters.consulta && `Consulta: ${filters.consulta === 'si' ? 'Sí' : 'No'}`
  ].filter(Boolean).join(' · ');

  return (
    <main className="container animate-fade">

      {/* Filter panel — hidden on print */}
      <div className="premium-card no-print" style={{ marginBottom: '1rem' }}>
        <div className="premium-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <Filter size={15} /> Filtros del Reporte
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.85)', padding: '4px 10px', fontSize: '0.78rem' }}>
              <X size={13} /> Limpiar
            </button>
          )}
        </div>
        <div className="premium-card-body" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            <div className="form-field">
              <label>Desde</label>
              <input type="date" value={filters.from} onChange={e => setFilter('from', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Hasta</label>
              <input type="date" value={filters.to} onChange={e => setFilter('to', e.target.value)} />
            </div>
            <div className="form-field">
              <label>Tipo de Trámite</label>
              <select value={filters.tipo} onChange={e => setFilter('tipo', e.target.value)}>
                <option value="">Todos</option>
                <option value="denuncia">Denuncia</option>
                <option value="queja">Queja</option>
                <option value="reclamo">Reclamo</option>
                <option value="peticion">Petición</option>
              </select>
            </div>
            <div className="form-field">
              <label>Estado</label>
              <select value={filters.estado} onChange={e => setFilter('estado', e.target.value)}>
                <option value="">Todos</option>
                <option value="En revisión">En Revisión</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
            <div className="form-field">
              <label>Consulta Pública</label>
              <select value={filters.consulta} onChange={e => setFilter('consulta', e.target.value)}>
                <option value="">Todos</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Printable report */}
      <div className="premium-card" id="printable-area">
        <div className="premium-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Reporte de Trámites</h2>
            <p style={{ fontSize: '0.82rem', opacity: 0.8, marginTop: '2px' }}>
              {filtered.length} registro{filtered.length !== 1 ? 's' : ''}{hasFilters ? ' con filtros aplicados' : ' en total'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }} className="no-print">
            <button onClick={() => window.print()} className="btn btn-accent">
              <Download size={16} /> Imprimir / PDF
            </button>
            <button onClick={onClose} className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', background: 'transparent' }}>
              Cerrar
            </button>
          </div>
        </div>

        <div className="premium-card-body">
          {/* Institution header */}
          <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)', fontSize: '1.4rem' }}>
                República Bolivariana de Venezuela
              </h3>
              <h4 style={{ color: 'var(--muted)', fontSize: '0.95rem', fontWeight: 600 }}>
                Contraloría del Municipio Páez — Oficina de Atención al Ciudadano
              </h4>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--muted)' }}>FECHA DE EMISIÓN</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>{new Date().toLocaleDateString('es-VE')}</div>
            </div>
          </div>

          {/* Summary stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
            <StatBox value={filtered.length} label="Total" bg="var(--light)" color="var(--navy)" border="var(--border)" />
            <StatBox value={stats.byEstado['En revisión'] || 0} label="En Revisión" bg="var(--warning-light)" color="var(--warning)" border="rgba(217,119,6,0.2)" />
            <StatBox value={stats.byEstado['Completado'] || 0} label="Completados" bg="var(--success-light)" color="var(--success)" border="rgba(46,125,94,0.2)" />
            {TIPOS.filter(t => stats.byTipo[t]).map(t => (
              <StatBox key={t} value={stats.byTipo[t]} label={t.charAt(0).toUpperCase() + t.slice(1)} bg="var(--surface)" color="var(--navy)" border="var(--border-light)" />
            ))}
          </div>

          {/* Active filters label (shows on print) */}
          {hasFilters && (
            <div style={{ background: 'var(--accent-light)', border: '1px solid rgba(200,146,42,0.25)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--accent-dark)' }}>
              <strong>Filtros aplicados:</strong> {activeFiltersLabel}
            </div>
          )}

          {/* Main table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--navy)', textAlign: 'left', background: 'var(--light)' }}>
                {['Expediente', 'Fecha', 'Tipo', 'Ciudadano Solicitante', 'Cédula/RIF', 'Ubicación Señalado', 'Estado'].map(h => (
                  <th key={h} style={{ padding: '10px', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--navy)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)', fontStyle: 'italic' }}>
                    No hay registros con los filtros seleccionados.
                  </td>
                </tr>
              ) : filtered.map((c, idx) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-light)', background: idx % 2 === 1 ? 'var(--surface)' : 'transparent' }}>
                  <td style={{ padding: '9px 10px', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.78rem', color: 'var(--navy)' }}>{c.id}</td>
                  <td style={{ padding: '9px 10px', fontSize: '0.82rem' }}>{c.fecha}</td>
                  <td style={{ padding: '9px 10px', fontSize: '0.82rem', textTransform: 'capitalize' }}>{c.tipo_tramite}</td>
                  <td style={{ padding: '9px 10px', fontSize: '0.82rem' }}>{c.solicitante.nombres}</td>
                  <td style={{ padding: '9px 10px', fontSize: '0.82rem' }}>{c.solicitante.tipo_doc}-{c.solicitante.nro_doc}</td>
                  <td style={{ padding: '9px 10px', fontSize: '0.82rem' }}>{c.ubicacion_señalado}</td>
                  <td style={{ padding: '9px 10px', fontSize: '0.82rem', fontWeight: 600, color: c.estado === 'Completado' ? 'var(--success)' : 'var(--warning)' }}>
                    {c.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signature */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem' }}>
            <SignatureLine label="Firma del Receptor Autorizado" />
            <SignatureLine label="Sello de la OAC Contraloría Páez" />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatBox({ value, label, bg, color, border }) {
  return (
    <div style={{ background: bg, borderRadius: 'var(--radius-sm)', padding: '0.9rem', textAlign: 'center', border: `1px solid ${border}` }}>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.68rem', color, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.6px', marginTop: '4px', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function SignatureLine({ label }) {
  return (
    <div style={{ width: '220px', borderTop: '1px solid #000', textAlign: 'center', paddingTop: '10px', fontSize: '0.8rem', color: 'var(--muted)' }}>
      {label}
    </div>
  );
}

export default ReportPage;
