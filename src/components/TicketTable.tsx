import { useState, useMemo } from 'react';
import { ChangeTicket } from '../types';

const STATUS_STYLES: Record<string, string> = {
  'Approved': 'bg-green-500/15 text-green-400 border-green-500/30',
  'CAB Reviewed and Approved': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Validated': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Pending': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Rejected': 'bg-red-500/15 text-red-400 border-red-500/30',
  'In Progress': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'New': 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  'Closed': 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

const TYPE_COLORS: Record<string, string> = {
  'Normal Change Request': 'text-cyan-400',
  'Emergency Change Request': 'text-red-400',
  'Routine Change Request': 'text-green-400',
  'Standard Change Request': 'text-amber-400',
};

const PRIORITY_STYLES: Record<string, string> = {
  Critical: 'text-red-400',
  High: 'text-orange-400',
  Medium: 'text-yellow-400',
  Low: 'text-slate-400',
};

const ROW_BG: Record<string, string> = {
  'Emergency Change Request': 'bg-red-500/5 hover:bg-red-500/10',
  'Normal Change Request': 'bg-cyan-500/5 hover:bg-cyan-500/10',
  'Routine Change Request': 'bg-green-500/5 hover:bg-green-500/10',
  'Standard Change Request': 'bg-amber-500/5 hover:bg-amber-500/10',
};

interface Props {
  tickets: ChangeTicket[];
  onSelect?: (ticket: ChangeTicket) => void;
}

type SortKey = keyof ChangeTicket;
type SortDir = 'asc' | 'desc';

export default function TicketTable({ tickets, onSelect }: Props) {
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: 'plannedStart', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const PAGE_SIZE = 12;

  const filtered = useMemo(() => {
    return tickets.filter(t => {
      const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.ticketNumber.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || t.type === typeFilter;
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [tickets, search, typeFilter, statusFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sort.key] ?? '';
      const bv = b[sort.key] ?? '';
      return sort.dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    setSort(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));
    setPage(1);
  };

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="ml-1 inline-block opacity-40 text-[10px]">
      {sort.key === k ? (sort.dir === 'asc' ? '▲' : '▼') : '⇅'}
    </span>
  );

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-slate-900/40">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search ticket # or title…"
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/70 transition-colors"
          />
        </div>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
          className="px-3 py-1.5 text-xs bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/70">
          <option value="all">All Types</option>
          <option value="Normal Change Request">Normal</option>
          <option value="Emergency Change Request">Emergency</option>
          <option value="Routine Change Request">Routine</option>
          <option value="Standard Change Request">Standard</option>
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-1.5 text-xs bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500/70">
          <option value="all">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="In Progress">In Progress</option>
          <option value="Validated">Validated</option>
          <option value="New">New</option>
          <option value="CAB Reviewed and Approved">CAB Approved</option>
        </select>
        <span className="text-xs text-slate-500 ml-auto">{filtered.length} of {tickets.length} records</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-900/60 border-b border-slate-700/50">
              {[
                { label: 'Ticket #', key: 'ticketNumber' as SortKey },
                { label: 'Title', key: 'title' as SortKey },
                { label: 'Type', key: 'type' as SortKey },
                { label: 'Site', key: 'site' as SortKey },
                { label: 'Planned Start', key: 'plannedStart' as SortKey },
                { label: 'Planned End', key: 'plannedEnd' as SortKey },
                { label: 'Status', key: 'status' as SortKey },
                { label: 'Priority', key: 'priority' as SortKey },
                { label: 'Assignee', key: 'assignee' as SortKey },
                { label: 'CAB Comment', key: 'cabComment' as SortKey },
                { label: 'Gate', key: 'implementerGate' as SortKey },
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-3 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 select-none whitespace-nowrap transition-colors"
                >
                  {col.label}<SortIcon k={col.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {pageData.map((ticket, i) => (
              <tr
                key={ticket.id}
                onClick={() => onSelect?.(ticket)}
                className={`cursor-pointer transition-all duration-150 ${ROW_BG[ticket.type] || 'hover:bg-slate-700/20'}`}
                style={{ animationDelay: `${i * 20}ms` }}
              >
                <td className="px-3 py-2 font-mono font-semibold text-slate-300 whitespace-nowrap">{ticket.ticketNumber}</td>
                <td className="px-3 py-2 max-w-xs">
                  <span className="text-slate-200 line-clamp-2 leading-tight" title={ticket.title}>{ticket.title}</span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`font-medium ${TYPE_COLORS[ticket.type]}`}>
                    {ticket.type === 'Emergency Change Request' ? '🚨 Emergency' :
                     ticket.type === 'Routine Change Request' ? '🔄 Routine' :
                     ticket.type === 'Standard Change Request' ? '📋 Standard' : '📝 Normal'}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-400">{ticket.site}</td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-400 font-mono">{ticket.plannedStart}</td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-400 font-mono">{ticket.plannedEnd}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_STYLES[ticket.status] || 'bg-slate-600/20 text-slate-400'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`font-semibold ${PRIORITY_STYLES[ticket.priority]}`}>
                    {ticket.priority === 'Critical' ? '🔴' : ticket.priority === 'High' ? '🟠' : ticket.priority === 'Medium' ? '🟡' : '🟢'} {ticket.priority}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-400">{ticket.assignee}</td>
                <td className="px-3 py-2 text-slate-500 max-w-xs">
                  <span className="truncate block" title={ticket.cabComment}>{ticket.cabComment || '—'}</span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {ticket.implementerGate ? (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      ticket.implementerGate === 'Approved' ? 'text-green-400' :
                      ticket.implementerGate === 'Rejected' ? 'text-red-400' :
                      ticket.implementerGate === 'Pending' ? 'text-amber-400' : 'text-slate-400'
                    }`}>{ticket.implementerGate}</span>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-700/50 bg-slate-900/30">
        <span className="text-[11px] text-slate-500">
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, sorted.length)}–{Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="px-2 py-1 rounded text-[11px] bg-slate-700/50 text-slate-400 disabled:opacity-30 hover:bg-slate-600 transition-colors">«</button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-2 py-1 rounded text-[11px] bg-slate-700/50 text-slate-400 disabled:opacity-30 hover:bg-slate-600 transition-colors">‹</button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
            return (
              <button key={p} onClick={() => setPage(p)}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${page === p ? 'bg-blue-600 text-white font-semibold' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600'}`}>
                {p}
              </button>
            );
          })}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-2 py-1 rounded text-[11px] bg-slate-700/50 text-slate-400 disabled:opacity-30 hover:bg-slate-600 transition-colors">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="px-2 py-1 rounded text-[11px] bg-slate-700/50 text-slate-400 disabled:opacity-30 hover:bg-slate-600 transition-colors">»</button>
        </div>
      </div>
    </div>
  );
}
