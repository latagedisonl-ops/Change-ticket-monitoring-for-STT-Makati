import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts';
import { MONTHLY_TREND, STATUS_DISTRIBUTION, RISK_DATA, CATEGORY_DATA } from '../data/mockData';

const TOOLTIP_STYLE = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '12px',
  padding: '10px 14px',
  color: '#e2e8f0',
  fontSize: 12,
};

// ─── Area Chart: Monthly Trend ─────────────────────────────────────────────────
export function MonthlyTrendChart() {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-200 text-sm">Monthly Change Volume</h3>
          <p className="text-xs text-slate-500">Trend by change type</p>
        </div>
        <div className="flex gap-3 flex-wrap justify-end">
          {[{c:'#3b82f6',l:'Normal'},{c:'#ef4444',l:'Emergency'},{c:'#22c55e',l:'Routine'},{c:'#f59e0b',l:'Standard'}].map(({c,l}) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full inline-block" style={{ background: c }} />
              <span className="text-[11px] text-slate-400">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={MONTHLY_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            {[['normal','#3b82f6'],['emergency','#ef4444'],['routine','#22c55e'],['standard','#f59e0b']].map(([k,c]) => (
              <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={c} stopOpacity={0.3} />
                <stop offset="95%" stopColor={c} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ stroke: '#334155' }} />
          <Area type="monotone" dataKey="normal"    stroke="#3b82f6" fill="url(#grad-normal)"    strokeWidth={2.5} dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
          <Area type="monotone" dataKey="emergency" stroke="#ef4444" fill="url(#grad-emergency)" strokeWidth={2.5} dot={{ fill: '#ef4444', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
          <Area type="monotone" dataKey="routine"   stroke="#22c55e" fill="url(#grad-routine)"   strokeWidth={2.5} dot={{ fill: '#22c55e', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
          <Area type="monotone" dataKey="standard"  stroke="#f59e0b" fill="url(#grad-standard)"  strokeWidth={2.5} dot={{ fill: '#f59e0b', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Pie Chart: Status Distribution ────────────────────────────────────────────
const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.05) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">{`${(percent * 100).toFixed(0)}%`}</text>;
};

export function StatusPieChart() {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5">
      <div className="mb-3">
        <h3 className="font-bold text-slate-200 text-sm">Status Distribution</h3>
        <p className="text-xs text-slate-500">Current period breakdown</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={STATUS_DISTRIBUTION} cx="50%" cy="50%" labelLine={false} label={renderLabel} outerRadius={90} innerRadius={45} dataKey="value" animationBegin={0} animationDuration={1200}>
            {STATUS_DISTRIBUTION.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v, n) => [v, n]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-1.5 mt-2">
        {STATUS_DISTRIBUTION.map(s => (
          <div key={s.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
            <span className="text-[11px] text-slate-400 truncate">{s.name}</span>
            <span className="text-[11px] text-slate-300 font-semibold ml-auto">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bar Chart: Category ───────────────────────────────────────────────────────
export function CategoryBarChart() {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5">
      <div className="mb-3">
        <h3 className="font-bold text-slate-200 text-sm">Changes by Category</h3>
        <p className="text-xs text-slate-500">Volume per work category</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={CATEGORY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: '#1e293b' }} />
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Radial Bar: Risk Level ────────────────────────────────────────────────────
export function RiskRadialChart() {
  const total = RISK_DATA.reduce((s, r) => s + r.value, 0);
  const data = RISK_DATA.map(r => ({ ...r, percentage: Math.round((r.value / total) * 100) }));

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5">
      <div className="mb-3">
        <h3 className="font-bold text-slate-200 text-sm">Risk Level Overview</h3>
        <p className="text-xs text-slate-500">Current period risk distribution</p>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={data} startAngle={180} endAngle={0}>
          <RadialBar dataKey="value" cornerRadius={6} label={{ fill: '#94a3b8', fontSize: 10 }}>
            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </RadialBar>
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Legend iconSize={10} formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{v}</span>} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="flex justify-around mt-1">
        {data.map(r => (
          <div key={r.name} className="text-center">
            <div className="text-lg font-black" style={{ color: r.color }}>{r.value}</div>
            <div className="text-[10px] text-slate-500">{r.name}</div>
            <div className="text-[10px]" style={{ color: r.color }}>{r.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
