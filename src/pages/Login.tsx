import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function Login() {
  const [params] = useSearchParams();
  const [role, setRole] = useState<'seller' | 'buyer'>(params.get('role') === 'buyer' ? 'buyer' : 'seller');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === 'seller' ? '/seller' : '/buyer');
  };

  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>carbon</span>
            <span className="flex items-center gap-0.5">
              <span className="w-5 h-5 rounded-full border-2 border-[#4FC3F7]" />
              <span className="w-5 h-5 rounded-full bg-[#4FC3F7]" />
            </span>
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>connect</span>
          </div>
          <h1 className="text-3xl font-bold text-[#F5F5F3] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Select your role</h1>
          <p className="text-sm text-[rgba(245,245,243,0.55)]">Choose how you participate in the marketplace</p>
        </div>

        {/* Role tiles */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {(['seller', 'buyer'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                role === r
                  ? 'border-[#4FC3F7] bg-[#4FC3F7]/10'
                  : 'border-[#2A2C31] bg-transparent hover:border-[#4FC3F7]/40'
              }`}
            >
              <div className="text-2xl mb-3">{r === 'seller' ? '🏭' : '🏢'}</div>
              <div className="font-bold text-[#F5F5F3] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {r === 'seller' ? 'Seller Industry' : 'Buyer Industry'}
              </div>
              <div className="text-xs text-[rgba(245,245,243,0.5)]">
                {r === 'seller' ? 'I capture or produce CO₂' : 'I require CO₂ for operations'}
              </div>
            </button>
          ))}
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Business email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl bg-[#1A1C21] border border-[#2A2C31] text-[#F5F5F3] placeholder-[rgba(245,245,243,0.3)] text-sm focus:outline-none focus:border-[#4FC3F7] transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl bg-[#1A1C21] border border-[#2A2C31] text-[#F5F5F3] placeholder-[rgba(245,245,243,0.3)] text-sm focus:outline-none focus:border-[#4FC3F7] transition-colors"
          />
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#4FC3F7] text-[#0F1115] font-semibold text-sm hover:bg-[#1E88C7] hover:text-white transition-all duration-250 hover:scale-101 mt-2"
          >
            Sign In as {role === 'seller' ? 'Seller' : 'Buyer'}
          </button>
        </form>

        {/* Compliance note */}
        <p className="mt-8 text-xs text-[rgba(245,245,243,0.35)] text-center leading-relaxed px-4">
          By signing in you confirm that your entity is engaged in the physical CO₂ commodity trade and agree to maintain PESO/FSSAI compliance documentation. This platform does not support Carbon Credit Certificate (CCC) trading under the CCTS.
        </p>
      </div>
    </div>
  );
}
