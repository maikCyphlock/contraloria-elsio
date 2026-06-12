import { Trash2 } from 'lucide-react';
import FormSection from './FormSection';

function InvolvedSection({ ubicacion, senales, onUbicacionChange, onAddRow, onUpdateRow, onRemoveRow }) {
  return (
    <FormSection title="3. Identificación del Señalado">
      <div className="form-field full-width" style={{ marginBottom: '1.5rem' }}>
        <label>Ubicación geográfica del señalado / Entidad *</label>
        <input
          type="text"
          placeholder="Dirección, Comuna, Consejo Comunal, Órgano o Ente..."
          value={ubicacion}
          onChange={(event) => onUbicacionChange(event.target.value)}
          required
        />
      </div>

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Personas o Entidades involucradas</label>
      <div className="table-container" style={{ marginBottom: '1rem' }}>
        <table className="premium-table">
          <thead>
            <tr>
              <th>Cédula/RIF</th>
              <th>Nombre / Razón Social</th>
              <th>Instancia / Comuna</th>
              <th>Código SITUR</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {senales.map((row, index) => (
              <tr key={index}>
                <td>
                  <input type="text" placeholder="Ej. V-12345678" value={row.cedula} onChange={(event) => onUpdateRow(index, 'cedula', event.target.value)} style={{ padding: '6px 10px', fontSize: '0.85rem' }} />
                </td>
                <td>
                  <input type="text" placeholder="Nombre del señalado" value={row.nombre} onChange={(event) => onUpdateRow(index, 'nombre', event.target.value)} style={{ padding: '6px 10px', fontSize: '0.85rem' }} />
                </td>
                <td>
                  <input type="text" placeholder="Consejo Comunal / Ente" value={row.instancia} onChange={(event) => onUpdateRow(index, 'instancia', event.target.value)} style={{ padding: '6px 10px', fontSize: '0.85rem' }} />
                </td>
                <td>
                  <input type="text" placeholder="Cód SITUR" value={row.situr} onChange={(event) => onUpdateRow(index, 'situr', event.target.value)} style={{ padding: '6px 10px', fontSize: '0.85rem' }} />
                </td>
                <td>
                  {senales.length > 1 && (
                    <button type="button" onClick={() => onRemoveRow(index)} className="btn btn-danger" style={{ padding: '6px' }}>
                      <Trash2 size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" onClick={onAddRow} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
        + Agregar Involucrado
      </button>
    </FormSection>
  );
}

export default InvolvedSection;
