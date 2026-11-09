import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  Check, 
  Zap, 
  ChevronRight, 
  Phone, 
  Sparkles,
  X,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Activity,
  Flame,
  Award,
  Users,
  Layers,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  User
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import RegisterMemberModal from '../../components/RegisterMemberModal';

export default function GymLandingView({ 
  onOpenLogin, 
  onRegisterComplete,
  auth, 
  onLogout, 
  onGoToDashboard 
}) {
  // Modal Registration State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerPlanId, setRegisterPlanId] = useState('bulanan');

  const openRegister = (planId = 'bulanan') => {
    setRegisterPlanId(planId);
    setIsRegisterModalOpen(true);
  };

  // Interactive Crowd Meter Tab: 'pagi' | 'siang' | 'sore' | 'malam'
  const [crowdTime, setCrowdTime] = useState('sore');

  // Interactive Pricing Calculator State
  const [workoutDaysPerWeek, setWorkoutDaysPerWeek] = useState(4);
  const [selectedPlanCategory, setSelectedPlanCategory] = useState('all'); // 'all' | 'monthly' | 'daily'
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Facility filter: 'all' | 'strength' | 'cardio' | 'functional' | 'amenity'
  const [facilityFilter, setFacilityFilter] = useState('all');
  const [selectedFacilityModal, setSelectedFacilityModal] = useState(null);

  // FAQ Accordion State (open question id)
  const [openFaq, setOpenFaq] = useState(0);

  // 3 Pilihan Paket Resmi Trisis Gym (Strict Sesuai Arahan Owner)
  const plans = [
    {
      id: 'per_visit',
      category: 'daily',
      name: 'Per-Visit (Harian Flex)',
      price: 'Rp 25.000',
      numericPrice: 25000,
      period: '/ kunjungan',
      badge: 'Fleksibel',
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      desc: 'Bayar sekali untuk latihan fleksibel hari ini tanpa komitmen bulanan.',
      features: [
        'Akses penuh semua alat beban & kardio',
        'Locker harian gratis & shower bersih',
        'Berlaku satu hari penuh (06:00 - 22:00 WIB)',
        'Tanpa biaya pendaftaran awal'
      ],
      popular: false
    },
    {
      id: 'bulanan',
      category: 'monthly',
      name: 'Paket Bulanan (Monthly Pass)',
      price: 'Rp 100.000',
      numericPrice: 100000,
      period: '/ bulan',
      badge: 'Paling Diminati',
      badgeColor: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
      desc: 'Pilihan paling favorit untuk konsistensi pembentukan otot dan kebugaran.',
      features: [
        'Akses tak terbatas 30 hari penuh',
        'Kartu member digital & QR Code resmi',
        'Rekomendasi workout split & target makro',
        'Presensi mandiri & pelacakan streak',
        'Bebas biaya admin perpanjangan'
      ],
      popular: true
    },
    {
      id: 'tahunan',
      category: 'monthly',
      name: 'Paket Tahunan (Annual Pass)',
      price: 'Rp 1.200.000',
      numericPrice: 1200000,
      period: '/ tahun',
      badge: 'Nilai Terbaik VIP',
      badgeColor: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
      desc: 'Komitmen transformasi 1 tahun dengan harga paling hemat & benefit VIP.',
      features: [
        'Akses 365 hari penuh tanpa batas',
        'Free Exclusive Shaker & Merchandise Trisis Gym',
        '2x Sesi panduan privat bersama Senior Trainer',
        'Bisa ajukan cuti / freeze keanggotaan hingga 30 hari',
        'Prioritas akses event & seminar kebugaran'
      ],
      popular: false
    }
  ];

  // Facilities with Authentic Trisis Gym Photos & Equipment
  const facilities = [
    {
      id: 'strength',
      category: 'strength',
      title: 'Free Weights & Dumbbell Zone',
      tag: 'Dumbbell & Benches',
      desc: 'Area angkat beban lengkap dengan rak dumbbell bertingkat, adjustable incline benches, sepeda statis DHZ Fitness, dan logo 3D Trisis Gym yang ikonik.',
      image: '/images/facilities/trisis_080449.jpg',
      highlights: ['Rak Dumbbell Lengkap & Rapi', 'Adjustable Incline Benches', 'Sepeda Statis DHZ Fitness', 'Mirror Wall & 3D Logo Sign']
    },
    {
      id: 'power',
      category: 'power',
      title: 'Olympic Bench & Power Area',
      tag: 'Mural & Bench Press',
      desc: 'Stasiun bench press kokoh dengan Olympic barbell, bumper plate berstandar, dan mural bodybuilder berenergi tinggi dengan pencahayaan neon ambient.',
      image: '/images/facilities/trisis_mural.jpg',
      highlights: ['Olympic Flat & Incline Bench', 'Olympic Barbell & Bumper Plates', 'Mural Bodybuilder Ikonik', 'Pencahayaan LED Ambient Biru-Ungu']
    },
    {
      id: 'machine',
      category: 'machine',
      title: 'BRTW Machine & Cable Zone',
      tag: 'Mesin Beban & Kabel',
      desc: 'Rangkaian alat isolasi pin-loaded merk BRTW terawat, stasiun cable crossover, dan cermin dinding luas untuk koreksi postur repetisi secara presisi.',
      image: '/images/facilities/trisis_machine.jpg',
      highlights: ['Selectorized Machine BRTW', 'Cable Station & Lat Pulldown', 'Cermin Luas Koreksi Form', 'Lantai Karet Rubber Gym']
    },
    {
      id: 'locker',
      category: 'amenity',
      title: 'Locker Room & Reception Area',
      tag: 'Loker & Resepsionis',
      desc: 'Fasilitas loker penyimpanan barang pribadi yang aman dan rapi, area resepsionis ber-AC, timbangan badan presisi, serta display penghargaan kebugaran.',
      image: '/images/facilities/trisis_locker.jpg',
      highlights: ['Loker Penyimpanan Pribadi', 'Timbangan Badan Digital', 'Kamar Mandi & Toilet Bersih', 'Display Piala Prestasi Gym']
    }
  ];

  // Crowd Time Slots Info
  const crowdSlots = {
    pagi: {
      time: '06.00 - 10.00 WIB',
      percent: 30,
      label: 'Sangat Tenang',
      color: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40',
      barColor: 'bg-emerald-500',
      note: 'Waktu terbaik untuk latihan fokus tanpa antre alat sama sekali. Udara pagi segar dan adem.'
    },
    siang: {
      time: '11.00 - 15.00 WIB',
      percent: 45,
      label: 'Cukup Lengang',
      color: 'text-blue-400 bg-blue-950/50 border-blue-800/40',
      barColor: 'bg-blue-500',
      note: 'Ideal untuk mahasiswa di jeda jam kuliah atau pekerja fleksibel. Ruang gerak sangat leluasa.'
    },
    sore: {
      time: '16.00 - 19.30 WIB',
      percent: 75,
      label: 'Ramai & Berenergi',
      color: 'text-amber-400 bg-amber-950/50 border-amber-800/40',
      barColor: 'bg-amber-500',
      note: 'Jam puncak sepulang kuliah dan kerja. Suasana sangat bersemangat dan saling memotivasi.'
    },
    malam: {
      time: '20.00 - 22.00 WIB',
      percent: 40,
      label: 'Kondusif & Rileks',
      color: 'text-sky-300 bg-sky-950/50 border-sky-800/40',
      barColor: 'bg-sky-500',
      note: 'Suasana mulai tenang kembali, cocok untuk sesi latihan malam santai sebelum istirahat.'
    }
  };

  // FAQs Data
  const faqs = [
    {
      q: 'Apakah pemula yang belum pernah gym akan dibimbing?',
      a: 'Pasti! Tim trainer kami siap menyambut, mengenalkan fungsi setiap alat, dan memberikan arahan bentuk gerakan (form) yang aman di sesi awal agar kamu tidak canggung atau cedera.'
    },
    {
      q: 'Berapa biaya membership di Trisis Gym?',
      a: 'Trisis Gym menyediakan 3 pilihan transparan tanpa biaya pendaftaran tersembunyi: Per-Visit Harian (Rp 25.000 / kunjungan), Paket Bulanan (Rp 100.000 / bulan), dan Paket Tahunan (Rp 1.200.000 / tahun).'
    },
    {
      q: 'Bagaimana cara kerja kartu member digital dan presensi?',
      a: 'Setelah mendaftar, kamu mendapatkan akses ke Web App Trisis Gym. Kartu member digital dan QR code tersimpan di akunmu untuk check-in mandiri di resepsionis setiap kali datang.'
    },
    {
      q: 'Apakah bisa latihan harian tanpa komitmen langganan bulanan?',
      a: 'Bisa banget! Kami menyediakan paket Per-Visit seharga Rp 25.000 per kunjungan dengan akses penuh ke semua alat beban, kardio, dan locker gratis.'
    },
    {
      q: 'Fasilitas apa saja yang sudah termasuk gratis?',
      a: 'Locker penyimpanan barang harian, kamar mandi shower bersih, air minum isi ulang, koneksi Wi-Fi kencang, serta area parkir mobil dan motor yang aman terpantau CCTV 24 jam.'
    }
  ];

  // Filtered packages
  const filteredPlans = plans.filter((p) => {
    if (selectedPlanCategory === 'all') return true;
    return p.category === selectedPlanCategory;
  });

  // Filtered facilities
  const filteredFacilities = facilities.filter((f) => {
    if (facilityFilter === 'all') return true;
    return f.category === facilityFilter;
  });

  // Calculation for Interactive Savings Slider
  const monthlySessions = workoutDaysPerWeek * 4;
  const costIfPerVisit = monthlySessions * 25000;
  const monthlySavings = costIfPerVisit - 100000;
  const annualSavings = (costIfPerVisit * 12) - 1200000;
  const costPerSessionMonthly = Math.round(100000 / monthlySessions);
  const costPerSessionAnnual = Math.round(1200000 / (monthlySessions * 12));

  return (
    <div className="min-h-screen bg-[#090A0E] text-zinc-100 font-sans selection:bg-amber-400 selection:text-neutral-950">

      {/* ============================================================== */}
      {/* 1. TOP NAVBAR — FLUID, MODERN & ELEGANT */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#090A0E]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand Logo (Unboxed, Natural Floating PNG) */}
          <a href="#hero" className="flex items-center gap-3 group cursor-pointer select-none">
            <img 
              src="/logo.png" 
              alt="Trisis Gym Logo" 
              className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)] transition-transform duration-200 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight group-hover:text-amber-300 transition-colors">
                TRISIS<span className="text-amber-400 font-extrabold">GYM</span>
              </span>
              <p className="text-[10px] text-zinc-400 font-medium tracking-wide leading-none mt-0.5">Fitness Club • Est. Bogor</p>
            </div>
          </a>

          {/* Desktop Nav Links (Sleek Floating Pill Navigation) */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 border border-white/[0.08] rounded-full px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md">
            <a href="#hero" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200">Beranda</a>
            <a href="#kepadatan" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200">Live Crowd</a>
            <a href="#fasilitas" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200">Fasilitas</a>
            <a href="#kalkulator" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200">Kalkulator</a>
            <a href="#paket" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200">Pilihan Paket</a>
            <a href="#faq" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200">FAQ</a>
          </nav>

          {/* Action Buttons: Login / Dashboard / Logout (Pill Style) */}
          <div className="flex items-center gap-2.5">
            {auth?.isAuthenticated ? (
              <>
                <div className="hidden lg:flex items-center gap-2 text-xs bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-full">
                  <User className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="font-bold text-white">{auth.user?.name?.split(' ')[0]}</span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">({auth.user?.role || 'Member'})</span>
                </div>

                <button
                  onClick={onGoToDashboard}
                  className="text-xs font-bold px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-400/20 active:scale-95"
                >
                  <span>Buka Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Keluar dari Akun"
                    className="text-xs font-bold px-3.5 py-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-rose-400 border border-zinc-700/60 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span className="hidden sm:inline">Keluar</span>
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="text-xs font-medium px-4 py-2 rounded-full text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Login Member</span>
                </button>

                <button
                  onClick={() => openRegister('bulanan')}
                  className="text-xs font-bold px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-400/20 hover:shadow-amber-400/35 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Zap className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950" />
                  <span>Daftar Member</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION — CLEAN, MINIMALIST & ELEGAN */}
      {/* ============================================================== */}
      <section id="hero" className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-30 px-4 md:px-8 border-b border-white/[0.08] bg-[#090A0E] flex items-center justify-center min-h-[580px]">
        {/* Real Gym Community Background Banner — Bright, Clear & Vibrant */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/gym-hero-banner.jpg"
            alt="Suasana Komunitas Trisis Gym Bogor"
            className="w-full h-full object-cover object-[center_32%] filter brightness-[0.70] contrast-[1.08] saturate-[1.05] scale-105"
          />
          {/* Soft Gradient Overlay: Keeps top & bottom seamless while letting center gym photo shine bright */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090A0E]/80 via-black/35 to-[#090A0E]" />
          {/* Soft Focused Shadow behind text for razor-sharp legibility */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[440px] bg-black/40 rounded-full blur-[75px]" />

          {/* Ambient Warm Golden Atmospheric Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[360px] bg-amber-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-3xl mx-auto space-y-5 text-center relative z-10">
          {/* Minimalist Brand Tag */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 text-xs font-medium tracking-wide backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Trisis Fitness Club • Est. Bogor, Indonesia</span>
            </div>
          </div>

          {/* Main Headline (Clean, Strong, Confident with shadow for high contrast) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Latihan Lebih Terarah, <br />
            Bangun Fisik Impian di <span className="text-amber-400">Trisis Gym</span>.
          </h1>

          {/* Subtitle (1 Concise & Meaningful Sentence with crisp shadow) */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-200 font-medium max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Fasilitas fitness modern di Bogor dengan alat beban lengkap, suasana fokus, dan portal pintar untuk perkembangan latihan Anda.
          </p>

          {/* Dual CTAs (Sleek, High-End Athletic Pill Buttons) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => openRegister('bulanan')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-xl shadow-amber-400/20 hover:shadow-amber-400/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Daftar Member Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.10] border border-white/15 hover:border-white/30 text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4 text-zinc-300" />
              <span>Login Member</span>
            </button>
          </div>

          {/* Minimalist Footnote Line (Clean & Unobtrusive) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-zinc-300 font-normal">
            <span>50+ Unit Alat Lengkap</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-amber-300 font-medium">Mulai Rp 25.000 / Sesi</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span>Buka Setiap Hari (06:00 – 22:00 WIB)</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. FITUR INTERAKTIF: LIVE CROWD & KALKULATOR (2-KOLOM COMPACT) */}
      {/* ============================================================== */}
      <section id="kepadatan" className="py-8 md:py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-5">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20">
            Fitur Cerdas Member
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Live Kepadatan & Kalkulator Penghematan
          </h2>
          <p className="text-xs text-zinc-400">
            Pantau jam latihan terbaik bebas antre dan kalkulasikan efisiensi biaya membership Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* KOLOM 1: LIVE GYM CROWD METER */}
          <div className="bg-[#111319] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Status Kepadatan Alat</h3>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                  Live Update
                </span>
              </div>

              {/* Slot Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: 'pagi', title: 'Pagi', time: '06-10' },
                  { id: 'siang', title: 'Siang', time: '11-15' },
                  { id: 'sore', title: 'Sore', time: '16-19' },
                  { id: 'malam', title: 'Malam', time: '20-22' }
                ].map((slot) => {
                  const isActive = crowdTime === slot.id;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setCrowdTime(slot.id)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        isActive 
                          ? 'border-zinc-700 bg-zinc-800 text-white font-bold' 
                          : 'border-white/[0.06] hover:bg-zinc-800/50 text-zinc-400'
                      }`}
                    >
                      <strong className="block text-xs">{slot.title}</strong>
                      <span className="text-[9px] text-zinc-400">{slot.time} WIB</span>
                    </button>
                  );
                })}
              </div>

              {/* Status Display Card */}
              <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-white/[0.06] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">Jam: {crowdSlots[crowdTime].time} WIB</span>
                  <span className="font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded text-[10px]">
                    {crowdSlots[crowdTime].label} ({crowdSlots[crowdTime].percent}%)
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                    style={{ width: `${crowdSlots[crowdTime].percent}%` }}
                  />
                </div>

                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  💡 <strong className="text-amber-400">Tips:</strong> {crowdSlots[crowdTime].note}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.04] text-[10px] text-zinc-500 flex items-center justify-between">
              <span>Sensor Kapasitas Trisis Gym</span>
              <span>Kapasitas Maksimal: 75 Orang</span>
            </div>
          </div>

          {/* KOLOM 2: KALKULATOR PENGHEMATAN BIAYA */}
          <div id="kalkulator" className="bg-[#111319] border border-amber-500/25 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Simulasi Biaya Membership</h3>
                </div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                  Hemat s/d 70%
                </span>
              </div>

              {/* Frequency Range Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="frequency-slider" className="font-semibold text-zinc-300">
                    Target Sesi per Minggu:
                  </label>
                  <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20 text-xs">
                    {workoutDaysPerWeek} Hari / Minggu
                  </span>
                </div>
                <input
                  id="frequency-slider"
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={workoutDaysPerWeek}
                  onChange={(e) => setWorkoutDaysPerWeek(Number(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Price Comparison Row */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-amber-400/20 space-y-0.5">
                  <span className="text-[10px] text-zinc-400 block">Paket Bulanan:</span>
                  <span className="text-base font-extrabold text-amber-400">
                    Rp {costPerSessionMonthly.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[9px] text-zinc-500 block">/ sesi ({monthlySessions}x latihan)</span>
                  <span className="text-[10px] font-bold text-emerald-400 block pt-0.5">
                    Hemat Rp {Math.max(0, monthlySavings).toLocaleString('id-ID')}/bln
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/[0.04] space-y-0.5">
                  <span className="text-[10px] text-zinc-400 block">Bayar Harian:</span>
                  <span className="text-base font-bold text-zinc-300">
                    Rp {costIfPerVisit.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[9px] text-zinc-500 block">total / bulan (Rp 25k/sesi)</span>
                  <span className="text-[10px] text-zinc-500 block pt-0.5">Tanpa diskon paket</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openRegister('bulanan')}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/15"
            >
              <span>Daftar Paket Bulanan (Rp 100k)</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-950" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* 4. PILIHAN PAKET MEMBERSHIP (PRICING & TAWARAN) */}
      {/* ============================================================== */}
      <section id="paket" className="py-8 md:py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20">
            Tawaran Membership
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Pilihan Paket Transparan Tanpa Komitmen Ribet
          </h2>
          <p className="text-xs text-zinc-400">
            Pilih paket yang paling sesuai dengan target dan frekuensi latihanmu.
          </p>
        </div>

        {/* Category Tabs & Compare Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/80 rounded-xl text-xs font-semibold w-full sm:w-auto border border-white/[0.04]">
            <button
              onClick={() => setSelectedPlanCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlanCategory === 'all'
                  ? 'bg-zinc-800 text-white font-bold border border-zinc-700/80'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Semua Paket (3)
            </button>
            <button
              onClick={() => setSelectedPlanCategory('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlanCategory === 'monthly'
                  ? 'bg-zinc-800 text-white font-bold border border-zinc-700/80'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Bulanan & Tahunan
            </button>
            <button
              onClick={() => setSelectedPlanCategory('daily')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlanCategory === 'daily'
                  ? 'bg-zinc-800 text-white font-bold border border-zinc-700/80'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Harian (Per-Visit)
            </button>
          </div>

          <button
            onClick={() => setShowComparisonModal(true)}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1.5 cursor-pointer py-1"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Bandingkan Detail Semua Fitur Paket</span>
          </button>
        </div>

        {/* Pricing Cards Grid — 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {filteredPlans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-200 ${
                p.popular
                  ? 'border-amber-400/50 bg-[#141620] relative ring-1 ring-amber-400/30 shadow-xl shadow-amber-400/5'
                  : 'bg-[#111319] border-white/[0.08] hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-2.5 min-h-[22px]">
                  {p.badge ? (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  ) : <span />}
                  {p.popular && (
                    <span className="text-[10px] font-bold text-neutral-950 bg-amber-400 px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                      ⭐ Rekomendasi
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-white">{p.name}</h3>
                <p className="text-xs text-zinc-400 mt-0.5 min-h-[30px] leading-relaxed">{p.desc}</p>

                <div className="my-3 pt-3 border-t border-white/[0.06]">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">{p.price}</span>
                  <span className="text-xs text-zinc-400 font-medium ml-1">{p.period}</span>
                </div>

                {/* Features list */}
                <ul className="space-y-2 text-xs text-zinc-300 mb-5">
                  {p.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => openRegister(p.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  p.popular
                    ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md shadow-amber-400/20'
                    : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/60'
                }`}
              >
                <span>Pilih & Daftar Paket Ini</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FASILITAS GYM (COMPACT MODERN GRID) */}
      {/* ============================================================== */}
      <section id="fasilitas" className="py-8 md:py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20">
            Fasilitas Standar Modern
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Ruang Latihan Nyaman & Peralatan Terawat
          </h2>
          <p className="text-xs text-zinc-400">
            Jelajahi setiap sudut Trisis Gym yang dirancang untuk mendukung target latihanmu.
          </p>
        </div>

        {/* Facility Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {[
            { id: 'all', label: 'Semua Fasilitas' },
            { id: 'strength', label: '🏋️ Area Beban' },
            { id: 'power', label: '⚡ Bench & Power' },
            { id: 'machine', label: '⚙️ Mesin BRTW' },
            { id: 'amenity', label: '🚿 Loker & Resepsionis' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFacilityFilter(cat.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer border ${
                facilityFilter === cat.id
                  ? 'bg-zinc-800 text-white border-zinc-700/80 font-bold'
                  : 'bg-[#111319] text-zinc-400 border-white/[0.08] hover:bg-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facility Cards Grid with Compact Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              onClick={() => setSelectedFacilityModal(fac)}
              className="bg-[#111319] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-zinc-700 transition-all duration-200 group cursor-pointer flex flex-col justify-between"
            >
              {/* Facility Image Cover with compact height */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-zinc-900">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-black/80 text-zinc-200 border border-white/10 backdrop-blur-md">
                    {fac.tag}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="text-sm font-bold">{fac.title}</h3>
                </div>
              </div>

              {/* Facility Description & Highlights */}
              <div className="p-3.5 space-y-2">
                <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">{fac.desc}</p>

                <div className="flex flex-wrap gap-1 pt-0.5">
                  {fac.highlights.slice(0, 3).map((item, hIdx) => (
                    <span 
                      key={hIdx} 
                      className="text-[9px] font-medium px-2 py-0.5 rounded-lg bg-zinc-800/80 border border-white/[0.04] text-zinc-300"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FAQ & LOKASI GYM (2-KOLOM COMPACT) */}
      {/* ============================================================== */}
      <section id="faq" className="py-8 md:py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-6 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* KOLOM KIRI: PERTANYAAN UMUM (FAQ) */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20">
                FAQ
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-1">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Hal penting seputar latihan, fasilitas, dan membership di Trisis Gym.
              </p>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="bg-[#111319] border border-white/[0.08] rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-800/40 transition-colors cursor-pointer gap-2.5"
                    >
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {faq.q}
                      </span>
                      <div className="shrink-0 text-zinc-400">
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-amber-400" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-0 text-xs text-zinc-300 leading-relaxed border-t border-white/[0.06] bg-zinc-900/40">
                        <p className="pt-2 text-[11.5px]">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* KOLOM KANAN: LOKASI & JAM OPERASIONAL */}
          <div id="lokasi" className="space-y-4 bg-[#111319] p-5 md:p-6 rounded-2xl border border-white/[0.08]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Lokasi & Akses
                </span>
                <h3 className="text-base font-bold text-white mt-1">Kunjungi Trisis Gym Bogor</h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                Buka Sekarang
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/80 border border-white/[0.06]">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs">Alamat Gym</strong>
                  <span className="text-zinc-400 text-[11px]">Kota Bogor, Jawa Barat (Dekat Pusat Kota & Kampus IPB / Pakuan)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/80 border border-white/[0.06]">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs">Jam Operasional</strong>
                  <span className="text-zinc-400 text-[11px]">Senin – Sabtu: 06.00 – 22.00 WIB | Minggu: 07.00 – 20.00 WIB</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Trisis%20Gym,%20saya%20mau%20tanya%20info%20membership"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Kasir</span>
              </a>

              <button
                onClick={onOpenLogin}
                className="w-full sm:w-1/2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700/60 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Masuk Member</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. FOOTER — PRESTISIUS, LENGKAP & ELEGAN */}
      {/* ============================================================== */}
      <footer className="bg-[#06070A] border-t border-white/[0.08] pt-14 pb-8 px-4 md:px-8 text-xs text-zinc-400 relative overflow-hidden">
        {/* Subtle Ambient Glow at top */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          {/* Main Footer Grid: 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Col 1: Brand & Identity (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <a href="#hero" className="flex items-center gap-3 group inline-flex select-none">
                <img 
                  src="/logo.png" 
                  alt="Trisis Gym Logo" 
                  className="h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)] transition-transform duration-200 group-hover:scale-105" 
                />
                <div className="flex flex-col">
                  <span className="font-black text-lg tracking-tight text-white leading-tight">
                    TRISIS<span className="text-amber-400 font-extrabold">GYM</span>
                  </span>
                  <p className="text-[10px] text-zinc-400 font-medium tracking-wide leading-none mt-0.5">Fitness Club • Est. Bogor, Indonesia</p>
                </div>
              </a>

              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                Fasilitas pusat kebugaran modern ramah pemula di Kota Bogor. Dilengkapi unit beban lengkap, suasana latihan fokus, dan portal pintar untuk memantau kemajuan fisik Anda.
              </p>

              {/* Live Operational Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-[11px] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Buka Setiap Hari: 06:00 – 22:00 WIB</span>
              </div>

              {/* Direct Quick WhatsApp CTA */}
              <div className="pt-1">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Admin%20Trisis%20Gym,%20saya%20ingin%20tanya%20info%20membership"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-semibold text-xs transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chat CS Kasir via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Col 2: Navigasi Website (2 Cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Eksplorasi</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-amber-400 transition-colors">Beranda Utama</a></li>
                <li><a href="#kepadatan" className="hover:text-amber-400 transition-colors">Live Okupansi Alat</a></li>
                <li><a href="#kalkulator" className="hover:text-amber-400 transition-colors">Kalkulator Penghematan</a></li>
                <li><a href="#fasilitas" className="hover:text-amber-400 transition-colors">Fasilitas & Alat Beban</a></li>
                <li><a href="#paket" className="hover:text-amber-400 transition-colors">Pilihan Paket Member</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition-colors">Tanya Jawab (FAQ)</a></li>
              </ul>
            </div>

            {/* Col 3: Portal & Fitur Pintar (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Layanan & Member</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={onOpenLogin} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                    Masuk Portal Member
                  </button>
                </li>
                <li>
                  <button onClick={() => openRegister('bulanan')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                    Daftar Akun Member Baru
                  </button>
                </li>
                <li><span className="text-zinc-500">QR Code Presensi Mandiri</span></li>
                <li><span className="text-zinc-500">Rekomendasi Workout Split</span></li>
                <li><span className="text-zinc-500">Kalkulator Makronutrisi Harian</span></li>
                <li><span className="text-zinc-500">Pelacak Konsistensi & Streak</span></li>
              </ul>
            </div>

            {/* Col 4: Alamat & Kontak (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Lokasi & Jam Buka</h4>
              <div className="space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Jl. Trisis Fitness No. 12, Bogor Barat, Kota Bogor, Jawa Barat 16118.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-300 block">Senin – Sabtu:</strong>
                    <span>06:00 – 22:00 WIB</span>
                    <strong className="text-zinc-300 block mt-1">Minggu & Libur:</strong>
                    <span>07:00 – 20:00 WIB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Divider & Legal / Copyright Bar */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">© 2026 Trisis Gym Bogor.</span>
              <span>Hak cipta dilindungi undang-undang.</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-zinc-400">Tanpa Biaya Admin Tersembunyi</span>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <span className="text-zinc-400">Aplikasi Member Resmi</span>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <span className="text-zinc-400 font-medium">Bogor, Jawa Barat</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 10. MODAL ALUR PENDAFTARAN & PEMBAYARAN MEMBER LENGKAP */}
      {/* ============================================================== */}
      <RegisterMemberModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        initialPlanId={registerPlanId}
        onRegisterComplete={(newMember, autoEnter) => {
          if (onRegisterComplete) {
            onRegisterComplete(newMember, autoEnter);
          }
        }}
        onOpenLogin={onOpenLogin}
      />

      {/* ============================================================== */}
      {/* 11. MODAL DETAIL FASILITAS */}
      {/* ============================================================== */}
      {selectedFacilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#111319] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden space-y-4">
            <div className="relative h-64 sm:h-72 w-full bg-zinc-900">
              <img
                src={selectedFacilityModal.image}
                alt={selectedFacilityModal.title}
                className="w-full h-full object-cover object-[center_35%]"
              />
              <button
                onClick={() => setSelectedFacilityModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-zinc-300 flex items-center justify-center shadow-md cursor-pointer hover:bg-black hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-zinc-900/90 border border-white/[0.08] text-zinc-200">
                  {selectedFacilityModal.tag}
                </span>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-3">
              <h3 className="text-base font-bold text-white">{selectedFacilityModal.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">{selectedFacilityModal.desc}</p>

              <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Daftar Alat & Keunggulan:
                </span>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {selectedFacilityModal.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedFacilityModal(null)}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs transition-colors cursor-pointer mt-2"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 12. MODAL TABEL PERBANDINGAN FITUR SEMUA PAKET */}
      {/* ============================================================== */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#111319] border border-white/[0.08] rounded-2xl shadow-2xl p-5 md:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Perbandingan Menyeluruh</span>
                <h3 className="text-base font-bold text-white">Tabel Benefit Setiap Paket</h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] text-zinc-400 text-[10px] uppercase font-bold">
                    <th className="py-2.5">Fasilitas / Benefit</th>
                    <th className="py-2.5 text-zinc-300">Per-Visit (Rp 25k)</th>
                    <th className="py-2.5 text-amber-400">Bulanan (Rp 100k)</th>
                    <th className="py-2.5 text-emerald-400">Tahunan (Rp 1.2jt)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-zinc-300">
                  <tr>
                    <td className="py-2.5 font-bold text-white">Akses Beban & Kardio</td>
                    <td className="py-2.5">1 Hari Penuh</td>
                    <td className="py-2.5">30 Hari Tanpa Batas</td>
                    <td className="py-2.5">365 Hari Tanpa Batas</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Locker & Shower</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Aplikasi Web Pendamping</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Rekomendasi Workout & Makro</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Konsultasi Privat Trainer</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">Sesi Awal</td>
                    <td className="py-2.5">2x Sesi Privat</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Cuti / Freeze Membership</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">Hingga 30 Hari</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Merchandise Eksklusif (Shaker)</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">✓ Gratis</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex justify-end">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup Tabel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
