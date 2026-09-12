import { useState } from 'react';
import { Link } from 'react-router';

const DISCLAIMER = 'This module explains and simulates a proposed Price Stability & Allocation Mechanism (PSAM) for Carbon Credit Certificates under India\'s CCTS. It is illustrative only, separate from physical CO₂ trading on this platform, and does not reflect officially notified CERC price bands.';

function AccordionCard({ icon, title, body, diagram, open, onToggle }: { icon: string; title: string; body: string; diagram: React.ReactNode; open: boolean; onToggle: () => void }) {
  return (
    <div className="border border-[#2A2C31] rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-[#1A1C21] transition-colors"
      >
        <span className="text-3xl">{icon}</span>
        <span className="flex-1 font-bold text-[#F5F5F3] text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{title}</span>
        <span className="text-[#4FC3F7] text-xl transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>↓</span>
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-[#2A2C31]">
          <p className="text-[rgba(245,245,243,0.65)] leading-relaxed mt-4 mb-6 text-sm">{body}</p>
          <div className="bg-[#1A1C21] rounded-xl p-5">
            {diagram}
          </div>
        </div>
      )}
    </div>
  );
}

function AuctionDiagram() {
  return (
    <svg viewBox="0 0 480 100" className="w-full" fill="none">
      {/* Nodes */}
      {[
        { x: 20, label: 'Factory', sub: 'Credits', color: '#4FC3F7' },
        { x: 160, label: 'Consignment', sub: 'Portion sent', color: '#2A2C31' },
        { x: 300, label: 'Auction', sub: 'Govt-run', color: '#4FC3F7' },
        { x: 420, label: 'Buyers', sub: 'Market', color: '#2F855A' },
      ].map(n => (
        <g key={n.label}>
          <rect x={n.x} y="20" width="80" height="40" rx="8" fill={n.color} fillOpacity={n.color === '#2A2C31' ? 1 : 0.15} stroke={n.color} strokeWidth="1.5" />
          <text x={n.x + 40} y="38" textAnchor="middle" fontSize="9" fill="#F5F5F3" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600">{n.label}</text>
          <text x={n.x + 40} y="51" textAnchor="middle" fontSize="8" fill="rgba(245,245,243,0.5)" fontFamily="Inter, sans-serif">{n.sub}</text>
        </g>
      ))}
      {/* Arrows */}
      {[[100, 160], [240, 300], [380, 420]].map(([x1, x2]) => (
        <g key={x1}>
          <line x1={x1} y1="40" x2={x2} y2="40" stroke="#4FC3F7" strokeWidth="1.5" strokeOpacity="0.6" />
          <polygon points={`${x2},36 ${x2},44 ${x2 + 6},40`} fill="#4FC3F7" fillOpacity="0.6" />
        </g>
      ))}
      {/* Return arrow */}
      <path d="M 380 70 Q 220 100 100 70" stroke="#2F855A" strokeWidth="1.5" strokeDasharray="4,3" strokeOpacity="0.7" />
      <text x="240" y="96" textAnchor="middle" fontSize="8" fill="rgba(245,245,243,0.5)" fontFamily="Inter, sans-serif">Proceeds return to Factory</text>
    </svg>
  );
}

function VintageDiagram() {
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  return (
    <div>
      <div className="flex gap-1 mb-2">
        {years.map((y, i) => (
          <div key={y} className="flex-1 text-center">
            <div className={`h-8 rounded text-xs flex items-center justify-center font-semibold transition-all
              ${i >= 4 ? 'bg-[#4FC3F7] text-[#0F1115]' : i >= 3 ? 'bg-[#4FC3F7]/40 text-[#4FC3F7]' : 'bg-[#2A2C31] text-[rgba(245,245,243,0.3)]'}`}>
              {i >= 4 ? '✓' : i >= 3 ? '~' : '✕'}
            </div>
            <div className="text-xs text-[rgba(245,245,243,0.4)] mt-1">{y}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3">
        {[['#4FC3F7', 'Fully eligible (within window)'], ['#4FC3F7', 'Partially eligible'], ['#2A2C31', 'Outside window']].map(([c, l], i) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: i === 1 ? 'rgba(79,195,247,0.4)' : c }} />
            <span className="text-xs text-[rgba(245,245,243,0.5)]">{l}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-[rgba(245,245,243,0.35)] mt-3">Illustrative 3-year window — exact eligibility period is undetermined policy design.</p>
    </div>
  );
}

function CorridorDiagram() {
  return (
    <div className="flex gap-6 items-center">
      <div className="relative w-20 flex flex-col items-center">
        <div className="text-xs text-[rgba(245,245,243,0.5)] mb-1">Upper Bound</div>
        <div className="w-12 h-2 rounded bg-[#C05621]/60" />
        <div className="w-2 h-20 bg-gradient-to-b from-[#C05621]/20 via-[#4FC3F7]/30 to-[#2F855A]/20 rounded-full my-1" />
        <div className="w-12 h-2 rounded bg-[#2F855A]/60" />
        <div className="text-xs text-[rgba(245,245,243,0.5)] mt-1">Lower Bound</div>
      </div>
      <div className="flex-1 text-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded bg-[#C05621]/60" /><span className="text-xs text-[rgba(245,245,243,0.65)]">Triggers intervention to supply more credits (price above ceiling)</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded bg-[#4FC3F7]/30" /><span className="text-xs text-[rgba(245,245,243,0.65)]">Normal range — no intervention; market determines price</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#2F855A]/60" /><span className="text-xs text-[rgba(245,245,243,0.65)]">Triggers intervention to absorb supply (price below floor)</span>
        </div>
        <p className="text-xs text-[rgba(245,245,243,0.35)] mt-3">Exact ₹/tonne bounds are not yet officially notified — illustrative example only.</p>
      </div>
    </div>
  );
}

export default function PSAMInsights() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0F1115] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-8">
        {/* Disclaimer banner */}
        <div className="bg-[#1A1C21] border border-[#2A2C31] rounded-xl px-6 py-4 mb-10">
          <div className="flex items-start gap-3">
            <span className="text-[#4FC3F7] text-lg mt-0.5 shrink-0">ℹ</span>
            <p className="text-sm text-[rgba(245,245,243,0.65)] leading-relaxed">{DISCLAIMER}</p>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[rgba(245,245,243,0.4)] font-semibold mb-1">Policy Intelligence</p>
          <h1 className="text-4xl font-bold text-[#F5F5F3] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>PSAM Insights</h1>
          <p className="text-[rgba(245,245,243,0.55)] leading-relaxed">
            Plain-English explainers of three proposed sub-mechanisms within India's CCTS Price Stability & Allocation Mechanism. These instruments govern Carbon Credit Certificates (CCCs) — a wholly separate instrument from physical CO₂ gas traded elsewhere on this platform.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: '🏛️',
              title: 'Consignment Auction',
              body: 'Under this mechanism, a regulated entity sends a designated portion of its Carbon Credit Certificates to a government-administered auction, rather than selling them directly on the open market. The factory\'s property rights are preserved — proceeds from the auction flow back to the original credit holder. This approach is designed to prevent hoarding, improve price transparency, and ensure a reliable volume of credits reaches the market at regular intervals, supporting price stability without requiring outright government ownership of the credits.',
              diagram: <AuctionDiagram />,
            },
            {
              icon: '📅',
              title: 'Vintage-based Credits',
              body: 'Credits are tagged by the year they were issued (their "vintage"). The PSAM design proposes an eligibility window — credits older than a defined threshold become restricted or ineligible for compliance use. This prevents entities from banking very old credits and flooding the market in high-supply years, which would depress prices and undermine the scheme\'s environmental integrity. The exact eligibility window is an open policy design question — the illustrative example below uses a 3-year window to show how the mechanism works in principle.',
              diagram: <VintageDiagram />,
            },
            {
              icon: '↕️',
              title: 'Price Corridor',
              body: 'The Price Corridor is a dual-bound intervention zone — an upper ceiling price and a lower floor price — set by CERC for Carbon Credit Certificates. When the market price approaches or breaches the ceiling, the mechanism triggers additional supply (e.g., releasing credits from a reserve); when price falls toward the floor, the mechanism absorbs excess supply. Within the corridor, the market sets the price freely. The corridor is not a fixed price — it is a trigger zone for managed intervention. Exact ₹/tonne bounds are not yet officially notified by CERC and the values shown are illustrative.',
              diagram: <CorridorDiagram />,
            },
          ].map((c, i) => (
            <AccordionCard key={c.title} {...c} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/psam/simulator"
            className="inline-block px-10 py-4 rounded-full bg-[#4FC3F7] text-[#0F1115] font-semibold hover:bg-[#1E88C7] hover:text-white transition-all duration-250 hover:scale-105 hover:shadow-xl hover:shadow-[#4FC3F7]/20">
            Open PSAM Simulator →
          </Link>
        </div>
      </div>
    </div>
  );
}
