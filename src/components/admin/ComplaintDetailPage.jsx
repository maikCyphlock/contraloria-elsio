import { ArrowLeft, Briefcase, FileText, MapPin, User, Users } from 'lucide-react';

const TYPE_CLASS = {
  denuncia: 'tag-denuncia',
  queja:    'tag-queja',
  reclamo:  'tag-reclamo',
  peticion: 'tag-peticion',
};

function ComplaintDetailPage({ complaint, onClose }) {
  if (!complaint) return null;

  const { solicitante, señalados, proyecto } = complaint;

  return (
    <main className="container animate-fade">
      <div className="premium-card">
        <div className="premium-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                {complaint.id}
              </span>
              <span className={`tag ${TYPE_CLASS[complaint.tipo_tramite] ?? 'tag-queja'}`}>
                {complaint.tipo_tramite}
              </span>
              <span className={`badge ${complaint.estado === 'Completado' ? 'badge-completed' : 'badge-review'}`}>
                {complaint.estado}
              </span>
              {complaint.es_consulta === 'si' && (
                <span style={{ fontSize: '0.72rem', fontWeight: 600, background: 'rgba(255,255,255,0.15)', borderRadius: '4px', padding: '2px 8px', letterSpacing: '0.3px' }}>
                  Consulta pública
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.78rem', opacity: 0.7, marginTop: '4px' }}>
              Registrado: {complaint.fecha}
            </p>
          </div>
          <button onClick={onClose} className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', background: 'transparent' }}>
            <ArrowLeft size={15} /> Volver
          </button>
        </div>

        <div className="premium-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Solicitante */}
          <Section icon={<User size={15} />} title="Datos del Solicitante">
            <Grid>
              <Field label="Nombres" value={solicitante.nombres} />
              <Field label="Documento" value={`${solicitante.tipo_doc}-${solicitante.nro_doc}`} mono />
              <Field label="Sexo" value={solicitante.sexo === 'M' ? 'Masculino' : 'Femenino'} />
              <Field label="Edad" value={solicitante.edad ? `${solicitante.edad} años` : '—'} />
              <Field label="Correo" value={solicitante.correo} />
              <Field label="Teléfono" value={solicitante.tel_cel || '—'} />
              <Field label="Dirección" value={solicitante.direccion || '—'} wide />
              <Field label="Municipio" value={solicitante.municipio} />
            </Grid>
          </Section>

          {/* Señalados */}
          {señalados?.length > 0 && (
            <Section icon={<Users size={15} />} title={`Señalados (${señalados.length})`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {señalados.map((s, i) => (
                  <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem' }}>
                    {señalados.length > 1 && (
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.6rem' }}>
                        Señalado {i + 1}
                      </div>
                    )}
                    <Grid>
                      <Field label="Nombre" value={s.nombre || '—'} />
                      <Field label="Cédula" value={s.cedula || '—'} mono />
                      <Field label="Instancia" value={s.instancia || '—'} />
                      <Field label="RIF" value={s.rif || '—'} mono />
                      <Field label="SITUR" value={s.situr || '—'} />
                    </Grid>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Ubicación */}
          {complaint.ubicacion_señalado && (
            <Section icon={<MapPin size={15} />} title="Ubicación del Señalado">
              <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>{complaint.ubicacion_señalado}</p>
            </Section>
          )}

          {/* Narración */}
          <Section icon={<FileText size={15} />} title="Narración de los Hechos">
            <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-wrap', background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem' }}>
              {complaint.narracion || '—'}
            </p>
          </Section>

          {/* Proyecto */}
          {proyecto && complaint.es_consulta === 'si' && (
            <Section icon={<Briefcase size={15} />} title="Datos del Proyecto">
              <Grid>
                <Field label="Nombre del Proyecto" value={proyecto.nombre_proyecto || '—'} wide />
                <Field label="Fecha de Aprobación" value={proyecto.fecha_aprobacion || '—'} />
                <Field label="Monto" value={proyecto.monto_proyecto || '—'} />
                <Field label="Ente Financiador" value={proyecto.ente_financiador || '—'} />
              </Grid>
            </Section>
          )}

        </div>
      </div>
    </main>
  );
}

function Section({ icon, title, children }) {
  return (
    <div>
      <div className="form-section-title">{icon} {title}</div>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
      {children}
    </div>
  );
}

function Field({ label, value, mono, wide }) {
  return (
    <div style={{ gridColumn: wide ? '1 / -1' : undefined }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '3px' }}>
        {label}
      </div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text)', fontFamily: mono ? 'var(--font-mono)' : undefined, fontWeight: mono ? 500 : 400 }}>
        {value}
      </div>
    </div>
  );
}

export default ComplaintDetailPage;
