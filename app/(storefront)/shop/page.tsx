'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, Sparkles, Grid3X3, Grid2X2 } from 'lucide-react';
import { db } from '../../../lib/db/store';
import { Product, Category } from '../../../lib/db/types';
import { ProductCard } from '../../../components/product/ProductCard';
import { ProductFilters } from '../../../components/product/ProductFilters';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categoryParam = searchParams.get('category') || undefined;
  const sortParam = (searchParams.get('sort') as any) || 'featured';
  const sizeParams = searchParams.getAll('size');
  const colorParams = searchParams.getAll('color');
  const inStockOnly = searchParams.get('inStock') === 'true';

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [allCats, fetchedProducts] = await Promise.all([
        db.getCategories(),
        db.getProducts({
          categorySlug: categoryParam,
          sort: sortParam,
          sizes: sizeParams.length > 0 ? sizeParams : undefined,
          colors: colorParams.length > 0 ? colorParams : undefined,
          inStockOnly: inStockOnly || undefined,
        }),
      ]);
      setCategories(allCats);
      setProducts(fetchedProducts);
      setLoading(false);
    }
    loadData();
  }, [categoryParam, sortParam, searchParams]);

  const currentCategoryObj = categories.find((c) => c.slug === categoryParam);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title & Breadcrumb */}
        <div className="mb-8 pb-6 border-b border-[#E8E2EE]">
          <div className="flex items-center gap-2 text-xs text-[#7E6A94] mb-2 uppercase tracking-wider">
            <span>Store</span>
            <span>/</span>
            <span className="text-[#604E72] font-semibold">
              {currentCategoryObj ? currentCategoryObj.name : 'All Products'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2A2433] tracking-tight">
                {currentCategoryObj ? currentCategoryObj.name : 'Shop the Collection'}
              </h1>
              <p className="text-xs sm:text-sm text-[#7E6A94] mt-2 max-w-xl">
                {currentCategoryObj?.description ||
                  'Explore our gentle heirloom sleepwear, organic essentials, and handcrafted keepsakes.'}
              </p>
            </div>

            {/* Mobile Filter & Sort Bar */}
            <div className="flex items-center gap-3 lg:hidden pt-2">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-[#E8E2EE] shadow-2xs text-xs font-semibold text-[#4A3E56] flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#604E72]" />
                <span>Filters</span>
              </button>

              <select
                value={sortParam}
                onChange={handleSortChange}
                className="py-2.5 px-3 rounded-xl bg-white border border-[#E8E2EE] shadow-2xs text-xs font-medium text-[#4A3E56] focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Products Grid */}
        <div className="flex items-start gap-8">
          <ProductFilters
            categories={categories}
            isMobileOpen={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />

          <div className="flex-1 min-w-0">
            {/* Desktop Top Toolbar (Count & Sort) */}
            <div className="hidden lg:flex items-center justify-between pb-6 mb-2 border-b border-[#E8E2EE]/60 text-xs text-[#7E6A94]">
              <span>
                Showing <strong className="text-[#362945]">{products.length}</strong> items
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[#7E6A94]">Sort by:</span>
                <select
                  value={sortParam}
                  onChange={handleSortChange}
                  className="bg-white border border-[#E8E2EE] rounded-lg px-3 py-1.5 text-xs text-[#362945] font-medium focus:outline-none focus:border-[#7E6A94]"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>
            </div>

            {/* Products Grid with Floating Canvas & Generous Row Spacing */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-72 rounded-3xl bg-[#FAF8F5] border border-[#E8E2EE] shadow-2xs shimmer-loading"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs p-8">
                <div className="w-16 h-16 rounded-full bg-[#EFEAF6] flex items-center justify-center text-[#7E6A94] mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#362945]">
                  No matching pieces found
                </h3>
                <p className="text-xs text-[#7E6A94] max-w-sm mx-auto mt-2 mb-6">
                  Try clearing some of your filters or explore our complete catalog of sleepwear and keepsakes.
                </p>
                <button
                  onClick={() => router.push('/shop')}
                  className="px-6 py-2.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs text-[#7E6A94]">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
