import React, { useState } from 'react';
import { X, MapPin, CheckCircle, AlertTriangle, Loader2, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function CheckInModal({ isOpen, onClose, onCheckInSuccess, onViewActivity }) {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await onCheckInSuccess(notes);
      setSuccessData(result.checkIn);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal memproses simulasi presensi check-in.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setErrorMessage('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#131520] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-white">Presensi Kehadiran Gym</span>
            <StatusBadge status="DEMO" size="xs" />
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {successData ? (
            /* Success State */
            <div className="text-center py-2 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-950/50 border border-emerald-800/40 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Check-in Berhasil Dicatat!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Kehadiran latihan Anda berhasil disimulasikan dan disimpan ke riwayat.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Lokasi:</span>
                  <span className="font-bold text-slate-200">{successData.location}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Waktu:</span>
                  <span className="font-bold text-slate-200">{successData.date}, {successData.time}</span>
                </div>
                <div className="flex justify-between text-slate-400 items-center">
                  <span>Status Data:</span>
                  <StatusBadge status="DEMO" size="xs" />
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
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs transition-colors cursor-pointer border border-white/10"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </div>
          ) : (
            /* Initial Form State */
            <div className="space-y-4">
              {/* Location Badge */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-800/40 shrink-0">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xs">
                  <span className="block font-bold text-slate-200">Trisis Gym — Area Utama</span>
                  <span className="text-slate-400">Kota Bogor, Jawa Barat (Simulasi Lokasi)</span>
                </div>
              </div>

              {/* Explanation Text */}
              <p className="text-xs text-slate-400 leading-relaxed">
                Tindakan ini menyimulasikan absensi mandiri kedatangan member di gym. Waktu kehadiran dicatat otomatis berdasarkan jam perangkat.
              </p>

              {/* Optional Notes Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Catatan Sesi Latihan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Misal: Latihan dada & trisep"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/10 transition-colors"
                />
              </div>

              {/* Error Message if duplicate */}
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800/40 flex items-start gap-2.5 text-rose-300 text-xs font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-snug">{errorMessage}</p>
                </div>
              )}

              {/* Confirm CTA */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="w-full min-h-[46px] rounded-2xl bg-[#5D4E75] hover:bg-[#6D5D88] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 border border-purple-400/30 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Memproses Simulasi...
                    </>
                  ) : (
                    'Konfirmasi Check-in Sekarang'
                  )}
                </button>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs transition-colors cursor-pointer border border-white/10"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
