import React, { useState } from 'react';
import { KeyRound, Mail, ArrowRight, ShieldCheck, Sparkles, ArrowLeft, Zap } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { mockDataService } from '../../services/mockData';

export default function LoginView({ onLoginSuccess, onBackToLanding, onOpenRegister }) {
  const [email, setEmail] = useState('budi.santoso@trisisgym.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !password.trim()) {
        setError('Harap masukkan email dan kata sandi.');
        setLoading(false);
        return;
      }

      if (cleanEmail.includes('admin')) {
        onLoginSuccess({
          id: 'usr_admin_001',
          name: 'Admin Trisis Gym',
          email: 'admin@trisisgym.com',
          memberId: 'TRISIS-STAFF-001',
          role: 'admin'
        });
      } else {
        const members = mockDataService.getMembers();
        const found = members.find(
          (m) => m.email?.toLowerCase() === cleanEmail || m.memberId?.toLowerCase() === cleanEmail
        );

        if (found) {
          onLoginSuccess({
            id: found.id,
            name: found.name,
            email: found.email,
            phone: found.phone,
            memberId: found.memberId,
            planName: found.planName,
            validUntil: found.validUntil,
            role: 'member'
          });
        } else {
          onLoginSuccess({
            id: 'usr_m_089',
            name: 'Budi Santoso',
            email: cleanEmail,
            memberId: 'TRISIS-2026-089',
            planName: 'Paket Bulanan (Monthly Pass)',
            validUntil: '10 Feb 2027',
            role: 'member'
          });
        }
      }
      setLoading(false);
    }, 350);
  };

  const handleQuickDemoLogin = () => {
    setEmail('budi.santoso@trisisgym.com');
    setPassword('password123');
    onLoginSuccess({
      id: 'usr_m_089',
      name: 'Budi Santoso',
      email: 'budi.santoso@trisisgym.com',
      memberId: 'TRISIS-2026-089',
      role: 'member'
    });
  };

  const handleQuickAdminLogin = () => {
    setEmail('admin@trisisgym.com');
    setPassword('admin1234');
    onLoginSuccess({
      id: 'usr_admin_001',
      name: 'Admin Trisis Gym',
      email: 'admin@trisisgym.com',
      memberId: 'TRISIS-STAFF-001',
      role: 'admin'
    });
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-zinc-100 flex flex-col justify-center px-4 py-8">
      <div className="w-full max-w-sm mx-auto space-y-5">
        {/* Back to Gym Profile button if callback provided */}
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
        )}

        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#111319] border border-white/[0.08] flex items-center justify-center overflow-hidden p-2">
            <img src="/logo.png" alt="Trisis Gym Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              TRISIS <span className="text-amber-400 font-black">GYM</span>
            </h1>
            <p className="text-xs text-zinc-400 font-medium">Est. Bogor, Indonesia • Member Portal</p>
          </div>
          <div className="inline-block pt-0.5">
            <StatusBadge status="AKTIF" size="sm" />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#111319] border border-white/[0.08] rounded-2xl p-6 md:p-7 space-y-5">
          <div>
            <h2 className="text-base font-bold text-white">Masuk ke Akun</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Akses portal dashboard resmi Trisis Gym.</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="budi.santoso@trisisgym.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/80 border border-white/[0.08] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/80 border border-white/[0.08] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Standard Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[44px] rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/[0.08] transition-colors cursor-pointer"
            >
              {loading ? 'Memverifikasi...' : 'Masuk ke Akun'}
            </button>
          </form>

          {/* Belum punya akun? Daftar Member */}
          {onOpenRegister && (
            <div className="p-3 rounded-xl bg-amber-400/[0.05] border border-amber-400/20 text-center space-y-1">
              <span className="text-[11px] text-zinc-400 block">Belum terdaftar sebagai anggota gym?</span>
              <button
                type="button"
                onClick={onOpenRegister}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Daftar Member Baru Sekarang</span>
              </button>
            </div>
          )}

          {/* Quick 1-Click Access */}
          <div className="pt-3 border-t border-white/[0.08] space-y-2">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-neutral-950" />
              <span>Masuk Cepat Member (Budi Santoso)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="w-full min-h-[44px] rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-2 border border-white/[0.08] transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Masuk Cepat Admin (Staff / Kasir Gym)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-zinc-500 pt-1 font-medium">
              Pilih akses instan untuk pengujian portal.
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2 justify-center text-xs text-zinc-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Portal Member Resmi • Trisis Gym Centre Bogor</span>
        </div>
      </div>
    </div>
  );
}
