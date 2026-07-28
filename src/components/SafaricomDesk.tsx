import React from 'react';
import { Smartphone, IdCard, Repeat, Landmark, MessageCircle } from 'lucide-react';

const services = [
  {
    icon: Landmark,
    title: 'M-PESA Services',
    desc: 'Deposit, withdraw, and send money instantly at our Safaricom agent desk.',
  },
  {
    icon: IdCard,
    title: 'SIM Registration & Replacement',
    desc: 'New line registration or lost/damaged SIM replacement, done on the spot.',
  },
  {
    icon: Repeat,
    title: 'Lipa na M-PESA Till Applications',
    desc: 'Setting up a Till Number for your own business? We handle the full application.',
  },
];

export const SafaricomDesk: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-green-500/25 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
              Authorized Safaricom Agent
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              The Safaricom Desk
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Skip the queue at other agents — walk in or message us for any Safaricom service,
              same day.
            </p>
          </div>
          <a
            href="https://wa.me/254791618090?text=Hi%20Muchcom%20Tech%2C%20I%27d%20like%20help%20with%20a%20Safaricom%20service."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-slate-950 font-extrabold text-sm px-5 py-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat With the Desk
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-green-500/40 transition-colors"
              >
                <div className="bg-green-500/15 text-green-400 rounded-xl w-11 h-11 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{service.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
