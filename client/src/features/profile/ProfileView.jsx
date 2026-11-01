import React, { useState } from 'react';
import { 
  User, 
  Save, 
  CheckCircle2, 
  Target, 
  Activity, 
  Loader2
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

export default function ProfileView({ user, profile, onUpdateProfile }) {
  const [formData, setFormData] = useState({
    age: profile.age || 23,
    gender: profile.gender || 'male',
    height: profile.height || 172,
    weight: profile.weight || 68,
    targetWeight: profile.targetWeight || 72,
    daysPerWeek: profile.daysPerWeek || 4,
    experienceLevel: profile.experienceLevel || 'intermediate',
    fitnessGoal: profile.fitnessGoal || 'muscle_building'
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    setSaveSuccess(false);

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const age = Number(formData.age);
    const weight = Number(formData.weight);
    const height = Number(formData.height);

    if (!age || age < 14 || age > 90) {
      newErrors.age = 'Usia harus di antara 14 dan 90 tahun.';
    }
    if (!weight || weight < 35 || weight > 250) {
      newErrors.weight = 'Berat badan harus di antara 35 dan 250 kg.';
    }
    if (!height || height < 120 || height > 230) {
      newErrors.height = 'Tinggi badan harus di antara 120 dan 230 cm.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onUpdateProfile(formData);
      setIsDirty(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch {
      setErrors({ form: 'Gagal memperbarui profil lokal.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-5 pb-8 max-w-2xl animate-in fade-in duration-200">
      {/* Title */}
      <section className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Profil Kebugaran</h1>
          </div>
          <StatusBadge status="DEMO" size="sm" />
        </div>
        <p className="text-xs text-slate-500">
          Kelola data biometrik dan preferensi latihan Anda untuk menyesuaikan rekomendasi.
        </p>
      </section>

      {/* Member Card Summary Strip */}
      <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">{user?.name}</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.memberId}</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {user?.planName || 'Annual Regular'}
          </span>
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-400">
          <span>Terakhir Diperbarui: <strong className="text-slate-600">{profile.lastUpdated || 'Hari ini'}</strong></span>
          <span className="text-[#6D28D9] font-medium">Tersimpan di Browser</span>
        </div>
      </section>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        {/* Form Global Success / Error */}
        {saveSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Profil kebugaran berhasil disimpan! Rekomendasi latihan diperbarui otomatis.</span>
          </div>
        )}

        {errors.form && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errors.form}
          </div>
        )}

        {/* Section 1: Data Fisik Tubuh */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 space-y-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#6D28D9] flex items-center justify-center">
              <Activity className="w-3.5 h-3.5" />
            </div>
            Data Biometrik Fisik
          </h3>

          {/* Gender Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Jenis Kelamin (untuk kalkulasi laju basal BMR)
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleChange('gender', 'male')}
                className={`py-2.5 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                  formData.gender === 'male'
                    ? 'bg-purple-100/70 border-purple-300 text-[#6D28D9] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Pria
              </button>
              <button
                type="button"
                onClick={() => handleChange('gender', 'female')}
                className={`py-2.5 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                  formData.gender === 'female'
                    ? 'bg-purple-100/70 border-purple-300 text-[#6D28D9] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Wanita
              </button>
            </div>
          </div>

          {/* Usia, Tinggi, Berat in Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Usia (Tahun)
              </label>
              <input
                type="number"
                min="14"
                max="90"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-2xl text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-colors ${
                  errors.age ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                }`}
              />
              {errors.age && <p className="text-[10px] text-rose-600 mt-1 font-medium">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tinggi Badan (cm)
              </label>
              <input
                type="number"
                min="120"
                max="230"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-2xl text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-colors ${
                  errors.height ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                }`}
              />
              {errors.height && <p className="text-[10px] text-rose-600 mt-1 font-medium">{errors.height}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Berat Badan (kg)
              </label>
              <input
                type="number"
                min="35"
                max="250"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-2xl text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-colors ${
                  errors.weight ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                }`}
              />
              {errors.weight && <p className="text-[10px] text-rose-600 mt-1 font-medium">{errors.weight}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Berat (kg)
              </label>
              <input
                type="number"
                min="35"
                max="250"
                value={formData.targetWeight}
                onChange={(e) => handleChange('targetWeight', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-[#6D28D9] focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Preferensi Program Latihan */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 space-y-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Target className="w-3.5 h-3.5" />
            </div>
            Target & Frekuensi Latihan
          </h3>

          {/* Fitness Goal */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tujuan Kebugaran Utama
            </label>
            <div className="space-y-2">
              {[
                { id: 'fat_loss', label: 'Penurunan Lemak (Fat Loss)', desc: 'Defisit kalori moderat & pembakaran energi optimal' },
                { id: 'muscle_building', label: 'Pembentukan Otot (Hypertrophy)', desc: 'Surplus kalori terkontrol & stimulus beban terukur' },
                { id: 'general_fitness', label: 'Kebugaran Umum (Maintenance)', desc: 'Menjaga stamina, komposisi tubuh seimbang & kesehatan' }
              ].map((g) => (
                <div
                  key={g.id}
                  onClick={() => handleChange('fitnessGoal', g.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.fitnessGoal === g.id
                      ? 'bg-purple-50/70 border-purple-300 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold ${formData.fitnessGoal === g.id ? 'text-[#6D28D9]' : 'text-slate-800'}`}>
                      {g.label}
                    </span>
                    {formData.fitnessGoal === g.id && (
                      <span className="w-2 h-2 rounded-full bg-[#6D28D9]" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Days Per Week */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Frekuensi Latihan per Minggu
              </label>
              <span className="text-xs font-black text-[#6D28D9] px-2.5 py-0.5 bg-purple-50 rounded-full border border-purple-100">
                {formData.daysPerWeek} Hari
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2 pt-1">
              {[2, 3, 4, 5, 6].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleChange('daysPerWeek', day)}
                  className={`py-2 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                    Number(formData.daysPerWeek) === day
                      ? 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {day}x
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
              *Frekuensi menentukan rekomendasi kategori split (Full Body, Upper/Lower, atau Push/Pull/Legs).
            </p>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tingkat Pengalaman Gym
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'beginner', label: 'Pemula' },
                { id: 'intermediate', label: 'Menengah' },
                { id: 'advanced', label: 'Lanjutan' }
              ].map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => handleChange('experienceLevel', exp.id)}
                  className={`py-2 text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                    formData.experienceLevel === exp.id
                      ? 'bg-purple-100 text-[#6D28D9] border-purple-300 font-extrabold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full min-h-[48px] rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              isDirty
                ? 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-purple-600/25 active:scale-[0.98]'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Menyimpan Data...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isDirty ? 'Simpan Perubahan Profil' : 'Data Profil Terkini'}
              </>
            )}
          </button>
          {isDirty && (
            <p className="text-[11px] text-center text-[#6D28D9] mt-1.5 font-bold">
              Ada perubahan profil yang belum disimpan.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
