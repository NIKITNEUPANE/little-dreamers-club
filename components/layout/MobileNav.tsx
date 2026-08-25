'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Heart, User, Sparkles, ChevronRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { useMobileMenu } from '../../lib/store/useMobileMenuStore';
import { useWishlist } from '../../lib/store/useWishlistStore';
import { useCart } from '../../lib/store/useCartStore';

export const MobileNav: React.FC = () => {
  const { isOpen, closeMenu } = useMobileMenu();
  const { count: wishlistCount } = useWishlist();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { label: 'New Arrivals', href: '/shop?sort=newest', highlight: true },
    { label: 'Shop All Products', href: '/shop' },
    { label: 'Sleep & Loungewear', href: '/shop?category=sleepwear' },
    { label: 'Everyday Clothing', href: '/shop?category=clothing' },
    { label: 'Toys & Imagination', href: '/shop?category=toys' },
    { label: 'Nursery & Bedding', href: '/shop?category=nursery' },
    { label: 'Curated Gifts', href: '/shop?category=gifts' },
    { label: 'Dreamy Sleep Collection', href: '/collections/dreamy-sleep' },
    { label: 'Little Adventures Collection', href: '/collections/little-adventures' },
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Dark Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-[#2A2433]/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Sliding Sidebar Panel */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10 z-[101] pointer-events-auto">
        <aside className="w-screen max-w-xs sm:max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col border-r border-[#E8E2EE] animate-in slide-in-from-left duration-300">
          {/* Top Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8E2EE] flex items-center justify-between bg-white">
            <BrandLogo variant="compact" />
            <button
              type="button"
              onClick={closeMenu}
              className="p-2 rounded-full text-[#7E6A94] hover:text-[#2A2433] hover:bg-[#EFEAF6] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  link.highlight
                    ? 'bg-[#F4EFF9] text-[#604E72] font-semibold'
                    : 'text-[#362945] hover:bg-[#EFEAF6]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {link.highlight && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9F8EB9]" />
              </Link>
            ))}

            <div className="pt-4 pb-2 border-t border-[#E8E2EE] mt-4">
              <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-[#7E6A94] px-3.5">
                Quick Shortcuts
              </span>
            </div>

            <Link
              href="/account"
              onClick={closeMenu}
              className="flex items-center justify-between px-3.5 py-2.5 text-sm text-[#4A3E56] hover:bg-[#EFEAF6] rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#7E6A94]" />
                <span>My Account & Orders</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9F8EB9]" />
            </Link>

            <Link
              href="/wishlist"
              onClick={closeMenu}
              className="flex items-center justify-between px-3.5 py-2.5 text-sm text-[#4A3E56] hover:bg-[#EFEAF6] rounded-xl transition-colors"
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

            <button
              type="button"
              onClick={() => {
                closeMenu();
                openCart();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-[#4A3E56] hover:bg-[#EFEAF6] rounded-xl transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#7E6A94]" />
                <span>Shopping Bag</span>
              </div>
              {itemCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#604E72] text-[#FAF8F5] font-semibold">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              href="/admin"
              onClick={closeMenu}
              className="flex items-center justify-between px-3.5 py-2.5 text-sm text-[#604E72] hover:bg-[#EFEAF6] rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Admin Portal</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9F8EB9]" />
            </Link>
          </div>

          {/* Footer Info */}
          <div className="p-4 sm:p-5 border-t border-[#E8E2EE] bg-[#FFFFFF] text-xs text-[#7E6A94] space-y-1">
            <p className="font-semibold text-[#362945]">Little Dreamers Club</p>
            <p>Heirloom sleepwear & dreamy keepsakes.</p>
            <p className="pt-1 text-[0.68rem] text-[#9F8EB9]">care@littledreamersclub.com</p>
          </div>
        </aside>
      </div>
    </div>
  );
};
