'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  email: string;
  isPro: boolean;
} | null;

interface AuthContextType {
  user: User;
  isLoading: boolean;
  login: (email: string) => void;
  logout: () => void;
  upgradeToPro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session on mount
    const storedUser = localStorage.getItem('horizons_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    // For demo/verification purposes, grant Pro access by default
    const mockUser = { email, isPro: true };
    setUser(mockUser);
    localStorage.setItem('horizons_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('horizons_user');
  };

  const upgradeToPro = () => {
    if (user) {
      const updatedUser = { ...user, isPro: true };
      setUser(updatedUser);
      localStorage.setItem('horizons_user', JSON.stringify(updatedUser));
    }
  };

  // Prevent hydration mismatch by returning a loading state or just children (but children might depend on user)
  // For simplicity, we just render children, but if you need strict hydration matching, handle it carefully.
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, upgradeToPro }}>
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
