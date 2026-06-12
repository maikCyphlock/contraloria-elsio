function MetricCard({ icon, value, label, iconBackground, iconColor }) {
  return (
    <div className="premium-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ background: iconBackground, padding: '12px', borderRadius: '8px', color: iconColor }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)' }}>{value}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      </div>
    </div>
  );
}

export default MetricCard;
