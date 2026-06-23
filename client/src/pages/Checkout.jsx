import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const NOTES_CHIPS = ['Leave at door', 'Call on arrival', 'No spice please', 'Extra napkins'];

export default function Checkout() {
 const { items, total, subtotal, deliveryFee, tax, discount } = useCart();
 const navigate = useNavigate();

 const [form, setForm] = useState({
 firstName: '', lastName: '', phone: '', email: '',
 address: '', city: '', pincode: '', notes: '',
 });

 if (!items.length) { navigate('/cart'); return null; }

 const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

 const handleSubmit = e => {
 e.preventDefault();
 const { firstName, phone, address, city, pincode } = form;
 if (!firstName || !phone || !address || !city || !pincode) {
 alert('Please fill all required fields');
 return;
 }
 sessionStorage.setItem('uk_order', JSON.stringify(form));
 navigate('/payment');
 };

 return (
 <div className="section">
 <div className="container">
 <div className="step-indicator">
 <div className="step completed"><span>1</span><label>Cart</label></div>
 <div className="step-line completed" />
 <div className="step active"><span>2</span><label>Checkout</label></div>
 <div className="step-line" />
 <div className="step"><span>3</span><label>Payment</label></div>
 <div className="step-line" />
 <div className="step"><span>4</span><label>Done</label></div>
 </div>

 <div className="checkout-layout">
 <form className="checkout-form" onSubmit​={handleSubmit}>
 <h2>Delivery Details</h2>

 <div className="form-row">
 <div className="form-group">
 <label>First Name *</label>
 <input required value={form.firstName} onChange​={e => setField('firstName', e.target.value)} placeholder="First name" />
 </div>
 <div className="form-group">
 <label>Last Name</label>
 <input value={form.lastName} onChange​={e => setField('lastName', e.target.value)} placeholder="Last name" />
 </div>
 </div>

 <div className="form-row">
 <div className="form-group">
 <label>Phone *</label>
 <input required value={form.phone} onChange​={e => setField('phone', e.target.value)} placeholder="+91 98765 43210" />
 </div>
 <div className="form-group">
 <label>Email</label>
 <input type="email" value={form.email} onChange​={e => setField('email', e.target.value)} placeholder="your@email.com" />
 </div>
 </div>

 <div className="form-group">
 <label>Delivery Address *</label>
 <input required value={form.address} onChange​={e => setField('address', e.target.value)} placeholder="House/Flat No., Street, Area" />
 </div>

 <div className="form-row">
 <div className="form-group">
 <label>City *</label>
 <input required value={form.city} onChange​={e => setField('city', e.target.value)} placeholder="City" />
 </div>
 <div className="form-group">
 <label>Pincode *</label>
 <input required value={form.pincode} onChange​={e => setField('pincode', e.target.value)} placeholder="400001" maxLength={6} />
 </div>
 </div>

 <div className="form-group">
 <label>Delivery Notes</label>
 <div className="notes-chips">
 {NOTES_CHIPS.map(n => (
 <button key={n} type="button" className="chip"
 onClick​={() => setField('notes', form.notes ? form.notes + ', ' + n : n)}>{n}</button>
 ))}
 </div>
 <textarea rows={3} value={form.notes} onChange​={e => setField('notes', e.target.value)}
 placeholder="Any specific instructions for delivery?" />
 </div>

 <button type="submit" className="btn btn-primary btn-block">
 Continue to Payment <i className="fas fa-arrow-right" />
 </button>
 </form>

 {/* Mini Summary */}
 <div className="checkout-summary">
 <h3>Order Summary</h3>
 <div className="checkout-items">
 {items.map(i => (
 <div key={i._id} className="checkout-item">
 <span>{i.name} × {i.qty}</span>
 <span>₹{i.price * i.qty}</span>
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