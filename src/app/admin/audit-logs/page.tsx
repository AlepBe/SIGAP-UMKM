"use client";


export default function AdminAuditLogsPage() {
  const logs = [
    { id: 'LOG-8812', timestamp: '2026-09-24 14:32:00', actor: 'Super Admin (OP)', action: 'Verifikasi Dokumen NIB UMKM-001 Disetujui', ip: '103.145.22.10', status: 'SUCCESS' },
    { id: 'LOG-8811', timestamp: '2026-09-24 13:15:00', actor: 'Bank Nusantara Demo', action: 'Penarikan Lead Skor Kategori A (40 UMKM)', ip: '180.252.90.15', status: 'SUCCESS' },
    { id: 'LOG-8810', timestamp: '2026-09-24 11:45:00', actor: 'System ML Engine', action: 'Kalkulasi Ulang Batch Scoring 1,062 Usaha', ip: 'internal-cluster', status: 'SUCCESS' },
    { id: 'LOG-8809', timestamp: '2026-09-24 09:20:00', actor: 'Anonymous IP', action: 'Percobaan Akses Tidak Sah ke Endpoint /api/v1/keys', ip: '45.133.1.20', status: 'BLOCKED' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Platform Audit Logs</h2>
          <p className="text-muted-foreground mt-1">Catatan jejak aktivitas administratif, perubahan konfigurasi, dan keamanan sistem.</p>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[650px]">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b">
            <tr>
              <th className="px-6 py-4">Waktu (WIB)</th>
              <th className="px-6 py-4">Aktor / Pengguna</th>
              <th className="px-6 py-4">Aktivitas Terlacak</th>
              <th className="px-6 py-4">Alamat IP</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50/70 font-mono text-xs">
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                <td className="px-6 py-4 font-bold text-gray-800">{log.actor}</td>
                <td className="px-6 py-4 font-sans text-xs text-gray-700">{log.action}</td>
                <td className="px-6 py-4 text-gray-400">{log.ip}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                    log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
