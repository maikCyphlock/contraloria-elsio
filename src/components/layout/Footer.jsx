function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      background: 'var(--navy-dark)',
      color: 'white',
      textAlign: 'center',
      padding: '1.5rem',
      fontSize: '0.85rem',
      borderTop: '3px solid var(--accent)'
    }}>
      <p>© 2026 Contraloría del Municipio Páez. Todos los derechos reservados.</p>
      <p style={{ opacity: 0.6, marginTop: '4px', fontSize: '0.75rem' }}>
        Desarrollado para la Oficina de Atención al Ciudadano.
      </p>
    </footer>
  );
}

export default Footer;
