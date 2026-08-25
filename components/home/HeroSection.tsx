import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  content?: {
    badge: string;
    headline: string;
    subheadline: string;
    primary_cta_text: string;
    primary_cta_link: string;
    secondary_cta_text: string;
    secondary_cta_link: string;
    image_url: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const data = content || {
    badge: 'AUTUMN / WINTER 2026',
    headline: 'Little Things.\nBig Dreams.',
    subheadline: '',
    primary_cta_text: 'Shop Collection',
    primary_cta_link: '/shop',
    secondary_cta_text: '',
    secondary_cta_link: '',
    image_url: '/images/hero-lifestyle.jpg',
  };

  return (
    <section className="relative pt-2 sm:pt-4 pb-6 sm:pb-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Integrated Luxury Visual Banner */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#241B2E] shadow-dream min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex items-end">
          {/* Background Lifestyle Image */}
          <Image
            src={data.image_url}
            alt="Little Dreamers Club Newborn & Toddler Luxury Heirloom"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:object-[center_30%]"
          />

          {/* Top-Left Brand Logo inside Hero photo */}
          <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-2xs">
              <Image
                src="/images/brand-logo-transparent.png"
                alt="Little Dreamers Club"
                width={36}
                height={36}
                className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
                priority
              />
              <span className="font-editorial text-xs sm:text-sm font-bold text-[#362945] tracking-tight pr-1">
                Little Dreamers Club
              </span>
            </div>
          </div>

          {/* Gentle Editorial Gradient (Subtle & Luminous) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1422]/80 via-[#1A1422]/20 to-transparent" />

          {/* Editorial Content Row: Headline on Left, Shop Collection on Right */}
          <div className="relative z-10 w-full p-4 sm:p-7 lg:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            {/* Left Column: Kicker + Multi-Line Headline */}
            <div className="space-y-1 sm:space-y-1.5 text-white">
              <span className="text-[0.6rem] sm:text-xs font-bold tracking-[0.22em] text-[#FDE8B3] uppercase block">
                ✦ {data.badge}
              </span>
              <h1 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-[1.12]">
                <span className="block">Little Things.</span>
                <span className="block italic text-[#FAF3DE]">Big Dreams.</span>
              </h1>
            </div>

            {/* Right Column: Relocated Luxury CTA Button */}
            <div className="shrink-0 pt-1 sm:pt-0">
              <Link
                href={data.primary_cta_link}
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white hover:bg-[#FAF3DE] text-[#2A2433] text-xs font-bold uppercase tracking-wider shadow-dream transition-all hover:scale-[1.02]"
              >
                <span>{data.primary_cta_text}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Clean Luxury 3-Card Trust Strip Directly Below */}
        <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 text-center text-[0.62rem] sm:text-xs text-[#604E72] font-medium">
          <div className="py-2 px-1.5 rounded-xl bg-white border border-[#E8E2EE] shadow-2xs flex items-center justify-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span className="truncate">100% GOTS Organic</span>
          </div>
          <div className="py-2 px-1.5 rounded-xl bg-white border border-[#E8E2EE] shadow-2xs flex items-center justify-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span className="truncate">Hypoallergenic Modal</span>
          </div>
          <div className="py-2 px-1.5 rounded-xl bg-white border border-[#E8E2EE] shadow-2xs flex items-center justify-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span className="truncate">Heirloom Keepsakes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
