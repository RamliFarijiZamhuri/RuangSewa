/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Star,
  ShieldCheck,
  CheckCircle2,
  Zap,
  CreditCard,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  SlidersHorizontal,
  Building2,
  QrCode,
  Copy,
  Check,
  Flame,
  Award,
  Users
} from 'lucide-react';

// High-fidelity generated imagery paths
import heroImage from './assets/images/hero_sports_arena_1792136940438.jpg';
import futsalImage from './assets/images/court_futsal_arena_1792136941538.jpg';
import badmintonImage from './assets/images/court_badminton_hall_1792136940518.jpg';
import miniSoccerImage from './assets/images/court_minisoccer_stadium_1792136941992.jpg';
import tennisImage from './assets/images/court_tennis_outdoor_1792136942321.jpg';

interface Court {
  id: string;
  name: string;
  category: 'Futsal' | 'Badminton' | 'Mini Soccer' | 'Tenis';
  city: string;
  district: string;
  image: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  surfaceType: string;
  facilities: string[];
  slotsAvailableToday: number;
  highlight: string;
  slots: { time: string; available: boolean; price: number }[];
}

const COURTS_DATA: Court[] = [
  {
    id: 'court-1',
    name: 'Giga Futsal Arena Cilandak',
    category: 'Futsal',
    city: 'Jakarta Selatan',
    district: 'Cilandak',
    image: futsalImage,
    rating: 4.9,
    reviewCount: 348,
    pricePerHour: 180000,
    surfaceType: 'Interlock Vinyl FIFA Standard',
    facilities: ['Loker Kunci', 'Shower Air Panas', 'Parkir Mobil Luas', 'Kantin Olahraga', 'Tribun Penonton'],
    slotsAvailableToday: 4,
    highlight: 'Paling Populer di Jaksel',
    slots: [
      { time: '08:00 - 09:00', available: true, price: 160000 },
      { time: '10:00 - 11:00', available: false, price: 160000 },
      { time: '14:00 - 15:00', available: true, price: 180000 },
      { time: '16:00 - 17:00', available: false, price: 180000 },
      { time: '19:00 - 20:00', available: true, price: 210000 },
      { time: '20:00 - 21:00', available: true, price: 210000 },
    ],
  },
  {
    id: 'court-2',
    name: 'Champions Badminton Hall',
    category: 'Badminton',
    city: 'Jakarta Selatan',
    district: 'Kuningan',
    image: badmintonImage,
    rating: 4.8,
    reviewCount: 295,
    pricePerHour: 85000,
    surfaceType: 'Taraflex BWF Approved Floor',
    facilities: ['Lampu LED Anti-Silau', 'AC Central', 'Musholla Bersih', 'Sewa Raket & Shuttlecock', 'Parkir Motor & Mobil'],
    slotsAvailableToday: 6,
    highlight: 'Karpet Standar Internasional',
    slots: [
      { time: '07:00 - 08:00', available: true, price: 75000 },
      { time: '09:00 - 10:00', available: true, price: 85000 },
      { time: '13:00 - 14:00', available: true, price: 85000 },
      { time: '17:00 - 18:00', available: false, price: 95000 },
      { time: '19:00 - 20:00', available: true, price: 100000 },
      { time: '20:00 - 21:00', available: true, price: 100000 },
    ],
  },
  {
    id: 'court-3',
    name: 'Sentul Prime Mini Soccer Stadium',
    category: 'Mini Soccer',
    city: 'Bandung',
    district: 'Dago Atas',
    image: miniSoccerImage,
    rating: 4.95,
    reviewCount: 412,
    pricePerHour: 450000,
    surfaceType: 'Rumput Sintetis Monofilament 50mm',
    facilities: ['Floodlights 500 Lux', 'Wasit Berlisensi (Opsional)', 'Ruang Ganti VIP', 'Cafe & Lounge', 'Perekaman Pertandingan'],
    slotsAvailableToday: 3,
    highlight: 'View Sunset & Lampu Stadion',
    slots: [
      { time: '06:00 - 08:00', available: true, price: 400000 },
      { time: '14:00 - 16:00', available: false, price: 450000 },
      { time: '16:00 - 18:00', available: true, price: 500000 },
      { time: '19:00 - 21:00', available: true, price: 550000 },
    ],
  },
  {
    id: 'court-4',
    name: 'Grand Slam Padel & Tennis Club',
    category: 'Tenis',
    city: 'Tangerang',
    district: 'BSD City',
    image: tennisImage,
    rating: 4.85,
    reviewCount: 184,
    pricePerHour: 150000,
    surfaceType: 'DecoTurf Acrylic Hard Court',
    facilities: ['Court Padel & Tenis', 'Ball Boy Tersedia', 'Shower Air Hangat', 'Pro Shop & Stringing', 'Coffee Bar'],
    slotsAvailableToday: 5,
    highlight: 'Lapangan Outdoor & Padel Court',
    slots: [
      { time: '06:30 - 08:00', available: true, price: 150000 },
      { time: '08:00 - 09:30', available: false, price: 150000 },
      { time: '15:30 - 17:00', available: true, price: 165000 },
      { time: '17:00 - 18:30', available: true, price: 180000 },
      { time: '19:00 - 20:30', available: true, price: 180000 },
    ],
  },
];

const FAQS = [
  {
    question: 'Bagaimana RuangSewa menjamin tidak ada jadwal bentrok (double-booking)?',
    answer:
      'Setiap venue olahraga yang terdaftar terhubung secara langsung via sistem API kalender real-time RuangSewa. Saat Anda memilih slot jam dan memulai checkout, slot tersebut langsung dikunci (hold) selama 10 menit sehingga tidak dapat diambil pengguna lain.',
  },
  {
    question: 'Metode pembayaran apa saja yang diterima?',
    answer:
      'RuangSewa mendukung semua metode pembayaran modern tanpa biaya tersembunyi: QRIS (GoPay, OVO, ShopeePay, DANA), Virtual Account Bank (BCA, Mandiri, BNI, BRI), serta Kartu Debit/Kredit dengan konfirmasi otomatis seketika.',
  },
  {
    question: 'Apakah saya bisa mengajukan reschedule atau pembatalan?',
    answer:
      'Bisa. Pengajuan reschedule jadwal dapat dilakukan melalui dashboard akun Anda paling lambat 24 jam sebelum jadwal bertanding dimulai, tergantung ketersediaan slot kosong lain pada venue yang sama.',
  },
  {
    question: 'Bagaimana cara check-in setibanya di arena olahraga?',
    answer:
      'Setelah pembayaran berhasil, Anda langsung menerima E-Ticket digital dengan QR Code unik via aplikasi dan WhatsApp. Tunjukkan barcode tersebut kepada staf resepsionis venue untuk verifikasi instan tanpa perlu cetak kertas.',
  },
  {
    question: 'Bagaimana cara mendaftarkan lapangan saya menjadi mitra RuangSewa?',
    answer:
      'Klik tombol "Daftar Jadi Mitra" di navigasi atas atau banner mitra. Isi formulir singkat mengenai arena Anda. Tim operasional RuangSewa akan menghubungi Anda dalam waktu 1x24 jam untuk verifikasi venue dan pemasangan sistem manajemen tanpa biaya pendaftaran.',
  },
];

/**
 * LogoMark: Desain identitas visual RuangSewa yang realistis & otentik
 * Menampilkan elemen lapangan olahraga (sports court markings: garis tepi, garis tengah, center circle, penalty box)
 * dengan aksen titik bola dinamis di tengah pada turf emerald gradient.
 */
const LogoMark: React.FC<{ size?: number; className?: string; idPrefix?: string }> = ({
  size = 36,
  className = '',
  idPrefix = 'rs-logo',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`${idPrefix}-turf`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id={`${idPrefix}-sheen`} x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* Base squircle dengan sports turf emerald gradient */}
    <rect width="40" height="40" rx="10" fill={`url(#${idPrefix}-turf)`} />
    <rect width="40" height="20" rx="10" fill={`url(#${idPrefix}-sheen)`} />
    
    {/* Garis batas perimeter lapangan (Court boundary) */}
    <rect x="8" y="6" width="24" height="28" rx="2.5" stroke="#FFFFFF" strokeWidth="1.75" strokeOpacity="0.95" />
    
    {/* Garis tengah lapangan (Half-court dividing line) */}
    <line x1="8" y1="20" x2="32" y2="20" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.9" />
    
    {/* Lingkaran tengah (Center circle) */}
    <circle cx="20" cy="20" r="4.5" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.9" />
    
    {/* Kotak penalti / area servis atas */}
    <path d="M13 6v5.5h14V6" stroke="#FFFFFF" strokeWidth="1.3" strokeOpacity="0.85" strokeLinejoin="round" />
    
    {/* Kotak penalti / area servis bawah */}
    <path d="M13 34v-5.5h14V34" stroke="#FFFFFF" strokeWidth="1.3" strokeOpacity="0.85" strokeLinejoin="round" />
    
    {/* Titik bola / match slot aktif (Aksen hangat amber) */}
    <circle cx="20" cy="20" r="1.6" fill="#FBBF24" />
  </svg>
);

export default function App() {
  const sportSelectId = useId();
  const citySelectId = useId();
  const dateInputId = useId();
  const timeSlotId = useId();

  // Search and filter states
  const [selectedSport, setSelectedSport] = useState<string>('Semua');
  const [selectedCity, setSelectedCity] = useState<string>('Semua Kota');
  const [searchDate, setSearchDate] = useState<string>('2026-10-18');
  const [searchTime, setSearchTime] = useState<string>('Semua Waktu');
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('Semua');

  // Modal states
  const [selectedCourtForDetail, setSelectedCourtForDetail] = useState<Court | null>(null);
  const [selectedCourtForBooking, setSelectedCourtForBooking] = useState<Court | null>(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('');
  const [bookingCustomerName, setBookingCustomerName] = useState<string>('');
  const [bookingCustomerPhone, setBookingCustomerPhone] = useState<string>('');
  const [isBookingSuccess, setIsBookingSuccess] = useState<boolean>(false);

  // Mitra Modal
  const [isMitraModalOpen, setIsMitraModalOpen] = useState<boolean>(false);
  const [mitraName, setMitraName] = useState<string>('');
  const [mitraVenue, setMitraVenue] = useState<string>('');
  const [mitraSport, setMitraSport] = useState<string>('Futsal');
  const [mitraCity, setMitraCity] = useState<string>('Jakarta Selatan');
  const [mitraWa, setMitraWa] = useState<string>('');
  const [mitraSuccess, setMitraSuccess] = useState<boolean>(false);

  // Standalone code modal
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // FAQ open item
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered courts computation
  const filteredCourts = COURTS_DATA.filter((court) => {
    const matchCategory =
      activeCategoryTab === 'Semua' ? true : court.category === activeCategoryTab;
    const matchCity =
      selectedCity === 'Semua Kota' ? true : court.city.toLowerCase() === selectedCity.toLowerCase();
    const matchSport =
      selectedSport === 'Semua' ? true : court.category === selectedSport;
    return matchCategory && matchCity && matchSport;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSport !== 'Semua') {
      setActiveCategoryTab(selectedSport);
    }
    const catalogElement = document.getElementById('katalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (court: Court) => {
    setSelectedCourtForBooking(court);
    const firstAvail = court.slots.find((s) => s.available);
    setSelectedSlotTime(firstAvail ? firstAvail.time : '');
    setIsBookingSuccess(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCustomerName.trim() || !bookingCustomerPhone.trim() || !selectedSlotTime) {
      return;
    }
    setIsBookingSuccess(true);
  };

  const handleMitraSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mitraName.trim() || !mitraVenue.trim() || !mitraWa.trim()) {
      return;
    }
    setMitraSuccess(true);
  };

  const copyStandaloneHtml = () => {
    const sampleHtml = `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RuangSewa - Platform Booking Lapangan Olahraga</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; color: #1e293b; }
  </style>
</head>
<body class="antialiased">
  <!-- Navbar, Hero, Search Card, Value Prop, Cara Kerja, Katalog, Mitra CTA, FAQ, Footer -->
  <!-- Silakan lihat struktur lengkap RuangSewa di repositori atau file terlampir -->
</body>
</html>`;
    navigator.clipboard.writeText(sampleHtml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 1. HEADER / NAVBAR (Top Bar Contract: 1 Row, 3 Zones) */}
      <header className="sticky top-0 z-40 bg-slate-50/85 backdrop-blur-md border-b border-slate-200/70 transition-colors w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <LogoMark size={36} idPrefix="nav-logo" className="shadow-sm" />
            <span>
              Ruang<span className="text-emerald-600">Sewa</span>
            </span>
          </a>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#beranda" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
              Beranda
            </a>
            <a href="#keunggulan" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
              Keunggulan
            </a>
            <a href="#cara-kerja" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
              Cara Kerja
            </a>
            <a href="#katalog" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
              Katalog Lapangan
            </a>
            <a href="#faq" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setMitraSuccess(false);
                setIsMitraModalOpen(true);
              }}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-amber-500 rounded-xl hover:bg-amber-400 active:scale-95 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              Daftar Jadi Mitra
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200/80 bg-slate-50 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#beranda"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Beranda
            </a>
            <a
              href="#keunggulan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Keunggulan
            </a>
            <a
              href="#cara-kerja"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Cara Kerja
            </a>
            <a
              href="#katalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Katalog Lapangan
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              FAQ
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCodeModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl"
              >
                <Copy className="w-4 h-4 text-emerald-600" />
                <span>Salin Template HTML5 CDN</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setMitraSuccess(false);
                  setIsMitraModalOpen(true);
                }}
                className="w-full py-2.5 text-sm font-semibold text-slate-950 bg-amber-500 rounded-xl shadow-sm text-center"
              >
                Daftar Jadi Mitra Venue
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="beranda" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Subheadline, Proof */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Subtitle (Unboxed Metadata) */}
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-emerald-700 tracking-wide">
                <span>Platform Booking Lapangan Olahraga #1 di Indonesia</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Terverifikasi Real-Time</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Cari & Booking Lapangan Olahraga <span className="text-emerald-600">Tanpa Antre</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Temukan arena futsal, badminton, mini soccer, dan tenis terdekat dengan jadwal live yang selalu transparan. Langsung bayar praktis dan terima E-Ticket tanpa perlu menunggu balasan chat WhatsApp manual berjam-jam.
              </p>

              {/* Trust Proof Points */}
              <div className="pt-2 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-6">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">1.200+</div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-0.5">Lapangan Terdaftar</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">48.500+</div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-0.5">Sesi Berhasil Selesai</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 font-mono tabular-nums">99.8%</div>
                  <div className="text-xs sm:text-sm text-slate-500 mt-0.5">Bebas Double-Booking</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset with Glass Indicator */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-900 aspect-[16/11]">
                <img
                  src={heroImage}
                  alt="Modern indoor sports complex arena"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Live Card Overlay inside Visual */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Sistem Real-Time Aktif
                    </span>
                    <span className="text-xs font-mono text-slate-300 tabular-nums">Update: Baru Saja</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-100">
                    Slot malam ini di Jakarta & sekitarnya tersisa 42 jam sewa. Amankan waktu bertanding tim Anda sekarang!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING INTERACTIVE SEARCH BAR CARD */}
          <div className="mt-10 sm:mt-12 bg-white rounded-2xl border border-slate-200/80 shadow-md p-4 sm:p-6 transition hover:border-emerald-600/30">
            <form onSubmit={handleSearchSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* 1. Cabang Olahraga */}
                <div>
                  <label htmlFor={sportSelectId} className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cabang Olahraga</span>
                  </label>
                  <div className="relative">
                    <select
                      id={sportSelectId}
                      value={selectedSport}
                      onChange={(e) => setSelectedSport(e.target.value)}
                      className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
                    >
                      <option value="Semua">Semua Olahraga</option>
                      <option value="Futsal">Futsal</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Mini Soccer">Mini Soccer</option>
                      <option value="Tenis">Tenis & Padel</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Kota / Wilayah */}
                <div>
                  <label htmlFor={citySelectId} className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kota / Wilayah</span>
                  </label>
                  <div className="relative">
                    <select
                      id={citySelectId}
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
                    >
                      <option value="Semua Kota">Semua Kota</option>
                      <option value="Jakarta Selatan">Jakarta Selatan</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Tangerang">Tangerang & BSD</option>
                      <option value="Surabaya">Surabaya</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Tanggal Main */}
                <div>
                  <label htmlFor={dateInputId} className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tanggal Main</span>
                  </label>
                  <input
                    id={dateInputId}
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
                  />
                </div>

                {/* 4. Slot Waktu & Tombol Submit */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label htmlFor={timeSlotId} className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Jam Main</span>
                    </label>
                    <div className="relative">
                      <select
                        id={timeSlotId}
                        value={searchTime}
                        onChange={(e) => setSearchTime(e.target.value)}
                        className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition cursor-pointer"
                      >
                        <option value="Semua Waktu">Semua Jam</option>
                        <option value="Pagi">Pagi (06:00 - 11:00)</option>
                        <option value="Siang">Siang (11:00 - 15:00)</option>
                        <option value="Sore">Sore (15:00 - 18:00)</option>
                        <option value="Malam">Malam (18:00 - 24:00)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-transparent mb-1.5">Aksi</span>
                    <button
                      type="submit"
                      className="h-[42px] px-6 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                      <span>Cari</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION (3 FITUR UTAMA) */}
      <section id="keunggulan" className="py-20 md:py-24 bg-white/70 border-y border-slate-200/60 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <h2 className="text-xs md:text-sm font-semibold tracking-wider uppercase text-emerald-700">
              Nilai Tambah RuangSewa
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Booking Tanpa Drama, Olahraga Lebih Puas
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Kami menghilangkan kerepotan konvensional: telpon tidak diangkat, jadwal dobel, dan bukti transfer manual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fitur 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-700 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Real-Time & Transparan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kalender slot lapangan tersinkronisasi langsung dengan sistem venue. Jam yang tertera di layar adalah jam yang benar-benar siap Anda sewa.
              </p>
              <div className="mt-auto pt-6 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pembaruan otomatis tiap detik</span>
              </div>
            </div>

            {/* Fitur 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-amber-100/90 flex items-center justify-center text-amber-700 mb-6">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pembayaran Praktis & E-Ticket</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Selesaikan pembayaran dalam hitungan detik via QRIS atau Virtual Account. E-Ticket dengan kode QR check-in terbit langsung di WhatsApp dan email.
              </p>
              <div className="mt-auto pt-6 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dukungan semua e-wallet & bank nasional</span>
              </div>
            </div>

            {/* Fitur 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-700 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Garansi Anti Double-Booking</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sistem smart-lock otomatis mengamankan slot selama transaksi. Jika terjadi kendala operasional lapangan, kami berikan jaminan pengembalian dana 100%.
              </p>
              <div className="mt-auto pt-6 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Proteksi konsumen & SLA respon cepat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CARA KERJA (STEP-BY-STEP CARDS) */}
      <section id="cara-kerja" className="py-20 md:py-24 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <h2 className="text-xs md:text-sm font-semibold tracking-wider uppercase text-emerald-700">
              Alur Reservasi
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              3 Langkah Praktis Menuju Kickoff
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Booking lapangan idaman komunitas Anda kini tidak lebih dari 2 menit saja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="text-3xl font-extrabold text-emerald-600/30 font-mono mb-4">01</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pilih Cabang & Lokasi</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cari lapangan futsal, badminton, mini soccer, atau tenis terdekat dari rumah atau kantor dengan filter fasilitas lengkap.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="text-3xl font-extrabold text-amber-500/40 font-mono mb-4">02</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pilih Jam & Bayar Seketika</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tentukan jam sewa yang cocok pada kalender transparan, lalu bayar secara instan menggunakan QRIS atau transfer perbankan.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="text-3xl font-extrabold text-emerald-600/30 font-mono mb-4">03</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tunjukkan E-Ticket & Main</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Langsung datang ke arena, pindai QR Code E-Ticket pada bagian resepsionis, dan nikmati pertandingan bersama rekan tim Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KATALOG LAPANGAN POPULER (CARDS WITH MODALS) */}
      <section id="katalog" className="py-20 md:py-24 bg-white/70 border-t border-slate-200/60 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-xs md:text-sm font-semibold tracking-wider uppercase text-emerald-700">
                Pilihan Terbaik
              </h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Katalog Lapangan Terpopuler
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Lapangan terverifikasi dengan rating kepuasan komunitas tertinggi.
              </p>
            </div>

            {/* Interactive Category Segmented Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200/80 rounded-xl overflow-x-auto">
              {['Semua', 'Futsal', 'Badminton', 'Mini Soccer', 'Tenis'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryTab(cat)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap shrink-0 ${
                    activeCategoryTab === cat
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredCourts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
              <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Tidak ada lapangan yang sesuai kriteria</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Coba ganti filter kota atau reset kategori cabang olahraga.
              </p>
              <button
                onClick={() => {
                  setSelectedSport('Semua');
                  setSelectedCity('Semua Kota');
                  setActiveCategoryTab('Semua');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourts.map((court) => (
                <div
                  key={court.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col overflow-hidden group"
                >
                  {/* Card Image Thumbnail */}
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {/* Unboxed Highlight Marker */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium">
                      {court.highlight}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Metadata Line (Unboxed) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-emerald-700">{court.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{court.district}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {court.rating}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1 mb-2">
                      {court.name}
                    </h3>

                    {/* Specs & Facilities preview */}
                    <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                      {court.surfaceType}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {court.facilities.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-slate-400">Mulai dari</div>
                        <div className="text-sm sm:text-base font-bold text-slate-900 font-mono tabular-nums">
                          Rp {court.pricePerHour.toLocaleString('id-ID')}
                          <span className="text-xs font-normal text-slate-500">/jam</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedCourtForDetail(court)}
                          className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                          title="Lihat Detail Lapangan"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleOpenBooking(court)}
                          className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-lg transition shadow-sm"
                        >
                          Pilih Slot
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. BANNER CTA MITRA (DARK SLATE SECTION WITH CONTRAST) */}
      <section className="py-16 md:py-20 w-full px-4 sm:px-6 lg:px-10">
        <div className="w-full relative rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-xl">
            {/* Ambient emerald radial glow */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-amber-400">
                  Kemitraan Pengelola Lapangan
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white" style={{ textWrap: 'balance' }}>
                  Punya Lapangan Olahraga? Maksimalkan Okupansi & Pendapatan Anda
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Tinggalkan buku catatan manual yang rawan keliru. Bergabunglah bersama 500+ venue rekanan di RuangSewa untuk otomatisasi jadwal, sistem pembayaran non-tunai, dan eksposur ke puluhan ribu pemain setiap bulan.
                </p>

                {/* Mitra Key Advantages */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dashboard Booking Live</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Rekonsiliasi Otomatis</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Proteksi No-Show</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  onClick={() => {
                    setMitraSuccess(false);
                    setIsMitraModalOpen(true);
                  }}
                  className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-500 rounded-xl hover:bg-amber-400 active:scale-95 transition-all shadow-md hover:shadow-amber-500/20 text-center"
                >
                  Daftar Jadi Mitra Sekarang
                </button>
                <a
                  href="#faq"
                  className="px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition text-center"
                >
                  Pelajari Sistem Mitra
                </a>
              </div>
            </div>
          </div>
        </section>

      {/* 7. FAQ SECTION (ACCORDION) */}
      <section id="faq" className="py-20 md:py-24 bg-white/70 border-t border-slate-200/60 w-full">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-14 space-y-2">
            <h2 className="text-xs md:text-sm font-semibold tracking-wider uppercase text-emerald-700">
              Pusat Informasi
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </p>
            <p className="text-sm text-slate-600">
              Semua hal penting mengenai sistem booking, pembayaran, dan kemitraan RuangSewa.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-700 transition"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FOOTER RINGKAS */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group">
                <LogoMark size={34} idPrefix="footer-logo" />
                <span>
                  Ruang<span className="text-emerald-500">Sewa</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Platform reservasi lapangan olahraga digital terpercaya. Temukan venue futsal, badminton, mini soccer, dan tenis terdekat dengan ketersediaan jadwal 100% transparan.
              </p>
              <div className="text-xs text-slate-500">
                PT Ruang Sewa Digital Nusantara · Jakarta Selatan, Indonesia
              </div>
            </div>

            {/* Kategori Cabang */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">Cabang Olahraga</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#katalog" onClick={() => setActiveCategoryTab('Futsal')} className="hover:text-white transition">Lapangan Futsal</a></li>
                <li><a href="#katalog" onClick={() => setActiveCategoryTab('Badminton')} className="hover:text-white transition">Lapangan Badminton</a></li>
                <li><a href="#katalog" onClick={() => setActiveCategoryTab('Mini Soccer')} className="hover:text-white transition">Mini Soccer Field</a></li>
                <li><a href="#katalog" onClick={() => setActiveCategoryTab('Tenis')} className="hover:text-white transition">Tenis & Padel Court</a></li>
              </ul>
            </div>

            {/* Navigasi */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">Platform</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#beranda" className="hover:text-white transition">Tentang Kami</a></li>
                <li><a href="#cara-kerja" className="hover:text-white transition">Cara Reservasi</a></li>
                <li><button onClick={() => { setMitraSuccess(false); setIsMitraModalOpen(true); }} className="hover:text-white transition text-left">Gabung Mitra Venue</button></li>
                <li><a href="#faq" className="hover:text-white transition">Pusat Bantuan</a></li>
              </ul>
            </div>

            {/* Kontak CS */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-4">Hubungi Kami</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+62 812-8899-7700</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>halo@ruangsewa.id</span>
                </li>
                <li className="text-xs text-slate-500 pt-1">
                  Layanan Bantuan 7 Hari / Minggu (08:00 - 22:00 WIB)
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 RuangSewa. Seluruh hak cipta dilindungi undang-undang.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-300 transition">Ketentuan Penggunaan</a>
              <span aria-hidden="true">·</span>
              <a href="#" className="hover:text-slate-300 transition">Kebijakan Privasi</a>
              <span aria-hidden="true">·</span>
              <button onClick={() => setIsCodeModalOpen(true)} className="hover:text-emerald-400 transition">
                Kode Template HTML5
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL 1: DETAIL LAPANGAN */}
      {selectedCourtForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700">{selectedCourtForDetail.category}</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{selectedCourtForDetail.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedCourtForDetail.district}, {selectedCourtForDetail.city}</p>
              </div>
              <button
                onClick={() => setSelectedCourtForDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden aspect-[16/9] mb-4 bg-slate-100">
              <img
                src={selectedCourtForDetail.image}
                alt={selectedCourtForDetail.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1">Spesifikasi Lapangan</div>
                <div className="font-medium text-slate-900">{selectedCourtForDetail.surfaceType}</div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1.5">Fasilitas Venue</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCourtForDetail.facilities.map((fac) => (
                    <span key={fac} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Tarif Sewa Reguler</div>
                  <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    Rp {selectedCourtForDetail.pricePerHour.toLocaleString('id-ID')} / jam
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                  {selectedCourtForDetail.slotsAvailableToday} Slot Hari Ini
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedCourtForDetail(null)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const target = selectedCourtForDetail;
                  setSelectedCourtForDetail(null);
                  handleOpenBooking(target);
                }}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-sm"
              >
                Lanjut Booking Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INTERACTIVE BOOKING DRAWER & SIMULASI CHECKOUT */}
      {selectedCourtForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700">Reservasi Lapangan</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedCourtForBooking.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCourtForBooking(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isBookingSuccess ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Reservasi Berhasil Dikonfirmasi!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  E-Ticket dan instruksi check-in telah dibuat untuk <strong>{bookingCustomerName}</strong> ({bookingCustomerPhone}).
                </p>

                {/* Simulated E-Ticket Card */}
                <div className="p-4 rounded-xl bg-slate-900 text-white text-left space-y-2 border border-slate-800 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                    <span>E-TICKET RUANGSEWA</span>
                    <span className="font-mono text-emerald-400">RS-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="text-sm font-bold">{selectedCourtForBooking.name}</div>
                  <div className="text-xs text-slate-300">
                    Jadwal: {searchDate} · Jam {selectedSlotTime}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400">Status Pembayaran: <span className="text-emerald-400 font-semibold">Lunas (QRIS)</span></span>
                    <QrCode className="w-7 h-7 text-white" />
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCourtForBooking(null)}
                  className="w-full py-2.5 text-xs font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 rounded-xl transition shadow-sm"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Pilih Jam Main (Slot Real-Time)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCourtForBooking.slots.map((slot) => (
                      <button
                        type="button"
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlotTime(slot.time)}
                        className={`p-2.5 text-xs rounded-xl font-semibold border text-left transition flex items-center justify-between ${
                          !slot.available
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                            : selectedSlotTime === slot.time
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500'
                        }`}
                      >
                        <div>
                          <div>{slot.time}</div>
                          <div className={`text-[10px] ${selectedSlotTime === slot.time ? 'text-emerald-100' : 'text-slate-500'}`}>
                            Rp {slot.price.toLocaleString('id-ID')}
                          </div>
                        </div>
                        {slot.available ? (
                          <span className="text-[10px] font-bold">Siap</span>
                        ) : (
                          <span className="text-[10px]">Penuh</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Nama Pemesan (Penanggung Jawab Tim)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dimas Pratama"
                    value={bookingCustomerName}
                    onChange={(e) => setBookingCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Nomor WhatsApp (Untuk Terima E-Ticket)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={bookingCustomerPhone}
                    onChange={(e) => setBookingCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Durasi Main</span>
                    <span className="font-semibold text-slate-900">1 Jam (Slot {selectedSlotTime || 'Belum dipilih'})</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Metode Pembayaran</span>
                    <span className="font-semibold text-emerald-700">QRIS / Instant VA</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1.5 text-sm">
                    <span>Total Pembayaran</span>
                    <span className="font-mono tabular-nums">
                      Rp {selectedCourtForBooking.pricePerHour.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedSlotTime}
                  className="w-full py-3 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed rounded-xl transition shadow-sm text-center"
                >
                  Konfirmasi Booking & E-Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: PENDAFTARAN MITRA VENUE */}
      {isMitraModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-semibold text-amber-600">Kemitraan RuangSewa</span>
                <h3 className="text-lg font-bold text-slate-900">Daftarkan Lapangan Anda</h3>
              </div>
              <button
                onClick={() => setIsMitraModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {mitraSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Pendaftaran Berhasil Dikirim!</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Terima kasih <strong>{mitraName}</strong>. Tim onboarding RuangSewa akan menghubungi nomor WhatsApp <strong>{mitraWa}</strong> dalam kurun waktu 1x24 jam untuk verifikasi venue dan setup sistem.
                </p>
                <button
                  onClick={() => setIsMitraModalOpen(false)}
                  className="w-full mt-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleMitraSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Nama Pemilik / Pengelola
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap Anda"
                    value={mitraName}
                    onChange={(e) => setMitraName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Nama Venue / Arena Olahraga
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Arena Futsal Nusantara"
                    value={mitraVenue}
                    onChange={(e) => setMitraVenue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Jenis Lapangan
                    </label>
                    <select
                      value={mitraSport}
                      onChange={(e) => setMitraSport(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Futsal">Futsal</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Mini Soccer">Mini Soccer</option>
                      <option value="Tenis">Tenis / Padel</option>
                      <option value="Multi">Multi-Sport</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Kota Lokasi
                    </label>
                    <select
                      value={mitraCity}
                      onChange={(e) => setMitraCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Jakarta Selatan">Jakarta Selatan</option>
                      <option value="Jakarta Barat">Jakarta Barat</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Tangerang">Tangerang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxxxxxx"
                    value={mitraWa}
                    onChange={(e) => setMitraWa(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-xl transition shadow-sm"
                  >
                    Kirim Data Mitra
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Gratis biaya pendaftaran & panduan sistem sampai live.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: STANDALONE HTML5 + TAILWIND CDN TEMPLATE VIEWER */}
      {isCodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-700">Kode Siap Pakai</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Kode HTML5 & Tailwind CDN</h3>
              </div>
              <button
                onClick={() => setIsCodeModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-3">
              File standalone murni dengan CDN Tailwind CSS, font Plus Jakarta Sans, dan palet warna sporty (Emerald, Amber, Slate) telah disiapkan di file <code>public/ruangsewa-landing.html</code>. Anda juga bisa menyalin cuplikan strukturnya di bawah:
            </p>

            <div className="relative flex-1 bg-slate-900 rounded-xl p-4 overflow-y-auto text-xs font-mono text-emerald-400">
              <pre className="whitespace-pre-wrap leading-relaxed">
{`<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RuangSewa - Platform Booking Lapangan Olahraga</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
          },
          colors: {
            brand: {
              primary: '#10B981', // Emerald 600
              accent: '#F59E0B',  // Amber 500
              dark: '#0F172A',    // Slate 900
            }
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body class="bg-slate-50 text-slate-800 antialiased font-sans">
  <!-- 1. Header (Sticky & Frosted Glass) -->
  <!-- 2. Hero Section + Floating Search Card -->
  <!-- 3. Value Proposition (3 Grid Fitur) -->
  <!-- 4. Cara Kerja (3 Step Cards) -->
  <!-- 5. Katalog Lapangan Populer -->
  <!-- 6. Banner CTA Mitra (Slate 900) -->
  <!-- 7. FAQ Accordion -->
  <!-- 8. Footer Ringkas -->
</body>
</html>`}
              </pre>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                {isCopied ? 'Tersalin ke clipboard!' : 'Klik salin untuk menggunakan di editor HTML'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={copyStandaloneHtml}
                  className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Tersalin!' : 'Salin Template'}</span>
                </button>
                <button
                  onClick={() => setIsCodeModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
