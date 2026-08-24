'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Check, Trash2, Sparkles } from 'lucide-react';
import { db } from '../../../../lib/db/store';
import { Coupon } from '../../../../lib/db/types';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState<'percentage' | 'fixed'>('percentage');
  const [newValue, setNewValue] = useState<number>(10);
  const [newMinOrder, setNewMinOrder] = useState<number>(50);

  useEffect(() => {
    async function loadCoupons() {
      const all = await db.getCoupons();
      setCoupons(all);
    }
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const created = await db.createCoupon({
      code: newCode.trim().toUpperCase(),
      discount_type: newType,
      discount_value: Number(newValue),
      minimum_order: Number(newMinOrder),
      starts_at: new Date().toISOString(),
      active: true,
    });

    setCoupons([...coupons, created]);
    setNewCode('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-3xl font-semibold text-[#2A2433]">
            Discount Coupons
          </h1>
          <p className="text-xs text-[#7E6A94] mt-0.5">
            Create and manage promotional discount codes for your customers.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* New Coupon Form */}
      {isAdding && (
        <form
          onSubmit={handleCreateCoupon}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-[#BEB2D4] shadow-dream space-y-4 animate-in fade-in duration-200"
        >
          <h3 className="font-editorial text-lg font-semibold text-[#362945]">
            Create Discount Code
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                required
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                placeholder="e.g. AUTUMN15"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2EE] uppercase bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Discount Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (Rs.)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Discount Value *
              </label>
              <input
                type="number"
                required
                value={newValue}
                onChange={(e) => setNewValue(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Minimum Order (Rs.)
              </label>
              <input
                type="number"
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs text-[#7E6A94]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#4A3E56] text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
            >
              Save Coupon
            </button>
          </div>
        </form>
      )}

      {/* Coupons List */}
      <div className="bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#7E6A94] uppercase tracking-wider font-bold text-[0.68rem] border-b border-[#E8E2EE]">
              <tr>
                <th className="py-3.5 px-6">Coupon Code</th>
                <th className="py-3.5 px-6">Discount</th>
                <th className="py-3.5 px-6">Min. Order</th>
                <th className="py-3.5 px-6">Times Used</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEF8] text-[#2A2433]">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF4FC]/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#604E72]">
                    {c.code}
                  </td>
                  <td className="py-4 px-6 font-semibold">
                    {c.discount_type === 'percentage' ? `${c.discount_value}% OFF` : `Rs. ${c.discount_value} OFF`}
                  </td>
                  <td className="py-4 px-6 text-[#7E6A94]">
                    Rs. {c.minimum_order.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-medium">
                    {c.usage_count} redemptions
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[0.65rem] font-bold border border-emerald-200">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
