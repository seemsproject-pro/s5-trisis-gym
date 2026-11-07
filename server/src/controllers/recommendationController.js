import { pool } from '../config/db.js';

export function calculateWorkoutSplit(profile) {
  const days = Number(profile?.days_per_week || profile?.daysPerWeek || 4);
  const goal = profile?.fitness_goal || profile?.fitnessGoal || 'muscle_building';
  const exp = profile?.experience_level || profile?.experienceLevel || 'intermediate';

  if (days <= 2) {
    return {
      splitType: 'FULL_BODY',
      splitName: 'Full Body Compound (2-Day Split)',
      description: 'Program efisien untuk melatih seluruh kelompok otot utama dalam dua sesi intensif per minggu.',
      daysCount: days,
      methodBadge: 'BASELINE'
    };
  } else if (days === 3) {
    if (goal === 'fat_loss') {
      return {
        splitType: 'FULL_BODY_CIRCUIT',
        splitName: 'Full Body High-Density (3-Day Split)',
        description: 'Siklus latihan seluruh tubuh dengan repetisi moderat dan istirahat dinamis untuk memaksimalkan pembakaran kalori.',
        daysCount: 3,
        methodBadge: 'BASELINE'
      };
    }
    return {
      splitType: 'PUSH_PULL_LEGS',
      splitName: 'Push / Pull / Legs Classic (3-Day Split)',
      description: 'Pemisahan gerakan mendorong, menarik, dan melatih kaki secara seimbang untuk pemulihan optimal.',
      daysCount: 3,
      methodBadge: 'BASELINE'
    };
  } else if (days === 4) {
    return {
      splitType: 'UPPER_LOWER',
      splitName: 'Upper / Lower Power & Hypertrophy (4-Day Split)',
      description: 'Frekuensi latihan dua kali seminggu per kelompok otot: kombinasi hari fokus Upper Body dan Lower Body.',
      daysCount: 4,
      methodBadge: 'BASELINE'
    };
  } else if (days === 5) {
    if (exp === 'advanced' || goal === 'muscle_building') {
      return {
        splitType: 'PPL_UPPER_LOWER',
        splitName: 'Push / Pull / Legs + Upper / Lower (5-Day Hybrid)',
        description: 'Pembagian latihan spesifik volume tinggi dengan perpaduan PPL dan variasi compound.',
        daysCount: 5,
        methodBadge: 'BASELINE'
      };
    }
    return {
      splitType: 'BRO_SPLIT',
      splitName: 'Body-Part Isolation (5-Day Split)',
      description: 'Satu hari untuk satu kelompok otot spesifik: Dada, Punggung, Bahu, Kaki, dan Lengan.',
      daysCount: 5,
      methodBadge: 'BASELINE'
    };
  } else {
    return {
      splitType: 'PPL_DOUBLE',
      splitName: 'Push / Pull / Legs Double Cycle (6-Day Split)',
      description: 'Frekuensi tinggi untuk atlet dan praktisi berpengalaman dengan volume target per sesi yang terukur.',
      daysCount: days,
      methodBadge: 'BASELINE'
    };
  }
}

export function calculateMacroEstimates(profile) {
  const weight = Number(profile?.weight_kg || profile?.weight || 68);
  const height = Number(profile?.height_cm || profile?.height || 172);
  const age = Number(profile?.age || 23);
  const gender = profile?.gender || 'male';
  const days = Number(profile?.days_per_week || profile?.daysPerWeek || 4);
  const goal = profile?.fitness_goal || profile?.fitnessGoal || 'muscle_building';

  // Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  let activityMultiplier = 1.375;
  if (days <= 2) activityMultiplier = 1.25;
  else if (days <= 4) activityMultiplier = 1.45;
  else activityMultiplier = 1.6;

  const tdee = Math.round(bmr * activityMultiplier);

  let targetCalories = tdee;
  if (goal === 'fat_loss') targetCalories = Math.round(tdee - 400);
  else if (goal === 'muscle_building') targetCalories = Math.round(tdee + 300);

  const proteinGrams = Math.round(weight * 2.0);
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const remainingCals = targetCalories - (proteinGrams * 4) - (fatGrams * 9);
  const carbsGrams = Math.max(50, Math.round(remainingCals / 4));

  return {
    bmr,
    tdee,
    targetCalories,
    macros: {
      protein: { grams: proteinGrams, calories: proteinGrams * 4, percentage: Math.round(((proteinGrams * 4) / targetCalories) * 100) },
      carbs: { grams: carbsGrams, calories: carbsGrams * 4, percentage: Math.round(((carbsGrams * 4) / targetCalories) * 100) },
      fat: { grams: fatGrams, calories: fatGrams * 9, percentage: Math.round(((fatGrams * 9) / targetCalories) * 100) }
    },
    methodBadge: 'BASELINE'
  };
}

export async function getRecommendations(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query('SELECT * FROM profiles WHERE user_id = ?', [userId]);
    const profile = rows[0] || {
      weight_kg: 68,
      height_cm: 172,
      age: 23,
      gender: 'male',
      fitness_goal: 'muscle_building',
      days_per_week: 4,
      experience_level: 'intermediate'
    };

    const workoutSplit = calculateWorkoutSplit(profile);
    const macroEstimates = calculateMacroEstimates(profile);

    return res.json({
      success: true,
      data: {
        workoutSplit,
        macroEstimates
      }
    });
  } catch (error) {
    console.error('getRecommendations error:', error);
    return res.status(500).json({ success: false, message: 'Gagal menghitung rekomendasi kebugaran.' });
  }
}
