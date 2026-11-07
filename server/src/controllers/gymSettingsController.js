import { pool } from '../config/db.js';

export async function getGymSettings(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM gym_settings WHERE id = 1');
    if (rows.length === 0) {
      return res.json({
        success: true,
        data: {
          isOpen: true,
          openingHours: '06:00 – 22:00 WIB',
          currentCrowdStatus: 'sore',
          currentOccupancy: 38,
          maxCapacity: 75,
          announcementText: 'Pemberitahuan: Sesi kelas Functional & HIIT hari Jumat pukul 16.30 WIB. Silakan daftar di kasir!',
          announcementActive: true,
          trainerOnDuty: 'Coach Randy (Strength) & Coach Maya (Fitness)'
        }
      });
    }

    const s = rows[0];
    return res.json({
      success: true,
      data: {
        isOpen: Boolean(s.is_open),
        openingHours: s.opening_hours,
        currentCrowdStatus: s.current_crowd_status,
        currentOccupancy: s.current_occupancy,
        maxCapacity: s.max_capacity,
        announcementText: s.announcement_text,
        announcementActive: Boolean(s.announcement_active),
        trainerOnDuty: s.trainer_on_duty
      }
    });
  } catch (error) {
    console.error('getGymSettings error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil pengaturan gym.' });
  }
}

export async function updateGymSettings(req, res) {
  try {
    const { isOpen, openingHours, currentCrowdStatus, currentOccupancy, maxCapacity, announcementText, announcementActive, trainerOnDuty } = req.body;

    await pool.query(
      `INSERT INTO gym_settings (id, is_open, opening_hours, current_crowd_status, current_occupancy, max_capacity, announcement_text, announcement_active, trainer_on_duty)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         is_open = VALUES(is_open),
         opening_hours = VALUES(opening_hours),
         current_crowd_status = VALUES(current_crowd_status),
         current_occupancy = VALUES(current_occupancy),
         max_capacity = VALUES(max_capacity),
         announcement_text = VALUES(announcement_text),
         announcement_active = VALUES(announcement_active),
         trainer_on_duty = VALUES(trainer_on_duty)`,
      [
        isOpen !== undefined ? isOpen : true,
        openingHours || '06:00 – 22:00 WIB',
        currentCrowdStatus || 'sore',
        currentOccupancy || 35,
        maxCapacity || 75,
        announcementText || '',
        announcementActive !== undefined ? announcementActive : true,
        trainerOnDuty || 'Coach Randy & Coach Maya'
      ]
    );

    return res.json({
      success: true,
      message: 'Pengaturan operasional gym berhasil diperbarui.',
      data: req.body
    });
  } catch (error) {
    console.error('updateGymSettings error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui pengaturan operasional gym.' });
  }
}
