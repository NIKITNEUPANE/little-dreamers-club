'use client';

import { useState, useEffect } from 'react';

let listeners: Array<() => void> = [];
let wishlistProductIds: string[] = ['prod-blanket', 'prod-plush'];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

const STORAGE_KEY = 'ldc_wishlist';

function loadInitialWishlist() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        wishlistProductIds = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load wishlist from storage:', e);
    }
  }
}

if (typeof window !== 'undefined') {
  loadInitialWishlist();
}

function saveWishlist(ids: string[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save wishlist to storage:', e);
    }
  }
}

export function useWishlist() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const toggleWishlist = (productId: string) => {
    let updated: string[];
    if (wishlistProductIds.includes(productId)) {
      updated = wishlistProductIds.filter((id) => id !== productId);
    } else {
      updated = [...wishlistProductIds, productId];
    }
    wishlistProductIds = updated;
    saveWishlist(updated);
    emitChange();
  };

  const isInWishlist = (productId: string) => {
    return wishlistProductIds.includes(productId);
  };

  return {
    wishlistIds: wishlistProductIds,
    count: wishlistProductIds.length,
    toggleWishlist,
    isInWishlist,
  };
}
