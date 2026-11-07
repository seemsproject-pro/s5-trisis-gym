import { pool } from '../config/db.js';

export async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      'SELECT age, gender, height_cm, weight_kg, target_weight_kg, fitness_goal, experience_level, days_per_week, medical_notes, updated_at FROM profiles WHERE user_id = ?',
      [userId]
    );

    if (rows.length === 0) {
      // Default profile jika belum ada
      return res.json({
        success: true,
        data: {
          age: 23,
          gender: 'male',
          height: 172,
          weight: 68,
          targetWeight: 72,
          fitnessGoal: 'muscle_building',
          experienceLevel: 'intermediate',
          daysPerWeek: 4,
          medicalNotes: '',
          lastUpdated: 'Hari ini'
        }
      });
    }

    const p = rows[0];
    return res.json({
      success: true,
      data: {
        age: p.age,
        gender: p.gender,
        height: Number(p.height_cm),
        weight: Number(p.weight_kg),
        targetWeight: Number(p.target_weight_kg),
        fitnessGoal: p.fitness_goal,
        experienceLevel: p.experience_level,
        daysPerWeek: p.days_per_week,
        medicalNotes: p.medical_notes || '',
        lastUpdated: new Date(p.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    });
  } catch (error) {
    console.error('getProfile error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data profil kebugaran.' });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { age, gender, height, weight, targetWeight, fitnessGoal, experienceLevel, daysPerWeek, medicalNotes } = req.body;

    await pool.query(
      `INSERT INTO profiles (user_id, age, gender, height_cm, weight_kg, target_weight_kg, fitness_goal, experience_level, days_per_week, medical_notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         age = VALUES(age),
         gender = VALUES(gender),
         height_cm = VALUES(height_cm),
         weight_kg = VALUES(weight_kg),
         target_weight_kg = VALUES(target_weight_kg),
         fitness_goal = VALUES(fitness_goal),
         experience_level = VALUES(experience_level),
         days_per_week = VALUES(days_per_week),
         medical_notes = VALUES(medical_notes),
         updated_at = CURRENT_TIMESTAMP`,
      [
        userId,
        age || 23,
        gender || 'male',
        height || 172,
        weight || 68,
        targetWeight || 72,
        fitnessGoal || 'muscle_building',
        experienceLevel || 'intermediate',
        daysPerWeek || 4,
        medicalNotes || null
      ]
    );

    return res.json({
      success: true,
      message: 'Profil kebugaran berhasil diperbarui.',
      data: {
        age,
        gender,
        height: Number(height),
        weight: Number(weight),
        targetWeight: Number(targetWeight),
        fitnessGoal,
        experienceLevel,
        daysPerWeek: Number(daysPerWeek),
        medicalNotes,
        lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    });
  } catch (error) {
    console.error('updateProfile error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui profil kebugaran.' });
  }
}
