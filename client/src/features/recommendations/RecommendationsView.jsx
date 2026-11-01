import React, { useState } from 'react';
import { 
  Sparkles, 
  Dumbbell, 
  Utensils, 
  Info, 
  ShieldAlert, 
  Flame, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Key,
  MessageSquare,
  Bot,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import ExerciseDetailModal from '../../components/ExerciseDetailModal';
import GeminiApiKeyModal from '../../components/GeminiApiKeyModal';
import GeminiCoachModal from '../../components/GeminiCoachModal';
import { calculateWorkoutSplit, calculateMacroEstimates } from '../../services/baselineCalculators';
import { getExerciseDetails } from '../../services/exerciseDatabase';
import { generateDailyMealPlan } from '../../services/mealDatabase';
import { 
  generateGeminiCoachAnalysis, 
  isGeminiKeyConfigured 
} from '../../services/geminiService';

function renderInlineFormatting(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, pIdx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={pIdx} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function formatCoachMarkdown(rawText) {
  if (!rawText) return null;
  const lines = rawText.split('\n');
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-1.5 my-2 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9] mt-1.5 shrink-0" />
              <span className="leading-relaxed">{renderInlineFormatting(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, lIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={`h4-${lIdx}`} className="text-xs font-black text-[#6D28D9] pt-3 pb-1 flex items-center gap-1.5 uppercase tracking-wide border-b border-purple-100/60">
          {trimmed.replace(/^###\s*/, '')}
        </h4>
      );
    } else if (trimmed === '---') {
      flushList();
      elements.push(<hr key={`hr-${lIdx}`} className="my-2 border-slate-100" />);
    } else if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <div key={`quote-${lIdx}`} className="p-3 rounded-2xl bg-purple-50 text-[11px] text-purple-900 border border-purple-100 my-2 font-medium leading-relaxed">
          {renderInlineFormatting(trimmed.replace(/^>\s*/, ''))}
        </div>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.replace(/^[-*]\s*/, ''));
    } else {
      flushList();
      elements.push(
        <p key={`p-${lIdx}`} className="text-xs text-slate-700 leading-relaxed my-1">
          {renderInlineFormatting(trimmed)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export default function RecommendationsView({ profile, onNavigateTab }) {
  const [activeTab, setActiveTab] = useState('workout'); // 'workout' | 'nutrition'
  const [expandedDay, setExpandedDay] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Gemini state
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [geminiAdvice, setGeminiAdvice] = useState(null);
  const [adviceSource, setAdviceSource] = useState(null);
  const [isAdviceExpanded, setIsAdviceExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const isGeminiConnected = isGeminiKeyConfigured();

  const workoutSplit = calculateWorkoutSplit(profile);
  const macroEstimates = calculateMacroEstimates(profile);

  // Generate jadwal makan harian dan rincian bahan makanan sesuai target kalori
  const mealPlan = generateDailyMealPlan(
    macroEstimates.targetCalories, 
    macroEstimates.macros, 
    profile.fitnessGoal
  );

  const handleOpenExerciseModal = (exerciseName) => {
    const details = getExerciseDetails(exerciseName);
    setSelectedExercise(details);
  };

  const handleGenerateAdvice = async () => {
    setIsAnalyzing(true);
    try {
      const res = await generateGeminiCoachAnalysis({
        profile,
        workoutSplit,
        macroEstimates
      });
      setGeminiAdvice(res.text);
      setAdviceSource(res.source);
      setIsAdviceExpanded(true);
    } catch (err) {
      console.error('Failed to generate coach advice:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyAdvice = () => {
    if (!geminiAdvice) return;
    navigator.clipboard.writeText(geminiAdvice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 md:space-y-5 pb-8 animate-in fade-in duration-200">
      {/* Header Section */}
      <section className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Rekomendasi Kebugaran</h1>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="BASELINE" size="sm" />
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
              isGeminiConnected 
                ? 'bg-purple-50 text-[#6D28D9] border-purple-200' 
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              <Sparkles className="w-3 h-3" />
              {isGeminiConnected ? 'Gemini 1.5 Live' : 'Gemini AI Ready'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Program latihan interaktif dan rencana menu makan harian terintegrasi dengan Google Gemini AI.
        </p>
      </section>

      {/* ============================================================== */}
      {/* GEMINI AI COACH INTERACTIVE CARD */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-br from-purple-50/90 via-white to-purple-50/40 border border-purple-100 rounded-3xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(109,40,217,0.06)] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6D28D9] text-white flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-slate-900">
                  Coach Trisis AI
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#6D28D9]">
                  Google Gemini
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Analisis personal program & konsultasi interaktif seputar latihan dan menu makan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Atur Google Gemini API Key"
            >
              <Key className="w-3.5 h-3.5 text-[#6D28D9]" />
              {isGeminiConnected ? 'API Key Aktif' : 'Atur API Key'}
            </button>
            <button
              onClick={() => setIsCoachModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#6D28D9] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Tanya Coach AI
            </button>
          </div>
        </div>

        {/* Generate Analysis CTA or Display Result */}
        {!geminiAdvice ? (
          <div className="p-3.5 bg-white/90 rounded-2xl border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900 block font-bold">Butuh penjelasan personal mengapa program ini cocok?</strong>
              <span className="text-[11px] text-slate-500">
                Gemini akan mengevaluasi biometrik Anda, strategi kalori {macroEstimates.targetCalories} kkal, dan tips latihan di Trisis Gym.
              </span>
            </div>
            <button
              onClick={handleGenerateAdvice}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 transition-all cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isAnalyzing ? 'Sedang Menganalisis...' : 'Analisis dengan Gemini'}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm">
            <div className="p-3.5 bg-purple-50/60 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">
                  Hasil Analisis Coach Trisis AI
                </span>
                <span className="text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-semibold">
                  {adviceSource === 'GEMINI' ? '✨ Live Gemini 1.5' : '💡 Smart Knowledge'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyAdvice}
                  className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  title="Salin analisis"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsAdviceExpanded(!isAdviceExpanded)}
                  className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title={isAdviceExpanded ? 'Kecilkan' : 'Perluas'}
                >
                  {isAdviceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isAdviceExpanded && (
              <div className="p-4 text-xs text-slate-700 leading-relaxed space-y-2 max-h-96 overflow-y-auto">
                {formatCoachMarkdown(geminiAdvice)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Segmented Switcher (Latihan / Nutrisi) */}
      <div className="grid grid-cols-2 p-1 bg-slate-200/70 rounded-2xl text-xs font-bold md:max-w-md">
        <button
          onClick={() => setActiveTab('workout')}
          className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'workout'
              ? 'bg-white text-[#6D28D9] shadow-sm font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          Program Split & Gerakan
        </button>
        <button
          onClick={() => setActiveTab('nutrition')}
          className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'nutrition'
              ? 'bg-white text-[#6D28D9] shadow-sm font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Utensils className="w-4 h-4" />
          Target Nutrisi & Menu
        </button>
      </div>

      {/* SOT Transparency Notice */}
      <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-2.5 text-xs text-purple-900">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#6D28D9]" />
        <div>
          <span className="font-bold block">Status Metode: Baseline Deterministik & Google Gemini AI</span>
          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
            Perhitungan target menerapkan aturan profil kebugaran. Detail variasi latihan, video ilustrasi gerakan, dan jadwal 4 waktu makan disajikan dengan foto ilustrasi untuk mempermudah eksekusi nyata member Trisis Gym.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: WORKOUT SPLIT & DETAILED EXERCISE GUIDES */}
      {/* ============================================================== */}
      {activeTab === 'workout' && (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-5 lg:items-start">
          {/* Main Split Overview Box */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-5 space-y-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kategori Rekomendasi</span>
                <h2 className="text-base font-extrabold text-slate-900 mt-0.5">{workoutSplit.splitName}</h2>
              </div>
              <StatusBadge status="BASELINE" size="xs" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {workoutSplit.description}
            </p>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
              <span className="font-bold text-slate-800 block">Fokus & Pertimbangan:</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {workoutSplit.focusNotes}
              </p>
            </div>

            {/* Quick Profile Parameters Info */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Frekuensi: <strong className="text-slate-800">{profile.daysPerWeek} Hari / Minggu</strong></span>
              <button
                onClick={() => onNavigateTab('profile')}
                className="text-[#6D28D9] font-bold hover:underline"
              >
                Ubah di Profil
              </button>
            </div>
          </div>

          {/* Daily Routine Breakdown Accordion with Interactive Exercises */}
          <div className="space-y-2.5 lg:col-span-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Jadwal Mingguan Terstruktur ({workoutSplit.schedule.length} Hari)
              </h3>
              <span className="text-[10px] text-[#6D28D9] font-semibold">
                *Klik gerakan untuk lihat video & otot
              </span>
            </div>

            <div className="space-y-2">
              {workoutSplit.schedule.map((dayPlan, idx) => {
                const isExpanded = expandedDay === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setExpandedDay(isExpanded ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-purple-100 text-[#6D28D9] font-black text-xs flex items-center justify-center shrink-0">
                          H{dayPlan.day}
                        </span>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900">{dayPlan.focus}</h4>
                          <span className="text-[11px] text-slate-400">
                            {dayPlan.exercises ? `${dayPlan.exercises.length} Gerakan Latihan` : 'Hari Istirahat Aktif'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && dayPlan.exercises && (
                      <div className="p-4 pt-1 border-t border-slate-100/80 bg-slate-50/40 space-y-2">
                        {dayPlan.exercises.map((exName, exIdx) => {
                          const exInfo = getExerciseDetails(exName);
                          return (
                            <div
                              key={exIdx}
                              onClick={() => handleOpenExerciseModal(exName)}
                              className="p-3 bg-white rounded-xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-6 h-6 rounded-lg bg-purple-50 text-[#6D28D9] text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {exIdx + 1}
                                </span>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#6D28D9] transition-colors truncate">
                                      {exName}
                                    </span>
                                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
                                      {exInfo.category}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-400 block truncate">
                                    Target: <strong className="text-slate-600">{exInfo.targetMuscle}</strong> • {exInfo.equipment}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-xs font-extrabold text-[#6D28D9] block">{exInfo.setsReps}</span>
                                <span className="text-[9px] text-slate-400 font-medium">Jeda {exInfo.restTime}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* TAB 2: NUTRITION TARGETS & DAILY MEAL PLAN WITH ILLUSTRATIONS */}
      {/* ============================================================== */}
      {activeTab === 'nutrition' && (
        <section className="space-y-4">
          {/* Daily Caloric Target Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimasi Kebutuhan Energi</span>
                <h2 className="text-base font-extrabold text-slate-900 mt-0.5">Total Kalori Harian</h2>
              </div>
              <StatusBadge status="BASELINE" size="xs" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#6D28D9] tracking-tight">
                {macroEstimates.targetCalories}
              </span>
              <span className="text-xs font-extrabold text-slate-500">kkal / hari</span>
              <span className="ml-auto text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Flame className="w-3.5 h-3.5 inline mr-1" />
                Defisit / Surplus Seimbang
              </span>
            </div>

            {/* Macro Distribution Strips */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">
                Target Distribusi Makronutrisi:
              </span>

              <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-3 md:gap-3">
                {/* Protein */}
                <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-[#6D28D9]" />
                    <div>
                      <span className="font-bold text-slate-900 block">Protein (2.0g/kg)</span>
                      <span className="text-[10px] text-slate-500">{macroEstimates.macros.protein.calories} kkal</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#6D28D9]">{macroEstimates.macros.protein.grams} g</span>
                    <span className="block text-[10px] text-slate-400 font-medium">{macroEstimates.macros.protein.percentage}%</span>
                  </div>
                </div>

                {/* Karbohidrat */}
                <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-600" />
                    <div>
                      <span className="font-bold text-slate-900 block">Karbohidrat</span>
                      <span className="text-[10px] text-slate-500">{macroEstimates.macros.carbs.calories} kkal</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-700">{macroEstimates.macros.carbs.grams} g</span>
                    <span className="block text-[10px] text-slate-400 font-medium">{macroEstimates.macros.carbs.percentage}%</span>
                  </div>
                </div>

                {/* Lemak Sehat */}
                <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <div>
                      <span className="font-bold text-slate-900 block">Lemak Esensial</span>
                      <span className="text-[10px] text-slate-500">{macroEstimates.macros.fat.calories} kkal</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-amber-700">{macroEstimates.macros.fat.grams} g</span>
                    <span className="block text-[10px] text-slate-400 font-medium">{macroEstimates.macros.fat.percentage}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formula Details Transparency */}
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
              {macroEstimates.formulaDetails}
            </div>
          </div>

          {/* 2. Rencana Jadwal Makan & Menu Harian DENGAN GAMBAR ILUSTRASI */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#6D28D9]" />
                  Jadwal Waktu Makan & Rincian Menu Harian
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Distribusi porsi makanan nyata terukur sesuai target {macroEstimates.targetCalories} kkal Anda.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                4 Waktu Makan
              </span>
            </div>

            {/* Meal Windows Cards with High-Quality Food Illustration Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mealPlan.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] space-y-3.5 flex flex-col justify-between overflow-hidden"
                >
                  <div className="space-y-2.5">
                    {/* GAMBAR ILUSTRASI MAKANAN */}
                    {meal.image && (
                      <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden mb-3 bg-slate-100 group shadow-inner">
                        <img
                          src={meal.image}
                          alt={meal.imageAlt || meal.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm flex items-center gap-1">
                            ⏰ {meal.timeWindow}
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                          <span className="text-xs font-bold drop-shadow">
                            {meal.phase}
                          </span>
                          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#6D28D9] text-white shadow-md shadow-purple-900/40">
                            {meal.calories} kkal
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Header Sesi Makan */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">{meal.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{meal.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-[10px] text-slate-400 font-semibold">~{meal.targetPercent}% Harian</span>
                      </div>
                    </div>

                    {/* Macro Strip for this meal */}
                    <div className="grid grid-cols-3 gap-1.5 p-2 rounded-2xl bg-slate-50 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Protein</span>
                        <strong className="text-[#6D28D9]">{meal.protein}g</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Karbo</span>
                        <strong className="text-emerald-700">{meal.carbs}g</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Lemak</span>
                        <strong className="text-amber-700">{meal.fat}g</strong>
                      </div>
                    </div>

                    {/* Rincian Bahan Makanan & Gramatur */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Rincian Bahan Makanan & Porsi:
                      </span>
                      <div className="space-y-1.5">
                        {meal.items.map((item, iIdx) => (
                          <div 
                            key={iIdx}
                            className="p-2.5 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="font-bold text-slate-800 block truncate">{item.name}</span>
                              <span className="text-[10px] text-slate-400 block">{item.note}</span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-extrabold text-slate-900 block">{item.portion}</span>
                              <span className="text-[10px] text-slate-400">{item.calories} kkal</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timing Tip */}
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-start gap-1.5">
                    <span className="text-[#6D28D9] font-bold">💡 Tips:</span>
                    <span>{meal.timingTip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Clinical/Medical Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Penafian Nutrisi:</strong> {macroEstimates.disclaimer} Rencana menu di atas merupakan contoh edukatif berbasis pangan lokal terukur, bukan resep medis klinis.
            </p>
          </div>
        </section>
      )}

      {/* MODAL DETAIL GERAKAN LATIHAN */}
      <ExerciseDetailModal
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
        exercise={selectedExercise}
      />

      {/* MODAL SETTING GOOGLE GEMINI API KEY */}
      <GeminiApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={() => {
          // Trigger re-render
        }}
      />

      {/* MODAL CHAT INTERAKTIF COACH TRISIS AI */}
      <GeminiCoachModal
        isOpen={isCoachModalOpen}
        onClose={() => setIsCoachModalOpen(false)}
        profile={profile}
        workoutSplit={workoutSplit}
        macroEstimates={macroEstimates}
        onOpenApiKeyModal={() => {
          setIsCoachModalOpen(false);
          setIsApiKeyModalOpen(true);
        }}
      />
    </div>
  );
}
