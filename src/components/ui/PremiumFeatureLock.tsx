import React from 'react';
import Link from 'next/link';
import { Button } from './button';
import { Crown, Lock } from 'lucide-react';
import { useSubscription } from '@/lib/context/SubscriptionContext';

interface PremiumFeatureLockProps {
  children: React.ReactNode;
}

export function PremiumFeatureLock({ children }: PremiumFeatureLockProps) {
  const { hasPremiumAccess } = useSubscription();

  if (hasPremiumAccess) {
    return <>{children}</>;
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Blurred Preview of the feature */}
      <div className="filter blur-sm opacity-60 select-none pointer-events-none">
        {children}
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/5 backdrop-blur-[2px]">
        <div className="bg-white/95 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-sm border border-amber-200">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white mb-4 shadow-sm">
            <Crown className="w-3.5 h-3.5" /> FITUR PREMIUM
          </div>
          <h3 className="font-bold text-xl text-sigap-darkest mb-2">Akses Terkunci</h3>
          <p className="text-sm text-muted-foreground mb-6">Upgrade ke SIGAP Premium untuk membuka analisis lengkap dan fitur lanjutan ini.</p>
          <Link href="/premium" className="w-full">
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all">
              Upgrade Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
