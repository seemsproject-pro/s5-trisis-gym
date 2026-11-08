import React, { useState } from 'react';
import { 
  CalendarClock, 
  CheckCircle2, 
  Sparkles, 
  UserCog, 
  PlusCircle,
  Inbox,
  QrCode
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

export default function ActivityView({ activities, onOpenCheckIn }) {
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'CHECK_IN' | 'RECOMMENDATION'

  const filteredActivities = activities.filter(item => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'CHECK_IN') return item.type === 'CHECK_IN';
    if (activeFilter === 'RECOMMENDATION') return item.type === 'RECOMMENDATION' || item.type === 'PROFILE_UPDATE';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'CHECK_IN':
        return <QrCode className="w-4 h-4 text-emerald-400" />;
      case 'RECOMMENDATION':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'PROFILE_UPDATE':
        return <UserCog className="w-4 h-4 text-zinc-300" />;
      default:
        return <CalendarClock className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'CHECK_IN':
        return 'bg-emerald-500/10 border border-emerald-500/20';
      case 'RECOMMENDATION':
        return 'bg-amber-400/10 border border-amber-400/20';
      case 'PROFILE_UPDATE':
        return 'bg-zinc-800 border border-white/[0.08]';
      default:
        return 'bg-zinc-800 border border-white/[0.08]';
    }
  };

  return (
    <div className="space-y-4 md:space-y-5 pb-8 animate-in fade-in duration-200">
      {/* Header */}
      <section className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/[0.08] text-amber-400 flex items-center justify-center">
              <CalendarClock className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Riwayat Aktivitas</h1>
          </div>
          <StatusBadge status="AKTIF" size="sm" />
        </div>
        <p className="text-xs text-zinc-400">
          Catatan kronologis presensi kunjungan gym dan riwayat rekomendasi kebugaran Anda.
        </p>
      </section>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'ALL', label: 'Semua Riwayat' },
          { id: 'CHECK_IN', label: 'Presensi Check-in' },
          { id: 'RECOMMENDATION', label: 'Program & Profil' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              activeFilter === f.id
                ? 'bg-zinc-800 text-amber-400 border-zinc-700/80 font-bold'
                : 'bg-zinc-900/60 text-zinc-400 border-white/[0.08] hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List / Empty State */}
      {filteredActivities.length === 0 ? (
        <div className="bg-[#111319] border border-white/[0.08] rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Belum Ada Aktivitas Terkait</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Belum ada data riwayat untuk kategori filter ini.
            </p>
          </div>
          <button
            onClick={onOpenCheckIn}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Check-In Sekarang</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-[#111319] border border-white/[0.08] rounded-2xl p-4 flex items-start gap-3.5 transition-all"
            >
              <div className={`p-2.5 rounded-xl ${getIconBg(act.type)} shrink-0 mt-0.5`}>
                {getIcon(act.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-white truncate">{act.title}</h4>
                  <StatusBadge status={act.methodBadge || 'DEMO'} size="xs" />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {act.description}
                </p>
                <div className="pt-1 text-[10px] text-zinc-500 font-medium">
                  {act.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SOT Footnote */}
      <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/[0.06] text-[11px] text-zinc-400 leading-relaxed">
        Catatan: Riwayat aktivitas dicatat secara persisten di penyimpanan browser lokal dan database Trisis Gym.
      </div>
    </div>
  );
}
