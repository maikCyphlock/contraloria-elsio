import { ArrowLeft } from 'lucide-react';
import ApplicantSection from './ApplicantSection';
import ClassificationSection from './ClassificationSection';
import InvolvedSection from './InvolvedSection';
import NarrationSection from './NarrationSection';
import ProjectSection from './ProjectSection';

function ComplaintFormPage({ form, editingComplaint, onSubmit, onCancel, onFieldChange, onSolicitanteChange, onProyectoChange, onAddSenal, onUpdateSenal, onRemoveSenal }) {
  return (
    <main className="container animate-fade">
      <div className="premium-card">
        <div className="premium-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{editingComplaint ? `Editar Trámite ${editingComplaint.id}` : 'Nueva Solicitud / Denuncia'}</h2>
          <button onClick={onCancel} className="btn btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', background: 'transparent' }}>
            <ArrowLeft size={16} /> Volver
          </button>
        </div>

        <form onSubmit={onSubmit} className="premium-card-body">
          <ClassificationSection form={form} onChange={onFieldChange} />

          <ApplicantSection solicitante={form.solicitante} onChange={onSolicitanteChange} />

          <InvolvedSection
            ubicacion={form.ubicacionSenalado}
            senales={form.senales}
            onUbicacionChange={(value) => onFieldChange('ubicacionSenalado', value)}
            onAddRow={onAddSenal}
            onUpdateRow={onUpdateSenal}
            onRemoveRow={onRemoveSenal}
          />

          {form.isConsulta === 'si' && (
            <ProjectSection proyecto={form.proyecto} onChange={onProyectoChange} />
          )}

          <NarrationSection value={form.narracion} onChange={(value) => onFieldChange('narracion', value)} />

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-accent">
              {editingComplaint ? 'Actualizar Solicitud' : 'Registrar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ComplaintFormPage;
