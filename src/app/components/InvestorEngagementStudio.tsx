import { useState } from 'react';
import { Mail, FileText, Image as ImageIcon, Sparkles, Copy, Download, RefreshCw, Check, Wand2, Send, TrendingUp, Target, BarChart3, X, ChevronRight } from 'lucide-react';
import { Card, Badge } from './SharedComponents';
import { PYRAMID_DATA } from './pyramidConstants';

interface InvestorEngagementStudioProps {
  investor: any;
  onClose: () => void;
}

export function InvestorEngagementStudio({ investor, onClose }: InvestorEngagementStudioProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'content' | 'insights'>('email');
  const [emailTone, setEmailTone] = useState<'professional' | 'warm' | 'data-driven'>('professional');
  const [contentType, setContentType] = useState<'summary' | 'report' | 'visual'>('summary');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Default investor data when none is selected
  const investorData = investor || {
    name: 'Target Investor',
    keyPerson: '[Investor Name]',
    insight: 'Strategic investor profile with focus on industrial sector opportunities.',
    fundSize: 'TBD',
    recentMove: 'Recent activity in similar companies'
  };

  // AI Email Generator
  const generateEmail = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const emailTemplates = {
    professional: `Subject: Strategic Investment Opportunity - Pyramid Technoplast

Dear ${investorData.keyPerson},

I hope this message finds you well. Given ${investorData.name}'s proven track record in identifying value creation opportunities in the industrial sector, I wanted to bring Pyramid Technoplast to your attention.

**Why This Aligns With Your Investment Thesis:**

${investorData.insight}

**Our Differentiation:**
• Market Leadership: Top 3 player in rigid plastic packaging
• Operational Excellence: 40% ROCE vs industry average of 32%
• Growth Trajectory: 21% YoY revenue growth with strong visibility
• Financial Strength: Debt/Equity of 0.42 with zero promoter pledge

**Recent Milestones:**
✓ Wada facility expansion completed (capacity doubled)
✓ 6 MW solar plant commissioned (ESG + cost optimization)
✓ Institutional interest building: DIIs +0.47%, FIIs entering

**Investment Highlights:**
• Current Market Cap: ₹${PYRAMID_DATA.marketCap} Cr
• Valuation: P/E of ${PYRAMID_DATA.peRatio} vs industry 28.2
• Liquidity: Daily avg volume ₹5.2 Cr

I would welcome the opportunity to discuss this in detail and arrange a facility visit.

Best regards,
CEO Office
Pyramid Technoplast Ltd
BSE: 543969 | NSE: PYRAMID`,

    warm: `Subject: An exciting opportunity I wanted to share with you

Hi ${investorData.keyPerson},

I've been following ${investorData.name}'s impressive portfolio moves, and ${investorData.recentMove.toLowerCase()} particularly caught my attention.

Given your focus on companies with strong fundamentals and growth potential, I thought Pyramid Technoplast might resonate with your investment philosophy.

**Here's what makes us special:**

We're not just another packaging company - we're at the intersection of manufacturing excellence and sustainability. Our recent expansion (Wada facility + 6 MW solar) positions us uniquely for the next phase of growth.

**The numbers tell our story:**
• Growing 21% YoY while maintaining 40% ROCE
• Trading at P/E ${PYRAMID_DATA.peRatio} (40% discount to peers)
• Zero promoter pledge, strong balance sheet (D/E: 0.42)
• Institutional money starting to take notice

**Why now?**
${investorData.insight}

I'd love to connect for a quick call or coffee to explore if there's a fit. Happy to share our detailed investor deck and arrange a facility tour.

Looking forward to hearing from you!

Warm regards,
CEO Office
Pyramid Technoplast Ltd`,

    'data-driven': `Subject: Data-Backed Investment Case - Pyramid Technoplast

Dear ${investorData.keyPerson},

**Investment Opportunity: Pyramid Technoplast Ltd (BSE: 543969)**

**Executive Summary:**
High-ROCE industrial packaging player trading at significant discount to intrinsic value, with strong growth catalysts and institutional accumulation pattern.

**Quantitative Metrics:**
┌─────────────────────────────────────────┐
│ Market Cap: ₹${PYRAMID_DATA.marketCap} Cr
│ P/E Ratio: ${PYRAMID_DATA.peRatio}x (vs industry 28.2x)
│ ROCE: 40% (vs industry 32%)
│ Revenue Growth: 21% YoY
│ Debt/Equity: 0.42
│ Promoter Holding: 74.94% (Zero pledge)
└─────────────────────────────────────────┘

**Institutional Flow Analysis:**
• DIIs: +0.47% QoQ (accumulation)
• FIIs: Entered at 1.04% (fresh positions)
• Mutual Funds: 2 new entrants in Q4

**Valuation Arbitrage:**
• Trading at 40% discount to Time Technoplast
• Superior margins: 40% ROCE vs Time's 32%
• Lower leverage: D/E 0.42 vs Time's 0.68

**Growth Catalysts:**
[1] Capacity expansion: Wada facility operational (2x capacity)
[2] Cost optimization: 6 MW solar plant commissioned
[3] Market expansion: Export orders growing 28% YoY
[4] ESG positioning: Sustainable packaging solutions

**Why ${investorData.name}:**
${investorData.insight}

**Recommended Action:**
Build 2-3% position at current levels. Target upside: 45-50% over 12-18 months.

Detailed models and management presentation available upon request.

Best regards,
CEO Office, Pyramid Technoplast Ltd
ir@pyramidtechno.com | +91-22-XXXX-XXXX`
  };

  // Content Templates
  const contentTemplates = {
    summary: {
      title: 'Investment Thesis - One Pager',
      preview: 'AI-generated professional summary highlighting key metrics, growth drivers, and investment rationale tailored to the investor\'s focus areas.',
      format: 'PDF • 1 page • Professional design'
    },
    report: {
      title: 'Comprehensive Investment Report',
      preview: 'Detailed 8-page report with financial analysis, industry positioning, management commentary, risk factors, and valuation models.',
      format: 'PDF • 8 pages • Executive presentation'
    },
    visual: {
      title: 'Infographic Investment Deck',
      preview: 'Visually compelling data story with charts, metrics, and growth trajectory designed for social sharing and presentations.',
      format: 'PNG/PDF • Shareable format'
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[90vh] bg-background rounded-2xl border-2 border-border shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-b-2 border-border p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">AI Engagement Studio</h2>
                  <p className="text-sm text-muted-foreground">Create personalized content for {investorData.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {investorData.matchScore}% Match
                </Badge>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg hover:bg-surface transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'email'
                  ? 'bg-background border-2 border-border shadow-lg'
                  : 'hover:bg-surface/50'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email Drafter
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'content'
                  ? 'bg-background border-2 border-border shadow-lg'
                  : 'hover:bg-surface/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Content Creator
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'insights'
                  ? 'bg-background border-2 border-border shadow-lg'
                  : 'hover:bg-surface/50'
              }`}
            >
              <Target className="w-4 h-4" />
              Deep Insights
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* EMAIL DRAFTER */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              {/* Tone Selector */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Email Tone</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'professional', label: 'Professional', desc: 'Formal & detailed' },
                    { id: 'warm', label: 'Warm', desc: 'Friendly & personal' },
                    { id: 'data-driven', label: 'Data-Driven', desc: 'Numbers focused' }
                  ].map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setEmailTone(tone.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        emailTone === tone.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-border hover:border-border/50'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">{tone.label}</div>
                      <div className="text-xs text-muted-foreground">{tone.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated Email */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Generated Email</h3>
                  <button
                    onClick={generateEmail}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold hover:bg-purple-500/20 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Generating...' : 'Regenerate'}
                  </button>
                </div>
                <Card className="p-0 overflow-hidden">
                  <div className="bg-surface/50 p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">AI-crafted for:</div>
                          <div className="text-sm font-semibold">{investorData.keyPerson} • {investorData.name}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopy(emailTemplates[emailTone])}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-all"
                        >
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all">
                          <Send className="w-3 h-3" />
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 font-mono text-xs bg-black/20">
                    <pre className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                      {emailTemplates[emailTone]}
                    </pre>
                  </div>
                </Card>
              </div>

              {/* Personalization Insights */}
              <Card className="p-4 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm mb-1 text-amber-400">Personalization Applied</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Referenced their recent move: "{investorData.recentMove}"</li>
                      <li>• Highlighted strategic fit: Match score {investorData.matchScore}%</li>
                      <li>• Tailored metrics based on {investorData.name}'s investment criteria</li>
                      <li>• Incorporated your company's latest achievements</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* CONTENT CREATOR */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Select Content Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(contentTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => setContentType(key as any)}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${
                        contentType === key
                          ? 'border-blue-500 bg-blue-500/10 shadow-lg'
                          : 'border-border hover:border-border/50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-3">
                        {key === 'summary' && <FileText className="w-5 h-5 text-blue-400" />}
                        {key === 'report' && <BarChart3 className="w-5 h-5 text-blue-400" />}
                        {key === 'visual' && <ImageIcon className="w-5 h-5 text-blue-400" />}
                      </div>
                      <div className="font-semibold mb-2">{template.title}</div>
                      <div className="text-xs text-muted-foreground mb-3">{template.preview}</div>
                      <div className="text-xs font-mono text-blue-400">{template.format}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview & Generate */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold mb-1">{contentTemplates[contentType].title}</h3>
                    <p className="text-sm text-muted-foreground">Tailored for {investorData.name}</p>
                  </div>
                  <button
                    onClick={generateEmail}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>

                {/* Content Customization */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-surface/50 border border-border">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="text-sm font-semibold">Include Growth Metrics</div>
                        <div className="text-xs text-muted-foreground">Revenue, ROCE, margin trends</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-surface/50 border border-border">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-semibold">Valuation Comparison</div>
                        <div className="text-xs text-muted-foreground">Peer benchmarking charts</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-surface/50 border border-border">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-sm font-semibold">Investor-Specific Insights</div>
                        <div className="text-xs text-muted-foreground">Why this fits their thesis</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
                  </div>
                </div>

                {/* Preview */}
                <div className="aspect-[8.5/11] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border-2 border-border overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-sm text-muted-foreground">Content preview will appear here</p>
                      <p className="text-xs text-muted-foreground mt-1">Click "Generate with AI" to create</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface hover:bg-surface-overlay border border-border text-sm font-semibold transition-all">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface hover:bg-surface-overlay border border-border text-sm font-semibold transition-all">
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* DEEP INSIGHTS */}
          {activeTab === 'insights' && (
            <div className="space-y-4">
              <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AI Strategic Analysis</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {investorData.insight}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-4">Investor Profile Deep Dive</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                    <div>
                      <div className="text-sm font-semibold mb-1">Fund Size & Strategy</div>
                      <div className="text-sm text-muted-foreground">{investorData.fundSize}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                    <div>
                      <div className="text-sm font-semibold mb-1">Recent Activity</div>
                      <div className="text-sm text-muted-foreground">{investorData.recentMove}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-2" />
                    <div>
                      <div className="text-sm font-semibold mb-1">Investment Thesis Fit</div>
                      <div className="text-sm text-muted-foreground">
                        Your company's {PYRAMID_DATA.peRatio}x P/E, 40% ROCE, and recent capacity expansion align perfectly with their focus on quality manufacturing businesses with visible growth.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold mb-4">Engagement Timeline</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Day 1', action: 'Send personalized email', status: 'ready' },
                    { day: 'Day 3', action: 'Follow-up with investment deck', status: 'pending' },
                    { day: 'Day 7', action: 'Schedule facility visit call', status: 'pending' },
                    { day: 'Day 14', action: 'Share detailed financial models', status: 'pending' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-surface/50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${
                        item.status === 'ready' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-surface-overlay text-muted-foreground'
                      }`}>
                        {item.day.split(' ')[1]}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{item.action}</div>
                      </div>
                      {item.status === 'ready' && (
                        <ChevronRight className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}