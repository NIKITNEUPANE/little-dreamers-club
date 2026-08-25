'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { SearchOverlay } from './SearchOverlay';
import { MobileNav } from './MobileNav';
import { CartDrawer } from '../cart/CartDrawer';
import { useCart } from '../../lib/store/useCartStore';
import { useWishlist } from '../../lib/store/useWishlistStore';
import { useAuth } from '../../lib/store/useAuthStore';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: 'New Arrivals', href: '/shop?sort=newest' },
    { label: 'Shop', href: '/shop' },
    { label: 'Sleepwear', href: '/shop?category=sleepwear' },
    { label: 'Clothing', href: '/shop?category=clothing' },
    { label: 'Toys', href: '/shop?category=toys' },
    { label: 'Nursery', href: '/shop?category=nursery' },
    { label: 'Gifts', href: '/shop?category=gifts' },
  ];

  return (
    <>
      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          {/* Mobile Menu Button (Left on Mobile) */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="p-2 -ml-2 text-[#4A3E56] hover:text-[#2A2433] hover:bg-[#EFEAF6] rounded-full transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#4A3E56] hover:text-[#2A2433] hover:bg-[#EFEAF6] rounded-full transition-colors sm:hidden"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo (Left on Desktop, Center on Mobile) */}
          <div className="flex items-center justify-center lg:justify-start">
            <BrandLogo />
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-[0.14em] transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#604E72]'
                      : 'text-[#4A3E56] hover:text-[#604E72]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2">
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

            {/* Desktop Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8E2EE] bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] hover:border-[#9F8EB9] text-[#7E6A94] text-xs transition-all shadow-2xs mr-1"
              aria-label="Search catalog"
            >
              <Search className="w-3.5 h-3.5 text-[#7E6A94]" />
              <span className="hidden md:inline">Search...</span>
            </button>

            {/* Account Link */}
            <Link
              href="/account"
              className="p-2 text-[#4A3E56] hover:text-[#2A2433] hover:bg-[#EFEAF6] rounded-full transition-colors relative"
              aria-label="Customer account"
              title={user ? `Logged in as ${user.full_name}` : 'Sign in'}
            >
              <User className="w-5 h-5" />
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
              <Heart className="w-5 h-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-[#604E72] text-[#FAF8F5] text-[0.62rem] font-bold flex items-center justify-center">
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
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-[#D4AF37] text-[#241B2E] text-[0.62rem] font-bold flex items-center justify-center animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Global Overlays & Drawers */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        wishlistCount={wishlistCount}
      />
      <CartDrawer />
    </>
  );
};
