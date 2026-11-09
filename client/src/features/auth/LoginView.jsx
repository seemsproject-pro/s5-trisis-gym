import React, { useState, useEffect } from 'react';
import { KeyRound, Mail, ArrowRight, ShieldCheck, ArrowLeft, Zap, X, AlertCircle, Settings, ExternalLink, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { apiService } from '../../services/apiService';
import { getGoogleClientId, setGoogleClientId, isGoogleClientConfigured, triggerGoogleOAuth } from '../../utils/googleAuth';
import GoogleCloudConfigModal from '../../components/GoogleCloudConfigModal';

export default function LoginView({ onLoginSuccess, onBackToLanding, onOpenRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Google Cloud Console OAuth State
  const [isGoogleConfigModalOpen, setIsGoogleConfigModalOpen] = useState(false);
  const [customClientIdInput, setCustomClientIdInput] = useState('');
  const [currentClientId, setCurrentClientId] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const id = getGoogleClientId();
    setCurrentClientId(id);
    setCustomClientIdInput(id);

    // Inisialisasi Google Identity Services jika SDK dan Client ID tersedia
    if (id && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: id,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      } catch (e) {
        console.warn('GIS initialize warning:', e.message);
      }
    }
  }, []);

  // Callback dari Google Identity Services saat pengguna memilih akun di Google
  const handleGoogleCredentialResponse = async (response) => {
    if (!response || !response.credential) {
      setError('Gagal menerima kredensial dari Google Cloud.');
      return;
    }

    setGoogleLoading(true);
    setError('');

    try {
      const result = await apiService.googleLogin({
        credential: response.credential
      });

      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setError(result.message || 'Verifikasi akun Google gagal.');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat otentikasi Google.');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handler Klik Tombol Masuk dengan Google (Google Cloud Console OAuth 2.0)
  const handleGoogleSignInClick = () => {
    setError('');

    if (!isGoogleClientConfigured()) {
      setIsGoogleConfigModalOpen(true);
      return;
    }

    setGoogleLoading(true);
    triggerGoogleOAuth({
      onSuccess: async (googleData) => {
        try {
          const result = await apiService.googleLogin(googleData);
          if (result.success && result.user) {
            onLoginSuccess(result.user);
          } else {
            setError(result.message || 'Login Google gagal diverifikasi di server.');
          }
        } catch (err) {
          setError(err.message || 'Gagal memproses login Google.');
        } finally {
          setGoogleLoading(false);
        }
      },
      onError: (err) => {
        setGoogleLoading(false);
        setError(err.message || 'Autentikasi Google Cloud gagal atau dibatalkan.');
      }
    });
  };

  // Handler Login Email & Sandi Standar
  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password.trim()) {
      setError('Harap masukkan alamat email dan kata sandi.');
      setLoading(false);
      return;
    }

    try {
      const result = await apiService.login(cleanEmail, password.trim());
      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setError(result.message || 'Login gagal. Silakan periksa kredensial Anda.');
      }
    } catch (err) {
      setError(err.message || 'Login gagal. Silakan periksa kembali email dan kata sandi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-zinc-100 flex flex-col justify-center px-4 py-8 relative">
      <div className="w-full max-w-sm mx-auto space-y-5">
        {/* Tombol Kembali ke Halaman Utama / Profil Gym */}
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda Gym</span>
          </button>
        )}

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-900 border border-amber-400/30 flex items-center justify-center overflow-hidden p-1 shadow-lg shadow-amber-400/15 animate-float-slow">
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

        {/* Card Login */}
        <div className="bg-[#111319] border border-white/[0.08] rounded-2xl p-6 md:p-7 space-y-4 shadow-xl">
          <div>
            <h2 className="text-base font-bold text-white">Masuk ke Portal Member</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Autentikasi akun Anda untuk mengakses dashboard.</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. TOMBOL UTAMA: GOOGLE CLOUD CONSOLE OAUTH 2.0 */}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={handleGoogleSignInClick}
              disabled={googleLoading}
              className="w-full min-h-[44px] rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md shadow-white/5 active:scale-[0.99] disabled:opacity-50"
            >
              {googleLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                  <span>Menghubungkan ke Google...</span>
                </>
              ) : (
                <>
                  {/* Multicolored Google 'G' SVG Logo */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Masuk dengan Google</span>
                </>
              )}
            </button>

            {/* Quick Link Konfigurasi Google Cloud Console Client ID */}
            <div className="flex items-center justify-between px-1 text-[10px] text-zinc-500">
              <span className="flex items-center gap-1">
                {isGoogleClientConfigured() ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400/90 font-medium">Google Cloud OAuth Aktif</span>
                  </>
                ) : (
                  <span>Google Cloud OAuth 2.0</span>
                )}
              </span>
              <button
                type="button"
                onClick={() => setIsGoogleConfigModalOpen(true)}
                className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline flex items-center gap-1"
              >
                <Settings className="w-2.5 h-2.5" />
                <span>Atur Client ID</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 pt-1">
            <div className="h-[1px] bg-white/[0.08] flex-1" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">atau dengan email</span>
            <div className="h-[1px] bg-white/[0.08] flex-1" />
          </div>

          {/* 2. FORM LOGIN EMAIL & KATA SANDI */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
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
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-400/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Memverifikasi Akun...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* 3. PROMPT DAFTAR MEMBER BARU */}
          {onOpenRegister && (
            <div className="p-3 rounded-xl bg-amber-400/[0.05] border border-amber-400/20 text-center space-y-1">
              <span className="text-[11px] text-zinc-400 block">Belum punya kartu member Trisis Gym?</span>
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
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2 justify-center text-xs text-zinc-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Autentikasi Aman • Trisis Gym Bogor</span>
        </div>
      </div>

      {/* MODAL SETUP GOOGLE CLOUD CONSOLE OAUTH 2.0 */}
      <GoogleCloudConfigModal
        isOpen={isGoogleConfigModalOpen}
        onClose={() => setIsGoogleConfigModalOpen(false)}
        onSaved={(newId) => {
          setCurrentClientId(newId);
          setTimeout(() => {
            handleGoogleSignInClick();
          }, 200);
        }}
      />
    </div>
  );
}
