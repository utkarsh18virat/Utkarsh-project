import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

function strengthScore(pwd) {
 if (!pwd) return 0;
 let s = 0;
 if (pwd.length >= 8) s++;
 if (/[A-Z]/.test(pwd)) s++;
 if (/[0-9]/.test(pwd)) s++;
 if (/[^A-Za-z0-9]/.test(pwd)) s++;
 return s;
}
const LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const CLASSES = ['', 'weak', 'fair', 'good', 'strong'];

export default function AuthModal({ initialTab = 'signin', onClose }) {
 const [tab, setTab] = useState(initialTab);
 const [loading, setLoading] = useState(false);
 const { login, register } = useAuth();
 const { toast } = useToast();

 // Sign In
 const [siId, setSiId] = useState('');
 const [siPwd, setSiPwd] = useState('');
 const [siShow, setSiShow] = useState(false);

 // Sign Up
 const [suName, setSuName] = useState('');
 const [suId, setSuId] = useState('');
 const [suPwd, setSuPwd] = useState('');
 const [suConfirm, setSuConfirm] = useState('');
 const [suShow, setSuShow] = useState(false);

 const strength = strengthScore(suPwd);

 async function handleSignIn(e) {
 e.preventDefault();
 if (!siId || !siPwd) { toast.error('All fields required'); return; }
 setLoading(true);
 try {
 const data = await login(siId, siPwd);
 toast.success(`Welcome back, ${data.user.name}!`);
 onClose();
 } catch (err) {
 toast.error(err.response?.data?.message || 'Login failed');
 } finally { setLoading(false); }
 }

 async function handleSignUp(e) {
 e.preventDefault();
 if (!suName || !suId || !suPwd) { toast.error('All fields required'); return; }
 if (suPwd !== suConfirm) { toast.error('Passwords do not match'); return; }
 if (strength < 2) { toast.error('Password too weak'); return; }
 setLoading(true);
 const isEmail = suId.includes('@');
 try {
 const data = await register({ name: suName, ...(isEmail ? { email: suId } : { phone: suId }), password: suPwd });
 toast.success(`Welcome, ${data.user.name}!`);
 onClose();
 } catch (err) {
 toast.error(err.response?.data?.message || 'Registration failed');
 } finally { setLoading(false); }
 }

 return (
 <div className="auth-overlay" onClick​={onClose}>
 <div className="auth-modal" onClick​={e => e.stopPropagation()}>
 <button className="auth-close" onClick​={onClose} aria-label="Close"><i className="fas fa-times" /></button>
 <div className="auth-header">
 <div className="auth-logo">🍽️ UTKARSH KITCHEN</div>
 <p>{tab === 'signin' ? 'Welcome back! Sign in to continue.' : 'Create your account today.'}</p>
 </div>
 <div className="auth-tabs">
 <button className={`auth-tab${tab === 'signin' ? ' active' : ''}`} onClick​={() => setTab('signin')}>Sign In</button>
 <button className={`auth-tab${tab === 'signup' ? ' active' : ''}`} onClick​={() => setTab('signup')}>Create Account</button>
 </div>

 {tab === 'signin' ? (
 <form onSubmit​={handleSignIn} className="auth-form">
 <div className="form-group">
 <label>Email or Phone</label>
 <input type="text" placeholder="Enter email or phone" value={siId} onChange​={e => setSiId(e.target.value)} autoFocus />
 </div>
 <div className="form-group">
 <label>Password</label>
 <div className="pass-wrap">
 <input type={siShow ? 'text' : 'password'} placeholder="Enter password" value={siPwd} onChange​={e => setSiPwd(e.target.value)} />
 <button type="button" className="pass-toggle" onClick​={() => setSiShow(p => !p)}>
 <i className={`fas fa-eye${siShow ? '-slash' : ''}`} />
 </button>
 </div>
 </div>
 <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
 {loading ? <><i className="fas fa-spinner fa-spin" /> Signing in…</> : 'Sign In'}
 </button>
 <p className="auth-switch">Don't have an account? <button type="button" onClick​={() => setTab('signup')}>Create one</button></p>
 </form>
 ) : (
 <form onSubmit​={handleSignUp} className="auth-form">
 <div className="form-group">
 <label>Full Name</label>
 <input type="text" placeholder="Your full name" value={suName} onChange​={e => setSuName(e.target.value)} autoFocus />
 </div>
 <div className="form-group">
 <label>Email or Phone</label>
 <input type="text" placeholder="Email or 10-digit phone" value={suId} onChange​={e => setSuId(e.target.value)} />
 </div>
 <div className="form-group">
 <label>Password</label>
 <div className="pass-wrap">
 <input type={suShow ? 'text' : 'password'} placeholder="Create password" value={suPwd} onChange​={e => setSuPwd(e.target.value)} />
 <button type="button" className="pass-toggle" onClick​={() => setSuShow(p => !p)}>
 <i className={`fas fa-eye${suShow ? '-slash' : ''}`} />
 </button>
 </div>
 {suPwd && (
 <div className="pass-strength">
 <div className={`pass-strength-bar ${CLASSES[strength]}`}>
 <div className="pass-strength-fill" style={{ width: `${strength * 25}%` }} />
 </div>
 <span className={`strength-label ${CLASSES[strength]}`}>{LABELS[strength]}</span>
 </div>
 )}
 </div>
 <div className="form-group">
 <label>Confirm Password</label>
 <input type={suShow ? 'text' : 'password'} placeholder="Repeat password" value={suConfirm} onChange​={e => setSuConfirm(e.target.value)} />
 </div>
 <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
 {loading ? <><i className="fas fa-spinner fa-spin" /> Creating account…</> : 'Create Account'}
 </button>
 <p className="auth-switch">Already have an account? <button type="button" onClick​={() => setTab('signin')}>Sign in</button></p>
 </form>
 )}
 </div>
 </div>
 );
}