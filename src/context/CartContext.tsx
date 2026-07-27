import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, CartItem, CustomerDetails, AppConfig, CheckoutMode } from '../types';
import { getAppConfig, saveAppConfig } from '../config/appConfig';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  config: AppConfig;
  setCheckoutMode: (mode: CheckoutMode) => void;
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CART_STORAGE_KEY = 'muchcomtech_cart_items';
const CUSTOMER_STORAGE_KEY = 'muchcomtech_customer_info';

const defaultCustomer: CustomerDetails = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  notes: '',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [config, setConfigState] = useState<AppConfig>(getAppConfig);

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved ? { ...defaultCustomer, ...JSON.parse(saved) } : defaultCustomer;
    } catch {
      return defaultCustomer;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerDetails));
    } catch (e) {
      console.error('Error saving customer info to localStorage', e);
    }
  }, [customerDetails]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevItems, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.product.id === productId);
      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.product.name}" from cart`);
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const setCheckoutMode = (mode: CheckoutMode) => {
    const updated = saveAppConfig({ checkoutMode: mode });
    setConfigState(updated);
    showToast(`Checkout mode switched to: ${mode === 'whatsapp' ? 'WhatsApp Direct' : 'Form-to-Email'}`);
  };

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        config,
        setCheckoutMode,
        customerDetails,
        updateCustomerDetails,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

