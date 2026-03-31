import React, { useState } from 'react';
import { Lock, TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, BarChart3, Music } from 'lucide-react';
import { cn } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function LeadershipTab() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-cool)]" />
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border-subtle)]">
              <Lock className="w-8 h-8 text-[var(--color-accent-primary-soft)]" />
            </div>
          </div>
          
          <h2 className="text-2xl font-heading font-bold text-center text-[var(--color-text-primary)] mb-2">Leadership Access</h2>
          <p className="text-center text-[var(--color-text-secondary)] mb-8 text-sm">
            Enter your credentials to view company-wide metrics and projections.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wider">
                Passphrase
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full bg-[var(--color-bg-elevated)] border rounded-lg px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none transition-colors",
                    error ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]" : "border-[var(--color-border-strong)] focus:border-[var(--color-accent-primary-soft)]"
                  )}
                  placeholder="Enter any password..."
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 group cursor-help">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[10px] text-[var(--color-text-muted)]">?</div>
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] rounded-md text-xs text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                    Any password will work for this demo.
                  </div>
                </div>
              </div>
              {error && <p className="text-[var(--color-danger)] text-xs mt-1.5">Please enter a password.</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary-hover)] text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Mock Data for Dashboard
  const metrics = {
    arr: 142500000,
    mrr: 11875000,
    revenueYTD: 85400000,
    spendYTD: 62100000,
    employees: 342,
    activeArtists: 128
  };

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(0) + 'K';
    return '$' + num.toString();
  };

  const revenueData = [
    { month: 'Jan', revenue: 8.2, target: 8.0 },
    { month: 'Feb', revenue: 8.5, target: 8.2 },
    { month: 'Mar', revenue: 9.1, target: 8.5 },
    { month: 'Apr', revenue: 9.4, target: 8.8 },
    { month: 'May', revenue: 10.2, target: 9.2 },
    { month: 'Jun', revenue: 10.8, target: 9.5 },
    { month: 'Jul', revenue: 11.5, target: 10.0 },
    { month: 'Aug', revenue: 11.8, target: 10.5 },
  ];

  const growthData = [
    { quarter: 'Q1 23', arr: 95 },
    { quarter: 'Q2 23', arr: 105 },
    { quarter: 'Q3 23', arr: 112 },
    { quarter: 'Q4 23', arr: 120 },
    { quarter: 'Q1 24', arr: 128 },
    { quarter: 'Q2 24', arr: 135 },
    { quarter: 'Q3 24', arr: 142 },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Leadership Dashboard</h1>
          <p className="text-[var(--color-text-secondary)]">Company-wide performance, financial metrics, and strategic projections.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 text-xs font-medium text-[var(--color-success)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            Live Data Sync
          </span>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-md bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-3">
            <TrendingUp className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">Total ARR</h3>
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">{formatCurrency(metrics.arr)}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-success)] font-medium">
              <ArrowUpRight className="w-3 h-3" /> +18.4% YoY
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-3">
            <Activity className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">Current MRR</h3>
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">{formatCurrency(metrics.mrr)}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-success)] font-medium">
              <ArrowUpRight className="w-3 h-3" /> +2.1% MoM
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-3">
            <DollarSign className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">YTD Revenue</h3>
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">{formatCurrency(metrics.revenueYTD)}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-success)] font-medium">
              <ArrowUpRight className="w-3 h-3" /> +12.5% vs Target
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-3">
            <BarChart3 className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">YTD Spend</h3>
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">{formatCurrency(metrics.spendYTD)}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-warning)] font-medium">
              <ArrowUpRight className="w-3 h-3" /> +4.2% vs Budget
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-3">
            <Users className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">Headcount</h3>
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">{metrics.employees}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-text-muted)] font-medium">
              Across 4 offices
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-3">
            <Music className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">Active Artists</h3>
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-[var(--color-accent-primary-soft)]">{metrics.activeArtists}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-[var(--color-success)] font-medium">
              <ArrowUpRight className="w-3 h-3" /> +14 this quarter
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Target */}
        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Monthly Revenue vs Target (M)</h2>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-text-muted)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="var(--color-text-muted)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-bg-panel)', 
                    borderColor: 'var(--color-border-strong)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)'
                  }}
                  itemStyle={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
                  formatter={(value: number) => [`$${value.toFixed(1)}M`, undefined]}
                  cursor={{ fill: 'var(--color-bg-elevated)' }}
                />
                <Bar dataKey="revenue" name="Actual" fill="var(--color-accent-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target" fill="var(--color-bg-elevated)" stroke="var(--color-border-strong)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ARR Growth */}
        <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">ARR Growth Trajectory (M)</h2>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                <XAxis 
                  dataKey="quarter" 
                  stroke="var(--color-text-muted)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="var(--color-text-muted)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-bg-panel)', 
                    borderColor: 'var(--color-border-strong)',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)'
                  }}
                  itemStyle={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
                  formatter={(value: number) => [`$${value}M`, 'ARR']}
                />
                <Line 
                  type="monotone" 
                  dataKey="arr" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: 'var(--color-bg-panel)', stroke: 'var(--color-success)', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: 'var(--color-success)', stroke: 'var(--color-bg-panel)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
