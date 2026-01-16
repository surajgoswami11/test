import { useState } from 'react';
import { Newspaper, TrendingUp, Building2, Globe, AlertCircle, Search, Filter, Calendar, ExternalLink, Sparkles, ChevronRight } from 'lucide-react';
import { Card, Badge, SectionHeader } from './SharedComponents';

type NewsCategory = 'all' | 'company' | 'market' | 'competitors' | 'regulatory';
type TimeFilter = 'today' | 'week' | 'month' | 'all';
type SentimentType = 'positive' | 'negative' | 'neutral';

interface NewsArticle {
  id: string;
  category: NewsCategory;
  headline: string;
  summary: string;
  source: string;
  time: string;
  sentiment: SentimentType;
  impact: 'high' | 'medium' | 'low';
  imageUrl?: string;
  relatedTickers?: string[];
  isFeatured?: boolean;
  url?: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    category: 'company',
    headline: 'Pyramid Technoplast announces ₹45 Cr capex for Gujarat facility expansion',
    summary: 'The company plans to double production capacity at its Vadodara plant by Q3 FY25, targeting growing demand in the food packaging segment. This marks the largest single investment in company history.',
    source: 'Economic Times',
    time: '2 hours ago',
    sentiment: 'positive',
    impact: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    isFeatured: true,
  },
  {
    id: '2',
    category: 'company',
    headline: 'Q2 FY25 Results: Net profit surges 42% YoY to ₹8.4 Cr, beats street estimates',
    summary: 'Strong performance driven by improved margins and robust demand in packaging segment. Revenue up 28% to ₹124 Cr.',
    source: 'MoneyControl',
    time: '1 day ago',
    sentiment: 'positive',
    impact: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    relatedTickers: ['PYRAMID'],
  },
  {
    id: '3',
    category: 'market',
    headline: 'Plastic raw material prices decline 3.5% amid weak global demand',
    summary: 'Polymer prices ease as China demand softens. Indian packaging companies expected to benefit from improved margins in H2 FY25.',
    source: 'Reuters',
    time: '30 mins ago',
    sentiment: 'positive',
    impact: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  },
  {
    id: '4',
    category: 'regulatory',
    headline: 'Government considering PLI scheme extension for packaging sector',
    summary: 'Ministry of Commerce evaluating ₹2,000 Cr incentive program to boost domestic manufacturing and reduce import dependency.',
    source: 'PTI',
    time: '2 hours ago',
    sentiment: 'positive',
    impact: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=800&q=80',
  },
  {
    id: '5',
    category: 'competitors',
    headline: 'Supreme Industries reports 18% revenue growth, raises FY25 guidance',
    summary: 'Market leader continues strong momentum with expansion in plastic piping and packaging divisions.',
    source: 'Business Standard',
    time: '4 hours ago',
    sentiment: 'neutral',
    impact: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    relatedTickers: ['SUPREMEIND'],
  },
  {
    id: '6',
    category: 'company',
    headline: 'Board approves dividend of ₹0.50 per share for FY24',
    summary: 'Dividend payout ratio of 12%, reflecting balanced approach to growth and shareholder returns.',
    source: 'BSE Filings',
    time: '3 days ago',
    sentiment: 'positive',
    impact: 'medium',
    relatedTickers: ['PYRAMID'],
  },
  {
    id: '7',
    category: 'competitors',
    headline: 'TCPL Packaging wins ₹120 Cr contract from FMCG major',
    summary: 'Three-year deal to supply innovative packaging solutions for leading consumer goods company.',
    source: 'LiveMint',
    time: '1 day ago',
    sentiment: 'neutral',
    impact: 'medium',
    relatedTickers: ['TCPLPACK'],
  },
  {
    id: '8',
    category: 'market',
    headline: 'NSE reports heavy selling in small-cap stocks, NIFTY down 1.2%',
    summary: 'Market-wide correction as FIIs pull out ₹2,400 Cr in past week. Packaging sector underperforms.',
    source: 'ET Markets',
    time: '5 hours ago',
    sentiment: 'negative',
    impact: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  },
  {
    id: '9',
    category: 'competitors',
    headline: 'Time Technoplast faces margin pressure due to rising raw material costs',
    summary: 'Company guides for muted Q3 performance as polymer price volatility impacts profitability.',
    source: 'CNBC-TV18',
    time: '2 days ago',
    sentiment: 'negative',
    impact: 'low',
    relatedTickers: ['TIMETECHNO'],
  },
  {
    id: '10',
    category: 'regulatory',
    headline: 'SEBI tightens disclosure norms for related party transactions',
    summary: 'New guidelines require enhanced transparency for all listed companies, effective from April 2025.',
    source: 'Business Line',
    time: '1 day ago',
    sentiment: 'neutral',
    impact: 'medium',
  },
  {
    id: '11',
    category: 'market',
    headline: 'India\'s packaging market to grow at 12% CAGR through 2030: Report',
    summary: 'Rising e-commerce and FMCG demand driving structural growth. Flexible packaging segment leading expansion.',
    source: 'ICRA Research',
    time: '3 days ago',
    sentiment: 'positive',
    impact: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&q=80',
  },
  {
    id: '12',
    category: 'company',
    headline: 'Pyramid Technoplast receives ISO 22000 certification for food packaging unit',
    summary: 'Quality certification strengthens position in food-grade packaging market, opening doors to premium clients.',
    source: 'Press Release',
    time: '4 days ago',
    sentiment: 'positive',
    impact: 'medium',
    relatedTickers: ['PYRAMID'],
  },
];

export function MarketIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All News', icon: Newspaper, count: newsArticles.length },
    { id: 'company', label: 'Pyramid', icon: Building2, count: newsArticles.filter(n => n.category === 'company').length },
    { id: 'market', label: 'Market', icon: TrendingUp, count: newsArticles.filter(n => n.category === 'market').length },
    { id: 'competitors', label: 'Competitors', icon: Globe, count: newsArticles.filter(n => n.category === 'competitors').length },
    { id: 'regulatory', label: 'Regulatory', icon: AlertCircle, count: newsArticles.filter(n => n.category === 'regulatory').length },
  ] as const;

  const filteredNews = newsArticles.filter(article => {
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      article.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredArticle = newsArticles.find(a => a.isFeatured);
  const regularNews = filteredNews.filter(a => !a.isFeatured);

  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'negative': return 'text-rose-600 bg-rose-50 border-rose-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getSentimentBadge = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'high-risk';
      default: return 'default';
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <SectionHeader
        title="Market Intelligence"
        subtitle="Real-time news, insights, and market-moving information"
        icon={Newspaper}
      />

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Category Filters */}
        <div className="flex-1 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as NewsCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-80 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Featured Story */}
      {featuredArticle && selectedCategory === 'all' && !searchQuery && (
        <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-white border-2">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden bg-slate-100">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.headline}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="default" className="bg-blue-600 text-white border-blue-600">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured Story
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={getSentimentBadge(featuredArticle.sentiment)}>
                  {featuredArticle.impact.toUpperCase()} IMPACT
                </Badge>
                <span className="text-xs text-slate-500 font-medium">{featuredArticle.time}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
                {featuredArticle.headline}
              </h2>

              <p className="text-slate-600 leading-relaxed mb-4">
                {featuredArticle.summary}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Newspaper className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-700">{featuredArticle.source}</p>
                    <p className="text-xs text-slate-500">Verified Source</p>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all text-sm font-medium">
                  Read Full Story
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* News Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {regularNews.map((article) => (
          <Card
            key={article.id}
            className="group hover:shadow-lg hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden bg-white"
          >
            {/* Image Header */}
            {article.imageUrl && (
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={article.imageUrl}
                  alt={article.headline}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant={getSentimentBadge(article.sentiment)} className="backdrop-blur-sm bg-white/90">
                    {article.impact}
                  </Badge>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-5">
              {/* Meta */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    article.sentiment === 'positive' ? 'bg-emerald-500' :
                    article.sentiment === 'negative' ? 'bg-rose-500' :
                    'bg-slate-400'
                  }`} />
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                    {article.category}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{article.time}</span>
              </div>

              {/* Headline */}
              <h3 className="font-semibold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.headline}
              </h3>

              {/* Summary */}
              <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                {article.summary}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                    <Newspaper className="w-3 h-3 text-slate-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{article.source}</span>
                </div>

                {article.relatedTickers && article.relatedTickers.length > 0 && (
                  <div className="flex items-center gap-1">
                    {article.relatedTickers.map((ticker) => (
                      <span
                        key={ticker}
                        className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono"
                      >
                        {ticker}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <Card className="p-12 text-center bg-slate-50">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">No news found</h3>
          <p className="text-sm text-slate-600">
            Try adjusting your filters or search query
          </p>
        </Card>
      )}

      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 border-2 border-violet-200">
        <div className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1">AI-Powered News Digest</h3>
            <p className="text-sm text-slate-600">
              Get personalized summaries of market-moving news, delivered every morning at 8 AM
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-all text-sm font-medium flex-shrink-0">
            Enable Digest
          </button>
        </div>
      </Card>
    </div>
  );
}
