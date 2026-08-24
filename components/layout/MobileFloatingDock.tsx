'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, LayoutGrid, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../../lib/store/useCartStore';
import { useWishlist } from '../../lib/store/useWishlistStore';

export const MobileFloatingDock: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.startsWith('/checkout') || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 flex justify-center pointer-events-none lg:hidden animate-in slide-in-from-bottom-4 duration-300">
      <nav className="pointer-events-auto flex items-center justify-around gap-1 bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#EAE4F0] px-4 py-2.5 rounded-full shadow-dream-lg max-w-sm w-full">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-colors relative ${
            pathname === '/' ? 'text-[#604E72] font-semibold' : 'text-[#7E6A94] hover:text-[#2A2433]'
          }`}
          aria-label="Home"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[0.62rem] mt-0.5 tracking-tight">Home</span>
          {pathname === '/' && (
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#D4AF37]" />
          )}
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-colors relative ${
            pathname.startsWith('/shop') ? 'text-[#604E72] font-semibold' : 'text-[#7E6A94] hover:text-[#2A2433]'
          }`}
          aria-label="Shop Catalog"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[0.62rem] mt-0.5 tracking-tight">Shop</span>
          {pathname.startsWith('/shop') && (
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#D4AF37]" />
          )}
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-colors relative ${
            pathname.startsWith('/wishlist') ? 'text-[#604E72] font-semibold' : 'text-[#7E6A94] hover:text-[#2A2433]'
          }`}
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[#E57697] text-white text-[0.55rem] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[0.62rem] mt-0.5 tracking-tight">Wishlist</span>
          {pathname.startsWith('/wishlist') && (
            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#D4AF37]" />
          )}
        </Link>

        {/* Cart / Bag Drawer Trigger */}
        <button
          type="button"
          onClick={openCart}
          className="flex flex-col items-center justify-center p-1.5 rounded-full text-[#4A3E56] hover:text-[#2A2433] transition-colors relative"
          aria-label="Open Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[#604E72] text-[#FAF8F5] text-[0.55rem] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[0.62rem] mt-0.5 tracking-tight font-medium">Bag</span>
        </button>

        {/* Concierge VIP WhatsApp Chat */}
        <a
          href="https://wa.me/9779800000000?text=Hi%20Little%20Dreamers%20Club,%20I'd%20love%20some%20help%20with%20bespoke%20gifting%20and%20sizing!"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1.5 rounded-full text-[#25D366] hover:text-[#128C7E] transition-colors"
          aria-label="VIP WhatsApp Concierge"
          title="Direct Concierge"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[0.62rem] mt-0.5 tracking-tight text-[#4A3E56]">Concierge</span>
        </a>
      </nav>
    </div>
  );
};
