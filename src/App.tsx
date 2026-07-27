import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';
import { SupportBar } from './components/SupportBar';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <Router basename="/MuchcomTech/">
        <div className="flex flex-col min-h-screen bg-[#0B0F17] text-slate-100 selection:bg-blue-500 selection:text-slate-950 font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <div className="h-14" />
          <SupportBar />
          <ToastNotification />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
