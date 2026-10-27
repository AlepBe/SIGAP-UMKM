"use client";

import React, { useState } from 'react';
import { PlayCircle, Award, CheckCircle2, Lock, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/context/DemoContext";

export default function LearningPage() {
  const { data, updateData } = useDemo();
  const modules = data.literacy_modules;
  const achievements = data.achievements;
  
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [isReading, setIsReading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Stats
  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.status === 'completed').length;
  const progressPercent = Math.round((completedModules / totalModules) * 100) || 0;
  
  let level = "Beginner";
  if (progressPercent >= 80) level = "Advanced";
  else if (progressPercent >= 40) level = "Intermediate";

  const mainModule = modules.find(m => m.status === 'in_progress' || m.status === 'not_started') || modules[0];
  const otherModules = modules.filter(m => m.id !== mainModule.id);

  const handleStartModule = (mod: any) => {
    setSelectedModule(mod);
    setIsReading(true);
  };

  const handleCompleteModule = () => {
    if (!selectedModule) return;
    setIsCompleting(true);
    
    setTimeout(() => {
      updateData(prev => ({
        ...prev,
        literacy_modules: prev.literacy_modules.map(m => 
          m.id === selectedModule.id ? { ...m, status: 'completed' as const } : m
        )
      }));
      setIsCompleting(false);
      setIsReading(false);
      setSelectedModule(null);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-sigap-darkest">Literasi Finansial</h2>
          <p className="text-muted-foreground">Tingkatkan wawasan keuangan dan dapatkan poin untuk memperkuat profil pembiayaan Anda.</p>
        </div>
        
        {/* User Progress Summary */}
        <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-6 min-w-[300px]">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-muted/30" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-sigap-primary" strokeDasharray={`${progressPercent}, 100`} stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-sigap-darkest leading-none">{progressPercent}%</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-sigap-darkest">Tingkat Literasi: {level}</div>
            <div className="text-xs text-muted-foreground mt-1">{totalModules - completedModules} Modul tersisa</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Learning Modules - 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-semibold text-lg text-sigap-darkest">Modul Sorotan</h3>
          
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row">
              <div 
                className="w-full sm:w-48 h-32 sm:h-auto bg-sigap-darkest relative flex items-center justify-center group cursor-pointer"
                onClick={() => handleStartModule(mainModule)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="text-xs font-semibold text-sigap-primary mb-1 uppercase">{mainModule.category} • {mainModule.duration_min} MENIT</div>
                <h4 className="text-lg font-bold text-sigap-darkest mb-2">{mainModule.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">Materi utama yang direkomendasikan berdasarkan aktivitas finansial Anda.</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-1">
                    {mainModule.status === 'completed' ? (
                      <span className="text-xs font-medium text-green-600 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> Selesai</span>
                    ) : (
                      <span className="text-xs text-amber-600 font-medium">10 Poin Reward (Demo)</span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    variant={mainModule.status === 'completed' ? 'ghost' : 'outline'} 
                    className="text-sigap-primary border-sigap-primary"
                    onClick={() => handleStartModule(mainModule)}
                  >
                    {mainModule.status === 'completed' ? 'Ulas Kembali' : 'Mulai Belajar'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-lg text-sigap-darkest pt-4">Modul Lainnya</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {otherModules.map(mod => (
              <CourseCard 
                key={mod.id}
                title={mod.title} 
                category={mod.category.toUpperCase()} 
                time={`${mod.duration_min} Menit`} 
                status={mod.status} 
                onClick={() => handleStartModule(mod)}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar - Badges & Achievements */}
        <div className="space-y-6">
          <div className="bg-sigap-dark text-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-sigap-light" />
              <h3 className="font-bold text-lg">Pencapaian Anda</h3>
            </div>
            
            <div className="space-y-4">
              {achievements.map(ach => (
                <BadgeItem 
                  key={ach.id}
                  name={ach.name} 
                  desc={ach.description} 
                  earned={ach.earned} 
                />
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-xs text-sigap-light mb-3">Setiap pencapaian (Demo) meningkatkan nilai profil Anda dalam algoritma skor kredit.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Modal */}
      {isReading && selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-semibold text-xl text-sigap-darkest">{selectedModule.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedModule.category}</p>
              </div>
              <button onClick={() => setIsReading(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 bg-white">
              <div className="prose max-w-none text-gray-700">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-8 border-2 border-dashed border-gray-300">
                  <PlayCircle className="w-12 h-12 text-gray-300" />
                  <span className="ml-3 text-gray-400 font-medium">Video Materi (Simulasi)</span>
                </div>
                
                <h4 className="text-lg font-bold text-sigap-darkest mb-4">Rangkuman Materi</h4>
                <p className="mb-4">
                  Dalam modul ini, Anda mempelajari pentingnya aspek <strong>{selectedModule.category.toLowerCase()}</strong> untuk keberlanjutan bisnis. 
                  Memahami topik <em>{selectedModule.title.toLowerCase()}</em> akan membantu Anda dalam mengambil keputusan strategis sehari-hari.
                </p>
                <p className="mb-4">
                  Praktik terbaik yang disarankan:
                </p>
                <ul className="list-disc pl-5 mb-8 space-y-2">
                  <li>Selalu dokumentasikan setiap transaksi.</li>
                  <li>Pisahkan kas operasional dan pribadi.</li>
                  <li>Tinjau ulang secara berkala.</li>
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800 text-sm">
                  <strong>Simulasi:</strong> Menyelesaikan modul ini akan menambahkan 10 poin ke profil demo Anda.
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
              <Button variant="outline" onClick={() => setIsReading(false)}>Tutup</Button>
              {selectedModule.status !== 'completed' && (
                <Button onClick={handleCompleteModule} disabled={isCompleting} className="bg-green-600 text-white hover:bg-green-700">
                  {isCompleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                  Tandai Selesai & Klaim Poin
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseCard({ title, category, time, status, onClick }: { title: string, category: string, time: string, status: string, onClick: () => void }) {
  return (
    <div onClick={onClick} className={`border rounded-xl p-5 bg-white hover:border-sigap-primary/50 hover:shadow-sm transition-all cursor-pointer`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-bold tracking-wider text-muted-foreground">{category} • {time}</span>
        {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
      </div>
      <h4 className="font-semibold text-sigap-darkest leading-snug mb-4">{title}</h4>
      <div className="flex justify-between items-center mt-auto">
        {status === 'completed' ? (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Selesai</span>
        ) : (
          <span className="text-xs font-medium text-sigap-primary">Mulai Belajar →</span>
        )}
      </div>
    </div>
  );
}

function BadgeItem({ name, desc, earned }: { name: string, desc: string, earned: boolean }) {
  return (
    <div className={`flex gap-3 items-center p-3 rounded-lg ${earned ? 'bg-white/10' : 'opacity-40 grayscale'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${earned ? 'bg-sigap-primary' : 'bg-muted/50 border border-muted'}`}>
        <Award className={`w-5 h-5 ${earned ? 'text-white' : 'text-muted-foreground'}`} />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">{name}</h4>
        <p className="text-[10px] text-sigap-light/80 leading-tight mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
