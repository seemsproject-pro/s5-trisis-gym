import React from 'react';
import { NAV_ITEMS } from './navItems';

export default function BottomNav({ activeTab, onSelectTab }) {
  return (
    <nav
      aria-label="Navigasi Utama"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#090A0E]/95 backdrop-blur-md border-t border-white/[0.08] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 h-15 px-2">
        {NAV_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              id={`bottomnav-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full relative transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'text-amber-400 scale-105' : 'text-zinc-500'}`} />
              <span className={`text-[10px] tracking-tight leading-none ${isActive ? 'font-semibold text-white' : 'font-medium text-zinc-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
