// Custom Candlestick component for TradingView-style charts
interface CandlestickProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  payload?: {
    open: number;
    close: number;
    high: number;
    low: number;
    fill: string;
  };
}

export const Candlestick = (props: CandlestickProps) => {
  const { x = 0, y = 0, width = 0, height = 0, payload } = props;
  
  if (!payload) return null;
  
  const { open, close, high, low, fill } = payload;
  
  // Calculate positions
  const isGreen = close >= open;
  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);
  const bodyHeight = Math.abs(close - open);
  
  // Scale factors (these come from the chart coordinate system)
  const centerX = x + width / 2;
  
  // Simplified rendering - just show colored bars for now
  // In a production app, you'd calculate exact pixel positions
  return (
    <g>
      {/* High-Low wick */}
      <line
        x1={centerX}
        y1={y}
        x2={centerX}
        y2={y + height}
        stroke={fill}
        strokeWidth={1}
      />
      
      {/* Candle body */}
      <rect
        x={x + width * 0.2}
        y={isGreen ? y + height * 0.3 : y + height * 0.2}
        width={width * 0.6}
        height={isGreen ? height * 0.4 : height * 0.6}
        fill={fill}
        stroke={fill}
        strokeWidth={1}
      />
    </g>
  );
};
