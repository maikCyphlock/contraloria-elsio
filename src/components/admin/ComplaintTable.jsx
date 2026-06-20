import { useState } from 'react';
import { Edit3, Eye, FileText, Trash2, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

const TYPE_CLASS = {
  denuncia: 'tag-denuncia',
  queja:    'tag-queja',
  reclamo:  'tag-reclamo',
  peticion: 'tag-peticion',
};

const COLUMNS = [
  { key: 'id',        label: 'Expediente' },
  { key: 'fecha',     label: 'Fecha' },
  { key: 'tipo',      label: 'Tipo' },
  { key: 'nombre',    label: 'Solicitante' },
  { key: 'senalado',  label: 'Señalado / Instancia', noSort: true },
  { key: 'estado',    label: 'Estado' },
];

function getSortValue(c, key) {
  if (key === 'id')     return c.id;
  if (key === 'fecha')  return c.fecha;
  if (key === 'tipo')   return c.tipo_tramite;
  if (key === 'nombre') return c.solicitante.nombres;
  if (key === 'estado') return c.estado;
  return '';
}

function SortIcon({ col, sortCol, sortDir }) {
  if (col.noSort) return null;
  if (sortCol !== col.key) return <ChevronsUpDown size={12} style={{ opacity: 0.35, marginLeft: 4 }} />;
  return sortDir === 'asc'
    ? <ChevronUp size={12} style={{ marginLeft: 4, color: 'var(--accent)' }} />
    : <ChevronDown size={12} style={{ marginLeft: 4, color: 'var(--accent)' }} />;
}

function ComplaintTable({ complaints, onEdit, onDelete, onToggleStatus, onView }) {
  const [sortCol, setSortCol] = useState('fecha');
  const [sortDir, setSortDir] = useState('desc');

  function handleSort(col) {
    if (col.noSort) return;
    if (sortCol === col.key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col.key);
      setSortDir('asc');
    }
  }

  const sorted = [...complaints].sort((a, b) => {
    const va = getSortValue(a, sortCol);
    const vb = getSortValue(b, sortCol);
    const cmp = va.localeCompare(vb, 'es', { sensitivity: 'base' });
    return sortDir === 'asc' ? cmp : -cmp;
  });

  if (sorted.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <FileText size={28} />
        </div>
        <p>No se encontraron registros de solicitudes.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="premium-table">
        <thead>
          <tr>
            {COLUMNS.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={col.noSort ? '' : 'th-sortable'}
                style={col.key === 'senalado' ? {} : { userSelect: 'none' }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {col.label}
                  <SortIcon col={col} sortCol={sortCol} sortDir={sortDir} />
                </span>
              </th>
            ))}
            <th style={{ textAlign: 'right' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c) => (
            <tr key={c.id} className="tr-clickable" onClick={() => onView(c)}>
              <td>
                <span className="table-id">{c.id}</span>
              </td>
              <td style={{ color: 'var(--muted)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                {c.fecha}
              </td>
              <td>
                <span className={`tag ${TYPE_CLASS[c.tipo_tramite] ?? 'tag-queja'}`}>
                  {c.tipo_tramite}
                </span>
              </td>
              <td>
                <div style={{ fontWeight: 500, color: 'var(--text)' }}>{c.solicitante.nombres}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '1px' }}>
                  {c.solicitante.tipo_doc}-{c.solicitante.nro_doc}
                </div>
              </td>
              <td>
                {c.señalados?.[0] ? (
                  <>
                    <div style={{ fontWeight: 500 }}>{c.señalados[0].nombre || 'N/A'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '1px' }}>
                      {c.señalados[0].instancia || 'N/A'}
                    </div>
                  </>
                ) : (
                  <span style={{ color: 'var(--muted)' }}>—</span>
                )}
              </td>
              <td onClick={e => e.stopPropagation()}>
                <select
                  value={c.estado}
                  onChange={(e) => onToggleStatus(c.id, e.target.value)}
                  className={`status-select ${c.estado === 'Completado' ? 'status-select--completed' : c.estado === 'Archivado' ? 'status-select--archived' : 'status-select--review'}`}
                >
                  <option value="En revisión">En revisión</option>
                  <option value="Completado">Completado</option>
                  <option value="Archivado">Archivado</option>
                </select>
              </td>
              <td onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                  <button onClick={() => onView(c)} className="btn btn-ghost" style={{ padding: '6px 10px', color: 'var(--blue-mid)' }} title="Ver detalle">
                    <Eye size={14} />
                  </button>
                  <button onClick={() => onEdit(c)} className="btn btn-secondary" style={{ padding: '6px 10px' }} title="Editar">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => onDelete(c.id)} className="btn btn-danger" style={{ padding: '6px 10px' }} title="Eliminar">
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintTable;
