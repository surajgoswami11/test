import { useState } from 'react';
import { Newspaper, Filter, Search, TrendingUp, Building2, Globe, Bookmark, ExternalLink, Clock, Tag, AlertCircle, Sparkles, MessageCircle, ThumbsUp, Repeat2, Hash, TrendingDown, AlertTriangle, Flame, Users } from 'lucide-react';
import { Card, Badge, SectionHeader } from './SharedComponents';
// import sifiLogo from 'figma:asset/db89ce6df50a534b9adc47b012b906e480bf6282.png';
import sifiLogo from "../../assets/db89ce6df50a534b9adc47b012b906e480bf6282.png"

type NewsCategory = 'all' | 'company' | 'competitors' | 'market' | 'industry' | 'social';
type NewsSentiment = 'Positive' | 'Negative' | 'Neutral';

interface NewsItem {
  id: string;
  category: Exclude<NewsCategory, 'all' | 'social'>;
  time: string;
  timestamp: Date;
  headline: string;
  summary: string;
  source: string;
  sentiment: NewsSentiment;
  impact: 'High' | 'Medium' | 'Low';
  tags: string[];
  relatedStocks?: string[];
  imageUrl?: string;
  url?: string;
}

interface SocialBuzzItem {
  id: string;
  topic: string;
  buzzLevel: 'high' | 'medium' | 'low';
  sentiment: 'bullish' | 'bearish' | 'neutral';
  narrative: string;
  discussion: string;
  sampleTweet: string;
  implications: string;
  engagementCount: number;
  trendingHashtags: string[];
}

const newsData: NewsItem[] = [
  {
    id: '1',
    category: 'company',
    time: '2 hours ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    headline: 'Pyramid Technoplast commissions 6 MW solar plant and recycling unit in Gujarat',
    summary: 'The company has operationalized its new captive solar power plant and recycling unit. While revenue is up 21% YoY, margins face temporary pressure from fixed costs of new facilities. Management targeting ₹15 Cr annual savings once fully optimized.',
    source: 'Economic Times',
    sentiment: 'Neutral',
    impact: 'High',
    tags: ['Expansion', 'Solar Energy', 'Recycling', 'Gujarat'],
    relatedStocks: ['PYRAMID'],
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    category: 'company',
    time: '5 hours ago',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    headline: 'Pyramid Technoplast Wada plant operational at 66-80% capacity utilization',
    summary: 'New Maharashtra facility is fully operational but management pushing to optimize capacity utilization. Stock under pressure, down 20% over last year as market watches margin recovery closely.',
    source: 'MoneyControl',
    sentiment: 'Neutral',
    impact: 'Medium',
    tags: ['Operations', 'Capacity', 'Maharashtra', 'Wada Plant'],
    relatedStocks: ['PYRAMID'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    category: 'competitors',
    time: '1 hour ago',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    headline: 'Time Technoplast stock jumps 3% on successful hydrogen drone flight trials',
    summary: 'Major breakthrough as company successfully tests hydrogen-powered drone using proprietary Type-III carbon composite cylinders. Offers 3-5x longer flight endurance vs battery drones, opening defense and industrial contract opportunities.',
    source: 'ET Now',
    sentiment: 'Positive',
    impact: 'High',
    tags: ['Hydrogen', 'Innovation', 'Drone Technology', 'Defense'],
    relatedStocks: ['TIMETECHNO'],
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    category: 'competitors',
    time: '4 hours ago',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    headline: 'Time Technoplast partners with Poppe + Potthoff GmbH for hydrogen systems in India',
    summary: 'Strategic partnership with German engineering firm and Imperial Auto to develop comprehensive hydrogen infrastructure. Q2 FY26 results strong with Revenue +11% and Net Profit +21% YoY. Remains first Indian PESO-approved Type-III cylinder manufacturer.',
    source: 'Business Standard',
    sentiment: 'Positive',
    impact: 'High',
    tags: ['Partnership', 'Hydrogen', 'Germany', 'PESO Approval', 'Earnings'],
    relatedStocks: ['TIMETECHNO'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    category: 'competitors',
    time: '3 hours ago',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    headline: 'AKG Exim hits 52-week low at ₹11.24 amid weak financials and bearish sentiment',
    summary: 'Stock continues downward slide touching new lows. Recent quarterly results show 19% decline in total income with compressed margins. No major catalysts visible to reverse the negative trend.',
    source: 'CNBC-TV18',
    sentiment: 'Negative',
    impact: 'Medium',
    tags: ['Stock Performance', '52-Week Low', 'Weak Results', 'Bearish'],
    relatedStocks: ['AKGEXIM'],
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    category: 'competitors',
    time: '1 day ago',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    headline: 'Supreme Industries reports 18% revenue growth, raises FY25 guidance',
    summary: 'Market leader upgrades full-year revenue guidance to ₹9,200 Cr citing strong order book and capacity utilization above 85%.',
    source: 'Business Standard',
    sentiment: 'Neutral',
    impact: 'Medium',
    tags: ['Earnings', 'Competition', 'Market Leader'],
    relatedStocks: ['SUPREMEIND'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    category: 'market',
    time: '30 mins ago',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    headline: 'Plastic raw material prices decline 3.5% amid weak global demand',
    summary: 'Polypropylene and HDPE prices fall on oversupply from Middle East producers. Industry margins expected to improve in H2 FY25.',
    source: 'Reuters',
    sentiment: 'Positive',
    impact: 'High',
    tags: ['Raw Materials', 'Commodity Prices', 'Margins'],
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
  },
  {
    id: '8',
    category: 'market',
    time: '2 hours ago',
    timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
    headline: 'Government considering PLI scheme extension for packaging sector',
    summary: 'Ministry of Commerce proposes ₹2,500 Cr incentive program to boost local manufacturing and reduce import dependency.',
    source: 'PTI',
    sentiment: 'Positive',
    impact: 'High',
    tags: ['Policy', 'PLI Scheme', 'Government', 'Manufacturing'],
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop',
  },
  {
    id: '9',
    category: 'market',
    time: '5 hours ago',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    headline: 'NSE reports heavy selling in small-cap stocks, NIFTY down 1.2%',
    summary: 'Broad-based selling across small and mid-cap indices. FII outflows continue for 5th consecutive session. Volatility index (VIX) up 8%.',
    source: 'ET Markets',
    sentiment: 'Negative',
    impact: 'Medium',
    tags: ['Market Trend', 'FII Activity', 'Volatility'],
  },
  {
    id: '10',
    category: 'industry',
    time: '6 hours ago',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    headline: 'Indian packaging industry to grow at 12% CAGR through 2028: Report',
    summary: 'CRISIL research predicts industry size to reach $73 Bn by 2028 driven by e-commerce, FMCG growth, and sustainability shift.',
    source: 'Financial Express',
    sentiment: 'Positive',
    impact: 'High',
    tags: ['Industry Growth', 'Research', 'Market Size'],
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop',
  },
  {
    id: '11',
    category: 'industry',
    time: '1 day ago',
    timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000),
    headline: 'Sustainability mandate: Major brands commit to 50% recycled plastic by 2026',
    summary: 'HUL, Nestlé, PepsiCo announce targets. Creates opportunity for rPET manufacturers but challenges for virgin plastic producers.',
    source: 'Business Today',
    sentiment: 'Neutral',
    impact: 'Medium',
    tags: ['Sustainability', 'ESG', 'Recycling', 'Brand Commitments'],
  },
  {
    id: '12',
    category: 'industry',
    time: '2 days ago',
    timestamp: new Date(Date.now() - 50 * 60 * 60 * 1000),
    headline: 'China plastic exports to India surge 22% YoY despite anti-dumping duties',
    summary: 'Traders find loopholes through third-country routing. Domestic manufacturers seek stricter enforcement and higher tariffs.',
    source: 'The Hindu BusinessLine',
    sentiment: 'Negative',
    impact: 'Medium',
    tags: ['Imports', 'Competition', 'Trade Policy'],
  },
];

// Export social buzz data for use in other components
export const socialBuzzData: SocialBuzzItem[] = [
  {
    id: 'buzz-2',
    topic: 'Solar Plant',
    buzzLevel: 'medium',
    sentiment: 'bullish',
    narrative: '"Margin Expansion" Thesis',
    discussion: 'Serious long-term investors are discussing the recent Capex announcements. The new 6MW solar plant is expected to save ₹15 Cr annually. Investors are calculating the math.',
    sampleTweet: 'Pyramid Technoplast commissions solar plant. Expected savings ₹15Cr/year. That\'s straight addition to EBITDA. Current EBITDA is ~₹50Cr. This single move jumps margins by 20-30% next year. Dark horse? 🐎 #Capex #GreenEnergy',
    implications: 'Highlight this as "Margin Protection" against inflation.',
    engagementCount: 423,
    trendingHashtags: ['#Capex', '#GreenEnergy', '#EBITDA'],
  },
  {
    id: 'buzz-3',
    topic: 'Chemical Sector',
    buzzLevel: 'medium',
    sentiment: 'bullish',
    narrative: '"Sector Resilience"',
    discussion: 'Market observers note Pyramid\'s diversified client base provides insulation from single-sector volatility. While some Chemical companies face headwinds, Pyramid\'s strong relationships with 500+ customers across Pharma, Specialty Chemicals, and Agrochemicals demonstrate business model strength.',
    sampleTweet: 'Impressed by $PYRAMID resilience. While some chemical names struggle, packaging demand stays robust with pharma & specialty chem growth. Diversification paying off. 42% profit growth speaks volumes! 📈 #SmartBusiness',
    implications: 'Highlight diversified revenue streams: "Our 500+ customer base across 4 sectors provides natural hedge against single-sector volatility."',
    engagementCount: 312,
    trendingHashtags: ['#Resilience', '#Diversification', '#GrowthStory'],
  },
  {
    id: 'buzz-4',
    topic: 'Price Action',
    buzzLevel: 'low',
    sentiment: 'neutral',
    narrative: 'HDPE Spread & Raw Material Buzz',
    discussion: 'Smart money is watching the HDPE (Plastic) Spread. Crude Oil is stable, but Polymer prices are crashing. Falling raw material prices (HDPE) usually help packaging companies expand margins if they don\'t pass all the savings to customers.',
    sampleTweet: 'HDPE prices are at multi-year lows. Spread between Crude and Polymer is healthy. Packaging converters like Pyramid and TPL Plastech should post surprise margin expansion in Q3. Keep on radar. 📡',
    implications: 'Stock is "boring" right now, which is often when accumulation happens.',
    engagementCount: 156,
    trendingHashtags: ['#HDPE', '#CommodityPrices', '#MarginExpansion'],
  },
];

export function NewsIntelligence() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const toggleSave = (id: string) => {
    const newSaved = new Set(savedArticles);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedArticles(newSaved);
  };

  const filteredNews = newsData
    .filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by latest first

  // For "All" category, merge news and social buzz
  const getMergedFeed = () => {
    if (activeCategory !== 'all') {
      return filteredNews.map(item => ({ type: 'news' as const, data: item }));
    }
    
    // Merge news and social buzz, convert social buzz to have timestamps
    const newsItems = filteredNews.map(item => ({ 
      type: 'news' as const, 
      data: item,
      timestamp: item.timestamp 
    }));
    
    const socialItems = socialBuzzData.map((item, index) => ({ 
      type: 'social' as const, 
      data: item,
      // Space out social buzz items in the feed (every 3-4 news items)
      timestamp: new Date(Date.now() - (index * 4 + 1) * 60 * 60 * 1000)
    }));
    
    return [...newsItems, ...socialItems].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const mergedFeed = getMergedFeed();

  const categories = [
    { id: 'all', label: 'All News', icon: Newspaper, count: newsData.length + socialBuzzData.length },
    { id: 'company', label: 'Company', icon: Building2, count: newsData.filter(n => n.category === 'company').length },
    { id: 'competitors', label: 'Competitors', icon: TrendingUp, count: newsData.filter(n => n.category === 'competitors').length },
    { id: 'market', label: 'Market', icon: Globe, count: newsData.filter(n => n.category === 'market').length },
    { id: 'industry', label: 'Industry', icon: Sparkles, count: newsData.filter(n => n.category === 'industry').length },
    { id: 'social', label: 'Social', icon: MessageCircle, count: socialBuzzData.length },
  ] as const;

  const getSentimentColor = (sentiment: NewsSentiment) => {
    switch (sentiment) {
      case 'Positive': return 'text-emerald-600';
      case 'Negative': return 'text-rose-600';
      case 'Neutral': return 'text-slate-600';
    }
  };

  const getImpactBadgeVariant = (impact: string): "default" | "success" | "warning" | "high-risk" | "premium" | "ai" => {
    switch (impact) {
      case 'High': return 'high-risk';
      case 'Medium': return 'warning';
      case 'Low': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Newspaper className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl tracking-tight">News & Intelligence</h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Real-time market intelligence and competitive insights</p>
          </div>
        </div>
        <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-600 border-0 text-white text-xs px-3 py-1">
          PREMIUM
        </Badge>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all text-sm"
          >
            <Filter className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-slate-700">
              {categories.find(c => c.id === activeCategory)?.label || 'All News'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium ml-1">
              {categories.find(c => c.id === activeCategory)?.count || 0}
            </span>
          </button>

          {/* Filter Dropdown Menu */}
          {showFilters && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg border border-slate-200 shadow-lg z-50 overflow-hidden">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id as NewsCategory);
                      setShowFilters(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 transition-all text-sm border-b border-slate-100 last:border-0 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{cat.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search news, tags, or stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm transition-all"
            />
          </div>
        </div>
      </div>

      {/* News Grid */}
      {activeCategory === 'social' ? (
        /* Social Buzz Only View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {socialBuzzData.map((buzz) => {
            const getBuzzLevelBadge = () => {
              switch (buzz.buzzLevel) {
                case 'high':
                  return { icon: Flame, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', label: 'High Buzz' };
                case 'medium':
                  return { icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Medium Buzz' };
                case 'low':
                  return { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Low Buzz' };
              }
            };

            const getSentimentBadge = () => {
              switch (buzz.sentiment) {
                case 'bullish':
                  return { color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Bullish' };
                case 'bearish':
                  return { color: 'text-rose-600', bg: 'bg-rose-50', label: 'Bearish' };
                case 'neutral':
                  return { color: 'text-slate-600', bg: 'bg-slate-50', label: 'Neutral' };
                case 'opportunity':
                  return { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Opportunity' };
                default:
                  return { color: 'text-slate-600', bg: 'bg-slate-50', label: 'Neutral' };
              }
            };

            const buzzBadge = getBuzzLevelBadge();
            const sentimentBadge = getSentimentBadge();
            const BuzzIcon = buzzBadge.icon;

            return (
              <Card key={buzz.id} className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: buzz.sentiment === 'bullish' ? '#10b981' : buzz.sentiment === 'bearish' ? '#ef4444' : '#64748b' }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm md:text-base font-semibold text-slate-900">{buzz.topic}</span>
                      <BuzzIcon className={`w-4 h-4 ${buzzBadge.color}`} />
                    </div>
                    <div className="text-xs text-slate-500 font-medium mb-2 md:mb-3">
                      {buzz.narrative}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-1 rounded-md ${buzzBadge.bg} ${buzzBadge.color} ${buzzBadge.border} border font-medium`}>
                        {buzzBadge.label}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-md ${sentimentBadge.bg} ${sentimentBadge.color} font-medium`}>
                        {sentimentBadge.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Discussion */}
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3 md:mb-4">
                  {buzz.discussion}
                </p>

                {/* Sample Tweet */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm text-slate-700 italic leading-relaxed">
                        "{buzz.sampleTweet}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Implications for CEO */}
                <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 mb-3 md:mb-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-amber-900 mb-1">What it means for you:</p>
                      <p className="text-xs text-amber-700">{buzz.implications}</p>
                    </div>
                  </div>
                </div>

                {/* Engagement & Hashtags */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-3 md:gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="font-mono">{buzz.engagementCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Repeat2 className="w-3.5 h-3.5" />
                      <span className="font-mono">{Math.floor(buzz.engagementCount * 0.6).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {buzz.trendingHashtags.slice(0, 2).map((hashtag, i) => (
                      <span key={i} className="inline-flex items-center gap-0.5 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-mono">
                        <Hash className="w-3 h-3" />
                        {hashtag.replace('#', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* News Articles View (includes "All" category) */
        <>
          <div className="grid grid-cols-1 gap-4">
            {mergedFeed.length === 0 ? (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-700 mb-2">No news found</h3>
                <p className="text-sm text-slate-500">Try adjusting your filters or search query</p>
              </Card>
            ) : (
              mergedFeed.map((item) => {
                if (item.type === 'news') {
                  const newsItem = item.data;
                  return (
                    <Card key={newsItem.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden group">
                      <div className="flex gap-2 md:gap-4 xl:gap-6 p-2.5 md:p-4 xl:p-6">
                        {/* Image Thumbnail - Smaller, more responsive */}
                        {newsItem.imageUrl && (
                          <div className="w-16 h-16 md:w-28 md:h-20 xl:w-48 xl:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                            <img
                              src={newsItem.imageUrl}
                              alt={newsItem.headline}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Meta Info */}
                          <div className="flex items-center gap-2 mb-1 md:mb-1.5 flex-wrap">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              <span className="font-mono">{newsItem.time}</span>
                            </div>
                            <span className="text-slate-300 hidden sm:inline">•</span>
                            <span className="text-xs text-slate-600 font-medium">{newsItem.source}</span>
                            <span className="text-slate-300 hidden md:inline">•</span>
                            <Badge variant={getImpactBadgeVariant(newsItem.impact)} className="hidden md:inline-flex text-[10px] px-1.5 py-0">{newsItem.impact} Impact</Badge>
                            {newsItem.relatedStocks && newsItem.relatedStocks.length > 0 && (
                              <>
                                <span className="text-slate-300 hidden xl:inline">•</span>
                                {newsItem.relatedStocks.map(stock => (
                                  <span key={stock} className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 hidden xl:inline">
                                    {stock}
                                  </span>
                                ))}
                              </>
                            )}
                          </div>

                          {/* Headline - Compact sizing */}
                          <h3 className="text-sm md:text-base xl:text-lg font-semibold text-slate-900 mb-1 md:mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {newsItem.headline}
                          </h3>

                          {/* Summary - Tighter line height and spacing */}
                          <p className="text-xs md:text-sm text-slate-600 leading-snug mb-1.5 md:mb-2 line-clamp-1 md:line-clamp-2">
                            {newsItem.summary}
                          </p>

                          {/* Tags & Actions */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {newsItem.tags.slice(0, 2).map((tag, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 text-[10px] md:text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
                                >
                                  <Tag className="w-2.5 h-2.5 md:w-3 md:h-3 hidden md:inline" />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Actions - Compact */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => toggleSave(newsItem.id)}
                                className={`p-1.5 rounded-lg transition-all ${
                                  savedArticles.has(newsItem.id)
                                    ? 'bg-amber-50 text-amber-600'
                                    : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
                                }`}
                                title={savedArticles.has(newsItem.id) ? 'Remove bookmark' : 'Bookmark'}
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${savedArticles.has(newsItem.id) ? 'fill-amber-600' : ''}`} />
                              </button>
                              {newsItem.url && (
                                <button
                                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                                  title="Read full article"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Sentiment Indicator - Hidden on smaller screens */}
                        <div className="hidden xl:flex flex-shrink-0 flex-col items-center justify-center px-3 border-l border-slate-200">
                          <div className={`text-xs font-semibold ${getSentimentColor(newsItem.sentiment)} mb-1`}>
                            {newsItem.sentiment}
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            newsItem.sentiment === 'Positive' ? 'bg-emerald-500' :
                            newsItem.sentiment === 'Negative' ? 'bg-rose-500' :
                            'bg-slate-400'
                          }`} />
                        </div>
                      </div>
                    </Card>
                  );
                } else {
                  const buzzItem = item.data;
                  const getBuzzLevelBadge = () => {
                    switch (buzzItem.buzzLevel) {
                      case 'high':
                        return { icon: Flame, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', label: 'High Buzz' };
                      case 'medium':
                        return { icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Medium Buzz' };
                      case 'low':
                        return { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Low Buzz' };
                    }
                  };

                  const getSentimentBadge = () => {
                    switch (buzzItem.sentiment) {
                      case 'bullish':
                        return { color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Bullish' };
                      case 'bearish':
                        return { color: 'text-rose-600', bg: 'bg-rose-50', label: 'Bearish' };
                      case 'neutral':
                        return { color: 'text-slate-600', bg: 'bg-slate-50', label: 'Neutral' };
                      case 'opportunity':
                        return { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Opportunity' };
                      default:
                        return { color: 'text-slate-600', bg: 'bg-slate-50', label: 'Neutral' };
                    }
                  };

                  const buzzBadge = getBuzzLevelBadge();
                  const sentimentBadge = getSentimentBadge();
                  const BuzzIcon = buzzBadge.icon;

                  return (
                    <Card key={buzzItem.id} className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: buzzItem.sentiment === 'bullish' ? '#10b981' : buzzItem.sentiment === 'bearish' ? '#ef4444' : '#64748b' }}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm md:text-base font-semibold text-slate-900">{buzzItem.topic}</span>
                            <BuzzIcon className={`w-4 h-4 ${buzzBadge.color}`} />
                          </div>
                          <div className="text-xs text-slate-500 font-medium mb-2 md:mb-3">
                            {buzzItem.narrative}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-1 rounded-md ${buzzBadge.bg} ${buzzBadge.color} ${buzzBadge.border} border font-medium`}>
                              {buzzBadge.label}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-md ${sentimentBadge.bg} ${sentimentBadge.color} font-medium`}>
                              {sentimentBadge.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Discussion */}
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3 md:mb-4">
                        {buzzItem.discussion}
                      </p>

                      {/* Sample Tweet */}
                      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                        <div className="flex items-start gap-2 md:gap-3">
                          <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm text-slate-700 italic leading-relaxed">
                              "{buzzItem.sampleTweet}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Implications for CEO */}
                      <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 mb-3 md:mb-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-amber-900 mb-1">What it means for you:</p>
                            <p className="text-xs text-amber-700">{buzzItem.implications}</p>
                          </div>
                        </div>
                      </div>

                      {/* Engagement & Hashtags */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-200">
                        <div className="flex items-center gap-3 md:gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span className="font-mono">{buzzItem.engagementCount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Repeat2 className="w-3.5 h-3.5" />
                            <span className="font-mono">{Math.floor(buzzItem.engagementCount * 0.6).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {buzzItem.trendingHashtags.slice(0, 2).map((hashtag, i) => (
                            <span key={i} className="inline-flex items-center gap-0.5 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-mono">
                              <Hash className="w-3 h-3" />
                              {hashtag.replace('#', '')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  );
                }
              })
            )}
          </div>

          {/* Stats Footer */}
          {mergedFeed.length > 0 && (
            <Card className="p-4 bg-slate-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6">
                  <span className="text-slate-600">
                    Showing <span className="font-semibold text-slate-900">{mergedFeed.length}</span> {activeCategory === 'all' ? 'items' : 'articles'}
                  </span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-slate-600 text-xs md:text-sm">
                        {filteredNews.filter(n => n.sentiment === 'Positive').length} Positive
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span className="text-slate-600 text-xs md:text-sm">
                        {filteredNews.filter(n => n.sentiment === 'Neutral').length} Neutral
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="text-slate-600 text-xs md:text-sm">
                        {filteredNews.filter(n => n.sentiment === 'Negative').length} Negative
                      </span>
                    </div>
                  </div>
                </div>
                {savedArticles.size > 0 && (
                  <div className="flex items-center gap-2 text-amber-600">
                    <Bookmark className="w-4 h-4 fill-amber-600" />
                    <span className="font-medium text-xs md:text-sm">{savedArticles.size} saved</span>
                  </div>
                )}
              </div>
            </Card>
          )}
        </>
      )}

    </div>
  );
}