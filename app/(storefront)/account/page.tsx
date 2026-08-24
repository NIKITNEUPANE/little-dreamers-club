'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../../lib/store/useAuthStore';
import { db } from '../../../lib/db/store';
import { Order } from '../../../lib/db/types';
import { formatCurrency, formatDate } from '../../../lib/utils';

export default function AccountPage() {
  const { user, login, logout, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [loginEmail, setLoginEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadUserOrders() {
      if (user) {
        const fetched = await db.getOrders(user.email, false);
        setOrders(fetched);
      }
    }
    loadUserOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#E8E2EE] shadow-dream space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#FAF4FC] text-[#604E72] flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <h2 className="font-editorial text-2xl font-semibold text-[#362945]">
              Welcome to Your Club Account
            </h2>
            <p className="text-xs text-[#7E6A94]">
              Sign in to view your orders, save shipping addresses, and manage your wishlist.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (loginEmail) login(loginEmail);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] focus:outline-none focus:border-[#7E6A94]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#4A3E56] hover:bg-[#362945] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
            >
              Sign In to Account
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => login('emily.watson@example.com')}
              className="text-xs text-[#604E72] hover:underline font-semibold"
            >
              Demo: Sign In as Emily (Parent & Admin)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
      case 'Packed':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Account Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#F4EFF9] border border-[#DDD6E9] flex items-center justify-center text-[#604E72] font-editorial text-2xl font-bold">
              {user.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-2xl font-semibold text-[#2A2433]">
                  Hello, {user.full_name}
                </h1>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3DE] text-[#B89324] text-[0.65rem] font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7E6A94] mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-5 py-2 rounded-full bg-[#EFEAF6] text-[#604E72] text-xs font-semibold hover:bg-[#DDD6E9] transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full border border-[#E8E2EE] text-xs font-semibold text-[#7E6A94] hover:text-[#D9534F] hover:bg-[#FDF6F8] transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-[#E8E2EE] pb-px mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#604E72] text-[#604E72] bg-white'
                : 'border-transparent text-[#7E6A94] hover:text-[#2A2433]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#604E72] text-[#604E72] bg-white'
                : 'border-transparent text-[#7E6A94] hover:text-[#2A2433]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Preferences</span>
          </button>
        </div>

        {/* Tab 1: Orders List & Tracking */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E2EE] p-8">
                <Package className="w-12 h-12 text-[#9F8EB9] mx-auto mb-3" />
                <h3 className="font-editorial text-xl font-semibold text-[#362945]">
                  No orders placed yet
                </h3>
                <p className="text-xs text-[#7E6A94] mt-1 mb-6">
                  When you order dreamy sleepwear or toys, you will be able to track live delivery here.
                </p>
                <Link
                  href="/shop"
                  className="px-6 py-2.5 rounded-full bg-[#4A3E56] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs overflow-hidden"
                  >
                    {/* Order Top Strip */}
                    <div className="p-6 border-b border-[#E8E2EE] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#362945]">
                            {order.order_number}
                          </span>
                          <span
                            className={`px-3 py-0.5 rounded-full border text-[0.65rem] font-bold uppercase tracking-wider ${getStatusBadge(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-[0.68rem] text-[#7E6A94] mt-1">
                          Placed on {formatDate(order.created_at)} • Payment:{' '}
                          <strong className="text-[#362945]">{order.payment_status}</strong> (
                          {order.payment_method.toUpperCase()})
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[0.68rem] text-[#7E6A94] block">Total Amount</span>
                          <span className="font-editorial text-base font-bold text-[#4A3E56]">
                            {formatCurrency(order.total)}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                          className="px-4 py-2 rounded-full border border-[#E8E2EE] bg-white hover:bg-[#FAF4FC] text-xs font-semibold text-[#4A3E56] transition-colors"
                        >
                          {selectedOrder?.id === order.id ? 'Hide Details' : 'Track Order'}
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 divide-y divide-[#F3EEF8]">
                      {order.items.map((item) => (
                        <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-12 h-12 rounded-xl bg-[#F5F0E8] overflow-hidden border border-[#E8E2EE] shrink-0">
                              <Image
                                src={item.image_url || '/images/pajama-set-1.jpg'}
                                alt={item.product_name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-[#2A2433]">{item.product_name}</h4>
                              <p className="text-[0.68rem] text-[#7E6A94]">{item.variant_details} • Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#4A3E56]">
                            {formatCurrency(item.total)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Live Tracker Expansion */}
                    {selectedOrder?.id === order.id && (
                      <div className="p-6 bg-[#FAF4FC]/50 border-t border-[#E8E2EE] space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#604E72]">
                          <Truck className="w-4 h-4 text-[#D4AF37]" />
                          <span>Delivery Timeline</span>
                          {order.tracking_number && (
                            <span className="ml-auto font-mono text-[0.68rem] text-[#7E6A94]">
                              Tracking: {order.tracking_number} ({order.carrier || 'USPS'})
                            </span>
                          )}
                        </div>

                        {/* Status Stepper */}
                        <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                          {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => {
                            const steps = ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered'];
                            const isDone = steps.indexOf(order.status) >= steps.indexOf(step);
                            return (
                              <div key={step} className="space-y-1.5">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold transition-all ${
                                    isDone
                                      ? 'bg-[#604E72] text-white'
                                      : 'bg-[#E8E2EE] text-[#9F8EB9]'
                                  }`}
                                >
                                  {idx + 1}
                                </div>
                                <span
                                  className={`text-[0.68rem] font-semibold block ${
                                    isDone ? 'text-[#362945]' : 'text-[#9F8EB9]'
                                  }`}
                                >
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile & Preferences */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2EE] shadow-2xs max-w-2xl space-y-6">
            <h3 className="font-editorial text-xl font-semibold text-[#362945]">
              Personal Information
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.full_name}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2EE] bg-[#FAF8F5] opacity-80"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#7E6A94] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={user.phone || '+1 (555) 019-2834'}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2EE] bg-[#FAF8F5]"
                />
              </div>
            </div>
            <button className="px-6 py-2.5 rounded-full bg-[#4A3E56] text-white text-xs font-semibold uppercase tracking-wider">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
