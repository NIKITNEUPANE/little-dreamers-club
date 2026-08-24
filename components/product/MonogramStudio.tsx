'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Info } from 'lucide-react';
import { MonogramCustomization } from '../../lib/db/types';

interface MonogramStudioProps {
  onCustomizationChange: (customization: MonogramCustomization | null) => void;
  productName: string;
}

interface ThreadColor {
  id: string;
  name: string;
  hex: string;
  borderHex: string;
}

interface FontStyle {
  id: 'script' | 'roman' | 'serif';
  name: string;
  description: string;
  previewFontClass: string;
}

const THREAD_COLORS: ThreadColor[] = [
  { id: 'gold', name: 'Gilded Gold', hex: '#D4AF37', borderHex: '#B5942C' },
  { id: 'lavender', name: 'Dusty Lavender', hex: '#8F78A8', borderHex: '#735E8B' },
  { id: 'rose', name: 'Rose Blush', hex: '#E57697', borderHex: '#C95D7D' },
  { id: 'ivory', name: 'Pearl Ivory', hex: '#FAF5EE', borderHex: '#D8CEBF' },
  { id: 'plum', name: 'Midnight Plum', hex: '#362945', borderHex: '#251A31' },
];

const FONT_STYLES: FontStyle[] = [
  {
    id: 'script',
    name: 'Heritage Script',
    description: 'Calligraphic satin embroidery',
    previewFontClass: 'font-serif italic font-normal tracking-wide',
  },
  {
    id: 'roman',
    name: 'Classic Roman',
    description: 'Stately uppercase monogram',
    previewFontClass: 'font-serif uppercase tracking-[0.25em] font-medium',
  },
  {
    id: 'serif',
    name: 'Modern Serif',
    description: 'Minimalist clean embroidery',
    previewFontClass: 'font-sans uppercase tracking-widest font-semibold',
  },
];

const PLACEMENTS = [
  { id: 'chest', label: 'Left Chest / Pocket' },
  { id: 'hem', label: 'Cuff & Hemline' },
  { id: 'center', label: 'Center Star Emblem' },
];

export const MONOGRAM_PRICE = 450; // Rs. 450 per bespoke embroidered garment

export const MonogramStudio: React.FC<MonogramStudioProps> = ({
  onCustomizationChange,
  productName,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [monogramText, setMonogramText] = useState('');
  const [selectedFont, setSelectedFont] = useState<FontStyle>(FONT_STYLES[0]);
  const [selectedThread, setSelectedThread] = useState<ThreadColor>(THREAD_COLORS[0]);
  const [selectedPlacement, setSelectedPlacement] = useState(PLACEMENTS[0].label);

  useEffect(() => {
    if (isEnabled && monogramText.trim().length > 0) {
      onCustomizationChange({
        text: monogramText.trim(),
        font: selectedFont.id,
        fontLabel: selectedFont.name,
        threadColor: selectedThread.hex,
        threadName: selectedThread.name,
        placement: selectedPlacement,
        price: MONOGRAM_PRICE,
      });
    } else {
      onCustomizationChange(null);
    }
  }, [isEnabled, monogramText, selectedFont, selectedThread, selectedPlacement, onCustomizationChange]);

  const handleToggle = () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    if (nextState && !monogramText) {
      setMonogramText('Aria'); // Gentle luxury placeholder default
    }
  };

  return (
    <div className="mt-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE4F0] p-4 sm:p-5 transition-all">
      {/* Studio Header Toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#EFEAF6] flex items-center justify-center text-[#604E72]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-semibold text-[#2A2433]">
                Bespoke Name & Monogram Embroidery
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#604E72] text-[0.65rem] font-bold">
                +Rs. {MONOGRAM_PRICE}
              </span>
            </div>
            <p className="text-[0.7rem] text-[#7E6A94]">
              Custom hand-stitched personalization for heirlooms & gifts
            </p>
          </div>
        </div>

        {/* Custom Toggle Switch */}
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={isEnabled}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isEnabled ? 'bg-[#604E72]' : 'bg-[#E8E2EE]'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              isEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Expanded Customizer Workspace */}
      {isEnabled && (
        <div className="mt-5 pt-4 border-t border-[#EAE4F0] space-y-4 animate-in fade-in duration-300">
          {/* Live Stitched Embroidery Preview Box */}
          <div className="relative rounded-2xl bg-white border border-[#E2DAEB] p-4 text-center shadow-xs overflow-hidden">
            <div className="text-[0.65rem] font-bold text-[#9F8EB9] uppercase tracking-wider mb-2">
              Live Stitched Embroidery Preview
            </div>

            <div
              className={`text-2xl sm:text-3xl py-2 px-4 transition-all inline-block ${selectedFont.previewFontClass}`}
              style={{
                color: selectedThread.hex,
                textShadow: `0 1px 1px rgba(0,0,0,0.15), 0 0 1px ${selectedThread.borderHex}, 0 2px 4px rgba(74,62,86,0.1)`,
                letterSpacing: selectedFont.id === 'roman' ? '0.2em' : 'normal',
              }}
            >
              {monogramText.trim() || 'Your Name'}
            </div>

            <div className="text-[0.68rem] text-[#7E6A94] mt-1 flex items-center justify-center gap-2">
              <span>Thread: <strong className="text-[#4A3E56]">{selectedThread.name}</strong></span>
              <span>•</span>
              <span>Style: <strong className="text-[#4A3E56]">{selectedFont.name}</strong></span>
              <span>•</span>
              <span>Placement: <strong className="text-[#4A3E56]">{selectedPlacement}</strong></span>
            </div>
          </div>

          {/* 1. Name / Initials Input */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3E56] mb-1.5">
              1. Child&apos;s Name or Initials (Max 12 letters)
            </label>
            <input
              type="text"
              value={monogramText}
              onChange={(e) => setMonogramText(e.target.value.slice(0, 12))}
              placeholder="e.g. Aria, Noah, or L.D."
              maxLength={12}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8E2EE] focus:border-[#604E72] focus:ring-1 focus:ring-[#604E72] text-sm text-[#2A2433] placeholder-[#9F8EB9] outline-none transition-all shadow-2xs font-medium"
            />
          </div>

          {/* 2. Silk Thread Color Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3E56] mb-2">
              2. Silk Embroidery Thread Color
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {THREAD_COLORS.map((color) => {
                const isSelected = selectedThread.id === color.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedThread(color)}
                    className={`p-2 rounded-xl border flex items-center gap-2 transition-all text-left ${
                      isSelected
                        ? 'bg-white border-[#604E72] shadow-xs ring-1 ring-[#604E72]'
                        : 'bg-white/70 border-[#E8E2EE] hover:bg-white hover:border-[#D0C6DE]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 border border-black/10 shadow-2xs flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-2.5 h-2.5 ${
                            color.id === 'ivory' ? 'text-[#4A3E56]' : 'text-white'
                          }`}
                        />
                      )}
                    </span>
                    <span className="text-[0.68rem] font-semibold text-[#362945] truncate">
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Embroidery Font Style Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3E56] mb-2">
              3. Embroidery Font Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {FONT_STYLES.map((font) => {
                const isSelected = selectedFont.id === font.id;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => setSelectedFont(font)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-white border-[#604E72] shadow-xs ring-1 ring-[#604E72]'
                        : 'bg-white/70 border-[#E8E2EE] hover:bg-white hover:border-[#D0C6DE]'
                    }`}
                  >
                    <div className={`text-base font-semibold text-[#2A2433] mb-0.5 ${font.previewFontClass}`}>
                      {monogramText.trim() || 'Aria'}
                    </div>
                    <div className="text-[0.68rem] font-bold text-[#604E72]">{font.name}</div>
                    <div className="text-[0.62rem] text-[#9F8EB9]">{font.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Placement Option */}
          <div>
            <label className="block text-xs font-semibold text-[#4A3E56] mb-2">
              4. Embroidery Placement
            </label>
            <div className="flex flex-wrap gap-2">
              {PLACEMENTS.map((place) => {
                const isSelected = selectedPlacement === place.label;
                return (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => setSelectedPlacement(place.label)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#4A3E56] text-white border-[#4A3E56] shadow-xs'
                        : 'bg-white text-[#604E72] border-[#E8E2EE] hover:bg-[#FAF4FC]'
                    }`}
                  >
                    {place.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Luxury Promise Note */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FAF4FC] text-[0.68rem] text-[#7E6A94] border border-[#EAE4F0]">
            <Info className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
            <span>
              Each personalization is individually hand-stitched by our master artisans with hypoallergenic organic silk thread. Adds 24h to fulfillment.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
