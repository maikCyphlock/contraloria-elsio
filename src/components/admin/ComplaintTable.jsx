import { Edit3, Eye, FileText, Trash2 } from 'lucide-react';

const TYPE_CLASS = {
  denuncia: 'tag-denuncia',
  queja:    'tag-queja',
  reclamo:  'tag-reclamo',
  peticion: 'tag-peticion',
};

function ComplaintTable({ complaints, onEdit, onDelete, onToggleStatus, onView }) {
  if (complaints.length === 0) {
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
            <th>Expediente</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Solicitante</th>
            <th>Señalado / Instancia</th>
            <th>Estado</th>
            <th style={{ textAlign: 'right' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
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
              <td>
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
              <td>
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
