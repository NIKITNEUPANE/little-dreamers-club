'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Product } from '../../lib/db/types';
import { ProductCard } from '../product/ProductCard';

interface BestsellersSectionProps {
  products: Product[];
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({ products }) => {
  const bestsellers = [...products]
    .sort((a, b) => (b.review_count || 0) - (a.review_count || 0))
    .slice(0, 4);

  return (
    <section className="py-8 sm:py-14 bg-[#FAF4FC]/30 border-y border-[#E8E2EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-5 sm:mb-8 pb-4 sm:pb-6 border-b border-[#E8E2EE]">
          <div className="space-y-1 sm:space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-[0.62rem] sm:text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span>Parent Favorites</span>
            </div>
            <h2 className="font-editorial text-xl sm:text-3xl lg:text-4xl font-medium text-[#2A2433] tracking-tight">
              Loved by Little Dreamers
            </h2>
            <p className="text-xs sm:text-sm text-[#7E6A94]">
              Our most celebrated bedtime sleepwear, plush companions, and heirloom newborn essentials.
            </p>
          </div>

          <Link
            href="/shop?sort=best-selling"
            className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-[#4A3E56] hover:text-[#604E72] group whitespace-nowrap"
          >
            <span>Explore All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid with Enclosed Luxury Box Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
