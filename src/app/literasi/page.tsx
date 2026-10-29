"use client";

import { PublicFooter } from '@/components/landing/PublicFooter';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { Button } from '@/components/ui/button';
import { BookOpen,CheckCircle2,Clock,Lock,PlayCircle,Target,Trophy,X } from 'lucide-react';
import { useState } from 'react';

const initialModules = [
  { id: 1, title: "Pemisahan Rekening Pribadi & Usaha", category: "Dasar Keuangan", duration: "5 menit", status: "completed", desc: "Pelajari pentingnya memisahkan uang pribadi dan usaha untuk memudahkan pembukuan." },
  { id: 2, title: "Mengenali Pinjaman Legal dan Ilegal", category: "Keamanan", duration: "6 menit", status: "completed", desc: "Cara mudah membedakan institusi keuangan terdaftar OJK dan pinjol ilegal." },
  { id: 3, title: "Memahami Bunga & Tenor", category: "Pembiayaan", duration: "8 menit", status: "in_progress", desc: "Penjelasan tentang cara kerja bunga efektif vs flat dan dampaknya ke cicilan bulanan." },
  { id: 4, title: "Strategi Harga & Margin", category: "Operasional", duration: "10 menit", status: "available", desc: "Cara menentukan harga jual yang sehat tanpa mengorbankan margin profit." },
  { id: 5, title: "Pajak Dasar UMKM", category: "Kepatuhan", duration: "12 menit", status: "locked", desc: "Panduan dasar perhitungan pajak penghasilan untuk skala UMKM." },
  { id: 6, title: "Membaca Laporan Keuangan", category: "Analisis", duration: "8 menit", status: "locked", desc: "Cara membaca Laba Rugi dan Neraca sederhana." },
];

export default function LiterasiPage() {
  const [modules, setModules] = useState(initialModules);
  const [selectedModule, setSelectedModule] = useState<typeof initialModules[0] | null>(null);

  const completedCount = modules.filter(m => m.status === 'completed').length;
  const totalCount = modules.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const handleComplete = (id: number) => {
    setModules(modules.map(m => m.id === id ? { ...m, status: 'completed' } : m));
    setSelectedModule(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      
      <main className="flex-1">
        <section className="pt-20 pb-12 bg-emerald-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <BookOpen className="w-64 h-64" />
          </div>
          <div className="container relative z-10 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center rounded-full bg-white/20 text-white px-3 py-1 text-xs font-bold mb-4 border border-white/30 backdrop-blur-sm">
                  DATA DEMO
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Literasi Finansial UMKM</h1>
                <p className="text-lg md:text-xl text-emerald-100 font-light leading-relaxed max-w-lg mx-auto md:mx-0">
                  Pelajari dasar pengelolaan keuangan melalui modul singkat dan praktis.
                </p>
              </div>
              
              <div className="w-full md:w-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex gap-6 items-center">
                <div className="w-24 h-24 relative flex items-center justify-center">
                  <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * (progressPct / 100))} strokeLinecap="round" />
                  </svg>
                  <span className="text-2xl font-bold text-white">{progressPct}%</span>
                </div>
                <div>
                  <p className="text-sm text-emerald-200 mb-1">Level Kompetensi</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span className="text-lg font-bold text-white">Intermediate</span>
                  </div>
                  <p className="text-xs text-emerald-100 bg-white/10 px-2 py-1 rounded inline-block">
                    Diselesaikan: {completedCount} dari {totalCount} modul
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50 flex-1">
          <div className="container max-w-5xl">
            <div className="flex items-center gap-2 mb-8">
              <Target className="w-6 h-6 text-sigap-primary" />
              <h2 className="text-2xl font-bold text-sigap-darkest">Modul Pembelajaran</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(mod => (
                <div 
                  key={mod.id} 
                  className={`bg-white rounded-2xl border shadow-sm p-6 flex flex-col h-full transition-all ${mod.status === 'locked' ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md hover:border-sigap-primary/30 cursor-pointer'}`}
                  onClick={() => mod.status !== 'locked' && setSelectedModule(mod)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-sigap-primary bg-sigap-primary/10 px-2 py-1 rounded">
                      {mod.category}
                    </span>
                    {mod.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    {mod.status === 'in_progress' && <PlayCircle className="w-6 h-6 text-amber-500" />}
                    {mod.status === 'locked' && <Lock className="w-5 h-5 text-slate-400" />}
                  </div>
                  <h3 className="text-lg font-bold text-sigap-darkest mb-3 leading-tight">{mod.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                    <Clock className="w-4 h-4" /> {mod.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />

      {/* Module Detail Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="h-40 bg-emerald-900 relative p-6 flex flex-col justify-end">
              <button onClick={() => setSelectedModule(null)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 rounded-full p-1">
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-200 bg-emerald-800/50 px-2 py-1 rounded self-start mb-2">
                {selectedModule.category}
              </span>
              <h3 className="font-bold text-2xl text-white leading-tight">{selectedModule.title}</h3>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b">
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedModule.duration}</div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" /> Tujuan Pembelajaran
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-sigap-darkest mb-2">Deskripsi Modul</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{selectedModule.desc}</p>
                <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800 flex gap-3">
                  <BookOpen className="w-5 h-5 shrink-0" />
                  <p>Ini adalah tampilan simulasi. Pada aplikasi riil, bagian ini akan berisi video, artikel, atau kuis interaktif.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedModule(null)}>Tutup</Button>
                {selectedModule.status === 'completed' ? (
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => setSelectedModule(null)}>Pelajari Lagi</Button>
                ) : (
                  <Button className="flex-1 bg-sigap-primary" onClick={() => handleComplete(selectedModule.id)}>Selesaikan Modul</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
