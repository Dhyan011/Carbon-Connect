import { useState } from 'react';

const listings = [
  { id: 'BTH-2024-001', qty: '120 MT', grade: 'Food-Grade', purity: '99.9%', location: 'Pune, MH', price: 3200, seller: 'Pune Ethanol Ltd.', avail: 'Sep 20' },
  { id: 'BTH-2024-002', qty: '85 MT', grade: 'Industrial', purity: '99.5%', location: 'Surat, GJ', price: 2600, seller: 'Surat CO₂ Plant', avail: 'Sep 18' },
  { id: 'BTH-2024-004', qty: '50 MT', grade: 'Food-Grade', purity: '99.8%', location: 'Nashik, MH', price: 3100, seller: 'Nashik Distillery', avail: 'Sep 25' },
  { id: 'BTH-2024-005', qty: '300 MT', grade: 'EOR-Grade', purity: '98.0%', location: 'Angul, OD', price: 1950, seller: 'SAIL Capture Unit', avail: 'Oct 01' },
  { id: 'BTH-2024-006', qty: '75 MT', grade: 'Industrial', purity: '99.3%', location: 'Raipur, CG', price: 2450, seller: 'Bhilai Gas Co.', avail: 'Sep 22' },
  { id: 'BTH-2024-007', qty: '40 MT', grade: 'Food-Grade', purity: '99.9%', location: 'Navi Mumbai, MH', price: 3350, seller: 'Biogas MH', avail: 'Sep 19' },
];

export default function Marketplace() {
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [selected, setSelected] = useState<typeof listings[0] | null>(null);
  const [bid, setBid] = useState('');

  const filtered = listings.filter(l =>
    (selectedGrades.length === 0 || selectedGrades.includes(l.grade)) &&
    l.price <= maxPrice
  );

  const toggleGrade = (g: string) =>
    setSelectedGrades(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-1">Physical CO₂ Marketplace</p>
          <h1 className="text-3xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Browse Verified Listings</h1>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className="w-56 shrink-0">
            <div className="bg-white border border-[#E3E3DE] rounded-2xl p-5 sticky top-24">
              <h3 className="font-bold text-[#14161A] mb-5 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Filters</h3>

              <div className="mb-5">
                <div className="text-xs uppercase tracking-wide text-[#6B7280] font-semibold mb-3">Grade</div>
                {['Food-Grade', 'Industrial', 'EOR-Grade'].map(g => (
                  <label key={g} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <div
                      onClick={() => toggleGrade(g)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${selectedGrades.includes(g) ? 'bg-[#4FC3F7] border-[#4FC3F7]' : 'border-[#E3E3DE] group-hover:border-[#4FC3F7]'}`}>
                      {selectedGrades.includes(g) && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className="text-sm text-[#14161A]">{g}</span>
                  </label>
                ))}
              </div>

              <div className="mb-5">
                <div className="text-xs uppercase tracking-wide text-[#6B7280] font-semibold mb-3">Max Price (₹/t)</div>
                <input type="range" min={1500} max={4000} step={50} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#4FC3F7]" />
                <div className="text-sm font-semibold text-[#14161A] mt-1">₹{maxPrice.toLocaleString('en-IN')}/t</div>
              </div>

              <button onClick={() => { setSelectedGrades([]); setMaxPrice(4000); }}
                className="w-full py-2 rounded-lg border border-[#E3E3DE] text-xs text-[#6B7280] hover:border-[#14161A] hover:text-[#14161A] transition-colors">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Listing grid */}
          <div className="flex-1">
            <div className="text-sm text-[#6B7280] mb-4">{filtered.length} listings</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(l => (
                <div key={l.id}
                  onClick={() => setSelected(l)}
                  className="bg-white border border-[#E3E3DE] rounded-2xl p-5 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 hover:border-[#4FC3F7]/40">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-xs font-mono text-[#6B7280]">{l.id}</div>
                      <div className="font-bold text-[#14161A] text-sm mt-0.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{l.seller}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${l.grade === 'Food-Grade' ? 'bg-[#2F855A]/15 text-[#2F855A] border border-[#2F855A]/30' : l.grade === 'Industrial' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-[#C05621] border border-amber-200'}`}>
                      {l.grade}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[['Volume', l.qty], ['Purity', l.purity], ['Location', l.location], ['Available', l.avail]].map(([k, v]) => (
                      <div key={k}>
                        <div className="text-xs text-[#6B7280]">{k}</div>
                        <div className="text-sm font-semibold text-[#14161A]">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-[#4FC3F7]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>₹{l.price.toLocaleString('en-IN')}/t</div>
                    <button className="px-4 py-1.5 rounded-full bg-[#0F1115] text-white text-xs font-semibold hover:bg-[#4FC3F7] hover:text-[#0F1115] transition-all">
                      Bid / Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs font-mono text-[#6B7280] mb-1">{selected.id}</div>
                <h2 className="text-xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{selected.seller}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-[#FAFAF8] flex items-center justify-center text-[#6B7280] hover:bg-[#E3E3DE] transition-colors">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[['Grade', selected.grade], ['Purity', selected.purity], ['Volume', selected.qty], ['Location', selected.location], ['Available', selected.avail]].map(([k, v]) => (
                <div key={k} className="bg-[#FAFAF8] rounded-xl p-3">
                  <div className="text-xs text-[#6B7280] mb-1">{k}</div>
                  <div className="text-sm font-semibold text-[#14161A]">{v}</div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">Price Breakdown (₹/t)</div>
              <div className="space-y-2">
                {[['Ex-plant price', selected.price * 0.78], ['Logistics & handling', selected.price * 0.15], ['PESO compliance', selected.price * 0.04], ['Platform fee', selected.price * 0.03]].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">{label as string}</span>
                    <span className="font-semibold text-[#14161A]">₹{Math.round(val as number).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="h-px bg-[#E3E3DE] my-2" />
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-[#14161A]">Delivered Total</span>
                  <span className="font-bold text-[#4FC3F7]">₹{selected.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Bid panel */}
            <div className="bg-[#0F1115] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[rgba(245,245,243,0.65)]">Current Best Bid</span>
                <span className="text-lg font-bold text-[#4FC3F7]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>₹{(selected.price - 80).toLocaleString('en-IN')}/t</span>
              </div>
              <div className="flex gap-2">
                <input value={bid} onChange={e => setBid(e.target.value)} placeholder="Your bid (₹/t)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#1A1C21] border border-[#2A2C31] text-white text-sm placeholder-[rgba(245,245,243,0.3)] focus:outline-none focus:border-[#4FC3F7] transition-colors" />
                <button className="px-5 py-2.5 rounded-xl bg-[#4FC3F7] text-[#0F1115] font-semibold text-sm hover:bg-[#1E88C7] hover:text-white transition-all">
                  Place Bid
                </button>
              </div>
              <p className="text-xs text-[rgba(245,245,243,0.35)] mt-3">
                This is a physical CO₂ commodity bid. No Carbon Credit Certificates (CCCs) are traded here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
