import { Link } from 'react-router';

const listings = [
  { id: 'BTH-2024-001', qty: '120 MT', grade: 'Food-Grade', purity: '99.9%', location: 'Pune, MH', status: 'Active', interest: 4, price: '₹3,200/t' },
  { id: 'BTH-2024-002', qty: '85 MT', grade: 'Industrial', purity: '99.5%', location: 'Surat, GJ', status: 'Pending', interest: 2, price: '₹2,600/t' },
  { id: 'BTH-2024-003', qty: '200 MT', grade: 'EOR-Grade', purity: '98.0%', location: 'Angul, OD', status: 'Sold', interest: 0, price: '₹1,950/t' },
  { id: 'BTH-2024-004', qty: '50 MT', grade: 'Food-Grade', purity: '99.8%', location: 'Nashik, MH', status: 'Active', interest: 7, price: '₹3,100/t' },
];

const statusColor = { Active: 'bg-[#2F855A]/20 text-[#2F855A]', Pending: 'bg-amber-100 text-[#C05621]', Sold: 'bg-gray-100 text-gray-500' } as const;

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-1">Seller Dashboard</p>
            <h1 className="text-3xl font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Welcome back, Pune Ethanol Ltd.</h1>
            <div className="flex gap-2 mt-3">
              <span className="px-3 py-1 rounded-full bg-[#2F855A]/15 text-[#2F855A] text-xs font-semibold border border-[#2F855A]/30">✓ PESO Verified</span>
              <span className="px-3 py-1 rounded-full bg-[#2F855A]/15 text-[#2F855A] text-xs font-semibold border border-[#2F855A]/30">✓ FSSAI Certified</span>
            </div>
          </div>
          <Link to="/marketplace"
            className="px-6 py-3 rounded-full bg-[#4FC3F7] text-[#0F1115] font-semibold text-sm hover:bg-[#1E88C7] hover:text-white transition-all duration-250 hover:scale-105">
            + Create Listing
          </Link>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: 'Active Listings', value: '4' },
            { label: 'Total Volume Listed', value: '455 MT' },
            { label: 'Sold This Month', value: '200 MT' },
            { label: 'Avg. Price Achieved', value: '₹2,963/t' },
            { label: 'Buyer Inquiries', value: '13' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-[#E3E3DE] rounded-xl p-5">
              <div className="text-xl font-bold text-[#14161A] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{k.value}</div>
              <div className="text-xs text-[#6B7280]">{k.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listings table */}
          <div className="lg:col-span-2 bg-white border border-[#E3E3DE] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E3E3DE] flex items-center justify-between">
              <h2 className="font-bold text-[#14161A]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Your Listings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E3E3DE]">
                    {['Batch ID', 'Qty', 'Grade', 'Purity', 'Location', 'Status', 'Interest', 'Price'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l, i) => (
                    <tr key={l.id} className={`border-b border-[#E3E3DE]/60 hover:bg-[#FAFAF8] transition-colors ${i === listings.length - 1 ? 'border-0' : ''}`}>
                      <td className="px-4 py-3 text-xs font-mono text-[#14161A]">{l.id}</td>
                      <td className="px-4 py-3 text-xs text-[#14161A]">{l.qty}</td>
                      <td className="px-4 py-3 text-xs text-[#14161A]">{l.grade}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-[#14161A]">{l.purity}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">{l.location}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[l.status as keyof typeof statusColor]}`}>{l.status}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">{l.interest} buyers</td>
                      <td className="px-4 py-3 text-xs font-semibold text-[#14161A]">{l.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-[#E3E3DE] rounded-2xl p-6">
              <h3 className="font-bold text-[#14161A] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Market Demand Near You</h3>
              <div className="space-y-3">
                {[
                  { buyer: 'Pepsi Bottling, Pune', need: '80 MT food-grade', dist: '12 km' },
                  { buyer: 'CryoTech Dry Ice, Mumbai', need: '40 MT food-grade', dist: '148 km' },
                  { buyer: 'Bharat Steel, Nagpur', need: '150 MT industrial', dist: '230 km' },
                ].map(d => (
                  <div key={d.buyer} className="flex justify-between items-start py-3 border-b border-[#E3E3DE] last:border-0">
                    <div>
                      <div className="text-sm font-semibold text-[#14161A]">{d.buyer}</div>
                      <div className="text-xs text-[#6B7280]">{d.need}</div>
                    </div>
                    <div className="text-xs text-[#4FC3F7] font-semibold whitespace-nowrap ml-2">{d.dist}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0F1115] rounded-2xl p-6">
              <h3 className="font-bold text-[#F5F5F3] mb-1" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Recommended Price Band</h3>
              <p className="text-xs text-[rgba(245,245,243,0.5)] mb-4">Food-grade, Maharashtra, Aug 2026 — indicative only</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-bold text-[#4FC3F7]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>₹3,050</span>
                <span className="text-sm text-[rgba(245,245,243,0.6)] mb-1">– ₹3,350/t</span>
              </div>
              <div className="h-2 rounded-full bg-[#2A2C31] mb-4">
                <div className="h-2 rounded-full bg-gradient-to-r from-[#4FC3F7] to-[#1E88C7] w-3/5" />
              </div>
              <p className="text-xs text-[rgba(245,245,243,0.35)] leading-relaxed">
                This price band reflects physical CO₂ commodity market dynamics — supply, demand, and logistics costs. It is entirely separate from Carbon Credit Certificate (CCC) pricing under any CCTS mechanism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
