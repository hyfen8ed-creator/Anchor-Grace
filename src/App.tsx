/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppTab, DailyIntention, SurrenderItem, PrayerRequest, ServiceAct, TempleRhythm, JournalEntry, UserSettings } from './types';
import { StorageService } from './services/storage';
import { TopNav } from './components/TopNav';
import { InTheStormModal } from './components/InTheStormModal';
import { TodayView } from './components/views/TodayView';
import { NextMoveView } from './components/views/NextMoveView';
import { ServiceView } from './components/views/ServiceView';
import { TempleView } from './components/views/TempleView';
import { JournalView } from './components/views/JournalView';
import { Heart, Shield, Compass, BookOpen, Clock, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('today');
  const [isStormModalOpen, setIsStormModalOpen] = useState<boolean>(false);

  // Core Application State
  const [dailyIntention, setDailyIntention] = useState<DailyIntention>(StorageService.getDailyIntention());
  const [surrenderItems, setSurrenderItems] = useState<SurrenderItem[]>(StorageService.getSurrenderItems());
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(StorageService.getPrayerRequests());
  const [serviceActs, setServiceActs] = useState<ServiceAct[]>(StorageService.getServiceActs());
  const [templeRhythm, setTempleRhythm] = useState<TempleRhythm>(StorageService.getTempleRhythm());
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(StorageService.getJournalEntries());
  const [settings, setSettings] = useState<UserSettings>(StorageService.getSettings());

  // Handlers for Daily Intention
  const handleUpdateDailyIntention = (updated: DailyIntention) => {
    setDailyIntention(updated);
    StorageService.saveDailyIntention(updated);
  };

  const handleResetMercies = () => {
    const fresh = StorageService.resetDailyIntentionBlankSlate();
    setDailyIntention(fresh);
  };

  // Handlers for Surrender
  const handleAddSurrenderItem = (item: Omit<SurrenderItem, 'id' | 'surrenderedAt' | 'status'>) => {
    const created = StorageService.addSurrenderItem(item);
    setSurrenderItems(StorageService.getSurrenderItems());
  };

  const handleDeleteSurrenderItem = (id: string) => {
    StorageService.deleteSurrenderItem(id);
    setSurrenderItems(StorageService.getSurrenderItems());
  };

  // Handlers for Service Acts
  const handleAddServiceAct = (act: Omit<ServiceAct, 'id' | 'isCompleted'>) => {
    StorageService.addServiceAct(act);
    setServiceActs(StorageService.getServiceActs());
  };

  const handleToggleServiceAct = (id: string) => {
    StorageService.toggleServiceAct(id);
    setServiceActs(StorageService.getServiceActs());
  };

  const handleDeleteServiceAct = (id: string) => {
    StorageService.deleteServiceAct(id);
    setServiceActs(StorageService.getServiceActs());
  };

  // Handlers for Prayer Requests
  const handleAddPrayerRequest = (req: Omit<PrayerRequest, 'id' | 'createdAt' | 'isAnswered'>) => {
    StorageService.addPrayerRequest(req);
    setPrayerRequests(StorageService.getPrayerRequests());
  };

  const handleTogglePrayerAnswered = (id: string, note?: string) => {
    StorageService.togglePrayerAnswered(id, note);
    setPrayerRequests(StorageService.getPrayerRequests());
  };

  const handleDeletePrayerRequest = (id: string) => {
    StorageService.deletePrayerRequest(id);
    setPrayerRequests(StorageService.getPrayerRequests());
  };

  // Handlers for Temple
  const handleUpdateTempleRhythm = (updated: TempleRhythm) => {
    setTempleRhythm(updated);
    StorageService.saveTempleRhythm(updated);
  };

  // Handlers for Journal
  const handleAddJournalEntry = (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'date'>) => {
    StorageService.addJournalEntry(entry);
    setJournalEntries(StorageService.getJournalEntries());
  };

  const handleDeleteJournalEntry = (id: string) => {
    StorageService.deleteJournalEntry(id);
    setJournalEntries(StorageService.getJournalEntries());
  };

  // Export Data Handler
  const handleExportData = () => {
    const jsonString = StorageService.exportData();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anchor_grace_reflections_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear Data Handler
  const handleClearAllData = () => {
    StorageService.clearAllData();
    setDailyIntention(StorageService.getDailyIntention());
    setSurrenderItems(StorageService.getSurrenderItems());
    setPrayerRequests(StorageService.getPrayerRequests());
    setServiceActs(StorageService.getServiceActs());
    setTempleRhythm(StorageService.getTempleRhythm());
    setJournalEntries(StorageService.getJournalEntries());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-stone-900 selection:bg-amber-100">
      {/* Strict Top Navigation Bar */}
      <TopNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenStormModal={() => setIsStormModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'today' && (
          <TodayView
            dailyIntention={dailyIntention}
            onUpdateDailyIntention={handleUpdateDailyIntention}
            onResetMercies={handleResetMercies}
            onNavigateToNextMove={() => setActiveTab('next-move')}
            onOpenStormModal={() => setIsStormModalOpen(true)}
          />
        )}

        {activeTab === 'next-move' && (
          <NextMoveView
            surrenderItems={surrenderItems}
            onAddSurrenderItem={handleAddSurrenderItem}
            onDeleteSurrenderItem={handleDeleteSurrenderItem}
          />
        )}

        {activeTab === 'service' && (
          <ServiceView
            serviceActs={serviceActs}
            prayerRequests={prayerRequests}
            onAddServiceAct={handleAddServiceAct}
            onToggleServiceAct={handleToggleServiceAct}
            onDeleteServiceAct={handleDeleteServiceAct}
            onAddPrayerRequest={handleAddPrayerRequest}
            onTogglePrayerAnswered={handleTogglePrayerAnswered}
            onDeletePrayerRequest={handleDeletePrayerRequest}
          />
        )}

        {activeTab === 'temple' && (
          <TempleView
            templeRhythm={templeRhythm}
            onUpdateTempleRhythm={handleUpdateTempleRhythm}
          />
        )}

        {activeTab === 'journal' && (
          <JournalView
            journalEntries={journalEntries}
            onAddJournalEntry={handleAddJournalEntry}
            onDeleteJournalEntry={handleDeleteJournalEntry}
            onExportData={handleExportData}
            onClearAllData={handleClearAllData}
          />
        )}
      </main>

      {/* Grounded & Quiet Footer */}
      <footer className="mt-auto border-t border-stone-200/80 bg-[#FAF9F5] py-8 px-4 sm:px-6 text-center text-xs text-stone-500">
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="font-serif italic text-stone-700 text-sm">
            "Come to me, all who labor and are heavy laden, and I will give you rest." &middot; Matthew 11:28
          </p>
          <p className="text-[11px] text-stone-500">
            Anchor & Grace &middot; Built for real-world discipleship, daily surrender, and outward love. No tracking algorithms or vanity scores.
          </p>
        </div>
      </footer>

      {/* Emergency Refuge Modal ("In The Storm") */}
      <InTheStormModal
        isOpen={isStormModalOpen}
        onClose={() => setIsStormModalOpen(false)}
        trustedContacts={settings.trustedContacts}
      />
    </div>
  );
}
