import { useState, useMemo } from 'react';
import { Link } from 'react-router';

const DISCLAIMER = 'This module explains and simulates a proposed Price Stability & Allocation Mechanism (PSAM) for Carbon Credit Certificates under India\'s CCTS. It is illustrative only, separate from physical CO₂ trading on this platform, and does not reflect officially notified CERC price bands.';

function SimChart({ auctionPct, vintageWindow, corridorLow, corridorHigh }: { auctionPct: number; vintageWindow: number; corridorLow: number; corridorHigh: number }) {
  const periods = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
  const data = useMemo(() => periods.map((_, i) => {
    const base = 2800;
    const auctionEffect = -auctionPct * 4;
    const vintageEffect = (vintageWindow - 3) * 80;
    const noise = Math.sin(i * 1.4) * 150;
    const price = Math.max(corridorLow - 200, Math.min(corridorHigh + 200, base + auctionEffect + vintageEffect + noise));
    const supply = 100 + auctionPct * 0.8 + (vintageWindow - 1) * 8 + Math.cos(i * 1.2) * 15;
    return { label: periods[i], price: Math.round(price), supply: Math.round(supply) };
  }), [auctionPct, vintageWindow, corridorLow, corridorHigh]);

  const maxPrice = Math.max(...data.map(d => d.price), corridorHigh + 400);
  const minPrice = Math.min(...data.map(d => d.price), corridorLow - 400);
  const range = maxPrice - minPrice;
  const w = 480, h = 180, pad = 32;
  const chartW = w - pad * 2, chartH = h - pad * 2;

  const toX = (i: number) => pad + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => pad + chartH - ((v - minPrice) / range) * chartH;

  const points = data.map((d, i) => `${toX(i)},${toY(d.price)}`).join(' ');
  const corridorTop = toY(corridorHigh);
  const corridorBot = toY(corridorLow);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" fill="none">
      {/* Corridor band */}
      <rect x={pad} y={corridorTop} width={chartW} height={corridorBot - corridorTop}
        fill="#4FC3F7" fillOpacity="0.08" />
      <line x1={pad} y1={corridorTop} x2={w - pad} y2={corridorTop} stroke="#C05621" strokeWidth="1" strokeDasharray="4,3" />
      <line x1={pad} y1={corridorBot} x2={w - pad} y2={corridorBot} stroke="#2F855A" strokeWidth="1" strokeDasharray="4,3" />
      <text x={w - pad + 2} y={corridorTop + 4} fontSize="7" fill="#C05621" fontFamily="Inter, sans-serif">Ceiling</text>
      <text x={w - pad + 2} y={corridorBot + 4} fontSize="7" fill="#2F855A" fontFamily="Inter, sans-serif">Floor</text>

      {/* Price line */}
      <polyline points={points} stroke="#4FC3F7" strokeWidth="2" fill="none" />
      {data.map((d, i) => (
        <g key={d.label}>
          <circle cx={toX(i)} cy={toY(d.price)} r="3" fill="#4FC3F7" />
          <text x={toX(i)} y={h - 4} textAnchor="middle" fontSize="8" fill="rgba(245,245,243,0.45)" fontFamily="Inter, sans-serif">{d.label}</text>
          <text x={toX(i)} y={toY(d.price) - 7} textAnchor="middle" fontSize="7" fill="rgba(245,245,243,0.6)" fontFamily="Inter, sans-serif">₹{d.price}</text>
        </g>
      ))}

      {/* Simulated label */}
      <text x={pad} y={pad - 8} fontSize="8" fill="rgba(245,245,243,0.35)" fontFamily="Inter, sans-serif">Simulated — not real market data</text>
    </svg>
  );
}

export default function PSAMSimulator() {
  const [auctionPct, setAuctionPct] = useState(30);
  const [vintageWindow, setVintageWindow] = useState(3);
  const [corridorLow, setCorridorLow] = useState(2000);
  const [corridorHigh, setCorridorHigh] = useState(4000);

  const reset = () => { setAuctionPct(30); setVintageWindow(3); setCorridorLow(2000); setCorridorHigh(4000); };

  return (
    <div className="min-h-screen bg-[#0F1115] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-8">
        {/* Disclaimer */}
        <div className="bg-[#1A1C21] border border-[#2A2C31] rounded-xl px-6 py-4 mb-10">
          <div className="flex items-start gap-3">
            <span className="text-[#4FC3F7] text-lg mt-0.5 shrink-0">ℹ</span>
            <p className="text-sm text-[rgba(245,245,243,0.65)] leading-relaxed">{DISCLAIMER}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-[rgba(245,245,243,0.4)] font-semibold mb-1">PSAM Simulator</p>
            <h1 className="text-4xl font-bold text-[#F5F5F3]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Adjust the Mechanism</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={reset} className="px-5 py-2 rounded-full border border-[#2A2C31] text-sm text-[rgba(245,245,243,0.65)] hover:border-[#4FC3F7] hover:text-[#4FC3F7] transition-all">Reset</button>
            <Link to="/psam" className="px-5 py-2 rounded-full border border-[#2A2C31] text-sm text-[rgba(245,245,243,0.65)] hover:border-[#4FC3F7] hover:text-[#4FC3F7] transition-all">← Insights</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-5">
            <div className="bg-[#1A1C21] border border-[#2A2C31] rounded-2xl p-6">
              <h3 className="font-bold text-[#F5F5F3] mb-1 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Consignment Auction</h3>
              <p className="text-xs text-[rgba(245,245,243,0.4)] mb-4">% of credits sent to auction</p>
              <input type="range" min={0} max={100} step={5} value={auctionPct}
                onChange={e => setAuctionPct(Number(e.target.value))}
                className="w-full accent-[#4FC3F7]" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-[rgba(245,245,243,0.4)]">0%</span>
                <span className="text-lg font-bold text-[#4FC3F7]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{auctionPct}%</span>
                <span className="text-xs text-[rgba(245,245,243,0.4)]">100%</span>
              </div>
            </div>

            <div className="bg-[#1A1C21] border border-[#2A2C31] rounded-2xl p-6">
              <h3 className="font-bold text-[#F5F5F3] mb-1 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Vintage Eligibility Window</h3>
              <p className="text-xs text-[rgba(245,245,243,0.4)] mb-4">Years of credit eligibility</p>
              <input type="range" min={1} max={5} step={1} value={vintageWindow}
                onChange={e => setVintageWindow(Number(e.target.value))}
                className="w-full accent-[#4FC3F7]" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-[rgba(245,245,243,0.4)]">1 yr</span>
                <span className="text-lg font-bold text-[#4FC3F7]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{vintageWindow} yr</span>
                <span className="text-xs text-[rgba(245,245,243,0.4)]">5 yr</span>
              </div>
            </div>

            <div className="bg-[#1A1C21] border border-[#2A2C31] rounded-2xl p-6">
              <h3 className="font-bold text-[#F5F5F3] mb-1 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Price Corridor Bounds</h3>
              <p className="text-xs text-[rgba(245,245,243,0.4)] mb-4">Floor & ceiling in ₹/tonne</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-[#2F855A]">Floor</span>
                    <span className="text-sm font-bold text-[#2F855A]">₹{corridorLow.toLocaleString('en-IN')}</span>
                  </div>
                  <input type="range" min={500} max={corridorHigh - 500} step={100} value={corridorLow}
                    onChange={e => setCorridorLow(Number(e.target.value))}
                    className="w-full accent-[#2F855A]" />
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-[#C05621]">Ceiling</span>
                    <span className="text-sm font-bold text-[#C05621]">₹{corridorHigh.toLocaleString('en-IN')}</span>
                  </div>
                  <input type="range" min={corridorLow + 500} max={8000} step={100} value={corridorHigh}
                    onChange={e => setCorridorHigh(Number(e.target.value))}
                    className="w-full accent-[#C05621]" />
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2">
            <div className="bg-[#1A1C21] border border-[#2A2C31] rounded-2xl p-6 h-full">
              <h3 className="font-bold text-[#F5F5F3] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Simulated CCC Price Trajectory</h3>
              <p className="text-xs text-[rgba(245,245,243,0.4)] mb-6">6-quarter illustrative projection — adjust controls to see impact</p>
              <SimChart auctionPct={auctionPct} vintageWindow={vintageWindow} corridorLow={corridorLow} corridorHigh={corridorHigh} />
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-[#4FC3F7]" /><span className="text-xs text-[rgba(245,245,243,0.5)]">Simulated price</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-[#C05621]" style={{ borderTop: '1px dashed' }} /><span className="text-xs text-[rgba(245,245,243,0.5)]">Corridor ceiling</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-[#2F855A]" style={{ borderTop: '1px dashed' }} /><span className="text-xs text-[rgba(245,245,243,0.5)]">Corridor floor</span></div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { label: 'Auction %', val: `${auctionPct}%` },
                  { label: 'Vintage Window', val: `${vintageWindow} yr` },
                  { label: 'Corridor Width', val: `₹${(corridorHigh - corridorLow).toLocaleString('en-IN')}` },
                ].map(s => (
                  <div key={s.label} className="bg-[#0F1115] rounded-xl p-3 text-center">
                    <div className="text-xs text-[rgba(245,245,243,0.4)] mb-1">{s.label}</div>
                    <div className="text-base font-bold text-[#4FC3F7]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.val}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[rgba(245,245,243,0.25)] mt-4 leading-relaxed">
                All values are illustrative simulations based on a proposed policy design. No live CCC market data is used or implied. CCC pricing is separate from physical CO₂ commodity prices on this platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
