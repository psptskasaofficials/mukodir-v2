import { Sparkles, Loader2 } from 'lucide-react';
import { askMukodirAI } from '../utils/aiService';
import React, { useState, useEffect } from 'react';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Play, Trash2, Terminal, GripVertical, Lock, CheckCircle2,
  AlertTriangle, Cpu, ArrowRight, RotateCcw, Award, HelpCircle, Plus
} from 'lucide-react';

// ==========================================
// KOMPONEN KARTU BLOK (SORTABLE DRAG & DROP)
// ==========================================
const SortableBlockItem = ({ block, index, isActiveLine, onUpdate, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
    disabled: block.locked
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  const getBadgeStyle = (type) => {
    if (type === 'DECLARE') return 'bg-blue-50 border-blue-200 text-blue-800';
    if (type === 'INPUT') return 'bg-orange-50 border-orange-200 text-orange-800';
    if (type === 'PROCESS') return 'bg-purple-50 border-purple-200 text-purple-800';
    if (type === 'OUTPUT') return 'bg-emerald-50 border-emerald-200 text-emerald-800';
    if (type.includes('IF')) return 'bg-amber-50 border-amber-300 text-amber-900';
    if (type.includes('WHILE')) return 'bg-pink-50 border-pink-300 text-pink-900';
    return 'bg-white border-slate-200';
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-1.5 group">
      <span className="w-5 text-right text-[11px] font-mono text-slate-400 shrink-0">{index + 1}</span>
      <div style={{ width: `${block.indent * 16}px` }} className="shrink-0 border-l-2 border-indigo-200 h-7" />

      <div
        className={`flex-1 flex items-center justify-between gap-2 p-2.5 rounded-xl border text-xs shadow-sm transition-all
        ${getBadgeStyle(block.type)}
        ${isActiveLine ? 'ring-2 ring-emerald-500 scale-[1.01] shadow-md bg-emerald-50/90' : ''}
        ${isDragging ? 'opacity-85 shadow-xl' : ''}`}
      >
        <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
          {block.locked ? (
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" title="Blok Terkunci (Scaffolding)" />
          ) : (
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700 touch-none p-0.5"
              title="Geser urutan blok"
            >
              <GripVertical className="w-4 h-4" />
            </button>
          )}

          {block.type === 'DECLARE' && (
            <>
              <strong className="font-bold">DECLARE</strong>
              <input
                value={block.varName}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { varName: e.target.value })}
                className="bg-white/90 border border-blue-200 rounded px-1.5 py-1 font-mono w-20 text-slate-800"
              />
              <span>sebagai</span>
              <select
                value={block.dataType}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { dataType: e.target.value })}
                className="bg-white/90 border border-blue-200 rounded px-1.5 py-1 text-slate-800"
              >
                <option value="angka">Angka (int)</option>
                <option value="desimal">Desimal (float)</option>
                <option value="teks">Teks (string)</option>
              </select>
            </>
          )}

          {block.type === 'INPUT' && (
            <>
              <strong className="font-bold">INPUT</strong>
              <input
                value={block.prompt}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { prompt: e.target.value })}
                placeholder="Pesan prompt..."
                className="bg-white/90 border border-orange-200 rounded px-1.5 py-1 w-28 sm:w-32 text-slate-800"
              />
              <span>➔</span>
              <input
                value={block.varName}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { varName: e.target.value })}
                placeholder="var"
                className="bg-white/90 border border-orange-200 rounded px-1.5 py-1 font-mono w-16 text-slate-800"
              />
            </>
          )}

          {block.type === 'PROCESS' && (
            <>
              <strong className="font-bold">SET</strong>
              <input
                value={block.resultVar}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { resultVar: e.target.value })}
                placeholder="var"
                className="bg-white/90 border border-purple-200 rounded px-1.5 py-1 font-mono w-16 text-slate-800"
              />
              <span>=</span>
              <input
                value={block.expression}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { expression: e.target.value })}
                placeholder={block.placeholder || "rumus..."}
                className="bg-white border border-purple-300 rounded px-2 py-1 font-mono flex-1 min-w-[100px] text-slate-800 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </>
          )}

          {block.type === 'OUTPUT' && (
            <>
              <strong className="font-bold">PRINT</strong>
              <input
                value={block.text}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { text: e.target.value })}
                placeholder="Teks..."
                className="bg-white/90 border border-emerald-200 rounded px-1.5 py-1 w-24 sm:w-28 text-slate-800"
              />
              <span>+ var:</span>
              <input
                value={block.varName}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { varName: e.target.value })}
                placeholder="(opsional)"
                className="bg-white/90 border border-emerald-200 rounded px-1.5 py-1 font-mono w-20 text-slate-800"
              />
            </>
          )}

          {block.type === 'IF_START' && (
            <>
              <strong className="font-bold">IF</strong>
              <input
                value={block.condition}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { condition: e.target.value })}
                placeholder="kondisi..."
                className="bg-white border border-amber-300 rounded px-2 py-1 font-mono w-28 sm:w-32 text-slate-800"
              />
              <strong>THEN</strong>
            </>
          )}
          {block.type === 'IF_END' && <strong className="font-bold">END IF</strong>}

          {block.type === 'WHILE_START' && (
            <>
              <strong className="font-bold">WHILE</strong>
              <input
                value={block.condition}
                disabled={block.locked}
                onChange={(e) => onUpdate(block.id, { condition: e.target.value })}
                placeholder="kondisi..."
                className="bg-white border border-pink-300 rounded px-2 py-1 font-mono w-28 sm:w-32 text-slate-800"
              />
              <strong>DO</strong>
            </>
          )}
          {block.type === 'WHILE_END' && <strong className="font-bold">END WHILE</strong>}
        </div>

        {!block.locked && (
          <button
            onClick={() => onDelete(block.id)}
            className="text-red-400 hover:text-red-600 p-1 shrink-0"
            title="Hapus blok"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ==========================================
// KOMPONEN UTAMA: DRILL VIEW
// ==========================================
export default function DrillView({ activeMission, onCompleteMission, onSendToEditor }) {
  const [blocks, setBlocks] = useState([]);
  const [activeLang, setActiveLang] = useState('python');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [memoryWatch, setMemoryWatch] = useState({});
  const [activeLineIdx, setActiveLineIdx] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [inputRequest, setInputRequest] = useState(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [mobilePane, setMobilePane] = useState('blocks'); // 'blocks' | 'code' | 'terminal'
  const [aiFeedback, setAiFeedback] = useState('');
  const [analyzingAI, setAnalyzingAI] = useState(false);

const handleAnalyzeWithAI = async () => {
  setAnalyzingAI(true);
  setAiFeedback('');
  try {
    const codeText = activeLang === 'python' ? generatePython() : generateCPP();
    const result = await askMukodirAI('analyze', { blocks, code: codeText, lang: activeLang });
    setAiFeedback(result);
  } catch (err) {
    setAiFeedback(`⚠️ ${err.message}`);
  } finally {
    setAnalyzingAI(false);
  }
};

  useEffect(() => {
    setMobilePane('blocks');
    if (activeMission) {
      setBlocks(JSON.parse(JSON.stringify(activeMission.initialBlocks)));
      setConsoleOutput([`🎯 Misi Dimuat: ${activeMission.title}`]);
      setTestResults(null);
      setMemoryWatch({});
      setShowHint(false);
    } else {
      setBlocks([
        { id: 'd1', type: 'DECLARE', varName: 'i', dataType: 'angka', locked: false },
        { id: 'd2', type: 'PROCESS', resultVar: 'i', expression: '1', locked: false },
        { id: 'd3', type: 'WHILE_START', condition: 'i <= 3', locked: false },
        { id: 'd4', type: 'OUTPUT', text: 'Hitungan: ', varName: 'i', locked: false },
        { id: 'd5', type: 'PROCESS', resultVar: 'i', expression: 'i + 1', locked: false },
        { id: 'd6', type: 'WHILE_END', locked: false }
      ]);
      setConsoleOutput(['Siap menjalankan simulator algoritma...']);
    }
  }, [activeMission]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlockFromPalette = (type) => {
    const uid = `blk_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    if (type === 'IF_PAIR') {
      setBlocks((prev) => [
        ...prev,
        { id: uid + '_s', type: 'IF_START', condition: 'x > 0', locked: false },
        { id: uid + '_e', type: 'IF_END', locked: false }
      ]);
    } else if (type === 'WHILE_PAIR') {
      setBlocks((prev) => [
        ...prev,
        { id: uid + '_s', type: 'WHILE_START', condition: 'i <= 5', locked: false },
        { id: uid + '_e', type: 'WHILE_END', locked: false }
      ]);
    } else {
      const defaults = {
        DECLARE: { varName: 'x', dataType: 'angka' },
        INPUT: { prompt: 'Masukkan nilai:', varName: 'x' },
        PROCESS: { resultVar: 'x', expression: '0' },
        OUTPUT: { text: 'Hasil: ', varName: 'x' }
      };
      setBlocks((prev) => [...prev, { id: uid, type, ...defaults[type], locked: false }]);
    }
  };

  const updateBlock = (id, patch) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // Static Bug Linter
  const analyzeStaticBugs = () => {
    const warnings = [];
    const declared = new Set();
    blocks.forEach((b, idx) => {
      if (b.type === 'DECLARE') declared.add(b.varName);
      if (b.type === 'INPUT' && b.varName && !declared.has(b.varName)) {
        warnings.push(`Baris ${idx + 1}: Variabel "${b.varName}" dipakai sebelum di-DECLARE.`);
      }
      if (b.type === 'PROCESS') {
        if (b.resultVar && !declared.has(b.resultVar)) {
          warnings.push(`Baris ${idx + 1}: Variabel "${b.resultVar}" dipakai sebelum di-DECLARE.`);
        }
        if (!b.expression || !b.expression.trim()) {
          warnings.push(`Baris ${idx + 1}: Rumus pada blok SET "${b.resultVar}" masih kosong.`);
        }
      }
    });
    return warnings;
  };

  // Transpiler Python
  const generatePython = () => {
    let code = `# Kode Python Hasil Transpilasi MUKODIR v2\n`;
    let indent = 0;
    const pad = () => '    '.repeat(indent);
    blocks.forEach((b) => {
      if (b.type === 'IF_END' || b.type === 'WHILE_END') {
        indent = Math.max(0, indent - 1);
      } else if (b.type === 'DECLARE') {
        const def = b.dataType === 'teks' ? '""' : b.dataType === 'desimal' ? '0.0' : '0';
        code += `${pad()}${b.varName} = ${def}\n`;
      } else if (b.type === 'INPUT') {
        const decl = blocks.find((x) => x.type === 'DECLARE' && x.varName === b.varName);
        const cast = decl?.dataType === 'angka' ? 'int' : decl?.dataType === 'desimal' ? 'float' : '';
        code += `${pad()}${b.varName} = ${cast ? `${cast}(input("${b.prompt} "))` : `input("${b.prompt} ")`}\n`;
      } else if (b.type === 'PROCESS') {
        code += `${pad()}${b.resultVar} = ${b.expression || '0'}\n`;
      } else if (b.type === 'OUTPUT') {
        code += b.varName
          ? `${pad()}print(f"${b.text}{${b.varName}}")\n`
          : `${pad()}print("${b.text}")\n`;
      } else if (b.type === 'IF_START') {
        code += `${pad()}if ${b.condition}:\n`;
        indent++;
      } else if (b.type === 'WHILE_START') {
        code += `${pad()}while ${b.condition}:\n`;
        indent++;
      }
    });
    return code;
  };

  // Transpiler C++
  const generateCPP = () => {
    let code = `#include <iostream>\nusing namespace std;\n\nint main() {\n`;
    let indent = 1;
    const pad = () => '    '.repeat(indent);
    blocks.forEach((b) => {
      if (b.type === 'IF_END' || b.type === 'WHILE_END') {
        indent = Math.max(1, indent - 1);
        code += `${pad()}}\n`;
      } else if (b.type === 'DECLARE') {
        const t = b.dataType === 'teks' ? 'string' : b.dataType === 'desimal' ? 'float' : 'int';
        const d = b.dataType === 'teks' ? '""' : b.dataType === 'desimal' ? '0.0' : '0';
        code += `${pad()}${t} ${b.varName} = ${d};\n`;
      } else if (b.type === 'INPUT') {
        code += `${pad()}cout << "${b.prompt} ";\n${pad()}cin >> ${b.varName};\n`;
      } else if (b.type === 'PROCESS') {
        code += `${pad()}${b.resultVar} = ${b.expression || '0'};\n`;
      } else if (b.type === 'OUTPUT') {
        code += `${pad()}cout << "${b.text}"${b.varName ? ` << ${b.varName}` : ''} << endl;\n`;
      } else if (b.type === 'IF_START') {
        code += `${pad()}if (${b.condition}) {\n`;
        indent++;
      } else if (b.type === 'WHILE_START') {
        code += `${pad()}while (${b.condition}) {\n`;
        indent++;
      }
    });
    return code + `    return 0;\n}`;
  };

  // Interpreter Eksekusi
  const executeBlocks = async (mockInputs = null, visualStep = true) => {
    const jumpMap = {};
    const stack = [];
    for (let i = 0; i < blocks.length; i++) {
      const t = blocks[i].type;
      if (t === 'IF_START' || t === 'WHILE_START') stack.push({ i, t });
      else if (t === 'IF_END' || t === 'WHILE_END') {
        if (!stack.length) throw new Error(`Blok ${t} tanpa awalan START.`);
        const top = stack.pop();
        if ((top.t === 'IF_START' && t !== 'IF_END') || (top.t === 'WHILE_START' && t !== 'WHILE_END')) {
          throw new Error('Pasangan blok IF/WHILE tidak sesuai.');
        }
        jumpMap[top.i] = i;
        jumpMap[i] = top.i;
      }
    }
    if (stack.length) throw new Error('Ada blok IF/WHILE yang belum ditutup END.');

    let mem = {};
    let pc = 0;
    let steps = 0;
    let mockIdx = 0;
    const logs = [];

    const evalExpr = (expr) => {
      if (!expr || !expr.trim()) throw new Error('Ekspresi rumus kosong.');
      let parsed = expr
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bnot\b/g, '!')
        .replace(/==/g, '===');
      Object.keys(mem)
        .sort((a, b) => b.length - a.length)
        .forEach((k) => {
          const val = typeof mem[k] === 'string' ? `"${mem[k]}"` : mem[k];
          parsed = parsed.replace(new RegExp(`\\b${k}\\b`, 'g'), val);
        });
      return new Function('return ' + parsed)();
    };

    while (pc < blocks.length) {
      if (steps++ > 1500) throw new Error('Infinite Loop terdeteksi! Periksa kondisi perulangan Anda.');
      const b = blocks[pc];

      if (visualStep) {
        setActiveLineIdx(pc);
        await new Promise((r) => setTimeout(r, 250));
      }

      if (b.type === 'DECLARE') {
        mem[b.varName] = b.dataType === 'teks' ? '' : 0;
        pc++;
      } else if (b.type === 'INPUT') {
        let rawVal = '';
        if (mockInputs !== null) {
          rawVal = mockInputs[mockIdx++] ?? '0';
        } else {
          rawVal = await new Promise((resolve) => setInputRequest({ prompt: b.prompt, resolve }));
        }
        const decl = blocks.find((x) => x.type === 'DECLARE' && x.varName === b.varName);
        let parsedVal = rawVal;
        if (decl?.dataType === 'angka') parsedVal = parseInt(rawVal, 10) || 0;
        else if (decl?.dataType === 'desimal') parsedVal = parseFloat(rawVal) || 0.0;

        mem[b.varName] = parsedVal;
        const line = `> ${b.prompt} ${rawVal}`;
        logs.push(line);
        if (visualStep) setConsoleOutput((p) => [...p, line]);
        pc++;
      } else if (b.type === 'PROCESS') {
        mem[b.resultVar] = evalExpr(b.expression);
        pc++;
      } else if (b.type === 'OUTPUT') {
        const v = b.varName && mem[b.varName] !== undefined ? mem[b.varName] : '';
        const line = `${b.text}${v}`;
        logs.push(line);
        if (visualStep) setConsoleOutput((p) => [...p, line]);
        pc++;
      } else if (b.type === 'IF_START' || b.type === 'WHILE_START') {
        pc = evalExpr(b.condition) ? pc + 1 : jumpMap[pc] + 1;
      } else if (b.type === 'WHILE_END') {
        pc = jumpMap[pc];
      } else {
        pc++;
      }

      if (visualStep) setMemoryWatch({ ...mem });
    }
    return logs.join('\n');
  };

  const handleRunInteractive = async () => {
    setMobilePane('terminal');
    setIsRunning(true);
    setConsoleOutput(['--- Menjalankan Simulasi ---']);
    setMemoryWatch({});
    setTestResults(null);
    try {
      await executeBlocks(null, true);
      setConsoleOutput((p) => [...p, '--- Program Selesai ---']);
    } catch (err) {
      setConsoleOutput((p) => [...p, `❌ Error: ${err.message}`]);
    } finally {
      setIsRunning(false);
      setActiveLineIdx(null);
      setInputRequest(null);
    }
  };

  const handleVerifyMission = async () => {
    if (!activeMission) return;
    setMobilePane('terminal');
    setIsRunning(true);
    setConsoleOutput(['🧪 Menguji solusi terhadap Test-Cases Misi...']);
    const results = [];
    let allPassed = true;

    try {
      for (const tc of activeMission.testCases) {
        const fullLog = await executeBlocks(tc.inputs, false);
        const passed = fullLog.includes(tc.expectedContains);
        if (!passed) allPassed = false;
        results.push({ label: tc.label, passed, actual: fullLog });
      }
      setTestResults(results);
      if (allPassed) {
        const stars = blocks.length <= activeMission.maxOptimalBlocks ? 3 : 2;
        onCompleteMission(activeMission.id, stars);
        setConsoleOutput((p) => [...p, `🎉 MISI SELESAI! Anda meraih ${stars} Bintang!`]);
      } else {
        setConsoleOutput((p) => [...p, '⚠️ Beberapa skenario uji belum sesuai target. Periksa kembali logika Anda.']);
      }
    } catch (err) {
      setConsoleOutput((p) => [...p, `❌ Gagal Uji Misi: ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  let indentCounter = 0;
  const indentedBlocks = blocks.map((b) => {
    if (b.type === 'IF_END' || b.type === 'WHILE_END') indentCounter = Math.max(0, indentCounter - 1);
    const indent = indentCounter;
    if (b.type === 'IF_START' || b.type === 'WHILE_START') indentCounter++;
    return { ...b, indent };
  });

  const staticWarnings = analyzeStaticBugs();

  return (
    <div className="space-y-3">
      {/* Banner Misi Aktif */}
      {activeMission && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                {activeMission.scaffoldingLevel}
              </span>
              <span className="text-[11px] text-indigo-700 font-semibold">
                Optimal: ≤ {activeMission.maxOptimalBlocks} Blok
              </span>
            </div>
            <h2 className="text-base md:text-lg font-extrabold text-slate-800">{activeMission.title}</h2>
            <p className="text-xs md:text-sm text-slate-600">{activeMission.description}</p>
            {showHint && (
              <p className="text-xs bg-amber-50 text-amber-800 border border-amber-200 p-2 rounded-lg mt-1.5">
                💡 <strong>Petunjuk:</strong> {activeMission.hint}
              </p>
            )}
          </div>
          <div className="flex gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex-1 md:flex-initial justify-center px-3 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center gap-1 active:scale-95"
            >
              <HelpCircle className="w-4 h-4" /> Petunjuk
            </button>
            <button
              onClick={() => setBlocks(JSON.parse(JSON.stringify(activeMission.initialBlocks)))}
              className="flex-1 md:flex-initial justify-center px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      )}

      {/* Segmented Control Khusus HP */}
      <div className="lg:hidden grid grid-cols-3 bg-slate-200/80 p-1 rounded-xl gap-1">
        <button
          onClick={() => setMobilePane('blocks')}
          className={`py-2 rounded-lg text-xs font-extrabold transition-all ${
            mobilePane === 'blocks' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          1. Blok ({blocks.length})
        </button>
        <button
          onClick={() => setMobilePane('code')}
          className={`py-2 rounded-lg text-xs font-extrabold transition-all ${
            mobilePane === 'code' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          2. Kode
        </button>
        <button
          onClick={() => setMobilePane('terminal')}
          className={`py-2 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
            mobilePane === 'terminal' ? 'bg-slate-900 text-emerald-400 shadow-sm' : 'text-slate-600'
          }`}
        >
          3. Terminal
          {inputRequest && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
        </button>
      </div>

      {/* Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Kolom 1: Palet Blok */}
        <div className={`${mobilePane === 'blocks' ? 'flex' : 'hidden'} lg:flex lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-3 flex-col gap-2 shadow-sm`}>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-1">Tambah Blok Cepat</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
            {[
              { type: 'DECLARE', label: '+ DECLARE', color: 'bg-blue-50 text-blue-700 border-blue-200' },
              { type: 'INPUT', label: '+ INPUT', color: 'bg-orange-50 text-orange-700 border-orange-200' },
              { type: 'PROCESS', label: '+ SET Proses', color: 'bg-purple-50 text-purple-700 border-purple-200' },
              { type: 'OUTPUT', label: '+ PRINT', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { type: 'IF_PAIR', label: '+ IF ... END', color: 'bg-amber-50 text-amber-800 border-amber-200' },
              { type: 'WHILE_PAIR', label: '+ WHILE', color: 'bg-pink-50 text-pink-800 border-pink-200' },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => addBlockFromPalette(item.type)}
                className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold active:scale-95 transition-all flex items-center justify-between ${item.color}`}
              >
                <span>{item.label}</span>
                <Plus className="w-3.5 h-3.5 shrink-0" />
              </button>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100">
            {staticWarnings.length === 0 ? (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Logika blok valid.
              </div>
            ) : (
              <ul className="space-y-1 text-[11px] text-amber-800 bg-amber-50 border border-amber-200 p-2 rounded-xl">
                {staticWarnings.map((w, i) => <li key={i}>• {w}</li>)}
              </ul>
            )}
          </div>
        </div>

        {/* Kolom 2: Workspace Drag-and-Drop */}
        <div className={`${mobilePane === 'blocks' ? 'flex' : 'hidden'} lg:flex lg:col-span-5 bg-white rounded-2xl border border-slate-200 flex-col shadow-sm overflow-hidden min-h-[380px]`}>
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center gap-2">
            <span className="text-xs font-extrabold text-slate-700">Susun Urutan</span>
            <div className="flex gap-2">
              <button
                onClick={handleRunInteractive}
                disabled={isRunning}
                className="bg-emerald-600 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Run
              </button>
              {activeMission && (
                <button
                  onClick={handleVerifyMission}
                  disabled={isRunning}
                  className="bg-indigo-600 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm disabled:opacity-50"
                >
                  <Award className="w-3.5 h-3.5" /> Uji Misi
                </button>
              )}
            </div>
          </div>

          <div className="p-2.5 flex-1 overflow-y-auto bg-slate-100/60 space-y-2">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={indentedBlocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                {indentedBlocks.map((block, idx) => (
                  <SortableBlockItem
                    key={block.id}
                    block={block}
                    index={idx}
                    isActiveLine={activeLineIdx === idx}
                    onUpdate={updateBlock}
                    onDelete={deleteBlock}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Kolom 3: Live Code + RAM Watch + Terminal */}
        <div className={`${mobilePane !== 'blocks' ? 'flex' : 'hidden'} lg:flex lg:col-span-4 flex-col gap-3`}>
          {/* Panel Live Code */}
          <div className={`${mobilePane === 'code' ? 'flex' : 'hidden'} lg:flex bg-[#1e1e2e] rounded-2xl border border-slate-800 overflow-hidden flex-col`}>
            <div className="px-3 py-2 bg-[#181825] border-b border-slate-700/60 flex justify-between items-center">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveLang('python')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${activeLang === 'python' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveLang('cpp')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${activeLang === 'cpp' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  C++
                </button>
              </div>
              <button
                onClick={() => onSendToEditor(activeLang === 'python' ? generatePython() : generateCPP(), activeLang)}
                className="text-[11px] bg-slate-800 text-emerald-400 px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1"
              >
                Edit Teks <ArrowRight className="w-3 h-3" />
              </button>
              <button
  onClick={handleAnalyzeWithAI}
  disabled={analyzingAI}
  className="text-[11px] bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1"
>
  {analyzingAI ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-amber-300" />}
  Analisis AI
</button>
            </div>
            <pre className="p-3 text-xs font-mono text-slate-200 overflow-auto min-h-[220px] lg:max-h-[160px]">
              <code>{activeLang === 'python' ? generatePython() : generateCPP()}</code>
            </pre>
            {aiFeedback && (
  <div className="p-3 bg-indigo-950/90 border-t border-indigo-500/40 text-xs text-indigo-100 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
    <div className="font-extrabold text-amber-300 mb-1">💡 Analisis Tutor AI:</div>
    {aiFeedback}
  </div>
)}
          </div>

          {/* Panel RAM + Terminal */}
          <div className={`${mobilePane === 'terminal' ? 'flex' : 'hidden'} lg:flex flex-col gap-3 flex-1`}>
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
              <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" /> Memori Variabel (RAM)
              </div>
              {Object.keys(memoryWatch).length === 0 ? (
                <p className="text-xs text-slate-400 italic">Belum ada data di memori...</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(memoryWatch).map(([k, v]) => (
                    <div key={k} className="bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg text-xs font-mono">
                      <span className="text-indigo-700 font-bold">{k}</span> = <span className="text-slate-800">{String(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-black rounded-2xl border border-slate-800 flex-1 min-h-[240px] lg:min-h-[170px] flex flex-col overflow-hidden">
              <div className="px-3 py-2 bg-zinc-900 border-b border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" /> TERMINAL SIMULATOR
                </span>
                <button
                  onClick={handleRunInteractive}
                  disabled={isRunning}
                  className="lg:hidden bg-emerald-600 text-white px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" /> Ulangi
                </button>
              </div>
              <div className="p-3 text-xs font-mono text-emerald-400 flex-1 overflow-y-auto space-y-1">
                {consoleOutput.map((line, i) => <div key={i}>{line}</div>)}

                {testResults && (
                  <div className="mt-2 pt-2 border-t border-slate-800 space-y-1">
                    {testResults.map((tr, i) => (
                      <div key={i} className={tr.passed ? 'text-emerald-400' : 'text-red-400'}>
                        {tr.passed ? '✔' : '✘'} {tr.label}
                      </div>
                    ))}
                  </div>
                )}

                {inputRequest && (
                  <div className="flex items-center gap-2 mt-2 bg-slate-900 p-2 rounded-lg border border-emerald-500/40">
                    <span className="text-amber-300">{`> ${inputRequest.prompt}`}</span>
                    <input
                      autoFocus
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          inputRequest.resolve(terminalInput);
                          setTerminalInput('');
                          setInputRequest(null);
                        }
                      }}
                      className="bg-slate-800 text-white px-2.5 py-1.5 rounded outline-none flex-1 text-sm"
                      placeholder="Ketik lalu Enter..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
