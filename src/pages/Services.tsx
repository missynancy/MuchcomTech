import React, { useState } from 'react';
import { Smartphone, Zap, PhoneCall, Send, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SAFARICOM_TILL = '000000';
const AIRTEL_TILL = '000000'; // TODO: replace with real Airtel Till Number

type UtilityType = 'electricity' | 'water' | 'other';
type CategoryKey = 'bingwa' | 'tunukiwa' | 'sms' | 'minutes';

interface Offer {
  price: number;
  label: string;
}

interface Category {
  title: string;
  subtitle: string;
  offers: Offer[];
}

const categories: Record<CategoryKey, Category> = {
  bingwa: {
    title: 'Bingwa Data Deals',
    subtitle: 'Buy Once Per Day Per Line',
    offers: [
      { price: 55, label: '1.25 GB Till Midnight' },
      { price: 19, label: '1 GB 1 Hour' },
      { price: 20, label: '250 MB 24 Hours' },
      { price: 51, label: '350 MB 7 Days' },
      { price: 49, label: '1.5 GB 3 Hours' },
      { price: 99, label: '1 GB 24 Hours' },
      { price: 300, label: '2.5 GB 7 Days' },
      { price: 700, label: '6 GB 7 Days' },
      { price: 998, label: '10 GB 30 Days' },
      { price: 999, label: '8 GB + 400 Mins 30 Days' },
    ],
  },
  tunukiwa: {
    title: 'Tunukiwa Deals',
    subtitle: 'Buy Many Times A Day',
    offers: [
      { price: 22, label: '1 GB 1 Hour' },
      { price: 54, label: '1.5 GB 3 Hours' },
      { price: 110, label: '2 GB 24 Hours' },
    ],
  },
  sms: {
    title: 'SMS Deals',
    subtitle: 'Buy Many Times A Day',
    offers: [
      { price: 5, label: '20 SMS 24 Hours' },
      { price: 10, label: '200 SMS 24 Hours' },
      { price: 21, label: '100 SMS 7 Days' },
      { price: 30, label: '1000 SMS 7 Days' },
      { price: 101, label: '1500 SMS 30 Days' },
      { price: 201, label: '3500 SMS 30 Days' },
    ],
  },
  minutes: {
    title: 'Minutes Deals',
    subtitle: 'Buy Many Times A Day',
    offers: [
      { price: 23, label: '350 Flex 2 Hours' },
      { price: 52, label: '50 Mins Till Midnight' },
      { price: 210, label: '250 Mins 7 Days' },
    ],
  },
};

export const Services: React.FC = () => {
  const { config, showToast } = useCart();

  const [activeCategory, setActiveCategory] = useState<CategoryKey>('bingwa');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const [utility, setUtility] = useState<UtilityType>('electricity');
  const [utilityAmount, setUtilityAmount] = useState('');
  const [airtelAmount, setAirtelAmount] = useState('');

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

  const handleSelectOffer = (offer: Offer) => {
    setSelectedOffer(offer);
  };

  const handleConfirmSafaricomOrder = () => {
    if (!selectedOffer) return;
    const message = `Safaricom Bundle Request\nCategory: ${categories[activeCategory].title}\nOffer: ${selectedOffer.label}\nAmount Paid: KSh ${selectedOffer.price}\nTill Number Used: ${SAFARICOM_TILL}\n\nHi, I've just sent KSh ${selectedOffer.price} to Till ${SAFARICOM_TILL} for the ${selectedOffer.label} bundle. Please confirm and activate it. Thank you!`;
    openWhatsAppConfirmation(message);
  };

  const handleAirtelConfirm = () => {
    if (!airtelAmount || Number(airtelAmount) <= 0) {
      showToast('Please enter the amount you wish to spend on data.');
      return;
    }
    const message = `Airtel Data Bundle Request\nAmount Paid: KSh ${airtelAmount}\nTill Number Used: ${AIRTEL_TILL}\n\nHi, I've just sent KSh ${airtelAmount} to Till ${AIRTEL_TILL} for an Airtel data bundle. Please confirm and send my bundle. Thank you!`;
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Data, SMS, Minutes & Bill Payments</h1>
        <p className="text-slate-400 text-sm">
          Buy Safaricom or Airtel bundles and pay your utility bills, confirmed instantly over WhatsApp.
        </p>
      </div>

      {/* Safaricom Offers Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Safaricom Bundle Offers</h3>
            <p className="text-xs text-slate-400">Data, SMS & Minutes — pick your deal</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(categories) as CategoryKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setActiveCategory(key);
                setSelectedOffer(null);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === key
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {categories[key].title}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-500">{categories[activeCategory].subtitle}</p>

        {/* Offer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories[activeCategory].offers.map((offer) => (
            <button
              key={offer.label}
              type="button"
              onClick={() => handleSelectOffer(offer)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedOffer?.label === offer.label
                  ? 'bg-emerald-500/20 border-emerald-500/60'
                  : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <span className="block text-white font-extrabold text-sm">KSh {offer.price}</span>
              <span className="block text-slate-400 text-[11px] mt-0.5">{offer.label}</span>
            </button>
          ))}
        </div>

        {/* Confirmation Panel */}
        {selectedOffer && (
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-emerald-500/40 space-y-4">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>You've Selected</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300">{selectedOffer.label}</span>
              <span className="text-white font-extrabold">KSh {selectedOffer.price}</span>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Pay Via</span>
                <span className="text-white font-semibold">Buy Goods and Services</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Till Number</span>
                <span className="text-white font-extrabold text-sm">{SAFARICOM_TILL}</span>
              </div>
            </div>

            <ol className="text-[11px] text-slate-400 space-y-1 list-decimal list-inside">
              <li>Go to M-Pesa → Lipa na M-Pesa → Buy Goods and Services</li>
              <li>Enter Till Number {SAFARICOM_TILL} and amount KSh {selectedOffer.price}</li>
              <li>Enter your M-Pesa PIN and complete payment</li>
              <li>Tap the button below to confirm on WhatsApp</li>
            </ol>

            <button
              type="button"
              onClick={handleConfirmSafaricomOrder}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-glow-blue flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>I've Paid — Confirm via WhatsApp</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Airtel Section */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Airtel Data Bundles</h3>
              <p className="text-xs text-slate-400">Any amount, any bundle</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Pay Via</span>
              <span className="text-white font-semibold">Buy Goods and Services</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Till Number</span>
              <span className="text-white font-extrabold text-sm">{AIRTEL_TILL}</span>
            </div>
            <p className="text-[10px] text-amber-400 pt-1">Demo Till Number — will be updated with the real number soon.</p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Amount You Wish to Spend (KSh)</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 100"
              value={airtelAmount}
              onChange={(e) => setAirtelAmount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="button"
            onClick={handleAirtelConfirm}
            className="w-full py-3.5 bg-red-500 hover:bg-red-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-glow-red flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>I've Paid — Confirm via WhatsApp</span>
          </button>
        </div>

        {/* Utility Bills Section */}
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