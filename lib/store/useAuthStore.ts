'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '../db/types';
import { DEMO_USER_PROFILE } from '../db/seed-data';

let listeners: Array<() => void> = [];
let currentUser: UserProfile | null = { ...DEMO_USER_PROFILE }; // Logged in as demo admin/parent by default

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function useAuth() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const login = (email: string) => {
    currentUser = {
      id: `profile-${Date.now()}`,
      user_id: `user-${Date.now()}`,
      full_name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'customer',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    emitChange();
  };

  const logout = () => {
    currentUser = null;
    emitChange();
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (currentUser) {
      currentUser = { ...currentUser, ...data, updated_at: new Date().toISOString() };
      emitChange();
    }
  };

  return {
    user: currentUser,
    isAuthenticated: Boolean(currentUser),
    isAdmin: currentUser?.role === 'admin',
    login,
    logout,
    updateProfile,
  };
}
