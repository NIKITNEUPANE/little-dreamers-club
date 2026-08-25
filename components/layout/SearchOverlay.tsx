'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { db } from '../../lib/db/store';
import { Product } from '../../lib/db/types';
import { formatCurrency } from '../../lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const popularSearches = ['Organic Pajamas', 'Cashmere Blanket', 'Dream Bunny', 'Romper', 'Backpack', 'Gift Hamper'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const res = await db.searchProducts(query);
      setResults(res);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2A2433]/60 backdrop-blur-md flex flex-col justify-start animate-in fade-in duration-200">
      {/* Search Container */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E2EE] shadow-xl w-full pt-6 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Row: Search Input & Close Button */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E8E2EE]">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-[#7E6A94]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by product, collection, materials..."
                suppressHydrationWarning
                className="w-full bg-transparent text-lg sm:text-xl font-normal text-[#2A2433] placeholder-[#9F8EB9] focus:outline-none"
              />
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#7E6A94] hover:text-[#2A2433] uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-[#4A3E56] hover:text-[#2A2433] hover:bg-[#EFEAF6] rounded-full transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7E6A94]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E8E2EE] text-[#4A3E56] hover:border-[#9F8EB9] hover:bg-[#F3EEF8] transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
              <div className="flex items-center justify-between text-xs text-[#7E6A94] pb-3">
                <span>{isLoading ? 'Searching...' : `Found ${results.length} results for "${query}"`}</span>
                {results.length > 0 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 font-medium text-[#4A3E56] hover:underline"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {results.length === 0 && !isLoading ? (
                <div className="text-center py-12">
                  <p className="font-editorial text-lg text-[#362945]">No little treasures found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-[#7E6A94] mt-1">Try searching for &ldquo;pajamas&rdquo;, &ldquo;blanket&rdquo;, or &ldquo;toys&rdquo;</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#E8E2EE] hover:border-[#9F8EB9] hover:shadow-dream transition-all"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0">
                        <Image
                          src={product.images[0]?.image_url || '/images/pajama-set-1.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.68rem] text-[#7E6A94] uppercase tracking-wider truncate">
                          {product.category_name}
                        </p>
                        <h4 className="text-xs font-semibold text-[#2A2433] group-hover:text-[#604E72] transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-[#4A3E56]">
                            {formatCurrency(product.base_price)}
                          </span>
                          {product.compare_at_price && (
                            <span className="text-[0.65rem] text-[#9F8EB9] line-through">
                              {formatCurrency(product.compare_at_price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Click outside backdrop to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
