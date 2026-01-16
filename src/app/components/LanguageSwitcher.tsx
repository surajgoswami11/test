import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  description?: string;
}

export const languages: Language[] = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English', 
    flag: '🇬🇧',
    description: 'Full English interface'
  },
  { 
    code: 'hi-en', 
    name: 'Hinglish', 
    nativeName: 'हिंग्लिश', 
    flag: '🇮🇳',
    description: 'Mix of Hindi + English'
  },
  { 
    code: 'hi', 
    name: 'Hindi', 
    nativeName: 'हिंदी', 
    flag: '🇮🇳',
    description: 'पूर्ण हिंदी अनुवाद'
  },
  { 
    code: 'gu', 
    name: 'Gujarati', 
    nativeName: 'ગુજરાતી', 
    flag: '🇮🇳',
    description: 'સંપૂર્ણ ગુજરાતી'
  },
  { 
    code: 'mr', 
    name: 'Marathi', 
    nativeName: 'मराठी', 
    flag: '🇮🇳',
    description: 'संपूर्ण मराठी'
  },
  { 
    code: 'ta', 
    name: 'Tamil', 
    nativeName: 'தமிழ்', 
    flag: '🇮🇳',
    description: 'முழு தமிழ்'
  },
  { 
    code: 'te', 
    name: 'Telugu', 
    nativeName: 'తెలుగు', 
    flag: '🇮🇳',
    description: 'పూర్తి తెలుగు'
  },
  { 
    code: 'kn', 
    name: 'Kannada', 
    nativeName: 'ಕನ್ನಡ', 
    flag: '🇮🇳',
    description: 'ಸಂಪೂರ್ಣ ಕನ್ನಡ'
  },
];

interface LanguageSwitcherProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSwitcher({ selectedLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all flex items-center justify-center relative group"
        aria-label="Change language"
        title={`Current: ${selectedLanguage.name}`}
      >
        <Globe className="w-4 h-4 text-foreground" />
        
        {/* Language Code Badge */}
        <div className="absolute -bottom-1 -right-1 px-1 py-0.5 bg-blue-500 rounded text-[9px] font-bold text-white font-mono shadow-lg">
          {selectedLanguage.code === 'hi-en' ? 'HE' : selectedLanguage.code.toUpperCase().slice(0, 2)}
        </div>
        
        {/* Tooltip on hover */}
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-background border border-border rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {selectedLanguage.name}
        </div>
      </button>

      {/* Dropdown Menu - ALWAYS FIXED to escape TopBar's z-40 stacking context */}
      {isOpen && (
        <div className="fixed top-[4.5rem] right-3 md:top-[5rem] md:right-6 w-72 rounded-xl bg-background border border-border shadow-2xl overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="px-3 py-2.5 border-b border-border bg-surface/50">
            <h3 className="font-semibold text-sm">Language</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Choose interface language
            </p>
          </div>

          {/* Language List */}
          <div className="max-h-[400px] overflow-y-auto">
            {languages.map((lang) => {
              const isSelected = selectedLanguage.code === lang.code;
              const isHinglish = lang.code === 'hi-en';
              
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-surface/80 transition-all relative ${
                    isSelected ? 'bg-blue-500/10' : ''
                  }`}
                >
                  {/* Flag */}
                  <span className="text-2xl flex-shrink-0">{lang.flag}</span>
                  
                  {/* Language Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{lang.name}</p>
                      {isHinglish && (
                        <span className="px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] rounded font-bold">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{lang.nativeName}</p>
                    {lang.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 opacity-60">
                        {lang.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="px-4 py-3 border-t border-border bg-surface/50">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px]">💡</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your language preference is saved automatically and applies across all modules, reports, and AI responses.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}