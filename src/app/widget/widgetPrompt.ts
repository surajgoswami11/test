import type { WidgetId } from "../types/widget.types";

export function buildWidgetPrompt(widgetId: WidgetId, inputs: any) {
  const symbol = inputs?.symbol || "UNKNOWN";

  switch (widgetId) {
    case "market_summary":
      return `
Give me basic company summary for stock symbol ${symbol}.
Include: business, key products, industries served, founded year, and listing symbol.
Keep it short and factual.
`.trim();

    case "market_pulse":
      return `
You are a finance news engine.

Return ONLY valid JSON (no markdown, no explanation).
Schema:
{
  "symbol": "${symbol}",
  "pulse": "Bullish|Bearish|Neutral",
  "confidence": 0.0,
  "news": {
    "social": [{ "headline": "", "source": "X", "sentiment": "Positive|Neutral|Negative", "date": "", "time": "" }],
    "ownCompany": [{ "headline": "", "source": "", "sentiment": "Positive|Neutral|Negative", "date": "", "time": "" }],
    "competitor": [{ "headline": "", "source": "", "sentiment": "Positive|Neutral|Negative", "date": "", "time": "" }],
    "market": [{ "headline": "", "source": "", "sentiment": "Positive|Neutral|Negative", "date": "", "time": "" }]
  }
}

Give 3 items per category.
`.trim();

    case "peer_comparison":
      return `
Give 6 competitor companies for ${symbol}.
For each competitor provide: CMP, PE, MarketCap, Dividend Yield (in INR).
Return as readable list.
`.trim();

    case "market_intelligence":
      return `
Give market intelligence for ${symbol}:
1) Price Target Analysis (one line)
2) Risk Assessment (one line)
3) Momentum Indicator (one line)
`.trim();

    case "analyst_questions":
      return `
Give 3 smart analyst questions for ${symbol} with suggested answers.
Keep answers 1-2 lines each.
`.trim();

    case "advantage_highlight":
      return `
Give advantages for ${symbol} in one line each:
1) Valuation Arbitrage
2) Earnings Momentum
3) Expanding Institutional Interest
4) Macro Tailwinds
`.trim();

    case "critical_investor_call":
      return `
Give investor call points for ${symbol}.
Provide:
- Market Observations (4-5 bullet points)
- Leadership Messaging (4-5 bullet points)
`.trim();

    case "call_prep_kit":
      return `
Give a call prep kit checklist for ${symbol} before press/news/live call.
Return 6-10 checklist points.
`.trim();

    case "market_positioning":
      return `
Give market positioning for ${symbol}.
Choose Defensive/Neutral/Aggressive and 3-5 reasons.
`.trim();

    case "market_sentiment":
      return `
Give market sentiment for ${symbol}.
Include Twitter/X mentions trend, analyst coverage sentiment.
Return simple summary.
`.trim();

    default:
      return `Give stock analysis for ${symbol}`.trim();
  }
}
