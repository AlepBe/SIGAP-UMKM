"use client";

import { Button } from '@/components/ui/button';
import {
BookOpen,
CheckCircle2,
ChevronDown,
HelpCircle,
Loader2,
Mail,
MessageSquare,
Send
} from 'lucide-react';
import { AnimatePresence,motion } from 'motion/react';
import Link from 'next/link';
import React,{ useState } from 'react';

export default function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Pembukuan & QRIS');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const faqs = [
    {
      q: 'Bagaimana cara meningkatkan Skor Kredit SIGAP usaha saya secara cepat?',
      a: 'Langkah tercepat adalah rutin mencatat transaksi minimal 25 hari per bulan, menjaga saldo kas akhir bulan positif, menyelesaikan modul literasi finansial di akademi SIGAP (+10 poin/modul), serta memastikan dokumen NIB dan NPWP terverifikasi lengkap.'
    },
    {
      q: 'Apakah pengajuan pembiayaan melalui platform SIGAP dijamin pasti disetujui?',
      a: 'SIGAP membantu menyusun profil kelayakan (bankability) dan meneruskan data terverifikasi ke mitra perbankan resmi. Keputusan persetujuan dan besaran suku bunga tetap merupakan hak prerogatif masing-masing lembaga penyalur sesuai analisa risiko kredit internal mereka.'
    },
    {
      q: 'Bagaimana SIGAP menjamin kerahasiaan data pembukuan dan keuangan usaha saya?',
      a: 'Seluruh data transaksi dienkripsi menggunakan standar perbankan AES-256 dan hanya digunakan untuk keperluan kalkulasi skor kredit atas persetujuan tertulis Anda. Kami tidak pernah membagikan data kepada pihak ketiga tanpa izin resmi.'
    },
    {
      q: 'Apa yang harus dilakukan jika saya menerima pesan penawaran pinjaman yang mencurigakan?',
      a: 'Gunakan fitur Pengecekan Legalitas di menu Legalitas & Proteksi. Masukkan nama aplikasi atau nomor telepon pengirim. Jangan pernah mentransfer biaya administrasi apa pun di awal sebelum dana pinjaman cair.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketSuccess(true);
      setTimeout(() => {
        setTicketSuccess(false);
        setTicketSubject('');
        setTicketMessage('');
      }, 4000);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" /> Layanan Bantuan & Panduan
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Pusat Bantuan UMKM
            </h1>
            <p className="text-white/70 max-w-2xl text-xs sm:text-base leading-relaxed">
              Tim spesialis SIGAP siap mendampingi pertumbuhan bisnis Anda. Temukan jawaban cepat di FAQ atau hubungi tim bantuan teknis kami.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 sm:px-5 py-3 rounded-2xl border border-white/20 flex items-center gap-3 w-full md:w-auto">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <div>
              <span className="text-xs font-bold text-white block">Sistem Beroperasi Normal</span>
              <span className="text-[11px] text-white/60">Respons rata-rata: &lt; 15 Menit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-sigap-darkest">WhatsApp Konsultasi</h3>
            <p className="text-xs text-slate-500 mt-1">Chat langsung dengan customer service kami setiap hari kerja.</p>
          </div>
          <a 
            href="https://wa.me/6282165372288" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
          >
            Hubungi via WhatsApp (082165372288) &rarr;
          </a>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-sigap-primary flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-sigap-darkest">Email Dukungan Resmi</h3>
            <p className="text-xs text-slate-500 mt-1">Kirimkan pertanyaan atau pengajuan kerja sama resmi.</p>
          </div>
          <a 
            href="mailto:bantuan@sigap.id"
            className="text-xs font-bold text-sigap-primary hover:underline inline-flex items-center gap-1"
          >
            bantuan@sigap.id &rarr;
          </a>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-sigap-yellow-dark flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-sigap-darkest">Panduan Pengguna</h3>
            <p className="text-xs text-slate-500 mt-1">Pelajari modul literasi keuangan dan tutorial fitur.</p>
          </div>
          <Link href="/learning" className="text-xs font-bold text-sigap-yellow-dark hover:underline inline-flex items-center gap-1">
            Buka Katalog Literasi &rarr;
          </Link>
        </div>
      </div>

      {/* Main Grid: Ticket Form & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Support Ticket Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-sigap-darkest flex items-center gap-2">
              <Send className="w-5 h-5 text-sigap-primary" /> Kirim Tiket Pengaduan
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Ada kendala teknis atau pertanyaan pembukuan? Tuliskan di sini dan tim kami akan merespons.
            </p>
          </div>

          {ticketSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 p-6"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-lg text-emerald-950">Tiket Terkirim</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Nomor Tiket Anda: <strong>#TIK-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>. Tim kami akan menghubungi melalui email dalam 1x24 jam.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Kategori Kendala
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none bg-white font-medium"
                >
                  <option value="Pembukuan & QRIS">Pembukuan & Sinkronisasi QRIS</option>
                  <option value="Skor Kredit">Pertanyaan Skor Kredit SIGAP</option>
                  <option value="Pengajuan Pinjaman">Status Pengajuan Pembiayaan</option>
                  <option value="Akun & Dokumen">Legalitas Dokumen & Akun</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Judul Kendala *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Transaksi QRIS tanggal 23 belum muncul di buku kas"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Detail Pertanyaan / Kendala *
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Jelaskan secara rinci permasalahan yang Anda hadapi..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold py-3 rounded-2xl text-xs shadow-md shadow-sigap-primary/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Mengirimkan Tiket...
                  </span>
                ) : (
                  'Kirim Tiket Bantuan'
                )}
              </Button>
            </form>
          )}
        </div>

        {/* FAQ Accordion (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-sigap-darkest flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sigap-yellow-dark" /> Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Jawaban cepat untuk pertanyaan seputar fitur, skor kredit, dan keamanan data SIGAP.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-sm text-sigap-darkest leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-sigap-primary' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
