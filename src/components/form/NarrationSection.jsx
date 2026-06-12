import FormSection from './FormSection';

function NarrationSection({ value, onChange }) {
  return (
    <FormSection title="4. Narración Circunstanciada de Hechos">
      <div className="form-field full-width">
        <label>Relato de los Hechos (Mínimo 50 caracteres) *</label>
        <textarea
          placeholder="Describa detalladamente los hechos irregulares detectados..."
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
        ></textarea>
      </div>
    </FormSection>
  );
}

export default NarrationSection;
