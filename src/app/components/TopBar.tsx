import { Search, Bell, Moon, Sun, Settings, Menu } from 'lucide-react';
import { useState } from 'react';
import { LanguageSwitcher, Language } from './LanguageSwitcher';

interface TopBarProps {
  onThemeToggle: () => void;
  isDark: boolean;
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onOpenSettings: () => void;
  onToggleSidebar?: () => void; // Make optional since we don't need it anymore
}

export function TopBar({ onThemeToggle, isDark, selectedLanguage, onLanguageChange, onOpenSettings, onToggleSidebar }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="sticky top-0 z-40 h-16 md:h-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="h-full px-3 md:px-6 flex items-center justify-between gap-2 md:gap-6 relative">
        {/* Mobile: Logo instead of Menu Button */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">S</span>
          </div>
        </div>

        {/* Actions - LEFT SIDE (Notifications & User Avatar) */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Notifications - Hidden on small mobile */}
          <button className="relative w-9 h-9 md:w-10 md:h-10 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all flex items-center justify-center hidden sm:flex">
            <Bell className="w-4 h-4 text-foreground" />
            <span className="absolute top-1 right-1 md:top-1.5 md:right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-background" />
          </button>

          {/* User Avatar */}
          <button className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-xs text-white font-semibold">PT</span>
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-sm font-medium">Pyramid Tech</div>
              <div className="text-xs text-muted-foreground">CEO Office</div>
            </div>
          </button>
        </div>

        {/* RIGHT-ALIGNED CONTROLS - Fixed to right edge */}
        <div className="fixed right-3 md:right-6 top-3 md:top-5 flex items-center gap-1 md:gap-2 z-50">
          {/* Language Switcher - Hidden on small mobile */}
          <div className="hidden sm:block">
            <LanguageSwitcher 
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-foreground" />
            ) : (
              <Moon className="w-4 h-4 text-foreground" />
            )}
          </button>

          {/* Settings - Hidden on mobile, show in menu */}
          <button
            onClick={onOpenSettings}
            className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all flex items-center justify-center hidden md:flex"
            aria-label="Open settings"
          >
            <Settings className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}