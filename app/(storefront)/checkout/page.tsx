'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Wallet,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';
import { useCart } from '../../../lib/store/useCartStore';
import { useAuth } from '../../../lib/store/useAuthStore';
import { db } from '../../../lib/db/store';
import { getPaymentProvider } from '../../../lib/payments/provider';
import { formatCurrency } from '../../../lib/utils';
import { BrandLogo } from '../../../components/ui/BrandLogo';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, subtotal, discount, shipping, tax, total, appliedCoupon, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    fullName: user?.full_name || '',
    addressLine1: '',
    addressLine2: '',
    city: 'Kathmandu',
    provinceState: 'Bagmati Province',
    postalCode: '44600',
    country: 'Nepal',
    deliveryNotes: '',
    paymentMethod: 'cod', // 'cod' | 'card' | 'digital_wallet'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs">
          <BrandLogo className="justify-center mb-4" />
          <h2 className="font-editorial text-2xl font-semibold text-[#362945]">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-[#7E6A94] mt-2 mb-6">
            Please add items to your bag before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 rounded-full bg-[#4A3E56] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName || !formData.addressLine1 || !formData.city) {
      setErrorMsg('Please complete all required contact and delivery fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Process payment with selected payment provider abstraction
      const provider = getPaymentProvider(formData.paymentMethod);
      const paymentRes = await provider.createPayment({
        orderNumber: `TEMP-${Date.now()}`,
        amount: total,
        currency: 'NPR',
        customerEmail: formData.email,
        customerPhone: formData.phone,
      });

      if (!paymentRes.success) {
        setErrorMsg(paymentRes.message || 'Payment processing failed.');
        setIsSubmitting(false);
        return;
      }

      // 2. Prepare Order Items with immutable historical snapshot
      const orderItems = items.map((item) => ({
        id: `snap-${Date.now()}-${item.variant.id}`,
        product_variant_id: item.variant.id,
        product_name: item.product.name,
        variant_details: `Size: ${item.variant.size} / Color: ${item.variant.color}`,
        image_url: item.product.images[0]?.image_url || '/images/pajama-set-1.jpg',
        quantity: item.quantity,
        unit_price: item.variant.price,
        total: item.variant.price * item.quantity,
      }));

      // 3. Create Order in Database
      const newOrder = await db.createOrder({
        user_id: user?.user_id || null,
        guest_email: formData.email,
        guest_phone: formData.phone,
        status: 'Pending',
        payment_status: paymentRes.paymentStatus,
        payment_method: formData.paymentMethod,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        coupon_code: appliedCoupon?.code,
        shipping_address: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          provinceState: formData.provinceState,
          postalCode: formData.postalCode,
          country: formData.country,
          deliveryNotes: formData.deliveryNotes,
        },
        notes: formData.deliveryNotes,
        items: orderItems,
      });

      // 4. Clear cart and redirect to order success receipt
      clearCart();
      router.push(`/checkout/success?orderNumber=${newOrder.order_number}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMsg('An unexpected error occurred while placing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Distraction-Free Header */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#E8E2EE]">
          <Link href="/cart" className="flex items-center gap-1.5 text-xs font-semibold text-[#7E6A94] hover:text-[#2A2433]">
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </Link>

          <BrandLogo variant="compact" />

          <div className="flex items-center gap-1.5 text-xs text-[#7E6A94]">
            <Lock className="w-3.5 h-3.5 text-[#604E72]" />
            <span className="hidden sm:inline">256-Bit Encrypted</span>
          </div>
        </div>

        {/* Checkout Form & Order Summary */}
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Customer Information & Delivery Fields */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Contact Information */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-xl font-semibold text-[#362945]">
                    1. Contact Information
                  </h3>
                  {!user && (
                    <span className="text-xs text-[#7E6A94]">
                      Guest Checkout (or <Link href="/account" className="text-[#604E72] underline font-medium">sign in</Link>)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="parent@example.com"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] focus:outline-none focus:border-[#7E6A94] bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] focus:outline-none focus:border-[#7E6A94] bg-[#FAF8F5]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-4">
                <h3 className="font-editorial text-xl font-semibold text-[#362945]">
                  2. Delivery Address
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                      Full Recipient Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Eleanor Vance"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] focus:outline-none focus:border-[#7E6A94] bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      required
                      value={formData.addressLine1}
                      onChange={handleChange}
                      placeholder="742 Evergreen Terrace"
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] focus:outline-none focus:border-[#7E6A94] bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Seattle"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] focus:outline-none focus:border-[#7E6A94] bg-[#FAF8F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                        State / Province *
                      </label>
                      <input
                        type="text"
                        name="provinceState"
                        required
                        value={formData.provinceState}
                        onChange={handleChange}
                        placeholder="WA"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] focus:outline-none focus:border-[#7E6A94] bg-[#FAF8F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="98101"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] focus:outline-none focus:border-[#7E6A94] bg-[#FAF8F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                      Delivery & Gift Notes (Optional)
                    </label>
                    <textarea
                      name="deliveryNotes"
                      rows={2}
                      value={formData.deliveryNotes}
                      onChange={handleChange}
                      placeholder="e.g. Leave package inside the front gate / complimentary gift note text..."
                      className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] focus:outline-none focus:border-[#7E6A94] bg-[#FAF8F5]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method Selection */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-4">
                <h3 className="font-editorial text-xl font-semibold text-[#362945]">
                  3. Payment Method
                </h3>

                <div className="space-y-3">
                  {/* COD Option */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#604E72] bg-[#F7F4FB]'
                        : 'border-[#E8E2EE] bg-white hover:border-[#BEB2D4]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mt-1 text-[#604E72] accent-[#604E72]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#604E72]" />
                        <span className="text-xs font-bold text-[#362945]">Cash on Delivery (COD)</span>
                      </div>
                      <p className="text-[0.72rem] text-[#7E6A94] mt-0.5">
                        Pay with cash or local QR scan upon receipt of your package at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* Card Option */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#604E72] bg-[#F7F4FB]'
                        : 'border-[#E8E2EE] bg-white hover:border-[#BEB2D4]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="mt-1 text-[#604E72] accent-[#604E72]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#604E72]" />
                          <span className="text-xs font-bold text-[#362945]">Credit / Debit Card</span>
                        </div>
                        <div className="flex gap-1 text-[0.65rem] text-[#7E6A94]">
                          <span className="px-1.5 py-0.5 rounded bg-gray-100">Visa</span>
                          <span className="px-1.5 py-0.5 rounded bg-gray-100">Mastercard</span>
                        </div>
                      </div>
                      <p className="text-[0.72rem] text-[#7E6A94] mt-0.5">
                        Instant secure 256-bit payment authorization.
                      </p>
                    </div>
                  </label>

                  {/* Digital Wallet Option */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'digital_wallet'
                        ? 'border-[#604E72] bg-[#F7F4FB]'
                        : 'border-[#E8E2EE] bg-white hover:border-[#BEB2D4]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="digital_wallet"
                      checked={formData.paymentMethod === 'digital_wallet'}
                      onChange={handleChange}
                      className="mt-1 text-[#604E72] accent-[#604E72]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#604E72]" />
                        <span className="text-xs font-bold text-[#362945]">Digital Wallet (eSewa / Khalti / Fonepay)</span>
                      </div>
                      <p className="text-[0.72rem] text-[#7E6A94] mt-0.5">
                        Fast 1-touch digital checkout with your mobile wallet.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-6 sticky top-28">
                <h3 className="font-editorial text-xl font-semibold text-[#362945] pb-4 border-b border-[#E8E2EE]">
                  Order Items ({items.length})
                </h3>

                {/* Items List */}
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F5F0E8] border border-[#E8E2EE] shrink-0">
                        <Image
                          src={item.product.images[0]?.image_url || '/images/pajama-set-1.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-0.5 right-0.5 bg-[#4A3E56] text-white text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#2A2433] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[0.68rem] text-[#7E6A94]">
                          {item.variant.size} • {item.variant.color}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#4A3E56]">
                        {formatCurrency(item.variant.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="space-y-2.5 pt-4 border-t border-[#E8E2EE] text-xs text-[#7E6A94]">
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
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (7%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>

                  <div className="pt-3 border-t border-[#E8E2EE] flex justify-between items-baseline">
                    <span className="font-editorial text-base font-bold text-[#2A2433]">Total Due</span>
                    <span className="font-editorial text-2xl font-bold text-[#4A3E56]">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-dream transition-all hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <>
                      <span>Place Order • {formatCurrency(total)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[0.68rem] text-[#7E6A94] text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>30-Day Money Back Guarantee & Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
