import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  onComplete?: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

const PHASE_INSTRUCTIONS: Record<Phase, { text: string; sub: string; duration: number }> = {
  inhale: { text: 'Breathe in grace', sub: 'Receive His life and presence', duration: 4 },
  hold: { text: 'Rest in His peace', sub: 'He holds the universe and your life', duration: 4 },
  exhale: { text: 'Release the burden', sub: 'Surrender control and fear', duration: 4 },
  rest: { text: 'Be still', sub: 'Know that He is God', duration: 4 },
};

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onComplete }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [phaseProgress, setPhaseProgress] = useState<number>(0);

  useEffect(() => {
    let timer: any = null;
    if (isActive && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, secondsRemaining, onComplete]);

  // Phase cycle logic
  useEffect(() => {
    if (!isActive) return;
    const cycle = ['inhale', 'hold', 'exhale', 'rest'] as const;
    const interval = setInterval(() => {
      setPhase((current) => {
        const nextIndex = (cycle.indexOf(current) + 1) % cycle.length;
        return cycle[nextIndex];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isActive]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setSecondsRemaining(60);
    setPhaseProgress(0);
  };

  const getScaleClass = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-110 bg-stone-100 border-stone-300';
      case 'hold':
        return 'scale-110 bg-amber-50/70 border-amber-200';
      case 'exhale':
        return 'scale-90 bg-stone-50 border-stone-200';
      case 'rest':
        return 'scale-95 bg-[#F9F7F2] border-stone-200';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      {/* Visual Breathing Disc */}
      <div className="relative w-48 h-48 flex items-center justify-center my-4">
        {/* Outer gentle halo */}
        <div
          className={`absolute inset-0 rounded-full border transition-all duration-[4000ms] ease-out ${getScaleClass()}`}
        />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center px-4">
          <p className="text-base font-serif font-medium text-stone-900 transition-all duration-500">
            {PHASE_INSTRUCTIONS[phase].text}
          </p>
          <p className="text-xs text-stone-500 mt-1 max-w-[130px] leading-tight">
            {PHASE_INSTRUCTIONS[phase].sub}
          </p>
          <span className="text-xs font-mono text-stone-400 mt-3 tabular-nums">
            {secondsRemaining}s remaining
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause Stillness</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>{secondsRemaining === 60 ? 'Begin 60 Seconds Stillness' : 'Resume'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-2.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-stone-500 italic mt-4 max-w-sm">
        "Be still, and know that I am God." &middot; Psalm 46:10
      </p>
    </div>
  );
};
