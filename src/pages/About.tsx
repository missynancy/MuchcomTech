import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Landmark, MessageCircle, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Brand Hero Story */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          <span>About Muchcom Tech</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Your Local Safaricom Agent <br />
          <span className="text-gradient">& Electronics Shop, In One Place</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
          Muchcom Tech is a Safaricom agent shop and electronics retailer. Whether you're topping up
          a data bundle, registering a new SIM, or picking up a genuine smartphone or accessory,
          we're the one stop for it.
        </p>
      </div>

      {/* Grid Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-green-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Authorized Safaricom Agent</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            M-PESA deposits and withdrawals, SIM registration and replacement, and Lipa na M-PESA Till
            applications, handled at our desk without the queues at busy agent branches.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Genuine Electronics, Real Warranty</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every phone, laptop, and accessory we sell is genuine stock, backed by a real
            manufacturer or shop warranty, not just a promise at checkout.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">WhatsApp-First Service</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Chat with us directly to ask about a product, confirm a bundle payment, or get help
            with a delayed order — no call centers, just a real reply.
          </p>
        </div>
      </div>

      {/* Commitments Section */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-4xl sm:text-5xl font-black text-blue-400">5509000</span>
            <span className="block text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">Lipa na M-PESA Till</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-white">2-Year</span>
            <span className="block text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">Warranty Standard</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-red-400">Same-Day</span>
            <span className="block text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">Local Dispatch</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-emerald-400">24/7</span>
            <span className="block text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">WhatsApp Support</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-white">Need a Bundle, a Device, or Just Have a Question?</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-glow-red transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/254725260133"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-slate-950 font-extrabold text-sm rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat With Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};
