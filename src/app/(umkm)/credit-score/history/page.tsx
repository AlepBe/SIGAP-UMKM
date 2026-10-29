"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
ArrowUpRight,
Award,
Calendar,
CheckCircle2,
History,TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
Area,
AreaChart,
CartesianGrid,
ResponsiveContainer,
Tooltip,
XAxis,YAxis
} from 'recharts';

export default function CreditScoreHistoryPage() {
  const { data } = useDemo();
  const currentScore = data.credit_score.score;

  // 6 months historical score progression
  const historyData = [
    { period: 'Apr 2026', score: 685, grade: 'B', note: 'Registrasi Usaha' },
    { period: 'Mei 2026', score: 710, grade: 'B+', note: 'Verifikasi NIB & KTP' },
    { period: 'Jun 2026', score: 728, grade: 'B+', note: 'Penyelesaian Modul Literasi 1' },
    { period: 'Jul 2026', score: 745, grade: 'A-', note: 'Pencatatan QRIS Rutin' },
    { period: 'Agt 2026', score: 764, grade: 'A', note: 'Margin Usaha Stabil >25%' },
    { period: 'Sep 2026', score: currentScore, grade: 'A', note: 'Kepatuhan & Arus Kas Prima' }
  ];

  // Timeline events
  const scoreEvents = [
    {
      id: 'EVT-001',
      date: '24 Sep 2026',
      title: 'Skor Naik ke 782 (Grade A)',
      change: '+18 Poin',
      type: 'positive',
      reason: 'Konsistensi pencatatan transaksi kas & arus kas positif selama 30 hari berturut-turut.'
    },
    {
      id: 'EVT-002',
      date: '15 Agt 2026',
      title: 'Evaluasi Margin Laba Usaha',
      change: '+19 Poin',
      type: 'positive',
      reason: 'Margin laba bersih tercatat 33.7%, melampaui rata-rata industri F&B lokal.'
    },
    {
      id: 'EVT-003',
      date: '28 Jul 2026',
      title: 'Integrasi Akun Bank Demo',
      change: '+17 Poin',
      type: 'positive',
      reason: 'Rekening operasional terhubung dan riwayat mutasi tervalidasi.'
    },
    {
      id: 'EVT-004',
      date: '10 Jun 2026',
      title: 'Kelulusan Modul Literasi OJK',
      change: '+18 Poin',
      type: 'positive',
      reason: 'Menyelesaikan modul Pemisahan Rekening & Pengenalan Pinjol Legal.'
    },
    {
      id: 'EVT-005',
      date: '15 Mei 2026',
      title: 'Dokumen Legalitas Lengkap',
      change: '+25 Poin',
      type: 'positive',
      reason: 'NIB RBA dan NPWP usaha berhasil diverifikasi oleh sistem.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <History className="w-3.5 h-3.5" /> Rekam Jejak Kesiapan Kredit
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Riwayat Skor Kredit SIGAP
            </h1>
            <p className="text-white/70 max-w-2xl text-xs sm:text-base leading-relaxed">
              Pantau perkembangan skor kelayakan kredit usaha Anda dari bulan ke bulan. Data ini menjadi portofolio terpercaya saat mengajukan pinjaman bank.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/20 text-center w-full md:w-auto md:min-w-[200px]">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">Skor Saat Ini</span>
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-sigap-yellow mt-1">
              {currentScore}
            </div>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Grade A (Sangat Layak)
            </span>
          </div>
        </div>
      </div>

      {/* Main Progression Chart */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-sigap-darkest flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sigap-primary" /> Perjalanan Skor 6 Bulan Terakhir
            </h2>
            <p className="text-xs text-slate-500 mt-1">Peningkatan konsisten dari 685 (Grade B) menjadi 782 (Grade A) dalam kurun waktu 6 bulan.</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-2xl border border-emerald-100">
            <ArrowUpRight className="w-4 h-4" /> Kenaikan Total: +97 Poin (+14.1%)
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historyData} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
              <defs>
                <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006699" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#006699" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                domain={[600, 850]} 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `${val}`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
                  backgroundColor: '#0c1b33', 
                  color: '#fff',
                  padding: '12px 16px'
                }}
                formatter={(value: any) => [`${value} Poin (Skor)`, 'Skor SIGAP']}
                labelFormatter={(label) => `Bulan: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#006699" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#scoreColor)" 
                dot={{ r: 6, fill: '#006699', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
        <h2 className="text-xl font-display font-bold text-sigap-darkest mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-sigap-yellow-dark" /> Riwayat Log & Peristiwa Penentu Skor
        </h2>

        <div className="space-y-4">
          {scoreEvents.map((evt, idx) => (
            <motion.div 
              key={evt.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl border border-slate-200/70 hover:border-sigap-primary/40 bg-slate-50/50 hover:bg-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sigap-darkest text-base">{evt.title}</h3>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {evt.change}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    {evt.reason}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-medium whitespace-nowrap self-start md:self-center pl-14 md:pl-0">
                <Calendar className="w-3.5 h-3.5 inline mr-1" />
                {evt.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Footer Callout */}
      <div className="bg-sigap-darkest text-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold font-display">Ingin Meningkatkan Skor Menuju Grade A+ (820+)?</h3>
          <p className="text-xs text-white/70">Ikuti langkah taktis di menu Rekomendasi Peningkatan untuk menambah hingga +45 poin.</p>
        </div>
        <Link href="/credit-score/recommendations">
          <Button className="bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold rounded-2xl px-6 py-2.5">
            Buka Roadmap Rekomendasi &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}
