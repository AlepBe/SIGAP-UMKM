"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import { useSubscription } from '@/lib/context/SubscriptionContext';
import { User, Building2, MapPin, Loader2, CheckCircle2, Crown } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data, updateData } = useDemo();
  const { subscription } = useSubscription();
  const user = data.users[0];
  const business = data.businesses[0];

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState('');

  const [formData, setFormData] = useState({
    ownerName: user.name,
    ownerEmail: user.email,
    businessName: business.name,
    businessCategory: business.business_type,
    businessAddress: `${business.city}, ${business.province}`
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      updateData(prev => ({
        ...prev,
        users: [
          { ...prev.users[0], name: formData.ownerName, email: formData.ownerEmail }
        ],
        businesses: [
          { ...prev.businesses[0], name: formData.businessName, business_type: formData.businessCategory, city: formData.businessAddress.split(',')[0] || '', province: formData.businessAddress.split(',')[1]?.trim() || '' }
        ]
      }));
      setIsSaving(false);
      setIsEditing(false);
      showToast('Profil berhasil diperbarui.');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          {toast}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Profil Usaha</h2>
          <p className="text-muted-foreground mt-1">Kelola informasi entitas bisnis dan identitas pemilik.</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-sigap-primary text-white hover:bg-sigap-primary/90">
            Edit Profil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Batal</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-sigap-primary text-white hover:bg-sigap-primary/90">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Simpan Perubahan
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-gray-50 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-sigap-primary/10 text-sigap-primary flex items-center justify-center font-bold text-2xl uppercase">
            {business.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1 mb-2">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">UMKM Terverifikasi (Demo)</span>
              
              {subscription.plan === 'premium' && subscription.status === 'active' && (
                <Link href="/premium" className="bg-gradient-to-r from-sigap-primary to-indigo-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider hover:opacity-90 flex items-center gap-1 transition-opacity">
                  <Crown className="w-3 h-3" /> PREMIUM
                </Link>
              )}
              {subscription.plan === 'premium' && subscription.status === 'paused' && (
                <Link href="/premium" className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider hover:bg-orange-200 transition-colors">
                  PREMIUM — DIJEDA
                </Link>
              )}
              {subscription.plan === 'free' && (
                <Link href="/premium" className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider hover:bg-gray-300 transition-colors">
                  FREE PLAN
                </Link>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>ID: {business.id}</span>
              <span className="text-gray-300">|</span>
              {subscription.plan === 'premium' && subscription.status === 'active' ? (
                <Link href="/premium" className="text-sigap-primary hover:underline font-medium">Kelola Premium &rarr;</Link>
              ) : subscription.plan === 'premium' && subscription.status === 'paused' ? (
                <Link href="/premium" className="text-orange-600 hover:underline font-medium">Lanjutkan Premium &rarr;</Link>
              ) : (
                <Link href="/premium" className="text-sigap-primary hover:underline font-medium">Upgrade ke Premium &rarr;</Link>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <form id="profileForm" onSubmit={handleSave} className="space-y-8">
            {/* Business Info */}
            <div>
              <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                <Building2 className="w-5 h-5 mr-2 text-sigap-primary" /> Informasi Bisnis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" 
                    />
                  ) : (
                    <div className="p-2.5 bg-gray-50 rounded-lg border border-transparent text-gray-900">{business.name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Usaha</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.businessCategory}
                      onChange={(e) => setFormData({...formData, businessCategory: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" 
                    />
                  ) : (
                    <div className="p-2.5 bg-gray-50 rounded-lg border border-transparent text-gray-900">{business.business_type}</div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" /> Alamat Usaha
                  </label>
                  {isEditing ? (
                    <textarea 
                      value={formData.businessAddress}
                      onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
                      rows={3}
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" 
                    />
                  ) : (
                    <div className="p-2.5 bg-gray-50 rounded-lg border border-transparent text-gray-900 min-h-[80px]">{business.city}, {business.province}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div>
              <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                <User className="w-5 h-5 mr-2 text-sigap-primary" /> Identitas Pemilik
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.ownerName}
                      onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" 
                    />
                  ) : (
                    <div className="p-2.5 bg-gray-50 rounded-lg border border-transparent text-gray-900">{user.name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Pemilik</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={formData.ownerEmail}
                      onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" 
                    />
                  ) : (
                    <div className="p-2.5 bg-gray-50 rounded-lg border border-transparent text-gray-900">{user.email}</div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
