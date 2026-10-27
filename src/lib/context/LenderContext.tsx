"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import lenderDataRaw from '@/data/sigap_lender_dummy_data.json';

type LenderData = typeof lenderDataRaw;

interface LenderContextType {
  data: LenderData;
  setData: React.Dispatch<React.SetStateAction<LenderData>>;
  resetData: () => void;
  updateData: (updater: (prev: LenderData) => LenderData) => void;
}

const LenderContext = createContext<LenderContextType | undefined>(undefined);

const STORAGE_KEY = 'sigap_lender_demo_state';

export const LenderProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<LenderData>(lenderDataRaw as LenderData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse lender demo data from local storage', e);
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
    setData(lenderDataRaw as LenderData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateData = (updater: (prev: LenderData) => LenderData) => {
    setData(prev => updater(prev));
  };

  // Only render children when mounted to prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <LenderContext.Provider value={{ data, setData, resetData, updateData }}>
      {children}
    </LenderContext.Provider>
  );
};

export const useLenderDemo = () => {
  const context = useContext(LenderContext);
  if (context === undefined) {
    throw new Error('useLenderDemo must be used within a LenderProvider');
  }
  return context;
};
