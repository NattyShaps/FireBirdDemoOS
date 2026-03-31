import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { RightRail } from './components/RightRail';
import { DecisionSupportTab } from './components/DecisionSupportTab';
import { PipelineIntelTab } from './components/PipelineIntelTab';
import { ExecutionTab } from './components/ExecutionTab';
import { PortfolioTab } from './components/PortfolioTab';
import { LeadershipTab } from './components/LeadershipTab';
import { ReviewsTab } from './components/ReviewsTab';
import { SignalsTab } from './components/SignalsTab';
import { ReportsTab } from './components/ReportsTab';
import { mockRecords, ArtistRecord } from './data/mockData';

export type TabType = 'Decision Support' | 'Pipeline & Intel' | 'Execution' | 'Portfolio' | 'Leadership' | 'Reviews' | 'Signals' | 'Reports';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Decision Support');
  const [selectedRecordId, setSelectedRecordId] = useState<string>(mockRecords[0].id);

  const selectedRecord = mockRecords.find(r => r.id === selectedRecordId) || mockRecords[0];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative">
        <TopBar 
          selectedRecord={selectedRecord} 
          records={mockRecords}
          onSelectRecord={setSelectedRecordId}
        />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === 'Decision Support' && <DecisionSupportTab record={selectedRecord} />}
            {activeTab === 'Pipeline & Intel' && <PipelineIntelTab record={selectedRecord} records={mockRecords} onSelectRecord={setSelectedRecordId} />}
            {activeTab === 'Execution' && <ExecutionTab record={selectedRecord} />}
            {activeTab === 'Portfolio' && <PortfolioTab records={mockRecords} />}
            {activeTab === 'Leadership' && <LeadershipTab />}
            {activeTab === 'Reviews' && <ReviewsTab />}
            {activeTab === 'Signals' && <SignalsTab />}
      {activeTab === 'Reports' && <ReportsTab record={selectedRecord} />}
          </div>
        </main>
      </div>

      {/* Right Rail */}
      <RightRail record={selectedRecord} />
    </div>
  );
}
