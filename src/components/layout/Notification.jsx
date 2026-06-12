import { CheckCircle } from 'lucide-react';

function Notification({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'var(--navy)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'fadeIn 0.3s ease'
    }}>
      <CheckCircle size={18} color="var(--accent)" />
      <span>{message}</span>
    </div>
  );
}

export default Notification;
