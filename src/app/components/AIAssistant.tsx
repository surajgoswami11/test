import { useState } from 'react';
import { Bot, Mic, MicOff, X, Send, Sparkles } from 'lucide-react';
import { Badge } from './SharedComponents';
import { Language } from './LanguageSwitcher';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  selectedLanguage: Language;
}

export function AIAssistant({ selectedLanguage }: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your AI-powered financial assistant. Ask me anything about the data on this page, or request explanations for any metric or widget. I'll respond in ${selectedLanguage.name}.`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice listening
      setTimeout(() => {
        const mockQuestion = "What does P/E ratio mean?";
        setMessages(prev => [
          ...prev,
          { role: 'user', content: mockQuestion, timestamp: new Date() },
        ]);
        
        // Simulate AI response
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: 'The P/E (Price-to-Earnings) ratio measures how much investors are willing to pay for each rupee of earnings. Pyramid Technoplast\'s P/E of 17.1 means the stock trades at 17.1 times its annual earnings. This is 39% below the industry average of 28.2, suggesting the stock may be undervalued relative to peers.',
              timestamp: new Date(),
            },
          ]);
          setIsListening(false);
        }, 2000);
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [
      ...prev,
      { role: 'user', content: inputValue, timestamp: new Date() },
    ]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on the current data, FII (Foreign Institutional Investors) stake increased by 62% QoQ to 1.02%. This indicates growing confidence from international investors in Pyramid Technoplast's growth prospects.",
        "The Strategic Intelligence Brief provides AI-powered insights to help you prepare for analyst calls. It includes anticipated questions, competitive positioning, talking points, and risk mitigation strategies - essentially making you 200% prepared for investor interactions.",
        "The RSI (Relative Strength Index) at 42.3 suggests the stock is approaching oversold territory. This technical indicator can signal a potential bounce-back opportunity, especially when combined with strong fundamentals.",
      ];
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        },
      ]);
    }, 1500);
    
    setInputValue('');
  };

  const suggestedQuestions = [
    "Explain the Strategic Intelligence Brief",
    "What does the Support/Resistance level mean?",
    "Why is FII stake important?",
    "How do I use The Hunter module?",
  ];

  return (
    <>
      {/* Floating Button - Collapsed State */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          style={{ 
            position: 'fixed',
            bottom: '5rem',
            right: '1rem',
            left: 'auto'
          }}
          className="w-14 h-14 md:bottom-6 md:right-6 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 flex items-center justify-center group hover:scale-110 hover:shadow-purple-500/40 hover:border-purple-400/50 transition-all z-[100] overflow-hidden"
        >
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Bot icon with sparkles */}
          <div className="relative">
            <Bot className="w-7 h-7 md:w-8 md:h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
            
            {/* Floating sparkles */}
            <Sparkles className="w-3 h-3 text-fuchsia-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          
          {/* "AI" badge */}
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-purple-500/80 border border-purple-400/50 shadow-lg">
            <span className="text-[8px] md:text-[9px] font-bold text-white tracking-wide">AI</span>
          </div>
        </button>
      )}

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-6 md:w-[440px] h-[85vh] md:h-[600px] rounded-t-2xl md:rounded-2xl bg-surface/95 backdrop-blur-2xl border-t md:border border-border shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="p-3 md:p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">AI Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="text-blue-400">{selectedLanguage.name}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-600 border-0 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5">
                PREMIUM
              </Badge>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-lg hover:bg-surface-overlay transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-xl px-3 md:px-4 py-2 md:py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white'
                        : 'bg-surface-overlay border border-border'
                    }`}
                  >
                    <p className="text-xs md:text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-[10px] md:text-xs mt-1 ${
                      message.role === 'user' ? 'text-purple-100' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-3 md:px-4 pb-2 md:pb-3 space-y-2">
                <p className="text-xs text-muted-foreground">Suggested questions:</p>
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(question)}
                    className="w-full text-left px-2.5 md:px-3 py-2 md:py-2.5 rounded-lg bg-surface-overlay border border-border hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-xs md:text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 md:p-4 border-t border-border bg-surface-overlay/50 safe-area-bottom">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVoiceToggle}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                    isListening
                      ? 'bg-rose-500/20 border border-rose-500/50 animate-pulse'
                      : 'bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
                  ) : (
                    <Mic className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                  )}
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening..." : "Type your question..."}
                  disabled={isListening}
                  className="flex-1 px-3 md:px-4 py-2 md:py-2.5 rounded-xl bg-background/50 border border-border focus:border-purple-500/50 focus:bg-background focus:outline-none text-xs md:text-sm transition-all placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/20 transition-all flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </button>
              </div>
              {isListening && (
                <div className="mt-2 md:mt-3 flex items-center justify-center gap-1">
                  <div className="w-0.5 md:w-1 h-2 md:h-3 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-0.5 md:w-1 h-3 md:h-5 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-0.5 md:w-1 h-2.5 md:h-4 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  <div className="w-0.5 md:w-1 h-4 md:h-6 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                  <div className="w-0.5 md:w-1 h-2 md:h-3 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}