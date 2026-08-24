'use client';

import { useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, MonogramCustomization } from '../db/types';

let listeners: Array<() => void> = [];
let cartState: {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: { code: string; discountAmount: number } | null;
  giftPackaging: boolean;
  giftNote: string;
} = {
  items: [],
  isOpen: false,
  appliedCoupon: null,
  giftPackaging: false,
  giftNote: '',
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

const STORAGE_KEY = 'ldc_cart';
const GIFT_STORAGE_KEY = 'ldc_cart_gift';

function loadInitialCart() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        cartState.items = JSON.parse(stored);
      }
      const storedGift = localStorage.getItem(GIFT_STORAGE_KEY);
      if (storedGift) {
        const parsed = JSON.parse(storedGift);
        cartState.giftPackaging = !!parsed.giftPackaging;
        cartState.giftNote = parsed.giftNote || '';
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
      localStorage.setItem(
        GIFT_STORAGE_KEY,
        JSON.stringify({
          giftPackaging: cartState.giftPackaging,
          giftNote: cartState.giftNote,
        })
      );
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

  const addItem = (
    product: Product,
    variant: ProductVariant,
    quantity: number = 1,
    monogram?: MonogramCustomization
  ) => {
    // If item has a custom monogram, it is unique by monogram text + variant
    const existingIndex = cartState.items.findIndex((item) => {
      if (monogram || item.monogram) {
        return (
          item.variant.id === variant.id &&
          item.monogram?.text === monogram?.text &&
          item.monogram?.font === monogram?.font &&
          item.monogram?.threadColor === monogram?.threadColor
        );
      }
      return item.variant.id === variant.id;
    });

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
        monogram,
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
    cartState.giftPackaging = false;
    cartState.giftNote = '';
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

  const setGiftPackaging = (enabled: boolean) => {
    cartState.giftPackaging = enabled;
    saveCart(cartState.items);
    emitChange();
  };

  const setGiftNote = (note: string) => {
    cartState.giftNote = note;
    saveCart(cartState.items);
    emitChange();
  };

  // Subtotal includes variant price + any custom monogramming add-on price
  const subtotal = cartState.items.reduce((acc, item) => {
    const itemUnitPrice = item.variant.price + (item.monogram?.price || 0);
    return acc + itemUnitPrice * item.quantity;
  }, 0);

  const itemCount = cartState.items.reduce((acc, item) => acc + item.quantity, 0);

  const discount = cartState.appliedCoupon?.discountAmount || 0;
  const freeGiftingThreshold = 5000; // Free gift packaging & express shipping over Rs. 5,000

  // Gift packaging fee: Free over Rs. 5,000, otherwise Rs. 350
  const giftPackagingPrice = cartState.giftPackaging
    ? subtotal >= freeGiftingThreshold
      ? 0
      : 350
    : 0;

  const freeShippingThreshold = 4000;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 150;
  const tax = 0;
  const total = Math.max(0, subtotal - discount) + shipping + giftPackagingPrice + tax;

  return {
    items: cartState.items,
    isOpen: cartState.isOpen,
    appliedCoupon: cartState.appliedCoupon,
    giftPackaging: cartState.giftPackaging,
    giftNote: cartState.giftNote,
    giftPackagingPrice,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingThreshold,
    freeGiftingThreshold,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
    applyCoupon,
    removeCoupon,
    setGiftPackaging,
    setGiftNote,
  };
}
