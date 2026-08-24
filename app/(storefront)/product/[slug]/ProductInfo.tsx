'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Check,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Star,
} from 'lucide-react';
import { Product, ProductVariant, MonogramCustomization } from '../../../../lib/db/types';
import { VariantSelector } from '../../../../components/product/VariantSelector';
import { MonogramStudio } from '../../../../components/product/MonogramStudio';
import { useCart } from '../../../../lib/store/useCartStore';
import { useWishlist } from '../../../../lib/store/useWishlistStore';
import { formatCurrency } from '../../../../lib/utils';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: `def-${product.id}`,
      product_id: product.id,
      sku: product.sku,
      size: 'Standard',
      color: 'Default',
      color_hex: '#8F78A8',
      price: product.base_price,
      stock_quantity: 10,
      low_stock_threshold: 3,
    }
  );

  const [quantity, setQuantity] = useState(1);
  const [monogram, setMonogram] = useState<MonogramCustomization | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  const isSaved = isInWishlist(product.id);

  const unitPrice = selectedVariant.price + (monogram ? monogram.price : 0);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity, monogram || undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity, monogram || undefined);
    router.push('/checkout');
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div className="space-y-6">
      {/* Category & Rating */}
      <div className="flex items-center justify-between text-xs text-[#7E6A94]">
        <span className="uppercase tracking-widest font-semibold text-[#604E72]">
          {product.category_name}
        </span>
        <a href="#reviews" className="flex items-center gap-1.5 font-semibold text-[#4A3E56] hover:underline">
          <div className="flex text-[#D4AF37]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-[#D4AF37]" />
            ))}
          </div>
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-[#9F8EB9]">({product.review_count} reviews)</span>
        </a>
      </div>

      {/* Product Title */}
      <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2A2433] leading-tight">
        {product.name}
      </h1>

      {/* Pricing */}
      <div className="flex items-baseline gap-3">
        <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#4A3E56]">
          {formatCurrency(unitPrice)}
        </span>
        {product.compare_at_price && (
          <span className="text-base text-[#9F8EB9] line-through">
            {formatCurrency(product.compare_at_price + (monogram ? monogram.price : 0))}
          </span>
        )}
        {product.compare_at_price && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3DE] text-[#B89324] text-xs font-bold uppercase tracking-wider">
            Save {Math.round(((product.compare_at_price - selectedVariant.price) / product.compare_at_price) * 100)}%
          </span>
        )}
        {monogram && (
          <span className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-[#604E72] bg-[#EFEAF6] px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Incl. Monogram
          </span>
        )}
      </div>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-[#7E6A94] leading-relaxed">
        {product.short_description}
      </p>

      {/* Variant Selector (Color & Size) */}
      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelectVariant={(v) => setSelectedVariant(v)}
      />

      {/* Bespoke Live Monogramming Studio */}
      <MonogramStudio
        productName={product.name}
        onCustomizationChange={(custom) => setMonogram(custom)}
      />

      {/* Quantity & Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#E8E2EE] rounded-full px-3 py-2 bg-white shadow-2xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-[#7E6A94] hover:text-[#2A2433] p-1"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold px-3 min-w-8 text-center text-[#2A2433]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#7E6A94] hover:text-[#2A2433] p-1"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={selectedVariant.stock_quantity === 0}
            className={`flex-1 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-dream transition-all ${
              selectedVariant.stock_quantity === 0
                ? 'bg-[#E8E2EE] text-[#9F8EB9] cursor-not-allowed'
                : isAdded
                ? 'bg-[#604E72] text-[#FAF8F5]'
                : 'bg-[#4A3E56] hover:bg-[#362945] text-white hover:scale-[1.01]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • {formatCurrency(totalPrice)}</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="p-3.5 rounded-full border border-[#E8E2EE] bg-white hover:bg-[#FAF4FC] text-[#4A3E56] transition-colors shadow-2xs"
            aria-label="Save to Wishlist"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isSaved ? 'fill-[#D9534F] text-[#D9534F] scale-110' : 'text-[#7E6A94]'
              }`}
            />
          </button>
        </div>

        {/* Buy Now Direct Button */}
        <button
          onClick={handleBuyNow}
          disabled={selectedVariant.stock_quantity === 0}
          className="w-full py-3 px-6 rounded-full bg-[#D4AF37] hover:bg-[#E5C365] text-[#241B2E] text-xs font-bold uppercase tracking-wider shadow-gold transition-all"
        >
          Instant Checkout
        </button>
      </div>

      {/* Trust Mini Strip */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E2EE] space-y-2 text-xs text-[#7E6A94]">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#604E72]" />
          <span>Complimentary express delivery on orders over Rs. 4,000</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#604E72]" />
          <span>30-day gentle returns & exchanges</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#604E72]" />
          <span>OEKO-TEX® & GOTS Organic Certified</span>
        </div>
      </div>

      {/* Accordion Tabs */}
      <div className="border-t border-[#E8E2EE] pt-4 space-y-3">
        {/* Description Accordion */}
        <div className="border border-[#E8E2EE] rounded-2xl bg-white overflow-hidden">
          <button
            onClick={() => toggleAccordion('desc')}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#362945]"
          >
            <span>Story & Details</span>
            <ChevronDown
              className={`w-4 h-4 text-[#7E6A94] transition-transform duration-300 ${
                openAccordion === 'desc' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordion === 'desc' && (
            <div className="p-4 pt-0 text-xs text-[#7E6A94] leading-relaxed border-t border-[#F3EEF8]">
              {product.description}
            </div>
          )}
        </div>

        {/* Materials & Sustainability */}
        <div className="border border-[#E8E2EE] rounded-2xl bg-white overflow-hidden">
          <button
            onClick={() => toggleAccordion('materials')}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#362945]"
          >
            <span>Materials & Sustainability</span>
            <ChevronDown
              className={`w-4 h-4 text-[#7E6A94] transition-transform duration-300 ${
                openAccordion === 'materials' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordion === 'materials' && (
            <div className="p-4 pt-0 text-xs text-[#7E6A94] leading-relaxed border-t border-[#F3EEF8] space-y-2">
              <p>{product.materials || '100% GOTS-Certified Organic Cotton & Modal.'}</p>
              <p className="text-[0.7rem] text-[#9F8EB9]">
                Colours are achieved using low-impact, non-toxic organic mineral dyes.
              </p>
            </div>
          )}
        </div>

        {/* Size Guide Accordion */}
        <div className="border border-[#E8E2EE] rounded-2xl bg-white overflow-hidden" id="size-guide">
          <button
            onClick={() => toggleAccordion('size')}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#362945]"
          >
            <span>Size & Fit Guide</span>
            <ChevronDown
              className={`w-4 h-4 text-[#7E6A94] transition-transform duration-300 ${
                openAccordion === 'size' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordion === 'size' && (
            <div className="p-4 pt-0 text-xs text-[#7E6A94] border-t border-[#F3EEF8]">
              <table className="w-full text-left text-[0.72rem] mt-2">
                <thead>
                  <tr className="border-b border-[#E8E2EE] text-[#362945]">
                    <th className="pb-1">Size</th>
                    <th className="pb-1">Baby Height</th>
                    <th className="pb-1">Baby Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EEF8] text-[#7E6A94]">
                  <tr><td className="py-1">0-3M</td><td>Up to 60 cm</td><td>3 - 5.5 kg</td></tr>
                  <tr><td className="py-1">3-6M</td><td>60 - 68 cm</td><td>5.5 - 7.5 kg</td></tr>
                  <tr><td className="py-1">6-12M</td><td>68 - 78 cm</td><td>7.5 - 10 kg</td></tr>
                  <tr><td className="py-1">1-2Y</td><td>78 - 88 cm</td><td>10 - 12.5 kg</td></tr>
                  <tr><td className="py-1">2-3Y</td><td>88 - 98 cm</td><td>12.5 - 15 kg</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Care Instructions */}
        <div className="border border-[#E8E2EE] rounded-2xl bg-white overflow-hidden">
          <button
            onClick={() => toggleAccordion('care')}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#362945]"
          >
            <span>Care & Longevity</span>
            <ChevronDown
              className={`w-4 h-4 text-[#7E6A94] transition-transform duration-300 ${
                openAccordion === 'care' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordion === 'care' && (
            <div className="p-4 pt-0 text-xs text-[#7E6A94] leading-relaxed border-t border-[#F3EEF8]">
              {product.care_instructions || 'Machine wash cold on gentle cycle. Tumble dry low or air dry in shade.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
