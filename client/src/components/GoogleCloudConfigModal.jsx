import React, { useState } from 'react';
import { Settings, ExternalLink, X, ShieldCheck, CheckCircle2, AlertCircle, Copy, Trash2 } from 'lucide-react';
import { getGoogleClientId, setGoogleClientId } from '../utils/googleAuth';

export default function GoogleCloudConfigModal({ isOpen, onClose, onSaved }) {
  const [clientIdInput, setClientIdInput] = useState(() => getGoogleClientId());
  const [copiedOrigin, setCopiedOrigin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';

  const handleCopyOrigin = () => {
    navigator.clipboard?.writeText(currentOrigin);
    setCopiedOrigin(true);
    setTimeout(() => setCopiedOrigin(false), 2000);
  };

  const handleSave = (e) => {
    e?.preventDefault();
    const clean = clientIdInput.trim();

    if (!clean) {
      setErrorMsg('Client ID tidak boleh kosong.');
      return;
    }

    if (!clean.includes('.apps.googleusercontent.com')) {
      setErrorMsg('Format Client ID harus berakhiran ".apps.googleusercontent.com" dari Google Cloud Console.');
      return;
    }

    setGoogleClientId(clean);
    setErrorMsg('');
    if (onSaved) onSaved(clean);
    onClose();
  };

  const handleClear = () => {
    setGoogleClientId('');
    setClientIdInput('');
    setErrorMsg('');
    if (onSaved) onSaved('');
  };

  const handleUseTemplate = () => {
    const template = '1082647712392-80kmlq3jrq2v9296q9f0nflk6g1r602b.apps.googleusercontent.com';
    setClientIdInput(template);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#111319] border border-white/[0.12] rounded-2xl shadow-2xl p-5 md:p-6 space-y-4 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/[0.1] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Google Cloud Console OAuth 2.0
              </h3>
              <p className="text-[11px] text-zinc-400">
                Setup resmi autentikasi Login & Registrasi Akun Member Trisis Gym
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Petunjuk Pengambilan di Google Cloud Console */}
        <div className="space-y-2.5 text-xs text-zinc-300">
          <p className="leading-relaxed text-[11.5px]">
            Fitur login dan pembuatan akun Google ini terhubung langsung dengan <strong>Google Identity Services SDK</strong> dan <strong>Google Cloud Console</strong> resmi tanpa data dummy.
          </p>

          <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/[0.08] space-y-2 text-[11px]">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <span>Langkah Pengaturan di Google Cloud Console:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-zinc-300">
              <li>
                Buka panel:{' '}
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 font-semibold underline inline-flex items-center gap-0.5 hover:text-amber-300"
                >
                  console.cloud.google.com/apis/credentials <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                Pilih proyek Anda &rarr; Klik <strong>+ CREATE CREDENTIALS</strong> &rarr; <strong>OAuth client ID</strong>
              </li>
              <li>
                Pilih Application type: <strong>Web application</strong>
              </li>
              <li>
                Di bagian <strong>Authorized JavaScript origins</strong>, daftarkan origin ini:
                <div className="mt-1 flex items-center gap-2">
                  <code className="px-2 py-1 rounded bg-black/70 border border-white/10 font-mono text-[10px] text-amber-300">
                    {currentOrigin}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyOrigin}
                    className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[10px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedOrigin ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedOrigin ? 'Tersalin' : 'Salin Origin'}</span>
                  </button>
                </div>
              </li>
              <li>
                Salin <strong>Client ID</strong> (format: <code className="text-zinc-200">*.apps.googleusercontent.com</code>) lalu tempelkan di bawah.
              </li>
            </ol>
          </div>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSave} className="space-y-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-zinc-200 mb-1">
              OAuth 2.0 Web Client ID:
            </label>
            <input
              type="text"
              value={clientIdInput}
              onChange={(e) => {
                setClientIdInput(e.target.value);
                setErrorMsg('');
              }}
              placeholder="Contoh: 1082647712392-xxxx.apps.googleusercontent.com"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
              required
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUseTemplate}
                className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition-colors"
              >
                Gunakan Template Format
              </button>
              {clientIdInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-white/[0.06] text-xs font-semibold transition-colors flex items-center gap-1"
                  title="Hapus Client ID tersimpan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer"
            >
              Simpan & Aktifkan
            </button>
          </div>
        </form>

        <div className="flex items-center gap-1.5 justify-center text-[10px] text-zinc-500 pt-1 border-t border-white/[0.04]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Client ID disimpan secara lokal di browser Anda atau via environment VITE_GOOGLE_CLIENT_ID</span>
        </div>
      </div>
    </div>
  );
}
