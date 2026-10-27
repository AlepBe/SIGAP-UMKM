"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';
import { Database, Search, Eye, Filter, ArrowDownWideNarrow } from 'lucide-react';

export default function ApplicantsPage() {
  const { data } = useLenderDemo();
  const profiles = data.umkm_profiles;

  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('score-desc');
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const cities = ['Semua', ...Array.from(new Set(profiles.map(p => p.city)))];

  const filteredAndSorted = useMemo(() => {
    let result = profiles.filter(p => {
      const matchSearch = p.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || p.business_id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCity = cityFilter === 'Semua' ? true : p.city === cityFilter;
      return matchSearch && matchCity;
    });

    result = result.sort((a, b) => {
      if (sortOrder === 'score-desc') return b.score - a.score;
      if (sortOrder === 'score-asc') return a.score - b.score;
      if (sortOrder === 'revenue-desc') return b.monthly_revenue_est - a.monthly_revenue_est;
      return 0;
    });

    return result;
  }, [profiles, searchQuery, cityFilter, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Database UMKM</h2>
          <p className="text-muted-foreground mt-1">Eksplorasi UMKM yang membagikan profil mereka ke jaringan partner.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari ID atau nama usaha..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary"
            />
          </div>
          <select 
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary bg-white"
          >
            {cities.map(city => <option key={city} value={city}>{city === 'Semua' ? 'Semua Kota' : city}</option>)}
          </select>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary bg-white"
          >
            <option value="score-desc">Skor Tertinggi</option>
            <option value="score-asc">Skor Terendah</option>
            <option value="revenue-desc">Omzet Terbesar</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Nama Usaha</th>
                <th className="px-6 py-4 font-medium">Lokasi</th>
                <th className="px-6 py-4 font-medium">Skor / Grade</th>
                <th className="px-6 py-4 font-medium">Omzet (Est)</th>
                <th className="px-6 py-4 font-medium">Cashflow</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAndSorted.map(profile => (
                <tr key={profile.business_id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{profile.business_id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-sigap-darkest">{profile.business_name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{profile.business_type}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{profile.city}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">{profile.score}</span>
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded font-bold">{profile.grade}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(profile.monthly_revenue_est)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${profile.cashflow_status === 'Sehat' ? 'bg-green-100 text-green-800' : profile.cashflow_status === 'Stabil' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                      {profile.cashflow_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" variant="outline" onClick={() => setSelectedProfile(profile)} className="border-sigap-primary text-sigap-primary hover:bg-sigap-primary hover:text-white">
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredAndSorted.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    Tidak ada data UMKM yang sesuai dengan filter/pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">{selectedProfile.business_name}</h3>
                <p className="text-muted-foreground text-sm font-mono mt-1">{selectedProfile.business_id}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedProfile(null)}>Tutup</Button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border text-center">
                  <div className="text-xs text-muted-foreground mb-1">Skor SIGAP</div>
                  <div className="font-bold text-green-600 text-xl">{selectedProfile.score}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border text-center">
                  <div className="text-xs text-muted-foreground mb-1">Grade</div>
                  <div className="font-bold text-green-600 text-xl">{selectedProfile.grade}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border text-center">
                  <div className="text-xs text-muted-foreground mb-1">Status Cashflow</div>
                  <div className={`font-bold text-sm mt-1.5 ${selectedProfile.cashflow_status === 'Sehat' ? 'text-green-600' : 'text-amber-600'}`}>
                    {selectedProfile.cashflow_status}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border text-center">
                  <div className="text-xs text-muted-foreground mb-1">Lama Usaha</div>
                  <div className="font-bold text-lg mt-1">{selectedProfile.years_operating} Thn</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sigap-darkest mb-3 border-b pb-2">Informasi Keuangan (Estimasi Bulanan)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Omzet</span>
                    <div className="font-medium text-lg">{formatCurrency(selectedProfile.monthly_revenue_est)}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Pengeluaran</span>
                    <div className="font-medium text-lg text-red-600">{formatCurrency(selectedProfile.monthly_expense_est)}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Saldo Kas Rata-rata</span>
                    <div className="font-medium text-lg text-green-600">{formatCurrency(selectedProfile.cash_balance_est)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sigap-darkest mb-3 border-b pb-2">Detail Administratif</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Lokasi:</strong> {selectedProfile.city}, {selectedProfile.province}</div>
                  <div><strong>Kategori:</strong> {selectedProfile.business_type}</div>
                  <div><strong>Kelengkapan Profil:</strong> {selectedProfile.profile_completion_pct}%</div>
                  <div><strong>Kelengkapan Dokumen:</strong> {selectedProfile.documents_completion_pct}%</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t bg-gray-50 text-right">
              <Button onClick={() => alert("Simulasi: Mengirim penawaran pembiayaan otomatis ke UMKM (Pre-approved).")} className="bg-sigap-primary">
                Kirim Penawaran Pembiayaan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
