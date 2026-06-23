import { Link } from 'react-router-dom';

export default function NotFound() {
 return (
 <div className="section">
 <div className="container">
 <div className="empty-state" style={{ paddingTop: '80px' }}>
 <div className="empty-icon" style={{ fontSize: '5rem', lineHeight: 1 }}>404</div>
 <h2>Page Not Found</h2>
 <p>The page you're looking for doesn't exist.</p>
 <Link to="/" className="btn btn-primary">Back to Home</Link>
 </div>
 </div>
 </div>
 );
}