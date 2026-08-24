'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../../lib/store/useWishlistStore';
import { db } from '../../../lib/db/store';
import { Product } from '../../../lib/db/types';
import { ProductCard } from '../../../components/product/ProductCard';

export default function WishlistPage() {
  const { wishlistIds, count } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      setLoading(true);
      const all = await db.getProducts();
      const filtered = all.filter((p) => wishlistIds.includes(p.id));
      setProducts(filtered);
      setLoading(false);
    }
    loadWishlistProducts();
  }, [wishlistIds]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase mb-2">
            <Heart className="w-3.5 h-3.5 text-[#D9534F] fill-[#D9534F]" />
            <span>Saved Treasures</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2A2433] tracking-tight">
            Your Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#7E6A94] mt-2">
            Keep track of your favorite organic sleepwear, plush friends, and nursery keepsakes.
          </p>
        </div>

        {/* Wishlist Grid or Empty State */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-[#FAF8F5] border border-[#E8E2EE] shimmer-loading" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 px-6 bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF4FC] flex items-center justify-center text-[#9F8EB9] mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#9F8EB9]" />
            </div>
            <h3 className="font-editorial text-2xl font-semibold text-[#362945]">
              No little treasures saved yet
            </h3>
            <p className="text-xs text-[#7E6A94] mt-2 mb-8 leading-relaxed">
              Tap the heart icon on any pajama set, cashmere blanket, or plush friend to save it to your personal wishlist.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider shadow-dream transition-all hover:scale-[1.02]"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
