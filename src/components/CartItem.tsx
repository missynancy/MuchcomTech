import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

interface CartItemProps {
  item: CartItemType;
}

export const CartItemRow: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart, config } = useCart();
  const { product, quantity } = item;

  const itemTotal = product.price * quantity;

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 transition-all hover:border-slate-700">
      {/* Product Image & Info */}
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <Link to={`/product/${product.id}`} className="shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-slate-900 border border-slate-800 p-1"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`}>
            <h4 className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors line-clamp-1">
              {product.name}
            </h4>
          </Link>
          <p className="text-xs text-slate-400 mt-1">
            Unit Price: {formatCurrency(product.price, config.currencyCode, config.currencySymbol)}
          </p>
        </div>
      </div>

      {/* Controls & Line Total */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-800 rounded-xl p-1">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-bold text-white">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[90px]">
          <span className="block text-xs text-slate-400">Total</span>
          <span className="text-base font-extrabold text-white">
            {formatCurrency(itemTotal, config.currencyCode, config.currencySymbol)}
          </span>
        </div>

        {/* Delete Action */}
        <button
          onClick={() => removeFromCart(product.id)}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          title="Remove Item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
