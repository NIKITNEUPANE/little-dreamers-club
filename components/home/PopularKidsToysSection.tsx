'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../../lib/store/useCartStore';
import { useWishlist } from '../../lib/store/useWishlistStore';
import { formatCurrency } from '../../lib/utils';
import { Product } from '../../lib/db/types';

interface ToyItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  secondaryImageUrl?: string;
  badge?: string;
  ageRange: string;
}

const TOYS_DATA: ToyItem[] = [
  {
    id: 'toy-1',
    name: 'Dream Bunny Heirloom Organic Plush',
    slug: 'dream-bunny-heirloom-organic-plush',
    price: 2450,
    compareAtPrice: 2900,
    rating: 5.0,
    reviewsCount: 54,
    imageUrl: '/images/bunny-plush-1.jpg',
    secondaryImageUrl: '/images/collection-play.jpg',
    badge: 'Bestseller',
    ageRange: '0+ Months',
  },
  {
    id: 'toy-2',
    name: 'Handcrafted Wooden Stacking Castle & Rainbow',
    slug: 'dream-bunny-heirloom-organic-plush',
    price: 2850,
    compareAtPrice: 3400,
    rating: 4.9,
    reviewsCount: 32,
    imageUrl: '/images/collection-play.jpg',
    secondaryImageUrl: '/images/bunny-plush-1.jpg',
    badge: 'Heirloom',
    ageRange: '1-3 Years',
  },
  {
    id: 'toy-3',
    name: 'Tiny Explorer Miniature Canvas Adventure Pack',
    slug: 'tiny-explorer-mini-canvas-backpack',
    price: 2850,
    compareAtPrice: 3400,
    rating: 4.9,
    reviewsCount: 19,
    imageUrl: '/images/backpack-1.jpg',
    secondaryImageUrl: '/images/collection-adventures.jpg',
    badge: 'Popular',
    ageRange: '2-5 Years',
  },
  {
    id: 'toy-4',
    name: 'Little Welcome Keepsake Toy & Blanket Box',
    slug: 'little-welcome-heirloom-gift-hamper',
    price: 8500,
    compareAtPrice: 9800,
    rating: 5.0,
    reviewsCount: 31,
    imageUrl: '/images/collection-gifts.jpg',
    secondaryImageUrl: '/images/moon-blanket-1.jpg',
    badge: 'Gift Choice',
    ageRange: 'Newborn',
  },
  {
    id: 'toy-5',
    name: 'Little Constellation Organic Sensory Rattle',
    slug: 'dream-bunny-heirloom-organic-plush',
    price: 1650,
    compareAtPrice: 1950,
    rating: 4.8,
    reviewsCount: 27,
    imageUrl: '/images/collection-play.jpg',
    secondaryImageUrl: '/images/bunny-plush-1.jpg',
    badge: 'Sensory Safe',
    ageRange: '3-12 Months',
  },
  {
    id: 'toy-6',
    name: 'Lavender Meadow Mini Knitted Bear Companion',
    slug: 'dream-bunny-heirloom-organic-plush',
    price: 2200,
    compareAtPrice: 2600,
    rating: 5.0,
    reviewsCount: 41,
    imageUrl: '/images/bunny-plush-1.jpg',
    secondaryImageUrl: '/images/collection-play.jpg',
    badge: 'New',
    ageRange: '0+ Months',
  },
  {
    id: 'toy-7',
    name: 'Little Dreamer Wooden Safari Wheels',
    slug: 'tiny-explorer-mini-canvas-backpack',
    price: 2400,
    compareAtPrice: 2800,
    rating: 4.9,
    reviewsCount: 18,
    imageUrl: '/images/collection-adventures.jpg',
    secondaryImageUrl: '/images/collection-play.jpg',
    badge: 'Organic Wood',
    ageRange: '1-4 Years',
  },
  {
    id: 'toy-8',
    name: 'Celestial Star & Moon Soft Musical Pull Toy',
    slug: 'little-moon-cashmere-knit-blanket',
    price: 2950,
    compareAtPrice: 3500,
    rating: 5.0,
    reviewsCount: 23,
    imageUrl: '/images/moon-blanket-1.jpg',
    secondaryImageUrl: '/images/bunny-plush-1.jpg',
    badge: 'Lullaby Sound',
    ageRange: '0-2 Years',
  },
];

const ToyCard: React.FC<{ toy: ToyItem }> = ({ toy }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/product/${toy.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#EAE4F0] overflow-hidden shadow-2xs hover:shadow-dream transition-all duration-500 hover:-translate-y-1 justify-between block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5]">
        {/* Primary Image */}
        <Image
          src={toy.imageUrl}
          alt={toy.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            isHovered && toy.secondaryImageUrl ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Secondary Image for Slow Gentle Hover Cross-Fade */}
        {toy.secondaryImageUrl && (
          <Image
            src={toy.secondaryImageUrl}
            alt={`${toy.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 absolute inset-0 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Corner Badge */}
        {toy.badge && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-[#604E72] text-[0.62rem] font-bold uppercase tracking-wider shadow-2xs pointer-events-none">
            {toy.badge}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-3.5 sm:p-4.5 flex flex-col justify-between flex-1 space-y-2">
        <div className="space-y-1">
          <span className="text-[0.65rem] font-bold text-[#D4AF37] uppercase tracking-wider block">
            {toy.ageRange}
          </span>

          <h3 className="font-editorial text-xs sm:text-sm font-semibold text-[#2A2433] group-hover:text-[#604E72] transition-colors line-clamp-1 leading-snug">
            {toy.name}
          </h3>
        </div>

        {/* Price Row */}
        <div className="pt-0.5 flex items-baseline gap-2">
          <span className="font-bold text-xs sm:text-sm text-[#4A3E56]">
            {formatCurrency(toy.price)}
          </span>
          {toy.compareAtPrice && (
            <span className="text-[0.68rem] text-[#9F8EB9] line-through">
              {formatCurrency(toy.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export const PopularKidsToysSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8E2EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Left-Aligned Header with Right Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-[#E8E2EE]">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Play & Imagination</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#2A2433] tracking-tight">
              Popular Kids Toys
            </h2>
            <p className="text-xs sm:text-sm text-[#7E6A94]">
              Heirloom plush companions and handcrafted open-ended wooden treasures.
            </p>
          </div>

          <Link
            href="/shop?category=toys"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A3E56] hover:text-[#604E72] group whitespace-nowrap"
          >
            <span>View All Toys & Plush</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8-Card Toy Grid with Enclosed Luxury Box Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {TOYS_DATA.map((toy) => (
            <ToyCard key={toy.id} toy={toy} />
          ))}
        </div>

        {/* Bottom CTA to View All Toys */}
        <div className="text-center mt-12">
          <Link
            href="/shop?category=toys"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-[#E8E2EE] hover:bg-[#FAF4FC] text-[#4A3E56] text-xs font-semibold uppercase tracking-wider shadow-xs transition-all hover:scale-[1.02]"
          >
            <span>Explore All Toys & Imagination</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
