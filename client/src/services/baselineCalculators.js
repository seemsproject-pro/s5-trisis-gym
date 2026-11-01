/**
 * Baseline Calculators — Trisis Gym Member App
 * Menyediakan perhitungan deterministik transparan untuk rekomendasi workout split
 * dan estimasi target makronutrisi sesuai SOT (PRD.md & UI-GUIDELINE.md).
 */

/**
 * Menghitung rekomendasi program latihan (Workout Split) deterministik
 * @param {Object} profile - Profil kebugaran member
 * @returns {Object} Rekomendasi split beserta breakdown harian dan alasan
 */
export function calculateWorkoutSplit(profile) {
  const days = Number(profile.daysPerWeek) || 3;
  const goal = profile.fitnessGoal || 'general_fitness';
  const experience = profile.experienceLevel || 'beginner';

  let splitName = '';
  let splitCategory = '';
  let description = '';
  let schedule = [];
  let focusNotes = '';

  if (days <= 3) {
    splitName = 'Full Body Routine (3 Hari/Minggu)';
    splitCategory = 'FULL_BODY';
    description = 'Melatih seluruh kelompok otot utama dalam satu sesi dengan hari istirahat di antaranya untuk pemulihan optimal.';
    focusNotes = 'Sangat ideal untuk pemula atau jadwal padat. Memaksimalkan sintesis protein dengan frekuensi tinggi per kelompok otot.';
    schedule = [
      { day: 'Hari 1 (Senin)', focus: 'Full Body A', exercises: ['Squat', 'Bench Press', 'Barbell Row', 'Plank'] },
      { day: 'Hari 2 (Selasa)', focus: 'Istirahat / Pemulihan Aktif', exercises: ['Peregangan / Jalan Santai'] },
      { day: 'Hari 3 (Rabu)', focus: 'Full Body B', exercises: ['Deadlift', 'Overhead Press', 'Lat Pulldown', 'Hanging Leg Raise'] },
      { day: 'Hari 4 (Kamis)', focus: 'Istirahat / Pemulihan Aktif', exercises: ['Mobility work'] },
      { day: 'Hari 5 (Jumat)', focus: 'Full Body C', exercises: ['Leg Press', 'Incline Dumbbell Press', 'Dumbbell Row', 'Face Pull'] },
      { day: 'Hari 6-7 (Sabtu-Minggu)', focus: 'Istirahat Total', exercises: ['Pemulihan optimal'] }
    ];
  } else if (days === 4) {
    splitName = 'Upper / Lower Split (4 Hari/Minggu)';
    splitCategory = 'UPPER_LOWER';
    description = 'Memisahkan latihan tubuh bagian atas (dada, punggung, bahu, lengan) dan bagian bawah (kaki, betis, perut).';
    focusNotes = 'Keseimbangan sempurna antara volume dan frekuensi latihan, cocok untuk transisi pemula ke menengah.';
    schedule = [
      { day: 'Hari 1 (Senin)', focus: 'Upper Body (Kekuatan)', exercises: ['Barbell Bench Press', 'Bent-over Row', 'Overhead Press', 'Bicep Curl'] },
      { day: 'Hari 2 (Selasa)', focus: 'Lower Body (Kekuatan)', exercises: ['Barbell Back Squat', 'Romanian Deadlift', 'Leg Press', 'Calf Raise'] },
      { day: 'Hari 3 (Rabu)', focus: 'Istirahat Aktif', exercises: ['Kardio ringan / Peregangan'] },
      { day: 'Hari 4 (Kamis)', focus: 'Upper Body (Hipertrofi)', exercises: ['Incline DB Press', 'Lat Pulldown', 'Lateral Raise', 'Tricep Pushdown'] },
      { day: 'Hari 5 (Jumat)', focus: 'Lower Body (Hipertrofi)', exercises: ['Front Squat / Leg Extension', 'Hamstring Curl', 'Walking Lunges', 'Plank'] },
      { day: 'Hari 6-7 (Sabtu-Minggu)', focus: 'Istirahat Total', exercises: ['Pemulihan & nutrisi'] }
    ];
  } else {
    // 5 atau 6 hari
    splitName = 'Push / Pull / Legs (PPL Split)';
    splitCategory = 'PUSH_PULL_LEGS';
    description = 'Memisahkan gerakan mendorong (dada, bahu, trisep), menarik (punggung, bisep), dan tungkai bawah (kaki).';
    focusNotes = 'Dirancang untuk tingkat menengah hingga lanjutan guna memaksimalkan volume latihan per otot secara terarah.';
    schedule = [
      { day: 'Hari 1', focus: 'Push (Dorong)', exercises: ['Flat Bench Press', 'Incline DB Press', 'Dumbbell Shoulder Press', 'Triceps Rope Pushdown'] },
      { day: 'Hari 2', focus: 'Pull (Tarik)', exercises: ['Barbell Deadlift', 'Pull-up / Lat Pulldown', 'Seated Cable Row', 'Barbell Bicep Curl'] },
      { day: 'Hari 3', focus: 'Legs (Kaki & Core)', exercises: ['Barbell Squat', 'Romanian Deadlift', 'Leg Press', 'Calf Raise', 'Cable Woodchopper'] },
      { day: 'Hari 4', focus: 'Istirahat Aktif', exercises: ['Mobilitas & hidrasi'] },
      { day: 'Hari 5', focus: 'Push (Hipertrofi)', exercises: ['Incline Barbell Press', 'Chest Fly', 'Lateral Raise', 'Dips'] },
      { day: 'Hari 6', focus: 'Pull & Legs Ringan', exercises: ['Dumbbell Row', 'Face Pull', 'Bulgarian Split Squat', 'Hamstring Curl'] },
      { day: 'Hari 7', focus: 'Istirahat Total', exercises: ['Pemulihan'] }
    ];
  }

  return {
    method: 'BASELINE',
    methodLabel: 'BASELINE (DETERMINISTIK)',
    splitName,
    splitCategory,
    daysPerWeek: days,
    goal,
    experience,
    description,
    focusNotes,
    schedule,
    disclaimer: 'Rekomendasi ini dihitung berdasarkan aturan deterministik profil kebugaran Anda. Jadwal latihan spesifik sebaiknya dikonsultasikan dengan instruktur gym kompeten di Trisis Gym.'
  };
}

/**
 * Menghitung estimasi target makronutrisi deterministik (Mifflin-St Jeor & TDEE)
 * @param {Object} profile - Profil member dengan weight, height, age, gender, daysPerWeek, fitnessGoal
 * @returns {Object} Estimasi kalori harian dan pembagian makro (protein, karbo, lemak)
 */
export function calculateMacroEstimates(profile) {
  const weight = Number(profile.weight) || 68; // kg
  const height = Number(profile.height) || 170; // cm
  const age = Number(profile.age) || 22; // tahun
  const gender = profile.gender || 'male';
  const days = Number(profile.daysPerWeek) || 3;
  const goal = profile.fitnessGoal || 'general_fitness';

  // 1. Hitung BMR (Mifflin-St Jeor)
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // 2. Faktor Aktivitas Fisik (TDEE)
  let activityMultiplier = 1.2; // Sedentary
  let activityDesc = 'Aktivitas Ringan';
  if (days <= 2) {
    activityMultiplier = 1.375;
    activityDesc = 'Latihan Ringan (1-2x/minggu)';
  } else if (days <= 4) {
    activityMultiplier = 1.55;
    activityDesc = 'Latihan Sedang (3-4x/minggu)';
  } else {
    activityMultiplier = 1.725;
    activityDesc = 'Latihan Intensif (5-6x/minggu)';
  }

  const tdee = Math.round(bmr * activityMultiplier);

  // 3. Penyesuaian Kalori Berdasarkan Target Kebugaran
  let targetCalories = tdee;
  let calorieAdjustmentDesc = 'Maintenance (Menjaga Berat)';

  if (goal === 'fat_loss') {
    targetCalories = Math.round(tdee - 400); // Defisit moderat
    calorieAdjustmentDesc = 'Defisit Terkontrol (-400 kkal untuk penurunan lemak bertahap)';
  } else if (goal === 'muscle_building') {
    targetCalories = Math.round(tdee + 300); // Surplus terkontrol
    calorieAdjustmentDesc = 'Surplus Terkontrol (+300 kkal untuk pertumbuhan massa otot)';
  }

  // 4. Pembagian Makronutrisi
  // Protein: 2.0g per kg berat badan (pembentukan otot & kenyang)
  const proteinGrams = Math.round(weight * 2.0);
  const proteinCalories = proteinGrams * 4;

  // Lemak: 25% dari total kalori harian (1g lemak = 9 kkal)
  const fatCalories = Math.round(targetCalories * 0.25);
  const fatGrams = Math.round(fatCalories / 9);

  // Karbohidrat: Sisa kalori dibagi 4 kkal
  const remainingCalories = targetCalories - (proteinCalories + fatCalories);
  const carbGrams = Math.max(0, Math.round(remainingCalories / 4));
  const carbCalories = carbGrams * 4;

  // Persentase rasio kalori
  const proteinPct = Math.round((proteinCalories / targetCalories) * 100);
  const fatPct = Math.round((fatCalories / targetCalories) * 100);
  const carbPct = Math.max(0, 100 - proteinPct - fatPct);

  return {
    method: 'BASELINE',
    methodLabel: 'BASELINE TRANSPARAN (MIFFLIN-ST JEOR)',
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    calorieAdjustmentDesc,
    activityDesc,
    macros: {
      protein: { grams: proteinGrams, calories: proteinCalories, percentage: proteinPct },
      carbs: { grams: carbGrams, calories: carbCalories, percentage: carbPct },
      fat: { grams: fatGrams, calories: fatCalories, percentage: fatPct }
    },
    formulaDetails: `BMR dihitung dengan formula Mifflin-St Jeor: (10×${weight}kg) + (6.25×${height}cm) - (5×${age}thn) ${gender === 'male' ? '+ 5' : '- 161'}. Target kalori disesuaikan dari TDEE ${tdee} kkal.`,
    disclaimer: 'Estimasi makronutrisi ini merupakan panduan perhitungan matematis umum dan bukan pengganti saran medis atau konsultasi ahli gizi klinis.'
  };
}
