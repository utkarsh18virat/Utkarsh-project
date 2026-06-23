import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client.js';
import FoodCard from '../components/FoodCard.jsx';

export default function RestaurantDetail() {
 const { id } = useParams();
 const [restaurant, setRestaurant] = useState(null);
 const [menu, setMenu] = useState([]);
 const [loading, setLoading] = useState(true);
 const [activeTab, setActiveTab] = useState('menu');

 useEffect(() => {
 Promise.all([
 api.get(`/restaurants/${id}`),
 api.get(`/menu?restaurant=${id}`),
 ]).then(([rRes, mRes]) => {
 setRestaurant(rRes.data);
 setMenu(mRes.data);
 }).catch(console.error)
 .finally(() => setLoading(false));
 }, [id]);

 if (loading) return (
 <div className="loading-screen">
 <div className="spinner" />
 </div>
 );

 if (!restaurant) return (
 <div className="section"><div className="container">
 <div className="empty-state"><div className="empty-icon">🏪</div><h3>Restaurant not found</h3><Link to="/restaurants" className="btn btn-primary">Back to Restaurants</Link></div>
 </div></div>
 );

 const categories = [...new Set(menu.map(i => i.category))];

 return (
 <div>
 {/* Cover */}
 <div className="rest-cover" style={{ backgroundImage: `url(${restaurant.cover})` }}>
 <div className="rest-cover-overlay">
 <div className="container">
 <Link to="/restaurants" className="back-btn"><i className="fas fa-arrow-left" /> All Restaurants</Link>
 </div>
 </div>
 </div>

 <div className="container">
 {/* Header */}
 <div className="rest-detail-header">
 <img src={restaurant.logo} alt={restaurant.name} className="rest-detail-logo" />
 <div className="rest-detail-info">
 <h1>{restaurant.name}</h1>
 <div className="rest-meta">
 <span className="rating"><i className="fas fa-star" /> {restaurant.rating} ({restaurant.reviews?.toLocaleString()} reviews)</span>
 <span><i className="far fa-clock" /> {restaurant.deliveryTime}</span>
 <span><i className="fas fa-map-marker-alt" /> {restaurant.address}</span>
 </div>
 <div className="rest-tags">
 {restaurant.cuisine?.map(c => <span key={c} className="tag">{c}</span>)}
 </div>
 </div>
 <div>
 {restaurant.isOpen
 ? <span className="badge badge-open">Open Now</span>
 : <span className="badge badge-closed">Closed</span>}
 </div>
 </div>

 {/* Tabs */}
 <div className="detail-tabs">
 {['menu', 'info'].map(t => (
 <button key={t} className={`detail-tab${activeTab === t ? ' active' : ''}`} onClick​={() => setActiveTab(t)}>
 {t.charAt(0).toUpperCase() + t.slice(1)}
 </button>
 ))}
 </div>

 {activeTab === 'menu' && (
 <div className="rest-menu-section">
 {categories.length === 0 ? (
 <div className="empty-state"><div className="empty-icon">🍽️</div><h3>Menu coming soon</h3></div>
 ) : categories.map(cat => (
 <div key={cat} className="menu-category">
 <h3 className="cat-heading">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
 <div className="food-grid">
 {menu.filter(i => i.category === cat).map(f => <FoodCard key={f._id} item={f} />)}
 </div>
 </div>
 ))}
 </div>
 )}

 {activeTab === 'info' && (
 <div className="rest-info-section">
 <div className="info-grid">
 {[
 { icon: 'fa-clock', title: 'Hours', val: restaurant.openHours },
 { icon: 'fa-motorcycle', title: 'Delivery', val: restaurant.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant.deliveryFee}` },
 { icon: 'fa-shopping-bag', title: 'Min Order', val: `₹${restaurant.minOrder}` },
 { icon: 'fa-map-marker-alt',title: 'Address', val: restaurant.address },
 ].map(info => (
 <div key={info.title} className="info-card">
 <i className={`fas ${info.icon}`} />
 <div><strong>{info.title}</strong><p>{info.val}</p></div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 );
}