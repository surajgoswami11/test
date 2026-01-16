/**
 * Promoter.OS Enterprise - Application Configuration
 * 
 * This file centralizes all hardcoded values for easy middleware integration.
 * Replace these values with API calls to your backend/middleware.
 */

import { LayoutDashboard, TrendingUp, FileText, Vault, Brain, Target, Newspaper } from 'lucide-react';
import type { Tab, NavigationItem } from '../types';

// ============================================================================
// COMPANY & STOCK INFORMATION
// ============================================================================

export const COMPANY_CONFIG = {
  // Basic Company Info
  name: 'Pyramid Technoplast Ltd',           // Replace with: API.getCompanyName()
  ticker: 'PYRAMID',                          // Replace with: API.getTicker()
  exchange: 'NSE',                            // Replace with: API.getExchange()
  fullTicker: 'NSE: PYRAMID',                 // Replace with: `${API.getExchange()}: ${API.getTicker()}`
  
  // Stock Price Data
  currentPrice: 171.30,                       // Replace with: API.getCurrentPrice()
  previousClose: 169.85,                      // Replace with: API.getPreviousClose()
  priceChange: 1.45,                          // Replace with: API.getPriceChange()
  priceChangePercent: 0.85,                   // Replace with: API.getPriceChangePercent()
  
  // Market Data
  marketCap: 410.15,                          // Replace with: API.getMarketCap() (in Crores)
  marketCapUnit: 'Cr',                        // Replace with: API.getMarketCapUnit()
  volume: '2.3M',                             // Replace with: API.getVolume()
  pe: 15.2,                                   // Replace with: API.getPERatio()
  high52Week: 185.50,                         // Replace with: API.get52WeekHigh()
  low52Week: 142.30,                          // Replace with: API.get52WeekLow()
  
  // Company Fundamentals
  industry: 'Plastic Products',               // Replace with: API.getIndustry()
  sector: 'Materials',                        // Replace with: API.getSector()
  employees: '500+',                          // Replace with: API.getEmployeeCount()
  founded: '1995',                            // Replace with: API.getFoundedYear()
  headquarters: 'Mumbai, India',              // Replace with: API.getHeadquarters()
  
  // Trading Status
  tradingStatus: 'ACTIVE',                    // Replace with: API.getTradingStatus()
  lastUpdated: new Date(),                    // Replace with: API.getLastUpdated()
};

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

export const NAVIGATION_CONFIG = {
  // Default tab on app load
  defaultTab: 'dashboard' as Tab,             // Replace with: API.getUserPreferences().defaultTab
  
  // Tab order (can be customized per user)
  defaultTabOrder: [                          // Replace with: API.getUserPreferences().tabOrder
    'dashboard',
    'news',
    'intelligence',
    'hunter',
    'screener',
    'library',
    'vault',
  ] as Tab[],
  
  // Navigation items configuration
  items: [
    {
      id: 'dashboard' as Tab,
      label: 'Dashboard',                     // Replace with: API.getModuleConfig('dashboard').label
      icon: LayoutDashboard,
      enabled: true,                          // Replace with: API.getModuleConfig('dashboard').enabled
      premium: false,
      ai: false,
      secure: false,
    },
    {
      id: 'screener' as Tab,
      label: 'Stock Screener',                // Replace with: API.getModuleConfig('screener').label
      icon: TrendingUp,
      enabled: true,                          // Replace with: API.getModuleConfig('screener').enabled
      premium: false,
      ai: false,
      secure: false,
    },
    {
      id: 'library' as Tab,
      label: 'Document Library',              // Replace with: API.getModuleConfig('library').label
      icon: FileText,
      enabled: true,                          // Replace with: API.getModuleConfig('library').enabled
      premium: false,
      ai: false,
      secure: false,
    },
    {
      id: 'vault' as Tab,
      label: 'Private Vault',                 // Replace with: API.getModuleConfig('vault').label
      icon: Vault,
      enabled: true,                          // Replace with: API.getModuleConfig('vault').enabled
      premium: false,
      ai: true,
      secure: true,
    },
    {
      id: 'intelligence' as Tab,
      label: 'Strategic Intelligence',        // Replace with: API.getModuleConfig('intelligence').label
      icon: Brain,
      enabled: true,                          // Replace with: API.getModuleConfig('intelligence').enabled
      premium: true,
      ai: false,
      secure: false,
    },
    {
      id: 'hunter' as Tab,
      label: 'Reach',                         // Replace with: API.getModuleConfig('hunter').label
      icon: Target,
      enabled: true,                          // Replace with: API.getModuleConfig('hunter').enabled
      premium: true,
      ai: false,
      secure: false,
    },
    {
      id: 'news' as Tab,
      label: 'Market Pulse',                  // Replace with: API.getModuleConfig('news').label
      icon: Newspaper,
      enabled: true,                          // Replace with: API.getModuleConfig('news').enabled
      premium: true,
      ai: false,
      secure: false,
    },
  ] as NavigationItem[],
};

// ============================================================================
// MODULE ACCENT COLORS
// ============================================================================

export const MODULE_COLORS = {
  dashboard: 'rgb(59 130 246)',               // Blue
  screener: 'rgb(6 182 212)',                 // Cyan
  hunter: 'rgb(245 158 11)',                  // Amber
  library: 'rgb(99 102 241)',                 // Indigo
  vault: 'rgb(16 185 129)',                   // Emerald
  intelligence: 'rgb(139 92 246)',            // Violet
  news: 'rgb(244 63 94)',                     // Rose
};

// ============================================================================
// MARKET TIMING CONFIGURATION
// ============================================================================

export const MARKET_CONFIG = {
  // Market hours (IST timezone)
  timezone: 'Asia/Kolkata',                   // Replace with: API.getMarketConfig().timezone
  timezoneOffset: 5.5,                        // Replace with: API.getMarketConfig().timezoneOffset (hours)
  
  // Trading hours
  openHour: 9,                                // Replace with: API.getMarketConfig().openHour
  openMinute: 15,                             // Replace with: API.getMarketConfig().openMinute
  closeHour: 15,                              // Replace with: API.getMarketConfig().closeHour
  closeMinute: 30,                            // Replace with: API.getMarketConfig().closeMinute
  
  // Trading days (0 = Sunday, 6 = Saturday)
  tradingDays: [1, 2, 3, 4, 5],              // Replace with: API.getMarketConfig().tradingDays (Mon-Fri)
  
  // Holidays (dates when market is closed)
  holidays: [                                 // Replace with: API.getMarketHolidays()
    '2025-01-26',  // Republic Day
    '2025-03-14',  // Holi
    '2025-03-31',  // Eid
    '2025-04-18',  // Good Friday
    '2025-08-15',  // Independence Day
    '2025-10-02',  // Gandhi Jayanti
    '2025-10-24',  // Diwali
    '2025-11-05',  // Guru Nanak Jayanti
    '2025-12-25',  // Christmas
  ],
};

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

export const THEME_CONFIG = {
  // Available themes
  availableThemes: [                          // Replace with: API.getThemeOptions()
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
    { id: 'pearl', name: 'Pearl' },
    { id: 'metallic-dark', name: 'Metallic Dark' },
    { id: 'metallic-slate', name: 'Metallic Slate' },
  ],
  
  // Default theme
  defaultTheme: 'light',                      // Replace with: API.getUserPreferences().theme
};

// ============================================================================
// SUBSCRIPTION & PRICING
// ============================================================================

export const SUBSCRIPTION_CONFIG = {
  // Current plan
  currentPlan: 'ENTERPRISE',                  // Replace with: API.getSubscription().plan
  annualPrice: 500000,                        // Replace with: API.getSubscription().annualPrice (₹5L/year)
  currency: 'INR',                            // Replace with: API.getSubscription().currency
  currencySymbol: '₹',                        // Replace with: API.getSubscription().currencySymbol
  
  // Subscription status
  isActive: true,                             // Replace with: API.getSubscription().isActive
  expiryDate: new Date('2026-12-31'),        // Replace with: API.getSubscription().expiryDate
  
  // Feature access
  features: {                                 // Replace with: API.getSubscription().features
    aiAnalysis: true,
    investorTargeting: true,
    marketPulse: true,
    strategicIntelligence: true,
    privateVault: true,
    advancedScreener: true,
    documentLibrary: true,
  },
};

// ============================================================================
// USER CONFIGURATION
// ============================================================================

export const USER_CONFIG = {
  // User info
  userId: 'user_12345',                       // Replace with: API.getCurrentUser().id
  name: 'CEO Name',                           // Replace with: API.getCurrentUser().name
  email: 'ceo@pyramidtech.com',               // Replace with: API.getCurrentUser().email
  role: 'CEO',                                // Replace with: API.getCurrentUser().role
  
  // Company association
  companyId: 'company_pyramid',               // Replace with: API.getCurrentUser().companyId
  
  // Preferences
  language: 'en',                             // Replace with: API.getUserPreferences().language
  dateFormat: 'DD/MM/YYYY',                   // Replace with: API.getUserPreferences().dateFormat
  numberFormat: 'en-IN',                      // Replace with: API.getUserPreferences().numberFormat
  
  // Notifications
  notifications: {                            // Replace with: API.getUserPreferences().notifications
    email: true,
    sms: false,
    push: true,
    marketAlerts: true,
    newsAlerts: true,
  },
};

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURE_FLAGS = {
  // Module availability
  enableDashboard: true,                      // Replace with: API.getFeatureFlags().enableDashboard
  enableScreener: true,                       // Replace with: API.getFeatureFlags().enableScreener
  enableInvestorHunter: true,                 // Replace with: API.getFeatureFlags().enableInvestorHunter
  enableDocumentLibrary: true,                // Replace with: API.getFeatureFlags().enableDocumentLibrary
  enablePrivateVault: true,                   // Replace with: API.getFeatureFlags().enablePrivateVault
  enableStrategicIntelligence: true,          // Replace with: API.getFeatureFlags().enableStrategicIntelligence
  enableMarketPulse: true,                    // Replace with: API.getFeatureFlags().enableMarketPulse
  
  // Feature toggles
  enableAIFeatures: true,                     // Replace with: API.getFeatureFlags().enableAIFeatures
  enableDebugMode: false,                     // Replace with: API.getFeatureFlags().enableDebugMode
  enableDragDropTabs: true,                   // Replace with: API.getFeatureFlags().enableDragDropTabs
  enableRealTimeData: true,                   // Replace with: API.getFeatureFlags().enableRealTimeData
  enableExport: true,                         // Replace with: API.getFeatureFlags().enableExport
  enableShare: true,                          // Replace with: API.getFeatureFlags().enableShare
};

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  // Base URLs
  baseUrl: 'https://api.promoter-os.com',     // Replace with: process.env.REACT_APP_API_URL
  wsUrl: 'wss://api.promoter-os.com/ws',      // Replace with: process.env.REACT_APP_WS_URL
  
  // API version
  version: 'v1',                              // Replace with: process.env.REACT_APP_API_VERSION
  
  // Polling intervals (milliseconds)
  priceUpdateInterval: 5000,                  // Replace with: API.getConfig().priceUpdateInterval (5 seconds)
  newsUpdateInterval: 60000,                  // Replace with: API.getConfig().newsUpdateInterval (1 minute)
  marketStatusInterval: 60000,                // Replace with: API.getConfig().marketStatusInterval (1 minute)
  
  // Request timeouts
  requestTimeout: 30000,                      // Replace with: API.getConfig().requestTimeout (30 seconds)
  
  // Retry configuration
  maxRetries: 3,                              // Replace with: API.getConfig().maxRetries
  retryDelay: 1000,                           // Replace with: API.getConfig().retryDelay (milliseconds)
};

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  tabOrder: 'promoter-os-tab-order-v2',
  theme: 'promoter-os-theme',
  language: 'promoter-os-language',
  userPreferences: 'promoter-os-preferences',
  savedFilters: 'promoter-os-saved-filters',
  recentSearches: 'promoter-os-recent-searches',
};

// ============================================================================
// HELPER FUNCTIONS FOR MIDDLEWARE INTEGRATION
// ============================================================================

/**
 * Example API integration functions
 * Replace these with actual API calls to your middleware
 */

export const API_INTEGRATION = {
  // Company data
  async getCompanyData() {
    // TODO: Replace with actual API call
    // return await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.version}/company/${USER_CONFIG.companyId}`);
    return COMPANY_CONFIG;
  },
  
  // Stock price
  async getCurrentPrice() {
    // TODO: Replace with actual API call
    // return await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.version}/stock/${COMPANY_CONFIG.ticker}/price`);
    return COMPANY_CONFIG.currentPrice;
  },
  
  // Market status
  async getMarketStatus() {
    // TODO: Replace with actual API call
    // return await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.version}/market/status`);
    return 'live'; // or 'offline'
  },
  
  // User preferences
  async getUserPreferences() {
    // TODO: Replace with actual API call
    // return await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.version}/users/${USER_CONFIG.userId}/preferences`);
    return {
      defaultTab: NAVIGATION_CONFIG.defaultTab,
      tabOrder: NAVIGATION_CONFIG.defaultTabOrder,
      theme: THEME_CONFIG.defaultTheme,
      language: USER_CONFIG.language,
    };
  },
  
  // Module configuration
  async getModuleConfig(moduleId: Tab) {
    // TODO: Replace with actual API call
    // return await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.version}/modules/${moduleId}`);
    const item = NAVIGATION_CONFIG.items.find(i => i.id === moduleId);
    return item || null;
  },
  
  // Feature flags
  async getFeatureFlags() {
    // TODO: Replace with actual API call
    // return await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.version}/features`);
    return FEATURE_FLAGS;
  },
  
  // Subscription info
  async getSubscription() {
    // TODO: Replace with actual API call
    // return await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.version}/subscription/${USER_CONFIG.userId}`);
    return SUBSCRIPTION_CONFIG;
  },
};

// ============================================================================
// EXPORT DEFAULT CONFIG
// ============================================================================

export const APP_CONFIG = {
  company: COMPANY_CONFIG,
  navigation: NAVIGATION_CONFIG,
  moduleColors: MODULE_COLORS,
  market: MARKET_CONFIG,
  theme: THEME_CONFIG,
  subscription: SUBSCRIPTION_CONFIG,
  user: USER_CONFIG,
  features: FEATURE_FLAGS,
  api: API_CONFIG,
  storage: STORAGE_KEYS,
};

export default APP_CONFIG;
