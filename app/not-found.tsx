import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Home } from 'lucide-react';
import { BrandLogo } from '../components/ui/BrandLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between py-12 px-4">
      <div className="max-w-7xl mx-auto w-full flex justify-center">
        <BrandLogo />
      </div>

      <div className="max-w-md mx-auto text-center py-12 px-6 bg-white rounded-3xl border border-[#E8E2EE] shadow-dream space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#FAF4FC] text-[#604E72] flex items-center justify-center mx-auto animate-float">
          <Sparkles className="w-10 h-10 text-[#D4AF37]" />
        </div>

        <div className="space-y-2">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-[#7E6A94]">
            404 Page Not Found
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#2A2433]">
            Looks like this little dream wandered away.
          </h1>
          <p className="text-xs text-[#7E6A94] leading-relaxed">
            The page you are looking for might have drifted away into the clouds or been moved to a new home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/shop"
            className="flex-1 py-3 px-6 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span>Back to Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/"
            className="py-3 px-5 rounded-full border border-[#E8E2EE] hover:bg-[#FAF4FC] text-xs font-semibold text-[#4A3E56] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-[#7E6A94]">
        © {new Date().getFullYear()} Little Dreamers Club.
      </div>
    </div>
  );
}
