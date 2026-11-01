import { Home, CalendarClock, Sparkles, User } from 'lucide-react';

// Satu sumber daftar menu agar BottomNav (mobile) dan SideNav (desktop)
// selalu memiliki item dan nama rute yang sama (UI-GUIDELINE §4.3).
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Beranda', icon: Home },
  { id: 'activity', label: 'Aktivitas', icon: CalendarClock },
  { id: 'recommendations', label: 'Rekomendasi', icon: Sparkles },
  { id: 'profile', label: 'Profil', icon: User },
];
