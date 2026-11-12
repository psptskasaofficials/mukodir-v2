import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, XCircle, Sparkles, Loader2, Info, Award,
  BookOpen, Layers, Code2, Printer, Lock, Check, ArrowRight
} from 'lucide-react';
import { QUIZ_BANK } from '../data/missions';
import { askMukodirAI } from '../utils/aiService';

// ==========================================
// ILUSTRASI VISUAL SVG UNTUK PEMAHAMAN SISWA
// ==========================================
const TopicIllustration = ({ topicIndex }) => {
  if (topicIndex === 0) {
    // Ilustrasi 1: Alur Algoritma Input -> Proses -> Output
    return (
      <svg viewBox="0 0 600 150" className="w-full h-auto bg-slate-900 rounded-2xl p-3 border border-slate-800">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#818cf8" />
          </marker>
        </defs>
        <rect x="25" y="40" width="140" height="70" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="95" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. INPUT</text>
        <text x="95" y="90" fill="#cbd5e1" fontSize="11" textAnchor="middle">Data Mentah (Bahan)</text>

        <line x1="165" y1="75" x2="220" y2="75" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />

        <rect x="230" y="40" width="140" height="70" rx="14" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
        <text x="300" y="70" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">2. PROSES</text>
        <text x="300" y="90" fill="#cbd5e1" fontSize="11" textAnchor="middle">Langkah Logis / Hitung</text>

        <line x1="370" y1="75" x2="425" y2="75" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />

        <rect x="435" y="40" width="140" height="70" rx="14" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
        <text x="505" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">3. OUTPUT</text>
        <text x="505" y="90" fill="#cbd5e1" fontSize="11" textAnchor="middle">Informasi / Hasil Jadi</text>
      </svg>
    );
  }

  if (topicIndex === 1) {
    // Ilustrasi 2: Memori RAM & Tipe Data
    return (
      <svg viewBox="0 0 600 160" className="w-full h-auto bg-slate-900 rounded-2xl p-3 border border-slate-800">
        <text x="300" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">ILUSTRASI KOTAK MEMORI (RAM) KOMPUTER</text>
        {/* Kotak INT */}
        <rect x="25" y="42" width="125" height="95" rx="12" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
        <text x="87" y="64" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">umur (int)</text>
        <rect x="45" y="76" width="85" height="34" rx="6" fill="#0f172a" />
        <text x="87" y="98" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">16</text>
        <text x="87" y="126" fill="#94a3b8" fontSize="10" textAnchor="middle">Bilangan Bulat</text>

        {/* Kotak FLOAT */}
        <rect x="167" y="42" width="125" height="95" rx="12" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
        <text x="229" y="64" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">nilai (float)</text>
        <rect x="187" y="76" width="85" height="34" rx="6" fill="#0f172a" />
        <text x="229" y="98" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">88.5</text>
        <text x="229" y="126" fill="#94a3b8" fontSize="10" textAnchor="middle">Bilangan Desimal</text>

        {/* Kotak STRING */}
        <rect x="309" y="42" width="125" height="95" rx="12" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
        <text x="371" y="64" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">nama (string)</text>
        <rect x="324" y="76" width="95" height="34" rx="6" fill="#0f172a" />
        <text x="371" y="98" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">"Rina"</text>
        <text x="371" y="126" fill="#94a3b8" fontSize="10" textAnchor="middle">Teks / Karakter</text>

        {/* Kotak BOOL */}
        <rect x="451" y="42" width="125" height="95" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
        <text x="513" y="64" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">lulus (bool)</text>
        <rect x="471" y="76" width="85" height="34" rx="6" fill="#0f172a" />
        <text x="513" y="98" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">True</text>
        <text x="513" y="126" fill="#94a3b8" fontSize="10" textAnchor="middle">Logika Benar/Salah</text>
      </svg>
    );
  }

  if (topicIndex === 2) {
    // Ilustrasi 3: Perbedaan = vs ==
    return (
      <svg viewBox="0 0 600 145" className="w-full h-auto bg-slate-900 rounded-2xl p-3 border border-slate-800">
        <rect x="30" y="25" width="250" height="95" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        <text x="155" y="52" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">Tanda "=" (Assignment)</text>
        <text x="155" y="76" fill="#ffffff" fontSize="14" fontFamily="monospace" textAnchor="middle">nilai = 80</text>
        <text x="155" y="100" fill="#cbd5e1" fontSize="11" textAnchor="middle">Mengisi angka 80 ke kotak variabel</text>

        <rect x="320" y="25" width="250" height="95" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="445" y="52" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Tanda "==" (Perbandingan)</text>
        <text x="445" y="76" fill="#ffffff" fontSize="14" fontFamily="monospace" textAnchor="middle">nilai == 80 ➔ True</text>
        <text x="445" y="100" fill="#cbd5e1" fontSize="11" textAnchor="middle">Bertanya: Apakah isi nilai sama dengan 80?</text>
      </svg>
    );
  }

  if (topicIndex === 3) {
    // Ilustrasi 4: Diagram Percabangan IF - ELSE
    return (
      <svg viewBox="0 0 600 175" className="w-full h-auto bg-slate-900 rounded-2xl p-3 border border-slate-800">
        <polygon points="300,18 410,65 300,112 190,65" fill="#1e293b" stroke="#fbbf24" strokeWidth="2.5" />
        <text x="300" y="69" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">nilai &gt;= 75 ?</text>

        {/* Jalur TRUE */}
        <line x1="190" y1="65" x2="115" y2="65" stroke="#34d399" strokeWidth="2" />
        <line x1="115" y1="65" x2="115" y2="115" stroke="#34d399" strokeWidth="2" />
        <text x="148" y="57" fill="#34d399" fontSize="11" fontWeight="bold">YA (True)</text>
        <rect x="40" y="115" width="150" height="44" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
        <text x="115" y="142" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Cetak "LULUS"</text>

        {/* Jalur FALSE */}
        <line x1="410" y1="65" x2="485" y2="65" stroke="#f87171" strokeWidth="2" />
        <line x1="485" y1="65" x2="485" y2="115" stroke="#f87171" strokeWidth="2" />
        <text x="422" y="57" fill="#f87171" fontSize="11" fontWeight="bold">TIDAK (False)</text>
        <rect x="410" y="115" width="150" height="44" rx="10" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
        <text x="485" y="142" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Cetak "REMIDI"</text>
      </svg>
    );
  }

  if (topicIndex === 4) {
    // Ilustrasi 5: Siklus Perulangan WHILE
    return (
      <svg viewBox="0 0 600 165" className="w-full h-auto bg-slate-900 rounded-2xl p-3 border border-slate-800">
        <rect x="35" y="55" width="110" height="50" rx="10" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
        <text x="90" y="84" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Mulai: i = 1</text>

        <line x1="145" y1="80" x2="195" y2="80" stroke="#94a3b8" strokeWidth="2" />

        <rect x="195" y="45" width="150" height="70" rx="14" fill="#1e293b" stroke="#f472b6" strokeWidth="2.5" />
        <text x="270" y="75" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">Cek: i &lt;= 3 ?</text>
        <text x="270" y="95" fill="#cbd5e1" fontSize="10" textAnchor="middle">Jika True, ulangi blok</text>

        {/* Loop Body */}
        <line x1="345" y1="80" x2="395" y2="80" stroke="#34d399" strokeWidth="2" />
        <rect x="395" y="45" width="170" height="70" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
        <text x="480" y="74" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Cetak i &amp; i = i + 1</text>
        <text x="480" y="94" fill="#cbd5e1" fontSize="10" textAnchor="middle">(Counter wajib naik!)</text>

        {/* Panah Balik Loop */}
        <path d="M 480 115 L 480 142 L 270 142 L 270 115" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="4" />
        <text x="375" y="136" fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">Kembali cek syarat WHILE</text>
      </svg>
    );
  }

  // Ilustrasi 6: Perbandingan Struktur Python vs C++
  return (
    <svg viewBox="0 0 600 150" className="w-full h-auto bg-slate-900 rounded-2xl p-3 border border-slate-800">
      <rect x="25" y="25" width="255" height="100" rx="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
      <text x="152" y="50" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">PYTHON (Modern &amp; Ringkas)</text>
      <text x="152" y="75" fill="#cbd5e1" fontSize="11" textAnchor="middle">• Tanpa titik koma (;)</text>
      <text x="152" y="95" fill="#cbd5e1" fontSize="11" textAnchor="middle">• Blok diatur dengan spasi (Indentasi)</text>
      <text x="152" y="113" fill="#cbd5e1" fontSize="11" textAnchor="middle">• Tipe data otomatis (Dynamic)</text>

      <rect x="320" y="25" width="255" height="100" rx="14" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
      <text x="447" y="50" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">C++ (Cepat &amp; Terstruktur)</text>
      <text x="447" y="75" fill="#cbd5e1" fontSize="11" textAnchor="middle">• Wajib diakhiri titik koma (;)</text>
      <text x="447" y="95" fill="#cbd5e1" fontSize="11" textAnchor="middle">• Blok dibungkus kurung kurawal {"{ }"}</text>
      <text x="447" y="113" fill="#cbd5e1" fontSize="11" textAnchor="middle">• Wajib deklarasi tipe (int, float)</text>
    </svg>
  );
};

// ==========================================
// KOMPONEN UTAMA MATERI VIEW
// ==========================================
export default function MateriView({ studentName, onRequestName }) {
  const [activeTopic, setActiveTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mukodir_completed_topics')) || [];
    } catch {
      return [];
    }
  });
  const [quizIdx, setQuizIdx] = useState(0);
  const [aiGeneratedQuiz, setAiGeneratedQuiz] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    localStorage.setItem('mukodir_completed_topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  const topics = [
    {
      title: "1. Pengantar Algoritma & Alur IPO",
      level: "Level 1 — Dasar (Urutan Logika & Pemecahan Masalah)",
      desc: "Algoritma adalah urutan langkah-langkah logis yang disusun secara sistematis untuk menyelesaikan suatu masalah. Hampir semua program komputer bekerja menggunakan pola IPO: Input (memasukkan data), Proses (mengolah data), dan Output (menampilkan hasil).",
      keyPoints: [
        "Instruksi dieksekusi komputer secara berurutan dari baris paling atas ke bawah.",
        "Algoritma yang baik harus memiliki titik berhenti (finite) dan langkah yang jelas.",
        "Kesalahan urutan langkah (misal: mencetak hasil sebelum dihitung) akan menyebabkan bug logika."
      ],
      pythonExample: `# Program Hitung Luas Persegi Panjang\npanjang = int(input("Masukkan panjang: "))\nlebar = int(input("Masukkan lebar: "))\nluas = panjang * lebar\nprint("Luas =", luas)`,
      cppExample: `#include <iostream>\nusing namespace std;\nint main() {\n    int panjang, lebar, luas;\n    cin >> panjang >> lebar;\n    luas = panjang * lebar;\n    cout << "Luas = " << luas;\n    return 0;\n}`
    },
    {
      title: "2. Variabel & Tipe Data (Memori RAM)",
      level: "Level 2 — Pemahaman (Memori RAM & Pemilihan Tipe Data)",
      desc: "Variabel dapat dibayangkan sebagai kotak penyimpanan berlabel di dalam memori (RAM) komputer. Setiap kotak memiliki tipe data tertentu agar komputer tahu cara mengolah isinya—apakah berupa angka yang bisa dihitung atau sekadar teks biasa.",
      keyPoints: [
        "Integer (int): Menyimpan bilangan bulat tanpa koma (contoh: jumlah siswa = 36).",
        "Float: Menyimpan bilangan pecahan/desimal (contoh: nilai rata-rata = 87.5).",
        "String (str): Menyimpan teks/kalimat yang wajib diapit tanda kutip (contoh: \"SMKN 1 Pacitan\").",
        "Boolean (bool): Hanya menyimpan dua nilai kebenaran logika: True (Benar) atau False (Salah)."
      ],
      pythonExample: `nama = "Ahmad"        # String\numur = 16             # Integer\nratarata = 88.5       # Float\nlulus = True          # Boolean\nprint(nama, lulus)`,
      cppExample: `#include <iostream>\nusing namespace std;\nint main() {\n    string nama = "Ahmad";\n    int umur = 16;\n    float ratarata = 88.5;\n    bool lulus = true;\n    cout << nama << " " << lulus;\n    return 0;\n}`
    },
    {
      title: "3. Operator Aritmatika & Logika",
      level: "Level 3 — Aplikasi (Evaluasi Ekspresi & Perbandingan)",
      desc: "Operator adalah simbol khusus yang memerintahkan komputer melakukan perhitungan matematika atau membandingkan dua buah nilai. Pemula sering tertukar antara tanda sama dengan tunggal (=) dan ganda (==).",
      keyPoints: [
        "Operator Penugasan (=): Memasukkan nilai di sebelah kanan ke variabel di sebelah kiri.",
        "Operator Perbandingan (==, !=, >, <, >=, <=): Menghasilkan nilai True atau False.",
        "Operator Logika (and, or, not): Menggabungkan dua syarat kondisi sekaligus."
      ],
      pythonExample: `nilai = 75\nsyarat_lulus = (nilai >= 75) and (nilai <= 100)\nprint("Status lulus:", syarat_lulus) # True`,
      cppExample: `#include <iostream>\nusing namespace std;\nint main() {\n    int nilai = 75;\n    bool syarat_lulus = (nilai >= 75) && (nilai <= 100);\n    cout << "Status lulus: " << syarat_lulus;\n    return 0;\n}`
    },
    {
      title: "4. Percabangan Keputusan (IF - ELSE)",
      level: "Level 4 — Analisis (Penelusuran Kondisi & Nilai Batas)",
      desc: "Percabangan membuat program mampu mengambil keputusan berbeda tergantung kondisi yang terjadi. Jika syarat bernilai True, blok kode di dalam IF dijalankan; jika False, program beralih ke blok ELSE.",
      keyPoints: [
        "Perhatikan nilai batas (boundary): gunakan '>=' jika batas bawah ikut dinyatakan lulus.",
        "Di Python, blok di dalam IF wajib menjorok ke kanan (indentasi 4 spasi) setelah tanda titik dua (:).",
        "Di C++, kondisi IF wajib diapit tanda kurung () dan bloknya dibungkus kurung kurawal { }."
      ],
      pythonExample: `nilai = int(input("Nilai ujian: "))\nif nilai >= 75:\n    print("Selamat, Anda LULUS!")\nelse:\n    print("Silakan ikuti REMIDI.")`,
      cppExample: `#include <iostream>\nusing namespace std;\nint main() {\n    int nilai;\n    cin >> nilai;\n    if (nilai >= 75) {\n        cout << "Selamat, Anda LULUS!";\n    } else {\n        cout << "Silakan ikuti REMIDI.";\n    }\n    return 0;\n}`
    },
    {
      title: "5. Perulangan Otomatis (WHILE Loop)",
      level: "Level 5 — Evaluasi Lanjut (Tracing Iterasi & Infinite Loop)",
      desc: "Perulangan (Loop) digunakan untuk mengeksekusi perintah yang sama berulang kali secara otomatis selama syarat kondisi masih terpenuhi (True), tanpa perlu menulis baris kode yang sama berkali-kali.",
      keyPoints: [
        "Wajib memiliki variabel pencacah (counter) yang nilainya diubah di setiap putaran (misal: i = i + 1).",
        "Jika variabel counter lupa dinaikkan/diturunkan, syarat akan selalu True dan terjadi Infinite Loop (perulangan tak terbatas)."
      ],
      pythonExample: `i = 1\nwhile i <= 3:\n    print("Putaran ke-", i)\n    i = i + 1\nprint("Selesai!")`,
      cppExample: `#include <iostream>\nusing namespace std;\nint main() {\n    int i = 1;\n    while (i <= 3) {\n        cout << "Putaran ke- " << i << endl;\n        i = i + 1;\n    }\n    cout << "Selesai!";\n    return 0;\n}`
    },
    {
      title: "6. Transisi Sintaks: Python vs C++",
      level: "Level 6 — Sintesis (Perbandingan Bahasa Industri)",
      desc: "Setelah menguasai logika melalui blok visual MUKODIR, Anda siap menulis kode di berbagai bahasa pemrograman. Python unggul dalam kecepatan penulisan dan kecerdasan buatan (AI), sedangkan C++ unggul dalam kecepatan eksekusi sistem dan robotika/IoT.",
      keyPoints: [
        "Keduanya memiliki logika dasar yang sama persis: variabel, input/output, IF, dan WHILE.",
        "Python membaca struktur program dari indentasi (spasi menjorok), sedangkan C++ menggunakan kurung kurawal { } dan titik koma (;)."
      ],
      pythonExample: `# Mencetak bilangan genap 2 sampai 6\nx = 2\nwhile x <= 6:\n    print(x)\n    x += 2`,
      cppExample: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = 2;\n    while (x <= 6) {\n        cout << x << endl;\n        x += 2;\n    }\n    return 0;\n}`
    }
  ];

  const progressPercent = Math.round((completedTopics.length / topics.length) * 100);
  const isAllCompleted = completedTopics.length === topics.length;
  const isCurrentCompleted = completedTopics.includes(activeTopic);

  const toggleTopicComplete = () => {
    setCompletedTopics((prev) => {
      if (prev.includes(activeTopic)) {
        return prev.filter((id) => id !== activeTopic);
      }
      const next = [...prev, activeTopic];
      // Otomatis pindah ke bab berikutnya jika belum selesai semua
      if (activeTopic < topics.length - 1) {
        setTimeout(() => {
          setActiveTopic(activeTopic + 1);
          setAiGeneratedQuiz(null);
          setSelectedAnswer(null);
        }, 350);
      }
      return next;
    });
  };

  const fallbackList = QUIZ_BANK[activeTopic % 5] || QUIZ_BANK[0];
  const currentQuiz = aiGeneratedQuiz || fallbackList[quizIdx % fallbackList.length];

  const handleGenerateNewQuiz = async () => {
    setLoadingQuiz(true);
    setSelectedAnswer(null);
    const currentTopic = topics[activeTopic];

    try {
      const newQuiz = await askMukodirAI('quiz', {
        topic: currentTopic.title,
        level: currentTopic.level,
        desc: currentTopic.desc
      });

      if (newQuiz && newQuiz.question && Array.isArray(newQuiz.options)) {
        setAiGeneratedQuiz(newQuiz);
      } else {
        throw new Error("Format soal tidak sesuai");
      }
    } catch {
      setAiGeneratedQuiz(null);
      setQuizIdx((p) => p + 1);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleOpenCertificate = () => {
    if (!studentName || !studentName.trim()) {
      alert("Silakan isi Nama Lengkap Anda terlebih dahulu pada menu Profil sebelum mencetak sertifikat!");
      if (onRequestName) onRequestName();
      return;
    }
    setShowCertificate(true);
  };

  const certificateNumber = `MKD-2026-${(studentName || 'SISWA').replace(/\s+/g, '').slice(0, 4).toUpperCase()}-${completedTopics.length * 142}`;
  const todayDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-4">
      {/* Header Enrollment & Progress Bar Ala Programming Hub */}
      <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-extrabold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Kursus: Algoritma, Python &amp; C++
            </span>
            <span className="text-xs font-extrabold text-slate-700">
              {completedTopics.length}/{topics.length} Modul ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleOpenCertificate}
          disabled={!isAllCompleted}
          className={`w-full md:w-auto px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shrink-0 ${
            isAllCompleted
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-200 cursor-pointer active:scale-95'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
        >
          {isAllCompleted ? <Award className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {isAllCompleted ? 'Klaim Sertifikat Kelulusan!' : 'Sertifikat (Selesaikan 100%)'}
        </button>
      </div>

      {/* Modal Sertifikat Digital */}
      {showCertificate && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl space-y-5 my-auto">
            {/* Bingkai Sertifikat */}
            <div
              id="printable-certificate"
              className="border-8 border-double border-amber-500/80 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 p-6 sm:p-10 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Award className="w-8 h-8 text-amber-300" />
              </div>
              <p className="text-[11px] font-extrabold tracking-[0.25em] text-indigo-600 uppercase">
                SERTIFIKAT KELULUSAN KOMPETENSI
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
                MUKODIR ACADEMY v2
              </h2>
              <p className="text-xs text-slate-500 mt-1">Nomor: {certificateNumber}</p>

              <p className="text-xs sm:text-sm text-slate-600 mt-6">Diberikan dengan bangga kepada:</p>
              <div className="text-2xl sm:text-4xl font-extrabold text-indigo-900 border-b-2 border-slate-300 inline-block px-8 py-2 my-2">
                {studentName}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-3 leading-relaxed">
                Telah menyelesaikan <strong>100% Modul Pembelajaran &amp; Evaluasi</strong> pada jalur kompetensi{' '}
                <strong>Algoritma Komputasional, Pemrograman Python, dan Dasar C++</strong> dengan predikat{' '}
                <span className="text-emerald-700 font-bold">SANGAT MEMUASKAN</span>.
              </p>

              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                <div className="text-center sm:text-left">
                  <p className="font-bold text-slate-800">SMK Negeri 1 Pacitan</p>
                  <p>Cabang Dinas Pendidikan Wilayah Pacitan</p>
                </div>
                <div className="text-center sm:text-right">
                  <p>Pacitan, {todayDate}</p>
                  <p className="font-extrabold text-slate-800 mt-4 underline">Usnan Rofik, S.Kom</p>
                  <p className="text-[11px] text-slate-500">Pengembang MUKODIR &amp; Guru Informatika</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" /> Cetak / Simpan PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid Utama Materi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-200 shadow-sm">
        {/* Daftar Silabus dengan Status Centang */}
        <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:pr-4 lg:border-r border-slate-100">
          <h3 className="hidden lg:block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Silabus Pembelajaran
          </h3>
          {topics.map((t, i) => {
            const done = completedTopics.includes(i);
            return (
              <button
                key={i}
                onClick={() => {
                  setActiveTopic(i);
                  setAiGeneratedQuiz(null);
                  setQuizIdx(0);
                  setSelectedAnswer(null);
                }}
                className={`text-left px-3.5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-between gap-2 whitespace-nowrap lg:whitespace-normal shrink-0 ${
                  activeTopic === i
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : done
                    ? 'bg-emerald-50/80 text-emerald-900 border border-emerald-200'
                    : 'bg-slate-50 lg:bg-transparent text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{t.title}</span>
                {done ? (
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${activeTopic === i ? 'text-emerald-300' : 'text-emerald-600'}`} />
                ) : (
                  <span className={`w-4 h-4 rounded-full border shrink-0 ${activeTopic === i ? 'border-indigo-300' : 'border-slate-300'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Isi Modul + Ilustrasi + Python vs C++ + Kuis */}
        <div className="lg:col-span-8 space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg mb-2">
              <Layers className="w-3.5 h-3.5" />
              {topics[activeTopic].level}
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-2">
              {topics[activeTopic].title}
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              {topics[activeTopic].desc}
            </p>
          </div>

          {/* Ilustrasi Visual Diagram */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Visualisasi Konsep
            </span>
            <TopicIllustration topicIndex={activeTopic} />
          </div>

          {/* Poin Kunci */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Poin Penting yang Wajib Dipahami:</h4>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-600">
              {topics[activeTopic].keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Perbandingan Kode Python vs C++ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#1e1e2e] rounded-2xl overflow-hidden border border-slate-800">
              <div className="px-3 py-2 bg-[#181825] border-b border-slate-700/70 flex items-center gap-1.5 text-xs font-bold text-blue-400">
                <Code2 className="w-3.5 h-3.5" /> Contoh Python
              </div>
              <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{topics[activeTopic].pythonExample}</code>
              </pre>
            </div>

            <div className="bg-[#1e1e2e] rounded-2xl overflow-hidden border border-slate-800">
              <div className="px-3 py-2 bg-[#181825] border-b border-slate-700/70 flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                <Code2 className="w-3.5 h-3.5" /> Contoh C++
              </div>
              <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{topics[activeTopic].cppExample}</code>
              </pre>
            </div>
          </div>

          {/* Tombol Tandai Sudah Dibaca / Dipahami (Ala Programming Hub) */}
          <div className="flex justify-end">
            <button
              onClick={toggleTopicComplete}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isCurrentCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200'
              }`}
            >
              <Check className="w-4 h-4" />
              {isCurrentCompleted ? 'Sudah Dipahami (Klik untuk Batal)' : 'Tandai Sudah Dibaca & Dipahami'}
            </button>
          </div>

          {/* Uji Pemahaman & Generator Soal AI */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 md:p-5 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="text-xs md:text-sm font-extrabold text-indigo-900 flex items-center gap-1.5">
                Uji Pemahaman Bab Ini
                {aiGeneratedQuiz && (
                  <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                    AI Indonesia
                  </span>
                )}
              </span>
              <button
                onClick={handleGenerateNewQuiz}
                disabled={loadingQuiz}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 shrink-0 active:scale-95 disabled:opacity-50 shadow-sm"
              >
                {loadingQuiz ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                )}
                {loadingQuiz ? 'Menyusun Soal...' : 'Generate Soal AI'}
              </button>
            </div>

            <p className="font-bold text-slate-800 text-sm leading-relaxed">
              {currentQuiz.question}
            </p>

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
                      !show
                        ? 'bg-white border-slate-200 hover:border-indigo-400'
                        : isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                        : isSelected
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : 'bg-white opacity-50'
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
              <div className="bg-white border border-indigo-200 p-3.5 rounded-xl text-xs text-slate-700 flex gap-2.5 leading-relaxed shadow-sm">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-900 block mb-0.5">Jawaban &amp; Pembahasan:</strong>
                  {currentQuiz.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
