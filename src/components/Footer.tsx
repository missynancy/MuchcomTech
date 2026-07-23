import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Truck, Headphones, Send, CreditCard, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 mt-auto">
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Express Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Free shipping on orders over $150</p>
            </div>
          </div>
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">2-Year Official Warranty</h4>
              <p className="text-xs text-slate-400 mt-0.5">100% genuine guaranteed items</p>
            </div>
          </div>
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Tech Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct instant response on WhatsApp</p>
            </div>
          </div>
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Secure Checkout Flow</h4>
              <p className="text-xs text-slate-400 mt-0.5">Encrypted WhatsApp & Form API</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600">
                <Zap className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ELECTRO<span className="text-cyan-400">MART</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Electromart is your destination for next-generation consumer electronics, flagship smartphones, gaming hardware, and studio audio equipment.
            </p>
            <div className="pt-2">
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email for deals..."
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 shadow-glow-cyan"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Shop Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop?cat=smartphones" className="hover:text-cyan-400 transition-colors">Smartphones</Link></li>
              <li><Link to="/shop?cat=laptops" className="hover:text-cyan-400 transition-colors">Laptops & PC</Link></li>
              <li><Link to="/shop?cat=audio" className="hover:text-cyan-400 transition-colors">Headphones & Audio</Link></li>
              <li><Link to="/shop?cat=wearables" className="hover:text-cyan-400 transition-colors">Smartwatches</Link></li>
              <li><Link to="/shop?cat=gaming" className="hover:text-cyan-400 transition-colors">Gaming Gear</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home Page</Link></li>
              <li><Link to="/shop" className="hover:text-cyan-400 transition-colors">All Products</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Electromart</Link></li>
              <li><Link to="/faq" className="hover:text-cyan-400 transition-colors">Help & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact / Store Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Store Support</h4>
            <p className="text-xs text-slate-400 mb-2">Need quick order assistance?</p>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold text-cyan-400">WhatsApp:</span> +1 555-019-2834
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold text-cyan-400">Email:</span> support@electromart.dev
              </p>
              <p className="text-slate-400">Mon - Sat: 9:00 AM - 8:00 PM EST</p>
            </div>
            <div className="mt-4 flex items-center space-x-2 text-slate-500">
              <CreditCard className="w-5 h-5" />
              <span className="text-[11px]">WhatsApp Direct Pay / Card / Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Electromart. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link to="/faq" className="hover:text-slate-400">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-slate-400">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-400">Store Locator</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
