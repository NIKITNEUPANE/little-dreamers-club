'use client';

import React, { useState } from 'react';
import { Sliders, Save, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    store_name: 'Little Dreamers Club',
    support_email: 'care@littledreamersclub.com',
    support_phone: '+977 9801234567',
    currency: 'NPR (Rs.)',
    standard_shipping_fee: 150,
    express_shipping_fee: 300,
    free_shipping_threshold: 4000,
    tax_rate: 0,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-editorial text-3xl font-semibold text-[#2A2433]">
            Store & Shipping Settings
          </h1>
          <p className="text-xs text-[#7E6A94] mt-0.5">
            Configure business contact details, shipping rates in Nepali Rupees (Rs.), and tax policies.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
            <Check className="w-4 h-4" />
            <span>Settings saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-4">
          <h3 className="font-editorial text-lg font-semibold text-[#362945]">
            Store Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={settings.store_name}
                onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Customer Support Email
              </label>
              <input
                type="email"
                value={settings.support_email}
                onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-4">
          <h3 className="font-editorial text-lg font-semibold text-[#362945]">
            Shipping & Currency (NPR)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Inside Valley Shipping (Rs.)
              </label>
              <input
                type="number"
                value={settings.standard_shipping_fee}
                onChange={(e) => setSettings({ ...settings, standard_shipping_fee: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Free Shipping Above (Rs.)
              </label>
              <input
                type="number"
                value={settings.free_shipping_threshold}
                onChange={(e) => setSettings({ ...settings, free_shipping_threshold: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Outside Valley Shipping (Rs.)
              </label>
              <input
                type="number"
                value={settings.express_shipping_fee}
                onChange={(e) => setSettings({ ...settings, express_shipping_fee: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider shadow-dream"
          >
            Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
}
