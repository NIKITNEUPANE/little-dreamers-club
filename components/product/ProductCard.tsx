'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check, Star, Eye } from 'lucide-react';
import { Product } from '../../lib/db/types';
import { useCart } from '../../lib/store/useCartStore';
import { useWishlist } from '../../lib/store/useWishlistStore';
import { formatCurrency } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSaved = mounted && isInWishlist(product.id);
  const primaryImage = product.images[0]?.image_url || '/images/pajama-set-1.jpg';
  const secondaryImage = product.images[1]?.image_url || primaryImage;

  // Selected default variant
  const defaultVariant = product.variants[0] || {
    id: `temp-${product.id}`,
    product_id: product.id,
    sku: product.sku,
    size: 'Standard',
    color: 'Original',
    color_hex: '#8F78A8',
    price: product.base_price,
    stock_quantity: 10,
    low_stock_threshold: 3,
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, defaultVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.base_price) / product.compare_at_price) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col justify-between transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Photo Container (The Hero Element) */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FAF8F5] mb-3.5 border border-[#EAE4F0] shadow-xs group-hover:shadow-dream transition-all duration-500 group-hover:-translate-y-1">
        <Link href={`/product/${product.slug}`} className="block relative w-full h-full">
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
        </Link>

        {/* Floating Frosted Pill Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
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

        {/* Floating Action Icons */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleWishlist}
            aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isSaved
                ? 'bg-[#E57697] text-white'
                : 'bg-white/90 backdrop-blur-md border border-white/80 text-[#7E6A94] hover:text-[#E57697] hover:bg-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <Link
            href={`/product/${product.slug}`}
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
            disabled={isAdded}
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
          {product.category_name || 'Heirloom Collection'}
        </span>

        <Link href={`/product/${product.slug}`} className="group-hover:text-[#604E72] transition-colors block">
          <h3 className="font-editorial text-xs sm:text-sm font-semibold text-[#2A2433] line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-xs sm:text-sm text-[#4A3E56]">
              {formatCurrency(product.base_price)}
            </span>
            {product.compare_at_price && (
              <span className="text-[0.68rem] text-[#9F8EB9] line-through">
                {formatCurrency(product.compare_at_price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[#D4AF37]">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
            <span className="text-[0.65rem] text-[#7E6A94] font-medium">
              {product.rating} ({product.review_count})
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
