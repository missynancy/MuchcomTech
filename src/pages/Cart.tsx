import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Send, PhoneCall, Mail, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/CartItem';
import { formatCurrency } from '../utils/formatters';
import { openWhatsAppCheckout } from '../utils/whatsapp';
import { sendFormToEmailOrder } from '../utils/email';

export const Cart: React.FC = () => {
  const {
    cartItems,
    clearCart,
    getCartTotal,
    config,
    setCheckoutMode,
    customerDetails,
    updateCustomerDetails,
    showToast,
  } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const subtotal = getCartTotal();
  const shipping = subtotal > config.freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const tax = subtotal * config.taxRate;
  const grandTotal = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateCustomerDetails({ [name]: value });
    if (formError) setFormError(null);
  };

  const handleSendOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setFormError('Your cart is empty. Please add products before placing an order.');
      return;
    }

    if (!customerDetails.name.trim() || !customerDetails.phone.trim() || !customerDetails.address.trim()) {
      setFormError('Please fill in required customer details (Name, Phone Number, Delivery Address).');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    if (config.checkoutMode === 'whatsapp') {
      // Option A: Open WhatsApp wa.me link with compiled text
      openWhatsAppCheckout(cartItems, customerDetails, config, grandTotal);
      setSubmitting(false);
      showToast('Opening WhatsApp with your compiled order summary!');
    } else {
      // Option B: Form-to-email endpoint submission
      const result = await sendFormToEmailOrder(cartItems, customerDetails, config, grandTotal);
      setSubmitting(false);
      if (result.success) {
        setOrderSuccess(result.message);
        clearCart();
      } else {
        setFormError(result.message);
      }
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-white">Order Submitted!</h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
          {orderSuccess}
        </p>
        <div className="pt-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-glow-red"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-400" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Review your items and complete order details.</p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-slate-400 hover:text-red-400 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center border border-slate-800 space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-900 text-slate-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Your cart is currently empty</h3>
            <p className="text-sm text-slate-400">Looks like you haven't added any tech items yet.</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-glow-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Start Browsing Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Line Items & Customer Details Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Line Items List */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Cart Items ({cartItems.length})
              </h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </div>
            </div>

            {/* Customer Shipping Form */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Customer & Delivery Details</span>
              </h3>

              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSendOrder} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={customerDetails.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Phone Number (for Order Updates) *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +1 555 019 2834"
                      value={customerDetails.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={customerDetails.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">City / Region *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. New York, NY"
                      value={customerDetails.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Delivery Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="123 Innovation Way, Apt 4B"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Order Notes (Optional)</label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Gate code, special delivery instructions..."
                    value={customerDetails.notes}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Summary & Swappable Order Execution */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 sticky top-24">
              <h3 className="text-lg font-bold text-white">Order Summary</h3>

              {/* Swappable Config Flag Toggle Box */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Select Swappable Checkout Flow:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutMode('whatsapp')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                      config.checkoutMode === 'whatsapp'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>(a) WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutMode('email')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                      config.checkoutMode === 'email'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>(b) Form-to-Email</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  {config.checkoutMode === 'whatsapp'
                    ? 'Orders will compile into a pre-filled WhatsApp wa.me text string for instant chat submission.'
                    : 'Orders will submit directly to an API form-to-email endpoint.'}
                </p>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-3 text-xs border-t border-b border-slate-800 py-4">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">
                    {formatCurrency(subtotal, config.currencyCode, config.currencySymbol)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping Estimate</span>
                  <span className="font-bold text-white">
                    {shipping === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      formatCurrency(shipping, config.currencyCode, config.currencySymbol)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-bold text-white">
                    {formatCurrency(tax, config.currencyCode, config.currencySymbol)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-blue-400">
                    {formatCurrency(grandTotal, config.currencyCode, config.currencySymbol)}
                  </span>
                </div>
              </div>

              {/* Send Order Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className={`w-full py-4 rounded-xl font-extrabold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                  config.checkoutMode === 'whatsapp'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-glow-blue'
                    : 'bg-red-500 hover:bg-red-400 text-slate-950 shadow-glow-red'
                }`}
              >
                {submitting ? (
                  <span>Compiling Order...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>
                      {config.checkoutMode === 'whatsapp' ? 'Send Order via WhatsApp' : 'Submit Form Order'}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Zero spam guarantee & instant order confirmation</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
