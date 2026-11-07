import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool, isDbConnected } from '../config/db.js';
import { localStore } from '../config/localStore.js';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'trisis_gym_secret_jwt_key_bogor_2026';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan kata sandi wajib diisi.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let user = null;
    let membership = null;

    if (isDbConnected) {
      const [rows] = await pool.query(
        'SELECT id, email, password_hash, full_name, phone, role, member_id, is_active FROM users WHERE email = ?',
        [cleanEmail]
      );
      if (rows.length > 0) user = rows[0];

      if (user) {
        const [mRows] = await pool.query(
          'SELECT plan_name, status, end_date FROM memberships WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
          [user.id]
        );
        membership = mRows[0];
      }
    } else {
      user = localStore.findUserByEmail(cleanEmail);
      if (user) {
        membership = localStore.getMembershipByUserId(user.id);
      }
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Email atau kata sandi tidak sesuai.' });
    }

    if (user.is_active === 0 || user.is_active === false) {
      return res.status(403).json({ success: false, message: 'Akun Anda dinonaktifkan. Hubungi admin gym.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau kata sandi tidak sesuai.' });
    }

    const planName = membership?.plan_name || 'Annual Regular Pass';
    const validUntil = membership?.end_date 
      ? new Date(membership.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      : '31 Des 2026';

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        memberId: user.member_id
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login berhasil.',
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        memberId: user.member_id,
        planName,
        validUntil
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server saat login.' });
  }
}

export async function register(req, res) {
  try {
    const { name, email, password, phone, planId, planName, goal } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Nama, email, dan kata sandi wajib diisi.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const prefix = planId === 'mahasiswa' ? 'M' : planId === 'per_visit' ? 'V' : 'R';
    const memberId = `TRISIS-${prefix}-2026-${Math.floor(100 + Math.random() * 900)}`;
    const userId = `usr_${crypto.randomUUID()}`;
    const passwordHash = await bcrypt.hash(password, 10);

    if (isDbConnected) {
      const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [cleanEmail]);
      if (existing.length > 0) {
        return res.status(409).json({ success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain.' });
      }

      await pool.query(
        'INSERT INTO users (id, email, password_hash, full_name, phone, role, member_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, cleanEmail, passwordHash, name.trim(), phone || null, 'member', memberId]
      );

      const membershipId = `mem_${crypto.randomUUID()}`;
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      await pool.query(
        'INSERT INTO memberships (id, user_id, plan_id, plan_name, status, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [membershipId, userId, planId || 'reguler', planName || 'Paket Bulanan Reguler', 'active', startDate, endDate]
      );

      const profileId = `prof_${crypto.randomUUID()}`;
      await pool.query(
        'INSERT INTO profiles (id, user_id, fitness_goal) VALUES (?, ?, ?)',
        [profileId, userId, goal || 'general_fitness']
      );
    } else {
      if (localStore.findUserByEmail(cleanEmail)) {
        return res.status(409).json({ success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain.' });
      }

      localStore.addUser({
        id: userId,
        email: cleanEmail,
        password_hash: passwordHash,
        full_name: name.trim(),
        phone: phone || null,
        role: 'member',
        member_id: memberId,
        is_active: 1,
        created_at: new Date().toISOString()
      });

      localStore.addMembership({
        id: `mem_${Date.now()}`,
        user_id: userId,
        plan_id: planId || 'reguler',
        plan_name: planName || 'Paket Bulanan Reguler',
        status: 'active',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
        price_paid: 185000.00
      });

      localStore.setProfile(userId, { fitness_goal: goal || 'general_fitness' });
    }

    const token = jwt.sign(
      { id: userId, email: cleanEmail, role: 'member', memberId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran member berhasil.',
      token,
      user: {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        phone,
        role: 'member',
        memberId,
        planName: planName || 'Paket Bulanan Reguler'
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memproses pendaftaran member baru.' });
  }
}

export async function getMe(req, res) {
  try {
    let user = null;
    let membership = null;

    if (isDbConnected) {
      const [rows] = await pool.query(
        'SELECT id, email, full_name, phone, role, member_id FROM users WHERE id = ?',
        [req.user.id]
      );
      user = rows[0];

      if (user) {
        const [mRows] = await pool.query(
          'SELECT plan_name, status, end_date FROM memberships WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
          [user.id]
        );
        membership = mRows[0];
      }
    } else {
      user = localStore.findUserById(req.user.id);
      if (user) {
        membership = localStore.getMembershipByUserId(user.id);
      }
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        memberId: user.member_id,
        planName: membership?.plan_name || 'Annual Regular Pass',
        validUntil: membership?.end_date ? new Date(membership.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '31 Des 2026'
      }
    });
  } catch (error) {
    console.error('GetMe error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengambil data profil pengguna.' });
  }
}
