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
    badge: 'NEW AUTUMN / WINTER DREAMWEAR',
    headline: 'Little Things. Big Dreams.',
    subheadline:
      'Buttery-soft organic heirloom pieces made for restful rituals and gentle moments.',
    primary_cta_text: 'Shop Collection',
    primary_cta_link: '/shop',
    secondary_cta_text: 'New Arrivals',
    secondary_cta_link: '/shop?sort=newest',
    image_url: '/images/hero-lifestyle.jpg',
  };

  return (
    <section className="relative pt-2 sm:pt-4 pb-6 sm:pb-10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Integrated Luxury Visual Banner */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#241B2E] shadow-dream-lg min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-end">
          {/* Background Lifestyle Image */}
          <Image
            src={data.image_url}
            alt="Little Dreamers Club Newborn & Toddler Luxury Heirloom"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center sm:object-[center_35%]"
          />

          {/* Soft Editorial Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1728]/90 via-[#1F1728]/35 to-transparent sm:from-[#1F1728]/85 sm:via-[#1F1728]/25" />

          {/* Floating Subtle Sparkle on Desktop */}
          <div className="absolute top-6 right-6 text-[#FDE8B3]/40 animate-float pointer-events-none hidden md:block">
            <Sparkles className="w-6 h-6" />
          </div>

          {/* Integrated Editorial Typography & CTA */}
          <div className="relative z-10 w-full p-5 sm:p-8 lg:p-12 text-white flex flex-col items-start max-w-xl space-y-2.5 sm:space-y-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.18em] text-[#FDE8B3] uppercase">
                {data.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-[1.12]">
              {data.headline}
            </h1>

            {/* Concise Subheadline */}
            <p className="text-xs sm:text-sm text-[#EFEAF6]/90 max-w-md font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
              {data.subheadline}
            </p>

            {/* High-Converting CTA Button Row */}
            <div className="flex items-center gap-2 sm:gap-3 pt-1.5 sm:pt-2 w-full sm:w-auto">
              <Link
                href={data.primary_cta_link}
                className="flex-1 sm:flex-initial px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full bg-white hover:bg-[#FAF3DE] text-[#241B2E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-dream transition-all hover:scale-[1.02]"
              >
                <span>{data.primary_cta_text}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={data.secondary_cta_link}
                className="px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-xs font-semibold uppercase tracking-wider transition-all text-center"
              >
                {data.secondary_cta_text}
              </Link>
            </div>
          </div>
        </div>

        {/* Clean Luxury Trust Strip Directly Below Banner */}
        <div className="mt-3.5 sm:mt-5 flex items-center justify-between sm:justify-center gap-2 sm:gap-8 px-2 sm:px-6 py-2.5 rounded-xl bg-white/70 border border-[#E8E2EE] text-[0.62rem] sm:text-xs text-[#604E72] font-medium">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span>100% GOTS Organic</span>
          </div>
          <span className="text-[#D4AF37]/50">•</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span>Hypoallergenic Modal</span>
          </div>
          <span className="text-[#D4AF37]/50">•</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#D4AF37]">✦</span>
            <span>Heirloom Keepsakes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
