'use client';

import React from 'react';
import { ProductVariant } from '../../lib/db/types';
import { Sparkles, AlertCircle, Check } from 'lucide-react';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  // Unique sizes and colors
  const sizes = Array.from(new Set(variants.map((v) => v.size)));
  const colors = Array.from(new Set(variants.map((v) => v.color)));

  const handleSizeClick = (size: string) => {
    // Find variant with matching size and current color if possible, or first available
    const match = variants.find(
      (v) => v.size === size && v.color === selectedVariant.color
    ) || variants.find((v) => v.size === size);

    if (match) {
      onSelectVariant(match);
    }
  };

  const handleColorClick = (color: string) => {
    const match = variants.find(
      (v) => v.color === color && v.size === selectedVariant.size
    ) || variants.find((v) => v.color === color);

    if (match) {
      onSelectVariant(match);
    }
  };

  const isLowStock = selectedVariant.stock_quantity <= selectedVariant.low_stock_threshold && selectedVariant.stock_quantity > 0;
  const isOutOfStock = selectedVariant.stock_quantity === 0;

  return (
    <div className="space-y-5">
      {/* Color Selection */}
      {colors.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#362945]">
              Color: <span className="text-[#604E72] font-normal">{selectedVariant.color}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {colors.map((color) => {
              const variantSample = variants.find((v) => v.color === color);
              const isSelected = selectedVariant.color === color;
              return (
                <button
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={`group relative flex items-center gap-2 p-1.5 rounded-full border transition-all ${
                    isSelected
                      ? 'border-[#604E72] bg-[#F4EFF9]'
                      : 'border-[#E8E2EE] hover:border-[#BEB2D4] bg-white'
                  }`}
                  aria-label={`Select color ${color}`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-[#D8CEE3] shadow-xs flex items-center justify-center"
                    style={{ backgroundColor: variantSample?.color_hex || '#8F78A8' }}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white drop-shadow-xs" />}
                  </span>
                  <span className="text-xs font-medium text-[#2A2433] pr-2 hidden sm:inline">
                    {color}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#362945]">
              Size: <span className="text-[#604E72] font-normal">{selectedVariant.size}</span>
            </span>
            <a
              href="#size-guide"
              className="text-[#7E6A94] hover:text-[#4A3E56] underline underline-offset-2 transition-colors"
            >
              Size Guide
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const v = variants.find((item) => item.size === size && item.color === selectedVariant.color) ||
                        variants.find((item) => item.size === size);
              const isSelected = selectedVariant.size === size;
              const outOfStock = v ? v.stock_quantity === 0 : false;

              return (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  disabled={outOfStock}
                  className={`min-w-14 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    isSelected
                      ? 'border-[#4A3E56] bg-[#4A3E56] text-white shadow-xs'
                      : outOfStock
                      ? 'border-[#E8E2EE] bg-[#FAF8F5] text-[#A396B5] line-through cursor-not-allowed'
                      : 'border-[#E8E2EE] bg-white text-[#2A2433] hover:border-[#7E6A94] hover:bg-[#F3EEF8]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Availability Badge */}
      <div className="flex items-center gap-2 pt-1 text-xs">
        {isOutOfStock ? (
          <div className="flex items-center gap-1.5 text-[#D9534F] font-semibold">
            <AlertCircle className="w-4 h-4" />
            <span>Currently Out of Stock</span>
          </div>
        ) : isLowStock ? (
          <div className="flex items-center gap-1.5 text-[#B89324] font-semibold animate-pulse">
            <AlertCircle className="w-4 h-4" />
            <span>Only {selectedVariant.stock_quantity} pieces left in this size!</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[#4A3E56] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#52B788]" />
            <span>In Stock • Ready to ship within 24h</span>
          </div>
        )}
      </div>
    </div>
  );
};
