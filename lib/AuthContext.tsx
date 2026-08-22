'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type User = {
  email: string;
  isPro: boolean;
  name?: string;
  company?: string;
} | null;

interface AuthContextType {
  user: User;
  isLoading: boolean;
  login: (email: string, opts?: { isPro?: boolean; name?: string; company?: string }) => void;
  logout: () => void;
  upgradeToPro: () => void;
  updateProfile: (patch: Partial<NonNullable<User>>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'horizons_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session on mount
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user session');
      }
    }
    setIsLoading(false);
  }, []);

  const persist = (next: NonNullable<User>) => {
    setUser(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const login = (email: string, opts?: { isPro?: boolean; name?: string; company?: string }) => {
    // For demo purposes, grant free access by default. Derive a friendly
    // default display name from the email local-part so the UI isn't empty.
    // `opts` lets the demo shortcut sign in directly as a Pro user.
    const derivedName = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    persist({
      email,
      isPro: opts?.isPro ?? false,
      name: opts?.name ?? derivedName,
      ...(opts?.company ? { company: opts.company } : {}),
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const upgradeToPro = () => {
    if (user) persist({ ...user, isPro: true });
  };

  const updateProfile = (patch: Partial<NonNullable<User>>) => {
    if (user) persist({ ...user, ...patch });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, upgradeToPro, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
