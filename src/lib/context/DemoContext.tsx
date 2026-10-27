"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialDemoData } from '../demo-data';

type DemoData = typeof initialDemoData;

interface DemoContextType {
  data: DemoData;
  setData: React.Dispatch<React.SetStateAction<DemoData>>;
  resetData: () => void;
  updateData: (updater: (prev: DemoData) => DemoData) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const STORAGE_KEY = 'sigap_demo_data';

export const DemoProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DemoData>(initialDemoData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse demo data from local storage', e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Save to local storage whenever data changes
    if (isMounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isMounted]);

  const resetData = () => {
    setData(initialDemoData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateData = (updater: (prev: DemoData) => DemoData) => {
    setData(prev => updater(prev));
  };

  // Only render children when mounted to prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <DemoContext.Provider value={{ data, setData, resetData, updateData }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
