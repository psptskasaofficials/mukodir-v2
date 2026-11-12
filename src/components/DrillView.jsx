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
