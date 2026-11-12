import React, { useState, useEffect } from 'react';
import { Code2, Copy, Check } from 'lucide-react';

export default function CodeView({ initialCode, initialLang }) {
  const [code, setCode] = useState(
    initialCode || `# Tulis atau modifikasi kode Python Anda di sini\nnama = "Siswa SMK"\nprint(f"Halo, {nama}!")`
  );
  const [lang, setLang] = useState(initialLang || 'python');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setLang(initialLang || 'python');
    }
  }, [initialCode, initialLang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <h2 className="font-extrabold text-slate-800">
            Code Editor Lanjutan ({lang === 'python' ? 'Python' : 'C++'})
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Tersalin!' : 'Salin Kode'}
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="w-full h-[420px] bg-[#1e1e2e] text-emerald-300 font-mono text-sm p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
      />
    </div>
  );
}
