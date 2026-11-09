import React from 'react';
import { 
  Flame, 
  CalendarCheck, 
  CreditCard, 
  ArrowRight, 
  Sparkles, 
  Dumbbell, 
  Utensils, 
  Clock, 
  ChevronRight,
  TrendingUp,
  User,
  ShieldCheck,
  QrCode,
  Megaphone,
  Users,
  Lock,
  AlertCircle,
  Check,
  Zap
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { calculateWorkoutSplit, calculateMacroEstimates } from '../../services/baselineCalculators';

export default function DashboardView({ 
  user, 
  profile, 
  stats, 
  onOpenCheckIn, 
  onOpenCard, 
  onNavigateTab,
  onOpenPayment
}) {
  const isPaid = Boolean(user?.hasPaid || (user?.status === 'Aktif' && user?.planId));
  const workoutSplit = calculateWorkoutSplit(profile);
  const macroEstimates = calculateMacroEstimates(profile);

  // Hitung persentase target kehadiran mingguan
  const targetDays = profile?.daysPerWeek || 4;
  const currentStreak = stats?.currentStreak || 0;
  const streakProgress = Math.min(100, Math.round((currentStreak / targetDays) * 100));

  return (
    <div className="space-y-4 md:space-y-5 pb-8 animate-in fade-in duration-200">
      {/* 0. Live Announcement Banner (Diatur oleh Admin) */}
      {stats?.gymSettings?.announcementActive && stats?.gymSettings?.announcementText && (
        <section className="bg-[#111319] border border-amber-500/30 rounded-2xl p-4 md:p-5 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
            <Megaphone className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                PENGUMUMAN
              </span>
              <span className="text-[10px] text-zinc-400 hidden sm:inline">Siaran Langsung Admin</span>
            </div>
            <p className="text-xs text-zinc-200 font-medium mt-1 leading-relaxed">
              {stats.gymSettings.announcementText}
            </p>
          </div>
        </section>
      )}

      {/* 0.1 Live Gym Status & Okupansi (Diatur oleh Admin) */}
      {stats?.gymSettings && (
        <section className="bg-[#111319] rounded-2xl p-4 md:p-5 border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${stats.gymSettings.isOpen ? 'bg-emerald-400' : 'bg-rose-500'}`} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs md:text-sm font-bold text-white">
                    {stats.gymSettings.isOpen ? 'Trisis Gym Buka' : 'Trisis Gym Tutup Sementara'}
                  </h3>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    stats.gymSettings.isOpen ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {stats.gymSettings.isOpen ? 'BUKA' : 'TUTUP'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 flex flex-wrap items-center gap-2">
                  <span><Clock className="w-3 h-3 inline mr-1 text-amber-400" />{stats.gymSettings.openingHours || '06:00 – 22:00 WIB'}</span>
                  <span>•</span>
                  <span className="text-zinc-300 font-medium">{stats.gymSettings.trainerOnDuty || 'Staff & Trainer Siaga'}</span>
                </p>
              </div>
            </div>

            {/* Okupansi Gym Realtime */}
            <div className="flex items-center gap-3 sm:text-right">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">Kepadatan Saat Ini</span>
                <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-xs font-bold text-white">
                    {stats.gymSettings.currentOccupancy || 0} / {stats.gymSettings.maxCapacity || 75} Orang
                  </span>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded">
                    {stats.gymSettings.currentCrowdStatus === 'pagi' ? 'Lengang' : stats.gymSettings.currentCrowdStatus === 'siang' ? 'Sedang' : stats.gymSettings.currentCrowdStatus === 'sore' ? 'Peak Hour' : 'Normal'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar Okupansi */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round(((stats.gymSettings.currentOccupancy || 0) / (stats.gymSettings.maxCapacity || 75)) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-400 font-medium shrink-0 tabular-nums">
              {Math.min(100, Math.round(((stats.gymSettings.currentOccupancy || 0) / (stats.gymSettings.maxCapacity || 75)) * 100))}% Terisi
            </span>
          </div>
        </section>
      )}

      {/* 1. Header & Sapaan Pengguna + Streak Card with Real Gym Banner */}
      <section className="bg-[#111319] rounded-2xl p-5 md:p-6 border border-white/[0.08] relative overflow-hidden">
        {/* Real Gym Community Banner Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none select-none">
          <img
            src="/gym-hero-banner.jpg"
            alt="Suasana Komunitas Trisis Gym Bogor"
            className="w-full h-full object-cover object-[center_30%] filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111319] via-[#111319]/80 to-[#111319]/70" />
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Minimal Avatar Circle */}
            <div className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700/80 text-zinc-200 flex items-center justify-center font-bold text-base shrink-0">
              <User className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base md:text-lg font-bold text-white tracking-tight">
                  Halo, {user?.name?.split(' ')[0] || 'Budi'}
                </h1>
                <StatusBadge status="MEMBER" size="xs" />
              </div>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">
                Member Reguler • <span className="font-mono text-zinc-300">{user?.memberId || 'TRISIS-089'}</span>
              </p>
            </div>
          </div>

          {/* Clean Minimal Streak Pill */}
          <div className="shrink-0 flex flex-col items-end">
            <div className="bg-amber-400 text-neutral-950 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-none">
              <Flame className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950" />
              <span>{currentStreak} HARI STREAK</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium mt-1">
              Target {targetDays} sesi/minggu
            </span>
          </div>
        </div>

        {/* Progress Bar Konsistensi Sesi */}
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 font-medium">Konsistensi Minggu Ini</span>
            <span className="font-bold text-white">{currentStreak}/{targetDays} Sesi</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${streakProgress}%` }}
            />
          </div>
        </div>
      </section>

      {/* 2. Pilihan Paket Membership (Tampil jika Belum Bayar atau ingin upgrade) */}
      {!isPaid && (
        <section className="bg-[#111319] rounded-2xl p-5 md:p-6 border border-amber-500/30 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm md:text-base font-bold text-white">
                    Pilih & Aktifkan Paket Membership Anda
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    MENUNGGU PEMBAYARAN
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Akun Anda telah terdaftar. Pilih salah satu dari 3 paket di bawah untuk mengaktifkan QR presensi kasir dan akses latihan.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Kartu Pilihan Paket Resmi Trisis Gym */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
            {/* Paket 1: Per-Visit */}
            <div className="bg-zinc-900/60 rounded-xl p-4 border border-white/[0.06] hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">FLEKSIBEL</span>
                <h3 className="text-sm font-bold text-white mt-0.5">Per-Visit (Harian)</h3>
                <div className="mt-2 mb-3">
                  <span className="text-xl font-extrabold text-white">Rp 25.000</span>
                  <span className="text-[11px] text-zinc-400"> / kunjungan</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                  Masa berlaku berlaku <strong className="text-zinc-200">hari ini saja (s/d 21:30 WIB)</strong>. Akses seluruh fasilitas & alat gym.
                </p>
              </div>
              <button
                onClick={() => onOpenPayment({
                  id: 'per_visit',
                  name: 'Paket Per-Visit (Harian)',
                  price: 25000,
                  priceStr: 'Rp 25.000',
                  durationStr: 'Hari Ini (s/d 21:30 WIB)'
                })}
                className="w-full py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/[0.08]"
              >
                <span>Pilih & Bayar QRIS</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>

            {/* Paket 2: Bulanan (Paling Populer) */}
            <div className="bg-zinc-900/90 rounded-xl p-4 border-2 border-amber-400/60 relative flex flex-col justify-between shadow-lg shadow-amber-950/20">
              <span className="absolute -top-2.5 right-3 bg-amber-400 text-neutral-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                PALING POPULER
              </span>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">REKOMENDASI</span>
                <h3 className="text-sm font-bold text-white mt-0.5">Paket Bulanan (Monthly)</h3>
                <div className="mt-2 mb-3">
                  <span className="text-xl font-extrabold text-white">Rp 100.000</span>
                  <span className="text-[11px] text-zinc-400"> / bulan</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed mb-3">
                  Masa aktif <strong className="text-amber-300">tepat 30 hari penuh</strong>. Akses setiap hari tanpa batas + program latihan & konsultasi nutrisi.
                </p>
              </div>
              <button
                onClick={() => onOpenPayment({
                  id: 'bulanan',
                  name: 'Paket Bulanan (Monthly Pass)',
                  price: 100000,
                  priceStr: 'Rp 100.000',
                  durationStr: '30 Hari Penuh'
                })}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <span>Pilih & Bayar QRIS (30 Hari)</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-950" />
              </button>
            </div>

            {/* Paket 3: Tahunan (Paling Hemat) */}
            <div className="bg-zinc-900/60 rounded-xl p-4 border border-white/[0.06] hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">HEMAT BIAYA</span>
                <h3 className="text-sm font-bold text-white mt-0.5">Paket Tahunan (Annual)</h3>
                <div className="mt-2 mb-3">
                  <span className="text-xl font-extrabold text-white">Rp 1.200.000</span>
                  <span className="text-[11px] text-zinc-400"> / tahun</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                  Masa aktif <strong className="text-zinc-200">365 hari penuh</strong>. Gratis konsultasi instruktur & prioritas loker gym.
                </p>
              </div>
              <button
                onClick={() => onOpenPayment({
                  id: 'tahunan',
                  name: 'Paket Tahunan (Annual Pass)',
                  price: 1200000,
                  priceStr: 'Rp 1.200.000',
                  durationStr: '365 Hari (1 Tahun)'
                })}
                className="w-full py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/[0.08]"
              >
                <span>Pilih & Bayar QRIS</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2. Kartu Membership & Presensi Gym Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Presensi Check-In Card */}
        <section className="bg-[#111319] rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-amber-400 flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Presensi QR Kasir</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Tunjukkan QR ke kasir saat tiba di gym</p>
              </div>
            </div>
            <StatusBadge status={isPaid ? "ONLINE" : "BELUM AKTIF"} size="xs" />
          </div>

          {isPaid ? (
            <button
              onClick={onOpenCheckIn}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-neutral-950" />
              Buka QR Presensi
            </button>
          ) : (
            <button
              onClick={() => onOpenPayment({
                id: 'bulanan',
                name: 'Paket Bulanan (Monthly Pass)',
                price: 100000,
                priceStr: 'Rp 100.000',
                durationStr: '30 Hari Penuh'
              })}
              className="w-full py-3 px-4 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              Aktifkan Paket untuk Presensi (Buka QR)
            </button>
          )}
          
          <div className="flex items-center gap-1.5 justify-center text-[11px] text-zinc-400">
            {isPaid ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tinggal di-scan petugas kasir / turnstile gym</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>QR aktif setelah Anda menyelesaikan pembayaran paket</span>
              </>
            )}
          </div>
        </section>

        {/* Digital Membership Pass Card */}
        <section className="bg-[#111319] rounded-2xl p-5 border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-amber-400 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Membership</span>
                <h3 className="text-sm font-bold text-white">
                  {isPaid ? (user?.planName || 'Paket Bulanan (Monthly Pass)') : 'Belum Memilih Paket'}
                </h3>
              </div>
            </div>
            <StatusBadge status={isPaid ? "AKTIF" : "MENUNGGU BAYAR"} size="xs" />
          </div>

          <div className="bg-zinc-900/60 rounded-xl p-3 border border-white/[0.04] flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-zinc-400 block font-medium">Masa Berlaku</span>
              <span className={`font-semibold ${isPaid ? 'text-zinc-200' : 'text-amber-400'}`}>
                {isPaid ? (user?.validUntil || 'Aktif s/d 1 Bulan') : 'Belum Aktif (Perlu Bayar)'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block font-medium">Status Akses</span>
              <span className={`font-semibold ${isPaid ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPaid ? 'Akses Penuh Cabang' : 'Akses Terkunci'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCard}
              className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-zinc-700/60 transition-all cursor-pointer"
            >
              <span>Kartu Member Digital</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
            <button
              onClick={() => onOpenPayment({
                id: user?.planId || 'bulanan',
                name: user?.planName || 'Paket Bulanan (Monthly Pass)',
                price: user?.planId === 'tahunan' ? 1200000 : user?.planId === 'per_visit' ? 25000 : 100000,
                priceStr: user?.planId === 'tahunan' ? 'Rp 1.200.000' : user?.planId === 'per_visit' ? 'Rp 25.000' : 'Rp 100.000',
                durationStr: user?.planId === 'tahunan' ? '365 Hari' : user?.planId === 'per_visit' ? '1 Hari' : '30 Hari'
              })}
              title="Perpanjang atau ganti paket membership"
              className="py-2.5 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 font-bold text-xs transition-all cursor-pointer shrink-0"
            >
              {isPaid ? 'Perpanjang' : 'Bayar Paket'}
            </button>
          </div>
        </section>
      </div>

      {/* 3. Ringkasan Metrik Kehadiran (2 Kolom) */}
      <section className="grid grid-cols-2 gap-3 md:gap-4">
        {/* Total Check-ins */}
        <div className="bg-[#111319] rounded-2xl p-4.5 md:p-5 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-400">Total Hadir</span>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center">
              <CalendarCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
              {stats?.totalCheckIns || 0}
            </span>
            <span className="text-xs text-zinc-400 font-medium">kali kunjungan</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-medium mt-1.5 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Presensi aktif tercatat
          </p>
        </div>

        {/* Konsistensi Streak */}
        <div className="bg-[#111319] rounded-2xl p-4.5 md:p-5 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-400">Streak Latihan</span>
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
              {currentStreak}
            </span>
            <span className="text-xs text-zinc-400 font-medium">hari beruntun</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-medium mt-1.5">
            Target rutin {targetDays} hari / minggu
          </p>
        </div>
      </section>

      {/* 4. Rekomendasi Program & Nutrisi */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-300 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h2 className="text-sm font-bold text-white">Program & Nutrisi Anda</h2>
          </div>
          <button
            onClick={() => onNavigateTab('recommendations')}
            className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            Lihat Lengkap
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Card Split Latihan */}
          <div 
            onClick={() => onNavigateTab('recommendations')}
            className="bg-[#111319] hover:bg-[#151821] border border-white/[0.08] rounded-2xl p-5 transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Program Latihan</span>
                  <h3 className="text-sm font-bold text-white">{workoutSplit.splitName}</h3>
                </div>
              </div>
              <StatusBadge status="BASELINE" size="xs" />
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {workoutSplit.description}
            </p>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-zinc-400">Frekuensi: {profile?.daysPerWeek || 4} hari / minggu</span>
              <span className="font-semibold text-zinc-200 flex items-center gap-0.5">Detail <ChevronRight className="w-3 h-3 text-zinc-400" /></span>
            </div>
          </div>

          {/* Card Target Nutrisi */}
          <div 
            onClick={() => onNavigateTab('recommendations')}
            className="bg-[#111319] hover:bg-[#151821] border border-white/[0.08] rounded-2xl p-5 transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-emerald-400 flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Target Energi & Makro</span>
                  <h3 className="text-sm font-bold text-white">
                    {macroEstimates.targetCalories} <span className="text-xs font-normal text-zinc-400">kkal / hari</span>
                  </h3>
                </div>
              </div>
              <StatusBadge status="BASELINE" size="xs" />
            </div>

            {/* 3 Mini Boxes untuk Makro */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="bg-zinc-900/60 rounded-xl py-2 px-1 border border-white/[0.04]">
                <span className="block text-[10px] text-zinc-400 font-medium">Protein</span>
                <span className="font-bold text-white">{macroEstimates.macros.protein.grams}g</span>
              </div>
              <div className="bg-zinc-900/60 rounded-xl py-2 px-1 border border-white/[0.04]">
                <span className="block text-[10px] text-zinc-400 font-medium">Karbo</span>
                <span className="font-bold text-white">{macroEstimates.macros.carbs.grams}g</span>
              </div>
              <div className="bg-zinc-900/60 rounded-xl py-2 px-1 border border-white/[0.04]">
                <span className="block text-[10px] text-zinc-400 font-medium">Lemak</span>
                <span className="font-bold text-white">{macroEstimates.macros.fat.grams}g</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pintasan Riwayat Aktivitas */}
      <section className="pt-1">
        <button
          onClick={() => onNavigateTab('activity')}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#111319] hover:bg-[#151821] border border-white/[0.08] text-zinc-300 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span>Lihat Riwayat Presensi & Aktivitas</span>
          </span>
          <ArrowRight className="w-4 h-4 text-zinc-500" />
        </button>
      </section>
    </div>
  );
}
