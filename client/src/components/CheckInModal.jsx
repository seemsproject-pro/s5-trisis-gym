import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  ArrowRight, 
  QrCode, 
  Scan, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Camera,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import StatusBadge from './StatusBadge';

// Helper audio synth beep untuk simulasi barcode scanner kasir
function playBeepSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // 880Hz (A5)
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Abaikan jika browser memblokir autoplay audio
  }
}

export default function CheckInModal({ 
  isOpen, 
  onClose, 
  onCheckInSuccess, 
  onResetTodayCheckIn,
  onViewActivity,
  user 
}) {
  const [scanMode, setScanMode] = useState('SHOW_QR'); // 'SHOW_QR' (Tunjukkan ke kasir) | 'SCAN_CAMERA' (Scan QR meja kasir)
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [qrToken, setQrToken] = useState('TRISIS-PASS-SECURE-8921');
  const [isScanningActive, setIsScanningActive] = useState(false);

  // Security live countdown refresh token (anti-screenshot sharing)
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setQrToken(`TRISIS-PASS-${Math.floor(1000 + Math.random() * 9000)}`);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScanConfirm = async (customNotes) => {
    setLoading(true);
    setErrorMessage('');
    playBeepSound();

    try {
      // Delay simulasi scanner optik kasir membaca barcode
      await new Promise((r) => setTimeout(r, 600));
      const result = await onCheckInSuccess(customNotes || notes || 'Presensi Scan QR Kasir');
      setSuccessData(result.checkIn);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal memproses simulasi scan presensi.');
    } finally {
      setLoading(false);
      setIsScanningActive(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setErrorMessage('');
    setNotes('');
    setIsScanningActive(false);
    onClose();
  };

  const handleResetToday = async () => {
    if (onResetTodayCheckIn) {
      await onResetTodayCheckIn();
      setErrorMessage('');
      setSuccessData(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#111319] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-zinc-900/40 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/[0.08] text-amber-400 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">Presensi QR Gym</span>
              <span className="text-[10px] text-zinc-400 font-medium">Kasir & Turnstile Resepsionis</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {successData ? (
            /* ================= STATE 1: CHECK-IN BERHASIL ================= */
            <div className="text-center py-2 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="relative w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400 animate-in zoom-in duration-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 ring-4 ring-[#111319] animate-ping" />
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Scan Kasir Terverifikasi
                </span>
                <h3 className="text-lg font-bold text-white mt-2">Presensi Berhasil Dicatat!</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Selamat datang di Trisis Gym. Selamat berolahraga!
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-zinc-900/60 rounded-xl p-4 border border-white/[0.06] text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Nama Member:</span>
                  <span className="font-bold text-white">{user?.name || 'Budi Santoso'}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>ID Member:</span>
                  <span className="font-mono text-amber-400 font-bold">{user?.memberId || 'TRISIS-2026-089'}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Lokasi Scan:</span>
                  <span className="font-medium text-zinc-200">{successData.location}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Waktu Presensi:</span>
                  <span className="font-medium text-amber-400">{successData.date}, {successData.time}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400 pt-1 border-t border-white/[0.06]">
                  <span>Metode:</span>
                  <span className="font-medium text-emerald-400 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5" />
                    Scan QR Barcode Kasir
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    handleReset();
                    onViewActivity();
                  }}
                  className="w-full min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Lihat Riwayat Kehadiran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer border border-white/[0.08]"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          ) : (
            /* ================= STATE 2: QR CHECK-IN FORM ================= */
            <div className="space-y-4">
              {/* Mode Switcher */}
              <div className="grid grid-cols-2 p-1 bg-zinc-900/80 rounded-xl border border-white/[0.08] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setScanMode('SHOW_QR')}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    scanMode === 'SHOW_QR'
                      ? 'bg-zinc-800 text-amber-400 border border-zinc-700/80 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>QR Saya (Kasir Scan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScanMode('SCAN_CAMERA')}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    scanMode === 'SCAN_CAMERA'
                      ? 'bg-zinc-800 text-amber-400 border border-zinc-700/80 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Scan QR Meja Kasir</span>
                </button>
              </div>

              {/* MODE A: MEMBER MENUNJUKKAN QR CODE UNTUK DI-SCAN KASIR */}
              {scanMode === 'SHOW_QR' && (
                <div className="space-y-4">
                  {/* Dynamic High-Contrast QR Code Card */}
                  <div className="bg-white rounded-2xl p-5 text-center relative overflow-hidden border border-white/[0.08]">
                    {/* Subtle Scan Beam Animation */}
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse z-10 top-1/2 -translate-y-1/2 opacity-75 pointer-events-none" />

                    <div className="flex items-center justify-between mb-3 text-neutral-900 border-b border-zinc-100 pb-2">
                      <div className="text-left">
                        <span className="text-[10px] font-bold tracking-wider text-amber-600 uppercase block">TRISIS GYM PASS</span>
                        <strong className="text-xs font-bold text-neutral-900 block truncate">{user?.name || 'Budi Santoso'}</strong>
                      </div>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                        SIAP SCAN
                      </span>
                    </div>

                    {/* SVG QR Code Pattern */}
                    <div className="relative mx-auto w-48 h-48 bg-white p-2 flex items-center justify-center">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full text-neutral-950"
                        shapeRendering="crispEdges"
                      >
                        {/* Corner Finder Patterns */}
                        {/* Top-Left */}
                        <rect x="5" y="5" width="26" height="26" fill="currentColor" rx="4" />
                        <rect x="9" y="9" width="18" height="18" fill="white" rx="2" />
                        <rect x="13" y="13" width="10" height="10" fill="currentColor" rx="1" />

                        {/* Top-Right */}
                        <rect x="69" y="5" width="26" height="26" fill="currentColor" rx="4" />
                        <rect x="73" y="9" width="18" height="18" fill="white" rx="2" />
                        <rect x="77" y="13" width="10" height="10" fill="currentColor" rx="1" />

                        {/* Bottom-Left */}
                        <rect x="5" y="69" width="26" height="26" fill="currentColor" rx="4" />
                        <rect x="9" y="73" width="18" height="18" fill="white" rx="2" />
                        <rect x="13" y="77" width="10" height="10" fill="currentColor" rx="1" />

                        {/* Timing Patterns */}
                        <rect x="34" y="15" width="4" height="4" fill="currentColor" />
                        <rect x="42" y="15" width="4" height="4" fill="currentColor" />
                        <rect x="50" y="15" width="4" height="4" fill="currentColor" />
                        <rect x="58" y="15" width="4" height="4" fill="currentColor" />
                        <rect x="15" y="34" width="4" height="4" fill="currentColor" />
                        <rect x="15" y="42" width="4" height="4" fill="currentColor" />
                        <rect x="15" y="50" width="4" height="4" fill="currentColor" />
                        <rect x="15" y="58" width="4" height="4" fill="currentColor" />

                        {/* Alignment Pattern */}
                        <rect x="67" y="67" width="16" height="16" fill="currentColor" rx="2" />
                        <rect x="71" y="71" width="8" height="8" fill="white" />
                        <rect x="73" y="73" width="4" height="4" fill="currentColor" />

                        {/* Data Blocks */}
                        <rect x="35" y="35" width="5" height="5" fill="currentColor" />
                        <rect x="43" y="35" width="5" height="5" fill="currentColor" />
                        <rect x="51" y="38" width="5" height="5" fill="currentColor" />
                        <rect x="59" y="35" width="5" height="5" fill="currentColor" />

                        <rect x="35" y="43" width="6" height="6" fill="currentColor" />
                        <rect x="45" y="45" width="6" height="6" fill="currentColor" />
                        <rect x="55" y="45" width="5" height="5" fill="currentColor" />

                        <rect x="35" y="55" width="5" height="5" fill="currentColor" />
                        <rect x="43" y="53" width="5" height="5" fill="currentColor" />
                        <rect x="51" y="55" width="5" height="5" fill="currentColor" />
                        <rect x="59" y="53" width="5" height="5" fill="currentColor" />

                        <rect x="35" y="65" width="5" height="5" fill="currentColor" />
                        <rect x="45" y="68" width="5" height="5" fill="currentColor" />
                        <rect x="53" y="65" width="5" height="5" fill="currentColor" />

                        <rect x="35" y="75" width="6" height="6" fill="currentColor" />
                        <rect x="45" y="77" width="5" height="5" fill="currentColor" />
                        <rect x="55" y="75" width="6" height="6" fill="currentColor" />

                        <rect x="75" y="35" width="5" height="5" fill="currentColor" />
                        <rect x="85" y="38" width="5" height="5" fill="currentColor" />
                        <rect x="78" y="45" width="5" height="5" fill="currentColor" />
                        <rect x="85" y="48" width="5" height="5" fill="currentColor" />
                        <rect x="75" y="55" width="5" height="5" fill="currentColor" />

                        <rect x="5" y="35" width="5" height="5" fill="currentColor" />
                        <rect x="5" y="45" width="5" height="5" fill="currentColor" />
                        <rect x="5" y="55" width="5" height="5" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Member Barcode String & Dynamic Countdown */}
                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                      <span className="font-bold text-neutral-900 tracking-wider">
                        {user?.memberId || 'TRISIS-2026-089'}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-amber-600 font-sans font-bold">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        {countdown}d
                      </span>
                    </div>
                  </div>

                  {/* Instruction text */}
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/[0.06] text-xs text-zinc-300 space-y-1">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 text-amber-400" />
                      Cara Check-In di Kasir:
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Tunjukkan layar QR ini ke petugas kasir/resepsionis Trisis Gym untuk dipindai menggunakan pemindai barcode turnstile.
                    </p>
                  </div>
                </div>
              )}

              {/* MODE B: MEMBER SCAN QR MEJA KASIR (KAMERA VIEWINDER SIMULASI) */}
              {scanMode === 'SCAN_CAMERA' && (
                <div className="space-y-3">
                  <div className="relative aspect-square w-full rounded-2xl bg-black border border-white/[0.08] overflow-hidden flex flex-col items-center justify-center p-4">
                    {/* Viewfinder Corner Brackets */}
                    <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg" />
                    <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-lg" />
                    <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-lg" />
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg" />

                    {/* Laser Scanner Line */}
                    <div className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_10px_#F59E0B] animate-bounce" />

                    <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center mb-3 text-zinc-400">
                      <QrCode className="w-10 h-10 text-zinc-400 opacity-60" />
                    </div>

                    <span className="text-xs font-semibold text-white block">Arahkan Kamera ke QR Kasir</span>
                    <span className="text-[10px] text-zinc-400 text-center max-w-[200px] mt-1">
                      Posisikan QR Code meja kasir / turnstile di dalam kotak pemindai
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 text-center">
                    Pemindai optik membaca kode QR meja resepsionis gym secara otomatis.
                  </p>
                </div>
              )}

              {/* Catatan Sesi Latihan (Opsional) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Catatan Sesi Latihan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Misal: Chest & Triceps Day"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-zinc-900/80 border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                />
              </div>

              {/* Error Message if duplicate checkin */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/20 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-rose-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                    <p className="leading-snug">{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetToday}
                    className="w-full py-2 rounded-lg bg-rose-900/30 hover:bg-rose-900/50 text-rose-200 border border-rose-500/30 font-semibold text-[11px] transition-colors cursor-pointer"
                  >
                    Reset Presensi Hari Ini (Untuk Tes Scan Lagi)
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-1 space-y-2">
                <button
                  onClick={() => handleScanConfirm(notes)}
                  disabled={loading}
                  className="w-full min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] disabled:opacity-50 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                      <span>Kasir Sedang Memindai...</span>
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4 text-neutral-950" />
                      <span>{scanMode === 'SHOW_QR' ? 'Verifikasi Presensi Kasir (Bip!)' : 'Pindai QR Meja Kasir Sekarang'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-zinc-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer border border-white/[0.08]"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
