import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return val;
}

function StatCard({ value, suffix, label, sub }: { value: number; suffix: string; label: string; sub?: string; inView: boolean }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const count = useCountUp(value, inView);
  return (
    <div ref={ref} className="p-8 border border-[#2A2C31] rounded-2xl">
      <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-sm font-semibold text-[#4FC3F7] mb-2">{label}</div>
      {sub && <div className="text-xs text-[rgba(245,245,243,0.45)]">{sub}</div>}
    </div>
  );
}

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen bg-[#0F1115] flex items-center overflow-hidden pt-20">
        {/* Scattered photo shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top right circle */}
          <div className="absolute top-24 right-16 w-56 h-56 rounded-full overflow-hidden opacity-60"
            style={{ transform: 'translateY(-10px)' }}>
            <img src="https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&h=400&fit=crop&auto=format"
              alt="Cryogenic CO2 tanker" className="w-full h-full object-cover grayscale" />
          </div>
          {/* Mid-right rounded square */}
          <div className="absolute top-1/2 right-24 -translate-y-1/2 w-44 h-52 rounded-3xl overflow-hidden opacity-50">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=380&fit=crop&auto=format"
              alt="Industrial stacks" className="w-full h-full object-cover grayscale" />
          </div>
          {/* Bottom left circle */}
          <div className="absolute bottom-20 left-32 w-36 h-36 rounded-full overflow-hidden opacity-40">
            <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=300&fit=crop&auto=format"
              alt="Aerial industrial" className="w-full h-full object-cover grayscale" />
          </div>
          {/* Top left small circle */}
          <div className="absolute top-40 left-24 w-24 h-24 rounded-full overflow-hidden opacity-30">
            <img src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=200&h=200&fit=crop&auto=format"
              alt="Concrete texture" className="w-full h-full object-cover grayscale" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2A2C31] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#4FC3F7] animate-pulse" />
              <span className="text-xs text-[rgba(245,245,243,0.65)] font-medium">India's physical CO₂ commodity exchange</span>
            </div>
            <h1 className="text-6xl font-extrabold text-[#F5F5F3] mb-6 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Turn Captured Carbon Into a Tradeable Resource
            </h1>
            <p className="text-lg text-[rgba(245,245,243,0.65)] leading-relaxed mb-10 max-w-2xl">
              Carbon Connect links industries that capture CO₂ with industries that need it — with transparent pricing, verified quality, and PESO/FSSAI-compliant logistics.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/login?role=seller"
                className="px-8 py-3.5 rounded-full bg-[#4FC3F7] text-[#0F1115] font-semibold text-sm hover:bg-[#1E88C7] hover:text-white transition-all duration-250 hover:scale-105 hover:shadow-xl hover:shadow-[#4FC3F7]/20">
                I Capture CO₂
              </Link>
              <Link to="/login?role=buyer"
                className="px-8 py-3.5 rounded-full border-2 border-[#F5F5F3]/30 text-[#F5F5F3] font-semibold text-sm hover:border-[#F5F5F3] transition-all duration-250 hover:scale-105">
                I Need CO₂
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Missing Bridge */}
      <section className="bg-[#FAFAF8] py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-3">The Problem</p>
            <h2 className="text-4xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>The Missing Bridge</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: '01',
                title: 'Fragmented capture, invisible demand',
                body: 'India produces ~4.8 million tonnes of merchant CO₂ annually from ethanol distilleries, fertiliser plants, and steel mills — yet buyers struggle to locate verified surplus.',
              },
              {
                n: '02',
                title: 'No standardised quality framework',
                body: 'Without a unified platform enforcing FSSAI food-grade and industrial purity standards, buyers cannot compare batches with confidence across geographies.',
              },
              {
                n: '03',
                title: 'Logistics opacity raises cost',
                body: 'PESO-regulated cryogenic transport routes are opaque. Negotiating SMPV(U)-compliant logistics individually inflates landed cost by 15–30%.',
              },
            ].map(c => (
              <div key={c.n} className="bg-white border border-[#E3E3DE] rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="text-xs font-semibold text-[#4FC3F7] mb-4">{c.n}</div>
                <h3 className="text-xl font-bold text-[#14161A] mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{c.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-3">Process</p>
            <h2 className="text-4xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', name: 'List', desc: 'Sellers post verified CO₂ batches with purity certificates, PESO-compliant storage details, and grade classification.' },
              { step: '2', name: 'Match', desc: 'Our matching engine surfaces buyers by proximity, volume requirement, grade compatibility, and logistics feasibility.' },
              { step: '3', name: 'Price & Logistics', desc: 'Transparent price discovery via open bids. SMPV(U)-compliant transport routes costed in real time.' },
              { step: '4', name: 'Trade & Track', desc: 'Execute contracts on-platform. Track shipments end-to-end with automated FSSAI/PESO documentation.' },
            ].map((s, i) => (
              <div key={s.step} className="relative">
                {i < 3 && <div className="hidden md:block absolute top-8 left-full w-full h-px bg-[#E3E3DE] -translate-x-1/2 z-0" />}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-[#0F1115] flex items-center justify-center mb-5">
                    <span className="text-[#4FC3F7] font-bold text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#14161A] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.name}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Modules */}
      <section className="bg-[#FAFAF8] py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-3">Capabilities</p>
            <h2 className="text-4xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Platform Modules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'Marketplace', icon: '⚡', desc: 'Verified listings with grade, purity, and location. Filterable, sortable, bid-enabled.', link: '/marketplace' },
              { name: 'Logistics Engine', icon: '🚛', desc: 'SMPV(U)-compliant route planning, cost breakdowns, and cryogenic transport tracking.', link: '/logistics' },
              { name: 'Bidding & Pricing', icon: '📈', desc: 'Open-book price discovery with live bid panels and transparent market data.', link: '/marketplace' },
              { name: 'Analytics', icon: '📊', desc: 'Sankey flows, supply–demand charts, regional maps, and benchmarking panels.', link: '/analytics' },
            ].map(m => (
              <Link key={m.name} to={m.link}
                className="group bg-white border border-[#E3E3DE] rounded-2xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#4FC3F7]/40">
                <div className="text-3xl mb-4">{m.icon}</div>
                <h3 className="text-lg font-bold text-[#14161A] mb-2 group-hover:text-[#4FC3F7] transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{m.name}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0F1115] py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-widest text-[rgba(245,245,243,0.4)] font-semibold mb-3">Platform Activity</p>
            <h2 className="text-4xl font-bold text-[#F5F5F3]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Illustrative Market Data</h2>
            <p className="text-sm text-[rgba(245,245,243,0.45)] mt-2">Sample figures for demonstration. Not live market data.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <StatCard value={4800000} suffix="t" label="Annual Market Volume" sub="India merchant CO₂ — illustrative" inView={false} />
            <StatCard value={312} suffix="" label="Active Listings" sub="Across 18 states — sample data" inView={false} />
            <StatCard value={2840} suffix="₹/t" label="Avg. Delivered Price" sub="Industrial grade, Maharashtra — indicative. Not a CCTS price." inView={false} />
            <StatCard value={94} suffix="%" label="Logistics On-Time" sub="PESO-compliant routes — illustrative" inView={false} />
          </div>
        </div>
      </section>

      {/* Who Trades Here */}
      <section className="bg-[#FAFAF8] py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-3">Participants</p>
            <h2 className="text-4xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Who Trades Here</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E3E3DE] rounded-2xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0F1115] flex items-center justify-center">
                  <span className="text-[#4FC3F7] text-sm font-bold">S</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sellers — CO₂ Capturers</h3>
              </div>
              <ul className="space-y-3">
                {['Ethanol distilleries (fermentation off-gas)', 'Fertiliser & ammonia plants', 'Steel and DRI manufacturers', 'Biogas upgrading facilities', 'Cement kilns with capture units', 'Natural CO₂ wells and geological sources'].map(i => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#6B7280]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] mt-2 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0F1115] rounded-2xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#2A2C31] flex items-center justify-center">
                  <span className="text-[#4FC3F7] text-sm font-bold">B</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F5F5F3]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Buyers — CO₂ Consumers</h3>
              </div>
              <ul className="space-y-3">
                {['Beverage carbonation (FSSAI food-grade)', 'Dry ice manufacturers', 'Fire suppression system suppliers', 'Greenhouse horticulture operators', 'Welding & metal fabrication industries', 'Enhanced oil recovery (EOR) operators'].map(i => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[rgba(245,245,243,0.65)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7] mt-2 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Two Markets */}
      <section className="bg-[#0F1115] py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[rgba(245,245,243,0.4)] font-semibold mb-3">Platform Architecture</p>
            <h2 className="text-4xl font-bold text-[#F5F5F3] mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Two Markets, One Platform</h2>
            <p className="text-[rgba(245,245,243,0.65)] leading-relaxed">
              Carbon Connect hosts two completely separate, non-overlapping instruments: a physical CO₂ commodity marketplace regulated by PESO and FSSAI, and a PSAM/CCC policy-intelligence module that explains and simulates India's proposed Carbon Credit Trading Scheme mechanisms — for educational purposes only, never as a live trading surface.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <Link to="/marketplace"
              className="group px-10 py-5 rounded-full bg-[#4FC3F7] text-[#0F1115] font-semibold text-sm hover:bg-[#1E88C7] hover:text-white transition-all duration-250 hover:scale-105 hover:shadow-xl hover:shadow-[#4FC3F7]/30 text-center">
              Explore the Marketplace →
            </Link>
            <Link to="/psam"
              className="group px-10 py-5 rounded-full border-2 border-[#F5F5F3]/30 text-[#F5F5F3] font-semibold text-sm hover:border-[#4FC3F7] hover:text-[#4FC3F7] transition-all duration-250 hover:scale-105 text-center">
              Explore PSAM Insights →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
