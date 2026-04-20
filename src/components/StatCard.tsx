import React, { useEffect, useRef, useState } from 'react';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  trend?: number;
  subtitle?: string;
}

function useCountUp(target: number, duration = 1000) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return count;
}

export default function StatCard({ label, value, icon, color, bgGradient, trend, subtitle }: StatCardProps) {
  const count = useCountUp(value, 1200);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 cursor-default transition-all duration-300 ${hovered ? 'scale-105 shadow-2xl' : 'shadow-lg'}`}
      style={{ background: bgGradient }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Decorative circle */}
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10 ${color}`} style={{ background: 'white' }} />
      <div className={`absolute -bottom-6 -right-2 w-28 h-28 rounded-full opacity-5`} style={{ background: 'white' }} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">{label}</p>
          <p className="text-4xl font-black text-white leading-none">{count}</p>
          {subtitle && <p className="text-xs text-white/60 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-semibold ${trend >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
              </span>
              <span className="text-xs text-white/50">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm transition-transform duration-300 ${hovered ? 'rotate-12' : ''}`}>
          {icon}
        </div>
      </div>

      {/* Animated bar */}
      <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white/50 rounded-full transition-all duration-1000"
          style={{ width: `${Math.min((value / 50) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
