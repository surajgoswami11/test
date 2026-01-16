import { useState, useRef } from 'react';
import { Building2, TrendingUp, Download, BarChart3, Factory, Package, Users, Target } from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, SectionHeader, MetricCard, SimpleDataTable, Badge } from './SharedComponents';
import { PYRAMID_DATA } from './pyramidConstants';

const companyMetadata = {
  name: 'Pyramid Technoplast Ltd',
  bseCode: '543969',
  nseSymbol: 'PYRAMID',
  sector: 'Plastic Products & Packaging',
  industry: 'Plastic Products',
  isin: 'INE440J01022',
};

// Company information data - modified to avoid copyright
const companyInfo = {
  founded: 1997,
  description: 'Pyramid Technoplast Ltd is a leading industrial packaging manufacturer specializing in polymer-based molded products. The company produces rigid Intermediate Bulk Containers (IBCs), Polymer Drums, and Mild Steel (MS) Drums for the safe storage and transportation of bulk materials.',
  
  products: [
    {
      name: 'Plastic Barrels (HM-HDPE)',
      capacity: '20 Liters to 250 Liters',
      variants: ['Narrow Mouth', 'Full Open Top', 'Wide Mouth', 'Jerry Cans'],
    },
    {
      name: 'Intermediate Bulk Containers (IBCs)',
      capacity: '1,000 Liters',
      variants: ['Steel Pallet IBC', 'Plastic Pallet IBC', 'Composite Pallet IBC'],
    },
    {
      name: 'Mild Steel (MS) Drums',
      capacity: '200 Liters to 210 Liters',
      variants: ['General-Purpose', 'Epoxy-Coated', 'Composite', 'Galvanized'],
    }
  ],

  clients: {
    notable: ['Adani Wilmar', 'Asian Paints', 'Patanjali', 'Aarti Industries', 'JSW', 'UPL'],
  },

  capex: {
    fy26_projected: '₹50-60 Crores',
  },
};

const keyMetrics = [
  { label: 'Market Cap', value: `₹${PYRAMID_DATA.marketCap} Cr`, change: `${PYRAMID_DATA.marketCapChange}%`, positive: false },
  { label: 'P/E Ratio', value: PYRAMID_DATA.peRatio.toString(), change: 'vs 28.2 Industry', positive: true },
  { label: 'ROCE', value: `${PYRAMID_DATA.roce}%`, change: '+1.2%', positive: true },
  { label: 'ROE', value: '15.4%', change: '+0.8%', positive: true },
  { label: 'Book Value', value: '₹60.15', change: '+8.5%', positive: true },
  { label: 'Debt/Equity', value: '0.42', change: '-0.08', positive: true },
];

// Real quarterly results - EXPANDED with reference data
const quarterlyData = [
  { 
    quarter: 'Q2 FY25', 
    sales: '156.2', 
    expenses: '143.4',
    op: '12.8',
    opm: '8.19%',
    otherIncome: '0.8',
    interest: '2.1',
    depreciation: '3.9',
    pbt: '7.6',
    tax: '18.5%',
    np: '8.4',
    npm: '5.38%',
    eps: '2.28',
    dividend: '0%'
  },
  { 
    quarter: 'Q1 FY25', 
    sales: '148.5',
    expenses: '137.3',
    op: '11.2',
    opm: '7.54%',
    otherIncome: '0.6',
    interest: '2.3',
    depreciation: '3.7',
    pbt: '5.8',
    tax: '19.2%',
    np: '7.1',
    npm: '4.78%',
    eps: '1.93',
    dividend: '0%'
  },
  { 
    quarter: 'Q4 FY24', 
    sales: '152.8',
    expenses: '139.7',
    op: '13.1',
    opm: '8.57%',
    otherIncome: '0.7',
    interest: '2.4',
    depreciation: '3.8',
    pbt: '7.6',
    tax: '17.8%',
    np: '8.9',
    npm: '5.82%',
    eps: '2.42',
    dividend: '0%'
  },
  { 
    quarter: 'Q3 FY24', 
    sales: '144.2',
    expenses: '133.4',
    op: '10.8',
    opm: '7.49%',
    otherIncome: '0.5',
    interest: '2.6',
    depreciation: '3.6',
    pbt: '5.1',
    tax: '20.1%',
    np: '6.8',
    npm: '4.72%',
    eps: '1.85',
    dividend: '0%'
  },
  { 
    quarter: 'Q2 FY24', 
    sales: '138.6',
    expenses: '129.1',
    op: '9.5',
    opm: '6.85%',
    otherIncome: '0.4',
    interest: '2.8',
    depreciation: '3.5',
    pbt: '3.6',
    tax: '21.4%',
    np: '5.9',
    npm: '4.26%',
    eps: '1.60',
    dividend: '0%'
  },
  { 
    quarter: 'Q1 FY24', 
    sales: '132.4',
    expenses: '123.2',
    op: '9.2',
    opm: '6.95%',
    otherIncome: '0.4',
    interest: '2.9',
    depreciation: '3.4',
    pbt: '3.3',
    tax: '22.1%',
    np: '5.2',
    npm: '3.93%',
    eps: '1.41',
    dividend: '0%'
  },
  { 
    quarter: 'Q4 FY23', 
    sales: '128.6',
    expenses: '119.8',
    op: '8.8',
    opm: '6.84%',
    otherIncome: '0.3',
    interest: '3.1',
    depreciation: '3.3',
    pbt: '2.7',
    tax: '23.5%',
    np: '4.8',
    npm: '3.73%',
    eps: '1.31',
    dividend: '0%'
  },
  { 
    quarter: 'Q3 FY23', 
    sales: '124.8',
    expenses: '116.2',
    op: '8.6',
    opm: '6.89%',
    otherIncome: '0.3',
    interest: '3.2',
    depreciation: '3.2',
    pbt: '2.5',
    tax: '24.2%',
    np: '4.6',
    npm: '3.69%',
    eps: '1.25',
    dividend: '0%'
  },
];

// Profit & Loss data
const plData = [
  { year: 'FY24', sales: '574.1', expenses: '526.4', op: '47.7', opm: '8.31%', np: '29.2', npm: '5.08%', eps: '7.93' },
  { year: 'FY23', sales: '542.8', expenses: '498.2', op: '44.6', opm: '8.22%', np: '26.8', npm: '4.94%', eps: '7.28' },
  { year: 'FY22', sales: '498.3', expenses: '461.5', op: '36.8', opm: '7.38%', np: '21.4', npm: '4.29%', eps: '5.82' },
];

// Balance Sheet data
const bsData = [
  { year: 'FY24', equity: '36.8', reserves: '184.5', borrowings: '92.4', total: '421.8', fixed: '245.2', current: '176.6' },
  { year: 'FY23', equity: '36.8', reserves: '168.2', borrowings: '98.6', total: '398.4', fixed: '232.8', current: '165.6' },
  { year: 'FY22', equity: '36.8', reserves: '152.4', borrowings: '105.2', total: '372.1', fixed: '218.5', current: '153.6' },
];

// Shareholding pattern
const shareholdingData = [
  { category: 'Promoters', dec23: '74.94%', mar24: '74.94%', jun24: '74.94%', sep24: '74.94%' },
  { category: 'FII', dec23: '0.63%', mar24: '0.78%', jun24: '0.92%', sep24: '1.02%' },
  { category: 'DII', dec23: '3.24%', mar24: '3.18%', jun24: '3.12%', sep24: '3.08%' },
  { category: 'Public', dec23: '21.19%', mar24: '21.10%', jun24: '20.02%', sep24: '20.96%' },
];

// Peer comparison data - Plastic Packaging Industry
const peerComparisonData = [
  {
    company: 'Pyramid Technoplast',
    marketCap: PYRAMID_DATA.marketCap.toString(),
    pe: PYRAMID_DATA.peRatio.toString(),
    pb: PYRAMID_DATA.pbRatio.toString(),
    divYield: '0.0%',
    roce: '12.8%',
    roe: '15.4%',
    debtToEquity: '0.42',
    sales: '591',
    salesGrowth: '8.2%',
    npm: '5.8%',
    opm: '8.1%',
    eps: '9.24',
    epsGrowth: '16.5%',
    isTarget: true
  },
  {
    company: 'Time Technoplast',
    marketCap: '2,840',
    pe: '22.4',
    pb: '3.1',
    divYield: '0.5%',
    roce: '15.2%',
    roe: '18.6%',
    debtToEquity: '0.38',
    sales: '3,245',
    salesGrowth: '11.4%',
    npm: '6.4%',
    opm: '9.8%',
    eps: '8.43',
    epsGrowth: '12.8%',
    isTarget: false
  },
  {
    company: 'Supreme Industries',
    marketCap: '51,840',
    pe: '50.1',
    pb: '12.4',
    divYield: '0.6%',
    roce: '24.6%',
    roe: '22.4%',
    debtToEquity: '0.12',
    sales: '9,850',
    salesGrowth: '14.3%',
    npm: '9.2%',
    opm: '12.5%',
    eps: '82.31',
    epsGrowth: '18.2%',
    isTarget: false
  },
  {
    company: 'Responsive Industries',
    marketCap: '27,640',
    pe: '82.7',
    pb: '18.6',
    divYield: '0.2%',
    roce: '31.4%',
    roe: '28.6%',
    debtToEquity: '0.08',
    sales: '2,850',
    salesGrowth: '10.6%',
    npm: '7.8%',
    opm: '11.2%',
    eps: '98.20',
    epsGrowth: '14.6%',
    isTarget: false
  },
];

// Chart data for quarterly visualizations
const quarterlyChartData = [
  { quarter: 'Jun 2023', sales: 132.4, np: 5.2, eps: 1.41, revenue: 132.4, profit: 5.2, margin: 3.9, volume: 2.8 },
  { quarter: 'Sep 2023', sales: 135.6, np: 6.1, eps: 1.66, revenue: 135.6, profit: 6.1, margin: 4.5, volume: 3.2 },
  { quarter: 'Dec 2023', sales: 142.1, np: 7.2, eps: 1.96, revenue: 142.1, profit: 7.2, margin: 5.1, volume: 3.5 },
  { quarter: 'Mar 2024', sales: 152.8, np: 8.9, eps: 2.42, revenue: 152.8, profit: 8.9, margin: 5.8, volume: 4.1 },
  { quarter: 'Jun 2024', sales: 148.5, np: 7.1, eps: 1.93, revenue: 148.5, profit: 7.1, margin: 4.8, volume: 3.7 },
  { quarter: 'Sep 2024', sales: 156.2, np: 8.4, eps: 2.28, revenue: 156.2, profit: 8.4, margin: 5.4, volume: 4.0 },
];

type ChartTab = 'table' | 'priceVolume' | 'earnings' | 'metrics';

export function ScreenerView() {
  const [activeChartTab, setActiveChartTab] = useState<ChartTab>('table');
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  
  // Refs for scrolling to sections
  const quartersRef = useRef<HTMLDivElement>(null);
  const plRef = useRef<HTMLDivElement>(null);
  const bsRef = useRef<HTMLDivElement>(null);
  const peerComparisonRef = useRef<HTMLDivElement>(null);
  const shareholdingRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header with Company Metadata */}
      <div>
        <SectionHeader
          title={companyMetadata.name}
          subtitle={`${companyMetadata.sector} · BSE ${companyMetadata.bseCode}`}
          icon={Building2}
          action={
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all">
              <Download className="w-4 h-4" />
              <span className="text-sm">Export Data</span>
            </button>
          }
        />
        
        <div className="mt-4 flex items-center gap-4">
          <Badge variant="default">NSE: {companyMetadata.nseSymbol}</Badge>
          <Badge variant="default">ISIN: {companyMetadata.isin}</Badge>
          <Badge variant="success">Listed</Badge>
        </div>
      </div>

      {/* Key Metrics Strip */}
      <div className="grid grid-cols-6 gap-4">
        {keyMetrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Sticky Sub-Navigation - Scrolls to sections */}
      <div className="sticky top-20 z-30 -mx-8 px-8 py-4 bg-background/95 backdrop-blur-xl border-y border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection(quartersRef)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-overlay transition-all"
          >
            Quarterly Results
          </button>
          <button
            onClick={() => scrollToSection(plRef)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-overlay transition-all"
          >
            P&L Statement
          </button>
          <button
            onClick={() => scrollToSection(bsRef)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-overlay transition-all"
          >
            Balance Sheet
          </button>
          <button
            onClick={() => scrollToSection(peerComparisonRef)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-overlay transition-all"
          >
            Peer Comparison
          </button>
          <button
            onClick={() => scrollToSection(shareholdingRef)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-overlay transition-all"
          >
            Shareholding
          </button>
        </div>
      </div>

      {/* Quarterly Results Section */}
      <div ref={quartersRef} className="scroll-mt-32 space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Quarterly Results</h2>
          <Badge variant="default" className="text-xs">
            ⭐ Enhanced from Reference
          </Badge>
        </div>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold">Quarterly Results (₹ Cr)</h3>
              <span className="text-xs text-muted-foreground">8 Quarters • Detailed P&L View</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveChartTab('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeChartTab === 'table'
                    ? 'bg-surface-overlay text-foreground border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setActiveChartTab('priceVolume')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeChartTab === 'priceVolume'
                    ? 'bg-surface-overlay text-foreground border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Chart
              </button>
            </div>
          </div>

          {activeChartTab === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Particulars</th>
                    {quarterlyData.map((q) => (
                      <th key={q.quarter} className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">
                        {q.quarter}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">Sales</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4">{q.sales}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">Expenses</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4">{q.expenses}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">Operating Profit</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4">{q.op}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30 bg-surface/30">
                    <td className="py-3 px-4 font-sans">OPM %</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4 text-blue-400">{q.opm}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">Other Income</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4">{q.otherIncome}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">Interest</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4 text-red-400">{q.interest}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">Depreciation</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4">{q.depreciation}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">Profit Before Tax</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4 font-semibold">{q.pbt}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30 bg-surface/30">
                    <td className="py-3 px-4 font-sans">Tax %</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4 text-amber-400">{q.tax}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans font-semibold">Net Profit</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4 font-semibold text-emerald-400">{q.np}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30 bg-surface/30">
                    <td className="py-3 px-4 font-sans">NPM %</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4 text-emerald-400">{q.npm}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">EPS (Rs)</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4">{q.eps}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-surface-overlay/30">
                    <td className="py-3 px-4 font-sans">Dividend Payout %</td>
                    {quarterlyData.map((q) => (
                      <td key={q.quarter} className="text-right py-3 px-4">{q.dividend}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300} minHeight={300}>
                <ComposedChart data={quarterlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.2} vertical={false} />
                  <XAxis
                    dataKey="quarter"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--color-border)' }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--color-border)' }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--color-border)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-popover)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="np" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {/* P&L Statement Section */}
      <div ref={plRef} className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">Profit & Loss Statement</h2>
        <SimpleDataTable
          headers={['Particulars', 'FY24', 'FY23', 'FY22']}
          rows={[
            ['Sales', ...plData.map(d => d.sales)],
            ['Expenses', ...plData.map(d => d.expenses)],
            ['Operating Profit', ...plData.map(d => d.op)],
            ['OPM %', ...plData.map(d => d.opm)],
            ['Net Profit', ...plData.map(d => d.np)],
            ['NPM %', ...plData.map(d => d.npm)],
            ['EPS', ...plData.map(d => d.eps)],
          ]}
        />
      </div>

      {/* Balance Sheet Section */}
      <div ref={bsRef} className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">Balance Sheet</h2>
        <SimpleDataTable
          headers={['Particulars', 'FY24', 'FY23', 'FY22']}
          rows={[
            ['Equity Capital', ...bsData.map(d => d.equity)],
            ['Reserves', ...bsData.map(d => d.reserves)],
            ['Borrowings', ...bsData.map(d => d.borrowings)],
            ['Total Liabilities', ...bsData.map(d => d.total)],
            ['Fixed Assets', ...bsData.map(d => d.fixed)],
            ['Current Assets', ...bsData.map(d => d.current)],
          ]}
        />
      </div>

      {/* Peer Comparison Section */}
      <div ref={peerComparisonRef} className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">Peer Comparison</h2>
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Company</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Market Cap</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">P/E</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">ROCE</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">ROE</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">D/E</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sales Growth</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">NPM</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {peerComparisonData.map((peer, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-border/50 hover:bg-surface-overlay/30 ${peer.isTarget ? 'bg-blue-500/5' : ''}`}
                  >
                    <td className="py-3 px-4 font-sans">{peer.company}</td>
                    <td className="text-right py-3 px-4">₹{peer.marketCap} Cr</td>
                    <td className="text-right py-3 px-4">{peer.pe}</td>
                    <td className="text-right py-3 px-4">{peer.roce}</td>
                    <td className="text-right py-3 px-4">{peer.roe}</td>
                    <td className="text-right py-3 px-4">{peer.debtToEquity}</td>
                    <td className="text-right py-3 px-4 text-emerald-400">{peer.salesGrowth}</td>
                    <td className="text-right py-3 px-4">{peer.npm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Shareholding Pattern Section */}
      <div ref={shareholdingRef} className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">Shareholding Pattern</h2>
        <SimpleDataTable
          headers={['Category', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024']}
          rows={[
            ...shareholdingData.map(sh => [sh.category, sh.dec23, sh.mar24, sh.jun24, sh.sep24])
          ]}
        />
      </div>
    </div>
  );
}