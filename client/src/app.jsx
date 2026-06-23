import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ToastList from './components/ToastList.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Restaurants from './pages/Restaurants.jsx';
import RestaurantDetail from './pages/RestaurantDetail.jsx';
import CartPage from './pages/CartPage.jsx';
import Checkout from './pages/Checkout.jsx';
import Payment from './pages/Payment.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
 return (
 <>
 <Navbar />
 <ToastList />
 <main style={{ paddingTop: '70px' }}>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/menu" element={<Menu />} />
 <Route path="/restaurants" element={<Restaurants />} />
 <Route path="/restaurant/:id" element={<RestaurantDetail />} />
 <Route path="/cart" element={<CartPage />} />
 <Route path="/checkout" element={<Checkout />} />
 <Route path="/payment" element={<Payment />} />
 <Route path="/order-success" element={<OrderSuccess />} />
 <Route path="*" element={<NotFound />} />
 </Routes>
 </main>
 <Footer />
 </>
 );
}