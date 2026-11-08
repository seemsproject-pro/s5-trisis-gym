import React from 'react';

/**
 * StatusBadge — Minimalist & Clean Fit Hub / Fit Quest style badge
 * Menggunakan pill datar tanpa efek neon/slot, kontras bersih dan tipografi tegas.
 */
export default function StatusBadge({ status, size = 'sm', className = '' }) {
  let label = status;
  let bgClass = 'bg-white/5 text-slate-300 border-white/10';
  let dotClass = 'bg-slate-400';

  switch (status?.toUpperCase()) {
    case 'MEMBER':
      label = 'MEMBER';
      bgClass = 'bg-zinc-800/80 text-zinc-200 border-zinc-700/60';
      dotClass = 'bg-amber-400';
      break;
    case 'ADMIN':
      label = 'ADMIN';
      bgClass = 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      dotClass = 'bg-amber-400';
      break;
    case 'ONLINE':
      label = 'ONLINE';
      bgClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      dotClass = 'bg-emerald-400';
      break;
    case 'DEMO':
    case 'TERVERIFIKASI':
      label = 'TERVERIFIKASI';
      bgClass = 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60';
      dotClass = 'bg-emerald-400';
      break;
    case 'BASELINE':
      label = 'AI BASELINE';
      bgClass = 'bg-blue-500/10 text-blue-300 border-blue-500/20';
      dotClass = 'bg-blue-400';
      break;
    case 'SUCCESS':
    case 'AKTIF':
      label = status || 'AKTIF';
      bgClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      dotClass = 'bg-emerald-400';
      break;
    case 'WARNING':
      label = status || 'PERHATIAN';
      bgClass = 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      dotClass = 'bg-amber-400';
      break;
    case 'ERROR':
    case 'KADALUARSA':
      label = status || 'NONAKTIF';
      bgClass = 'bg-rose-500/10 text-rose-300 border-rose-500/20';
      dotClass = 'bg-rose-400';
      break;
    default:
      label = status;
      bgClass = 'bg-white/5 text-slate-300 border-white/10';
      dotClass = 'bg-slate-400';
  }

  const sizeClass = size === 'xs' 
    ? 'text-[10px] px-2 py-0.5 tracking-wide' 
    : 'text-xs px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${sizeClass} ${bgClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
      <span>{label}</span>
    </span>
  );
}
