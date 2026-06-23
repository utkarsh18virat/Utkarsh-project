import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import AuthModal from './AuthModal.jsx';

export default function Navbar() {
 const { user, logout } = useAuth();
 const { count } = useCart();
 const { toast } = useToast();
 const navigate = useNavigate();
 const location = useLocation();

 const [theme, setTheme] = useState(() => localStorage.getItem('uk_theme') || 'dark');
 const [scrolled, setScrolled] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);
 const [showAuth, setShowAuth] = useState(false);
 const [authTab, setAuthTab] = useState('signin');
 const [userMenuOpen, setUserMenu] = useState(false);
 const [search, setSearch] = useState('');

 useEffect(() => {
 document.documentElement.setAttribute('data-theme', theme);
 localStorage.setItem('uk_theme', theme);
 }, [theme]);

 useEffect(() => {
 const onScroll ​= () => setScrolled(window.scrollY > 10);
 window.addEventListener('scroll', onScroll);
 return () => window.removeEventListener('scroll', onScroll);
 }, []);

 // Close mobile nav on route change
 useEffect(() => { setMobileOpen(false); setUserMenu(false); }, [location.pathname]);

 const handleSearch = e => {
 e.preventDefault();
 if (search.trim()) { navigate(`/menu?q=${encodeURIComponent(search.trim())}`); setSearch(''); }
 };

 const openSignIn = () => { setAuthTab('signin'); setShowAuth(true); };
 const openSignUp = () => { setAuthTab('signup'); setShowAuth(true); };

 const handleLogout = () => {
 logout();
 toast.info('Signed out successfully');
 setUserMenu(false);
 };

 return (
 <>
 <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
 <div className="container">
 <div className="nav-inner">
 <Link to="/" className="nav-logo">
 <span className="logo-icon">🍽️</span>
 <span>UTKARSH KITCHEN</span>
 </Link>

 <ul className="nav-links">
 <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
 <li><Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>Menu</Link></li>
 <li><Link to="/restaurants" className={location.pathname === '/restaurants' ? 'active' : ''}>Restaurants</Link></li>
 <li><Link to="/menu?cat=offers">Offers</Link></li>
 </ul>

 <form className="nav-search" onSubmit​={handleSearch}>
 <i className="fas fa-search" />
 <input value={search} onChange​={e => setSearch(e.target.value)} placeholder="Search dishes…" aria-label="Search" />
 </form>

 <div className="nav-actions">
 <button className="btn-theme" onClick​={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
 <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`} />
 </button>

 <Link to="/cart" className="cart-btn" aria-label="Cart">
 <i className="fas fa-shopping-bag" />
 {count > 0 && <span className="cart-count">{count}</span>}
 </Link>

 {user ? (
 <div className="user-menu-wrap">
 <button className="user-menu-btn" onClick​={() => setUserMenu(p => !p)}>
 <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
 <span className="user-name-short">{user.name.split(' ')[0]}</span>
 <i className="fas fa-chevron-down" style={{ fontSize: '0.6rem' }} />
 </button>
 {userMenuOpen && (
 <div className="user-dropdown" onMouseLeave​={() => setUserMenu(false)}>
 <p className="user-dropdown-name">{user.name}</p>
 <Link to="/orders"><i className="fas fa-box" /> My Orders</Link>
 <button onClick​={handleLogout}><i className="fas fa-sign-out-alt" /> Sign Out</button>
 </div>
 )}
 </div>
 ) : (
 <button className="btn-login" onClick​={openSignIn}>Sign In</button>
 )}

 <button className="nav-hamburger" onClick​={() => setMobileOpen(p => !p)} aria-label="Menu" aria-expanded={mobileOpen}>
 <span /><span /><span />
 </button>
 </div>
 </div>
 </div>
 </nav>

 {/* Mobile Nav */}
 {mobileOpen && (
 <div className="mobile-nav">
 <form className="mobile-nav-search" onSubmit​={handleSearch}>
 <i className="fas fa-search" />
 <input value={search} onChange​={e => setSearch(e.target.value)} placeholder="Search food or restaurants…" />
 </form>
 <ul className="mobile-nav-links">
 <li><Link to="/">Home</Link></li>
 <li><Link to="/menu">Menu</Link></li>
 <li><Link to="/restaurants">Restaurants</Link></li>
 <li><Link to="/menu?cat=offers">Offers</Link></li>
 <li><Link to="/cart">Cart {count > 0 && `(${count})`}</Link></li>
 </ul>
 {!user ? (
 <div className="mobile-auth-btns">
 <button className="btn btn-primary" onClick​={() => { openSignIn(); setMobileOpen(false); }}>Sign In</button>
 <button className="btn btn-outline" onClick​={() => { openSignUp(); setMobileOpen(false); }}>Create Account</button>
 </div>
 ) : (
 <div className="mobile-auth-btns">
 <button className="btn btn-outline" onClick​={() => { handleLogout(); setMobileOpen(false); }}>Sign Out</button>
 </div>
 )}
 </div>
 )}

 {showAuth && <AuthModal initialTab={authTab} onClose​={() => setShowAuth(false)} />}
 </>
 );
}