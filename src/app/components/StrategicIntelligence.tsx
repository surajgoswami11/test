import { Sparkles, Target, Shield, Zap, Crown, Lightbulb, TrendingUp, Brain } from 'lucide-react';
import { Card, SectionHeader, Badge } from './SharedComponents';

export function StrategicIntelligence() {
  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <SectionHeader
        title="Strategic Intelligence"
        subtitle="AI-powered insights to position your company for maximum investor confidence"
        icon={Brain}
        action={
          <div className="flex flex-col gap-2 w-full">
            <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-600 border-0 text-white text-center text-xs px-3 py-1">
              PREMIUM
            </Badge>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all">
              <Sparkles className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        }
      />

      {/* Premium Feature Highlight */}
      <div className="relative">
        {/* Premium gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl opacity-20 blur-md" />
        <Card className="relative p-4 md:p-8 bg-[#09090B] border-2 border-amber-500/30">
          {/* Header with Premium Badge */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 md:mb-6 gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
                <Crown className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg md:text-xl font-semibold text-white">Strategic Intelligence Brief</h2>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">
                  Be 200% prepared for every analyst call and investor interaction
                </p>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs text-zinc-500">Last updated</p>
              <p className="text-xs font-mono text-zinc-400">Dec 18, 2025 • 14:32 IST</p>
            </div>
          </div>

          {/* Key Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* What Analysts Are Asking */}
            <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Target className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
                </div>
                <h3 className="text-sm md:text-base font-semibold">What Analysts Are Asking</h3>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="p-3 rounded-lg bg-surface/80 border border-border">
                  <p className="text-xs md:text-sm font-medium mb-2 text-blue-400">
                    "Why is the stock down 4.16% despite strong fundamentals?"
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Suggested Response:</span> "Today's decline reflects broader small-cap market correction (NIFTY -1.2%) and profit booking after our 42% YoY profit growth. Our fundamentals remain strong with expanding margins and improving FII interest (+62% QoQ)."
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface/80 border border-border">
                  <p className="text-xs md:text-sm font-medium mb-2 text-blue-400">
                    "Low delivery percentage (38.2%) suggests weak conviction?"
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Suggested Response:</span> "We're seeing natural profit-taking post-earnings. Note that FIIs increased stake by 62% QoQ to 1.02%, indicating strong institutional conviction. Promoter holding stable at 74.94% demonstrates unwavering confidence."
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-surface/80 border border-border">
                  <p className="text-xs md:text-sm font-medium mb-2 text-blue-400">
                    "How will ₹45 Cr Gujarat expansion impact margins?"
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Suggested Response:</span> "This strategic capex will increase capacity by 30% with automation driving 200bps margin improvement. ROI expected in 24 months. Timing is perfect as raw material costs are declining 3.5%."
                  </p>
                </div>
              </div>
            </div>

            {/* Competitive Positioning */}
            <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm md:text-base font-semibold">Competitive Advantages to Highlight</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-surface/80 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Valuation Arbitrage</p>
                      <p className="text-xs text-muted-foreground">
                        Trading at <span className="font-mono text-emerald-400">P/E 17.1</span> vs industry avg <span className="font-mono">28.2</span> – representing 39% discount despite superior growth metrics
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-surface/80 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Earnings Momentum</p>
                      <p className="text-xs text-muted-foreground">
                        Q2 net profit <span className="font-mono text-emerald-400">+42% YoY</span> vs Supreme Industries (+18%) – outpacing larger peers with better execution
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-surface/80 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Expanding Institutional Interest</p>
                      <p className="text-xs text-muted-foreground">
                        FII stake up <span className="font-mono text-emerald-400">62% QoQ</span> – smart money recognizing value before broader market discovery
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-surface/80 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-400">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Macro Tailwinds</p>
                      <p className="text-xs text-muted-foreground">
                        Raw material costs down 3.5% + PLI scheme expansion anticipated – perfect setup for margin expansion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Talking Points */}
          <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-violet-500/5 to-violet-500/10 border border-violet-500/20 mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
              </div>
              <h3 className="text-sm md:text-base font-semibold">Critical Talking Points for Next Investor Call</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="p-3 md:p-4 rounded-lg bg-surface/80 border border-border">
                <p className="text-xs text-violet-400 uppercase tracking-wide mb-2">Opening Strong</p>
                <p className="text-xs md:text-sm leading-relaxed">
                  "Despite market volatility, we delivered 42% profit growth and announced strategic ₹45 Cr expansion. Our P/E of 17.1 offers significant upside vs peers at 28+."
                </p>
              </div>
              <div className="p-3 md:p-4 rounded-lg bg-surface/80 border border-border">
                <p className="text-xs text-violet-400 uppercase tracking-wide mb-2">Reinforcing Confidence</p>
                <p className="text-xs md:text-sm leading-relaxed">
                  "Today's market presents exceptional value opportunity. FII stake up 62% QoQ demonstrates sophisticated investors' strong conviction in our fundamentals and execution excellence."
                </p>
              </div>
              <div className="p-3 md:p-4 rounded-lg bg-surface/80 border border-border">
                <p className="text-xs text-violet-400 uppercase tracking-wide mb-2">Forward Guidance</p>
                <p className="text-xs md:text-sm leading-relaxed">
                  "With raw material costs declining and capacity expansion underway, we're positioned for sustained margin improvement and market share gains through FY26."
                </p>
              </div>
            </div>
          </div>

          {/* Strategic Opportunity Positioning */}
          <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
              </div>
              <h3 className="text-sm md:text-base font-semibold">Strategic Market Positioning</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <p className="text-xs md:text-sm font-medium mb-2 md:mb-3 text-blue-400">Market Observations</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    <span className="text-muted-foreground">Technical indicators present attractive entry opportunity</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    <span className="text-muted-foreground">Natural profit-taking cycle creating value zone</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    <span className="text-muted-foreground">Sector interest diversifying across quality players</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    <span className="text-muted-foreground">Strategic capex timing provides competitive edge</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium mb-2 md:mb-3 text-emerald-400">Leadership Messaging</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span className="text-muted-foreground">RSI at 42.3 indicates optimal accumulation opportunity</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span className="text-muted-foreground">FII accumulation (+62%) validates long-term value thesis</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span className="text-muted-foreground">Leading industry peers in earnings growth trajectory</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span className="text-muted-foreground">Counter-cyclical expansion strengthens market leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border/50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs text-muted-foreground">
                  Intelligence refresh: <span className="font-mono">Real-time</span> • Next analyst call: <span className="font-mono">Dec 22, 2025</span>
                </p>
              </div>
              <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-initial px-3 md:px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-xs md:text-sm">
                  Export PDF
                </button>
                <button className="flex-1 md:flex-initial px-3 md:px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-xs md:text-sm">
                  Email to Team
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Strategic Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Sentiment Analysis */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-semibold">Market Sentiment Tracker</h3>
              <p className="text-xs text-muted-foreground">Social media & analyst sentiment analysis</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm">Twitter/X Mentions</span>
                <Badge variant="success">+23%</Badge>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">68% Positive sentiment</p>
            </div>
            <div className="p-3 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm">Analyst Coverage</span>
                <Badge variant="default">5 Reports</Badge>
              </div>
              <p className="text-xs text-muted-foreground">4 Buy, 1 Hold, 0 Sell</p>
            </div>
          </div>
        </Card>

        {/* Earnings Call Prep */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-semibold">Earnings Call Prep Kit</h3>
              <p className="text-xs text-muted-foreground">AI-generated scripts & Q&A preparation</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full p-3 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-left">
              <p className="text-xs md:text-sm font-medium mb-1">Opening Remarks Script</p>
              <p className="text-xs text-muted-foreground">2-3 minute prepared statement</p>
            </button>
            <button className="w-full p-3 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-left">
              <p className="text-xs md:text-sm font-medium mb-1">Anticipated Q&A (12 questions)</p>
              <p className="text-xs text-muted-foreground">With data-backed responses</p>
            </button>
            <button className="w-full p-3 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-left">
              <p className="text-xs md:text-sm font-medium mb-1">Key Metrics Cheat Sheet</p>
              <p className="text-xs text-muted-foreground">Quick reference card</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}