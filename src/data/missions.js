export const QUIZ_BANK = {
  0: [
    {
      question: "Mengapa urutan langkah dalam algoritma sangat menentukan keberhasilan program?",
      options: [
        "Karena komputer mengeksekusi instruksi secara berurutan dari atas ke bawah",
        "Karena komputer hanya bisa membaca maksimal 10 baris kode",
        "Agar warna tampilan terminal menjadi lebih menarik",
        "Karena variabel harus selalu ditulis di bagian paling bawah"
      ],
      correctIndex: 0,
      explanation: "Komputer menjalankan instruksi secara sekuensial (berurutan). Jika langkah memasak mie dibalik (makan dulu baru rebus), hasilnya akan gagal."
    },
    {
      question: "Manakah ciri utama dari sebuah algoritma yang baik?",
      options: [
        "Memiliki langkah yang jelas, terbatas, dan menghasilkan output yang pasti",
        "Berjalan terus-menerus tanpa pernah berhenti",
        "Menggunakan bahasa yang hanya dimengerti oleh pembuatnya",
        "Tidak memerlukan data masukan (input) sama sekali"
      ],
      correctIndex: 0,
      explanation: "Algoritma harus logis, memiliki titik berhenti (finite), dan setiap langkahnya tidak bermakna ganda."
    }
  ],
  1: [
    {
      question: "Tipe data apa yang paling tepat digunakan untuk menyimpan nilai rata-rata rapor seperti 87.5?",
      options: ["Integer", "Float / Desimal", "Boolean", "String"],
      correctIndex: 1,
      explanation: "Float (bilangan desimal) digunakan untuk menyimpan angka yang memiliki koma/pecahan."
    },
    {
      question: "Jika kita ingin menyimpan status kelulusan siswa (Lulus = True / Tidak = False), tipe data yang digunakan adalah...",
      options: ["String", "Integer", "Boolean", "Float"],
      correctIndex: 2,
      explanation: "Boolean hanya memiliki dua nilai logika: True (benar) atau False (salah)."
    }
  ],
  2: [
    {
      question: "Apa perbedaan utama antara tanda '=' dan '==' dalam pemrograman?",
      options: [
        "'=' untuk mengisi nilai ke variabel, '==' untuk membandingkan kesamaan dua nilai",
        "'=' untuk angka, '==' khusus untuk teks",
        "Keduanya memiliki fungsi yang sama persis",
        "'==' digunakan untuk menghapus isi variabel"
      ],
      correctIndex: 0,
      explanation: "Single equals (=) adalah operator penugasan (assignment), sedangkan double equals (==) adalah operator perbandingan."
    }
  ],
  3: [
    {
      question: "Jika KKM adalah 75 dan syarat lulus adalah 'nilai >= 75', bagaimana status siswa yang mendapat nilai tepat 75?",
      options: [
        "Lulus, karena operator '>=' menyertakan batas angka 75",
        "Mengulang, karena 75 tidak lebih besar dari 75",
        "Program akan mengalami error sintaks",
        "Nilai otomatis berubah menjadi 0"
      ],
      correctIndex: 0,
      explanation: "Operator >= berarti 'lebih besar ATAU sama dengan', sehingga nilai tepat 75 tetap memenuhi syarat."
    }
  ],
  4: [
    {
      question: "Apa yang akan terjadi jika dalam perulangan 'WHILE i <= 5', kita lupa menambahkan baris 'i = i + 1'?",
      options: [
        "Terjadi Infinite Loop (perulangan tak terbatas karena kondisi selalu benar)",
        "Program langsung berhenti di baris pertama",
        "Nilai i otomatis bertambah sendiri",
        "Komputer akan menghapus variabel i"
      ],
      correctIndex: 0,
      explanation: "Tanpa perubahan nilai pada variabel kontrol (counter), syarat i <= 5 akan terus bernilai True selamanya."
    }
  ]
};

export const MISSIONS = [
  {
    id: 'w1-m1',
    world: 'World 1: Sekuensial & Variabel',
    title: 'Misi 1.1: Kasir Warung Digital',
    scaffoldingLevel: 'Level 1 — Susun Blok (Parsons)',
    description: 'Urutkan blok-blok yang sudah tersedia agar program meminta input harga barang, menghitung total bayar (harga * 2), lalu mencetak hasilnya.',
    hint: 'Pastikan deklarasi variabel berada di paling atas, diikuti INPUT, lalu PROCESS perhitungan sebelum OUTPUT.',
    maxOptimalBlocks: 6,
    initialBlocks: [
      { id: 'b3', type: 'OUTPUT', text: 'Total Bayar: ', varName: 'total', locked: false },
      { id: 'b1', type: 'DECLARE', varName: 'harga', dataType: 'angka', locked: true },
      { id: 'b4', type: 'INPUT', prompt: 'Masukkan harga satuan:', varName: 'harga', locked: false },
      { id: 'b2', type: 'DECLARE', varName: 'total', dataType: 'angka', locked: true },
      { id: 'b5', type: 'PROCESS', resultVar: 'total', expression: 'harga * 2', locked: false }
    ],
    testCases: [
      { inputs: ['5000'], expectedContains: '10000', label: 'Harga 5000 -> Total 10000' },
      { inputs: ['12500'], expectedContains: '25000', label: 'Harga 12500 -> Total 25000' }
    ]
  },
  {
    id: 'w1-m2',
    world: 'World 1: Sekuensial & Variabel',
    title: 'Misi 1.2: Konverter Suhu Celcius',
    scaffoldingLevel: 'Level 2 — Faded Block (Lengkapi Rumus)',
    description: 'Lengkapi rumus pada blok SET agar suhu Celcius (c) dikonversi menjadi Fahrenheit (f) dengan rumus: (c * 9 / 5) + 32.',
    hint: 'Klik pada kotak rumus di blok SET f = ... dan ketikkan (c * 9 / 5) + 32',
    maxOptimalBlocks: 5,
    initialBlocks: [
      { id: 'b1', type: 'DECLARE', varName: 'c', dataType: 'desimal', locked: true },
      { id: 'b2', type: 'DECLARE', varName: 'f', dataType: 'desimal', locked: true },
      { id: 'b3', type: 'INPUT', prompt: 'Suhu Celcius:', varName: 'c', locked: true },
      { id: 'b4', type: 'PROCESS', resultVar: 'f', expression: '', placeholder: 'Isi rumus konversi...', locked: false },
      { id: 'b5', type: 'OUTPUT', text: 'Fahrenheit: ', varName: 'f', locked: true }
    ],
    testCases: [
      { inputs: ['0'], expectedContains: '32', label: '0°C -> 32°F' },
      { inputs: ['100'], expectedContains: '212', label: '100°C -> 212°F' }
    ]
  },
  {
    id: 'w2-m1',
    world: 'World 2: Percabangan Logika',
    title: 'Misi 2.1: Sensor Batas Kelulusan',
    scaffoldingLevel: 'Level 2 — Perbaiki Kondisi Batas',
    description: 'Siswa dinyatakan LULUS jika nilai minimal 75. Perbaiki kondisi pada blok IF agar nilai tepat 75 tetap mencetak "LULUS".',
    hint: 'Ubah operator > menjadi >= pada blok IF.',
    maxOptimalBlocks: 6,
    initialBlocks: [
      { id: 'b1', type: 'DECLARE', varName: 'nilai', dataType: 'angka', locked: true },
      { id: 'b2', type: 'INPUT', prompt: 'Masukkan nilai ujian:', varName: 'nilai', locked: true },
      { id: 'b3', type: 'IF_START', condition: 'nilai > 75', locked: false },
      { id: 'b4', type: 'OUTPUT', text: 'STATUS: LULUS', varName: '', locked: true },
      { id: 'b5', type: 'IF_END', locked: true }
    ],
    testCases: [
      { inputs: ['80'], expectedContains: 'LULUS', label: 'Nilai 80 -> LULUS' },
      { inputs: ['75'], expectedContains: 'LULUS', label: 'Nilai 75 (Batas) -> LULUS' }
    ]
  },
  {
    id: 'w3-m1',
    world: 'World 3: Perulangan (Loop)',
    title: 'Misi 3.1: Hitung Mundur Roket',
    scaffoldingLevel: 'Level 3 — Rancang Mandiri',
    description: 'Buat program hitung mundur dari 3 sampai 1 menggunakan WHILE, lalu cetak "MELUNCUR!" setelah perulangan selesai.',
    hint: 'Gunakan variabel hitung = 3, WHILE hitung >= 1, cetak hitung, lalu kurangi hitung = hitung - 1 di dalam loop.',
    maxOptimalBlocks: 8,
    initialBlocks: [
      { id: 'b1', type: 'DECLARE', varName: 'hitung', dataType: 'angka', locked: false },
      { id: 'b2', type: 'PROCESS', resultVar: 'hitung', expression: '3', locked: false }
    ],
    testCases: [
      { inputs: [], expectedContains: 'MELUNCUR', label: 'Mencetak MELUNCUR setelah hitung mundur' }
    ]
  }
];
