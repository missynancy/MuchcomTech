import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="glass-panel bg-slate-900/90 border border-cyan-500/40 text-slate-100 px-4 py-3 rounded-2xl shadow-glow-cyan flex items-center space-x-3 max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
        <span className="text-sm font-semibold">{toastMessage}</span>
      </div>
    </div>
  );
};
