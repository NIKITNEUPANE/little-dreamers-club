'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../lib/db/types';
import { formatCurrency } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images[0]?.image_url || '/images/pajama-set-1.jpg';
  const secondaryImage = product.images[1]?.image_url || primaryImage;

  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.base_price) / product.compare_at_price) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#EAE4F0] overflow-hidden shadow-2xs hover:shadow-dream transition-all duration-500 hover:-translate-y-1 justify-between block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5]">
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            isHovered && secondaryImage !== primaryImage ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Secondary Image for Hover Flip */}
        {secondaryImage !== primaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} lifestyle`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 absolute inset-0 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Floating Pill Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent > 0 ? (
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#241B2E] text-[0.62rem] font-bold uppercase tracking-wider shadow-xs">
              Save {discountPercent}%
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-[#604E72] text-[0.62rem] font-bold uppercase tracking-wider shadow-2xs">
              100% Organic
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-2.5 sm:p-4 flex flex-col justify-between flex-1 space-y-1 sm:space-y-2">
        <div className="space-y-0.5">
          <span className="text-[0.55rem] sm:text-[0.65rem] font-bold text-[#D4AF37] uppercase tracking-wider block">
            {product.category_name || 'Heirloom Collection'}
          </span>

          <h3 className="font-editorial text-[0.78rem] sm:text-sm font-semibold text-[#2A2433] group-hover:text-[#604E72] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Price Row */}
        <div className="pt-0.5 flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-bold text-xs sm:text-sm text-[#4A3E56]">
            {formatCurrency(product.base_price)}
          </span>
          {product.compare_at_price && (
            <span className="text-[0.62rem] sm:text-[0.68rem] text-[#9F8EB9] line-through">
              {formatCurrency(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
