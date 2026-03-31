import React, { useState } from 'react';
import { ArtistRecord } from '../data/mockData';
import { Sparkles, AlertCircle, CheckCircle2, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Minus, Headphones, Music, Radio } from 'lucide-react';
import { cn } from '../lib/utils';

interface PipelineIntelTabProps {
  record: ArtistRecord;
  records: ArtistRecord[];
  onSelectRecord: (id: string) => void;
}

export function PipelineIntelTab({ record, records, onSelectRecord }: PipelineIntelTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Pipeline & Intel</h1>
          <p className="text-[var(--color-text-secondary)]">Market research, business development, and CRM intelligence.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input 
              type="text" 
              placeholder="Filter pipeline..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-[var(--color-accent-primary-soft)] transition-colors duration-200"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Pipeline List */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl overflow-hidden flex flex-col h-[400px]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]">
                    <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Artist</th>
                    <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Stage</th>
                    <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Score</th>
                    <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Momentum</th>
                    <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)]">
                  {filteredRecords.map((r) => (
                    <tr 
                      key={r.id}
                      onClick={() => onSelectRecord(r.id)}
                      className={cn(
                        "cursor-pointer transition-colors duration-150 group",
                        record.id === r.id 
                          ? "bg-[var(--color-bg-soft)]" 
                          : "hover:bg-[var(--color-bg-soft)]/50"
                      )}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--color-bg-elevated)] flex-shrink-0">
                            <img src={r.imageUrl} alt={r.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className={cn("font-medium text-sm", record.id === r.id ? "text-[var(--color-accent-primary-soft)]" : "text-[var(--color-text-primary)]")}>{r.name}</div>
                            <div className="text-xs text-[var(--color-text-muted)] truncate max-w-[120px]">{r.manager}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] text-[var(--color-text-secondary)]">
                          {r.stage}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 text-sm font-mono font-medium">{r.opportunityScore}</div>
                          <div className="w-16 h-1.5 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full rounded-full", r.opportunityScore > 75 ? "bg-[var(--color-success)]" : r.opportunityScore > 50 ? "bg-[var(--color-warning)]" : "bg-[var(--color-danger)]")}
                              style={{ width: `${r.opportunityScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-sm">
                          {r.audienceVelocity === 'Accelerating' && <ArrowUpRight className="w-4 h-4 text-[var(--color-success)]" />}
                          {r.audienceVelocity === 'Steady' && <Minus className="w-4 h-4 text-[var(--color-text-muted)]" />}
                          {r.audienceVelocity === 'Declining' && <ArrowDownRight className="w-4 h-4 text-[var(--color-danger)]" />}
                          <span className={cn(
                            "font-mono",
                            r.audienceVelocity === 'Accelerating' ? "text-[var(--color-success)]" : r.audienceVelocity === 'Declining' ? "text-[var(--color-danger)]" : "text-[var(--color-text-muted)]"
                          )}>
                            {r.streamingGrowth > 0 ? '+' : ''}{r.streamingGrowth}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-[var(--color-text-secondary)]">
                        {r.owner}
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[var(--color-text-muted)] text-sm">
                        No records found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signal Breakdown & Scoring */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opportunity Scoring */}
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Opportunity Score</h2>
                <div className="text-2xl font-mono font-bold text-[var(--color-accent-primary-soft)]">{record.opportunityScore}</div>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Digital Momentum', value: record.scores.digitalMomentum, max: 30 },
                  { label: 'Live Strength', value: record.scores.liveStrength, max: 30 },
                  { label: 'Strategic Fit', value: record.scores.strategicFit, max: 20 },
                  { label: 'Relationship Access', value: record.scores.relationshipAccess, max: 10 },
                  { label: 'Operational Complexity', value: record.scores.operationalComplexity, max: 10, isNegative: true },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[var(--color-text-secondary)]">{item.label}</span>
                      <span className="font-mono text-[var(--color-text-primary)]">
                        {item.isNegative ? item.value : `${item.value}/${item.max}`}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full", item.isNegative ? "bg-[var(--color-danger)]" : "bg-[var(--color-accent-cool)]")}
                        style={{ width: `${Math.abs((item.value / item.max) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Intel */}
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6 flex flex-col">
              <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">Qualitative Intel</h2>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-[var(--color-text-muted)] mb-1">Manager Context</h3>
                  <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{record.manager}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[var(--color-text-muted)] mb-1">Strategic Note</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed bg-[var(--color-bg-soft)] p-3 rounded-md border border-[var(--color-border-subtle)]">
                    {record.qualitativeNote}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[var(--color-text-muted)] mb-1">Recent Developments</h3>
                  <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{record.momentumSummary}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Streaming Data Section */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">Streaming & Platform Data</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Spotify */}
              <div className="p-4 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#1DB954]/10 flex items-center justify-center">
                    <Headphones className="w-4 h-4 text-[#1DB954]" />
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Spotify</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Daily Listens</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.spotify.daily)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Monthly Listens</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.spotify.monthly)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Downloads/Saves</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.spotify.downloads)}</span>
                  </div>
                </div>
              </div>

              {/* Apple Music */}
              <div className="p-4 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#FA243C]/10 flex items-center justify-center">
                    <Music className="w-4 h-4 text-[#FA243C]" />
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Apple Music</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Daily Listens</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.appleMusic.daily)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Monthly Listens</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.appleMusic.monthly)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Downloads/Saves</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.appleMusic.downloads)}</span>
                  </div>
                </div>
              </div>

              {/* SoundCloud */}
              <div className="p-4 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#FF5500]/10 flex items-center justify-center">
                    <Radio className="w-4 h-4 text-[#FF5500]" />
                  </div>
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)]">SoundCloud</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Daily Listens</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.soundcloud.daily)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Monthly Listens</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.soundcloud.monthly)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[var(--color-text-muted)]">Downloads/Saves</span>
                    <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{formatNumber(record.streamingStats.soundcloud.downloads)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI & CRM */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          {/* Selected Record Detail Header */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 z-0">
              <img src={record.imageUrl} alt="" className="w-full h-full object-cover blur-xl" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-panel)] via-[var(--color-bg-panel)]/90 to-transparent z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center mt-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-border-strong)] mb-4 shadow-xl">
                <img src={record.imageUrl} alt={record.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-heading font-bold text-[var(--color-text-primary)] mb-1">{record.name}</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">{record.genre} • {record.region}</p>
              
              <div className="flex gap-2 w-full">
                <div className="flex-1 bg-[var(--color-bg-elevated)]/80 backdrop-blur-sm border border-[var(--color-border-subtle)] rounded-md p-2">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Listeners</div>
                  <div className="text-sm font-mono font-semibold">{(record.monthlyListeners / 1000000).toFixed(1)}M</div>
                </div>
                <div className="flex-1 bg-[var(--color-bg-elevated)]/80 backdrop-blur-sm border border-[var(--color-border-subtle)] rounded-md p-2">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Velocity</div>
                  <div className={cn("text-sm font-medium", record.audienceVelocity === 'Accelerating' ? "text-[var(--color-success)]" : "text-[var(--color-text-primary)]")}>
                    {record.audienceVelocity}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Enrichment */}
          <div className="bg-gradient-to-br from-[var(--color-bg-panel)] to-[var(--color-bg-elevated)] border border-[var(--color-accent-primary)]/20 rounded-xl p-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-accent-primary-soft)] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Enrichment
            </h2>
            
            <div className="space-y-4">
              <div className="p-3 rounded-md bg-[var(--color-bg-soft)] border border-[var(--color-border-subtle)]">
                <h3 className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">Signal Change (90d)</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Streaming velocity outpaces historical touring conversion by 3x. Suggest prioritizing live strategy audit before advancing deal terms.
                </p>
              </div>
              
              <div className="p-3 rounded-md bg-[var(--color-bg-soft)] border border-[var(--color-border-subtle)]">
                <h3 className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">Missing Data</h3>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1 mt-2">
                  <li className="flex items-center gap-2"><AlertCircle className="w-3 h-3 text-[var(--color-warning)]" /> Q4 Touring Avails</li>
                  <li className="flex items-center gap-2"><AlertCircle className="w-3 h-3 text-[var(--color-warning)]" /> Brand Partnership History</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CRM Hygiene */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">CRM Hygiene</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">Record Completeness</span>
                <span className="text-sm font-mono font-medium text-[var(--color-success)]">92%</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-success)] rounded-full" style={{ width: '92%' }} />
              </div>
              
              <div className="pt-3 mt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">Last Update</span>
                <span className="text-sm font-mono text-[var(--color-text-primary)]">{record.lastInternalUpdate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">Overdue Actions</span>
                <span className="text-sm font-mono text-[var(--color-text-primary)]">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
