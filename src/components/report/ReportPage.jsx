import { Download } from 'lucide-react';

function ReportPage({ complaints, onClose }) {
  return (
    <main className="container animate-fade">
      <div className="premium-card">
        <div className="premium-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Reporte General del Sistema (Sin Filtros)</h2>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '2px' }}>
              Este reporte incluye el listado completo de trámites registrados.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => window.print()} className="btn btn-accent">
              <Download size={16} /> Imprimir / PDF
            </button>
            <button onClick={onClose} className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', background: 'transparent' }}>
              Cerrar Reporte
            </button>
          </div>
        </div>

        <div className="premium-card-body" id="printable-area">
          <div style={{
            borderBottom: '2px solid var(--navy)',
            paddingBottom: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)', fontSize: '1.4rem' }}>
                República Bolivariana de Venezuela
              </h3>
              <h4 style={{ color: 'var(--muted)', fontSize: '0.95rem', fontWeight: 600 }}>
                Contraloría del Municipio Páez — Oficina de Atención al Ciudadano
              </h4>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>FECHA DE EMISIÓN</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--navy)', textAlign: 'left' }}>
                <th style={{ padding: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Expediente</th>
                <th style={{ padding: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Fecha</th>
                <th style={{ padding: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Tipo</th>
                <th style={{ padding: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Ciudadano Solicitante</th>
                <th style={{ padding: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Cédula/RIF</th>
                <th style={{ padding: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Ubicación Señalado</th>
                <th style={{ padding: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', fontSize: '0.85rem' }}>{complaint.id}</td>
                  <td style={{ padding: '10px', fontSize: '0.85rem' }}>{complaint.fecha}</td>
                  <td style={{ padding: '10px', fontSize: '0.85rem', textTransform: 'capitalize' }}>{complaint.tipo_tramite}</td>
                  <td style={{ padding: '10px', fontSize: '0.85rem' }}>{complaint.solicitante.nombres}</td>
                  <td style={{ padding: '10px', fontSize: '0.85rem' }}>{complaint.solicitante.tipo_doc}-{complaint.solicitante.nro_doc}</td>
                  <td style={{ padding: '10px', fontSize: '0.85rem' }}>{complaint.ubicacion_señalado}</td>
                  <td style={{ padding: '10px', fontSize: '0.85rem', fontWeight: 600 }}>{complaint.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem' }}>
            <div style={{ width: '220px', borderTop: '1px solid #000', textAlign: 'center', paddingTop: '10px', fontSize: '0.8rem' }}>
              Firma del Receptor Autorizado
            </div>
            <div style={{ width: '220px', borderTop: '1px solid #000', textAlign: 'center', paddingTop: '10px', fontSize: '0.8rem' }}>
              Sello de la OAC Contraloría Páez
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ReportPage;
