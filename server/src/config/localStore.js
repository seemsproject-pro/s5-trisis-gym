import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../../data/local_db.json');

// Ensure directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let cache = null;

function loadData() {
  if (cache) return cache;
  if (fs.existsSync(DATA_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return cache;
    } catch {
      // fallback
    }
  }

  // Initial seed
  const memberHash = bcrypt.hashSync('password123', 10);
  const adminHash = bcrypt.hashSync('admin1234', 10);

  cache = {
    users: [
      {
        id: 'usr_admin_001',
        email: 'admin@trisisgym.com',
        password_hash: adminHash,
        full_name: 'Admin Trisis Gym',
        phone: '0811-2233-4455',
        role: 'admin',
        member_id: 'TRISIS-STAFF-001',
        is_active: 1,
        created_at: new Date().toISOString()
      },
      {
        id: 'usr_m_089',
        email: 'budi.santoso@trisisgym.com',
        password_hash: memberHash,
        full_name: 'Budi Santoso',
        phone: '0812-3456-7890',
        role: 'member',
        member_id: 'TRISIS-2026-089',
        is_active: 1,
        created_at: new Date().toISOString()
      }
    ],
    memberships: [
      {
        id: 'mem_001',
        user_id: 'usr_m_089',
        plan_id: 'annual',
        plan_name: 'Annual Regular Pass',
        status: 'active',
        start_date: '2026-01-10',
        end_date: '2027-01-10',
        price_paid: 1950000.00
      }
    ],
    profiles: [
      {
        id: 'prof_001',
        user_id: 'usr_m_089',
        age: 23,
        gender: 'male',
        height_cm: 172.00,
        weight_kg: 68.00,
        target_weight_kg: 72.00,
        fitness_goal: 'muscle_building',
        experience_level: 'intermediate',
        days_per_week: 4,
        medical_notes: 'Tidak ada riwayat cedera kronis',
        updated_at: new Date().toISOString()
      }
    ],
    checkins: [
      {
        id: 'chk_101',
        user_id: 'usr_m_089',
        member_id: 'TRISIS-2026-089',
        checkin_date: '2026-10-11',
        checkin_time: '17:45:00',
        location: 'Trisis Gym — Kasir & Turnstile Utama',
        method: 'QR_SCAN_KASIR',
        notes: 'Sesi latihan dada & trisep'
      }
    ],
    gym_settings: {
      id: 1,
      is_open: 1,
      opening_hours: '06:00 – 22:00 WIB',
      current_crowd_status: 'sore',
      current_occupancy: 38,
      max_capacity: 75,
      announcement_text: 'Pemberitahuan: Sesi kelas Functional & HIIT hari Jumat pukul 16.30 WIB. Silakan daftar di kasir!',
      announcement_active: 1,
      trainer_on_duty: 'Coach Randy (Strength) & Coach Maya (Fitness)'
    }
  };

  saveData(cache);
  return cache;
}

function saveData(data) {
  cache = data;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const localStore = {
  get: loadData,
  save: saveData,
  
  findUserByEmail(email) {
    const data = loadData();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  findUserById(id) {
    const data = loadData();
    return data.users.find(u => u.id === id);
  },

  addUser(userObj) {
    const data = loadData();
    data.users.push(userObj);
    saveData(data);
    return userObj;
  },

  getMembershipByUserId(userId) {
    const data = loadData();
    return data.memberships.find(m => m.user_id === userId);
  },

  addMembership(memObj) {
    const data = loadData();
    data.memberships.push(memObj);
    saveData(data);
    return memObj;
  },

  updateMembership(userId, updates) {
    const data = loadData();
    const idx = data.memberships.findIndex(m => m.user_id === userId);
    if (idx !== -1) {
      data.memberships[idx] = { ...data.memberships[idx], ...updates };
      saveData(data);
      return data.memberships[idx];
    }
    return null;
  },

  getProfileByUserId(userId) {
    const data = loadData();
    return data.profiles.find(p => p.user_id === userId);
  },

  setProfile(userId, profileObj) {
    const data = loadData();
    const idx = data.profiles.findIndex(p => p.user_id === userId);
    if (idx !== -1) {
      data.profiles[idx] = { ...data.profiles[idx], ...profileObj, updated_at: new Date().toISOString() };
    } else {
      data.profiles.push({ id: `prof_${Date.now()}`, user_id: userId, ...profileObj, updated_at: new Date().toISOString() });
    }
    saveData(data);
  },

  getCheckIns(userId) {
    const data = loadData();
    if (userId) return data.checkins.filter(c => c.user_id === userId);
    return data.checkins;
  },

  addCheckIn(chkObj) {
    const data = loadData();
    data.checkins.unshift(chkObj);
    saveData(data);
    return chkObj;
  },

  deleteTodayCheckIn(userId, todayDate) {
    const data = loadData();
    data.checkins = data.checkins.filter(c => !(c.user_id === userId && c.checkin_date === todayDate));
    saveData(data);
  },

  getSettings() {
    const data = loadData();
    return data.gym_settings;
  },

  updateSettings(settings) {
    const data = loadData();
    data.gym_settings = { ...data.gym_settings, ...settings };
    saveData(data);
    return data.gym_settings;
  },

  getAllMembers() {
    const data = loadData();
    return data.users
      .filter(u => u.role === 'member')
      .map(u => {
        const mem = data.memberships.find(m => m.user_id === u.id) || {};
        const prof = data.profiles.find(p => p.user_id === u.id) || {};
        const chks = data.checkins.filter(c => c.user_id === u.id);
        return {
          id: u.id,
          name: u.full_name,
          email: u.email,
          phone: u.phone,
          memberId: u.member_id,
          planName: mem.plan_name || 'Paket Bulanan Reguler',
          planId: mem.plan_id || 'reguler',
          status: mem.status === 'active' ? 'Aktif' : 'Kadaluarsa',
          joinedDate: mem.start_date || '10 Jan 2026',
          validUntil: mem.end_date || '10 Jan 2027',
          totalCheckIns: chks.length,
          goal: prof.fitness_goal || 'general_fitness'
        };
      });
  },

  deleteUser(userId) {
    const data = loadData();
    data.users = data.users.filter(u => u.id !== userId);
    data.memberships = data.memberships.filter(m => m.user_id !== userId);
    data.profiles = data.profiles.filter(p => p.user_id !== userId);
    data.checkins = data.checkins.filter(c => c.user_id !== userId);
    saveData(data);
  }
};

export default localStore;
