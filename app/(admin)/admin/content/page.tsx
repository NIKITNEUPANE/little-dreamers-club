'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Save, Check, Sparkles } from 'lucide-react';
import { db } from '../../../../lib/db/store';
import { StoreContent } from '../../../../lib/db/types';

export default function AdminContentPage() {
  const [content, setContent] = useState<StoreContent | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    async function loadContent() {
      const data = await db.getStoreContent();
      setContent(data);
    }
    loadContent();
  }, []);

  const handleHeroChange = (field: string, value: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero_section: {
        ...content.hero_section,
        [field]: value,
      },
    });
  };

  const handleAnnouncementChange = (field: string, value: any) => {
    if (!content) return;
    setContent({
      ...content,
      announcement_bar: {
        ...content.announcement_bar,
        [field]: value,
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    await db.updateStoreContent('hero_section', content.hero_section);
    await db.updateStoreContent('announcement_bar', content.announcement_bar);

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  if (!content) return <div className="p-8 text-xs text-[#7E6A94]">Loading content...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-editorial text-3xl font-semibold text-[#2A2433]">
            Storefront Content & Copy
          </h1>
          <p className="text-xs text-[#7E6A94] mt-0.5">
            Update headlines, hero storytelling banners, and announcement messages.
          </p>
        </div>

        {savedMessage && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
            <Check className="w-4 h-4" />
            <span>Content published live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Announcement Bar Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-4">
          <h3 className="font-editorial text-xl font-semibold text-[#362945]">
            Top Announcement Bar
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
              Banner Text Message
            </label>
            <input
              type="text"
              value={content.announcement_bar.text}
              onChange={(e) => handleAnnouncementChange('text', e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Link Label
              </label>
              <input
                type="text"
                value={content.announcement_bar.link_text}
                onChange={(e) => handleAnnouncementChange('link_text', e.target.value)}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Free Shipping Threshold ($)
              </label>
              <input
                type="number"
                value={content.announcement_bar.free_shipping_threshold}
                onChange={(e) => handleAnnouncementChange('free_shipping_threshold', Number(e.target.value))}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-4">
          <h3 className="font-editorial text-xl font-semibold text-[#362945]">
            Homepage Hero Story
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
              Category Pill Badge
            </label>
            <input
              type="text"
              value={content.hero_section.badge}
              onChange={(e) => handleHeroChange('badge', e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
              Main Headline
            </label>
            <textarea
              rows={2}
              value={content.hero_section.headline}
              onChange={(e) => handleHeroChange('headline', e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
              Subheadline
            </label>
            <textarea
              rows={2}
              value={content.hero_section.subheadline}
              onChange={(e) => handleHeroChange('subheadline', e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Primary CTA Button
              </label>
              <input
                type="text"
                value={content.hero_section.primary_cta_text}
                onChange={(e) => handleHeroChange('primary_cta_text', e.target.value)}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Secondary CTA Button
              </label>
              <input
                type="text"
                value={content.hero_section.secondary_cta_text}
                onChange={(e) => handleHeroChange('secondary_cta_text', e.target.value)}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider shadow-dream transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
