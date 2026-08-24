'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Tag, Gift } from 'lucide-react';

export const ToyBannersSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Full-Width Promotional Banner */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#EAF5F2] via-[#EDF7F5] to-[#E3F2EE] border border-[#D5ECE6] p-8 sm:p-12 lg:p-14 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[0.68rem] font-bold tracking-[0.2em] text-[#2F6B5C] uppercase shadow-2xs border border-[#D5ECE6]">
                <Tag className="w-3.5 h-3.5 text-[#2F6B5C]" />
                <span>Special Little Club Offer</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1E3E37] tracking-tight leading-tight">
                15% Off All Toys Today
              </h2>

              <p className="text-xs sm:text-sm text-[#4E756C] max-w-md leading-relaxed">
                Discover handcrafted wooden toys, heirloom linen plushies, and sensory sets crafted with love and organic safety. Use code <strong className="font-bold text-[#1E3E37]">DREAM15</strong> at checkout.
              </p>

              <div className="pt-2">
                <Link
                  href="/shop?category=toys"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E57697] hover:bg-[#D45F83] text-white text-xs font-semibold uppercase tracking-wider shadow-dream transition-all hover:scale-102"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Image Composition */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-2xs">
                <Image
                  src="/images/collection-play.jpg"
                  alt="Little Dreamers Toys Collection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 2-Banner Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Banner: Toys For Boys / Little Explorers */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#FFF8EE] border border-[#F5EAD8] p-8 sm:p-10 shadow-2xs flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 space-y-3 z-10">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#B89324]">
                  Active & Curious
                </span>

                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#3D3325]">
                  Toys For Boys
                </h3>

                <p className="text-xs text-[#7A6B56] leading-relaxed">
                  The perfect toys for little explorers that combine curiosity, open-ended imagination, and active play.
                </p>

                <div className="pt-2">
                  <Link
                    href="/shop?category=toys"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E57697] hover:bg-[#D45F83] text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-all hover:scale-102"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="sm:col-span-5 relative h-48 sm:h-52 rounded-2xl overflow-hidden shadow-2xs">
                <Image
                  src="/images/collection-adventures.jpg"
                  alt="Toys for Boys"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Banner: Toys For Girls / Sweet Dreamers */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#EBF7FA] border border-[#D5EBF0] p-8 sm:p-10 shadow-2xs flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 space-y-3 z-10">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#347A8A]">
                  Gentle & Creative
                </span>

                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1C3E47]">
                  Toys For Girls
                </h3>

                <p className="text-xs text-[#527982] leading-relaxed">
                  Delicate plush companions, wooden tea sets, and heirloom treasures to inspire a lifetime of creativity.
                </p>

                <div className="pt-2">
                  <Link
                    href="/shop?category=toys"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E57697] hover:bg-[#D45F83] text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-all hover:scale-102"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="sm:col-span-5 relative h-48 sm:h-52 rounded-2xl overflow-hidden shadow-2xs">
                <Image
                  src="/images/bunny-plush-1.jpg"
                  alt="Toys for Girls"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
