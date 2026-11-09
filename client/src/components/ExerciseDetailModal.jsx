import React from 'react';
import { 
  X, 
  Dumbbell, 
  Activity, 
  Clock, 
  Play, 
  Sparkles
} from 'lucide-react';

export default function ExerciseDetailModal({ isOpen, onClose, exercise }) {
  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111319] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-zinc-900/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/[0.08] text-amber-400 flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider block">Panduan Teknik Latihan</span>
              <h3 className="text-base font-bold text-white leading-tight">{exercise.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-5">
          {/* Video Player / Video Tutorial Container */}
          <div className="rounded-xl overflow-hidden bg-black aspect-video relative border border-white/[0.08]">
            {exercise.videoUrl ? (
              <iframe
                src={exercise.videoUrl}
                title={`Video Tutorial ${exercise.name}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-4">
                <Play className="w-8 h-8 text-amber-400 mb-2" />
                <span className="font-semibold text-xs text-zinc-300">Panduan Video Gerakan Gym</span>
              </div>
            )}
          </div>

          {/* Target Anatomi Otot (Primer & Sekunder) */}
          <div className="bg-zinc-900/80 border border-white/[0.08] rounded-xl p-4 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Target Anatomi Otot yang Dilatih
            </span>

            <div className="space-y-2">
              <div>
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Otot Primer (Target Utama):</span>
                <div className="flex flex-wrap gap-1.5">
                  {exercise.primaryMuscles?.map((muscle, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 font-bold text-xs border border-amber-400/20"
                    >
                      ★ {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                <div className="pt-2 border-t border-white/[0.06]">
                  <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Otot Sekunder (Sinergis & Penstabil):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.secondaryMuscles.map((muscle, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-medium text-xs border border-white/[0.06]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Parameter Latihan (Set, Reps, Rest, Alat) */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-zinc-900/60 rounded-xl p-3 border border-white/[0.06]">
              <span className="text-[10px] text-zinc-400 font-medium block">Target Volume</span>
              <span className="font-bold text-xs text-white mt-0.5 block">{exercise.recommendedSets}</span>
              <span className="text-[10px] text-amber-400 font-semibold">{exercise.recommendedReps}</span>
            </div>

            <div className="bg-zinc-900/60 rounded-xl p-3 border border-white/[0.06]">
              <span className="text-[10px] text-zinc-400 font-medium block">Waktu Istirahat</span>
              <span className="font-bold text-xs text-white mt-0.5 block flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {exercise.restSeconds}
              </span>
              <span className="text-[10px] text-zinc-500">Antar Set</span>
            </div>

            <div className="bg-zinc-900/60 rounded-xl p-3 border border-white/[0.06]">
              <span className="text-[10px] text-zinc-400 font-medium block">Peralatan</span>
              <span className="font-semibold text-[11px] text-white mt-0.5 block truncate" title={exercise.equipment}>
                {exercise.equipment}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">Tersedia di Gym</span>
            </div>
          </div>

          {/* Panduan Eksekusi Langkah demi Langkah */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
              Instruksi Form & Cara Melakukan
            </span>
            <div className="space-y-2">
              {exercise.steps?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-zinc-900/60 p-3 rounded-xl border border-white/[0.04] text-xs">
                  <span className="w-5 h-5 rounded-md bg-zinc-800 text-zinc-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-zinc-200 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Form & Pencegahan Cedera */}
          {exercise.tips && (
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/[0.06] flex items-start gap-2.5 text-xs text-zinc-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Tips Pelatih Trisis Gym:</strong>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{exercise.tips}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/[0.08] bg-zinc-900/40 shrink-0 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">Teknik standar kebugaran Trisis Gym</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-zinc-200 font-semibold text-xs transition-colors cursor-pointer border border-white/[0.08]"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
}
