import { PublicFooter } from '@/components/landing/PublicFooter';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { Button } from '@/components/ui/button';
import {
AlertCircle,
ArrowRight,
CheckCircle2,
EyeOff,
FileCheck,
Key,
Lock,
Server,
ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function KeamananPage() {
  const securityPillars = [
    {
      icon: Lock,
      title: "Enkripsi Data Bank-Grade",
      desc: "Semua data transaksi, identitas pemilik usaha, dan dokumen keuangan dienkripsi saat transit (TLS 1.3) dan saat istirahat (AES-256 bit)."
    },
    {
      icon: ShieldCheck,
      title: "Kepatuhan UU PDP No. 27/2022",
      desc: "Selaras penuh dengan Undang-Undang Perlindungan Data Pribadi Republik Indonesia. Data Anda hanya diproses atas persetujuan eksplisit Anda."
    },
    {
      icon: Key,
      title: "Autentikasi Multi-Faktor (MFA)",
      desc: "Akses akun dilindungi dengan verifikasi dua langkah (2FA OTP) serta kontrol otorisasi sesi berbasis token terenkripsi."
    },
    {
      icon: Server,
      title: "Infrastruktur Cloud Tersertifikasi",
      desc: "Server berlokasi di pusat data domestik Indonesia (Tier-3) yang tersertifikasi ISO/IEC 27001 dan SOC 2 Type II dengan uptime 99.98%."
    },
    {
      icon: EyeOff,
      title: "Kerahasiaan Tanpa Penjualan Data",
      desc: "SIGAP tidak pernah dan tidak akan pernah menjual atau memonetisasi data transaksi UMKM kepada broker periklanan atau pihak ketiga."
    },
    {
      icon: FileCheck,
      title: "Audit Keamanan Independen",
      desc: "Pengujian penetrasi (Pen-Test) dan audit kode sumber berkala dilakukan oleh lembaga keamanan siber bersertifikasi nasional."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Perlindungan Finansial Bertaraf Enterprise
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight">
              Keamanan & Privasi Data Anda Adalah Prioritas Utama Kami
            </h1>
            <p className="text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Kami menerapkan standar enkripsi ketat, kepatuhan regulasi OJK, dan tata kelola data transparan untuk menjaga keutuhan ekosistem bisnis Anda.
            </p>
          </div>
        </section>

        {/* Security Pillars Grid */}
        <section className="py-20 bg-slate-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl font-display font-extrabold text-sigap-darkest">
                6 Pilar Keamanan Sistem SIGAP
              </h2>
              <p className="text-slate-500 text-sm">
                Dirancang dari fondasi arsitektur untuk menjamin keamanan mutlak bagi setiap transaksi UMKM.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div 
                    key={idx}
                    className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-sigap-soft/20 text-sigap-primary flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-display font-bold text-sigap-darkest">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" /> Standar Terpenuhi
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* OJK & Regulatory Advisory */}
        <section className="py-16 bg-white border-t border-b border-slate-100">
          <div className="container max-w-4xl mx-auto">
            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200/70 flex flex-col sm:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-display font-bold text-amber-950">
                  Komitmen Anti Pinjol Ilegal & Penipuan Keuangan
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed">
                  SIGAP secara aktif memblokir entitas tanpa izin OJK dari ekosistem marketplace. Kami mengedukasi ribuan pelaku UMKM agar tidak terjerumus bunga mencekik, biaya administrasi liar, atau ancaman intimidasi penagihan ilegal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-50 text-center">
          <div className="container max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-display font-extrabold text-sigap-darkest">
              Kelola Keuangan Usaha Anda dengan Aman
            </h2>
            <p className="text-slate-500 text-sm">
              Mulai pembukuan otomatis dan bangun profil kelayakan kredit usaha Anda tanpa rasa cemas.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-sigap-primary/20">
                Daftar Akun Aman Sekarang <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
