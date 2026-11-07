import React from 'react';
import { CreditCard, LogOut, RotateCcw, Building2, ShieldCheck, User } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function Header({ 
  user, 
  currentRole = 'member',
  onToggleRole,
  onOpenCard, 
  onLogout, 
  onResetDemo, 
  onGoToLanding 
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#0B0D14]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
      <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name (di md+ brand tampil di SideNav) */}
        <div className="flex items-center gap-2.5 md:hidden">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-amber-400/40 flex items-center justify-center shadow-xs overflow-hidden p-0.5 shrink-0">
            <img src="/logo.png" alt="Trisis Gym Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                TRISIS<span className="text-amber-400 font-black">GYM</span>
              </span>
              <StatusBadge status={currentRole === 'admin' ? 'ADMIN' : 'MEMBER'} size="xs" />
            </div>
            <p className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase leading-none">Est. Bogor, Indonesia</p>
          </div>
        </div>

        {/* Member/Admin Greeting on Desktop/Tablet header */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Masuk sebagai</span>
          <span className="text-xs font-bold text-slate-200 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            {currentRole === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Gym / Kasir</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-purple-300" />
                <span>{user?.name || 'Budi Santoso'}</span>
              </>
            )}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Role Switcher Button */}
          {onToggleRole && (
            <button
              id="header-toggle-role"
              onClick={onToggleRole}
              title={`Beralih ke mode ${currentRole === 'admin' ? 'Member' : 'Admin'}`}
              aria-label="Ganti Peran Antara Member dan Admin"
              className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                currentRole === 'admin'
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-950/40 hover:bg-amber-300'
                  : 'bg-purple-950/80 text-purple-200 border-purple-500/40 hover:bg-purple-900 shadow-xs'
              }`}
            >
              {currentRole === 'admin' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                  <span>Mode Admin</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Mode Admin</span>
                  <span className="sm:hidden">Admin</span>
                </>
              )}
            </button>
          )}

          {onGoToLanding && (
            <button
              onClick={onGoToLanding}
              title="Kembali ke Halaman Profil & Penawaran Gym"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Profil Gym</span>
            </button>
          )}

          <button
            id="header-open-card"
            onClick={onOpenCard}
            title="Lihat Kartu Member Digital"
            aria-label="Lihat Kartu Member Digital"
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Kartu Member</span>
          </button>

          <button
            id="header-reset-demo"
            onClick={onResetDemo}
            title="Reset Data ke Default"
            aria-label="Reset Data ke Default"
            className="p-1.5 rounded-full bg-white/5 hover:bg-amber-500/15 text-slate-400 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            id="header-logout"
            onClick={onLogout}
            title="Keluar / Logout dari Akun"
            aria-label="Keluar / Logout dari Akun"
            className="flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 shadow-xs transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}

