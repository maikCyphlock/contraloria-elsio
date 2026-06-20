import { CheckCircle } from 'lucide-react';

function Notification({ message }) {
  if (!message) return null;

  return (
    <div className="toast">
      <CheckCircle size={18} className="toast-icon" />
      <span>{message}</span>
    </div>
  );
}

export default Notification;
