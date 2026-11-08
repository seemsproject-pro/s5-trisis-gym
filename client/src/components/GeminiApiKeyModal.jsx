import React, { useState } from 'react';
import { Key, Sparkles, CheckCircle2, AlertCircle, ExternalLink, X, Trash2 } from 'lucide-react';
import { getGeminiApiKey, saveGeminiApiKey, removeGeminiApiKey, testGeminiConnection } from '../services/geminiService';

export default function GeminiApiKeyModal({ isOpen, onClose, onKeySaved }) {
  const [apiKey, setApiKey] = useState(() => getGeminiApiKey());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }

  if (!isOpen) return null;

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Silakan masukkan API key terlebih dahulu.' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    const res = await testGeminiConnection(apiKey.trim());
    setTesting(false);
    setTestResult(res);
  };

  const handleSave = () => {
    saveGeminiApiKey(apiKey.trim());
    if (onKeySaved) onKeySaved(apiKey.trim());
    onClose();
  };

  const handleRemove = () => {
    removeGeminiApiKey();
    setApiKey('');
    setTestResult(null);
    if (onKeySaved) onKeySaved('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#111319] rounded-2xl p-6 shadow-2xl border border-white/[0.08] space-y-5 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gemini-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/[0.08] text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 id="gemini-modal-title" className="text-base font-bold text-white">
                Pengaturan Google Gemini API
              </h2>
              <span className="text-xs text-zinc-400">Aktifkan AI Coach & Analisis Live</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/[0.06] text-xs text-zinc-300 space-y-1 leading-relaxed">
          <p className="font-semibold flex items-center gap-1.5 text-amber-400">
            <Key className="w-3.5 h-3.5" />
            Menggunakan Model Gemini 1.5 Flash
          </p>
          <p className="text-[11px] text-zinc-400">
            API key Anda disimpan secara aman hanya di penyimpanan peramban lokal (localStorage) perangkat ini. Tidak dikirim ke server backend publik.
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline pt-1"
          >
            Dapatkan API Key Gratis di Google AI Studio
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Input Field */}
        <div className="space-y-1.5">
          <label htmlFor="gemini-key-input" className="text-xs font-semibold text-zinc-300 block">
            Gemini API Key
          </label>
          <input
            id="gemini-key-input"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-zinc-900/80 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 font-mono transition-colors"
          />
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
              testResult.success
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-950/40 text-rose-300 border border-rose-500/20'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <span className="text-[11px] leading-relaxed">{testResult.message}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] gap-2">
          {apiKey ? (
            <button
              onClick={handleRemove}
              type="button"
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/20 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Key</span>
            </button>
          ) : <span />}

          <div className="flex items-center gap-2">
            <button
              onClick={handleTest}
              type="button"
              disabled={testing || !apiKey.trim()}
              className="px-3.5 py-2 rounded-xl border border-white/[0.08] text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {testing ? 'Menguji...' : 'Uji Koneksi'}
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold cursor-pointer transition-colors"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
