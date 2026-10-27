"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Wallet, Activity, BookOpen, AlertCircle } from "lucide-react";
import { useDemo } from "@/lib/context/DemoContext";
import { useSubscription } from "@/lib/context/SubscriptionContext";

export default function DashboardPage() {
  const { data } = useDemo();
  const { subscription } = useSubscription();
  const user = data.users[0];
  const business = data.businesses[0];
  const dashboard = data.dashboard;
  const score = data.credit_score;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const cashflow = dashboard.cashflow_30d;
  const maxCashflow = Math.max(...cashflow.map(c => Math.max(c.income, c.expense)));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-sigap-darkest">Selamat Datang, {user.name.split(' ')[0]}</h2>
          <p className="text-muted-foreground">Berikut ringkasan finansial {business.name} hari ini.</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-white border px-3 py-1.5 rounded-full shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-muted-foreground">Status Profil:</span>
          <span className="font-semibold text-sigap-darkest">{business.profile_status} ({user.profile_completion}/8)</span>
        </div>
      </div>

      {/* Premium Status Banner */}
      {subscription.plan === 'free' && subscription.status !== 'cancelled' && (
        <div className="bg-gradient-to-r from-sigap-primary/5 to-indigo-500/5 border border-sigap-primary/20 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-semibold text-lg text-sigap-darkest">Upgrade ke SIGAP Premium</h3>
            <p className="text-sm text-muted-foreground mt-1">Advanced Analytics, Cashflow Forecast, dan Smart Insights.</p>
          </div>
          <Link href="/premium">
            <Button className="bg-sigap-primary text-white hover:bg-sigap-primary/90 whitespace-nowrap">
              Lihat Benefit Premium
            </Button>
          </Link>
        </div>
      )}

      {subscription.plan === 'free' && subscription.status === 'cancelled' && (
        <div className="bg-muted border border-border rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-semibold text-lg text-sigap-darkest">Anda saat ini menggunakan Free Plan.</h3>
            <p className="text-sm text-muted-foreground mt-1">Langganan premium Anda telah dibatalkan. Upgrade kembali untuk akses fitur lanjutan.</p>
          </div>
          <Link href="/premium">
            <Button className="bg-sigap-primary text-white hover:bg-sigap-primary/90 whitespace-nowrap">
              Upgrade ke Premium
            </Button>
          </Link>
        </div>
      )}

      {subscription.plan === 'premium' && subscription.status === 'active' && (
        <div className="bg-gradient-to-r from-sigap-primary/10 to-indigo-500/10 border border-sigap-primary/30 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sigap-primary text-white rounded-full flex items-center justify-center shadow-md">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg text-sigap-darkest">SIGAP Premium Aktif</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sigap-primary text-white">PREMIUM</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Analisis lanjutan dan fitur Premium tersedia untuk usaha Anda.</p>
            </div>
          </div>
          <Link href="/premium">
            <Button variant="outline" className="border-sigap-primary text-sigap-primary hover:bg-sigap-primary hover:text-white whitespace-nowrap">
              Kelola Premium
            </Button>
          </Link>
        </div>
      )}

      {subscription.plan === 'premium' && subscription.status === 'paused' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-semibold text-lg text-orange-800">Premium Dijeda</h3>
            <p className="text-sm text-orange-600/80 mt-1">Fitur Premium terkunci sementara. Core feature tetap bekerja.</p>
          </div>
          <Link href="/premium">
            <Button className="bg-orange-500 text-white hover:bg-orange-600 whitespace-nowrap">
              Lanjutkan Premium
            </Button>
          </Link>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Saldo (Est)" amount={formatCurrency(dashboard.metrics.total_balance)} trend="-" isPositive={true} />
        <KPICard title="Pemasukan Bulan Ini" amount={formatCurrency(dashboard.metrics.income_this_month)} trend={`${dashboard.metrics.income_change_pct > 0 ? '+' : ''}${dashboard.metrics.income_change_pct}%`} isPositive={dashboard.metrics.income_change_pct >= 0} />
        <KPICard title="Pengeluaran Bulan Ini" amount={formatCurrency(dashboard.metrics.expense_this_month)} trend={`${dashboard.metrics.expense_change_pct > 0 ? '+' : ''}${dashboard.metrics.expense_change_pct}%`} isPositive={dashboard.metrics.expense_change_pct <= 0} subtitle={dashboard.metrics.expense_change_pct <= 0 ? "Lebih hemat dari bulan lalu" : "Pengeluaran meningkat"} />
        <KPICard title="Laba Bersih" amount={formatCurrency(dashboard.metrics.net_profit)} trend={`${dashboard.metrics.profit_change_pct > 0 ? '+' : ''}${dashboard.metrics.profit_change_pct}%`} isPositive={dashboard.metrics.profit_change_pct >= 0} highlight={true} />
      </div>

      {/* Secondary Section - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-lg text-sigap-darkest">Arus Kas</h3>
              <p className="text-sm text-muted-foreground">30 Hari Terakhir</p>
            </div>
            <select className="text-sm border-none bg-muted/50 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-sigap-primary">
              <option>Bulan Ini</option>
              <option>3 Bulan Terakhir</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-2 justify-between mt-8">
            {cashflow.map((val, i) => (
              <div key={i} className="w-full flex gap-1 flex-col justify-end h-full">
                <div 
                  className="bg-sigap-primary/20 w-full rounded-t-sm" 
                  style={{ height: `${(val.expense / maxCashflow) * 100}%` }} 
                  title={`Pengeluaran: ${formatCurrency(val.expense)}`}
                ></div>
                <div 
                  className="bg-sigap-primary w-full rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer" 
                  style={{ height: `${(val.income / maxCashflow) * 100}%` }} 
                  title={`Pemasukan: ${formatCurrency(val.income)}`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6 border-t pt-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-sm bg-sigap-primary"></div>
              <span className="text-muted-foreground">Pemasukan</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-sm bg-sigap-primary/20"></div>
              <span className="text-muted-foreground">Pengeluaran</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Actions & Score */}
        <div className="space-y-6">
          {/* Credit Score Gauge */}
          <div className="bg-sigap-darkest text-white rounded-xl shadow-md p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-24 h-24" />
            </div>
            <h3 className="font-medium text-sigap-light mb-1">Skor Simulasi SIGAP</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold">{score.score}</span>
              <span className="text-sigap-soft text-sm mb-1">/ {score.max_score}</span>
            </div>
            <div className="inline-flex items-center rounded-full bg-green-500/20 text-green-300 px-2.5 py-0.5 text-xs font-semibold mb-4">
              {score.label}
            </div>
            <div className="inline-flex items-center rounded-full border border-sigap-soft/30 bg-sigap-soft/10 px-2 py-0.5 text-[10px] font-medium text-sigap-light mb-4 ml-2">
              Indikator Simulasi
            </div>
            <Link href="/credit-score" className="block">
              <Button variant="secondary" className="w-full bg-sigap-primary text-white border-none hover:bg-sigap-primary/80">
                Lihat Detail Skor
              </Button>
            </Link>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-lg text-sigap-darkest mb-4">Rekomendasi Aksi</h3>
            <div className="space-y-4">
              <Link href="/bookkeeping" className="block">
                <ActionItem 
                  icon={<AlertCircle className="text-amber-500 w-4 h-4" />}
                  title="Review Pengeluaran"
                  desc="Cek pencatatan pembukuan bulan ini."
                />
              </Link>
              <Link href="/learning" className="block">
                <ActionItem 
                  icon={<BookOpen className="text-sigap-primary w-4 h-4" />}
                  title="Modul Literasi"
                  desc="Lanjutkan modul pemisahan rekening."
                />
              </Link>
              <Link href="/financing" className="block">
                <ActionItem 
                  icon={<Wallet className="text-green-500 w-4 h-4" />}
                  title="Peluang Pembiayaan"
                  desc="Lihat 3 produk sesuai profil Anda."
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, amount, trend, isPositive, highlight = false, subtitle = "" }: { title: string, amount: string, trend: string, isPositive: boolean, highlight?: boolean, subtitle?: string }) {
  return (
    <div className={`p-6 rounded-xl border shadow-sm ${highlight ? 'bg-sigap-primary/5 border-sigap-primary/20' : 'bg-white'}`}>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <div className="text-2xl font-bold text-sigap-darkest mb-2">{amount}</div>
      <div className="flex items-center gap-2">
        <div className={`flex items-center text-xs font-medium px-1.5 py-0.5 rounded-sm ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {trend}
        </div>
        {subtitle && <span className="text-xs text-muted-foreground truncate">{subtitle}</span>}
      </div>
    </div>
  );
}

function ActionItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-3 items-start group cursor-pointer">
      <div className="mt-0.5 bg-muted p-1.5 rounded-md group-hover:bg-sigap-primary/10 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-sigap-darkest group-hover:text-sigap-primary transition-colors">{title}</h4>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
