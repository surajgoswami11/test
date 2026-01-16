import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  theme?: 'default' | 'success' | 'warning' | 'danger' | 'ai';
}

export function Card({ children, className = '', glow = false, theme = 'default' }: CardProps) {
  const themeClasses = {
    default: 'bg-surface border-border',
    success: 'bg-emerald-500/5 border-emerald-500/20',
    warning: 'bg-amber-500/5 border-amber-500/20',
    danger: 'bg-rose-500/5 border-rose-500/20',
    ai: 'bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border-violet-500/20',
  };

  const glowClasses = glow
    ? 'shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-shadow'
    : '';

  return (
    <div
      className={`rounded-xl border backdrop-blur-xl ${themeClasses[theme]} ${glowClasses} ${className}`}
    >
      {children}
    </div>
  );
}

// Badge Component
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'draft' | 'published' | 'high-risk' | 'success' | 'warning' | 'destructive' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-muted text-foreground border-border',
    draft: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'high-risk': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    destructive: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    outline: 'bg-transparent text-muted-foreground border-border',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// ScrollableTable Component
interface ScrollableTableProps {
  children: ReactNode;
  className?: string;
}

export function ScrollableTable({ children, className = '' }: ScrollableTableProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          {children}
        </div>
      </div>
      {/* Fade cues for horizontal scroll */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

// SectionHeader Component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, icon: Icon, action, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 ${className}`}>
      <div className="flex items-center gap-2 md:gap-3">
        {Icon && (
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
        )}
        <div>
          <h2 className="text-xl md:text-2xl tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="md:self-center">{action}</div>}
    </div>
  );
}

// MetricCard Component
interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon?: LucideIcon;
  mono?: boolean;
}

export function MetricCard({ label, value, change, positive, icon: Icon, mono = true }: MetricCardProps) {
  return (
    <Card className="p-3 md:p-4">
      <div className="flex items-center justify-between mb-1.5 md:mb-2">
        <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
        {Icon && <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />}
      </div>
      <div className={`text-xl md:text-2xl tracking-tight mb-1 ${mono ? 'font-mono' : ''}`}>{value}</div>
      {change && (
        <div className={`text-[10px] md:text-xs font-mono ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {change}
        </div>
      )}
    </Card>
  );
}

// DataTable Component
interface Column {
  header: string;
  accessor: string;
  align?: 'left' | 'right' | 'center';
  mono?: boolean;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

export function DataTable({ columns, data, className = '' }: DataTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <ScrollableTable className={className}>
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className={`p-4 text-xs text-muted-foreground uppercase tracking-wide ${
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                    }`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border/50 hover:bg-surface-overlay transition-colors">
                  {columns.map((col, colIndex) => {
                    const value = row[col.accessor];
                    return (
                      <td
                        key={colIndex}
                        className={`p-4 ${col.mono ? 'font-mono' : ''} ${
                          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                        }`}
                      >
                        {col.render ? col.render(value, row) : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollableTable>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="p-4 rounded-lg bg-surface border border-border">
            {columns.map((col, colIndex) => {
              const value = row[col.accessor];
              if (colIndex === 0) {
                return (
                  <div key={colIndex} className="mb-3 pb-3 border-b border-border">
                    <div className="font-semibold text-sm">{col.render ? col.render(value, row) : value}</div>
                  </div>
                );
              }
              return (
                <div key={colIndex} className="flex justify-between items-center py-2">
                  <span className="text-xs text-muted-foreground">{col.header}</span>
                  <span className={`text-sm ${col.mono ? 'font-mono' : ''}`}>
                    {col.render ? col.render(value, row) : value}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

// Simple DataTable that accepts headers and rows arrays
interface SimpleDataTableProps {
  headers: string[];
  rows: (string | number)[][];
  className?: string;
}

export function SimpleDataTable({ headers, rows, className = '' }: SimpleDataTableProps) {
  return (
    <ScrollableTable className={className}>
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-border">
            {headers.map((header, i) => (
              <th
                key={i}
                className={`p-4 text-xs text-muted-foreground uppercase tracking-wide ${
                  i === 0 ? 'text-left' : 'text-right'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border/50 hover:bg-surface-overlay transition-colors">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`p-4 ${cellIndex === 0 ? 'text-left' : 'text-right font-mono text-sm'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollableTable>
  );
}

// PulseIndicator Component
interface PulseIndicatorProps {
  status: 'live' | 'warning' | 'offline';
  label?: string;
}

export function PulseIndicator({ status, label }: PulseIndicatorProps) {
  const statusConfig = {
    live: { color: 'bg-emerald-500', label: 'Live' },
    warning: { color: 'bg-amber-500', label: 'Warning' },
    offline: { color: 'bg-rose-500', label: 'Offline' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`} />
      <span className="text-xs text-muted-foreground">{label || config.label}</span>
    </div>
  );
}