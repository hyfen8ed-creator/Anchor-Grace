import { SurrenderItem, PrayerRequest, ServiceAct, TempleRhythm, JournalEntry, UserSettings, DailyIntention } from '../types';

export const getTodayDateKey = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

export const DEFAULT_SURRENDER_ITEMS: SurrenderItem[] = [
  {
    id: 'surrender-1',
    description: 'The urge to control what colleagues think of my contribution this week.',
    category: 'control',
    surrenderedAt: 'Today at morning quiet time',
    status: 'released',
  },
  {
    id: 'surrender-2',
    description: 'Anxiety over personal finances and the temptation to obsess over tomorrow.',
    category: 'anxiety',
    surrenderedAt: 'Yesterday evening',
    status: 'released',
  },
  {
    id: 'surrender-3',
    description: 'Old resentment toward a family member when they criticized my boundaries.',
    category: 'resentment',
    surrenderedAt: 'Two days ago',
    status: 'released',
  },
];

export const DEFAULT_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: 'prayer-1',
    name: 'Marcus & Sarah',
    need: 'Navigating financial strain and marital patience with their new foster child.',
    createdAt: 'Oct 11, 2026',
    isAnswered: false,
  },
  {
    id: 'prayer-2',
    name: 'David (Sponsor in Recovery)',
    need: 'Strength in his own walk and wisdom as he guides men coming out of addiction.',
    createdAt: 'Oct 10, 2026',
    isAnswered: false,
  },
  {
    id: 'prayer-3',
    name: 'Mrs. Gable (Elderly Neighbor)',
    need: 'Recovery from hip surgery and relief from deep loneliness.',
    createdAt: 'Oct 8, 2026',
    isAnswered: true,
    answeredNote: 'She returned home safely yesterday and welcomed a home-cooked meal.',
  },
];

export const DEFAULT_SERVICE_ACTS: ServiceAct[] = [
  {
    id: 'service-1',
    title: 'Send a quiet, no-strings text of encouragement to someone who is hurting.',
    recipient: 'Marcus',
    category: 'encouragement',
    isCompleted: true,
    completedAt: 'Morning',
    notes: 'Reminded him he is not walking through this storm alone.',
  },
  {
    id: 'service-2',
    title: 'Drop off groceries or soup for Mrs. Gable without staying long or expecting praise.',
    recipient: 'Mrs. Gable',
    category: 'practical-help',
    isCompleted: false,
    notes: 'Simple, quiet service done in secret.',
  },
  {
    id: 'service-3',
    title: 'Listen intentionally to a co-worker without offering unsolicited advice or talking about myself.',
    category: 'recovery-support',
    isCompleted: false,
    notes: 'Practice humility by holding my tongue and offering quiet empathy.',
  },
];

export const DEFAULT_TEMPLE_RHYTHM: TempleRhythm = {
  date: getTodayDateKey(),
  waterNourishment: true,
  sleepRest: true,
  movementFreshAir: false,
  guardedGates: true,
  stewardshipNotes: 'Rested for 7.5 hours. Chose not to scroll social feeds before sleep. Energy feels steady.',
};

export const DEFAULT_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'journal-1',
    date: '2026-10-12',
    createdAt: 'Yesterday, 8:15 PM',
    promptQuestion: 'Where did I try to play God today, and where did grace meet me?',
    reflection: 'I caught myself obsessively checking email to make sure a deal closed the way I wanted. The anxiety was a signal that I had placed my security in an outcome rather than in the Father. I stopped, walked outside, and gave the entire contract back to Him.',
    graceObserved: 'Even when my heart was racing with control, God did not abandon me. He gave me the presence of mind to step down from the throne.',
    scriptureAnchor: 'Proverbs 3:5-6',
  },
  {
    id: 'journal-2',
    date: '2026-10-10',
    createdAt: '3 days ago',
    promptQuestion: 'How can my past wounds become a bridge of comfort for someone else?',
    reflection: 'Talked with a brother who is currently struggling with early sobriety and intense shame. Because of what I lived through two years ago, I did not judge him for a second. We both sat on the park bench and remembered that the cross covers all of it.',
    graceObserved: 'God does not waste our wilderness seasons. He redeems the scars into instruments of tenderness.',
    scriptureAnchor: '2 Corinthians 1:3-4',
  },
];

export const DEFAULT_DAILY_INTENTION: DailyIntention = {
  date: getTodayDateKey(),
  singleRightMove: 'Complete the quiet service visit, then focus on faithful work without complaint.',
  surrenderPrayerNote: 'Father, I step down from the throne. My life is not my own project. Guide my hands to love the person in front of me.',
  completed: false,
  lordPrayerReflections: {
    praise: 'You are holy, good, and sovereign over the details of my life.',
    surrender: 'Your will be done in my schedule, not my selfish ambition.',
    dailyBread: 'Give me just enough wisdom, patience, and physical strength for the next hour.',
    confessionAndForgiveness: 'Forgive my irritability this morning, and help me release the slight from yesterday.',
    deliverance: 'Guard my thoughts from seeking cheap numbing escapes when stress rises.',
  },
};

export const DEFAULT_USER_SETTINGS: UserSettings = {
  userName: 'Pilgrim',
  trustedContacts: [
    {
      name: 'Pastor Thomas',
      relationship: 'Pastor / Spiritual Father',
      phone: '555-019-2831',
    },
    {
      name: 'Sarah (Sponsor / Mentor)',
      relationship: 'Recovery Sponsor',
      phone: '555-014-9982',
    },
  ],
  reducedMotion: false,
};
