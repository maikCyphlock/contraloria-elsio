import FormSection from './FormSection';

function ApplicantSection({ solicitante, onChange }) {
  return (
    <FormSection title="2. Datos del Ciudadano Solicitante">
      <div className="form-grid">
        <div className="form-field">
          <label>Tipo Documento *</label>
          <select value={solicitante.docType} onChange={(event) => onChange('docType', event.target.value)}>
            <option value="V">V — Venezolano</option>
            <option value="E">E — Extranjero</option>
            <option value="P">Pasaporte</option>
          </select>
        </div>
        <div className="form-field">
          <label>Número Documento *</label>
          <input type="text" placeholder="Ej. 12345678" value={solicitante.docNum} onChange={(event) => onChange('docNum', event.target.value)} required />
        </div>
        <div className="form-field">
          <label>Apellidos y Nombres *</label>
          <input type="text" placeholder="Apellido Apellido, Nombre Nombre" value={solicitante.name} onChange={(event) => onChange('name', event.target.value)} required />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Sexo</label>
          <select value={solicitante.gender} onChange={(event) => onChange('gender', event.target.value)}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div className="form-field">
          <label>Edad</label>
          <input type="number" placeholder="Años" value={solicitante.age} onChange={(event) => onChange('age', event.target.value)} />
        </div>
        <div className="form-field">
          <label>Correo Electrónico *</label>
          <input type="email" placeholder="correo@ejemplo.com" value={solicitante.email} onChange={(event) => onChange('email', event.target.value)} required />
        </div>
        <div className="form-field">
          <label>Teléfono celular *</label>
          <input type="text" placeholder="04XX-XXXXXXX" value={solicitante.phone} onChange={(event) => onChange('phone', event.target.value)} required />
        </div>
      </div>

      <div className="form-field full-width" style={{ marginTop: '1rem' }}>
        <label>Dirección de habitación *</label>
        <input type="text" placeholder="Completa: Calle, Av, Sector, Casa..." value={solicitante.address} onChange={(event) => onChange('address', event.target.value)} required />
      </div>
    </FormSection>
  );
}

export default ApplicantSection;
