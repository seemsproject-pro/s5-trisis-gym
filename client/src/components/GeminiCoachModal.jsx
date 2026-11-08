import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Key, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { askGeminiCoach, isGeminiKeyConfigured } from '../services/geminiService';

const SUGGESTIONS = [
  'Berapa jeda istirahat ideal antar set?',
  'Alternatif pengganti dada ayam yang murah?',
  'Boleh minum kopi sebelum latihan di gym?',
  'Tips mengatasi DOMS / pegal setelah leg day?'
];

let messageCounter = 1;
function generateMsgId(prefix = 'msg') {
  messageCounter += 1;
  return `${prefix}_${messageCounter}`;
}

export default function GeminiCoachModal({ 
  isOpen, 
  onClose, 
  profile, 
  workoutSplit, 
  macroEstimates,
  onOpenApiKeyModal 
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'model',
      text: `Halo ${profile?.fullName ? profile.fullName.split(' ')[0] : 'Sobat Trisis'}! 👋 Saya **Coach Trisis AI**. Ada yang ingin kamu tanyakan seputar gerakan latihan, jam makan, atau pemulihan otot hari ini?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const isConfigured = isGeminiKeyConfigured();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const question = (textToSend || input).trim();
    if (!question || loading) return;

    const userMsg = {
      id: generateMsgId('user'),
      role: 'user',
      text: question
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await askGeminiCoach(
        question, 
        { profile, workoutSplit, macroEstimates },
        history
      );

      const botMsg = {
        id: generateMsgId('bot'),
        role: 'model',
        text: res.reply,
        source: res.source
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateMsgId('err'),
          role: 'model',
          text: 'Maaf, terjadi gangguan saat menghubungi Coach Trisis AI. Silakan coba kembali sesaat lagi.',
          source: 'ERROR'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: `Halo kembali! Riwayat percakapan telah dibersihkan. Apa yang ingin kamu diskusikan lagi?`
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#111319] rounded-2xl shadow-2xl border border-white/[0.08] flex flex-col h-[600px] max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coach-modal-title"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-zinc-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/[0.08] text-amber-400 flex items-center justify-center relative">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-[#111319]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="coach-modal-title" className="text-sm font-bold text-white">
                  Coach Trisis AI
                </h2>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  isConfigured 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-zinc-800 text-zinc-300 border-white/[0.08]'
                }`}>
                  {isConfigured ? 'Gemini 1.5 Flash' : 'Smart Mode'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Konsultasi Latihan & Menu Nutrisi</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              title="Bersihkan chat"
              className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenApiKeyModal}
              title="Atur API Key"
              className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#090A0E]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-amber-400 text-neutral-950'
                    : 'bg-zinc-800 text-amber-400 border border-white/[0.08]'
                }`}
              >
                {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-400 text-neutral-950 font-medium rounded-tr-none shadow-sm'
                    : 'bg-[#111319] text-zinc-100 border border-white/[0.08] rounded-tl-none space-y-1'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>
                {msg.source && msg.role === 'model' && (
                  <span className="text-[9px] text-zinc-500 font-medium block pt-1 border-t border-white/[0.06]">
                    Sumber: {msg.source === 'GEMINI' ? '✨ Live Google Gemini 1.5' : '💡 Smart Knowledge Base Trisis'}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/[0.08] text-amber-400 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="bg-[#111319] rounded-xl rounded-tl-none px-4 py-3 border border-white/[0.08] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[11px] text-zinc-400 ml-1.5">Coach Trisis sedang menganalisis...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-[#111319] border-t border-white/[0.08] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          {SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item)}
              disabled={loading}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white text-zinc-300 transition-colors cursor-pointer border border-white/[0.06] shrink-0"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#111319] border-t border-white/[0.08] flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan seputar gerakan atau menu makan..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-zinc-900/80 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-neutral-950 flex items-center justify-center transition-colors cursor-pointer shrink-0 font-bold"
            aria-label="Kirim pesan"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
