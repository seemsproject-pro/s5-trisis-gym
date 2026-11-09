import React, { useState } from 'react';
import {
  X,
  Check,
  CreditCard,
  QrCode,
  Building,
  User,
  Mail,
  Phone,
  KeyRound,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Zap,
  Target,
  Copy
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import GoogleCloudConfigModal from './GoogleCloudConfigModal';
import { isGoogleClientConfigured, triggerGoogleOAuth } from '../utils/googleAuth';

export const MEMBERSHIP_PLANS = [
  {
    id: 'per_visit',
    name: 'Per-Visit (Harian Flex)',
    price: 'Rp 25.000',
    numericPrice: 25000,
    period: '/ kunjungan',
    badge: 'Fleksibel',
    badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    validityText: '1 Hari (Hari Kunjungan)',
    desc: 'Latihan fleksibel satu hari penuh tanpa komitmen bulanan.',
    features: [
      'Akses penuh semua alat beban & kardio',
      'Locker harian & shower bersih',
      'Berlaku 1 hari penuh (06:00 - 22:00 WIB)',
      'Tanpa biaya registrasi awal'
    ]
  },
  {
    id: 'bulanan',
    name: 'Paket Bulanan (Monthly Pass)',
    price: 'Rp 100.000',
    numericPrice: 100000,
    period: '/ bulan',
    badge: 'Paling Populer',
    badgeColor: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
    validityText: '30 Hari Penuh',
    desc: 'Pilihan favorit untuk konsistensi pembentukan otot dan kebugaran.',
    popular: true,
    features: [
      'Akses tak terbatas 30 hari penuh',
      'Kartu member digital & QR Code resmi',
      'Rekomendasi workout split & target makro',
      'Presensi mandiri & pelacakan streak latihan',
      'Bebas biaya perpanjangan member'
    ]
  },
  {
    id: 'tahunan',
    name: 'Paket Tahunan (Annual Pass)',
    price: 'Rp 1.200.000',
    numericPrice: 1200000,
    period: '/ tahun',
    badge: 'Nilai Terbaik',
    badgeColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
    validityText: '365 Hari (1 Tahun)',
    desc: 'Komitmen transformasi 1 tahun dengan benefit terlengkap dan hemat.',
    features: [
      'Akses 365 hari penuh tanpa batas',
      'Bonus merchandise eksklusif Trisis Gym',
      '2x sesi panduan kebugaran bersama Trainer',
      'Fasilitas cuti/freeze membership hingga 30 hari',
      'Prioritas reservasi event kebugaran'
    ]
  }
];

export default function RegisterMemberModal({
  isOpen,
  onClose,
  initialPlanId = 'bulanan',
  onRegisterComplete,
  onOpenLogin
}) {
  // Step 1: Pilih Paket | Step 2: Data Diri | Step 3: Pembayaran | Step 4: Berhasil
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlanId || 'bulanan');
  const [copiedVa, setCopiedVa] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('qris'); // 'qris' | 'va' | 'cashier'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [generatedMember, setGeneratedMember] = useState(null);

  // Form Data Diri & Akun
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: 'male',
    goal: 'muscle_building'
  });
  const [formError, setFormError] = useState('');

  // Google Cloud Console OAuth 2.0 State
  const [isGoogleConfigOpen, setIsGoogleConfigOpen] = useState(false);
  const [googleSyncLoading, setGoogleSyncLoading] = useState(false);
  const [googleConnectedAccount, setGoogleConnectedAccount] = useState(null);

  const handleGoogleConnect = () => {
    setFormError('');
    if (!isGoogleClientConfigured()) {
      setIsGoogleConfigOpen(true);
      return;
    }

    setGoogleSyncLoading(true);
    triggerGoogleOAuth({
      onSuccess: (googleUser) => {
        setGoogleSyncLoading(false);
        setGoogleConnectedAccount(googleUser);
        setFormData(prev => ({
          ...prev,
          name: googleUser.name || prev.name,
          email: googleUser.email || prev.email,
          password: prev.password || 'GooglePass2026!'
        }));
      },
      onError: (err) => {
        setGoogleSyncLoading(false);
        setFormError(err.message || 'Gagal menyinkronkan data dari akun Google Cloud.');
      }
    });
  };

  if (!isOpen) return null;

  const currentPlan = MEMBERSHIP_PLANS.find(p => p.id === selectedPlanId) || MEMBERSHIP_PLANS[1];

  const handleCopyVa = () => {
    navigator.clipboard?.writeText('88029081234567890');
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
  };

  // Step 2 Validation -> Step 3
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Nama lengkap wajib diisi.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Alamat email valid wajib diisi untuk login akun member.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Nomor WhatsApp aktif wajib diisi.');
      return;
    }
    if (!formData.password || formData.password.length < 4) {
      setFormError('Kata sandi minimal 4 karakter untuk keamanan akun Anda.');
      return;
    }

    setCurrentStep(3);
  };

  // Step 3 Payment Confirmation -> Step 4
  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const prefix = currentPlan.id === 'per_visit' ? 'V' : currentPlan.id === 'tahunan' ? 'A' : 'R';
      const randomNum = Math.floor(100 + Math.random() * 900);
      const newMemberId = `TRISIS-${prefix}-2026-${randomNum}`;

      // Hitung masa berlaku
      const now = new Date();
      let validUntilText = '1 Bulan Mendatang';
      if (currentPlan.id === 'per_visit') {
        validUntilText = 'Hari Ini (1 Kunjungan)';
      } else if (currentPlan.id === 'tahunan') {
        const nextYear = new Date();
        nextYear.setFullYear(now.getFullYear() + 1);
        validUntilText = nextYear.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      } else {
        const nextMonth = new Date();
        nextMonth.setMonth(now.getMonth() + 1);
        validUntilText = nextMonth.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      }

      const createdMemberData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        gender: formData.gender,
        goal: formData.goal,
        planId: currentPlan.id,
        planName: currentPlan.name,
        pricePaid: currentPlan.numericPrice,
        memberId: newMemberId,
        validUntil: validUntilText,
        joinedDate: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        paymentMethod: paymentMethod === 'qris' ? 'QRIS Instan Trisis Gym' : paymentMethod === 'va' ? 'Virtual Account' : 'Tunai di Meja Resepsionis',
        role: 'member'
      };

      setGeneratedMember(createdMemberData);
      setCurrentStep(4);

      // Invoke save to parent
      if (onRegisterComplete) {
        onRegisterComplete(createdMemberData, false); // false = jangan langsung close, tampilkan kartu dulu
      }
    }, 1200);
  };

  const handleFinishAndEnter = () => {
    if (onRegisterComplete && generatedMember) {
      onRegisterComplete(generatedMember, true); // true = auto login & enter
    }
    onClose();
  };

  const handleFinishAndGoToLogin = () => {
    onClose();
    if (onOpenLogin) onOpenLogin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#111319] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#0E1016]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/[0.08] flex items-center justify-center overflow-hidden p-1">
              <img src="/logo.png" alt="Trisis Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  Daftar Member <span className="text-amber-400">Trisis Gym</span>
                </h3>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium">
                Langkah {currentStep} dari 4 • {currentStep === 1 && 'Pilih Paket'}
                {currentStep === 2 && 'Data Diri & Akun'}
                {currentStep === 3 && 'Pembayaran'}
                {currentStep === 4 && 'Kartu Member Diterbitkan'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 px-5 py-2.5 bg-zinc-900/60 border-b border-white/[0.04] text-[10px] font-semibold text-zinc-400 shrink-0">
          <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-amber-400 font-bold' : ''}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${currentStep >= 1 ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-zinc-800'}`}>1</span>
            <span className="truncate">Paket</span>
          </div>
          <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-amber-400 font-bold' : ''}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${currentStep >= 2 ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-zinc-800'}`}>2</span>
            <span className="truncate">Data Akun</span>
          </div>
          <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-amber-400 font-bold' : ''}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${currentStep >= 3 ? 'bg-amber-400 text-neutral-950 font-bold' : 'bg-zinc-800'}`}>3</span>
            <span className="truncate">Bayar</span>
          </div>
          <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? 'text-emerald-400 font-bold' : ''}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${currentStep >= 4 ? 'bg-emerald-400 text-neutral-950 font-bold' : 'bg-zinc-800'}`}>4</span>
            <span className="truncate">Aktif</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-5 flex-1">
          {/* ========================================================= */}
          {/* STEP 1: PILIH PAKET MEMBERSHIP */}
          {/* ========================================================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-white">Pilih Jenis Keanggotaan</h4>
                <p className="text-xs text-zinc-400">
                  Tersedia 3 pilihan fleksibel sesuai kebutuhan dan target latihan Anda.
                </p>
              </div>

              <div className="space-y-3">
                {MEMBERSHIP_PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/[0.04] ring-1 ring-amber-400/30'
                          : 'border-white/[0.08] bg-zinc-900/60 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-white">{plan.name}</h5>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${plan.badgeColor}`}>
                              {plan.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">{plan.desc}</p>
                          <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-300">
                            {plan.features.slice(0, 3).map((f, i) => (
                              <span key={i} className="flex items-center gap-1">
                                <Check className="w-3 h-3 text-amber-400 shrink-0" />
                                <span>{f}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-base font-extrabold text-amber-400">{plan.price}</span>
                          <span className="text-[10px] text-zinc-400 block font-medium">{plan.period}</span>
                          <div className="mt-2 flex justify-end">
                            <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'bg-amber-400 border-amber-400 text-neutral-950' : 'border-zinc-700'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Lanjut Isi Data Diri</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 2: ISI DATA DIRI & AKUN */}
          {/* ========================================================= */}
          {currentStep === 2 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/[0.08] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-medium">Paket Dipilih:</span>
                  <strong className="text-white font-bold">{currentPlan.name}</strong>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-amber-400">{currentPlan.price}</span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[10px] text-zinc-400 hover:text-white underline block cursor-pointer ml-auto"
                  >
                    Ubah Paket
                  </button>
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                  {formError}
                </div>
              )}

              {/* Opsi Sinkronisasi Akun Google Resmi (Google Cloud Console OAuth 2.0) */}
              <div className="pb-1">
                {googleConnectedAccount ? (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Akun Google Terverifikasi</span>
                        </div>
                        <span className="text-[11px] text-emerald-300 font-mono">{googleConnectedAccount.email}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGoogleConnectedAccount(null)}
                      className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Ubah Akun
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={handleGoogleConnect}
                      disabled={googleSyncLoading}
                      className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-100 text-neutral-950 text-xs font-bold flex items-center justify-center gap-2.5 shadow-md shadow-black/30 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {googleSyncLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                          <span>Menghubungkan Google Cloud...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                          <span>Daftar / Buat Akun dengan Google</span>
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-between px-1 text-[10px] text-zinc-500 font-medium">
                      <span>Google Cloud Console OAuth 2.0</span>
                      <button
                        type="button"
                        onClick={() => setIsGoogleConfigOpen(true)}
                        className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
                      >
                        Atur Client ID
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Nama Lengkap <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Syams"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      Alamat Email (Login) <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="syams@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      No. WhatsApp / HP <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="081234567890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Buat Kata Sandi Akun <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="Minimal 4 karakter"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-1">
                    Gunakan email dan kata sandi ini untuk login ke portal dashboard member.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Jenis Kelamin</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2.5 bg-zinc-900/90 border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Target Kebugaran</label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-3 py-2.5 bg-zinc-900/90 border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="muscle_building">Membangun Otot (Hypertrophy)</option>
                      <option value="fat_loss">Penurunan Lemak (Fat Loss)</option>
                      <option value="general_fitness">Kebugaran Umum & Stamina</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Lanjut ke Pembayaran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* STEP 3: PEMBAYARAN & KONFIRMASI */}
          {/* ========================================================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Ringkasan Biaya */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-white/[0.06]">
                  <span className="text-zinc-400">Paket Terpilih:</span>
                  <span className="font-bold text-white">{currentPlan.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Harga Paket:</span>
                  <span className="text-zinc-200">{currentPlan.price}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Biaya Administrasi:</span>
                  <span className="text-emerald-400 font-semibold">GRATIS (Rp 0)</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-white/[0.06]">
                  <span className="font-bold text-white">Total Tagihan:</span>
                  <span className="text-lg font-black text-amber-400">{currentPlan.price}</span>
                </div>
              </div>

              {/* Pilihan Metode Pembayaran */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-zinc-300">Pilih Metode Pembayaran:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'qris'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/[0.08] bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-amber-400" />
                    <span className="text-[11px]">QRIS Instan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('va')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'va'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/[0.08] bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <span className="text-[11px]">Virtual Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cashier')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'cashier'
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-white/[0.08] bg-zinc-900/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-5 h-5 text-amber-400" />
                    <span className="text-[11px]">Kasir Gym</span>
                  </button>
                </div>
              </div>

              {/* Rincian Metode Pembayaran Terpilih */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/[0.08] space-y-3">
                {paymentMethod === 'qris' && (
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[11px] font-bold text-zinc-300">Scan QRIS Nasional • Trisis Gym Bogor</span>
                    </div>
                    {/* Simulated QR Code */}
                    <div className="w-44 h-44 mx-auto bg-white p-3 rounded-xl shadow-lg flex flex-col items-center justify-center relative">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=TRISIS-GYM-PAYMENT-${currentPlan.id}-${currentPlan.numericPrice}`}
                        alt="Simulasi QRIS Trisis Gym"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 text-neutral-950 p-2 text-center rounded-xl pointer-events-none">
                        <QrCode className="w-16 h-16 text-neutral-900 stroke-[1.5]" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-900 mt-1">
                          TRISIS GYM QRIS
                        </span>
                        <span className="text-[9px] font-bold text-amber-600">
                          {currentPlan.price}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed max-w-xs mx-auto">
                      Dukung semua aplikasi e-wallet & m-banking: BCA, Mandiri, BRI, GoPay, OVO, ShopeePay & DANA.
                    </p>
                  </div>
                )}

                {paymentMethod === 'va' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-zinc-400 block mb-1">Nomor Virtual Account Bank BCA / Mandiri:</span>
                      <div className="flex items-center gap-2 bg-zinc-950 p-3 rounded-xl border border-white/[0.08]">
                        <span className="font-mono text-base font-bold text-amber-400 tracking-wider">
                          8802 9081 2345 6789
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyVa}
                          className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedVa ? 'Disalin!' : 'Salin'}</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Nama Penerima: <strong className="text-white font-semibold">TRISIS GYM MEMBER SUBSCRIPTION</strong>
                    </p>
                  </div>
                )}

                {paymentMethod === 'cashier' && (
                  <div className="space-y-2 text-xs text-zinc-300">
                    <p className="leading-relaxed">
                      Tunjukkan bukti invoice pendaftaran ini ke resepsionis/kasir Trisis Gym di Jl. Gym Raya Bogor untuk pembayaran tunai atau debit EDC.
                    </p>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-[11px] text-amber-400 font-semibold">
                      Kode Registrasi Kasir: REG-TG-{Math.floor(1000 + Math.random() * 9000)}
                    </div>
                  </div>
                )}
              </div>

              {/* Tombol Eksekusi Pembayaran */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={isProcessingPayment}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessingPayment}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-400/20 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                      <span>Memverifikasi Pembayaran...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Konfirmasi & Selesaikan Pembayaran</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* STEP 4: BERHASIL! KARTU MEMBER & AKUN DITERBITKAN */}
          {/* ========================================================= */}
          {currentStep === 4 && generatedMember && (
            <div className="space-y-5 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-white">Pembayaran & Pendaftaran Berhasil!</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Selamat datang di keluarga Trisis Gym. Akun member resmi dan kartu keanggotaan digital Anda telah aktif.
                </p>
              </div>

              {/* Digital Member Card Preview */}
              <div className="max-w-sm mx-auto rounded-2xl p-5 bg-gradient-to-br from-zinc-900 via-[#141622] to-zinc-900 border border-amber-400/30 shadow-xl text-left space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/[0.08] p-1 flex items-center justify-center">
                      <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-extrabold text-xs tracking-wider text-white">TRISIS GYM</span>
                      <span className="text-[9px] text-zinc-400 block font-medium">Official Digital Pass</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    AKTIF
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-zinc-400 block uppercase font-medium">Nama Member:</span>
                  <h5 className="text-base font-bold text-white">{generatedMember.name}</h5>
                  <span className="font-mono text-xs text-amber-400 font-bold block pt-0.5">
                    {generatedMember.memberId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06] text-[10px]">
                  <div>
                    <span className="text-zinc-400 block">Paket:</span>
                    <strong className="text-white font-semibold">{generatedMember.planName}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Berlaku Sampai:</span>
                    <strong className="text-amber-300 font-semibold">{generatedMember.validUntil}</strong>
                  </div>
                </div>
              </div>

              {/* Next Actions */}
              <div className="space-y-2 pt-2 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={handleFinishAndEnter}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-neutral-950" />
                  <span>Langsung Masuk ke Portal Member</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleFinishAndGoToLogin}
                  className="w-full py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Buka Halaman Login Member
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL SETUP GOOGLE CLOUD CONSOLE OAUTH 2.0 */}
      <GoogleCloudConfigModal
        isOpen={isGoogleConfigOpen}
        onClose={() => setIsGoogleConfigOpen(false)}
        onSaved={() => {
          setTimeout(() => {
            handleGoogleConnect();
          }, 200);
        }}
      />
    </div>
  );
}
