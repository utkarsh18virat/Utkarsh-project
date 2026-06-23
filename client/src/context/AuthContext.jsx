import { createContext, useContext, useState } from 'react';
import api from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
 const [user, setUser] = useState(() => {
 try { return JSON.parse(localStorage.getItem('uk_user')); } catch { return null; }
 });

 async function register({ name, email, phone, password }) {
 const res = await api.post('/auth/register', { name, email, phone, password });
 localStorage.setItem('uk_token', res.data.token);
 localStorage.setItem('uk_user', JSON.stringify(res.data.user));
 setUser(res.data.user);
 return res.data;
 }

 async function login(identifier, password) {
 const res = await api.post('/auth/login', { identifier, password });
 localStorage.setItem('uk_token', res.data.token);
 localStorage.setItem('uk_user', JSON.stringify(res.data.user));
 setUser(res.data.user);
 return res.data;
 }

 function logout() {
 localStorage.removeItem('uk_token');
 localStorage.removeItem('uk_user');
 setUser(null);
 }

 return (
 <AuthContext.Provider value={{ user, register, login, logout }}>
 {children}
 </AuthContext.Provider>
 );
}

export function useAuth() { return useContext(AuthContext); }