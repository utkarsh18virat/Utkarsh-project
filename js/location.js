window.LocationManager = (() => {

 const CACHE_KEY = 'uk_location';
 const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

 /* ── Haversine formula — distance in km between two lat/lng points ── */
 function calcDistance(lat1, lng1, lat2, lng2) {
 const R = 6371; // Earth radius in km
 const dLat = (lat2 - lat1) * Math.PI / 180;
 const dLng = (lng2 - lng1) * Math.PI / 180;
 const a = Math.sin(dLat / 2) ** 2
 + Math.cos(lat1 * Math.PI / 180)
 * Math.cos(lat2 * Math.PI / 180)
 * Math.sin(dLng / 2) ** 2;
 return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1));
 }

 /* ── Format distance for display ── */
 function fmtDistance(km) {
 if (km < 1) return (km * 1000).toFixed(0) + ' m away';
 return km.toFixed(1) + ' km away';
 }

 /* ── Cache helpers ── */
 function getCache() {
 try {
 const c = JSON.parse(localStorage.getItem(CACHE_KEY));
 if (c && Date.now() - c.ts < CACHE_TTL_MS) return c;
 } catch { /* ignore */ }
 return null;
 }
 function saveCache(data) {
 localStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, ts: Date.now() }));
 }
 function clearCache() {
 localStorage.removeItem(CACHE_KEY);
 }

 /* ── Reverse geocode via OpenStreetMap Nominatim (free, no key) ── */
 async function reverseGeocode(lat, lng) {
 try {
 const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
 const res = await fetch(url, {
 headers: { 'Accept-Language': 'en-US,en', 'User-Agent': 'UtkarshKitchenApp/1.0' }
 });
 if (!res.ok) throw new Error('Nominatim error');
 const data = await res.json();
 const a = data.address || {};

 const suburb = a.suburb || a.neighbourhood || a.quarter || '';
 const city = a.city || a.town || a.village || a.county || 'Your City';
 const state = a.state || '';
 const display = suburb ? `${suburb}, ${city}` : city;

 return { suburb, city, state, display, fullDisplay: data.display_name || display };
 } catch {
 return { suburb: '', city: 'Your City', state: '', display: 'Your Location', fullDisplay: 'Your Location' };
 }
 }

 /* ── Get user coordinates via browser Geolocation API ── */
 function getCoords() {
 return new Promise((resolve, reject) => {
 if (!navigator.geolocation) {
 reject(new Error('Geolocation is not supported by your browser.'));
 return;
 }
 navigator.geolocation.getCurrentPosition(
 pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
 err => {
 const msgs = {
 1: 'Location permission was denied. Please allow access in your browser settings.',
 2: 'Unable to determine your location. Please try again.',
 3: 'Location request timed out. Please try again.',
 };
 reject(new Error(msgs[err.code] || 'Location error.'));
 },
 { timeout: 12000, maximumAge: 60000, enableHighAccuracy: false }
 );
 });
 }

 /* ── Main detect function ── */
 async function detect() {
 // Check cache first
 const cached = getCache();
 if (cached) return cached;

 const coords = await getCoords();
 const geo = await reverseGeocode(coords.lat, coords.lng);
 const result = { ...coords, ...geo };
 saveCache(result);
 return result;
 }

 /* ── Enrich restaurants with distance from user location ── */
 function enrichWithDistance(restaurants, userLat, userLng) {
 return restaurants
 .map(r => ({
 ...r,
 distanceKm: r.lat && r.lng ? calcDistance(userLat, userLng, r.lat, r.lng) : null,
 distanceStr: r.lat && r.lng ? fmtDistance(calcDistance(userLat, userLng, r.lat, r.lng)) : null,
 }))
 .sort((a, b) => {
 if (a.distanceKm === null) return 1;
 if (b.distanceKm === null) return -1;
 return a.distanceKm - b.distanceKm;
 });
 }

 /* ── Update all location-aware UI elements on the page ── */
 function updateUI(locationData) {
 // Update location button text in navbar
 document.querySelectorAll('.location-display').forEach(el => {
 el.textContent = locationData.display;
 });
 document.querySelectorAll('.location-city').forEach(el => {
 el.textContent = locationData.city;
 });
 // Show nearby section if it exists
 const nearbySection = document.getElementById('nearbySection');
 if (nearbySection) nearbySection.style.display = 'block';
 }

 return {
 detect,
 getCache,
 clearCache,
 calcDistance,
 fmtDistance,
 enrichWithDistance,
 updateUI,
 };
})();