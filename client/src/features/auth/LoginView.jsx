import React, { useState } from 'react';
import { KeyRound, Mail, ArrowRight, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

export default function LoginView({ onLoginSuccess, onBackToLanding }) {
  const [email, setEmail] = useState('budi.member@trisisgym.demo');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (!email.trim() || !password.trim()) {
        setError('Harap masukkan email dan kata sandi demo.');
        setLoading(false);
        return;
      }

      onLoginSuccess({
        id: 'usr_demo_089',
        name: 'Budi Santoso',
        email: email,
        memberId: 'TRISIS-DEMO-2026-089'
      });
      setLoading(false);
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setEmail('budi.member@trisisgym.demo');
    setPassword('demo1234');
    onLoginSuccess({
      id: 'usr_demo_089',
      name: 'Budi Santoso',
      email: 'budi.member@trisisgym.demo',
      memberId: 'TRISIS-DEMO-2026-089'
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0D14] text-slate-100 flex flex-col justify-center px-4 py-8">
      <div className="w-full max-w-sm mx-auto space-y-5">
        {/* Back to Gym Profile button if callback provided */}
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Profil Gym</span>
          </button>
        )}

        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 border-2 border-amber-400/50 flex items-center justify-center shadow-md overflow-hidden p-1.5 ring-4 ring-amber-400/10">
            <img src="/logo.png" alt="Trisis Gym Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              TRISIS <span className="text-amber-400 font-black">GYM</span>
            </h1>
            <p className="text-xs text-slate-400 font-semibold tracking-wide">Est. Bogor, Indonesia • Member Portal</p>
          </div>
          <div className="inline-block pt-0.5">
            <StatusBadge status="DEMO" size="sm" />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#131520] border border-white/10 rounded-3xl p-6 md:p-7 shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-5">
          <div>
            <h2 className="text-base font-extrabold text-white">Masuk ke Akun</h2>
            <p className="text-xs text-slate-400 mt-0.5">Akses portal dashboard akun demo member.</p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Alamat Email Demo
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="budi.member@trisisgym.demo"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/10 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Kata Sandi Demo
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400/60 focus:bg-white/10 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Standard Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[46px] rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
            >
              {loading ? 'Memverifikasi...' : 'Masuk dengan Kredensial'}
            </button>
          </form>

          {/* Quick Demo 1-Click Access */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full min-h-[48px] rounded-2xl bg-[#5D4E75] hover:bg-[#6D5D88] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 border border-purple-400/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Masuk Cepat Demo (Budi Santoso)
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">
              Langsung masuk tanpa perlu mengetik manual.
            </p>
          </div>
        </div>

        {/* Security & Prototype Notice */}
        <div className="flex items-center gap-2 justify-center text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Fase 6A: Frontend Demo dengan Data Sintetis</span>
        </div>
      </div>
    </div>
  );
}
