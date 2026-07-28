import React, { useState, useRef } from 'react';
import { Mail, PhoneCall, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Contact: React.FC = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    try {
      const response = await fetch('https://formspree.io/f/xeeyvbzl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        showToast('Your message has been sent to muchcomtech Support!');
      } else {
        showToast('Something went wrong sending your message. Please try again.');
      }
    } catch (error) {
      showToast('Failed to send message. Please check your connection.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-blue-400" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">We're Here to Help</h1>
        <p className="text-slate-400 text-sm">
          Have a question about product specs, order dispatch status, or a Safaricom service? Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Call or WhatsApp</h4>
              <p className="text-xs text-slate-400 mt-1">One number for calls and WhatsApp, instant response during business hours</p>
              <a href="tel:+254725260133" className="text-sm font-extrabold text-emerald-400 hover:underline block mt-1">
                +254 725 260 133
              </a>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Email</h4>
              <p className="text-xs text-slate-400 mt-1">For invoices and general inquiries</p>
              <a href="mailto:johnmuchwait@gmail.com" className="text-sm font-extrabold text-blue-400 hover:underline block mt-1">
                johnmuchwait@gmail.com
              </a>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Shop Location</h4>
              <p className="text-xs text-amber-400 mt-1">[Placeholder — needs your real shop address/area]</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Working Hours</h4>
              <p className="text-xs text-slate-300 mt-1">Monday - Saturday: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7" id="contact-form">
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-slate-900/80 rounded-2xl border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Thank you for contacting us!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-slate-800 text-blue-300 text-xs font-bold rounded-xl border border-slate-700 hover:bg-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-slate-300 font-semibold mb-1">Your Name *</label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-slate-300 font-semibold mb-1">Your Email *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-slate-300 font-semibold mb-1">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Product inquiry, warranty question..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-slate-300 font-semibold mb-1">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 bg-red-500 hover:bg-red-400 disabled:opacity-60 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-glow-red flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{sending ? 'Sending...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
