import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client.js';
import FoodCard from '../components/FoodCard.jsx';

const CATS = ['pizza','burger','chicken','noodles','biryani','wraps','fries','sandwich','shawarma','curry','desserts','icecream','beverages','salads'];
const QUICK = ['pizza','burger','biryani','chicken','desserts','noodles'];

export default function Menu() {
 const [searchParams] = useSearchParams();
 const [items, setItems] = useState([]);
 const [loading, setLoading] = useState(true);
 const [filters, setFilters] = useState({
 q: searchParams.get('q') || '',
 cat: searchParams.get('cat') || '',
 sort: 'popular',
 veg: false,
 maxPrice: 1000,
 });

 const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));

 const fetchItems = useCallback(async () => {
 setLoading(true);
 try {
 const p = new URLSearchParams();
 if (filters.q) p.set('search', filters.q);
 if (filters.cat) p.set('category', filters.cat);
 if (filters.veg) p.set('veg', 'true');
 if (filters.sort) p.set('sort', filters.sort);
 p.set('maxPrice', filters.maxPrice);
 const res = await api.get(`/menu?${p}`);
 setItems(res.data);
 } catch (err) { console.error(err); }
 finally { setLoading(false); }
 }, [filters]);

 useEffect(() => { fetchItems(); }, [fetchItems]);

 const catLabel = filters.cat
 ? filters.cat.charAt(0).toUpperCase() + filters.cat.slice(1)
 : 'All Items';

 return (
 <div className="menu-page section">
 <div className="container">
 <div className="menu-layout">

 {/* Sidebar */}
 <aside className="menu-sidebar">
 <div className="sidebar-section">
 <h4>Search</h4>
 <div className="sidebar-search">
 <i className="fas fa-search" />
 <input type="text" placeholder="Search dishes…" value={filters.q}
 onChange​={e => setFilter('q', e.target.value)} />
 </div>
 </div>

 <div className="sidebar-section">
 <h4>Category</h4>
 <ul className="cat-list">
 <li className={!filters.cat ? 'active' : ''} onClick​={() => setFilter('cat', '')}>All</li>
 {CATS.map(c => (
 <li key={c} className={filters.cat === c ? 'active' : ''} onClick​={() => setFilter('cat', c)}>
 {c.charAt(0).toUpperCase() + c.slice(1)}
 </li>
 ))}
 </ul>
 </div>

 <div className="sidebar-section">
 <h4>Sort By</h4>
 <select className="sidebar-select" value={filters.sort} onChange​={e => setFilter('sort', e.target.value)}>
 <option value="popular">Most Popular</option>
 <option value="rating">Highest Rated</option>
 <option value="price_asc">Price: Low → High</option>
 <option value="price_desc">Price: High → Low</option>
 </select>
 </div>

 <div className="sidebar-section">
 <h4>Dietary</h4>
 <label className="toggle-label">
 <span>Veg Only</span>
 <input type="checkbox" checked={filters.veg} onChange​={e => setFilter('veg', e.target.checked)} />
 </label>
 </div>

 <div className="sidebar-section">
 <h4>Max Price: ₹{filters.maxPrice}</h4>
 <input type="range" min="50" max="1000" step="50" value={filters.maxPrice}
 onChange​={e => setFilter('maxPrice', Number(e.target.value))} className="price-range" />
 </div>
 </aside>

 {/* Main */}
 <div className="menu-main">
 <div className="menu-top">
 <h2>{catLabel}</h2>
 <span className="results-count">{loading ? '…' : `${items.length} items`}</span>
 </div>

 <div className="filter-chips">
 {QUICK.map(c => (
 <button key={c}
 className={`chip${filters.cat === c ? ' active' : ''}`}
 onClick​={() => setFilter('cat', filters.cat === c ? '' : c)}>
 {c.charAt(0).toUpperCase() + c.slice(1)}
 </button>
 ))}
 </div>

 {loading ? (
 <div className="skeleton-grid">{[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}</div>
 ) : items.length === 0 ? (
 <div className="empty-state">
 <div className="empty-icon">🍽️</div>
 <h3>No items found</h3>
 <p>Try adjusting your filters or search query.</p>
 <button className="btn btn-primary"
 onClick​={() => setFilters({ q: '', cat: '', sort: 'popular', veg: false, maxPrice: 1000 })}>
 Clear Filters
 </button>
 </div>
 ) : (
 <div className="food-grid">
 {items.map(f => <FoodCard key={f._id} item={f} />)}
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 );
}