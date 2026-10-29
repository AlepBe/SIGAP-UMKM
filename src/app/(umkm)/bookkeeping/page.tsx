"use client";

import {
Button
} from "@/components/ui/button";
import { useDemo } from "@/lib/context/DemoContext";
import {
ArrowDownRight,ArrowUpRight,
BarChart2,
Building2,CheckCircle2,
Download,
Edit2,
Loader2,
Plus,
Search,
Trash2,
TrendingUp,
Wallet,
X
} from "lucide-react";
import { AnimatePresence,motion } from "motion/react";
import Link from 'next/link';
import React,{ useEffect,useMemo,useState } from 'react';
import {
Bar,
BarChart,
CartesianGrid,
ResponsiveContainer,
Tooltip,
XAxis,YAxis
} from 'recharts';

export default function BookkeepingPage() {
  const { data, updateData } = useDemo();
  const transactions = data.transactions;
  const metrics = data.dashboard.metrics;

  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'Semua' | 'income' | 'expense'>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<string | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'table' | 'breakdown'>('table');

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    source: '',
    description: ''
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.source.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'Semua' ? true : t.type === filterType;
      return matchSearch && matchType;
    }).sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
  }, [transactions, searchQuery, filterType]);

  // Aggregate category breakdown for Recharts
  const categoryChartData = useMemo(() => {
    const map: Record<string, { name: string; income: number; expense: number; total: number }> = {};
    transactions.forEach(t => {
      const cat = t.category || 'Lain-lain';
      if (!map[cat]) map[cat] = { name: cat, income: 0, expense: 0, total: 0 };
      if (t.type === 'income') map[cat].income += t.amount;
      else map[cat].expense += t.amount;
      map[cat].total += t.amount;
    });
    return Object.values(map);
  }, [transactions]);

  const handleOpenAdd = () => {
    setTransactionToEdit(null);
    setFormData({
      type: 'income',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Pendapatan Usaha',
      source: 'QRIS',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: any) => {
    setTransactionToEdit(t.id);
    setFormData({
      type: t.type,
      amount: t.amount.toString(),
      date: t.datetime.split('T')[0],
      category: t.category,
      source: t.source,
      description: t.description
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      updateData(prev => {
        let newTransactions = [...prev.transactions];
        const newAmount = parseInt(formData.amount) || 0;
        
        if (transactionToEdit) {
          const index = newTransactions.findIndex(t => t.id === transactionToEdit);
          if (index !== -1) {
            newTransactions[index] = {
              ...newTransactions[index],
              ...formData,
              amount: newAmount,
              datetime: `${formData.date}T12:00:00+07:00`
            };
          }
        } else {
          newTransactions.push({
            id: `TRX-${Date.now()}`,
            datetime: `${formData.date}T12:00:00+07:00`,
            description: formData.description,
            category: formData.category,
            source: formData.source,
            type: formData.type as 'income' | 'expense',
            amount: newAmount,
            status: 'posted'
          });
        }
        
        const totalIncome = newTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
        const totalExpense = newTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
        const netProfit = totalIncome - totalExpense;

        return {
          ...prev,
          transactions: newTransactions,
          dashboard: {
            ...prev.dashboard,
            metrics: {
              ...prev.dashboard.metrics,
              income_this_month: totalIncome,
              expense_this_month: totalExpense,
              net_profit: netProfit,
              total_balance: prev.dashboard.metrics.total_balance + (formData.type === 'income' ? newAmount : -newAmount)
            }
          }
        };
      });

      setIsLoading(false);
      setIsModalOpen(false);
      showToast(transactionToEdit ? "Transaksi berhasil diperbarui." : "Transaksi baru berhasil dicatat.");
    }, 600);
  };

  const confirmDelete = () => {
    if (!transactionToDelete) return;
    setIsLoading(true);
    
    setTimeout(() => {
      updateData(prev => ({
        ...prev,
        transactions: prev.transactions.filter(t => t.id !== transactionToDelete)
      }));
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setTransactionToDelete(null);
      showToast("Transaksi berhasil dihapus.");
    }, 600);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 text-white px-5 py-3 shadow-xl text-sm font-semibold"
          >
            <CheckCircle2 className="w-5 h-5" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sigap-light/50 px-3 py-1 text-xs font-bold text-sigap-darkest mb-3 border border-sigap-primary/20">
            <Wallet className="h-3.5 w-3.5 text-sigap-primary" />
            Buku Kas Terintegrasi
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-sigap-darkest">
            Pembukuan Kas Digital
          </h2>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed max-w-xl">
            Catat arus kas harian dan kelompokkan pos biaya secara rapi untuk menghasilkan laporan siap audit bank.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/bookkeeping/reports">
            <Button variant="outline" className="rounded-full border-slate-200 text-sigap-darkest hover:bg-slate-50 text-xs font-bold h-11 px-5">
              <Download className="w-4 h-4 mr-2 text-sigap-primary" />
              Laporan Laba Rugi
            </Button>
          </Link>
          <Button onClick={handleOpenAdd} className="rounded-full bg-sigap-darkest hover:bg-sigap-dark text-white font-bold text-xs h-11 px-6 shadow-md transition-transform hover:scale-105">
            <Plus className="w-4 h-4 mr-1.5" />
            Catat Transaksi
          </Button>
        </div>
      </motion.div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div 
          whileHover={{ y: -3 }}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Kas Tersedia</span>
            <div className="font-display text-3xl font-extrabold text-sigap-darkest mt-1">
              {formatCurrency(metrics.total_balance)}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            <span className="text-xs font-semibold px-2.5 py-1 bg-sigap-light/30 text-sigap-darkest rounded-xl border border-sigap-primary/20">
              BCA: {formatCurrency(data.businesses[0].bank_balance_est)}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-sigap-light/30 text-sigap-darkest rounded-xl border border-sigap-primary/20">
              QRIS: {formatCurrency(data.businesses[0].wallet_balance_est)}
            </span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -3 }}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pemasukan</span>
              <div className="font-display text-3xl font-extrabold text-emerald-600 mt-1">
                {formatCurrency(metrics.income_this_month)}
              </div>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-bold pt-3 border-t border-slate-100">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+{metrics.income_change_pct}% pertumbuhan omzet</span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -3 }}
          className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pengeluaran</span>
              <div className="font-display text-3xl font-extrabold text-slate-700 mt-1">
                {formatCurrency(metrics.expense_this_month)}
              </div>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <ArrowDownRight className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-medium pt-3 border-t border-slate-100">
            <span>Efisiensi Biaya</span>
            <span className="font-bold text-emerald-600">Hemat {Math.abs(metrics.expense_change_pct)}%</span>
          </div>
        </motion.div>
      </div>

      {/* Main View: Category Breakdown vs Transaction Table */}
      <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        {/* Subheader Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('table')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'table' 
                  ? 'bg-sigap-darkest text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:text-sigap-darkest'
              }`}
            >
              Daftar Transaksi ({filteredTransactions.length})
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'breakdown' 
                  ? 'bg-sigap-darkest text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:text-sigap-darkest'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Komposisi Kategori
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari transaksi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sigap-primary"
              />
            </div>

            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              {[
                { label: 'Semua', val: 'Semua' },
                { label: 'Pemasukan', val: 'income' },
                { label: 'Pengeluaran', val: 'expense' }
              ].map(f => (
                <button
                  key={f.val}
                  onClick={() => setFilterType(f.val as any)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    filterType === f.val 
                      ? 'bg-white text-sigap-darkest font-bold shadow-xs' 
                      : 'text-slate-500 hover:text-sigap-darkest'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab 1: Category Breakdown Recharts */}
        {activeTab === 'breakdown' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-display text-lg font-bold text-sigap-darkest">Rincian Per Kategori</h3>
                <p className="text-xs text-slate-400">Distribusi nilai pemasukan dan beban berdasarkan pos pencatatan.</p>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={8} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(val: number) => [formatCurrency(val), ""]}
                      contentStyle={{ backgroundColor: '#000F22', borderRadius: '16px', border: 'none', color: '#fff' }}
                    />
                    <Bar dataKey="income" name="Pemasukan" fill="#10b981" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="expense" name="Pengeluaran" fill="#3F6593" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              {categoryChartData.map(c => (
                <div key={c.name} className="rounded-2xl border border-slate-100 p-3 bg-slate-50/50">
                  <span className="text-[11px] font-bold text-slate-500 block truncate">{c.name}</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-sm text-sigap-darkest">
                      {formatCurrency(c.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Transaction Table */}
        {activeTab === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Deskripsi Transaksi</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Kanal / Sumber</th>
                  <th className="px-6 py-4 text-right">Nominal</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                        {new Date(t.datetime).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 font-bold text-sigap-darkest">{t.description}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {t.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-slate-400" />
                          {t.source}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right font-display font-extrabold whitespace-nowrap text-sm ${
                        t.type === 'income' ? 'text-emerald-600' : 'text-slate-800'
                      }`}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button 
                            onClick={() => handleOpenEdit(t)} 
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-sigap-primary transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => { setTransactionToDelete(t.id); setIsDeleteModalOpen(true); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Tidak ada transaksi yang cocok dengan filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sigap-darkest/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <h3 className="font-display font-bold text-lg text-sigap-darkest">
                {transactionToEdit ? 'Edit Catatan Kas' : 'Catat Transaksi Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-sigap-darkest transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="txForm" onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Tipe Transaksi *</label>
                    <select 
                      value={formData.type} 
                      onChange={(e) => setFormData({...formData, type: e.target.value})} 
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none bg-white font-medium focus:ring-2 focus:ring-sigap-primary"
                    >
                      <option value="income">Pemasukan (+)</option>
                      <option value="expense">Pengeluaran (-)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Tanggal *</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none font-medium focus:ring-2 focus:ring-sigap-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Nominal (Rupiah) *</label>
                  <input 
                    type="number" 
                    required 
                    min="1"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="Contoh: 250000"
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none font-display text-sm font-bold focus:ring-2 focus:ring-sigap-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Kategori *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="Misal: Bahan Baku, Operasional"
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none font-medium focus:ring-2 focus:ring-sigap-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Sumber / Kanal *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      placeholder="Misal: QRIS, BCA, Tunai"
                      className="w-full p-2.5 rounded-xl border border-slate-200 outline-none font-medium focus:ring-2 focus:ring-sigap-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Keterangan / Catatan *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Contoh: Pembelian 10kg Kopi Robusta"
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none font-medium focus:ring-2 focus:ring-sigap-primary"
                  />
                </div>
              </form>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end gap-2.5 bg-slate-50/50">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-full text-xs">
                Batal
              </Button>
              <Button type="submit" form="txForm" disabled={isLoading} className="rounded-full bg-sigap-darkest hover:bg-sigap-dark text-white text-xs font-bold px-6">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Simpan Transaksi
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sigap-darkest/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl p-6 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-sigap-darkest mb-1.5">Hapus Transaksi?</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Catatan transaksi ini akan dihapus dan metrik laba rugi serta saldo kas akan diperbarui secara otomatis.
            </p>
            <div className="flex gap-2.5">
              <Button variant="outline" className="flex-1 rounded-full text-xs" onClick={() => setIsDeleteModalOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" className="flex-1 rounded-full text-xs font-bold" onClick={confirmDelete} disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
                Hapus
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

