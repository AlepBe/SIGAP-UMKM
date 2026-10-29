"use client";

import { Button } from '@/components/ui/button';
import { publicDemoData } from '@/lib/public-demo-data';
import { Activity,ChevronDown,DollarSign,Info,Search,ShieldCheck,TrendingDown,TrendingUp,X } from 'lucide-react';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import { Area,AreaChart,CartesianGrid,ResponsiveContainer,Tooltip,XAxis,YAxis } from 'recharts';

export function InteractiveDemo() {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<"7 Hari" | "30 Hari" | "3 Bulan">("30 Hari");
  const [search, setSearch] = useState("");
  const [txFilter, setTxFilter] = useState<"Semua" | "Pemasukan" | "Pengeluaran">("Semua");
  const [txSort, setTxSort] = useState<"Terbaru" | "Terbesar">("Terbaru");
  
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedFinancing, setSelectedFinancing] = useState<typeof publicDemoData.financingProducts[0] | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-white">
        <div className="w-8 h-8 border-4 border-sigap-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>Memuat data demo...</p>
      </div>
    );
  }

  // Filter & Sort Transactions
  let filteredTx = publicDemoData.transactions.filter(tx => {
    if (txFilter === "Pemasukan" && tx.type !== "income") return false;
    if (txFilter === "Pengeluaran" && tx.type !== "expense") return false;
    if (search && !tx.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (txSort === "Terbaru") {
    filteredTx = filteredTx.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else {
    filteredTx = filteredTx.sort((a, b) => b.amount - a.amount);
  }

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="rounded-lg bg-background text-foreground shadow-sm overflow-hidden border">
      {/* Mock Browser Header */}
      <div className="flex items-center px-4 py-3 border-b bg-muted/30">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-amber-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-auto bg-white border px-4 py-1 rounded-md text-xs text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="w-3 h-3 text-green-500" /> app.sigap.id/dashboard
        </div>
      </div>

      {/* Demo App Header */}
      <div className="px-4 sm:px-6 py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-sigap-darkest">Dashboard Demo</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{publicDemoData.business.name} • Simulasi data usaha</p>
        </div>
        <div className="bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
          DATA DEMO
        </div>
      </div>

      <div className="p-3 sm:p-6 bg-slate-50">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3 text-muted-foreground text-sm mb-2">
              <DollarSign className="w-4 h-4" /> Total Saldo
            </div>
            <div className="text-2xl font-bold text-sigap-darkest">{formatIDR(publicDemoData.metrics.totalBalance)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3 text-muted-foreground text-sm mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" /> Pemasukan Bulan Ini
            </div>
            <div className="text-2xl font-bold text-green-600">{formatIDR(publicDemoData.metrics.incomeThisMonth)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3 text-muted-foreground text-sm mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" /> Pengeluaran Bulan Ini
            </div>
            <div className="text-2xl font-bold text-red-600">{formatIDR(publicDemoData.metrics.expenseThisMonth)}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3 text-muted-foreground text-sm mb-2">
              <Activity className="w-4 h-4 text-blue-500" /> Laba Bersih
            </div>
            <div className="text-2xl font-bold text-blue-600">{formatIDR(publicDemoData.metrics.netProfit)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chart */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-sigap-darkest">Arus Kas</h3>
                <select 
                  className="text-sm border rounded-md px-3 py-1.5 outline-none bg-white"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                >
                  <option value="7 Hari">7 Hari</option>
                  <option value="30 Hari">30 Hari</option>
                  <option value="3 Bulan">3 Bulan</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={publicDemoData.cashflow[period]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(value) => `${value / 1000}k`} />
                    <Tooltip formatter={(value: number) => formatIDR(value)} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="income" name="Pemasukan" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                    <Area type="monotone" dataKey="expense" name="Pengeluaran" stroke="#dc2626" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="font-semibold text-sigap-darkest">Transaksi Terbaru</h3>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none sm:w-48">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Cari transaksi..." 
                      className="w-full text-sm border rounded-md pl-9 pr-3 py-1.5 outline-none focus:border-sigap-primary"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <select 
                    className="text-sm border rounded-md px-3 py-1.5 outline-none bg-white flex-1 sm:flex-none"
                    value={txFilter}
                    onChange={(e) => setTxFilter(e.target.value as any)}
                  >
                    <option value="Semua">Semua</option>
                    <option value="Pemasukan">Pemasukan</option>
                    <option value="Pengeluaran">Pengeluaran</option>
                  </select>
                  <select 
                    className="text-sm border rounded-md px-3 py-1.5 outline-none bg-white flex-1 sm:flex-none"
                    value={txSort}
                    onChange={(e) => setTxSort(e.target.value as any)}
                  >
                    <option value="Terbaru">Terbaru</option>
                    <option value="Terbesar">Nominal Terbesar</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {filteredTx.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Data demo tidak ditemukan.
                    <br/>
                    <button onClick={() => {setSearch(""); setTxFilter("Semua");}} className="text-sigap-primary text-sm mt-2">Ganti Filter</button>
                  </div>
                ) : (
                  filteredTx.slice(0, 8).map(tx => (
                    <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {tx.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-sigap-darkest">{tx.description}</p>
                          <p className="text-xs text-muted-foreground">{tx.date} • {tx.category}</p>
                        </div>
                      </div>
                      <div className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatIDR(tx.amount)}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 pt-4 border-t text-center">
                <Link href="/register">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Sign Up untuk mengelola transaksi Anda sendiri
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Score */}
            <div className="bg-white p-6 rounded-xl border shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg">SIMULASI</div>
              <h3 className="font-semibold text-sigap-darkest mb-4">Skor SIGAP</h3>
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 relative flex items-center justify-center mb-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * (publicDemoData.score.value / publicDemoData.score.max))} strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-bold text-sigap-darkest">{publicDemoData.score.value}</span>
                    <span className="text-xs text-muted-foreground block">/ {publicDemoData.score.max}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-sm">Grade {publicDemoData.score.grade}</span>
                  <span className="text-sm font-medium text-sigap-darkest">{publicDemoData.score.label}</span>
                </div>
              </div>
              <Button onClick={() => setShowScoreModal(true)} variant="outline" className="w-full">
                Lihat Cara Kerja Skor
              </Button>
            </div>

            {/* Financing Products */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-sigap-darkest">Pembiayaan</h3>
                <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">DEMO</span>
              </div>
              <div className="space-y-3">
                {publicDemoData.financingProducts.map(product => (
                  <div key={product.id} className="p-3 border rounded-lg hover:border-sigap-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedFinancing(product)}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm text-sigap-darkest">{product.name}</h4>
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded whitespace-nowrap">{product.profileMatching}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Plafon: {product.ceiling}</p>
                    <div className="flex items-center text-xs text-sigap-primary font-medium">
                      Lihat Detail <ChevronDown className="w-3 h-3 ml-1 -rotate-90" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showScoreModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg text-sigap-darkest">Cara Kerja Skor SIGAP</h3>
              <button onClick={() => setShowScoreModal(false)} className="text-muted-foreground hover:text-sigap-darkest p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg flex gap-2">
                <Info className="w-5 h-5 shrink-0" />
                <p>Skor ini adalah representasi kesehatan finansial usaha Anda. Data ini disimulasikan untuk kebutuhan demo.</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Faktor Penilaian:</h4>
                <div className="space-y-3">
                  {publicDemoData.score.factors.map((factor, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-sigap-darkest">{factor.name}</p>
                        <p className="text-xs text-muted-foreground">{factor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 text-center">
              <Button onClick={() => setShowScoreModal(false)} className="w-full">Tutup</Button>
            </div>
          </div>
        </div>
      )}

      {selectedFinancing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full mb-1 inline-block">DATA DEMO</span>
                <h3 className="font-bold text-lg text-sigap-darkest">{selectedFinancing.name}</h3>
              </div>
              <button onClick={() => setSelectedFinancing(null)} className="text-muted-foreground hover:text-sigap-darkest p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Plafon Maksimal</p>
                  <p className="font-semibold text-sm text-sigap-darkest">{selectedFinancing.ceiling}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tenor</p>
                  <p className="font-semibold text-sm text-sigap-darkest">{selectedFinancing.tenor}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Estimasi Biaya</p>
                  <p className="font-semibold text-sm text-sigap-darkest">{selectedFinancing.cost}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Agunan</p>
                  <p className="font-semibold text-sm text-sigap-darkest">{selectedFinancing.collateral}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-800 font-medium">Tingkat Kecocokan: <span className="font-bold">{selectedFinancing.profileMatching}</span></p>
                <p className="text-xs text-blue-600 mt-1">Berdasarkan profil skor demo Anda, produk ini sangat sesuai dengan kebutuhan usaha Anda.</p>
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 flex gap-3">
              <Button onClick={() => setSelectedFinancing(null)} variant="outline" className="flex-1">Tutup</Button>
              <Link href="/register" className="flex-1 flex" onClick={() => setSelectedFinancing(null)}>
                <Button className="w-full bg-sigap-primary">Ajukan Sekarang</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
