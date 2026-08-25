import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  content?: {
    badge?: string;
    headline?: string;
    subheadline?: string;
    primary_cta_text?: string;
    primary_cta_link?: string;
    image_url?: string;
  };
}

const CATEGORY_QUICK_LINKS = [
  {
    name: 'Clothing',
    itemCount: '120+ items',
    image: '/images/cat-clothing.jpg',
    href: '/shop?category=clothing',
    bgColor: 'bg-[#F4F1EA]',
  },
  {
    name: 'Toys',
    itemCount: '85+ items',
    image: '/images/cat-toys.jpg',
    href: '/shop?category=toys',
    bgColor: 'bg-[#F7F2EB]',
  },
  {
    name: 'Nursery',
    itemCount: '60+ items',
    image: '/images/cat-nursery.jpg',
    href: '/shop?category=nursery',
    bgColor: 'bg-[#EFF3F0]',
  },
  {
    name: 'Accessories',
    itemCount: '45+ items',
    image: '/images/cat-accessories.jpg',
    href: '/shop?category=gifts',
    bgColor: 'bg-[#F9EFF2]',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const data = {
    badge: content?.badge || 'New Collection',
    headline: content?.headline || 'Little Things\nBig Dreams',
    subheadline:
      content?.subheadline ||
      'Clothes and toys for every\nlittle adventure.',
    primary_cta_text: content?.primary_cta_text || 'New Collection',
    primary_cta_link: content?.primary_cta_link || '/shop?sort=newest',
    image_url: content?.image_url || '/images/hero-lifestyle.jpg',
  };

  return (
    <section className="pt-2 sm:pt-4 pb-8 sm:pb-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Main Editorial Hero Card with 16:9 oriented ratio */}
        <div className="relative w-full rounded-[2rem] sm:rounded-[2.8rem] overflow-hidden bg-[#FAF6F0] shadow-dream aspect-[16/11] sm:aspect-[16/9] min-h-[370px] sm:min-h-[460px] lg:min-h-[520px] flex items-center">
          {/* Background Image: Baby shifted to right to avoid any text overlap */}
          <div className="absolute inset-0">
            <Image
              src={data.image_url}
              alt="Little Things Big Dreams"
              fill
              priority
              loading="eager"
              sizes="100vw"
              className="object-cover object-[94%_center] sm:object-[center_center]"
            />
            {/* Soft, visible warm-white gradient wash giving text high-contrast editorial backing */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/55 to-transparent w-[48%] sm:w-[38%] pointer-events-none" />
          </div>

          {/* Left Content Column (Balanced, connected premium typography hierarchy) */}
          <div className="relative z-10 w-full p-5 sm:p-10 lg:p-14 max-w-[220px] sm:max-w-md lg:max-w-lg flex flex-col justify-center">
            {/* Main Headline - Larger font with dual-color palette without full stops */}
            <h1 className="font-editorial text-[1.7rem] sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.12] mb-2 sm:mb-3">
              <span className="block text-[#2D1F3D]">Little Things</span>
              <span className="block italic text-[#785B88]">Big Dreams</span>
            </h1>

            {/* Subheadline with reduced opacity and muted color intensity */}
            <p className="text-[0.76rem] sm:text-base text-[#7A6B88]/80 leading-[1.4] font-normal max-w-[195px] sm:max-w-xs mb-3.5 sm:mb-5">
              Clothes and toys for every<br />little adventure.
            </p>

            {/* Clickable New Collection Button with Logo on Left and Right Arrow on Right */}
            <div>
              <Link
                href={data.primary_cta_link}
                className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FFF3F0] hover:bg-[#FFE8E2] border border-[#FADCD5] shadow-2xs hover:shadow-xs transition-all hover:scale-[1.03] group cursor-pointer"
                aria-label="Shop New Collection"
              >
                <Sparkles className="w-3 h-3 text-[#D06B60] group-hover:rotate-12 transition-transform shrink-0" />
                <span className="text-[0.68rem] sm:text-xs font-semibold text-[#D06B60]">
                  New Collection
                </span>
                <ArrowRight className="w-3 h-3 text-[#D06B60] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4-Item Circular Categories Navigation */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-6 pt-1">
          {CATEGORY_QUICK_LINKS.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center text-center space-y-1.5 sm:space-y-2.5"
            >
              {/* Circular Avatar Container */}
              <div
                className={`relative w-full max-w-[76px] sm:max-w-[130px] aspect-square rounded-full overflow-hidden ${cat.bgColor} border border-[#ECE6DC] shadow-2xs group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 25vw, 15vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              {/* Text Labels */}
              <div>
                <h3 className="font-editorial text-xs sm:text-base font-semibold text-[#2E243A] group-hover:text-[#604E72] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <span className="text-[0.62rem] sm:text-xs text-[#8A799E] mt-0.5 block">
                  {cat.itemCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
