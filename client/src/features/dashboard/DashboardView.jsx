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
  QrCode
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { calculateWorkoutSplit, calculateMacroEstimates } from '../../services/baselineCalculators';

export default function DashboardView({ 
  user, 
  profile, 
  stats, 
  onOpenCheckIn, 
  onOpenCard, 
  onNavigateTab 
}) {
  const workoutSplit = calculateWorkoutSplit(profile);
  const macroEstimates = calculateMacroEstimates(profile);

  // Hitung persentase target kehadiran mingguan
  const targetDays = profile?.daysPerWeek || 4;
  const currentStreak = stats?.currentStreak || 0;
  const streakProgress = Math.min(100, Math.round((currentStreak / targetDays) * 100));

  return (
    <div className="space-y-4 md:space-y-5 pb-8 animate-in fade-in duration-200">
      {/* 1. Header & Sapaan Pengguna + Streak Card */}
      <section className="bg-[#131520] rounded-3xl p-5 md:p-6 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Avatar Lingkaran Ramah */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2D2342] to-[#1C172A] border border-purple-400/30 text-purple-200 flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
              <User className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                  Halo, {user?.name?.split(' ')[0] || 'Budi'}!
                </h1>
                <StatusBadge status="DEMO" size="xs" />
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Level 1 • Member Reguler ({user?.memberId || 'TRISIS-089'})
              </p>
            </div>
          </div>

          {/* Streak Counter Pill Khas FitQuest (Kuning/Emas Hangat) */}
          <div className="shrink-0 flex flex-col items-end">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-2xl shadow-xs border border-amber-300/80 flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>{currentStreak} HARI STREAK</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium mt-1">
              Target {targetDays} sesi/minggu
            </span>
          </div>
        </div>

        {/* Progress Bar Konsistensi Sesi */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">Konsistensi Minggu Ini</span>
            <span className="font-black text-[#B8A7D6]">{currentStreak}/{targetDays} Sesi</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#5D4E75] via-[#8B78A5] to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${streakProgress}%` }}
            />
          </div>
        </div>
      </section>

      {/* 2. Kartu Membership & Presensi Gym Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Presensi Check-In Card (Aksi Utama Berwarna Soft Purple & Aksen Emas) */}
        <section className="bg-[#131520] rounded-3xl p-5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-950/50 border border-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Presensi QR Kasir Gym</h2>
                <p className="text-xs text-slate-400 mt-0.5">Tunjukkan QR ke kasir saat tiba di gym</p>
              </div>
            </div>
            <StatusBadge status="DEMO" size="xs" />
          </div>

          <button
            onClick={onOpenCheckIn}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#5D4E75] to-[#4A3D60] hover:from-[#6D5D88] hover:to-[#55466F] active:scale-[0.98] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 border border-purple-400/30 transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-amber-300" />
            Buka QR Presensi Kasir
          </button>
          
          <div className="flex items-center gap-1.5 justify-center text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tinggal di-scan petugas kasir / turnstile gym</span>
          </div>
        </section>

        {/* Digital Membership Pass Card */}
        <section className="bg-[#131520] rounded-3xl p-5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Membership</span>
                <h3 className="text-sm font-bold text-white">{user?.planName || 'Annual Regular Pass'}</h3>
              </div>
            </div>
            <StatusBadge status="AKTIF" size="xs" />
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Masa Berlaku</span>
              <span className="font-semibold text-slate-200">s/d 31 Desember 2026</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Status Akses</span>
              <span className="font-semibold text-emerald-400">Akses Penuh Cabang</span>
            </div>
          </div>

          <button
            onClick={onOpenCard}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-amber-400/30 transition-all cursor-pointer"
          >
            <span>Tampilkan Kartu Digital Demo</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </section>
      </div>

      {/* 3. Ringkasan Metrik Kehadiran (2 Kolom) */}
      <section className="grid grid-cols-2 gap-3 md:gap-4">
        {/* Total Check-ins */}
        <div className="bg-[#131520] rounded-3xl p-4.5 md:p-5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Hadir</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black text-white tabular-nums">
              {stats?.totalCheckIns || 0}
            </span>
            <span className="text-xs text-slate-400 font-medium">kali kunjungan</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-medium mt-1.5 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Absensi tercatat aktif
          </p>
        </div>

        {/* Konsistensi Streak */}
        <div className="bg-[#131520] rounded-3xl p-4.5 md:p-5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Streak Latihan</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl md:text-3xl font-black text-white tabular-nums">
              {currentStreak}
            </span>
            <span className="text-xs text-slate-400 font-medium">hari beruntun</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1.5">
            Target rutin {targetDays} hari / minggu
          </p>
        </div>
      </section>

      {/* 4. Rekomendasi Program & Nutrisi */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-950/50 border border-purple-500/20 text-purple-300 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm font-bold text-white">Program & Nutrisi Anda</h2>
          </div>
          <button
            onClick={() => onNavigateTab('recommendations')}
            className="text-xs font-bold text-[#B8A7D6] hover:text-purple-200 flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            Lihat Lengkap
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Card Split Latihan */}
          <div 
            onClick={() => onNavigateTab('recommendations')}
            className="bg-[#131520] hover:bg-[#181B2A] border border-white/10 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-950/50 border border-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Program Latihan</span>
                  <h3 className="text-sm font-extrabold text-white">{workoutSplit.splitName}</h3>
                </div>
              </div>
              <StatusBadge status="BASELINE" size="xs" />
            </div>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {workoutSplit.description}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">Frekuensi: {profile?.daysPerWeek || 4} hari / minggu</span>
              <span className="font-bold text-[#B8A7D6] flex items-center gap-0.5">Detail <ChevronRight className="w-3 h-3" /></span>
            </div>
          </div>

          {/* Card Target Nutrisi */}
          <div 
            onClick={() => onNavigateTab('recommendations')}
            className="bg-[#131520] hover:bg-[#181B2A] border border-white/10 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Energi & Makro</span>
                  <h3 className="text-sm font-extrabold text-white">
                    {macroEstimates.targetCalories} <span className="text-xs font-normal text-slate-400">kkal / hari</span>
                  </h3>
                </div>
              </div>
              <StatusBadge status="BASELINE" size="xs" />
            </div>

            {/* 3 Mini Boxes untuk Makro */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="bg-white/5 rounded-2xl py-2 px-1 border border-white/5">
                <span className="block text-[10px] text-slate-400 font-medium">Protein</span>
                <span className="font-bold text-white">{macroEstimates.macros.protein.grams}g</span>
              </div>
              <div className="bg-white/5 rounded-2xl py-2 px-1 border border-white/5">
                <span className="block text-[10px] text-slate-400 font-medium">Karbo</span>
                <span className="font-bold text-white">{macroEstimates.macros.carbs.grams}g</span>
              </div>
              <div className="bg-white/5 rounded-2xl py-2 px-1 border border-white/5">
                <span className="block text-[10px] text-slate-400 font-medium">Lemak</span>
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
          className="w-full py-4 px-5 rounded-3xl bg-[#131520] hover:bg-[#181B2A] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span>Lihat Riwayat Presensi & Aktivitas Rekomendasi</span>
          </span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>
      </section>
    </div>
  );
}
