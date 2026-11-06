import React from 'react';
import { ShieldCheck, LogOut } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { NAV_ITEMS } from './navItems';

// Navigasi untuk layar >= 768 px.
export default function SideNav({ activeTab, onSelectTab, currentRole = 'member', onToggleRole, onLogout }) {
  return (
    <aside className="hidden md:flex sticky top-0 h-screen shrink-0 flex-col w-20 lg:w-64 bg-[#0E1017] border-r border-white/10 shadow-[2px_0_12px_rgba(0,0,0,0.5)]">
      {/* Brand */}
      <div className="flex items-center justify-center lg:justify-start gap-2.5 h-[65px] px-3 lg:px-5 border-b border-white/10">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 border border-amber-400/40 flex items-center justify-center shadow-xs overflow-hidden p-0.5">
          <img src="/logo.png" alt="Trisis Gym Logo" className="w-full h-full object-contain" />
        </div>
        <div className="hidden lg:block">
          <div className="flex items-center gap-2">
            <span className="font-black text-base tracking-tight text-white">
              TRISIS<span className="text-amber-400 font-black">GYM</span>
            </span>
            <StatusBadge status={currentRole === 'admin' ? 'ADMIN' : 'DEMO'} size="xs" />
          </div>
          <p className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase leading-none">Est. Bogor, Indonesia</p>
        </div>
      </div>

      {/* Menu Member / Admin */}
      <nav aria-label="Navigasi Utama" className="flex-1 px-2 lg:px-3 py-5">
        {currentRole === 'admin' ? (
          <div className="space-y-3">
            <div className="px-2 lg:px-3 text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
              Modul Admin (9)
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('admin_panel')}
              className="relative w-full min-h-[46px] flex flex-col lg:flex-row items-center lg:justify-start justify-center gap-1.5 lg:gap-3 px-2 lg:px-4 py-2 rounded-xl transition-all cursor-pointer bg-[#2A213D] text-amber-300 font-extrabold shadow-2xs border-l-4 border-amber-400"
            >
              <ShieldCheck className="w-5 h-5 shrink-0 text-amber-400" />
              <span className="text-[11px] lg:text-sm leading-none font-bold">
                Panel Admin
              </span>
            </button>

            {onToggleRole && (
              <button
                type="button"
                onClick={onToggleRole}
                className="w-full min-h-[40px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 transition-colors cursor-pointer"
              >
                <span>Beralih ke Member</span>
              </button>
            )}
          </div>
        ) : (
          <ul className="space-y-1.5">
            {NAV_ITEMS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    type="button"
                    id={`sidenav-${tab.id}`}
                    onClick={() => onSelectTab(tab.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative w-full min-h-[46px] flex flex-col lg:flex-row items-center lg:justify-start justify-center gap-1.5 lg:gap-3 px-2 lg:px-4 py-2 rounded-xl transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                      isActive
                        ? 'bg-[#1E182D] text-purple-200 font-extrabold shadow-2xs border-l-4 border-amber-400/90'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} aria-hidden="true" />
                    <span className={`text-[11px] lg:text-sm leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                      {tab.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      {/* Tombol Logout di SideNav */}
      {onLogout && (
        <div className="px-2 lg:px-4 pb-2">
          <button
            type="button"
            id="sidenav-logout"
            onClick={onLogout}
            title="Keluar dari Akun"
            className="w-full flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="hidden lg:inline">Keluar dari Akun</span>
          </button>
        </div>
      )}

      {/* Catatan prototipe (desktop saja) */}
      <div className="hidden lg:flex items-start gap-2.5 m-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-400 leading-relaxed">
        <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" aria-hidden="true" />
        <span>{currentRole === 'admin' ? 'Mode Admin: Mengontrol operasional, pengumuman, dan data presensi.' : 'Fase 6A: Frontend Demo dengan data sintetis & baseline transparan.'}</span>
      </div>
    </aside>
  );
}

