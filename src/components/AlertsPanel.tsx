import { useState } from 'react';
import { Alert } from '../types';

const ALERT_CONFIG = {
  critical: { bg: 'bg-red-500/10', border: 'border-red-500/40', dot: 'bg-red-500', text: 'text-red-400', label: 'CRITICAL', pulse: true },
  warning:  { bg: 'bg-amber-500/10', border: 'border-amber-500/40', dot: 'bg-amber-400', text: 'text-amber-400', label: 'WARNING', pulse: false },
  info:     { bg: 'bg-blue-500/10',  border: 'border-blue-500/40',  dot: 'bg-blue-400',  text: 'text-blue-400',  label: 'INFO',     pulse: false },
  success:  { bg: 'bg-green-500/10', border: 'border-green-500/40', dot: 'bg-green-400', text: 'text-green-400', label: 'OK',       pulse: false },
};

const AlertIcon = ({ type }: { type: Alert['type'] }) => {
  if (type === 'critical') return (
    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  );
  if (type === 'warning') return (
    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  );
  if (type === 'success') return (
    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
  return (
    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  );
};

interface Props { alerts: Alert[]; }

export default function AlertsPanel({ alerts }: Props) {
  const [filter, setFilter] = useState<Alert['type'] | 'all'>('all');
  const unread = alerts.filter(a => !a.read).length;
  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  const counts = {
    critical: alerts.filter(a => a.type === 'critical').length,
    warning:  alerts.filter(a => a.type === 'warning').length,
    info:     alerts.filter(a => a.type === 'info').length,
    success:  alerts.filter(a => a.type === 'success').length,
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-900/40">
        <div className="flex items-center gap-2">
          <div className="relative">
            <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              </span>
            )}
          </div>
          <span className="font-semibold text-slate-200 text-sm">Live Alerts Feed</span>
          {unread > 0 && (
            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30">
              {unread} new
            </span>
          )}
        </div>
        <span className="text-xs text-slate-500">Read-only</span>
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 px-4 py-2 border-b border-slate-700/30 flex-wrap">
        {(['all', 'critical', 'warning', 'info', 'success'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
              filter === f
                ? f === 'all' ? 'bg-slate-600 text-white' :
                  f === 'critical' ? 'bg-red-500/30 text-red-300 border border-red-500/50' :
                  f === 'warning' ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' :
                  f === 'info' ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50' :
                  'bg-green-500/30 text-green-300 border border-green-500/50'
                : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {f === 'all' ? `All (${alerts.length})` :
             f === 'critical' ? `🔴 ${counts.critical}` :
             f === 'warning' ? `🟡 ${counts.warning}` :
             f === 'info' ? `🔵 ${counts.info}` :
             `🟢 ${counts.success}`}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="overflow-y-auto flex-1 divide-y divide-slate-700/30" style={{ maxHeight: '420px' }}>
        {filtered.map((alert, i) => {
          const cfg = ALERT_CONFIG[alert.type];
          return (
            <div
              key={alert.id}
              className={`px-4 py-3 flex gap-3 items-start transition-all duration-200 hover:bg-slate-700/20 ${!alert.read ? cfg.bg : ''}`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Icon (read-only, non-clickable) */}
              <div className={`mt-0.5 p-1.5 rounded-lg border ${cfg.border} bg-slate-900/40 flex-shrink-0 select-none pointer-events-none`}>
                <AlertIcon type={alert.type} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-bold tracking-wider ${cfg.text}`}>{cfg.label}</span>
                  {alert.ticketId && (
                    <span className="text-[10px] text-slate-500 font-mono">{alert.ticketId}</span>
                  )}
                  {!alert.read && (
                    <span className="ml-auto flex-shrink-0">
                      <span className={`inline-flex w-2 h-2 rounded-full ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
                <p className="text-[10px] text-slate-500 mt-1">{alert.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-slate-700/30 bg-slate-900/20">
        <p className="text-[10px] text-slate-500 text-center">
          ⚠️ Alert icons are visual indicators only — read-only mode
        </p>
      </div>
    </div>
  );
}
