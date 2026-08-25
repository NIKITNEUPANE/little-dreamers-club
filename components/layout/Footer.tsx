'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Heart, Shield, Sparkles, Star } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { db } from '../../lib/db/store';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const res = await db.subscribeNewsletter(email);
    setStatus(res);
    setLoading(false);
    if (res.success) {
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FAF4FC]/70 border-t border-[#E8E2EE] pt-8 pb-6">
      {/* Compact Trust Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 border-b border-[#E8E2EE]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EFEAF6] flex items-center justify-center text-[#604E72] shrink-0">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#362945]">100% GOTS Organic</h4>
              <p className="text-[0.7rem] text-[#7E6A94]">Gentle from day one</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EFEAF6] flex items-center justify-center text-[#604E72] shrink-0">
              <Star className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#362945]">Heirloom Quality</h4>
              <p className="text-[0.7rem] text-[#7E6A94]">Cherished for years</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EFEAF6] flex items-center justify-center text-[#604E72] shrink-0">
              <Heart className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#362945]">Linen Keepsake Box</h4>
              <p className="text-[0.7rem] text-[#7E6A94]">Curated with care</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EFEAF6] flex items-center justify-center text-[#604E72] shrink-0">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#362945]">Free Shipping & Returns</h4>
              <p className="text-[0.7rem] text-[#7E6A94]">Over $75 • 30 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 space-y-3">
            <BrandLogo size="sm" />
            <p className="text-xs text-[#7E6A94] leading-relaxed max-w-sm">
              Heirloom sleepwear, buttery blankets, and imaginative play treasures made for little dreams.
            </p>

            <form onSubmit={handleSubscribe} suppressHydrationWarning className="pt-1 max-w-sm">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for little surprises..."
                  required
                  suppressHydrationWarning
                  className="w-full bg-[#FFFFFF] border border-[#E8E2EE] rounded-full py-2 pl-3.5 pr-24 text-xs text-[#2A2433] placeholder-[#9F8EB9] focus:outline-none focus:border-[#7E6A94]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1 px-3.5 py-1.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-[0.68rem] font-semibold uppercase tracking-wider transition-all"
                >
                  {loading ? '...' : 'Join'}
                </button>
              </div>
              {status && (
                <p className={`text-[0.7rem] mt-1 ${status.success ? 'text-[#604E72] font-semibold' : 'text-[#D9534F]'}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>

          {/* Nav Links (3 columns) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6">
            {/* Shop Column */}
            <div>
              <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-[#362945] mb-2.5">
                Shop
              </h4>
              <ul className="space-y-1.5 text-xs text-[#7E6A94]">
                <li><Link href="/shop?sort=newest" className="hover:text-[#604E72] transition-colors">New Arrivals</Link></li>
                <li><Link href="/shop?sort=best-selling" className="hover:text-[#604E72] transition-colors">Bestsellers</Link></li>
                <li><Link href="/shop?category=sleepwear" className="hover:text-[#604E72] transition-colors">Sleepwear</Link></li>
                <li><Link href="/shop?category=clothing" className="hover:text-[#604E72] transition-colors">Clothing</Link></li>
                <li><Link href="/shop?category=toys" className="hover:text-[#604E72] transition-colors">Toys</Link></li>
                <li><Link href="/shop?category=gifts" className="hover:text-[#604E72] transition-colors">Gifts</Link></li>
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-[#362945] mb-2.5">
                Care & Help
              </h4>
              <ul className="space-y-1.5 text-xs text-[#7E6A94]">
                <li><Link href="/contact" className="hover:text-[#604E72] transition-colors">Contact Support</Link></li>
                <li><Link href="/shipping" className="hover:text-[#604E72] transition-colors">Shipping & Delivery</Link></li>
                <li><Link href="/returns" className="hover:text-[#604E72] transition-colors">Easy Returns</Link></li>
                <li><Link href="/faq" className="hover:text-[#604E72] transition-colors">FAQs</Link></li>
                <li><Link href="/account" className="hover:text-[#604E72] transition-colors">Track Order</Link></li>
              </ul>
            </div>

            {/* About & Legal Column */}
            <div>
              <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-[#362945] mb-2.5">
                About & Admin
              </h4>
              <ul className="space-y-1.5 text-xs text-[#7E6A94]">
                <li><Link href="/about" className="hover:text-[#604E72] transition-colors">Our Philosophy</Link></li>
                <li><Link href="/returns#privacy" className="hover:text-[#604E72] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/returns#terms" className="hover:text-[#604E72] transition-colors">Terms of Service</Link></li>
                <li><Link href="/admin" className="hover:text-[#604E72] text-[#604E72] font-semibold transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 border-t border-[#E8E2EE]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.7rem] text-[#7E6A94]">
        <p>© {new Date().getFullYear()} Little Dreamers Club. All rights reserved.</p>

        {/* Payment Icons */}
        <div className="flex items-center gap-2 text-[0.65rem] font-medium text-[#604E72]">
          <span className="px-2 py-0.5 rounded-xs bg-white border border-[#E8E2EE]">Visa</span>
          <span className="px-2 py-0.5 rounded-xs bg-white border border-[#E8E2EE]">Mastercard</span>
          <span className="px-2 py-0.5 rounded-xs bg-white border border-[#E8E2EE]">Apple Pay</span>
          <span className="px-2 py-0.5 rounded-xs bg-[#EFEAF6] border border-[#DDD6E9] font-bold">COD Available</span>
        </div>
      </div>
    </footer>
  );
};
