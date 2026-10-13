import React, { useState } from 'react';
import { ScriptureVerse, DailyIntention } from '../../types';
import { SCRIPTURE_LIBRARY } from '../../data/scriptures';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Sun,
  ShieldAlert,
} from 'lucide-react';

interface TodayViewProps {
  dailyIntention: DailyIntention;
  onUpdateDailyIntention: (updated: DailyIntention) => void;
  onResetMercies: () => void;
  onNavigateToNextMove: () => void;
  onOpenStormModal: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  dailyIntention,
  onUpdateDailyIntention,
  onResetMercies,
  onNavigateToNextMove,
  onOpenStormModal,
}) => {
  const [selectedScriptureIndex, setSelectedScriptureIndex] = useState<number>(0);
  const [showContext, setShowContext] = useState<boolean>(false);
  const [showLordPrayerGuide, setShowLordPrayerGuide] = useState<boolean>(true);
  const [showResetNotice, setShowResetNotice] = useState<boolean>(false);

  const currentVerse = SCRIPTURE_LIBRARY[selectedScriptureIndex] || SCRIPTURE_LIBRARY[0];

  const handleNextScripture = () => {
    setSelectedScriptureIndex((prev) => (prev + 1) % SCRIPTURE_LIBRARY.length);
  };

  const handleSingleMoveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateDailyIntention({
      ...dailyIntention,
      singleRightMove: e.target.value,
    });
  };

  const handleToggleMoveCompleted = () => {
    onUpdateDailyIntention({
      ...dailyIntention,
      completed: !dailyIntention.completed,
    });
  };

  const handlePrayerReflectionChange = (
    field: keyof DailyIntention['lordPrayerReflections'],
    value: string
  ) => {
    onUpdateDailyIntention({
      ...dailyIntention,
      lordPrayerReflections: {
        ...dailyIntention.lordPrayerReflections,
        [field]: value,
      },
    });
  };

  const triggerResetMercies = () => {
    onResetMercies();
    setShowResetNotice(true);
    setTimeout(() => setShowResetNotice(false), 5000);
  };

  return (
    <div className="space-y-10">
      {/* Gentle Header & Grace Notice */}
      <div className="border-b border-stone-200/80 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <div>
            <div className="text-xs text-stone-500 font-medium tracking-wide uppercase">
              Daily Walk &middot; Today
            </div>
            <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">
              Morning Grace and Daily Bread
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={triggerResetMercies}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              title="Reset today with zero guilt or shame"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Mercies Reset</span>
            </button>
          </div>
        </div>

        {showResetNotice && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed transition-all">
            <p className="font-semibold">A Fresh Blank Slate Covered in Grace</p>
            <p className="mt-0.5">
              "His mercies never come to an end; they are new every morning." No broken streaks. No performance shame. You are meeting God right here in this hour.
            </p>
          </div>
        )}
      </div>

      {/* Scripture Anchor Section */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Sun className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-stone-800">Anchor for the Mind</span>
            <span aria-hidden="true">&middot;</span>
            <span>Theme: {currentVerse.theme}</span>
          </div>
          <button
            onClick={handleNextScripture}
            className="text-xs text-stone-600 hover:text-stone-900 font-medium underline underline-offset-4 cursor-pointer"
          >
            Read Another Passage
          </button>
        </div>

        <blockquote className="space-y-3">
          <p className="font-serif text-xl sm:text-2xl text-stone-900 leading-relaxed">
            "{currentVerse.text}"
          </p>
          <footer className="text-sm font-medium text-stone-600">
            {currentVerse.reference}
          </footer>
        </blockquote>

        <div className="pt-2 border-t border-stone-100">
          <button
            onClick={() => setShowContext(!showContext)}
            className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
          >
            <span>{showContext ? 'Hide Context & Reflection' : 'Read Biblical Context & Meditation'}</span>
            {showContext ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showContext && (
            <div className="mt-3 p-4 bg-[#F9F8F5] rounded-xl text-xs text-stone-700 leading-relaxed space-y-2 border border-stone-200/60">
              <p>
                <strong className="text-stone-900">Context:</strong> {currentVerse.context}
              </p>
              <p className="italic text-stone-600">
                Reflection question: What does it look like to lean on this promise today rather than your own anxiety or performance?
              </p>
            </div>
          )}
        </div>
      </section>

      {/* The Single Faithful Step */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div>
          <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
            Simplicity over Overwhelm
          </div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mt-1">
            Today's Single Faithful Move
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Do not carry the whole week. What is the one obedient, honest action God is asking you to take today?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <input
            type="text"
            value={dailyIntention.singleRightMove}
            onChange={handleSingleMoveChange}
            placeholder="e.g., Have an honest conversation with Mark, or spend 20 minutes walking in prayer..."
            className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
          />
          <button
            onClick={handleToggleMoveCompleted}
            className={`px-5 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              dailyIntention.completed
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-stone-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{dailyIntention.completed ? 'Faithfully Done' : 'Mark as Done'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
          <span>Focus on obedience in this moment, not the final outcome.</span>
          <button
            onClick={onNavigateToNextMove}
            className="text-stone-800 hover:underline font-medium cursor-pointer"
          >
            Need help breaking it down? &rarr;
          </button>
        </div>
      </section>

      {/* The Pattern of Honest Prayer (Lord's Prayer Scaffold) */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
              Matthew 6:9-13
            </div>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mt-1">
              Honest Prayer Pattern
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Strip away pretense. Step down from the throne and talk with your Father.
            </p>
          </div>
          <button
            onClick={() => setShowLordPrayerGuide(!showLordPrayerGuide)}
            className="text-xs text-stone-600 hover:text-stone-900 font-medium cursor-pointer"
          >
            {showLordPrayerGuide ? 'Minimize Prompts' : 'Open Prayer Prompts'}
          </button>
        </div>

        {showLordPrayerGuide && (
          <div className="space-y-5">
            {/* 1. Praise */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-900">
                1. "Our Father in heaven, hallowed be Your name" (Praise & Awe)
              </label>
              <p className="text-xs text-stone-500">
                Remember who God is. How does His holiness and love dwarf the problems stressing you out?
              </p>
              <textarea
                rows={2}
                value={dailyIntention.lordPrayerReflections.praise}
                onChange={(e) => handlePrayerReflectionChange('praise', e.target.value)}
                placeholder="Father, You are holy and constant when my feelings are erratic..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
              />
            </div>

            {/* 2. Surrender */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-900">
                2. "Your kingdom come, Your will be done" (Daily Surrender)
              </label>
              <p className="text-xs text-stone-500">
                What agenda, expectation, or desire to control outcomes are you handing over right now?
              </p>
              <textarea
                rows={2}
                value={dailyIntention.lordPrayerReflections.surrender}
                onChange={(e) => handlePrayerReflectionChange('surrender', e.target.value)}
                placeholder="Not my timeline, but Your will. I relinquish my demand for this meeting to go my way..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
              />
            </div>

            {/* 3. Daily Bread */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-900">
                3. "Give us this day our daily bread" (Dependence Today Only)
              </label>
              <p className="text-xs text-stone-500">
                Do not ask for next month's strength. What physical, mental, or emotional bread do you need today?
              </p>
              <textarea
                rows={2}
                value={dailyIntention.lordPrayerReflections.dailyBread}
                onChange={(e) => handlePrayerReflectionChange('dailyBread', e.target.value)}
                placeholder="Give me patient words for my children, and focus for the work ahead..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
              />
            </div>

            {/* 4. Forgiveness */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-900">
                4. "Forgive us our debts, as we also have forgiven" (Confession & Release)
              </label>
              <p className="text-xs text-stone-500">
                Admit your flaws without defensive shame. Who are you holding resentment against that you need to forgive?
              </p>
              <textarea
                rows={2}
                value={dailyIntention.lordPrayerReflections.confessionAndForgiveness}
                onChange={(e) =>
                  handlePrayerReflectionChange('confessionAndForgiveness', e.target.value)
                }
                placeholder="Forgive my irritation. I choose to release my grudge toward..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
              />
            </div>

            {/* 5. Deliverance */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-900">
                5. "Lead us not into temptation, but deliver us from evil" (Sober Vigilance)
              </label>
              <p className="text-xs text-stone-500">
                Where are you vulnerable today? Old addictions, pride, anger, or mindless scrolling?
              </p>
              <textarea
                rows={2}
                value={dailyIntention.lordPrayerReflections.deliverance}
                onChange={(e) => handlePrayerReflectionChange('deliverance', e.target.value)}
                placeholder="Lord, guard my eyes when I am tired this afternoon. Deliver me from self-pity..."
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
              />
            </div>
          </div>
        )}
      </section>

      {/* Gentle Footer Banner for Real Life */}
      <div className="p-6 bg-[#F4F1EA] rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-serif font-semibold text-stone-900">
            A Scaffold for Real Life
          </h4>
          <p className="text-xs text-stone-600 mt-0.5">
            This tool is here to anchor you and send you back out into your calling, your family, and your neighbor.
          </p>
        </div>
        <button
          onClick={onOpenStormModal}
          className="px-4 py-2 bg-stone-900 text-stone-50 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors whitespace-nowrap cursor-pointer shrink-0"
        >
          Need Quick Refuge Right Now?
        </button>
      </div>
    </div>
  );
};
