"use client";

import { CheckCircle2 } from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    { id: 'USR-001', name: 'Budi Santoso', email: 'budi.demo@sigap.test', role: 'UMKM Owner', business: 'Kedai Kopi Senja', status: 'Active' },
    { id: 'USR-002', name: 'Rina Sugiarto', email: 'rina@majubersama.id', role: 'UMKM Owner', business: 'CV Maju Bersama', status: 'Active' },
    { id: 'USR-003', name: 'Ahmad Fauzi', email: 'ahmad@kelontongberkah.com', role: 'UMKM Owner', business: 'Toko Kelontong Berkah', status: 'Active' },
    { id: 'USR-004', name: 'Admin Partner', email: 'partner@banknusantara.co.id', role: 'Lender Officer', business: 'Bank Nusantara Demo', status: 'Active' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Pengguna Platform</h2>
          <p className="text-muted-foreground mt-1">Daftar akun pemilik usaha UMKM, staf analis lender, dan admin operasional.</p>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b">
            <tr>
              <th className="px-6 py-4">Nama & Email</th>
              <th className="px-6 py-4">Peran Pengguna</th>
              <th className="px-6 py-4">Entitas Terkait</th>
              <th className="px-6 py-4">Status Akun</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {u.name}
                  <span className="block text-xs font-normal text-gray-400">{u.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-sigap-primary">
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{u.business}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
