export type AppTab = 'today' | 'next-move' | 'service' | 'temple' | 'journal';

export interface ScriptureVerse {
  reference: string;
  text: string;
  context: string;
  theme: 'grace' | 'surrender' | 'anchor' | 'service' | 'temple' | 'recovery';
}

export interface SurrenderItem {
  id: string;
  description: string;
  surrenderedAt: string;
  category: 'anxiety' | 'resentment' | 'control' | 'craving' | 'pride' | 'other';
  status: 'released' | 'resolved';
}

export interface PrayerRequest {
  id: string;
  name: string;
  need: string;
  createdAt: string;
  isAnswered: boolean;
  answeredNote?: string;
}

export interface ServiceAct {
  id: string;
  title: string;
  recipient?: string;
  category: 'encouragement' | 'practical-help' | 'forgiveness' | 'secret-kindness' | 'recovery-support';
  completedAt?: string;
  isCompleted: boolean;
  notes?: string;
}

export interface TempleRhythm {
  date: string; // YYYY-MM-DD
  waterNourishment: boolean;
  sleepRest: boolean;
  movementFreshAir: boolean;
  guardedGates: boolean; // guarded eyes & mind from toxic noise / triggers
  stewardshipNotes: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  createdAt: string;
  promptQuestion: string;
  reflection: string;
  graceObserved: string;
  scriptureAnchor?: string;
}

export interface DailyIntention {
  date: string;
  singleRightMove: string;
  surrenderPrayerNote: string;
  completed: boolean;
  lordPrayerReflections: {
    praise: string;
    surrender: string;
    dailyBread: string;
    confessionAndForgiveness: string;
    deliverance: string;
  };
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface UserSettings {
  userName: string;
  trustedContacts: EmergencyContact[];
  reducedMotion: boolean;
}
