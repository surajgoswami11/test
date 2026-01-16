import { useState, useRef, useEffect } from 'react';
import { X, Check, User, Settings as SettingsIcon, Bell, Database, Shield, Sparkles, Globe, Moon, Sun, Save, Palette, ChevronRight } from 'lucide-react';
import { Card, Badge } from './SharedComponents';
import { Language, languages } from './LanguageSwitcher';
import { ThemeMode } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onResetTabOrder: () => void;
}

type SettingsCategory = 'profile' | 'preferences' | 'personalization' | 'dashboard' | 'notifications' | 'data';
type SettingsView = 'main' | 'category';

export function SettingsModal({ 
  isOpen, 
  onClose, 
  selectedLanguage, 
  onLanguageChange,
  currentTheme,
  onThemeChange,
  onResetTabOrder
}: SettingsModalProps) {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('preferences');
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const [autoSave, setAutoSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [selectedAccent, setSelectedAccent] = useState('blue-purple');
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: 'Pyramid Technoplast Ltd',
    ceoName: 'Your Name',
    email: 'ceo@pyramidtechnoplast.com',
    phone: '+91 98765 43210',
  });

  // Dashboard settings
  const [dashboardSettings, setDashboardSettings] = useState({
    refreshInterval: '30',
    showAIInsights: true,
    showTechnicalAnalysis: true,
    showNewsFeeds: true,
    compactView: false,
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    priceAlerts: true,
    volumeSpikes: true,
    newsAlerts: true,
    complianceReminders: true,
    emailDigest: 'daily',
  });

  // Auto-save simulation
  useEffect(() => {
    if (autoSave && saveStatus === 'idle') {
      const timer = setTimeout(() => {
        setSaveStatus('saving');
        setTimeout(() => {
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        }, 500);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [profileData, dashboardSettings, notificationSettings, autoSave, saveStatus]);

  const handleManualSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const handleCategoryClick = (categoryId: SettingsCategory) => {
    setActiveCategory(categoryId);
    setCurrentView('category');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (!isOpen) return null;

  const categories = [
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User,
      description: 'Company & contact information',
      badge: null
    },
    { 
      id: 'preferences', 
      label: 'Appearance', 
      icon: Palette,
      description: 'Theme, language & display',
      badge: currentTheme
    },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-end md:items-center justify-center">
      {/* Mobile: Bottom Sheet | Desktop: Center Modal */}
      <div className="w-full md:max-w-4xl md:max-h-[85vh] h-[92vh] md:h-auto bg-background md:rounded-2xl rounded-t-3xl border-2 border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 md:slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <div className="flex items-center gap-3">
            {/* Mobile: Back button when in category view */}
            {currentView === 'category' && (
              <button
                onClick={handleBackToMain}
                className="md:hidden w-8 h-8 rounded-lg hover:bg-surface transition-colors flex items-center justify-center"
              >
                ←
              </button>
            )}
            
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold">
                {currentView === 'category' && window.innerWidth < 768
                  ? categories.find(c => c.id === activeCategory)?.label
                  : 'Settings'
                }
              </h2>
              <p className="text-xs text-muted-foreground hidden md:block">Manage your preferences</p>
            </div>
          </div>
          
          {/* Save Status & Close */}
          <div className="flex items-center gap-3">
            {/* Save Status Indicator */}
            {saveStatus === 'saving' && (
              <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            )}
            {saveStatus === 'saved' && (
              <div className="hidden md:flex items-center gap-2 text-xs text-emerald-400">
                <Check className="w-3 h-3" />
                <span>Saved</span>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-surface transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* MAIN VIEW - Category Cards (Mobile) or Desktop Layout */}
          {currentView === 'main' && (
            <div className="md:hidden p-4 space-y-3">
              {/* Subscription Status - Always Visible at Top */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl opacity-20 blur-md" />
                  <Card className="relative p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-600 border-0 text-white text-xs px-2 py-0.5 mb-1">
                            PREMIUM
                          </Badge>
                          <h3 className="font-semibold">Enterprise Plan</h3>
                          <p className="text-xs text-muted-foreground">Active until Dec 26, 2026</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-background/50">
                        <p className="text-xs text-muted-foreground">Annual Cost</p>
                        <p className="text-sm font-semibold">₹5,00,000</p>
                      </div>
                      <div className="p-2 rounded-lg bg-background/50">
                        <p className="text-xs text-muted-foreground">Features</p>
                        <p className="text-sm font-semibold">All Unlocked</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>AI Assistant, Reach, Strategic Intelligence, News Intelligence</span>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Quick Settings - Always Visible */}
              <div className="space-y-3 mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-2">Quick Settings</h3>
                
                {/* Theme Switcher - Compact */}
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                        <Palette className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Theme</p>
                        <p className="text-xs text-muted-foreground capitalize">{currentTheme}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>

                {/* Language Switcher - Compact */}
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Language</p>
                        <p className="text-xs text-muted-foreground">{selectedLanguage.name}</p>
                      </div>
                    </div>
                    <span className="text-xl">{selectedLanguage.flag}</span>
                  </div>
                </Card>
              </div>

              {/* All Categories */}
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-2 mt-6">All Settings</h3>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id as SettingsCategory)}
                    className="w-full"
                  >
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-sm font-medium">{category.label}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{category.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>
          )}

          {/* DESKTOP VIEW - Two Panel */}
          <div className="hidden md:flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-surface border-r border-border p-4">
              <nav className="space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as SettingsCategory)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'hover:bg-surface-overlay text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content - Desktop */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {renderCategoryContent(
                activeCategory,
                profileData,
                setProfileData,
                currentTheme,
                onThemeChange,
                selectedLanguage,
                onLanguageChange,
                autoSave,
                setAutoSave,
                selectedAccent,
                setSelectedAccent,
                dashboardSettings,
                setDashboardSettings,
                notificationSettings,
                setNotificationSettings,
                onResetTabOrder
              )}
            </div>
          </div>

          {/* CATEGORY VIEW - Mobile */}
          {currentView === 'category' && (
            <div className="md:hidden p-4 space-y-6">
              {renderCategoryContent(
                activeCategory,
                profileData,
                setProfileData,
                currentTheme,
                onThemeChange,
                selectedLanguage,
                onLanguageChange,
                autoSave,
                setAutoSave,
                selectedAccent,
                setSelectedAccent,
                dashboardSettings,
                setDashboardSettings,
                notificationSettings,
                setNotificationSettings,
                onResetTabOrder
              )}
            </div>
          )}
        </div>

        {/* Footer - Save Status (Mobile) */}
        {currentView === 'category' && (
          <div className="md:hidden border-t border-border p-4 bg-surface/50 backdrop-blur-sm">
            {saveStatus === 'saving' && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>Saving changes...</span>
              </div>
            )}
            {saveStatus === 'saved' && (
              <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                <Check className="w-4 h-4" />
                <span>All changes saved</span>
              </div>
            )}
            {saveStatus === 'idle' && autoSave && (
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Auto-save enabled</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Extracted category content renderer
function renderCategoryContent(
  activeCategory: SettingsCategory,
  profileData: any,
  setProfileData: any,
  currentTheme: ThemeMode,
  onThemeChange: any,
  selectedLanguage: Language,
  onLanguageChange: any,
  autoSave: boolean,
  setAutoSave: any,
  selectedAccent: string,
  setSelectedAccent: any,
  dashboardSettings: any,
  setDashboardSettings: any,
  notificationSettings: any,
  setNotificationSettings: any,
  onResetTabOrder: any
) {
  if (activeCategory === 'profile') {
    return (
      <div className="space-y-4 md:space-y-6">
        <Card className="p-4 md:p-6">
          <h4 className="font-semibold mb-4">Company Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Company Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-blue-500 focus:outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">CEO Name</label>
              <input
                type="text"
                value={profileData.ceoName}
                onChange={(e) => setProfileData({ ...profileData, ceoName: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-blue-500 focus:outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-blue-500 focus:outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-blue-500 focus:outline-none text-sm transition-all"
              />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h4 className="font-semibold mb-4">Stock Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">BSE Symbol</label>
              <input
                type="text"
                value="543969"
                disabled
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm font-mono opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">ISIN</label>
              <input
                type="text"
                value="INE0B2V01012"
                disabled
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm font-mono opacity-60"
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (activeCategory === 'preferences') {
    return (
      <div className="space-y-4 md:space-y-6">
        <Card className="p-4 md:p-6">
          <h4 className="font-semibold mb-3">Theme</h4>
          <p className="text-sm text-muted-foreground mb-4">Choose your preferred theme</p>
          
          {/* Mobile: Compact Theme Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Light */}
            <button
              onClick={() => onThemeChange('light')}
              className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                currentTheme === 'light'
                  ? 'border-blue-500 bg-blue-500/5 shadow-md'
                  : 'border-border hover:border-border/80'
              }`}
            >
              <div className="h-12 md:h-16 rounded-lg bg-gradient-to-br from-white to-gray-100 border border-gray-300 mb-2" />
              <p className="text-xs md:text-sm font-medium">Light</p>
              {currentTheme === 'light' && <Check className="w-4 h-4 text-blue-500 mx-auto mt-1" />}
            </button>

            {/* Dark */}
            <button
              onClick={() => onThemeChange('dark')}
              className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                currentTheme === 'dark'
                  ? 'border-blue-500 bg-blue-500/5 shadow-md'
                  : 'border-border hover:border-border/80'
              }`}
            >
              <div className="h-12 md:h-16 rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-zinc-700 mb-2" />
              <p className="text-xs md:text-sm font-medium">Dark</p>
              {currentTheme === 'dark' && <Check className="w-4 h-4 text-blue-500 mx-auto mt-1" />}
            </button>

            {/* Metallic Dark */}
            <button
              onClick={() => onThemeChange('metallic-dark')}
              className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                currentTheme === 'metallic-dark'
                  ? 'border-blue-500 bg-blue-500/5 shadow-md'
                  : 'border-border hover:border-border/80'
              }`}
            >
              <div className="h-12 md:h-16 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/30 mb-2" />
              <p className="text-xs md:text-sm font-medium">Navy</p>
              {currentTheme === 'metallic-dark' && <Check className="w-4 h-4 text-blue-500 mx-auto mt-1" />}
            </button>

            {/* Metallic Slate */}
            <button
              onClick={() => onThemeChange('metallic-slate')}
              className={`p-3 md:p-4 rounded-xl border-2 transition-all ${
                currentTheme === 'metallic-slate'
                  ? 'border-cyan-500 bg-cyan-500/5 shadow-md'
                  : 'border-border hover:border-border/80'
              }`}
            >
              <div className="h-12 md:h-16 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 border border-cyan-500/30 mb-2" />
              <p className="text-xs md:text-sm font-medium">Slate</p>
              {currentTheme === 'metallic-slate' && <Check className="w-4 h-4 text-cyan-500 mx-auto mt-1" />}
            </button>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h4 className="font-semibold mb-3">Language</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {languages.map((lang) => {
              const isSelected = selectedLanguage.code === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang)}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-blue-500/10 border-blue-500/50 shadow-md'
                      : 'bg-surface border-border hover:border-border/80'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{lang.name}</p>
                    <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h4 className="font-semibold mb-4">Data Handling</h4>
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border">
            <div>
              <p className="text-sm font-medium">Auto-save</p>
              <p className="text-xs text-muted-foreground">Save changes automatically</p>
            </div>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`relative w-12 h-6 rounded-full transition-all ${
                autoSave ? 'bg-emerald-500' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-all ${
                  autoSave ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </Card>

        <Card className="p-4 md:p-6 border-amber-500/20 bg-amber-500/5">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <span>Navigation Order</span>
            <Badge variant="premium" className="text-xs">Customizable</Badge>
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            You can drag and drop tabs on desktop to reorder them. Click below to reset to default order.
          </p>
          <button
            onClick={() => {
              if (window.confirm('Reset tab order to default? This cannot be undone.')) {
                onResetTabOrder();
              }
            }}
            className="px-4 py-2.5 rounded-lg bg-surface border border-border hover:bg-surface-overlay transition-all text-sm font-medium"
          >
            Reset Tab Order
          </button>
        </Card>
      </div>
    );
  }

  // Add other categories similarly...
  return <div className="text-center py-12 text-muted-foreground">More settings coming soon...</div>;
}