import React, { useState, useMemo } from 'react';
import { ArtistRecord } from '../data/mockData';
import { CheckSquare, Square, Save, Pin, TrendingUp, DollarSign, Activity, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PortfolioTabProps {
  records: ArtistRecord[];
}

export function PortfolioTab({ records }: PortfolioTabProps) {
  const [selectedArtistIds, setSelectedArtistIds] = useState<Set<string>>(new Set(records.map(r => r.id)));
  const [savedViews, setSavedViews] = useState<{name: string, ids: string[]}[]>([
    { name: 'All Artists', ids: records.map(r => r.id) },
    { name: 'High Momentum', ids: records.filter(r => r.audienceVelocity === 'Accelerating').map(r => r.id) }
  ]);
  const [newViewName, setNewViewName] = useState('');
  const [isSavingView, setIsSavingView] = useState(false);

  const toggleArtist = (id: string) => {
    const newSelected = new Set(selectedArtistIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedArtistIds(newSelected);
  };

  const toggleAll = () => {
    if (selectedArtistIds.size === records.length) {
      setSelectedArtistIds(new Set());
    } else {
      setSelectedArtistIds(new Set(records.map(r => r.id)));
    }
  };

  const handleSaveView = () => {
    if (newViewName.trim()) {
      setSavedViews([...savedViews, { name: newViewName, ids: Array.from(selectedArtistIds) }]);
      setNewViewName('');
      setIsSavingView(false);
    }
  };

  const loadView = (ids: string[]) => {
    setSelectedArtistIds(new Set(ids));
  };

  const selectedRecords = useMemo(() => 
    records.filter(r => selectedArtistIds.has(r.id)),
    [records, selectedArtistIds]
  );

  // Aggregate PnL Data
  const aggregatedData = useMemo(() => {
    if (selectedRecords.length === 0) return null;

    let totalRevenue = 0;
    let totalSpend = 0;
    let totalProjected = 0;
    
    // Generate some mock time-series data based on selected artists
    const timeSeriesData = Array.from({ length: 6 }).map((_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() - (5 - i));
      
      let rev = 0;
      let cost = 0;
      
      selectedRecords.forEach(r => {
        // Mocking historical data based on current metrics
        // Since financials are not on ArtistRecord, we'll mock them based on opportunity score
        const mockYtdRevenue = r.opportunityScore * 15000;
        const mockYtdSpend = r.opportunityScore * 8000;
        const mockProjectedRevenue = mockYtdRevenue * 1.5;

        const baseRev = mockYtdRevenue / 12;
        const baseCost = mockYtdSpend / 12;
        const variance = 1 + (Math.random() * 0.4 - 0.2); // +/- 20% variance
        
        rev += baseRev * variance * (1 + (i * 0.05)); // Slight growth trend
        cost += baseCost * variance;
        
        if (i === 5) { // Current month
          totalRevenue += mockYtdRevenue;
          totalSpend += mockYtdSpend;
          totalProjected += mockProjectedRevenue;
        }
      });

      return {
        month: month.toLocaleString('default', { month: 'short' }),
        revenue: Math.round(rev),
        spend: Math.round(cost),
        margin: Math.round(rev - cost)
      };
    });

    return {
      totalRevenue,
      totalSpend,
      totalProjected,
      margin: totalRevenue - totalSpend,
      marginPercent: totalRevenue > 0 ? ((totalRevenue - totalSpend) / totalRevenue) * 100 : 0,
      timeSeriesData
    };
  }, [selectedRecords]);

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(0) + 'K';
    return '$' + num.toString();
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header & Saved Views */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Portfolio P&L</h1>
          <p className="text-[var(--color-text-secondary)]">Aggregate financial performance across selected pipeline artists.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {savedViews.map((view, i) => (
            <button
              key={i}
              onClick={() => loadView(view.ids)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-colors"
            >
              <Pin className="w-3 h-3" />
              {view.name}
            </button>
          ))}
          
          <div className="relative ml-2">
            {isSavingView ? (
              <div className="flex items-center gap-2 bg-[var(--color-bg-panel)] border border-[var(--color-accent-primary-soft)] rounded-full p-1 pl-3">
                <input
                  type="text"
                  placeholder="View name..."
                  value={newViewName}
                  onChange={(e) => setNewViewName(e.target.value)}
                  className="bg-transparent text-xs focus:outline-none w-24 text-[var(--color-text-primary)]"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveView()}
                />
                <button onClick={handleSaveView} className="p-1 bg-[var(--color-accent-primary)] text-white rounded-full hover:bg-[var(--color-accent-primary-hover)]">
                  <CheckSquare className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSavingView(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] text-xs font-medium text-[var(--color-accent-primary-soft)] hover:bg-[var(--color-bg-soft)] transition-colors"
              >
                <Save className="w-3 h-3" />
                Save View
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Sidebar: Artist Selection */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-4 flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--color-border-subtle)]">
              <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Select Artists</h2>
              <button 
                onClick={toggleAll}
                className="text-xs text-[var(--color-accent-primary-soft)] hover:text-[var(--color-accent-primary-hover)] font-medium"
              >
                {selectedArtistIds.size === records.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {records.map(artist => {
                const isSelected = selectedArtistIds.has(artist.id);
                return (
                  <div 
                    key={artist.id}
                    onClick={() => toggleArtist(artist.id)}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors border",
                      isSelected 
                        ? "bg-[var(--color-bg-soft)] border-[var(--color-accent-primary-soft)]/30" 
                        : "bg-transparent border-transparent hover:bg-[var(--color-bg-elevated)]"
                    )}
                  >
                    <div className="text-[var(--color-accent-primary-soft)]">
                      {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-[var(--color-text-muted)]" />}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--color-bg-elevated)] flex-shrink-0">
                      <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={cn("text-sm font-medium truncate", isSelected ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]")}>
                        {artist.name}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] truncate">
                        {formatCurrency(artist.opportunityScore * 15000)} Rev
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Area: Aggregated Data */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          {aggregatedData ? (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-2">
                    <DollarSign className="w-4 h-4" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider">Aggregated YTD Revenue</h3>
                  </div>
                  <div className="text-3xl font-mono font-bold text-[var(--color-text-primary)]">
                    {formatCurrency(aggregatedData.totalRevenue)}
                  </div>
                </div>
                
                <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-2">
                    <Activity className="w-4 h-4" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider">Aggregated YTD Spend</h3>
                  </div>
                  <div className="text-3xl font-mono font-bold text-[var(--color-text-primary)]">
                    {formatCurrency(aggregatedData.totalSpend)}
                  </div>
                </div>

                <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider">Aggregated Margin</h3>
                  </div>
                  <div className="flex items-end gap-3">
                    <div className={cn("text-3xl font-mono font-bold", aggregatedData.margin >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]")}>
                      {formatCurrency(aggregatedData.margin)}
                    </div>
                    <div className="text-sm font-mono text-[var(--color-text-muted)] mb-1">
                      ({aggregatedData.marginPercent.toFixed(1)}%)
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-2">
                    <Users className="w-4 h-4" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider">Projected EOY Revenue</h3>
                  </div>
                  <div className="text-3xl font-mono font-bold text-[var(--color-accent-primary-soft)]">
                    {formatCurrency(aggregatedData.totalProjected)}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6 flex-1 min-h-[400px] flex flex-col">
                <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">Aggregated Revenue vs Spend (6 Mo)</h2>
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={aggregatedData.timeSeriesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-accent-primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-accent-primary)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
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
                        tickFormatter={(value) => `$${value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : value >= 1000 ? (value/1000).toFixed(0) + 'K' : value}`}
                        dx={-10}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--color-bg-panel)', 
                          borderColor: 'var(--color-border-strong)',
                          borderRadius: '8px',
                          color: 'var(--color-text-primary)'
                        }}
                        itemStyle={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
                        formatter={(value: number) => [formatCurrency(value), undefined]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        name="Revenue"
                        stroke="var(--color-accent-primary)" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRev)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="spend" 
                        name="Spend"
                        stroke="var(--color-danger)" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorSpend)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">No Artists Selected</h3>
              <p className="text-[var(--color-text-secondary)] max-w-md">
                Select one or more artists from the list on the left to view aggregated P&L data and performance trends.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
