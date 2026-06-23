import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import api from '../api/client.js';

const QUICK_COUPONS = ['FEAST20', 'NEWUSER', 'FREEDEL', 'SAVE50'];

export default function CartPage() {
 const { items, removeItem, updateQty, coupon, setCoupon, subtotal, deliveryFee, tax, discount, total, count } = useCart();
 const { toast } = useToast();
 const navigate = useNavigate();
 const [code, setCode] = useState('');
 const [applying, setApplying] = useState(false);

 const applyCoupon = async (c) => {
 const code_ = (c || code).toUpperCase();
 if (!code_) return;
 setApplying(true);
 try {
 const res = await api.get(`/coupons/validate/${code_}?subtotal=${subtotal}`);
 setCoupon({ code: code_, discount: res.data.discount, type: res.data.coupon.type });
 toast.success(`Coupon ${code_} applied! Saving ₹${res.data.discount}`);
 } catch (err) {
 toast.error(err.response?.data?.message || 'Invalid coupon');
 } finally { setApplying(false); }
 };

 const removeCoupon = () => { setCoupon(null); setCode(''); toast.info('Coupon removed'); };

 if (!items.length) return (
 <div className="section">
 <div className="container">
 <div className="empty-state" style={{ paddingTop: '80px' }}>
 <div className="empty-icon">🛒</div>
 <h3>Your cart is empty</h3>
 <p>Add some delicious items to get started!</p>
 <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
 </div>
 </div>
 </div>
 );

 return (
 <div className="section">
 <div className="container">
 <h1 style={{ marginBottom: '32px' }}>
 Your Cart <span style={{ color: 'var(--text-sub)', fontSize: '1rem', fontWeight: 500 }}>({count} items)</span>
 </h1>

 <div className="cart-layout">
 {/* Items */}
 <div className="cart-items-wrap">
 {items.map(item => (
 <div key={item._id} className="cart-item">
 <img src={item.image} alt={item.name} className="cart-item-img"
 onError​={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop'; }} />
 <div className="cart-item-body">
 <div className="cart-item-name">{item.name}</div>
 <div className="cart-item-price">₹{item.price} each</div>
 </div>
 <div className="qty-control">
 <button onClick​={() => updateQty(item._id, item.qty - 1)}>−</button>
 <span>{item.qty}</span>
 <button onClick​={() => updateQty(item._id, item.qty + 1)}>+</button>
 </div>
 <div className="cart-item-total">₹{item.price * item.qty}</div>
 <button className="cart-remove" onClick​={() => { removeItem(item._id); toast.info(`${item.name} removed`); }} aria-label="Remove">
 <i className="fas fa-trash" />
 </button>
 </div>
 ))}

 {/* Coupon */}
 <div className="coupon-section">
 <h4><i className="fas fa-tag" /> Apply Coupon</h4>
 <div className="coupon-chips">
 {QUICK_COUPONS.map(c => (
 <button key={c} className={`chip${coupon?.code === c ? ' active' : ''}`}
 onClick​={() => coupon?.code === c ? removeCoupon() : applyCoupon(c)}>{c}</button>
 ))}
 </div>
 <div className="coupon-input-row">
 <input type="text" placeholder="Enter coupon code"
 value={code} onChange​={e => setCode(e.target.value.toUpperCase())}
 onKeyDown​={e => e.key === 'Enter' && applyCoupon()} />
 <button className="btn btn-primary btn-sm" onClick​={() => applyCoupon()} disabled={applying}>
 {applying ? <i className="fas fa-spinner fa-spin" /> : 'Apply'}
 </button>
 {coupon && <button className="btn btn-outline btn-sm" onClick​={removeCoupon}>Remove</button>}
 </div>
 {coupon && <p className="coupon-applied"><i className="fas fa-check-circle" /> {coupon.code} — saving ₹{coupon.discount}</p>}
 </div>
 </div>

 {/* Summary */}
 <div className="cart-summary">
 <h3>Order Summary</h3>
 <div className="summary-rows">
 <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
 <div className="summary-row"><span>Delivery</span><span>{deliveryFee === 0 ? <span className="free">Free</span> : `₹${deliveryFee}`}</span></div>
 <div className="summary-row"><span>Tax (5%)</span><span>₹{tax}</span></div>
 {discount > 0 && <div className="summary-row discount"><span>Discount</span><span>−₹{discount}</span></div>}
 </div>
 <div className="summary-total"><span>Total</span><span>₹{total}</span></div>
 {subtotal < 600 && (
 <p className="free-delivery-note">
 <i className="fas fa-info-circle" /> Add ₹{600 - subtotal} more for free delivery
 </p>
 )}
 <button className="btn btn-primary btn-block" style={{ marginTop: '24px' }} onClick​={() => navigate('/checkout')}>
 Proceed to Checkout <i className="fas fa-arrow-right" />
 </button>
 <Link to="/menu" className="btn btn-outline btn-block" style={{ marginTop: '12px' }}>Continue Shopping</Link>
 </div>
 </div>
 </div>
 </div>
 );
}