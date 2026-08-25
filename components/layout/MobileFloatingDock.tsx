'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User, ShoppingCart } from 'lucide-react';
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

  if (!mounted) {
    return null;
  }

  if (pathname.startsWith('/checkout') || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-3.5 flex justify-center pointer-events-none lg:hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Liquid Frosted Glass Tab Bar */}
      <nav className="pointer-events-auto flex items-center justify-between gap-1 bg-white/45 backdrop-blur-2xl border border-white/70 px-2 py-1.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.85)] max-w-sm w-full">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full transition-all duration-300 relative ${
            pathname === '/'
              ? 'bg-white/75 backdrop-blur-md text-[#201828] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] scale-[1.02]'
              : 'text-[#3B2F4A]/80 hover:text-[#1F1728]'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5 stroke-[2.3]" />
          <span className="text-[0.66rem] mt-0.5 tracking-tight font-semibold">Home</span>
        </Link>

        {/* 2. Shop */}
        <Link
          href="/shop"
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full transition-all duration-300 relative ${
            pathname.startsWith('/shop')
              ? 'bg-white/75 backdrop-blur-md text-[#201828] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] scale-[1.02]'
              : 'text-[#3B2F4A]/80 hover:text-[#1F1728]'
          }`}
          aria-label="Shop"
        >
          <Search className="w-5 h-5 stroke-[2.4]" />
          <span className="text-[0.66rem] mt-0.5 tracking-tight font-semibold">Shop</span>
        </Link>

        {/* 3. Favorites */}
        <Link
          href="/wishlist"
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full transition-all duration-300 relative ${
            pathname.startsWith('/wishlist')
              ? 'bg-white/75 backdrop-blur-md text-[#201828] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] scale-[1.02]'
              : 'text-[#3B2F4A]/80 hover:text-[#1F1728]'
          }`}
          aria-label="Favorites"
        >
          <div className="relative">
            <Heart className="w-5 h-5 stroke-[2.3] fill-current" />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[#E57697] text-white text-[0.55rem] font-bold flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[0.66rem] mt-0.5 tracking-tight font-semibold">Favorites</span>
        </Link>

        {/* 4. You / Account */}
        <Link
          href="/account"
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full transition-all duration-300 relative ${
            pathname.startsWith('/account')
              ? 'bg-white/75 backdrop-blur-md text-[#201828] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] scale-[1.02]'
              : 'text-[#3B2F4A]/80 hover:text-[#1F1728]'
          }`}
          aria-label="You"
        >
          <User className="w-5 h-5 stroke-[2.3]" />
          <span className="text-[0.66rem] mt-0.5 tracking-tight font-semibold">You</span>
        </Link>

        {/* 5. Cart */}
        <button
          type="button"
          onClick={openCart}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-full transition-all duration-300 relative text-[#3B2F4A]/80 hover:text-[#1F1728] cursor-pointer"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 stroke-[2.3]" />
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[#D4AF37] text-[#241B2E] text-[0.55rem] font-bold flex items-center justify-center shadow-xs">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[0.66rem] mt-0.5 tracking-tight font-semibold">Cart</span>
        </button>
      </nav>
    </div>
  );
};
