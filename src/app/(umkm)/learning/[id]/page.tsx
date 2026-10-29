"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
ArrowLeft,
CheckCircle2,
Clock,
HelpCircle,
Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useParams,useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data, updateData } = useDemo();
  const moduleId = params?.id as string;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);

  // Find module in DemoContext or fallback
  const currentModule = data.literacy_modules.find(m => m.id === moduleId) || data.literacy_modules[0];

  const quizQuestions = [
    {
      question: 'Mengapa rekening pribadi dan rekening usaha wajib dipisahkan sejak hari pertama?',
      options: [
        'Agar uang keuntungan toko tidak terpakai untuk kebutuhan konsumtif rumah tangga.',
        'Hanya sebagai syarat formalitas agar kartu ATM terlihat banyak.',
        'Agar bank dapat menarik biaya administrasi bulanan lebih tinggi.',
        'Tidak wajib dipisahkan jika omzet masih di bawah Rp 100 Juta.'
      ],
      correctAnswer: 0,
      explanation: 'Pemisahan rekening mencegah ilusi profit dan memastikan arus kas operasional tidak bocor untuk keperluan pribadi.'
    },
    {
      question: 'Manakah indikator utama pinjaman online yang ilegal menurut standar OJK?',
      options: [
        'Meminta agunan BPKB kendaraan.',
        'Menawarkan pinjaman via pesan instan/SMS/WhatsApp dan meminta akses kontak telepon.',
        'Menyediakan nomor telepon layanan pelanggan resmi.',
        'Terdaftar di direktori resmi website OJK.'
      ],
      correctAnswer: 1,
      explanation: 'Fintech berizin OJK dilarang menawarkan pinjaman melalui pesan pribadi tanpa izin dan dilarang menyedot kontak handphone nasabah.'
    }
  ];

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx });
  };

  const handleQuizSubmit = () => {
    setIsQuizSubmitted(true);
  };

  const handleClaimReward = () => {
    updateData(prev => ({
      ...prev,
      literacy_modules: prev.literacy_modules.map(m => 
        m.id === currentModule.id ? { ...m, status: 'completed' as const, progress_pct: 100 } : m
      ),
      credit_score: {
        ...prev.credit_score,
        score: Math.min(850, prev.credit_score.score + 10)
      }
    }));
    setIsRewardClaimed(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back button */}
      <Link 
        href="/learning" 
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-sigap-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Literasi
      </Link>

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              {currentModule.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {currentModule.duration_min} Menit Waktu Baca
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> +10 Poin Skor Kredit
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
            {currentModule.title}
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Panduan praktis pengelolaan finansial usaha untuk menaikkan peringkat kelayakan perbankan (Bankability).
          </p>
        </div>
      </div>

      {/* Lesson Body Content */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm md:text-base">
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-sigap-darkest">
            1. Mengapa Disiplin Finansial Kunci Utama Skalabilitas?
          </h2>
          <p>
            Banyak pemilik UMKM menganggap bahwa bertambahnya omzet otomatis berarti usaha bertumbuh sehat. Namun, tanpa pembukuan yang memisahkan antara kantong pemilik dan kas toko, pemilik kerap terjebak dalam fenomena <em>&quot;uang masuk banyak, tapi akhir bulan kas kosong&quot;</em>.
          </p>
          <div className="bg-blue-50 border-l-4 border-sigap-primary p-4 rounded-r-2xl text-xs md:text-sm text-sigap-darkest">
            <strong>Prinsip Emas SIGAP:</strong> Rekening usaha adalah milik entitas bisnis. Setiap rupiah yang ditarik pemilik harus dicatat secara disiplin sebagai <em>Prive</em> (penarikan modal) atau gaji pemilik yang telah ditentukan di awal bulan.
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-sigap-darkest">
            2. Studi Kasus Nyata: Mengukur Margin Kotor vs Margin Bersih
          </h2>
          <p>
            Bayangkan sebuah kedai kopi menjual segelas Latte seharga Rp 22.000.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600">
            <li><strong>Bahan Baku (HPP):</strong> Biji kopi + fresh milk + gula aren + cup & straw = Rp 8.800 per cup (40%).</li>
            <li><strong>Laba Kotor (Gross Margin):</strong> Rp 22.000 - Rp 8.800 = Rp 13.200 (60%).</li>
            <li><strong>Beban Operasional:</strong> Sewa tempat, listrik PLN, gaji barista dialokasikan Rp 6.600 per cup (30%).</li>
            <li><strong>Laba Bersih Riil (Net Margin):</strong> Rp 6.600 per cup (30%).</li>
          </ul>
          <p className="text-xs text-slate-500 italic">
            Jika pemilik mengambil uang dari laci kasir setiap hari untuk belanja dapur rumah tanpa mencatatnya, margin 30% tersebut akan habis seketika tanpa disadari.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-sigap-darkest">
            3. Tiga Aturan Pokok Sebelum Mengajukan Pembiayaan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-sigap-darkest text-sm block">1. Rasio Cicilan (DSR)</span>
              <p className="text-xs text-slate-500">Maksimal 30-35% dari rata-rata laba bersih bulanan agar tidak gagal bayar.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-sigap-darkest text-sm block">2. Tujuan Produktif</span>
              <p className="text-xs text-slate-500">Gunakan pinjaman hanya untuk belanja modal kerja atau aset berpenghasilan.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-sigap-darkest text-sm block">3. Legalitas OJK</span>
              <p className="text-xs text-slate-500">Pastikan lembaga penyalur terdaftar resmi di OJK untuk perlindungan hukum.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Quiz Section */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-display font-bold text-sigap-darkest flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sigap-primary" /> Kuis Pemahaman Materi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Jawab pertanyaan berikut untuk mengklaim reward 10 poin Skor SIGAP.</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
            2 Pertanyaan
          </span>
        </div>

        <div className="space-y-8">
          {quizQuestions.map((q, qIdx) => (
            <div key={qIdx} className="space-y-3">
              <p className="font-bold text-sigap-darkest text-sm md:text-base">
                {qIdx + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[qIdx] === optIdx;
                  const isCorrect = isQuizSubmitted && optIdx === q.correctAnswer;
                  const isWrong = isQuizSubmitted && isSelected && optIdx !== q.correctAnswer;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isQuizSubmitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full text-left p-4 rounded-2xl text-xs md:text-sm border transition-all flex items-start gap-3 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold'
                          : isWrong
                          ? 'bg-rose-50 border-rose-400 text-rose-900 font-semibold'
                          : isSelected
                          ? 'bg-sigap-soft/20 border-sigap-primary text-sigap-darkest font-semibold'
                          : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                        isCorrect 
                          ? 'bg-emerald-600 text-white font-bold' 
                          : isWrong 
                          ? 'bg-rose-600 text-white font-bold' 
                          : isSelected 
                          ? 'bg-sigap-primary text-white font-bold' 
                          : 'border border-slate-300'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isQuizSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-600 border border-slate-200"
                >
                  <strong className="text-sigap-darkest">Penjelasan:</strong> {q.explanation}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          {!isQuizSubmitted ? (
            <Button
              onClick={handleQuizSubmit}
              disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
              className="bg-sigap-darkest text-white hover:bg-sigap-darkest/90 font-bold rounded-2xl px-8 py-3 text-sm shadow-md"
            >
              Kirim Jawaban Kuis
            </Button>
          ) : !isRewardClaimed ? (
            <Button
              onClick={handleClaimReward}
              className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold rounded-2xl px-8 py-3 text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Klaim +10 Poin Skor SIGAP
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Poin Skor Berhasil Ditambahkan ke Profil!
              </span>
              <Button
                onClick={() => router.push('/learning')}
                className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold rounded-2xl px-6 py-2.5 text-xs"
              >
                Selesai & Lanjut Modul Berikutnya &rarr;
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
