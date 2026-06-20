function MetricCard({ icon, value, label, iconBackground, iconColor, variant }) {
  return (
    <div className={`metric-card metric-${variant}`}>
      <div className="metric-icon" style={{ background: iconBackground, color: iconColor }}>
        {icon}
      </div>
      <div>
        <div className="metric-value">{value}</div>
        <div className="metric-label">{label}</div>
      </div>
    </div>
  );
}

export default MetricCard;
