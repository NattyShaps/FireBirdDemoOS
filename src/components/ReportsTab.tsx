import React, { useState, useEffect } from 'react';
import { ArtistRecord } from '../data/mockData';
import { FileText, Download, Loader2, CheckCircle2, LayoutTemplate, Users, Settings2, FileOutput, CheckSquare, Square, ChevronRight, BarChart3, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface ReportsTabProps {
  record: ArtistRecord;
}

const REPORT_TYPES = [
  'Leadership Decision Brief',
  'Opportunity Diligence Report',
  'Weekly Operating Update',
  'Meeting Pack'
] as const;

type ReportType = typeof REPORT_TYPES[number];

const AUDIENCES = [
  'Leadership',
  'Artist Management',
  'Cross-Functional Team',
  'Business Development'
] as const;

type Audience = typeof AUDIENCES[number];

const DETAIL_LEVELS = ['Concise', 'Standard', 'Detailed'] as const;

const ALL_SECTIONS = [
  'Cover / title page',
  'Executive summary',
  'Artist overview',
  'Manager / relationship context',
  'Opportunity score',
  'Strategic fit score',
  'Quantitative market signals',
  'Touring and ticketing analysis',
  'Festival and market presence',
  'Audience growth trends',
  'Forecast summary',
  'P&L-lite summary',
  'Revenue mix',
  'Risk and confidence',
  'Key tradeoffs',
  'Qualitative intel',
  'AI recommendation memo',
  'Decision required',
  'Action tracker',
  'Leadership actions',
  'Team next steps',
  'Meeting agenda',
  'Meeting notes summary',
  'AI-generated follow-up items',
  'Data quality / missing fields',
  'Appendix / raw signals'
];

const DEFAULT_SECTIONS: Record<ReportType, string[]> = {
  'Leadership Decision Brief': [
    'Cover / title page',
    'Executive summary',
    'AI recommendation memo',
    'Decision required',
    'Strategic fit score',
    'Opportunity score',
    'Forecast summary',
    'Key tradeoffs',
    'Leadership actions',
    'Team next steps'
  ],
  'Opportunity Diligence Report': [
    'Cover / title page',
    'Artist overview',
    'Manager / relationship context',
    'Quantitative market signals',
    'Touring and ticketing analysis',
    'Opportunity score',
    'Qualitative intel',
    'Risk and confidence',
    'Data quality / missing fields'
  ],
  'Weekly Operating Update': [
    'Cover / title page',
    'Executive summary',
    'P&L-lite summary',
    'Action tracker',
    'Team next steps'
  ],
  'Meeting Pack': [
    'Cover / title page',
    'Meeting agenda',
    'Manager / relationship context',
    'AI recommendation memo',
    'Meeting notes summary',
    'AI-generated follow-up items'
  ]
};

export function ReportsTab({ record }: ReportsTabProps) {
  const [reportType, setReportType] = useState<ReportType>('Leadership Decision Brief');
  const [audience, setAudience] = useState<Audience>('Leadership');
  const [detailLevel, setDetailLevel] = useState<typeof DETAIL_LEVELS[number]>('Standard');
  const [includedSections, setIncludedSections] = useState<string[]>(DEFAULT_SECTIONS['Leadership Decision Brief']);
  
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeAiSummary, setIncludeAiSummary] = useState(true);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  // Update sections when report type changes
  useEffect(() => {
    setIncludedSections(DEFAULT_SECTIONS[reportType]);
    setIsGenerated(false);
  }, [reportType]);

  const toggleSection = (section: string) => {
    setIncludedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
    setIsGenerated(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsGenerated(false);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  const handleDownload = () => {
    // Simulate PDF download
    const filename = `firebird-${reportType.toLowerCase().replace(/\s+/g, '-')}-${record.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    
    // Create a dummy blob and trigger download
    const blob = new Blob(['Simulated PDF Content for ' + filename], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(1) + 'K';
    return '$' + num.toString();
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Report Builder</h1>
          <p className="text-[var(--color-text-secondary)]">Build a leadership-ready report from the current record.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Column: Configuration */}
        <div className="xl:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Report Type */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" /> Report Type
            </h2>
            <div className="space-y-2">
              {REPORT_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 border",
                    reportType === type
                      ? "bg-[var(--color-bg-elevated)] border-[var(--color-accent-primary-soft)] text-[var(--color-accent-primary-soft)] shadow-sm"
                      : "bg-transparent border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Audience & Detail Level */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> Audience & Detail
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Target Audience</label>
                <select 
                  value={audience}
                  onChange={(e) => setAudience(e.target.value as Audience)}
                  className="w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[var(--color-accent-primary-soft)] text-[var(--color-text-primary)]"
                >
                  {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-2">Detail Level</label>
                <div className="flex bg-[var(--color-bg-elevated)] border border-[var(--color-border-strong)] rounded-md p-1">
                  {DETAIL_LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setDetailLevel(level)}
                      className={cn(
                        "flex-1 py-1.5 text-xs font-medium rounded transition-colors",
                        detailLevel === level
                          ? "bg-[var(--color-bg-panel)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-subtle)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-subtle)] space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                    includeCharts ? "bg-[var(--color-accent-primary-soft)] border-[var(--color-accent-primary-soft)]" : "border-[var(--color-border-strong)] group-hover:border-[var(--color-text-muted)]"
                  )}>
                    {includeCharts && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">Include charts</span>
                  <input type="checkbox" className="hidden" checked={includeCharts} onChange={() => setIncludeCharts(!includeCharts)} />
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                    includeAiSummary ? "bg-[var(--color-accent-primary-soft)] border-[var(--color-accent-primary-soft)]" : "border-[var(--color-border-strong)] group-hover:border-[var(--color-text-muted)]"
                  )}>
                    {includeAiSummary && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">Include AI summary</span>
                  <input type="checkbox" className="hidden" checked={includeAiSummary} onChange={() => setIncludeAiSummary(!includeAiSummary)} />
                </label>
              </div>
            </div>
          </div>

          {/* Section Toggles */}
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-5 flex-1 flex flex-col min-h-[300px]">
            <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4 flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> Included Sections
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">Select what to include in the final document.</p>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
              {ALL_SECTIONS.map(section => {
                const isIncluded = includedSections.includes(section);
                return (
                  <button
                    key={section}
                    onClick={() => toggleSection(section)}
                    className={cn(
                      "w-full flex items-center gap-3 px-2 py-1.5 rounded text-left transition-colors",
                      isIncluded ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-soft)]"
                    )}
                  >
                    {isIncluded ? (
                      <CheckSquare className="w-4 h-4 text-[var(--color-accent-primary-soft)] flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span className="text-sm truncate">{section}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Preview Canvas */}
        <div className="xl:col-span-8 flex flex-col gap-6 h-full">
          <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-6 flex-1 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-heading font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-2">
                <FileOutput className="w-4 h-4" /> Preview
              </h2>
              <div className="text-xs font-mono text-[var(--color-text-muted)]">
                Generated from current opportunity, forecast, and action data
              </div>
            </div>

            {/* Document Canvas */}
            <div className="flex-1 bg-[#F5F5F4] rounded-lg border border-[var(--color-border-strong)] overflow-y-auto p-8 shadow-inner relative">
              <div className="max-w-3xl mx-auto bg-white shadow-sm border border-[#E5E5E5] min-h-full p-10 text-[#1A1A1A] font-sans">
                
                {/* Document Header */}
                {includedSections.includes('Cover / title page') && (
                  <div className="border-b-2 border-[#1A1A1A] pb-6 mb-8">
                    <div className="flex justify-between items-start mb-12">
                      <div className="font-heading font-bold text-2xl tracking-tight">FIREBIRD</div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-[#666666] uppercase tracking-wider">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div className="text-xs font-mono text-[#666666] uppercase tracking-wider mt-1">CONFIDENTIAL</div>
                      </div>
                    </div>
                    
                    <h1 className="text-4xl font-heading font-bold mb-4 leading-tight">{reportType}</h1>
                    <div className="flex items-center gap-4 text-sm font-medium text-[#4A4A4A]">
                      <span>Subject: {record.name}</span>
                      <span>•</span>
                      <span>Audience: {audience}</span>
                      <span>•</span>
                      <span>Owner: {record.owner}</span>
                    </div>
                  </div>
                )}

                {/* Executive Summary */}
                {includedSections.includes('Executive summary') && (
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#666666] mb-3 border-b border-[#E5E5E5] pb-2">Executive Summary</h2>
                    <p className="text-sm leading-relaxed text-[#333333]">
                      {record.momentumSummary} {record.qualitativeNote}
                    </p>
                  </div>
                )}

                {/* AI Recommendation */}
                {includedSections.includes('AI recommendation memo') && includeAiSummary && (
                  <div className="mb-8 bg-[#FDF8F5] border border-[#F27D26]/30 p-5 rounded">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#F27D26] mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> AI Recommendation
                    </h2>
                    <p className="text-sm leading-relaxed text-[#333333] font-medium">
                      {record.opportunityScore > 75 
                        ? `Strongly recommend proceeding with ${record.name}. The projected net contribution justifies the marketing outlay given the accelerating digital momentum.`
                        : `Proceed with caution. ${record.name}'s momentum is offset by operational risks. Ensure live strategy is audited before committing capital.`}
                    </p>
                  </div>
                )}

                {/* Key Metrics Grid */}
                {(includedSections.includes('Strategic fit score') || includedSections.includes('Opportunity score') || includedSections.includes('Quantitative market signals')) && (
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#666666] mb-4 border-b border-[#E5E5E5] pb-2">Key Indicators</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {includedSections.includes('Opportunity score') && (
                        <div className="border border-[#E5E5E5] p-3 rounded bg-[#FAFAFA]">
                          <div className="text-[10px] uppercase tracking-wider text-[#666666] mb-1">Opp Score</div>
                          <div className="text-xl font-mono font-bold text-[#1A1A1A]">{record.opportunityScore}/100</div>
                        </div>
                      )}
                      {includedSections.includes('Strategic fit score') && (
                        <div className="border border-[#E5E5E5] p-3 rounded bg-[#FAFAFA]">
                          <div className="text-[10px] uppercase tracking-wider text-[#666666] mb-1">Strategic Fit</div>
                          <div className="text-xl font-mono font-bold text-[#1A1A1A]">{record.strategicFitScore}/20</div>
                        </div>
                      )}
                      {includedSections.includes('Quantitative market signals') && (
                        <>
                          <div className="border border-[#E5E5E5] p-3 rounded bg-[#FAFAFA]">
                            <div className="text-[10px] uppercase tracking-wider text-[#666666] mb-1">Monthly Listeners</div>
                            <div className="text-xl font-mono font-bold text-[#1A1A1A]">{(record.monthlyListeners / 1000000).toFixed(1)}M</div>
                          </div>
                          <div className="border border-[#E5E5E5] p-3 rounded bg-[#FAFAFA]">
                            <div className="text-[10px] uppercase tracking-wider text-[#666666] mb-1">Streaming Growth</div>
                            <div className="text-xl font-mono font-bold text-[#1A1A1A]">{record.streamingGrowth > 0 ? '+' : ''}{record.streamingGrowth}%</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Charts Placeholder */}
                {includeCharts && includedSections.includes('Forecast summary') && (
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#666666] mb-4 border-b border-[#E5E5E5] pb-2">Forecast Summary</h2>
                    <div className="h-48 border border-[#E5E5E5] rounded bg-[#FAFAFA] flex items-center justify-center flex-col gap-2">
                      <BarChart3 className="w-8 h-8 text-[#CCCCCC]" />
                      <span className="text-xs text-[#999999] font-mono">[ Revenue Mix Chart Rendered Here ]</span>
                    </div>
                  </div>
                )}

                {/* Action Tracker */}
                {includedSections.includes('Action tracker') && (
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#666666] mb-4 border-b border-[#E5E5E5] pb-2">Action Tracker</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#F27D26] mt-0.5"></div>
                        <div>
                          <div className="text-sm font-medium text-[#1A1A1A]">{record.nextRecommendedAction}</div>
                          <div className="text-xs text-[#666666]">Owner: {record.owner} • Status: In Progress</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-[#CCCCCC] mt-0.5"></div>
                        <div>
                          <div className="text-sm font-medium text-[#1A1A1A]">Draft touring P&L scenarios</div>
                          <div className="text-xs text-[#666666]">Owner: Finance • Due: Next Week</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Data Gaps */}
                {includedSections.includes('Data quality / missing fields') && (
                  <div className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#666666] mb-3 border-b border-[#E5E5E5] pb-2">Data Quality</h2>
                    <div className="flex items-start gap-2 text-sm text-[#666666]">
                      <AlertTriangle className="w-4 h-4 text-[#F27D26] flex-shrink-0 mt-0.5" />
                      <span>Missing fields lower confidence in this report. Touring avails and brand partnership history are currently incomplete.</span>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-16 pt-4 border-t border-[#E5E5E5] flex justify-between items-center text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                  <span>Firebird Artist OS</span>
                  <span>Page 1 of {detailLevel === 'Concise' ? '1' : detailLevel === 'Standard' ? '3' : '5'}</span>
                </div>

              </div>
            </div>

            {/* Generation Controls */}
            <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-6">
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                {includedSections.length === 0 ? (
                  <span className="text-[var(--color-warning)] flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> No sections selected</span>
                ) : (
                  <span>Includes {includedSections.length} section{includedSections.length !== 1 ? 's' : ''}</span>
                )}
              </div>
              
              <div className="flex gap-3">
                {isGenerated ? (
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-[var(--color-success)] text-white text-sm font-medium hover:bg-[var(--color-success)]/90 transition-all duration-200 shadow-sm shadow-[var(--color-success)]/20 animate-in zoom-in-95"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                ) : (
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || includedSections.length === 0}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 shadow-sm",
                      isGenerating || includedSections.length === 0
                        ? "bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] cursor-not-allowed border border-[var(--color-border-strong)]"
                        : "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-primary-soft)] shadow-[var(--color-accent-primary)]/20"
                    )}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" /> Generate Report
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
