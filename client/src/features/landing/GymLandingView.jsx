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

export default function GymLandingView({ 
  onOpenLogin, 
  onQuickDemoLogin, 
  onQuickAdminLogin,
  auth, 
  onLogout, 
  onGoToDashboard 
}) {
  // Modal State
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phone: '',
    email: '',
    plan: 'reguler'
  });

  // Interactive Hero Preview Tab: 'card' | 'streak' | 'coach'
  const [heroInteractiveTab, setHeroInteractiveTab] = useState('card');

  // Interactive Crowd Meter Tab: 'pagi' | 'siang' | 'sore' | 'malam'
  const [crowdTime, setCrowdTime] = useState('sore');

  // Interactive Pricing Calculator State
  const [workoutDaysPerWeek, setWorkoutDaysPerWeek] = useState(4);
  const [selectedPlanCategory, setSelectedPlanCategory] = useState('all'); // 'all' | 'monthly' | 'student' | 'daily'
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Facility filter: 'all' | 'strength' | 'cardio' | 'functional' | 'amenity'
  const [facilityFilter, setFacilityFilter] = useState('all');
  const [selectedFacilityModal, setSelectedFacilityModal] = useState(null);

  // FAQ Accordion State (open question id)
  const [openFaq, setOpenFaq] = useState(0);

  // Packages Data
  const plans = [
    {
      id: 'per_visit',
      category: 'daily',
      name: 'Per-Visit (Harian Flex)',
      price: 'Rp 25.000',
      numericPrice: 25000,
      period: '/ kunjungan',
      badge: 'Fleksibel',
      badgeColor: 'bg-white/10 text-slate-300 border-white/10',
      desc: 'Bayar sekali untuk latihan fleksibel hari ini tanpa komitmen bulanan.',
      features: [
        'Akses penuh semua alat beban & kardio',
        'Locker harian gratis',
        'Berlaku satu hari penuh (bebas jam)',
        'Tanpa biaya pendaftaran'
      ],
      popular: false
    },
    {
      id: 'mahasiswa',
      category: 'student',
      name: 'Paket Mahasiswa / Pelajar',
      price: 'Rp 175.000',
      numericPrice: 175000,
      period: '/ bulan',
      badge: 'Diskon Kampus',
      badgeColor: 'bg-blue-950/60 text-blue-300 border-blue-800/40',
      desc: 'Tarif spesial khusus mahasiswa & pelajar dengan kartu identitas aktif.',
      features: [
        'Akses tak terbatas 30 hari penuh',
        'Gratis konsultasi program awal',
        'Akses aplikasi pendamping latihan',
        'Fasilitas shower & locker'
      ],
      popular: false
    },
    {
      id: 'reguler',
      category: 'monthly',
      name: 'Paket Bulanan Reguler',
      price: 'Rp 225.000',
      numericPrice: 225000,
      period: '/ bulan',
      badge: 'Paling Diminati',
      badgeColor: 'bg-purple-950/60 text-purple-300 border-purple-800/40',
      desc: 'Pilihan paling favorit untuk konsistensi pembentukan otot dan kebugaran.',
      features: [
        'Akses tak terbatas 30 hari penuh',
        'Kartu member digital eksklusif',
        'Rekomendasi workout split & target makro',
        'Presensi mandiri & pelacakan streak',
        'Bebas biaya admin perpanjangan'
      ],
      popular: true
    },
    {
      id: 'annual',
      category: 'monthly',
      name: 'Annual VIP Pass (1 Tahun)',
      price: 'Rp 1.950.000',
      numericPrice: 1950000,
      period: '/ tahun',
      badge: 'Hemat 30%',
      badgeColor: 'bg-amber-950/60 text-amber-300 border-amber-800/40',
      desc: 'Komitmen transformasi 1 tahun dengan harga paling hemat & benefit VIP.',
      features: [
        'Akses 365 hari penuh tanpa batas',
        'Free T-Shirt Eksklusif Trisis Gym & Shaker',
        '2x Sesi panduan privat bersama Senior Trainer',
        'Bisa ajukan cuti / freeze keanggotaan hingga 30 hari',
        'Prioritas akses event & seminar kebugaran'
      ],
      popular: false
    }
  ];

  // Facilities with Generated Real Images
  const facilities = [
    {
      id: 'strength',
      category: 'strength',
      title: 'Free Weights & Strength Zone',
      tag: 'Beban Bebas & Dumbbell',
      desc: 'Area angkat beban lengkap dengan Dumbbell set 2 - 40 kg, Olympic Barbells, Power Racks, Smith Machine, Cable Crossover, dan Bench Press terawat.',
      image: '/images/facilities/freeweight.jpg',
      highlights: ['Dumbbell 2 - 40 kg', 'Olympic Barbells & Bumper Plates', 'Squat & Power Racks', 'Smith Machine & Cable Stations']
    },
    {
      id: 'cardio',
      category: 'cardio',
      title: 'Cardio Endurance Zone',
      tag: 'Kardio & Pembakaran Lemak',
      desc: 'Barisan treadmill elektrik layar digital, elliptical cross-trainer, dan stationary bikes dengan sensor detak jantung untuk pembakaran kalori optimal.',
      image: '/images/facilities/cardio.jpg',
      highlights: ['Treadmill Digital Canggih', 'Elliptical Cross-Trainers', 'Spinning & Stationary Bikes', 'Monitor Heart Rate & Kalori']
    },
    {
      id: 'functional',
      category: 'functional',
      title: 'Functional & Stretching Area',
      tag: 'Fungsional & Fleksibilitas',
      desc: 'Area rumput sintetis empuk dan lantai karet untuk pemanasan, latihan HIIT, battle ropes, kettlebells, resistance bands, dan plyometric box.',
      image: '/images/facilities/functional.jpg',
      highlights: ['Area Rumput Sintetis / Turf', 'Heavy Battle Ropes', 'Kettlebells Beragam Ukuran', 'Foam Rollers & Yoga Mats']
    },
    {
      id: 'locker',
      category: 'amenity',
      title: 'Locker, Shower & Kenyamanan',
      tag: 'Fasilitas & Relaksasi',
      desc: 'Locker penyimpanan barang pribadi dengan keamanan terjamin, kamar mandi shower bersih, air minum isi ulang gratis, dan area santai ber-AC.',
      image: '/images/facilities/locker.jpg',
      highlights: ['Locker Kunci Digital Pribadi', 'Kamar Mandi Shower Bersih', 'Air Minum Isi Ulang Gratis', 'Wi-Fi Cepat & Parkir Luas']
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
      color: 'text-purple-300 bg-purple-950/50 border-purple-800/40',
      barColor: 'bg-[#8B78A5]',
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
      q: 'Apa syarat untuk mendapatkan tarif Paket Mahasiswa (Rp 175rb)?',
      a: 'Cukup menunjukkan Kartu Tanda Mahasiswa (KTM) atau kartu pelajar yang masih aktif saat verifikasi pertama. Berlaku untuk seluruh kampus di Bogor dan sekitarnya (IPB University, Universitas Pakuan, UIKA, dll).'
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
  const studentSavings = costIfPerVisit - 175000;
  const regularSavings = costIfPerVisit - 225000;
  const costPerSessionStudent = Math.round(175000 / monthlySessions);
  const costPerSessionRegular = Math.round(225000 / monthlySessions);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setSelectedPlanModal(null);
      onQuickDemoLogin();
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#0B0D14] text-slate-100 font-sans selection:bg-[#4E3F66] selection:text-white">
      {/* Ambient background glow effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/15 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full" />
      </div>

      {/* ============================================================== */}
      {/* 1. TOP NAVBAR */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#0B0D14]/90 backdrop-blur-md border-b border-white/10 shadow-[0_2px_15px_rgba(0,0,0,0.5)] px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-amber-400/40 flex items-center justify-center shadow-xs overflow-hidden p-0.5 shrink-0 ring-2 ring-amber-400/10">
              <img src="/logo.png" alt="Trisis Gym Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white">
                  TRISIS<span className="text-amber-400 font-black">GYM</span>
                </span>
                <StatusBadge status="DEMO" size="xs" />
              </div>
              <p className="text-[10px] text-slate-400 font-semibold leading-none">Fitness Club • Est. Bogor, Indonesia</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
            <a href="#hero" className="hover:text-amber-400 transition-colors">Beranda</a>
            <a href="#kepadatan" className="hover:text-amber-400 transition-colors">Live Crowd</a>
            <a href="#fasilitas" className="hover:text-amber-400 transition-colors">Fasilitas</a>
            <a href="#kalkulator" className="hover:text-amber-400 transition-colors">Kalkulator Hemat</a>
            <a href="#paket" className="hover:text-amber-400 transition-colors">Pilihan Paket</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
          </nav>

          {/* Action Buttons: Login / Dashboard / Logout */}
          <div className="flex items-center gap-2">
            {auth?.isAuthenticated ? (
              <>
                <div className="hidden lg:flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  <User className="w-3.5 h-3.5 text-purple-300" />
                  <span className="font-bold text-white">{auth.user?.name?.split(' ')[0]}</span>
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase">({auth.user?.role || 'Member'})</span>
                </div>

                <button
                  onClick={onGoToDashboard}
                  className="text-xs font-extrabold px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Buka Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Keluar dari Akun"
                    className="text-xs font-extrabold px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-all cursor-pointer flex items-center gap-1.5"
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
                  className="text-xs font-bold px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-purple-300" />
                  <span>Masuk Member</span>
                </button>

                {onQuickAdminLogin && (
                  <button
                    onClick={onQuickAdminLogin}
                    className="text-xs font-bold px-3 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Masuk Admin</span>
                    <span className="sm:hidden">Admin</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedPlanModal(plans[2])}
                  className="hidden md:flex text-xs font-extrabold px-3.5 py-2 rounded-xl bg-[#5D4E75] hover:bg-[#6D5D88] text-white shadow-lg shadow-purple-950/40 border border-purple-400/40 active:scale-[0.98] transition-all cursor-pointer items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Daftar</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. DYNAMIC HERO SECTION WITH INTERACTIVE LIVE APP PREVIEW */}
      {/* ============================================================== */}
      <section id="hero" className="relative overflow-hidden pt-8 pb-14 md:pt-16 md:pb-20 px-4 md:px-8 border-b border-white/10 bg-gradient-to-b from-[#10131F] via-[#0B0D14] to-[#0B0D14]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Value Props & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Top Interactive Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold text-amber-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Buka Setiap Hari (06:00 - 22:00 WIB) • Est. Bogor, Indonesia</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Latihan Lebih Terarah, <br />
              Bangun Fisik Impian di <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-amber-400 bg-clip-text text-transparent">Trisis Gym</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Gym modern ramah pemula dengan alat beban lengkap, suasana bebas intimidasi, serta portal pintar untuk memantau presensi, workout split, dan nutrisi harian.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-[11px] font-semibold text-slate-300">
              <span className="px-3 py-1 rounded-full bg-[#131520] border border-white/10 shadow-xs flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Rating 4.9/5 dari 500+ Member
              </span>
              <span className="px-3 py-1 rounded-full bg-[#131520] border border-white/10 shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Tanpa Biaya Admin Tersembunyi
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 shadow-xs flex items-center gap-1.5 text-amber-300">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Diskon Khusus Mahasiswa Bogor (IPB, Pakuan, UIKA)
              </span>
            </div>

            {/* Dual / Triple CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <a
                href="#paket"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#5D4E75] hover:bg-[#6D5D88] active:scale-[0.98] text-white font-extrabold text-sm shadow-lg shadow-purple-950/40 border border-purple-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Pilih Paket Membership</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onQuickDemoLogin}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Masuk Portal Member</span>
              </button>

              {onQuickAdminLogin && (
                <button
                  onClick={onQuickAdminLogin}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Masuk Panel Admin</span>
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5 pt-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-[#131520] p-3 rounded-2xl border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.3)] text-center">
                <span className="text-lg font-black text-white block">50+</span>
                <span className="text-[10px] text-slate-400 font-medium">Unit Alat Lengkap</span>
              </div>
              <div className="bg-[#131520] p-3 rounded-2xl border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.3)] text-center">
                <span className="text-lg font-black text-amber-400 block">Rp 25k</span>
                <span className="text-[10px] text-slate-400 font-medium">Mulai Per-Visit</span>
              </div>
              <div className="bg-[#131520] p-3 rounded-2xl border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.3)] text-center">
                <span className="text-lg font-black text-emerald-400 block">16 Jam</span>
                <span className="text-[10px] text-slate-400 font-medium">Operasional Harian</span>
              </div>
            </div>
          </div>

          {/* Right Column: INTERACTIVE LIVE APP PREVIEW CARD */}
          <div className="lg:col-span-5">
            <div className="bg-[#131520] rounded-3xl p-5 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 space-y-4 relative">
              {/* Floating Top Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fitur Aplikasi Pendamping</span>
                    <strong className="text-xs font-black text-white">Trisis Member Companion</strong>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/50 text-emerald-300 border border-emerald-800/40">
                  Interactive Preview
                </span>
              </div>

              {/* Interactive Tabs */}
              <div className="grid grid-cols-3 p-1 bg-white/5 rounded-2xl text-[11px] font-bold border border-white/5">
                <button
                  onClick={() => setHeroInteractiveTab('card')}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    heroInteractiveTab === 'card'
                      ? 'bg-[#221B30] text-purple-200 border border-purple-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Digital Pass
                </button>
                <button
                  onClick={() => setHeroInteractiveTab('streak')}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    heroInteractiveTab === 'streak'
                      ? 'bg-[#221B30] text-purple-200 border border-purple-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Streak Presensi
                </button>
                <button
                  onClick={() => setHeroInteractiveTab('coach')}
                  className={`py-2 rounded-xl transition-all cursor-pointer ${
                    heroInteractiveTab === 'coach'
                      ? 'bg-[#221B30] text-purple-200 border border-purple-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  AI Coach
                </button>
              </div>

              {/* Dynamic Interactive Tab Content */}
              <div className="min-h-[220px] flex flex-col justify-center">
                {heroInteractiveTab === 'card' && (
                  <div className="rounded-2xl p-4 bg-gradient-to-br from-[#1E192E] via-[#141624] to-[#0D0F18] text-white shadow-xl shadow-black/50 border-2 border-amber-400/50 space-y-3 animate-in fade-in duration-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-white/10 border border-amber-400/50 p-0.5 flex items-center justify-center shrink-0">
                          <img src="/logo.png" alt="Trisis Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-black text-xs tracking-wider text-amber-300 uppercase">TRISIS MEMBER PASS</span>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-xs">
                        AKTIF (SIMULASI)
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 block">Nama Anggota:</span>
                      <strong className="text-sm font-extrabold block text-white">Budi Santoso</strong>
                      <span className="text-[10px] text-purple-300 font-mono">TRISIS-DEMO-2026-089</span>
                    </div>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-slate-300">
                      <span>Berlaku s/d: 31 Des 2026</span>
                      <span className="font-semibold text-emerald-400">QR Check-in Siap</span>
                    </div>
                  </div>
                )}

                {heroInteractiveTab === 'streak' && (
                  <div className="rounded-2xl p-4 bg-[#181C2B] border border-white/10 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black">
                          <Flame className="w-4 h-4 fill-slate-950" />
                        </div>
                        <div>
                          <strong className="text-xs font-black text-white block">12 Hari Beruntun</strong>
                          <span className="text-[10px] text-slate-400">Streak Latihan Konsisten</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                        Level: Rajin
                      </span>
                    </div>

                    {/* Weekly Dots */}
                    <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] pt-1">
                      {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="text-slate-400 block text-[9px]">{day}</span>
                          <div className={`w-full py-1.5 rounded-lg font-bold ${
                            idx < 5 ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-slate-500'
                          }`}>
                            {idx < 5 ? '✓' : '-'}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-slate-400 leading-tight pt-1">
                      Check-in mandiri di gym untuk otomatis memperbarui streak dan riwayat aktivitas Anda.
                    </p>
                  </div>
                )}

                {heroInteractiveTab === 'coach' && (
                  <div className="rounded-2xl p-4 bg-[#181C2B] border border-purple-500/30 space-y-2.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800/40">
                        ✨ Coach Trisis AI (Gemini)
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">PPL Split</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-white">Push Day (Chest, Shoulders & Triceps)</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Hari ini 4 gerakan terfokus: Bench Press, Incline DB Press, Lateral Raise, dan Dips.
                      </p>
                    </div>

                    <div className="p-2 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Target Nutrisi:</span>
                      <strong className="text-amber-300">2.200 kkal • 135g Protein</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Test Button */}
              <button
                onClick={onQuickDemoLogin}
                className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Buka Demo Interaktif Penuh</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LIVE GYM CROWD METER & JAM KUNJUNGAN TERBAIK */}
      {/* ============================================================== */}
      <section id="kepadatan" className="py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 shadow-2xs">
            Smart Gym Experience
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Status Kepadatan & Waktu Latihan Terbaik
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Ketahui estimasi kepadatan pengunjung Trisis Gym Bogor agar sesi latihanmu lebih efisien dan bebas antre alat.
          </p>
        </div>

        {/* Interactive Crowd Meter Box */}
        <div className="bg-[#131520] border border-white/10 rounded-3xl p-5 md:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] space-y-5">
          {/* Slot Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'pagi', title: 'Pagi Hari', time: '06.00 - 10.00' },
              { id: 'siang', title: 'Siang Hari', time: '11.00 - 15.00' },
              { id: 'sore', title: 'Sore Hari', time: '16.00 - 19.30' },
              { id: 'malam', title: 'Malam Hari', time: '20.00 - 22.00' }
            ].map((slot) => {
              const isActive = crowdTime === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => setCrowdTime(slot.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isActive 
                      ? 'border-purple-400/60 bg-[#221B30] shadow-xs ring-1 ring-purple-400/40' 
                      : 'border-white/10 hover:bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <strong className={`block text-xs font-extrabold ${isActive ? 'text-purple-200' : 'text-slate-200'}`}>
                    {slot.title}
                  </strong>
                  <span className="text-[10px] text-slate-400 font-medium">{slot.time} WIB</span>
                </button>
              );
            })}
          </div>

          {/* Active Slot Status Display */}
          <div className="p-4 rounded-2xl bg-[#181C2B] border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-300" />
                <span className="text-xs font-bold text-white">
                  Waktu: {crowdSlots[crowdTime].time}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${crowdSlots[crowdTime].color}`}>
                  {crowdSlots[crowdTime].label}
                </span>
              </div>
              <span className="text-xs font-black text-slate-200">
                Kapasitas Terisi: ~{crowdSlots[crowdTime].percent}%
              </span>
            </div>

            {/* Meter Bar */}
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div 
                className={`h-full ${crowdSlots[crowdTime].barColor} transition-all duration-500 rounded-full`}
                style={{ width: `${crowdSlots[crowdTime].percent}%` }}
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              💡 <strong className="text-amber-300">Tips Waktu:</strong> {crowdSlots[crowdTime].note}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE SAVINGS CALCULATOR (HITUNG PENGHEMATANMU) */}
      {/* ============================================================== */}
      <section id="kalkulator" className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-br from-[#121420] via-[#0B0D14] to-[#14121E] border-y border-white/10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 shadow-xs">
              Kalkulator Cerdas
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Hitung Penghematan Membership-mu
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              Geser frekuensi latihan mingguanmu untuk mengetahui estimasi biaya per sesi dan paket yang paling menguntungkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Control Card */}
            <div className="md:col-span-6 bg-[#131520] p-6 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="frequency-slider" className="text-xs font-bold text-slate-300">
                    Frekuensi Latihan per Minggu:
                  </label>
                  <span className="text-base font-black text-amber-300 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/30">
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
                  className="w-full accent-amber-400 h-2 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                  <span>1 Hari (Santai)</span>
                  <span>3 Hari (Ideal)</span>
                  <span>6 Hari (Intensif)</span>
                </div>
              </div>

              {/* Breakdown Details */}
              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Estimasi Sesi Latihan per Bulan:</span>
                  <strong className="text-white">{monthlySessions} Kunjungan</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Biaya jika Bayar Harian (Rp 25k/sesi):</span>
                  <strong className="text-white">Rp {costIfPerVisit.toLocaleString('id-ID')}</strong>
                </div>
              </div>
            </div>

            {/* Right Comparison Recommendation Card */}
            <div className="md:col-span-6 bg-gradient-to-br from-[#1E192E] via-[#141624] to-[#0D0F18] border-2 border-amber-400/50 rounded-3xl p-6 text-white shadow-2xl shadow-black/60 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-xs">
                  Rekomendasi Paket Paling Hemat
                </span>
                <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Hemat Maksimal
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black">Paket Mahasiswa / Bulanan</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dengan {workoutDaysPerWeek}x latihan per minggu, biaya per kunjunganmu menjadi super hemat:
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-amber-400/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-200 block font-semibold">Paket Mahasiswa:</span>
                    <span className="text-xl font-black text-amber-300">
                      Rp {costPerSessionStudent.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-amber-200 ml-1">/ sesi</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Hemat Bulanan:</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      +Rp {Math.max(0, studentSavings).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-purple-200 block font-semibold">Paket Reguler:</span>
                    <span className="text-lg font-black text-white">
                      Rp {costPerSessionRegular.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-purple-200 ml-1">/ sesi</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Hemat Bulanan:</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      +Rp {Math.max(0, regularSavings).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlanModal(plans[1])}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Daftar Paket Rekomendasi Ini</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PILIHAN PAKET MEMBERSHIP (PRICING & TAWARAN) */}
      {/* ============================================================== */}
      <section id="paket" className="py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
            Tawaran Membership
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Pilihan Paket Transparan Tanpa Komitmen Ribet
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Pilih paket yang paling sesuai dengan target dan frekuensi latihanmu.
          </p>
        </div>

        {/* Category Tabs & Compare Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 rounded-2xl text-xs font-bold w-full sm:w-auto border border-white/5">
            <button
              onClick={() => setSelectedPlanCategory('all')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                selectedPlanCategory === 'all'
                  ? 'bg-[#221B30] text-purple-200 border border-purple-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua Paket
            </button>
            <button
              onClick={() => setSelectedPlanCategory('monthly')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                selectedPlanCategory === 'monthly'
                  ? 'bg-[#221B30] text-purple-200 border border-purple-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bulanan & VIP
            </button>
            <button
              onClick={() => setSelectedPlanCategory('student')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                selectedPlanCategory === 'student'
                  ? 'bg-[#221B30] text-purple-200 border border-purple-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mahasiswa
            </button>
            <button
              onClick={() => setSelectedPlanCategory('daily')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                selectedPlanCategory === 'daily'
                  ? 'bg-[#221B30] text-purple-200 border border-purple-500/30 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Harian Flex
            </button>
          </div>

          <button
            onClick={() => setShowComparisonModal(true)}
            className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1.5 cursor-pointer py-1"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Bandingkan Detail Semua Fitur Paket</span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {filteredPlans.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-5 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                p.popular
                  ? 'border-2 border-amber-400/80 bg-[#161826] shadow-xl shadow-amber-500/10 relative'
                  : 'bg-[#131520] border-white/10 hover:border-purple-400/30 shadow-[0_4px_25px_rgba(0,0,0,0.3)]'
              }`}
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-3 min-h-[24px]">
                  {p.badge ? (
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  ) : <span />}
                  {p.popular && (
                    <span className="text-[10px] font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      ⭐ Rekomendasi
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-white">{p.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[34px] leading-relaxed">{p.desc}</p>

                <div className="my-4 pt-4 border-t border-white/10">
                  <span className="text-2xl font-black text-white">{p.price}</span>
                  <span className="text-xs text-slate-400 font-medium ml-1">{p.period}</span>
                </div>

                {/* Features list */}
                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlanModal(p)}
                className={`w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  p.popular
                    ? 'bg-[#5D4E75] hover:bg-[#6D5D88] text-white shadow-lg shadow-purple-950/40 border border-purple-400/40 active:scale-[0.98]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10'
                }`}
              >
                <span>Daftar Paket Ini</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. FASILITAS GYM DENGAN FOTO ASLI & FILTER KATEGORI */}
      {/* ============================================================== */}
      <section id="fasilitas" className="py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
            Fasilitas Standar Modern
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Ruang Latihan Nyaman & Peralatan Terawat
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Jelajahi setiap sudut Trisis Gym yang dirancang untuk mendukung berbagai gaya dan target latihanmu.
          </p>
        </div>

        {/* Facility Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'Semua Fasilitas' },
            { id: 'strength', label: '🏋️ Area Beban (Strength)' },
            { id: 'cardio', label: '🏃 Area Kardio' },
            { id: 'functional', label: '🧘 Fungsional & Senam' },
            { id: 'amenity', label: '🚿 Locker & Shower' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFacilityFilter(cat.id)}
              className={`text-xs font-bold px-3.5 py-2 rounded-2xl transition-all cursor-pointer border ${
                facilityFilter === cat.id
                  ? 'bg-[#5D4E75] text-white border-purple-400/40 shadow-sm'
                  : 'bg-[#131520] text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facility Cards Grid with Real Generated Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              onClick={() => setSelectedFacilityModal(fac)}
              className="bg-[#131520] rounded-3xl overflow-hidden border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:border-purple-500/30 hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Facility Image Cover */}
              <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-900">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131520] via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/70 text-slate-200 border border-white/10 shadow-sm backdrop-blur-md">
                    {fac.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-extrabold drop-shadow">{fac.title}</h3>
                </div>
              </div>

              {/* Facility Description & Highlights */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">{fac.desc}</p>

                {/* Micro tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {fac.highlights.map((item, hIdx) => (
                    <span 
                      key={hIdx} 
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-xl bg-white/5 border border-white/5 text-slate-300"
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
      {/* 7. INTERACTIVE FAQ ACCORDION */}
      {/* ============================================================== */}
      <section id="faq" className="py-12 md:py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
            Pertanyaan Umum
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Sering Ditanyakan (FAQ)
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Segala hal yang perlu kamu ketahui sebelum memulai latihan di Trisis Gym.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div
                key={fIdx}
                className="bg-[#131520] border border-white/10 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  className="w-full p-4 md:p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer gap-3"
                >
                  <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
                    {faq.q}
                  </span>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/10 bg-[#181C2B]/50">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. LOKASI, JAM OPERASIONAL & AJAKAN */}
      {/* ============================================================== */}
      <section id="lokasi" className="py-12 md:py-16 px-4 md:px-8 bg-[#0E1017] border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
              Lokasi & Kunjungan
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Kunjungi Trisis Gym Hari Ini
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Mau cek suasana gym atau konsultasi langsung sebelum bergabung? Resepsionis dan trainer kami siap menyambut kedatanganmu di gym.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#131520] border border-white/10">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Alamat Trisis Gym Bogor</strong>
                  <span className="text-slate-400">Kota Bogor, Jawa Barat (Dekat Pusat Kota & Kampus IPB / Pakuan)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#131520] border border-white/10">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Jam Operasional Lengkap</strong>
                  <span className="text-slate-400">Senin – Sabtu: 06.00 – 22.00 WIB | Minggu: 07.00 – 20.00 WIB</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Trisis%20Gym,%20saya%20mau%20tanya%20info%20membership"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Chat Admin WhatsApp</span>
              </a>

              <button
                onClick={onQuickDemoLogin}
                className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white border border-white/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Masuk Portal Member</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Location Map Preview Mockup */}
          <div className="bg-[#131520] rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Peta Akses Gym</span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                Buka Sekarang
              </span>
            </div>
            <div className="h-48 rounded-2xl bg-gradient-to-br from-[#1E182D] to-[#121520] border border-white/10 flex flex-col items-center justify-center text-center p-4">
              <MapPin className="w-10 h-10 text-purple-400 mb-2 animate-bounce" />
              <strong className="font-extrabold text-sm text-white">Trisis Gym Bogor</strong>
              <span className="text-[11px] text-slate-400 mt-0.5">Est. Bogor, Indonesia • Parkir Mobil & Motor Luas</span>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Fasilitas parkir aman gratis dengan pengawasan CCTV 24 jam.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. FOOTER */}
      {/* ============================================================== */}
      <footer className="bg-[#0B0D14] border-t border-white/10 py-8 px-4 md:px-8 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-white/10 border border-amber-400/40 flex items-center justify-center p-0.5 shadow-2xs shrink-0">
              <img src="/logo.png" alt="Trisis Gym Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-white">
              TRISIS <span className="text-amber-400 font-black">GYM</span>
            </span>
            <span>• Est. Bogor, Indonesia</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={onOpenLogin} className="hover:text-purple-300 transition-colors">Portal Member</button>
            <a href="#paket" className="hover:text-purple-300 transition-colors">Tawaran Membership</a>
            <a href="#fasilitas" className="hover:text-purple-300 transition-colors">Fasilitas</a>
            <a href="#faq" className="hover:text-purple-300 transition-colors">FAQ</a>
          </div>

          <p className="text-[10px]">
            Fase 6A: Prototipe Frontend dengan Data Sintetis & Baseline Rekomendasi.
          </p>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 10. MODAL SIMULASI DAFTAR MEMBER */}
      {/* ============================================================== */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#131520] border border-white/10 rounded-3xl shadow-2xl p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">Formulir Pendaftaran</span>
                <h3 className="text-base font-extrabold text-white">Gabung Jadi Member</h3>
              </div>
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {registerSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-sm text-white">Pendaftaran Berhasil Disimulasikan!</h4>
                <p className="text-xs text-slate-400">
                  Mengarahkan Anda langsung ke portal dashboard member demo...
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                {/* Selected Plan Snapshot */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">{selectedPlanModal.name}</span>
                    <span className="text-[10px] text-slate-400">{selectedPlanModal.desc}</span>
                  </div>
                  <span className="font-black text-amber-300">{selectedPlanModal.price}</span>
                </div>

                <div>
                  <label htmlFor="reg-name" className="block text-slate-300 font-bold mb-1">Nama Lengkap</label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="reg-phone" className="block text-slate-300 font-bold mb-1">Nomor WhatsApp</label>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="reg-email" className="block text-slate-300 font-bold mb-1">Alamat Email</label>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/10"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-[#5D4E75] hover:bg-[#6D5D88] active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-purple-950/40 border border-purple-400/40 cursor-pointer"
                  >
                    Kirim & Masuk ke Akun Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanModal(null)}
                    className="w-full py-2 text-slate-400 hover:text-white font-medium cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 11. MODAL DETAIL FASILITAS */}
      {/* ============================================================== */}
      {selectedFacilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#131520] border border-white/10 rounded-3xl shadow-2xl overflow-hidden space-y-4">
            <div className="relative h-48 w-full bg-slate-900">
              <img
                src={selectedFacilityModal.image}
                alt={selectedFacilityModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedFacilityModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-slate-300 flex items-center justify-center shadow-md cursor-pointer hover:bg-black hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-200">
                  {selectedFacilityModal.tag}
                </span>
              </div>
            </div>

            <div className="p-5 pt-0 space-y-3">
              <h3 className="text-base font-extrabold text-white">{selectedFacilityModal.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedFacilityModal.desc}</p>

              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Daftar Alat & Keunggulan:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
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
                className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-purple-200 hover:text-white font-bold text-xs transition-colors cursor-pointer mt-2"
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
          <div className="relative w-full max-w-2xl bg-[#131520] border border-white/10 rounded-3xl shadow-2xl p-5 md:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">Perbandingan Menyeluruh</span>
                <h3 className="text-base font-extrabold text-white">Tabel Benefit Setiap Paket</h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase font-bold">
                    <th className="py-2.5">Fasilitas / Benefit</th>
                    <th className="py-2.5">Per-Visit</th>
                    <th className="py-2.5 text-blue-400">Mahasiswa</th>
                    <th className="py-2.5 text-purple-300">Bulanan</th>
                    <th className="py-2.5 text-amber-400">Annual VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="py-2.5 font-bold text-white">Akses Beban & Kardio</td>
                    <td className="py-2.5">1 Hari</td>
                    <td className="py-2.5">30 Hari</td>
                    <td className="py-2.5">30 Hari</td>
                    <td className="py-2.5">365 Hari</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Locker & Shower</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Aplikasi Web Pendamping</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Rekomendasi Workout & Makro</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                    <td className="py-2.5">✓</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Konsultasi Privat Trainer</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">Awal</td>
                    <td className="py-2.5">Awal</td>
                    <td className="py-2.5">2x Sesi Privat</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Cuti / Freeze Membership</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">Hingga 30 Hari</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Free Merchandise (Shaker/Baju)</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">-</td>
                    <td className="py-2.5">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 rounded-xl bg-[#5D4E75] hover:bg-[#6D5D88] text-white text-xs font-bold transition-colors cursor-pointer"
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
