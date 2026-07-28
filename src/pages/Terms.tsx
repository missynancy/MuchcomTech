import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">Terms of Service</h1>
      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
        <p>By ordering from Muchcom Tech, you agree to pay the exact listed price via the Till Number or method specified at checkout, and to provide a valid M-PESA confirmation code where required for Safaricom services.</p>
        <p>All electronics come with the warranty period stated on the product listing. Warranty claims require proof of purchase.</p>
        <p>Orders are confirmed once payment is verified. Delivery times are estimates and may vary based on location and stock availability.</p>
        <p>Prices are subject to change without prior notice. Safaricom service fees (M-PESA, SIM registration, Till applications) follow standard Safaricom terms in addition to these.</p>
      </div>
    </div>
  );
};
