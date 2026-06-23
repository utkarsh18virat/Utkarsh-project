import { Link } from 'react-router-dom';

export default function RestCard({ restaurant: r, distStr }) {
 return (
 <Link to={`/restaurant/${r._id}`} className="rest-card">
 <div className="rest-img-wrap">
 <img
 src={r.cover}
 alt={r.name}
 loading="lazy"
 onError​={e => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop'; }}
 />
 {r.tags?.[0] && <span className="rest-badge">{r.tags[0]}</span>}
 {distStr && (
 <div className="dist-badge near">
 <i className="fas fa-map-marker-alt" /> {distStr}
 </div>
 )}
 {!r.isOpen && <div className="rest-closed-overlay">Closed</div>}
 <div className="rest-logo">
 <img src={r.logo} alt={`${r.name} logo`} loading="lazy" />
 </div>
 </div>
 <div className="rest-body">
 <div className="rest-name">{r.name}</div>
 <div className="rest-meta">
 <span className="rating"><i className="fas fa-star" /> {r.rating} ({r.reviews?.toLocaleString()})</span>
 <span><i className="far fa-clock" /> {r.deliveryTime}</span>
 </div>
 <div className="rest-tags">
 {r.cuisine?.map(c => <span key={c} className="tag">{c}</span>)}
 </div>
 </div>
 <div className="rest-footer">
 <div className="delivery-info">
 Delivery: {r.deliveryFee === 0 ? <span className="free">Free</span> : `₹${r.deliveryFee}`}
 </div>
 <span className="order-btn">Order Now</span>
 </div>
 </Link>
 );
}