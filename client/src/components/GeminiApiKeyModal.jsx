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
        className="w-full max-w-md bg-[#131520] rounded-3xl p-6 shadow-2xl border border-white/10 space-y-5 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gemini-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-purple-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 id="gemini-modal-title" className="text-base font-extrabold text-white">
                Pengaturan Google Gemini API
              </h2>
              <span className="text-xs text-slate-400">Aktifkan AI Coach & Analisis Live</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 space-y-1 leading-relaxed">
          <p className="font-semibold flex items-center gap-1.5 text-amber-300">
            <Key className="w-3.5 h-3.5" />
            Menggunakan Model Gemini 1.5 Flash
          </p>
          <p className="text-[11px] text-slate-400">
            API key Anda disimpan secara aman hanya di penyimpanan peramban lokal (localStorage) perangkat ini. Tidak dikirim ke server backend publik.
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 underline pt-1"
          >
            Dapatkan API Key Gratis di Google AI Studio
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Input Field */}
        <div className="space-y-1.5">
          <label htmlFor="gemini-key-input" className="text-xs font-bold text-slate-300 block">
            Gemini API Key
          </label>
          <input
            id="gemini-key-input"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:bg-white/10 font-mono"
          />
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-start gap-2 ${
              testResult.success
                ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/40'
                : 'bg-rose-950/50 text-rose-300 border border-rose-800/40'
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
        <div className="flex items-center justify-between pt-2 border-t border-white/10 gap-2">
          {apiKey ? (
            <button
              onClick={handleRemove}
              type="button"
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/50 border border-transparent hover:border-rose-900/40 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Hapus Key
            </button>
          ) : <span />}

          <div className="flex items-center gap-2">
            <button
              onClick={handleTest}
              type="button"
              disabled={testing || !apiKey.trim()}
              className="px-3.5 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {testing ? 'Menguji...' : 'Uji Koneksi'}
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#5D4E75] hover:bg-[#6D5D88] text-white text-xs font-bold shadow-md border border-purple-400/30 cursor-pointer transition-colors"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
