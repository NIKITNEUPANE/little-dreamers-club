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
    primary_cta_text: content?.primary_cta_text || 'Shop New Arrivals',
    primary_cta_link: content?.primary_cta_link || '/shop?sort=newest',
    image_url: content?.image_url || '/images/hero-lifestyle.jpg',
  };

  return (
    <section className="pt-2 sm:pt-4 pb-8 sm:pb-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Main Editorial Hero Card */}
        <div className="relative w-full rounded-[2rem] sm:rounded-[2.8rem] overflow-hidden bg-[#FAF6F0] shadow-dream min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] flex items-center">
          {/* Background Image: Baby on Right Half */}
          <div className="absolute inset-0">
            <Image
              src={data.image_url}
              alt="Where Little Things Become Big Dreams"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[75%_center] sm:object-center"
            />
            {/* Very subtle soft blend on left edge */}
            <div className="absolute inset-y-0 left-0 w-3/4 sm:w-1/2 bg-gradient-to-r from-white/40 via-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Left Content Column */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 max-w-sm sm:max-w-md lg:max-w-lg space-y-3 sm:space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3F0]/90 backdrop-blur-xs border border-[#FADCD5] shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#D06B60]" />
              <span className="text-[0.68rem] sm:text-xs font-semibold text-[#D06B60]">
                {data.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2E243A] tracking-tight leading-[1.12]">
              {data.headline.split('\n').map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-sm text-[#6C5E78] leading-relaxed font-normal max-w-[240px] sm:max-w-xs">
              {data.subheadline}
            </p>

            {/* CTA Button */}
            <div className="pt-1.5 sm:pt-2">
              <Link
                href={data.primary_cta_link}
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#392E46] hover:bg-[#281F33] text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
              >
                <span>{data.primary_cta_text}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Carousel Dots Indicator */}
            <div className="pt-2 sm:pt-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#392E46]" />
              <span className="w-2 h-2 rounded-full bg-[#DDD6E5]" />
              <span className="w-2 h-2 rounded-full bg-[#DDD6E5]" />
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
