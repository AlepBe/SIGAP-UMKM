"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ArrowDownRight, ArrowUpRight, Download, Filter, Search, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { useDemo } from "@/lib/context/DemoContext";

export default function BookkeepingPage() {
  const { data, updateData } = useDemo();
  const transactions = data.transactions;
  const metrics = data.dashboard.metrics;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<any>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
      const matchType = filterType === 'Semua' ? true : (filterType === 'Pemasukan' ? t.type === 'income' : t.type === 'expense');
      return matchSearch && matchType;
    }).sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
  }, [transactions, searchQuery, filterType]);

  const handleOpenAdd = () => {
    setTransactionToEdit(null);
    setFormData({
      type: 'income',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      source: '',
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
        const newAmount = parseInt(formData.amount);
        
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
        
        // Recalculate basic metrics
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
              total_balance: prev.dashboard.metrics.total_balance + (formData.type === 'income' ? newAmount : -newAmount) // Rough approx for demo
            }
          }
        };
      });

      setIsLoading(false);
      setIsModalOpen(false);
      showToast(transactionToEdit ? "Transaksi berhasil diperbarui." : "Transaksi berhasil ditambahkan.");
    }, 800);
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
    }, 800);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-sigap-darkest">Pembukuan Digital</h2>
          <p className="text-muted-foreground">Kelola arus kas, transaksi harian, dan laporan keuangan.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white" onClick={() => showToast("Fitur unduh (CSV) disimulasikan.")}>
            <Download className="w-4 h-4 mr-2" />
            Unduh Laporan
          </Button>
          <Button className="bg-sigap-primary text-white hover:bg-sigap-primary/90" onClick={handleOpenAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Catat Transaksi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Total Saldo Bank & Kas</div>
            <div className="text-3xl font-bold text-sigap-darkest">{formatCurrency(metrics.total_balance)}</div>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="text-xs font-medium px-2 py-1 bg-sigap-primary/10 text-sigap-primary rounded-md">BCA: {formatCurrency(data.businesses[0].bank_balance_est)}</span>
            <span className="text-xs font-medium px-2 py-1 bg-sigap-primary/10 text-sigap-primary rounded-md">QRIS: {formatCurrency(data.businesses[0].wallet_balance_est)}</span>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-medium text-muted-foreground">Pemasukan (Semua)</div>
            <div className="p-1.5 bg-green-100 text-green-700 rounded-md"><ArrowUpRight className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-sigap-darkest mb-1">{formatCurrency(metrics.income_this_month)}</div>
          <div className="text-xs text-muted-foreground">{metrics.income_change_pct > 0 ? '+' : ''}{metrics.income_change_pct}% dari bulan lalu</div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-medium text-muted-foreground">Pengeluaran (Semua)</div>
            <div className="p-1.5 bg-red-100 text-red-700 rounded-md"><ArrowDownRight className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-bold text-sigap-darkest mb-1">{formatCurrency(metrics.expense_this_month)}</div>
          <div className="text-xs text-muted-foreground">{metrics.expense_change_pct > 0 ? '+' : ''}{metrics.expense_change_pct}% dari bulan lalu</div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="font-semibold text-lg text-sigap-darkest">Riwayat Transaksi</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari transaksi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary"
              />
            </div>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm outline-none bg-white focus:ring-2 focus:ring-sigap-primary"
            >
              <option value="Semua">Semua</option>
              <option value="Pemasukan">Pemasukan</option>
              <option value="Pengeluaran">Pengeluaran</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Tanggal</th>
                <th className="px-6 py-3 font-medium">Deskripsi</th>
                <th className="px-6 py-3 font-medium">Kategori</th>
                <th className="px-6 py-3 font-medium">Sumber</th>
                <th className="px-6 py-3 font-medium text-right">Jumlah</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {new Date(t.datetime).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 font-medium text-sigap-darkest">{t.description}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground">{t.category}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{t.source}</td>
                    <td className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${t.type === 'income' ? 'text-green-600' : 'text-sigap-darkest'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenEdit(t)} className="p-1 text-muted-foreground hover:text-sigap-primary transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { setTransactionToDelete(t.id); setIsDeleteModalOpen(true); }}
                          className="p-1 text-muted-foreground hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Tidak ada transaksi yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">{transactionToEdit ? 'Edit Transaksi' : 'Catat Transaksi'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form id="txForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Transaksi *</label>
                    <select 
                      name="type" 
                      value={formData.type} 
                      onChange={(e) => setFormData({...formData, type: e.target.value})} 
                      className="w-full p-2.5 border rounded-lg outline-none bg-white"
                      required
                    >
                      <option value="income">Pemasukan</option>
                      <option value="expense">Pengeluaran</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal *</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full p-2.5 border rounded-lg outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nominal *</label>
                  <input 
                    type="number" 
                    required 
                    min="1"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="Contoh: 150000"
                    className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-sigap-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="Misal: Operasional"
                      className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-sigap-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sumber *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      placeholder="Misal: BCA Demo"
                      className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-sigap-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Deskripsi transaksi"
                    className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-sigap-primary"
                  />
                </div>
              </form>
            </div>
            <div className="p-4 border-t flex justify-end gap-2 bg-gray-50">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button type="submit" form="txForm" disabled={isLoading} className="bg-sigap-primary text-white hover:bg-sigap-primary/90">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Simpan Transaksi
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Transaksi?</h3>
              <p className="text-sm text-gray-500 mb-6">Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini akan memperbarui saldo Anda.</p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>Batal</Button>
                <Button variant="destructive" className="flex-1" onClick={confirmDelete} disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
