'use client';

import React from 'react';
import Link from 'next/link';
import { X, Heart, User, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, wishlistCount }) => {
  if (!isOpen) return null;

  const navLinks = [
    { label: 'New Arrivals', href: '/shop?sort=newest', highlight: true },
    { label: 'Shop All Products', href: '/shop' },
    { label: 'Sleep & Loungewear', href: '/shop?category=sleepwear' },
    { label: 'Everyday Clothing', href: '/shop?category=clothing' },
    { label: 'Toys & Imagination', href: '/shop?category=toys' },
    { label: 'Nursery & Bedding', href: '/shop?category=nursery' },
    { label: 'Curated Gifts', href: '/shop?category=gifts' },
    { label: 'Collections', href: '/collections/dreamy-sleep' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2A2433]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-12">
        <div className="w-screen max-w-xs sm:max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col border-r border-[#E8E2EE]">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2EE] flex items-center justify-between bg-white">
            <BrandLogo variant="compact" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#7E6A94] hover:text-[#2A2433] hover:bg-[#EFEAF6] transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto p-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  link.highlight
                    ? 'bg-[#F4EFF9] text-[#604E72] font-semibold'
                    : 'text-[#362945] hover:bg-[#EFEAF6]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9F8EB9]" />
              </Link>
            ))}

            <div className="pt-4 pb-2 border-t border-[#E8E2EE] mt-4">
              <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#7E6A94] px-3">
                Account & Help
              </span>
            </div>

            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 text-sm text-[#4A3E56] hover:bg-[#EFEAF6] rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#7E6A94]" />
                <span>My Account & Orders</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9F8EB9]" />
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 text-sm text-[#4A3E56] hover:bg-[#EFEAF6] rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-[#7E6A94]" />
                <span>Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#F7E6EB] text-[#4A3E56] font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 text-sm text-[#604E72] hover:bg-[#EFEAF6] rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Admin Portal</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9F8EB9]" />
            </Link>
          </div>

          {/* Footer Info */}
          <div className="p-5 border-t border-[#E8E2EE] bg-[#FFFFFF] text-xs text-[#7E6A94] space-y-1">
            <p className="font-semibold text-[#362945]">Little Dreamers Club</p>
            <p>Heirloom sleepwear & dreamy keepsakes.</p>
            <p className="pt-2 text-[0.68rem] text-[#9F8EB9]">care@littledreamersclub.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
