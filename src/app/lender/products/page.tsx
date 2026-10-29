"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';
import { 
  Building2, Plus, Power, PowerOff, Edit3, 
  CheckCircle2, XCircle, ShieldCheck, 
  Sparkles, Users, Calendar
} from 'lucide-react';

export default function ProductsPage() {
  const { data, updateData } = useLenderDemo();
  const partner = data.lender_accounts[0] || {
    id: 'LND-001',
    name: 'Bank Nusantara Demo',
    short_name: 'BND',
    role: 'lender'
  };
  const products = data.financing_products;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form states for Add Product
  const [newProductName, setNewProductName] = useState('');
  const [newMinAmount, setNewMinAmount] = useState('10000000');
  const [newMaxAmount, setNewMaxAmount] = useState('150000000');
  const [newFeePct, setNewFeePct] = useState('0.65');
  const [newCollateral, setNewCollateral] = useState('Tanpa agunan fisik (Mitra Binaan)');
  const newTargetSegment = 'UMKM Produktif';
  const [newTenors, setNewTenors] = useState('12, 24, 36');

  const formatCurrency = (amount: number) => {
    if (amount >= 1e9) return `Rp ${(amount / 1e9).toFixed(1)} Miliar`;
    if (amount >= 1e6) return `Rp ${(amount / 1e6).toFixed(0)} Juta`;
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const toggleProductStatus = (productId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateData(prev => ({
      ...prev,
      financing_products: prev.financing_products.map((p) => 
        p.id === productId ? { ...p, status: newStatus } : p
      )
    }));
    setSuccessToast(`Status produk ${productId} berhasil diubah menjadi "${newStatus === 'active' ? 'Aktif' : 'Nonaktif'}".`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const parsedTenors = newTenors.split(',').map(t => parseInt(t.trim()) || 12).filter(t => t > 0);

    const newProd = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      provider: partner.name,
      name: newProductName,
      status: 'active',
      min_amount: Number(newMinAmount) || 10000000,
      max_amount: Number(newMaxAmount) || 100000000,
      tenor_options_months: parsedTenors.length > 0 ? parsedTenors : [12, 24],
      estimated_fee_pct_month: Number(newFeePct) || 0.6,
      collateral: newCollateral,
      target_segment: newTargetSegment,
      applications_count: 0,
      approved_count: 0
    };

    updateData(prev => ({
      ...prev,
      financing_products: [newProd, ...prev.financing_products]
    }));

    setIsAddModalOpen(false);
    setNewProductName('');
    setSuccessToast(`Produk "${newProd.name}" berhasil ditambahkan ke katalog publik SIGAP.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateData(prev => ({
      ...prev,
      financing_products: prev.financing_products.map((p) =>
        p.id === editingProduct.id ? editingProduct : p
      )
    }));

    setEditingProduct(null);
    setSuccessToast(`Perubahan parameter produk "${editingProduct.name}" berhasil disimpan.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 font-sans">
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sigap-yellow text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-white/10">
              <Building2 className="w-3.5 h-3.5" /> Manajemen Skema Kredit Lembaga
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Katalog Produk Pembiayaan
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Konfigurasi plafon, estimasi biaya bunga bulanan, opsi tenor, serta kriteria agunan yang dipublikasikan secara transparan ke jaringan UMKM.
            </p>
          </div>

          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-sigap-primary hover:bg-sigap-primary/90 text-white font-bold rounded-2xl px-6 py-6 text-sm shadow-lg shadow-sigap-primary/30 flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" /> Tambah Skema Baru
          </Button>
        </div>
      </motion.div>

      {/* Success Notice */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast(null)} className="text-white/80 hover:text-white">
              <XCircle className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx: number) => {
          const isActive = product.status === 'active';
          return (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Top Status Strip */}
                <div className={`h-2.5 w-full ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                
                <div className="p-6 md:p-7 space-y-5">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{product.id} • {product.provider}</span>
                      <h3 className="font-display font-extrabold text-xl text-sigap-darkest mt-0.5 leading-snug">
                        {product.name}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                      isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>

                  {/* Ceiling & Interest */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Rentang Plafon</span>
                      <span className="font-display font-extrabold text-sigap-darkest text-sm">
                        {formatCurrency(product.min_amount)} - {formatCurrency(product.max_amount)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Bagi Hasil / Fee</span>
                      <span className="font-display font-extrabold text-emerald-600 text-sm">
                        {product.estimated_fee_pct_month}% <span className="text-[10px] text-slate-500 font-medium">/ bln</span>
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> Opsi Tenor:
                      </span>
                      <span className="font-bold text-sigap-darkest">
                        {product.tenor_options_months.join(', ')} Bulan
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Agunan:
                      </span>
                      <span className="font-bold text-sigap-darkest truncate max-w-[140px]" title={product.collateral}>
                        {product.collateral}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 font-medium flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> Total Pengajuan:
                      </span>
                      <span className="font-bold text-sigap-primary">
                        {product.applications_count} Berkas ({product.approved_count} Cair)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2.5">
                <Button 
                  variant="outline" 
                  className={`flex-1 rounded-2xl text-xs font-bold py-5 ${
                    isActive 
                      ? 'border-slate-200 text-slate-600 hover:bg-slate-100' 
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                  onClick={() => toggleProductStatus(product.id, product.status)}
                >
                  {isActive ? (
                    <><PowerOff className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> Nonaktifkan</>
                  ) : (
                    <><Power className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Aktifkan</>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-2xl text-xs font-bold py-5 border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-sigap-primary"
                  onClick={() => setEditingProduct({ ...product })}
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Ubah Parameter
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Tambah Skema Baru */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden font-sans border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-sigap-darkest text-white flex justify-between items-center border-b border-white/10">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white">Tambah Skema Pembiayaan Baru</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Produk akan langsung terpublikasikan di marketplace SIGAP.</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Skema Kredit
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Contoh: Kredit Usaha Binaan Prima" 
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Plafon Minimum (IDR)
                    </label>
                    <input 
                      type="number" 
                      required 
                      step="5000000"
                      value={newMinAmount}
                      onChange={(e) => setNewMinAmount(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Plafon Maksimum (IDR)
                    </label>
                    <input 
                      type="number" 
                      required 
                      step="10000000"
                      value={newMaxAmount}
                      onChange={(e) => setNewMaxAmount(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Biaya / Fee (% / Bulan)
                    </label>
                    <input 
                      type="number" 
                      required 
                      step="0.05"
                      value={newFeePct}
                      onChange={(e) => setNewFeePct(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Opsi Tenor (Pisahkan Koma)
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="12, 24, 36"
                      value={newTenors}
                      onChange={(e) => setNewTenors(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ketentuan Agunan
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={newCollateral}
                    onChange={(e) => setNewCollateral(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sigap-primary" /> Algoritma Matching Otomatis
                  </div>
                  <p className="text-[11px] text-blue-700">
                    Sistem SIGAP akan otomatis merekomendasikan produk ini ke profil UMKM yang cocok dengan kriteria plafon dan segmen ini.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)} className="rounded-2xl text-xs">
                    Batal
                  </Button>
                  <Button type="submit" className="bg-sigap-primary text-white font-bold rounded-2xl px-6 text-xs shadow-md">
                    Simpan & Publikasikan
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Edit Parameter */}
      <AnimatePresence>
        {editingProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setEditingProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden font-sans border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-sigap-darkest text-white flex justify-between items-center border-b border-white/10">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white">Ubah Parameter Produk</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{editingProduct.id} • {editingProduct.name}</p>
                </div>
                <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEditProduct} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Skema Kredit
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Plafon Min. (IDR)
                    </label>
                    <input 
                      type="number" 
                      required 
                      step="5000000"
                      value={editingProduct.min_amount}
                      onChange={(e) => setEditingProduct({ ...editingProduct, min_amount: Number(e.target.value) })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Plafon Maks. (IDR)
                    </label>
                    <input 
                      type="number" 
                      required 
                      step="10000000"
                      value={editingProduct.max_amount}
                      onChange={(e) => setEditingProduct({ ...editingProduct, max_amount: Number(e.target.value) })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Biaya (% / Bulan)
                    </label>
                    <input 
                      type="number" 
                      required 
                      step="0.05"
                      value={editingProduct.estimated_fee_pct_month}
                      onChange={(e) => setEditingProduct({ ...editingProduct, estimated_fee_pct_month: Number(e.target.value) })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Ketentuan Agunan
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={editingProduct.collateral}
                      onChange={(e) => setEditingProduct({ ...editingProduct, collateral: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setEditingProduct(null)} className="rounded-2xl text-xs">
                    Batal
                  </Button>
                  <Button type="submit" className="bg-sigap-primary text-white font-bold rounded-2xl px-6 text-xs shadow-md">
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
