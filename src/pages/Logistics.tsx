export default function Logistics() {
  const steps = [
    { label: 'Batch Verified', detail: 'PESO SMPV(U) compliance confirmed', done: true },
    { label: 'Loading at Plant', detail: 'Pune Ethanol Ltd., Pune MH', done: true },
    { label: 'In Transit', detail: 'National Highway 48 — 148 km to Mumbai', done: false, active: true },
    { label: 'Quality Check', detail: 'FSSAI food-grade test at destination', done: false },
    { label: 'Delivered', detail: 'CryoTech Dry Ice, Navi Mumbai', done: false },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-1">Logistics Engine</p>
          <h1 className="text-3xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Shipment Tracking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map placeholder */}
          <div className="lg:col-span-2">
            <div className="relative bg-[#1A2535] rounded-3xl overflow-hidden aspect-video flex items-center justify-center">
              {/* Stylised map bg */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 800 450" className="w-full h-full" fill="none">
                  <rect width="800" height="450" fill="#1A2535" />
                  {/* Grid lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 25} x2="800" y2={i * 25} stroke="#2A3545" strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 32 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="450" stroke="#2A3545" strokeWidth="0.5" />
                  ))}
                </svg>
              </div>

              {/* Route dots and line */}
              <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full">
                {/* Route line */}
                <polyline points="280,320 350,280 420,240 500,200 580,180" stroke="#4FC3F7" strokeWidth="2.5" strokeDasharray="8,4" fill="none" />
                {/* Origin: Pune */}
                <circle cx="280" cy="320" r="8" fill="#4FC3F7" />
                <circle cx="280" cy="320" r="14" fill="#4FC3F7" fillOpacity="0.2" />
                {/* Current position */}
                <circle cx="420" cy="240" r="6" fill="#FAFAF8" stroke="#4FC3F7" strokeWidth="2" />
                <circle cx="420" cy="240" r="16" fill="#4FC3F7" fillOpacity="0.15" />
                {/* Destination: Mumbai */}
                <circle cx="580" cy="180" r="8" fill="#2F855A" />
                <circle cx="580" cy="180" r="14" fill="#2F855A" fillOpacity="0.2" />
              </svg>

              <div className="relative z-10 text-center">
                <p className="text-xs text-[rgba(245,245,243,0.5)] mb-2">Route: Pune → Navi Mumbai (NH-48)</p>
                <p className="text-[rgba(245,245,243,0.3)] text-xs">Live tracking map — illustrative route</p>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex gap-4">
                {[['#4FC3F7', 'Origin: Pune'], ['#FAFAF8', 'In Transit'], ['#2F855A', 'Destination']].map(([c, l]) => (
                  <div key={l} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    <span className="text-xs text-[rgba(245,245,243,0.6)]">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipment stepper */}
            <div className="mt-6 bg-white border border-[#E3E3DE] rounded-2xl p-6">
              <h3 className="font-bold text-[#14161A] mb-5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Shipment #SHP-2024-0048</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-[#E3E3DE]" />
                <div className="space-y-5">
                  {steps.map((s, i) => (
                    <div key={s.label} className="flex gap-4 relative pl-10">
                      <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10
                        ${s.done ? 'bg-[#2F855A] text-white' : s.active ? 'bg-[#4FC3F7] text-[#0F1115] ring-4 ring-[#4FC3F7]/20' : 'bg-white border-2 border-[#E3E3DE] text-[#6B7280]'}`}>
                        {s.done ? '✓' : i + 1}
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${s.active ? 'text-[#4FC3F7]' : s.done ? 'text-[#14161A]' : 'text-[#6B7280]'}`}>{s.label}</div>
                        <div className="text-xs text-[#6B7280]">{s.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cost & compliance sidebar */}
          <div className="space-y-5">
            <div className="bg-[#0F1115] rounded-2xl p-6">
              <h3 className="font-bold text-[#F5F5F3] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Cost Breakdown</h3>
              <div className="space-y-3">
                {[['Ex-plant (Pune)', '₹2,496/t'], ['SMPV(U) cryogenic transport', '₹480/t'], ['PESO documentation', '₹128/t'], ['Platform logistics fee', '₹96/t'], ['', ''], ['Delivered (Navi Mumbai)', '₹3,200/t']].map(([k, v], i) => (
                  k ? (
                    <div key={k} className={`flex justify-between text-sm ${i === 6 ? 'pt-2 border-t border-[#2A2C31]' : ''}`}>
                      <span className="text-[rgba(245,245,243,0.6)]">{k}</span>
                      <span className={`font-semibold ${i === 6 ? 'text-[#4FC3F7]' : 'text-[#F5F5F3]'}`}>{v}</span>
                    </div>
                  ) : <div key={i} className="h-px bg-[#2A2C31]" />
                ))}
              </div>
            </div>

            {/* Compliance badges */}
            <div className="bg-white border border-[#E3E3DE] rounded-2xl p-6">
              <h3 className="font-bold text-[#14161A] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Compliance Status</h3>
              <div className="space-y-3">
                {['PESO — SMPV(U) Rules, 2016', 'FSSAI Food-Grade CO₂ (IS 11673)', 'ADR Cryogenic Transport', 'Tank Inspection Certificate'].map(b => (
                  <div key={b} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#2F855A]/10 border border-[#2F855A]/25">
                    <span className="text-[#2F855A] text-sm">✓</span>
                    <span className="text-xs font-semibold text-[#2F855A]">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Registry note */}
            <div className="bg-[#FAFAF8] border border-[#E3E3DE] rounded-2xl p-5">
              <p className="text-xs text-[#6B7280] leading-relaxed">
                <span className="font-semibold text-[#14161A]">No central CO₂ shipment registry exists</span> for physical CO₂ transport in India — in contrast to the Grid India CCC Registry, which tracks Carbon Credit Certificates under the CCTS. PESO oversees transport safety; Carbon Connect maintains delivery records for both parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
