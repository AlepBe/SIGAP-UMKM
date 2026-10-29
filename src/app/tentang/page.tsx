import { PublicFooter } from '@/components/landing/PublicFooter';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { Button } from '@/components/ui/button';
import {
ArrowRight,
CheckCircle2,
Compass,
HeartHandshake,Lightbulb,
ShieldCheck,
Target
} from 'lucide-react';
import Link from 'next/link';

export default function TentangPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Integritas & Keamanan",
      desc: "Menjaga data finansial UMKM dengan standar enkripsi perbankan dan tunduk pada regulasi perlindungan data pribadi serta pengawasan OJK."
    },
    {
      icon: Target,
      title: "Aksesibilitas Nyata",
      desc: "Menghilangkan hambatan birokrasi perbankan konvensional agar usaha mikro dan informal dapat memiliki profil kelayakan kredit yang valid."
    },
    {
      icon: Lightbulb,
      title: "Inovasi Berbasis Kas Riil",
      desc: "Mengembangkan algoritma credit scoring alternatif yang adil dan objektif berdasarkan perputaran arus kas harian nyata, bukan jaminan aset fisik semata."
    },
    {
      icon: HeartHandshake,
      title: "Pemberdayaan Berkelanjutan",
      desc: "Mendampingi UMKM dari pencatatan pembukuan dasar hingga siap naik kelas menjadi entitas bisnis mandiri dan bankable."
    }
  ];

  const milestones = [
    { number: "30.000+", label: "UMKM Terhubung", note: "Tersebar di 34 provinsi Indonesia" },
    { number: "Rp 2.4T", label: "Penyaluran Terfasilitasi", note: "Bekerja sama dengan perbankan resmi" },
    { number: "99.58%", label: "Tingkat Kredit Sehat", note: "Rasio NPL jauh di bawah rata-rata industri" },
    { number: "18+", label: "Mitra Lembaga Berizin", note: "Bank BUMN, swasta, dan fintech OJK" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sigap-primary/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-4 h-4" /> Tentang SIGAP UMKM
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight">
              Membangun Kemandirian & Ketahanan Finansial UMKM Indonesia
            </h1>
            <p className="text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              SIGAP (Sistem Informasi dan Akselerasi Finansial Pengusaha) hadir sebagai jembatan teknologi yang menghubungkan jutaan potensi usaha lokal dengan ekosistem perbankan resmi yang aman, transparan, dan inklusif.
            </p>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                  <div className="text-3xl lg:text-4xl font-display font-extrabold text-sigap-darkest">
                    {m.number}
                  </div>
                  <div className="text-sm font-bold text-slate-800">{m.label}</div>
                  <div className="text-xs text-slate-500">{m.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="py-20 bg-slate-50">
          <div className="container max-w-5xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-sigap-primary uppercase tracking-wider block mb-2">Visi Masa Depan</span>
                  <h2 className="text-2xl font-display font-bold text-sigap-darkest">
                    Demokratisasi Akses Modal untuk Seluruh Pelaku Usaha
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mt-3">
                    Menjadi ekosistem infrastruktur digital terpercaya di Indonesia yang memastikan setiap pengusaha UMKM memiliki catatan finansial yang sehat, terukur, dan diakui oleh lembaga keuangan resmi tanpa diskriminasi agunan fisik.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> Visi Indonesia Emas 2045
                </div>
              </div>

              <div className="p-8 md:p-10 rounded-3xl bg-sigap-darkest text-white shadow-xl border border-white/10 space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-sigap-yellow uppercase tracking-wider block mb-2">Misi Utama</span>
                  <h2 className="text-2xl font-display font-bold">
                    Tiga Langkah Konkret untuk Pengusaha Mikro
                  </h2>
                  <ul className="space-y-3 text-xs md:text-sm text-white/80 mt-4">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-sigap-yellow text-sigap-darkest font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span><strong>Otomasi Pembukuan:</strong> Mengubah transaksi QRIS & kas harian menjadi laporan keuangan terstandar SAK EMKM secara otomatis.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-sigap-yellow text-sigap-darkest font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span><strong>Credit Scoring Alternatif:</strong> Menilai kelayakan usaha secara objektif melalui algoritma analitik arus kas.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-sigap-yellow text-sigap-darkest font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span><strong>Proteksi & Literasi:</strong> Memberantas jeratan pinjol ilegal melalui edukasi finansial dan scanner OJK.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 text-xs text-sigap-yellow font-semibold">
                  Fokus Pemberdayaan Komunitas Lokal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nilai-Nilai Kami */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-display font-extrabold text-sigap-darkest">
                Nilai Inti yang Menjiwai SIGAP
              </h2>
              <p className="text-slate-500 text-sm">
                Fondasi etika kerja dan filosofi teknologi yang memandu kami dalam melayani komunitas UMKM.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-sigap-soft/20 text-sigap-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-sigap-darkest">{v.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-50 text-center">
          <div className="container max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-display font-extrabold text-sigap-darkest">
              Siap Mengembangkan Usaha Anda Bersama SIGAP?
            </h2>
            <p className="text-slate-500 text-sm">
              Mulai pencatatan kas otomatis, ukur skor kelayakan kredit usaha Anda, dan raih akses permodalan legal hari ini.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/register">
                <Button size="lg" className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-sigap-primary/20">
                  Mulai Gunakan SIGAP <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/cara-kerja">
                <Button size="lg" variant="outline" className="border-slate-300 font-bold px-8 py-4 rounded-2xl bg-white hover:bg-slate-50">
                  Pelajari Cara Kerja
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
