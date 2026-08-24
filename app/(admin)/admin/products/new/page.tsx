'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { db } from '../../../../../lib/db/store';
import { Category, ProductVariant } from '../../../../../lib/db/types';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category_id: '',
    base_price: 3200,
    compare_at_price: 3750,
    short_description: '',
    description: '',
    materials: '100% GOTS-Certified Organic Cotton.',
    care_instructions: 'Machine wash cold on gentle cycle. Tumble dry low.',
    featured: true,
    image_url: '/images/pajama-set-1.jpg',
  });

  const [variants, setVariants] = useState<Omit<ProductVariant, 'id' | 'product_id'>[]>([
    {
      sku: 'LDC-NEW-01',
      size: '0-3M',
      color: 'Soft Lavender',
      color_hex: '#8F78A8',
      price: 3200,
      stock_quantity: 15,
      low_stock_threshold: 3,
    },
    {
      sku: 'LDC-NEW-02',
      size: '3-6M',
      color: 'Soft Lavender',
      color_hex: '#8F78A8',
      price: 3200,
      stock_quantity: 20,
      low_stock_threshold: 4,
    },
    {
      sku: 'LDC-NEW-03',
      size: '6-12M',
      color: 'Soft Lavender',
      color_hex: '#8F78A8',
      price: 3200,
      stock_quantity: 18,
      low_stock_threshold: 4,
    },
  ]);

  useEffect(() => {
    async function loadCats() {
      const cats = await db.getCategories();
      setCategories(cats);
      if (cats.length > 0) {
        setFormData((prev) => ({ ...prev, category_id: cats[0].id }));
      }
    }
    loadCats();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const generatedSku = `LDC-${val.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    setFormData({
      ...formData,
      name: val,
      slug: generatedSlug,
      sku: formData.sku || generatedSku,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug || !formData.category_id) return;

    setLoading(true);

    const categoryObj = categories.find((c) => c.id === formData.category_id);

    const newProd = await db.createProduct({
      name: formData.name,
      slug: formData.slug,
      sku: formData.sku,
      category_id: formData.category_id,
      category_name: categoryObj?.name,
      base_price: Number(formData.base_price),
      compare_at_price: formData.compare_at_price ? Number(formData.compare_at_price) : undefined,
      short_description: formData.short_description,
      description: formData.description,
      materials: formData.materials,
      care_instructions: formData.care_instructions,
      featured: formData.featured,
      status: 'active',
      rating: 5.0,
      review_count: 0,
      images: [
        {
          id: `img-${Date.now()}-1`,
          product_id: 'temp',
          image_url: formData.image_url,
          alt_text: formData.name,
          sort_order: 1,
          is_primary: true,
        },
      ],
      variants: variants.map((v, i) => ({
        ...v,
        id: `var-${Date.now()}-${i}`,
        product_id: 'temp',
      })),
      reviews: [],
    });

    setLoading(false);
    router.push('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="p-2 rounded-full border border-[#E8E2EE] bg-white text-[#7E6A94] hover:text-[#2A2433]"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#2A2433]">
            Add New Heirloom Product
          </h1>
          <p className="text-xs text-[#7E6A94]">
            Create a new product with custom variants, stock levels, and luxury details.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs space-y-4">
          <h3 className="font-editorial text-lg font-semibold text-[#362945]">
            Product Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Lavender Star Ribbed Sleep Romper"
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Base SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Department / Category *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Base Price (Rs.) *
              </label>
              <input
                type="number"
                step="1"
                required
                value={formData.base_price}
                onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
              Short Description (Card preview)
            </label>
            <input
              type="text"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="e.g. Ultra-soft modal sleepwear with gold embroidered star details."
              className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
              Full Story & Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the fabric, tailoring, bedtime comfort, and story..."
              className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-6 py-2.5 rounded-full border border-[#E8E2EE] bg-white text-xs font-semibold text-[#7E6A94]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
          >
            {loading ? 'Creating Product...' : 'Publish Product to Store'}
          </button>
        </div>
      </form>
    </div>
  );
}
