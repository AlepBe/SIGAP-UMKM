"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, Activity, CheckCircle2, 
  Copy, Eye, EyeOff, ShieldCheck, Key, Server, 
  AlertTriangle, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';

export default function SettingsPage() {
  const { resetData } = useLenderDemo();
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://api.banknusantara.com/v1/webhooks/sigap');
  const [savedWebhookToast, setSavedWebhookToast] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetSuccessToast, setResetSuccessToast] = useState(false);

  const apiKey = "sk_live_sigap_x8j92k1ld03m4n5b6v7c8x9z";

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleTestAPI = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult('Koneksi Webhook Berhasil! Status: 200 OK. Waktu Respons: 38ms (Payload: credit.evaluation.completed)');
    }, 1200);
  };

  const handleSaveWebhook = () => {
    setSavedWebhookToast(true);
    setTimeout(() => setSavedWebhookToast(false), 2500);
  };

  const handleConfirmReset = () => {
    resetData();
    setIsResetModalOpen(false);
    setResetSuccessToast(true);
    setTimeout(() => setResetSuccessToast(false), 3500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 font-sans">
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10"
      >
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sigap-yellow text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-white/10">
            <Server className="w-3.5 h-3.5" /> Konfigurasi Gateway & Keamanan
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
            Pengaturan Integrasi Core Banking & API
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
            Kelola kredensial API sandbox / production, endpoint webhook peristiwa pembiayaan, dan sinkronisasi data debitur.
          </p>
        </div>
      </motion.div>

      {/* Notifications */}
      <AnimatePresence>
        {savedWebhookToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Endpoint Webhook berhasil disimpan dan diverifikasi.</span>
          </motion.div>
        )}
        {resetSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Semua data demo Partner Workspace telah dikembalikan ke kondisi awal.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* API Credentials Box */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-sigap-primary flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-sigap-darkest">Kredensial API & Otentikasi</h3>
              <p className="text-xs text-slate-500 mt-0.5">Gunakan token rahasia ini untuk otentikasi REST API SIGAP Open Finance.</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Enkripsi TLS 1.3
          </span>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Production Secret API Key
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input 
                  type={showKey ? "text" : "password"} 
                  value={apiKey} 
                  readOnly 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs font-bold text-sigap-darkest select-all pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button 
                onClick={handleCopyKey}
                variant="outline"
                className="border-slate-200 hover:border-sigap-primary text-slate-700 font-bold text-xs rounded-2xl px-5 py-3.5"
              >
                {copiedKey ? (
                  <span className="flex items-center gap-1.5 text-emerald-600"><Check className="w-4 h-4" /> Tersalin</span>
                ) : (
                  <span className="flex items-center gap-1.5"><Copy className="w-4 h-4" /> Salin Key</span>
                )}
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Endpoint Webhook Penerimaan Pengajuan
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="url" 
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white" 
              />
              <Button 
                onClick={handleSaveWebhook}
                className="bg-sigap-primary hover:bg-sigap-primary/90 text-white font-bold text-xs rounded-2xl px-6 py-3.5 shadow-md shadow-sigap-primary/20"
              >
                Simpan Endpoint
              </Button>
            </div>
          </div>

          {/* Test Connection Section */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-sm text-sigap-darkest flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sigap-primary" />
                  Uji Konektivitas Live Webhook Ping
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kirim simulasi payload notifikasi pengajuan baru ke server core banking Anda.
                </p>
              </div>
              <Button 
                onClick={handleTestAPI} 
                disabled={isTesting}
                variant="outline"
                className="border-sigap-primary text-sigap-primary hover:bg-sigap-primary hover:text-white font-bold text-xs rounded-2xl px-5 py-3"
              >
                {isTesting ? (
                  <><RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" /> Mengirim Ping...</>
                ) : (
                  'Kirim Payload Uji Coba'
                )}
              </Button>
            </div>

            {testResult && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Tes Berhasil Dikonfirmasi</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">{testResult}</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Danger Zone: Reset Demo Data */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-rose-50/60 border border-rose-200 rounded-3xl p-6 md:p-8 space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-lg text-rose-900">Manajemen Data Demo Sesi</h3>
            <p className="text-xs text-rose-700 mt-0.5">Kembalikan semua status pengajuan, produk, dan riwayat approval ke data fiktif awal.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
            Mereset data tidak memengaruhi akun institusi nyata Anda. Tindakan ini hanya me-refresh penyimpanan lokal browser untuk sesi pengujian saat ini.
          </p>
          <Button 
            variant="destructive" 
            onClick={() => setIsResetModalOpen(true)}
            className="rounded-2xl text-xs font-bold px-5 py-5 shadow-sm shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-2" /> Reset Data Demo
          </Button>
        </div>
      </motion.div>

      {/* Confirmation Modal for Reset */}
      <AnimatePresence>
        {isResetModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
            onClick={() => setIsResetModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden font-sans border border-slate-200 p-6 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-display font-extrabold text-xl text-sigap-darkest">Reset Data Demo?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Apakah Anda yakin ingin mengembalikan seluruh daftar pengajuan, produk pembiayaan, dan status evaluasi ke konfigurasi awal?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsResetModalOpen(false)}
                  className="rounded-2xl text-xs font-bold border-slate-300"
                >
                  Batal
                </Button>
                <Button 
                  onClick={handleConfirmReset}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold shadow-md"
                >
                  Ya, Reset Sekarang
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
