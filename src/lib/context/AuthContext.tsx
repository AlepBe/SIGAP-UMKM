"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'umkm' | 'lender' | null;

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  authenticated: boolean;
}

interface AuthContextType {
  session: UserSession | null;
  login: (sessionData: UserSession) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'sigap_auth_session';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse auth session from local storage', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (sessionData: UserSession) => {
    setSession(sessionData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
