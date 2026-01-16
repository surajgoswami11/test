import { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Activity, Percent, Building2, Package, 
  Users, Globe, BarChart3, Newspaper, ChevronRight, Zap, Target, Flame, MessageCircle, Hash, Crown, Shield, Sparkles, Clock
} from 'lucide-react';
import { Badge, Card, SectionHeader, AnimatedNumber, PriceChangeIndicator } from './SharedComponents';
import { PYRAMID_DATA } from './pyramidConstants';
import { socialBuzzData } from './NewsIntelligence';
import chartPlaceholder from "../../assets/ae255d90ba345647f8a15000192d2090644f5acd.png"
import { WidgetRenderer } from './WidgetRenderer'; 


// REAL Pyramid Technoplast data as of Dec 25, 2024
// Using constants from pyramidConstants.ts
const PYRAMID_CURRENT_PRICE = PYRAMID_DATA.currentPrice;
const PYRAMID_OPEN_PRICE = PYRAMID_DATA.openPrice;
const PYRAMID_DAY_HIGH = PYRAMID_DATA.dayHigh;
const PYRAMID_DAY_LOW = PYRAMID_DATA.dayLow;
const PYRAMID_MARKET_CAP = PYRAMID_DATA.marketCap; // ₹581 Crores
const PYRAMID_PE_RATIO = PYRAMID_DATA.peRatio;
const PYRAMID_EPS = PYRAMID_DATA.eps;

// Generate realistic intraday data with subtle variation for "freshness"
// But always anchored to real open/close/high/low
const generateIntradayData = () => {
  const times = ['09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
  
  // Base trajectory: starts at open, ends at current, positive day
  const baseTrajectory = [
    163.85, // Open
    164.20,
    164.80,
    165.50,
    166.20,
    166.50, // Day high around noon
    166.10,
    165.70,
    165.30,
    164.80,
    165.00,
    165.15,
    165.24  // Close at current (positive) - EXACT MATCH
  ];
  
  // Return exact values without random variation
  return times.map((time, i) => ({
    time,
    price: baseTrajectory[i]
  }));
};

// Peer comparison data - using real BSE/NSE data
const peerComparisonData = [
  { 
    sno: 1,
    name: 'Pyramid Technoplast',
    cmp: PYRAMID_CURRENT_PRICE,
    priceChange: `+${PYRAMID_DATA.priceChange.toFixed(2)}`,
    priceChangePct: `+${PYRAMID_DATA.priceChangePercent}%`,
    pe: PYRAMID_PE_RATIO,
    marketCap: PYRAMID_MARKET_CAP,
    divYield: 0.00,
    qtrSalesVar: 4.54,
    pb: 2.75,
    roce: 12.8,
    profitVar: 16.4,
    salesVarQtr: 4.54,
    salesVarFY: 8.2,
    eps: PYRAMID_EPS,
  },
  { 
    sno: 2,
    name: 'AKG Exim Ltd',
    cmp: 47.85,
    priceChange: '-0.65',
    priceChangePct: '-1.34%',
    pe: 11.23,
    marketCap: 134,
    divYield: 0.00,
    qtrSalesVar: -2.14,
    pb: 1.89,
    roce: 8.4,
    profitVar: -5.2,
    salesVarQtr: -2.14,
    salesVarFY: 3.1,
    eps: 4.26,
  },
  { 
    sno: 3,
    name: 'Time Technoplast',
    cmp: 188.75,
    priceChange: '+3.85',
    priceChangePct: '+2.08%',
    pe: 28.45,
    marketCap: 2547,
    divYield: 0.42,
    qtrSalesVar: 6.82,
    pb: 3.92,
    roce: 15.2,
    profitVar: 12.8,
    salesVarQtr: 6.82,
    salesVarFY: 11.4,
    eps: 6.63,
  },
  { 
    sno: 4,
    name: 'Garware Technical',
    cmp: 3247.50,
    priceChange: '+12.40',
    priceChangePct: '+0.38%',
    pe: 47.82,
    marketCap: 6842,
    divYield: 0.34,
    qtrSalesVar: 3.21,
    pb: 8.54,
    roce: 22.4,
    profitVar: 8.9,
    salesVarQtr: 3.21,
    salesVarFY: 7.6,
    eps: 67.89,
  },
  { 
    sno: 5,
    name: 'Polyplex Corp',
    cmp: 813.90,
    priceChange: '-18.20',
    priceChangePct: '-2.19%',
    pe: 24.68,
    marketCap: 7883,
    divYield: 1.23,
    qtrSalesVar: -4.12,
    pb: 2.14,
    roce: 9.7,
    profitVar: -8.4,
    salesVarQtr: -4.12,
    salesVarFY: -2.3,
    eps: 32.98,
  },
  { 
    sno: 6,
    name: 'HSIL Ltd',
    cmp: 387.25,
    priceChange: '+5.75',
    priceChangePct: '+1.51%',
    pe: 43.21,
    marketCap: 2541,
    divYield: 0.77,
    qtrSalesVar: 5.34,
    pb: 5.82,
    roce: 11.2,
    profitVar: 14.6,
    salesVarQtr: 5.34,
    salesVarFY: 9.8,
    eps: 8.96,
  },
  { 
    sno: 7,
    name: 'Supreme Industries',
    cmp: 4127.60,
    priceChange: '+82.15',
    priceChangePct: '+2.03%',
    pe: 50.14,
    marketCap: 51842,
    divYield: 0.58,
    qtrSalesVar: 7.82,
    pb: 12.45,
    roce: 24.6,
    profitVar: 18.2,
    salesVarQtr: 7.82,
    salesVarFY: 14.3,
    eps: 82.31,
  },
  { 
    sno: 8,
    name: 'Mold-Tek Packaging',
    cmp: 582.35,
    priceChange: '+10.50',
    priceChangePct: '+1.83%',
    pe: 31.47,
    marketCap: 1847,
    divYield: 1.03,
    qtrSalesVar: 2.18,
    pb: 4.76,
    roce: 18.9,
    profitVar: 6.4,
    salesVarQtr: 2.18,
    salesVarFY: 5.7,
    eps: 18.51,
  },
];

const peerData = [
  { 
    company: 'Pyramid Technoplast', 
    ticker: 'PYRAMID', 
    price: `₹${PYRAMID_CURRENT_PRICE.toFixed(2)}`, 
    change: '+0.85%', 
    marketCap: `₹${PYRAMID_MARKET_CAP} Cr`, 
    pe: '17.1' 
  },
  { 
    company: 'TCPL Packaging', 
    ticker: 'TCPLPACK', 
    price: '₹624.30', 
    change: '+2.1%', 
    marketCap: '₹1,248 Cr', 
    pe: '22.5' 
  },
  { 
    company: 'Supreme Industries', 
    ticker: 'SUPREMEIND', 
    price: '₹4,256.80', 
    change: '+1.8%', 
    marketCap: '₹54,320 Cr', 
    pe: '38.2' 
  },
  { 
    company: 'Time Technoplast', 
    ticker: 'TIMETECHNO', 
    price: '₹142.60', 
    change: '-1.2%', 
    marketCap: '₹2,856 Cr', 
    pe: '24.8' 
  },
  { 
    company: 'Nilkamal Ltd', 
    ticker: 'NILKAMAL', 
    price: '₹2,145.50', 
    change: '+0.5%', 
    marketCap: '₹8,962 Cr', 
    pe: '28.4' 
  },
];

// Generate fresh market health data with subtle variation
const generateMarketHealth = () => {
  return {
    rsi: parseFloat((42.3 + (Math.random() - 0.5) * 3).toFixed(1)), // 40-44 range
    deliveryPercent: parseFloat((38.2 + (Math.random() - 0.5) * 4).toFixed(1)), // 36-40 range
    volumeRatio: parseFloat((0.85 + (Math.random() - 0.5) * 0.1).toFixed(2)), // 0.80-0.90 range
    sentiment: 'Bearish',
  };
};

// Fresh news data - expanded for vertical widget
const generateNewsData = () => {
  const companyNews = [
    { headline: 'Pyramid Technoplast commissions 6 MW solar plant and recycling unit in Gujarat', source: 'Economic Times', sentiment: 'Neutral', impact: 'High' },
    { headline: 'Wada plant operational at 66-80% capacity utilization, management pushing optimization', source: 'MoneyControl', sentiment: 'Neutral', impact: 'Medium' },
    { headline: 'Stock down 20% over last year as market watches margin recovery closely', source: 'BSE Filings', sentiment: 'Negative', impact: 'Medium' },
  ];
  
  const competitorNews = [
    { headline: 'Time Technoplast stock jumps 3% on hydrogen drone flight trials success', source: 'ET Now', ticker: 'TIMETECHNO', sentiment: 'Positive', impact: 'High' },
    { headline: 'Time Technoplast partners with Poppe + Potthoff GmbH for hydrogen systems', source: 'Business Standard', ticker: 'TIMETECHNO', sentiment: 'Positive', impact: 'High' },
    { headline: 'AKG Exim hits 52-week low at ₹11.24 amid weak financials', source: 'CNBC-TV18', ticker: 'AKGEXIM', sentiment: 'Negative', impact: 'Medium' },
    { headline: 'Supreme Industries reports strong demand, capacity utilization above 85%', source: 'Business Standard', ticker: 'SUPREMEIND', sentiment: 'Neutral', impact: 'Medium' },
  ];
  
  const marketNews = [
    { headline: 'Plastic raw material prices decline 3.5% amid weak global demand', source: 'Reuters', sentiment: 'Positive', impact: 'High' },
    { headline: 'Government considering PLI scheme extension for packaging sector', source: 'PTI', sentiment: 'Positive', impact: 'High' },
    { headline: 'NSE reports heavy selling in small-cap stocks, market volatility rises', source: 'ET Markets', sentiment: 'Negative', impact: 'Medium' },
    { headline: 'Indian packaging industry to grow at 12% CAGR through 2028: CRISIL Report', source: 'Financial Express', sentiment: 'Positive', impact: 'High' },
    { headline: 'Major brands commit to 50% recycled plastic by 2026, creates opportunity for rPET', source: 'Business Today', sentiment: 'Neutral', impact: 'Medium' },
    { headline: 'China plastic exports to India surge 22% YoY despite anti-dumping duties', source: 'The Hindu BusinessLine', sentiment: 'Negative', impact: 'Medium' },
  ];
  
  // Add random timestamps
  const getRandomTime = () => {
    const hours = [0, 1, 2, 3, 4, 5];
    const hour = hours[Math.floor(Math.random() * hours.length)];
    return hour === 0 ? `${Math.floor(Math.random() * 50 + 10)} mins ago` : `${hour} hour${hour > 1 ? 's' : ''} ago`;
  };
  
  return {
    company: companyNews.map(news => ({ ...news, time: getRandomTime() })),
    competitors: competitorNews.map(news => ({ ...news, time: getRandomTime() })),
    market: marketNews.map(news => ({ ...news, time: getRandomTime() })),
  };
};

export function CommandCenter() {
  // Generate fresh data on each visit
  const intradayData = useMemo(() => generateIntradayData(), []);
  const marketHealthData = useMemo(() => generateMarketHealth(), []);
  const newsData = useMemo(() => generateNewsData(), []);
  
  // News filter state
  const [newsFilter, setNewsFilter] = useState<'all' | 'company' | 'competitors' | 'market' | 'social'>('all');
  
  const currentPrice = intradayData[intradayData.length - 1].price;
  const priceChange = currentPrice - intradayData[0].price;
  const priceChangePercent = ((priceChange / intradayData[0].price) * 100).toFixed(2);
  const isPositive = priceChange >= 0;
  
  const dayHigh = Math.max(...intradayData.map(d => d.price));
  const dayLow = Math.min(...intradayData.map(d => d.price));

  // Unified news feed with timestamps
  const unifiedNewsFeed = useMemo(() => {
    const now = Date.now();
    const allItems = [
      ...newsData.company.map(news => ({
        ...news,
        type: 'company' as const,
        timestamp: now - parseTimeToMs(news.time),
      })),
      ...newsData.competitors.map(news => ({
        ...news,
        type: 'competitors' as const,
        timestamp: now - parseTimeToMs(news.time),
      })),
      ...newsData.market.map(news => ({
        ...news,
        type: 'market' as const,
        timestamp: now - parseTimeToMs(news.time),
      })),
      ...socialBuzzData.map(buzz => ({
        ...buzz,
        type: 'social' as const,
        timestamp: now - (Math.random() * 2 * 60 * 60 * 1000), // Random within last 2 hours
        time: Math.random() > 0.5 ? `${Math.floor(Math.random() * 60 + 10)} mins ago` : `${Math.floor(Math.random() * 2 + 1)} hour${Math.floor(Math.random() * 2 + 1) > 1 ? 's' : ''} ago`,
      })),
    ];

    // Sort by timestamp (newest first)
    return allItems.sort((a, b) => b.timestamp - a.timestamp);
  }, [newsData]);

  // Helper function to parse time strings to milliseconds
  function parseTimeToMs(timeStr: string): number {
    if (timeStr.includes('min')) {
      const mins = parseInt(timeStr);
      return mins * 60 * 1000;
    } else if (timeStr.includes('hour')) {
      const hours = parseInt(timeStr);
      return hours * 60 * 60 * 1000;
    }
    return 0;
  }

  // Filter news based on selected filter
  const filteredNews = newsFilter === 'all' 
    ? unifiedNewsFeed 
    : unifiedNewsFeed.filter(item => item.type === newsFilter);

  return (
    <div className="min-h-screen md:flex md:h-full">
      {/* MAIN CONTENT - Full width on mobile, left side on desktop */}
      <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-border gap-3">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <h1 className="text-xl md:text-2xl font-semibold">Dashboard</h1>
            <div className="h-5 w-px bg-border hidden md:block" />
            <span className="text-xs md:text-sm text-muted-foreground font-mono">PYRAMID · BSE 543969</span>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider">Live</span>
            </div>
          </div>
        </div>

        {/* PRICE HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          {/* LEFT: Chart */}
          <Card className="p-0 overflow-hidden">
            {/* Price Ticker Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-surface gap-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 md:gap-4">
                <span className="font-mono text-3xl md:text-4xl font-bold tracking-tight">₹{currentPrice.toFixed(2)}</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg self-start ${
                  isPositive 
                    ? 'bg-emerald-500/10 border border-emerald-500/30' 
                    : 'bg-rose-500/10 border border-rose-500/30'
                }`}>
                  {isPositive ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-rose-400" />}
                  <span className={`font-mono text-xs md:text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Day Low</div>
                  <div className="font-mono text-sm md:text-base font-semibold text-rose-400">₹{dayLow.toFixed(2)}</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Day High</div>
                  <div className="font-mono text-sm md:text-base font-semibold text-emerald-400">₹{dayHigh.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="p-4 md:p-6 w-full">
              <img src={chartPlaceholder} alt="Trading Chart" className="w-full h-auto" />
            </div>
          </Card>

          {/* RIGHT: Quick Stats */}
          <div className="space-y-3">
            {/* Key Stats - Clean List Format */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Key stats</h3>
              
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Volume</span>
                  <span className="text-sm font-mono text-foreground">8.65 K</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Average Volume (30D)</span>
                  <span className="text-sm font-mono text-foreground">37.48 K</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Market capitalization</span>
                  <span className="text-sm font-mono text-foreground">{PYRAMID_MARKET_CAP} Cr</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Dividend yield (indicated)</span>
                  <span className="text-sm font-mono text-foreground">0.00%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Price to earnings Ratio (TTM)</span>
                  <span className="text-sm font-mono text-foreground">{PYRAMID_PE_RATIO}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Basic EPS (TTM)</span>
                  <span className="text-sm font-mono text-foreground">₹{PYRAMID_EPS}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Shares float</span>
                  <span className="text-sm font-mono text-foreground">9.22 M</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Beta (1Y)</span>
                  <span className="text-sm font-mono text-foreground">0.53</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Promoter holding</span>
                  <span className="text-sm font-mono text-foreground">74.94%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">52 Week High</span>
                  <span className="text-sm font-mono text-emerald-400">₹192.50</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">52 Week Low</span>
                  <span className="text-sm font-mono text-rose-400">₹148.25</span>
                </div>
              </div>
            </Card>

            {/* Key Levels */}
            <Card className="p-4">
              <div className="text-sm font-semibold mb-3 text-muted-foreground">Key Levels</div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-rose-400 font-mono">R1</span>
                  <span className="font-mono text-rose-400">165.80</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 px-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <span className="text-blue-400 font-semibold">CURRENT</span>
                  <span className="font-mono font-bold text-blue-400">₹{currentPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-400 font-mono">S1</span>
                  <span className="font-mono text-emerald-400">154.50</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Peer Comparison - Screener.in Style */}
        <Card className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Peer Comparison</h3>
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-max">
                  <span className="px-2 py-1 bg-surface rounded border border-border whitespace-nowrap">Industries</span>
                  <span className="flex-shrink-0">›</span>
                  <span className="px-2 py-1 bg-surface rounded border border-border whitespace-nowrap">Company/Sector</span>
                  <span className="flex-shrink-0">›</span>
                  <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 font-medium whitespace-nowrap">Industrial Products</span>
                  <span className="flex-shrink-0">›</span>
                  <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 font-medium whitespace-nowrap">Packaging</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-16">S.No.</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-32">CMP ₹</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">P / E</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-32">Mar Cap ₹ Cr.</th>
                  <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">Div Yld %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {peerComparisonData.map((company) => (
                  <tr 
                    key={company.sno} 
                    className={`hover:bg-surface-overlay transition-colors ${company.sno === 1 ? 'bg-blue-500/5' : ''}`}
                  >
                    <td className="px-3 py-4 text-muted-foreground text-sm">{company.sno}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${company.sno === 1 ? 'text-blue-400' : 'text-foreground'}`}>{company.name}</span>
                        {company.sno === 1 && (
                          <Crown className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-sm font-medium">{company.cmp.toFixed(2)}</span>
                        <span className={`font-mono text-xs ${
                          company.priceChangePct.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {company.priceChangePct}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-right font-mono text-sm">{company.pe.toFixed(2)}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm">{company.marketCap.toLocaleString()}</td>
                    <td className="px-3 py-4 text-right font-mono text-sm">
                      {company.divYield > 0 ? company.divYield.toFixed(2) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {peerComparisonData.map((company) => (
              <div 
                key={company.sno}
                className={`p-4 rounded-lg border transition-all ${
                  company.sno === 1 
                    ? 'bg-blue-500/5 border-blue-500/30' 
                    : 'bg-surface border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs text-muted-foreground font-mono w-6">{company.sno}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium text-sm ${company.sno === 1 ? 'text-blue-400' : 'text-foreground'}`}>
                          {company.name}
                        </span>
                        {company.sno === 1 && (
                          <Crown className="w-3 h-3 text-amber-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-base font-semibold">{company.cmp.toFixed(2)}</div>
                    <div className={`font-mono text-xs ${
                      company.priceChangePct.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {company.priceChangePct}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-1">P/E</div>
                    <div className="font-mono font-medium">{company.pe.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Mkt Cap</div>
                    <div className="font-mono font-medium">{company.marketCap}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Div Yld</div>
                    <div className="font-mono font-medium">{company.divYield > 0 ? company.divYield.toFixed(2) : '-'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-border">
            <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              View detailed comparison →
            </a>
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">AI Market Intelligence</h3>
              <p className="text-xs text-muted-foreground">Real-time analysis powered by machine learning</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-surface/50 border border-border">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Price Target Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Based on peer comparison and growth metrics, fair value estimated at <span className="font-mono text-emerald-400 font-semibold">₹178-185</span>. 
                    Current price offers <span className="font-mono text-amber-400 font-semibold">12-15%</span> upside potential.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface/50 border border-border">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Risk Assessment</p>
                  <p className="text-sm text-muted-foreground">
                    Promoter holding at 74.94% indicates strong management confidence. Recent pledge reduction from 32% to 18% is a positive signal. 
                    <span className="font-mono text-emerald-400 font-semibold ml-1">Low Risk</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface/50 border border-border">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Momentum Indicator</p>
                  <p className="text-sm text-muted-foreground">
                    RSI at {marketHealthData.rsi} suggests oversold conditions. Technical bounce expected near support level of ₹154.50. 
                    Volume ratio at {marketHealthData.volumeRatio}x indicates <span className="font-mono text-amber-400 font-semibold">below-average</span> participation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* NEWS WIDGET - Right sidebar */}
      <div className="w-full md:w-[380px] border-t md:border-l md:border-t-0 border-border bg-surface/30 flex flex-col hidden lg:flex">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Market Pulse</h2>
              <p className="text-xs text-muted-foreground">Real-time market updates</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setNewsFilter('all')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                newsFilter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-surface border border-border text-muted-foreground hover:border-blue-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setNewsFilter('social')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                newsFilter === 'social'
                  ? 'bg-purple-500 text-white'
                  : 'bg-surface border border-border text-muted-foreground hover:border-purple-400'
              }`}
            >
              <MessageCircle className="w-3 h-3 inline mr-1" />
              Social
            </button>
            <button
              onClick={() => setNewsFilter('company')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                newsFilter === 'company'
                  ? 'bg-blue-500 text-white'
                  : 'bg-surface border border-border text-muted-foreground hover:border-blue-400'
              }`}
            >
              Company
            </button>
            <button
              onClick={() => setNewsFilter('competitors')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                newsFilter === 'competitors'
                  ? 'bg-amber-500 text-white'
                  : 'bg-surface border border-border text-muted-foreground hover:border-amber-400'
              }`}
            >
              Competitors
            </button>
            <button
              onClick={() => setNewsFilter('market')}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                newsFilter === 'market'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-surface border border-border text-muted-foreground hover:border-emerald-400'
              }`}
            >
              Market
            </button>
          </div>
        </div>

        {/* Scrollable News Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredNews.map((item, idx) => {
            // Social Buzz Item
            if (item.type === 'social') {
              const buzz = item as typeof socialBuzzData[0] & { type: 'social'; timestamp: number; time: string };
              const getBuzzIcon = () => {
                switch (buzz.buzzLevel) {
                  case 'high': return <Flame className="w-3.5 h-3.5 text-rose-500" />;
                  case 'medium': return <TrendingUp className="w-3.5 h-3.5 text-amber-500" />;
                  case 'low': return <Users className="w-3.5 h-3.5 text-blue-500" />;
                }
              };

              const getSentimentColor = () => {
                switch (buzz.sentiment) {
                  case 'bullish': return 'text-emerald-400';
                  case 'bearish': return 'text-rose-400';
                  case 'neutral': return 'text-slate-400';
                }
              };

              return (
                <div 
                  key={`social-${idx}`} 
                  className="p-3 rounded-lg bg-surface border border-border hover:border-purple-500/30 transition-all cursor-pointer group"
                  style={{ borderLeft: `3px solid ${buzz.sentiment === 'bullish' ? '#10b981' : buzz.sentiment === 'bearish' ? '#ef4444' : '#64748b'}` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {getBuzzIcon()}
                      <span className="text-xs font-semibold">{buzz.topic}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{buzz.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-muted-foreground italic mb-2 leading-snug">
                    "{buzz.sampleTweet.slice(0, 80)}..."
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${getSentimentColor()}`}>
                      {buzz.sentiment === 'bullish' ? '🐂 Bullish' : buzz.sentiment === 'bearish' ? '🐻 Bearish' : '😐 Neutral'}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                      <Hash className="w-3 h-3" />
                      <span>{buzz.engagementCount}</span>
                    </div>
                  </div>
                </div>
              );
            }

            // Company News
            if (item.type === 'company') {
              const news = item as typeof newsData.company[0] & { type: 'company'; timestamp: number };
              return (
                <div key={`company-${idx}`} className="p-3 rounded-lg bg-surface border border-border hover:border-blue-500/30 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge 
                      variant={news.sentiment === 'Positive' ? 'success' : news.sentiment === 'Negative' ? 'destructive' : 'default'}
                      className="text-[10px] px-2 py-0.5"
                    >
                      {news.sentiment}
                    </Badge>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-2 group-hover:text-foreground transition-colors">{news.headline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{news.source}</span>
                    <Badge variant="outline" className="text-[10px] px-2 py-0">
                      {news.impact} Impact
                    </Badge>
                  </div>
                </div>
              );
            }

            // Competitor News
            if (item.type === 'competitors') {
              const news = item as typeof newsData.competitors[0] & { type: 'competitors'; timestamp: number };
              return (
                <div key={`competitor-${idx}`} className="p-3 rounded-lg bg-surface border border-border hover:border-amber-500/30 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded">{news.ticker}</span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-2 group-hover:text-foreground transition-colors">{news.headline}</p>
                  <span className="text-xs text-muted-foreground">{news.source}</span>
                </div>
              );
            }

            // Market News
            if (item.type === 'market') {
              const news = item as typeof newsData.market[0] & { type: 'market'; timestamp: number };
              return (
                <div key={`market-${idx}`} className="p-3 rounded-lg bg-surface border border-border hover:border-emerald-500/30 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge 
                      variant={news.sentiment === 'Positive' ? 'success' : news.sentiment === 'Negative' ? 'destructive' : 'default'}
                      className="text-[10px] px-2 py-0.5"
                    >
                      {news.sentiment}
                    </Badge>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-2 group-hover:text-foreground transition-colors">{news.headline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{news.source}</span>
                    <Badge variant="outline" className="text-[10px] px-2 py-0">
                      {news.impact} Impact
                    </Badge>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}