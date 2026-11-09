import React from 'react';
import { X, QrCode, ShieldAlert, Award, Calendar, CheckCircle2, Zap, Lock, AlertTriangle } from 'lucide-react';

export default function MemberCardModal({ isOpen, onClose, user, onOpenPayment }) {
  if (!isOpen) return null;

  const isPaid = Boolean(user?.hasPaid || (user?.status === 'Aktif' && user?.planId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#111319] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-zinc-900/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 border border-white/[0.08] flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-zinc-200">Kartu Member Digital</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Official Card Banner */}
        <div className={`px-4 py-2 flex items-center gap-2 border-b border-white/[0.08] ${
          isPaid ? 'bg-zinc-900/80 text-zinc-300' : 'bg-amber-950/30 text-amber-300'
        }`}>
          {isPaid ? (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <p className="text-[11px] font-semibold tracking-wide">
                KARTU KEANGGOTAAN RESMI TRISIS GYM
              </p>
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <p className="text-[11px] font-semibold tracking-wide">
                STATUS: MENUNGGU PEMBAYARAN PAKET
              </p>
            </>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Virtual Pass Card Visual (Matte Obsidian Fit Hub / Fit Quest Style) */}
          <div className="relative rounded-2xl p-5 bg-[#090A0E] text-white border border-white/[0.12] overflow-hidden">
            {/* Top Amber Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${isPaid ? 'bg-amber-400' : 'bg-zinc-600'}`} />

            <div className="relative z-10 flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.08] p-1.5 shrink-0">
                  <img src="/logo.png" alt="Trisis Gym Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">TRISIS GYM • EST. BOGOR</h4>
                  <p className="text-base font-bold tracking-tight text-white mt-0.5">{user?.name || 'Budi Santoso'}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 font-semibold rounded-full text-[10px] px-2.5 py-0.5 shrink-0 ${
                isPaid 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {isPaid ? 'AKTIF' : 'MENUNGGU BAYAR'}
              </span>
            </div>

            {/* Member Details Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <span className="block text-[10px] text-zinc-500 font-medium uppercase">Nomor Member</span>
                <span className="font-mono font-bold text-white text-xs">{user?.memberId || 'TRISIS-2026-089'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 font-medium uppercase">Paket Membership</span>
                <span className="font-semibold text-zinc-200 truncate block text-xs">
                  {isPaid ? (user?.planName || 'Paket Bulanan (Monthly Pass)') : 'Belum Ada Paket'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 font-medium uppercase">Masa Berlaku</span>
                <span className="font-medium text-white flex items-center gap-1 text-xs">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  {isPaid ? (user?.validUntil || '30 Hari') : 'Belum Aktif'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 font-medium uppercase">Tipe Akses</span>
                <span className={`font-medium flex items-center gap-1 text-xs ${
                  isPaid ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {isPaid ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Semua Fasilitas
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" />
                      Akses Terkunci
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* QR Area */}
            <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-400">ID: {user?.qrCodeSeed || user?.memberId || 'TRISIS-QR-089'}</span>
                <p className="text-[9px] text-zinc-500">
                  {isPaid ? 'Scan pada sensor scanner turnstile kasir' : 'QR tidak dapat di-scan sebelum paket dibayar'}
                </p>
              </div>
              <div className="relative p-2 bg-white rounded-xl shadow-sm">
                <QrCode className="w-8 h-8 text-neutral-950" />
                {!isPaid && (
                  <div className="absolute inset-0 bg-neutral-950/70 rounded-xl flex items-center justify-center">
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Usage Notice */}
          <div className="rounded-xl bg-zinc-900/60 p-3.5 border border-white/[0.06] text-xs text-zinc-400 space-y-1">
            <span className="font-semibold text-zinc-200 block">Informasi Kartu Digital:</span>
            <p className="text-[11px] leading-relaxed">
              {isPaid 
                ? 'Tunjukkan barcode QR kartu digital ini ke pemindai optik turnstile atau kasir saat memasuki area latihan Trisis Gym Centre Bogor.'
                : 'Kartu keanggotaan ini belum aktif. Silakan pilih salah satu dari 3 paket membership (Per-Visit, Bulanan, atau Tahunan) untuk mengaktifkan akses gym Anda.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {!isPaid ? (
              <button
                onClick={() => {
                  onClose();
                  if (onOpenPayment) {
                    onOpenPayment({
                      id: 'bulanan',
                      name: 'Paket Bulanan (Monthly Pass)',
                      price: 100000,
                      priceStr: 'Rp 100.000',
                      durationStr: '30 Hari Penuh'
                    });
                  }
                }}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-950/20"
              >
                <Zap className="w-4 h-4 text-neutral-950" />
                <span>Pilih & Bayar Paket Membership (QRIS)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  if (onOpenPayment) {
                    onOpenPayment({
                      id: user?.planId || 'bulanan',
                      name: user?.planName || 'Paket Bulanan (Monthly Pass)',
                      price: user?.planId === 'tahunan' ? 1200000 : user?.planId === 'per_visit' ? 25000 : 100000,
                      priceStr: user?.planId === 'tahunan' ? 'Rp 1.200.000' : user?.planId === 'per_visit' ? 'Rp 25.000' : 'Rp 100.000',
                      durationStr: user?.planId === 'tahunan' ? '365 Hari' : user?.planId === 'per_visit' ? '1 Hari' : '30 Hari'
                    });
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 font-bold text-xs transition-all cursor-pointer"
              >
                Perpanjang / Ganti Paket
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-zinc-200 font-semibold text-xs transition-colors cursor-pointer border border-white/[0.08]"
            >
              Tutup Kartu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
