import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Zap, Menu, X, Search, PhoneCall, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SHOP_ENABLED } from '../config/features';

export const Navbar: React.FC = () => {
  const { getCartCount, config, setCheckoutMode } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const cartCount = getCartCount();

  const allNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Shop Catalog', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const navLinks = SHOP_ENABLED
    ? allNavLinks
    : allNavLinks.filter((link) => link.path !== '/shop');

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-green-950 via-slate-900 to-blue-950 px-4 py-1.5 text-xs text-slate-300 border-b border-green-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {SHOP_ENABLED && (
              <div className="flex items-center space-x-1.5 bg-slate-800/80 rounded-full px-2.5 py-0.5 border border-slate-700">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Mode:</span>
                <button
                  onClick={() => setCheckoutMode('whatsapp')}
                  className={`text-[10px] px-2 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                    config.checkoutMode === 'whatsapp'
                      ? 'bg-green-500/20 text-green-300 font-bold border border-green-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Switch to WhatsApp direct checkout"
                >
                  <PhoneCall className="w-2.5 h-2.5" /> WhatsApp
                </button>
                <button
                  onClick={() => setCheckoutMode('email')}
                  className={`text-[10px] px-2 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                    config.checkoutMode === 'email'
                      ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Switch to Form-to-Email endpoint checkout"
                >
                  <Mail className="w-2.5 h-2.5" /> Email Form
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-500 to-blue-700 shadow-glow-blue transition-transform group-hover:scale-105">
              <Zap className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              MUCHCOM<span className="text-green-400">TECH</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {SHOP_ENABLED && (
              <Link
                to="/shop"
                aria-label="Search catalog"
                className="p-2 text-slate-300 hover:text-green-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                title="Search Catalog"
              >
                <Search className="w-5 h-5" />
              </Link>
            )}

            {SHOP_ENABLED && (
              <Link
                to="/cart"
                aria-label="View cart"
                className="relative p-2 text-slate-200 hover:text-green-400 bg-slate-800/70 border border-slate-700/80 rounded-xl transition-all hover:border-green-500/40 flex items-center gap-2 group"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                {cartCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-slate-950 bg-green-400 rounded-full shadow-glow-green">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0B0F17]/95 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {SHOP_ENABLED && (
            <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase px-3">Checkout Mode</span>
              <div className="grid grid-cols-2 gap-2 px-3">
                <button
                  onClick={() => {
                    setCheckoutMode('whatsapp');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold text-center border ${
                    config.checkoutMode === 'whatsapp'
                      ? 'bg-green-500/20 text-green-300 border-green-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700'
                  }`}
                >
                  WhatsApp Direct
                </button>
                <button
                  onClick={() => {
                    setCheckoutMode('email');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold text-center border ${
                    config.checkoutMode === 'email'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700'
                  }`}
                >
                  Form-to-Email
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
