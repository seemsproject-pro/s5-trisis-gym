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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gemini-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="gemini-modal-title" className="text-base font-extrabold text-slate-900">
                Pengaturan Google Gemini API
              </h2>
              <span className="text-xs text-slate-400">Aktifkan AI Coach & Analisis Live</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-purple-950 space-y-1 leading-relaxed">
          <p className="font-semibold flex items-center gap-1.5 text-[#6D28D9]">
            <Key className="w-3.5 h-3.5" />
            Menggunakan Model Gemini 1.5 Flash
          </p>
          <p className="text-[11px] text-slate-600">
            API key Anda disimpan secara aman hanya di penyimpanan peramban lokal (localStorage) perangkat ini. Tidak dikirim ke server backend publik.
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6D28D9] hover:underline pt-1"
          >
            Dapatkan API Key Gratis di Google AI Studio
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Input Field */}
        <div className="space-y-1.5">
          <label htmlFor="gemini-key-input" className="text-xs font-bold text-slate-700 block">
            Gemini API Key
          </label>
          <input
            id="gemini-key-input"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent font-mono"
          />
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-start gap-2 ${
              testResult.success
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <span className="text-[11px] leading-relaxed">{testResult.message}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
          {apiKey ? (
            <button
              onClick={handleRemove}
              type="button"
              className="px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-1.5 cursor-pointer transition-colors"
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
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {testing ? 'Menguji...' : 'Uji Koneksi'}
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md shadow-purple-500/20 cursor-pointer transition-colors"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
