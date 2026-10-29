"use client";


export default function AdminProductsPage() {
  const products = [
    { name: 'KUR Mikro', provider: 'Bank Nusantara Demo', ceiling: 's/d Rp 50 Jt', rate: '6% p.a', segment: 'UMKM Mikro', status: 'Active' },
    { name: 'Invoice Financing', provider: 'Fintech Nusantara Demo', ceiling: 's/d Rp 2 Miliar', rate: 'Mulai 1%/bln', segment: 'B2B & Pengadaan', status: 'Active' },
    { name: 'KUR Kecil', provider: 'Bank Arunika Demo', ceiling: 's/d Rp 500 Jt', rate: '6% p.a', segment: 'UMKM Kecil', status: 'Active' },
    { name: 'Modal Kerja Fleksibel', provider: 'Koperasi Maju Demo', ceiling: 's/d Rp 100 Jt', rate: '0.9%/bln', segment: 'UMKM Berkelanjutan', status: 'Active' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Katalog Produk Pembiayaan</h2>
          <p className="text-muted-foreground mt-1">Daftar produk kredit legal yang ditayangkan di marketplace nasabah.</p>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-left text-sm min-w-[650px]">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b">
            <tr>
              <th className="px-6 py-4">Nama Produk</th>
              <th className="px-6 py-4">Lembaga Penyalur</th>
              <th className="px-6 py-4">Plafon Maksimal</th>
              <th className="px-6 py-4">Estimasi Bunga</th>
              <th className="px-6 py-4">Segmen Debitur</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 font-bold text-gray-900">{p.name}</td>
                <td className="px-6 py-4 text-gray-700">{p.provider}</td>
                <td className="px-6 py-4 font-bold text-sigap-primary">{p.ceiling}</td>
                <td className="px-6 py-4 text-gray-700">{p.rate}</td>
                <td className="px-6 py-4 text-gray-500">{p.segment}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {p.status}
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
