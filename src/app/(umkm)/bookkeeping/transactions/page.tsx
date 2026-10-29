"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
ArrowDownLeft,
ArrowUpRight,
CheckCircle2,
Download,
Plus,
Search,
Tag,Wallet,
X
} from 'lucide-react';
import { AnimatePresence,motion } from 'motion/react';
import React,{ useMemo,useState } from 'react';

export default function TransactionsLedgerPage() {
  const { data, updateData } = useDemo();
  const transactions = data.transactions;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Add transaction form
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'income' as 'income' | 'expense',
    category: 'Pendapatan Usaha',
    source: 'QRIS'
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Categories list
  const categories = ['Semua', 'Pendapatan Usaha', 'Bahan Baku', 'Operasional', 'Transfer Masuk'];

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.source.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = selectedType === 'all' ? true : t.type === selectedType;
      const matchCat = selectedCategory === 'Semua' ? true : t.category === selectedCategory;
      return matchSearch && matchType && matchCat;
    });
  }, [transactions, searchQuery, selectedType, selectedCategory]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const newTrx = {
      id: `TRX-${Date.now().toString().slice(-4)}`,
      datetime: new Date().toISOString(),
      description: formData.description,
      category: formData.category,
      source: formData.source,
      type: formData.type,
      amount: parseFloat(formData.amount),
      status: 'posted' as const
    };

    updateData(prev => ({
      ...prev,
      transactions: [newTrx, ...prev.transactions],
      dashboard: {
        ...prev.dashboard,
        metrics: {
          ...prev.dashboard.metrics,
          total_balance: formData.type === 'income' 
            ? prev.dashboard.metrics.total_balance + newTrx.amount 
            : prev.dashboard.metrics.total_balance - newTrx.amount,
          income_this_month: formData.type === 'income'
            ? prev.dashboard.metrics.income_this_month + newTrx.amount
            : prev.dashboard.metrics.income_this_month,
          expense_this_month: formData.type === 'expense'
            ? prev.dashboard.metrics.expense_this_month + newTrx.amount
            : prev.dashboard.metrics.expense_this_month
        }
      }
    }));

    setIsAddModalOpen(false);
    setFormData({
      description: '',
      amount: '',
      type: 'income',
      category: 'Pendapatan Usaha',
      source: 'QRIS'
    });
    showToast('Transaksi baru berhasil dicatat & saldo diperbarui!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Toast */}
      {toastMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 bg-sigap-darkest text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-sigap-darkest tracking-tight">
            Buku Riwayat Transaksi
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Seluruh transaksi masuk dan keluar yang tercatat secara real-time dari bank, e-wallet, dan QRIS.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            onClick={() => showToast('Mengekspor Riwayat Transaksi CSV...')}
            variant="outline" 
            className="rounded-2xl border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <Download className="w-4 h-4 mr-2" /> Ekspor CSV
          </Button>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-sigap-primary text-white hover:bg-sigap-primary/90 rounded-2xl font-bold shadow-md shadow-sigap-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" /> Tambah Transaksi
          </Button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Mutasi Masuk</div>
            <div className="text-2xl font-display font-extrabold text-emerald-600 mt-1">
              +{formatCurrency(totalIncome)}
            </div>
            <div className="text-xs text-slate-500 mt-1">Dari penjualan & transfer modal</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Mutasi Keluar</div>
            <div className="text-2xl font-display font-extrabold text-rose-600 mt-1">
              -{formatCurrency(totalExpense)}
            </div>
            <div className="text-xs text-slate-500 mt-1">Bahan baku & operasional kedai</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Arus Kas Bersih (Net)</div>
            <div className="text-2xl font-display font-extrabold text-sigap-darkest mt-1">
              +{formatCurrency(totalIncome - totalExpense)}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">Kondisi Surplus Positif</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sigap-soft/20 text-sigap-primary flex items-center justify-center">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari transaksi berdasarkan deskripsi, kanal (BCA, QRIS, GoPay)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sigap-primary text-sm"
            />
          </div>

          {/* Type Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === 'all' ? 'bg-white shadow text-sigap-darkest font-bold' : 'text-slate-600 hover:text-sigap-darkest'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedType('income')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === 'income' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              Pemasukan
            </button>
            <button
              onClick={() => setSelectedType('expense')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === 'expense' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              Pengeluaran
            </button>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Kategori:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                selectedCategory === cat 
                  ? 'bg-sigap-darkest text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Tanggal & Waktu</th>
                <th className="px-6 py-4">Deskripsi Transaksi</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Metode / Sumber</th>
                <th className="px-6 py-4 text-right">Jumlah</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((trx) => {
                const isInc = trx.type === 'income';
                return (
                  <tr key={trx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                      {new Date(trx.datetime).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                      <span className="block text-[11px] text-slate-400">
                        {new Date(trx.datetime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-sigap-darkest">
                      {trx.description}
                      <span className="block text-[11px] font-mono text-slate-400 font-normal">
                        ID: {trx.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {trx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-sigap-primary border border-blue-100">
                        {trx.source}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right font-display font-extrabold text-base ${
                      isInc ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {isInc ? '+' : '-'}{formatCurrency(trx.amount)}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Berhasil
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Tidak ada transaksi yang cocok dengan filter pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-display font-bold text-sigap-darkest">Catat Transaksi Manual</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Tipe Transaksi</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'income', category: 'Pendapatan Usaha' })}
                      className={`py-2.5 rounded-2xl font-bold text-sm border transition-all ${
                        formData.type === 'income' 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      + Pemasukan
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'expense', category: 'Bahan Baku' })}
                      className={`py-2.5 rounded-2xl font-bold text-sm border transition-all ${
                        formData.type === 'expense' 
                          ? 'bg-rose-600 text-white border-rose-600 shadow-md' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      - Pengeluaran
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Deskripsi Transaksi</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Contoh: Penjualan QRIS Meja 5 atau Pembelian Es Batu"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Nominal (Rupiah)</label>
                  <input 
                    type="number" 
                    required 
                    min="1000"
                    placeholder="Contoh: 150000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none bg-white"
                    >
                      {formData.type === 'income' ? (
                        <>
                          <option value="Pendapatan Usaha">Pendapatan Usaha</option>
                          <option value="Transfer Masuk">Transfer Masuk</option>
                          <option value="Pendapatan Lain">Pendapatan Lain</option>
                        </>
                      ) : (
                        <>
                          <option value="Bahan Baku">Bahan Baku</option>
                          <option value="Operasional">Operasional</option>
                          <option value="Gaji Staf">Gaji Staf</option>
                          <option value="Utilitas">Utilitas</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Metode / Sumber</label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none bg-white"
                    >
                      <option value="QRIS">QRIS</option>
                      <option value="BCA Demo">BCA Demo</option>
                      <option value="GoPay Demo">GoPay Demo</option>
                      <option value="Tunai Demo">Tunai Demo</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 rounded-2xl"
                  >
                    Batal
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold rounded-2xl"
                  >
                    Simpan Transaksi
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
