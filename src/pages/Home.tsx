import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Cpu, ChevronRight } from 'lucide-react';
import type { Product, Category } from '../types';
import { getFeaturedProducts, getCategories } from '../data/productService';
import { ProductCard } from '../components/ProductCard';

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

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Gen Tech Arrival 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Empower Your Life With <br className="hidden sm:inline" />
                <span className="text-gradient">Electromart Innovation</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Discover flagship smartphones, studio noise-cancelling audio, high-performance laptops, and gaming gear with direct 1-click WhatsApp order dispatch.
              </p>

              {/* Action CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-base transition-all duration-200 shadow-glow-cyan flex items-center justify-center gap-2 group"
                >
                  <span>Explore Shop Catalog</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/shop?cat=smartphones"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel text-slate-200 hover:text-white font-bold text-base hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>Flagship Deals</span>
                </Link>
              </div>

              {/* Mini Stats Banner */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block text-2xl font-black text-white">100%</span>
                  <span className="text-xs text-slate-400">Authentic Tech</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">2-Yr</span>
                  <span className="text-xs text-slate-400">Full Warranty</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white">24/7</span>
                  <span className="text-xs text-slate-400">Instant Support</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Highlight */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="glass-panel p-3 rounded-3xl border border-cyan-500/30 shadow-glow-cyan">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=60&fm=webp"
                      alt="Apex Pro Headphone"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 glass-panel rounded-xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Featured Spotlight</span>
                          <h3 className="text-sm font-bold text-white">Apex Pro ANC Headphones</h3>
                        </div>
                        <span className="text-sm font-extrabold text-cyan-300">$299.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Explore Categories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Shop by Hardware Type</h2>
          </div>
          <Link
            to="/shop"
            className="mt-3 sm:mt-0 text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?cat=${cat.slug}`}
              className="group glass-card p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1.5 transition-all text-center flex flex-col items-center justify-between"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 bg-slate-900 p-1">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
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
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Curated Collection</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Featured Flagship Gadgets</h2>
          </div>
          <Link
            to="/shop"
            className="mt-3 sm:mt-0 text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
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
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Customer Reviews</span>
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-extrabold">
                  DR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">David Miller</h4>
                  <span className="text-xs text-slate-400">Verified Buyer — NYC</span>
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
                "The Apex Pro headphones ANC is phenomenal. Studio acoustics and the glass UI on Electromart made selecting specs seamless."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold">
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-extrabold">
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
