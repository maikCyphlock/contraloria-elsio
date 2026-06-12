import { CheckCircle, Clock, FileText, PlusCircle, Users } from 'lucide-react';
import MetricCard from './MetricCard';

function HomePage({ complaints, onRegister, onAdmin }) {
  const total = complaints.length;
  const inReview = complaints.filter((item) => item.estado === 'En revisión').length;
  const completed = complaints.filter((item) => item.estado === 'Completado').length;

  return (
    <main className="container animate-fade">
      <div className="premium-card" style={{ marginBottom: '2rem' }}>
        <div className="premium-card-body" style={{
          background: 'linear-gradient(135deg, rgba(13,43,78,0.02) 0%, rgba(26,79,138,0.05) 100%)',
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>
            Sistema de Control y Recepción de Denuncias
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: '700px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
            Bienvenidos al Portal de la Oficina de Atención al Ciudadano de la Contraloría Municipal.
            Aquí podrá registrar denuncias, quejas, reclamos y peticiones de forma transparente, segura y rápida.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={onRegister} className="btn btn-accent" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <PlusCircle size={20} /> Registrar Solicitud / Denuncia
            </button>
            <button onClick={onAdmin} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <Users size={20} /> Acceder al Panel de Control
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <MetricCard
          icon={<FileText size={28} />}
          value={total}
          label="Total Trámites"
          iconBackground="var(--light)"
          iconColor="var(--navy)"
        />
        <MetricCard
          icon={<Clock size={28} />}
          value={inReview}
          label="En Revisión"
          iconBackground="var(--accent-light)"
          iconColor="var(--accent)"
        />
        <MetricCard
          icon={<CheckCircle size={28} />}
          value={completed}
          label="Completados"
          iconBackground="var(--success-light)"
          iconColor="var(--success)"
        />
      </div>
    </main>
  );
}

export default HomePage;
