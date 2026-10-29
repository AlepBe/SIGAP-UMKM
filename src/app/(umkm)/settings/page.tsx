"use client";

import { Button } from '@/components/ui/button';
import {
Bell,
CheckCircle2,
Key,
LogOut,
Shield,
ShieldCheck,
X
} from 'lucide-react';
import { AnimatePresence,motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import React,{ useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [toast, setToast] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2faModalOpen, setIs2faModalOpen] = useState(false);

  // Form states
  const [notifyTrx, setNotifyTrx] = useState(true);
  const [notifyScore, setNotifyScore] = useState(true);
  const [notifyPromo, setNotifyPromo] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordModalOpen(false);
    showToast('Kata sandi berhasil diperbarui.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Toast */}
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 bg-sigap-darkest text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" /> Konfigurasi Keamanan & Sistem
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
            Pengaturan Akun & Keamanan
          </h1>
          <p className="text-white/70 text-sm max-w-xl leading-relaxed">
            Kelola preferensi autentikasi, saluran notifikasi harian, dan privasi akun SIGAP Anda.
          </p>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="p-2.5 bg-sigap-soft/20 text-sigap-primary rounded-2xl">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-sigap-darkest">Keamanan & Kredensial</h3>
            <p className="text-xs text-slate-500">Perlindungan akun multi-faktor dan sandi</p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h4 className="font-bold text-sm text-sigap-darkest">Kata Sandi Akun</h4>
              <p className="text-xs text-slate-500 mt-0.5">Terakhir diperbarui 30 hari yang lalu.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsPasswordModalOpen(true)}
              className="rounded-2xl border-slate-200 text-xs font-bold"
            >
              <Key className="w-4 h-4 mr-1.5" /> Ganti Kata Sandi
            </Button>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-sigap-darkest">Autentikasi Dua Faktor (2FA)</h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-extrabold">
                  AKTIF (SMS & Google Auth)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Meminta kode verifikasi OTP saat masuk dari perangkat atau browser baru.
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setIs2faModalOpen(true)}
              className="rounded-2xl border-slate-200 text-xs font-bold"
            >
              Kelola 2FA
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-sigap-darkest">Preferensi Peringatan</h3>
            <p className="text-xs text-slate-500">Pilih jenis informasi yang ingin Anda terima</p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-sigap-darkest">Notifikasi Transaksi Baru (QRIS & Bank)</h4>
              <p className="text-xs text-slate-500 mt-0.5">Peringatan real-time saat transaksi berhasil tercatat di buku kas.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifyTrx} 
                onChange={(e) => { setNotifyTrx(e.target.checked); showToast('Preferensi notifikasi diperbarui.'); }}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-sigap-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            <div>
              <h4 className="font-bold text-sm text-sigap-darkest">Pembaruan Skor Kredit SIGAP</h4>
              <p className="text-xs text-slate-500 mt-0.5">Pemberitahuan otomatis saat evaluasi bulanan skor kredit selesai.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifyScore} 
                onChange={(e) => { setNotifyScore(e.target.checked); showToast('Preferensi notifikasi diperbarui.'); }}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-sigap-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-slate-100">
            <div>
              <h4 className="font-bold text-sm text-sigap-darkest">Informasi Program & Penawaran Lembaga Keuangan</h4>
              <p className="text-xs text-slate-500 mt-0.5">Dapatkan kabar peluang insentif subsidi bunga atau produk pendanaan baru.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notifyPromo} 
                onChange={(e) => { setNotifyPromo(e.target.checked); showToast('Preferensi notifikasi diperbarui.'); }}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-sigap-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Logout Box */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-display font-bold text-rose-950 text-base">Keluar dari Akun SIGAP</h3>
          <p className="text-xs text-rose-800 mt-0.5">Sesi demo Anda akan diakhiri dan dialihkan ke halaman masuk.</p>
        </div>
        <Button 
          onClick={handleLogout} 
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs px-6 py-2.5 w-full sm:w-auto"
        >
          <LogOut className="w-4 h-4 mr-2" /> Keluar Sesi
        </Button>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 md:p-8 space-y-5"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-display font-bold text-sigap-darkest">Perbarui Kata Sandi</h3>
                <button onClick={() => setIsPasswordModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePassword} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Kata Sandi Saat Ini</label>
                  <input type="password" required className="w-full p-3 rounded-2xl border text-sm outline-none" />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Kata Sandi Baru</label>
                  <input type="password" required minLength={8} className="w-full p-3 rounded-2xl border text-sm outline-none" />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Konfirmasi Kata Sandi Baru</label>
                  <input type="password" required minLength={8} className="w-full p-3 rounded-2xl border text-sm outline-none" />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsPasswordModalOpen(false)} className="rounded-2xl flex-1 text-xs">
                    Batal
                  </Button>
                  <Button type="submit" className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold rounded-2xl flex-1 text-xs">
                    Simpan Sandi
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2FA Modal */}
      <AnimatePresence>
        {is2faModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 md:p-8 space-y-4 text-center"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-bold text-sigap-darkest">2FA Aktif & Terlindungi</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nomor terverifikasi: <strong>0812-****-1234</strong>. Setiap upaya login dari IP baru akan dikirimi kode OTP 6 digit.
              </p>
              <Button onClick={() => setIs2faModalOpen(false)} className="w-full rounded-2xl bg-sigap-darkest text-white text-xs font-bold py-3">
                Tutup
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
