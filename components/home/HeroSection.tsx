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
    headline: content?.headline || 'Where Little\nThings Become\nBig Dreams',
    subheadline:
      content?.subheadline ||
      'Thoughtfully made clothes and toys for every little adventure.',
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
              alt="Where Little Things Become Big Dreams"
              fill
              priority
              loading="eager"
              sizes="100vw"
              className="object-cover object-[94%_center] sm:object-[center_center]"
            />
            {/* Soft, delicate white gradient wash strictly behind text area without touching baby */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/25 to-transparent w-[44%] sm:w-[38%] pointer-events-none" />
          </div>

          {/* Left Content Column (Strictly constrained so text never touches baby) */}
          <div className="relative z-10 w-full p-5 sm:p-10 lg:p-14 max-w-[210px] sm:max-w-md lg:max-w-lg space-y-2 sm:space-y-3.5">
            {/* Main Headline with subtle drop shadow for crisp clarity */}
            <h1 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium text-[#261D32] tracking-tight leading-[1.14] drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
              {data.headline.split('\n').map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Subheadline with subtle drop shadow matching reference */}
            <p className="text-[0.72rem] sm:text-sm text-[#5B4C68] leading-relaxed font-medium max-w-[185px] sm:max-w-xs drop-shadow-[0_1px_1.5px_rgba(255,255,255,0.9)]">
              {data.subheadline}
            </p>

            {/* Frosted Glass New Collection Action Button with Shadow */}
            <div className="pt-1.5 sm:pt-3">
              <Link
                href={data.primary_cta_link}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-[#FFF3F0]/95 hover:bg-[#FFEBE5] backdrop-blur-md border border-[#FADCD5] hover:border-[#F6C7BC] text-[#D06B60] text-[0.72rem] sm:text-sm font-semibold shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.03] group"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D06B60] group-hover:rotate-12 transition-transform" />
                <span>New Collection</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D06B60] group-hover:translate-x-0.5 transition-transform" />
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
