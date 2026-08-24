import React from 'react';
import { RotateCcw, ShieldCheck, Check } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
            <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Peace of Mind</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#2A2433]">
            Returns & Exchanges
          </h1>
          <p className="text-xs sm:text-sm text-[#7E6A94]">
            Simple, stress-free 30-day returns for little dreamers and parents.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-6 text-xs sm:text-sm text-[#7E6A94] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-editorial text-xl font-semibold text-[#362945]">
              30-Day Gentle Guarantee
            </h2>
            <p>
              We want you and your little one to be utterly enchanted with every piece. If an item doesn’t fit or meet your highest expectations, you may return or exchange it within 30 days of delivery.
            </p>
          </section>

          <section className="space-y-3" id="terms">
            <h2 className="font-editorial text-xl font-semibold text-[#362945]">
              Return Conditions
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#604E72] shrink-0" />
                <span>Garments must be unworn, unwashed, with original tags attached.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#604E72] shrink-0" />
                <span>Heirloom plush toys and blankets must be in original keepsake boxes.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#604E72] shrink-0" />
                <span>Free prepaid return labels are provided for all size exchanges.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-2" id="privacy">
            <h2 className="font-editorial text-xl font-semibold text-[#362945]">
              Privacy & Data Policy
            </h2>
            <p>
              We treat your personal data with utmost discretion. Little Dreamers Club never sells your customer data or shares private family information with third-party advertisers. All checkout transactions use bank-grade 256-bit SSL encryption.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
