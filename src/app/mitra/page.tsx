import { PublicFooter } from '@/components/landing/PublicFooter';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { Button } from '@/components/ui/button';
import {
ArrowRight,
Building2,
Handshake
} from 'lucide-react';
import Link from 'next/link';

export default function MitraPage() {
  const benefits = [
    {
      title: "Kualitas Calon Debitur Terverifikasi",
      desc: "Akses portofolio UMKM dengan histori pembukuan aktif dan skor kelayakan kredit berbasis data transaksi riil non-kas."
    },
    {
      title: "Tekan Rasio Kredit Macet (NPL)",
      desc: "Algoritma prediktif SIGAP menyaring debitur dengan profil arus kas stabil dan kapasitas rasio cicilan (DSR) aman di bawah 35%."
    },
    {
      title: "Efisiensi Akuisisi Nasabah (CAC)",
      desc: "Menghubungkan produk kredit modal kerja Anda langsung dengan pelaku UMKM yang siap secara profil dan dokumen legalitas."
    },
    {
      title: "Integrasi API Otomatis & Terstandar",
      desc: "Penyaluran dan verifikasi berkas lebih cepat melalui integrasi webhook dan API Open Finance yang aman dan fleksibel."
    }
  ];

  const partners = [
    { name: "Bank Nusantara Demo", type: "Bank BUMN", badge: "Penyalur KUR Resmi" },
    { name: "Bank Arunika Demo", type: "Bank Swasta Nasional", badge: "Kredit Modal Kerja" },
    { name: "Fintech Nusantara Demo", type: "P2P Lending Berizin OJK", badge: "Invoice Financing" },
    { name: "Koperasi Maju Demo", type: "Koperasi Simpan Pinjam Modern", badge: "Pembiayaan Mikro" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <Handshake className="w-4 h-4" /> Ekosistem Kemitraan Finansial
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight">
              Akselerasi Penyaluran Kredit UMKM Berkualitas Tinggi
            </h1>
            <p className="text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Bergabung bersama puluhan perbankan, fintech terdaftar OJK, dan lembaga penjaminan dalam menyalurkan pembiayaan produktif yang tepat sasaran.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link href="/register">
                <Button size="lg" className="bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-sigap-yellow/20">
                  Ajukan Kemitraan Lender &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits for Partners */}
        <section className="py-20 bg-slate-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl font-display font-extrabold text-sigap-darkest">
                Mengapa Bermitra dengan SIGAP?
              </h2>
              <p className="text-slate-500 text-sm">
                Solusi teknologi finansial komprehensif yang menjembatani kesenjangan informasi antara perbankan dan jutaan UMKM Indonesia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((b, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sigap-soft/20 text-sigap-primary flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-display font-bold text-sigap-darkest">
                    {b.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Directory of Partners */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl font-display font-extrabold text-sigap-darkest">
                Mitra Lembaga Penyalur Pembiayaan
              </h2>
              <p className="text-slate-500 text-sm">
                Lembaga keuangan resmi yang telah terintegrasi dalam platform marketplace SIGAP.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((p, i) => (
                <div key={i} className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white border shadow-sm mx-auto flex items-center justify-center text-sigap-primary">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-bold text-base text-sigap-darkest">{p.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{p.type}</p>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                    {p.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Form Callout */}
        <section className="py-20 bg-slate-50 text-center">
          <div className="container max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-display font-extrabold text-sigap-darkest">
              Tertarik Bergabung Sebagai Mitra?
            </h2>
            <p className="text-slate-500 text-sm">
              Hubungi tim kemitraan kami untuk mendiskusikan integrasi produk kredit atau pembiayaan rantai pasok usaha.
            </p>
            <Link href="/kontak">
              <Button size="lg" className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-sigap-primary/20">
                Hubungi Tim Partnership <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
