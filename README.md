# SIGAP-UMKM

![Next.js](https://img.shields.io/badge/Next.js-14.1-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-4169E1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

> TODO: ganti dengan satu kalimat deskripsi produk. Contoh: "Aplikasi web untuk ... bagi pelaku UMKM."

## Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Memulai](#memulai)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Skrip](#skrip)
- [Struktur Proyek](#struktur-proyek)
- [Deployment](#deployment)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Fitur

> TODO: isi dengan fitur yang sudah berjalan, bukan rencana.

- Autentikasi pengguna (NextAuth)
- Visualisasi data dengan grafik (Recharts)
- TODO

## Tech Stack

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 14.1, React 18 |
| Bahasa | TypeScript 5 |
| Basis data | PostgreSQL via Prisma 5 |
| Autentikasi | NextAuth.js 4 |
| Validasi | Zod |
| UI | Tailwind CSS 3, Radix UI (Slot), class-variance-authority, lucide-react |
| Grafik | Recharts |
| Linting | ESLint (`eslint-config-next`) |

## Prasyarat

- Node.js 18.17 atau lebih baru (syarat minimum Next.js 14)
- npm
- PostgreSQL 14 atau lebih baru

## Memulai

```bash
# 1. Klon repositori
git clone https://github.com/AlepBe/SIGAP-UMKM.git
cd SIGAP-UMKM

# 2. Pasang dependensi
npm install

# 3. Siapkan variabel lingkungan
cp .env.example .env
# edit .env sesuai kredensial PostgreSQL lokal

# 4. Generate Prisma Client dan terapkan skema
npx prisma generate
npx prisma migrate dev

# 5. Jalankan server pengembangan
npm run dev
```

Aplikasi berjalan di <http://localhost:3000>.

Jika folder `prisma/migrations` belum ada, gunakan `npx prisma db push` sebagai pengganti `migrate dev`.

## Variabel Lingkungan

Salin `.env.example` menjadi `.env`. Jangan pernah commit `.env`.

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `DATABASE_URL` | Ya | Connection string PostgreSQL, contoh: `postgresql://user:password@localhost:5432/sigap_umkm?schema=public` |
| `NEXTAUTH_SECRET` | Ya, jika autentikasi aktif | String acak panjang. Buat dengan `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Ya di production | URL publik aplikasi, contoh: `https://sigap-umkm.example.com` |

> `.env.example` saat ini hanya memuat `DATABASE_URL`. Tambahkan variabel NextAuth ke file tersebut agar setup anggota baru tidak gagal.

## Skrip

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Server pengembangan dengan hot reload |
| `npm run build` | Build production |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | Menjalankan ESLint |
| `npx prisma studio` | Antarmuka web untuk melihat dan mengubah data |
| `npx prisma migrate dev` | Membuat dan menerapkan migrasi di lingkungan lokal |
| `npx tsc --noEmit` | Pengecekan tipe tanpa menghasilkan berkas |

## Struktur Proyek

```text
.
├── prisma/          # Skema dan migrasi basis data
├── public/          # Aset statis
├── src/             # Kode aplikasi
├── .env.example     # Contoh variabel lingkungan
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

> TODO: rinci isi `src/` (misalnya `app/`, `components/`, `lib/`) setelah struktur final.

## Deployment

1. Sediakan basis data PostgreSQL (managed service atau self-hosted).
2. Atur semua variabel pada [Variabel Lingkungan](#variabel-lingkungan) di platform hosting.
3. Pastikan Prisma Client ter-generate saat build, misalnya dengan build command `prisma generate && next build`.
4. Terapkan migrasi ke basis data production dengan `npx prisma migrate deploy`.

## Kontribusi

1. Buat branch dari `main`: `git checkout -b feat/nama-fitur`
2. Gunakan [Conventional Commits](https://www.conventionalcommits.org/) untuk pesan commit (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
3. Pastikan `npm run lint`, `npx tsc --noEmit`, dan `npm run build` lolos sebelum membuka Pull Request.
4. Jelaskan apa dan mengapa perubahan dibuat pada deskripsi PR.

Kontributor yang memakai asisten AI wajib mengikuti aturan di [AGENTS.md](./AGENTS.md).

## Lisensi

Belum ditentukan. Tambahkan berkas `LICENSE` sebelum repositori dipakai atau dikontribusikan pihak lain.
