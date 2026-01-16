import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Search,
  Target,
  Shield,
  Users,
  FileText,
  Vault,
  Zap,
  Brain,
  Sparkles,
  Newspaper,
  Menu,
  X,
  Sun,
  Moon,
  Settings,
  Bot,
  MoreHorizontal,
  TrendingUp,
  Activity,
  BarChart3,
  Building2,
} from "lucide-react";
import { TopBar } from "./components/TopBar";
import { CommandCenter } from "./components/CommandCenter";
import { ScreenerView } from "./components/ScreenerView";
import { TheHunter } from "./components/TheHunter";
import { SentinelView } from "./components/SentinelView";
import { DocumentLibrary } from "./components/DocumentLibrary";
import { PrivateVault } from "./components/PrivateVault";
import { StrategicIntelligence } from "./components/StrategicIntelligence";
import { NewsIntelligence } from "./components/NewsIntelligence";
import { AIAssistant } from "./components/AIAssistant";
import { PulseIndicator } from "./components/SharedComponents";
import {
  LanguageSwitcher,
  languages,
  Language,
} from "./components/LanguageSwitcher";
import { Toast } from "./components/Toast";
import { SettingsModal } from "./components/SettingsModal";
import { ThemeSelector } from "./components/ThemeSelector";
import { PYRAMID_DATA } from "./components/pyramidConstants";
import { debugLog } from "./utils/debugger";
import { ThemeMode } from "./types";

import sifiLogo from "../assets/db89ce6df50a534b9adc47b012b906e480bf6282.png";
import pyramidLogo from "../assets/dc1dd3856cac950f273787e042dd3be1d06e1fcb.png";
import "../styles/premium-theme.css";

// Import centralized configuration
import APP_CONFIG from "./config/appConfig";

type Tab =
  | "dashboard"
  | "screener"
  | "hunter"
  | "library"
  | "vault"
  | "intelligence"
  | "news";

interface NavigationItem {
  id: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  secure?: boolean;
  ai?: boolean;
  premium?: boolean;
}

// Use configuration from appConfig.ts
const DEFAULT_TAB_ORDER: Tab[] = APP_CONFIG.navigation.defaultTabOrder;

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isDark, setIsDark] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [showSettings, setShowSettings] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0]
  );
  const [isDebugMode, setIsDebugMode] = useState(() =>
    debugLog.isDebugEnabled()
  );
  const [marketStatus, setMarketStatus] = useState<"live" | "offline">(() => {
    // Initialize market status
    debugLog.log("Initializing market status...", "system");
    const now = new Date();
    const istOffset = 5.5 * 60;
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utcTime + istOffset * 60000);
    const day = istTime.getDay();
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const marketOpen = 9 * 60 + 15;
    const marketClose = 15 * 60 + 30;
    const isWeekday = day !== 0 && day !== 6;
    const isDuringMarketHours =
      totalMinutes >= marketOpen && totalMinutes <= marketClose;
    const status = isWeekday && isDuringMarketHours ? "live" : "offline";
    debugLog.log(`Market status: ${status}`, "market", {
      isWeekday,
      isDuringMarketHours,
      hours,
      minutes,
    });
    return status;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const collapsed = window.innerWidth < 1440;
    debugLog.log(`Sidebar collapsed: ${collapsed}`, "system", {
      width: window.innerWidth,
    });
    return collapsed;
  });

  // Tab ordering state
  const [tabOrder, setTabOrder] = useState<Tab[]>(() => {
    const saved = localStorage.getItem("promoter-os-tab-order-v2");
    const order = saved ? JSON.parse(saved) : DEFAULT_TAB_ORDER;
    debugLog.log("Loading tab order from localStorage", "storage", {
      order,
      fromStorage: !!saved,
    });
    return order;
  });
  const [draggedTab, setDraggedTab] = useState<Tab | null>(null);
  const [dragOverTab, setDragOverTab] = useState<Tab | null>(null);

  // Component mount effect
  useEffect(() => {
    debugLog.log("🚀 App Component Mounted", "component");
    debugLog.log("Initial state loaded", "system", {
      activeTab,
      theme,
      tabOrder,
      marketStatus,
      language: selectedLanguage.code,
    });

    return () => {
      debugLog.log("App Component Unmounting", "component");
    };
  }, []);

  // Save tab order to localStorage whenever it changes
  useEffect(() => {
    debugLog.log("Saving tab order to localStorage", "storage", { tabOrder });
    localStorage.setItem("promoter-os-tab-order-v2", JSON.stringify(tabOrder));
  }, [tabOrder]);

  // Drag and drop handlers
  const handleDragStart = (tabId: Tab) => {
    debugLog.log(`Drag started: ${tabId}`, "drag-drop", { tabId });
    setDraggedTab(tabId);
  };

  const handleDragOver = (e: React.DragEvent, tabId: Tab) => {
    e.preventDefault();
    if (draggedTab && draggedTab !== tabId) {
      setDragOverTab(tabId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetTabId: Tab) => {
    e.preventDefault();
    if (!draggedTab || draggedTab === targetTabId) {
      setDraggedTab(null);
      setDragOverTab(null);
      return;
    }

    debugLog.group("Tab Reordering", "drag-drop");
    debugLog.log(
      `Dragged: ${draggedTab} → Target: ${targetTabId}`,
      "drag-drop"
    );

    const newOrder = [...tabOrder];
    const draggedIndex = newOrder.indexOf(draggedTab);
    const targetIndex = newOrder.indexOf(targetTabId);

    debugLog.log("Before reorder", "drag-drop", {
      order: newOrder,
      draggedIndex,
      targetIndex,
    });

    // Remove dragged item and insert at target position
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedTab);

    debugLog.log("After reorder", "drag-drop", { order: newOrder });
    debugLog.groupEnd();

    setTabOrder(newOrder);
    setDraggedTab(null);
    setDragOverTab(null);
  };

  const handleDragEnd = () => {
    debugLog.log("Drag ended", "drag-drop");
    setDraggedTab(null);
    setDragOverTab(null);
  };

  const resetTabOrder = () => {
    debugLog.log("Resetting tab order to default", "drag-drop", {
      default: DEFAULT_TAB_ORDER,
    });
    setTabOrder(DEFAULT_TAB_ORDER);
    localStorage.setItem(
      "promoter-os-tab-order-v2",
      JSON.stringify(DEFAULT_TAB_ORDER)
    );
  };

  // Helper function to check if Indian market is open
  // Market hours: 9:15 AM - 3:30 PM IST, Monday-Friday
  const isMarketOpen = () => {
    // Get current time in IST (UTC+5:30)
    const now = new Date();
    const istOffset = 5.5 * 60; // IST is UTC+5:30
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utcTime + istOffset * 60000);

    const day = istTime.getDay(); // 0 = Sunday, 6 = Saturday
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Check if weekend
    if (day === 0 || day === 6) {
      return false;
    }

    // Market hours: 9:15 AM (555 minutes) to 3:30 PM (930 minutes)
    const marketOpen = 9 * 60 + 15; // 555 minutes (9:15 AM)
    const marketClose = 15 * 60 + 30; // 930 minutes (3:30 PM)

    return totalMinutes >= marketOpen && totalMinutes <= marketClose;
  };

  const navigationItems: NavigationItem[] = [
    { id: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
    { id: "screener" as Tab, label: "Stock Screener", icon: TrendingUp },
    { id: "library" as Tab, label: "Document Library", icon: FileText },
    {
      id: "vault" as Tab,
      label: "Private Vault",
      icon: Vault,
      secure: true,
      ai: true,
    },
    {
      id: "intelligence" as Tab,
      label: "Strategic Intelligence",
      icon: Brain,
      premium: true,
    },
    { id: "hunter" as Tab, label: "Reach", icon: Target, premium: true },
    {
      id: "news" as Tab,
      label: "Market Pulse",
      icon: Newspaper,
      premium: true,
    },
  ];

  // Update market status every minute
  useEffect(() => {
    debugLog.log("Market status monitor started", "market");
    const interval = setInterval(() => {
      const newStatus = isMarketOpen() ? "live" : "offline";
      if (newStatus !== marketStatus) {
        debugLog.log(
          `Market status changed: ${marketStatus} → ${newStatus}`,
          "market"
        );
      }
      setMarketStatus(newStatus);
    }, 60000); // Check every minute

    return () => {
      debugLog.log("Market status monitor stopped", "market");
      clearInterval(interval);
    };
  }, [marketStatus]);

  // Track theme changes
  useEffect(() => {
    debugLog.log(`Theme changed to: ${theme}`, "theme", { theme });
    // Remove all theme classes
    document.documentElement.classList.remove(
      "dark",
      "pearl",
      "metallic-dark",
      "metallic-slate"
    );

    // Add the selected theme class
    if (theme !== "light") {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  // Track active tab changes
  useEffect(() => {
    debugLog.log(`Navigated to: ${activeTab}`, "navigation", {
      tab: activeTab,
      timestamp: new Date().toISOString(),
    });
  }, [activeTab]);

  // Track settings modal
  useEffect(() => {
    if (showSettings) {
      debugLog.log("Settings modal opened", "settings");
    }
  }, [showSettings]);

  // Handle language change
  const handleLanguageChange = (language: Language) => {
    debugLog.log(
      `Language changed: ${selectedLanguage.code} → ${language.code}`,
      "language",
      {
        from: selectedLanguage,
        to: language,
      }
    );
    setSelectedLanguage(language);

    // Show toast notification
    setToastMessage(`Language changed to ${language.name} (${language.code})`);
    console.log(`Language changed to: ${language.name} (${language.code})`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Layout - Sidebar + Content */}
      <div className="flex h-screen">
        {/* Left Sidebar Navigation - Vertical Compact */}
        <div className="w-[100px] bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 gap-1 overflow-y-auto">
          {tabOrder.map((tabId) => {
            const item = navigationItems.find((i) => i.id === tabId);
            if (!item) return null;
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            // Use accent colors from configuration
            const color =
              APP_CONFIG.moduleColors[
                item.id as keyof typeof APP_CONFIG.moduleColors
              ];

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex flex-col items-center justify-center gap-1.5 w-[88px] py-3 px-2 transition-all duration-200 rounded-lg ${
                  isActive
                    ? "bg-white text-foreground shadow-sm"
                    : "bg-transparent text-muted-foreground hover:bg-white/60 hover:text-foreground"
                } ${draggedTab === item.id ? "opacity-50" : ""}`}
                draggable
                onDragStart={(e) => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDrop={(e) => handleDrop(e, item.id)}
                onDragEnd={handleDragEnd}
              >
                {/* Active Indicator - Left border */}
                {isActive && (
                  <div
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                    style={{ backgroundColor: color }}
                  />
                )}

                {/* Icon */}
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "" : "opacity-60 group-hover:opacity-100"
                  }`}
                  style={isActive ? { color } : {}}
                />

                {/* Label - Centered, small, multiline if needed */}
                <span
                  className={`text-[10px] font-medium tracking-tight transition-colors text-center leading-tight ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </span>

                {/* Premium/AI/Secure Badges - Positioned at top right */}
                {(item.premium || item.ai || item.secure) && (
                  <div className="absolute top-1 right-1 flex items-center gap-0.5">
                    {item.premium && (
                      <Sparkles className="w-2.5 h-2.5 text-amber-500/70" />
                    )}
                    {item.ai && (
                      <Bot className="w-2.5 h-2.5 text-purple-500/70" />
                    )}
                    {item.secure && (
                      <Shield className="w-2.5 h-2.5 text-emerald-500/70" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header Bar */}
          <div className="h-16 border-b border-border bg-background px-6 flex items-center justify-between flex-shrink-0">
            {/* Logo/Company Info - Using APP_CONFIG */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-sm">
                  {APP_CONFIG.company.name}
                </h1>
                <p className="text-[10px] text-muted-foreground">
                  {APP_CONFIG.company.fullTicker}
                </p>
              </div>
            </div>

            {/* Right Side - Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-slate-600" />
              ) : (
                <Sun className="w-4 h-4 text-slate-400" />
              )}
            </button>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "dashboard" && <CommandCenter />}
            {activeTab === "screener" && <ScreenerView />}
            {activeTab === "news" && <NewsIntelligence />}
            {activeTab === "intelligence" && <StrategicIntelligence />}
            {activeTab === "hunter" && <TheHunter />}
            {activeTab === "library" && <DocumentLibrary />}
            {activeTab === "vault" && <PrivateVault />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
