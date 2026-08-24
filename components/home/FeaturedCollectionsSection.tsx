'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Collection } from '../../lib/db/types';

interface FeaturedCollectionsSectionProps {
  collections: Collection[];
}

export const FeaturedCollectionsSection: React.FC<FeaturedCollectionsSectionProps> = ({ collections }) => {
  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-Aligned Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-[#E8E2EE]">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Curated Worlds</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#2A2433] tracking-tight">
              Featured Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#7E6A94]">
              Explore thoughtfully designed capsules tailored for peaceful sleep, curious exploration, and timeless gifting.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A3E56] hover:text-[#604E72] group whitespace-nowrap"
          >
            <span>View All Capsules</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Collections 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E8E2EE] shadow-2xs hover:shadow-dream-lg transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F0E8]">
                <Image
                  src={col.image_url}
                  alt={col.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2433]/70 via-[#2A2433]/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Text Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end">
                  <h3 className="font-editorial text-xl font-medium text-white group-hover:text-[#FDE8B3] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-[#EFEAF6]/90 line-clamp-2 mt-1 font-normal">
                    {col.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FDE8B3] mt-3 uppercase tracking-wider">
                    <span>Explore Capsule</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
