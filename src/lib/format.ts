export const formatJuta = (value: number) =>
  (value / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 2 });

export const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export const formatCompactIDR = (value: number) =>
  value >= 1_000_000 ? `Rp${formatJuta(value)} jt` : `Rp${Math.round(value / 1000)} rb`;
