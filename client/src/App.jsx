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
import { mockDataService } from './services/mockData';

export default function App() {
  const [auth, setAuth] = useState(() => mockDataService.getAuthStatus());
  const [profile, setProfile] = useState(() => mockDataService.getProfile());
  const [activities, setActivities] = useState(() => mockDataService.getActivities());
  const [stats, setStats] = useState(() => mockDataService.getStats());

  // 'landing' (Profil & Tawaran Gym) | 'member' (Portal Pendamping Member)
  const [viewMode, setViewMode] = useState('landing');
  // 'member' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => mockDataService.getActiveRole() || 'member');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sinkronisasi data saat aksi terjadi
  const refreshState = () => {
    setProfile(mockDataService.getProfile());
    setActivities(mockDataService.getActivities());
    setStats(mockDataService.getStats());
  };

  const handleToggleRole = () => {
    const nextRole = currentRole === 'admin' ? 'member' : 'admin';
    mockDataService.setActiveRole(nextRole);
    setCurrentRole(nextRole);
    refreshState();
    showToast(nextRole === 'admin' ? 'Beralih ke Panel Kontrol Admin Gym.' : 'Beralih ke Dashboard Member.');
  };

  const handleLogin = (user) => {
    mockDataService.login(user.email, 'demo1234');
    const role = user.role || (user.email?.includes('admin') ? 'admin' : 'member');
    mockDataService.setActiveRole(role);
    setCurrentRole(role);
    setAuth({ isAuthenticated: true, user });
    refreshState();
    setViewMode('member');
    showToast(role === 'admin' ? 'Selamat datang di Panel Admin Trisis Gym!' : 'Selamat datang di Portal Member Trisis Gym!');
  };

  const handleQuickLoginFromLanding = () => {
    const demoUser = {
      id: 'usr_demo_089',
      name: 'Budi Santoso',
      email: 'budi.member@trisisgym.demo',
      memberId: 'TRISIS-DEMO-2026-089',
      planName: 'Annual Regular Pass',
      validUntil: '31 Des 2026'
    };
    handleLogin(demoUser);
  };

  const handleLogout = () => {
    mockDataService.logout();
    setAuth({ isAuthenticated: false, user: null });
    showToast('Berhasil keluar dari akun demo.');
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset semua data demo dan riwayat kembali ke kondisi awal?')) {
      mockDataService.resetToDemoDefaults();
      setAuth(mockDataService.getAuthStatus());
      refreshState();
      setActiveTab('dashboard');
      showToast('Data demo berhasil direset ke setelan awal.');
    }
  };

  const handleUpdateProfile = async (newProfileData) => {
    const res = await mockDataService.updateProfile(newProfileData);
    setProfile(res.data);
    refreshState();
    showToast('Profil kebugaran berhasil diperbarui!');
    return res;
  };

  const handleCheckInSuccess = async (notes) => {
    const res = await mockDataService.performCheckIn(notes);
    refreshState();
    showToast('Presensi check-in gym berhasil dicatat!');
    return res;
  };

  const handleResetTodayCheckIn = async () => {
    await mockDataService.resetTodayCheckIn();
    refreshState();
    showToast('Presensi hari ini telah direset untuk simulasi scan ulang.');
  };

  // 1. TAMPILAN HALAMAN DEPAN: PROFIL & PENAWARAN GYM
  if (viewMode === 'landing') {
    return (
      <GymLandingView
        onOpenLogin={() => setViewMode('member')}
        onQuickDemoLogin={handleQuickLoginFromLanding}
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
