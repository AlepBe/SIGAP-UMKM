"use client";

import React, { useState, useEffect } from 'react';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { PublicFooter } from '@/components/landing/PublicFooter';
import { Button } from '@/components/ui/button';
import { Crown, CheckCircle2, TrendingUp, LineChart, ShieldAlert, Activity, FileText, BellRing, History, Loader2, ArrowRight, PauseCircle, XCircle } from 'lucide-react';
import { subscriptionDemoData } from '@/lib/subscription-demo-data';
import { useSubscription } from '@/lib/context/SubscriptionContext';
import { useRouter } from 'next/navigation';

export default function PremiumPage() {
  const router = useRouter();
  const { 
    subscription, 
    upgradeToPremium, 
    pausePremium, 
    resumePremium, 
    cancelPremium,
    loadFreeDemo,
    loadPremiumDemo,
    resetSubscription
  } = useSubscription();
  
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success">("idle");
  const [mounted, setMounted] = useState(false);

  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpgrade = () => {
    setPaymentState("processing");
    setTimeout(() => {
      setPaymentState("success");
      upgradeToPremium();
      setTimeout(() => {
        setShowUpgradeModal(false);
        setPaymentState("idle");
        router.push('/dashboard');
      }, 2000);
    }, 1500);
  };

  const handlePause = () => {
    pausePremium();
    setShowPauseModal(false);
  };

  const handleCancel = () => {
    cancelPremium();
    setShowCancelModal(false);
  };

  const handleResume = () => {
    resumePremium();
    setShowResumeModal(false);
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      
      <main className="flex-1">
        <section className="pt-24 pb-16 bg-sigap-darkest text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Crown className="w-96 h-96 text-amber-500" />
          </div>
          <div className="container relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 text-amber-400 px-4 py-1.5 text-sm font-bold mb-6 border border-amber-500/30">
              <Crown className="w-4 h-4" /> SIGAP PREMIUM
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Naikkan Level Pengelolaan Usaha Anda</h1>
            <p className="text-xl text-sigap-light/80 font-light leading-relaxed mb-8">
              SIGAP Premium membantu Anda melihat kondisi usaha lebih dalam melalui analisis, proyeksi, dan insight lanjutan.
            </p>
            {subscription.plan === "premium" ? (
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-6 py-3 rounded-xl border border-green-500/30 font-bold text-lg">
                <CheckCircle2 className="w-6 h-6" /> SIGAP Premium Aktif (Demo)
              </div>
            ) : (
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-14 px-10 text-lg shadow-xl shadow-amber-500/20" onClick={() => setShowUpgradeModal(true)}>
                Upgrade Sekarang
              </Button>
            )}
          </div>
        </section>

        {/* Demo Controls Area */}
        <section className="py-4 bg-muted border-b border-border text-center">
          <div className="container flex justify-center gap-4 text-xs font-mono items-center">
            <span className="text-muted-foreground font-bold mr-2">DEMO CONTROLS:</span>
            <Button variant="outline" size="sm" onClick={loadFreeDemo}>Load Free Demo</Button>
            <Button variant="outline" size="sm" onClick={loadPremiumDemo}>Load Premium Demo</Button>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 border-red-200" onClick={resetSubscription}>Reset Demo</Button>
          </div>
        </section>

        {/* Subscription Management Section */}
        {subscription.plan === 'premium' && (
          <section className="py-16 bg-white border-b">
            <div className="container max-w-4xl mx-auto">
              <div className="bg-slate-50 border rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-sigap-darkest mb-6 border-b pb-4">Kelola Premium</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-muted-foreground block">Current Plan:</span>
                      <span className="font-semibold text-lg text-sigap-darkest">SIGAP Premium</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Status:</span>
                      {subscription.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                          <PauseCircle className="w-3.5 h-3.5" /> Dijeda
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Billing Cycle:</span>
                      <span className="font-medium text-sigap-darkest capitalize">{subscription.billing_cycle || 'Bulanan'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-muted-foreground block">Started:</span>
                      <span className="font-medium text-sigap-darkest">{subscription.started_at || '-'}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Next Renewal:</span>
                      <span className="font-medium text-sigap-darkest">{subscription.expires_at || '-'}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block">Price (Harga simulasi / DEMO):</span>
                      <span className="font-medium text-sigap-darkest">{formatIDR(subscription.price)} / bulan</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t">
                  {subscription.status === 'active' ? (
                    <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700" onClick={() => setShowPauseModal(true)}>
                      <PauseCircle className="w-4 h-4 mr-2" /> Pause Premium
                    </Button>
                  ) : (
                    <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowResumeModal(true)}>
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Lanjutkan Premium
                    </Button>
                  )}
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setShowCancelModal(true)}>
                    <XCircle className="w-4 h-4 mr-2" /> Batalkan Premium
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-24 bg-slate-50 border-b">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-sigap-darkest">Keunggulan SIGAP Premium</h2>
              <p className="text-muted-foreground mt-4">Fitur eksklusif untuk mempercepat pertumbuhan usaha Anda.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <TrendingUp />, title: "Advanced Financial Analytics", desc: "Analisis tren omzet, profit margin, dan expense breakdown." },
                { icon: <LineChart />, title: "Cashflow Forecast", desc: "Proyeksi 3, 6, hingga 12 bulan ke depan." },
                { icon: <ShieldAlert />, title: "Business Resilience Simulator", desc: "Simulasi skenario normal, krisis, dan custom." },
                { icon: <Activity />, title: "Smart Financial Insights", desc: "Insight otomatis dari pola pengeluaran dan pemasukan." },
                { icon: <Crown />, title: "Advanced Financing Matching", desc: "Perbandingan dan kecocokan profil pembiayaan yang lebih detail." },
                { icon: <FileText />, title: "Advanced Reports", desc: "Laporan kesehatan finansial dan kesiapan pembiayaan." },
                { icon: <History />, title: "Extended History", desc: "Akses riwayat transaksi dan data hingga lebih dari 12 bulan." },
                { icon: <BellRing />, title: "Smart Alerts", desc: "Peringatan lonjakan biaya dan status arus kas." },
              ].map((b, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                    {React.cloneElement(b.icon as React.ReactElement, { className: "w-6 h-6" })}
                  </div>
                  <h3 className="font-bold text-sigap-darkest mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section (only show to Free or Cancelled users) */}
        {subscription.plan === 'free' && (
          <section className="py-24 bg-white">
            <div className="container max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-sigap-darkest mb-4">Pilih Paket Simulasi</h2>
              <div className="inline-flex items-center justify-center p-1 bg-slate-200 rounded-lg mb-12">
                <button 
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white text-sigap-darkest shadow-sm' : 'text-muted-foreground hover:text-sigap-darkest'}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Bulanan
                </button>
                <button 
                  className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-white text-sigap-darkest shadow-sm' : 'text-muted-foreground hover:text-sigap-darkest'}`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Tahunan <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-1">HEMAT 24%</span>
                </button>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border shadow-xl relative overflow-hidden max-w-md mx-auto">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                <div className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded inline-block mb-4 uppercase tracking-wider">
                  Harga Simulasi — Bukan Harga Komersial Final
                </div>
                <h3 className="text-2xl font-bold text-sigap-darkest mb-2">SIGAP Premium</h3>
                <div className="flex items-end justify-center gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-sigap-darkest">
                    {billingCycle === 'yearly' ? formatIDR(subscriptionDemoData.plans.premium.yearlyPrice) : formatIDR(subscriptionDemoData.plans.premium.monthlyPrice)}
                  </span>
                  <span className="text-muted-foreground mb-1 font-medium">/ {billingCycle === 'yearly' ? 'tahun' : 'bulan'}</span>
                </div>
                <ul className="text-left space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-sigap-darkest font-medium"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Buka semua fitur Advanced</li>
                  <li className="flex items-center gap-3 text-sm text-sigap-darkest font-medium"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Simulasi Ketahanan Usaha</li>
                  <li className="flex items-center gap-3 text-sm text-sigap-darkest font-medium"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" /> Smart Insights & Alerts</li>
                </ul>
                <Button className="w-full h-12 text-md font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg" onClick={() => setShowUpgradeModal(true)}>
                  Upgrade Sekarang
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <PublicFooter />

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-center relative">
            {paymentState === "idle" && (
              <div className="p-6">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-2xl text-sigap-darkest mb-2">Upgrade ke SIGAP Premium</h3>
                <p className="text-sm text-muted-foreground mb-6">Nikmati akses penuh ke seluruh analisis keuangan, simulasi cashflow, dan insight cerdas untuk mengembangkan usaha Anda.</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500 line-through">FREE Plan</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-600 font-bold">PREMIUM Plan</span>
                </div>
                <p className="text-xs text-amber-600 font-medium bg-amber-50 p-2 rounded mb-6 border border-amber-100">Simulasi Pembayaran (Demo) — Saldo Anda tidak akan terpotong.</p>
                <div className="flex flex-col gap-3">
                  <Button className="w-full h-12 text-md font-bold bg-amber-500 hover:bg-amber-600 text-white" onClick={handleUpgrade}>
                    Mulai Upgrade (Demo)
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setShowUpgradeModal(false)}>
                    Nanti
                  </Button>
                </div>
              </div>
            )}
            
            {paymentState === "processing" && (
              <div className="p-12 flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                <h3 className="font-bold text-xl text-sigap-darkest mb-2">Memproses pembayaran demo...</h3>
                <p className="text-sm text-muted-foreground">Menghubungkan ke sistem pembayaran demo.</p>
              </div>
            )}

            {paymentState === "success" && (
              <div className="p-12 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl text-sigap-darkest mb-2">Pembayaran Berhasil!</h3>
                <p className="text-sm text-muted-foreground">SIGAP Premium telah aktif. Anda kini memiliki akses ke fitur lanjutan.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pause Confirmation Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <h3 className="font-bold text-xl text-sigap-darkest mb-2">Jeda langganan Premium?</h3>
            <p className="text-sm text-muted-foreground mb-6">Fitur Premium akan dihentikan sementara sesuai simulasi. Data dan pengaturan Anda tetap tersimpan.</p>
            <div className="flex flex-col gap-3">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={handlePause}>Jeda Premium</Button>
              <Button variant="ghost" className="w-full" onClick={() => setShowPauseModal(false)}>Batal</Button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Confirmation Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <h3 className="font-bold text-xl text-sigap-darkest mb-2">Apakah Anda ingin melanjutkan Premium?</h3>
            <p className="text-sm text-muted-foreground mb-6">Akses ke fitur lanjutan akan kembali terbuka.</p>
            <div className="flex flex-col gap-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleResume}>Lanjutkan Premium</Button>
              <Button variant="ghost" className="w-full" onClick={() => setShowResumeModal(false)}>Batal</Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <h3 className="font-bold text-xl text-sigap-darkest mb-2">Batalkan Premium?</h3>
            <p className="text-sm text-muted-foreground mb-6">Langganan demo Premium akan dihentikan. Anda tetap dapat menggunakan fitur Free.</p>
            <div className="flex flex-col gap-3">
              <Button variant="destructive" className="w-full" onClick={handleCancel}>Batalkan Premium</Button>
              <Button variant="outline" className="w-full" onClick={() => setShowCancelModal(false)}>Kembali</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
