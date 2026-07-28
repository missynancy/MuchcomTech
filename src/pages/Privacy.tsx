import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>Muchcom Tech collects only the information needed to process your order or service request: your name, phone number, and delivery location where applicable.</p>
        <p>We do not sell or share your personal information with third parties. Order details shared via WhatsApp are used solely to fulfil your request.</p>
        <p>M-PESA transaction details (such as confirmation codes) are used only to verify payment and are not stored beyond what is needed for that purpose.</p>
        <p>If you have questions about how your information is handled, contact us directly via WhatsApp or email listed in our Contact page.</p>
      </div>
    </div>
  );
};
