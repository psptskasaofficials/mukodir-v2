import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Map, Blocks, Code2, Sparkles, Info, CheckCircle2, XCircle, RotateCcw, Star } from 'lucide-react';
import { QUIZ_BANK } from './data/missions';
import QuestMapView from './components/QuestMapView';
import DrillView from './components/DrillView';
import CodeView from './components/CodeView';

const MateriView = () => {
  const [activeTopic, setActiveTopic] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const topics = [
    { title: "1. Pengantar Algoritma", desc: "Algoritma adalah urutan langkah logis untuk menyelesaikan masalah dari atas ke bawah secara terstruktur." },
    { title: "2. Variabel & Tipe Data", desc: "Variabel adalah wadah penyimpan data di memori (RAM) dengan tipe Integer (bulat), Float (desimal), String (teks), dan Boolean (True/False)." },
    { title: "3. Operator Logika", desc: "Operator membandingkan nilai menggunakan == (sama dengan), != (tidak sama), >= (lebih besar atau sama dengan)." },
    { title: "4. Percabangan (IF)", desc: "Percabangan memilih jalur eksekusi berdasarkan kondisi yang bernilai True atau False." },
    { title: "5. Perulangan (WHILE)", desc: "Perulangan mengulang blok instruksi selama syarat kondisi masih terpenuhi, wajib memiliki pengubah nilai agar tidak terjadi Infinite Loop." }
  ];

  const currentQuizList = QUIZ_BANK[activeTopic] || QUIZ_BANK[0];
  const currentQuiz = currentQuizList[quizIdx % currentQuizList.length];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-200 shadow-sm">
      <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:pr-4 lg:border-r border-slate-100 no-scrollbar">
        <h3 className="hidden lg:block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Modul Materi</h3>
        {topics.map((t, i) => (
          <button
            key={i}
            onClick={() => { setActiveTopic(i); setQuizIdx(0); setSelectedAnswer(null); }}
            className={`text-left px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap lg:whitespace-normal shrink-0 ${
              activeTopic === i ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-50 lg:bg-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="lg:col-span-8 space-y-5">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-2">{topics[activeTopic].title}</h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">{topics[activeTopic].desc}</p>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 md:p-5 space-y-4">
          <div className="flex justify-between items-center gap-2">
            <span className="text-xs md:text-sm font-extrabold text-indigo-900">Uji Pemahaman Konsep</span>
            <button
              onClick={() => { setQuizIdx((p) => p + 1); setSelectedAnswer(null); }}
              className="text-xs bg-white border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shrink-0 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Soal Lain
            </button>
          </div>
          <p className="font-bold text-slate-800 text-sm">{currentQuiz.question}</p>
          <div className="space-y-2">
            {currentQuiz.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuiz.correctIndex;
              const show = selectedAnswer !== null;
              return (
                <button
                  key={idx}
                  disabled={show}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl border text-xs md:text-sm flex justify-between items-center transition-all active:scale-[0.99] ${
                    !show ? 'bg-white border-slate-200 hover:border-indigo-400' :
                    isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold' :
                    isSelected ? 'bg-red-50 border-red-300 text-red-900' : 'bg-white opacity-50'
                  }`}
                >
                  <span className="pr-2">{opt}</span>
                  {show && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {show && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null && (
            <div className="bg-white border border-indigo-200 p-3 rounded-xl text-xs text-slate-700 flex gap-2">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>{currentQuiz.explanation}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('quests');
  const [studentName, setStudentName] = useState(() => localStorage.getItem('mukodir_student') || '');
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mukodir_progress')) || {}; } catch { return {}; }
  });
  const [activeMission, setActiveMission] = useState(null);
  const [editorPayload, setEditorPayload] = useState({ code: '', lang: 'python' });

  useEffect(() => {
    localStorage.setItem('mukodir_progress', JSON.stringify(progress));
  }, [progress]);

  const totalStars = Object.values(progress).reduce((a, b) => a + b, 0);

  const handleCompleteMission = (missionId, stars) => {
    setProgress((prev) => ({
      ...prev,
      [missionId]: Math.max(prev[missionId] || 0, stars)
    }));
  };

  const handleSelectMission = (mission) => {
    setActiveMission(mission);
    setActiveTab('drill');
  };

  const handleSendToEditor = (code, lang) => {
    setEditorPayload({ code, lang });
    setActiveTab('code');
  };

  // Urutan menu khusus mobile (Misi berada di tengah seperti Programming Hub)
  const navItems = [
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'drill', label: 'Blok', icon: Blocks },
    { id: 'quests', label: 'Misi', icon: Map, isCenter: true },
    { id: 'code', label: 'Editor', icon: Code2 },
    { id: 'home', label: 'Profil', icon: Home },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans pb-20 md:pb-0">
      {/* Top App Bar (Ringkas di HP, Lengkap di Desktop) */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-1.5 md:p-2 rounded-xl text-white shadow-sm">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base md:text-lg text-slate-800 tracking-tight">
                MUKODIR <span className="text-indigo-600">v2</span>
              </span>
              {studentName && (
                <p className="text-[10px] text-slate-400 font-semibold leading-none md:hidden">
                  Halo, {studentName}
                </p>
              )}
            </div>
          </div>

          {/* Navigasi Desktop (Tersembunyi di HP) */}
          <nav className="hidden md:flex gap-1.5">
            {navItems.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === t.id
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              );
            })}
          </nav>

          {/* Badge Bintang & Status di Pojok Kanan Atas */}
          <div className="flex items-center gap-2">
            <div className="bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-extrabold text-amber-900">{totalStars}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6">
        {activeTab === 'home' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm text-center space-y-4 mt-4 md:mt-8">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto font-extrabold text-2xl">
              {studentName ? studentName.charAt(0).toUpperCase() : <Sparkles className="w-8 h-8" />}
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-800">Identitas Pembelajar</h1>
            <p className="text-xs md:text-sm text-slate-500">
              Nama Anda disimpan otomatis di HP ini untuk mencatat progres bintang misi.
            </p>
            <input
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                localStorage.setItem('mukodir_student', e.target.value);
              }}
              placeholder="Ketik nama lengkap siswa..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => setActiveTab('quests')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-indigo-200"
            >
              Mulai Belajar di Peta Misi ➔
            </button>
          </div>
        )}
        {activeTab === 'materi' && <MateriView />}
        {activeTab === 'quests' && <QuestMapView progress={progress} onSelectMission={handleSelectMission} />}
        {activeTab === 'drill' && (
          <DrillView
            activeMission={activeMission}
            onCompleteMission={handleCompleteMission}
            onSendToEditor={handleSendToEditor}
          />
        )}
        {activeTab === 'code' && <CodeView initialCode={editorPayload.code} initialLang={editorPayload.lang} />}
      </main>

      {/* Bottom Navigation Bar Khusus Mobile (Ala Programming Hub) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            // Tombol Tengah Menonjol (Peta Misi)
            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="flex flex-col items-center justify-center -mt-5"
                >
                  <div
                    className={`w-13 h-13 p-3.5 rounded-2xl shadow-lg transition-transform active:scale-90 flex items-center justify-center ${
                      isActive
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                        : 'bg-slate-800 text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-extrabold mt-1 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center justify-center flex-1 py-1 active:scale-95 transition-transform"
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
