export const publicDemoData = {
  business: {
    name: "Kedai Kopi Senja",
    owner: "Budi Santoso",
    business_type: "F&B",
    city: "Palembang",
  },
  metrics: {
    totalBalance: 24500000,
    incomeThisMonth: 18250000,
    expenseThisMonth: 12100000,
    netProfit: 6150000
  },
  cashflow: {
    "7 Hari": [
      { date: "Senin", income: 250000, expense: 100000, net: 150000 },
      { date: "Selasa", income: 300000, expense: 150000, net: 150000 },
      { date: "Rabu", income: 200000, expense: 50000, net: 150000 },
      { date: "Kamis", income: 450000, expense: 200000, net: 250000 },
      { date: "Jumat", income: 500000, expense: 150000, net: 350000 },
      { date: "Sabtu", income: 750000, expense: 300000, net: 450000 },
      { date: "Minggu", income: 800000, expense: 250000, net: 550000 }
    ],
    "30 Hari": [
      { date: "Minggu 1", income: 4500000, expense: 3000000, net: 1500000 },
      { date: "Minggu 2", income: 4200000, expense: 2800000, net: 1400000 },
      { date: "Minggu 3", income: 4800000, expense: 3200000, net: 1600000 },
      { date: "Minggu 4", income: 4750000, expense: 3100000, net: 1650000 }
    ],
    "3 Bulan": [
      { date: "Bulan 1", income: 16500000, expense: 11500000, net: 5000000 },
      { date: "Bulan 2", income: 17200000, expense: 11800000, net: 5400000 },
      { date: "Bulan 3", income: 18250000, expense: 12100000, net: 6150000 }
    ]
  },
  transactions: [
    { id: "TX1", date: "2023-10-25", description: "Penjualan QRIS", type: "income", amount: 125000, category: "Pendapatan Usaha" },
    { id: "TX2", date: "2023-10-25", description: "Pembelian Biji Kopi", type: "expense", amount: 450000, category: "Bahan Baku" },
    { id: "TX3", date: "2023-10-24", description: "Penjualan QRIS", type: "income", amount: 85000, category: "Pendapatan Usaha" },
    { id: "TX4", date: "2023-10-24", description: "Listrik Bulanan", type: "expense", amount: 1200000, category: "Operasional" },
    { id: "TX5", date: "2023-10-23", description: "Pencairan E-Wallet Demo", type: "income", amount: 850000, category: "Transfer Masuk" },
    { id: "TX6", date: "2023-10-23", description: "Sewa Tempat", type: "expense", amount: 2500000, category: "Operasional" },
    { id: "TX7", date: "2023-10-22", description: "Penjualan Tunai Demo", type: "income", amount: 450000, category: "Pendapatan Usaha" },
    { id: "TX8", date: "2023-10-22", description: "Iklan Sosial Media", type: "expense", amount: 150000, category: "Marketing" },
    { id: "TX9", date: "2023-10-21", description: "Penjualan QRIS", type: "income", amount: 320000, category: "Pendapatan Usaha" },
    { id: "TX10", date: "2023-10-21", description: "Pembelian Susu", type: "expense", amount: 120000, category: "Bahan Baku" },
    { id: "TX11", date: "2023-10-20", description: "Penjualan E-Wallet Demo", type: "income", amount: 210000, category: "Pendapatan Usaha" },
    { id: "TX12", date: "2023-10-20", description: "Gaji Karyawan", type: "expense", amount: 3000000, category: "Operasional" },
    { id: "TX13", date: "2023-10-19", description: "Penjualan QRIS", type: "income", amount: 180000, category: "Pendapatan Usaha" },
    { id: "TX14", date: "2023-10-19", description: "Air Galon", type: "expense", amount: 50000, category: "Operasional" },
    { id: "TX15", date: "2023-10-18", description: "Transfer Masuk (Bank Demo)", type: "income", amount: 500000, category: "Transfer Masuk" },
    { id: "TX16", date: "2023-10-18", description: "Pembelian Gelas Kertas", type: "expense", amount: 350000, category: "Bahan Baku" },
    { id: "TX17", date: "2023-10-17", description: "Penjualan QRIS", type: "income", amount: 290000, category: "Pendapatan Usaha" },
    { id: "TX18", date: "2023-10-17", description: "Internet", type: "expense", amount: 350000, category: "Operasional" },
    { id: "TX19", date: "2023-10-16", description: "Penjualan Tunai Demo", type: "income", amount: 510000, category: "Pendapatan Usaha" },
    { id: "TX20", date: "2023-10-16", description: "Kebersihan", type: "expense", amount: 100000, category: "Operasional" }
  ],
  score: {
    value: 782,
    max: 850,
    grade: "A",
    label: "Sangat Baik",
    factors: [
      { name: "Konsistensi Arus Kas", description: "Pemasukan rutin yang stabil mencerminkan bisnis yang sehat." },
      { name: "Rasio Pengeluaran", description: "Pengeluaran tetap terjaga di bawah ambang batas pendapatan." },
      { name: "Kelengkapan Profil", description: "Informasi bisnis yang lengkap meningkatkan kepercayaan." },
      { name: "Literasi Finansial", description: "Mengikuti edukasi keuangan meningkatkan kesiapan bisnis." },
      { name: "Cadangan Kas", description: "Memiliki simpanan yang cukup untuk keadaan darurat." }
    ]
  },
  financingProducts: [
    { 
      id: "FIN1", 
      name: "Kredit Modal Usaha Demo", 
      ceiling: "Hingga Rp 500 Juta", 
      tenor: "12 - 60 Bulan", 
      cost: "Mulai dari 0.5% / bulan",
      collateral: "Sesuai kebijakan",
      profileMatching: "Sangat Cocok"
    },
    { 
      id: "FIN2", 
      name: "Invoice Financing Demo", 
      ceiling: "Hingga Rp 2 Miliar", 
      tenor: "1 - 6 Bulan", 
      cost: "Mulai dari 1% / bulan",
      collateral: "Invoice/Tagihan",
      profileMatching: "Cocok"
    },
    { 
      id: "FIN3", 
      name: "Kredit Pengembangan Usaha Demo", 
      ceiling: "Hingga Rp 1 Miliar", 
      tenor: "12 - 36 Bulan", 
      cost: "Mulai dari 0.9% / bulan",
      collateral: "Agunan Tetap",
      profileMatching: "Cukup Cocok"
    }
  ],
  trustMetrics: {
    umkm: "10K+",
    transactions: "Rp2,4T",
    partners: "15+"
  }
};
