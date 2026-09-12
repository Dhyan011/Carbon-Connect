import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-[#0F1115] text-[#F5F5F3] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2A2C31]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-bold text-base" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>carbon</span>
              <span className="flex items-center gap-0.5">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#4FC3F7]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#4FC3F7]" />
              </span>
              <span className="text-white font-bold text-base" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>connect</span>
            </div>
            <p className="text-sm text-[rgba(245,245,243,0.65)] leading-relaxed">
              India's physical CO₂ commodity marketplace — linking capture industries with demand industries.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[rgba(245,245,243,0.4)] mb-4 font-semibold">Platform</h4>
            <ul className="space-y-3">
              {[['/', 'home'], ['/marketplace', 'marketplace'], ['/logistics', 'logistics'], ['/analytics', 'analytics']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-[rgba(245,245,243,0.65)] hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[rgba(245,245,243,0.4)] mb-4 font-semibold">Policy Intelligence</h4>
            <ul className="space-y-3">
              {[['/psam', 'psam insights'], ['/psam/simulator', 'psam simulator'], ['/login', 'sign in']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-[rgba(245,245,243,0.65)] hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[rgba(245,245,243,0.4)] mb-4 font-semibold">Compliance</h4>
            <ul className="space-y-3 text-sm text-[rgba(245,245,243,0.65)]">
              <li>PESO — SMPV(U) Rules, 2016</li>
              <li>FSSAI Food-Grade CO₂</li>
              <li>BEE / CERC CCTS Framework</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col gap-4">
          <p className="text-xs text-[rgba(245,245,243,0.4)] leading-relaxed max-w-3xl">
            Carbon Connect is a physical CO₂ commodity trading platform regulated under PESO (SMPV(U) Rules, 2016) for transport/storage and FSSAI for food-grade quality. Market pricing reflects India's merchant CO₂ market (~4.8 million tonnes/year) and is driven by supply and demand. This platform does not trade Carbon Credit Certificates (CCCs) or any instrument under India's Carbon Credit Trading Scheme (CCTS).
          </p>
          <div className="w-full h-px bg-[#2A2C31]" />
          <p className="text-xs text-[rgba(245,245,243,0.4)] leading-relaxed max-w-3xl">
            PSAM Insights is an educational simulator based on a proposed policy report. It is not an official CERC/BEE system and carries no live CCC pricing data.
          </p>
          <p className="text-xs text-[rgba(245,245,243,0.3)] mt-2">© 2026 Carbon Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
