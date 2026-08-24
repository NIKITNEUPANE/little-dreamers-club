'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  Gift,
  Check,
  Edit3,
} from 'lucide-react';
import { useCart } from '../../lib/store/useCartStore';
import { formatCurrency } from '../../lib/utils';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    itemCount,
    subtotal,
    freeGiftingThreshold,
    giftPackaging,
    giftNote,
    giftPackagingPrice,
    setGiftPackaging,
    setGiftNote,
    updateQuantity,
    removeItem,
  } = useCart();

  const [isEditingNote, setIsEditingNote] = useState(false);

  if (!isOpen) return null;

  const amountToFreeGifting = Math.max(0, freeGiftingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeGiftingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#2A2433]/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
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

          {/* Complimentary Gifting & Free Express Shipping Milestone Bar */}
          <div className="bg-[#FAF4FC] px-5 py-3.5 border-b border-[#E8E2EE]">
            <div className="flex items-center gap-2 text-xs text-[#4A3E56] font-medium">
              <Gift className="w-4 h-4 text-[#D4AF37] shrink-0" />
              {amountToFreeGifting === 0 ? (
                <span className="text-[#362945] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Complimentary Heirloom Gift Box & Express Delivery Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#604E72]">{formatCurrency(amountToFreeGifting)}</strong> more for <strong>Free Heirloom Gift Packaging</strong>
                </span>
              )}
            </div>
            {/* Progress Track */}
            <div className="w-full h-1.5 bg-[#E8E2EE] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9F8EB9] via-[#E57697] to-[#D4AF37] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
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
              <>
                {items.map((item) => {
                  const itemUnitPrice = item.variant.price + (item.monogram?.price || 0);
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E2EE] shadow-2xs space-y-2.5"
                    >
                      <div className="flex gap-3.5">
                        {/* Thumbnail */}
                        <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-[#F5F0E8] shrink-0 border border-[#E8E2EE]">
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
                            <div className="flex justify-between items-start gap-1">
                              <Link
                                href={`/product/${item.product.slug}`}
                                onClick={closeCart}
                                className="font-semibold text-xs text-[#2A2433] hover:text-[#604E72] line-clamp-1 transition-colors"
                              >
                                {item.product.name}
                              </Link>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-[#9F8EB9] hover:text-[#D9534F] p-0.5 transition-colors"
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
                              {formatCurrency(itemUnitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Monogram Badge (if custom embroidery selected) */}
                      {item.monogram && (
                        <div className="pt-2 border-t border-[#F3EEF8] flex items-center justify-between text-[0.68rem] bg-[#FAF4FC] px-2.5 py-1.5 rounded-lg text-[#604E72]">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs shrink-0"
                              style={{ backgroundColor: item.monogram.threadColor }}
                            />
                            <span>
                              Bespoke Monogram: <strong className="font-semibold">{item.monogram.text}</strong> ({item.monogram.fontLabel})
                            </span>
                          </div>
                          <span className="text-[0.62rem] font-bold text-[#D4AF37]">
                            +Rs. {item.monogram.price * item.quantity}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Signature Heirloom Keepsake Packaging Box Studio */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF4FC] via-[#FFFDF9] to-[#FAF4FC] border border-[#EAE4F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                        <Gift className="w-3.5 h-3.5 text-[#B89324]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2A2433] flex items-center gap-1.5">
                          <span>Signature Heirloom Gift Box</span>
                          <span className="text-[0.62rem] px-1.5 py-0.2 rounded-full bg-[#EFEAF6] text-[#604E72] font-semibold">
                            {subtotal >= freeGiftingThreshold ? 'FREE' : '+Rs. 350'}
                          </span>
                        </div>
                        <p className="text-[0.65rem] text-[#7E6A94]">
                          Gold-embossed keepsake box, silk ribbon & handwritten calligraphy card
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setGiftPackaging(!giftPackaging)}
                      aria-pressed={giftPackaging}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        giftPackaging ? 'bg-[#604E72]' : 'bg-[#E8E2EE]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          giftPackaging ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {giftPackaging && (
                    <div className="pt-2 border-t border-[#EAE4F0]/80 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between text-[0.68rem] text-[#4A3E56] font-medium">
                        <span className="flex items-center gap-1">
                          <Edit3 className="w-3 h-3 text-[#D4AF37]" /> Handwritten Calligraphy Note
                        </span>
                        <span className="text-[0.62rem] text-[#9F8EB9]">Max 120 chars</span>
                      </div>
                      <textarea
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value.slice(0, 120))}
                        placeholder="e.g. Welcome to the world, little angel! With all our love, Auntie Maya & Uncle Dev"
                        rows={2}
                        className="w-full p-2.5 rounded-xl bg-white border border-[#E8E2EE] focus:border-[#604E72] text-xs text-[#2A2433] placeholder-[#9F8EB9] outline-none shadow-2xs resize-none"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E8E2EE] bg-[#FFFFFF] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#7E6A94]">
                  <span>Items Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {giftPackaging && (
                  <div className="flex items-center justify-between text-[#604E72]">
                    <span>Heirloom Gift Packaging</span>
                    <span>
                      {giftPackagingPrice === 0 ? (
                        <strong className="text-[#D4AF37]">Complimentary</strong>
                      ) : (
                        formatCurrency(giftPackagingPrice)
                      )}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-1 border-t border-[#F3EEF8]">
                  <span className="font-semibold text-[#2A2433]">Estimated Total</span>
                  <span className="font-editorial text-lg font-bold text-[#362945]">
                    {formatCurrency(subtotal + giftPackagingPrice)}
                  </span>
                </div>
              </div>

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
                className="w-full py-1 text-center text-xs font-medium text-[#7E6A94] hover:text-[#2A2433] transition-colors"
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
