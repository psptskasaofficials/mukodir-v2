import React, { useState } from 'react';
import { BotMessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import { askMukodirAI } from '../utils/aiService';

export default function AITutorWidget({ currentContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Halo! Saya Asisten AI MUKODIR. Bingung menyusun blok algoritma atau menemukan error? Tanyakan di sini!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const contextInfo = currentContext ? `\n[Konteks aktivitas siswa saat ini: ${currentContext}]` : '';
      const reply = await askMukodirAI('chat', { message: userText + contextInfo });
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', text: `⚠️ Kendala koneksi AI: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-20 md:bottom-6 right-4 w-[calc(100%-2rem)] sm:w-96 h-[430px] bg-white rounded-3xl border border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-extrabold text-sm">MUKODIR AI Tutor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-indigo-500 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 text-slate-400 px-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" /> AI sedang berpikir...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya logika atau error..."
              className="flex-1 bg-slate-100 px-3 py-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-indigo-600 text-white p-2.5 rounded-xl disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-full shadow-lg shadow-indigo-600/30 z-40 flex items-center gap-2 active:scale-95 transition-transform"
          title="Tanya AI Tutor"
        >
          <BotMessageSquare className="w-5 h-5" />
          <span className="text-xs font-extrabold pr-1 hidden sm:inline">Tanya AI</span>
        </button>
      )}
    </>
  );
}
