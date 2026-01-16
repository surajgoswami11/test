import { useState } from 'react';
import { Target, TrendingUp, Shield, Sparkles, Users, Building2, Trophy, Wallet, Lock, Unlock, Copy, Download, CheckCircle2, Eye, Zap, AlertCircle, X, Search, ArrowUp, Clock, Activity, BarChart3, Flame, TrendingDown, Plus, RefreshCw, Twitter, MessageCircle, Heart, Repeat2, ExternalLink } from 'lucide-react';
import { Card, Badge } from './SharedComponents';
import { PYRAMID_DATA } from './pyramidConstants';
import { InvestorEngagementStudio } from './InvestorEngagementStudio';

// Real Investor Opportunities for Pyramid Technoplast Ltd
const opportunities = {
  hotLeads: [
    {
      id: 'target-402',
      tier: 'Tier-1 Mumbai Small Cap Fund',
      name: 'Quant Mutual Fund',
      logo: '🎯',
      keyPerson: 'Sandeep Tandon',
      role: 'CIO',
      fundSize: '₹12,500 Cr AUM',
      matchScore: 98,
      badges: ['Holds Competitor', 'Fresh Capital Available'],
      recentMove: 'Increased Time Technoplast stake by 1.2% in Q4',
      insight: 'This fund is hunting for "Margin Safety". They missed the rally in your peer group. You are the perfect catch-up trade.',
      signal: 'high-potential',
      recentActivity: true,
      strategy: `Subject: Industrial Packaging Play - Pyramid Technoplast

Dear Sandeep,

I hope this message finds you well. I noticed that Quant Mutual Fund recently increased its position in Time Technoplast, demonstrating your conviction in the industrial packaging sector.

**Why Pyramid Technoplast is Your Next Move:**

Given Quant's focus on adaptive manufacturing and chemicals proxies, Pyramid represents a compelling diversification opportunity in your packaging portfolio:

• **Faster Growth**: +21% YoY revenue vs Time Technoplast's +15%
• **Better Margins**: 40% ROCE vs industry average of 32%
• **Valuation Arbitrage**: P/E of ${PYRAMID_DATA.peRatio} vs Time Technoplast at 28.2
• **Expansion Catalyst**: Wada facility commissioned + 6 MW solar (operational)

**The Numbers:**
• Market Cap: ₹${PYRAMID_DATA.marketCap} Cr (easier to build meaningful position)
• Debt/Equity: 0.42 (vs Time's 0.68)
• Promoter Holding: 74.94% (zero pledge)
• DII Interest: +0.47% in last quarter (smart money accumulating)

**Why Now:**
The stock trades at a 40% discount to peers despite superior ROCE and lower leverage. Your entry at current levels offers both value and growth.

I would welcome the opportunity to discuss this in detail at your convenience.

Best regards,
CEO Office
Pyramid Technoplast Ltd
BSE: 543969 | NSE: PYRAMID`,
    },
    {
      id: 'target-305',
      tier: 'Tier-1 Anchor Investor',
      name: 'Carnelian Asset Management',
      logo: '💎',
      keyPerson: 'Vikas Khemani',
      role: 'Founder',
      fundSize: '₹8,200 Cr AUM',
      matchScore: 96,
      badges: ['IPO Anchor', 'Follow-On Pattern'],
      recentMove: 'Anchored IPO with ₹15 Cr allocation',
      insight: 'They run the "Structural Shift Fund" which loves manufacturing/infrastructure themes. Post-IPO execution is key.',
      signal: 'worth-exploring',
      recentActivity: false,
      strategy: `Subject: Post-IPO Progress Update - Pyramid Technoplast

Dear Vikas,

Thank you for your support as an anchor investor in our IPO (August 2023). I wanted to update you on our execution and discuss a follow-on opportunity.

**Post-IPO Achievements:**

✓ Wada facility now fully operational (capacity doubled)
✓ 6 MW solar plant commissioned (cost reduction + ESG story)
✓ Revenue growth accelerated to 21% YoY (vs 15% pre-IPO)
✓ Institutional accumulation: DIIs +0.47%, FIIs entered at 1.04%

**Why This is the Right Time to Increase Allocation:**

• **Proven Execution**: We delivered on IPO promises (capacity + solar)
• **Margin Expansion**: ROCE improved from 38% to 40%
• **Valuation**: Still trading at P/E ${PYRAMID_DATA.peRatio} vs industry 28.2
• **Momentum**: Stock forming higher lows, institutional interest building

**The Follow-On Case:**
Your initial anchor position has proven prescient. The structural shift in industrial packaging (sustainability + Make in India) is accelerating. Current valuation offers compelling entry for increasing position size.

I would be delighted to arrange a facility visit or detailed presentation at your convenience.

Best regards,
CEO Office
Pyramid Technoplast Ltd`,
    },
  ],
  patternMatchers: [
    {
      id: 'target-508',
      tier: 'Large Cap DII - Small Cap Fund',
      name: 'HDFC Mutual Fund',
      logo: '🏦',
      keyPerson: 'Fund Manager - Small Cap',
      role: 'Investment Team',
      fundSize: '₹45,000 Cr AUM (Small Cap)',
      matchScore: 94,
      badges: ['Holds Time Techno', 'Sector Focused'],
      recentMove: 'Holds 4.2% in Time Technoplast',
      insight: 'They like "boring" B2B manufacturing leaders with predictable cash flows. Portfolio diversification opportunity.',
      signal: 'high-potential',
      recentActivity: true,
      strategy: `Subject: Portfolio Diversification - Industrial Packaging Sector

Dear HDFC Small Cap Team,

I hope this message finds you well. I noticed that HDFC Small Cap Fund holds a significant position in Time Technoplast, demonstrating your conviction in the industrial packaging sector.

**Peer Portfolio Diversification Play:**

Pyramid Technoplast offers a compelling diversification opportunity within your packaging holdings:

**Why Add Pyramid:**
• **Faster Growth**: Revenue +21% YoY vs Time Technoplast +15%
• **Better ROCE**: 40% vs Time's 32% (disciplined capital allocation)
• **Lower Entry**: P/E ${PYRAMID_DATA.peRatio} vs Time at 28.2 (40% discount)
• **Smaller Size**: ₹${PYRAMID_DATA.marketCap} Cr market cap (easier to build 2-3% position)

**Diversification Benefits:**
• Different client mix (chemicals/pharma heavy vs Time's FMCG focus)
• Geographic diversification (Maharashtra + North India presence)
• Product mix: Higher margin specialty containers (40% of revenue)

**Capacity Expansion Story:**
• Wada facility operational (doubles capacity)
• 6 MW solar commissioned (15% cost reduction on power)
• Debt prudent: 0.42 D/E vs Time's 0.68

This is a "same playbook, different stock" opportunity - lower risk, higher reward profile.

Would love to discuss further.

Best regards,
CEO Office
Pyramid Technoplast Ltd`,
    },
    {
      id: 'target-612',
      tier: 'Mid-Tier Fund - Chemical Focus',
      name: 'Tata Mutual Fund',
      logo: '🏢',
      keyPerson: 'Fund Manager',
      role: 'Small Cap Team',
      fundSize: '₹22,000 Cr AUM',
      matchScore: 89,
      badges: ['Active Buyer', 'Small Cap'],
      recentMove: 'Building position in industrial packaging',
      insight: 'Aggressive buyer in industrial plastics. Looking for next 5x in manufacturing.',
      urgency: 'medium',
      trending: false,
      strategy: `Subject: Industrial Packaging - Pyramid Technoplast

Dear Tata Mutual Fund Team,

I wanted to bring Pyramid Technoplast to your attention as you build positions in the industrial packaging sector.

**The Opportunity:**
• Market Cap: ₹${PYRAMID_DATA.marketCap} Cr
• ROCE: 40% (capital-light model)
• Revenue Growth: +21% YoY
• P/E: ${PYRAMID_DATA.peRatio} (vs industry 28.2)

**Growth Drivers:**
• New Wada facility (capacity doubled)
• 6 MW solar (cost advantage)
• Blue-chip clients: Asian Paints, JSW, Pidilite

Best regards,
CEO Office
Pyramid Technoplast Ltd`,
    },
  ],
  whales: [
    {
      id: 'target-701',
      tier: 'HNI - Lucky Small-Cap Hunter',
      name: 'Ashish Kacholia',
      logo: '⭐',
      keyPerson: 'Ashish Kacholia',
      role: 'Investor',
      fundSize: 'Portfolio: ₹2,500+ Cr',
      matchScore: 92,
      badges: ['Holds Similar Cos', 'Track Record'],
      recentMove: 'Holds Shaily Engineering, La Opala',
      insight: 'Loves niche plastic/polymer processing companies that supply to big industries. "Pick and Shovel" thesis.',
      urgency: 'medium',
      trending: true,
      strategy: `Subject: Pick & Shovel Play for Chemicals - Pyramid Technoplast

Dear Ashish,

Given your successful investments in Shaily Engineering and La Opala, I wanted to bring Pyramid Technoplast to your attention - a "Pick and Shovel" play for the Chemical Industry.

**The Investment Thesis:**

Don't buy the volatile chemical stocks; buy the drums they must use to transport their product.

**Why This Fits Your Philosophy:**

• **Niche Leadership**: #3 player in industrial drums/IBCs in India
• **Essential Infrastructure**: Chemicals can't be transported without our products
• **Client Stickiness**: Asian Paints, JSW, Patanjali, Pidilite (long-term contracts)
• **Non-Cyclical**: Volume grows with industrial production, not commodity prices

**The Numbers That Matter:**

• ROCE: 40% (capital-light business model)
• ROE: ${PYRAMID_DATA.roe}%
• Debt/Equity: 0.42 (debt-prudent like your other winners)
• Promoter Holding: 74.94% (zero pledge, skin in the game)

**Growth Catalyst:**
• New Wada facility doubles capacity (targeting ₹1,000 Cr revenue)
• 6 MW solar = 15% cost advantage
• Expanding into specialty containers (higher margins)

**Valuation:**
P/E of ${PYRAMID_DATA.peRatio} vs industry 28.2 - early entry opportunity before the Street discovers it.

This checks all your boxes: niche, manufacturing, high ROCE, promoter-driven, early stage.

Would love to discuss further at your convenience.

Best regards,
CEO Office
Pyramid Technoplast Ltd`,
    },
    {
      id: 'target-803',
      tier: 'HNI - SMILE Strategy Investor',
      name: 'Vijay Kedia',
      logo: '🌟',
      keyPerson: 'Vijay Kedia',
      role: 'Investor',
      fundSize: 'Portfolio: ₹1,800+ Cr',
      matchScore: 88,
      badges: ['Growth Focus', 'Manufacturing'],
      recentMove: 'Active in small-cap manufacturing',
      insight: 'SMILE strategy perfect match. Expansion into new plants fits growth criteria.',
      urgency: 'low',
      trending: false,
      strategy: `Subject: SMILE Strategy Match - Pyramid Technoplast

Dear Vijay,

I believe Pyramid Technoplast aligns perfectly with your SMILE investment philosophy.

**SMILE Criteria:**
• **Small** in size: ₹${PYRAMID_DATA.marketCap} Cr market cap
• **Medium** in experience: 28+ years in industrial packaging
• **Large** in aspiration: Targeting ₹1,000 Cr revenue

**Investment Highlights:**
• ROCE: 40% (exceptional capital allocation)
• Promoter holding: 74.94% (skin in the game)
• Debt/Equity: 0.42 (conservative)
• Revenue growth: +21% YoY

**Expansion Story:**
• Wada facility operational (doubles capacity)
• 6 MW solar commissioned
• Blue-chip clientele

Would welcome your thoughts.

Best regards,
CEO Office
Pyramid Technoplast Ltd`,
    },
  ],
};

// Twitter mentions data - people discussing Pyramid Technoplast
const twitterMentions = [
  {
    id: '1',
    handle: '@SmallCapResearch',
    name: 'Small Cap Research India',
    avatar: '📊',
    verified: true,
    tweet: 'Pyramid Technoplast (#PYRAMID) showing strong fundamentals. ROCE at 40%, revenue growth 21% YoY. Wada facility now operational. Watching this industrial packaging play closely. #SmallCap #Manufacturing',
    likes: 234,
    retweets: 45,
    replies: 23,
    timestamp: '2h ago',
    sentiment: 'positive',
  },
  {
    id: '2',
    handle: '@ManufacturingStocks',
    name: 'Manufacturing Stocks India',
    avatar: '🏭',
    verified: false,
    tweet: 'Pyramid Technoplast commissioned 6 MW solar plant. This will reduce power costs significantly. ESG + cost efficiency = margin expansion story. Trading at P/E 15.2 vs peers at 28+. #ValueInvesting',
    likes: 156,
    retweets: 28,
    replies: 12,
    timestamp: '5h ago',
    sentiment: 'positive',
  },
  {
    id: '3',
    handle: '@DalalStreetTalk',
    name: 'Dalal Street Insights',
    avatar: '💹',
    verified: true,
    tweet: 'DII holdings in Pyramid Technoplast increased by 0.47% last quarter. FII entry at 1.04%. Smart money accumulating? Market cap only ₹410 Cr - easier to build positions. Worth monitoring. #StockMarket',
    likes: 312,
    retweets: 67,
    replies: 34,
    timestamp: '8h ago',
    sentiment: 'positive',
  },
  {
    id: '4',
    handle: '@HiddenGemsIndia',
    name: 'Hidden Gems - NSE/BSE',
    avatar: '💎',
    verified: false,
    tweet: 'Pyramid Technoplast supplies drums to Asian Paints, JSW, Pidilite, Patanjali. Recurring revenue model with blue-chip clients. Debt/Equity at 0.42. Clean balance sheet. #HiddenGem',
    likes: 189,
    retweets: 41,
    replies: 18,
    timestamp: '12h ago',
    sentiment: 'positive',
  },
  {
    id: '5',
    handle: '@MarketAnalystIN',
    name: 'Market Analyst India',
    avatar: '📈',
    verified: true,
    tweet: 'Tracking Pyramid Technoplast post-IPO (Aug 2023). Delivered on promises: ✓ Wada facility operational ✓ Solar commissioned ✓ Revenue growth accelerated. Execution track record strong. Current price: ₹171.30',
    likes: 267,
    retweets: 52,
    replies: 29,
    timestamp: '1d ago',
    sentiment: 'positive',
  },
  {
    id: '6',
    handle: '@SmallCapBets',
    name: 'Small Cap Opportunities',
    avatar: '🎯',
    verified: false,
    tweet: 'Industrial packaging theme gaining traction. Pyramid Technoplast trading at 40% discount to Time Technoplast despite better ROCE (40% vs 32%). Valuation gap too wide. #Trading',
    likes: 143,
    retweets: 31,
    replies: 15,
    timestamp: '1d ago',
    sentiment: 'positive',
  },
];

type OpportunityCategory = 'hotLeads' | 'patternMatchers' | 'whales';

export function TheHunter() {
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory>('hotLeads');
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showDossier, setShowDossier] = useState(false);
  const [copiedItems, setCopiedItems] = useState<string[]>([]);
  const [showEngagementStudio, setShowEngagementStudio] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = [
    {
      id: 'hotLeads' as OpportunityCategory,
      name: 'Hot Leads',
      subtitle: 'Anchors',
      icon: Trophy,
      color: 'emerald',
      count: opportunities.hotLeads.length,
    },
    {
      id: 'patternMatchers' as OpportunityCategory,
      name: 'Pattern Matchers',
      subtitle: 'Peer Investors',
      icon: Building2,
      color: 'blue',
      count: opportunities.patternMatchers.length,
    },
    {
      id: 'whales' as OpportunityCategory,
      name: 'Whales',
      subtitle: 'HNI',
      icon: Users,
      color: 'amber',
      count: opportunities.whales.length,
    },
  ];

  const currentOpportunities = opportunities[selectedCategory];

  const handleCardClick = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setShowDossier(true);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItems([...copiedItems, type]);
    setToastMessage('Copied to clipboard!');
    setShowToast(true);
    setTimeout(() => {
      setCopiedItems(copiedItems.filter(item => item !== type));
      setShowToast(false);
    }, 2000);
  };

  const handleExportPDF = () => {
    setToastMessage('Generating PDF report...');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleSendToStudio = () => {
    setShowDossier(false);
    setShowEngagementStudio(true);
    setToastMessage('Opening Engagement Studio...');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleViewTweet = (tweetId: string) => {
    // In production, this would open the actual tweet
    window.open(`https://twitter.com/i/web/status/${tweetId}`, '_blank');
  };

  const handleViewAllMentions = () => {
    // In production, this would open a filtered Twitter search
    window.open('https://twitter.com/search?q=%23PYRAMID%20OR%20%22Pyramid%20Technoplast%22&src=typed_query&f=live', '_blank');
  };

  const allOpportunities = [...opportunities.hotLeads, ...opportunities.patternMatchers, ...opportunities.whales];
  const totalMatches = allOpportunities.length;
  const avgMatchScore = Math.round(allOpportunities.reduce((sum, o) => sum + o.matchScore, 0) / totalMatches);

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-surface via-surface/95 to-surface border border-border rounded-xl p-4 md:p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg relative">
              <Target className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse ring-2 ring-background" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Reach</h1>
              <p className="text-xs text-muted-foreground">Investor Targeting & Social Intelligence</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEngagementStudio(true)}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Engagement Studio</span>
              <span className="sm:hidden">Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <ArrowUp className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{totalMatches}</div>
          <div className="text-xs text-muted-foreground">Potential Investors</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono text-blue-400">{avgMatchScore}%</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">Avg</div>
          <div className="text-xs text-muted-foreground">Match Score</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <Twitter className="w-4 h-4 text-purple-400" />
            <Activity className="w-3 h-3 text-purple-400 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-purple-400">{twitterMentions.length}</div>
          <div className="text-xs text-muted-foreground">Twitter Mentions</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border-0 text-[10px] px-1.5 py-0">100%</Badge>
          </div>
          <div className="text-2xl font-bold text-amber-400">Positive</div>
          <div className="text-xs text-muted-foreground">Sentiment</div>
        </Card>
      </div>

      {/* Main Layout: 2 Columns - Investors + Twitter */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">
        
        {/* LEFT: Investor Targeting */}
        <div className="space-y-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              const colorClasses = {
                emerald: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
                blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-400',
                amber: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
              };
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all whitespace-nowrap ${
                    isActive
                      ? `bg-gradient-to-r ${colorClasses[category.color as keyof typeof colorClasses]} shadow-lg scale-105`
                      : 'bg-surface/50 border-border hover:border-border/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? '' : 'text-muted-foreground'}`} />
                  <div className="flex flex-col items-start">
                    <span className={`text-sm font-semibold ${isActive ? '' : 'text-foreground'}`}>
                      {category.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{category.subtitle}</span>
                  </div>
                  <Badge variant="default" className="ml-1 bg-surface-overlay text-foreground text-xs">
                    {category.count}
                  </Badge>
                </button>
              );
            })}
          </div>

          {/* Investor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentOpportunities.map((opportunity) => {
              return (
                <Card
                  key={opportunity.id}
                  className="group hover:shadow-xl transition-all duration-300 p-4 relative overflow-hidden"
                >
                  {/* Signal Indicator */}
                  {opportunity.signal === 'high-potential' && opportunity.recentActivity && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}

                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{opportunity.logo}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{opportunity.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{opportunity.keyPerson}</p>
                    </div>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span className="text-lg font-bold text-emerald-400">{opportunity.matchScore}</span>
                      <span className="text-[9px] text-muted-foreground">MATCH</span>
                    </div>
                  </div>

                  {/* Fund Size */}
                  <div className="text-xs text-muted-foreground mb-2">{opportunity.fundSize}</div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {opportunity.badges.map((badge: string, idx: number) => {
                      const isUrgent = badge.toLowerCase().includes('fresh') || badge.toLowerCase().includes('competitor');
                      return (
                        <Badge
                          key={idx}
                          variant="default"
                          className={`text-[9px] px-1.5 py-0.5 ${
                            isUrgent
                              ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {badge}
                        </Badge>
                      );
                    })}
                  </div>

                  {/* Recent Move */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {opportunity.recentMove}
                  </p>

                  {/* CTA */}
                  <button 
                    onClick={() => handleCardClick(opportunity)}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:shadow-lg transition-all hover:border-blue-500/50 hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5 inline mr-1.5" />
                    View Details
                  </button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Twitter Social Intelligence */}
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Twitter className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="font-semibold">Social Intelligence</h3>
                <p className="text-xs text-muted-foreground">Twitter mentions of #PYRAMID</p>
              </div>
            </div>

            {/* Twitter Feed */}
            <div className="space-y-3 max-h-[800px] overflow-y-auto">
              {twitterMentions.map((tweet) => (
                <div key={tweet.id} className="p-3 rounded-lg bg-surface border border-border hover:border-border/80 transition-all">
                  {/* Tweet Header */}
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center text-sm flex-shrink-0">
                      {tweet.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-xs truncate">{tweet.name}</span>
                        {tweet.verified && (
                          <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">{tweet.handle}</span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-[10px] text-muted-foreground">{tweet.timestamp}</span>
                      </div>
                    </div>
                    <Badge 
                      variant="default" 
                      className={`text-[9px] px-1.5 py-0.5 ${
                        tweet.sentiment === 'positive' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {tweet.sentiment}
                    </Badge>
                  </div>

                  {/* Tweet Content */}
                  <p className="text-xs text-foreground/90 leading-relaxed mb-3">
                    {tweet.tweet}
                  </p>

                  {/* Tweet Actions */}
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1 text-[10px]">
                      <MessageCircle className="w-3 h-3" />
                      <span>{tweet.replies}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <Repeat2 className="w-3 h-3" />
                      <span>{tweet.retweets}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <Heart className="w-3 h-3" />
                      <span>{tweet.likes}</span>
                    </div>
                    <button className="ml-auto text-[10px] text-blue-400 hover:underline flex items-center gap-1" onClick={() => handleViewTweet(tweet.id)}>
                      View
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Twitter CTA */}
            <button className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:shadow-lg transition-all" onClick={handleViewAllMentions}>
              <Twitter className="w-3.5 h-3.5 inline mr-1.5" />
              View All Mentions
            </button>
          </Card>
        </div>
      </div>

      {/* Intelligence Dossier - Slide Over */}
      {showDossier && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-end animate-in fade-in duration-200">
          <div className="w-full md:w-[600px] h-full bg-background border-l border-border shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{selectedOpportunity.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedOpportunity.keyPerson} · {selectedOpportunity.role}</p>
                </div>
                <button
                  onClick={() => setShowDossier(false)}
                  className="w-8 h-8 rounded-lg hover:bg-surface transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Match Score Badge */}
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {selectedOpportunity.matchScore}% Match Score
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Revealed Info */}
              <Card className="p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-3xl">
                    {selectedOpportunity.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedOpportunity.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedOpportunity.fundSize}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Key Person:</span>
                    <span className="font-semibold">{selectedOpportunity.keyPerson}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-semibold">{selectedOpportunity.role}</span>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Recent Move:</p>
                    <p className="text-sm text-emerald-400">{selectedOpportunity.recentMove}</p>
                  </div>
                </div>
              </Card>

              {/* Broker's Insight */}
              <Card className="p-5 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Investment Thesis</h3>
                    <p className="text-xs text-muted-foreground">AI-Powered Analysis</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {selectedOpportunity.insight}
                </p>
              </Card>

              {/* Strategy Script */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Recommended Outreach Script
                  </h3>
                  <Badge variant="default" className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
                <Card className="p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20 relative">
                  <pre className="text-xs text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedOpportunity.strategy}
                  </pre>
                  <button
                    onClick={() => handleCopy(selectedOpportunity.strategy, selectedOpportunity.id)}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    {copiedItems.includes(selectedOpportunity.id) ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </Card>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2" onClick={handleExportPDF}>
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
                <button className="py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2" onClick={handleSendToStudio}>
                  <Sparkles className="w-4 h-4" />
                  Send to Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Engagement Studio Modal */}
      {showEngagementStudio && (
        <InvestorEngagementStudio onClose={() => setShowEngagementStudio(false)} />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded-lg shadow-lg animate-in fade-in duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
}