import React from 'react';
import { ArtistRecord } from '../data/mockData';
import { AlertCircle, Calendar, CheckCircle2, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface RightRailProps {
  record: ArtistRecord;
}

export function RightRail({ record }: RightRailProps) {
  return (
    <aside className="w-80 flex-shrink-0 border-l border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] flex flex-col h-full hidden xl:flex">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border-subtle)]">
        <span className="font-heading font-semibold text-sm uppercase tracking-wider text-[var(--color-text-secondary)]">Operating Signals</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Leadership Attention */}
        {record.leadershipAttentionNeeded && (
          <div className="p-4 rounded-lg bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/20">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[var(--color-accent-primary-soft)] mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-accent-primary-soft)] mb-1">Leadership Decision Needed</h4>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {record.qualitativeNote}
                </p>
                <button className="mt-3 text-xs font-medium text-[var(--color-accent-primary-soft)] hover:text-[var(--color-accent-primary)] flex items-center gap-1 transition-colors">
                  Review Deal Terms <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Team Actions */}
        <div>
          <h3 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Team Actions Due</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-3 rounded-md bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)]">
              <div className="w-5 h-5 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[var(--color-warning)]"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] leading-tight mb-1">{record.nextRecommendedAction}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Today</span>
                  <span>•</span>
                  <span>{record.owner}</span>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 rounded-md bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] opacity-60">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] leading-tight mb-1 line-through">Draft initial P&L model</p>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <span>Completed</span>
                  <span>•</span>
                  <span>Finance</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Upcoming Meetings */}
        <div>
          <h3 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Upcoming Meetings</h3>
          <div className="p-4 rounded-md bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-md bg-[var(--color-bg-soft)] flex flex-col items-center justify-center border border-[var(--color-border-subtle)]">
                <span className="text-[10px] uppercase text-[var(--color-accent-primary-soft)] font-bold">Oct</span>
                <span className="text-sm font-bold leading-none">14</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Strategy Sync: {record.name}</h4>
                <p className="text-xs text-[var(--color-text-muted)]">10:00 AM PST • Zoom</p>
              </div>
            </div>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-[var(--color-bg-soft)] border-2 border-[var(--color-bg-panel)] flex items-center justify-center text-[10px] font-medium">NT</div>
              <div className="w-6 h-6 rounded-full bg-[var(--color-bg-soft)] border-2 border-[var(--color-bg-panel)] flex items-center justify-center text-[10px] font-medium">SJ</div>
              <div className="w-6 h-6 rounded-full bg-[var(--color-bg-soft)] border-2 border-[var(--color-bg-panel)] flex items-center justify-center text-[10px] font-medium">DK</div>
              <div className="w-6 h-6 rounded-full bg-[var(--color-bg-soft)] border-2 border-[var(--color-bg-panel)] flex items-center justify-center text-[10px] font-medium text-[var(--color-text-muted)]">+2</div>
            </div>
          </div>
        </div>

        {/* Escalations */}
        {record.riskLevel === 'High' && (
          <div>
            <h3 className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Escalations</h3>
            <div className="flex items-start gap-3 p-3 rounded-md border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5">
              <AlertCircle className="w-5 h-5 text-[var(--color-danger)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] leading-tight mb-1">Data Quality Warning</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Streaming metrics show abnormal bot-like patterns. Audit required before proceeding.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
