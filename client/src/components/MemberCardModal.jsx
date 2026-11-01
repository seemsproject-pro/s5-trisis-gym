import React from 'react';
import { X, QrCode, ShieldAlert, Award, Calendar, CheckCircle2 } from 'lucide-react';

export default function MemberCardModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#131520] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800/40 flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Kartu Member Digital</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mandatory SOT Disclaimer Banner */}
        <div className="bg-[#1C172B] border-b border-purple-900/40 px-4 py-2 flex items-center gap-2 text-purple-300">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <p className="text-[11px] font-bold tracking-tight uppercase">
            DEMO — BUKAN KARTU KEANGGOTAAN RESMI
          </p>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Virtual Pass Card Visual (Dark Obsidian with Soft Purple & Gold Frame) */}
          <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#1E192E] via-[#141624] to-[#0D0F18] text-white shadow-2xl shadow-black/60 border-2 border-amber-400/50 overflow-hidden">
            {/* Athletic Gold Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

            <div className="relative z-10 flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-amber-400/50 p-0.5 shadow-md shrink-0">
                  <img src="/logo.png" alt="Trisis Gym Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black tracking-wider text-amber-300 uppercase">TRISIS GYM • EST. BOGOR</h4>
                  <p className="text-base font-black tracking-tight text-white mt-0.5">{user?.name || 'Budi Santoso'}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 font-bold rounded-full text-[10px] px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                AKTIF
              </span>
            </div>

            {/* Member Details Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <span className="block text-[10px] text-slate-400 font-medium uppercase">Nomor Member</span>
                <span className="font-mono font-bold text-white text-xs">{user?.memberId || 'TRISIS-DEMO-089'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-medium uppercase">Paket Membership</span>
                <span className="font-semibold text-amber-300 truncate block text-xs">{user?.planName || 'Annual Regular'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-medium uppercase">Masa Berlaku</span>
                <span className="font-semibold text-white flex items-center gap-1 text-xs">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {user?.validUntil || '31 Des 2026'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-medium uppercase">Tipe Akses</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1 text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  Semua Cabang
                </span>
              </div>
            </div>

            {/* QR Simulation Area */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-purple-300">ID: {user?.qrCodeSeed || 'QR-DEMO-089'}</span>
                <p className="text-[9px] text-slate-400">Simulasi kode QR demo untuk check-in resepsionis</p>
              </div>
              <div className="p-1.5 bg-white rounded-xl shadow-md">
                <QrCode className="w-9 h-9 text-slate-900" />
              </div>
            </div>
          </div>

          {/* SOT Educational Notice */}
          <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10 text-xs text-slate-400 space-y-1">
            <span className="font-bold text-slate-200 block">Catatan Penggunaan Prototipe:</span>
            <p className="text-[11px] leading-relaxed">
              Kartu ini merupakan purwarupa frontend demo. Tidak berlaku sebagai tanda masuk fisik atau bukti legal keanggotaan operasional riil Trisis Gym.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs transition-colors cursor-pointer border border-white/10"
          >
            Tutup Kartu
          </button>
        </div>
      </div>
    </div>
  );
}
