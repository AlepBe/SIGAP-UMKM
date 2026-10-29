"use client";

import { PublicFooter } from '@/components/landing/PublicFooter';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { Button } from '@/components/ui/button';
import {
ArrowRight,
ChevronDown,
HelpCircle,
Search
} from 'lucide-react';
import { AnimatePresence,motion } from 'motion/react';
import Link from 'next/link';
import { useMemo,useState } from 'react';

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      category: 'Umum & Pendaftaran',
      q: 'Apa itu platform SIGAP UMKM?',
      a: 'SIGAP (Sistem Informasi dan Akselerasi Finansial Pengusaha) adalah platform ekosistem digital yang membantu pelaku UMKM Indonesia melakukan pencatatan keuangan otomatis, mengukur skor kelayakan kredit (credit scoring alternatif), dan mendapatkan akses pembiayaan produktif yang legal dan diawasi OJK.'
    },
    {
      category: 'Umum & Pendaftaran',
      q: 'Apakah mendaftar di SIGAP dikenakan biaya?',
      a: 'Pendaftaran akun dasar SIGAP adalah 100% GRATIS. Anda dapat langsung menggunakan fitur pembukuan kas, kalkulator cicilan, pengecekan legalitas OJK, dan modul literasi finansial tanpa biaya apa pun.'
    },
    {
      category: 'Pembukuan Otomatis',
      q: 'Bagaimana cara SIGAP mencatat transaksi usaha secara otomatis?',
      a: 'SIGAP dapat dihubungkan dengan penyedia QRIS resmi, rekening bank operasional (Open Banking API), dan dompet digital usaha. Setiap transaksi penjualan yang masuk akan langsung tercatat dan diklasifikasikan ke dalam laporan laba rugi.'
    },
    {
      category: 'Pembukuan Otomatis',
      q: 'Apakah saya bisa mencatat transaksi kas/tunai secara manual?',
      a: 'Tentu saja! Di menu Pembukuan, tersedia tombol "Tambah Transaksi" yang memungkinkan Anda mencatat transaksi tunai, pembelian bahan baku di pasar tradisional, maupun pengeluaran operasional lainnya dalam hitungan detik.'
    },
    {
      category: 'Skor Kredit SIGAP',
      q: 'Bagaimana cara kerja Skor Kredit Alternatif SIGAP?',
      a: 'Algoritma skor SIGAP menganalisis empat pilar utama: konsistensi arus kas masuk (35%), margin laba bersih usaha (25%), kepatuhan dokumen legalitas seperti NIB & NPWP (20%), dan pemahaman literasi keuangan (20%). Skor berkisar dari 300 hingga 850.'
    },
    {
      category: 'Skor Kredit SIGAP',
      q: 'Berapa skor minimal agar UMKM dianggap layak kredit (Bankable)?',
      a: 'Skor di atas 700 (Grade B+ ke atas) umumnya sudah memenuhi standar kelayakan perbankan untuk Kredit Usaha Rakyat (KUR) Mikro. Skor di atas 780 (Grade A) membuka akses suku bunga prioritas dan proses persetujuan cepat.'
    },
    {
      category: 'Marketplace Pembiayaan',
      q: 'Lembaga keuangan apa saja yang bekerja sama dengan SIGAP?',
      a: 'SIGAP hanya bermitra dengan entitas yang berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK), termasuk Bank BUMN (penyalur KUR resmi), Bank Swasta Nasional, Perusahaan Gadai Resmi (seperti Pegadaian), dan Fintech P2P Lending berizin resmi.'
    },
    {
      category: 'Marketplace Pembiayaan',
      q: 'Apakah data saya otomatis diserahkan ke bank saat mendaftar?',
      a: 'Tidak. Data pembukuan Anda bersifat pribadi dan rahasia. Data hanya akan diteruskan ke lembaga penyalur pembiayaan apabila Anda secara sadar mengklik tombol "Ajukan Pembiayaan" pada produk yang Anda pilih.'
    },
    {
      category: 'Keamanan & OJK',
      q: 'Bagaimana SIGAP melindungi data bisnis saya dari kebocoran?',
      a: 'Kami mengadopsi standar enkripsi AES-256 bit dan TLS 1.3 setara perbankan internasional. Data disimpan di pusat data domestik Tier-3 Indonesia dan kami mematuhi penuh UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP).'
    },
    {
      category: 'Keamanan & OJK',
      q: 'Bagaimana cara memastikan penawaran pinjaman yang saya terima bukan pinjol ilegal?',
      a: 'Gunakan fitur Pengecekan Legalitas di platform SIGAP. Masukkan nama aplikasi atau nomor pengirim. Sistem kami akan memvalidasi apakah nama tersebut terdaftar di direktori resmi OJK dan Satgas Waspada Investasi.'
    }
  ];

  const categories = ['Semua', 'Umum & Pendaftaran', 'Pembukuan Otomatis', 'Skor Kredit SIGAP', 'Marketplace Pembiayaan', 'Keamanan & OJK'];

  const filteredFaqs = useMemo(() => {
    return faqItems.filter(item => {
      const matchCat = activeCategory === 'Semua' ? true : item.category === activeCategory;
      const matchSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" /> Pusat Pengetahuan & Tanya Jawab
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Pelajari semua hal tentang cara SIGAP memberdayakan UMKM dalam mengelola pembukuan, meningkatkan skor kredit, dan memperoleh pembiayaan legal.
            </p>

            {/* Search Box */}
            <div className="pt-6 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Ketik kata kunci: skor, bunga KUR, QRIS, legalitas OJK..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-sigap-darkest placeholder-slate-400 text-sm focus:outline-none shadow-2xl font-medium"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content Section */}
        <section className="py-20 bg-slate-50">
          <div className="container max-w-5xl mx-auto space-y-8">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                    activeCategory === cat 
                      ? 'bg-sigap-darkest text-white shadow-md' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {filteredFaqs.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sigap-primary block mb-1">
                          {item.category}
                        </span>
                        <h3 className="font-display font-bold text-base md:text-lg text-sigap-darkest leading-snug">
                          {item.q}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 bg-sigap-soft/20 text-sigap-primary' : 'text-slate-400'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <div className="bg-white rounded-3xl p-16 text-center text-slate-500 border border-slate-200">
                  <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-base font-bold text-sigap-darkest">Pertanyaan tidak ditemukan</p>
                  <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.</p>
                </div>
              )}
            </div>

            {/* Still have questions card */}
            <div className="bg-sigap-darkest text-white rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-2xl font-display font-bold">Masih Ada Pertanyaan Lain?</h3>
                <p className="text-xs md:text-sm text-white/70">
                  Tim spesialis SIGAP siap membantu menjawab keraguan usaha Anda setiap hari kerja.
                </p>
              </div>
              <Link href="/kontak">
                <Button className="bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold px-8 py-3 rounded-2xl shadow-lg shadow-sigap-yellow/20 text-xs">
                  Hubungi Tim Bantuan <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
