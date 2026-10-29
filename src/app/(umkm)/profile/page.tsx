"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import { useSubscription } from '@/lib/context/SubscriptionContext';
import {
Building2,
CheckCircle2,
Crown,
Edit3,
Loader2,
MapPin,
ShieldCheck,
User
} from 'lucide-react';
import { motion } from 'motion/react';
import React,{ useState } from 'react';

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
    ownerPhone: user.phone,
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
          { ...prev.users[0], name: formData.ownerName, email: formData.ownerEmail, phone: formData.ownerPhone }
        ],
        businesses: [
          { 
            ...prev.businesses[0], 
            name: formData.businessName, 
            business_type: formData.businessCategory, 
            city: formData.businessAddress.split(',')[0] || '', 
            province: formData.businessAddress.split(',')[1]?.trim() || '' 
          }
        ]
      }));
      setIsSaving(false);
      setIsEditing(false);
      showToast('Profil usaha berhasil diperbarui.');
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Toast */}
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 bg-sigap-darkest text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> Identitas Entitas Terdaftar
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Profil Bisnis & Pemilik
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              Kelola data entitas bisnis, legalitas, serta informasi kontak pemilik untuk keperluan integrasi pembiayaan dan sertifikasi OJK.
            </p>
          </div>

          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)} 
              className="bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold px-6 py-2.5 rounded-2xl shadow-lg shadow-sigap-yellow/20 flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit Informasi
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl"
              >
                Batal
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isSaving} 
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl px-6"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Simpan
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Card Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-slate-50/50">
          <div className="w-20 h-20 rounded-3xl bg-sigap-darkest text-sigap-yellow flex items-center justify-center font-display font-extrabold text-3xl shadow-md border border-white/20">
            {business.name.charAt(0)}
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-display font-bold text-sigap-darkest">{business.name}</h2>
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi OJK (Demo)
              </span>
              {subscription.plan === 'premium' && (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <Crown className="w-3.5 h-3.5 text-amber-600" /> Premium Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Bentuk Usaha: <strong>{business.legal_form}</strong> • Kategori: <strong>{business.business_type}</strong> • ID: <span className="font-mono">{business.id}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
          {/* Section 1: Business Details */}
          <div className="space-y-4">
            <h3 className="text-base font-display font-bold text-sigap-darkest flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-4 h-4 text-sigap-primary" /> Informasi Usaha
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Nama Usaha</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sigap-primary outline-none" 
                  />
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl text-sm font-semibold text-sigap-darkest">{business.name}</div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Jenis / Sektor Usaha</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.businessCategory}
                    onChange={(e) => setFormData({...formData, businessCategory: e.target.value})}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sigap-primary outline-none" 
                  />
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl text-sm font-semibold text-sigap-darkest">{business.business_type}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Domisili & Kota Usaha
                </label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sigap-primary outline-none" 
                  />
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl text-sm font-semibold text-sigap-darkest">
                    {business.city}, {business.province}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Owner Info */}
          <div className="space-y-4">
            <h3 className="text-base font-display font-bold text-sigap-darkest flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-sigap-primary" /> Identitas Pemilik
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Nama Lengkap</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sigap-primary outline-none" 
                  />
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl text-sm font-semibold text-sigap-darkest">{user.name}</div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Email Terdaftar</label>
                {isEditing ? (
                  <input 
                    type="email" 
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sigap-primary outline-none" 
                  />
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl text-sm font-semibold text-sigap-darkest">{user.email}</div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">No. Handphone / WhatsApp</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sigap-primary outline-none" 
                  />
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl text-sm font-semibold text-sigap-darkest">{user.phone}</div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
