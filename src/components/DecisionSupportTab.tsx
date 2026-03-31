import React, { useState, useEffect } from 'react';
import { ArtistRecord } from '../data/mockData';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle, ChevronRight, BarChart3, DollarSign, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { cn } from '../lib/utils';

interface DecisionSupportTabProps {
  record: ArtistRecord;
}

export function DecisionSupportTab({ record }: DecisionSupportTabProps) {
  const [scenario, setScenario] = useState<'Conservative' | 'Base' | 'Aggressive'>('Base');
  
  // Model Inputs
  const [marketingSpend, setMarketingSpend] = useState(250000);
  const [tourMarkets, setTourMarkets] = useState(15);
  const [ticketPrice, setTicketPrice] = useState(45);
  const [sellThrough, setSellThrough] = useState(85);
  
  // Reset inputs when record changes or scenario changes
  useEffect(() => {
    const baseSpend = record.stage === 'Discovery' ? 50000 : record.stage === 'Growth' ? 250000 : 1000000;
    const baseMarkets = record.stage === 'Discovery' ? 5 : record.stage === 'Growth' ? 15 : 40;
    const basePrice = record.stage === 'Discovery' ? 20 : record.stage === 'Growth' ? 45 : 85;
    const baseSellThrough = 85;

    const multiplier = scenario === 'Conservative' ? 0.8 : scenario === 'Aggressive' ? 1.3 : 1;

    setMarketingSpend(Math.round(baseSpend * multiplier));
    setTourMarkets(Math.round(baseMarkets * (scenario === 'Conservative' ? 0.7 : scenario === 'Aggressive' ? 1.5 : 1)));
    setTicketPrice(Math.round(basePrice * (scenario === 'Conservative' ? 0.9 : scenario === 'Aggressive' ? 1.15 : 1)));
    setSellThrough(Math.min(100, Math.round(baseSellThrough * (scenario === 'Conservative' ? 0.8 : scenario === 'Aggressive' ? 1.1 : 1))));
  }, [record.id, scenario]);

  // Derived Outputs
  const avgCap = record.stage === 'Discovery' ? 300 : record.stage === 'Growth' ? 1200 : 15000;
  const projectedTickets = tourMarkets * avgCap * (sellThrough / 100);
  const grossTouring = projectedTickets * ticketPrice;
  const netTouring = grossTouring * 0.3; // 30% margin assumption
  
  const streamingRev = record.monthlyListeners * 12 * 0.004 * (scenario === 'Conservative' ? 0.9 : scenario === 'Aggressive' ? 1.5 : 1.1);
  const merchRev = projectedTickets * 12; // $12 per head
  
  const totalRev = netTouring + streamingRev + merchRev;
  const netContribution = totalRev - marketingSpend;

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);

  const chartData = [
    { name: 'Q1', Touring: netTouring * 0.1, Streaming: streamingRev * 0.2, Merch: merchRev * 0.1 },
    { name: 'Q2', Touring: netTouring * 0.4, Streaming: streamingRev * 0.25, Merch: merchRev * 0.4 },
    { name: 'Q3', Touring: netTouring * 0.4, Streaming: streamingRev * 0.25, Merch: merchRev * 0.4 },
    { name: 'Q4', Touring: netTouring * 0.1, Streaming: streamingRev * 0.3, Merch: merchRev * 0.1 },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Decision Support</h1>
          <p className="text-[var(--color-text-secondary)]">Evaluate {record.name}'s 12-month forecast and strategic tradeoffs.</p>
        </div>
        <div className="flex items-center bg-[var(--color-bg-panel)] rounded-lg p-1 border border-[var(--color-border-strong)]">
          {(['Conservative', 'Base', 'Aggressive'] as const).map(s => (
            <button
              key={s}
              onClick={() => setScenario(s)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                scenario === s 
                  ? "bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-subtle)]" 
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Inputs & AI */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          {/* Scenario Model Inputs */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Scenario Assumptions
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="font-medium text-[var(--color-text-secondary)]">Marketing Spend</label>
                  <span className="font-mono text-[var(--color-accent-primary-soft)]">{formatCurrency(marketingSpend)}</span>
                </div>
                <input 
                  type="range" 
                  min={10000} 
                  max={2000000} 
                  step={10000}
                  value={marketingSpend} 
                  onChange={(e) => setMarketingSpend(Number(e.target.value))}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="font-medium text-[var(--color-text-secondary)]">Tour Markets</label>
                  <span className="font-mono text-[var(--color-accent-primary-soft)]">{tourMarkets}</span>
                </div>
                <input 
                  type="range" 
                  min={0} 
                  max={80} 
                  step={1}
                  value={tourMarkets} 
                  onChange={(e) => setTourMarkets(Number(e.target.value))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Avg Ticket Price</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input 
                      type="number" 
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(Number(e.target.value))}
                      className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] rounded-md py-2 pl-9 pr-3 text-sm font-mono focus:outline-none focus:border-[var(--color-accent-primary-soft)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Sell-Through %</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={sellThrough}
                      onChange={(e) => setSellThrough(Number(e.target.value))}
                      className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] rounded-md py-2 px-3 text-sm font-mono focus:outline-none focus:border-[var(--color-accent-primary-soft)]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="bg-gradient-to-br from-[var(--color-bg-panel)] to-[var(--color-bg-elevated)] border border-[var(--color-accent-primary)]/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-primary)]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-accent-primary-soft)] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Recommendation
            </h2>
            
            <div className="space-y-4 relative z-10">
              <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">
                {record.opportunityScore > 75 
                  ? `Strongly recommend proceeding with ${record.name}. The projected net contribution of ${formatCurrency(netContribution)} under the ${scenario} scenario justifies the marketing outlay.`
                  : `Proceed with caution. ${record.name}'s momentum is offset by operational risks. The ${scenario} scenario yields ${formatCurrency(netContribution)}, which may not meet hurdle rates.`}
              </p>
              
              <div className="pt-4 border-t border-[var(--color-border-subtle)]">
                <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">Next 30 Days:</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[var(--color-accent-primary-soft)] flex-shrink-0 mt-0.5" />
                    <span>{record.nextRecommendedAction}</span>
                  </li>
                  <li className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[var(--color-accent-primary-soft)] flex-shrink-0 mt-0.5" />
                    <span>Lock in {tourMarkets} target markets for Q3 routing.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Outputs & Charts */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* KPI Strips */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Net Contribution</span>
              <span className={cn("text-2xl font-mono font-semibold", netContribution >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-danger)]")}>
                {formatCurrency(netContribution)}
              </span>
            </div>
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Total Revenue</span>
              <span className="text-2xl font-mono font-semibold text-[var(--color-text-primary)]">
                {formatCurrency(totalRev)}
              </span>
            </div>
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Projected Tickets</span>
              <span className="text-2xl font-mono font-semibold text-[var(--color-text-primary)]">
                {formatNumber(projectedTickets)}
              </span>
            </div>
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-4 flex flex-col justify-between">
              <span className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Confidence Level</span>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-mono font-semibold text-[var(--color-text-primary)]">
                  {record.opportunityScore > 80 ? 'High' : record.opportunityScore > 60 ? 'Med' : 'Low'}
                </span>
                <span className="text-sm text-[var(--color-text-muted)] mb-1">({record.opportunityScore}/100)</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6 flex-1 min-h-[300px]">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">12-Month Revenue Forecast</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip 
                    cursor={{ fill: 'var(--color-bg-soft)' }}
                    contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-strong)', borderRadius: '8px', color: 'var(--color-text-primary)', fontSize: '12px' }}
                    itemStyle={{ color: 'var(--color-text-primary)' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--color-text-secondary)' }} />
                  <Bar dataKey="Touring" stackId="a" fill="var(--color-accent-primary)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Streaming" stackId="a" fill="var(--color-accent-cool)" />
                  <Bar dataKey="Merch" stackId="a" fill="var(--color-accent-gold)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tradeoffs & Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
              <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">Tradeoffs & Risks</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-md bg-[var(--color-bg-soft)]">
                  {record.scores.digitalMomentum > record.scores.liveStrength ? (
                    <TrendingUp className="w-4 h-4 text-[var(--color-info)] flex-shrink-0 mt-0.5" />
                  ) : (
                    <Users className="w-4 h-4 text-[var(--color-warning)] flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-[var(--color-text-secondary)] leading-tight">
                    {record.scores.digitalMomentum > record.scores.liveStrength 
                      ? "High digital growth but weak live proof. Touring assumptions carry higher risk."
                      : "Strong touring history but low streaming acceleration. Digital marketing ROI may be lower."}
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-md bg-[var(--color-bg-soft)]">
                  <AlertTriangle className={cn("w-4 h-4 flex-shrink-0 mt-0.5", record.riskLevel === 'High' ? "text-[var(--color-danger)]" : "text-[var(--color-warning)]")} />
                  <p className="text-sm text-[var(--color-text-secondary)] leading-tight">
                    {record.qualitativeNote}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6">
              <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">Decision Snapshot</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border-subtle)]">
                  <span className="text-sm text-[var(--color-text-muted)]">Status</span>
                  <span className="text-sm font-medium px-2 py-1 rounded bg-[var(--color-bg-soft)] text-[var(--color-text-primary)]">Pending Review</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[var(--color-border-subtle)]">
                  <span className="text-sm text-[var(--color-text-muted)]">Owner</span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{record.owner}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--color-text-muted)]">Target Timing</span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">End of Q2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
