import {
  SurrenderItem,
  PrayerRequest,
  ServiceAct,
  TempleRhythm,
  JournalEntry,
  DailyIntention,
  UserSettings,
} from '../types';
import {
  DEFAULT_SURRENDER_ITEMS,
  DEFAULT_PRAYER_REQUESTS,
  DEFAULT_SERVICE_ACTS,
  DEFAULT_TEMPLE_RHYTHM,
  DEFAULT_JOURNAL_ENTRIES,
  DEFAULT_DAILY_INTENTION,
  DEFAULT_USER_SETTINGS,
  getTodayDateKey,
} from '../data/defaultData';

const STORAGE_KEYS = {
  DAILY_INTENTION: 'anchor_grace_daily_intention',
  SURRENDER_ITEMS: 'anchor_grace_surrender_items',
  PRAYER_REQUESTS: 'anchor_grace_prayer_requests',
  SERVICE_ACTS: 'anchor_grace_service_acts',
  TEMPLE_RHYTHM: 'anchor_grace_temple_rhythm',
  JOURNAL_ENTRIES: 'anchor_grace_journal_entries',
  SETTINGS: 'anchor_grace_settings',
};

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Failed to parse localStorage key: ${key}`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to write localStorage key: ${key}`, e);
  }
}

export const StorageService = {
  // Daily Intention
  getDailyIntention(): DailyIntention {
    const today = getTodayDateKey();
    const stored = safeGet<DailyIntention>(STORAGE_KEYS.DAILY_INTENTION, DEFAULT_DAILY_INTENTION);
    if (stored.date !== today) {
      // New day: preserve structure but provide fresh slate with grace
      return {
        ...DEFAULT_DAILY_INTENTION,
        date: today,
        singleRightMove: '',
        completed: false,
      };
    }
    return stored;
  },

  saveDailyIntention(intention: DailyIntention): void {
    safeSet(STORAGE_KEYS.DAILY_INTENTION, intention);
  },

  resetDailyIntentionBlankSlate(): DailyIntention {
    const today = getTodayDateKey();
    const fresh: DailyIntention = {
      date: today,
      singleRightMove: '',
      surrenderPrayerNote: '',
      completed: false,
      lordPrayerReflections: {
        praise: '',
        surrender: '',
        dailyBread: '',
        confessionAndForgiveness: '',
        deliverance: '',
      },
    };
    safeSet(STORAGE_KEYS.DAILY_INTENTION, fresh);
    return fresh;
  },

  // Surrender Items
  getSurrenderItems(): SurrenderItem[] {
    return safeGet<SurrenderItem[]>(STORAGE_KEYS.SURRENDER_ITEMS, DEFAULT_SURRENDER_ITEMS);
  },

  addSurrenderItem(item: Omit<SurrenderItem, 'id' | 'surrenderedAt' | 'status'>): SurrenderItem {
    const items = this.getSurrenderItems();
    const newItem: SurrenderItem = {
      ...item,
      id: `surrender-${Date.now()}`,
      surrenderedAt: 'Just now',
      status: 'released',
    };
    const updated = [newItem, ...items];
    safeSet(STORAGE_KEYS.SURRENDER_ITEMS, updated);
    return newItem;
  },

  deleteSurrenderItem(id: string): void {
    const items = this.getSurrenderItems().filter((item) => item.id !== id);
    safeSet(STORAGE_KEYS.SURRENDER_ITEMS, items);
  },

  // Prayer Requests
  getPrayerRequests(): PrayerRequest[] {
    return safeGet<PrayerRequest[]>(STORAGE_KEYS.PRAYER_REQUESTS, DEFAULT_PRAYER_REQUESTS);
  },

  addPrayerRequest(req: Omit<PrayerRequest, 'id' | 'createdAt' | 'isAnswered'>): PrayerRequest {
    const items = this.getPrayerRequests();
    const newItem: PrayerRequest = {
      ...req,
      id: `prayer-${Date.now()}`,
      createdAt: 'Today',
      isAnswered: false,
    };
    const updated = [newItem, ...items];
    safeSet(STORAGE_KEYS.PRAYER_REQUESTS, updated);
    return newItem;
  },

  togglePrayerAnswered(id: string, note?: string): void {
    const items = this.getPrayerRequests().map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isAnswered: !item.isAnswered,
          answeredNote: note ?? item.answeredNote,
        };
      }
      return item;
    });
    safeSet(STORAGE_KEYS.PRAYER_REQUESTS, items);
  },

  deletePrayerRequest(id: string): void {
    const items = this.getPrayerRequests().filter((item) => item.id !== id);
    safeSet(STORAGE_KEYS.PRAYER_REQUESTS, items);
  },

  // Service Acts
  getServiceActs(): ServiceAct[] {
    return safeGet<ServiceAct[]>(STORAGE_KEYS.SERVICE_ACTS, DEFAULT_SERVICE_ACTS);
  },

  addServiceAct(act: Omit<ServiceAct, 'id' | 'isCompleted'>): ServiceAct {
    const items = this.getServiceActs();
    const newItem: ServiceAct = {
      ...act,
      id: `service-${Date.now()}`,
      isCompleted: false,
    };
    const updated = [newItem, ...items];
    safeSet(STORAGE_KEYS.SERVICE_ACTS, updated);
    return newItem;
  },

  toggleServiceAct(id: string): void {
    const items = this.getServiceActs().map((item) => {
      if (item.id === id) {
        const nextState = !item.isCompleted;
        return {
          ...item,
          isCompleted: nextState,
          completedAt: nextState ? 'Today' : undefined,
        };
      }
      return item;
    });
    safeSet(STORAGE_KEYS.SERVICE_ACTS, items);
  },

  deleteServiceAct(id: string): void {
    const items = this.getServiceActs().filter((item) => item.id !== id);
    safeSet(STORAGE_KEYS.SERVICE_ACTS, items);
  },

  // Temple Stewardship
  getTempleRhythm(): TempleRhythm {
    const today = getTodayDateKey();
    const stored = safeGet<TempleRhythm>(STORAGE_KEYS.TEMPLE_RHYTHM, DEFAULT_TEMPLE_RHYTHM);
    if (stored.date !== today) {
      return {
        date: today,
        waterNourishment: false,
        sleepRest: false,
        movementFreshAir: false,
        guardedGates: false,
        stewardshipNotes: '',
      };
    }
    return stored;
  },

  saveTempleRhythm(rhythm: TempleRhythm): void {
    safeSet(STORAGE_KEYS.TEMPLE_RHYTHM, rhythm);
  },

  // Journal Entries
  getJournalEntries(): JournalEntry[] {
    return safeGet<JournalEntry[]>(STORAGE_KEYS.JOURNAL_ENTRIES, DEFAULT_JOURNAL_ENTRIES);
  },

  addJournalEntry(entry: Omit<JournalEntry, 'id' | 'createdAt' | 'date'>): JournalEntry {
    const items = this.getJournalEntries();
    const today = getTodayDateKey();
    const newItem: JournalEntry = {
      ...entry,
      id: `journal-${Date.now()}`,
      date: today,
      createdAt: 'Just now',
    };
    const updated = [newItem, ...items];
    safeSet(STORAGE_KEYS.JOURNAL_ENTRIES, updated);
    return newItem;
  },

  deleteJournalEntry(id: string): void {
    const items = this.getJournalEntries().filter((item) => item.id !== id);
    safeSet(STORAGE_KEYS.JOURNAL_ENTRIES, items);
  },

  // User Settings
  getSettings(): UserSettings {
    return safeGet<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_USER_SETTINGS);
  },

  saveSettings(settings: UserSettings): void {
    safeSet(STORAGE_KEYS.SETTINGS, settings);
  },

  // Privacy & Integrity Export / Clear
  exportData(): string {
    const data = {
      app: 'Anchor & Grace',
      exportedAt: new Date().toISOString(),
      dailyIntention: this.getDailyIntention(),
      surrenderItems: this.getSurrenderItems(),
      prayerRequests: this.getPrayerRequests(),
      serviceActs: this.getServiceActs(),
      templeRhythm: this.getTempleRhythm(),
      journalEntries: this.getJournalEntries(),
    };
    return JSON.stringify(data, null, 2);
  },

  clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  },
};
