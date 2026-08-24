'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Truck, CheckCircle2, Clock, Search, ExternalLink, Filter } from 'lucide-react';
import { db } from '../../../../lib/db/store';
import { Order, OrderStatus } from '../../../../lib/db/types';
import { formatCurrency, formatDate } from '../../../../lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadOrders() {
      const all = await db.getOrders(undefined, true);
      setOrders(all);
    }
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const updated = await db.updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders(orders.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }
    }
  };

  const handleTrackingUpdate = async (orderId: string, tracking: string, carrier: string) => {
    const updated = await db.updateOrderStatus(orderId, 'Shipped', tracking, carrier);
    if (updated) {
      setOrders(orders.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.shipping_address.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (o.guest_email && o.guest_email.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const allStatuses: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-3xl font-semibold text-[#2A2433]">
            Orders & Fulfillment
          </h1>
          <p className="text-xs text-[#7E6A94] mt-0.5">
            Manage customer orders, dispatch status, tracking codes, and receipts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2EE] shadow-2xs flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 flex items-center gap-2 w-full">
          <Search className="w-4 h-4 text-[#7E6A94]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, recipient name, or email..."
            className="w-full bg-transparent text-xs text-[#2A2433] placeholder-[#9F8EB9] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-[#7E6A94]">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E8E2EE] rounded-xl px-3 py-1.5 text-xs text-[#362945] font-medium focus:outline-none"
          >
            <option value="all">All Statuses ({orders.length})</option>
            {allStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E8E2EE] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#7E6A94] uppercase tracking-wider font-bold text-[0.68rem] border-b border-[#E8E2EE]">
              <tr>
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Customer / Recipient</th>
                <th className="py-3.5 px-6">Items</th>
                <th className="py-3.5 px-6">Total</th>
                <th className="py-3.5 px-6">Payment</th>
                <th className="py-3.5 px-6">Fulfillment Status</th>
                <th className="py-3.5 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEF8] text-[#2A2433]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF4FC]/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#4A3E56]">
                    {order.order_number}
                  </td>
                  <td className="py-4 px-6 text-[#7E6A94]">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold">{order.shipping_address.fullName}</p>
                    <p className="text-[0.68rem] text-[#7E6A94]">
                      {order.shipping_address.city}, {order.shipping_address.provinceState}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-[#7E6A94]">
                    {order.items.length} items
                  </td>
                  <td className="py-4 px-6 font-bold text-[#4A3E56]">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EFEAF6] text-[#604E72] text-[0.65rem] font-bold">
                      {order.payment_status} ({order.payment_method.toUpperCase()})
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {/* Status Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-[#FAF8F5] border border-[#E8E2EE] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#362945] focus:outline-none focus:border-[#7E6A94]"
                    >
                      {allStatuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                      className="px-3 py-1 rounded-lg border border-[#E8E2EE] bg-white hover:bg-[#FAF4FC] text-xs font-semibold text-[#4A3E56] transition-colors"
                    >
                      {selectedOrder?.id === order.id ? 'Close' : 'View Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Order Modal/Detail Drawer */}
      {selectedOrder && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#BEB2D4] shadow-dream-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2EE]">
            <div>
              <span className="font-mono text-sm font-bold text-[#604E72]">
                {selectedOrder.order_number}
              </span>
              <h3 className="font-editorial text-xl font-semibold text-[#362945]">
                Order Details & Fulfillment
              </h3>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-xs text-[#7E6A94] hover:text-[#2A2433]"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Recipient & Address */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2EE] space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[#7E6A94] text-[0.68rem]">
                Shipping Address
              </h4>
              <p className="font-semibold text-[#2A2433]">{selectedOrder.shipping_address.fullName}</p>
              <p>{selectedOrder.shipping_address.addressLine1}</p>
              {selectedOrder.shipping_address.addressLine2 && <p>{selectedOrder.shipping_address.addressLine2}</p>}
              <p>
                {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.provinceState}{' '}
                {selectedOrder.shipping_address.postalCode}
              </p>
              <p className="pt-1 text-[#7E6A94]">
                Email: {selectedOrder.guest_email || selectedOrder.shipping_address.email} | Phone:{' '}
                {selectedOrder.guest_phone || selectedOrder.shipping_address.phone}
              </p>
              {selectedOrder.shipping_address.deliveryNotes && (
                <p className="pt-1 text-[#B89324] italic">
                  Note: &ldquo;{selectedOrder.shipping_address.deliveryNotes}&rdquo;
                </p>
              )}
            </div>

            {/* Tracking Code Form */}
            <div className="p-4 rounded-2xl bg-[#FAF4FC] border border-[#E8E2EE] space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-[#604E72] text-[0.68rem]">
                Dispatch Tracking Code
              </h4>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="e.g. 94001118992233"
                  defaultValue={selectedOrder.tracking_number || ''}
                  id="trackingInput"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E8E2EE] bg-white"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Carrier (e.g. USPS, FedEx, DHL)"
                    defaultValue={selectedOrder.carrier || 'USPS Priority'}
                    id="carrierInput"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#E8E2EE] bg-white"
                  />
                  <button
                    onClick={() => {
                      const t = (document.getElementById('trackingInput') as HTMLInputElement)?.value;
                      const c = (document.getElementById('carrierInput') as HTMLInputElement)?.value;
                      handleTrackingUpdate(selectedOrder.id, t, c);
                    }}
                    className="px-4 py-1.5 bg-[#4A3E56] text-white text-xs font-semibold rounded-lg"
                  >
                    Save & Mark Shipped
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[#7E6A94] text-[0.68rem]">
              Purchased Items Snapshot
            </h4>
            <div className="border border-[#E8E2EE] rounded-2xl divide-y divide-[#F3EEF8] overflow-hidden text-xs">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg bg-[#F5F0E8] overflow-hidden border border-[#E8E2EE]">
                      <Image src={item.image_url || '/images/pajama-set-1.jpg'} alt={item.product_name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2A2433]">{item.product_name}</p>
                      <p className="text-[0.68rem] text-[#7E6A94]">{item.variant_details} (Qty: {item.quantity})</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#4A3E56]">{formatCurrency(item.total)}</span>
                </div>
              ))}
              <div className="p-3.5 bg-[#FAF8F5] flex justify-between font-bold text-xs">
                <span>Grand Total</span>
                <span className="text-[#604E72]">{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
