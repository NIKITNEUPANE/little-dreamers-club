'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Moon, Star, Heart, Volume2, VolumeX, ArrowRight, Check } from 'lucide-react';

interface RitualStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  productName: string;
  productPrice: string;
  productLink: string;
  imageUrl: string;
  tag: string;
}

const RITUAL_STEPS: RitualStep[] = [
  {
    id: 'step-1',
    stepNumber: 'Step 01',
    title: 'The Twilight Wind-Down',
    subtitle: 'Dim the nursery lights and whisper a favorite bedtime story.',
    description:
      'Begin the transition into night with calming sensory cues. Soft nursery lamp light, quiet lullabies, and a warm bath prepare little eyes for restorative sleep.',
    highlights: [
      'Warm bath with organic lavender drops',
      'Quiet picture book cuddles in the rocking chair',
      'Gentle soothing sleep environment',
    ],
    productName: 'Twinkle Star Ribbed Romper',
    productPrice: 'Rs. 2,650',
    productLink: '/product/lavender-star-ribbed-romper',
    imageUrl: '/images/story-editorial.jpg',
    tag: 'Calm & Cozy',
  },
  {
    id: 'step-2',
    stepNumber: 'Step 02',
    title: 'Pure Organic Skin Hug',
    subtitle: 'Dress in silky GOTS-certified modal that breathes through the night.',
    description:
      'Babies regulate body temperature through their skin. Our flatlock-stitched, tagless modal pyjamas prevent itching and night overheating.',
    highlights: [
      'Tagless necklines for zero irritation',
      'Natural temperature-regulating organic fibers',
      'Foldover scratch-free cuffs for tiny fingers',
    ],
    productName: 'Cloudy Dreams Organic Pajama Set',
    productPrice: 'Rs. 3,450',
    productLink: '/product/cloudy-dreams-organic-pajama-set',
    imageUrl: '/images/pajama-set-1.jpg',
    tag: 'Sensory Safe',
  },
  {
    id: 'step-3',
    stepNumber: 'Step 03',
    title: 'The Little Moon Cocoon',
    subtitle: 'Tuck them gently beneath a weightless cashmere-knit cloud.',
    description:
      'Woven from fine Mongolian cashmere and long-staple cotton, our blanket provides comforting micro-pressure that helps little dreamers feel safely cradled.',
    highlights: [
      'Cashmere-soft warmth without heaviness',
      'Embroidered gold-thread crescent moon',
      'Heirloom keepsake passed down to siblings',
    ],
    productName: 'Little Moon Cashmere Knit Blanket',
    productPrice: 'Rs. 6,800',
    productLink: '/product/little-moon-cashmere-knit-blanket',
    imageUrl: '/images/moon-blanket-1.jpg',
    tag: 'Heirloom Touch',
  },
  {
    id: 'step-4',
    stepNumber: 'Step 04',
    title: 'A Friend for Dreamland',
    subtitle: 'Place their linen companion near their pillow for sweet dreams.',
    description:
      'Safe from birth, our Belgian linen Dream Bunny is filled with hypoallergenic plant fibers, giving little ones a comforting companion to hold as eyelids grow heavy.',
    highlights: [
      'Hand-embroidered eyes safe for newborns',
      'Hypoallergenic washed Belgian linen',
      'Naturally calming tactile sensory feel',
    ],
    productName: 'Dream Bunny Heirloom Organic Plush',
    productPrice: 'Rs. 2,450',
    productLink: '/product/dream-bunny-heirloom-organic-plush',
    imageUrl: '/images/bunny-plush-1.jpg',
    tag: 'Bedtime Bestie',
  },
];

export const BedtimeRitualSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLullabyPlaying, setIsLullabyPlaying] = useState(false);

  const activeStep = RITUAL_STEPS[activeIdx];

  // Play gentle web audio chime
  const toggleLullaby = () => {
    if (typeof window === 'undefined') return;

    if (!isLullabyPlaying) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Celesta chords)
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.3);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.3 + 1.8);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.3);
            osc.stop(ctx.currentTime + i * 0.3 + 2.0);
          });
        }
      } catch (e) {
        console.log('Audio chime not supported');
      }
      setIsLullabyPlaying(true);
      setTimeout(() => setIsLullabyPlaying(false), 2500);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF4FC]/50 relative overflow-hidden border-y border-[#E8E2EE]">
      {/* Decorative stars */}
      <div className="absolute top-10 right-12 text-[#D4AF37]/20 hidden lg:block animate-float">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E8E2EE] text-[0.68rem] font-bold tracking-[0.2em] text-[#604E72] uppercase shadow-2xs">
            <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Little Dreamers Sleep Sanctuary</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2A2433] tracking-tight">
            The Gentle Bedtime Ritual
          </h2>

          <p className="text-xs sm:text-sm text-[#7E6A94] leading-relaxed">
            Simple, soothing moments designed for peaceful evenings, restorative sleep, and sweet dreams.
          </p>

          {/* Interactive Lullaby Chime Button */}
          <div className="pt-2">
            <button
              onClick={toggleLullaby}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-2xs ${
                isLullabyPlaying
                  ? 'bg-[#EFEAF6] text-[#4A3E56] border-[#BEB2D4] scale-105'
                  : 'bg-white text-[#7E6A94] hover:text-[#4A3E56] border-[#E8E2EE]'
              }`}
            >
              {isLullabyPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  <span className="text-[#604E72]">Playing Night Chime... ✨</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Listen to Sleep Chime</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step Navigation Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
          {RITUAL_STEPS.map((step, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs font-semibold tracking-wide shrink-0 transition-all flex items-center gap-2.5 border ${
                  isActive
                    ? 'bg-[#4A3E56] text-white border-[#4A3E56] shadow-dream scale-[1.02]'
                    : 'bg-white text-[#7E6A94] hover:text-[#362945] border-[#E8E2EE] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold ${
                  isActive ? 'bg-[#D4AF37] text-white' : 'bg-[#EFEAF6] text-[#604E72]'
                }`}>
                  {idx + 1}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Ritual Step Showcase Card */}
        <div className="bg-white rounded-[2.5rem] border border-[#E8E2EE] shadow-dream p-6 sm:p-10 lg:p-12 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Image & Product Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#F5F0E8] border border-[#E8E2EE] shadow-2xs group">
                <Image
                  src={activeStep.imageUrl}
                  alt={activeStep.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E8E2EE] text-[0.68rem] font-bold uppercase tracking-wider text-[#604E72] shadow-2xs">
                  {activeStep.tag}
                </div>
              </div>

              {/* Floating Product Link Widget */}
              <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2EE] flex items-center justify-between">
                <div>
                  <span className="text-[0.65rem] uppercase tracking-wider font-bold text-[#7E6A94]">
                    Featured Heirloom Piece
                  </span>
                  <p className="text-xs font-semibold text-[#2A2433]">{activeStep.productName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-[#4A3E56]">{activeStep.productPrice}</span>
                  <Link
                    href={activeStep.productLink}
                    className="px-3.5 py-1.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-[0.7rem] font-semibold flex items-center gap-1 transition-all"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Step Story Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {activeStep.stepNumber}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#362945]">
                  {activeStep.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#604E72]">
                  {activeStep.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#7E6A94] leading-relaxed">
                {activeStep.description}
              </p>

              {/* Checklist points */}
              <div className="space-y-2.5 pt-2 border-t border-[#F3EEF8]">
                {activeStep.highlights.map((point, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#2A2433]">
                    <div className="w-5 h-5 rounded-full bg-[#EFEAF6] text-[#604E72] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Next / Prev Controls */}
              <div className="flex items-center justify-between pt-4">
                <button
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                    activeIdx === 0
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-[#604E72] hover:bg-[#FAF4FC]'
                  }`}
                >
                  ← Previous Step
                </button>

                <div className="flex gap-1.5">
                  {RITUAL_STEPS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveIdx(dotIdx)}
                      className={`h-2 rounded-full transition-all ${
                        activeIdx === dotIdx ? 'w-6 bg-[#4A3E56]' : 'w-2 bg-[#E8E2EE]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={activeIdx === RITUAL_STEPS.length - 1}
                  onClick={() => setActiveIdx((prev) => Math.min(RITUAL_STEPS.length - 1, prev + 1))}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                    activeIdx === RITUAL_STEPS.length - 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-[#604E72] hover:bg-[#FAF4FC]'
                  }`}
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
