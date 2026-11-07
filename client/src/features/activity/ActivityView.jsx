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
        return <QrCode className="w-5 h-5 text-emerald-400" />;
      case 'RECOMMENDATION':
        return <Sparkles className="w-5 h-5 text-purple-300" />;
      case 'PROFILE_UPDATE':
        return <UserCog className="w-5 h-5 text-amber-400" />;
      default:
        return <CalendarClock className="w-5 h-5 text-blue-400" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'CHECK_IN':
        return 'bg-emerald-950/50 border border-emerald-500/20';
      case 'RECOMMENDATION':
        return 'bg-purple-950/50 border border-purple-500/20';
      case 'PROFILE_UPDATE':
        return 'bg-amber-950/50 border border-amber-500/20';
      default:
        return 'bg-blue-950/50 border border-blue-500/20';
    }
  };

  return (
    <div className="space-y-4 md:space-y-5 pb-8 animate-in fade-in duration-200">
      {/* Header */}
      <section className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-300 flex items-center justify-center">
              <CalendarClock className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Riwayat Aktivitas</h1>
          </div>
          <StatusBadge status="AKTIF" size="sm" />
        </div>
        <p className="text-xs text-slate-400">
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
            className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeFilter === f.id
                ? 'bg-[#5D4E75] text-white border-purple-400/40 shadow-xs'
                : 'bg-[#131520] text-slate-300 border-white/10 hover:bg-[#1A1D2B]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List / Empty State */}
      {filteredActivities.length === 0 ? (
        <div className="bg-[#131520] border border-white/10 rounded-3xl p-8 text-center space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">Belum Ada Aktivitas Terkait</h3>
            <p className="text-xs text-slate-400 mt-1">
              Belum ada data riwayat untuk kategori filter ini.
            </p>
          </div>
          <button
            onClick={onOpenCheckIn}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#5D4E75] hover:bg-[#6D5D88] text-white font-bold text-xs shadow-md shadow-purple-950/40 border border-purple-400/30 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            Coba Check-in Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-[#131520] border border-white/10 rounded-3xl p-4.5 flex items-start gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all"
            >
              <div className={`p-2.5 rounded-2xl ${getIconBg(act.type)} shrink-0 mt-0.5`}>
                {getIcon(act.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-white truncate">{act.title}</h4>
                  <StatusBadge status={act.methodBadge || 'DEMO'} size="xs" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {act.description}
                </p>
                <div className="pt-1 text-[10px] text-slate-500 font-medium">
                  {act.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SOT Footnote */}
      <div className="p-3.5 bg-purple-950/30 rounded-2xl border border-purple-500/20 text-[11px] text-purple-200 leading-relaxed">
        Catatan: Riwayat aktivitas dicatat secara persisten di penyimpanan browser lokal (Phase 6A: Frontend-First dengan Data Sintetis).
      </div>
    </div>
  );
}
