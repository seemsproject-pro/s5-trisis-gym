import React from 'react';
import { CreditCard, LogOut, Building2, ShieldCheck, User } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function Header({ 
  user, 
  currentRole = 'member',
  onToggleRole,
  onOpenCard, 
  onLogout, 
  onGoToLanding 
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#090A0E]/95 backdrop-blur-md border-b border-white/[0.08] px-4 md:px-8 py-3">
      <div className="max-w-md md:max-w-3xl lg:max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name (Mobile) */}
        <div className="flex items-center gap-2.5 md:hidden">
          <img src="/logo.png" alt="Trisis Gym Logo" className="h-9 w-auto object-contain shrink-0 drop-shadow-sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">
                TRISIS<span className="text-amber-400">GYM</span>
              </span>
              <StatusBadge status={currentRole === 'admin' ? 'ADMIN' : 'MEMBER'} size="xs" />
            </div>
            <p className="text-[9px] text-zinc-500 font-medium tracking-wider uppercase leading-none">Bogor Centre</p>
          </div>
        </div>

        {/* Member/Admin Greeting on Desktop/Tablet header */}
        <div className="hidden md:flex items-center gap-2.5">
          <span className="text-xs text-zinc-500 font-medium">Sesi:</span>
          <span className="text-xs font-semibold text-zinc-200 bg-zinc-900/90 border border-white/[0.08] px-3 py-1.5 rounded-full flex items-center gap-2">
            {currentRole === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Kasir</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-amber-400" />
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
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                currentRole === 'admin'
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 hover:bg-amber-300'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${currentRole === 'admin' ? 'text-neutral-950' : 'text-amber-400'}`} />
              <span className="hidden sm:inline">{currentRole === 'admin' ? 'Panel Admin' : 'Mode Admin'}</span>
              <span className="sm:hidden">Admin</span>
            </button>
          )}

          {onGoToLanding && (
            <button
              onClick={onGoToLanding}
              title="Halaman Depan Gym"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Profil Gym</span>
            </button>
          )}

          <button
            id="header-open-card"
            onClick={onOpenCard}
            title="Lihat Kartu Member Digital"
            aria-label="Lihat Kartu Member Digital"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Kartu</span>
          </button>

          <button
            id="header-logout"
            onClick={onLogout}
            title="Keluar Akun"
            aria-label="Keluar Akun"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-rose-950/30 text-zinc-400 hover:text-rose-300 border border-zinc-800 hover:border-rose-900/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
