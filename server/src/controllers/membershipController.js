import { pool } from '../config/db.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function getMyMembership(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      'SELECT id, plan_id, plan_name, status, start_date, end_date, price_paid FROM memberships WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    if (rows.length === 0) {
      return res.json({
        success: true,
        data: {
          planName: 'Annual Regular Pass',
          status: 'Aktif',
          validUntil: '31 Des 2026'
        }
      });
    }

    const m = rows[0];
    return res.json({
      success: true,
      data: {
        id: m.id,
        planId: m.plan_id,
        planName: m.plan_name,
        status: m.status === 'active' ? 'Aktif' : 'Kadaluarsa',
        startDate: new Date(m.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        validUntil: new Date(m.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    });
  } catch (error) {
    console.error('getMyMembership error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data keanggotaan.' });
  }
}

export async function getAllMembers(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.id, 
        u.full_name as name, 
        u.email, 
        u.phone, 
        u.member_id as memberId,
        m.plan_name as planName,
        m.plan_id as planId,
        m.status,
        m.start_date as joinedDate,
        m.end_date as validUntil,
        p.fitness_goal as goal,
        (SELECT COUNT(*) FROM checkins c WHERE c.user_id = u.id) as totalCheckIns
      FROM users u
      LEFT JOIN memberships m ON u.id = m.user_id
      LEFT JOIN profiles p ON u.id = p.user_id
      WHERE u.role = 'member'
      ORDER BY u.created_at DESC
    `);

    const members = rows.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone || '-',
      memberId: r.memberId,
      planName: r.planName || 'Paket Bulanan Reguler',
      planId: r.planId || 'reguler',
      status: r.status === 'active' ? 'Aktif' : 'Kadaluarsa',
      joinedDate: r.joinedDate ? new Date(r.joinedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '10 Jan 2026',
      validUntil: r.validUntil ? new Date(r.validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '10 Jan 2027',
      totalCheckIns: Number(r.totalCheckIns || 0),
      goal: r.goal || 'general_fitness'
    }));

    return res.json({ success: true, data: members });
  } catch (error) {
    console.error('getAllMembers error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil daftar member.' });
  }
}

export async function createMember(req, res) {
  try {
    const { name, email, phone, planId, planName, validUntil, goal } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Nama member wajib diisi.' });
    }

    const userId = `usr_${crypto.randomUUID()}`;
    const prefix = planId === 'mahasiswa' ? 'M' : planId === 'per_visit' ? 'V' : 'R';
    const memberId = `TRISIS-${prefix}-2026-${Math.floor(100 + Math.random() * 900)}`;
    const cleanEmail = (email && email.trim()) ? email.trim().toLowerCase() : `member_${Date.now()}@trisisgym.com`;
    const defaultHash = await bcrypt.hash('password123', 10);

    // 1. User
    await pool.query(
      'INSERT INTO users (id, email, password_hash, full_name, phone, role, member_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, cleanEmail, defaultHash, name.trim(), phone || '0812-0000-0000', 'member', memberId]
    );

    // 2. Membership
    const membershipId = `mem_${crypto.randomUUID()}`;
    const startDate = new Date();
    const endDate = new Date();
    if (planId === 'annual') endDate.setFullYear(endDate.getFullYear() + 1);
    else endDate.setMonth(endDate.getMonth() + 1);

    await pool.query(
      'INSERT INTO memberships (id, user_id, plan_id, plan_name, status, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [membershipId, userId, planId || 'reguler', planName || 'Paket Bulanan Reguler', 'active', startDate, endDate]
    );

    // 3. Profile
    const profileId = `prof_${crypto.randomUUID()}`;
    await pool.query(
      'INSERT INTO profiles (id, user_id, fitness_goal) VALUES (?, ?, ?)',
      [profileId, userId, goal || 'general_fitness']
    );

    return res.status(201).json({
      success: true,
      message: 'Member baru berhasil ditambahkan.',
      data: {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        phone: phone || '0812-0000-0000',
        memberId,
        planName: planName || 'Paket Bulanan Reguler',
        planId: planId || 'reguler',
        status: 'Aktif',
        joinedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        validUntil: validUntil || '1 Bulan Mendatang',
        totalCheckIns: 0,
        goal: goal || 'general_fitness'
      }
    });
  } catch (error) {
    console.error('createMember error:', error);
    return res.status(500).json({ success: false, message: 'Gagal menambahkan member baru.' });
  }
}

export async function updateMember(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, planName, planId, status, validUntil } = req.body;

    if (name) {
      await pool.query('UPDATE users SET full_name = ?, phone = ? WHERE id = ?', [name, phone, id]);
    }

    if (planName || status) {
      const dbStatus = status === 'Kadaluarsa' ? 'expired' : 'active';
      await pool.query(
        'UPDATE memberships SET plan_name = ?, plan_id = ?, status = ? WHERE user_id = ?',
        [planName, planId, dbStatus, id]
      );
    }

    return res.json({ success: true, message: 'Data member berhasil diperbarui.' });
  } catch (error) {
    console.error('updateMember error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui data member.' });
  }
}

export async function deleteMember(req, res) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Member berhasil dihapus.' });
  } catch (error) {
    console.error('deleteMember error:', error);
    return res.status(500).json({ success: false, message: 'Gagal menghapus member.' });
  }
}
