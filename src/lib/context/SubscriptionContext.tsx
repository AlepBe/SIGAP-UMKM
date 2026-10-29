"use client";

import React,{ createContext,useContext,useEffect,useState } from "react";

export type Plan = "free" | "premium";
export type Status = "active" | "paused" | "cancelled";

export interface SubscriptionState {
  plan: Plan;
  status: Status;
  billing_cycle: "monthly" | "yearly" | null;
  started_at: string | null;
  expires_at: string | null;
  price: number;
}

const DEFAULT_FREE_STATE: SubscriptionState = {
  plan: "free",
  status: "active",
  billing_cycle: null,
  started_at: null,
  expires_at: null,
  price: 0,
};

const DEFAULT_PREMIUM_STATE: SubscriptionState = {
  plan: "premium",
  status: "active",
  billing_cycle: "monthly",
  started_at: "2026-09-29",
  expires_at: "2026-10-29",
  price: 99000,
};

interface SubscriptionContextType {
  subscription: SubscriptionState;
  hasPremiumAccess: boolean;
  upgradeToPremium: () => void;
  pausePremium: () => void;
  resumePremium: () => void;
  cancelPremium: () => void;
  loadFreeDemo: () => void;
  loadPremiumDemo: () => void;
  resetSubscription: () => void;
  addNotification: (message: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionState>(DEFAULT_FREE_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use demo context to add notification (we mock a simple toast here or tie to demo context notifications if needed, 
  // but to avoid circular deps or complex hooks, we'll just handle state and maybe window alert or a custom toast system).
  // Actually, we can just use the DemoContext if it's available, but let's just keep it simple.

  useEffect(() => {
    const saved = localStorage.getItem("sigap_subscription");
    if (saved) {
      try {
        setSubscription(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse subscription", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("sigap_subscription", JSON.stringify(subscription));
    }
  }, [subscription, isLoaded]);

  const hasPremiumAccess = subscription.plan === "premium" && subscription.status === "active";

  // Dummy notification function, could integrate with toast
  const addNotification = (message: string) => {
    // In a real app we'd dispatch a toast. For demo, we just log or use a simple DOM approach.
    // Or we can rely on components using `addNotification` to show a toast.
    console.log("Notification:", message);
    // Let's create a quick global toast
    const el = document.createElement("div");
    el.className = "fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-[9999] animate-in fade-in slide-in-from-bottom-5";
    el.innerText = message;
    document.body.appendChild(el);
    setTimeout(() => {
      el.classList.add("animate-out", "fade-out", "slide-out-to-bottom-5");
      setTimeout(() => el.remove(), 300);
    }, 3000);
  };

  const upgradeToPremium = () => {
    setSubscription(DEFAULT_PREMIUM_STATE);
    addNotification("SIGAP Premium berhasil diaktifkan.");
  };

  const pausePremium = () => {
    setSubscription(prev => ({ ...prev, status: "paused" }));
    addNotification("SIGAP Premium berhasil dijeda.");
  };

  const resumePremium = () => {
    setSubscription(prev => ({ ...prev, status: "active" }));
    addNotification("SIGAP Premium telah dilanjutkan.");
  };

  const cancelPremium = () => {
    setSubscription({ ...DEFAULT_FREE_STATE, status: "cancelled" });
    addNotification("Langganan Premium demo telah dibatalkan.");
  };

  const loadFreeDemo = () => {
    setSubscription(DEFAULT_FREE_STATE);
    addNotification("Demo status dikembalikan ke Free.");
  };

  const loadPremiumDemo = () => {
    setSubscription(DEFAULT_PREMIUM_STATE);
    addNotification("Demo status diubah ke Premium.");
  };

  const resetSubscription = () => {
    setSubscription(DEFAULT_FREE_STATE);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        hasPremiumAccess,
        upgradeToPremium,
        pausePremium,
        resumePremium,
        cancelPremium,
        loadFreeDemo,
        loadPremiumDemo,
        resetSubscription,
        addNotification
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
