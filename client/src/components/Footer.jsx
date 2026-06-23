import { Link } from 'react-router-dom';

const NAV_LINKS = [
 { to: '/', label: 'Home' },
 { to: '/menu', label: 'Menu' },
 { to: '/restaurants', label: 'Restaurants' },
 { to: '/cart', label: 'My Cart' },
];

export default function Footer() {
 return (
 <footer className="footer">
 <div className="container">
 <div className="footer-grid">
 <div className="footer-col footer-brand">
 <div className="footer-logo">🍽️ UTKARSH KITCHEN</div>
 <p>Delivering happiness to your doorstep. Fresh food, fast service, every time.</p>
 <div className="footer-social">
 {['instagram', 'twitter', 'facebook', 'youtube'].map(s => (
 <a key={s} href="#" aria-label={s}><i className={`fab fa-${s}`} /></a>
 ))}
 </div>
 </div>

 <div className="footer-col">
 <h4>Quick Links</h4>
 <ul>{NAV_LINKS.map(l => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
 </div>

 <div className="footer-col">
 <h4>Support</h4>
 <ul>
 {['Help Centre', 'Track Order', 'Refund Policy', 'Partner with Us', 'Delivery Partner'].map(s => (
 <li key={s}><a href="#">{s}</a></li>
 ))}
 </ul>
 </div>

 <div className="footer-col">
 <h4>Get the App</h4>
 <div className="footer-app">
 {[{ icon: 'fa-apple', sub: 'Download on', name: 'App Store' },
 { icon: 'fa-google-play', sub: 'Get it on', name: 'Google Play' }].map(a => (
 <a key={a.name} href="#" className="app-btn">
 <i className={`fab ${a.icon}`} />
 <div className="app-btn-text">
 <div className="sub">{a.sub}</div>
 <div className="name">{a.name}</div>
 </div>
 </a>
 ))}
 </div>
 </div>
 </div>
 <div className="footer-bottom">
 <p>© {new Date().getFullYear()} UTKARSH KITCHEN. All rights reserved.</p>
 </div>
 </div>
 </footer>
 );
}