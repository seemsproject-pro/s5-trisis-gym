import React from 'react';
import { X, QrCode, ShieldAlert, Award, Calendar, CheckCircle2 } from 'lucide-react';

export default function MemberCardModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

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
        <div className="bg-zinc-900/80 border-b border-white/[0.08] px-4 py-2 flex items-center gap-2 text-zinc-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <p className="text-[11px] font-semibold tracking-wide">
            KARTU KEANGGOTAAN RESMI TRISIS GYM
          </p>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Virtual Pass Card Visual (Matte Obsidian Fit Hub / Fit Quest Style) */}
          <div className="relative rounded-2xl p-5 bg-[#090A0E] text-white border border-white/[0.12] overflow-hidden">
            {/* Top Amber Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400" />

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
              <span className="inline-flex items-center gap-1 font-semibold rounded-full text-[10px] px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                AKTIF
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
                <span className="font-semibold text-zinc-200 truncate block text-xs">{user?.planName || 'Annual Regular'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 font-medium uppercase">Masa Berlaku</span>
                <span className="font-medium text-white flex items-center gap-1 text-xs">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  {user?.validUntil || '31 Des 2026'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 font-medium uppercase">Tipe Akses</span>
                <span className="font-medium text-emerald-400 flex items-center gap-1 text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  Semua Fasilitas
                </span>
              </div>
            </div>

            {/* QR Area */}
            <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-400">ID: {user?.qrCodeSeed || 'TRISIS-QR-089'}</span>
                <p className="text-[9px] text-zinc-500">Scan pada sensor scanner turnstile kasir</p>
              </div>
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <QrCode className="w-8 h-8 text-neutral-950" />
              </div>
            </div>
          </div>

          {/* Usage Notice */}
          <div className="rounded-xl bg-zinc-900/60 p-3.5 border border-white/[0.06] text-xs text-zinc-400 space-y-1">
            <span className="font-semibold text-zinc-200 block">Informasi Kartu Digital:</span>
            <p className="text-[11px] leading-relaxed">
              Tunjukkan barcode QR kartu digital ini ke pemindai optik turnstile atau kasir saat memasuki area latihan Trisis Gym Centre Bogor.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-zinc-200 font-semibold text-xs transition-colors cursor-pointer border border-white/[0.08]"
          >
            Tutup Kartu
          </button>
        </div>
      </div>
    </div>
  );
}
