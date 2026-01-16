import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeSelectorProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️' },
    { id: 'pearl', name: 'Pearl', icon: '✨' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
    { id: 'metallic-dark', name: 'Navy', icon: '🌊' },
    { id: 'metallic-slate', name: 'Slate', icon: '⚙️' },
  ] as const;

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-surface hover:bg-surface-overlay border border-border transition-all flex items-center justify-center group relative overflow-hidden"
        title="Change theme"
      >
        <Palette className="w-4 h-4 md:w-[18px] md:h-[18px] text-foreground/70 group-hover:text-foreground transition-colors relative z-10" />
        {/* Active indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-card border-2 border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 space-y-1">
            {themes.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                    isSelected
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      : 'hover:bg-surface text-foreground/80 hover:text-foreground'
                  }`}
                >
                  <span className="text-lg">{theme.icon}</span>
                  <span className="flex-1 text-sm font-medium">{theme.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                </button>
              );
            })}
          </div>
          
          {/* Footer */}
          <div className="px-3 py-2 border-t border-border bg-surface/50">
            <p className="text-xs text-muted-foreground">More themes in Settings</p>
          </div>
        </div>
      )}
    </div>
  );
}