import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Category } from '../../lib/db/types';

interface CategoryCardsSectionProps {
  categories: Category[];
}

export const CategoryCardsSection: React.FC<CategoryCardsSectionProps> = ({ categories }) => {
  return (
    <section className="py-10 sm:py-14 bg-[#FAF4FC]/30 border-t border-[#E8E2EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Browse Categories</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#2A2433] tracking-tight">
              Shop by Department
            </h2>
            <p className="text-xs sm:text-sm text-[#7E6A94] mt-1.5">
              Carefully curated essentials for nursery, bedtime, play, and travel.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A3E56] hover:text-[#604E72] group"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-[#E8E2EE] hover:border-[#9F8EB9] hover:shadow-dream transition-all"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5F0E8] mb-3">
                <Image
                  src={cat.image_url || '/images/pajama-set-1.jpg'}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <h3 className="font-editorial text-xs sm:text-sm font-semibold text-[#362945] group-hover:text-[#604E72] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[0.65rem] text-[#9F8EB9] mt-0.5 group-hover:underline">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
