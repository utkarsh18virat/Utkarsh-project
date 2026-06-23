window.AppData = (() => {

 const categories = [
 { id: 'pizza', name: 'Pizza', emoji: '🍕', count: 24, gradient: 'linear-gradient(135deg,#ff6b6b,#ee5a24)' },
 { id: 'burger', name: 'Burger', emoji: '🍔', count: 31, gradient: 'linear-gradient(135deg,#f9ca24,#f0932b)' },
 { id: 'chicken', name: 'Fried Chicken', emoji: '🍗', count: 18, gradient: 'linear-gradient(135deg,#ffbe76,#e55039)' },
 { id: 'noodles', name: 'Noodles', emoji: '🍜', count: 22, gradient: 'linear-gradient(135deg,#badc58,#6ab04c)' },
 { id: 'biryani', name: 'Biryani', emoji: '🍚', count: 15, gradient: 'linear-gradient(135deg,#f9ca24,#c0392b)' },
 { id: 'wraps', name: 'Wraps', emoji: '🌮', count: 14, gradient: 'linear-gradient(135deg,#55efc4,#00b894)' },
 { id: 'fries', name: 'Fries', emoji: '🍟', count: 12, gradient: 'linear-gradient(135deg,#ffeaa7,#fdcb6e)' },
 { id: 'sandwich', name: 'Sandwich', emoji: '🥪', count: 20, gradient: 'linear-gradient(135deg,#a29bfe,#6c5ce7)' },
 { id: 'shawarma', name: 'Shawarma', emoji: '🥙', count: 11, gradient: 'linear-gradient(135deg,#fd79a8,#e84393)' },
 { id: 'curry', name: 'Curry', emoji: '🍛', count: 16, gradient: 'linear-gradient(135deg,#e17055,#d63031)' },
 { id: 'desserts', name: 'Desserts', emoji: '🍰', count: 26, gradient: 'linear-gradient(135deg,#fd79a8,#a29bfe)' },
 { id: 'icecream', name: 'Ice Cream', emoji: '🍦', count: 19, gradient: 'linear-gradient(135deg,#74b9ff,#0984e3)' },
 { id: 'beverages', name: 'Beverages', emoji: '☕', count: 28, gradient: 'linear-gradient(135deg,#a29bfe,#6c5ce7)' },
 { id: 'softdrinks',name: 'Soft Drinks', emoji: '🥤', count: 17, gradient: 'linear-gradient(135deg,#55efc4,#00cec9)' },
 { id: 'salads', name: 'Salads', emoji: '🥗', count: 13, gradient: 'linear-gradient(135deg,#55efc4,#00b894)' },
 ];

 const restaurants = [
 {
 id: 'r1',
 name: 'Bella Italia',
 logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop',
 cover: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
 cuisine: ['Italian', 'Pizza', 'Pasta'],
 rating: 4.7, reviews: 2340,
 deliveryTime: '25–35 min', deliveryFee: 30,
 minOrder: 200,
 address: '12 Rosewood Lane, Bandra West',
 openHours: '10:00 AM – 11:30 PM',
 tags: ['Best Seller', 'Pure Veg'],
 priceRange: '₹₹',
 featured: true, isOpen: true,
 lat: 19.0596, lng: 72.8295,
 },
 {
 id: 'r2',
 name: 'Burger Palace',
 logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop',
 cover: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop',
 cuisine: ['American', 'Burgers', 'Fries'],
 rating: 4.5, reviews: 3120,
 deliveryTime: '20–30 min', deliveryFee: 25,
 minOrder: 150,
 address: '88 Hill Road, Powai',
 openHours: '11:00 AM – 12:00 AM',
 tags: ['Trending', 'New'],
 priceRange: '₹₹',
 featured: true, isOpen: true,
 lat: 19.1176, lng: 72.9060,
 },
 {
 id: 'r3',
 name: 'Spice Garden',
 logo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=80&h=80&fit=crop',
 cover: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop',
 cuisine: ['Indian', 'Biryani', 'Curry'],
 rating: 4.8, reviews: 4870,
 deliveryTime: '30–45 min', deliveryFee: 0,
 minOrder: 300,
 address: '45 MG Road, Koregaon Park',
 openHours: '11:30 AM – 11:00 PM',
 tags: ['Top Rated', 'Free Delivery'],
 priceRange: '₹₹₹',
 featured: true, isOpen: true,
 lat: 18.5362, lng: 73.8977,
 },
 {
 id: 'r4',
 name: 'Dragon Express',
 logo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&h=80&fit=crop',
 cover: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=400&fit=crop',
 cuisine: ['Chinese', 'Noodles', 'Dimsum'],
 rating: 4.4, reviews: 1980,
 deliveryTime: '25–40 min', deliveryFee: 20,
 minOrder: 180,
 address: '7 Dragon Street, Andheri East',
 openHours: '12:00 PM – 11:00 PM',
 tags: ['Popular'],
 priceRange: '₹₹',
 featured: false, isOpen: true,
 lat: 19.1194, lng: 72.8468,
 },
 {
 id: 'r5',
 name: 'Sweet Treats',
 logo: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=80&h=80&fit=crop',
 cover: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=400&fit=crop',
 cuisine: ['Desserts', 'Ice Cream', 'Cakes'],
 rating: 4.6, reviews: 2200,
 deliveryTime: '20–35 min', deliveryFee: 35,
 minOrder: 250,
 address: '3 Sugar Lane, Indiranagar',
 openHours: '10:00 AM – 11:00 PM',
 tags: ['Sweet Lover', 'Best Desserts'],
 priceRange: '₹₹',
 featured: true, isOpen: true,
 lat: 12.9784, lng: 77.6408,
 },
 {
 id: 'r6',
 name: 'The Wrap Co.',
 logo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop',
 cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop',
 cuisine: ['Wraps', 'Shawarma', 'Salads'],
 rating: 4.3, reviews: 1450,
 deliveryTime: '15–25 min', deliveryFee: 15,
 minOrder: 120,
 address: '21 Green Park, Juhu',
 openHours: '9:00 AM – 11:00 PM',
 tags: ['Healthy', 'Fast Delivery'],
 priceRange: '₹',
 featured: false, isOpen: false,
 lat: 19.1075, lng: 72.8263,
 },
 ];

const foodItems = [
 // Pizza
 {
 id: 'f1', category: 'pizza', restaurantId: 'r1',
 name: 'Margherita Classic',
 desc: 'Classic tomato base with fresh mozzarella, basil leaves and a drizzle of olive oil on our hand-tossed crust.',
 image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop',
 price: 349, originalPrice: 449, discount: 22,
 rating: 4.8, reviews: 1240, prepTime: '20 min',
 isVeg: true, isNew: false, isPopular: true,
 tags: ['Bestseller'], popularity: 98,
 },
 {
 id: 'f2', category: 'pizza', restaurantId: 'r1',
 name: 'Pepperoni Feast',
 desc: 'Loaded with premium pepperoni slices, extra cheese blend and spicy red sauce on crispy thin crust.',
 image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=400&fit=crop',
 price: 449, originalPrice: 549, discount: 18,
 rating: 4.7, reviews: 890, prepTime: '22 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Non-Veg', 'Bestseller'], popularity: 91,
 },
 {
 id: 'f3', category: 'pizza', restaurantId: 'r1',
 name: 'BBQ Chicken Pizza',
 desc: 'Smoky BBQ sauce, grilled chicken tikka, caramelised onions and cheddar cheese on whole wheat crust.',
 image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop',
 price: 479, originalPrice: null, discount: 0,
 rating: 4.6, reviews: 720, prepTime: '25 min',
 isVeg: false, isNew: true, isPopular: false,
 tags: ['New', 'Non-Veg'], popularity: 75,
 },
 // Burgers
 {
 id: 'f4', category: 'burger', restaurantId: 'r2',
 name: 'Double Smash Burger',
 desc: 'Two smashed beef patties, American cheese, caramelised onions, lettuce, pickles & secret sauce.',
 image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop',
 price: 299, originalPrice: 379, discount: 21,
 rating: 4.9, reviews: 2100, prepTime: '15 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Bestseller', '#1 Rated'], popularity: 99,
 },
 {
 id: 'f5', category: 'burger', restaurantId: 'r2',
 name: 'Crispy Chicken Burger',
 desc: 'Southern-style crispy fried chicken, coleslaw, pickled jalapeños and honey mustard aioli.',
 image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&h=400&fit=crop',
 price: 269, originalPrice: null, discount: 0,
 rating: 4.7, reviews: 1450, prepTime: '18 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Non-Veg'], popularity: 87,
 },
 {
 id: 'f6', category: 'burger', restaurantId: 'r2',
 name: 'Mushroom Swiss Veggie',
 desc: 'Grilled portobello mushroom, Swiss cheese, baby spinach, sun-dried tomatoes & pesto mayo.',
 image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=400&fit=crop',
 price: 229, originalPrice: 299, discount: 23,
 rating: 4.5, reviews: 680, prepTime: '14 min',
 isVeg: true, isNew: false, isPopular: false,
 tags: ['Veg'], popularity: 65,
 },
 // Biryani
 {
 id: 'f7', category: 'biryani', restaurantId: 'r3',
 name: 'Hyderabadi Dum Biryani',
 desc: 'Slow-cooked fragrant basmati rice with tender mutton, saffron, caramelised onions & raita.',
 image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=400&fit=crop',
 price: 399, originalPrice: 499, discount: 20,
 rating: 4.9, reviews: 3400, prepTime: '35 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Bestseller', 'Chef Special'], popularity: 100,
 },
 {
 id: 'f8', category: 'biryani', restaurantId: 'r3',
 name: 'Chicken Biryani',
 desc: 'Aromatic long-grain rice with marinated chicken, whole spices, fresh herbs and saffron-infused ghee.',
 image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=400&fit=crop',
 price: 299, originalPrice: null, discount: 0,
 rating: 4.8, reviews: 4100, prepTime: '30 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Non-Veg'], popularity: 96,
 },
 {
 id: 'f9', category: 'biryani', restaurantId: 'r3',
 name: 'Veg Dum Biryani',
 desc: 'Seasonal vegetables, paneer and potatoes slow-cooked with basmati rice, rose water and crispy onions.',
 image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=400&fit=crop',
 price: 249, originalPrice: 319, discount: 22,
 rating: 4.6, reviews: 1820, prepTime: '28 min',
 isVeg: true, isNew: false, isPopular: false,
 tags: ['Veg'], popularity: 78,
 },

// Noodles
 {
 id: 'f10', category: 'noodles', restaurantId: 'r4',
 name: 'Pad Thai Noodles',
 desc: 'Stir-fried flat rice noodles with shrimp, peanuts, bean sprouts, eggs and tamarind sauce.',
 image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=400&fit=crop',
 price: 279, originalPrice: 349, discount: 20,
 rating: 4.6, reviews: 940, prepTime: '20 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Thai'], popularity: 82,
 },
 {
 id: 'f11', category: 'noodles', restaurantId: 'r4',
 name: 'Veg Hakka Noodles',
 desc: 'Indo-Chinese style stir-fried noodles with colorful vegetables, soy sauce and sesame oil.',
 image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=400&fit=crop',
 price: 199, originalPrice: null, discount: 0,
 rating: 4.4, reviews: 760, prepTime: '18 min',
 isVeg: true, isNew: false, isPopular: false,
 tags: ['Veg'], popularity: 70,
 },
 // Curry
 {
 id: 'f12', category: 'curry', restaurantId: 'r3',
 name: 'Butter Chicken',
 desc: 'Tender chicken in a rich, creamy tomato-butter sauce with fenugreek and aromatic Indian spices.',
 image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=400&fit=crop',
 price: 329, originalPrice: 399, discount: 18,
 rating: 4.9, reviews: 5200, prepTime: '25 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Bestseller', 'Chef Special'], popularity: 98,
 },
 {
 id: 'f13', category: 'curry', restaurantId: 'r3',
 name: 'Paneer Tikka Masala',
 desc: 'Chargrilled paneer cubes in spiced tomato-cream gravy with bell peppers and fresh coriander.',
 image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=400&fit=crop',
 price: 299, originalPrice: null, discount: 0,
 rating: 4.7, reviews: 2800, prepTime: '22 min',
 isVeg: true, isNew: false, isPopular: true,
 tags: ['Veg', 'Bestseller'], popularity: 92,
 },
 // Fried Chicken
 {
 id: 'f14', category: 'chicken', restaurantId: 'r2',
 name: 'Nashville Hot Chicken',
 desc: 'Crispy bone-in chicken coated in fiery cayenne-butter sauce, served with pickles and white bread.',
 image: 'https://images.unsplash.com/photo-1626040650009-5b3e09ccc3e7?w=500&h=400&fit=crop',
 price: 349, originalPrice: 429, discount: 19,
 rating: 4.8, reviews: 1700, prepTime: '25 min',
 isVeg: false, isNew: true, isPopular: true,
 tags: ['Spicy', 'New'], popularity: 90,
 },
 {
 id: 'f15', category: 'chicken', restaurantId: 'r2',
 name: 'KFC Style Crispy Strips',
 desc: 'Juicy chicken strips in a 11-herb-and-spice golden crust. Served with dipping sauces.',
 image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&h=400&fit=crop',
 price: 279, originalPrice: null, discount: 0,
 rating: 4.6, reviews: 2200, prepTime: '20 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Non-Veg'], popularity: 85,
 },
 // Desserts
 {
 id: 'f16', category: 'desserts', restaurantId: 'r5',
 name: 'Chocolate Lava Cake',
 desc: 'Warm dark chocolate sponge with a molten centre, vanilla bean ice cream and raspberry coulis.',
 image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=400&fit=crop',
 price: 199, originalPrice: 249, discount: 20,
 rating: 4.9, reviews: 3600, prepTime: '15 min',
 isVeg: true, isNew: false, isPopular: true,
 tags: ['Bestseller', 'Sweet'], popularity: 97,
 },
 {
 id: 'f17', category: 'desserts', restaurantId: 'r5',
 name: 'Tiramisu',
 desc: 'Classic Italian dessert with espresso-soaked savoiardi, mascarpone cream and dusted cocoa.',
 image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=500&h=400&fit=crop',
 price: 229, originalPrice: null, discount: 0,
 rating: 4.7, reviews: 1400, prepTime: '10 min',
 isVeg: true, isNew: false, isPopular: false,
 tags: ['Italian', 'Sweet'], popularity: 76,
 },
 // Ice Cream
 {
 id: 'f18', category: 'icecream', restaurantId: 'r5',
 name: 'Belgian Chocolate Sundae',
 desc: 'Three scoops of rich Belgian chocolate ice cream, hot fudge, whipped cream and a cherry on top.',
 image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=400&fit=crop',
 price: 179, originalPrice: 219, discount: 18,
 rating: 4.8, reviews: 2800, prepTime: '8 min',
 isVeg: true, isNew: false, isPopular: true,
 tags: ['Bestseller'], popularity: 93,
 },
 {
 id: 'f19', category: 'icecream', restaurantId: 'r5',
 name: 'Mango Sorbet',
 desc: 'Refreshing alphonso mango sorbet, dairy-free and made with 100% Gir cow mangoes.',
 image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&h=400&fit=crop',
 price: 149, originalPrice: null, discount: 0,
 rating: 4.5, reviews: 920, prepTime: '5 min',
 isVeg: true, isNew: true, isPopular: false,
 tags: ['Vegan', 'New'], popularity: 68,
 },
 // Beverages
 {
 id: 'f20', category: 'beverages', restaurantId: 'r1',
 name: 'Classic Cappuccino',
 desc: 'Double shot espresso with velvety steamed milk foam, lightly dusted with cocoa powder.',
 image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=400&fit=crop',
 price: 149, originalPrice: null, discount: 0,
 rating: 4.6, reviews: 1820, prepTime: '8 min',
 isVeg: true, isNew: false, isPopular: true,
 tags: ['Hot', 'Coffee'], popularity: 80,
 },
 {
 id: 'f21', category: 'beverages', restaurantId: 'r1',
 name: 'Mango Iced Latte',
 desc: 'Cold brew espresso topped with fresh alphonso mango purée, oat milk and ice.',
 image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop',
 price: 179, originalPrice: 219, discount: 18,
 rating: 4.7, reviews: 1340, prepTime: '6 min',
 isVeg: true, isNew: true, isPopular: true,
 tags: ['Cold', 'New'], popularity: 86,
 },

// Salads
 {
 id: 'f22', category: 'salads', restaurantId: 'r6',
 name: 'Caesar Salad',
 desc: 'Romaine lettuce, house-made Caesar dressing, croutons, shaved parmesan and grilled chicken strips.',
 image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop',
 price: 249, originalPrice: 299, discount: 17,
 rating: 4.5, reviews: 880, prepTime: '12 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Healthy'], popularity: 74,
 },
 {
 id: 'f23', category: 'salads', restaurantId: 'r6',
 name: 'Greek Quinoa Bowl',
 desc: 'Fluffy quinoa, kalamata olives, cherry tomatoes, cucumber, feta cheese, red onion & lemon dressing.',
 image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop',
 price: 269, originalPrice: null, discount: 0,
 rating: 4.6, reviews: 660, prepTime: '10 min',
 isVeg: true, isNew: true, isPopular: false,
 tags: ['Vegan', 'Healthy', 'New'], popularity: 69,
 },
 // Wraps
 {
 id: 'f24', category: 'wraps', restaurantId: 'r6',
 name: 'Chicken Shawarma Wrap',
 desc: 'Slow-roasted chicken with garlic sauce, pickled vegetables, sumac onions in warm Arabic bread.',
 image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=400&fit=crop',
 price: 219, originalPrice: 279, discount: 22,
 rating: 4.7, reviews: 1560, prepTime: '15 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Bestseller'], popularity: 88,
 },
 {
 id: 'f25', category: 'wraps', restaurantId: 'r6',
 name: 'Paneer Tikka Wrap',
 desc: 'Chargrilled spiced paneer, mint chutney, pickled onions and fresh salad in a whole wheat tortilla.',
 image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=400&fit=crop',
 price: 199, originalPrice: null, discount: 0,
 rating: 4.5, reviews: 1020, prepTime: '14 min',
 isVeg: true, isNew: false, isPopular: false,
 tags: ['Veg'], popularity: 71,
 },
 // Fries
 {
 id: 'f26', category: 'fries', restaurantId: 'r2',
 name: 'Truffle Parmesan Fries',
 desc: 'Crispy shoestring fries tossed with truffle oil, shaved parmesan, sea salt and fresh rosemary.',
 image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=400&fit=crop',
 price: 179, originalPrice: 219, discount: 18,
 rating: 4.7, reviews: 2100, prepTime: '12 min',
 isVeg: true, isNew: false, isPopular: true,
 tags: ['Bestseller'], popularity: 89,
 },
 {
 id: 'f27', category: 'fries', restaurantId: 'r2',
 name: 'Loaded Cheese Fries',
 desc: 'Thick-cut fries smothered in cheddar cheese sauce, jalapeños, crispy bacon bits and sour cream.',
 image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&h=400&fit=crop',
 price: 199, originalPrice: null, discount: 0,
 rating: 4.6, reviews: 1780, prepTime: '14 min',
 isVeg: false, isNew: false, isPopular: true,
 tags: ['Non-Veg'], popularity: 84,
 },
 // Soft Drinks
 {
 id: 'f28', category: 'softdrinks', restaurantId: 'r2',
 name: 'Virgin Mojito',
 desc: 'Fresh mint, lime juice, sugar syrup, soda water and ice. Perfectly refreshing.',
 image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=400&fit=crop',
 price: 119, originalPrice: null, discount: 0,
 rating: 4.5, reviews: 1200, prepTime: '5 min',
 isVeg: true, isNew: false, isPopular: true,
 tags: ['Mocktail'], popularity: 80,
 },
 {
 id: 'f29', category: 'softdrinks', restaurantId: 'r5',
 name: 'Watermelon Lemonade',
 desc: 'Fresh watermelon juice, lemon, honey, chia seeds and a pinch of pink Himalayan salt.',
 image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&h=400&fit=crop',
 price: 139, originalPrice: 169, discount: 18,
 rating: 4.6, reviews: 840, prepTime: '6 min',
 isVeg: true, isNew: true, isPopular: false,
 tags: ['Healthy', 'New'], popularity: 73,
 },
 // Sandwich
 {
 id: 'f30', category: 'sandwich', restaurantId: 'r6',
 name: 'Club Sandwich',
 desc: 'Triple-decker with grilled chicken, bacon, cheese, lettuce, tomato, fried egg and aioli.',
 image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=400&fit=crop',
 price: 239, originalPrice: 299, discount: 20,
 rating: 4.5, reviews: 980, prepTime: '16 min',
 isVeg: false, isNew: false, isPopular: false,
 tags: ['Non-Veg'], popularity: 72,
 },
 ];

 const testimonials = [
 {
 id: 't1', name: 'Priya Sharma', order: '200+ orders',
 avatar: 'https://images.unsplash.com/photo-1494790108755-2616b95f35c7?w=100&h=100&fit=crop&facepad=2',
 rating: 5,
 text: 'UTKARSH KITCHEN has completely changed how I order food. The app is beautiful, delivery is always on time and the food arrives hot. Absolutely love it!'
 },
 {
 id: 't2', name: 'Rahul Verma', order: '150+ orders',
 avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&facepad=2',
 rating: 5,
 text: 'The variety of restaurants and food categories is incredible. I found my new favourite biryani place through UTKARSH KITCHEN. Five stars all the way!'
 },
 {
 id: 't3', name: 'Anjali Patel', order: '80+ orders',
 avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&facepad=2',
 rating: 5,
 text: 'Super fast delivery, amazing UI and the real-time tracking is so satisfying to watch. The coupons and discounts make it even better!'
 },
 {
 id: 't4', name: 'Karan Mehta', order: '320+ orders',
 avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&facepad=2',
 rating: 4,
 text: 'The dark mode is gorgeous and the food photography makes everything look so tempting. My go-to app for late night cravings!'
 },
 {
 id: 't5', name: 'Sneha Reddy', order: '110+ orders',
 avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&facepad=2',
 rating: 5,
 text: 'Outstanding customer service and the refund process is seamless. The restaurant recommendations are always spot on for my taste!'
 },
 {
 id: 't6', name: 'Amit Kumar', order: '240+ orders',
 avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&facepad=2',
 rating: 5,
 text: 'I love that I can filter by veg/non-veg and sort by rating. Makes finding the perfect meal so easy. Best food delivery app ever!'
 },
 ];

 const coupons = [
 { code: 'FEAST20', type: 'percent', value: 20, minOrder: 300, desc: '20% off on orders above ₹300' },
 { code: 'NEWUSER', type: 'flat', value: 100, minOrder: 200, desc: 'Flat ₹100 off for new users' },
 { code: 'FREEDEL', type: 'delivery', value: 0, minOrder: 150, desc: 'Free delivery on this order' },
 { code: 'SAVE50', type: 'flat', value: 50, minOrder: 400, desc: 'Flat ₹50 off on orders above ₹400' },
 { code: 'HUNGRY30', type: 'percent', value: 30, minOrder: 500, desc: '30% off on orders above ₹500' },
 ];


const promos = [
 {
 id: 'p1', tag: '50% OFF', title: 'Weekend Special', subtitle: 'Use code FEAST20',
 image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=400&fit=crop',
 size: 'large',
 },
 {
 id: 'p2', tag: 'Free Delivery', title: 'Order Above ₹500', subtitle: 'No code needed',
 image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
 size: 'small',
 },
 {
 id: 'p3', tag: 'New User', title: '₹100 Off', subtitle: 'Use code NEWUSER',
 image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
 size: 'small',
 },
 ];

 // Get restaurant by id
 function getRestaurant(id) { return restaurants.find(r => r.id === id) || {}; }

 // Get food items by category
 function getByCategory(catId) { return foodItems.filter(f => f.category === catId); }

 // Get food items by restaurant
 function getByRestaurant(restId) { return foodItems.filter(f => f.restaurantId === restId); }

 // Search food items
 function search(query) {
 const q = query.toLowerCase().trim();
 if (!q) return foodItems;
 return foodItems.filter(f =>
 f.name.toLowerCase().includes(q) ||
 f.desc.toLowerCase().includes(q) ||
 f.category.includes(q) ||
 getRestaurant(f.restaurantId).name?.toLowerCase().includes(q)
 );
 }

 // Sort food items
 function sort(items, method) {
 const arr = [...items];
 switch (method) {
 case 'popular': return arr.sort((a, b) => b.popularity - a.popularity);
 case 'newest': return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
 case 'price-asc': return arr.sort((a, b) => a.price - b.price);
 case 'price-desc': return arr.sort((a, b) => b.price - a.price);
 case 'rating': return arr.sort((a, b) => b.rating - a.rating);
 default: return arr;
 }
 }

 // Apply coupon
 function applyCoupon(code, subtotal) {
 const coupon = coupons.find(c => c.code === code.toUpperCase());
 if (!coupon) return { valid: false, message: 'Invalid coupon code' };
 if (subtotal < coupon.minOrder) return { valid: false, message: `Minimum order ₹${coupon.minOrder} required` };
 let discount = 0;
 let freeDelivery = false;
 if (coupon.type === 'percent') discount = Math.round(subtotal * coupon.value / 100);
 if (coupon.type === 'flat') discount = coupon.value;
 if (coupon.type === 'delivery') freeDelivery = true;
 return { valid: true, discount, freeDelivery, message: coupon.desc };
 }

 return { categories, restaurants, foodItems, testimonials, coupons, promos, getRestaurant, getByCategory, getByRestaurant, search, sort, applyCoupon };
})();