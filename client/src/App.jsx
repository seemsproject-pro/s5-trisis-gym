import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SideNav from './components/SideNav';
import MemberCardModal from './components/MemberCardModal';
import CheckInModal from './components/CheckInModal';
import LoginView from './features/auth/LoginView';
import DashboardView from './features/dashboard/DashboardView';
import ProfileView from './features/profile/ProfileView';
import RecommendationsView from './features/recommendations/RecommendationsView';
import ActivityView from './features/activity/ActivityView';
import GymLandingView from './features/landing/GymLandingView';
import AdminDashboardView from './features/admin/AdminDashboardView';
import { apiService } from './services/apiService';

export default function App() {
  const [auth, setAuth] = useState(() => apiService.getAuthStatus());
  const [profile, setProfile] = useState(() => apiService.getProfile());
  const [activities, setActivities] = useState(() => apiService.getActivities());
  const [stats, setStats] = useState(() => apiService.getStats());

  // 'landing' (Profil & Tawaran Gym) | 'member' (Portal Pendamping Member)
  const [viewMode, setViewMode] = useState('landing');
  // 'member' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => apiService.getActiveRole() || 'member');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sinkronisasi data saat aksi terjadi
  const refreshState = async () => {
    try {
      const p = await apiService.getProfile();
      setProfile(p);
    } catch {
      // fallback handled in service
    }
    setActivities(apiService.getActivities());
    setStats(apiService.getStats());
  };

  const handleToggleRole = () => {
    const nextRole = currentRole === 'admin' ? 'member' : 'admin';
    apiService.setActiveRole(nextRole);
    setCurrentRole(nextRole);
    refreshState();
    showToast(nextRole === 'admin' ? 'Beralih ke Panel Kontrol Admin Gym.' : 'Beralih ke Dashboard Member.');
  };

  const handleLogin = async (user) => {
    const password = user.role === 'admin' ? 'admin1234' : 'password123';
    await apiService.login(user.email, password);
    const role = user.role || (user.email?.includes('admin') ? 'admin' : 'member');
    apiService.setActiveRole(role);
    setCurrentRole(role);
    setAuth({ isAuthenticated: true, user });
    await refreshState();
    setViewMode('member');
    showToast(role === 'admin' ? 'Selamat datang di Panel Admin Trisis Gym!' : 'Selamat datang di Portal Member Trisis Gym!');
  };

  const handleQuickLoginFromLanding = () => {
    const demoUser = {
      id: 'usr_m_089',
      name: 'Budi Santoso',
      email: 'budi.santoso@trisisgym.com',
      memberId: 'TRISIS-2026-089',
      planName: 'Annual Regular Pass',
      validUntil: '31 Des 2026',
      role: 'member'
    };
    handleLogin(demoUser);
  };

  const handleLogout = () => {
    apiService.logout();
    setAuth({ isAuthenticated: false, user: null });
    showToast('Berhasil keluar dari akun.');
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset semua data aplikasi dan riwayat kembali ke kondisi awal?')) {
      apiService.resetToDemoDefaults();
      setAuth(apiService.getAuthStatus());
      refreshState();
      setActiveTab('dashboard');
      showToast('Data aplikasi berhasil direset ke setelan awal.');
    }
  };

  const handleUpdateProfile = async (newProfileData) => {
    const res = await apiService.updateProfile(newProfileData);
    setProfile(res.data || newProfileData);
    refreshState();
    showToast('Profil kebugaran berhasil diperbarui!');
    return res;
  };

  const handleCheckInSuccess = async (notes) => {
    const res = await apiService.performCheckIn(notes);
    refreshState();
    showToast('Presensi check-in gym berhasil dicatat!');
    return res;
  };

  const handleResetTodayCheckIn = async () => {
    await apiService.resetTodayCheckIn();
    refreshState();
    showToast('Presensi hari ini telah direset.');
  };

  const handleQuickAdminLoginFromLanding = () => {
    const adminUser = {
      id: 'usr_admin_001',
      name: 'Admin Trisis Gym',
      email: 'admin@trisisgym.com',
      memberId: 'TRISIS-STAFF-001',
      planName: 'Staff & Receptionist',
      role: 'admin'
    };
    handleLogin(adminUser);
  };

  // 1. TAMPILAN HALAMAN DEPAN: PROFIL & PENAWARAN GYM
  if (viewMode === 'landing') {
    return (
      <GymLandingView
        auth={auth}
        onOpenLogin={() => setViewMode('member')}
        onQuickDemoLogin={handleQuickLoginFromLanding}
        onQuickAdminLogin={handleQuickAdminLoginFromLanding}
        onGoToDashboard={() => setViewMode('member')}
        onLogout={handleLogout}
      />
    );
  }

  // 2. JIKA MEMASUKI PORTAL MEMBER TAPI BELUM LOGIN
  if (!auth.isAuthenticated) {
    return (
      <LoginView
        onLoginSuccess={handleLogin}
        onBackToLanding={() => setViewMode('landing')}
      />
    );
  }

  // 3. TAMPILAN PORTAL MEMBER (DASHBOARD & FITUR PENDAMPING)
  return (
    <div className="min-h-screen bg-[#0B0D14] text-slate-100 flex font-sans selection:bg-[#4E3F66] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div role="status" className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#221B30] text-purple-200 border border-purple-500/30 font-bold text-xs rounded-full shadow-xl shadow-black/50 animate-in slide-in-from-top-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Sidebar / Rail Navigation (>= 768 px) */}
      <SideNav 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        currentRole={currentRole}
        onToggleRole={handleToggleRole}
        onLogout={handleLogout}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <Header
          user={auth.user}
          currentRole={currentRole}
          onToggleRole={handleToggleRole}
          onOpenCard={() => setIsCardModalOpen(true)}
          onLogout={handleLogout}
          onResetDemo={handleResetDemo}
          onGoToLanding={() => setViewMode('landing')}
        />

        {/* Main Content Area: mobile 1 kolom, melebar di tablet/desktop */}
        <main className="flex-1 w-full max-w-md md:max-w-3xl lg:max-w-6xl mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-24 md:pb-10">
          {currentRole === 'admin' ? (
            <AdminDashboardView
              onSwitchToMemberView={handleToggleRole}
              showToast={showToast}
              onLogout={handleLogout}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView
                  user={auth.user}
                  profile={profile}
                  stats={stats}
                  onOpenCheckIn={() => setIsCheckInModalOpen(true)}
                  onOpenCard={() => setIsCardModalOpen(true)}
                  onNavigateTab={setActiveTab}
                />
              )}

              {activeTab === 'activity' && (
                <ActivityView
                  activities={activities}
                  onOpenCheckIn={() => setIsCheckInModalOpen(true)}
                />
              )}

              {activeTab === 'recommendations' && (
                <RecommendationsView
                  profile={profile}
                  onNavigateTab={setActiveTab}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileView
                  user={auth.user}
                  profile={profile}
                  onUpdateProfile={handleUpdateProfile}
                  onLogout={handleLogout}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Fixed Bottom Navigation (4 Destinations, < 768 px, khusus member) */}
      {currentRole === 'member' && (
        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />
      )}

      {/* Digital Member Card Modal */}
      <MemberCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        user={auth.user}
      />

      {/* Gym Presensi Check-In Modal */}
      <CheckInModal
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
        onCheckInSuccess={handleCheckInSuccess}
        onResetTodayCheckIn={handleResetTodayCheckIn}
        user={auth.user}
        onViewActivity={() => {
          setIsCheckInModalOpen(false);
          setActiveTab('activity');
        }}
      />
    </div>
  );
}
