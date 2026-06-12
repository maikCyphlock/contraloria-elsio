function ProjectSection({ proyecto, onChange }) {
  return (
    <div style={{ marginBottom: '2rem', background: '#fffcf5', padding: '1.5rem', borderRadius: '8px', border: '1px solid #f0d080' }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--navy)' }}>
        Detalle del Proyecto de Consulta Popular
      </h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Nombre del Proyecto *</label>
          <input type="text" placeholder="Nombre completo del proyecto" value={proyecto.name} onChange={(event) => onChange('name', event.target.value)} required />
        </div>
        <div className="form-field">
          <label>Monto Estimado / Asignado *</label>
          <input type="text" placeholder="Ej. 500000" value={proyecto.amount} onChange={(event) => onChange('amount', event.target.value)} required />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label>Fecha de Aprobación</label>
          <input type="date" value={proyecto.date} onChange={(event) => onChange('date', event.target.value)} />
        </div>
        <div className="form-field">
          <label>Ente Financiador</label>
          <input type="text" placeholder="Ej. Consejo Federal de Gobierno" value={proyecto.ente} onChange={(event) => onChange('ente', event.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default ProjectSection;
