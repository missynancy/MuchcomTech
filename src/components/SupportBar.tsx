import React from 'react';
import { Phone, MessageCircle, AlertCircle } from 'lucide-react';

export const SupportBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-red-500/30 px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
        <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
          Delayed bundle delivery? Contact us now
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a href="tel:0725260133" className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Call</span>
        </a>
        <a href="https://wa.me/254791618090?text=Hi%20Muchcom%20Tech%2C%20my%20bundle%20delivery%20is%20delayed." target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
