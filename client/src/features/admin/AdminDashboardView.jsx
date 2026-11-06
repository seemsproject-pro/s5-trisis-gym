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
  X
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { mockDataService } from '../../services/mockData';

export default function AdminDashboardView({ onSwitchToMemberView, showToast }) {
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
      <section className="bg-gradient-to-r from-[#171426] via-[#1A162B] to-[#12131F] rounded-3xl p-5 md:p-6 border border-amber-400/30 shadow-[0_4px_28px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/40 text-amber-400 flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                  Panel Kontrol Pengelola & Kasir
                </h1>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Atur pengumuman, kapasitas operasional gym, data member, dan meja kasir.
              </p>
            </div>
          </div>

          {/* Quick Switch to Member View */}
          <button
            onClick={onSwitchToMemberView}
            className="self-start sm:self-auto py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Pratinjau Layar Member</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Status Gym</span>
              <span className={`w-2.5 h-2.5 rounded-full ${gymSettings.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
            </div>
            <p className={`text-base font-extrabold ${gymSettings.isOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
              {gymSettings.isOpen ? 'BUKA OPERASIONAL' : 'TUTUP SEMENTARA'}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Pengunjung Aktif</span>
              <Users className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-base font-extrabold text-white">
              {gymSettings.currentOccupancy} <span className="text-xs font-normal text-slate-400">/ {gymSettings.maxCapacity} Org</span>
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Total Member</span>
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <p className="text-base font-extrabold text-white">
              {adminStats.totalMembers} <span className="text-xs font-normal text-emerald-400">({adminStats.activeMembers} Aktif)</span>
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Presensi Hari Ini</span>
              <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-base font-extrabold text-amber-300">
              {adminStats.todayCheckInsCount} <span className="text-xs font-normal text-slate-400">Check-In</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Admin Navigation Tabs */}
      <div className="flex items-center gap-2 p-1 bg-[#131520] rounded-2xl border border-white/10 max-w-full overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'settings'
              ? 'bg-[#2A213D] text-amber-300 border border-amber-400/40 shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Kontrol Dashboard Utama</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('members')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'members'
              ? 'bg-[#2A213D] text-amber-300 border border-amber-400/40 shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Kelola Member ({members.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('attendance')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeAdminTab === 'attendance'
              ? 'bg-[#2A213D] text-amber-300 border border-amber-400/40 shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Presensi Kasir ({checkIns.length})</span>
        </button>
      </div>

      {/* 3. TAB 1: KONTROL OPERASIONAL & DASHBOARD UTAMA */}
      {activeAdminTab === 'settings' && (
        <form onSubmit={handleSaveGymSettings} className="space-y-4">
          <div className="bg-[#131520] rounded-3xl p-5 md:p-6 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 flex items-center justify-center">
                  <Megaphone className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-extrabold text-white">
                    Siaran Pengumuman & Banner Member
                  </h2>
                  <p className="text-xs text-slate-400">
                    Pesan yang tampil mencolok di bagian atas dashboard seluruh member
                  </p>
                </div>
              </div>

              {/* Toggle Aktifkan Banner */}
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs font-bold text-slate-300">Tampilkan Banner:</span>
                <input
                  type="checkbox"
                  checked={formData.announcementActive}
                  onChange={(e) => setFormData({ ...formData, announcementActive: e.target.checked })}
                  className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Teks Pengumuman Siaran Langsung
              </label>
              <textarea
                rows={3}
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                placeholder="Contoh: Pemberitahuan: Sesi kelas Functional & HIIT hari Jumat pukul 16.30 WIB..."
                className="w-full bg-[#0B0D14] border border-white/15 rounded-2xl p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Jam Operasional & Status Buka Gym */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#131520] rounded-3xl p-5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Status & Jam Buka</h3>
                </div>
                
                {/* Toggle Buka/Tutup Gym */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isOpen: !formData.isOpen })}
                  className={`py-1.5 px-3 rounded-full text-xs font-black cursor-pointer transition-all ${
                    formData.isOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {formData.isOpen ? '● GYM BUKA' : '○ GYM TUTUP'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Jam Buka Operasional
                </label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Pelatih / Staff Bertugas Hari Ini
                </label>
                <input
                  type="text"
                  value={formData.trainerOnDuty}
                  onChange={(e) => setFormData({ ...formData, trainerOnDuty: e.target.value })}
                  placeholder="Nama pelatih bertugas..."
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Kontrol Kepadatan Pengunjung (Live Crowd) */}
            <div className="bg-[#131520] rounded-3xl p-5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold text-white">Okupansi & Kepadatan Realtime</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold bg-white/5 px-2 py-0.5 rounded-md">
                  Tampil di Dashboard
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Orang di Gym Saat Ini
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={formData.maxCapacity * 2}
                    value={formData.currentOccupancy}
                    onChange={(e) => setFormData({ ...formData, currentOccupancy: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Kapasitas Maksimal
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) || 50 })}
                    className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Status Jam Padat / Lengang */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Status Kepadatan Sesi
                </label>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {[
                    { id: 'pagi', label: 'Pagi (Lengang)' },
                    { id: 'siang', label: 'Siang (Sedang)' },
                    { id: 'sore', label: 'Sore (Peak Hour)' },
                    { id: 'malam', label: 'Malam (Normal)' }
                  ].map((crowd) => (
                    <button
                      key={crowd.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, currentCrowdStatus: crowd.id })}
                      className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.currentCrowdStatus === crowd.id
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/60 shadow-xs'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
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
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Pengaturan berhasil disimpan ke Dashboard Member!
              </span>
            )}
            <button
              type="submit"
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-900/30 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan ke Dashboard Utama</span>
            </button>
          </div>
        </form>
      )}

      {/* 4. TAB 2: MANAJEMEN MEMBER (MODUL 9) */}
      {activeAdminTab === 'members' && (
        <div className="space-y-4">
          {/* Controls: Search, Filter & Tambah Member */}
          <div className="bg-[#131520] rounded-3xl p-4 md:p-5 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama, ID member (TRISIS-...), atau email..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full bg-[#0B0D14] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Filter Status */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#0B0D14] p-1 rounded-2xl border border-white/10">
                {['ALL', 'Aktif', 'Kadaluarsa'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-white/10 text-amber-300'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st === 'ALL' ? 'Semua' : st}
                  </button>
                ))}
              </div>

              {/* Tombol Tambah Member */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="py-2.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shrink-0 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Member</span>
              </button>
            </div>
          </div>

          {/* Tabel Member */}
          <div className="bg-[#131520] rounded-3xl border border-white/10 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">Daftar Anggota Trisis Gym</h3>
                <p className="text-xs text-slate-400">Total {filteredMembers.length} member ditemukan</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Member ID & Nama</th>
                    <th className="py-3 px-4">Paket Langganan</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Masa Berlaku</th>
                    <th className="py-3 px-4 text-center">Total Hadir</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        Tidak ada member yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{m.name}</div>
                          <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">{m.memberId}</div>
                          <div className="text-[10px] text-slate-500">{m.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-200">{m.planName}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            m.status === 'Aktif'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 font-medium">
                          {m.validUntil}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-black text-amber-300 text-sm">{m.totalCheckIns || 0}</span>
                          <span className="text-[10px] text-slate-500 block">sesi</span>
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
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            
                            {/* Hapus */}
                            <button
                              onClick={() => handleDeleteMember(m.id, m.name)}
                              title="Hapus Member"
                              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
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
          <div className="bg-[#131520] rounded-3xl p-5 md:p-6 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white">
                  Verifikasi Presensi Manual Kasir
                </h3>
                <p className="text-xs text-slate-400">
                  Gunakan form ini jika member lupa membawa smartphone untuk scan QR atau kartu fisik
                </p>
              </div>
            </div>

            <form onSubmit={handleCashierCheckIn} className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Pilih Member
                </label>
                <select
                  value={selectedMemberForCheckIn}
                  onChange={(e) => setSelectedMemberForCheckIn(e.target.value)}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
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
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Catatan Kasir / Lokasi
                </label>
                <input
                  type="text"
                  value={cashierNotes}
                  onChange={(e) => setCashierNotes(e.target.value)}
                  placeholder="Contoh: Lupa bawa HP / Manual kasir"
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verifikasi Masuk Gym</span>
                </button>
              </div>
            </form>
          </div>

          {/* Rekap Log Check-In Hari Ini & Filter */}
          <div className="bg-[#131520] rounded-3xl border border-white/10 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="p-4 md:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-extrabold text-white">Log Presensi Pintu Masuk / Turnstile</h3>
                <p className="text-xs text-slate-400">Total {filteredCheckIns.length} rekaman presensi kasir</p>
              </div>

              {/* Filter Hari Ini vs Semua */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#0B0D14] p-1 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setCheckInFilterDate('ALL')}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      checkInFilterDate === 'ALL'
                        ? 'bg-white/10 text-amber-300'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Semua Riwayat
                  </button>
                  <button
                    onClick={() => setCheckInFilterDate('TODAY')}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      checkInFilterDate === 'TODAY'
                        ? 'bg-white/10 text-amber-300'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Hari Ini ({todayStr})
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Waktu & Tanggal</th>
                    <th className="py-3 px-4">Nama & ID Member</th>
                    <th className="py-3 px-4">Metode Presensi</th>
                    <th className="py-3 px-4">Lokasi / Catatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCheckIns.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">
                        Belum ada rekaman presensi pada filter ini.
                      </td>
                    </tr>
                  ) : (
                    filteredCheckIns.map((chk) => (
                      <tr key={chk.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-extrabold text-white">{chk.time}</div>
                          <div className="text-[11px] text-slate-400">{chk.date}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{chk.memberName || 'Budi Santoso'}</div>
                          <div className="text-[10px] text-amber-400 font-mono">{chk.memberId}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            chk.method === 'SCAN_QR_KASIR'
                              ? 'bg-purple-950/70 text-purple-200 border border-purple-500/30'
                              : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                          }`}>
                            {chk.method === 'SCAN_QR_KASIR' ? '📱 Scan QR Kasir' : '📝 Manual Kasir'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
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
          <div className="bg-[#131520] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </div>
              <h3 className="text-base font-extrabold text-white">Tambah Member Baru</h3>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Andi Wijaya"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="andi@gmail.com"
                  value={newMemberForm.email}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">No. WhatsApp / HP</label>
                <input
                  type="tel"
                  placeholder="0812-3456-7890"
                  value={newMemberForm.phone}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Pilihan Paket Membership</label>
                <select
                  value={newMemberForm.planId}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, planId: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="reguler">Paket Bulanan Reguler (Rp 250.000 / bln)</option>
                  <option value="mahasiswa">Paket Mahasiswa Pakuan / IPB (Rp 180.000 / bln)</option>
                  <option value="annual">Annual Regular Pass (Rp 2.400.000 / thn)</option>
                  <option value="per_visit">Per-Visit Harian (Rp 35.000 / visit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Masa Berlaku Sampai</label>
                <input
                  type="text"
                  placeholder="Contoh: 15 Maret 2027"
                  value={newMemberForm.validUntil}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, validUntil: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black"
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
          <div className="bg-[#131520] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-4">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingMember(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl bg-purple-400/10 border border-purple-400/30 text-purple-400 flex items-center justify-center">
                <Edit3 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-extrabold text-white">Edit Data Member</h3>
            </div>

            <form onSubmit={handleUpdateMemberSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Member</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Status Keanggotaan</label>
                <select
                  value={editingMember.status}
                  onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Kadaluarsa">Kadaluarsa (Perlu Perpanjangan)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Paket</label>
                <input
                  type="text"
                  value={editingMember.planName}
                  onChange={(e) => setEditingMember({ ...editingMember, planName: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Masa Berlaku Sampai</label>
                <input
                  type="text"
                  value={editingMember.validUntil}
                  onChange={(e) => setEditingMember({ ...editingMember, validUntil: e.target.value })}
                  className="w-full bg-[#0B0D14] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingMember(null);
                  }}
                  className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-black"
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
