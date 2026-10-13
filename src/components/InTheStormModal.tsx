import React, { useState } from 'react';
import { X, Phone, Heart, Shield, RefreshCw } from 'lucide-react';
import { BreathingExercise } from './BreathingExercise';
import { EmergencyContact } from '../types';

interface InTheStormModalProps {
  isOpen: boolean;
  onClose: () => void;
  trustedContacts: EmergencyContact[];
  onAddContact?: (contact: EmergencyContact) => void;
}

export const InTheStormModal: React.FC<InTheStormModalProps> = ({
  isOpen,
  onClose,
  trustedContacts,
}) => {
  const [showBreathing, setShowBreathing] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF9F5] border border-stone-300 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-[#F4F1EA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-semibold text-stone-900">
                Refuge in the Storm
              </h2>
              <p className="text-xs text-stone-600">
                For moments of acute temptation, panic, craving, or overwhelming grief
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close refuge window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Grounding Scripture Anchor */}
          <div className="p-5 bg-stone-100/80 border border-stone-200 rounded-xl space-y-2">
            <div className="text-xs font-medium text-stone-500 tracking-wide uppercase">
              Scripture Anchor
            </div>
            <p className="font-serif text-stone-900 text-base leading-relaxed italic">
              "No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it."
            </p>
            <p className="text-xs text-stone-600 text-right font-medium">
              1 Corinthians 10:13
            </p>
          </div>

          {/* Honest Surrender Prayer */}
          <div className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-2">
            <div className="text-xs font-medium text-amber-900 tracking-wide uppercase">
              Prayer of Immediate Surrender
            </div>
            <p className="font-serif text-stone-800 text-sm leading-relaxed">
              "Lord Jesus, I am not in control. I feel the pull, the storm, and my own acute weakness. I do not have to fight this in my own strength. I surrender this moment to You. Be my anchor right now. Give me grace for just the next five minutes. Amen."
            </p>
          </div>

          {/* 3 Grounding Steps */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
              The Next 5 Minutes: 3 Physical Actions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setActiveStep(1)}
                className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                  activeStep === 1
                    ? 'bg-white border-stone-800 shadow-sm'
                    : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="text-xs font-bold text-stone-500">Step 1</div>
                <div className="text-sm font-medium text-stone-900 mt-1">
                  Shock the Senses
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  Splash cold water on your face or drink a full glass slowly.
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveStep(2);
                  setShowBreathing(true);
                }}
                className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                  activeStep === 2
                    ? 'bg-white border-stone-800 shadow-sm'
                    : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="text-xs font-bold text-stone-500">Step 2</div>
                <div className="text-sm font-medium text-stone-900 mt-1">
                  60s Stillness
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  Breathe in grace, exhale the knot in your chest.
                </div>
              </button>

              <button
                onClick={() => setActiveStep(3)}
                className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                  activeStep === 3
                    ? 'bg-white border-stone-800 shadow-sm'
                    : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <div className="text-xs font-bold text-stone-500">Step 3</div>
                <div className="text-sm font-medium text-stone-900 mt-1">
                  Break Isolation
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  Speak to a trusted mentor, sponsor, or brother/sister.
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Breathing Tool when Step 2 is selected */}
          {showBreathing && (
            <div className="p-4 border border-stone-200 rounded-xl bg-white">
              <BreathingExercise onComplete={() => setActiveStep(3)} />
            </div>
          )}

          {/* Real Contacts & Safety Anchor */}
          <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Reach Out in Real Life (No Shame)
              </h4>
              <span className="text-xs text-stone-500">Direct connection</span>
            </div>

            <div className="space-y-2">
              {trustedContacts.length > 0 ? (
                trustedContacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-white border border-stone-200 rounded-lg"
                  >
                    <div>
                      <div className="text-sm font-medium text-stone-900">
                        {contact.name}
                      </div>
                      <div className="text-xs text-stone-500">
                        {contact.relationship} &middot; {contact.phone}
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-stone-50 rounded-md text-xs font-medium hover:bg-stone-800 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-xs text-stone-500 italic">
                  No personal contacts saved yet. You can add them in Settings.
                </p>
              )}

              <div className="p-3 bg-stone-100/70 border border-stone-200/80 rounded-lg text-xs text-stone-600 space-y-1">
                <div className="font-medium text-stone-800">
                  24/7 Confidential Crisis & Recovery Hotlines:
                </div>
                <div>
                  &middot; <strong className="text-stone-900">988 Lifeline</strong>: Call or text 988 (Available 24/7)
                </div>
                <div>
                  &middot; <strong className="text-stone-900">SAMHSA National Helpline</strong>: 1-800-662-4357 (Substance use and mental health)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-[#F4F1EA] flex items-center justify-between">
          <span className="text-xs text-stone-500 italic">
            You are not abandoned. One moment at a time.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            I am Grounded, Return to Walk
          </button>
        </div>
      </div>
    </div>
  );
};
