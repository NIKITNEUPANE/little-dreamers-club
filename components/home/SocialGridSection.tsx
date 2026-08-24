import React from 'react';
import Image from 'next/image';
import { Sparkles, Camera } from 'lucide-react';

interface SocialGridSectionProps {
  items?: {
    id: string;
    image_url: string;
    caption: string;
    link: string;
    handle: string;
  }[];
}

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const SocialGridSection: React.FC<SocialGridSectionProps> = ({ items }) => {
  const displayItems = items || [
    {
      id: 'soc-1',
      image_url: '/images/hero-lifestyle.jpg',
      caption: 'Morning nursery sun & organic modal bedtime favorites ✨ #LittleDreamersClub',
      link: 'https://instagram.com',
      handle: '@littledreamersclub',
    },
    {
      id: 'soc-2',
      image_url: '/images/collection-adventures.jpg',
      caption: 'Little adventures in sunny fields with our mini canvas backpack 🌿',
      link: 'https://instagram.com',
      handle: '@littledreamersclub',
    },
    {
      id: 'soc-3',
      image_url: '/images/collection-sleep.jpg',
      caption: 'The sweetest dreams in cashmere-knit softness 🌙',
      link: 'https://instagram.com',
      handle: '@littledreamersclub',
    },
    {
      id: 'soc-4',
      image_url: '/images/collection-play.jpg',
      caption: 'Imaginative mornings with handcrafted wooden treasures & Dream Bunny 🧸',
      link: 'https://instagram.com',
      handle: '@littledreamersclub',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase mb-2">
            <InstagramIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Community Moments</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#2A2433] tracking-tight">
            Follow Their Little Adventures
          </h2>
          <p className="text-xs sm:text-sm text-[#7E6A94] mt-2">
            Tag <strong className="text-[#604E72]">@littledreamersclub</strong> to share your cozy bedtime stories and little discoveries.
          </p>
        </div>

        {/* 4-Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F5F0E8] border border-[#E8E2EE] shadow-2xs hover:shadow-dream transition-all"
            >
              <Image
                src={item.image_url}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-[#2A2433]/70 p-6 text-white flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <div className="p-2 rounded-full bg-white/20 text-white">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-[#FAF8F5] leading-relaxed line-clamp-3">
                    {item.caption}
                  </p>
                  <span className="text-[0.65rem] font-bold text-[#FDE8B3] uppercase tracking-wider block mt-2">
                    {item.handle}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
