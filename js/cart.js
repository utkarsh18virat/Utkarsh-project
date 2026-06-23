window.Cart = (() => {

 const CART_KEY = 'uk_cart';
 const SAVED_KEY = 'uk_saved';
 const COUPON_KEY = 'uk_coupon';
 const DELIVERY_FEE = 40;
 const TAX_RATE = 0.05; // 5%

 /* ── Storage helpers ── */
 function _load(key) {
 try { return JSON.parse(localStorage.getItem(key)) || []; }
 catch { return []; }
 }
 function _save(key, data) {
 localStorage.setItem(key, JSON.stringify(data));
 }

 /* ── Cart items ── */
 function getItems() { return _load(CART_KEY); }
 function getSaved() { return _load(SAVED_KEY); }

 function getItemById(id) {
 return getItems().find(i => i.id === id) || null;
 }

 function addItem(foodItem) {
 const items = getItems();
 const existing = items.find(i => i.id === foodItem.id);
 if (existing) {
 existing.qty += 1;
 } else {
 items.push({ ...foodItem, qty: 1 });
 }
 _save(CART_KEY, items);
 _trigger('cartUpdated');
 return true;
 }

 function removeItem(id) {
 const items = getItems().filter(i => i.id !== id);
 _save(CART_KEY, items);
 _trigger('cartUpdated');
 }

 function updateQty(id, qty) {
 if (qty < 1) { removeItem(id); return; }
 if (qty > 20) return;
 const items = getItems();
 const item = items.find(i => i.id === id);
 if (item) { item.qty = qty; _save(CART_KEY, items); _trigger('cartUpdated'); }
 }

 function clearCart() {
 localStorage.removeItem(CART_KEY);
 localStorage.removeItem(COUPON_KEY);
 _trigger('cartUpdated');
 }

 function getTotalCount() {
 return getItems().reduce((sum, i) => sum + i.qty, 0);
 }

 function isInCart(id) {
 return getItems().some(i => i.id === id);
 }

 /* ── Save for later ── */
 function saveForLater(id) {
 const items = getItems();
 const saved = getSaved();
 const item = items.find(i => i.id === id);
 if (!item) return;
 if (!saved.find(s => s.id === id)) saved.push({ ...item, qty: 1 });
 _save(SAVED_KEY, saved);
 removeItem(id);
 }

 function moveToCart(id) {
 const saved = getSaved();
 const item = saved.find(s => s.id === id);
 if (!item) return;
 _save(SAVED_KEY, saved.filter(s => s.id !== id));
 addItem(item);
 }

 function removeSaved(id) {
 _save(SAVED_KEY, getSaved().filter(s => s.id !== id));
 _trigger('cartUpdated');
 }

 /* ── Pricing ── */
 function getSubtotal() {
 return getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
 }

 function getDeliveryFee(couponData) {
 if (couponData && couponData.freeDelivery) return 0;
 const sub = getSubtotal();
 return sub >= 600 ? 0 : DELIVERY_FEE;
 }

 function getTax() {
 return Math.round(getSubtotal() * TAX_RATE);
 }

 function getCoupon() {
 try { return JSON.parse(localStorage.getItem(COUPON_KEY)) || null; }
 catch { return null; }
 }

 function saveCoupon(data) {
 localStorage.setItem(COUPON_KEY, JSON.stringify(data));
 _trigger('cartUpdated');
 }

 function removeCoupon() {
 localStorage.removeItem(COUPON_KEY);
 _trigger('cartUpdated');
 }

 function getTotal() {
 const coupon = getCoupon();
 const sub = getSubtotal();
 const delivery = getDeliveryFee(coupon);
 const tax = getTax();
 const discount = coupon ? (coupon.discount || 0) : 0;
 return Math.max(0, sub + delivery + tax - discount);
 }

 function getSummary() {
 const coupon = getCoupon();
 const sub = getSubtotal();
 const delivery = getDeliveryFee(coupon);
 const tax = getTax();
 const discount = coupon ? (coupon.discount || 0) : 0;
 const total = Math.max(0, sub + delivery + tax - discount);
 return { sub, delivery, tax, discount, total, coupon, count: getTotalCount() };
 }

 /* ── Wishlist ── */
 const WISH_KEY = 'uk_wishlist';
 function getWishlist() { return _load(WISH_KEY); }
 function toggleWish(id) {
 const list = getWishlist();
 const idx = list.indexOf(id);
 if (idx === -1) list.push(id); else list.splice(idx, 1);
 _save(WISH_KEY, list);
 return idx === -1; // true = added
 }
 function isWishlisted(id) { return getWishlist().includes(id); }

 /* ── Event system ── */
 function _trigger(event) {
 document.dispatchEvent(new CustomEvent(event));
 }

 function onUpdate(cb) {
 document.addEventListener('cartUpdated', cb);
 }

 return {
 getItems, getSaved, getItemById,
 addItem, removeItem, updateQty, clearCart,
 getTotalCount, isInCart,
 saveForLater, moveToCart, removeSaved,
 getSubtotal, getDeliveryFee, getTax,
 getCoupon, saveCoupon, removeCoupon,
 getTotal, getSummary,
 getWishlist, toggleWish, isWishlisted,
 onUpdate,
 };
})();