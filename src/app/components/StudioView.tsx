import { useState } from 'react';
import { FileText, Folder, Download, Eye, Search, Calendar, Filter, Sparkles, TrendingUp, AlertCircle, FileCheck, BarChart3, RefreshCw } from 'lucide-react';
import { Card, SectionHeader, Badge } from './SharedComponents';

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

// Consults data  
const consults = [
  { date: 'Nov 2025', tags: ['Financial', 'Actionaries'] },
  { date: 'Aug 2025', tags: ['Financial', 'Actionaries', 'IPT'] },
];

const recentDocuments = [
  {
    id: 1,
    title: 'Q2 FY25 Investor Presentation',
    type: 'PDF',
    size: '4.2 MB',
    date: 'Nov 15, 2024',
    status: 'Published',
    downloads: 342,
  },
  {
    id: 2,
    title: 'Annual Report FY24',
    type: 'PDF',
    size: '12.8 MB',
    date: 'Sep 30, 2024',
    status: 'Published',
    downloads: 1248,
  },
  {
    id: 3,
    title: 'Q3 FY25 Earnings Call Transcript (Draft)',
    type: 'DOCX',
    size: '856 KB',
    date: 'Dec 10, 2024',
    status: 'Draft',
    downloads: 0,
  },
];

const repositoryFiles = [
  {
    category: 'Financial Results',
    files: [
      { name: 'Q2_FY25_Results.pdf', date: 'Nov 15, 2024', size: '2.1 MB', type: 'PDF' },
      { name: 'Q1_FY25_Results.pdf', date: 'Aug 14, 2024', size: '1.9 MB', type: 'PDF' },
      { name: 'FY24_Annual_Results.pdf', date: 'May 30, 2024', size: '3.4 MB', type: 'PDF' },
    ],
  },
  {
    category: 'Corporate Governance',
    files: [
      { name: 'Board_Meeting_Outcome_Dec2024.pdf', date: 'Dec 5, 2024', size: '445 KB', type: 'PDF' },
      { name: 'Shareholding_Pattern_Q2FY25.xbrl', date: 'Nov 20, 2024', size: '124 KB', type: 'XBRL' },
      { name: 'Annual_Report_FY24.pdf', date: 'Sep 30, 2024', size: '12.8 MB', type: 'PDF' },
    ],
  },
  {
    category: 'Investor Presentations',
    files: [
      { name: 'Q2_FY25_Investor_Deck.pdf', date: 'Nov 15, 2024', size: '4.2 MB', type: 'PDF' },
      { name: 'Q1_FY25_Investor_Deck.pdf', date: 'Aug 14, 2024', size: '3.8 MB', type: 'PDF' },
      { name: 'Corporate_Presentation_2024.pdf', date: 'Jul 1, 2024', size: '5.6 MB', type: 'PDF' },
    ],
  },
  {
    category: 'Regulatory Filings',
    files: [
      { name: 'Disclosure_Related_Party_Transaction.pdf', date: 'Nov 28, 2024', size: '234 KB', type: 'PDF' },
      { name: 'Material_Event_Notification.pdf', date: 'Oct 15, 2024', size: '189 KB', type: 'PDF' },
      { name: 'Outcome_Board_Meeting_Q1.pdf', date: 'Aug 14, 2024', size: '356 KB', type: 'PDF' },
    ],
  },
];

type Tab = 'hub' | 'repository';

export function StudioView() {
  const [activeTab, setActiveTab] = useState<Tab>('hub');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <SectionHeader
        title="IR Studio"
        subtitle="Document management & investor relations repository"
        icon={FileText}
        action={
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all">
            <Download className="w-4 h-4" />
            <span className="text-sm">Upload Document</span>
          </button>
        }
      />

      {/* Tab Navigation */}
      <div className="flex items-center gap-3 border-b border-border">
        <button
          onClick={() => setActiveTab('hub')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'hub'
              ? 'border-blue-500 text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Hub (Recent)
        </button>
        <button
          onClick={() => setActiveTab('repository')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'repository'
              ? 'border-blue-500 text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Repository
        </button>
      </div>

      {/* Hub View */}
      {activeTab === 'hub' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-2">Total Documents</div>
              <div className="font-mono text-2xl">127</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-2">Published This Month</div>
              <div className="font-mono text-2xl">8</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-2">Total Downloads</div>
              <div className="font-mono text-2xl">12.4K</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-muted-foreground mb-2">Pending Drafts</div>
              <div className="font-mono text-2xl">3</div>
            </Card>
          </div>

          {/* Recent Documents */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Documents</h3>
            <div className="space-y-3">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-surface border border-border hover:border-border/80 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{doc.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-mono">{doc.type}</span>
                      <span className="font-mono">{doc.size}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {doc.date}
                      </span>
                    </div>
                  </div>

                  <Badge variant={doc.status === 'Published' ? 'published' : 'draft'}>
                    {doc.status}
                  </Badge>

                  <div className="text-right">
                    <div className="text-sm font-mono mb-1">{doc.downloads}</div>
                    <div className="text-xs text-muted-foreground">downloads</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-surface-overlay hover:bg-muted transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-surface-overlay hover:bg-muted transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Repository View */}
      {activeTab === 'repository' && (
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>

          {/* Category Folders */}
          <div className="space-y-6">
            {repositoryFiles.map((category, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Folder className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold">{category.category}</h3>
                  <Badge variant="default">{category.files.length} files</Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-xs text-muted-foreground uppercase tracking-wide">
                          File Name
                        </th>
                        <th className="text-left p-3 text-xs text-muted-foreground uppercase tracking-wide">
                          Type
                        </th>
                        <th className="text-left p-3 text-xs text-muted-foreground uppercase tracking-wide">
                          Size
                        </th>
                        <th className="text-left p-3 text-xs text-muted-foreground uppercase tracking-wide">
                          Date
                        </th>
                        <th className="text-right p-3 text-xs text-muted-foreground uppercase tracking-wide">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.files.map((file, j) => (
                        <tr key={j} className="border-b border-border/50 hover:bg-surface-overlay transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="default">{file.type}</Badge>
                          </td>
                          <td className="p-3 font-mono text-sm text-muted-foreground">{file.size}</td>
                          <td className="p-3 font-mono text-sm text-muted-foreground">{file.date}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 rounded hover:bg-muted transition-all">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-1.5 rounded hover:bg-muted transition-all">
                                <Download className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}