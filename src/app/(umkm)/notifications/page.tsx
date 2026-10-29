"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
Activity,
Bell,
BookOpen,
CheckCheck,
FileText,
Info,
Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function NotificationsPage() {
  const { data, updateData } = useDemo();
  const notifications = data.notifications;
  const [filterType, setFilterType] = useState<string>('all');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleMarkAllRead = () => {
    updateData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true }))
    }));
    showToast('Seluruh notifikasi ditandai telah dibaca.');
  };

  const handleMarkRead = (id: string) => {
    updateData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'score': return <Activity className="w-5 h-5 text-sigap-primary" />;
      case 'literacy': return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'financing': return <FileText className="w-5 h-5 text-emerald-600" />;
      default: return <Info className="w-5 h-5 text-purple-600" />;
    }
  };

  const filtered = filterType === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filterType);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Toast */}
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 bg-sigap-darkest text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20"
        >
          <Sparkles className="w-5 h-5 text-sigap-yellow" />
          <span className="text-sm font-semibold">{toast}</span>
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5" /> Pusat Peringatan Sistem
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Pemberitahuan & Update
            </h1>
            <p className="text-white/70 text-xs sm:text-sm max-w-xl leading-relaxed">
              Pantau peringatan mutasi, pembaruan skor kredit, serta rekomendasi produk pembiayaan terbaru.
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {unreadCount > 0 && (
              <Button 
                onClick={handleMarkAllRead} 
                className="w-full sm:w-auto bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold px-5 py-2.5 rounded-2xl text-xs shadow-md shadow-sigap-yellow/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCheck className="w-4 h-4" /> Tandai Semua Dibaca
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all ${
            filterType === 'all' 
              ? 'bg-sigap-darkest text-white shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Semua ({notifications.length})
        </button>
        <button
          onClick={() => setFilterType('score')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all ${
            filterType === 'score' 
              ? 'bg-sigap-darkest text-white shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Skor Kredit
        </button>
        <button
          onClick={() => setFilterType('literacy')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all ${
            filterType === 'literacy' 
              ? 'bg-sigap-darkest text-white shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Akademi Literasi
        </button>
        <button
          onClick={() => setFilterType('financing')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all ${
            filterType === 'financing' 
              ? 'bg-sigap-darkest text-white shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Pembiayaan
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map(n => (
            <motion.div 
              key={n.id} 
              whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
              className={`p-6 flex gap-4 transition-colors cursor-pointer ${
                n.read ? 'bg-white' : 'bg-blue-50/40'
              }`}
              onClick={() => !n.read && handleMarkRead(n.id)}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                n.read ? 'bg-slate-100 text-slate-400' : 'bg-white shadow-sm border border-slate-200'
              }`}>
                {getIcon(n.type)}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start gap-4 mb-1">
                  <h4 className={`text-sm md:text-base ${
                    n.read ? 'font-semibold text-slate-700' : 'font-extrabold text-sigap-darkest'
                  }`}>
                    {n.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    {new Date(n.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} WIB
                  </span>
                </div>
                <p className={`text-xs md:text-sm leading-relaxed ${n.read ? 'text-slate-500' : 'text-slate-700'}`}>
                  {n.message}
                </p>
                {!n.read && (
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-sigap-primary animate-pulse"></span>
                    <span className="text-[11px] font-bold text-sigap-primary">Belum Dibaca</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <Bell className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-medium">Tidak ada notifikasi pada kategori ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
