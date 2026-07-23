import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, PackageX } from 'lucide-react';
import type { Product, Category, FilterOptions } from '../types';
import { getProducts, getCategories } from '../data/productService';
import { ProductCard } from '../components/ProductCard';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [sortBy, setSortBy] = useState<FilterOptions['sortBy']>('featured');

  useEffect(() => {
    async function loadCategories() {
      const cats = await getCategories();
      setCategories(cats);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    const catFromUrl = searchParams.get('cat');
    if (catFromUrl) {
      setSelectedCategory(catFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      const res = await getProducts({
        category: selectedCategory,
        searchQuery: searchQuery,
        maxPrice: maxPrice,
        sortBy: sortBy,
      });
      setProducts(res);
      setLoading(false);
    }
    fetchFiltered();
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  const handleCategorySelect = (catSlug: string) => {
    setSelectedCategory(catSlug);
    if (catSlug === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', catSlug);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(2500);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Shop Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Hardware Catalog</h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore cutting-edge electronics, flagship mobiles, and audio gear.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search gadgets, specs, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>Filters</span>
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-300 uppercase tracking-wider">Max Price</label>
                <span className="font-extrabold text-cyan-400">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$100</span>
                <span>$2,500</span>
              </div>
            </div>

            {/* Sorting Dropdown */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as FilterOptions['sortBy'])}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="featured">Featured / Highlighted</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Right Catalog Grid */}
        <main className="lg:col-span-3 space-y-6">
          {/* Active Filter Pills */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong className="text-white">{products.length}</strong> items</span>
            {selectedCategory !== 'all' && (
              <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                Category: <strong className="capitalize">{selectedCategory}</strong>
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-80 bg-slate-900/60 rounded-2xl border border-slate-800" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-4">
              <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No products found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We couldn't find any hardware matching your current category or search criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-cyan-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-glow-cyan"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
