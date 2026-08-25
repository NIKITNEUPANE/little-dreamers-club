'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../../lib/db/types';
import { ProductCard } from '../product/ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ products }) => {
  const displayProducts = products.slice(0, 8);

  return (
    <section className="pt-6 sm:pt-10 pb-10 sm:pb-14 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8E2EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header Row with Left Logo, 3-Word Subheading and Right Link */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#E8E2EE]">
          <div className="space-y-0.5 text-left">
            <h2 className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>New Heirloom Arrivals</span>
            </h2>
            <p className="text-[0.68rem] sm:text-xs text-[#7E6A94] font-normal pl-5">
              Freshly curated treasures.
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-[0.72rem] sm:text-xs font-bold uppercase tracking-wider text-[#4A3E56] hover:text-[#604E72] group whitespace-nowrap shrink-0"
          >
            <span>All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Enclosed Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
