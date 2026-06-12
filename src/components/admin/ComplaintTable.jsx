import { Edit3, Trash2 } from 'lucide-react';

function ComplaintTable({ complaints, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="table-container">
      <table className="premium-table">
        <thead>
          <tr>
            <th>Expediente</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Solicitante</th>
            <th>Señales / Instancia</th>
            <th>Estado</th>
            <th style={{ textAlign: 'right' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td style={{ fontWeight: 'bold', color: 'var(--navy)' }}>{complaint.id}</td>
                <td>{complaint.fecha}</td>
                <td style={{ textTransform: 'capitalize' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: complaint.tipo_tramite === 'denuncia' ? '#fbeeee' : '#eef4fb',
                    color: complaint.tipo_tramite === 'denuncia' ? 'var(--error)' : 'var(--blue)'
                  }}>
                    {complaint.tipo_tramite}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{complaint.solicitante.nombres}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                    {complaint.solicitante.tipo_doc}-{complaint.solicitante.nro_doc}
                  </div>
                </td>
                <td>
                  {complaint.señalados && complaint.señalados[0] ? (
                    <div>
                      <div style={{ fontWeight: 500 }}>{complaint.señalados[0].nombre || 'N/A'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{complaint.señalados[0].instancia || 'N/A'}</div>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--muted)' }}>N/A</span>
                  )}
                </td>
                <td>
                  <span
                    onClick={() => onToggleStatus(complaint.id)}
                    className={`badge ${complaint.estado === 'Completado' ? 'badge-completed' : 'badge-review'}`}
                    style={{ cursor: 'pointer' }}
                    title="Haz clic para alternar estado rápidamente"
                  >
                    {complaint.estado}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => onEdit(complaint)} className="btn btn-secondary" style={{ padding: '6px 10px' }} title="Editar">
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => onDelete(complaint.id)} className="btn btn-danger" style={{ padding: '6px 10px' }} title="Eliminar">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                No se encontraron registros de solicitudes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintTable;
