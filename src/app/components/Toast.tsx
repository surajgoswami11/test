import { useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface ToastProps {
  title: string;
  description?: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ title, description, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-background border-2 border-emerald-500/50 rounded-xl shadow-2xl shadow-emerald-500/20 p-4 flex items-start gap-3 min-w-[320px] max-w-md backdrop-blur-xl">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-md hover:bg-surface transition-colors flex items-center justify-center flex-shrink-0"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}