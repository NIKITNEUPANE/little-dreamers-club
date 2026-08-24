'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are Little Dreamers Club fabrics 100% organic and non-toxic?',
      a: 'Yes, absolutely. All of our sleepwear and garments are crafted from certified GOTS (Global Organic Textile Standard) organic cotton and modal, tested rigorously to OEKO-TEX® Standard 100 Class 1 (safe for babies from birth). We use low-impact, non-toxic organic mineral dyes and nickel-free hardware.',
    },
    {
      q: 'How does sizing run for sleepwear and rompers?',
      a: 'Our sizing is designed with room to grow. For children between sizes, we recommend sizing up so your little one can enjoy their pieces for months longer. Check our detailed size chart with height and weight measurements.',
    },
    {
      q: 'What are your delivery times and shipping costs across Nepal?',
      a: 'We offer free express delivery across Nepal on all orders over Rs. 4,000. Inside Kathmandu Valley, standard delivery is Rs. 150 (1-2 days). Outside Kathmandu Valley, express courier delivery is Rs. 300 (2-4 days).',
    },
    {
      q: 'Do you offer Cash on Delivery (COD) and Digital Wallets (eSewa / Khalti)?',
      a: 'Yes! We gladly offer Cash on Delivery across Nepal. You can also pay directly via eSewa, Khalti, or mobile banking at checkout.',
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We offer a gentle 30-day return policy on all unworn, unwashed items in their original packaging. Return pickup and size exchanges are hassle-free.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Common Inquiries</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#2A2433]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#7E6A94]">
            Everything you need to know about our organic fibers, sizing, delivery, and care.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8E2EE] shadow-2xs overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-editorial text-base sm:text-lg font-semibold text-[#362945]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#7E6A94] transition-transform duration-300 shrink-0 ml-4 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-[#7E6A94] leading-relaxed border-t border-[#F3EEF8]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
