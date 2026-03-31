import React, { useState } from 'react';
import { ArtistRecord } from '../data/mockData';
import { Search, Bell, Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface TopBarProps {
  selectedRecord: ArtistRecord;
  records: ArtistRecord[];
  onSelectRecord: (id: string) => void;
}

export function TopBar({ selectedRecord, records, onSelectRecord }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState<'All' | 'US' | 'Global'>('All');

  const handleRegionToggle = () => {
    if (region === 'All') setRegion('US');
    else if (region === 'US') setRegion('Global');
    else setRegion('All');
  };

  const filteredRecords = records.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] z-10 sticky top-0">
      <div className="flex items-center gap-6">
        {/* Record Selector */}
        <div className="relative group">
          <button className="flex items-center gap-3 px-4 py-2 rounded-md bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] hover:border-[var(--color-accent-primary-soft)] transition-colors duration-200">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-[var(--color-bg-soft)]">
              <img src={selectedRecord.imageUrl} alt={selectedRecord.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold leading-none mb-1">{selectedRecord.name}</span>
              <span className="text-xs text-[var(--color-text-muted)] leading-none">{selectedRecord.stage}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)] ml-2" />
          </button>
          
          {/* Dropdown (Hover) */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-2">
              <div className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-2 px-2">Pipeline</div>
              {records.map(record => (
                <button
                  key={record.id}
                  onClick={() => onSelectRecord(record.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors duration-200",
                    selectedRecord.id === record.id 
                      ? "bg-[var(--color-bg-soft)] text-[var(--color-accent-primary-soft)]" 
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-[var(--color-bg-soft)]">
                    <img src={record.imageUrl} alt={record.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-medium">{record.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-mono">
          <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse"></div>
          Mock data synced {selectedRecord.lastInternalUpdate}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input 
            type="text" 
            placeholder="Search artists, managers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-[var(--color-accent-primary-soft)] transition-colors duration-200 placeholder:text-[var(--color-text-muted)]"
          />
          {searchQuery && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-2 px-2">Search Results</div>
                {filteredRecords.length > 0 ? filteredRecords.map(record => (
                  <button
                    key={record.id}
                    onClick={() => {
                      onSelectRecord(record.id);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors duration-200 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-text-primary)]"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-[var(--color-bg-soft)]">
                      <img src={record.imageUrl} alt={record.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{record.name}</span>
                      <span className="text-xs text-[var(--color-text-muted)]">{record.manager}</span>
                    </div>
                  </button>
                )) : (
                  <div className="px-2 py-4 text-sm text-[var(--color-text-muted)] text-center">No results found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Global Filters */}
        <div className="hidden md:flex items-center gap-2">
          <button 
            onClick={handleRegionToggle}
            className="px-3 py-1.5 rounded-full border border-[var(--color-border-strong)] text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors duration-200"
          >
            Region: {region}
          </button>
        </div>

        {/* AI Action */}
        <button 
          disabled
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary-soft)] text-sm font-medium opacity-50 cursor-not-allowed transition-colors duration-200"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI Summary</span>
        </button>

        {/* Notifications */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-soft)] text-[var(--color-text-secondary)] transition-colors duration-200 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--color-accent-primary)]"></span>
        </button>
      </div>
    </header>
  );
}
