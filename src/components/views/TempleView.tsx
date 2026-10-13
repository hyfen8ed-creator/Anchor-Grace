import React from 'react';
import { TempleRhythm } from '../../types';
import {
  ShieldCheck,
  Moon,
  Droplets,
  Footprints,
  EyeOff,
  CheckCircle2,
  Heart,
} from 'lucide-react';

interface TempleViewProps {
  templeRhythm: TempleRhythm;
  onUpdateTempleRhythm: (updated: TempleRhythm) => void;
}

export const TempleView: React.FC<TempleViewProps> = ({
  templeRhythm,
  onUpdateTempleRhythm,
}) => {
  const toggleField = (field: keyof Omit<TempleRhythm, 'date' | 'stewardshipNotes'>) => {
    onUpdateTempleRhythm({
      ...templeRhythm,
      [field]: !templeRhythm[field],
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateTempleRhythm({
      ...templeRhythm,
      stewardshipNotes: e.target.value,
    });
  };

  return (
    <div className="space-y-10">
      {/* View Header */}
      <div className="border-b border-stone-200/80 pb-6">
        <div className="text-xs text-stone-500 font-medium tracking-wide uppercase">
          1 Corinthians 6:19-20 &middot; Stewardship over Vanity
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">
          Honoring the Temple
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          We do not care for our bodies to worship ourselves in mirrors or pursue vanity metrics. We steward our physical vessel so we have the mental clarity, sober spirit, and stamina to serve God and love our neighbors.
        </p>
      </div>

      {/* Scriptural Anchor */}
      <section className="bg-stone-100/70 border border-stone-200/80 rounded-2xl p-6 space-y-2">
        <p className="font-serif text-stone-800 text-sm leading-relaxed italic">
          "Or do you not know that your body is a temple of the Holy Spirit within you, whom you have from God? You are not your own, for you were bought with a price. So glorify God in your body."
        </p>
        <p className="text-xs text-stone-500 text-right">
          1 Corinthians 6:19-20
        </p>
      </section>

      {/* The 4 Humble Foundations */}
      <section className="space-y-4">
        <div>
          <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
            Today's Physical Stewardship
          </div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mt-0.5">
            Four Simple Disciplines
          </h2>
          <p className="text-xs text-stone-600">
            A quiet check-in with your body. Tap each discipline as you steward it today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Discipline 1: Rest & Sabbath */}
          <div
            onClick={() => toggleField('sleepRest')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              templeRhythm.sleepRest
                ? 'bg-white border-stone-900 shadow-xs'
                : 'bg-[#F9F8F5] border-stone-200 hover:border-stone-400'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
                  <Moon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      templeRhythm.sleepRest ? 'text-emerald-700 fill-emerald-100' : 'text-stone-300'
                    }`}
                  />
                  <span className={templeRhythm.sleepRest ? 'text-stone-900 font-semibold' : 'text-stone-500'}>
                    {templeRhythm.sleepRest ? 'Stewarded' : 'To Steward'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-serif font-semibold text-stone-900">
                  Rest & Sabbath Boundary
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Honoring 7-8 hours of sleep and placing digital boundaries before bed. Admitting human limitation.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 mt-4">
              "It is in vain that you rise up early and go late to rest... for he gives to his beloved sleep." (Psalm 127:2)
            </div>
          </div>

          {/* Discipline 2: Clean Water & Nourishment */}
          <div
            onClick={() => toggleField('waterNourishment')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              templeRhythm.waterNourishment
                ? 'bg-white border-stone-900 shadow-xs'
                : 'bg-[#F9F8F5] border-stone-200 hover:border-stone-400'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      templeRhythm.waterNourishment ? 'text-emerald-700 fill-emerald-100' : 'text-stone-300'
                    }`}
                  />
                  <span className={templeRhythm.waterNourishment ? 'text-stone-900 font-semibold' : 'text-stone-500'}>
                    {templeRhythm.waterNourishment ? 'Stewarded' : 'To Steward'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-serif font-semibold text-stone-900">
                  Clean Nourishment & Hydration
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Drinking clean water, eating with thanksgiving, and abstaining from harmful or numbing substances.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 mt-4">
              "So, whether you eat or drink, or whatever you do, do all to the glory of God." (1 Cor 10:31)
            </div>
          </div>

          {/* Discipline 3: Movement & Creation */}
          <div
            onClick={() => toggleField('movementFreshAir')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              templeRhythm.movementFreshAir
                ? 'bg-white border-stone-900 shadow-xs'
                : 'bg-[#F9F8F5] border-stone-200 hover:border-stone-400'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
                  <Footprints className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      templeRhythm.movementFreshAir ? 'text-emerald-700 fill-emerald-100' : 'text-stone-300'
                    }`}
                  />
                  <span className={templeRhythm.movementFreshAir ? 'text-stone-900 font-semibold' : 'text-stone-500'}>
                    {templeRhythm.movementFreshAir ? 'Stewarded' : 'To Steward'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-serif font-semibold text-stone-900">
                  Movement in God's World
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  A brisk walk outside, gentle stretching, or physical activity to maintain bodily health for service.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 mt-4">
              "For bodily training is of some value, but godliness is of value in every way." (1 Tim 4:8)
            </div>
          </div>

          {/* Discipline 4: Guarding the Gates */}
          <div
            onClick={() => toggleField('guardedGates')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              templeRhythm.guardedGates
                ? 'bg-white border-stone-900 shadow-xs'
                : 'bg-[#F9F8F5] border-stone-200 hover:border-stone-400'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      templeRhythm.guardedGates ? 'text-emerald-700 fill-emerald-100' : 'text-stone-300'
                    }`}
                  />
                  <span className={templeRhythm.guardedGates ? 'text-stone-900 font-semibold' : 'text-stone-500'}>
                    {templeRhythm.guardedGates ? 'Stewarded' : 'To Steward'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-serif font-semibold text-stone-900">
                  Guarding the Senses & Mind
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Fasting from toxic noise, outrage media, envy-inducing feeds, and old addiction triggers.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 mt-4">
              "Keep your heart with all vigilance, for from it flow the springs of life." (Proverbs 4:23)
            </div>
          </div>
        </div>
      </section>

      {/* Stewardship Reflection Notes */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div>
          <div className="text-xs text-stone-500 font-medium uppercase tracking-wide">
            Honest Bodily Check-in
          </div>
          <h2 className="text-xl font-serif font-semibold text-stone-900 mt-0.5">
            How Does the Temple Feel Today?
          </h2>
          <p className="text-xs text-stone-600">
            Are you fatigued, tense, or weary? Confess bodily limits without guilt.
          </p>
        </div>

        <textarea
          rows={3}
          value={templeRhythm.stewardshipNotes}
          onChange={handleNotesChange}
          placeholder="e.g., Slept well, but feeling tension in my shoulders. Need to step away from screens at noon and drink more water..."
          className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white"
        />

        <div className="text-xs text-stone-500 italic">
          Remember: If you had poor sleep or missed movement, there is no punishment. Tomorrow is covered by new mercy.
        </div>
      </section>
    </div>
  );
};
