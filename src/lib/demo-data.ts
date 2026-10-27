export const initialDemoData = {
  meta: {
    app: "SIGAP UMKM",
    environment: "demo",
    generated_for: "UI/UX and functional testing",
    warning: "SELURUH DATA DALAM FILE INI ADALAH DUMMY. Jangan digunakan sebagai data OJK, bank, lender, atau nasabah nyata."
  },
  users: [
    {
      id: "USR-001",
      name: "Budi Santoso",
      business_id: "UMKM-001",
      email: "budi.demo@sigap.test",
      phone: "0812-0000-1234",
      role: "umkm_owner",
      profile_completion: 8,
      verified: true,
      notification_unread: 3
    }
  ],
  businesses: [
    {
      id: "UMKM-001",
      owner_id: "USR-001",
      name: "Kedai Kopi Senja",
      legal_form: "Usaha Perseorangan",
      business_type: "F&B",
      city: "Palembang",
      province: "Sumatera Selatan",
      established_date: "2022-03-15",
      monthly_revenue_est: 18250000,
      monthly_expense_est: 12100000,
      cash_balance_est: 24500000,
      bank_balance_est: 15000000,
      wallet_balance_est: 9500000,
      risk_profile: "Moderate",
      profile_status: "Lengkap",
      documents_status: "Lengkap"
    }
  ],
  dashboard: {
    period: "2026-09",
    metrics: {
      total_balance: 24500000,
      income_this_month: 18250000,
      expense_this_month: 12100000,
      net_profit: 6150000,
      income_change_pct: 4.2,
      expense_change_pct: -2.1,
      profit_change_pct: 15.3
    },
    cashflow_30d: [
      { date: "2026-09-01", income: 1450000, expense: 980000 },
      { date: "2026-09-03", income: 1720000, expense: 1050000 },
      { date: "2026-09-05", income: 1380000, expense: 900000 },
      { date: "2026-09-07", income: 1850000, expense: 1120000 },
      { date: "2026-09-09", income: 1600000, expense: 1010000 },
      { date: "2026-09-11", income: 2100000, expense: 1350000 },
      { date: "2026-09-13", income: 1770000, expense: 980000 },
      { date: "2026-09-15", income: 1920000, expense: 1260000 },
      { date: "2026-09-17", income: 2050000, expense: 1160000 },
      { date: "2026-09-19", income: 1860000, expense: 1030000 },
      { date: "2026-09-21", income: 2240000, expense: 1280000 },
      { date: "2026-09-23", income: 2160000, expense: 1190000 }
    ]
  },
  transactions: [
    { id: "TRX-001", datetime: "2026-09-23T14:32:00+07:00", description: "Penjualan QRIS - Meja 4", category: "Pendapatan Usaha", source: "QRIS", type: "income", amount: 125000, status: "posted" },
    { id: "TRX-002", datetime: "2026-09-23T10:15:00+07:00", description: "Pembelian Biji Kopi", category: "Bahan Baku", source: "BCA Demo", type: "expense", amount: 450000, status: "posted" },
    { id: "TRX-003", datetime: "2026-09-22T19:45:00+07:00", description: "Penjualan QRIS - Meja 2", category: "Pendapatan Usaha", source: "QRIS", type: "income", amount: 85000, status: "posted" },
    { id: "TRX-004", datetime: "2026-09-22T09:00:00+07:00", description: "Listrik Bulanan", category: "Operasional", source: "BCA Demo", type: "expense", amount: 1200000, status: "posted" },
    { id: "TRX-005", datetime: "2026-09-21T15:20:00+07:00", description: "Pencairan E-Wallet Demo", category: "Transfer Masuk", source: "GoPay Demo", type: "income", amount: 850000, status: "posted" },
    { id: "TRX-006", datetime: "2026-09-20T11:40:00+07:00", description: "Pembelian Susu & Sirup", category: "Bahan Baku", source: "QRIS", type: "expense", amount: 325000, status: "posted" },
    { id: "TRX-007", datetime: "2026-09-19T18:10:00+07:00", description: "Penjualan QRIS - Meja 1", category: "Pendapatan Usaha", source: "QRIS", type: "income", amount: 175000, status: "posted" },
    { id: "TRX-008", datetime: "2026-09-18T08:35:00+07:00", description: "Belanja Es & Kemasan", category: "Bahan Baku", source: "BCA Demo", type: "expense", amount: 210000, status: "posted" },
    { id: "TRX-009", datetime: "2026-09-17T16:25:00+07:00", description: "Penjualan QRIS - Meja 3", category: "Pendapatan Usaha", source: "QRIS", type: "income", amount: 142000, status: "posted" },
    { id: "TRX-010", datetime: "2026-09-16T13:05:00+07:00", description: "Pembelian Gas", category: "Operasional", source: "Tunai Demo", type: "expense", amount: 185000, status: "posted" }
  ],
  credit_score: {
    score: 782,
    max_score: 850,
    grade: "A",
    label: "Sangat Baik",
    updated_at: "2026-09-24T09:00:00+07:00",
    positive_factors: [
      { id: "CF-001", title: "Konsistensi Arus Kas", detail: "Pemasukan tercatat konsisten minimal 20 hari dalam sebulan." },
      { id: "CF-002", title: "Rasio Pengeluaran", detail: "Pengeluaran operasional stabil di bawah 60% dari pemasukan." },
      { id: "CF-003", title: "Kelengkapan Data", detail: "Profil usaha dan dokumen demo sudah lengkap." }
    ],
    improvement_areas: [
      { id: "IA-001", title: "Literasi Finansial", detail: "Selesaikan 2 modul literasi untuk menambah poin." },
      { id: "IA-002", title: "Diversifikasi Transaksi", detail: "Tambahkan sumber transaksi non-tunai secara konsisten." }
    ]
  },
  financing: [
    { id: "FIN-001", provider: "Bank Nusantara Demo", product: "KUR Mikro", verification_badge: "Demo Terverifikasi", ceiling_min: 10000000, ceiling_max: 50000000, tenor_min_months: 12, tenor_max_months: 36, estimated_fee_text: "0,5% / bulan (efektif)", collateral: "Tanpa Agunan Tambahan", segment: "Pemerintah", profile_match: 95 },
    { id: "FIN-002", provider: "Fintech Nusantara Demo", product: "Invoice Financing", verification_badge: "Demo Terverifikasi", ceiling_min: 50000000, ceiling_max: 2000000000, tenor_min_months: 1, tenor_max_months: 6, estimated_fee_text: "Mulai 1% / bulan", collateral: "Berbasis Invoice", segment: "B2B", profile_match: 82 },
    { id: "FIN-003", provider: "Bank Arunika Demo", product: "KUR Kecil", verification_badge: "Demo Terverifikasi", ceiling_min: 50000000, ceiling_max: 500000000, tenor_min_months: 12, tenor_max_months: 60, estimated_fee_text: "0,5% / bulan (efektif)", collateral: "Agunan Diperlukan", segment: "Pemerintah", profile_match: 78 },
    { id: "FIN-004", provider: "Koperasi Maju Demo", product: "Modal Kerja Fleksibel", verification_badge: "Demo Terdaftar", ceiling_min: 20000000, ceiling_max: 100000000, tenor_min_months: 6, tenor_max_months: 24, estimated_fee_text: "Mulai 0,9% / bulan", collateral: "Sesuai kebijakan", segment: "UMKM", profile_match: 74 }
  ],
  literacy_modules: [
    { id: "LIT-001", title: "Pemisahan Rekening Pribadi & Usaha", category: "Dasar Keuangan", duration_min: 5, status: "in_progress", progress_pct: 66, locked: false },
    { id: "LIT-002", title: "Mengenali Pinjaman Legal dan Ilegal", category: "Keamanan", duration_min: 6, status: "completed", progress_pct: 100, locked: false },
    { id: "LIT-003", title: "Memahami Bunga & Tenor", category: "Pembiayaan", duration_min: 8, status: "locked", progress_pct: 0, locked: true },
    { id: "LIT-004", title: "Strategi Harga & Margin", category: "Operasional", duration_min: 10, status: "locked", progress_pct: 0, locked: true },
    { id: "LIT-005", title: "Pajak Dasar UMKM", category: "Kepatuhan", duration_min: 12, status: "locked", progress_pct: 0, locked: true }
  ],
  literacy_summary: {
    completion_pct: 72,
    level: "Intermediate",
    completed_modules: 2,
    total_modules: 5
  },
  achievements: [
    { id: "ACH-001", name: "Pemula Bijak", description: "Menyelesaikan 1 modul literasi", earned: true },
    { id: "ACH-002", name: "Pahlawan Keuangan", description: "Menyelesaikan 3 modul literasi", earned: false },
    { id: "ACH-003", name: "Master Finansial", description: "Menyelesaikan seluruh modul", earned: false }
  ],
  legal_protection: {
    api_connection_status: "Connected (Demo)",
    verified_directory: [
      { id: "LGL-001", name: "Bank Nusantara Demo", type: "Bank Umum", license: "DEMO-OJK-001" },
      { id: "LGL-002", name: "Fintech Nusantara Demo", type: "P2P Lending", license: "DEMO-OJK-002" },
      { id: "LGL-003", name: "Pegadaian Mitra Demo", type: "Gadai", license: "DEMO-OJK-003" }
    ],
    verification_cases: [
      { id: "CASE-001", app_name: "KSP Dana Cepat Demo", sender_phone: "0813-0000-5678", result: "suspected_unverified", checked_at: "2026-09-23T16:45:00+07:00" },
      { id: "CASE-002", app_name: "Bank Nusantara Demo", sender_phone: "021-555-0001", result: "verified_demo", checked_at: "2026-09-23T17:10:00+07:00" }
    ]
  },
  resilience: {
    horizon_months: 6,
    status: "SEHAT",
    runway_text: "> 6 Bulan",
    cash_reserve: 24500000,
    base_scenario: [
      { month: 1, ending_cash: 25200000 },
      { month: 2, ending_cash: 25950000 },
      { month: 3, ending_cash: 26800000 },
      { month: 4, ending_cash: 28100000 },
      { month: 5, ending_cash: 29000000 },
      { month: 6, ending_cash: 30400000 }
    ],
    pessimistic_scenario: [
      { month: 1, ending_cash: 23800000 },
      { month: 2, ending_cash: 21800000 },
      { month: 3, ending_cash: 19200000 },
      { month: 4, ending_cash: 16100000 },
      { month: 5, ending_cash: 12800000 },
      { month: 6, ending_cash: 9800000 }
    ],
    scenarios: [
      { id: "SCN-BASE", name: "Skenario Dasar (Normal)", description: "Tren saat ini berlanjut" },
      { id: "SCN-PESS", name: "Skenario Pesimis (A)", description: "Pemasukan turun 20%" },
      { id: "SCN-COST", name: "Skenario Beban (B)", description: "Harga bahan baku naik 15%" }
    ]
  },
  documents: [
    { id: "DOC-001", name: "NIB", status: "verified", expiry: null },
    { id: "DOC-002", name: "KTP Pemilik", status: "verified", expiry: null },
    { id: "DOC-003", name: "NPWP", status: "verified", expiry: null },
    { id: "DOC-004", name: "Rekening Usaha", status: "verified", expiry: null },
    { id: "DOC-005", name: "Surat Keterangan Usaha", status: "pending_review", expiry: null }
  ],
  notifications: [
    { id: "NTF-001", type: "score", title: "Skor SIGAP diperbarui", message: "Skor demo Anda saat ini 782.", read: false, created_at: "2026-09-24T06:30:00+07:00" },
    { id: "NTF-002", type: "literacy", title: "Modul menunggu dilanjutkan", message: "Pemisahan Rekening Pribadi & Usaha sudah 66%.", read: false, created_at: "2026-09-23T18:10:00+07:00" },
    { id: "NTF-003", type: "financing", title: "Ada 3 rekomendasi pembiayaan", message: "Profil demo Anda cocok dengan beberapa produk.", read: true, created_at: "2026-09-23T14:20:00+07:00" }
  ],
  partner_workspace: {
    partner: {
      id: "PARTNER-001",
      name: "Bank Nusantara Demo",
      role: "Lender Resmi (Demo)"
    },
    metrics: {
      total_applications: 1248,
      waiting_verification: 156,
      approved_this_month: 412,
      total_disbursed: 85500000
    },
    lead_quality: {
      category_a_pct: 65,
      category_b_pct: 25,
      category_c_pct: 10
    },
    applications: [
      { id: "APP-001", business_name: "CV Maju Bersama", score: 785, grade: "A", plafon: 250000000, status: "Review" },
      { id: "APP-002", business_name: "Toko Kelontong Berkah", score: 712, grade: "B", plafon: 50000000, status: "Baru" },
      { id: "APP-003", business_name: "Kopi Senja", score: 760, grade: "A-", plafon: 120000000, status: "Baru" },
      { id: "APP-004", business_name: "PT Inovasi Digital", score: 810, grade: "A+", plafon: 500000000, status: "Verifikasi Dokumen" }
    ]
  }
};
