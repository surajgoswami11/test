import { Shield, Lock, Upload, AlertTriangle, CheckCircle2, Send, Trash2, FileText, Sparkles, X, Check } from 'lucide-react';
import { useState } from 'react';
import { Card, Badge } from './SharedComponents';

const sampleQuestions = [
  'What are the disclosure requirements for my shareholding?',
  'Analyze this document for compliance risks',
  'Help me draft a sensitive board communication',
  'Review insider trading implications',
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isDocument?: boolean;
  fileName?: string;
}

export function PrivateVault() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSend = () => {
    if (!message.trim() && !uploadedFile) return;
    
    const newMessage: Message = {
      role: 'user',
      content: uploadedFile 
        ? `Uploaded document for analysis: ${uploadedFile}`
        : message,
      timestamp: new Date(),
      isDocument: !!uploadedFile,
      fileName: uploadedFile || undefined
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
    setUploadedFile(null);
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        role: 'assistant',
        content: uploadedFile 
          ? `I've analyzed the document "${uploadedFile}" in a secure environment. Here's what I found:\n\n✓ No immediate compliance issues detected\n✓ Language appears appropriate for board-level communication\n✓ Contains standard financial disclosures\n\nKey recommendation: Consider having legal review Section 3 before external distribution.\n\nThis analysis was performed privately and will not be stored.`
          : `I've processed your query securely. Here's my analysis:\n\nBased on current SEBI regulations, your query relates to insider trading guidelines. All communications during closed trading windows should be carefully reviewed.\n\nWould you like me to provide specific guidance on any aspect?\n\nNote: This conversation is encrypted and will be deleted when you end your session.`,
        timestamp: new Date(),
      };
      setChatHistory(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    setShowClearConfirm(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Simplified Header */}
      <div className="border-b border-border bg-gradient-to-r from-emerald-500/5 to-green-500/5 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base md:text-xl font-semibold">Private Vault</h2>
              <p className="text-xs text-muted-foreground hidden md:block">End-to-end encrypted AI workspace</p>
            </div>
          </div>

          {/* Clear History Button */}
          {chatHistory.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-xs md:text-sm text-muted-foreground hover:text-rose-400"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden md:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md p-6">
            <h3 className="font-semibold mb-2">Clear Chat History?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This will permanently delete all messages and uploaded documents from this session.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition-all text-sm"
              >
                Clear History
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Chat Area - Flexible Height */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto pb-4">
          {chatHistory.length === 0 ? (
            // Empty State - Mobile-Optimized
            <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
              <div className="text-center max-w-2xl px-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold mb-2">Your Secure AI Workspace</h3>
                <p className="text-sm text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  Ask sensitive questions or upload confidential documents. Everything is encrypted.
                </p>

                {/* Quick start examples - Mobile Friendly */}
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Quick start:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {sampleQuestions.map((question, i) => (
                      <button
                        key={i}
                        onClick={() => setMessage(question)}
                        className="p-3 rounded-lg bg-surface border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 text-left text-sm transition-all group"
                      >
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                          <span className="leading-relaxed line-clamp-2">{question}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Privacy Notice - Compact */}
                <div className="mt-6 md:mt-8 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground text-left leading-relaxed">
                      <strong className="text-amber-600 dark:text-amber-400">Demo:</strong> For production, implement proper security infrastructure.
                    </p>
                  </div>
                </div>

                {/* Clear CTA - Scroll to input */}
                <div className="mt-6 md:mt-8">
                  <p className="text-sm text-muted-foreground mb-3">Ready to get started?</p>
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                      input?.focus();
                      input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Start Secure Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Chat Messages - Cleaner design
            <div className="space-y-4 pb-6">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-2xl ${msg.role === 'user' ? 'ml-12' : 'mr-12'}`}>
                    {/* Message Header */}
                    <div className={`flex items-center gap-2 mb-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                          <Shield className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <span className="text-xs font-medium text-muted-foreground">
                        {msg.role === 'user' ? 'You' : 'Secure AI'}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                    </div>
                    
                    {/* Message Content */}
                    <Card className={`p-4 ${
                      msg.role === 'user' 
                        ? 'bg-blue-500/10 border-blue-500/30' 
                        : 'bg-surface border-border'
                    }`}>
                      {msg.isDocument && (
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{msg.fileName}</p>
                            <p className="text-xs text-muted-foreground">Document uploaded</p>
                          </div>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                      
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-xs text-muted-foreground">Processed securely · Will not be stored</span>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start mr-12">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">Secure AI</span>
                    </div>
                    <Card className="p-4 bg-surface border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs text-muted-foreground">Analyzing securely...</span>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Simplified */}
      <div className="border-t border-border bg-surface/50 backdrop-blur-xl px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {/* File Upload Preview */}
          {uploadedFile && (
            <div className="mb-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600 dark:text-blue-400">{uploadedFile}</span>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="p-1 hover:bg-rose-500/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-rose-500" />
              </button>
            </div>
          )}

          {/* Input Row */}
          <div className="flex gap-3">
            <label className="px-4 py-3 rounded-lg bg-surface border border-border hover:bg-surface-hover transition-all cursor-pointer flex items-center gap-2 text-sm group">
              <Upload className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span>Upload</span>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={uploadedFile ? "Add a message about this document..." : "Ask anything about compliance, strategy, or holdings..."}
              className="flex-1 px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-muted-foreground"
            />
            
            <button
              onClick={handleSend}
              disabled={!message.trim() && !uploadedFile}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:shadow-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          {/* Info Footer - Simplified */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Not stored on servers</span>
              </div>
            </div>
            
            <span className="text-xs text-muted-foreground">
              Press Enter to send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}