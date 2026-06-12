import FormSection from './FormSection';

function ClassificationSection({ form, onChange }) {
  return (
    <FormSection title="1. Clasificación del Trámite" highlighted>
      <div className="form-grid">
        <div className="form-field">
          <label>Tipo de Trámite *</label>
          <select value={form.formType} onChange={(event) => onChange('formType', event.target.value)}>
            <option value="denuncia">Denuncia (Irregularidades en recursos públicos)</option>
            <option value="queja">Queja (Deficiencia en servicio público)</option>
            <option value="reclamo">Reclamo (Incumplimiento institucional)</option>
            <option value="peticion">Petición (Solicitud de información)</option>
          </select>
        </div>
        <div className="form-field">
          <label>¿Relacionado con Consulta Popular Nacional? *</label>
          <select value={form.isConsulta} onChange={(event) => onChange('isConsulta', event.target.value)}>
            <option value="no">No, es sobre otra situación / organismo</option>
            <option value="si">Sí, es sobre un proyecto comunitario aprobado</option>
          </select>
        </div>
      </div>
    </FormSection>
  );
}

export default ClassificationSection;
