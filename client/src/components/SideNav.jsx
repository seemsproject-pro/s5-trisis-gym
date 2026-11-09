import React from 'react';
import { ShieldCheck, LogOut } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { NAV_ITEMS } from './navItems';

export default function SideNav({ activeTab, onSelectTab, currentRole = 'member', onToggleRole, onLogout }) {
  return (
    <aside className="hidden md:flex sticky top-0 h-screen shrink-0 flex-col w-20 lg:w-64 bg-[#090A0E] border-r border-white/[0.08]">
      {/* Brand */}
      <div className="flex items-center justify-center lg:justify-start gap-3 h-[65px] px-4 lg:px-6 border-b border-white/[0.08]">
        <img src="/logo.png" alt="Trisis Gym Logo" className="h-10 w-auto object-contain shrink-0 drop-shadow-sm" />
        <div className="hidden lg:block">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white">
              TRISIS<span className="text-amber-400">GYM</span>
            </span>
            <StatusBadge status={currentRole === 'admin' ? 'ADMIN' : 'MEMBER'} size="xs" />
          </div>
          <p className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase leading-none mt-0.5">Bogor Centre</p>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Navigasi Utama" className="flex-1 px-3 py-6 space-y-6">
        {currentRole === 'admin' ? (
          <div className="space-y-2">
            <div className="hidden lg:block px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Operasional Admin
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('admin_panel')}
              className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer bg-zinc-900 text-white font-semibold border border-white/[0.08]"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="hidden lg:inline text-sm">
                Panel Kontrol
              </span>
            </button>

            {onToggleRole && (
              <button
                type="button"
                onClick={onToggleRole}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium border border-zinc-800 transition-colors cursor-pointer"
              >
                <span className="hidden lg:inline">Ke Tampilan Member</span>
                <span className="lg:hidden text-[10px]">Member</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="hidden lg:block px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Menu Utama
            </div>
            <ul className="space-y-1">
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
                      className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-zinc-900 text-white font-semibold border border-white/[0.08]'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} aria-hidden="true" />
                      <span className="hidden lg:inline text-sm">
                        {tab.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

      {/* Logout button at bottom */}
      {onLogout && (
        <div className="p-3 border-t border-white/[0.08]">
          <button
            type="button"
            id="sidenav-logout"
            onClick={onLogout}
            title="Keluar dari Akun"
            className="w-full flex items-center justify-center lg:justify-start gap-2.5 px-3 py-2.5 rounded-xl bg-zinc-900/60 hover:bg-rose-950/30 text-zinc-400 hover:text-rose-300 border border-zinc-800/80 hover:border-rose-900/40 text-xs font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="hidden lg:inline">Keluar Akun</span>
          </button>
        </div>
      )}
    </aside>
  );
}
