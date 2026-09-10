"use client";

export function LineChart({ data, labels, color = "violet", height = 200, showPoints = true }) {
  if (!data.length || data.every(v => v === 0 || v === null)) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-zinc-500 text-sm">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.filter(v => v !== null));
  const minValue = Math.min(...data.filter(v => v !== null && v !== 0));
  const range = maxValue - minValue || 1;

  const points = data.map((value, index) => {
    if (value === null) return null;
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 100;
    return { x, y, value };
  }).filter(Boolean);

  const pathData = points.map((p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = points[i - 1];
    const cpX1 = prev.x + (p.x - prev.x) * 0.5;
    const cpX2 = p.x - (p.x - prev.x) * 0.5;
    return `C${cpX1},${prev.y} ${cpX2},${p.y} ${p.x},${p.y}`;
  }).join(" ");

  const gradientId = `gradient-${color}-${Math.random().toString(36).slice(2)}`;

  const colorMap = {
    violet: "from-violet-500 to-cyan-400",
    cyan: "from-cyan-500 to-emerald-400",
    emerald: "from-emerald-500 to-cyan-400",
    amber: "from-amber-500 to-orange-400",
    red: "from-red-500 to-pink-400",
    blue: "from-blue-500 to-violet-400",
  };

  const strokeColor = colorMap[color] || colorMap.violet;

  return (
    <div className="relative h-full w-full" style={{ height }}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <g stroke="white" strokeOpacity="0.03" strokeWidth="0.5">
          {[25, 50, 75].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} />
          ))}
          {[25, 50, 75].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="100" />
          ))}
        </g>

        {/* Area fill */}
        {points.length > 1 && (
          <path
            d={`${pathData} L100,100 L${points[0].x},100 Z`}
            fill={`url(#${gradientId})`}
            className={strokeColor}
          />
        )}

        {/* Line */}
        {points.length > 1 && (
          <path
            d={pathData}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Points */}
        {showPoints && points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="white"
            stroke="currentColor"
            strokeWidth="2.5"
            className={strokeColor}
            filter="drop-shadow(0 0 4px currentColor)"
          />
        ))}
      </svg>

      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between items-end pr-2 text-[10px] text-zinc-500 font-mono">
        <span>{maxValue.toLocaleString()}</span>
        <span>{Math.round((maxValue + minValue) / 2).toLocaleString()}</span>
        <span>{minValue > 0 ? minValue.toLocaleString() : "0"}</span>
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-zinc-500 font-mono -mt-2">
        <span>{labels[0]?.slice(5)}</span>
        <span>{labels[Math.floor(labels.length / 2)]?.slice(5)}</span>
        <span>{labels[labels.length - 1]?.slice(5)}</span>
      </div>
    </div>
  );
}

export function DonutChart({ data, labels, colors, size = 160, strokeWidth = 16 }) {
  if (!data.length || data.every(v => v === 0)) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <p className="text-zinc-500 text-sm">No data</p>
      </div>
    );
  }

  const total = data.reduce((a, b) => a + b, 0);
  const circumference = 2 * Math.PI * (size / 2 - strokeWidth);
  const radius = size / 2 - strokeWidth;

  let currentAngle = -90;

  const defaultColors = [
    "from-violet-500 to-violet-400",
    "from-cyan-500 to-cyan-400",
    "from-emerald-500 to-emerald-400",
    "from-amber-500 to-amber-400",
    "from-red-500 to-red-400",
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          {data.map((_, i) => (
            <linearGradient key={i} id={`donut-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={defaultColors[i % defaultColors.length].split(" ")[0].replace("from-", "")} />
              <stop offset="100%" stopColor={defaultColors[i % defaultColors.length].split(" ")[1].replace("to-", "")} />
            </linearGradient>
          ))}
        </defs>
        {data.map((value, i) => {
          const percentage = value / total;
          const dashArray = `${percentage * circumference} ${circumference}`;
          const strokeDashoffset = -(currentAngle / 360) * circumference;
          currentAngle += percentage * 360;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={`url(#donut-${i})`}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-black">{total.toLocaleString()}</p>
          <p className="text-xs text-zinc-500 mt-1">Total</p>
        </div>
      </div>
    </div>
  );
}

export function BarChart({ data, labels, maxValue, height = 200, color = "violet" }) {
  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-zinc-500 text-sm">No data available</p>
      </div>
    );
  }

  const colorMap = {
    violet: "from-violet-500 to-cyan-400",
    cyan: "from-cyan-500 to-emerald-400",
    emerald: "from-emerald-500 to-cyan-400",
    amber: "from-amber-500 to-orange-400",
    red: "from-red-500 to-pink-400",
  };

  const max = maxValue || Math.max(...data) || 1;

  const bars = data.map((value, i) => {
    const percentage = (value / max) * 100;
    return (
      <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5">
        <div
          className="w-full rounded-t transition-all duration-500 hover:scale-y-[1.05] hover:opacity-90"
          style={{
            height: `${percentage}%`,
            background: `linear-gradient(to top, ${colorMap[color] || colorMap.violet})`,
            minHeight: value > 0 ? "4px" : "0",
          }}
        />
        <span className="text-[10px] text-zinc-500 font-mono whitespace-nowrap">{labels[i]?.slice(5) || ""}</span>
      </div>
    );
  });

  return (
    <div className="relative h-full w-full flex items-end justify-between gap-1 px-1" style={{ height }}>
      {bars}
    </div>
  );
}