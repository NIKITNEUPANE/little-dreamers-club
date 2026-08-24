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
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(toy.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const dummyProduct: Product = {
      id: toy.id,
      name: toy.name,
      slug: toy.slug,
      sku: `TOY-${toy.id.toUpperCase()}`,
      category_id: 'cat-toys',
      category_name: 'Toys & Imagination',
      base_price: toy.price,
      compare_at_price: toy.compareAtPrice,
      short_description: toy.name,
      description: toy.name,
      status: 'active',
      featured: true,
      rating: toy.rating,
      review_count: toy.reviewsCount,
      created_at: '2026-08-01T00:00:00Z',
      updated_at: '2026-08-20T00:00:00Z',
      images: [
        {
          id: `img-${toy.id}`,
          product_id: toy.id,
          image_url: toy.imageUrl,
          alt_text: toy.name,
          sort_order: 1,
          is_primary: true,
        },
      ],
      variants: [
        {
          id: `var-${toy.id}`,
          product_id: toy.id,
          sku: `TOY-${toy.id.toUpperCase()}-STD`,
          size: 'One Size',
          color: 'Natural Cream',
          color_hex: '#F5F0E8',
          price: toy.price,
          stock_quantity: 12,
          low_stock_threshold: 3,
        },
      ],
    };

    addItem(dummyProduct, dummyProduct.variants[0], 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div
      className="group relative flex flex-col justify-between transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Hero Image Container */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FAF8F5] mb-3.5 border border-[#EAE4F0] shadow-xs group-hover:shadow-dream transition-all duration-500 group-hover:-translate-y-1">
        <Link href={`/product/${toy.slug}`} className="block relative w-full h-full">
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
        </Link>

        {/* Corner Badge */}
        {toy.badge && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-[#604E72] text-[0.62rem] font-bold uppercase tracking-wider shadow-2xs pointer-events-none">
            {toy.badge}
          </div>
        )}

        {/* Top Floating Glass Action Icons */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(toy.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isWishlisted
                ? 'bg-[#E57697] text-white'
                : 'bg-white/90 backdrop-blur-md border border-white/80 text-[#7E6A94] hover:text-[#E57697] hover:bg-white'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <Link
            href={`/product/${toy.slug}`}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-[#7E6A94] hover:text-[#4A3E56] hover:bg-white flex items-center justify-center transition-all shadow-xs"
            aria-label="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Floating Quick Add Pill on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-dream transition-all ${
              isAdded
                ? 'bg-[#604E72] text-white'
                : 'bg-[#4A3E56]/95 hover:bg-[#362945] text-white backdrop-blur-xs hover:scale-[1.02]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Breathable Editorial Typography Directly Below */}
      <div className="space-y-1 px-1">
        <span className="text-[0.65rem] font-bold text-[#D4AF37] uppercase tracking-wider block">
          {toy.ageRange}
        </span>

        <Link href={`/product/${toy.slug}`} className="group-hover:text-[#604E72] transition-colors block">
          <h3 className="font-editorial text-xs sm:text-sm font-semibold text-[#2A2433] line-clamp-2 leading-snug">
            {toy.name}
          </h3>
        </Link>

        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-xs sm:text-sm text-[#4A3E56]">
              {formatCurrency(toy.price)}
            </span>
            {toy.compareAtPrice && (
              <span className="text-[0.68rem] text-[#9F8EB9] line-through">
                {formatCurrency(toy.compareAtPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[#D4AF37]">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
            <span className="text-[0.65rem] text-[#7E6A94] font-medium">
              {toy.rating} ({toy.reviewsCount})
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Add to Bag Button */}
      <button
        onClick={handleQuickAdd}
        className={`mt-2.5 w-full py-1.5 rounded-full text-[0.7rem] font-semibold sm:hidden flex items-center justify-center gap-1 transition-colors ${
          isAdded
            ? 'bg-emerald-600 text-white'
            : 'bg-[#FAF4FC] text-[#604E72] border border-[#E8E2EE] active:bg-[#F3EEF8]'
        }`}
      >
        <ShoppingBag className="w-3 h-3" />
        <span>{isAdded ? 'Added' : 'Add to Bag'}</span>
      </button>
    </div>
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

        {/* 8-Card Toy Grid with Floating Canvas & Generous Row Spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
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
