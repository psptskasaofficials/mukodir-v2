import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Map, Blocks, Code2, Sparkles, Info, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { QUIZ_BANK } from './data/missions';
import QuestMapView from './components/QuestMapView';
import DrillView from './components/DrillView';
import CodeView from './components/CodeView';

// Komponen Materi Ringkas + Bank Soal Terkurasi
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
      <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Modul Materi</h3>
        {topics.map((t, i) => (
          <button
            key={i}
            onClick={() => { setActiveTopic(i); setQuizIdx(0); setSelectedAnswer(null); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTopic === i ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="lg:col-span-8 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">{topics[activeTopic].title}</h2>
          <p className="text-slate-600 leading-relaxed">{topics[activeTopic].desc}</p>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-extrabold text-indigo-900">Uji Pemahaman Konsep</span>
            <button
              onClick={() => { setQuizIdx((p) => p + 1); setSelectedAnswer(null); }}
              className="text-xs bg-white border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Soal Berikutnya
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
                  className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm flex justify-between items-center transition-all ${
                    !show ? 'bg-white border-slate-200 hover:border-indigo-400' :
                    isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold' :
                    isSelected ? 'bg-red-50 border-red-300 text-red-900' : 'bg-white opacity-50'
                  }`}
                >
                  <span>{opt}</span>
                  {show && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {show && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500" />}
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

  const tabs = [
    { id: 'home', label: 'Profil Siswa', icon: Home },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'quests', label: 'Peta Misi', icon: Map },
    { id: 'drill', label: 'Workspace Blok', icon: Blocks },
    { id: 'code', label: 'Code Editor', icon: Code2 },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center py-3 md:h-16 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-2 rounded-xl text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg text-slate-800">
              MUKODIR <span className="text-indigo-600">v2</span> <Sparkles className="inline w-4 h-4 text-amber-400" />
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === t.id
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'home' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4 mt-8">
            <h1 className="text-2xl font-extrabold text-slate-800">Identitas Pembelajar</h1>
            <p className="text-sm text-slate-500">Nama Anda akan disimpan di perangkat ini untuk mencatat perolehan bintang misi.</p>
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm"
            >
              Masuk ke Peta Misi ➔
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
    </div>
  );
}
