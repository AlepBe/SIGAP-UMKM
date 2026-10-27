export const TransactionProvider = {
  getRecentTransactions: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      { id: "TX-9901", date: "2026-09-11T14:30:00Z", description: "Penjualan Harian - Outlet 1", category: "Pendapatan", amount: 2450000, type: "INCOME", status: "COMPLETED" },
      { id: "TX-9902", date: "2026-09-11T09:15:00Z", description: "Pembelian Bahan Baku", category: "Pengeluaran", amount: -1200000, type: "EXPENSE", status: "COMPLETED" },
      { id: "TX-9903", date: "2026-09-10T16:45:00Z", description: "Pembayaran Listrik & Air", category: "Operasional", amount: -450000, type: "EXPENSE", status: "COMPLETED" },
      { id: "TX-9904", date: "2026-09-09T11:20:00Z", description: "Penjualan Harian - Outlet 2", category: "Pendapatan", amount: 1850000, type: "INCOME", status: "COMPLETED" },
    ];
  },
  getCashFlowSummary: async () => {
    return {
      totalIncome: 14500000,
      totalExpense: 8200000,
      netProfit: 6300000,
      period: "September 2026"
    };
  }
};

export const CreditScoreProvider = {
  getLatestScore: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      score: 715,
      category: "Sangat Baik",
      lastUpdated: "2026-09-11T08:00:00Z",
      factors: [
        { name: "Riwayat Pembayaran", impact: "High", status: "Positive" },
        { name: "Rasio Hutang", impact: "High", status: "Positive" },
        { name: "Arus Kas Bisnis", impact: "Medium", status: "Positive" },
        { name: "Usia Kredit", impact: "Low", status: "Neutral" }
      ],
      disclaimer: "Skor SIGAP adalah indikator pendukung, bukan keputusan pembiayaan mutlak."
    };
  }
};

export const LegalVerificationProvider = {
  checkLender: async (lenderName: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const isVerified = lenderName.toLowerCase().includes("mandiri") || lenderName.toLowerCase().includes("bri");
    return {
      name: lenderName,
      isVerified,
      verificationDate: isVerified ? "2026-01-15T00:00:00Z" : null,
      licenseNumber: isVerified ? "KEP-123/D.05/2026" : null,
      message: isVerified 
        ? "Institusi ini terverifikasi dan berizin resmi oleh Otoritas Jasa Keuangan (OJK)." 
        : "PERINGATAN: Institusi ini tidak ditemukan dalam database resmi. Waspada terhadap penipuan."
    };
  }
};
