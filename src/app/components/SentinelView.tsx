import { Shield, Clock, Users, TrendingUp, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';
import { Card, SectionHeader, Badge } from './SharedComponents';

const tradingWindowData = {
  currentStatus: 'Open',
  daysUntilClose: 7,
  closureDate: 'Dec 24, 2024',
  reopenDate: 'Jan 8, 2025',
  upcomingEvents: [
    { date: 'Dec 24', event: 'Trading window closes', type: 'critical' },
    { date: 'Dec 28', event: 'Board meeting scheduled', type: 'info' },
    { date: 'Jan 5', event: 'Q3 results expected', type: 'info' },
    { date: 'Jan 8', event: 'Trading window reopens', type: 'success' },
  ],
};

// Whale Watch Data - 2025 Institutional Buying vs Retail Selling
// Major trend: Steady accumulation by institutions absorbing supply from retail
const whaleWatchData = [
  {
    date: 'Sep 2025',
    entity: 'Domestic Institutional Investors (DIIs)',
    type: 'DII Accumulation',
    change: '+0.47%',
    newHolding: '3.17%',
    shares: 'Increased from 2.7%',
    avgPrice: 'Ongoing',
    positive: true,
  },
  {
    date: 'Sep 2025',
    entity: 'Carnelian Structural Shift Fund',
    type: 'DII - Major Holder',
    change: 'Holding',
    newHolding: '~2.7%',
    shares: 'Strategic Position',
    avgPrice: 'Long-term',
    positive: true,
  },
  {
    date: 'Sep 2025',
    entity: 'Foreign Institutional Investors (FIIs)',
    type: 'FII Entry',
    change: '+0.04%',
    newHolding: '1.04%',
    shares: 'Growing Interest',
    avgPrice: 'Ongoing',
    positive: true,
  },
  {
    date: 'Sep 2025',
    entity: 'Public/Retail Investors',
    type: 'Retail Exit',
    change: '-0.81%',
    newHolding: '20.85%',
    shares: 'Down from 21.66%',
    avgPrice: 'Distribution',
    positive: false,
  },
  {
    date: 'Nov 07, 2024',
    entity: 'HRTI Private Limited',
    type: 'Bulk Deal',
    change: 'Buy & Sell',
    newHolding: 'Intraday',
    shares: '~2.47 Lakh',
    avgPrice: '₹246',
    positive: true,
  },
  {
    date: 'Oct 17, 2024',
    entity: 'NK Securities Research',
    type: 'Bulk Deal',
    change: 'Buy & Sell',
    newHolding: 'HFT Activity',
    shares: '~1.88 Lakh',
    avgPrice: '₹225',
    positive: true,
  },
  {
    date: 'Oct 16, 2024',
    entity: 'Setu Securities Pvt Ltd',
    type: 'Bulk Deal',
    change: 'Buy & Sell',
    newHolding: 'Intraday',
    shares: '~2.47 Lakh',
    avgPrice: '₹205',
    positive: true,
  },
  {
    date: 'Jul 30, 2024',
    entity: 'Chanchal Devi Lodha',
    type: 'Significant Exit',
    change: 'Sell',
    newHolding: 'Exited',
    shares: '2.15 Lakh',
    avgPrice: '₹197',
    positive: false,
  },
];

const rumorScannerData = [
  {
    timestamp: '2 hours ago',
    source: 'MoneyControl Forum',
    sentiment: 'Positive',
    summary: 'Discussion about potential capacity expansion in Gujarat plant',
    riskLevel: 'Low',
    verified: false,
  },
  {
    timestamp: '5 hours ago',
    source: 'Twitter/X - Finance Handles',
    sentiment: 'Neutral',
    summary: 'Analyst comparing PYRAMID with TCPLPACK on valuation metrics',
    riskLevel: 'Low',
    verified: false,
  },
  {
    timestamp: '1 day ago',
    source: 'ValueResearch Forum',
    sentiment: 'Negative',
    summary: 'Retail investor concerns about declining delivery percentage',
    riskLevel: 'Medium',
    verified: false,
  },
  {
    timestamp: '2 days ago',
    source: 'Economic Times Comments',
    sentiment: 'Positive',
    summary: 'Speculation about government packaging tender participation',
    riskLevel: 'Medium',
    verified: false,
  },
];

const complianceAlerts = [
  {
    type: 'Info',
    message: 'Reminder: Q3 FY25 results disclosure due by Jan 14, 2025',
    priority: 'medium',
  },
  {
    type: 'Warning',
    message: 'Promoter trading window closing in 7 days',
    priority: 'high',
  },
  {
    type: 'Success',
    message: 'All statutory filings up to date',
    priority: 'low',
  },
];

export function SentinelView() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Watchdog</h1>
          <p className="text-sm text-muted-foreground">Compliance Monitoring & Governance Intelligence</p>
        </div>
      </div>

      {/* Key Alerts - Mobile First */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {/* Trading Window Alert */}
        <Card className="p-4 md:p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-amber-400 font-medium mb-1">WARNING</div>
              <h3 className="font-semibold text-sm md:text-base">Trading window closing</h3>
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">7 days</div>
          <p className="text-xs text-muted-foreground">Closes Dec 24, 2025</p>
        </Card>

        {/* Q3 Disclosure Reminder */}
        <Card className="p-4 md:p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-blue-400 font-medium mb-1">INFO</div>
              <h3 className="font-semibold text-sm md:text-base">Q3 FY25 results disclosure</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Due by Jan 14, 2025</p>
        </Card>

        {/* All Filings Up to Date */}
        <Card className="p-4 md:p-5 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-emerald-400 font-medium mb-1">SUCCESS</div>
              <h3 className="font-semibold text-sm md:text-base">All statutory filings</h3>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Up to date</p>
        </Card>
      </div>

      {/* Trading Window & Whale Watch Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        
        {/* Trading Window */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-400" />
            <h2 className="font-semibold">Trading Window</h2>
          </div>

          {/* Visual Clock */}
          <div className="flex items-center justify-center py-6 md:py-8">
            <div className="relative pb-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">7</div>
                  <div className="text-xs md:text-sm text-white/80 mt-0.5">days left</div>
                </div>
              </div>
              <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 whitespace-nowrap">
                <span className="text-xs font-medium text-amber-400">Closing Soon</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm items-center">
              <span className="text-muted-foreground">Closes:</span>
              <span className="font-medium">Dec 24, 2024</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-muted-foreground">Reopens:</span>
              <span className="font-medium">Jan 8, 2025</span>
            </div>
          </div>
        </Card>

        {/* Whale Watch - Simplified */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-400" />
            <h2 className="font-semibold">Whale Watch</h2>
            <Badge variant="default" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-[10px]">
              Delayed
            </Badge>
          </div>

          {/* DII Accumulation - Highlight */}
          <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/30 mb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-emerald-400 font-medium mb-1">DII ACCUMULATION</div>
                <h3 className="font-semibold text-sm mb-2">Domestic Institutional Investors</h3>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-lg font-bold text-emerald-400">+0.47%</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">New Holding</div>
                <div className="text-xl font-bold">3.17%</div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-surface border border-border">
              <div className="text-xs text-muted-foreground mb-1">FII Entry</div>
              <div className="text-lg font-bold text-blue-400">+0.04%</div>
              <div className="text-xs text-muted-foreground">Now 1.04%</div>
            </div>
            <div className="p-3 rounded-lg bg-surface border border-border">
              <div className="text-xs text-muted-foreground mb-1">Retail Exit</div>
              <div className="text-lg font-bold text-rose-400">-0.81%</div>
              <div className="text-xs text-muted-foreground">Now 20.85%</div>
            </div>
          </div>

          <button className="w-full mt-4 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all text-sm">
            View Full Activity →
          </button>
        </Card>
      </div>
    </div>
  );
}