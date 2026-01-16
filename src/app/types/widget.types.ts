// export type WidgetId =
//   | "market_summary"
//   | "market_pulse"
//   | "peer_comparison"
//   | "market_intelligence"
//   | "analyst_questions"
//   | "advantage_highlight"
//   | "critical_investor_call"
//   | "market_positioning"
//   | "market_sentiment"
//   | "call_prep_kit";

// export type WidgetRequest<TInputs = any> = {
//   widgetId: WidgetId;
//   inputs: TInputs;
// };

// export type WidgetResponse<TData = any> = {
//   ok: boolean;
//   widgetId: WidgetId;
//   data?: TData;
//   error?: string;
//   meta?: any;
// };

// // ---------- Widget Data Contracts ----------

// export type StockSummaryData = {
//   title: string;
//   summary: string;
//   riskLevel: "Low" | "Medium" | "High";
// };

// export type StockNewsItem = {
//   headline: string;
//   source: string;
//   sentiment: "positive" | "neutral" | "negative";
// };

// export type StockNewsData = {
//   items: StockNewsItem[];
// };



export type WidgetId =
  | "market_summary"
  | "market_pulse"
  | "peer_comparison"
  | "market_intelligence"
  | "analyst_questions"
  | "advantage_highlight"
  | "critical_investor_call"
  | "market_positioning"
  | "market_sentiment"
  | "call_prep_kit";

export type WidgetRequest<TInputs = any> = {
  widgetId: WidgetId;
  inputs: TInputs;
  options?: {
    refresh?: boolean;
    cacheKey?: string;
    timeout?: number;
  };
};

export type WidgetResponse<TData = any> = {
  ok: boolean;
  widgetId: WidgetId;
  data?: TData;
  error?: string;
  meta?: {
    sources?: any[];
    stepsUsed?: any[];
    toolsUsed?: any[];
    cached?: boolean;
    responseTime?: number;
    aiProvider?: string;
  };
};

// Widget State Types
export type WidgetState<TData = any> = {
  data: TData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
};

// Widget Configuration Types
export type AIProvider = 'mify' | 'openai' | 'anthropic' | 'custom';

export type AIConfig = {
  provider: AIProvider;
  endpoint?: string;
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
};

// Widget-specific data contracts
export type StockSummaryData = {
  symbol: string;
  summary: string;
  foundedYear: number;
  keyProducts: string[];
  industriesServed: string[];
  riskLevel: "Low" | "Medium" | "High";
  sources?: any[];
};

export type MarketPulseData = {
  symbol: string;
  pulse: "Bullish" | "Bearish" | "Neutral";
  confidence: number;
  news: {
    social: Array<{
      headline: string;
      source: string;
      sentiment: "positive" | "neutral" | "negative";
      date: string;
      time: string;
    }>;
    ownCompany: Array<{
      headline: string;
      source: string;
      sentiment: "positive" | "neutral" | "negative";
      date: string;
      time: string;
    }>;
    competitor: Array<{
      headline: string;
      source: string;
      sentiment: "positive" | "neutral" | "negative";
      date: string;
      time: string;
    }>;
    market: Array<{
      headline: string;
      source: string;
      sentiment: "positive" | "neutral" | "negative";
      date: string;
      time: string;
    }>;
  };
  meta?: {
    analysisReport?: string;
    competitors?: any[];
    sources?: any[];
  };
};

export type PeerComparisonData = {
  rows: Array<{
    sno: number;
    name: string;
    cmp: number;
    pe: number;
    marketCap: string;
    divYield: number;
  }>;
};

export type MarketIntelligenceData = {
  priceTarget: string;
  riskAssessment: string;
  momentumIndicator: string;
};

export type AnalystQuestionsData = {
  questions: Array<{
    question: string;
    answer: string;
  }>;
};

export type AdvantageHighlightData = {
  advantages: {
    valuationArbitrage: string;
    earningsMomentum: string;
    institutionalInterest: string;
    macroTailwinds: string;
  };
};