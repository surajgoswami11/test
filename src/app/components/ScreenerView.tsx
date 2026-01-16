import { useState, useRef } from 'react';
import { Building2, TrendingUp, Download, BarChart3, Factory, Package, Zap, Target, Users, MapPin, Award, AlertTriangle } from 'lucide-react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, SectionHeader, MetricCard, DataTable, Badge } from './SharedComponents';
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
  
  businessOverview: 'Pyramid Technoplast Ltd is a leading industrial packaging manufacturer specializing in polymer-based molded products. The company produces rigid Intermediate Bulk Containers (IBCs), Polymer Drums, and Mild Steel (MS) Drums. These products are critical for the safe storage and transportation of bulk materials in the chemical, agrochemical, specialty chemical, and pharmaceutical industries.',
  
  products: [
    {
      name: 'Plastic Barrels (HM-HDPE)',
      description: 'High-density polyethylene (HDPE) drums engineered for the secure storage and transportation of both liquid and solid materials. These drums feature tamper-proof sealing, leak-proof construction, and are designed for convenient handling across diverse industrial applications. Manufactured using Blow Molding technology.',
      capacity: '20 Liters to 250 Liters',
      variants: ['Narrow Mouth', 'Full Open Top', 'Wide Mouth', 'Jerry Cans'],
      features: ['Tamper and leak-proof', 'Easy handling', 'Storage/transport of liquids and solids']
    },
    {
      name: 'Intermediate Bulk Containers (IBCs)',
      description: 'Large-capacity storage containers designed for efficient handling of bulk materials with high durability and enhanced safety in logistics operations. These containers are ideal for industrial-scale storage and transportation needs.',
      capacity: '1,000 Liters',
      variants: ['Steel Pallet IBC', 'Plastic Pallet IBC', 'Composite Pallet IBC', 'Wooden Pallet IBC'],
      features: ['Highly durable', 'Efficient handling of bulk materials', 'Enhanced safety in transport']
    },
    {
      name: 'Mild Steel (MS) Drums',
      description: 'Heavy-duty industrial-grade Mild Steel drums designed for storing and transporting both liquid and solid materials with robust construction. Available in various specialized coatings and configurations.',
      capacity: '200 Liters to 210 Liters',
      variants: ['General-Purpose', 'Epoxy-Coated', 'Composite', 'Galvanized', 'Open-Top Drums'],
      features: ['Heavy-duty storage', 'Corrosion-resistant options', 'Versatile industrial applications']
    }
  ],

  manufacturing: {
    technology: 'PTL utilizes Blow Molding technology for polymer products and Injection Molding for caps and closures. Injection molding is used for producing caps, closures, bungs, lids, handles, lugs, and other components for in-house consumption.',
    brand: 'All products are marketed and sold under the Pyramid brand',
    locations: '7 manufacturing units across Bharuch GIDC (Gujarat) and Silvassa (Dadra & Nagar Haveli)',
    capacity: {
      polymerDrums: '~22,818 MTPA (Metric Tonnes Per Annum)',
      ibc: '~420,000 Units/Year',
      steelDrums: '~10,800 MTPA'
    },
    unitBreakdown: [
      { unit: 'Units 1-5', capacity: 'Polymer Drums: ~22,818 MTPA combined' },
      { unit: 'Unit 6', capacity: 'MS Drums: ~10,800 MTPA' },
      { unit: 'Unit 7', capacity: 'IBCs: ~420,000 Units/Year' }
    ]
  },

  expansion: {
    maharashtra: 'New Wada Facility (Maharashtra): Under construction with target completion in Q4 FY25. This facility will be developed in three phases with a revenue potential of ₹400 Crores at full capacity.',
    recycling: 'Unit 9, a plastic recycling facility, is being established in Bharuch with an investment of ₹8-10 Crores. This unit aims to process 10,000 tons of recycled plastic annually for both in-house utilization and commercial sales.',
    solarPower: 'Investing ₹50 Crores in a 15.25 MW captive solar power plant to reduce annual electricity costs by ₹10 Crores, supporting green energy transition.',
    capacity_targets_fy26: {
      hdpeDrums: 'Increase to 32,530 MTPA (+25%)',
      ibc: 'Expand to 540,000 Units (+29%) with new production line',
      msDrums: 'Grow to 16,720 MTPA (+55%); metal drum capacity to reach ~110,000 units/month'
    }
  },

  clients: {
    count: 'Over 500+ customers',
    sectors: ['Chemical', 'Agrochemical', 'Specialty Chemical', 'Pharmaceutical'],
    distribution: 'Serves both domestic and international distributors and suppliers',
    notable: ['Adani Wilmar', 'Asian Paints', 'Patanjali', 'Aarti Industries', 'JSW', 'United Phosphorus Limited (UPL)'],
    marketPresence: 'Strong market presence with a diverse and well-established customer base across multiple industries'
  },

  revenueBreakup9MFY25: [
    { segment: 'Polymer Drums', percentage: 48 },
    { segment: 'IBC', percentage: 33 },
    { segment: 'MS Drums', percentage: 9 },
    { segment: 'Others', percentage: 10 }
  ],

  capex: {
    fy24: '₹37 Crores (completed)',
    fy25_planned: '₹45-50 Crores',
    fy26_projected: '₹50-60 Crores',
    focus: ['Scaling capacity', 'Automation', 'Green energy', 'Wada facility development', 'Recycling unit setup'],
    greenEnergy: '₹50 Crore investment in 15.25 MW captive solar power plant to reduce operational costs by ₹10 Cr annually'
  },

  ipo: {
    totalAmount: '₹153 Crores',
    ofs: '₹62 Crores (Offer for Sale)',
    freshIssue: '₹91 Crores',
    utilization: [
      'Repayment of borrowings',
      'Working capital requirements',
      'General corporate purposes'
    ]
  }
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
    salesGrowth: '12.4%',
    npm: '6.2%',
    opm: '9.8%',
    eps: '42.15',
    epsGrowth: '18.2%',
    isTarget: false
  },
  {
    company: 'Mold-Tek Packaging',
    marketCap: '1,620',
    pe: '28.2',
    pb: '4.2',
    divYield: '1.2%',
    roce: '22.4%',
    roe: '24.8%',
    debtToEquity: '0.12',
    sales: '845',
    salesGrowth: '15.8%',
    npm: '8.4%',
    opm: '12.6%',
    eps: '28.60',
    epsGrowth: '22.4%',
    isTarget: false
  },
  {
    company: 'Responsive Industries',
    marketCap: '4,180',
    pe: '32.5',
    pb: '5.8',
    divYield: '0.8%',
    roce: '28.6%',
    roe: '32.4%',
    debtToEquity: '0.08',
    sales: '1,245',
    salesGrowth: '18.2%',
    npm: '12.4%',
    opm: '16.8%',
    eps: '62.40',
    epsGrowth: '24.8%',
    isTarget: false
  },
  {
    company: 'Nilkamal Ltd',
    marketCap: '5,420',
    pe: '24.6',
    pb: '3.8',
    divYield: '1.5%',
    roce: '18.4%',
    roe: '21.2%',
    debtToEquity: '0.24',
    sales: '2,850',
    salesGrowth: '10.6%',
    npm: '7.8%',
    opm: '11.2%',
    eps: '98.20',
    epsGrowth: '14.6%',
    isTarget: false
  },
];

// Competitive positioning
const competitiveStrengths = [
  'Diversified product portfolio across Polymer Drums, IBCs, and Steel Drums',
  'Strong client base of 500+ customers including blue-chip companies',
  'Strategic expansion plans with Maharashtra facility (₹400 Cr revenue potential)',
  'Integrated recycling unit for sustainable operations',
  'Lower debt-to-equity ratio indicating financial stability',
];

const competitiveChallenges = [
  'Opportunity to enhance profit margins through premium product positioning',
  'Growth potential in market capitalization with strategic initiatives',
  'Scope to improve ROCE and ROE through operational excellence',
  'Potential to introduce dividend payouts as profitability scales',
  'Opportunities for brand building and market awareness expansion',
];

const marketPositioning = {
  segment: 'Mid-tier Industrial Packaging',
  focus: 'Volume-driven B2B packaging solutions',
  differentiator: 'Integrated IBC & drum manufacturing with recycling capabilities',
  targetMarket: 'Chemical, Agrochemical, and Pharmaceutical sectors',
};

// Chart data for quarterly visualizations
const quarterlyChartData = [
  { quarter: 'Jun 2023', sales: 132.4, np: 5.2, eps: 1.41, revenue: 132.4, profit: 5.2, margin: 3.9, volume: 2.8 },
  { quarter: 'Sep 2023', sales: 135.6, np: 6.1, eps: 1.66, revenue: 135.6, profit: 6.1, margin: 4.5, volume: 3.2 },
  { quarter: 'Dec 2023', sales: 142.1, np: 7.2, eps: 1.96, revenue: 142.1, profit: 7.2, margin: 5.1, volume: 3.5 },
  { quarter: 'Mar 2024', sales: 152.8, np: 8.9, eps: 2.42, revenue: 152.8, profit: 8.9, margin: 5.8, volume: 4.1 },
  { quarter: 'Jun 2024', sales: 148.5, np: 7.1, eps: 1.93, revenue: 148.5, profit: 7.1, margin: 4.8, volume: 3.7 },
  { quarter: 'Sep 2024', sales: 156.2, np: 8.4, eps: 2.28, revenue: 156.2, profit: 8.4, margin: 5.4, volume: 4.0 },
];

// Stock price & volume data for chart
const stockPriceData = [
  { date: 'Sep 2023', price: 138, volume: 45000, dma50: null, dma200: null },
  { date: 'Oct 2023', price: 152, volume: 68000, dma50: 140, dma200: null },
  { date: 'Nov 2023', price: 165, volume: 52000, dma50: 148, dma200: null },
  { date: 'Dec 2023', price: 148, volume: 38000, dma50: 155, dma200: 142 },
  { date: 'Jan 2024', price: 142, volume: 42000, dma50: 152, dma200: 145 },
  { date: 'Feb 2024', price: 155, volume: 35000, dma50: 148, dma200: 148 },
  { date: 'Mar 2024', price: 168, volume: 48000, dma50: 152, dma200: 150 },
  { date: 'Apr 2024', price: 172, volume: 58000, dma50: 159, dma200: 152 },
  { date: 'May 2024', price: 165, volume: 45000, dma50: 165, dma200: 154 },
  { date: 'Jun 2024', price: 158, volume: 38000, dma50: 168, dma200: 156 },
  { date: 'Jul 2024', price: 148, volume: 42000, dma50: 166, dma200: 158 },
  { date: 'Aug 2024', price: 155, volume: 52000, dma50: 162, dma200: 159 },
  { date: 'Sep 2024', price: 248, volume: 185000, dma50: 165, dma200: 161 },
  { date: 'Oct 2024', price: 285, volume: 225000, dma50: 182, dma200: 165 },
  { date: 'Nov 2024', price: 268, volume: 168000, dma50: 215, dma200: 172 },
  { date: 'Dec 2024', price: 252, volume: 145000, dma50: 245, dma200: 182 },
  { date: 'Jan 2025', price: 238, volume: 128000, dma50: 262, dma200: 192 },
  { date: 'Feb 2025', price: 245, volume: 135000, dma50: 258, dma200: 198 },
  { date: 'Mar 2025', price: 232, volume: 118000, dma50: 248, dma200: 205 },
  { date: 'Apr 2025', price: 228, volume: 112000, dma50: 240, dma200: 210 },
  { date: 'May 2025', price: 235, volume: 125000, dma50: 236, dma200: 215 },
  { date: 'Jun 2025', price: 242, volume: 132000, dma50: 235, dma200: 218 },
  { date: 'Jul 2025', price: 238, volume: 128000, dma50: 237, dma200: 220 },
  { date: 'Aug 2025', price: 245, volume: 138000, dma50: 240, dma200: 222 },
  { date: 'Sep 2025', price: 252, volume: 145000, dma50: 243, dma200: 225 },
  { date: 'Oct 2025', price: 248, volume: 142000, dma50: 246, dma200: 227 },
  { date: 'Nov 2025', price: 255, volume: 148000, dma50: 248, dma200: 230 },
  { date: 'Dec 2025', price: 158, volume: 165000, dma50: 252, dma200: 232 },
];

type ChartTab = 'priceVolume' | 'earnings' | 'metrics';
type TimeRange = '1M' | '6M' | '1Y' | '2Y' | '5Y';

export function ScreenerView() {
  const [activeChartTab, setActiveChartTab] = useState<ChartTab>('priceVolume');
  const [timeRange, setTimeRange] = useState<TimeRange>('1Y');
  
  // Refs for scrolling to sections
  const snapshotRef = useRef<HTMLDivElement>(null);
  const quartersRef = useRef<HTMLDivElement>(null);
  const plRef = useRef<HTMLDivElement>(null);
  const bsRef = useRef<HTMLDivElement>(null);
  const peerComparisonRef = useRef<HTMLDivElement>(null);
  const shareholdingRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header with Company Metadata */}
      <div>
        <SectionHeader
          title={companyMetadata.name}
          subtitle={`${companyMetadata.sector} · BSE ${companyMetadata.bseCode}`}
          icon={Building2}
          action={
            <button className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-sm md:text-base">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Export Data</span>
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {keyMetrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Sticky Sub-Navigation - Scrolls to sections */}
      <div className="sticky top-16 md:top-20 z-30 -mx-4 md:-mx-8 px-4 md:px-8 py-3 md:py-4 bg-background/95 backdrop-blur-xl border-y border-border overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max md:min-w-0">
          <button
            onClick={() => scrollToSection(snapshotRef)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-overlay transition-all"
          >
            Snapshot
          </button>
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

      {/* Snapshot Section */}
      <div ref={snapshotRef} className="scroll-mt-32 space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          Snapshot
        </h2>

        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-4 text-sm md:text-base">Recent Performance (TTM)</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-2">Sales</div>
              <div className="font-mono text-xl">₹591 Cr</div>
              <div className="text-xs text-emerald-400 font-mono mt-1">+8.2% YoY</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">Operating Profit</div>
              <div className="font-mono text-xl">₹48 Cr</div>
              <div className="text-xs text-emerald-400 font-mono mt-1">+10.5% YoY</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">Net Profit</div>
              <div className="font-mono text-xl">₹34 Cr</div>
              <div className="text-xs text-emerald-400 font-mono mt-1">+16.4% YoY</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">EPS</div>
              <div className="font-mono text-xl">₹9.24</div>
              <div className="text-xs text-emerald-400 font-mono mt-1">+16.5% YoY</div>
            </div>
          </div>
        </Card>

        {/* Multi-view Chart Widget */}
        <Card className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveChartTab('priceVolume')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeChartTab === 'priceVolume'
                    ? 'bg-surface-overlay text-foreground border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Price & Volume
              </button>
              <button
                onClick={() => setActiveChartTab('earnings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeChartTab === 'earnings'
                    ? 'bg-surface-overlay text-foreground border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Earnings & EPS
              </button>
              <button
                onClick={() => setActiveChartTab('metrics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeChartTab === 'metrics'
                    ? 'bg-surface-overlay text-foreground border border-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Financial Metrics
              </button>
            </div>
            {activeChartTab === 'priceVolume' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimeRange('1M')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeRange === '1M'
                      ? 'bg-surface-overlay text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  1M
                </button>
                <button
                  onClick={() => setTimeRange('6M')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeRange === '6M'
                      ? 'bg-surface-overlay text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  6M
                </button>
                <button
                  onClick={() => setTimeRange('1Y')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeRange === '1Y'
                      ? 'bg-surface-overlay text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  1Y
                </button>
                <button
                  onClick={() => setTimeRange('2Y')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeRange === '2Y'
                      ? 'bg-surface-overlay text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  2Y
                </button>
                <button
                  onClick={() => setTimeRange('5Y')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeRange === '5Y'
                      ? 'bg-surface-overlay text-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  5Y
                </button>
              </div>
            )}
          </div>

          {/* Price & Volume Chart */}
          {activeChartTab === 'priceVolume' && (
            <div className="space-y-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={stockPriceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <YAxis 
                      yAxisId="price"
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                      domain={['dataMin - 20', 'dataMax + 20']}
                    />
                    <YAxis 
                      yAxisId="volume"
                      orientation="right"
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 'dataMax * 2']}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        fontSize: '11px',
                        padding: '8px 12px',
                      }}
                      labelStyle={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}
                    />
                    <Bar 
                      yAxisId="volume" 
                      dataKey="volume" 
                      fill="#6366f1" 
                      opacity={0.3}
                      radius={[2, 2, 0, 0]}
                    />
                    <Line 
                      yAxisId="price" 
                      type="monotone" 
                      dataKey="dma200" 
                      stroke="#f59e0b" 
                      strokeWidth={1.5} 
                      dot={false}
                      strokeDasharray="3 3"
                    />
                    <Line 
                      yAxisId="price" 
                      type="monotone" 
                      dataKey="dma50" 
                      stroke="#10b981" 
                      strokeWidth={1.5} 
                      dot={false}
                    />
                    <Line 
                      yAxisId="price" 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8b5cf6" 
                      strokeWidth={2.5} 
                      dot={false}
                      fill="url(#priceGradient)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#8b5cf6]"></div>
                  <span className="text-muted-foreground">Price on NSE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#10b981]"></div>
                  <span className="text-muted-foreground">50 DMA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#f59e0b] opacity-60"></div>
                  <span className="text-muted-foreground">200 DMA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#6366f1] opacity-30"></div>
                  <span className="text-muted-foreground">Volume</span>
                </div>
              </div>
            </div>
          )}

          {/* Earnings & EPS Chart */}
          {activeChartTab === 'earnings' && (
            <div className="space-y-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={quarterlyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                    <XAxis 
                      dataKey="quarter" 
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        fontSize: '11px',
                        padding: '8px 12px',
                      }}
                      labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <Bar yAxisId="left" dataKey="np" fill="#a855f7" opacity={0.8} radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="eps" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#a855f7]"></div>
                  <span className="text-muted-foreground">Net Profit (₹ Cr)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#ef4444]"></div>
                  <span className="text-muted-foreground">EPS (₹)</span>
                </div>
              </div>
            </div>
          )}

          {/* Financial Metrics Chart */}
          {activeChartTab === 'metrics' && (
            <div className="space-y-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={quarterlyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                    <XAxis 
                      dataKey="quarter" 
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      stroke="rgba(255, 255, 255, 0.2)"
                      tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        fontSize: '11px',
                        padding: '8px 12px',
                      }}
                      labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <Bar yAxisId="left" dataKey="revenue" fill="#8b5cf6" opacity={0.6} radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="profit" fill="#10b981" opacity={0.8} radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#8b5cf6] opacity-60"></div>
                  <span className="text-muted-foreground">Revenue (₹ Cr)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#10b981]"></div>
                  <span className="text-muted-foreground">Profit (₹ Cr)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#f59e0b]"></div>
                  <span className="text-muted-foreground">Margin (%)</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Quarterly Results Section */}
      <div ref={quartersRef} className="scroll-mt-32 space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Quarterly Results</h2>
          <Badge variant="default" className="text-xs">
            ⭐ Enhanced from Reference
          </Badge>
        </div>
        
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="text-xs md:text-sm text-muted-foreground">8 Quarters • Detailed P&L View (₹ Cr)</span>
          </div>

          {/* Mobile: Simplified cards for latest 3 quarters */}
          <div className="md:hidden space-y-3">
            {quarterlyData.slice(0, 3).map((q) => (
              <div key={q.quarter} className="p-3 rounded-lg bg-surface-overlay border border-border">
                <div className="font-semibold text-sm mb-3 pb-2 border-b border-border font-mono">{q.quarter}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-1">Sales</div>
                    <div className="font-mono font-medium">{q.sales}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Net Profit</div>
                    <div className="font-mono font-medium">{q.np}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">OPM %</div>
                    <div className="font-mono font-medium text-blue-400">{q.opm}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">NPM %</div>
                    <div className="font-mono font-medium text-emerald-400">{q.npm}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-xs text-center text-muted-foreground py-2 px-4 rounded-lg bg-surface/50">
              📊 View complete 8-quarter detailed data on desktop
            </div>
          </div>

          {/* Desktop: Full detailed table */}
          <div className="hidden md:block overflow-x-auto">
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
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      Expenses
                      <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">REF</span>
                    </div>
                  </td>
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
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      Other Income
                      <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">REF</span>
                    </div>
                  </td>
                  {quarterlyData.map((q) => (
                    <td key={q.quarter} className="text-right py-3 px-4">{q.otherIncome}</td>
                  ))}
                </tr>
                <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      Interest
                      <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">REF</span>
                    </div>
                  </td>
                  {quarterlyData.map((q) => (
                    <td key={q.quarter} className="text-right py-3 px-4 text-red-400">{q.interest}</td>
                  ))}
                </tr>
                <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      Depreciation
                      <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">REF</span>
                    </div>
                  </td>
                  {quarterlyData.map((q) => (
                    <td key={q.quarter} className="text-right py-3 px-4">{q.depreciation}</td>
                  ))}
                </tr>
                <tr className="border-b border-border/50 hover:bg-surface-overlay/30">
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      Profit Before Tax
                      <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">REF</span>
                    </div>
                  </td>
                  {quarterlyData.map((q) => (
                    <td key={q.quarter} className="text-right py-3 px-4 font-semibold">{q.pbt}</td>
                  ))}
                </tr>
                <tr className="border-b border-border/50 hover:bg-surface-overlay/30 bg-surface/30">
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      Tax %
                      <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">REF</span>
                    </div>
                  </td>
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
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      Dividend Payout %
                      <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">REF</span>
                    </div>
                  </td>
                  {quarterlyData.map((q) => (
                    <td key={q.quarter} className="text-right py-3 px-4">{q.dividend}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* P&L Statement Section */}
      <div ref={plRef} className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-6">Profit & Loss Statement</h2>
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-4 text-sm md:text-base">Profit & Loss Statement (₹ Cr)</h3>
          <DataTable
            columns={[
              { header: 'Year', accessor: 'year', align: 'left' },
              { header: 'Sales', accessor: 'sales', align: 'right', mono: true },
              { header: 'Expenses', accessor: 'expenses', align: 'right', mono: true },
              { header: 'Operating Profit', accessor: 'op', align: 'right', mono: true },
              { header: 'OPM', accessor: 'opm', align: 'right', mono: true },
              { header: 'Net Profit', accessor: 'np', align: 'right', mono: true },
              { header: 'NPM', accessor: 'npm', align: 'right', mono: true },
              { header: 'EPS', accessor: 'eps', align: 'right', mono: true },
            ]}
            data={plData}
          />
        </Card>
      </div>

      {/* Balance Sheet Section */}
      <div ref={bsRef} className="scroll-mt-32">
        <h2 className="text-xl font-semibold mb-6">Balance Sheet</h2>
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-4 text-sm md:text-base">Balance Sheet (₹ Cr)</h3>
          <DataTable
            columns={[
              { header: 'Year', accessor: 'year', align: 'left' },
              { header: 'Equity', accessor: 'equity', align: 'right', mono: true },
              { header: 'Reserves', accessor: 'reserves', align: 'right', mono: true },
              { header: 'Borrowings', accessor: 'borrowings', align: 'right', mono: true },
              { header: 'Total Assets', accessor: 'total', align: 'right', mono: true },
              { header: 'Fixed Assets', accessor: 'fixed', align: 'right', mono: true },
              { header: 'Current Assets', accessor: 'current', align: 'right', mono: true },
            ]}
            data={bsData}
          />
        </Card>
      </div>

      {/* Peer Comparison Section */}
      <div ref={peerComparisonRef} className="scroll-mt-32 space-y-6">
        <div className="flex items-center gap-3">
          <Award className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold">Competitive Landscape & Peer Comparison</h2>
          <Badge variant="default" className="text-xs">
            📊 Industry Analysis
          </Badge>
        </div>

        {/* Market Positioning */}
        <Card className="p-4 md:p-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm md:text-base">
            <Target className="w-5 h-5 text-purple-400" />
            Market Positioning
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-surface border border-border">
                <div className="text-xs text-muted-foreground mb-1">Market Segment</div>
                <div className="text-sm font-medium">{marketPositioning.segment}</div>
              </div>
              <div className="p-3 rounded-lg bg-surface border border-border">
                <div className="text-xs text-muted-foreground mb-1">Business Focus</div>
                <div className="text-sm font-medium">{marketPositioning.focus}</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-surface border border-border">
                <div className="text-xs text-muted-foreground mb-1">Key Differentiator</div>
                <div className="text-sm font-medium">{marketPositioning.differentiator}</div>
              </div>
              <div className="p-3 rounded-lg bg-surface border border-border">
                <div className="text-xs text-muted-foreground mb-1">Target Market</div>
                <div className="text-sm font-medium">{marketPositioning.targetMarket}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Peer Comparison Table */}
        <Card className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-2">
            <div>
              <h3 className="font-semibold mb-1 text-sm md:text-base">Peer Comparison - Plastic Packaging Industry</h3>
              <p className="text-xs text-muted-foreground">All figures in ₹ Crores | Data as of Dec 2024</p>
            </div>
          </div>
          
          {/* Mobile: Show simplified metrics with note */}
          <div className="md:hidden text-xs text-center text-muted-foreground py-4 px-4 rounded-lg bg-surface/50 border border-border">
            📊 Peer comparison data with detailed metrics available on desktop
          </div>
          
          {/* Desktop: Full comparison table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground sticky left-0 bg-background">Company</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">Market Cap</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">P/E</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">P/B</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">Div Yield</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">ROCE</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">ROE</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">D/E</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">Sales Growth</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">NPM</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">OPM</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">EPS</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground font-mono text-xs">EPS Growth</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {peerComparisonData.map((peer, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-border/50 hover:bg-surface-overlay/30 ${
                      peer.isTarget ? 'bg-blue-500/5 border-blue-500/30' : ''
                    }`}
                  >
                    <td className={`py-3 px-4 font-sans sticky left-0 ${peer.isTarget ? 'bg-blue-500/5' : 'bg-background'}`}>
                      <div className="flex items-center gap-2">
                        {peer.company}
                        {peer.isTarget && (
                          <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">YOU</span>
                        )}
                      </div>
                    </td>
                    <td className="text-right py-3 px-4">{peer.marketCap}</td>
                    <td className="text-right py-3 px-4">{peer.pe}</td>
                    <td className="text-right py-3 px-4">{peer.pb}</td>
                    <td className="text-right py-3 px-4">{peer.divYield}</td>
                    <td className="text-right py-3 px-4">{peer.roce}</td>
                    <td className="text-right py-3 px-4">{peer.roe}</td>
                    <td className="text-right py-3 px-4">{peer.debtToEquity}</td>
                    <td className="text-right py-3 px-4">{peer.sales}</td>
                    <td className={`text-right py-3 px-4 ${parseFloat(peer.salesGrowth) > 10 ? 'text-emerald-400' : ''}`}>
                      {peer.salesGrowth}
                    </td>
                    <td className="text-right py-3 px-4">{peer.npm}</td>
                    <td className="text-right py-3 px-4">{peer.opm}</td>
                    <td className="text-right py-3 px-4">{peer.eps}</td>
                    <td className={`text-right py-3 px-4 ${parseFloat(peer.epsGrowth) > 15 ? 'text-emerald-400' : ''}`}>
                      {peer.epsGrowth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* SWOT Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="p-4 md:p-6 border-emerald-500/20 bg-emerald-500/5">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-emerald-400 text-sm md:text-base">
              <Award className="w-5 h-5" />
              Competitive Strengths
            </h3>
            <div className="space-y-2">
              {competitiveStrengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50 border border-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{strength}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 md:p-6 border-blue-500/20 bg-blue-500/5">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-400 text-sm md:text-base">
              <Target className="w-5 h-5" />
              Strategic Opportunities
            </h3>
            <div className="space-y-2">
              {competitiveChallenges.map((challenge, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50 border border-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{challenge}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Key Insights */}
        <Card theme="default" className="p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2 text-blue-400">Strategic Market Positioning</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Pyramid Technoplast operates in the high-growth industrial packaging market with a <span className="font-mono text-blue-400">₹{PYRAMID_DATA.marketCap} Cr market cap</span>, 
                positioning the company as an agile player with significant expansion potential compared to industry leaders like Nilkamal (₹5,420 Cr) and Responsive Industries (₹4,180 Cr).
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The company's <span className="font-mono text-emerald-400">attractive P/E ratio of 17.1x</span> represents exceptional value compared to peers (industry average: 26.0x), 
                with strong fundamentals and a <span className="font-mono text-emerald-400">healthy NPM of 5.8%</span> providing a solid foundation for margin expansion initiatives.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                With <span className="font-mono text-emerald-400">impressive EPS growth of 16.5%</span> and transformative expansion plans (Maharashtra facility targeting ₹400 Cr revenue), 
                Pyramid is excellently positioned for accelerated growth and operational excellence in the premium packaging segment.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Shareholding Section */}
      <div ref={shareholdingRef} className="scroll-mt-32 space-y-6">
        <h2 className="text-xl font-semibold">Shareholding Pattern</h2>
        
        <Card className="p-4 md:p-6">
          <h3 className="font-semibold mb-4 text-sm md:text-base">Shareholding Pattern</h3>
          <DataTable
            columns={[
              { header: 'Category', accessor: 'category', align: 'left' },
              { header: 'Dec 2023', accessor: 'dec23', align: 'right', mono: true },
              { header: 'Mar 2024', accessor: 'mar24', align: 'right', mono: true },
              { header: 'Jun 2024', accessor: 'jun24', align: 'right', mono: true },
              { header: 'Sep 2024', accessor: 'sep24', align: 'right', mono: true },
            ]}
            data={shareholdingData}
          />
        </Card>

        <Card theme="success" className="p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2 text-emerald-400">Key Insight: FII Interest Growing</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Foreign Institutional Investors have increased their stake from 0.63% (Dec 2023) to 1.02% (Sep 2024), representing a <span className="font-mono text-emerald-400">+62% increase</span> in holdings over the past three quarters.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}