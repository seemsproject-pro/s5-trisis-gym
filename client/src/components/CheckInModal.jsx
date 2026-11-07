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
      <div className="relative w-full max-w-sm bg-[#131520] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white block leading-tight">Presensi QR Gym</span>
              <span className="text-[10px] text-slate-400 font-medium">Kasir & Turnstile Resepsionis</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {successData ? (
            /* ================= STATE 1: CHECK-IN BERHASIL ================= */
            <div className="text-center py-2 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="relative w-16 h-16 mx-auto rounded-3xl bg-emerald-950/60 border-2 border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/50">
                <CheckCircle className="w-9 h-9 text-emerald-400 animate-in zoom-in duration-300" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 absolute -top-1 -right-1 ring-4 ring-[#131520] animate-ping" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                  Scan Kasir Terverifikasi
                </span>
                <h3 className="text-lg font-black text-white mt-2">Presensi Berhasil Dicatat!</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Selamat datang di Trisis Gym. Selamat berolahraga!
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Nama Member:</span>
                  <span className="font-bold text-white">{user?.name || 'Budi Santoso'}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>ID Member:</span>
                  <span className="font-mono text-purple-300 font-bold">{user?.memberId || 'TRISIS-2026-089'}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Lokasi Scan:</span>
                  <span className="font-bold text-slate-200">{successData.location}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Waktu Presensi:</span>
                  <span className="font-bold text-amber-300">{successData.date}, {successData.time}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-white/10">
                  <span>Metode:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
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
                  className="w-full min-h-[46px] rounded-2xl bg-[#5D4E75] hover:bg-[#6D5D88] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 border border-purple-400/30 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Lihat Riwayat Kehadiran
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer border border-white/10"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          ) : (
            /* ================= STATE 2: QR CHECK-IN FORM ================= */
            <div className="space-y-4">
              {/* Mode Switcher */}
              <div className="grid grid-cols-2 p-1 bg-white/5 rounded-2xl border border-white/10 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setScanMode('SHOW_QR')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    scanMode === 'SHOW_QR'
                      ? 'bg-[#5D4E75] text-white shadow-sm border border-purple-400/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                  <span>QR Saya (Kasir Scan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScanMode('SCAN_CAMERA')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    scanMode === 'SCAN_CAMERA'
                      ? 'bg-[#5D4E75] text-white shadow-sm border border-purple-400/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-amber-300" />
                  <span>Scan QR Meja Kasir</span>
                </button>
              </div>

              {/* MODE A: MEMBER MENUNJUKKAN QR CODE UNTUK DI-SCAN KASIR */}
              {scanMode === 'SHOW_QR' && (
                <div className="space-y-4">
                  {/* Dynamic High-Contrast QR Code Card */}
                  <div className="bg-white rounded-3xl p-5 shadow-2xl text-center relative overflow-hidden ring-4 ring-purple-500/20">
                    {/* Glowing Laser Scan Beam Animation */}
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#EF4444] animate-pulse z-10 top-1/2 -translate-y-1/2 opacity-75 pointer-events-none" />

                    <div className="flex items-center justify-between mb-3 text-slate-900 border-b border-slate-100 pb-2">
                      <div className="text-left">
                        <span className="text-[10px] font-black tracking-wider text-[#5D4E75] uppercase block">TRISIS GYM PASS</span>
                        <strong className="text-xs font-extrabold text-slate-900 block truncate">{user?.name || 'Budi Santoso'}</strong>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                        SIAP SCAN
                      </span>
                    </div>

                    {/* SVG QR Code Pattern */}
                    <div className="relative mx-auto w-48 h-48 bg-white p-2 flex items-center justify-center">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full text-slate-950"
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
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span className="font-bold text-slate-900 tracking-wider">
                        {user?.memberId || 'TRISIS-2026-089'}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-[#5D4E75] font-sans font-bold">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        {countdown}d
                      </span>
                    </div>
                  </div>

                  {/* Instruction text */}
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 text-amber-400" />
                      Cara Check-In di Kasir:
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Tunjukkan layar QR ini ke petugas kasir/resepsionis Trisis Gym untuk dipindai menggunakan *barcode scanner*.
                    </p>
                  </div>
                </div>
              )}

              {/* MODE B: MEMBER SCAN QR MEJA KASIR (KAMERA VIEWINDER SIMULASI) */}
              {scanMode === 'SCAN_CAMERA' && (
                <div className="space-y-3">
                  <div className="relative aspect-square w-full rounded-3xl bg-black border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                    {/* Viewfinder Corner Brackets */}
                    <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-xl" />
                    <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-xl" />
                    <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-xl" />
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-xl" />

                    {/* Laser Scanner Line */}
                    <div className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#F59E0B] animate-bounce" />

                    <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-slate-400">
                      <QrCode className="w-10 h-10 text-purple-300 opacity-60" />
                    </div>

                    <span className="text-xs font-bold text-white block">Arahkan Kamera ke QR Kasir</span>
                    <span className="text-[10px] text-slate-400 text-center max-w-[200px] mt-1">
                      Posisikan QR Code meja kasir / turnstile di dalam kotak pemindai
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    Pemindai optik aktif membaca kode QR meja resepsionis gym secara otomatis.
                  </p>
                </div>
              )}

              {/* Catatan Sesi Latihan (Opsional) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Catatan Sesi Latihan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Misal: Chest & Triceps Day"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/10 transition-colors"
                />
              </div>

              {/* Error Message if duplicate checkin */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-800/40 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-rose-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                    <p className="leading-snug">{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetToday}
                    className="w-full py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/60 text-rose-200 border border-rose-700/50 font-bold text-[11px] transition-colors cursor-pointer"
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
                  className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-[0.98] disabled:opacity-50 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 border border-amber-300 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Kasir Sedang Memindai...</span>
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4 text-slate-950" />
                      <span>{scanMode === 'SHOW_QR' ? 'Verifikasi Presensi Kasir (Bip!)' : 'Pindai QR Meja Kasir Sekarang'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  disabled={loading}
                  className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-bold text-xs transition-colors cursor-pointer border border-white/10"
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
