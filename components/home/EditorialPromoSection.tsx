import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EditorialPromoSectionProps {
  content?: {
    badge: string;
    headline: string;
    subheadline: string;
    cta_text: string;
    cta_link: string;
    image_url: string;
  };
}

export const EditorialPromoSection: React.FC<EditorialPromoSectionProps> = ({ content }) => {
  const data = content || {
    badge: 'CURATED HEIRLOOM GIFTS',
    headline: 'A Little Magic for Every Moment',
    subheadline:
      'From buttery-soft organic sleep sets to handcrafted wooden treasures, discover thoughtful keepsakes made to be loved forever.',
    cta_text: 'Shop Curated Gifts',
    cta_link: '/collections/gifts-for-little-ones',
    image_url: '/images/promo-magic.jpg',
  };

  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#241B2E] shadow-dream-lg min-h-[420px] sm:min-h-[480px] flex items-center">
          {/* Background Image with warm overlay */}
          <div className="absolute inset-0">
            <Image
              src={data.image_url}
              alt="A Little Magic for Every Moment"
              fill
              sizes="100vw"
              className="object-cover object-center brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#241B2E]/90 via-[#241B2E]/60 to-transparent" />
          </div>

          {/* Content Card Overlaid on Left */}
          <div className="relative z-10 max-w-xl p-8 sm:p-12 lg:p-16 space-y-5 text-white">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#FDE8B3] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{data.badge}</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight">
              {data.headline}
            </h2>

            <p className="text-xs sm:text-sm text-[#EDE8F5] leading-relaxed max-w-md">
              {data.subheadline}
            </p>

            <div className="pt-2">
              <Link
                href={data.cta_link}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C365] text-[#241B2E] text-xs font-bold uppercase tracking-wider shadow-gold transition-all hover:scale-[1.02]"
              >
                <span>{data.cta_text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
