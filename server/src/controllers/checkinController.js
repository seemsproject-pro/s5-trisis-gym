import { pool } from '../config/db.js';
import crypto from 'crypto';

export async function performCheckIn(req, res) {
  try {
    const userId = req.user.id;
    const memberId = req.user.memberId;
    const { notes, location } = req.body;

    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const dateFormatted = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    // Cek apakah sudah check-in hari ini
    const [existing] = await pool.query(
      'SELECT id, checkin_time, location FROM checkins WHERE user_id = ? AND checkin_date = ?',
      [userId, todayDate]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Anda sudah melakukan presensi check-in hari ini.',
        alreadyCheckedIn: true,
        lastCheckIn: {
          time: existing[0].checkin_time,
          location: existing[0].location
        }
      });
    }

    const checkInId = `chk_${crypto.randomUUID()}`;
    const loc = location || 'Trisis Gym — Kasir & Turnstile Utama';

    await pool.query(
      'INSERT INTO checkins (id, user_id, member_id, checkin_date, checkin_time, location, method, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [checkInId, userId, memberId, todayDate, now.toTimeString().split(' ')[0], loc, 'QR_SCAN_KASIR', notes || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Presensi check-in berhasil dicatat!',
      checkIn: {
        id: checkInId,
        memberId,
        date: dateFormatted,
        time: timeStr,
        location: loc,
        notes: notes || 'Presensi kasir turnstile berhasil.'
      }
    });
  } catch (error) {
    console.error('performCheckIn error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memproses presensi check-in.' });
  }
}

export async function getMyCheckIns(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      'SELECT id, member_id, checkin_date, checkin_time, location, method, notes, created_at FROM checkins WHERE user_id = ? ORDER BY checkin_date DESC, checkin_time DESC',
      [userId]
    );

    const checkIns = rows.map(r => ({
      id: r.id,
      memberId: r.member_id,
      date: new Date(r.checkin_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: r.checkin_time?.slice(0, 5) + ' WIB',
      location: r.location,
      method: r.method,
      notes: r.notes
    }));

    return res.json({ success: true, data: checkIns });
  } catch (error) {
    console.error('getMyCheckIns error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil riwayat presensi.' });
  }
}

export async function getAllCheckIns(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.member_id, u.full_name as member_name, c.checkin_date, c.checkin_time, c.location, c.method, c.notes
       FROM checkins c
       JOIN users u ON c.user_id = u.id
       ORDER BY c.checkin_date DESC, c.checkin_time DESC LIMIT 100`
    );

    const checkIns = rows.map(r => ({
      id: r.id,
      memberId: r.member_id,
      memberName: r.member_name,
      date: new Date(r.checkin_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: r.checkin_time?.slice(0, 5) + ' WIB',
      location: r.location,
      method: r.method,
      notes: r.notes
    }));

    return res.json({ success: true, data: checkIns });
  } catch (error) {
    console.error('getAllCheckIns error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data presensi kasir.' });
  }
}

export async function resetTodayCheckIn(req, res) {
  try {
    const userId = req.user.id;
    const todayDate = new Date().toISOString().split('T')[0];

    await pool.query('DELETE FROM checkins WHERE user_id = ? AND checkin_date = ?', [userId, todayDate]);
    return res.json({ success: true, message: 'Presensi hari ini telah direset.' });
  } catch (error) {
    console.error('resetTodayCheckIn error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mereset presensi.' });
  }
}
