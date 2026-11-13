'use client';

import { useState } from 'react';

interface TimelinePoint {
  date: string;
  views: number;
  clicks: number;
}

interface Props {
  data: TimelinePoint[];
}

export function AnalyticsTrendChart({ data }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 680;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const maxVal = Math.max(...data.map((d) => Math.max(d.views, d.clicks, 4)));

  const pointsViews = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1 || 1)) * chartW;
    const y = paddingY + chartH - (d.views / maxVal) * chartH;
    return { x, y, ...d };
  });

  const pointsClicks = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1 || 1)) * chartW;
    const y = paddingY + chartH - (d.clicks / maxVal) * chartH;
    return { x, y, ...d };
  });

  // Construct SVG paths
  const lineViewsPath = pointsViews.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  const areaViewsPath = `${lineViewsPath} L ${pointsViews[pointsViews.length - 1].x} ${
    paddingY + chartH
  } L ${pointsViews[0].x} ${paddingY + chartH} Z`;

  const lineClicksPath = pointsClicks.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  const activePoint = hoverIndex !== null ? pointsViews[hoverIndex] : null;
  const activeClicksPoint = hoverIndex !== null ? pointsClicks[hoverIndex] : null;

  return (
    <div className="p-6 bg-white rounded-3xl border border-[#540B0E]/12 shadow-sm space-y-4 font-sans select-none">
      {/* Chart Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#540B0E]/10">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#E09F3E] block">
            VISUAL PERFORMANCE TIMELINE
          </span>
          <h3 className="text-base font-black text-[#540B0E]">Audience Activity & Conversions</h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-bold text-[#766050]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E09F3E] shadow-2xs" />
            <span>Page Views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#540B0E] shadow-2xs" />
            <span>Link Clicks</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="viewsAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E09F3E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E09F3E" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="clicksAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#540B0E" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#540B0E" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingY + chartH * (1 - ratio);
            const val = Math.round(maxVal * ratio);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#540B0E"
                  strokeOpacity="0.06"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fontFamily="monospace"
                  fill="#766050"
                  opacity="0.7"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fills */}
          <path d={areaViewsPath} fill="url(#viewsAreaGrad)" />

          {/* Strokes */}
          <path
            d={lineViewsPath}
            fill="none"
            stroke="#E09F3E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={lineClicksPath}
            fill="none"
            stroke="#540B0E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover Column Tracking Line */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={paddingY}
              x2={activePoint.x}
              y2={paddingY + chartH}
              stroke="#540B0E"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* Invisible interactive hover hit regions */}
          {pointsViews.map((p, i) => (
            <rect
              key={i}
              x={p.x - chartW / (data.length * 2)}
              y={paddingY}
              width={chartW / data.length}
              height={chartH}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoverIndex(i)}
            />
          ))}

          {/* Active Data Points */}
          {activePoint && activeClicksPoint && (
            <>
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5"
                fill="#FAF7EE"
                stroke="#E09F3E"
                strokeWidth="3"
                className="shadow-sm"
              />
              <circle
                cx={activeClicksPoint.x}
                cy={activeClicksPoint.y}
                r="4"
                fill="#FAF7EE"
                stroke="#540B0E"
                strokeWidth="2.5"
                className="shadow-sm"
              />
            </>
          )}

          {/* Bottom Date Labels */}
          {data.map((d, i) => {
            // Show ~5 labels evenly spaced
            const step = Math.ceil(data.length / 5);
            if (i % step !== 0 && i !== data.length - 1) return null;
            const x = paddingX + (i / (data.length - 1 || 1)) * chartW;
            const label = d.date.slice(5); // 'MM-DD'
            return (
              <text
                key={i}
                x={x}
                y={height - 8}
                textAnchor="middle"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#766050"
              >
                {label}
              </text>
            );
          })}
        </svg>

        {/* Hover Floating Tooltip */}
        {activePoint && activeClicksPoint && (
          <div
            className="absolute -top-3 pointer-events-none transition-all duration-100 transform -translate-x-1/2 p-2.5 rounded-xl bg-[#540B0E] text-[#FFF3B0] text-[11px] shadow-xl border border-[#E09F3E]/40 space-y-1 z-30"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
            }}
          >
            <div className="font-mono font-bold text-[#E09F3E] text-[10px] border-b border-white/10 pb-0.5">
              {activePoint.date}
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Views:</span>
              <span className="font-bold text-white">{activePoint.views}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Clicks:</span>
              <span className="font-bold text-[#E09F3E]">{activeClicksPoint.clicks}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

