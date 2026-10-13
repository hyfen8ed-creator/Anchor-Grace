import React, { useState } from 'react';
import { ServiceAct, PrayerRequest } from '../../types';
import {
  HeartHandshake,
  Plus,
  CheckCircle2,
  Trash2,
  Users,
  Send,
  MessageSquare,
  Gift,
  Ear,
  Check,
} from 'lucide-react';

interface ServiceViewProps {
  serviceActs: ServiceAct[];
  prayerRequests: PrayerRequest[];
  onAddServiceAct: (act: Omit<ServiceAct, 'id' | 'isCompleted'>) => void;
  onToggleServiceAct: (id: string) => void;
  onDeleteServiceAct: (id: string) => void;
  onAddPrayerRequest: (req: Omit<PrayerRequest, 'id' | 'createdAt' | 'isAnswered'>) => void;
  onTogglePrayerAnswered: (id: string, note?: string) => void;
  onDeletePrayerRequest: (id: string) => void;
}

export const ServiceView: React.FC<ServiceViewProps> = ({
  serviceActs,
  prayerRequests,
  onAddServiceAct,
  onToggleServiceAct,
  onDeleteServiceAct,
  onAddPrayerRequest,
  onTogglePrayerAnswered,
  onDeletePrayerRequest,
}) => {
  // Service Act Form State
  const [showAddAct, setShowAddAct] = useState<boolean>(false);
  const [actTitle, setActTitle] = useState<string>('');
  const [actRecipient, setActRecipient] = useState<string>('');
  const [actCategory, setActCategory] = useState<ServiceAct['category']>('encouragement');
  const [actNotes, setActNotes] = useState<string>('');

  // Prayer Request Form State
  const [showAddPrayer, setShowAddPrayer] = useState<boolean>(false);
  const [prayerName, setPrayerName] = useState<string>('');
  const [prayerNeed, setPrayerNeed] = useState<string>('');

  // Answered Note Modal / Input
  const [answeringPrayerId, setAnsweringPrayerId] = useState<string | null>(null);
  const [answeredNote, setAnsweredNote] = useState<string>('');

  const handleCreateServiceAct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actTitle.trim()) return;

    onAddServiceAct({
      title: actTitle.trim(),
      recipient: actRecipient.trim() || undefined,
      category: actCategory,
      notes: actNotes.trim() || undefined,
    });

    setActTitle('');
    setActRecipient('');
    setActNotes('');
    setShowAddAct(false);
  };

  const handleCreatePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerName.trim() || !prayerNeed.trim()) return;

    onAddPrayerRequest({
      name: prayerName.trim(),
      need: prayerNeed.trim(),
    });

    setPrayerName('');
    setPrayerNeed('');
    setShowAddPrayer(false);
  };

  const submitAnsweredNote = (id: string) => {
    onTogglePrayerAnswered(id, answeredNote.trim());
    setAnsweringPrayerId(null);
    setAnsweredNote('');
  };

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="border-b border-stone-200/80 pb-6">
        <div className="text-xs text-stone-500 font-medium tracking-wide uppercase">
          Titus 3:1 &middot; 2 Corinthians 1:4
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">
          Ready for Every Good Work
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          Discipleship moves outward. We do not recover merely to feel comfortable in our own skin; we are healed to be poured out for our neighbors.
        </p>
      </div>

      {/* Scriptural Anchor for Service */}
      <section className="bg-stone-100/70 border border-stone-200/80 rounded-2xl p-6 space-y-2">
        <p className="font-serif text-stone-800 text-sm leading-relaxed italic">
          "Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies and God of all comfort, who comforts us in all our affliction, so that we may be able to comfort those who are in any affliction, with the comfort with which we ourselves are comforted by God."
        </p>
        <p className="text-xs text-stone-500 text-right">
          2 Corinthians 1:3-4
        </p>
      </section>

      {/* Outward Acts of Love */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
              Quiet & Sacrificial Love
            </div>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mt-0.5">
              Ordinary Acts of Mercy
            </h2>
            <p className="text-xs text-stone-600">
              Not for applause or social credit, but as quiet obedience to Christ.
            </p>
          </div>
          <button
            onClick={() => setShowAddAct(!showAddAct)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-stone-50 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add a Neighbor to Serve</span>
          </button>
        </div>

        {/* Add Form */}
        {showAddAct && (
          <form
            onSubmit={handleCreateServiceAct}
            className="p-5 bg-[#F9F8F5] border border-stone-200 rounded-xl space-y-4"
          >
            <div className="text-xs font-semibold text-stone-900">
              New Outward Service Act
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-stone-700">
                  What quiet act will you offer?
                </label>
                <input
                  type="text"
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  placeholder="e.g., Send a heartfelt message of gratitude, cook soup, or visit in hospital..."
                  className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-stone-700">
                    Recipient (optional, first name only)
                  </label>
                  <input
                    type="text"
                    value={actRecipient}
                    onChange={(e) => setActRecipient(e.target.value)}
                    placeholder="e.g., Jonathan"
                    className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-700">
                    Category
                  </label>
                  <select
                    value={actCategory}
                    onChange={(e) => setActCategory(e.target.value as ServiceAct['category'])}
                    className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="encouragement">Encouragement / Text of Hope</option>
                    <option value="practical-help">Practical Help / Errand / Food</option>
                    <option value="recovery-support">Recovery / Addiction Support</option>
                    <option value="secret-kindness">Secret Kindness</option>
                    <option value="forgiveness">Extending Forgiveness</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700">
                  Personal notes or prayer for them (optional)
                </label>
                <input
                  type="text"
                  value={actNotes}
                  onChange={(e) => setActNotes(e.target.value)}
                  placeholder="e.g., Remembering how lonely that trial felt when I walked through it."
                  className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddAct(false)}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!actTitle.trim()}
                className="px-4 py-2 bg-stone-900 text-stone-50 disabled:bg-stone-300 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Save Act of Service
              </button>
            </div>
          </form>
        )}

        {/* List of Acts */}
        <div className="space-y-3">
          {serviceActs.length === 0 ? (
            <p className="text-xs text-stone-500 italic py-2">
              No service acts currently logged. Ask God who in your sphere needs a quiet touch of grace today.
            </p>
          ) : (
            serviceActs.map((act) => (
              <div
                key={act.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  act.isCompleted
                    ? 'bg-stone-50/70 border-stone-200 opacity-80'
                    : 'bg-[#F9F8F5] border-stone-200/90'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onToggleServiceAct(act.id)}
                    className="mt-0.5 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
                    title={act.isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        act.isCompleted ? 'text-emerald-700 fill-emerald-100' : 'text-stone-300'
                      }`}
                    />
                  </button>

                  <div className="space-y-1">
                    <p
                      className={`text-sm font-medium ${
                        act.isCompleted ? 'line-through text-stone-500' : 'text-stone-900'
                      }`}
                    >
                      {act.title}
                    </p>
                    {act.notes && (
                      <p className="text-xs text-stone-600 italic leading-relaxed">
                        "{act.notes}"
                      </p>
                    )}
                    <div className="text-[11px] text-stone-500 flex items-center gap-2">
                      <span className="capitalize">{act.category.replace('-', ' ')}</span>
                      {act.recipient && (
                        <>
                          <span aria-hidden="true">&middot;</span>
                          <span>For {act.recipient}</span>
                        </>
                      )}
                      {act.isCompleted && (
                        <>
                          <span aria-hidden="true">&middot;</span>
                          <span className="text-emerald-700 font-medium">Completed</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteServiceAct(act.id)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  title="Remove act"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Private Intercession Wall */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
              Persistent Prayer
            </div>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mt-0.5">
              The Private Intercession Wall
            </h2>
            <p className="text-xs text-stone-600">
              Lifting brothers, sisters, and neighbors before the Father in secret.
            </p>
          </div>
          <button
            onClick={() => setShowAddPrayer(!showAddPrayer)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-stone-50 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Prayer Request</span>
          </button>
        </div>

        {/* Add Prayer Form */}
        {showAddPrayer && (
          <form
            onSubmit={handleCreatePrayer}
            className="p-5 bg-[#F9F8F5] border border-stone-200 rounded-xl space-y-4"
          >
            <div className="text-xs font-semibold text-stone-900">
              New Prayer Request
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-stone-700">
                  Name of person or group
                </label>
                <input
                  type="text"
                  value={prayerName}
                  onChange={(e) => setPrayerName(e.target.value)}
                  placeholder="e.g., David (brother in recovery)"
                  className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-700">
                  What is their trial or spiritual need?
                </label>
                <textarea
                  rows={2}
                  value={prayerNeed}
                  onChange={(e) => setPrayerNeed(e.target.value)}
                  placeholder="e.g., Facing court date on Friday, praying for God's mercy and peace..."
                  className="w-full mt-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddPrayer(false)}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!prayerName.trim() || !prayerNeed.trim()}
                className="px-4 py-2 bg-stone-900 text-stone-50 disabled:bg-stone-300 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Entrust to Prayer
              </button>
            </div>
          </form>
        )}

        {/* Answering Modal / Drawer */}
        {answeringPrayerId && (
          <div className="p-4 bg-amber-50/80 border border-amber-300/80 rounded-xl space-y-3">
            <div className="text-xs font-semibold text-amber-950">
              Answered with Quiet Gratitude
            </div>
            <p className="text-xs text-amber-900">
              Write a short note of how God worked in this situation (not boasting, but humble thanksgiving).
            </p>
            <input
              type="text"
              value={answeredNote}
              onChange={(e) => setAnsweredNote(e.target.value)}
              placeholder="e.g., Received news that they reconciled and peace was restored..."
              className="w-full px-3.5 py-2 bg-white border border-amber-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setAnsweringPrayerId(null)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => submitAnsweredNote(answeringPrayerId)}
                className="px-3.5 py-1.5 bg-stone-900 text-stone-50 rounded-lg text-xs font-medium hover:bg-stone-800 cursor-pointer"
              >
                Save Thanksgiving Note
              </button>
            </div>
          </div>
        )}

        {/* Prayer List */}
        <div className="space-y-3">
          {prayerRequests.length === 0 ? (
            <p className="text-xs text-stone-500 italic py-2">
              No private prayers logged yet. Write down the names of those God has put on your heart.
            </p>
          ) : (
            prayerRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 bg-[#F9F8F5] border border-stone-200/90 rounded-xl flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-900">
                      {req.name}
                    </span>
                    {req.isAnswered ? (
                      <span className="text-[11px] text-emerald-800 font-medium">
                        &middot; Answered
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-500">
                        &middot; Active Prayer
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    {req.need}
                  </p>

                  {req.answeredNote && (
                    <div className="p-2.5 bg-emerald-50/60 border border-emerald-200/60 rounded-lg text-xs text-emerald-950 mt-1">
                      <strong className="font-semibold">Gratitude note:</strong> {req.answeredNote}
                    </div>
                  )}

                  <div className="text-[11px] text-stone-400 flex items-center gap-2 pt-1">
                    <span>Added {req.createdAt}</span>
                    <span aria-hidden="true">&middot;</span>
                    <button
                      onClick={() => {
                        if (!req.isAnswered) {
                          setAnsweringPrayerId(req.id);
                        } else {
                          onTogglePrayerAnswered(req.id);
                        }
                      }}
                      className="text-stone-700 hover:text-stone-950 underline font-medium cursor-pointer"
                    >
                      {req.isAnswered ? 'Re-open Prayer' : 'Mark as Answered'}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onDeletePrayerRequest(req.id)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                  title="Remove prayer request"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
