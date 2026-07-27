import React, { useState } from 'react';
import { Smartphone, Zap, PhoneCall, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SAFARICOM_TILL = '000000'; // TODO: replace with real Safaricom Buy Goods Till Number
const AIRTEL_TILL = '000000'; // TODO: replace with real Airtel Till Number

type UtilityType = 'electricity' | 'water' | 'other';

export const Services: React.FC = () => {
  const { config, showToast } = useCart();

  const [utility, setUtility] = useState<UtilityType>('electricity');
  const [utilityAmount, setUtilityAmount] = useState('');
  const [dataAmount, setDataAmount] = useState('');
  const [dataNetwork, setDataNetwork] = useState<'safaricom' | 'airtel'>('safaricom');

  const utilityLabels: Record<UtilityType, string> = {
    electricity: 'Electricity (KPLC Tokens)',
    water: 'Water Bill',
    other: 'Other Utility',
  };

  const openWhatsAppConfirmation = (message: string) => {
    const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  const handleDataBundleConfirm = () => {
    if (!dataAmount || Number(dataAmount) <= 0) {
      showToast('Please enter the amount you wish to spend on data.');
      return;
    }
    const till = dataNetwork === 'safaricom' ? SAFARICOM_TILL : AIRTEL_TILL;
    const networkName = dataNetwork === 'safaricom' ? 'Safaricom' : 'Airtel';
    const message = `Data Bundle Request\nNetwork: ${networkName}\nAmount Paid: KSh ${dataAmount}\nTill Number Used: ${till}\n\nHi, I've just sent KSh ${dataAmount} to Till ${till} for a ${networkName} data bundle. Please confirm and send my bundle. Thank you!`;
    openWhatsAppConfirmation(message);
  };

  const handleUtilityConfirm = () => {
    if (!utilityAmount || Number(utilityAmount) <= 0) {
      showToast('Please enter the amount you wish to pay.');
      return;
    }
    const message = `Utility Bill Payment Request\nUtility: ${utilityLabels[utility]}\nAmount Paid: KSh ${utilityAmount}\nTill Number Used: ${SAFARICOM_TILL}\n\nHi, I've just sent KSh ${utilityAmount} to Till ${SAFARICOM_TILL} for my ${utilityLabels[utility]} payment. Please process it and send me my token/confirmation. Thank you!`;
    openWhatsAppConfirmation(message);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Mobile Money Services</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Data Bundles & Bill Payments</h1>
        <p className="text-slate-400 text-sm">
          Buy Safaricom or Airtel data bundles and pay your utility bills, all confirmed instantly over WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Data Bundle Offers</h3>
              <p className="text-xs text-slate-400">Safaricom & Airtel — any amount, any bundle</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <span className="block text-slate-300 font-semibold">Select Network:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDataNetwork('safaricom')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  dataNetwork === 'safaricom'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                Safaricom
              </button>
              <button
                type="button"
                onClick={() => setDataNetwork('airtel')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  dataNetwork === 'airtel'
                    ? 'bg-red-500/20 text-red-300 border-red-500/50'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                Airtel
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Pay Via</span>
              <span className="text-white font-semibold">Buy Goods and Services</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Till Number ({dataNetwork === 'safaricom' ? 'Safaricom' : 'Airtel'})</span>
              <span className="text-white font-extrabold text-sm">{dataNetwork === 'safaricom' ? SAFARICOM_TILL : AIRTEL_TILL}</span>
            </div>
            <p className="text-[10px] text-amber-400 pt-1">Demo Till Number — will be updated with the real number soon.</p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Amount You Wish to Spend (KSh)</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 100"
              value={dataAmount}
              onChange={(e) => setDataAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <ol className="text-[11px] text-slate-400 space-y-1 list-decimal list-inside">
            <li>Go to M-Pesa / Airtel Money → Lipa na M-Pesa / Pay Bill → Buy Goods and Services</li>
            <li>Enter the Till Number above and the amount you wish to spend</li>
            <li>Complete the payment, then tap the button below to confirm on WhatsApp</li>
          </ol>

          <button
            type="button"
            onClick={handleDataBundleConfirm}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-glow-blue flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>I've Paid — Confirm via WhatsApp</span>
          </button>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Utility Bill Payments</h3>
              <p className="text-xs text-slate-400">Electricity tokens, water bills & more</p>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Select Utility Type</label>
            <select
              value={utility}
              onChange={(e) => setUtility(e.target.value as UtilityType)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="electricity">Electricity (KPLC Tokens)</option>
              <option value="water">Water Bill</option>
              <option value="other">Other Utility</option>
            </select>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Pay Via</span>
              <span className="text-white font-semibold">Buy Goods and Services</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Till Number</span>
              <span className="text-white font-extrabold text-sm">{SAFARICOM_TILL}</span>
            </div>
            <p className="text-[10px] text-amber-400 pt-1">Demo Till Number — will be updated with the real number soon.</p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Amount You Wish to Pay (KSh)</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 500"
              value={utilityAmount}
              onChange={(e) => setUtilityAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <ol className="text-[11px] text-slate-400 space-y-1 list-decimal list-inside">
            <li>Go to M-Pesa → Lipa na M-Pesa → Buy Goods and Services</li>
            <li>Enter the Till Number above and the amount for your bill</li>
            <li>Complete the payment, then tap the button below to confirm on WhatsApp</li>
          </ol>

          <button
            type="button"
            onClick={handleUtilityConfirm}
            className="w-full py-3.5 bg-blue-500 hover:bg-blue-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-glow-red flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>I've Paid — Confirm via WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-3 max-w-3xl mx-auto">
        <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400">
          After paying, confirm your order via WhatsApp with your phone number and amount sent. SMS confirmation support is coming soon.
        </p>
      </div>
    </div>
  );
};
