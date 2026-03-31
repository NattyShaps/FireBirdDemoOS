import React from 'react';
import { TrendingUp, Sparkles, Music, Activity, Play, ArrowUpRight, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data for Signals
const NEW_ARTISTS = [
  { id: 'n1', name: 'Luna Eclipse', genre: 'Dream Pop', momentum: '+42%', listeners: '120K', image: 'https://images.unsplash.com/photo-1516280440502-a2fc8c616f71?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 'n2', name: 'The Void', genre: 'Post-Punk', momentum: '+85%', listeners: '45K', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f0a414?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 'n3', name: 'Neon Dreams', genre: 'Synthwave', momentum: '+21%', listeners: '310K', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 'n4', name: 'Echo Chamber', genre: 'Indie Rock', momentum: '+15%', listeners: '89K', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=150&h=150' },
];

const POPULAR_ARTISTS = [
  { id: 'p1', name: 'Midnight Riot', genre: 'Alt Rock', rank: 1, listeners: '4.2M', trend: 'up', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 'p2', name: 'Sarah Jenkins', genre: 'Pop', rank: 2, listeners: '3.8M', trend: 'same', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f0a414?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 'p3', name: 'The Outliers', genre: 'Hip Hop', rank: 3, listeners: '2.9M', trend: 'up', image: 'https://images.unsplash.com/photo-1516280440502-a2fc8c616f71?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 'p4', name: 'Electric Soul', genre: 'R&B', rank: 4, listeners: '2.1M', trend: 'down', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=150&h=150' },
];

const NEW_SONGS = [
  { id: 's1', title: 'Fading Lights', artist: 'Luna Eclipse', streams: '45K', added: '2 days ago', cover: 'https://images.unsplash.com/photo-1516280440502-a2fc8c616f71?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 's2', title: 'City Noise', artist: 'The Void', streams: '12K', added: '5 hours ago', cover: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f0a414?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 's3', title: 'Retrograde', artist: 'Neon Dreams', streams: '89K', added: '1 week ago', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=100&h=100' },
];

const POPULAR_SONGS = [
  { id: 'ps1', title: 'Midnight Anthem', artist: 'Midnight Riot', streams: '1.2M', rank: 1, cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 'ps2', title: 'Heartbreak Summer', artist: 'Sarah Jenkins', streams: '980K', rank: 2, cover: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f0a414?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 'ps3', title: 'Street Lights', artist: 'The Outliers', streams: '850K', rank: 3, cover: 'https://images.unsplash.com/photo-1516280440502-a2fc8c616f71?auto=format&fit=crop&q=80&w=100&h=100' },
];

export function SignalsTab() {
  return (
    <div className="flex flex-col gap-8 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight mb-2">Market Signals</h1>
          <p className="text-[var(--color-text-secondary)]">Real-time intelligence on emerging trends, artists, and tracks.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/20 text-xs font-medium text-[var(--color-accent-primary-soft)]">
            <Activity className="w-3 h-3" />
            Live Feed Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column: Artists */}
        <div className="flex flex-col gap-8">
          {/* New & Emerging Artists */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--color-accent-primary-soft)]" />
              <h2 className="text-lg font-heading font-bold text-[var(--color-text-primary)]">Emerging Artists</h2>
              <span className="ml-2 text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] px-2 py-0.5 rounded-full border border-[var(--color-border-subtle)]">High Velocity</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NEW_ARTISTS.map(artist => (
                <div key={artist.id} className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-4 flex items-center gap-4 hover:bg-[var(--color-bg-soft)] transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--color-bg-elevated)] flex-shrink-0 border border-[var(--color-border-subtle)]">
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--color-text-primary)] truncate">{artist.name}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-1">{artist.genre}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-[var(--color-success)] flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" />{artist.momentum}</span>
                      <span className="text-[var(--color-text-muted)]">• {artist.listeners} ML</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Artists */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-[var(--color-warning)]" />
              <h2 className="text-lg font-heading font-bold text-[var(--color-text-primary)]">Trending Artists</h2>
              <span className="ml-2 text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] px-2 py-0.5 rounded-full border border-[var(--color-border-subtle)]">Top Charts</span>
            </div>
            
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl overflow-hidden">
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {POPULAR_ARTISTS.map(artist => (
                  <div key={artist.id} className="p-4 flex items-center gap-4 hover:bg-[var(--color-bg-soft)] transition-colors cursor-pointer group">
                    <div className="w-6 text-center font-mono font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      #{artist.rank}
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--color-bg-elevated)] flex-shrink-0">
                      <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[var(--color-text-primary)] truncate">{artist.name}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)]">{artist.genre}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm font-medium text-[var(--color-text-primary)]">{artist.listeners}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Listeners</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Songs */}
        <div className="flex flex-col gap-8">
          {/* New Songs */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-5 h-5 text-[var(--color-accent-cool)]" />
              <h2 className="text-lg font-heading font-bold text-[var(--color-text-primary)]">Fresh Releases</h2>
              <span className="ml-2 text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] px-2 py-0.5 rounded-full border border-[var(--color-border-subtle)]">Last 7 Days</span>
            </div>
            
            <div className="space-y-3">
              {NEW_SONGS.map(song => (
                <div key={song.id} className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl p-3 flex items-center gap-4 hover:bg-[var(--color-bg-soft)] transition-colors cursor-pointer group">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden bg-[var(--color-bg-elevated)] flex-shrink-0 border border-[var(--color-border-subtle)]">
                    <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--color-text-primary)] truncate">{song.title}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] truncate">{song.artist}</p>
                  </div>
                  <div className="text-right pr-2">
                    <div className="font-mono text-sm text-[var(--color-accent-primary-soft)]">{song.streams}</div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">{song.added}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Songs */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
              <h2 className="text-lg font-heading font-bold text-[var(--color-text-primary)]">Top Tracks</h2>
              <span className="ml-2 text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] px-2 py-0.5 rounded-full border border-[var(--color-border-subtle)]">Global</span>
            </div>
            
            <div className="bg-[var(--color-bg-panel)] border border-[var(--color-border-strong)] rounded-xl overflow-hidden">
              <div className="divide-y divide-[var(--color-border-subtle)]">
                {POPULAR_SONGS.map(song => (
                  <div key={song.id} className="p-3 flex items-center gap-4 hover:bg-[var(--color-bg-soft)] transition-colors cursor-pointer group">
                    <div className="w-6 text-center font-mono font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      {song.rank}
                    </div>
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[var(--color-bg-elevated)] flex-shrink-0">
                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[var(--color-text-primary)] truncate">{song.title}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)] truncate">{song.artist}</p>
                    </div>
                    <div className="text-right pr-2">
                      <div className="font-mono text-sm font-medium text-[var(--color-text-primary)]">{song.streams}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Streams</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
