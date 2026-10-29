"use client";

import { PublicFooter } from '@/components/landing/PublicFooter';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { Button } from '@/components/ui/button';
import {
CheckCircle2,Loader2,
Mail,
MapPin,MessageSquare,
Send
} from 'lucide-react';
import React,{ useState } from 'react';

export default function KontakPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Dukungan Teknis UMKM');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-28 pb-20 bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" /> Tim Dukungan & Kemitraan
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight">
              Kami Selalu Siap Mendengar & Membantu Usaha Anda
            </h1>
            <p className="text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Ada pertanyaan seputar pembukuan, skor kelayakan kredit, atau rencana kemitraan lembaga keuangan? Kirimkan pesan Anda kepada kami.
            </p>
          </div>
        </section>

        {/* Contact Info & Form Grid */}
        <section className="py-20 bg-slate-50">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Contact Info Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-bold text-sigap-darkest">Informasi Kontak Langsung</h3>
                    <p className="text-xs text-slate-500 mt-1">Layanan pelanggan beroperasi Senin - Jumat, 08:30 - 17:30 WIB.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">WhatsApp Customer Service</span>
                        <p className="text-sm font-bold text-sigap-darkest mt-0.5">+62 821-6537-2288</p>
                        <p className="text-[11px] text-slate-500">Layanan CS resmi (082165372288)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="p-3 bg-blue-100 text-sigap-primary rounded-2xl shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Email Resmi</span>
                        <p className="text-sm font-bold text-sigap-darkest mt-0.5">bantuan@sigap.id</p>
                        <p className="text-[11px] text-slate-500">Untuk pertanyaan umum & kemitraan</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Kantor Operasional</span>
                        <p className="text-sm font-bold text-sigap-darkest mt-0.5">SIGAP Innovation Tower</p>
                        <p className="text-[11px] text-slate-500">Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan & Palembang Hub</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Column (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-extrabold text-sigap-darkest">
                      Pesan Anda Berhasil Terkirim!
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Terima kasih telah menghubungi SIGAP. Tim spesialis kami akan menelaah pertanyaan Anda dan membalas melalui email ({email}) dalam kurun waktu 1x24 jam kerja.
                    </p>
                    <Button 
                      onClick={() => { setIsSubmitted(false); setMessage(''); }}
                      variant="outline"
                      className="rounded-2xl mt-4"
                    >
                      Kirim Pesan Lainnya
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-sigap-darkest">Kirimkan Pesan Anda</h3>
                      <p className="text-xs text-slate-500 mt-1">Lengkapi formulir di bawah ini dan kami akan segera merespons.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Nama Lengkap *</label>
                        <input 
                          type="text" 
                          required 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Contoh: Budi Santoso"
                          className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email Aktif *</label>
                        <input 
                          type="email" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="budi@usaha.com"
                          className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Nomor Handphone / WA</label>
                        <input 
                          type="text" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0812-XXXX-XXXX"
                          className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Kategori Kepentingan</label>
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none bg-white font-medium"
                        >
                          <option value="Dukungan Teknis UMKM">Dukungan Teknis UMKM</option>
                          <option value="Kemitraan Perbankan & Fintech">Kemitraan Perbankan & Fintech</option>
                          <option value="Integrasi API Open Finance">Integrasi API Open Finance</option>
                          <option value="Media & Publikasi">Media & Publikasi</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Pesan atau Pertanyaan *</label>
                      <textarea 
                        required 
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tuliskan secara jelas hal yang ingin Anda tanyakan atau diskusikan..."
                        className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-sigap-darkest text-white hover:bg-sigap-darkest/90 font-bold py-6 rounded-2xl text-sm shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" /> Mengirimkan...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" /> Kirim Pesan Sekarang
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
