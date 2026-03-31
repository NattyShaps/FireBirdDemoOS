import React from 'react';
import { ArtistRecord } from '../data/mockData';
import { CheckCircle2, Circle, Clock, AlertTriangle, Sparkles, FileText, Users, Calendar, ArrowRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface ExecutionTabProps {
  record: ArtistRecord;
}

export function ExecutionTab({ record }: ExecutionTabProps) {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Execution</h1>
          <p className="text-[var(--color-text-secondary)]">Translate decisions into owned work, visible follow-through, and review rhythms.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--color-accent-primary)] text-white text-sm font-medium hover:bg-[var(--color-accent-primary-soft)] transition-colors duration-200 shadow-sm">
            Log Decision
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Actions & Workstreams */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Action Tracker */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">Action Tracker</h2>
            
            <div className="space-y-6">
              {/* Leadership Decisions */}
              <div>
                <h3 className="text-xs font-mono text-[var(--color-accent-primary-soft)] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> Leadership Decisions
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-accent-primary)]/30">
                    <div className="flex items-center gap-3">
                      <Circle className="w-4 h-4 text-[var(--color-accent-primary-soft)] flex-shrink-0" />
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">Approve Q3 Marketing Budget ({record.name})</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[var(--color-danger)] font-medium">Due Today</span>
                      <span className="text-[var(--color-text-muted)] w-24 text-right">Exec Comm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Actions */}
              <div>
                <h3 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Users className="w-3 h-3" /> Team Actions
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-3">
                      <Circle className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">{record.nextRecommendedAction}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[var(--color-warning)] font-medium">In Progress</span>
                      <span className="text-[var(--color-text-muted)] w-24 text-right">{record.owner}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-3">
                      <Circle className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">Draft touring P&L scenarios</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[var(--color-text-secondary)]">Oct 18</span>
                      <span className="text-[var(--color-text-muted)] w-24 text-right">Finance</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] opacity-60">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] flex-shrink-0" />
                      <span className="text-sm font-medium text-[var(--color-text-primary)] line-through">Initial manager intro call</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[var(--color-success)]">Done</span>
                      <span className="text-[var(--color-text-muted)] w-24 text-right">{record.owner}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Workstreams */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">Active Workstreams</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Deal Evaluation</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[var(--color-warning)]/20 text-[var(--color-warning)] border border-[var(--color-warning)]/30">At Risk</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-bg-panel)] rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-[var(--color-warning)] rounded-full" style={{ width: '40%' }} />
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-3">Waiting on updated streaming splits from manager.</p>
                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span>Owner: Legal</span>
                  <span>Due: Oct 20</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)]">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Tour Planning Support</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/30">On Track</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-bg-panel)] rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-[var(--color-success)] rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-3">Routing drafted for 15 key markets. Awaiting budget approval.</p>
                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span>Owner: Touring</span>
                  <span>Due: Oct 25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Log */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">Decision Log</h2>
            
            <div className="relative border-l border-[var(--color-border-strong)] ml-3 space-y-6 pb-4">
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-[var(--color-bg-panel)] border-2 border-[var(--color-accent-primary-soft)] rounded-full -left-[6.5px] top-1"></div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">Proceed to Term Sheet Phase</span>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">Oct 10</span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">Approved by Exec Comm based on strong Q3 streaming momentum and revised touring P&L.</p>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)]">
                  <FileText className="w-3 h-3" /> Memo attached
                </div>
              </div>

              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-[var(--color-bg-panel)] border-2 border-[var(--color-border-strong)] rounded-full -left-[6.5px] top-1"></div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">Pass on 360 Deal Structure</span>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">Sep 28</span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">Determined upfront capital requirement was too high for current risk profile. Pivoted to JV model.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Meetings & AI */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          {/* Meeting Prep & Notes (AI) */}
          <div className="bg-gradient-to-br from-[var(--color-bg-panel)] to-[var(--color-bg-elevated)] border border-[var(--color-accent-primary)]/20 rounded-xl p-6 relative overflow-hidden flex flex-col h-[400px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-primary)]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-accent-primary-soft)] flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Meeting Intelligence
              </h2>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">Oct 12 Sync</span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 relative z-10">
              <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-muted)] mb-2">Raw Notes</h3>
                <div className="p-3 rounded-md bg-[var(--color-bg-soft)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)] font-mono leading-relaxed opacity-70">
                  discussed touring. sarah wants 20 mkts. budget is tight. need to check with finance on break even. streaming is up 145% so maybe we can push ticket price? alex to model.
                </div>
              </div>
              
              <div className="flex justify-center">
                <ArrowDownRight className="w-4 h-4 text-[var(--color-accent-primary-soft)]" />
              </div>

              <div>
                <h3 className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Generated Actions</h3>
                <ul className="space-y-2">
                  <li className="p-3 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">Model 20-market tour break-even</span>
                      <span className="text-[10px] font-mono bg-[var(--color-bg-panel)] px-1.5 py-0.5 rounded text-[var(--color-text-muted)]">Alex</span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)]">Include scenario with +15% ticket price based on streaming momentum.</p>
                  </li>
                  <li className="p-3 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">Confirm budget ceiling</span>
                      <span className="text-[10px] font-mono bg-[var(--color-bg-panel)] px-1.5 py-0.5 rounded text-[var(--color-text-muted)]">Finance</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 mt-2 border-t border-[var(--color-border-subtle)] relative z-10">
              <button className="w-full py-2 rounded-md bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary-soft)] text-sm font-medium hover:bg-[var(--color-accent-primary)]/20 transition-colors duration-200">
                Push to Action Tracker
              </button>
            </div>
          </div>

          {/* Review Rhythm / KPIs */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">Review Rhythm</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--color-bg-soft)] border border-[var(--color-border-subtle)] flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Weekly Pipeline Sync</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">Mondays, 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--color-bg-soft)] border border-[var(--color-border-subtle)] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[var(--color-text-muted)]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Monthly Performance</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">Next: Nov 1</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-[var(--color-border-subtle)]">
              <h3 className="text-xs font-semibold text-[var(--color-text-muted)] mb-3">Goal Progress (Q4)</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--color-text-secondary)]">Deals Closed</span>
                  <span className="font-mono text-[var(--color-text-primary)]">2 / 5</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-accent-cool)] rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
