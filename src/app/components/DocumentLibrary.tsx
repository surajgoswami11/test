import { useState } from 'react';
import { FileText, Bell, TrendingUp, Search, Eye, Presentation, Sparkles, Brain, TrendingDown, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { Card, Badge } from './SharedComponents';

// Announcements data
const announcements = [
  {
    id: 1,
    title: 'Announcement under Regulation 30 (LODR)-Analyst / Institutional Investor Meet / Con. Call Updates',
    date: 'Nov 22',
    views: 11,
  },
  {
    id: 2,
    title: 'Exchange Intimation-Loss of Share Certificates',
    date: 'Nov 11',
    views: 7,
  },
  {
    id: 3,
    title: 'Newspaper Publication | Unaudited',
    date: 'Nov 5',
    views: 14,
  },
  {
    id: 4,
    title: 'Announcement under Regulation 30 (LODR)-Analyst / Institutional Investor Meet / Con. Call Updates',
    date: 'Oct 22',
    views: 9,
  },
  {
    id: 5,
    title: 'Announcement under Regulation 30 (LODR)-Board Meeting Intimation',
    date: 'Oct 15',
    views: 18,
  },
];

// Annual Reports data
const annualReports = [
  { date: 'Financial Year 2024', tags: ['Financial', 'Actionaries', 'IPT'] },
  { date: 'Aug 2025', tags: ['Financial', 'Actionaries', 'IPT'] },
  { date: 'Jan 2025', tags: ['Financial', 'Actionaries', 'IPT'] },
  { date: 'Dec 2024', tags: ['Financial', 'Actionaries', 'IPT'] },
  { date: 'Nov 2024', tags: ['Financial', 'Actionaries', 'IPT'] },
];

export function DocumentLibrary() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('announcements');

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Document Library</h1>
            <p className="text-sm text-muted-foreground">Regulatory filings, reports & investor communications</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-cyan-600 border-0 text-white">
            IR STUDIO
          </Badge>
        </div>
      </div>

      {/* Mobile: Category Selector */}
      <div className="md:hidden">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground font-medium"
        >
          <option value="announcements">Announcements ({announcements.length})</option>
          <option value="financials">Financial Reports (4)</option>
          <option value="annual">Annual Reports (5)</option>
          <option value="presentations">Presentations (4)</option>
        </select>
      </div>

      {/* Content Grid: Sidebar on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 lg:gap-6">
        
        {/* Left Sidebar - Document Categories (Hidden on mobile, dropdown instead) */}
        <div className="hidden lg:block">
          <Card className="p-4">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">Categories</h3>
            <div className="space-y-2">
              {[
                { id: 'announcements', label: 'Announcements', count: announcements.length, icon: Bell },
                { id: 'financials', label: 'Financial Reports', count: 4, icon: TrendingUp },
                { id: 'annual', label: 'Annual Reports', count: 5, icon: FileText },
                { id: 'presentations', label: 'Presentations', count: 4, icon: Presentation },
              ].map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-blue-500/10 border-blue-500/30 shadow-md'
                        : 'bg-surface/50 border-border hover:border-blue-500/30 hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-medium">{cat.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{cat.count}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Main Content - Document List */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-9 pr-3 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* AI Document Analyzer - Premium Feature */}
          <Card className="p-4 md:p-6 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 border-purple-500/20">
            <div className="flex items-start gap-3 md:gap-4">
              {/* AI Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">AI Document Analyzer</h3>
                  <Badge variant="ai" className="text-[10px] px-2 py-0">
                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                    AI POWERED
                  </Badge>
                </div>
                
                <p className="text-xs md:text-sm text-muted-foreground mb-4 leading-relaxed">
                  Upload any document for instant AI-powered analysis. Get key insights, sentiment analysis, risk factors, and actionable recommendations.
                </p>

                {/* Upload Button */}
                <button className="w-full md:w-auto px-4 py-2.5 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Upload & Analyze Document
                </button>

                {/* Recent Analysis Preview */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Last Analysis: Q2 FY25 Results
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Sentiment */}
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Sentiment</div>
                        <div className="text-sm font-semibold text-emerald-400">Positive</div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Key Metrics</div>
                        <div className="text-sm font-semibold text-blue-400">12 Found</div>
                      </div>
                    </div>

                    {/* Risk Level */}
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Risk Level</div>
                        <div className="text-sm font-semibold text-amber-400">Low</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Document List */}
          <div className="space-y-4">
            {/* Announcements Section */}
            {selectedCategory === 'announcements' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Announcements</h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all 32 →</button>
                </div>
                <div className="space-y-3">
                  {announcements.map((item) => (
                    <Card
                      key={item.id}
                      onClick={() => setSelectedDocument(item.title)}
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                        selectedDocument === item.title
                          ? 'ring-2 ring-blue-500/50 bg-blue-500/5'
                          : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Bell className="w-5 h-5 text-blue-400" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium leading-snug mb-2 line-clamp-2">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{item.date}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {item.views}
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="text-muted-foreground">
                          →
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Reports Section */}
            {selectedCategory === 'financials' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Financial Reports</h3>
                </div>
                
                <div className="space-y-3">
                  {['Q2 FY25', 'Q1 FY25', 'Q4 FY24', 'Q3 FY24'].map((quarter, idx) => (
                    <Card
                      key={idx}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedDocument === `Financial Results - ${quarter}`
                          ? 'ring-2 ring-blue-500/50'
                          : ''
                      }`}
                      onClick={() => setSelectedDocument(`Financial Results - ${quarter}`)}
                    >
                      <div className="text-sm mb-2">{quarter} Results</div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400">
                          Audited
                        </span>
                        <span className="px-2 py-0.5 text-xs bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">
                          PDF
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Annual Reports Section */}
            {selectedCategory === 'annual' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Annual Reports</h3>
                </div>
                
                <div className="space-y-3">
                  {annualReports.map((report, idx) => (
                    <Card
                      key={idx}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedDocument === `Annual Report - ${report.date}`
                          ? 'ring-2 ring-blue-500/50'
                          : ''
                      }`}
                      onClick={() => setSelectedDocument(`Annual Report - ${report.date}`)}
                    >
                      <div className="text-sm mb-2">{report.date}</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {report.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs bg-blue-500/10 border border-blue-500/30 rounded text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Presentations Section */}
            {selectedCategory === 'presentations' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Presentations</h3>
                </div>
                
                <div className="space-y-3">
                  {['Q2 FY25', 'Q1 FY25', 'Q4 FY24', 'Q3 FY24'].map((quarter, idx) => (
                    <Card
                      key={idx}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedDocument === `Presentation - ${quarter}`
                          ? 'ring-2 ring-blue-500/50'
                          : ''
                      }`}
                      onClick={() => setSelectedDocument(`Presentation - ${quarter}`)}
                    >
                      <div className="text-sm mb-2">{quarter} Presentation</div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">
                          PDF
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}