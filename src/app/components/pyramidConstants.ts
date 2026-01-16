// Pyramid Technoplast Ltd - Master Data Constants
// Single source of truth for all company metrics
// Last updated: Dec 25, 2024

// Share Capital: 3.52 Cr shares (from BSE data)
// At ₹165.24 price: Market Cap = 3.52 × 165.24 ≈ ₹581.64 Cr
// Rounded to ₹582 Cr for current price

export const PYRAMID_DATA = {
  // Stock Data
  currentPrice: 165.24,
  openPrice: 163.85,
  dayHigh: 166.50,
  dayLow: 163.20,
  priceChange: 1.39,
  priceChangePercent: 0.85, // (1.39 / 163.85) * 100
  
  // Share Capital
  outstandingShares: 3.52, // in Crores
  
  // Financial Metrics
  marketCap: 582, // in Crores (3.52 Cr shares × ₹165.24)
  marketCapChange: 0.85, // % change (same as price change)
  peRatio: 17.10,
  pbRatio: 2.63,
  eps: 9.24,
  roe: 15.4,
  roce: 12.8,
  divYield: 0.0,
  debtToEquity: 0.42,
  
  // Growth Metrics
  salesGrowth: 8.2,
  profitGrowth: 16.5,
  epsGrowth: 16.5,
  
  // Company Info
  name: 'Pyramid Technoplast Ltd',
  bseCode: '543969',
  nseSymbol: 'PYRAMID',
  isin: 'INE0D2M01022',
  sector: 'Plastic Products & Packaging',
  industry: 'Plastic Products',
  
  // Shareholding
  promoterHolding: 74.94,
  fiiHolding: 1.02,
  diiHolding: 3.08,
  publicHolding: 20.96,
} as const;

// Format market cap with currency
export const getFormattedMarketCap = () => `₹${PYRAMID_DATA.marketCap} Cr`;