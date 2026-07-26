import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, ShoppingCart, ArrowLeft, Check, Zap, Share2 } from 'lucide-react';
import type { Product } from '../types';
import { getProductById, getRelatedProducts } from '../data/productService';
import { useCart } from '../context/CartContext';
import { formatCurrency, calculateDiscountPercent } from '../utils/formatters';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems, config, showToast } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      setLoading(true);
      const data = await getProductById(id);
      if (data) {
        setProduct(data);
        setSelectedImage(data.image);
        const related = await getRelatedProducts(data.id, data.category, 3);
        setRelatedProducts(related);
      }
      setLoading(false);
    }
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-8">
        <div className="h-8 bg-slate-900 w-1/4 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-96 bg-slate-900 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-10 bg-slate-900 w-3/4 rounded-xl" />
            <div className="h-6 bg-slate-900 w-1/2 rounded-xl" />
            <div className="h-32 bg-slate-900 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The hardware item you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice
    ? calculateDiscountPercent(product.originalPrice, product.price)
    : 0;

  const isInCart = cartItems.some((item) => item.product.id === product.id);

  const handleInstantWhatsAppOrder = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-green-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-4 rounded-3xl border border-slate-800 aspect-square flex items-center justify-center relative overflow-hidden bg-slate-900/80">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl transition-all duration-300"
            />
            {discountPercent > 0 && (
              <span className="absolute top-6 left-6 bg-red-600 from-purple-600 to-pink-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-lg">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-900 shrink-0 ${
                    selectedImage === imgUrl ? 'border-blue-400 shadow-glow-blue' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-xs font-bold text-white ml-1.5">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-slate-700">|</span>
              <span className="inline-flex items-center text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20">
                In Stock & Ready to Ship
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Retail Price</span>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-white">
                  {formatCurrency(product.price, config.currencyCode, config.currencySymbol)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-500 line-through">
                    {formatCurrency(product.originalPrice, config.currencyCode, config.currencySymbol)}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleShare}
              className="p-2.5 text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800 transition-colors"
              title="Share Link"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity</span>
              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-slate-400 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-slate-400 hover:text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => addToCart(product, quantity)}
                className={`py-3.5 px-6 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                  isInCart
                    ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan'
                }`}
              >
                {isInCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                <span>{isInCart ? 'In Cart (Add More)' : 'Add to Shopping Cart'}</span>
              </button>

              <button
                onClick={handleInstantWhatsAppOrder}
                className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Buy Now & Checkout</span>
              </button>
            </div>
          </div>

          {/* Guarantees Callout */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>2-Year Official Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Free Express Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Technical Specifications</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {product.specs.map((spec, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
            >
              <span className="text-slate-400 font-semibold">{spec.name}</span>
              <span className="text-white font-bold">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h3 className="text-xl font-bold text-white">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
