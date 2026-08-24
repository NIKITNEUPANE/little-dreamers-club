'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, Package, ArrowRight, Truck, Home } from 'lucide-react';
import { db } from '../../../../lib/db/store';
import { Order } from '../../../../lib/db/types';
import { formatCurrency, formatDate } from '../../../../lib/utils';
import { BrandLogo } from '../../../../components/ui/BrandLogo';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire confetti celebratory burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7E6A94', '#D4AF37', '#FAF3DE', '#9F8EB9'],
      });
    } catch (e) {
      console.error(e);
    }

    async function loadOrder() {
      if (orderNumber) {
        const found = await db.getOrderByNumber(orderNumber);
        setOrder(found);
      }
      setLoading(false);
    }
    loadOrder();
  }, [orderNumber]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8E2EE] shadow-dream-lg p-6 sm:p-10 space-y-8 text-center sm:text-left">
          {/* Header Status */}
          <div className="text-center space-y-3 pb-8 border-b border-[#E8E2EE]">
            <div className="w-16 h-16 rounded-full bg-[#FAF4FC] text-[#604E72] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 text-[#604E72]" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Confirmed</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#2A2433]">
              Thank You for Your Order
            </h1>

            <p className="text-xs sm:text-sm text-[#7E6A94] max-w-md mx-auto">
              We have received your order and our workshop is carefully preparing your little treasures.
            </p>

            <div className="inline-block px-4 py-1.5 rounded-full bg-[#EFEAF6] text-[#4A3E56] font-mono text-xs font-bold">
              Order #{order?.order_number || orderNumber || 'LDC-2026-001295'}
            </div>
          </div>

          {/* Delivery & Timeline Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#7E6A94]">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2EE] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#362945] uppercase tracking-wider text-[0.68rem]">
                <Truck className="w-4 h-4 text-[#604E72]" />
                <span>Estimated Delivery</span>
              </div>
              <p className="text-sm font-semibold text-[#2A2433]">2 - 4 Business Days</p>
              <p className="text-[0.7rem] text-[#9F8EB9]">You will receive tracking updates via email.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2EE] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#362945] uppercase tracking-wider text-[0.68rem]">
                <Package className="w-4 h-4 text-[#604E72]" />
                <span>Shipping To</span>
              </div>
              <p className="font-semibold text-[#2A2433]">
                {order?.shipping_address?.fullName || 'Valued Little Dreamer'}
              </p>
              <p className="text-[0.7rem]">
                {order?.shipping_address?.addressLine1}, {order?.shipping_address?.city}, {order?.shipping_address?.provinceState}
              </p>
            </div>
          </div>

          {/* Itemized Receipt */}
          {order && order.items && (
            <div className="space-y-3 pt-2">
              <h3 className="font-editorial text-lg font-semibold text-[#362945]">
                Purchased Treasures
              </h3>
              <div className="border border-[#E8E2EE] rounded-2xl divide-y divide-[#F3EEF8] overflow-hidden">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-[#F5F0E8] overflow-hidden shrink-0 border border-[#E8E2EE]">
                        <Image
                          src={item.image_url || '/images/pajama-set-1.jpg'}
                          alt={item.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-semibold text-[#2A2433]">{item.product_name}</h4>
                        <p className="text-[0.68rem] text-[#7E6A94]">{item.variant_details} (Qty: {item.quantity})</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#4A3E56]">
                      {formatCurrency(item.total)}
                    </span>
                  </div>
                ))}
                <div className="p-4 bg-[#FAF8F5] flex justify-between items-center text-xs font-bold text-[#362945]">
                  <span>Total Paid ({order.payment_method.toUpperCase()})</span>
                  <span className="text-sm text-[#604E72]">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[#E8E2EE]">
            <Link
              href="/account"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-dream transition-all"
            >
              <span>View Order in Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white border border-[#E8E2EE] hover:bg-[#F3EEF8] text-[#4A3E56] text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-12 text-center text-xs text-[#7E6A94]">Loading receipt...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
