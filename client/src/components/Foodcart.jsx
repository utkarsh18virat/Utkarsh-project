import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const FALLBACK = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=260&fit=crop';

export default function FoodCard({ item }) {
 const { addItem, removeItem, isInCart, getQty, updateQty } = useCart();
 const { toast } = useToast();
 const qty = getQty(item._id);
 const inCart = isInCart(item._id);

 const handleAdd = () => {
 addItem(item);
 toast.success(`${item.name} added!`);
 };

 return (
 <div className="food-card">
 <div className="food-img-wrap">
 <img
 src={item.image || FALLBACK}
 alt={item.name}
 loading="lazy"
 onError​={e => { e.target.src = FALLBACK; }}
 />
 {item.badge && <span className="food-badge">{item.badge}</span>}
 <span className={`veg-dot ${item.isVeg ? 'veg' : 'nonveg'}`} title={item.isVeg ? 'Veg' : 'Non-Veg'} />
 </div>
 <div className="food-body">
 <div className="food-name">{item.name}</div>
 <div className="food-desc">{item.description}</div>
 <div className="food-meta">
 <span className="food-rating"><i className="fas fa-star" /> {item.rating}</span>
 {item.restaurant?.name && <span className="food-rest">{item.restaurant.name}</span>}
 </div>
 <div className="food-footer">
 <span className="food-price">₹{item.price}</span>
 {inCart ? (
 <div className="qty-control">
 <button onClick​={() => updateQty(item._id, qty - 1)} aria-label="Decrease quantity">−</button>
 <span>{qty}</span>
 <button onClick​={() => updateQty(item._id, qty + 1)} aria-label="Increase quantity">+</button>
 </div>
 ) : (
 <button className="add-btn" onClick​={handleAdd}>
 <i className="fas fa-plus" /> Add
 </button>
 )}
 </div>
 </div>
 </div>
 );
}