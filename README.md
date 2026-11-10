# RuangSewa - Platform Reservasi Lapangan Olahraga Digital

RuangSewa adalah platform reservasi lapangan olahraga digital berbasis Progressive Web Application (PWA) yang memfasilitasi pencarian dan pemesanan venue (futsal, badminton, mini soccer, dan tenis) secara real-time. Platform ini memangkas antrean manual dan konfirmasi pesan WhatsApp dengan menyediakan ketersediaan jadwal instan, fitur smart-lock slot jam sewa, serta penerbitan E-Ticket otomatis.

---

## Fitur Utama

- Katalog Lapangan & Filter Cabang: Pencarian interaktif berdasarkan jenis olahraga, wilayah, dan jadwal main.
- Transparansi Ketersediaan Real-Time: Sinkronisasi status ketersediaan slot sewa secara langsung via Supabase Realtime Subscriptions.
- Smart-Lock Slot Anti Double-Booking: Mengunci slot sewa selama proses transaksi agar tidak bisa dipesan pengguna lain secara bersamaan.
- Pembayaran & E-Ticket Otomatis: Penerbitan QR Code E-Ticket digital untuk verifikasi check-in di venue.
- Kemitraan Venue: Portal pendaftaran bagi pemilik arena olahraga untuk otomatisasi reservasi.

---

## Tech Stack

- Frontend: Next.js (App Router), React 19, TypeScript
- Styling: Tailwind CSS v4
- Backend & Database: Supabase (PostgreSQL & Realtime Subscriptions)
- Deployment: Vercel / GitHub Pages

---

## Struktur Direktori

```text
RuangSewa/
├── public/              # Aset statis (gambar, ikon, manifest)
├── src/
│   ├── app/             # Next.js App Router (Halaman & Routing API)
│   ├── components/      # Komponen UI modular (Navbar, Card, Modal, Footer)
│   ├── lib/             # Konfigurasi Supabase client & utility functions
│   └── styles/          # File CSS global & Tailwind directives
├── .env.example         # Templat variabel lingkungan
├── next.config.mjs      # Konfigurasi Next.js
├── tailwind.config.ts   # Konfigurasi Tailwind CSS
├── tsconfig.json        # Konfigurasi TypeScript
└── package.json         # Dependensi & skrip proyek



## Panduan Memulai

Berikut adalah langkah-langkah untuk menjalankan proyek RuangSewa di lingkungan lokal Anda.

### Prasyarat

Pastikan perangkat Anda telah terinstal software berikut:
- Node.js (versi 18.x atau lebih baru)
- npm, yarn, atau pnpm

### 1. Clone Repositori

Buka terminal dan jalankan perintah berikut untuk mengklon repositori ke komputer Anda:

```bash
git clone [https://github.com/RamliFarijiZamhuri/RuangSewa.git](https://github.com/RamliFarijiZamhuri/RuangSewa.git)
cd RuangSewa

### 2. Install Dependensi
- npm install

### 3. Jalankan Development Server
- npm run dev

Buka browser Anda dan akses alamat berikut:
- http://localhost:3000
