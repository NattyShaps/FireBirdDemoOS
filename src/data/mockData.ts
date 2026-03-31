export type ArtistStage = 'Discovery' | 'Development' | 'Growth' | 'Established' | 'Legacy';
export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface ArtistRecord {
  id: string;
  name: string;
  manager: string;
  stage: ArtistStage;
  region: string;
  genre: string;
  momentumSummary: string;
  streamingGrowth: number; // percentage
  monthlyListeners: number;
  audienceVelocity: 'Accelerating' | 'Steady' | 'Declining';
  chartSignal: string;
  touringHistory: string;
  ticketSales: string;
  festivalPlacements: string[];
  socialEngagement: string;
  releaseCadence: string;
  qualitativeNote: string;
  opportunityScore: number;
  strategicFitScore: number;
  riskLevel: RiskLevel;
  nextRecommendedAction: string;
  lastInternalUpdate: string;
  owner: string;
  leadershipAttentionNeeded: boolean;
  imageUrl: string;
  
  // Detailed scores for the breakdown
  scores: {
    digitalMomentum: number;
    liveStrength: number;
    strategicFit: number;
    relationshipAccess: number;
    operationalComplexity: number;
  };
  
  streamingStats: {
    spotify: { daily: number; monthly: number; downloads: number };
    appleMusic: { daily: number; monthly: number; downloads: number };
    soundcloud: { daily: number; monthly: number; downloads: number };
  };
}

export const mockRecords: ArtistRecord[] = [
  {
    id: 'rec-001',
    name: 'Skrillex',
    manager: 'Sarah Jenkins (Apex Mgmt)',
    stage: 'Growth',
    region: 'North America',
    genre: 'Electronic / Synthwave',
    momentumSummary: 'Breakout streaming momentum but limited touring proof. High upside if live strategy connects.',
    streamingGrowth: 145,
    monthlyListeners: 2400000,
    audienceVelocity: 'Accelerating',
    chartSignal: '#12 Spotify Viral 50 Global',
    touringHistory: '2 headline club tours (300-500 cap)',
    ticketSales: '85% sell-through, $25 avg ticket',
    festivalPlacements: ['Coachella Yuma (booked)', 'Electric Forest'],
    socialEngagement: 'High TikTok conversion, 8% IG engagement',
    releaseCadence: '1 single per month, EP dropping Q3',
    qualitativeNote: 'Sarah is pushing for a larger advance, but we need to see if the digital audience buys hard tickets in secondary markets.',
    opportunityScore: 82,
    strategicFitScore: 18,
    riskLevel: 'Moderate',
    nextRecommendedAction: 'Evaluate Q3 tour routing and model break-even.',
    lastInternalUpdate: '2h ago',
    owner: 'Alex Chen',
    leadershipAttentionNeeded: true,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    scores: {
      digitalMomentum: 28,
      liveStrength: 12,
      strategicFit: 18,
      relationshipAccess: 8,
      operationalComplexity: -4,
    },
    streamingStats: {
      spotify: { daily: 120000, monthly: 2400000, downloads: 4500 },
      appleMusic: { daily: 85000, monthly: 1800000, downloads: 3200 },
      soundcloud: { daily: 45000, monthly: 900000, downloads: 1200 }
    }
  },
  {
    id: 'rec-002',
    name: 'Bach',
    manager: 'Marcus Thorne',
    stage: 'Established',
    region: 'Europe / UK',
    genre: 'Alt Rock',
    momentumSummary: 'Touring-strong act with moderate digital growth. Reliable cash flow but needs a streaming catalyst.',
    streamingGrowth: 12,
    monthlyListeners: 4500000,
    audienceVelocity: 'Steady',
    chartSignal: 'Consistent catalog consumption',
    touringHistory: 'Arena support EU, 3k-cap headline UK',
    ticketSales: '95% sell-through, strong VIP uptake',
    festivalPlacements: ['Glastonbury', 'Reading & Leeds'],
    socialEngagement: 'Low growth, highly loyal core',
    releaseCadence: 'Album cycle (every 2 years)',
    qualitativeNote: 'Marcus is a legacy partner. They want to expand to the US, but the marketing spend required is significant.',
    opportunityScore: 75,
    strategicFitScore: 15,
    riskLevel: 'Low',
    nextRecommendedAction: 'Draft US expansion P&L for leadership review.',
    lastInternalUpdate: '1d ago',
    owner: 'Elena Rodriguez',
    leadershipAttentionNeeded: false,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f0a41e?auto=format&fit=crop&q=80&w=800',
    scores: {
      digitalMomentum: 14,
      liveStrength: 26,
      strategicFit: 15,
      relationshipAccess: 10,
      operationalComplexity: -5,
    },
    streamingStats: {
      spotify: { daily: 250000, monthly: 4500000, downloads: 12000 },
      appleMusic: { daily: 180000, monthly: 3200000, downloads: 8500 },
      soundcloud: { daily: 15000, monthly: 400000, downloads: 500 }
    }
  },
  {
    id: 'rec-003',
    name: 'John Mayer',
    manager: 'Independent',
    stage: 'Discovery',
    region: 'Latin America',
    genre: 'Latin Pop / R&B',
    momentumSummary: 'Early-stage artist with strong word-of-mouth and festival buzz. High risk, high reward.',
    streamingGrowth: 310,
    monthlyListeners: 450000,
    audienceVelocity: 'Accelerating',
    chartSignal: 'Trending on TikTok LATAM',
    touringHistory: 'Local showcases only',
    ticketSales: 'N/A',
    festivalPlacements: ['Ceremonia (early slot)'],
    socialEngagement: 'Viral moments, 15% engagement rate',
    releaseCadence: 'Sporadic',
    qualitativeNote: 'Raw talent. Needs infrastructure. We could build the team around her, but it requires heavy operational lifting.',
    opportunityScore: 68,
    strategicFitScore: 12,
    riskLevel: 'High',
    nextRecommendedAction: 'Schedule intro meeting with Lila and A&R.',
    lastInternalUpdate: '3h ago',
    owner: 'David Kim',
    leadershipAttentionNeeded: false,
    imageUrl: 'https://images.unsplash.com/photo-1516280440502-a2fc4453a2cb?auto=format&fit=crop&q=80&w=800',
    scores: {
      digitalMomentum: 25,
      liveStrength: 4,
      strategicFit: 12,
      relationshipAccess: 5,
      operationalComplexity: -9,
    },
    streamingStats: {
      spotify: { daily: 45000, monthly: 450000, downloads: 800 },
      appleMusic: { daily: 28000, monthly: 290000, downloads: 450 },
      soundcloud: { daily: 12000, monthly: 150000, downloads: 150 }
    }
  },
  {
    id: 'rec-004',
    name: 'Led Zeppelin',
    manager: 'Westwood Partners',
    stage: 'Established',
    region: 'Global',
    genre: 'Hip Hop',
    momentumSummary: 'Large, expensive opportunity with massive brand upside but complex deal terms.',
    streamingGrowth: 5,
    monthlyListeners: 18000000,
    audienceVelocity: 'Steady',
    chartSignal: 'Top 50 Global',
    touringHistory: 'Arena headline',
    ticketSales: '100% sell-through, high secondary market',
    festivalPlacements: ['Rolling Loud Headline'],
    socialEngagement: 'Massive reach, moderate engagement',
    releaseCadence: 'Major album drops',
    qualitativeNote: 'Westwood is shopping a 360 deal. The upfront capital requirement is huge. We need to model the brand partnership revenue to make it work.',
    opportunityScore: 88,
    strategicFitScore: 19,
    riskLevel: 'Moderate',
    nextRecommendedAction: 'Finalize brand revenue forecast.',
    lastInternalUpdate: '5h ago',
    owner: 'Sarah Jenkins',
    leadershipAttentionNeeded: true,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f0a41e?auto=format&fit=crop&q=80&w=800', // Reusing for now
    scores: {
      digitalMomentum: 20,
      liveStrength: 28,
      strategicFit: 19,
      relationshipAccess: 7,
      operationalComplexity: -8,
    },
    streamingStats: {
      spotify: { daily: 850000, monthly: 18000000, downloads: 45000 },
      appleMusic: { daily: 620000, monthly: 14500000, downloads: 38000 },
      soundcloud: { daily: 120000, monthly: 2800000, downloads: 5000 }
    }
  },
  {
    id: 'rec-005',
    name: 'Action Bronson',
    manager: 'Blue Sky Mgmt',
    stage: 'Development',
    region: 'North America',
    genre: 'Indie Folk',
    momentumSummary: 'Lower-priority record with weak indicators. Losing momentum post-album.',
    streamingGrowth: -15,
    monthlyListeners: 800000,
    audienceVelocity: 'Declining',
    chartSignal: 'None',
    touringHistory: '500-cap rooms',
    ticketSales: '60% sell-through',
    festivalPlacements: ['Local folk fests'],
    socialEngagement: 'Stagnant',
    releaseCadence: 'Album released 6 mos ago',
    qualitativeNote: 'The last record didn\'t connect. Manager is unresponsive. Might be time to deprioritize resources.',
    opportunityScore: 42,
    strategicFitScore: 8,
    riskLevel: 'Low',
    nextRecommendedAction: 'Review Q2 resource allocation.',
    lastInternalUpdate: '2d ago',
    owner: 'Alex Chen',
    leadershipAttentionNeeded: false,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    scores: {
      digitalMomentum: 8,
      liveStrength: 10,
      strategicFit: 8,
      relationshipAccess: 4,
      operationalComplexity: -2,
    },
    streamingStats: {
      spotify: { daily: 18000, monthly: 800000, downloads: 350 },
      appleMusic: { daily: 12000, monthly: 550000, downloads: 200 },
      soundcloud: { daily: 2000, monthly: 85000, downloads: 50 }
    }
  },
  {
    id: 'rec-006',
    name: 'John Daly (Whiskey & Water)',
    manager: 'Unknown',
    stage: 'Discovery',
    region: 'Asia',
    genre: 'Hyperpop',
    momentumSummary: 'Ambiguous/high-risk record where quantitative and qualitative signals conflict.',
    streamingGrowth: 500,
    monthlyListeners: 1200000,
    audienceVelocity: 'Accelerating',
    chartSignal: 'Viral in JP/KR',
    touringHistory: 'None',
    ticketSales: 'N/A',
    festivalPlacements: [],
    socialEngagement: 'Extremely high Discord/Reddit activity',
    releaseCadence: 'Daily SoundCloud drops',
    qualitativeNote: 'Numbers are insane but might be bot-driven or a fleeting meme. No clear path to monetization yet.',
    opportunityScore: 60,
    strategicFitScore: 10,
    riskLevel: 'High',
    nextRecommendedAction: 'Data science team to audit streaming quality.',
    lastInternalUpdate: '1h ago',
    owner: 'David Kim',
    leadershipAttentionNeeded: true,
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    scores: {
      digitalMomentum: 30,
      liveStrength: 0,
      strategicFit: 10,
      relationshipAccess: 2,
      operationalComplexity: -7,
    },
    streamingStats: {
      spotify: { daily: 95000, monthly: 1200000, downloads: 1200 },
      appleMusic: { daily: 45000, monthly: 650000, downloads: 800 },
      soundcloud: { daily: 250000, monthly: 3800000, downloads: 15000 }
    }
  }
];
