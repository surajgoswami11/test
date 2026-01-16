// Debug Utility for Promoter.OS Enterprise
// Centralized logging system with color-coded output

class DebugLogger {
  private isEnabled: boolean = false;
  private prefix = '[Promoter.OS]';

  constructor() {
    // Check localStorage for debug mode
    this.isEnabled = localStorage.getItem('promoter-os-debug-mode') === 'true';
    if (this.isEnabled) {
      this.log('🐛 Debug mode is ENABLED', 'system');
    }
  }

  enable() {
    this.isEnabled = true;
    localStorage.setItem('promoter-os-debug-mode', 'true');
    console.log(
      `%c${this.prefix} 🐛 DEBUG MODE ENABLED`,
      'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    );
  }

  disable() {
    this.isEnabled = false;
    localStorage.setItem('promoter-os-debug-mode', 'false');
    console.log(
      `%c${this.prefix} 🔇 DEBUG MODE DISABLED`,
      'background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    );
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.isEnabled;
  }

  isDebugEnabled() {
    return this.isEnabled;
  }

  log(message: string, category: 'system' | 'navigation' | 'drag-drop' | 'settings' | 'market' | 'storage' | 'theme' | 'language' | 'component' | 'error' | 'api' = 'system', data?: any) {
    if (!this.isEnabled) return;

    const categoryStyles: Record<string, { emoji: string; color: string; bg: string }> = {
      system: { emoji: '⚙️', color: '#3b82f6', bg: '#dbeafe' },
      navigation: { emoji: '🧭', color: '#8b5cf6', bg: '#ede9fe' },
      'drag-drop': { emoji: '🎯', color: '#f59e0b', bg: '#fef3c7' },
      settings: { emoji: '⚡', color: '#06b6d4', bg: '#cffafe' },
      market: { emoji: '📈', color: '#10b981', bg: '#d1fae5' },
      storage: { emoji: '💾', color: '#6366f1', bg: '#e0e7ff' },
      theme: { emoji: '🎨', color: '#ec4899', bg: '#fce7f3' },
      language: { emoji: '🌍', color: '#14b8a6', bg: '#ccfbf1' },
      component: { emoji: '🧩', color: '#a855f7', bg: '#f3e8ff' },
      error: { emoji: '❌', color: '#ef4444', bg: '#fee2e2' },
      api: { emoji: '🔌', color: '#f97316', bg: '#ffedd5' },
    };

    const style = categoryStyles[category];
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });

    console.log(
      `%c${this.prefix} ${style.emoji} ${category.toUpperCase()}%c ${timestamp} %c${message}`,
      `background: ${style.color}; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;`,
      `color: ${style.color}; font-weight: normal; opacity: 0.7;`,
      `color: ${style.color}; font-weight: 500;`,
      data !== undefined ? data : ''
    );

    if (data !== undefined) {
      console.log(`%c└─ Data:`, `color: ${style.color}; font-weight: bold;`, data);
    }
  }

  group(title: string, category: 'system' | 'navigation' | 'drag-drop' | 'settings' | 'market' | 'storage' | 'theme' | 'language' | 'component' | 'error' | 'api' = 'system') {
    if (!this.isEnabled) return;
    console.group(`${this.prefix} ${title}`);
  }

  groupEnd() {
    if (!this.isEnabled) return;
    console.groupEnd();
  }

  table(data: any) {
    if (!this.isEnabled) return;
    console.table(data);
  }

  time(label: string) {
    if (!this.isEnabled) return;
    console.time(`${this.prefix} ${label}`);
  }

  timeEnd(label: string) {
    if (!this.isEnabled) return;
    console.timeEnd(`${this.prefix} ${label}`);
  }

  error(message: string, error?: any) {
    // Always log errors, even when debug is disabled
    console.error(
      `%c${this.prefix} ❌ ERROR`,
      'background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
      message,
      error || ''
    );
  }
}

// Create singleton instance
export const debugLog = new DebugLogger();

// Make it globally accessible for console testing
if (typeof window !== 'undefined') {
  (window as any).debugLog = debugLog;
  (window as any).enableDebug = () => debugLog.enable();
  (window as any).disableDebug = () => debugLog.disable();
  (window as any).toggleDebug = () => debugLog.toggle();
}
