import React, { useState } from 'react';
import { JournalEntry } from '../../types';
import {
  BookOpen,
  Plus,
  Trash2,
  Download,
  Shield,
  Search,
  Sparkles,
  Lock,
  RotateCcw,
} from 'lucide-react';

interface JournalViewProps {
  journalEntries: JournalEntry[];
  onAddJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'date'>) => void;
  onDeleteJournalEntry: (id: string) => void;
  onExportData: () => void;
  onClearAllData: () => void;
}

const GUIDED_PROMPTS = [
  'Where did I try to play God or force an outcome today?',
  'What is an honest fear, craving, or weakness I need to confess without shame?',
  'Where did unmerited grace meet me when I least deserved it?',
  'How can my past wounds or recovery become a bridge of comfort for someone else?',
  'What truth from Scripture speaks directly against my current anxiety?',
];

export const JournalView: React.FC<JournalViewProps> = ({
  journalEntries,
  onAddJournalEntry,
  onDeleteJournalEntry,
  onExportData,
  onClearAllData,
}) => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string>(GUIDED_PROMPTS[0]);
  const [reflectionText, setReflectionText] = useState<string>('');
  const [graceObserved, setGraceObserved] = useState<string>('');
  const [scriptureAnchor, setScriptureAnchor] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    onAddJournalEntry({
      promptQuestion: selectedPrompt,
      reflection: reflectionText.trim(),
      graceObserved: graceObserved.trim(),
      scriptureAnchor: scriptureAnchor.trim() || undefined,
    });

    setReflectionText('');
    setGraceObserved('');
    setScriptureAnchor('');
    setShowAddForm(false);
  };

  const filteredEntries = journalEntries.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.reflection.toLowerCase().includes(query) ||
      entry.promptQuestion.toLowerCase().includes(query) ||
      entry.graceObserved.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="border-b border-stone-200/80 pb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
        <div>
          <div className="text-xs text-stone-500 font-medium tracking-wide uppercase">
            Radical Humility &middot; Privacy First
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">
            Recovery & Grace Journal
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            A private space for honest self-examination, admitting flaws, and celebrating God's relentless mercy. 100% saved locally on your device.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onExportData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            title="Download all your reflections as a private JSON file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data</span>
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Wipe local storage and start with a fresh slate"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Slate</span>
          </button>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
          <div className="text-xs font-semibold text-rose-900">
            Clear all reflections and reset the entire app?
          </div>
          <p className="text-xs text-rose-800 leading-relaxed">
            This will wipe your locally stored reflections, surrender items, and service logs. If you need a fresh start without past baggage, you are free to begin again.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClearAllData();
                setShowClearConfirm(false);
              }}
              className="px-3.5 py-1.5 bg-rose-700 text-white rounded-lg text-xs font-medium hover:bg-rose-800 cursor-pointer"
            >
              Confirm Complete Fresh Start
            </button>
          </div>
        </div>
      )}

      {/* Guided Entry Creation */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
              No Mask &middot; No Performance
            </div>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mt-0.5">
              Honest Self-Examination
            </h2>
            <p className="text-xs text-stone-600">
              Speak truth into the dark. God already knows; confession is stepping into His light.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-stone-50 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Write Reflection'}</span>
          </button>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="p-5 bg-[#F9F8F5] border border-stone-200 rounded-xl space-y-4"
          >
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-800">
                  Select a Reflection Prompt
                </label>
                <select
                  value={selectedPrompt}
                  onChange={(e) => setSelectedPrompt(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  {GUIDED_PROMPTS.map((prompt, idx) => (
                    <option key={idx} value={prompt}>
                      {prompt}
                    </option>
                  ))}
                  <option value="Personal unburdening without prompt">
                    Custom Unburdening (No prompt)
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800">
                  Your Honest Reflection
                </label>
                <textarea
                  rows={4}
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Pour out what is actually happening in your heart. No spiritual clichés..."
                  className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800">
                    Where was grace present?
                  </label>
                  <input
                    type="text"
                    value={graceObserved}
                    onChange={(e) => setGraceObserved(e.target.value)}
                    placeholder="e.g., God stopped me before I lashed out in anger..."
                    className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-800">
                    Scripture Anchor (optional)
                  </label>
                  <input
                    type="text"
                    value={scriptureAnchor}
                    onChange={(e) => setScriptureAnchor(e.target.value)}
                    placeholder="e.g., Romans 8:1 or Matthew 11:28"
                    className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!reflectionText.trim()}
                className="px-4 py-2 bg-stone-900 text-stone-50 disabled:bg-stone-300 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Save Reflection Privately
              </button>
            </div>
          </form>
        )}

        {/* Filter and Search */}
        <div className="flex items-center gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search honest reflections..."
              className="w-full pl-9 pr-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-4 pt-2">
          {filteredEntries.length === 0 ? (
            <p className="text-xs text-stone-500 italic py-4">
              {searchQuery
                ? 'No reflections matched your search.'
                : 'No reflection entries yet. Take a quiet breath and write down your first honest thought.'}
            </p>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 bg-[#F9F8F5] border border-stone-200/90 rounded-xl space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-serif font-semibold text-stone-900">
                      {entry.promptQuestion}
                    </h3>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {entry.createdAt}
                      {entry.scriptureAnchor && (
                        <>
                          <span aria-hidden="true">&middot;</span>
                          <span className="font-medium text-stone-700">
                            {entry.scriptureAnchor}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteJournalEntry(entry.id)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                    title="Remove entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                  {entry.reflection}
                </p>

                {entry.graceObserved && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-lg text-xs text-amber-950">
                    <strong className="font-semibold">Grace observed:</strong> {entry.graceObserved}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Privacy Guarantee Note */}
      <div className="p-5 bg-stone-100/70 border border-stone-200/80 rounded-xl flex items-start gap-3">
        <Lock className="w-4 h-4 text-stone-600 mt-0.5 shrink-0" />
        <p className="text-xs text-stone-600 leading-relaxed">
          <strong className="text-stone-900">Absolute Privacy:</strong> Your prayers, flaws, confessions, and reflections remain stored only in your local browser sandbox. They are never sent to external telemetry servers or used for marketing algorithms.
        </p>
      </div>
    </div>
  );
};
