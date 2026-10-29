"use client";

import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/context/DemoContext";
import {
Award,
BookOpen,
CheckCircle2,
ChevronRight,
PlayCircle,
Sparkles
} from "lucide-react";
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LearningPage() {
  const { data } = useDemo();
  const modules = data.literacy_modules;
  const achievements = data.achievements;
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Stats
  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.status === 'completed').length;
  const progressPercent = Math.round((completedModules / totalModules) * 100) || 0;
  
  let level = "Beginner";
  if (progressPercent >= 80) level = "Advanced";
  else if (progressPercent >= 40) level = "Intermediate";

  const categories = ['Semua', 'Dasar Keuangan', 'Keamanan', 'Pembiayaan', 'Operasional', 'Kepatuhan'];

  const filteredModules = selectedCategory === 'Semua' 
    ? modules 
    : modules.filter(m => m.category.toLowerCase() === selectedCategory.toLowerCase());

  const mainModule = modules.find(m => m.status === 'in_progress' || m.status === 'not_started') || modules[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" /> Akademi Finansial UMKM
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Literasi Finansial & Sertifikasi
            </h1>
            <p className="text-white/70 max-w-2xl text-xs sm:text-base leading-relaxed">
              Tingkatkan wawasan manajemen kas dan kepatuhan hukum usaha. Setiap modul yang diselesaikan akan menambah skor kelayakan kredit Anda secara otomatis.
            </p>
          </div>

          {/* Progress Circular Badge */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/20 flex items-center gap-4 sm:gap-5 w-full lg:w-auto min-w-0 sm:min-w-[260px]">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path 
                  className="text-white/20" 
                  stroke="currentColor" 
                  strokeWidth="3.5" 
                  fill="none" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                />
                <path 
                  className="text-sigap-yellow" 
                  strokeDasharray={`${progressPercent}, 100`} 
                  stroke="currentColor" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  fill="none" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                />
              </svg>
              <span className="absolute text-base font-display font-extrabold text-white">
                {progressPercent}%
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-white/60 uppercase tracking-wider">Status Pemahaman</div>
              <div className="text-base font-display font-extrabold text-white mt-0.5">Tingkat {level}</div>
              <div className="text-[11px] text-sigap-yellow font-medium mt-0.5">
                {completedModules} dari {totalModules} modul tuntas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Modules & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Modules Section (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Featured Module Hero */}
          <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-44 h-36 rounded-2xl bg-sigap-darkest relative flex items-center justify-center shrink-0 overflow-hidden group">
                <div className="absolute inset-0 bg-sigap-primary/20 group-hover:bg-sigap-primary/10 transition-colors"></div>
                <PlayCircle className="w-12 h-12 text-white/90 group-hover:scale-110 group-hover:text-sigap-yellow transition-all" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                    {mainModule.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {mainModule.duration_min} Menit
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-sigap-darkest">
                  {mainModule.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Modul esensial yang direkomendasikan berdasarkan audit pembukuan Kedai Kopi Senja untuk meningkatkan efisiensi kas.
                </p>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> +10 Poin Skor SIGAP
                  </span>
                  <Link href={`/learning/${mainModule.id}`}>
                    <Button className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold rounded-2xl text-xs px-5 shadow-sm">
                      {mainModule.status === 'completed' ? 'Ulas Materi' : 'Mulai Belajar'} &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-2xl font-bold shrink-0 transition-all ${
                  selectedCategory === cat 
                    ? 'bg-sigap-darkest text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Modules List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredModules.map((mod) => {
              const isCompleted = mod.status === 'completed';
              return (
                <Link key={mod.id} href={`/learning/${mod.id}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-5 rounded-3xl border border-slate-200/80 bg-white hover:border-sigap-primary/40 hover:shadow-md transition-all flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {mod.category} • {mod.duration_min} Menit
                        </span>
                        {isCompleted ? (
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                            +10 Poin
                          </span>
                        )}
                      </div>

                      <h4 className="font-display font-bold text-sigap-darkest text-base mb-2 leading-snug">
                        {mod.title}
                      </h4>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className={`font-semibold ${isCompleted ? 'text-emerald-600' : 'text-sigap-primary'}`}>
                        {isCompleted ? 'Sudah Selesai' : 'Mulai Belajar'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Badges & Achievements (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-sigap-darkest to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sigap-yellow/20 text-sigap-yellow">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Pencapaian Belajar</h3>
                <p className="text-xs text-white/60">Lencana kredibilitas bisnis</p>
              </div>
            </div>

            <div className="space-y-3">
              {achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                    ach.earned 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-white/5 border-white/5 opacity-40 grayscale'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    ach.earned ? 'bg-sigap-yellow text-sigap-darkest font-bold' : 'bg-white/10 text-white/40'
                  }`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{ach.name}</h4>
                    <p className="text-xs text-white/60">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-white/70 leading-relaxed">
              Setiap lencana pencapaian memperkuat reputasi profil Anda saat dievaluasi oleh sistem scoring perbankan.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
