'use client';

import { useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem } from '../db/types';

let listeners: Array<() => void> = [];
let cartState: {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: { code: string; discountAmount: number } | null;
} = {
  items: [],
  isOpen: false,
  appliedCoupon: null,
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

const STORAGE_KEY = 'ldc_cart';

function loadInitialCart() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        cartState.items = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load cart from storage:', e);
    }
  }
}

if (typeof window !== 'undefined') {
  loadInitialCart();
}

function saveCart(items: CartItem[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }
}

export function useCart() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const addItem = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const existingIndex = cartState.items.findIndex(
      (item) => item.variant.id === variant.id
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cartState.items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity,
      };
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        variant,
        quantity,
      };
      updated = [...cartState.items, newItem];
    }

    cartState.items = updated;
    cartState.isOpen = true; // Auto open cart drawer
    saveCart(updated);
    emitChange();
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }

    const updated = cartState.items.map((item) =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    cartState.items = updated;
    saveCart(updated);
    emitChange();
  };

  const removeItem = (cartItemId: string) => {
    const updated = cartState.items.filter((item) => item.id !== cartItemId);
    cartState.items = updated;
    saveCart(updated);
    emitChange();
  };

  const clearCart = () => {
    cartState.items = [];
    cartState.appliedCoupon = null;
    saveCart([]);
    emitChange();
  };

  const openCart = () => {
    cartState.isOpen = true;
    emitChange();
  };

  const closeCart = () => {
    cartState.isOpen = false;
    emitChange();
  };

  const applyCoupon = (code: string, discountAmount: number) => {
    cartState.appliedCoupon = { code, discountAmount };
    emitChange();
  };

  const removeCoupon = () => {
    cartState.appliedCoupon = null;
    emitChange();
  };

  const subtotal = cartState.items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  const itemCount = cartState.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const discount = cartState.appliedCoupon?.discountAmount || 0;
  const freeShippingThreshold = 4000;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 150;
  const tax = 0;
  const total = Math.max(0, subtotal - discount) + shipping + tax;

  return {
    items: cartState.items,
    isOpen: cartState.isOpen,
    appliedCoupon: cartState.appliedCoupon,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingThreshold,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
    applyCoupon,
    removeCoupon,
  };
}
