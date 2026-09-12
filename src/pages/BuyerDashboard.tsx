import { useState } from 'react';
import { Link } from 'react-router';

const listings = [
  { id: 'BTH-2024-010', grade: 'Food-Grade', purity: '99.9%', seller: 'Pune Ethanol Ltd.', dist: '12 km', delivPrice: '₹3,380/t', commercial: 94, climate: 88 },
  { id: 'BTH-2024-015', grade: 'Food-Grade', purity: '99.8%', seller: 'Maharashtra Biogas', dist: '67 km', delivPrice: '₹3,210/t', commercial: 82, climate: 96 },
  { id: 'BTH-2024-022', grade: 'Industrial', purity: '99.5%', seller: 'Surat CO₂ Plant', dist: '320 km', delivPrice: '₹2,850/t', commercial: 75, climate: 70 },
  { id: 'BTH-2024-031', grade: 'Food-Grade', purity: '99.7%', seller: 'Nashik Distillery', dist: '89 km', delivPrice: '₹3,240/t', commercial: 88, climate: 91 },
];

export default function BuyerDashboard() {
  const [filter, setFilter] = useState('All');

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-1">Buyer Dashboard</p>
            <h1 className="text-3xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Welcome back, Pepsi Bottling MH</h1>
          </div>
          <Link to="/marketplace"
            className="px-6 py-3 rounded-full bg-[#4FC3F7] text-[#0F1115] font-semibold text-sm hover:bg-[#1E88C7] hover:text-white transition-all duration-250 hover:scale-105">
            + Post Requirement
          </Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: 'Active Requirements', value: '3' },
            { label: 'Volume Sourced (YTD)', value: '480 MT' },
            { label: 'Avg. Delivered Cost', value: '₹3,290/t' },
            { label: 'Quotes Received', value: '17' },
            { label: 'Orders in Transit', value: '2' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-[#E3E3DE] rounded-xl p-5">
              <div className="text-xl font-bold text-[#14161A] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{k.value}</div>
              <div className="text-xs text-[#6B7280]">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['All', 'Food-Grade', 'Industrial', 'EOR-Grade'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filter === f ? 'bg-[#0F1115] text-white border-[#0F1115]' : 'bg-white text-[#6B7280] border-[#E3E3DE] hover:border-[#14161A]'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Listing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {listings.filter(l => filter === 'All' || l.grade === filter).map(l => (
            <div key={l.id} className="bg-white border border-[#E3E3DE] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-mono text-[#6B7280] mb-1">{l.id}</div>
                  <div className="font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{l.seller}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2F855A]/15 text-[#2F855A] text-xs font-semibold border border-[#2F855A]/30">{l.grade}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <div className="text-xs text-[#6B7280] mb-0.5">Purity</div>
                  <div className="text-sm font-semibold text-[#14161A]">{l.purity}</div>
                </div>
                <div>
                  <div className="text-xs text-[#6B7280] mb-0.5">Distance</div>
                  <div className="text-sm font-semibold text-[#14161A]">{l.dist}</div>
                </div>
                <div>
                  <div className="text-xs text-[#6B7280] mb-0.5">Delivered</div>
                  <div className="text-sm font-semibold text-[#4FC3F7]">{l.delivPrice}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#6B7280]">Commercial Score</span>
                  <span className="px-2 py-0.5 rounded bg-[#4FC3F7]/15 text-[#1E88C7] text-xs font-bold">{l.commercial}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#6B7280]">Climate Score</span>
                  <span className="px-2 py-0.5 rounded bg-[#2F855A]/15 text-[#2F855A] text-xs font-bold">{l.climate}</span>
                </div>
              </div>
              <Link to="/marketplace"
                className="block text-center py-2.5 rounded-full bg-[#0F1115] text-white text-sm font-semibold hover:bg-[#4FC3F7] hover:text-[#0F1115] transition-all duration-250">
                Request Quote
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
