import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import api from '../api/client.js';

const METHODS = [
 { id: 'upi', icon: 'fa-mobile-alt', label: 'UPI', sub: 'Pay via any UPI app' },
 { id: 'card', icon: 'fa-credit-card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
 { id: 'netbanking', icon: 'fa-university', label: 'Net Banking', sub: 'All major banks' },
 { id: 'cod', icon: 'fa-money-bill-wave', label: 'Cash on Delivery', sub: 'Pay when order arrives' },
];

export default function Payment() {
 const { items, total, subtotal, deliveryFee, tax, discount, coupon, clearCart } = useCart();
 const { user } = useAuth();
 const { toast } = useToast();
 const navigate = useNavigate();

 const [method, setMethod] = useState('upi');
 const [upiId, setUpiId] = useState('');
 const [processing, setProcessing] = useState(false);

 const delivery = JSON.parse(sessionStorage.getItem('uk_order') || '{}');

 if (!items.length) { navigate('/cart'); return null; }

 const handlePay = async () => {
 setProcessing(true);
 try {
 await new Promise(r => setTimeout(r, 1800)); // Simulate payment gateway

 let order;
 if (user) {
 const res = await api.post('/orders', {
 items: items.map(i => ({ foodItem: i._id, name: i.name, price: i.price, qty: i.qty, image: i.image })),
 deliveryAddress: {
 name: `${delivery.firstName} ${delivery.lastName || ''}`.trim(),
 phone: delivery.phone,
 line1: delivery.address,
 city: delivery.city,
 pincode: delivery.pincode,
 notes: delivery.notes,
 },
 paymentMethod: method,
 couponCode: coupon?.code,
 });
 order = res.data;
 } else {
 order = { orderId: 'UK' + Date.now().toString(36).toUpperCase(), total, createdAt: new Date().toISOString() };
 }

 sessionStorage.setItem('uk_last_order', JSON.stringify({ ...order, items, total, paymentMethod: method }));
 clearCart();
 navigate('/order-success');
 } catch (err) {
 toast.error(err.response?.data?.message || 'Payment failed. Please try again.');
 } finally { setProcessing(false); }
 };

 return (
 <div className="section">
 <div className="container">
 <div className="step-indicator">
 <div className="step completed"><span>1</span><label>Cart</label></div>
 <div className="step-line completed" />
 <div className="step completed"><span>2</span><label>Checkout</label></div>
 <div className="step-line completed" />
 <div className="step active"><span>3</span><label>Payment</label></div>
 <div className="step-line" />
 <div className="step"><span>4</span><label>Done</label></div>
 </div>

 <div className="checkout-layout">
 <div className="payment-methods">
 <h2>Choose Payment Method</h2>
 {METHODS.map(m => (
 <div key={m.id}>
 <div className={`pay-option${method === m.id ? ' active' : ''}`} onClick​={() => setMethod(m.id)}>
 <i className={`fas ${m.icon} pay-icon`} />
 <div className="pay-label"><strong>{m.label}</strong><span>{m.sub}</span></div>
 <input type="radio" readOnly checked={method === m.id} />
 </div>
 {method === 'upi' && m.id === 'upi' && (
 <div className="pay-detail">
 <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" value={upiId} onChange​={e => setUpiId(e.target.value)} />
 </div>
 )}
 {method === 'card' && m.id === 'card' && (
 <div className="pay-detail">
 <div className="form-row">
 <input placeholder="Card Number" maxLength={19} />
 <input placeholder="MM/YY" maxLength={5} />
 <input placeholder="CVV" maxLength={3} type="password" />
 </div>
 </div>
 )}
 </div>
 ))}

 <button className="btn btn-primary btn-block" style={{ marginTop: '28px' }}
 onClick​={handlePay} disabled={processing}>
 {processing
 ? <><i className="fas fa-spinner fa-spin" /> Processing…</>
 : `Pay ₹${total}`}
 </button>
 </div>

 {/* Summary */}
 <div className="checkout-summary">
 <h3>Order Summary</h3>
 <div className="checkout-items">
 {items.map(i => (
 <div key={i._id} className="checkout-item">
 <span>{i.name} × {i.qty}</span><span>₹{i.price * i.qty}</span>
 </div>
 ))}
 </div>
 <div className="summary-rows">
 <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
 <div className="summary-row"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span></div>
 <div className="summary-row"><span>Tax (5%)</span><span>₹{tax}</span></div>
 {discount > 0 && <div className="summary-row discount"><span>Discount</span><span>−₹{discount}</span></div>}
 </div>
 <div className="summary-total"><span>Total</span><span>₹{total}</span></div>
 </div>
 </div>
 </div>
 </div>
 );
}