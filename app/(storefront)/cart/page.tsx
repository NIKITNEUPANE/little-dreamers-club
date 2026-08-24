'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Sparkles, Tag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../../lib/store/useCartStore';
import { db } from '../../../lib/db/store';
import { formatCurrency } from '../../../lib/utils';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    appliedCoupon,
    freeShippingThreshold,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError('');

    const res = await db.validateCoupon(couponCode, subtotal);
    setCouponLoading(false);

    if (res.valid && res.coupon) {
      applyCoupon(res.coupon.code, res.discountAmount);
      setCouponCode('');
    } else {
      setCouponError(res.message || 'Invalid coupon code');
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#362945] mb-8">
          Your Dream Bag ({itemCount})
        </h1>

        {items.length === 0 ? (
          <div className="max-w-lg mx-auto text-center py-20 bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs p-8">
            <div className="w-16 h-16 rounded-full bg-[#FAF4FC] flex items-center justify-center text-[#7E6A94] mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-[#9F8EB9]" />
            </div>
            <h2 className="font-editorial text-2xl font-semibold text-[#362945]">
              Your dream bag is empty
            </h2>
            <p className="text-xs text-[#7E6A94] mt-2 mb-8 max-w-xs mx-auto leading-relaxed">
              Explore our soothing organic sleepwear, knit blankets, and handcrafted toys for your little dreamer.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider shadow-dream transition-all"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Milestone Alert */}
              <div className="p-4 rounded-2xl bg-[#FAF4FC] border border-[#E8E2EE]">
                <div className="flex items-center justify-between text-xs text-[#4A3E56] font-medium">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                    {amountToFreeShipping === 0 ? (
                      <span className="font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> You unlocked Free Express Shipping!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#604E72]">{formatCurrency(amountToFreeShipping)}</strong> more to get <strong>Free Shipping</strong>
                      </span>
                    )}
                  </div>
                  <span className="text-[0.7rem] font-bold text-[#604E72]">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#E8E2EE] rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#9F8EB9] to-[#D4AF37] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-2xl border border-[#E8E2EE] divide-y divide-[#F3EEF8] shadow-2xs">
                {items.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F5F0E8] border border-[#E8E2EE] shrink-0">
                        <Image
                          src={item.product.images[0]?.image_url || '/images/pajama-set-1.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-editorial text-sm sm:text-base font-semibold text-[#2A2433] hover:text-[#604E72] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-xs text-[#7E6A94] mt-0.5">
                          Size: {item.variant.size} • Color: {item.variant.color}
                        </div>
                        <div className="text-xs font-semibold text-[#4A3E56] mt-1 sm:hidden">
                          {formatCurrency(item.variant.price)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#E8E2EE] rounded-full px-3 py-1 bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#7E6A94] hover:text-[#2A2433] p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold px-3 min-w-8 text-center text-[#2A2433]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#7E6A94] hover:text-[#2A2433] p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Line Price */}
                      <span className="text-sm font-bold text-[#4A3E56] min-w-20 text-right">
                        {formatCurrency(item.variant.price * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#9F8EB9] hover:text-[#D9534F] p-1.5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Order Summary & Checkout */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E8E2EE] shadow-2xs space-y-5">
                <h3 className="font-editorial text-lg font-semibold text-[#362945] pb-3 border-b border-[#E8E2EE]">
                  Order Summary
                </h3>

                {/* Subtotal & Breakdown */}
                <div className="space-y-2.5 text-xs text-[#7E6A94]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#2A2433]">{formatCurrency(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#604E72] font-semibold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (7%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>

                  <div className="pt-3 border-t border-[#E8E2EE] flex justify-between items-baseline text-sm text-[#2A2433]">
                    <span className="font-semibold text-base font-editorial">Total</span>
                    <span className="font-editorial text-xl font-bold text-[#4A3E56]">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Coupon Box */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="p-3 rounded-xl bg-[#FAF4FC] border border-[#DDD6E9] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#604E72] font-semibold">
                        <Tag className="w-4 h-4 text-[#D4AF37]" />
                        <span>{appliedCoupon.code} applied (-{formatCurrency(discount)})</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-[#D9534F] hover:underline font-medium text-[0.7rem]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Promo code (e.g. DREAM10)"
                          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#E8E2EE] uppercase placeholder-normal focus:outline-none focus:border-[#7E6A94]"
                        />
                        <button
                          type="submit"
                          disabled={couponLoading}
                          className="px-4 py-2 bg-[#FAF4FC] hover:bg-[#EFEAF6] border border-[#E8E2EE] rounded-xl text-xs font-semibold text-[#4A3E56] transition-colors"
                        >
                          {couponLoading ? '...' : 'Apply'}
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[0.72rem] text-[#D9534F]">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-3.5 px-6 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-dream transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[0.68rem] text-center text-[#7E6A94]">
                  🔒 Guaranteed 256-bit encrypted checkout & money-back guarantee.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
