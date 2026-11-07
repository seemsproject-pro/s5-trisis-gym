import React from 'react';

/**
 * StatusBadge — Menampilkan status metode dan sistem sesuai UI-GUIDELINE.md
 * Menggunakan teks eksplisit berformat pill modern dengan kontras tinggi.
 */
export default function StatusBadge({ status, size = 'sm', className = '' }) {
  let label = status;
  let bgClass = 'bg-white/5 text-slate-300 border-white/10';

  switch (status?.toUpperCase()) {
    case 'MEMBER':
      label = 'MEMBER AKTIF';
      bgClass = 'bg-purple-950/50 text-purple-300 border-purple-800/40';
      break;
    case 'ADMIN':
      label = 'ADMIN KASIR';
      bgClass = 'bg-amber-950/50 text-amber-300 border-amber-800/40';
      break;
    case 'ONLINE':
      label = 'ONLINE';
      bgClass = 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40';
      break;
    case 'DEMO':
      label = 'TERVERIFIKASI';
      bgClass = 'bg-purple-950/50 text-purple-300 border-purple-800/40';
      break;
    case 'BASELINE':
      label = 'AI BASELINE';
      bgClass = 'bg-blue-950/50 text-blue-300 border-blue-800/40';
      break;
    case 'MODEL_UNAVAILABLE':
    case 'MODEL BELUM TERSEDIA':
      label = 'MODEL BELUM TERSEDIA';
      bgClass = 'bg-white/5 text-slate-400 border-white/10';
      break;
    case 'SUCCESS':
    case 'AKTIF':
      label = status || 'AKTIF';
      bgClass = 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40';
      break;
    case 'WARNING':
      label = status || 'PERHATIAN';
      bgClass = 'bg-amber-950/50 text-amber-300 border-amber-800/40';
      break;
    case 'ERROR':
      label = status || 'GAGAL';
      bgClass = 'bg-rose-950/50 text-rose-300 border-rose-800/40';
      break;
    default:
      label = status;
  }

  const sizeClass = size === 'xs' 
    ? 'text-[10px] px-2 py-0.5 tracking-wider' 
    : 'text-xs px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${sizeClass} ${bgClass} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 shrink-0" />
      {label}
    </span>
  );
}

