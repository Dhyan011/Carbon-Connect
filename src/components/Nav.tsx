import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: scrolled ? '64px' : '80px',
        background: scrolled ? 'rgba(15,17,21,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Left links */}
        <div className="flex gap-8">
          <Link to="/marketplace" className="text-sm font-medium text-white/70 hover:text-white transition-colors">marketplace</Link>
          <Link to="/logistics" className="text-sm font-medium text-white/70 hover:text-white transition-colors">logistics</Link>
        </div>

        {/* Center logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <span className="font-display text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>carbon</span>
          <span className="flex items-center gap-0.5">
            <span className="w-4 h-4 rounded-full border-2 border-[#4FC3F7]" />
            <span className="w-4 h-4 rounded-full bg-[#4FC3F7]" />
          </span>
          <span className="font-display text-white font-bold text-lg tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>connect</span>
        </Link>

        {/* Right nav */}
        <div className="flex items-center gap-3">
          <Link to="/analytics" className="text-sm font-medium text-white/70 hover:text-white transition-colors">analytics</Link>
          <Link to="/psam" className="text-sm font-medium text-white/70 hover:text-white transition-colors">psam insights</Link>
          <Link to="/login" className="ml-3 px-5 py-2 rounded-full bg-[#4FC3F7] text-[#0F1115] text-sm font-semibold hover:bg-[#1E88C7] hover:text-white transition-all duration-250 hover:scale-102 hover:shadow-lg">
            sign in
          </Link>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="w-9 h-9 rounded-full border border-white/20 flex flex-col items-center justify-center gap-1.5 hover:border-white/50 transition-colors ml-1"
            aria-label="Menu"
          >
            <span className="w-4 h-px bg-white/80" />
            <span className="w-4 h-px bg-white/80" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0F1115] border-t border-white/10 px-8 py-6 flex flex-col gap-4">
          {[
            ['/', 'home'], ['/marketplace', 'marketplace'], ['/logistics', 'logistics'],
            ['/analytics', 'analytics'], ['/psam', 'psam insights'], ['/psam/simulator', 'psam simulator'],
          ].map(([path, label]) => (
            <Link key={path} to={path} className="text-white/70 hover:text-white text-sm font-medium transition-colors">{label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
