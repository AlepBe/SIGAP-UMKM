"use client";

import {
BarChart4,
Sliders
} from 'lucide-react';
import {
Bar,
BarChart,
CartesianGrid,
ResponsiveContainer,
Tooltip,
XAxis,YAxis
} from 'recharts';

export default function AdminScoringPage() {
  const scoreDistribution = [
    { grade: 'Grade E (<550)', count: 42, pct: '4%' },
    { grade: 'Grade D (550-649)', count: 120, pct: '11%' },
    { grade: 'Grade C (650-699)', count: 215, pct: '20%' },
    { grade: 'Grade B (700-749)', count: 340, pct: '32%' },
    { grade: 'Grade A (750-799)', count: 260, pct: '25%' },
    { grade: 'Grade A+ (800+)', count: 85, pct: '8%' }
  ];

  const modelWeights = [
    { feature: 'Konsistensi Arus Kas Masuk (QRIS & Bank)', weight: '35%', status: 'Normal' },
    { feature: 'Margin Laba Bersih Usaha (Net Margin)', weight: '25%', status: 'Normal' },
    { feature: 'Kelengkapan Dokumen Legalitas (NIB & NPWP)', weight: '20%', status: 'Normal' },
    { feature: 'Kepatuhan & Modul Literasi Finansial', weight: '20%', status: 'Normal' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">ML Scoring Engine Monitoring</h2>
          <p className="text-muted-foreground mt-1">Pemantauan distribusi skor kredit alternatif, akurasi model, dan pembobotan fitur.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Model V2.4 Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Akurasi Prediksi Default</span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">94.8%</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">AUC-ROC Score 0.92</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Rata-rata Skor Portofolio</span>
          <div className="text-3xl font-extrabold text-sigap-primary mt-1">738 (Grade B+)</div>
          <span className="text-xs text-gray-500 mt-1 block">1,062 UMKM Aktif Dinilai</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Waktu Inferensi Rata-rata</span>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">118 ms</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Real-time pipeline</span>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
          <BarChart4 className="w-5 h-5 text-sigap-primary" /> Distribusi Skor Kredit Debitur UMKM
        </h3>
        <p className="text-xs text-gray-500">Sebaran populasi UMKM berdasarkan rentang skor kelayakan kredit.</p>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="grade" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#0c1b33', color: '#fff' }}
                formatter={(val: any) => [`${val} UMKM`, 'Jumlah Entitas']}
              />
              <Bar dataKey="count" fill="#006699" radius={[8, 8, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border shadow-sm space-y-4">
        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-gray-600" /> Bobot Fitur Algoritma Scoring
        </h3>
        <div className="divide-y divide-gray-100">
          {modelWeights.map((w, idx) => (
            <div key={idx} className="py-3.5 flex justify-between items-center text-sm">
              <span className="font-medium text-gray-800">{w.feature}</span>
              <div className="flex items-center gap-4">
                <span className="font-bold text-sigap-primary">{w.weight}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  {w.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
