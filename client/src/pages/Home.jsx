import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client.js';
import RestCard from '../components/RestCard.jsx';
import FoodCard from '../components/FoodCard.jsx';

const CATEGORIES = [
 { id: 'pizza', name: 'Pizza', emoji: '🍕', gradient: 'linear-gradient(135deg,hashtag#ff6b6b,hashtag#ee5a24)' },
 { id: 'burger', name: 'Burger', emoji: '🍔', gradient: 'linear-gradient(135deg,hashtag#f9ca24,hashtag#f0932b)' },
 { id: 'chicken', name: 'Fried Chicken', emoji: '🍗', gradient: 'linear-gradient(135deg,hashtag#ffbe76,hashtag#e55039)' },
 { id: 'noodles', name: 'Noodles', emoji: '🍜', gradient: 'linear-gradient(135deg,hashtag#badc58,hashtag#6ab04c)' },
 { id: 'biryani', name: 'Biryani', emoji: '🍚', gradient: 'linear-gradient(135deg,hashtag#f9ca24,hashtag#c0392b)' },
 { id: 'wraps', name: 'Wraps', emoji: '🌮', gradient: 'linear-gradient(135deg,hashtag#55efc4,hashtag#00b894)' },
 { id: 'desserts', name: 'Desserts', emoji: '🍰', gradient: 'linear-gradient(135deg,hashtag#fd79a8,hashtag#a29bfe)' },
 { id: 'icecream', name: 'Ice Cream', emoji: '🍦', gradient: 'linear-gradient(135deg,hashtag#74b9ff,hashtag#0984e3)' },
];

const HOW_STEPS = [
 { step: '01', icon: '📍', title: 'Set Your Location', desc: 'Enter your delivery address to discover restaurants near you.' },
 { step: '02', icon: '🍽️', title: 'Choose Your Meal', desc: 'Browse menus, read reviews and pick your favourite dishes.' },
 { step: '03', icon: '💳', title: 'Pay Securely', desc: 'Multiple payment options including UPI, cards and COD.' },
 { step: '04', icon: '🛵', title: 'Fast Delivery', desc: 'Track your order live and receive it hot at your doorstep.' },
];

export default function Home() {
 const [restaurants, setRestaurants] = useState([]);
 const [popular, setPopular] = useState([]);
 const [loading, setLoading] = useState(true);
 const [search, setSearch] = useState('');
 const navigate = useNavigate();

 useEffect(() => {
 Promise.all([
 api.get('/restaurants?featured=true'),
 api.get('/menu?sort=popular'),
 ]).then(([rRes, mRes]) => {
 setRestaurants(rRes.data);
 setPopular(mRes.data.slice(0, 8));
 }).catch(console.error)
 .finally(() => setLoading(false));
 }, []);

 const handleSearch = e => {
 e.preventDefault();
 if (search.trim()) navigate(`/menu?q=${encodeURIComponent(search.trim())}`);
 };

 return (
 <>
 {/* ── Hero ── */}
 <section className="hero">
 <div className="container">
 <div className="hero-content">
 <h1 className="hero-title">
 Craving Something <span className="gradient-text">Delicious?</span>
 </h1>
 <p className="hero-sub">
 Order from 500+ restaurants and get it delivered hot to your door in under 30 minutes.
 </p>
 <form className="hero-search" onSubmit​={handleSearch}>
 <i className="fas fa-search" />
 <input
 type="text"
 value={search}
 onChange​={e => setSearch(e.target.value)}
 placeholder="Search for food, cuisine, or restaurants…"
 aria-label="Search"
 />
 <button type="submit" className="btn btn-primary">Search</button>
 </form>
 <div className="hero-stats">
 {[['500+', 'Restaurants'], ['30 min', 'Avg Delivery'], ['100%', 'Fresh Food'], ['24/7', 'Support']].map(([n, l]) => (
 <div key={l} className="stat"><strong>{n}</strong><span>{l}</span></div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* ── Categories ── */}
 <section className="section" style={{ paddingBottom: 0 }}>
 <div className="container">
 <div className="section-header">
 <span className="eyebrow">Browse by Category</span>
 <h2>What are you craving?</h2>
 </div>
 <div className="categories-grid">
 {CATEGORIES.map(c => (
 <Link key={c.id} to={`/menu?cat=${c.id}`} className="cat-card" style={{ background: c.gradient }}>
 <div className="cat-emoji">{c.emoji}</div>
 <div className="cat-name">{c.name}</div>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* ── Featured Restaurants ── */}
 <section className="section">
 <div className="container">
 <div className="section-header flex-between">
 <div>
 <span className="eyebrow">Hand Picked for You</span>
 <h2>Featured Restaurants</h2>
 </div>
 <Link to="/restaurants" className="btn btn-outline btn-sm">View All <i className="fas fa-arrow-right" /></Link>
 </div>
 {loading ? (
 <div className="skeleton-grid">{[...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}</div>
 ) : (
 <div className="restaurant-grid">
 {restaurants.map(r => <RestCard key={r._id} restaurant={r} />)}
 </div>
 )}
 </div>
 </section>

 {/* ── Popular Dishes ── */}
 <section className="section" style={{ background: 'var(--bg-alt)' }}>
 <div className="container">
 <div className="section-header flex-between">
 <div>
 <span className="eyebrow">Most Loved</span>
 <h2>Popular Dishes</h2>
 </div>
 <Link to="/menu" className="btn btn-outline btn-sm">See All <i className="fas fa-arrow-right" /></Link>
 </div>
 {loading ? (
 <div className="skeleton-grid">{[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}</div>
 ) : (
 <div className="food-grid">
 {popular.map(f => <FoodCard key={f._id} item={f} />)}
 </div>
 )}
 </div>
 </section>

 {/* ── How It Works ── */}
 <section className="section">
 <div className="container">
 <div className="section-header text-center">
 <span className="eyebrow">Simple Steps</span>
 <h2>How UTKARSH KITCHEN Works</h2>
 </div>
 <div className="how-grid">
 {HOW_STEPS.map(h => (
 <div key={h.step} className="how-card">
 <div className="how-step">{h.step}</div>
 <div className="how-icon">{h.icon}</div>
 <h4>{h.title}</h4>
 <p>{h.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 </>
 );
}