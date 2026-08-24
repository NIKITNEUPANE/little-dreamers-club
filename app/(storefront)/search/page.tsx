'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { db } from '../../../lib/db/store';
import { Product } from '../../../lib/db/types';
import { ProductCard } from '../../../components/product/ProductCard';

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      if (query.trim()) {
        const found = await db.searchProducts(query);
        setResults(found);
      } else {
        const all = await db.getProducts({ featured: true });
        setResults(all);
      }
      setLoading(false);
    }
    performSearch();
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-5 h-5 text-[#7E6A94] absolute left-5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search pajamas, blankets, toys, backpacks..."
              className="w-full bg-white border border-[#E8E2EE] rounded-full py-4 pl-14 pr-32 text-sm text-[#2A2433] placeholder-[#9F8EB9] focus:outline-none focus:border-[#7E6A94] shadow-dream"
            />
            <button
              type="submit"
              className="absolute right-2 px-6 py-2.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E2EE] text-xs text-[#7E6A94]">
          <div>
            {query ? (
              <span>
                Found <strong className="text-[#362945]">{results.length}</strong> results for &ldquo;{query}&rdquo;
              </span>
            ) : (
              <span>Explore popular suggestions</span>
            )}
          </div>
        </div>

        {/* Results Grid with Floating Canvas & Generous Row Spacing */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-[#FAF8F5] border border-[#E8E2EE] shimmer-loading" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF4FC] flex items-center justify-center text-[#7E6A94] mx-auto mb-4">
              <Search className="w-8 h-8 text-[#9F8EB9]" />
            </div>
            <h3 className="font-editorial text-2xl font-semibold text-[#362945]">
              No little dreams found
            </h3>
            <p className="text-xs text-[#7E6A94] mt-2 mb-6 leading-relaxed">
              We couldn’t find any items matching &ldquo;{query}&rdquo;. Try checking the spelling or browse our bestselling categories.
            </p>
            <button
              onClick={() => router.push('/shop')}
              className="px-6 py-2.5 rounded-full bg-[#4A3E56] text-white text-xs font-semibold uppercase tracking-wider"
            >
              View Full Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs text-[#7E6A94]">Loading search...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
