import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-8 sm:py-16 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFF9] to-[#FAF8F5] relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-16 left-12 text-[#D4AF37]/30 animate-float pointer-events-none hidden md:block">
        <Sparkles className="w-7 h-7" />
      </div>
      <div className="absolute bottom-16 right-12 text-[#9F8EB9]/25 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '2s' }}>
        <Star className="w-5 h-5 fill-current" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Large Editorial Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/5] rounded-[1.8rem] sm:rounded-[2.5rem] overflow-hidden shadow-dream-lg border border-[#FFFFFF]">
              <Image
                src="/images/story-editorial.jpg"
                alt="Mother and baby peaceful nursery moments"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Soft accent floating label */}
            <div className="absolute -bottom-3 -right-2 sm:right-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8E2EE] shadow-dream max-w-[180px] sm:max-w-[220px]">
              <p className="text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-wider text-[#604E72]">
                ✦ Consciously Sourced
              </p>
              <p className="text-[0.68rem] sm:text-xs text-[#2A2433] mt-0.5">
                Gentle on tender skin, gentle on our planet.
              </p>
            </div>
          </div>

          {/* Right Editorial Story Text */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 text-[0.62rem] sm:text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-editorial text-xl sm:text-3xl lg:text-5xl font-medium text-[#2A2433] leading-snug">
              Made for Little Dreams & Gentle Slumber
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#7E6A94] leading-relaxed">
              <p>
                Little Dreamers Club began with a simple bedtime wish: to craft children’s wear that feels like being wrapped in a loving cloud. We believe early childhood is a precious sanctuary of imagination, wonder, and restful rituals.
              </p>
              <p>
                Every fabric in our studio is chosen with uncompromising tenderness. From silky organic modal pajamas that prevent night overheating to heirloom Mongolian cashmere blankets hand-embroidered with crescent moons, we create timeless pieces destined to be passed down.
              </p>
            </div>

            {/* Core Values Row */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E8E2EE] shadow-2xs">
                <span className="font-editorial text-lg sm:text-xl font-bold text-[#604E72]">01</span>
                <h4 className="text-[0.72rem] sm:text-xs font-bold text-[#2A2433] mt-0.5 sm:mt-1">Pure Organic Fibers</h4>
                <p className="text-[0.65rem] sm:text-[0.7rem] text-[#7E6A94] mt-0.5">GOTS-certified modal and combed cotton.</p>
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E8E2EE] shadow-2xs">
                <span className="font-editorial text-lg sm:text-xl font-bold text-[#604E72]">02</span>
                <h4 className="text-[0.72rem] sm:text-xs font-bold text-[#2A2433] mt-0.5 sm:mt-1">Heirloom Longevity</h4>
                <p className="text-[0.65rem] sm:text-[0.7rem] text-[#7E6A94] mt-0.5">Reinforced seams made to last generations.</p>
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-[0.72rem] sm:text-xs font-semibold uppercase tracking-wider shadow-dream transition-all"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
