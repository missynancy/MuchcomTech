import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Cpu, Headphones, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Brand Hero Story */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>About Electromart</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Next-Generation Technology <br />
          <span className="text-gradient">Engineered For Performers</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
          Founded in 2026, Electromart was built with a singular mission: eliminating friction in purchasing high-end consumer electronics, flagship smartphones, and professional audio gear.
        </p>
      </div>

      {/* Grid Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Direct-to-Consumer Speed</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            By leveraging instant WhatsApp ordering and direct fulfillment pipelines, we remove middleman markups and deliver flagship tech to your doorstep within hours.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-purple-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Uncompromising Authenticity</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every product in our catalog undergoes rigorous quality control testing and carries an official 2-year manufacturer warranty guarantee.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Expert Audio & Tech Support</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Have questions about specs or setup? Our dedicated tech support team is available live on WhatsApp to guide your purchase decisions.
          </p>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-4xl sm:text-5xl font-black text-cyan-400">12,500+</span>
            <span className="block text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">Orders Fulfilled</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-white">99.4%</span>
            <span className="block text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">Customer Satisfaction</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-purple-400">2-Year</span>
            <span className="block text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">Warranty Standard</span>
          </div>
          <div>
            <span className="text-4xl sm:text-5xl font-black text-emerald-400">24/7</span>
            <span className="block text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">WhatsApp Dispatch</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-bold text-white">Ready to Upgrade Your Tech Setup?</h3>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-glow-cyan transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
