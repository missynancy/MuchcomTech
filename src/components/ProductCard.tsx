import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye, Check, MessageCircle } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency, calculateDiscountPercent } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems, config } = useCart();

  const discountPercent = product.originalPrice
    ? calculateDiscountPercent(product.originalPrice, product.price)
    : 0;

  const isInCart = cartItems.some((item) => item.product.id === product.id);

  const whatsappMessage = `Hi Muchcom Tech, I'm interested in the ${product.name} (${formatCurrency(product.price, config.currencyCode, config.currencySymbol)}). Is it available?`;
  const whatsappLink = `https://wa.me/254725260133?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-blue hover:border-blue-500/40 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="bg-blue-500 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
            NEW
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-gradient-to-r from-red-600 to-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-900/60 p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-108"
          loading="lazy"
        />

        {/* Overlay Quick View Link */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="p-3 bg-slate-900/90 text-white hover:text-blue-400 rounded-full border border-slate-700 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-blue-400/90">{product.category}</span>
            <div className="flex items-center space-x-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-slate-200">{product.rating}</span>
              <span className="text-slate-500 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-300 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-extrabold text-white">
                {formatCurrency(product.price, config.currencyCode, config.currencySymbol)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {formatCurrency(product.originalPrice, config.currencyCode, config.currencySymbol)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-slate-950"
              title="Chat to Buy / Inquire"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Chat</span>
            </a>

            <button
              onClick={() => addToCart(product, 1)}
              className={`p-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                isInCart
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-red-500 hover:bg-red-400 text-slate-950 shadow-glow-red'
              }`}
              title={isInCart ? 'In Cart' : 'Add to Cart'}
            >
              {isInCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              <span className="hidden sm:inline text-xs">{isInCart ? 'Added' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

