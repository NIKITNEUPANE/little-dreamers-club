import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Shield, Star, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#604E72] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Our Philosophy</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium text-[#2A2433] tracking-tight">
            Crafted for Bedtime Stories & Gentle Slumber
          </h1>
          <p className="text-xs sm:text-sm text-[#7E6A94] leading-relaxed">
            Little Dreamers Club was founded with a quiet devotion to slow childhood, peaceful bedtime rituals, and uncompromised softness.
          </p>
        </div>

        {/* Big Editorial Image */}
        <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-dream-lg border border-white">
          <Image
            src="/images/story-editorial.jpg"
            alt="Little Dreamers Club Mother and Baby"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Story Paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xs sm:text-sm text-[#7E6A94] leading-relaxed">
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-semibold text-[#362945]">
              A Sanctuary of Wonder & Rest
            </h2>
            <p>
              We believe early childhood is sacred. In a world of fast fashion and synthetic materials, we sought to return to heirloom craftsmanship—pieces that feel like a mother&apos;s gentle embrace and are tailored to endure countless wash cycles without losing their silky touch.
            </p>
            <p>
              Every garment in our catalog is created from scratch with sensory-sensitive children in mind: flatlock seams that never itch, tagless necklines, and breathable organic fibers that regulate temperature through every sleep cycle.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-semibold text-[#362945]">
              Honest Sustainability
            </h2>
            <p>
              Our cotton is 100% GOTS-certified organic, cultivated without pesticides or chemical defoliants. Our knitwear uses pure Mongolian cashmere sourced from humane, free-range herders.
            </p>
            <p>
              Every Little Dreamers Club order is wrapped in recycled acid-free tissue paper and shipped in plastic-free, compostable mailers or recyclable linen keepsake boxes.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E2EE] shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EFEAF6] text-[#604E72] flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#362945]">Pure Organic</h3>
            <p className="text-xs text-[#7E6A94]">Free from formaldehyde, AZO dyes, and chemical softeners.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E2EE] shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EFEAF6] text-[#604E72] flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#362945]">Heirloom Love</h3>
            <p className="text-xs text-[#7E6A94]">Timeless styles designed to be handed down to younger siblings.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8E2EE] shadow-2xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EFEAF6] text-[#604E72] flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-editorial text-lg font-semibold text-[#362945]">Ethical Workshops</h3>
            <p className="text-xs text-[#7E6A94]">Handcrafted in certified fair-wage ateliers with care.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider shadow-dream transition-all hover:scale-[1.02]"
          >
            <span>Explore Our Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
