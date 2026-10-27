"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';
import { Building, Plus, Settings, Power, PowerOff, Edit } from 'lucide-react';

export default function ProductsPage() {
  const { data, updateData } = useLenderDemo();
  const products = data.financing_products;

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const formatCurrency = (amount: number) => {
    if (amount >= 1e9) return `Rp ${(amount / 1e9).toFixed(1)} Miliar`;
    if (amount >= 1e6) return `Rp ${(amount / 1e6).toFixed(0)} Juta`;
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const toggleProductStatus = (productId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Aktif' ? 'Nonaktif' : 'Aktif';
    updateData(prev => ({
      ...prev,
      financing_products: prev.financing_products.map((p: any) => 
        p.id === productId ? { ...p, status: newStatus } : p
      )
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Produk Pembiayaan</h2>
          <p className="text-muted-foreground mt-1">Kelola katalog produk yang ditawarkan ke UMKM melalui SIGAP.</p>
        </div>
        <Button className="bg-sigap-primary" onClick={() => alert("Simulasi: Form tambah produk baru.")}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Produk Baru
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md">
            <div className={`h-2 w-full ${product.status === 'Aktif' ? 'bg-green-500' : 'bg-gray-300'}`} />
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs text-muted-foreground font-mono mb-1">{product.id}</div>
                  <h3 className="font-bold text-lg text-sigap-darkest leading-tight">{product.name}</h3>
                </div>
                <div className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                  product.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {product.status}
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground block">Plafon Max</span>
                    <span className="font-medium">{formatCurrency(product.max_plafon)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Suku Bunga</span>
                    <span className="font-medium">{product.interest_rate}% / thn</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-xs text-muted-foreground block mb-1">Syarat Minimum (Filter Otomatis)</span>
                  <div className="bg-gray-50 border rounded-lg p-3 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Skor SIGAP Min.</span>
                      <span className="font-bold text-sigap-darkest">{product.requirements.min_score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Lama Usaha Min.</span>
                      <span className="font-medium">{product.requirements.min_business_age_months} Bulan</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 text-xs" 
                  onClick={() => toggleProductStatus(product.id, product.status)}
                >
                  {product.status === 'Aktif' ? (
                    <><PowerOff className="w-3 h-3 mr-2" /> Nonaktifkan</>
                  ) : (
                    <><Power className="w-3 h-3 mr-2" /> Aktifkan</>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 text-xs text-sigap-primary border-sigap-primary hover:bg-sigap-primary hover:text-white"
                  onClick={() => alert("Simulasi: Edit produk.")}
                >
                  <Edit className="w-3 h-3 mr-2" /> Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
