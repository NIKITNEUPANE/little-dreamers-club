'use client';

import { useState, useEffect } from 'react';

let listeners: Array<() => void> = [];
let isMenuOpen = false;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function openMobileMenu() {
  isMenuOpen = true;
  emitChange();
}

export function closeMobileMenu() {
  isMenuOpen = false;
  emitChange();
}

export function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  emitChange();
}

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(isMenuOpen);

  useEffect(() => {
    function handleChange() {
      setIsOpen(isMenuOpen);
    }
    listeners.push(handleChange);
    return () => {
      listeners = listeners.filter((l) => l !== handleChange);
    };
  }, []);

  return {
    isOpen,
    openMenu: openMobileMenu,
    closeMenu: closeMobileMenu,
    toggleMenu: toggleMobileMenu,
  };
}
