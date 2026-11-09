import { pool, isDbConnected } from '../config/db.js';
import { localStore } from '../config/localStore.js';
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
    const loc = location || 'Trisis Gym — Kasir & Turnstile Utama';
    const checkInId = `chk_${crypto.randomUUID()}`;

    // Validasi Keanggotaan: Wajib Aktif & Sudah Membayar
    let membership = null;
    if (isDbConnected) {
      const [mRows] = await pool.query(
        'SELECT plan_id, plan_name, status, end_date FROM memberships WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
        [userId]
      );
      if (mRows.length > 0) membership = mRows[0];
    } else {
      membership = localStore.getMembershipByUserId(userId);
    }

    if (!membership || membership.status !== 'active') {
      return res.status(403).json({
        success: false,
        code: 'MEMBERSHIP_INACTIVE',
        message: 'Akses Ditolak: Anda belum memiliki paket membership aktif atau belum membayar. Silakan pilih paket dan selesaikan pembayaran terlebih dahulu.'
      });
    }

    if (membership.end_date && new Date(membership.end_date) < new Date(todayDate)) {
      return res.status(403).json({
        success: false,
        code: 'MEMBERSHIP_EXPIRED',
        message: 'Akses Ditolak: Masa aktif paket membership Anda telah habis. Silakan perpanjang paket terlebih dahulu.'
      });
    }

    if (isDbConnected) {
      const [existing] = await pool.query(
        'SELECT id, checkin_time, location FROM checkins WHERE user_id = ? AND checkin_date = ?',
        [userId, todayDate]
      );

      if (existing.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Anda sudah melakukan presensi check-in hari ini.',
          alreadyCheckedIn: true
        });
      }

      await pool.query(
        'INSERT INTO checkins (id, user_id, member_id, checkin_date, checkin_time, location, method, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [checkInId, userId, memberId, todayDate, now.toTimeString().split(' ')[0], loc, 'QR_SCAN_KASIR', notes || null]
      );
    } else {
      const existing = localStore.getCheckIns(userId).find(c => c.checkin_date === todayDate);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Anda sudah melakukan presensi check-in hari ini.',
          alreadyCheckedIn: true
        });
      }

      localStore.addCheckIn({
        id: checkInId,
        user_id: userId,
        member_id: memberId,
        checkin_date: todayDate,
        checkin_time: now.toTimeString().split(' ')[0],
        location: loc,
        method: 'QR_SCAN_KASIR',
        notes: notes || null
      });
    }

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
    let checkIns = [];

    if (isDbConnected) {
      const [rows] = await pool.query(
        'SELECT id, member_id, checkin_date, checkin_time, location, method, notes FROM checkins WHERE user_id = ? ORDER BY checkin_date DESC, checkin_time DESC',
        [userId]
      );
      checkIns = rows.map(r => ({
        id: r.id,
        memberId: r.member_id,
        date: new Date(r.checkin_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: r.checkin_time?.slice(0, 5) + ' WIB',
        location: r.location,
        method: r.method,
        notes: r.notes
      }));
    } else {
      checkIns = localStore.getCheckIns(userId).map(r => ({
        id: r.id,
        memberId: r.member_id,
        date: new Date(r.checkin_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: r.checkin_time?.slice(0, 5) + ' WIB',
        location: r.location,
        method: r.method,
        notes: r.notes
      }));
    }

    return res.json({ success: true, data: checkIns });
  } catch (error) {
    console.error('getMyCheckIns error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil riwayat presensi.' });
  }
}

export async function getAllCheckIns(req, res) {
  try {
    let checkIns = [];

    if (isDbConnected) {
      const [rows] = await pool.query(
        `SELECT c.id, c.member_id, u.full_name as member_name, c.checkin_date, c.checkin_time, c.location, c.method, c.notes
         FROM checkins c
         JOIN users u ON c.user_id = u.id
         ORDER BY c.checkin_date DESC, c.checkin_time DESC LIMIT 100`
      );
      checkIns = rows.map(r => ({
        id: r.id,
        memberId: r.member_id,
        memberName: r.member_name,
        date: new Date(r.checkin_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: r.checkin_time?.slice(0, 5) + ' WIB',
        location: r.location,
        method: r.method,
        notes: r.notes
      }));
    } else {
      checkIns = localStore.getCheckIns().map(c => {
        const u = localStore.findUserById(c.user_id) || {};
        return {
          id: c.id,
          memberId: c.member_id,
          memberName: u.full_name || 'Budi Santoso',
          date: new Date(c.checkin_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          time: c.checkin_time?.slice(0, 5) + ' WIB',
          location: c.location,
          method: c.method,
          notes: c.notes
        };
      });
    }

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

    if (isDbConnected) {
      await pool.query('DELETE FROM checkins WHERE user_id = ? AND checkin_date = ?', [userId, todayDate]);
    } else {
      localStore.deleteTodayCheckIn(userId, todayDate);
    }
    return res.json({ success: true, message: 'Presensi hari ini telah direset.' });
  } catch (error) {
    console.error('resetTodayCheckIn error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mereset presensi.' });
  }
}
