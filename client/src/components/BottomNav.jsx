import React from 'react';
import { NAV_ITEMS } from './navItems';

// Navigasi bawah khusus layar < 768 px.
export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = NAV_ITEMS;

  return (
    <nav
      aria-label="Navigasi Utama"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0E1017]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              id={`bottomnav-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full relative transition-all duration-150 focus:outline-none ${
                isActive
                  ? 'text-purple-200'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-purple-950/70 text-amber-300 border border-purple-800/40 scale-105' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'font-bold text-amber-300' : 'font-medium text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

