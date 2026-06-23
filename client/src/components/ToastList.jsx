import { useToast } from '../context/ToastContext.jsx';

const ICONS = {
 success: 'fa-check-circle',
 error: 'fa-times-circle',
 warning: 'fa-exclamation-triangle',
 info: 'fa-info-circle',
};

export default function ToastList() {
 const { toasts } = useToast();
 if (!toasts.length) return null;
 return (
 <div className="toast-container">
 {toasts.map(t => (
 <div key={t.id} className={`toast toast-${t.type}`}>
 <i className={`fas ${ICONS[t.type] || ICONS.info}`} />
 <span>{t.message}</span>
 </div>
 ))}
 </div>
 );
}