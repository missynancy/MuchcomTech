import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Cpu, ChevronRight, Smartphone, ShoppingBag, KeyRound, MessageCircle } from 'lucide-react';
import type { Product, Category } from '../types';
import { getFeaturedProducts, getCategories } from '../data/productService';
import { ProductCard } from '../components/ProductCard';
import { SafaricomDesk } from '../components/SafaricomDesk';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      setLoading(true);
      const [prods, cats] = await Promise.all([
        getFeaturedProducts(),
        getCategories(),
      ]);
      setFeaturedProducts(prods);
      setCategories(cats);
      setLoading(false);
    }
    loadHomeData();
  }, []);

  const dealTabs = [
    { id: 'data', label: 'Data Deals' },
    { id: 'minutes', label: 'Minutes Deals' },
    { id: 'sms', label: 'SMS Deals' },
    { id: 'tunukiwa', label: 'Tunukiwa Specials' },
  ];
  const [activeDealTab, setActiveDealTab] = useState('data');

  const deals = [
    { category: 'data', title: '1.25 GB Data Bundle', price: 55, validity: 'Till Midnight' },
    { category: 'data', title: '1 GB Data Bundle', price: 99, validity: '24 Hours' },
    { category: 'data', title: '1.5 GB Data Bundle', price: 50, validity: '3 Hours' },
    { category: 'data', title: '1 GB Data Bundle', price: 19, validity: '1 Hour' },
    { category: 'data', title: '250 MB Data Bundle', price: 20, validity: '24 Hours' },
    { category: 'data', title: '350 MB Data Bundle', price: 49, validity: '7 Days' },
    { category: 'minutes', title: '45 Minutes Bundle', price: 22, validity: '3 Hours' },
    { category: 'minutes', title: '50 Minutes Bundle', price: 51, validity: 'Till Midnight' },
    { category: 'minutes', title: '100 Minutes Bundle', price: 98, validity: '2 Days' },
    { category: 'sms', title: '20 SMS Bundle', price: 5, validity: '24 Hours' },
    { category: 'sms', title: '200 SMS Bundle', price: 10, validity: '24 Hours' },
    { category: 'sms', title: '1000 SMS Bundle', price: 30, validity: '7 Days' },
    { category: 'tunukiwa', title: '1 GB Data Bundle', price: 23, validity: '1 Hour', badge: 'Buy Many Times' },
    { category: 'tunukiwa', title: '1.5 GB Data Bundle', price: 52, validity: '3 Hours', badge: 'Buy Many Times' },
    { category: 'tunukiwa', title: '2 GB Data Bundle', price: 100, validity: '24 Hours', badge: 'Buy Many Times' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-green-400" />
                <span>Active 24/7 via Lipa na M-Pesa</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Instant Data, Minutes <br className="hidden sm:inline" />
                <span className="text-gradient">&amp; SMS Deals</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Sent straight to your phone. Cheaper than standard menus, pay via Till Number, message us your code, and you're topped up in minutes.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#deals" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 shadow-glow-green font-extrabold text-base transition-all duration-200 flex items-center justify-center gap-2 group">
                  <span>View Today's Deals</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>

                <Link to="/shop" className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel text-slate-200 hover:text-blue-400 font-bold text-base hover:border-blue-500/40 transition-all flex items-center justify-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <span>Shop Electronics</span>
                </Link>
              </div>

              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block text-2xl font-black text-white">24/7</span>
                  <span className="text-xs text-slate-400">Instant Support</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">Any</span>
                  <span className="text-xs text-slate-400">Network Works</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">100%</span>
                  <span className="text-xs text-slate-400">Genuine Tech</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-green-500/30 shadow-glow-green text-center bg-white">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-slate-600">
                    Lipa na M-Pesa Buy Goods Till
                  </p>
                  <div className="text-4xl sm:text-5xl font-black text-blue-900 my-3 tracking-widest">
                    5509000
                  </div>
                  <p className="text-sm font-semibold text-green-600">
                    Works even with Okoa Jahazi
                  </p>
                  <div className="mt-5 pt-5 border-t border-slate-200 text-left space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">For any delay</p>
                    <a href="tel:0725260133" className="block text-sm font-extrabold text-red-600">
                      Call / WhatsApp: 0725 260 133
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SafaricomDesk />

      {/* Deals Grid Section */}
      <section id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Safaricom Hot Deals</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Data, Minutes &amp; SMS Bundles</h2>
          <p className="text-sm text-slate-400 mt-2">Pay via Till <span className="font-bold text-blue-400">5509000</span>, then send your M-Pesa code below to activate.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {dealTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDealTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                activeDealTab === tab.id
                  ? 'bg-green-500 text-slate-950 border-green-500 shadow-glow-green'
                  : 'glass-panel text-slate-300 border-slate-700 hover:border-green-500/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals
            .filter((deal) => deal.category === activeDealTab)
            .map((deal, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between">
                <div className="p-5">
                  {deal.badge && (
                    <span className="inline-block bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full mb-2">
                      {deal.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white">{deal.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">Validity: {deal.validity}</p>
                </div>
                <div className="bg-green-500/10 border-t border-green-500/20 px-5 py-4 flex items-center justify-between">
                  <span className="text-2xl font-black text-green-400">KSh {deal.price}</span>
                  <a
                    href={`https://wa.me/254791618090?text=${encodeURIComponent(`Hi Muchcom Tech, I've paid KSh ${deal.price} for ${deal.title} to Till 5509000. Here is my M-Pesa code: `)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow transition-colors"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* How to Buy Guide Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Simple &amp; Fast</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">How to Get Your Bundle Instantly</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-4 glass-card p-5 rounded-2xl border border-slate-800">
            <div className="bg-blue-600 text-white font-bold rounded-full w-9 h-9 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">1. Open M-Pesa</h3>
              <p className="text-sm text-slate-400 mt-1">Go to your M-Pesa menu or app and select <span className="font-semibold text-slate-200">Lipa na M-Pesa</span>.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 glass-card p-5 rounded-2xl border border-slate-800">
            <div className="bg-blue-600 text-white font-bold rounded-full w-9 h-9 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">2. Enter the Till Number</h3>
              <p className="text-sm text-slate-400 mt-1">Choose <span className="font-semibold text-slate-200">Buy Goods and Services</span> and enter Till <span className="font-bold text-blue-400">5509000</span>.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 glass-card p-5 rounded-2xl border border-red-500/30 bg-red-500/5">
            <div className="bg-red-600 text-white font-bold rounded-full w-9 h-9 flex items-center justify-center shrink-0">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">3. Enter Exact Amount &amp; PIN</h3>
              <p className="text-sm text-slate-400 mt-1">Enter the <span className="font-semibold text-red-400">exact package price</span> shown above, then confirm with your M-Pesa PIN.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 glass-card p-5 rounded-2xl border border-green-500/30 bg-green-500/5">
            <div className="bg-green-600 text-slate-950 font-bold rounded-full w-9 h-9 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white">4. Send Us Your Code</h3>
              <p className="text-sm text-slate-400 mt-1">Message us your M-Pesa confirmation code on WhatsApp for instant activation.</p>
              <a
                href="https://wa.me/254791618090?text=Hi%20Muchcom%20Tech%2C%20here%20is%20my%20M-Pesa%20confirmation%20code%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 bg-green-500 hover:bg-green-400 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Send Confirmation Code
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Explore Categories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Shop by Hardware Type</h2>
          </div>
          <Link to="/shop" className="mt-3 sm:mt-0 text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group">
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?cat=${cat.slug}`}
              className="group glass-card p-4 rounded-2xl border border-slate-800 hover:border-blue-500/40 hover:-translate-y-1.5 transition-all text-center flex flex-col items-center justify-between"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 bg-slate-900 p-1">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-blue-300 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-1 font-medium">{cat.itemCount} items</span>
            </Link>
          ))}
        </div>
      </section>

      
      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Curated Collection</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Featured Flagship Gadgets</h2>
          </div>
          <Link to="/shop" className="mt-3 sm:mt-0 text-sm font-bold text-green-400 hover:text-green-300 flex items-center gap-1 group">
            <span>Browse Full Catalog</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-slate-900/60 rounded-2xl border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Placeholder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Customer Reviews</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Loved By Tech Enthusiasts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "Ordered the VortexBook Laptop directly via WhatsApp. The response was instantaneous and delivery arrived within 24 hours!"
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-slate-950 font-extrabold">
                  DR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">David Miller</h4>
                  <span className="text-xs text-slate-400">Verified Buyer</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "The Apex Pro headphones ANC is phenomenal. Studio acoustics and the glass UI on muchcomtech made selecting specs seamless."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-red-500 flex items-center justify-center text-white font-extrabold">
                  SK
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Sarah Jenkins</h4>
                  <span className="text-xs text-slate-400">Audio Engineer</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "Swapped between WhatsApp and Email ordering options in the cart easily. Top tier customer service and 2-year warranty!"
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center text-slate-950 font-extrabold">
                  MC
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Michael Chen</h4>
                  <span className="text-xs text-slate-400">Software Architect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



