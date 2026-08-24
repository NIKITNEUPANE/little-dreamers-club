'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  Plus,
} from 'lucide-react';
import { db } from '../../../lib/db/store';
import { Order, Product } from '../../../lib/db/types';
import { formatCurrency, formatDate } from '../../../lib/utils';

export default function AdminOverviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      const [fetchedOrders, fetchedProducts] = await Promise.all([
        db.getOrders(undefined, true),
        db.getProducts(),
      ]);
      setOrders(fetchedOrders);
      setProducts(fetchedProducts);
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.payment_status === 'Paid' || o.payment_status === 'COD' ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing');
  const lowStockVariants = products.flatMap((p) =>
    p.variants
      .filter((v) => v.stock_quantity <= v.low_stock_threshold)
      .map((v) => ({ ...v, productName: p.name, productSlug: p.slug }))
  );

  return (
    <div className="space-y-8">
      {/* Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-3xl font-semibold text-[#2A2433]">
            Store Overview
          </h1>
          <p className="text-xs text-[#7E6A94] mt-0.5">
            Real-time analytics and inventory health for Little Dreamers Club.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Revenue */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8E2EE] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7E6A94]">
            <span className="font-bold uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-full bg-[#FAF3DE] text-[#B89324] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#362945]">
            {formatCurrency(totalRevenue)}
          </p>
          <div className="flex items-center gap-1 text-[0.7rem] text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% this month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8E2EE] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7E6A94]">
            <span className="font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-full bg-[#EFEAF6] text-[#604E72] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#362945]">
            {orders.length}
          </p>
          <p className="text-[0.7rem] text-[#7E6A94]">
            {pendingOrders.length} pending fulfillment
          </p>
        </div>

        {/* Active Products */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8E2EE] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7E6A94]">
            <span className="font-bold uppercase tracking-wider">Active Products</span>
            <div className="w-8 h-8 rounded-full bg-[#FAF4FC] text-[#7E6A94] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-[#362945]">
            {products.length}
          </p>
          <p className="text-[0.7rem] text-[#7E6A94]">Across 6 departments</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-6 rounded-2xl bg-white border border-[#E8E2EE] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7E6A94]">
            <span className="font-bold uppercase tracking-wider">Low Stock Warnings</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="font-editorial text-2xl sm:text-3xl font-bold text-amber-600">
            {lowStockVariants.length}
          </p>
          <p className="text-[0.7rem] text-[#7E6A94]">Variants under threshold</p>
        </div>
      </div>

      {/* Low Stock Warning Banner if any */}
      {lowStockVariants.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Low Stock Restock Alerts</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {lowStockVariants.map((item) => (
              <div key={item.id} className="p-2.5 rounded-xl bg-white border border-amber-200">
                <p className="font-semibold text-[#2A2433]">{item.productName}</p>
                <p className="text-[0.68rem] text-amber-800">
                  {item.size} / {item.color} • <strong className="font-bold">{item.stock_quantity} left</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-[#E8E2EE] flex items-center justify-between">
          <h3 className="font-editorial text-lg font-semibold text-[#362945]">
            Recent Orders
          </h3>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-[#604E72] hover:underline flex items-center gap-1"
          >
            <span>Manage All Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#7E6A94] uppercase tracking-wider font-bold text-[0.68rem] border-b border-[#E8E2EE]">
              <tr>
                <th className="py-3 px-6">Order #</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Payment</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEF8] text-[#2A2433]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF4FC]/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#4A3E56]">
                    {order.order_number}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold">{order.shipping_address.fullName}</p>
                    <p className="text-[0.68rem] text-[#7E6A94]">{order.guest_email}</p>
                  </td>
                  <td className="py-4 px-6 text-[#7E6A94]">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-4 px-6 font-bold">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EFEAF6] text-[#604E72] text-[0.65rem] font-bold">
                      {order.payment_status} ({order.payment_method.toUpperCase()})
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3DE] text-[#B89324] border border-[#F2DC98] text-[0.65rem] font-bold">
                      {order.status}
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
