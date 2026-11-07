/**
 * API Service — Trisis Gym
 * Berkomunikasi dengan Backend Node.js Express + MySQL di http://localhost:5000/api
 * Memiliki fallback otomatis ke local storage (mockDataService) jika backend belum dinyalakan.
 */

import { mockDataService } from './mockData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'trisis_auth_token';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    // Re-throw agar caller dapat menangani atau fallback
    throw error;
  }
}

export const apiService = {
  // 1. Autentikasi
  async login(email, password) {
    try {
      const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (data.token) setToken(data.token);
      // Sinkronkan ke local mock agar sinkron
      mockDataService.login(email, password);
      return { success: true, user: data.user, token: data.token };
    } catch (err) {
      console.warn('[API Fallback] Backend offline atau gagal, beralih ke local service:', err.message);
      return mockDataService.login(email, password);
    }
  },

  async register(registerData) {
    try {
      const data = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerData)
      });
      if (data.token) setToken(data.token);
      return data;
    } catch (err) {
      console.warn('[API Fallback] Register via mock service:', err.message);
      return mockDataService.addMember(registerData);
    }
  },

  logout() {
    setToken(null);
    return mockDataService.logout();
  },

  getAuthStatus() {
    return mockDataService.getAuthStatus();
  },

  getActiveRole() {
    return mockDataService.getActiveRole();
  },

  setActiveRole(role) {
    return mockDataService.setActiveRole(role);
  },

  // 2. Profil Kebugaran
  async getProfile() {
    try {
      const res = await request('/profile');
      return res.data;
    } catch {
      return mockDataService.getProfile();
    }
  },

  async updateProfile(profileData) {
    try {
      const res = await request('/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData)
      });
      mockDataService.updateProfile(profileData);
      return res;
    } catch {
      return mockDataService.updateProfile(profileData);
    }
  },

  // 3. Presensi & Check-in
  async performCheckIn(notes, location) {
    try {
      const res = await request('/checkins', {
        method: 'POST',
        body: JSON.stringify({ notes, location })
      });
      mockDataService.performCheckIn(notes);
      return res;
    } catch {
      return mockDataService.performCheckIn(notes);
    }
  },

  async resetTodayCheckIn() {
    try {
      await request('/checkins/reset-today', { method: 'POST' });
    } catch {
      // ignore
    }
    return mockDataService.resetTodayCheckIn();
  },

  getActivities() {
    return mockDataService.getActivities();
  },

  getCheckIns() {
    return mockDataService.getCheckIns();
  },

  getStats() {
    return mockDataService.getStats();
  },

  // 4. Operasional Gym & Dashboard
  async getGymSettings() {
    try {
      const res = await request('/gym-settings');
      return res.data;
    } catch {
      return mockDataService.getGymSettings();
    }
  },

  async updateGymSettings(newSettings) {
    try {
      const res = await request('/gym-settings', {
        method: 'PUT',
        body: JSON.stringify(newSettings)
      });
      mockDataService.updateGymSettings(newSettings);
      return res;
    } catch {
      return mockDataService.updateGymSettings(newSettings);
    }
  },

  // 5. Manajemen Member Admin
  async getMembers() {
    try {
      const res = await request('/memberships/all');
      return res.data;
    } catch {
      return mockDataService.getMembers();
    }
  },

  async addMember(memberData) {
    try {
      const res = await request('/memberships', {
        method: 'POST',
        body: JSON.stringify(memberData)
      });
      mockDataService.addMember(memberData);
      return res.data;
    } catch {
      return mockDataService.addMember(memberData);
    }
  },

  async updateMember(id, memberData) {
    try {
      await request(`/memberships/${id}`, {
        method: 'PUT',
        body: JSON.stringify(memberData)
      });
      mockDataService.updateMember(id, memberData);
    } catch {
      mockDataService.updateMember(id, memberData);
    }
  },

  async deleteMember(id) {
    try {
      await request(`/memberships/${id}`, { method: 'DELETE' });
      mockDataService.deleteMember(id);
    } catch {
      mockDataService.deleteMember(id);
    }
  },

  getAdminStats() {
    return mockDataService.getAdminStats();
  },

  resetToDemoDefaults() {
    return mockDataService.resetToDemoDefaults();
  }
};

export default apiService;
