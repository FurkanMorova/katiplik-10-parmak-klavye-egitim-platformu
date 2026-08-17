"use client";
import { useMemo, useState } from 'react';
import type { DailyEntry } from '../utils/useGamification';

interface ProgressChartProps {
  dailyHistory: Record<string, DailyEntry>;
  compact?: boolean;
}

export default function ProgressChart({ dailyHistory, compact = false }: ProgressChartProps) {
  const [period, setPeriod] = useState<7 | 14 | 30>(7);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const chartData = useMemo(() => {
    const days: { date: string; label: string; avgWpm: number; bestWpm: number; lessonsCompleted: number }[] = [];
    const today = new Date();

    for (let i = period - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const entry = dailyHistory[dateStr];
      const dayLabel = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });

      if (entry && entry.lessonsCompleted > 0) {
        days.push({
          date: dateStr,
          label: dayLabel,
          avgWpm: Math.round(entry.wpmSum / entry.lessonsCompleted),
          bestWpm: entry.bestWpm,
          lessonsCompleted: entry.lessonsCompleted,
        });
      } else {
        days.push({ date: dateStr, label: dayLabel, avgWpm: 0, bestWpm: 0, lessonsCompleted: 0 });
      }
    }
    return days;
  }, [dailyHistory, period]);

  const maxWpm = useMemo(() => {
    const max = Math.max(...chartData.map(d => d.bestWpm), 10);
    return Math.ceil(max / 5) * 5 + 5; // Round up to nearest 5 + padding
  }, [chartData]);

  const hasData = chartData.some(d => d.avgWpm > 0);

  // SVG dimensions
  const width = compact ? 400 : 700;
  const height = compact ? 160 : 220;
  const padLeft = 45;
  const padRight = 15;
  const padTop = 15;
  const padBottom = 30;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Points
  const avgPoints = chartData.map((d, i) => ({
    x: padLeft + (chartW / Math.max(1, chartData.length - 1)) * i,
    y: padTop + chartH - (d.avgWpm / maxWpm) * chartH,
    data: d,
  }));

  // Smooth path
  const buildPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp1x = (points[i - 1].x + points[i].x) / 2;
      path += ` C ${cp1x} ${points[i - 1].y}, ${cp1x} ${points[i].y}, ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const linePath = buildPath(avgPoints);

  // Area path (fill under curve)
  const areaPath = linePath + ` L ${avgPoints[avgPoints.length - 1]?.x} ${padTop + chartH} L ${avgPoints[0]?.x} ${padTop + chartH} Z`;

  return (
    <div style={{ marginBottom: compact ? '1.5rem' : '3rem' }}>
      {!compact && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
            📊 Gelişim Grafiği
          </h3>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {([7, 14, 30] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '0.3rem 0.7rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: 'none',
                  background: period === p ? 'rgba(79, 142, 247, 0.15)' : 'transparent',
                  color: period === p ? 'var(--accent-color)' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                }}
              >
                {p}G
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="glass-panel" style={{
        padding: compact ? '1rem' : '1.5rem',
        overflow: 'hidden',
      }}>
        {!hasData ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Henüz grafik verisi yok. Ders tamamladıkça burada gelişiminizi göreceksiniz!
          </div>
        ) : (
          <svg
            width="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block' }}
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4f8ef7" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4f8ef7" />
                <stop offset="100%" stopColor="#7c55f7" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padTop + chartH * (1 - ratio);
              const val = Math.round(maxWpm * ratio);
              return (
                <g key={i}>
                  <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="rgba(255,255,255,0.04)" strokeDasharray="4,4" />
                  <text x={padLeft - 8} y={y + 4} textAnchor="end" fill="#4a5270" fontSize="10">{val}</text>
                </g>
              );
            })}

            {/* Area fill */}
            {avgPoints.length >= 2 && <path d={areaPath} fill="url(#areaGrad)" />}

            {/* Line */}
            {avgPoints.length >= 2 && (
              <path
                d={linePath}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}

            {/* Points */}
            {avgPoints.map((p, i) => p.data.avgWpm > 0 && (
              <g key={i}>
                <circle
                  cx={p.x} cy={p.y} r={hoveredIdx === i ? 6 : 4}
                  fill="#4f8ef7"
                  stroke="#0a0c14"
                  strokeWidth="2"
                  style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
                {hoveredIdx === i && (
                  <g>
                    <rect
                      x={p.x - 40} y={p.y - 36}
                      width="80" height="26"
                      rx="6"
                      fill="rgba(22, 25, 37, 0.95)"
                      stroke="rgba(79, 142, 247, 0.3)"
                    />
                    <text x={p.x} y={p.y - 19} textAnchor="middle" fill="#f0f2ff" fontSize="11" fontWeight="700">
                      {p.data.avgWpm} DBK
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* X labels */}
            {avgPoints.map((p, i) => (
              (chartData.length <= 14 || i % Math.ceil(chartData.length / 7) === 0) && (
                <text key={i} x={p.x} y={height - 5} textAnchor="middle" fill="#4a5270" fontSize="9">
                  {p.data.label}
                </text>
              )
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
