import React, { useState } from 'react';
import { Search, Filter, AlertCircle, Clock, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

interface ReviewItem {
  id: string;
  employeeName: string;
  role: string;
  type: 'Performance' | 'Project' | 'Quarterly' | 'Ad-hoc';
  urgency: 'Low' | 'Medium' | 'High';
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  lastUpdated: string;
}

const MOCK_REVIEWS: ReviewItem[] = [
  { id: '1', employeeName: 'Sarah Jenkins', role: 'Artist Manager', type: 'Quarterly', urgency: 'High', dueDate: '2023-11-15', status: 'Pending', lastUpdated: '2 days ago' },
  { id: '2', employeeName: 'Marcus Chen', role: 'A&R Director', type: 'Performance', urgency: 'Medium', dueDate: '2023-11-20', status: 'In Progress', lastUpdated: '4 hours ago' },
  { id: '3', employeeName: 'Elena Rodriguez', role: 'Marketing Lead', type: 'Project', urgency: 'Low', dueDate: '2023-11-30', status: 'Pending', lastUpdated: '1 week ago' },
  { id: '4', employeeName: 'David Kim', role: 'Data Analyst', type: 'Ad-hoc', urgency: 'High', dueDate: '2023-11-10', status: 'Completed', lastUpdated: 'Yesterday' },
  { id: '5', employeeName: 'Aisha Patel', role: 'Tour Manager', type: 'Quarterly', urgency: 'Medium', dueDate: '2023-11-22', status: 'Pending', lastUpdated: '3 days ago' },
  { id: '6', employeeName: 'Tom Baker', role: 'Legal Counsel', type: 'Performance', urgency: 'Low', dueDate: '2023-12-05', status: 'In Progress', lastUpdated: 'Just now' },
];

export function ReviewsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUrgency, setFilterUrgency] = useState<string | null>(null);

  const filteredReviews = MOCK_REVIEWS.filter(review => {
    const matchesSearch = review.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          review.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency = filterUrgency ? review.urgency === filterUrgency : true;
    return matchesSearch && matchesUrgency;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-[var(--color-danger)] bg-[var(--color-danger)]/10 border-[var(--color-danger)]/20';
      case 'Medium': return 'text-[var(--color-warning)] bg-[var(--color-warning)]/10 border-[var(--color-warning)]/20';
      case 'Low': return 'text-[var(--color-success)] bg-[var(--color-success)]/10 border-[var(--color-success)]/20';
      default: return 'text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] border-[var(--color-border-subtle)]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-[var(--color-warning)]" />;
      case 'Pending': return <AlertCircle className="w-4 h-4 text-[var(--color-text-muted)]" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Reviews & Reports</h1>
          <p className="text-[var(--color-text-secondary)]">Manage team performance, project reviews, and ad-hoc reports.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-[var(--color-accent-primary-soft)] transition-colors duration-200"
            />
          </div>
          <div className="flex bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-md overflow-hidden">
            <button 
              onClick={() => setFilterUrgency(null)}
              className={cn("px-3 py-1.5 text-xs font-medium transition-colors border-r border-[var(--color-border-strong)]", !filterUrgency ? "bg-[var(--color-bg-soft)] text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]")}
            >
              All
            </button>
            <button 
              onClick={() => setFilterUrgency('High')}
              className={cn("px-3 py-1.5 text-xs font-medium transition-colors border-r border-[var(--color-border-strong)]", filterUrgency === 'High' ? "bg-[var(--color-danger)]/10 text-[var(--color-danger)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]")}
            >
              High
            </button>
            <button 
              onClick={() => setFilterUrgency('Medium')}
              className={cn("px-3 py-1.5 text-xs font-medium transition-colors border-r border-[var(--color-border-strong)]", filterUrgency === 'Medium' ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]")}
            >
              Med
            </button>
            <button 
              onClick={() => setFilterUrgency('Low')}
              className={cn("px-3 py-1.5 text-xs font-medium transition-colors", filterUrgency === 'Low' ? "bg-[var(--color-success)]/10 text-[var(--color-success)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]")}
            >
              Low
            </button>
          </div>
        </div>
      </div>

      {/* List View */}
      <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]">
                <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Employee</th>
                <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Type</th>
                <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Urgency</th>
                <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Due Date</th>
                <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium">Status</th>
                <th className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {filteredReviews.map((review) => (
                <tr 
                  key={review.id}
                  className="group hover:bg-[var(--color-bg-soft)]/50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)]">
                        {review.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary-soft)] transition-colors">{review.employeeName}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{review.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                      <FileText className="w-4 h-4 text-[var(--color-text-muted)]" />
                      {review.type}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
                      getUrgencyColor(review.urgency)
                    )}>
                      {review.urgency}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-mono text-[var(--color-text-primary)]">{review.dueDate}</div>
                    <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Updated {review.lastUpdated}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                      {getStatusIcon(review.status)}
                      {review.status}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary-soft)] hover:bg-[var(--color-bg-elevated)] transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[var(--color-text-muted)] text-sm">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-8 h-8 opacity-20" />
                      <p>No reviews found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
