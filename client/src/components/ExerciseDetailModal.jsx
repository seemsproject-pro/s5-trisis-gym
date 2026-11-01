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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Panduan Teknik Latihan</span>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">{exercise.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-5">
          {/* Video Player / Demonstration Container */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 aspect-video relative shadow-md">
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
                <Play className="w-10 h-10 text-purple-400 mb-2" />
                <span className="font-bold text-sm">Demonstrasi Gerakan Gym</span>
              </div>
            )}
          </div>

          {/* Target Anatomi Otot (Primer & Sekunder) */}
          <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6D28D9] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Target Anatomi Otot yang Dilatih
            </span>

            <div className="space-y-2">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Otot Primer (Target Utama):</span>
                <div className="flex flex-wrap gap-1.5">
                  {exercise.primaryMuscles?.map((muscle, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#6D28D9] text-white font-extrabold text-xs shadow-xs"
                    >
                      ★ {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                <div className="pt-1 border-t border-purple-200/50">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Otot Sekunder (Sinergis & Penstabil):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.secondaryMuscles.map((muscle, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 font-bold text-xs border border-purple-200/80"
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
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">Target Volume</span>
              <span className="font-extrabold text-xs text-slate-900 mt-0.5 block">{exercise.recommendedSets}</span>
              <span className="text-[10px] text-[#6D28D9] font-bold">{exercise.recommendedReps}</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">Waktu Istirahat</span>
              <span className="font-extrabold text-xs text-slate-900 mt-0.5 block flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {exercise.restSeconds}
              </span>
              <span className="text-[10px] text-slate-500">Antar Set</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-medium block">Peralatan</span>
              <span className="font-bold text-[11px] text-slate-800 mt-0.5 block truncate" title={exercise.equipment}>
                {exercise.equipment}
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">Tersedia di Gym</span>
            </div>
          </div>

          {/* Panduan Eksekusi Langkah demi Langkah */}
          <div className="space-y-2.5">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
              Instruksi Form & Cara Melakukan
            </span>
            <div className="space-y-2">
              {exercise.steps?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-100 text-xs">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6D28D9] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-slate-600 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Form & Pencegahan Cedera */}
          {exercise.tips && (
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block">Tips Pelatih Trisis Gym:</strong>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{exercise.tips}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 shrink-0 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Teknik standar kebugaran Trisis Gym</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
}
