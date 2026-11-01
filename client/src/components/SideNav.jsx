import React from 'react';
import { ShieldCheck } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { NAV_ITEMS } from './navItems';

// Navigasi untuk layar >= 768 px.
export default function SideNav({ activeTab, onSelectTab }) {
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
            <StatusBadge status="DEMO" size="xs" />
          </div>
          <p className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase leading-none">Est. Bogor, Indonesia</p>
        </div>
      </div>

      {/* Menu */}
      <nav aria-label="Navigasi Utama" className="flex-1 px-2 lg:px-3 py-5">
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
      </nav>

      {/* Catatan prototipe (desktop saja) */}
      <div className="hidden lg:flex items-start gap-2.5 m-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-400 leading-relaxed">
        <ShieldCheck className="w-4 h-4 shrink-0 text-purple-400 mt-0.5" aria-hidden="true" />
        <span>Fase 6A: Frontend Demo dengan data sintetis & baseline transparan.</span>
      </div>
    </aside>
  );
}

