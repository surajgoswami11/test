import { Users, TrendingUp, TrendingDown, Eye, ArrowUpRight } from 'lucide-react';

const peerCompanies = [
  {
    name: 'Tata Motors',
    ticker: 'TATAMOTORS',
    price: '₹892.50',
    change: '+2.8%',
    positive: true,
    marketCap: '₹3.2L Cr',
    pe: '18.4',
    promoterHolding: '46.4%',
    pledgePercent: '0%',
    deliveryPercent: '54.2%',
  },
  {
    name: 'Mahindra & Mahindra',
    ticker: 'M&M',
    price: '₹2,145.30',
    change: '+1.5%',
    positive: true,
    marketCap: '₹2.8L Cr',
    pe: '24.1',
    promoterHolding: '51.8%',
    pledgePercent: '0%',
    deliveryPercent: '62.1%',
  },
  {
    name: 'Maruti Suzuki',
    ticker: 'MARUTI',
    price: '₹11,245.60',
    change: '-0.6%',
    positive: false,
    marketCap: '₹3.5L Cr',
    pe: '28.7',
    promoterHolding: '56.2%',
    pledgePercent: '0%',
    deliveryPercent: '48.9%',
  },
  {
    name: 'Bajaj Auto',
    ticker: 'BAJAJ-AUTO',
    price: '₹8,654.20',
    change: '+3.2%',
    positive: true,
    marketCap: '₹2.5L Cr',
    pe: '32.5',
    promoterHolding: '55.1%',
    pledgePercent: '0%',
    deliveryPercent: '71.4%',
  },
  {
    name: 'Ashok Leyland',
    ticker: 'ASHOKLEY',
    price: '₹185.45',
    change: '-1.2%',
    positive: false,
    marketCap: '₹54,200 Cr',
    pe: '16.8',
    promoterHolding: '51.6%',
    pledgePercent: '0%',
    deliveryPercent: '45.8%',
  },
];

const insights = [
  {
    title: 'Sector Leader Alert',
    description: 'Mahindra & Mahindra showing highest delivery % in auto sector',
    type: 'positive',
  },
  {
    title: 'Valuation Gap',
    description: 'Your stock trading at 28% discount to peer avg P/E',
    type: 'neutral',
  },
  {
    title: 'Promoter Activity',
    description: 'Zero pledge across all peers - sector shows strong promoter confidence',
    type: 'positive',
  },
];

export function Peers() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Users className="w-6 h-6 text-purple-500" />
            <h1 className="text-3xl tracking-tight">Peer Intel</h1>
          </div>
          <p className="text-zinc-500 text-sm">Competitive landscape & comparative analysis</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-white/10 hover:border-white/20 text-sm text-zinc-400 hover:text-zinc-300 transition-all">
            Auto Sector
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-sm text-blue-400 transition-all">
            View Report
          </button>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-3 gap-4">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={`rounded-xl backdrop-blur-xl border p-4 ${
              insight.type === 'positive'
                ? 'bg-green-900/20 border-green-500/30'
                : 'bg-blue-900/20 border-blue-500/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Eye className={`w-4 h-4 ${
                insight.type === 'positive' ? 'text-green-400' : 'text-blue-400'
              }`} />
              <h3 className="text-sm font-semibold tracking-tight">{insight.title}</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Peer Comparison Table */}
      <div className="rounded-xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-xs text-zinc-500 uppercase tracking-wide">Company</th>
                <th className="text-right p-4 text-xs text-zinc-500 uppercase tracking-wide">Price</th>
                <th className="text-right p-4 text-xs text-zinc-500 uppercase tracking-wide">Change</th>
                <th className="text-right p-4 text-xs text-zinc-500 uppercase tracking-wide">Market Cap</th>
                <th className="text-right p-4 text-xs text-zinc-500 uppercase tracking-wide">P/E</th>
                <th className="text-right p-4 text-xs text-zinc-500 uppercase tracking-wide">Promoter %</th>
                <th className="text-right p-4 text-xs text-zinc-500 uppercase tracking-wide">Delivery %</th>
                <th className="text-right p-4 text-xs text-zinc-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {peerCompanies.map((company, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-zinc-800/30 transition-all">
                  <td className="p-4">
                    <div>
                      <div className="tracking-tight mb-1">{company.name}</div>
                      <div className="text-xs text-zinc-600 font-mono">{company.ticker}</div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono">{company.price}</td>
                  <td className="p-4 text-right">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                      company.positive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {company.positive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="text-xs font-mono">{company.change}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-sm">{company.marketCap}</td>
                  <td className="p-4 text-right font-mono text-sm">{company.pe}</td>
                  <td className="p-4 text-right font-mono text-sm">{company.promoterHolding}</td>
                  <td className="p-4 text-right">
                    <span className={`font-mono text-sm ${
                      parseFloat(company.deliveryPercent) > 60 ? 'text-green-400' : 'text-zinc-400'
                    }`}>
                      {company.deliveryPercent}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 rounded-lg bg-zinc-800/50 border border-white/5 hover:border-white/20 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sector Averages */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Avg P/E Ratio', value: '24.1', comparison: 'vs 28.5 (Your Stock)' },
          { label: 'Avg Promoter Holding', value: '52.2%', comparison: '+1.4% MoM' },
          { label: 'Avg Delivery %', value: '56.5%', comparison: 'Institutional interest high' },
          { label: 'Sector Beta', value: '1.18', comparison: 'Moderate volatility' },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-4">
            <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wide">{stat.label}</div>
            <div className="font-mono text-2xl tracking-tight mb-1">{stat.value}</div>
            <div className="text-xs text-zinc-600">{stat.comparison}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
