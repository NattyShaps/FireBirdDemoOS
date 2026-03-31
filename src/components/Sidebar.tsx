import React from 'react';
import { TabType } from '../App';
import { LayoutDashboard, Target, Zap, Activity, Users, FileBarChart, Signal, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const mainTabs = [
    { id: 'Decision Support', label: 'Decision Support', icon: Target },
    { id: 'Pipeline & Intel', label: 'Pipeline & Intel', icon: LayoutDashboard },
    { id: 'Execution', label: 'Execution', icon: Zap },
  ] as const;

  const secondaryLinks = [
    { id: 'Portfolio', label: 'Portfolio', icon: Users },
    { id: 'Leadership', label: 'Leadership', icon: FileBarChart },
    { id: 'Reviews', label: 'Reviews', icon: Activity },
    { id: 'Signals', label: 'Signals', icon: Signal },
  ] as const;

  const actionablesLinks = [
    { id: 'Reports', label: 'Reports', icon: FileText },
  ] as const;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] flex flex-col h-full hidden md:flex">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[var(--color-accent-primary)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="white"/>
            </svg>
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">Firebird Artist OS</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8">
        <div>
          <div className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-3 px-2">Workspaces</div>
          <ul className="space-y-1">
            {mainTabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    activeTab === tab.id 
                      ? "bg-[var(--color-bg-panel)] text-[var(--color-accent-primary-soft)] shadow-sm border border-[var(--color-border-subtle)]" 
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-soft)]"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-3 px-2">Views</div>
          <ul className="space-y-1">
            {secondaryLinks.map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => setActiveTab(link.id as TabType)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    activeTab === link.id 
                      ? "bg-[var(--color-bg-panel)] text-[var(--color-accent-primary-soft)] shadow-sm border border-[var(--color-border-subtle)]" 
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-soft)]"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-3 px-2">Actionables</div>
          <ul className="space-y-1">
            {actionablesLinks.map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => setActiveTab(link.id as TabType)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    activeTab === link.id 
                      ? "bg-[var(--color-bg-panel)] text-[var(--color-accent-primary-soft)] shadow-sm border border-[var(--color-border-subtle)]" 
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-soft)]"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] flex items-center justify-center text-xs font-medium">
            NT
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none mb-1">Nate Shapiro</span>
            <span className="text-xs text-[var(--color-text-muted)] leading-none">Strategy & Ops</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
