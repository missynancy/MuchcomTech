import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, PhoneCall } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Ordering & WhatsApp Flow',
      question: 'How does WhatsApp Direct Checkout work on muchcomtech?',
      answer: 'When you select WhatsApp checkout in your Cart and click "Send Order via WhatsApp", muchcomtech compiles your selected line items, delivery address, and total amount into a nicely formatted message and opens WhatsApp automatically via wa.me. You can directly confirm payment and delivery with our support agent.',
    },
    {
      category: 'Ordering & WhatsApp Flow',
      question: 'Can I switch between WhatsApp and Form-to-Email checkout?',
      answer: 'Yes! On the Cart page (and top navigation header), you can toggle between WhatsApp Direct and Form-to-Email mode using our swappable configuration switcher.',
    },
    {
      category: 'Warranty & Genuine Products',
      question: 'Are all products authentic and covered by warranty?',
      answer: 'Absolutely. Every laptop, smartphone, headphone, and gadget sold on muchcomtech is 100% genuine original brand stock and comes with a 2-year official hardware warranty.',
    },
    {
      category: 'Shipping & Delivery',
      question: 'How long does shipping take and what does it cost?',
      answer: 'We offer express delivery. Orders over KSh 150 qualify for FREE delivery. Local metro deliveries arrive within 24 hours, while standard regional shipping takes 2-3 business days.',
    },
    {
      category: 'Payment Methods',
      question: 'What payment methods do you accept?',
      answer: 'We support Cash on Delivery, WhatsApp direct bank transfer/mobile money, and card payments depending on your chosen checkout mode.',
    },
    {
      category: 'Returns & Refunds',
      question: 'What is your return policy?',
      answer: 'We offer a 14-day hassle-free return policy for unopened items in original packaging. If an item arrives defective, our WhatsApp support team will immediately arrange a replacement.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>Support & Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Everything you need to know about our products, WhatsApp ordering flow, warranties, and shipping.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`glass-panel rounded-2xl border transition-all ${
                isOpen ? 'border-blue-500/40 bg-slate-900/80 shadow-glow-blue-sm' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-base"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 block">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <div className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Still have questions?</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Can't find the answer you're looking for? Reach out directly to our support team on WhatsApp.
        </p>
        <a
          href="https://wa.me/254725260133?text=Hi%20muchcomtech!%20I%20have%20a%20question%20about%20my%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-glow-blue transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Chat With Us on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};


