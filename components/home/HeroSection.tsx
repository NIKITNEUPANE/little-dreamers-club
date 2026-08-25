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
    headline: 'Little Things.\nBig Dreams.',
    subheadline:
      'Beautiful heirloom pieces made for little moments, big imaginations, and every peaceful dream in between.',
    primary_cta_text: 'Shop Collection',
    primary_cta_link: '/shop',
    secondary_cta_text: 'Explore New Arrivals',
    secondary_cta_link: '/shop?sort=newest',
    image_url: '/images/hero-lifestyle.jpg',
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF4FC]/80 via-[#FAF8F5] to-[#FAF8F5] pt-4 pb-8 sm:py-12 lg:pt-14 lg:pb-20">
      {/* Delicate floating background stars / shapes */}
      <div className="absolute top-12 left-10 text-[#D4AF37]/30 animate-float pointer-events-none hidden md:block">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-20 right-16 text-[#9F8EB9]/25 animate-float pointer-events-none hidden lg:block" style={{ animationDelay: '1.5s' }}>
        <Star className="w-6 h-6 fill-current" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#FFFFFF] border border-[#E8E2EE] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.18em] text-[#604E72] uppercase">
                {data.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-2xl sm:text-4xl lg:text-6xl font-medium text-[#2A2433] tracking-tight leading-[1.15]">
              {data.headline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-base text-[#7E6A94] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
              {data.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-3">
              <Link
                href={data.primary_cta_link}
                className="flex-1 sm:flex-initial px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-[0.72rem] sm:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-dream transition-all hover:scale-[1.02]"
              >
                <span>{data.primary_cta_text}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={data.secondary_cta_link}
                className="flex-1 sm:flex-initial px-4 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-white border border-[#E8E2EE] hover:border-[#9F8EB9] hover:bg-[#F3EEF8] text-[#4A3E56] text-[0.72rem] sm:text-xs font-semibold uppercase tracking-wider transition-all text-center"
              >
                {data.secondary_cta_text}
              </Link>
            </div>

            {/* Mini Trust Line */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-[0.65rem] sm:text-[0.72rem] text-[#7E6A94]">
              <div className="flex items-center gap-1">
                <span className="text-[#D4AF37]">✦</span>
                <span>100% GOTS Organic</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#D4AF37]">✦</span>
                <span>Hypoallergenic</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#D4AF37]">✦</span>
                <span>Ethically Crafted</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative mt-1 sm:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-[1.8rem] sm:rounded-[2.5rem] bg-gradient-to-tr from-[#EFEAF6] via-[#FAF3DE] to-[#FCEEF2] -z-10 blur-xs" />

              {/* Main Lifestyle Hero Photo */}
              <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-dream-lg border border-[#FFFFFF]/80">
                <Image
                  src={data.image_url}
                  alt="Little Dreamers Club Lifestyle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-103 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
