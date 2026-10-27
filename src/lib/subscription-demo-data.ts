export const subscriptionDemoData = {
  plans: {
    free: {
      id: "free",
      name: "Free",
      price: 0
    },
    premium: {
      id: "premium",
      name: "Premium",
      monthlyPrice: 99000,
      yearlyPrice: 899000
    }
  },
  features: [
    { name: "Basic Dashboard", free: true, premium: true },
    { name: "Pembukuan", free: true, premium: true },
    { name: "Basic Score", free: true, premium: true },
    { name: "Basic Literacy", free: true, premium: true },
    { name: "Basic Legal Check", free: true, premium: true },
    { name: "Marketplace Pembiayaan", free: true, premium: true },
    { name: "Advanced Analytics", free: false, premium: true },
    { name: "Cashflow Forecast", free: false, premium: true },
    { name: "Resilience Simulator", free: false, premium: true },
    { name: "Advanced Matching", free: false, premium: true },
    { name: "Smart Insights", free: false, premium: true },
    { name: "Advanced Reports", free: false, premium: true },
    { name: "Smart Alerts", free: false, premium: true },
    { name: "Extended History", free: "3 bulan", premium: "12+ bulan" }
  ],
  premium_insights: [
    "Pengeluaran bahan baku meningkat 15% dibanding periode sebelumnya.",
    "Margin usaha menunjukkan tren positif dalam dua periode terakhir.",
    "Proyeksi arus kas bulan depan diprediksi surplus."
  ],
  premium_analytics: {
    revenue: [
      { month: "Apr", value: 15200000 },
      { month: "May", value: 16800000 },
      { month: "Jun", value: 17400000 },
      { month: "Jul", value: 18100000 },
      { month: "Aug", value: 17500000 },
      { month: "Sep", value: 18250000 }
    ],
    expenses: [
      { category: "Bahan Baku", pct: 42 },
      { category: "Operasional", pct: 21 },
      { category: "Tenaga Kerja", pct: 18 },
      { category: "Marketing", pct: 8 },
      { category: "Lainnya", pct: 11 }
    ]
  },
  premium_forecast: [
    { month: "Oct", value: 7100000 },
    { month: "Nov", value: 7800000 },
    { month: "Dec", value: 8600000 },
    { month: "Jan", value: 9200000 },
    { month: "Feb", value: 10000000 },
    { month: "Mar", value: 10800000 }
  ]
};
