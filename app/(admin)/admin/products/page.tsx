'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Plus, Trash2, Edit, Search, Check, AlertCircle } from 'lucide-react';
import { db } from '../../../../lib/db/store';
import { Product } from '../../../../lib/db/types';
import { formatCurrency } from '../../../../lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const all = await db.getProducts();
      setProducts(all);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to archive this product?')) {
      await db.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.category_name && p.category_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-3xl font-semibold text-[#2A2433]">
            Products & Inventory
          </h1>
          <p className="text-xs text-[#7E6A94] mt-0.5">
            Manage catalog items, pricing, variant stock quantities, and descriptions.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-5 py-2.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2EE] shadow-2xs flex items-center gap-3">
        <Search className="w-4 h-4 text-[#7E6A94]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by product name, SKU, or department..."
          className="flex-1 bg-transparent text-xs text-[#2A2433] placeholder-[#9F8EB9] focus:outline-none"
        />
        <span className="text-[0.68rem] text-[#7E6A94]">
          {filtered.length} products
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#7E6A94] uppercase tracking-wider font-bold text-[0.68rem] border-b border-[#E8E2EE]">
              <tr>
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-6">SKU</th>
                <th className="py-3.5 px-6">Department</th>
                <th className="py-3.5 px-6">Base Price</th>
                <th className="py-3.5 px-6">Total Stock</th>
                <th className="py-3.5 px-6">Variants</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEF8] text-[#2A2433]">
              {filtered.map((prod) => {
                const totalStock = prod.variants.reduce((sum, v) => sum + v.stock_quantity, 0);
                const hasLowStock = prod.variants.some((v) => v.stock_quantity <= v.low_stock_threshold);

                return (
                  <tr key={prod.id} className="hover:bg-[#FAF4FC]/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-[#F5F0E8] overflow-hidden border border-[#E8E2EE] shrink-0">
                          <Image
                            src={prod.images[0]?.image_url || '/images/pajama-set-1.jpg'}
                            alt={prod.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-[#2A2433]">{prod.name}</p>
                          <p className="text-[0.68rem] text-[#7E6A94]">
                            ★ {prod.rating.toFixed(1)} ({prod.review_count} reviews)
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-[0.72rem] text-[#604E72]">
                      {prod.sku}
                    </td>

                    <td className="py-4 px-6 text-[#7E6A94]">
                      {prod.category_name || 'General'}
                    </td>

                    <td className="py-4 px-6 font-bold text-[#4A3E56]">
                      {formatCurrency(prod.base_price)}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-semibold ${totalStock === 0 ? 'text-[#D9534F]' : hasLowStock ? 'text-amber-600' : 'text-emerald-700'}`}>
                          {totalStock} units
                        </span>
                        {hasLowStock && (
                          <span title="Low stock in some sizes" className="text-amber-500">⚠</span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-[#7E6A94]">
                      {prod.variants.length} options ({prod.variants.map((v) => v.size).join(', ')})
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg border border-[#E8E2EE] text-[#7E6A94] hover:text-[#4A3E56] hover:bg-[#FAF8F5]"
                          title="View on store"
                        >
                          👁
                        </Link>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-1.5 rounded-lg border border-[#E8E2EE] text-[#7E6A94] hover:text-[#D9534F] hover:bg-red-50 transition-colors"
                          title="Archive product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
