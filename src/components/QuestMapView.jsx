import React, { useState } from 'react';
import { MISSIONS } from '../data/missions';
import { Star, Lock, Play, Award, Eye } from 'lucide-react';

export default function QuestMapView({ progress, onSelectMission }) {
  const [teacherMode, setTeacherMode] = useState(false);

  const totalStars = Object.values(progress).reduce((a, b) => a + b, 0);
  const maxStars = MISSIONS.length * 3;
  const rank =
    totalStars >= 9 ? 'Algorithm Master' :
    totalStars >= 4 ? 'Logic Architect' : 'Novice Scripter';

  return (
    <div className="space-y-6">
      {/* Header Pangkat & Total Bintang */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pangkat Pembelajar</span>
            <h2 className="text-2xl font-extrabold text-slate-800">{rank}</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-extrabold text-amber-900">{totalStars} / {maxStars} Bintang</span>
          </div>
          <button
            onClick={() => setTeacherMode(!teacherMode)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
              teacherMode ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" /> {teacherMode ? 'Mode Guru: Aktif' : 'Mode Guru'}
          </button>
        </div>
      </div>

      {/* Daftar Kartu Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MISSIONS.map((mission, index) => {
          const earnedStars = progress[mission.id] || 0;
          const prevMissionId = index > 0 ? MISSIONS[index - 1].id : null;
          const isUnlocked = teacherMode || index === 0 || (progress[prevMissionId] || 0) > 0;

          return (
            <div
              key={mission.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-slate-200 shadow-sm hover:border-indigo-300'
                  : 'bg-slate-100/80 border-slate-200 opacity-70'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                    {mission.world}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= earnedStars ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-1">{mission.title}</h3>
                <span className="inline-block text-[11px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded mb-3">
                  {mission.scaffoldingLevel}
                </span>
                <p className="text-sm text-slate-600 mb-4">{mission.description}</p>
              </div>

              <button
                disabled={!isUnlocked}
                onClick={() => onSelectMission(mission)}
                className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  isUnlocked
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Play className="w-4 h-4 fill-current" /> {earnedStars > 0 ? 'Ulangi Misi' : 'Mulai Misi'}
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Selesaikan Misi Sebelumnya
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
