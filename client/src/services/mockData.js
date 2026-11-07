/**
 * Mock Data Service — Trisis Gym Member App
 * Mengelola data dummy interaktif dan persistensi client-side (localStorage)
 * sesuai spesifikasi Phase 6A (Frontend-First) dan Modul Admin Manajemen.
 */

const STORAGE_KEYS = {
  AUTH: 'trisis_app_auth',
  PROFILE: 'trisis_app_profile',
  CHECKINS: 'trisis_app_checkins',
  ACTIVITIES: 'trisis_app_activities',
  MEMBERS: 'trisis_app_members',
  GYM_SETTINGS: 'trisis_app_gym_settings',
  ACTIVE_ROLE: 'trisis_app_active_role' // 'member' | 'admin'
};

// Seed Akun & Kartu Member Awal
const INITIAL_ACCOUNT = {
  id: 'usr_m_089',
  name: 'Budi Santoso',
  email: 'budi.santoso@trisisgym.com',
  phone: '0812-3456-7890',
  memberId: 'TRISIS-2026-089',
  planName: 'Annual Regular Pass',
  status: 'Aktif',
  joinedDate: '10 Januari 2026',
  validUntil: '10 Januari 2027',
  emergencyContact: 'Siti Rahma (Istri) - 0813-9876-5432',
  qrCodeSeed: 'TRISIS-QR-089-VERIFIED',
  role: 'member'
};

// Seed Akun Admin Kasir / Pengelola Gym
const INITIAL_ADMIN_ACCOUNT = {
  id: 'usr_admin_001',
  name: 'Admin Trisis Gym',
  email: 'admin@trisisgym.com',
  phone: '0811-2233-4455',
  memberId: 'TRISIS-STAFF-001',
  planName: 'Staff & Receptionist',
  status: 'Aktif',
  role: 'admin'
};

// Seed Daftar Member untuk Pengelolaan Admin (Modul 9)
const INITIAL_MEMBERS = [
  {
    id: 'usr_m_089',
    name: 'Budi Santoso',
    email: 'budi.santoso@trisisgym.com',
    phone: '0812-3456-7890',
    memberId: 'TRISIS-2026-089',
    planName: 'Annual Regular Pass',
    planId: 'annual',
    status: 'Aktif',
    joinedDate: '10 Jan 2026',
    validUntil: '10 Jan 2027',
    totalCheckIns: 12,
    goal: 'muscle_building'
  },
  {
    id: 'usr_m_012',
    name: 'Siti Nurhaliza',
    email: 'siti.mhs@pakuan.ac.id',
    phone: '0857-1122-3344',
    memberId: 'TRISIS-M-2026-012',
    planName: 'Paket Mahasiswa Pakuan',
    planId: 'mahasiswa',
    status: 'Aktif',
    joinedDate: '01 Feb 2026',
    validUntil: '01 Mar 2026',
    totalCheckIns: 18,
    goal: 'fat_loss'
  },
  {
    id: 'usr_r_045',
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@gmail.com',
    phone: '0813-7788-9900',
    memberId: 'TRISIS-R-2026-045',
    planName: 'Paket Bulanan Reguler',
    planId: 'reguler',
    status: 'Aktif',
    joinedDate: '15 Jan 2026',
    validUntil: '15 Feb 2026',
    totalCheckIns: 9,
    goal: 'muscle_building'
  },
  {
    id: 'usr_v_003',
    name: 'Rizky Pratama',
    email: 'rizky.p@yahoo.com',
    phone: '0819-4455-6677',
    memberId: 'TRISIS-V-2026-003',
    planName: 'Per-Visit (Harian Flex)',
    planId: 'per_visit',
    status: 'Kadaluarsa',
    joinedDate: '28 Okt 2026',
    validUntil: '29 Okt 2026',
    totalCheckIns: 3,
    goal: 'general_fitness'
  },
  {
    id: 'usr_m_077',
    name: 'Dinda Permata',
    email: 'dinda.ipb@apps.ipb.ac.id',
    phone: '0821-3344-5566',
    memberId: 'TRISIS-M-2026-077',
    planName: 'Paket Mahasiswa IPB',
    planId: 'mahasiswa',
    status: 'Aktif',
    joinedDate: '05 Okt 2026',
    validUntil: '05 Nov 2026',
    totalCheckIns: 14,
    goal: 'fat_loss'
  }
];

// Seed Pengaturan Operasional Dashboard Gym yang Diatur Admin
const INITIAL_GYM_SETTINGS = {
  isOpen: true,
  openingHours: '06:00 – 22:00 WIB',
  currentCrowdStatus: 'sore', // 'pagi' | 'siang' | 'sore' | 'malam'
  currentOccupancy: 38, // orang
  maxCapacity: 75, // orang
  announcementText: 'Pemberitahuan: Sesi kelas Functional & HIIT hari Jumat pukul 16.30 WIB. Silakan daftar di kasir!',
  announcementActive: true,
  trainerOnDuty: 'Coach Randy (Strength) & Coach Maya (Fitness)'
};

// Seed Profil Kebugaran Awal
const INITIAL_PROFILE = {
  age: 23,
  gender: 'male',
  height: 172,
  weight: 68,
  targetWeight: 72,
  fitnessGoal: 'muscle_building',
  experienceLevel: 'intermediate',
  daysPerWeek: 4,
  focusAreas: ['Chest', 'Back', 'Shoulders'],
  medicalNotes: 'Tidak ada riwayat cedera kronis',
  lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
};

// Seed Riwayat Check-in Awal
const INITIAL_CHECKINS = [
  { id: 'chk_101', memberId: 'TRISIS-2026-089', memberName: 'Budi Santoso', date: '11 Okt 2026', time: '17:45 WIB', location: 'Trisis Gym — Kasir & Turnstile Utama', method: 'SCAN_QR_KASIR' },
  { id: 'chk_102', memberId: 'TRISIS-M-2026-012', memberName: 'Siti Nurhaliza', date: '11 Okt 2026', time: '16:20 WIB', location: 'Trisis Gym — Kasir & Turnstile Utama', method: 'SCAN_QR_KASIR' },
  { id: 'chk_103', memberId: 'TRISIS-2026-089', memberName: 'Budi Santoso', date: '09 Okt 2026', time: '18:30 WIB', location: 'Trisis Gym — Free Weight', method: 'SCAN_QR_KASIR' },
  { id: 'chk_104', memberId: 'TRISIS-R-2026-045', memberName: 'Ahmad Fauzi', date: '08 Okt 2026', time: '19:10 WIB', location: 'Trisis Gym — Kasir & Turnstile Utama', method: 'MANUAL_KASIR' },
  { id: 'chk_105', memberId: 'TRISIS-2026-089', memberName: 'Budi Santoso', date: '07 Okt 2026', time: '07:15 WIB', location: 'Trisis Gym — Area Utama', method: 'SCAN_QR_KASIR' },
  { id: 'chk_106', memberId: 'TRISIS-M-2026-077', memberName: 'Dinda Permata', date: '06 Okt 2026', time: '17:05 WIB', location: 'Trisis Gym — Kasir & Turnstile Utama', method: 'SCAN_QR_KASIR' },
];

// Seed Riwayat Aktivitas Awal
const INITIAL_ACTIVITIES = [
  {
    id: 'act_01',
    type: 'CHECK_IN',
    title: 'Presensi Scan QR Kasir Berhasil',
    description: 'Sesi latihan beban di Kasir & Turnstile Utama Trisis Gym.',
    timestamp: 'Kemarin, 17:45 WIB',
    methodBadge: 'AKTIF'
  },
  {
    id: 'act_02',
    type: 'RECOMMENDATION',
    title: 'Pembaruan Rekomendasi Split',
    description: 'Rekomendasi disesuaikan dengan frekuensi 4 hari/minggu (Upper/Lower Split).',
    timestamp: '10 Okt 2026, 14:20 WIB',
    methodBadge: 'BASELINE'
  },
  {
    id: 'act_03',
    type: 'PROFILE_UPDATE',
    title: 'Profil Kebugaran Diperbarui',
    description: 'Target BB disesuaikan ke 72 kg dengan surplus kalori seimbang.',
    timestamp: '08 Okt 2026, 09:15 WIB',
    methodBadge: 'MANUAL'
  }
];

// Helper penyimpanan localStorage
function getStoredItem(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Gagal menyimpan ${key} ke localStorage`, err);
  }
}

export const mockDataService = {
  // 1. Role Pengguna Aktif ('member' | 'admin')
  getActiveRole() {
    return getStoredItem(STORAGE_KEYS.ACTIVE_ROLE, 'member');
  },

  setActiveRole(role) {
    setStoredItem(STORAGE_KEYS.ACTIVE_ROLE, role);
    return role;
  },

  // 2. Autentikasi Pengguna
  getAuthStatus() {
    const role = this.getActiveRole();
    const defaultUser = role === 'admin' ? INITIAL_ADMIN_ACCOUNT : INITIAL_ACCOUNT;
    return getStoredItem(STORAGE_KEYS.AUTH, {
      isAuthenticated: true,
      user: defaultUser
    });
  },

  login(email, _password) {
    const isAdmin = email && email.toLowerCase().includes('admin');
    const user = isAdmin ? { ...INITIAL_ADMIN_ACCOUNT, email } : { ...INITIAL_ACCOUNT, email: email || INITIAL_ACCOUNT.email };
    const authState = { isAuthenticated: true, user };
    setStoredItem(STORAGE_KEYS.AUTH, authState);
    this.setActiveRole(user.role);
    return Promise.resolve({ success: true, user });
  },

  logout() {
    const authState = { isAuthenticated: false, user: null };
    setStoredItem(STORAGE_KEYS.AUTH, authState);
    return Promise.resolve({ success: true });
  },

  // 3. Profil Kebugaran Member
  getProfile() {
    return getStoredItem(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
  },

  updateProfile(newProfileData) {
    const current = this.getProfile();
    const updated = {
      ...current,
      ...newProfileData,
      lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setStoredItem(STORAGE_KEYS.PROFILE, updated);

    this.addActivity({
      type: 'PROFILE_UPDATE',
      title: 'Profil Kebugaran Diperbarui',
      description: `Target: ${updated.fitnessGoal}, Frekuensi: ${updated.daysPerWeek} hari/minggu.`,
      methodBadge: 'MANUAL'
    });

    return Promise.resolve({ success: true, data: updated });
  },

  // 4. Presensi & Check-in
  getCheckIns() {
    return getStoredItem(STORAGE_KEYS.CHECKINS, INITIAL_CHECKINS);
  },

  performCheckIn(notes = '', method = 'QR_SCAN_KASIR') {
    const checkIns = this.getCheckIns();
    const now = new Date();
    const todayStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const user = this.getAuthStatus().user || INITIAL_ACCOUNT;

    // Cek apakah hari ini sudah check-in
    const alreadyToday = checkIns.find(c => c.date === todayStr && c.memberId === user.memberId);

    if (alreadyToday) {
      return Promise.reject({
        code: 'DUPLICATE_CHECKIN',
        message: `Anda sudah melakukan check-in hari ini pada pukul ${alreadyToday.time}. Silakan reset presensi hari ini jika ingin menguji scan QR kembali.`
      });
    }

    const newCheckIn = {
      id: `chk_${Date.now()}`,
      memberId: user.memberId,
      memberName: user.name,
      date: todayStr,
      time: timeStr,
      location: 'Trisis Gym — Kasir & Turnstile Utama',
      notes: notes || 'Presensi Scan QR Kasir',
      method: method
    };

    const updatedCheckIns = [newCheckIn, ...checkIns];
    setStoredItem(STORAGE_KEYS.CHECKINS, updatedCheckIns);

    this.addActivity({
      type: 'CHECK_IN',
      title: 'Presensi Scan QR Kasir Berhasil',
      description: `Presensi terverifikasi via QR Code di Kasir & Turnstile Utama pada ${timeStr}.`,
      methodBadge: 'AKTIF'
    });

    return Promise.resolve({ success: true, checkIn: newCheckIn });
  },

  resetTodayCheckIn() {
    const checkIns = this.getCheckIns();
    const user = this.getAuthStatus().user || INITIAL_ACCOUNT;
    const now = new Date();
    const todayStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const filtered = checkIns.filter(c => !(c.date === todayStr && c.memberId === user.memberId));
    setStoredItem(STORAGE_KEYS.CHECKINS, filtered);
    return Promise.resolve({ success: true });
  },

  // 5. Riwayat Aktivitas Member
  getActivities() {
    return getStoredItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  },

  addActivity(activityItem) {
    const activities = this.getActivities();
    const now = new Date();
    const timeStr = `Hari ini, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const newActivity = {
      id: `act_${Date.now()}`,
      timestamp: timeStr,
      ...activityItem
    };

    const updated = [newActivity, ...activities];
    setStoredItem(STORAGE_KEYS.ACTIVITIES, updated);
    return updated;
  },

  // 6. Ringkasan Statistik untuk Dashboard Member
  getStats() {
    const checkIns = this.getCheckIns();
    const user = this.getAuthStatus().user || INITIAL_ACCOUNT;
    const userCheckIns = checkIns.filter(c => c.memberId === user.memberId);
    const profile = this.getProfile();
    const settings = this.getGymSettings();

    return {
      totalCheckIns: userCheckIns.length,
      monthCheckIns: userCheckIns.length,
      currentStreak: Math.min(userCheckIns.length, 4),
      daysGoal: profile.daysPerWeek || 4,
      membershipStatus: user.status || 'Aktif',
      gymSettings: settings
    };
  },

  // =========================================================================
  // 7. FITUR MANAJEMEN ADMIN & PENGATURAN DASHBOARD UTAMA (MODUL 9)
  // =========================================================================
  getGymSettings() {
    return getStoredItem(STORAGE_KEYS.GYM_SETTINGS, INITIAL_GYM_SETTINGS);
  },

  updateGymSettings(newSettings) {
    const current = this.getGymSettings();
    const updated = { ...current, ...newSettings };
    setStoredItem(STORAGE_KEYS.GYM_SETTINGS, updated);
    return Promise.resolve({ success: true, settings: updated });
  },

  getMembers() {
    return getStoredItem(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
  },

  addMember(memberData) {
    const members = this.getMembers();
    const newId = `usr_${Date.now()}`;
    const newMemberId = `TRISIS-${memberData.planId === 'mahasiswa' ? 'M' : memberData.planId === 'per_visit' ? 'V' : 'R'}-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newMember = {
      id: newId,
      memberId: newMemberId,
      name: memberData.name || 'Member Baru',
      email: memberData.email || 'member@trisisgym.com',
      phone: memberData.phone || '0812-0000-0000',
      planName: memberData.planName || 'Paket Bulanan Reguler',
      planId: memberData.planId || 'reguler',
      status: 'Aktif',
      joinedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      validUntil: memberData.validUntil || '1 Bulan Mendatang',
      totalCheckIns: 0,
      goal: memberData.goal || 'general_fitness'
    };

    const updated = [newMember, ...members];
    setStoredItem(STORAGE_KEYS.MEMBERS, updated);
    return Promise.resolve({ success: true, member: newMember });
  },

  updateMember(memberId, fields) {
    const members = this.getMembers();
    const updated = members.map((m) => {
      if (m.id === memberId || m.memberId === memberId) {
        return { ...m, ...fields };
      }
      return m;
    });
    setStoredItem(STORAGE_KEYS.MEMBERS, updated);
    return Promise.resolve({ success: true, members: updated });
  },

  deleteMember(memberId) {
    const members = this.getMembers();
    const updated = members.filter(m => m.id !== memberId && m.memberId !== memberId);
    setStoredItem(STORAGE_KEYS.MEMBERS, updated);
    return Promise.resolve({ success: true, members: updated });
  },

  adminCheckInMember(memberId, notes = '') {
    const members = this.getMembers();
    const member = members.find(m => m.id === memberId || m.memberId === memberId);
    if (!member) {
      return Promise.reject(new Error('Member tidak ditemukan.'));
    }

    const checkIns = this.getCheckIns();
    const now = new Date();
    const todayStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const newCheckIn = {
      id: `chk_${Date.now()}`,
      memberId: member.memberId,
      memberName: member.name,
      date: todayStr,
      time: timeStr,
      location: 'Trisis Gym — Kasir & Turnstile Utama',
      notes: notes || 'Presensi Verifikasi Admin / Kasir',
      method: 'MANUAL_KASIR'
    };

    const updatedCheckIns = [newCheckIn, ...checkIns];
    setStoredItem(STORAGE_KEYS.CHECKINS, updatedCheckIns);

    // Increment member checkin counter
    this.updateMember(member.id, { totalCheckIns: (member.totalCheckIns || 0) + 1 });

    return Promise.resolve({ success: true, checkIn: newCheckIn });
  },

  getAdminStats() {
    const members = this.getMembers();
    const checkIns = this.getCheckIns();
    const settings = this.getGymSettings();

    const now = new Date();
    const todayStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const todayCheckIns = checkIns.filter(c => c.date === todayStr);

    const activeMembers = members.filter(m => m.status === 'Aktif').length;

    return {
      totalMembers: members.length,
      activeMembers,
      expiredMembers: members.length - activeMembers,
      todayCheckInsCount: todayCheckIns.length,
      currentOccupancy: settings.currentOccupancy,
      maxCapacity: settings.maxCapacity,
      gymStatus: settings.isOpen ? 'Buka' : 'Tutup',
      announcement: settings.announcementText
    };
  },

  // Reset semua ke default
  resetToDemoDefaults() {
    setStoredItem(STORAGE_KEYS.AUTH, { isAuthenticated: true, user: INITIAL_ACCOUNT });
    setStoredItem(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
    setStoredItem(STORAGE_KEYS.CHECKINS, INITIAL_CHECKINS);
    setStoredItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
    setStoredItem(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
    setStoredItem(STORAGE_KEYS.GYM_SETTINGS, INITIAL_GYM_SETTINGS);
    setStoredItem(STORAGE_KEYS.ACTIVE_ROLE, 'member');
    return true;
  }
};
