"use client";


export default function AdminComplaintsPage() {
  const complaints = [
    { id: 'TIK-9821', user: 'Budi Santoso', category: 'Pembukuan', subject: 'Mutasi QRIS meja 4 belum terupdate', date: '2026-09-24', status: 'Resolved' },
    { id: 'TIK-9820', user: 'Rina Sugiarto', category: 'Skor Kredit', subject: 'Penjelasan perhitungan margin bulanan', date: '2026-09-23', status: 'In Progress' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pusat Tiket Pengaduan Layanan</h2>
          <p className="text-muted-foreground mt-1">Layanan konsumen dan eskalasi kendala teknis pengguna UMKM.</p>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-left text-sm min-w-[650px]">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b">
            <tr>
              <th className="px-6 py-4">Nomor Tiket</th>
              <th className="px-6 py-4">Pengguna</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Subjek Masalah</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {complaints.map(c => (
              <tr key={c.id} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 font-mono font-bold text-gray-900">{c.id}</td>
                <td className="px-6 py-4 text-gray-700">{c.user}</td>
                <td className="px-6 py-4 text-gray-500">{c.category}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{c.subject}</td>
                <td className="px-6 py-4 text-gray-400 text-xs">{c.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {c.status}
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
