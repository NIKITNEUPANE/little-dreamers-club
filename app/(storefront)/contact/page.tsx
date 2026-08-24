'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>We&apos;re Here to Help</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#2A2433]">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-[#7E6A94]">
            Have a question about sizing, custom gift curation, or delivery? Our care team is always here for your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="md:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-6">
            <h3 className="font-editorial text-xl font-semibold text-[#362945]">
              Club Concierge
            </h3>

            <div className="space-y-4 text-xs text-[#7E6A94]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#604E72] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2A2433] block">Email Support</strong>
                  <span>care@littledreamersclub.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#604E72] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2A2433] block">Toll-Free Phone</strong>
                  <span>+1 (800) 458-3732</span>
                  <p className="text-[0.68rem] text-[#9F8EB9]">Mon–Fri, 9am–6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#604E72] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2A2433] block">Atelier Studio</strong>
                  <span>742 Little Cloud Way, Suite 400</span>
                  <p>Seattle, WA 98101</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#362945]">
                  Message Received
                </h3>
                <p className="text-xs text-[#7E6A94] max-w-xs mx-auto">
                  Thank you for writing to us. One of our little dreamers caretakers will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Eleanor Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Size question / Order inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-dream transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
