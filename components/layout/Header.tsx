'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, ShieldCheck } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';
import { MobileNav } from './MobileNav';
import { CartDrawer } from '../cart/CartDrawer';
import { useCart } from '../../lib/store/useCartStore';
import { useWishlist } from '../../lib/store/useWishlistStore';
import { useAuth } from '../../lib/store/useAuthStore';
import { useMobileMenu } from '../../lib/store/useMobileMenuStore';

const SEARCH_EXAMPLES = [
  "Search 'organic modal pajamas'...",
  "Search 'cashmere moon blanket'...",
  "Search 'lavender star romper'...",
  "Search 'wooden dream castle'...",
  "Search 'heirloom plush bunny'...",
  "Search 'curated baby gift set'...",
  "Search 'nursery essentials'...",
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const { openMenu } = useMobileMenu();
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Text cross-fade interval for search examples
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_EXAMPLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Hide nav bar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // Scrolling DOWN -> Hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP -> Reveal navbar
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Main Auto-Hiding Header Bar */}
      <header
        className={`sticky top-0 z-40 w-full glass-nav transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 shadow-xs' : '-translate-y-full shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile & Desktop Menu Trigger (Left) */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={openMenu}
              className="p-2 -ml-1 text-[#4A3E56] hover:text-[#2A2433] hover:bg-[#EFEAF6] rounded-full transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Big Center Search Display with Cross-Fading Text Examples */}
          <div className="flex-1 max-w-2xl mx-1 sm:mx-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-full h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-white/90 hover:bg-white border border-[#E8E2EE] hover:border-[#BEB2D4] shadow-2xs hover:shadow-xs flex items-center justify-between transition-all group text-left cursor-pointer"
              aria-label="Search catalog"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden flex-1">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7E6A94] group-hover:text-[#604E72] shrink-0" />
                
                {/* Cross-fading placeholder carousel */}
                <div className="relative h-5 overflow-hidden flex-1">
                  {SEARCH_EXAMPLES.map((example, idx) => (
                    <span
                      key={example}
                      className={`absolute inset-0 text-xs sm:text-sm text-[#7E6A94] font-normal transition-all duration-700 ease-in-out flex items-center line-clamp-1 select-none ${
                        idx === placeholderIndex
                          ? 'opacity-100 transform translate-y-0'
                          : 'opacity-0 transform -translate-y-3 pointer-events-none'
                      }`}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              <span className="hidden md:inline-flex text-[0.65rem] font-bold text-[#604E72] bg-[#FAF4FC] border border-[#E8E2EE] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Search
              </span>
            </button>
          </div>

          {/* Right Utilities (Account, Wishlist, Bag) */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
            {/* Admin Link if Admin */}
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEAF6] text-[#604E72] text-xs font-semibold hover:bg-[#DDD6E9] transition-colors mr-1"
                title="Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Admin</span>
              </Link>
            )}

            {/* Account Link */}
            <Link
              href="/account"
              className="p-2 text-[#4A3E56] hover:text-[#2A2433] hover:bg-[#EFEAF6] rounded-full transition-colors relative"
              aria-label="Customer account"
              title={user ? `Logged in as ${user.full_name}` : 'Sign in'}
            >
              <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {user && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
              )}
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-[#4A3E56] hover:text-[#2A2433] hover:bg-[#EFEAF6] rounded-full transition-colors relative"
              aria-label="Wishlist"
              title="Saved treasures"
            >
              <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-[#604E72] text-[#FAF8F5] text-[0.6rem] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="p-2 text-[#4A3E56] hover:text-[#2A2433] hover:bg-[#EFEAF6] rounded-full transition-colors relative"
              aria-label="Cart drawer"
            >
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-[#D4AF37] text-[#241B2E] text-[0.6rem] font-bold flex items-center justify-center animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Global Overlays & Drawers */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileNav />
      <CartDrawer />
    </>
  );
};
