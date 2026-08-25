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
    headline: 'Little Things. Big Dreams.',
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
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#241B2E] shadow-dream min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] flex items-end">
          {/* Background Lifestyle Image */}
          <Image
            src={data.image_url}
            alt="Little Dreamers Club Newborn & Toddler Luxury Heirloom"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:object-[center_30%]"
          />

          {/* Gentle Editorial Gradient (Subtle & Luminous) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1422]/75 via-[#1A1422]/20 to-transparent" />

          {/* Minimalist Editorial Typography & CTA */}
          <div className="relative z-10 w-full p-5 sm:p-8 lg:p-10 text-white flex flex-col items-start space-y-2 sm:space-y-3">
            {/* Minimal Kicker */}
            <span className="text-[0.62rem] sm:text-xs font-bold tracking-[0.25em] text-[#FDE8B3] uppercase">
              ✦ {data.badge}
            </span>

            {/* Main Headline */}
            <h1 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">
              {data.headline}
            </h1>

            {/* Single Premium Understated CTA Button */}
            <div className="pt-1 sm:pt-2">
              <Link
                href={data.primary_cta_link}
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white/95 hover:bg-white text-[#2A2433] text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02]"
              >
                <span>{data.primary_cta_text}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Clean Luxury Trust Strip Directly Below Banner */}
        <div className="mt-3 sm:mt-4 flex items-center justify-between sm:justify-center gap-2 sm:gap-8 px-3 sm:px-6 py-2.5 rounded-xl bg-white border border-[#E8E2EE] text-[0.62rem] sm:text-xs text-[#604E72] font-medium shadow-2xs">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span>100% GOTS Organic</span>
          </div>
          <span className="text-[#D4AF37]/40">•</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span>Hypoallergenic Modal</span>
          </div>
          <span className="text-[#D4AF37]/40">•</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span>Heirloom Keepsakes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
