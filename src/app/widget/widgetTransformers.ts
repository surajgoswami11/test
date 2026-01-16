import type { WidgetId } from "../types/widget.types";

// helper: number parsing
function toNumber(val: any) {
  if (val == null) return 0;
  if (typeof val === "number") return val;

  const cleaned = String(val).replace(/[^\d.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

// helper: sentiment normalize
function normalizeSentiment(text: string): "positive" | "neutral" | "negative" {
  const t = text.toLowerCase();
  if (t.includes("bull") || t.includes("positive")) return "positive";
  if (t.includes("bear") || t.includes("negative")) return "negative";
  return "neutral";
}

export function transformWidget(widgetId: WidgetId, raw: any, inputs: any) {
  const symbol = inputs?.symbol || "UNKNOWN";
  const answerText: string = raw?.answer || raw?.data?.answer || "";

  // ✅ market_summary → JSON
  if (widgetId === "market_summary") {
    const yearMatch = answerText.match(/\b(19\d{2}|20\d{2})\b/);
    const foundedYear = yearMatch ? Number(yearMatch[0]) : 0;

    const keyProducts: string[] = [];
    if (answerText.toLowerCase().includes("ibc"))
      keyProducts.push("Rigid IBCs");
    if (answerText.toLowerCase().includes("polymer"))
      keyProducts.push("Polymer drums");
    if (
      answerText.toLowerCase().includes("mild steel") ||
      answerText.toLowerCase().includes("ms")
    )
      keyProducts.push("MS drums");

    const industries: string[] = [];
    if (answerText.toLowerCase().includes("chemical"))
      industries.push("Chemical");
    if (answerText.toLowerCase().includes("agrochemical"))
      industries.push("Agrochemical");
    if (answerText.toLowerCase().includes("pharmaceutical"))
      industries.push("Pharmaceutical");
    if (answerText.toLowerCase().includes("specialty chemical"))
      industries.push("Specialty Chemical");

    return {
      symbol,
      foundedYear,
      summary: answerText.slice(0, 220),
      keyProducts: Array.from(new Set(keyProducts)),
      industriesServed: Array.from(new Set(industries)),
      sources: raw?.sources || [],
    };
  }

  // ✅ peer_comparison → JSON (basic parsing)
  if (widgetId === "peer_comparison") {
    // If your backend already returns competitor array, use it
    const competitors = raw?.data?.competitors || raw?.competitors || [];

    if (Array.isArray(competitors) && competitors.length > 0) {
      return {
        rows: competitors.slice(0, 6).map((c: any, idx: number) => ({
          sno: idx + 1,
          name: c?.name || "Unknown",
          cmp: toNumber(c?.cmp),
          pe: toNumber(c?.pe),
          marketCap: toNumber(c?.marketCap),
          divYield: toNumber(c?.DIVYld),
        })),
      };
    }

    // fallback: if only text exists
    return { rows: [] };
  }

  if (widgetId === "market_pulse") {
    const answerText: string = raw?.answer || "";

    // Try JSON parse first
    try {
      const parsed = JSON.parse(answerText);

      return {
        symbol: parsed.symbol || symbol,
        pulse: parsed.pulse || "Neutral",
        confidence: parsed.confidence ?? 0.7,
        news: parsed.news || {
          social: [],
          ownCompany: [],
          competitor: [],
          market: [],
        },
        sources: raw?.sources || [],
      };
    } catch (e) {
      // fallback if AI returns plain text
      return {
        symbol,
        pulse: "Neutral",
        confidence: 0.7,
        news: { social: [], ownCompany: [], competitor: [], market: [] },
        answer: answerText,
        sources: raw?.sources || [],
      };
    }
  }
}
