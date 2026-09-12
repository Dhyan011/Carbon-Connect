import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center text-center px-8">
      <div>
        <div className="text-8xl font-black text-[#2A2C31] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>404</div>
        <h1 className="text-2xl font-bold text-[#F5F5F3] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Page not found</h1>
        <p className="text-[rgba(245,245,243,0.5)] mb-8 text-sm">This route doesn't exist on the platform.</p>
        <Link to="/" className="px-8 py-3 rounded-full bg-[#4FC3F7] text-[#0F1115] font-semibold text-sm hover:bg-[#1E88C7] hover:text-white transition-all">← Back to Home</Link>
      </div>
    </div>
  );
}
