import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Users, 
  CalendarCheck, 
  Megaphone, 
  Clock, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Edit3, 
  UserCheck, 
  Flame, 
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles,
  ChevronRight,
  TrendingUp,
  X,
  LogOut
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { mockDataService } from '../../services/mockData';

export default function AdminDashboardView({ onSwitchToMemberView, showToast, onLogout }) {
  const [activeAdminTab, setActiveAdminTab] = useState('settings'); // 'settings' | 'members' | 'attendance'
  
  // Data State dari MockService
  const [gymSettings, setGymSettings] = useState(() => mockDataService.getGymSettings());
  const [members, setMembers] = useState(() => mockDataService.getMembers());
  const [checkIns, setCheckIns] = useState(() => mockDataService.getCheckIns());
  const [adminStats, setAdminStats] = useState(() => mockDataService.getAdminStats());

  // Form State Pengaturan Gym
  const [formData, setFormData] = useState({ ...gymSettings });
  const [isSavedSettings, setIsSavedSettings] = useState(false);

  // State Manajemen Member
  const [memberSearch, setMemberSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Aktif' | 'Kadaluarsa'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Form Tambah Member Baru
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    planId: 'reguler',
    planName: 'Paket Bulanan Reguler',
    validUntil: '1 Bulan Mendatang',
    goal: 'general_fitness'
  });

  // State Meja Kasir Presensi
  const [selectedMemberForCheckIn, setSelectedMemberForCheckIn] = useState('');
  const [cashierNotes, setCashierNotes] = useState('Presensi Kasir Pintu Masuk');
  const [checkInFilterDate, setCheckInFilterDate] = useState('ALL'); // 'ALL' | 'TODAY'

  // Sinkronisasi data saat ada perubahan
  const refreshAll = () => {
    const s = mockDataService.getGymSettings();
    setGymSettings(s);
    setFormData({ ...s });
    setMembers(mockDataService.getMembers());
    setCheckIns(mockDataService.getCheckIns());
    setAdminStats(mockDataService.getAdminStats());
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // Handler Simpan Pengaturan Operasional Gym & Dashboard Utama
  const handleSaveGymSettings = async (e) => {
    e.preventDefault();
    await mockDataService.updateGymSettings(formData);
    refreshAll();
    setIsSavedSettings(true);
    showToast?.('Pengaturan dashboard member berhasil diperbarui!');
    setTimeout(() => setIsSavedSettings(false), 2500);
  };

  // Handler Tambah Member Baru
  const handleCreateMember = async (e) => {
    e.preventDefault();
    if (!newMemberForm.name.trim()) {
      alert('Nama member wajib diisi.');
      return;
    }

    let planName = 'Paket Bulanan Reguler';
    if (newMemberForm.planId === 'annual') planName = 'Annual Regular Pass';
    if (newMemberForm.planId === 'mahasiswa') planName = 'Paket Mahasiswa (KTM)';
    if (newMemberForm.planId === 'per_visit') planName = 'Per-Visit (Harian Flex)';

    await mockDataService.addMember({
      ...newMemberForm,
      planName
    });

    setIsAddModalOpen(false);
    setNewMemberForm({
      name: '',
      email: '',
      phone: '',
      planId: 'reguler',
      planName: 'Paket Bulanan Reguler',
      validUntil: '1 Bulan Mendatang',
      goal: 'general_fitness'
    });
    refreshAll();
    showToast?.('Member baru berhasil didaftarkan ke sistem!');
  };

  // Handler Update Member (Edit status / masa berlaku)
  const handleUpdateMemberSubmit = async (e) => {
    e.preventDefault();
    if (!editingMember) return;

    await mockDataService.updateMember(editingMember.id, {
      name: editingMember.name,
      status: editingMember.status,
      planName: editingMember.planName,
      validUntil: editingMember.validUntil
    });

    setIsEditModalOpen(false);
    setEditingMember(null);
    refreshAll();
    showToast?.('Data member berhasil diperbarui!');
  };

  // Handler Hapus Member
  const handleDeleteMember = async (id, name) => {
    if (window.confirm(`Hapus member "${name}" dari data gym?`)) {
      await mockDataService.deleteMember(id);
      refreshAll();
      showToast?.(`Member "${name}" telah dihapus.`);
    }
  };

  // Handler Presensi Kasir Manual
  const handleCashierCheckIn = async (e) => {
    e.preventDefault();
    if (!selectedMemberForCheckIn) {
      alert('Pilih member terlebih dahulu.');
      return;
    }

    try {
      await mockDataService.adminCheckInMember(selectedMemberForCheckIn, cashierNotes);
      setSelectedMemberForCheckIn('');
      refreshAll();
      showToast?.('Presensi member berhasil dicatat oleh Kasir!');
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter daftar member
  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.name?.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.memberId?.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email?.toLowerCase().includes(memberSearch.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && m.status === statusFilter;
  });

  // Filter checkin
  const now = new Date();
  const todayStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  const filteredCheckIns = checkIns.filter(c => {
    if (checkInFilterDate === 'TODAY') {
      return c.date === todayStr;
    }
    return true;
  });

  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-200">
      {/* 1. Top Header Banner Admin */}
      <section className="bg-[#111319] rounded-2xl p-5 md:p-6 border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700/80 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base md:text-lg font-bold text-white tracking-tight">
                  Panel Pengelola & Kasir
                </h1>
                <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">
                Atur operasional, kapasitas gym, data member, dan presensi kasir.
              </p>
            </div>
          </div>

          {/* Actions: Switch to Member View & Logout */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onSwitchToMemberView}
              className="py-2 px-3.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/60 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Pratinjau Layar Member</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                title="Keluar dari Akun Admin"
                className="py-2 px-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-rose-400 border border-zinc-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Keluar Admin</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-white/[0.06]">
          <div className="bg-zinc-900/60 rounded-xl p-3 border border-white/[0.04]">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Status Gym</span>
              <span className={`w-2 h-2 rounded-full ${gymSettings.isOpen ? 'bg-emerald-400' : 'bg-rose-500'}`} />
            </div>
            <p className={`text-sm font-bold ${gymSettings.isOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
              {gymSettings.isOpen ? 'BUKA OPERASIONAL' : 'TUTUP SEMENTARA'}
            </p>
          </div>

          <div className="bg-zinc-900/60 rounded-xl p-3 border border-white/[0.04]">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Pengunjung Aktif</span>
              <Users className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <p className="text-sm font-bold text-white">
              {gymSettings.currentOccupancy} <span className="text-xs font-normal text-zinc-400">/ {gymSettings.maxCapacity} Org</span>
            </p>
          </div>

          <div className="bg-zinc-900/60 rounded-xl p-3 border border-white/[0.04]">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Total Member</span>
              <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <p className="text-sm font-bold text-white">
              {adminStats.totalMembers} <span className="text-xs font-normal text-emerald-400">({adminStats.activeMembers} Aktif)</span>
            </p>
          </div>

          <div className="bg-zinc-900/60 rounded-xl p-3 border border-white/[0.04]">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Presensi Hari Ini</span>
              <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-sm font-bold text-amber-400">
              {adminStats.todayCheckInsCount} <span className="text-xs font-normal text-zinc-400">Check-In</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Admin Navigation Tabs */}
      <div className="flex items-center gap-2 p-1 bg-[#111319] rounded-xl border border-white/[0.08] max-w-full overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'settings'
              ? 'bg-zinc-800 text-white font-bold border border-zinc-700/80'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Kontrol Utama</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('members')}
          className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'members'
              ? 'bg-zinc-800 text-white font-bold border border-zinc-700/80'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Kelola Member ({members.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('attendance')}
          className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'attendance'
              ? 'bg-zinc-800 text-white font-bold border border-zinc-700/80'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Presensi Kasir ({checkIns.length})</span>
        </button>
      </div>

      {/* 3. TAB 1: KONTROL OPERASIONAL & DASHBOARD UTAMA */}
      {activeAdminTab === 'settings' && (
        <form onSubmit={handleSaveGymSettings} className="space-y-4">
          <div className="bg-[#111319] rounded-2xl p-5 md:p-6 border border-white/[0.08] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 text-amber-400 flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-bold text-white">
                    Siaran Pengumuman & Banner Member
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Pesan yang tampil di bagian atas dashboard seluruh member
                  </p>
                </div>
              </div>

              {/* Toggle Aktifkan Banner */}
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs font-semibold text-zinc-300">Tampilkan Banner:</span>
                <input
                  type="checkbox"
                  checked={formData.announcementActive}
                  onChange={(e) => setFormData({ ...formData, announcementActive: e.target.checked })}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Teks Pengumuman Siaran Langsung
              </label>
              <textarea
                rows={3}
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                placeholder="Contoh: Pemberitahuan: Sesi kelas Functional & HIIT hari Jumat pukul 16.30 WIB..."
                className="w-full bg-zinc-900 border border-white/[0.08] rounded-xl p-3 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Jam Operasional & Status Buka Gym */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#111319] rounded-2xl p-5 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Status & Jam Buka</h3>
                </div>
                
                {/* Toggle Buka/Tutup Gym */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isOpen: !formData.isOpen })}
                  className={`py-1 px-3 rounded text-xs font-bold cursor-pointer transition-all ${
                    formData.isOpen
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {formData.isOpen ? '● GYM BUKA' : '○ GYM TUTUP'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Jam Buka Operasional
                </label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Pelatih / Staff Bertugas Hari Ini
                </label>
                <input
                  type="text"
                  value={formData.trainerOnDuty}
                  onChange={(e) => setFormData({ ...formData, trainerOnDuty: e.target.value })}
                  placeholder="Nama pelatih bertugas..."
                  className="w-full bg-zinc-900 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Kontrol Kepadatan Pengunjung (Live Crowd) */}
            <div className="bg-[#111319] rounded-2xl p-5 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-zinc-400" />
                  <h3 className="text-sm font-bold text-white">Okupansi & Kepadatan Realtime</h3>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium bg-zinc-800 px-2 py-0.5 rounded">
                  Live Dashboard
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Orang di Gym Saat Ini
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={formData.maxCapacity * 2}
                    value={formData.currentOccupancy}
                    onChange={(e) => setFormData({ ...formData, currentOccupancy: parseInt(e.target.value) || 0 })}
                    className="w-full bg-zinc-900 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">
                    Kapasitas Maksimal
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) || 50 })}
                    className="w-full bg-zinc-900 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Status Jam Padat / Lengang */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                  Status Kepadatan Sesi
                </label>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {[
                    { id: 'pagi', label: 'Pagi (Lengang)' },
                    { id: 'siang', label: 'Siang (Sedang)' },
                    { id: 'sore', label: 'Sore (Peak)' },
                    { id: 'malam', label: 'Malam (Normal)' }
                  ].map((crowd) => (
                    <button
                      key={crowd.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, currentCrowdStatus: crowd.id })}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
                        formData.currentCrowdStatus === crowd.id
                          ? 'bg-zinc-800 text-amber-400 border-zinc-700 font-bold'
                          : 'bg-zinc-900/60 text-zinc-400 border-white/[0.04] hover:text-white'
                      }`}
                    >
                      {crowd.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Simpan Perubahan */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {isSavedSettings && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Pengaturan berhasil disimpan ke Dashboard Member!
              </span>
            )}
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </form>
      )}

      {/* 4. TAB 2: MANAJEMEN MEMBER (MODUL 9) */}
      {activeAdminTab === 'members' && (
        <div className="space-y-4">
          {/* Controls: Search, Filter & Tambah Member */}
          <div className="bg-[#111319] rounded-2xl p-4 md:p-5 border border-white/[0.08] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama, ID member (TRISIS-...), atau email..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>

            {/* Filter Status */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-zinc-900/80 p-1 rounded-xl border border-white/[0.08]">
                {['ALL', 'Aktif', 'Kadaluarsa'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-zinc-800 text-amber-400 border border-zinc-700/80 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {st === 'ALL' ? 'Semua' : st}
                  </button>
                ))}
              </div>

              {/* Tombol Tambah Member */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Member</span>
              </button>
            </div>
          </div>

          {/* Tabel Member */}
          <div className="bg-[#111319] rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="p-4 md:p-5 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Daftar Anggota Trisis Gym</h3>
                <p className="text-xs text-zinc-400">Total {filteredMembers.length} member ditemukan</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/60 text-zinc-400 font-semibold uppercase tracking-wider text-[10px] border-b border-white/[0.08]">
                  <tr>
                    <th className="py-3 px-4">Member ID & Nama</th>
                    <th className="py-3 px-4">Paket Langganan</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Masa Berlaku</th>
                    <th className="py-3 px-4 text-center">Total Hadir</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-500">
                        Tidak ada member yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-zinc-800/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{m.name}</div>
                          <div className="text-[11px] text-amber-400 font-mono mt-0.5">{m.memberId}</div>
                          <div className="text-[10px] text-zinc-400">{m.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-zinc-200">{m.planName}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            m.status === 'Aktif'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-300 font-medium">
                          {m.validUntil}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-bold text-amber-400 text-sm">{m.totalCheckIns || 0}</span>
                          <span className="text-[10px] text-zinc-500 block">sesi</span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Edit */}
                            <button
                              onClick={() => {
                                setEditingMember({ ...m });
                                setIsEditModalOpen(true);
                              }}
                              title="Edit Member"
                              className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/[0.04]"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            
                            {/* Hapus */}
                            <button
                              onClick={() => handleDeleteMember(m.id, m.name)}
                              title="Hapus Member"
                              className="p-2 rounded-lg bg-zinc-800/60 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer border border-white/[0.04]"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: PRESENSI KASIR & LAPORAN KEHADIRAN (MODUL 9) */}
      {activeAdminTab === 'attendance' && (
        <div className="space-y-4">
          {/* Quick Check-in Kasir Manual Widget */}
          <div className="bg-[#111319] rounded-2xl p-5 md:p-6 border border-white/[0.08]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-white">
                  Verifikasi Presensi Manual Kasir
                </h3>
                <p className="text-xs text-zinc-400">
                  Gunakan form ini jika member lupa membawa smartphone untuk scan QR atau kartu fisik
                </p>
              </div>
            </div>

            <form onSubmit={handleCashierCheckIn} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Pilih Member
                </label>
                <select
                  value={selectedMemberForCheckIn}
                  onChange={(e) => setSelectedMemberForCheckIn(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-400/80"
                >
                  <option value="">-- Pilih Member Hadir --</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.memberId}) — {m.status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Catatan Kasir / Lokasi
                </label>
                <input
                  type="text"
                  value={cashierNotes}
                  onChange={(e) => setCashierNotes(e.target.value)}
                  placeholder="Contoh: Lupa bawa HP / Manual kasir"
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verifikasi Masuk Gym</span>
                </button>
              </div>
            </form>
          </div>

          {/* Rekap Log Check-In Hari Ini & Filter */}
          <div className="bg-[#111319] rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="p-4 md:p-5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">Log Presensi Pintu Masuk / Turnstile</h3>
                <p className="text-xs text-zinc-400">Total {filteredCheckIns.length} rekaman presensi kasir</p>
              </div>

              {/* Filter Hari Ini vs Semua */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-zinc-900/80 p-1 rounded-xl border border-white/[0.08]">
                  <button
                    onClick={() => setCheckInFilterDate('ALL')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      checkInFilterDate === 'ALL'
                        ? 'bg-zinc-800 text-amber-400 border border-zinc-700/80 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Semua Riwayat
                  </button>
                  <button
                    onClick={() => setCheckInFilterDate('TODAY')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      checkInFilterDate === 'TODAY'
                        ? 'bg-zinc-800 text-amber-400 border border-zinc-700/80 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Hari Ini ({todayStr})
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/60 text-zinc-400 font-semibold uppercase tracking-wider text-[10px] border-b border-white/[0.08]">
                  <tr>
                    <th className="py-3 px-4">Waktu & Tanggal</th>
                    <th className="py-3 px-4">Nama & ID Member</th>
                    <th className="py-3 px-4">Metode Presensi</th>
                    <th className="py-3 px-4">Lokasi / Catatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredCheckIns.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-zinc-500">
                        Belum ada rekaman presensi pada filter ini.
                      </td>
                    </tr>
                  ) : (
                    filteredCheckIns.map((chk) => (
                      <tr key={chk.id} className="hover:bg-zinc-800/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{chk.time}</div>
                          <div className="text-[11px] text-zinc-400">{chk.date}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{chk.memberName || 'Budi Santoso'}</div>
                          <div className="text-[10px] text-amber-400 font-mono">{chk.memberId}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            chk.method === 'SCAN_QR_KASIR'
                              ? 'bg-zinc-800 text-zinc-200 border-zinc-700/80'
                              : 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                          }`}>
                            {chk.method === 'SCAN_QR_KASIR' ? '📱 Scan QR Kasir' : '📝 Manual Kasir'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-300">
                          {chk.notes || chk.location}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL: TAMBAH MEMBER BARU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111319] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Tambah Member Baru</h3>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Andi Wijaya"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="andi@gmail.com"
                  value={newMemberForm.email}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">No. WhatsApp / HP</label>
                <input
                  type="tel"
                  placeholder="0812-3456-7890"
                  value={newMemberForm.phone}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Pilihan Paket Membership</label>
                <select
                  value={newMemberForm.planId}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, planId: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                >
                  <option value="reguler">Paket Bulanan Reguler (Rp 250.000 / bln)</option>
                  <option value="mahasiswa">Paket Mahasiswa Pakuan / IPB (Rp 180.000 / bln)</option>
                  <option value="annual">Annual Regular Pass (Rp 2.400.000 / thn)</option>
                  <option value="per_visit">Per-Visit Harian (Rp 35.000 / visit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Masa Berlaku Sampai</label>
                <input
                  type="text"
                  placeholder="Contoh: 15 Maret 2027"
                  value={newMemberForm.validUntil}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, validUntil: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold"
                >
                  Simpan Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL: EDIT MEMBER */}
      {isEditModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111319] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingMember(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
                <Edit3 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">Edit Data Member</h3>
            </div>

            <form onSubmit={handleUpdateMemberSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Nama Member</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Status Keanggotaan</label>
                <select
                  value={editingMember.status}
                  onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Kadaluarsa">Kadaluarsa (Perlu Perpanjangan)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Nama Paket</label>
                <input
                  type="text"
                  value={editingMember.planName}
                  onChange={(e) => setEditingMember({ ...editingMember, planName: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Masa Berlaku Sampai</label>
                <input
                  type="text"
                  value={editingMember.validUntil}
                  onChange={(e) => setEditingMember({ ...editingMember, validUntil: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingMember(null);
                  }}
                  className="py-2 px-4 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
