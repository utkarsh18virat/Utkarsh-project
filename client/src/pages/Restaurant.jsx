import { useState, useEffect } from 'react';
import api from '../api/client.js';
import RestCard from '../components/RestCard.jsx';

export default function Restaurants() {
 const [restaurants, setRestaurants] = useState([]);
 const [loading, setLoading] = useState(true);
 const [search, setSearch] = useState('');
 const [cuisine, setCuisine] = useState('');

 useEffect(() => {
 api.get('/restaurants')
 .then(r => setRestaurants(r.data))
 .catch(console.error)
 .finally(() => setLoading(false));
 }, []);

 const cuisines = [...new Set(restaurants.flatMap(r => r.cuisine))];

 const filtered = restaurants.filter(r => {
 const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
 const matchCuisine = !cuisine || r.cuisine.includes(cuisine);
 return matchSearch && matchCuisine;
 });

 return (
 <div className="section">
 <div className="container">
 <div className="section-header">
 <span className="eyebrow">Explore</span>
 <h2>All Restaurants</h2>
 </div>

 <div className="rest-filters">
 <div className="rest-search">
 <i className="fas fa-search" />
 <input type="text" placeholder="Search restaurants…" value={search} onChange​={e => setSearch(e.target.value)} />
 </div>
 <div className="cuisine-chips">
 <button className={`chip${!cuisine ? ' active' : ''}`} onClick​={() => setCuisine('')}>All</button>
 {cuisines.map(c => (
 <button key={c} className={`chip${cuisine === c ? ' active' : ''}`} onClick​={() => setCuisine(c)}>{c}</button>
 ))}
 </div>
 </div>

 {loading ? (
 <div className="skeleton-grid">{[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}</div>
 ) : filtered.length === 0 ? (
 <div className="empty-state">
 <div className="empty-icon">🏪</div>
 <h3>No restaurants found</h3>
 <button className="btn btn-primary" onClick​={() => { setSearch(''); setCuisine(''); }}>Clear Filters</button>
 </div>
 ) : (
 <div className="restaurant-grid">
 {filtered.map(r => <RestCard key={r._id} restaurant={r} />)}
 </div>
 )}
 </div>
 </div>
 );
}