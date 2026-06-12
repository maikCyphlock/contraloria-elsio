function FormSection({ title, children, highlighted }) {
  const normalStyle = {
    marginBottom: '2rem',
    padding: '0.5rem'
  };

  const highlightedStyle = {
    marginBottom: '2rem',
    background: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid var(--border)'
  };

  const titleStyle = highlighted
    ? { fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--navy)' }
    : { fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--navy)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' };

  return (
    <div style={highlighted ? highlightedStyle : normalStyle}>
      <h3 style={titleStyle}>{title}</h3>
      {children}
    </div>
  );
}

export default FormSection;
