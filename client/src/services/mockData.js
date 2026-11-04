/**
 * Mock Data Service — Trisis Gym Member App
 * Mengelola data dummy interaktif dan persistensi client-side (localStorage)
 * sesuai spesifikasi Phase 6A (Frontend-First).
 */

const STORAGE_KEYS = {
  AUTH: 'trisis_demo_auth',
  PROFILE: 'trisis_demo_profile',
  CHECKINS: 'trisis_demo_checkins',
  ACTIVITIES: 'trisis_demo_activities',
};

// Seed Akun & Kartu Member Demo Awal
const INITIAL_ACCOUNT = {
  id: 'usr_demo_089',
  name: 'Budi Santoso',
  email: 'budi.member@trisisgym.demo',
  phone: '0812-3456-7890',
  memberId: 'TRISIS-DEMO-2026-089',
  planName: 'Annual Regular Member (Simulasi)',
  status: 'Aktif (Demo)',
  joinedDate: '10 Januari 2026',
  validUntil: '10 Januari 2027',
  emergencyContact: 'Siti Rahma (Istri) - 0813-9876-5432',
  qrCodeSeed: 'TRISIS-QR-DEMO-089-VERIFIED'
};

// Seed Profil Kebugaran Awal
const INITIAL_PROFILE = {
  age: 23,
  gender: 'male', // 'male' | 'female'
  height: 172, // cm
  weight: 68, // kg
  targetWeight: 72, // kg
  fitnessGoal: 'muscle_building', // 'fat_loss' | 'muscle_building' | 'general_fitness'
  experienceLevel: 'intermediate', // 'beginner' | 'intermediate' | 'advanced'
  daysPerWeek: 4, // 2 - 6
  focusAreas: ['Chest', 'Back', 'Shoulders'],
  medicalNotes: 'Tidak ada riwayat cedera kronis',
  lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
};

// Seed Riwayat Check-in Awal
const INITIAL_CHECKINS = [
  { id: 'chk_101', date: '11 Okt 2026', time: '17:45 WIB', location: 'Trisis Gym — Area Utama', method: 'SIMULASI_APP' },
  { id: 'chk_102', date: '09 Okt 2026', time: '18:30 WIB', location: 'Trisis Gym — Free Weight', method: 'SIMULASI_APP' },
  { id: 'chk_103', date: '07 Okt 2026', time: '07:15 WIB', location: 'Trisis Gym — Area Utama', method: 'SIMULASI_APP' },
  { id: 'chk_104', date: '05 Okt 2026', time: '19:00 WIB', location: 'Trisis Gym — Cardio Section', method: 'SIMULASI_APP' },
  { id: 'chk_105', date: '03 Okt 2026', time: '18:10 WIB', location: 'Trisis Gym — Area Utama', method: 'SIMULASI_APP' },
];

// Seed Riwayat Aktivitas Awal
const INITIAL_ACTIVITIES = [
  {
    id: 'act_01',
    type: 'CHECK_IN',
    title: 'Check-in Gym Sukses',
    description: 'Sesi latihan beban di Area Utama Trisis Gym.',
    timestamp: 'Kemarin, 17:45 WIB',
    methodBadge: 'DEMO'
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
    description: 'Target berat badan disesuaikan menjadi 72 kg.',
    timestamp: '08 Okt 2026, 10:15 WIB',
    methodBadge: 'MANUAL'
  },
  {
    id: 'act_04',
    type: 'CHECK_IN',
    title: 'Check-in Gym Sukses',
    description: 'Sesi latihan punggung dan bisep di Free Weight Area.',
    timestamp: '07 Okt 2026, 07:15 WIB',
    methodBadge: 'DEMO'
  }
];

// Helper LocalStorage
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
    console.error('Failed to save to localStorage:', err);
  }
}

// Layanan Mock Data Terpadu
export const mockDataService = {
  // Autentikasi Demo
  getAuthStatus() {
    return getStoredItem(STORAGE_KEYS.AUTH, {
      isAuthenticated: true,
      user: INITIAL_ACCOUNT
    });
  },

  login(email, _password) {
    // Validasi kredensial demo fleksibel
    const user = { ...INITIAL_ACCOUNT, email: email || INITIAL_ACCOUNT.email };
    const authState = { isAuthenticated: true, user };
    setStoredItem(STORAGE_KEYS.AUTH, authState);
    return Promise.resolve({ success: true, user });
  },

  logout() {
    const authState = { isAuthenticated: false, user: null };
    setStoredItem(STORAGE_KEYS.AUTH, authState);
    return Promise.resolve({ success: true });
  },

  // Profil Kebugaran
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

    // Tambahkan catatan ke riwayat aktivitas
    this.addActivity({
      type: 'PROFILE_UPDATE',
      title: 'Profil Kebugaran Diperbarui',
      description: `Target: ${updated.fitnessGoal}, Frekuensi: ${updated.daysPerWeek} hari/minggu.`,
      methodBadge: 'MANUAL'
    });

    return Promise.resolve({ success: true, data: updated });
  },

  // Check-In Simulasi
  getCheckIns() {
    return getStoredItem(STORAGE_KEYS.CHECKINS, INITIAL_CHECKINS);
  },

  performCheckIn(notes = '', method = 'QR_SCAN_KASIR') {
    const checkIns = this.getCheckIns();
    const now = new Date();
    const todayStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    // Cek apakah hari ini sudah check-in
    const alreadyToday = checkIns.find(c => c.date === todayStr);

    if (alreadyToday) {
      return Promise.reject({
        code: 'DUPLICATE_CHECKIN',
        message: `Anda sudah melakukan check-in hari ini pada pukul ${alreadyToday.time}. Silakan reset presensi hari ini jika ingin menguji scan QR kembali.`
      });
    }

    const newCheckIn = {
      id: `chk_${Date.now()}`,
      date: todayStr,
      time: timeStr,
      location: 'Trisis Gym — Kasir & Turnstile Utama',
      notes: notes || 'Presensi Scan QR Kasir',
      method: method
    };

    const updatedCheckIns = [newCheckIn, ...checkIns];
    setStoredItem(STORAGE_KEYS.CHECKINS, updatedCheckIns);

    // Tambah ke riwayat aktivitas
    this.addActivity({
      type: 'CHECK_IN',
      title: 'Presensi Scan QR Kasir Berhasil',
      description: `Presensi terverifikasi via QR Code di Kasir & Turnstile Utama pada ${timeStr}.`,
      methodBadge: 'DEMO'
    });

    return Promise.resolve({ success: true, checkIn: newCheckIn });
  },

  resetTodayCheckIn() {
    const checkIns = this.getCheckIns();
    const now = new Date();
    const todayStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const filtered = checkIns.filter(c => c.date !== todayStr);
    setStoredItem(STORAGE_KEYS.CHECKINS, filtered);
    return Promise.resolve({ success: true });
  },

  // Riwayat Aktivitas
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

  // Statistik Ringkasan
  getStats() {
    const checkIns = this.getCheckIns();
    const profile = this.getProfile();

    return {
      totalCheckIns: checkIns.length,
      monthCheckIns: checkIns.filter((_c) => true).length,
      currentStreak: Math.min(checkIns.length, 4),
      daysGoal: profile.daysPerWeek || 3,
      membershipStatus: 'Aktif (Demo)'
    };
  },

  // Reset ke state default
  resetToDemoDefaults() {
    setStoredItem(STORAGE_KEYS.AUTH, { isAuthenticated: true, user: INITIAL_ACCOUNT });
    setStoredItem(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
    setStoredItem(STORAGE_KEYS.CHECKINS, INITIAL_CHECKINS);
    setStoredItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
    return true;
  }
};
