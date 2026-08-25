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
    <section className="py-8 sm:py-14 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8E2EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Header with Right Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-5 sm:mb-8 pb-4 sm:pb-6 border-b border-[#E8E2EE]">
          <div className="space-y-1 sm:space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-[0.62rem] sm:text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>New Heirloom Arrivals</span>
            </div>
            <h2 className="font-editorial text-xl sm:text-3xl lg:text-4xl font-medium text-[#2A2433] tracking-tight">
              New In The Club
            </h2>
            <p className="text-xs sm:text-sm text-[#7E6A94]">
              Delicate organic sleepwear, knitwear, and accessories freshly arrived in the boutique.
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-[#4A3E56] hover:text-[#604E72] group whitespace-nowrap"
          >
            <span>View All New Pieces</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
