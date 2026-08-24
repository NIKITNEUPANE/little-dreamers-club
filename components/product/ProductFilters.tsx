'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, SlidersHorizontal, Check } from 'lucide-react';
import { Category } from '../../lib/db/types';

interface ProductFiltersProps {
  categories: Category[];
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentSizes = searchParams.getAll('size');
  const currentColors = searchParams.getAll('color');
  const inStock = searchParams.get('inStock') === 'true';

  const availableSizes = ['0-3M', '3-6M', '6-12M', '1-2Y', '2-3Y', 'One Size'];
  const availableColors = [
    { label: 'Soft Lavender', hex: '#8F78A8' },
    { label: 'Warm Cream', hex: '#F5F0E8' },
    { label: 'Soft Blush', hex: '#EFCBD7' },
    { label: 'Muted Gold', hex: '#D4AF37' },
  ];

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const toggleArrayParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);
    params.delete(key);

    if (current.includes(value)) {
      current.filter((item) => item !== value).forEach((v) => params.append(key, v));
    } else {
      [...current, value].forEach((v) => params.append(key, v));
    }

    router.push(`/shop?${params.toString()}`);
  };

  const resetAll = () => {
    router.push('/shop');
    if (onCloseMobile) onCloseMobile();
  };

  const filterContent = (
    <div className="space-y-7">
      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#362945] mb-3">
          Department
        </h4>
        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => updateParam('category', null)}
            className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
              !currentCategory
                ? 'bg-[#EFEAF6] text-[#604E72] font-semibold'
                : 'text-[#7E6A94] hover:bg-[#F3EEF8]'
            }`}
          >
            <span>All Departments</span>
            {!currentCategory && <Check className="w-3.5 h-3.5" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParam('category', cat.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                currentCategory === cat.slug
                  ? 'bg-[#EFEAF6] text-[#604E72] font-semibold'
                  : 'text-[#7E6A94] hover:bg-[#F3EEF8]'
              }`}
            >
              <span>{cat.name}</span>
              {currentCategory === cat.slug && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="pt-5 border-t border-[#E8E2EE]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#362945] mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const isSelected = currentSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleArrayParam('size', size)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'border-[#4A3E56] bg-[#4A3E56] text-white shadow-2xs'
                    : 'border-[#E8E2EE] bg-white text-[#4A3E56] hover:border-[#9F8EB9]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="pt-5 border-t border-[#E8E2EE]">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#362945] mb-3">
          Color
        </h4>
        <div className="space-y-2">
          {availableColors.map((color) => {
            const isSelected = currentColors.includes(color.label);
            return (
              <button
                key={color.label}
                onClick={() => toggleArrayParam('color', color.label)}
                className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? 'border-[#604E72] bg-[#F4EFF9] font-semibold text-[#362945]'
                    : 'border-[#E8E2EE] bg-white text-[#7E6A94] hover:border-[#9F8EB9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full border border-[#D8CEE3] shadow-2xs"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#604E72]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-5 border-t border-[#E8E2EE]">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-bold uppercase tracking-wider text-[#362945]">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : null)}
            className="w-4 h-4 rounded text-[#604E72] accent-[#604E72] cursor-pointer"
          />
        </label>
      </div>

      {/* Clear Filters Button */}
      {(currentCategory || currentSizes.length > 0 || currentColors.length > 0 || inStock) && (
        <div className="pt-4">
          <button
            onClick={resetAll}
            className="w-full py-2 px-3 rounded-lg border border-[#E8E2EE] hover:bg-[#F3EEF8] text-xs font-semibold text-[#7E6A94] hover:text-[#2A2433] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 pr-8">
        <div className="sticky top-28 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E2EE] shadow-2xs">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#E8E2EE] text-xs font-bold uppercase tracking-wider text-[#362945]">
            <SlidersHorizontal className="w-4 h-4 text-[#604E72]" />
            <span>Refine Collection</span>
          </div>
          {filterContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-[#2A2433]/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs sm:max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E8E2EE]">
              <div className="p-5 border-b border-[#E8E2EE] bg-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#362945]">
                  <SlidersHorizontal className="w-4 h-4 text-[#604E72]" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-full text-[#7E6A94] hover:text-[#2A2433] hover:bg-[#EFEAF6]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-white">
                {filterContent}
              </div>

              <div className="p-4 border-t border-[#E8E2EE] bg-[#FAF8F5]">
                <button
                  onClick={onCloseMobile}
                  className="w-full py-3 rounded-full bg-[#4A3E56] text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
