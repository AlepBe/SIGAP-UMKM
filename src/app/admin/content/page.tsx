"use client";


export default function AdminContentPage() {
  const modules = [
    { id: 'LIT-001', title: 'Pemisahan Rekening Pribadi & Usaha', category: 'Dasar Keuangan', readers: '1,420 UMKM', status: 'Published' },
    { id: 'LIT-002', title: 'Mengenali Pinjaman Legal dan Ilegal', category: 'Keamanan OJK', readers: '2,150 UMKM', status: 'Published' },
    { id: 'LIT-003', title: 'Memahami Bunga & Tenor', category: 'Pembiayaan', readers: '980 UMKM', status: 'Published' },
    { id: 'LIT-004', title: 'Strategi Harga & Margin', category: 'Operasional', readers: '840 UMKM', status: 'Published' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Konten Akademi Literasi</h2>
          <p className="text-muted-foreground mt-1">Daftar kurikulum modul edukasi finansial untuk para pelaku UMKM.</p>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-left text-sm min-w-[650px]">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b">
            <tr>
              <th className="px-6 py-4">Judul Modul</th>
              <th className="px-6 py-4">Kategori Kurikulum</th>
              <th className="px-6 py-4">Jumlah Pembaca</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {modules.map(m => (
              <tr key={m.id} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 font-bold text-gray-900">{m.title}</td>
                <td className="px-6 py-4 text-gray-600">{m.category}</td>
                <td className="px-6 py-4 font-semibold text-sigap-primary">{m.readers}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
