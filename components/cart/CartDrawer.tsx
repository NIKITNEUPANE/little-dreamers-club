'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../../lib/store/useCartStore';
import { formatCurrency } from '../../lib/utils';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    itemCount,
    subtotal,
    freeShippingThreshold,
    updateQuantity,
    removeItem,
  } = useCart();

  if (!isOpen) return null;

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2A2433]/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E8E2EE]">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E2EE] bg-[#FFFFFF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#604E72]" />
              <h2 className="font-editorial text-xl font-semibold text-[#362945]">
                Your Dream Cart
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EFEAF6] text-[#604E72]">
                {itemCount}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-[#7E6A94] hover:text-[#2A2433] hover:bg-[#EFEAF6] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Bar */}
          <div className="bg-[#FAF4FC] px-5 py-3 border-b border-[#E8E2EE]">
            <div className="flex items-center gap-2 text-xs text-[#4A3E56] font-medium">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              {amountToFreeShipping === 0 ? (
                <span className="text-[#362945] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> You unlocked Free Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#604E72]">{formatCurrency(amountToFreeShipping)}</strong> more for <strong>Free Shipping</strong>
                </span>
              )}
            </div>
            {/* Progress Track */}
            <div className="w-full h-1.5 bg-[#E8E2EE] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9F8EB9] to-[#D4AF37] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-[#EFEAF6] flex items-center justify-center text-[#7E6A94] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-lg font-semibold text-[#362945]">
                  No little treasures saved yet
                </h3>
                <p className="text-xs text-[#7E6A94] max-w-xs mt-1.5 mb-6">
                  Explore our buttery-soft organic sleepwear, knit blankets, and handcrafted toys.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#4A3E56] text-[#FFFFFF] hover:bg-[#362945] shadow-xs transition-all"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-[#FFFFFF] border border-[#E8E2EE] shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F5F0E8] shrink-0 border border-[#E8E2EE]">
                    <Image
                      src={item.product.images[0]?.image_url || '/images/pajama-set-1.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-medium text-xs text-[#2A2433] hover:text-[#604E72] line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#9F8EB9] hover:text-[#D9534F] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[0.68rem] text-[#7E6A94] mt-0.5">
                        {item.variant.size} • {item.variant.color}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#E8E2EE] rounded-full px-2 py-0.5 bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#7E6A94] hover:text-[#2A2433] p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 min-w-5 text-center text-[#2A2433]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#7E6A94] hover:text-[#2A2433] p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-bold text-[#4A3E56]">
                        {formatCurrency(item.variant.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8E2EE] bg-[#FFFFFF] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#7E6A94]">Subtotal</span>
                <span className="font-editorial text-lg font-bold text-[#362945]">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="text-[0.68rem] text-[#7E6A94]">
                Taxes and shipping calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 px-4 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-dream transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={closeCart}
                className="w-full py-2 text-center text-xs font-medium text-[#7E6A94] hover:text-[#2A2433] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
