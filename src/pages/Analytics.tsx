import { useState } from 'react';
import { Link } from 'react-router';

// Simple bar chart for supply vs demand
function BarChart() {
  const data = [
    { month: 'Apr', supply: 380, demand: 320 },
    { month: 'May', supply: 410, demand: 390 },
    { month: 'Jun', supply: 350, demand: 420 },
    { month: 'Jul', supply: 440, demand: 400 },
    { month: 'Aug', supply: 390, demand: 450 },
    { month: 'Sep', supply: 470, demand: 430 },
  ];
  const max = 500;

  return (
    <div className="flex items-end gap-3 h-40">
      {data.map(d => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex gap-0.5">
            <div className="flex-1 rounded-sm bg-[#4FC3F7] transition-all" style={{ height: `${(d.supply / max) * 140}px` }} />
            <div className="flex-1 rounded-sm bg-[#2F855A] transition-all" style={{ height: `${(d.demand / max) * 140}px` }} />
          </div>
          <span className="text-xs text-[#6B7280]">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

// Simple sankey-style flow diagram as SVG
function SankeyDiagram() {
  return (
    <svg viewBox="0 0 520 240" className="w-full" fill="none">
      {/* Sources column */}
      {[
        { y: 20, h: 60, label: 'Ethanol Distilleries', val: '2.1Mt', color: '#4FC3F7' },
        { y: 90, h: 40, label: 'Fertiliser Plants', val: '1.2Mt', color: '#4FC3F7' },
        { y: 140, h: 30, label: 'Steel / DRI', val: '0.8Mt', color: '#4FC3F7' },
        { y: 180, h: 20, label: 'Biogas / Other', val: '0.7Mt', color: '#4FC3F7' },
      ].map(s => (
        <g key={s.label}>
          <rect x="0" y={s.y} width="24" height={s.h} rx="4" fill={s.color} fillOpacity="0.8" />
          <text x="30" y={s.y + s.h / 2 + 4} fontSize="9" fill="#14161A" fontFamily="Inter, sans-serif">{s.label}</text>
          <text x="30" y={s.y + s.h / 2 + 14} fontSize="8" fill="#6B7280" fontFamily="Inter, sans-serif">{s.val}</text>
        </g>
      ))}

      {/* Flows to center */}
      {[
        { sy: 50, ty: 80, color: '#4FC3F7' },
        { sy: 110, ty: 100, color: '#4FC3F7' },
        { sy: 155, ty: 120, color: '#4FC3F7' },
        { sy: 190, ty: 135, color: '#4FC3F7' },
      ].map((f, i) => (
        <path key={i} d={`M 24 ${f.sy} C 130 ${f.sy} 130 ${f.ty} 240 ${f.ty}`}
          stroke={f.color} strokeWidth="3" strokeOpacity="0.3" />
      ))}

      {/* Center node */}
      <rect x="240" y="60" width="40" height="110" rx="6" fill="#0F1115" />
      <text x="260" y="122" fontSize="8" fill="#4FC3F7" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">4.8Mt</text>

      {/* Flows to destinations */}
      {[
        { sy: 80, ty: 30, color: '#2F855A' },
        { sy: 95, ty: 80, color: '#2F855A' },
        { sy: 110, ty: 130, color: '#2F855A' },
        { sy: 130, ty: 175, color: '#2F855A' },
      ].map((f, i) => (
        <path key={i} d={`M 280 ${f.sy} C 380 ${f.sy} 380 ${f.ty} 490 ${f.ty}`}
          stroke={f.color} strokeWidth="3" strokeOpacity="0.3" />
      ))}

      {/* Destinations */}
      {[
        { y: 10, h: 45, label: 'Beverage Carbonation', val: '1.4Mt' },
        { y: 65, h: 30, label: 'Dry Ice Manufacturing', val: '0.9Mt' },
        { y: 105, h: 55, label: 'Industrial / Welding', val: '1.6Mt' },
        { y: 170, h: 35, label: 'EOR / Greenhouses', val: '0.9Mt' },
      ].map(d => (
        <g key={d.label}>
          <rect x="492" y={d.y} width="24" height={d.h} rx="4" fill="#2F855A" fillOpacity="0.8" />
          <text x="480" y={d.y + d.h / 2 + 4} fontSize="9" fill="#14161A" textAnchor="end" fontFamily="Inter, sans-serif">{d.label}</text>
          <text x="480" y={d.y + d.h / 2 + 14} fontSize="8" fill="#6B7280" textAnchor="end" fontFamily="Inter, sans-serif">{d.val}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Analytics() {
  const [tab, setTab] = useState<'physical' | 'psam'>('physical');

  if (tab === 'psam') {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B7280] mb-4">Switching to PSAM Insights module…</p>
          <a href="/psam" className="px-6 py-3 rounded-full bg-[#0F1115] text-white text-sm font-semibold hover:bg-[#4FC3F7] hover:text-[#0F1115] transition-all">Go to PSAM Insights →</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-1">Analytics</p>
            <h1 className="text-3xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Physical CO₂ Market Intelligence</h1>
          </div>
          {/* Tab switcher */}
          <div className="flex rounded-full border border-[#E3E3DE] bg-white overflow-hidden">
            <button onClick={() => setTab('physical')}
              className={`px-5 py-2 text-sm font-semibold transition-all ${tab === 'physical' ? 'bg-[#0F1115] text-white' : 'text-[#6B7280] hover:text-[#14161A]'}`}>
              Physical CO₂ Analytics
            </button>
            <button onClick={() => setTab('psam')}
              className={`px-5 py-2 text-sm font-semibold transition-all ${tab === 'psam' ? 'bg-[#0F1115] text-white' : 'text-[#6B7280] hover:text-[#14161A]'}`}>
              PSAM Insights
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sankey */}
          <div className="lg:col-span-2 bg-white border border-[#E3E3DE] rounded-2xl p-6">
            <h3 className="font-bold text-[#14161A] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>CO₂ Flow by Sector (Illustrative, MT/year)</h3>
            <p className="text-xs text-[#6B7280] mb-5">India merchant CO₂ market — sample allocation, not live data</p>
            <SankeyDiagram />
            <div className="flex gap-5 mt-4">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#4FC3F7]" /><span className="text-xs text-[#6B7280]">Supply sources</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#2F855A]" /><span className="text-xs text-[#6B7280]">Demand sinks</span></div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="space-y-4">
            <div className="bg-[#0F1115] rounded-2xl p-6">
              <div className="text-xs text-[rgba(245,245,243,0.5)] mb-1">Dispute Rate</div>
              <div className="text-3xl font-bold text-[#4FC3F7]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>1.4%</div>
              <div className="text-xs text-[rgba(245,245,243,0.4)] mt-1">Of transactions, YTD — illustrative</div>
            </div>
            <div className="bg-white border border-[#E3E3DE] rounded-2xl p-6">
              <div className="text-xs text-[#6B7280] mb-1">Seasonal Supply Index</div>
              <div className="text-3xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>0.84</div>
              <div className="text-xs text-[#C05621] mt-1">⚠ Below 1.0 — monsoon supply risk</div>
            </div>
            <div className="bg-white border border-[#E3E3DE] rounded-2xl p-6">
              <div className="text-xs text-[#6B7280] mb-1">Capture Cost Benchmark</div>
              <div className="text-2xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>₹800–1,400/t</div>
              <div className="text-xs text-[#6B7280] mt-1">Ex-plant, distillery-sourced — indicative</div>
            </div>
          </div>

          {/* Supply vs Demand chart */}
          <div className="lg:col-span-2 bg-white border border-[#E3E3DE] rounded-2xl p-6">
            <h3 className="font-bold text-[#14161A] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Supply vs Demand (MT, Apr–Sep 2026)</h3>
            <p className="text-xs text-[#6B7280] mb-5">Illustrative platform data — not real market volumes</p>
            <BarChart />
            <div className="flex gap-5 mt-4">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#4FC3F7]" /><span className="text-xs text-[#6B7280]">Supply (MT)</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#2F855A]" /><span className="text-xs text-[#6B7280]">Demand (MT)</span></div>
            </div>
          </div>

          {/* Benchmarks panel */}
          <div className="bg-[#0F1115] rounded-2xl p-6">
            <h3 className="font-bold text-[#F5F5F3] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Supply Reliability & Cost Benchmarks</h3>
            <div className="space-y-4">
              {[
                { label: 'Food-grade, MH avg.', range: '₹2,900–3,400/t', note: 'Delivered' },
                { label: 'Industrial, GJ avg.', range: '₹2,200–2,700/t', note: 'Delivered' },
                { label: 'EOR-grade, OD avg.', range: '₹1,600–2,100/t', note: 'Ex-plant' },
              ].map(b => (
                <div key={b.label} className="border-b border-[#2A2C31] pb-3 last:border-0">
                  <div className="text-xs text-[rgba(245,245,243,0.55)] mb-0.5">{b.label}</div>
                  <div className="text-base font-bold text-[#4FC3F7]">{b.range}</div>
                  <div className="text-xs text-[rgba(245,245,243,0.35)]">{b.note}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[rgba(245,245,243,0.3)] mt-4 leading-relaxed">
              These are market benchmarks for physical CO₂ commodity — not Carbon Credit Certificate prices under any CCTS mechanism.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
