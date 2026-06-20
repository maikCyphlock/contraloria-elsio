import { CheckCircle, Clock, FileText, PlusCircle, Users } from 'lucide-react';
import MetricCard from './MetricCard';

function HomePage({ complaints, onRegister, onAdmin }) {
  const total = complaints.length;
  const inReview = complaints.filter((c) => c.estado === 'En revisión').length;
  const completed = complaints.filter((c) => c.estado === 'Completado').length;

  return (
    <main className="container animate-fade">
      <div className="premium-card" style={{ marginBottom: '1.5rem' }}>
        <div className="hero-section">
          <h2 className="hero-title">Sistema de Control y Recepción de Denuncias</h2>
          <p className="hero-subtitle">
            Portal de la Oficina de Atención al Ciudadano de la Contraloría Municipal.
            Registre denuncias, quejas, reclamos y peticiones de forma transparente y segura.
          </p>
          <div className="hero-actions">
            <button onClick={onRegister} className="btn btn-accent" style={{ padding: '12px 26px' }}>
              <PlusCircle size={17} /> Registrar Solicitud
            </button>
            <button onClick={onAdmin} className="btn btn-primary" style={{ padding: '12px 26px' }}>
              <Users size={17} /> Panel de Control
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <MetricCard
          variant="total"
          icon={<FileText size={24} />}
          value={total}
          label="Total Trámites"
          iconBackground="var(--light)"
          iconColor="var(--blue-mid)"
        />
        <MetricCard
          variant="review"
          icon={<Clock size={24} />}
          value={inReview}
          label="En Revisión"
          iconBackground="var(--warning-light)"
          iconColor="var(--warning)"
        />
        <MetricCard
          variant="done"
          icon={<CheckCircle size={24} />}
          value={completed}
          label="Completados"
          iconBackground="var(--success-light)"
          iconColor="var(--success-mid)"
        />
      </div>
    </main>
  );
}

export default HomePage;
