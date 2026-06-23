import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STEPS = [
 { icon: '✅', label: 'Order Confirmed' },
 { icon: '👨‍🍳', label: 'Being Prepared' },
 { icon: '🛵', label: 'Out for Delivery' },
 { icon: '🏠', label: 'Delivered' },
];

export default function OrderSuccess() {
 const [order, setOrder] = useState(null);
 const [step, setStep] = useState(0);

 useEffect(() => {
 const o = JSON.parse(sessionStorage.getItem('uk_last_order') || '{}');
 setOrder(o);
 const timers = [
 setTimeout(() => setStep(1), 4000),
 setTimeout(() => setStep(2), 9000),
 setTimeout(() => setStep(3), 16000),
 ];
 return () => timers.forEach(clearTimeout);
 }, []);

 return (
 <div className="section">
 <div className="container">
 <div className="order-success">
 <div className="success-confetti">🎉</div>
 <h1>Order Placed Successfully!</h1>
 <p className="success-id">Order ID: <strong>#{order?.orderId || '—'}</strong></p>
 <p className="delivery-eta">Estimated delivery: <strong>30–45 minutes</strong></p>

 {/* Live tracking */}
 <div className="tracking-wrap">
 <div className="tracking-steps">
 {STEPS.map((s, i) => (
 <div key={i} className={`track-step${i <= step ? ' active' : ''}`}>
 <div className="track-icon">{s.icon}</div>
 <div className="track-label">{s.label}</div>
 {i < STEPS.length - 1 && <div className={`track-line${i < step ? ' done' : ''}`} />}
 </div>
 ))}
 </div>
 </div>

 {/* Items */}
 {order?.items?.length > 0 && (
 <div className="success-items">
 <h3>Your Order</h3>
 {order.items.map((item, idx) => (
 <div key={idx} className="checkout-item">
 <span>{item.name} × {item.qty}</span>
 <span>₹{item.price * item.qty}</span>
 </div>
 ))}
 <div className="summary-total"><span>Total Paid</span><span>₹{order.total}</span></div>
 </div>
 )}

 <div className="success-actions">
 <Link to="/" className="btn btn-primary">Back to Home</Link>
 <Link to="/menu" className="btn btn-outline">Order Again</Link>
 </div>
 </div>
 </div>
 </div>
 );
}