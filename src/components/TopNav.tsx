import React from 'react';
import { AppTab } from '../types';
import { ShieldAlert, Compass, HeartHandshake, ShieldCheck, BookOpen, Clock } from 'lucide-react';

interface TopNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onOpenStormModal: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  onOpenStormModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark (Single text element, no pills or subtext) */}
          <button
            onClick={() => onTabChange('today')}
            className="text-xl font-serif font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0 text-left hover:text-stone-700 transition-colors cursor-pointer"
          >
            Anchor & Grace
          </button>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => onTabChange('today')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                activeTab === 'today'
                  ? 'text-stone-950 border-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Today's Walk
            </button>
            <button
              onClick={() => onTabChange('next-move')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                activeTab === 'next-move'
                  ? 'text-stone-950 border-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              The Next Right Move
            </button>
            <button
              onClick={() => onTabChange('service')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                activeTab === 'service'
                  ? 'text-stone-950 border-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Outward Service
            </button>
            <button
              onClick={() => onTabChange('temple')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                activeTab === 'temple'
                  ? 'text-stone-950 border-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Temple Stewardship
            </button>
            <button
              onClick={() => onTabChange('journal')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 border-b-2 ${
                activeTab === 'journal'
                  ? 'text-stone-950 border-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Recovery & Journal
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Emergency Refuge / In The Storm) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenStormModal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-900 bg-stone-100 border border-stone-300 rounded-lg hover:bg-stone-200 transition-colors whitespace-nowrap shrink-0 active:scale-[0.98] cursor-pointer"
              title="Immediate refuge and grounding when in temptation or distress"
            >
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>In the Storm</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Sub-Indicator */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200/70 bg-[#F4F1EA] px-2 py-2 text-xs font-medium overflow-x-auto">
        <button
          onClick={() => onTabChange('today')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'today' ? 'bg-stone-900 text-stone-50' : 'text-stone-700'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Today</span>
        </button>
        <button
          onClick={() => onTabChange('next-move')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'next-move' ? 'bg-stone-900 text-stone-50' : 'text-stone-700'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Next Move</span>
        </button>
        <button
          onClick={() => onTabChange('service')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'service' ? 'bg-stone-900 text-stone-50' : 'text-stone-700'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Service</span>
        </button>
        <button
          onClick={() => onTabChange('temple')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'temple' ? 'bg-stone-900 text-stone-50' : 'text-stone-700'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Temple</span>
        </button>
        <button
          onClick={() => onTabChange('journal')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md whitespace-nowrap cursor-pointer ${
            activeTab === 'journal' ? 'bg-stone-900 text-stone-50' : 'text-stone-700'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Journal</span>
        </button>
      </div>
    </header>
  );
};
