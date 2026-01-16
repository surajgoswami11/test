import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TradingChartProps {
  symbol: string;
  currentPrice: number;
}

type Timeframe = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y';

export function TradingChart({ symbol, currentPrice }: TradingChartProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('1D');

  // Generate realistic price data
  const generatePriceData = (timeframe: Timeframe) => {
    let intervals: number;
    let formatTime: (index: number) => string;

    switch (timeframe) {
      case '1D':
        intervals = 78; // 5-min intervals for 6.5 trading hours
        formatTime = (i) => {
          const hour = 9 + Math.floor((i * 5) / 60);
          const min = (i * 5) % 60;
          return `${hour}:${min.toString().padStart(2, '0')}`;
        };
        break;
      case '5D':
        intervals = 5;
        formatTime = (i) => `Day ${i + 1}`;
        break;
      case '1M':
        intervals = 22;
        formatTime = (i) => `${i + 1}`;
        break;
      case '3M':
        intervals = 66;
        formatTime = (i) => {
          const month = Math.floor(i / 22);
          return month === 0 ? 'M1' : month === 1 ? 'M2' : 'M3';
        };
        break;
      case '6M':
        intervals = 132;
        formatTime = (i) => {
          const month = Math.floor(i / 22);
          return `M${month + 1}`;
        };
        break;
      case '1Y':
        intervals = 252;
        formatTime = (i) => {
          const month = Math.floor(i / 21);
          const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
          return months[month] || '';
        };
        break;
    }

    const data = [];
    let price = currentPrice - (currentPrice * 0.1); // Start 10% lower
    
    for (let i = 0; i < intervals; i++) {
      const volatility = currentPrice * 0.005; // 0.5% volatility
      const trend = (currentPrice - price) / intervals; // Gradual uptrend

      const change = (Math.random() - 0.48) * volatility + trend;
      price = Math.max(price + change, 0.01);

      data.push({
        time: formatTime(i),
        price: parseFloat(price.toFixed(2)),
      });
    }

    // Ensure last point is close to current price
    if (data.length > 0) {
      data[data.length - 1].price = currentPrice;
    }

    return data;
  };

  const data = generatePriceData(activeTimeframe);

  const timeframes: { value: Timeframe; label: string }[] = [
    { value: '1D', label: '1D' },
    { value: '5D', label: '5D' },
    { value: '1M', label: '1M' },
    { value: '3M', label: '3M' },
    { value: '6M', label: '6M' },
    { value: '1Y', label: '1Y' },
  ];

  return (
    <div className="relative w-full h-[450px]">
      {/* Timeframe Buttons */}
      <div className="absolute top-0 left-0 z-10 flex items-center gap-1 px-4 py-2">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setActiveTimeframe(tf.value)}
            className={`px-2.5 py-1 text-[10px] font-mono font-medium rounded transition-all ${
              activeTimeframe === tf.value
                ? 'bg-surface text-foreground border border-border'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface/50'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[350px] pt-12">
        <ResponsiveContainer width="100%" height={350} minHeight={350}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="rgba(255, 255, 255, 0.2)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.2)"
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
              itemStyle={{ color: '#10b981' }}
              formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}