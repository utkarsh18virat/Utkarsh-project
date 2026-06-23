import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
 const [items, setItems] = useState(() => {
 try { return JSON.parse(localStorage.getItem('uk_cart')) || []; } catch { return []; }
 });
 const [coupon, setCoupon] = useState(() => {
 try { return JSON.parse(localStorage.getItem('uk_coupon')); } catch { return null; }
 });

 useEffect(() => { localStorage.setItem('uk_cart', JSON.stringify(items)); }, [items]);
 useEffect(() => {
 coupon
 ? localStorage.setItem('uk_coupon', JSON.stringify(coupon))
 : localStorage.removeItem('uk_coupon');
 }, [coupon]);

 const addItem = item =>
 setItems(prev => {
 const found = prev.find(i => i._id === item._id);
 return found
 ? prev.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i)
 : [...prev, { ...item, qty: 1 }];
 });

 const removeItem = id => setItems(prev => prev.filter(i => i._id !== id));

 const updateQty = (id, qty) => {
 if (qty < 1) { removeItem(id); return; }
 setItems(prev => prev.map(i => i._id === id ? { ...i, qty } : i));
 };

 const clearCart = () => { setItems([]); setCoupon(null); };
 const isInCart = id => items.some(i => i._id === id);
 const getQty = id => items.find(i => i._id === id)?.qty || 0;

 const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
 const deliveryFee = coupon?.type === 'delivery' ? 0 : (subtotal >= 600 ? 0 : 40);
 const tax = Math.round(subtotal * 0.05);
 const discount = coupon?.discount || 0;
 const total = subtotal + deliveryFee - discount + tax;
 const count = items.reduce((s, i) => s + i.qty, 0);

 return (
 <CartContext.Provider value={{
 items, coupon, setCoupon,
 addItem, removeItem, updateQty, clearCart,
 isInCart, getQty,
 subtotal, deliveryFee, tax, discount, total, count,
 }}>
 {children}
 </CartContext.Provider>
 );
}

export function useCart() { return useContext(CartContext); }