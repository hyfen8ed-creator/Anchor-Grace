import React, { useState, useEffect } from 'react';
import { SurrenderItem } from '../../types';
import { BreathingExercise } from '../BreathingExercise';
import {
  Compass,
  Check,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface NextMoveViewProps {
  surrenderItems: SurrenderItem[];
  onAddSurrenderItem: (item: Omit<SurrenderItem, 'id' | 'surrenderedAt' | 'status'>) => void;
  onDeleteSurrenderItem: (id: string) => void;
}

export const NextMoveView: React.FC<NextMoveViewProps> = ({
  surrenderItems,
  onAddSurrenderItem,
  onDeleteSurrenderItem,
}) => {
  // 15-Minute Focus Timer State
  const [focusTask, setFocusTask] = useState<string>('');
  const [timerSeconds, setTimerSeconds] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerCompleted, setTimerCompleted] = useState<boolean>(false);

  // Surrender Form State
  const [surrenderText, setSurrenderText] = useState<string>('');
  const [surrenderCategory, setSurrenderCategory] = useState<SurrenderItem['category']>('control');
  const [surrenderSuccess, setSurrenderSuccess] = useState<boolean>(false);

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setTimerCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = () => {
    if (!focusTask.trim()) return;
    setIsTimerRunning(true);
    setTimerCompleted(false);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(15 * 60);
    setTimerCompleted(false);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSurrenderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surrenderText.trim()) return;

    onAddSurrenderItem({
      description: surrenderText.trim(),
      category: surrenderCategory,
    });

    setSurrenderText('');
    setSurrenderSuccess(true);
    setTimeout(() => setSurrenderSuccess(false), 4000);
  };

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="border-b border-stone-200/80 pb-6">
        <div className="text-xs text-stone-500 font-medium tracking-wide uppercase">
          Orientation &middot; Grounding
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">
          The Next Right Move
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          When the horizon feels overwhelming, God does not give a five-year blueprint. He gives daily bread and a lamp for your immediate next step.
        </p>
      </div>

      {/* Section 1: The 15-Minute Faithful Focus */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
            One Faithful Quarter-Hour
          </div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mt-1">
            Focus for Just 15 Minutes
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Break paralysis. Pick one humble, necessary task and do it with your whole heart before God.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-800">
                What is the immediate action in front of you?
              </label>
              <input
                type="text"
                value={focusTask}
                onChange={(e) => setFocusTask(e.target.value)}
                placeholder="e.g., Wash the dishes, answer one overdue message honestly, or pray quietly..."
                className="w-full mt-1.5 px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              {isTimerRunning ? (
                <button
                  onClick={handlePauseTimer}
                  className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-50 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause Timer</span>
                </button>
              ) : (
                <button
                  onClick={handleStartTimer}
                  disabled={!focusTask.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-50 disabled:bg-stone-300 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Start 15 Minutes</span>
                </button>
              )}

              <button
                onClick={handleResetTimer}
                className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                title="Reset timer to 15:00"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {timerCompleted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                <span className="font-semibold">Well done.</span> You took one faithful step. You do not have to conquer everything today. Give thanks and rest for a moment.
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#F9F8F5] rounded-xl border border-stone-200/80">
            <span className="text-4xl sm:text-5xl font-mono font-bold text-stone-900 tabular-nums">
              {formatTimer(timerSeconds)}
            </span>
            <span className="text-xs text-stone-500 mt-2">
              {isTimerRunning ? 'Step by step with God' : 'Quiet, unhurried focus'}
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: The Surrender Altar */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
            Lived Recovery &middot; Daily Surrender
          </div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mt-1">
            The Surrender Altar
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Discipleship is relinquishing the illusion of control. What are you trying to force, micromanage, or obsess over? Leave it in the Father's hands.
          </p>
        </div>

        {surrenderSuccess && (
          <div className="p-4 bg-stone-100 border border-stone-300 rounded-xl text-xs text-stone-800 leading-relaxed">
            <p className="font-semibold text-stone-900">Released to God</p>
            <p className="mt-0.5">
              "Cast all your anxiety on him because he cares for you." (1 Peter 5:7). It is no longer your burden to carry.
            </p>
          </div>
        )}

        <form onSubmit={handleSurrenderSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-800">
              What burden, outcome, or person are you releasing today?
            </label>
            <textarea
              rows={3}
              value={surrenderText}
              onChange={(e) => setSurrenderText(e.target.value)}
              placeholder="e.g., I surrender the fear that I will be misunderstood. I surrender my attempt to fix my brother's choices..."
              className="w-full mt-1.5 px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Nature of burden:</span>
              <select
                value={surrenderCategory}
                onChange={(e) => setSurrenderCategory(e.target.value as SurrenderItem['category'])}
                className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
              >
                <option value="control">Need for Control</option>
                <option value="anxiety">Anxiety / Tomorrow's Fear</option>
                <option value="resentment">Old Resentment</option>
                <option value="craving">Craving / Escape Impulse</option>
                <option value="pride">Ego / Need for Validation</option>
                <option value="other">Other Burden</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!surrenderText.trim()}
              className="px-5 py-2.5 bg-stone-900 text-stone-50 disabled:bg-stone-300 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Surrender into God's Hands
            </button>
          </div>
        </form>

        {/* List of Burdens Left at the Cross */}
        <div className="pt-4 border-t border-stone-100 space-y-3">
          <div className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
            Entrusted to God ({surrenderItems.length})
          </div>

          {surrenderItems.length === 0 ? (
            <p className="text-xs text-stone-500 italic py-2">
              No surrendered items currently logged. Use this space whenever anxiety grips your chest.
            </p>
          ) : (
            <div className="space-y-2.5">
              {surrenderItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#F9F8F5] border border-stone-200/80 rounded-xl flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <p className="text-xs text-stone-800 leading-relaxed">
                      "{item.description}"
                    </p>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2">
                      <span className="capitalize">{item.category}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>Released {item.surrenderedAt}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteSurrenderItem(item.id)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Grounding Stillness */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div>
          <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
            Psalm 46:10
          </div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mt-1">
            Centering Stillness
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Step away from the rush. Let the body un-tense. God is already in this room with you.
          </p>
        </div>

        <BreathingExercise />
      </section>
    </div>
  );
};
