import React from 'react';
import { Truck, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
            <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Fast & Gentle</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#2A2433]">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#7E6A94]">
            Every little parcel is packed by hand in eco-friendly protective packaging and delivered across Nepal.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-8 text-xs sm:text-sm text-[#7E6A94] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-editorial text-xl font-semibold text-[#362945]">
              Shipping Rates & Delivery Times
            </h2>
            <div className="border border-[#E8E2EE] rounded-2xl overflow-hidden mt-3">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] text-[#362945] font-bold uppercase text-[0.68rem] border-b border-[#E8E2EE]">
                  <tr>
                    <th className="p-3">Service</th>
                    <th className="p-3">Estimated Transit</th>
                    <th className="p-3">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EEF8]">
                  <tr>
                    <td className="p-3 font-semibold text-[#2A2433]">Kathmandu Valley Standard</td>
                    <td className="p-3">1 – 2 Business Days</td>
                    <td className="p-3">Rs. 150 (Free over Rs. 4,000)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#2A2433]">All-Nepal Express Delivery</td>
                    <td className="p-3">2 – 4 Business Days</td>
                    <td className="p-3">Rs. 300 (Free over Rs. 4,000)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#2A2433]">Cash on Delivery (COD)</td>
                    <td className="p-3">1 – 4 Business Days</td>
                    <td className="p-3">Standard rates apply</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-xl font-semibold text-[#362945]">
              Complimentary Gift Packaging
            </h2>
            <p>
              Every order arrives lovingly wrapped in signature Little Dreamers Club tissue paper with a handwritten keepsake gift card.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
