import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
 const [toasts, setToasts] = useState([]);

 const add = useCallback((message, type = 'info') => {
 const id = Date.now() + Math.random();
 setToasts(prev => [...prev, { id, message, type }]);
 setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
 }, []);

 const toast = {
 success: msg => add(msg, 'success'),
 error: msg => add(msg, 'error'),
 info: msg => add(msg, 'info'),
 warning: msg => add(msg, 'warning'),
 };

 return (
 <ToastContext.Provider value={{ toasts, toast }}>
 {children}
 </ToastContext.Provider>
 );
}

export function useToast() { return useContext(ToastContext); }