'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Tag,
  Sliders,
  Store,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { useAuth } from '../../../lib/store/useAuthStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const adminNav = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Products & Stock', href: '/admin/products', icon: Package },
    { label: 'Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Storefront Content', href: '/admin/content', icon: Layers },
    { label: 'Store Settings', href: '/admin/settings', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5FA] flex flex-col lg:flex-row text-[#2A2433]">
      {/* Mobile Admin Header */}
      <div className="lg:hidden bg-white border-b border-[#E8E2EE] px-4 py-3 flex items-center justify-between">
        <BrandLogo variant="compact" />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg text-[#4A3E56] hover:bg-[#EFEAF6]"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E8E2EE] flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo & Badge */}
          <div className="space-y-1">
            <BrandLogo variant="compact" />
            <div className="pt-2 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#B89324]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Hub</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 pt-2">
            {adminNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#4A3E56] text-white shadow-xs'
                      : 'text-[#7E6A94] hover:bg-[#FAF4FC] hover:text-[#362945]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FDE8B3]' : 'text-[#7E6A94]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#FDE8B3]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Storefront Shortcut */}
        <div className="p-6 border-t border-[#E8E2EE] bg-[#FAF8F5] space-y-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-[#E8E2EE] bg-white hover:bg-[#FAF4FC] text-xs font-semibold text-[#4A3E56] transition-colors"
          >
            <Store className="w-4 h-4 text-[#604E72]" />
            <span>View Live Storefront</span>
          </Link>
          <div className="text-[0.68rem] text-[#7E6A94] text-center">
            Signed in as <strong className="text-[#362945]">{user?.full_name || 'Admin'}</strong>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
