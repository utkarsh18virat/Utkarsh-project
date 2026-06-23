const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const fmt = n => '₹' + n.toLocaleString('en-IN');

/* ============================================================
 THEME MANAGER
 ============================================================ */
window.Theme = (() => {
 const KEY = 'uk_theme';
 const get = () => localStorage.getItem(KEY) || 'light';
 const set = theme => {
 document.documentElement.setAttribute('data-theme', theme);
 localStorage.setItem(KEY, theme);
 $$('.btn-theme i').forEach(i => {
 i.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
 });
 };
 const toggle = () => set(get() === 'dark' ? 'light' : 'dark');
 const init = () => set(get());
 return { get, set, toggle, init };
})();

/* ============================================================
 TOAST NOTIFICATIONS
 ============================================================ */
window.Toast = (() => {
 let container;
 function _ensure() {
 if (!container) {
 container = document.createElement('div');
 container.className = 'toast-container';
 document.body.appendChild(container);
 }
 }
 function show(type, title, msg = '', duration = 3500) {
 _ensure();
 const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
 const el = document.createElement('div');
 el.className = `toast toast-${type}`;
 el.innerHTML = `
 <i class="fas ${icons[type] || icons.info} toast-icon"></i>
 <div class="toast-body"><div class="title">${title}</div>${msg ? `<div class="msg">${msg}</div>` : ''}</div>
 <button class="toast-close" aria-label="Close"><i class="fas fa-times"></i></button>`;
 container.appendChild(el);
 el.querySelector('.toast-close').addEventListener('click', () => dismiss(el));
 setTimeout(() => dismiss(el), duration);
 }
 function dismiss(el) {
 el.classList.add('removing');
 el.addEventListener('animationend', () => el.remove());
 }
 return {
 success: (t, m, d) => show('success', t, m, d),
 error: (t, m, d) => show('error', t, m, d),
 info: (t, m, d) => show('info', t, m, d),
 warning: (t, m, d) => show('warning', t, m, d),
 };
})();

/* ============================================================
 NAVBAR
 ============================================================ */
window.Navbar = (() => {
 function init() {
 // Sticky scroll
 window.addEventListener('scroll', () => {
 const nav = $('.navbar');
 if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
 }, { passive: true });

 // Hamburger / mobile nav
 const hamburger = $('.nav-hamburger');
 const mobileNav = $('.mobile-nav');
 if (hamburger && mobileNav) {
 hamburger.addEventListener('click', () => {
 mobileNav.classList.toggle('open');
 const open = mobileNav.classList.contains('open');
 hamburger.setAttribute('aria-expanded', open);
 });
 document.addEventListener('click', e => {
 if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
 mobileNav.classList.remove('open');
 }
 });
 }

 // Theme toggles
 $$('.btn-theme').forEach(btn => btn.addEventListener('click', () => Theme.toggle()));

 // Cart button count
 updateCartBadge();
 Cart.onUpdate(updateCartBadge);

 // Nav search
 const navSearch = $('.nav-search input');
 if (navSearch) {
 navSearch.addEventListener('keydown', e => {
 if (e.key === 'Enter' && navSearch.value.trim()) {
 window.location.href = `menu.html?q=${encodeURIComponent(navSearch.value.trim())}`;
 }
 });
 }

 // Active link highlight
 const path = location.pathname.split('/').pop() || 'index.html';
 $$('.nav-links a, .mobile-nav a').forEach(a => {
 if (a.getAttribute('href') === path) a.classList.add('active');
 });
 }

 function updateCartBadge() {
 const count = Cart.getTotalCount();
 $$('.cart-count').forEach(el => {
 el.textContent = count;
 el.style.display = count > 0 ? 'flex' : 'none';
 });
 }

 return { init, updateCartBadge };
})();

/* ============================================================
 FOOD CARD RENDERER
 ============================================================ */
window.renderFoodCard = function(item, opts = {}) {
 const rest = AppData.getRestaurant(item.restaurantId);
 const inCart = Cart.isInCart(item.id);
 const qty = inCart ? Cart.getItemById(item.id)?.qty || 0 : 0;
 const wishlisted = Cart.isWishlisted(item.id);
 const discountPct = item.discount > 0 ? `-${item.discount}%` : '';

 return `
 <div class="food-card" data-id="${item.id}" data-category="${item.category}">
 <div class="food-img-wrap">
 <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=400&fit=crop'">
 ${item.discount > 0 ? `<span class="food-discount">${discountPct} OFF</span>` : ''}
 <button class="food-wish ${wishlisted ? 'active' : ''}" data-wish="${item.id}" aria-label="Wishlist">
 <i class="fa${wishlisted ? 's' : 'r'} fa-heart"></i>
 </button>
 </div>
 <div class="food-body">
 <div class="food-badges">
 <span class="badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}">
 <i class="fas fa-circle" style="font-size:0.5rem"></i> ${item.isVeg ? 'Veg' : 'Non-Veg'}
 </span>
 ${item.isNew ? '<span class="badge badge-new">New</span>' : ''}
 </div>
 <div class="food-name" title="${item.name}">${item.name}</div>
 <div class="food-rest"><i class="fas fa-store"></i> ${rest.name || 'Unknown'}</div>
 <div class="food-desc">${item.desc}</div>
 <div class="food-meta">
 <span class="rating"><i class="fas fa-star"></i> ${item.rating}</span>
 <span><i class="far fa-clock"></i> ${item.prepTime}</span>
 <span><i class="fas fa-fire" style="color: #e63946;font-size:.7rem"></i> ${item.reviews} reviews</span>
 </div>
 <div class="food-footer">
 <div class="food-price">
 ${fmt(item.price)}
 ${item.originalPrice ? `<span class="original">${fmt(item.originalPrice)}</span>` : ''}
 </div>
 ${inCart
 ? `<div class="qty-ctrl" data-qty="${item.id}">
 <button class="qty-minus" data-id="${item.id}">−</button>
 <span class="qty-num">${qty}</span>
 <button class="qty-plus" data-id="${item.id}">+</button>
 </div>`
 : `<button class="add-cart-btn" data-add="${item.id}">
 <i class="fas fa-plus"></i> Add
 </button>`
 }
 </div>
 </div>
 </div>`;
};

window.renderRestCard = function(rest, opts = {}) {
 const distBadge = opts.distStr
 ? `<div class="dist-badge ${opts.distanceKm < 5 ? 'near' : 'far'}"><i class="fas fa-map-marker-alt"></i>${opts.distStr}</div>`
 : '';
 return `
 <a href="restaurant.html?id=${rest.id}" class="rest-card">
 <div class="rest-img-wrap">
 <img src="${rest.cover}" alt="${rest.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop'">
 ${rest.tags[0] ? `<span class="rest-badge">${rest.tags[0]}</span>` : ''}
 <button class="rest-fav" aria-label="Favourite" onclick="event.preventDefault()">
 <i class="far fa-heart"></i>
 </button>
 ${distBadge}
 <div class="rest-logo"><img src="${rest.logo}" alt="${rest.name} logo" loading="lazy"></div>
 </div>
 <div class="rest-body">
 <div class="rest-name">${rest.name}</div>
 <div class="rest-meta">
 <span class="rating"><i class="fas fa-star"></i> ${rest.rating} (${rest.reviews.toLocaleString()})</span>
 <span><i class="far fa-clock"></i> ${rest.deliveryTime}</span>
 <span><i class="fas fa-map-marker-alt"></i> ${rest.address.split(',')[0]}</span>
 </div>
 <div class="rest-tags">
 ${rest.cuisine.map(c => `<span class="tag">${c}</span>`).join('')}
 </div>
 </div>
 <div class="rest-footer">
 <div class="delivery-info">
 Delivery: ${rest.deliveryFee === 0 ? '<span>Free</span>' : fmt(rest.deliveryFee)}
 </div>
 <button class="order-btn">Order Now</button>
 </div>
 </a>`;
};

/* ============================================================
 BIND FOOD CARD EVENTS (call after inserting cards into DOM)
 ============================================================ */
window.bindFoodCardEvents = function(container) {
 if (!container) return;

 // Add to cart
 container.addEventListener('click', e => {
 const addBtn = e.target.closest('[data-add]');
 if (addBtn) {
 const id = addBtn.dataset.add;
 const item = AppData.foodItems.find(f => f.id === id);
 if (!item) return;
 Cart.addItem(item);
 Toast.success('Added to Cart!', `${item.name} added`, 2500);
 refreshCard(container, id);
 }

 // Qty +
 const plusBtn = e.target.closest('.qty-plus');
 if (plusBtn) {
 const id = plusBtn.dataset.id;
 const cur = Cart.getItemById(id)?.qty || 0;
 Cart.updateQty(id, cur + 1);
 refreshCard(container, id);
 }

 // Qty −
 const minusBtn = e.target.closest('.qty-minus');
 if (minusBtn) {
 const id = minusBtn.dataset.id;
 const cur = Cart.getItemById(id)?.qty || 0;
 Cart.updateQty(id, cur - 1);
 if (cur - 1 <= 0) Toast.info('Removed', 'Item removed from cart', 2000);
 refreshCard(container, id);
 }

 // Wishlist
 const wishBtn = e.target.closest('[data-wish]');
 if (wishBtn) {
 const id = wishBtn.dataset.wish;
 const added = Cart.toggleWish(id);
 const item = AppData.foodItems.find(f => f.id === id);
 wishBtn.innerHTML = `<i class="fa${added ? 's' : 'r'} fa-heart"></i>`;
 wishBtn.classList.toggle('active', added);
 Toast[added ? 'success' : 'info'](added ? 'Added to Wishlist' : 'Removed from Wishlist', item?.name || '', 2000);
 }
 });
};

/* Replace a single card in the grid without re-rendering all */
window.refreshCard = function(container, id) {
 const item = AppData.foodItems.find(f => f.id === id);
 if (!item) return;
 const oldCard = container.querySelector(`[data-id="${id}"]`);
 if (!oldCard) return;
 const tmp = document.createElement('div');
 tmp.innerHTML = renderFoodCard(item);
 oldCard.replaceWith(tmp.firstElementChild);
};

/* ============================================================
 SEARCH & FILTER ENGINE
 ============================================================ */
window.FilterEngine = (() => {
 let state = {
 query: '',
 category: 'all',
 vegOnly: false,
 nonVegOnly: false,
 maxPrice: 1000,
 minRating: 0,
 sort: 'popular',
 };

 function setState(updates) {
 Object.assign(state, updates);
 }

 function apply(items) {
 let result = [...items];

 if (state.query) {
 const q = state.query.toLowerCase();
 result = result.filter(f =>
 f.name.toLowerCase().includes(q) ||
 f.desc.toLowerCase().includes(q) ||
 f.category.includes(q)
 );
 }

 if (state.category !== 'all') {
 result = result.filter(f => f.category === state.category);
 }

 if (state.vegOnly) result = result.filter(f => f.isVeg);
 if (state.nonVegOnly) result = result.filter(f => !f.isVeg);

 result = result.filter(f => f.price <= state.maxPrice);
 result = result.filter(f => f.rating >= state.minRating);

 return AppData.sort(result, state.sort);
 }

 return { state, setState, apply };
})();

/* ============================================================
 BACK TO TOP
 ============================================================ */
window.initBackToTop = function() {
 const btn = document.createElement('button');
 btn.className = 'back-to-top';
 btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
 btn.setAttribute('aria-label', 'Back to top');
 document.body.appendChild(btn);
 window.addEventListener('scroll', () => {
 btn.classList.toggle('visible', window.scrollY > 400);
 }, { passive: true });
 btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/* ============================================================
 CATEGORY CARD RENDERER
 ============================================================ */
window.renderCatCard = function(cat) {
 return `
 <a href="menu.html?cat=${cat.id}" class="cat-card" data-cat="${cat.id}">
 <div class="cat-img-wrap" style="background:${cat.gradient}">${cat.emoji}</div>
 <div class="cat-body">
 <h4>${cat.name}</h4>
 <p>${cat.count} items</p>
 </div>
 </a>`;
};

/* ============================================================
 OFFER STRIP
 ============================================================ */
window.renderOfferStrip = function(el) {
 if (!el) return;
 const offers = [
 '🔥 50% OFF on your first order — use NEWUSER',
 '🛵 Free delivery on orders above ₹600',
 '🎉 Use FEAST20 for 20% off on weekends',
 '⚡ Lightning fast delivery in 30 mins',
 '🍕 New dishes added every week at UTKARSH KITCHEN',
 '💳 Pay with UPI and get ₹30 cashback',
 '🥗 Healthy options now available!',
 '🎂 Birthday discount — 25% off on your special day',
 ];
 const doubled = [...offers, ...offers]; // for seamless loop
 el.innerHTML = doubled.map(o => `<span class="offer-item"><i class="fas fa-tag"></i>${o}</span>`).join('');
};

window.renderPromos = function(el) {
 if (!el) return;
 el.innerHTML = AppData.promos.map((p, i) => `
 <div class="promo-card ${i === 0 ? 'large' : ''}">
 <img src="${p.image}" alt="${p.title}" loading="lazy">
 <div class="promo-card-content">
 <span class="tag-promo">${p.tag}</span>
 <h3>${p.title}</h3>
 <p>${p.subtitle}</p>
 </div>
 </div>`).join('');
};

/* ============================================================
 TESTIMONIALS RENDERER
 ============================================================ */
window.renderTestimonials = function(el) {
 if (!el) return;
 el.innerHTML = AppData.testimonials.map(t => `
 <div class="testi-card">
 <div class="testi-quote">"</div>
 <p class="testi-text">${t.text}</p>
 <div class="testi-author">
 <img src="${t.avatar}" alt="${t.name}" loading="lazy">
 <div>
 <div class="name">${t.name}</div>
 <div class="order">${t.order} • ${'⭐'.repeat(t.rating)}</div>
 </div>
 </div>
 </div>`).join('');
};

/* ============================================================
 CART SUMMARY RENDERER (reusable on cart, checkout, payment)
 ============================================================ */
window.renderCartSummary = function(el) {
 if (!el) return;
 const s = Cart.getSummary();
 el.innerHTML = `
 <div class="summary-line"><span>Subtotal (${s.count} items)</span><span>${fmt(s.sub)}</span></div>
 <div class="summary-line"><span>Delivery Fee</span><span>${s.delivery === 0 ? '<span style="color: #2e7d32">Free</span>' : fmt(s.delivery)}</span></div>
 <div class="summary-line"><span>Taxes & Charges (5%)</span><span>${fmt(s.tax)}</span></div>
 ${s.discount > 0 ? `<div class="summary-line discount"><span>Coupon Discount</span><span>− ${fmt(s.discount)}</span></div>` : ''}
 <div class="summary-line total"><span>Grand Total</span><span>${fmt(s.total)}</span></div>`;
};

/* ============================================================
 ORDER ITEMS RENDERER (checkout sidebar)
 ============================================================ */
window.renderOrderItems = function(el) {
 if (!el) return;
 const items = Cart.getItems();
 el.innerHTML = items.map(item => `
 <div class="order-item">
 <img src="${item.image}" alt="${item.name}" loading="lazy">
 <div class="order-item-info">
 <div class="name">${item.name}</div>
 <div class="qty">× ${item.qty}</div>
 </div>
 <div class="order-item-price">${fmt(item.price * item.qty)}</div>
 </div>`).join('');
};

/* ============================================================
 COUPON INPUT HANDLER
 ============================================================ */
window.initCouponInput = function(inputEl, btnEl, statusEl) {
 if (!inputEl || !btnEl) return;
 const existing = Cart.getCoupon();
 if (existing && statusEl) {
 statusEl.textContent = `✓ ${existing.message}`;
 statusEl.style.color = '#2e7d32';
 inputEl.value = existing.code || '';
 inputEl.disabled = true;
 btnEl.textContent = 'Remove';
 btnEl.onclick = () => { Cart.removeCoupon(); location.reload(); };
 return;
 }
 btnEl.onclick = () => {
 const code = inputEl.value.trim();
 if (!code) { Toast.warning('Enter a code', 'Please type a coupon code'); return; }
 const sub = Cart.getSubtotal();
 const result = AppData.applyCoupon(code, sub);
 if (result.valid) {
 Cart.saveCoupon({ ...result, code });
 Toast.success('Coupon Applied!', result.message);
 if (statusEl) { statusEl.textContent = `✓ ${result.message}`; statusEl.style.color = '#2e7d32'; }
 inputEl.disabled = true;
 btnEl.textContent = 'Remove';
 btnEl.onclick = () => { Cart.removeCoupon(); location.reload(); };
 renderCartSummary($('.summary-lines'));
 } else {
 Toast.error('Invalid Coupon', result.message);
 if (statusEl) { statusEl.textContent = `✗ ${result.message}`; statusEl.style.color = '#e63946'; }
 }
 };
};

/* ============================================================
 HERO SEARCH
 ============================================================ */
window.initHeroSearch = function() {
 const input = $('.hero-search input');
 const btn = $('.hero-search .btn');
 if (!input) return;
 const go = () => {
 const q = input.value.trim();
 if (q) window.location.href = `menu.html?q=${encodeURIComponent(q)}`;
 else window.location.href = 'menu.html';
 };
 btn?.addEventListener('click', go);
 input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
};

/* ============================================================
 GLOBAL INIT
 ============================================================ */

/* ── Auth Modal ── */
window.AuthModal = (() => {
 const STORAGE_KEY = 'uk_user';

 function getUser() {
 try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
 }
 function saveUser(u) { localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); }
 function logout() { localStorage.removeItem(STORAGE_KEY); location.reload(); }

 function _strength(pwd) {
 let score = 0;
 if (pwd.length >= 8) score++;
 if (/[A-Z]/.test(pwd)) score++;
 if (/[0-9]/.test(pwd)) score++;
 if (/[^A-Za-z0-9]/.test(pwd)) score++;
 return score;
 }

function inject() {
 if (document.getElementById('authModal')) return;
 const div = document.createElement('div');
 div.innerHTML = `
 <div class="modal-overlay auth-overlay" id="authModal" style="display:none" role="dialog" aria-modal="true" aria-label="Sign In">
 <div class="modal auth-modal">
 <div class="modal-header">
 <span></span>
 <button class="modal-close" id="authClose" aria-label="Close"><i class="fas fa-times"></i></button>
 </div>

 <div class="auth-brand">
 <div class="logo-icon">🍴</div>
 <span>UTKARSH KITCHEN</span>
 </div>

 <div class="auth-tabs">
 <button class="auth-tab active" data-auth="signin">Sign In</button>
 <button class="auth-tab" data-auth="signup">Create Account</button>
 </div>

 <!-- Sign In -->
 <form class="auth-form" id="signinForm" novalidate>
 <div class="form-group">
 <label for="siId">Email or Phone Number</label>
 <input type="text" id="siId" placeholder="Enter email or 10-digit phone" autocomplete="username">
 </div>
 <div class="form-group">
 <label for="siPass">Password</label>
 <div class="pass-wrap">
 <input type="password" id="siPass" placeholder="Enter your password" autocomplete="current-password">
 <button type="button" class="pass-toggle" data-for="siPass"><i class="fas fa-eye"></i></button>
 </div>
 </div>
 <div style="text-align:right;margin-bottom:16px;">
 <a href="#" style="font-size:.82rem;color:var(--primary);font-weight:500">Forgot Password?</a>
 </div>
 <div id="siError" style="display:none;background:rgba(230,57,70,.08);color: #c62828;border-radius:var(--radius-md);padding:10px 14px;font-size:.82rem;margin-bottom:14px;"></div>
 <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">
 <i class="fas fa-sign-in-alt"></i> Sign In
 </button>
 <div class="auth-divider"><span>or</span></div>
 <button type="button" class="social-btn" id="googleSignin">
 <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
 Continue with Google
 </button>
 </form>

 <!-- Create Account -->
 <form class="auth-form" id="signupForm" style="display:none" novalidate>
 <div class="form-group">
 <label for="suName">Full Name</label>
 <input type="text" id="suName" placeholder="Your full name" autocomplete="name">
 </div>
 <div class="form-group">
 <label for="suId">Email or Phone Number</label>
 <input type="text" id="suId" placeholder="Enter email or 10-digit phone" autocomplete="username">
 </div>
 <div class="form-group">
 <label for="suPass">Password</label>
 <div class="pass-wrap">
 <input type="password" id="suPass" placeholder="Min 8 characters" autocomplete="new-password">
 <button type="button" class="pass-toggle" data-for="suPass"><i class="fas fa-eye"></i></button>
 </div>
 <div class="pass-strength" id="passStrength" style="display:none">
 <div class="pass-strength-bar"><div class="pass-strength-fill" id="passStrengthFill"></div></div>
 <span id="passStrengthLabel" style="font-size:.72rem;"></span>
 </div>
 </div>
 <div class="form-group">
 <label for="suPassC">Confirm Password</label>
 <div class="pass-wrap">
 <input type="password" id="suPassC" placeholder="Re-enter password" autocomplete="new-password">
 <button type="button" class="pass-toggle" data-for="suPassC"><i class="fas fa-eye"></i></button>
 </div>
 </div>
 <label style="display:flex;align-items:flex-start;gap:10px;font-size:.82rem;color:var(--text-sub);cursor:pointer;margin-bottom:18px;">
 <input type="checkbox" id="termsCheck" style="accent-color:var(--primary);margin-top:2px;flex-shrink:0">
 I agree to the <a href="#" style="color:var(--primary)">Terms of Service</a> & <a href="#" style="color:var(--primary)">Privacy Policy</a>
 </label>
 <div id="suError" style="display:none;background:rgba(230,57,70,.08);color: #c62828;border-radius:var(--radius-md);padding:10px 14px;font-size:.82rem;margin-bottom:14px;"></div>
 <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">
 <i class="fas fa-user-plus"></i> Create Account
 </button>
 </form>
 </div>
 </div>`;
 document.body.appendChild(div.firstElementChild);
 _bindEvents();
 _updateNavBtn();
 }

 function open(tab) {
 const modal = document.getElementById('authModal');
 if (!modal) return;
 modal.style.display = 'flex';
 document.body.style.overflow = 'hidden';
 if (tab) switchTab(tab);
 }
 function close() {
 const modal = document.getElementById('authModal');
 if (modal) modal.style.display = 'none';
 document.body.style.overflow = '';
 }

 function switchTab(tab) {
 $$('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.auth === tab));
 const sf = document.getElementById('signinForm');
 const su = document.getElementById('signupForm');
 if (sf) sf.style.display = tab === 'signin' ? 'block' : 'none';
 if (su) su.style.display = tab === 'signup' ? 'block' : 'none';
 }

 function _bindEvents() {
 // Close
 document.getElementById('authClose')?.addEventListener('click', close);
 document.getElementById('authModal')?.addEventListener('click', e => {
 if (e.target === document.getElementById('authModal')) close();
 });
 document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

 // Tabs
 $$('.auth-tab').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.auth)));

 // Show/hide password
 $$('.pass-toggle').forEach(btn => {
 btn.addEventListener('click', () => {
 const inp = document.getElementById(btn.dataset.for);
 if (!inp) return;
 const isPass = inp.type === 'password';
 inp.type = isPass ? 'text' : 'password';
 btn.querySelector('i').className = isPass ? 'fas fa-eye-slash' : 'fas fa-eye';
 });
 });

 // Password strength
 document.getElementById('suPass')?.addEventListener('input', function() {
 const val = this.value;
 const wrap = document.getElementById('passStrength');
 const fill = document.getElementById('passStrengthFill');
 const label = document.getElementById('passStrengthLabel');
 if (!val) { wrap.style.display = 'none'; return; }
 wrap.style.display = 'block';
 const s = _strength(val);
 const colors = ['', '#e63946', '#ff9800', '#ffc107', '#4caf50'];
 const labels = ['', 'Too Weak', 'Weak', 'Fair', 'Strong'];
 fill.style.width = (s * 25) + '%';
 fill.style.background = colors[s] || colors[1];
 label.textContent = labels[s] || 'Too Weak';
 label.style.color = colors[s] || colors[1];
 });

// Sign In submit
 document.getElementById('signinForm')?.addEventListener('submit', e => {
 e.preventDefault();
 const id = document.getElementById('siId').value.trim();
 const pass = document.getElementById('siPass').value;
 const errEl= document.getElementById('siError');
 if (!id) { errEl.textContent = 'Please enter your email or phone number.'; errEl.style.display='block'; return; }
 if (!pass) { errEl.textContent = 'Please enter your password.'; errEl.style.display='block'; return; }
 errEl.style.display = 'none';
 // Simulate auth (localStorage only — no backend)
 const stored = getUser();
 if (stored && (stored.email === id || stored.phone === id) && stored.password === pass) {
 close();
 Toast.success('Welcome back, ' + stored.name + '!', '', 3000);
 _updateNavBtn();
 } else {
 errEl.textContent = 'Invalid credentials. Please try again or create an account.';
 errEl.style.display = 'block';
 }
 });

 // Sign Up submit
 document.getElementById('signupForm')?.addEventListener('submit', e => {
 e.preventDefault();
 const name = document.getElementById('suName').value.trim();
 const id = document.getElementById('suId').value.trim();
 const pass = document.getElementById('suPass').value;
 const passC = document.getElementById('suPassC').value;
 const terms = document.getElementById('termsCheck').checked;
 const errEl = document.getElementById('suError');
 if (!name) { errEl.textContent = 'Please enter your full name.'; errEl.style.display='block'; return; }
 if (!id) { errEl.textContent = 'Please enter your email or phone.'; errEl.style.display='block'; return; }
 if (pass.length < 8) { errEl.textContent = 'Password must be at least 8 characters.'; errEl.style.display='block'; return; }
 if (pass !== passC) { errEl.textContent = 'Passwords do not match.'; errEl.style.display='block'; return; }
 if (!terms) { errEl.textContent = 'Please accept the Terms of Service.'; errEl.style.display='block'; return; }
 errEl.style.display = 'none';
 const isEmail = id.includes('@');
 saveUser({ name, email: isEmail ? id : '', phone: !isEmail ? id : '', password: pass });
 close();
 Toast.success('Account Created! 🎉', 'Welcome, ' + name + '!', 3500);
 _updateNavBtn();
 });

 // Google (UI only)
 document.getElementById('googleSignin')?.addEventListener('click', () => {
 Toast.info('Google Sign-In', 'OAuth integration requires a backend. Use email/phone for now.', 4000);
 });
 }

 function _updateNavBtn() {
 const user = getUser();
 $$('.btn-login, [data-signin]').forEach(btn => {
 if (user) {
 const initials = user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
 btn.outerHTML = `<button class="user-menu-btn" onclick="AuthModal.openUserMenu(event)">
 <div class="user-avatar">${initials}</div>
 <span style="max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${user.name.split(' ')[0]}</span>
 <i class="fas fa-chevron-down" style="font-size:.65rem"></i>
 </button>`;
 } else {
 if (btn.tagName === 'A') btn.addEventListener('click', e => { e.preventDefault(); open('signin'); });
 else btn.addEventListener('click', () => open('signin'));
 }
 });
 }

 function openUserMenu(e) {
 e.stopPropagation();
 const existing = document.getElementById('userDropdown');
 if (existing) { existing.remove(); return; }
 const user = getUser();
 const rect = e.currentTarget.getBoundingClientRect();
 const dd = document.createElement('div');
 dd.id = 'userDropdown';
 dd.style.cssText = `position:fixed;top:${rect.bottom+8}px;right:${window.innerWidth-rect.right}px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:8px;min-width:180px;box-shadow:var(--shadow-xl);z-index:2000;animation:fadeInUp .2s ease`;
 dd.innerHTML = `
 <div style="padding:12px 14px;border-bottom:1px solid var(--border);margin-bottom:6px">
 <div style="font-size:.9rem;font-weight:700">${user?.name||'User'}</div>
 <div style="font-size:.75rem;color:var(--text-muted)">${user?.email||user?.phone||''}</div>
 </div>
 <a href="#" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--radius-md);font-size:.88rem;color:var(--text-sub);transition:var(--transition)" onmouseover="this.style.background='rgba(230,57,70,.07)'" onmouseout="this.style.background=''"><i class="fas fa-shopping-bag" style="color:var(--primary);width:16px"></i> My Orders</a>
 <a href="#" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--radius-md);font-size:.88rem;color:var(--text-sub);transition:var(--transition)" onmouseover="this.style.background='rgba(230,57,70,.07)'" onmouseout="this.style.background=''"><i class="fas fa-heart" style="color:var(--primary);width:16px"></i> Wishlist</a>
 <a href="#" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--radius-md);font-size:.88rem;color:var(--text-sub);transition:var(--transition)" onmouseover="this.style.background='rgba(230,57,70,.07)'" onmouseout="this.style.background=''"><i class="fas fa-user-circle" style="color:var(--primary);width:16px"></i> Profile</a>
 <div style="border-top:1px solid var(--border);margin:6px 0;"></div>
 <button onclick="AuthModal.logout()" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--radius-md);font-size:.88rem;color: #e63946;width:100%;background:none;cursor:pointer;font-family:var(--font)" onmouseover="this.style.background='rgba(230,57,70,.07)'" onmouseout="this.style.background=''"><i class="fas fa-sign-out-alt" style="width:16px"></i> Sign Out</button>`;
 document.body.appendChild(dd);
 setTimeout(() => document.addEventListener('click', function rm() { dd.remove(); document.removeEventListener('click', rm); }), 50);
 }

 return { inject, open, close, getUser, logout, openUserMenu };
})();
document.addEventListener('DOMContentLoaded', () => {
 Theme.init();
 Navbar.init();
 initBackToTop();

 // Auth modal
 AuthModal.inject();

 // Wire all Sign In links/buttons
 $$('.btn-login, [data-signin]').forEach(btn => {
 btn.addEventListener('click', e => { e.preventDefault(); AuthModal.open('signin'); });
 });

 // Offer strip
 renderOfferStrip($('.offer-strip-inner'));

 // Hero search
 initHeroSearch();
});