"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import { FileText, Upload, CheckCircle2, AlertCircle, Clock, Search, Filter } from 'lucide-react';

export default function DocumentsPage() {
  const { data, updateData } = useDemo();
  const documents = data.documents;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filteredDocs = documents.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'Semua' ? true : doc.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'verified':
        return <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Terverifikasi</span>;
      case 'pending_review':
        return <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> Menunggu Review</span>;
      default:
        return <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Belum Diunggah</span>;
    }
  };

  const handleUploadDemo = () => {
    alert("Simulasi: File explorer akan terbuka di aplikasi nyata.");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dokumen Usaha</h2>
          <p className="text-muted-foreground mt-1">Kelola dokumen legalitas untuk keperluan pembiayaan.</p>
        </div>
        <Button onClick={handleUploadDemo} className="bg-sigap-primary text-white hover:bg-sigap-primary/90">
          <Upload className="w-4 h-4 mr-2" />
          Unggah Dokumen Baru
        </Button>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-semibold text-lg text-sigap-darkest">Daftar Dokumen</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari dokumen..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm outline-none bg-white focus:ring-2 focus:ring-sigap-primary"
            >
              <option value="Semua">Semua Status</option>
              <option value="verified">Terverifikasi</option>
              <option value="pending_review">Menunggu Review</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Nama Dokumen</th>
                <th className="px-6 py-3 font-medium">Status Verifikasi (Demo)</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-sigap-darkest flex items-center gap-3">
                    <div className="p-2 bg-sigap-primary/10 text-sigap-primary rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    {doc.name}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" onClick={() => alert("Simulasi preview dokumen.")}>
                      Lihat
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredDocs.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                    Tidak ada dokumen yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
