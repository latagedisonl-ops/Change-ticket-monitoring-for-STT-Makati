import { useState, useMemo } from 'react';
import { ChangeTicket } from './types';
import { MOCK_TICKETS, MOCK_ALERTS } from './data/mockData';
import StatCard from './components/StatCard';
import AlertsPanel from './components/AlertsPanel';
import TicketTable from './components/TicketTable';
import TicketDetailModal from './components/TicketDetailModal';
import FilePanel from './components/FilePanel';
import { MonthlyTrendChart, StatusPieChart, CategoryBarChart, RiskRadialChart } from './components/Charts';

const Icon = {
  Total: () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  Approved: () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Emergency: () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Pending: () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Rejected: () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Progress: () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Validated: () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  Critical: () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
};

type Tab = 'dashboard' | 'tickets' | 'analytics';

export default function App() {
  const [tickets, setTickets] = useState<ChangeTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<ChangeTicket | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [currentMonth] = useState('April 2026');
  const [, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  const stats = useMemo(() => ({
    total: tickets.length,
    approved: tickets.filter(t => t.status === 'Approved' || t.status === 'CAB Reviewed and Approved').length,
    pending: tickets.filter(t => t.status === 'Pending').length,
    rejected: tickets.filter(t => t.status === 'Rejected').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    emergency: tickets.filter(t => t.type === 'Emergency Change Request').length,
    validated: tickets.filter(t => t.status === 'Validated').length,
    critical: tickets.filter(t => t.priority === 'Critical').length,
  }), [tickets]);

  const handleImport = (imported: Partial<ChangeTicket>[]) => {
    setTickets(prev => [...prev, ...imported as ChangeTicket[]]);
  };

  const handleLoadSample = () => {
    setTickets(MOCK_TICKETS);
  };

  const unreadAlerts = MOCK_ALERTS.filter(a => !a.read).length;

  const hasData = tickets.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>

      {/* ─── Welcome Modal ──────────────────────────────────────────────── */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-700/60 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="flex justify-center mb-5">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">Change Ticket Monitor</h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">STT-PH Makati · Operations Dashboard</p>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Track, monitor, and analyze change tickets for STT Makati operations.
              Import your own CSV data or load sample data to explore the dashboard.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => { handleLoadSample(); setShowWelcome(false); }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
              >
                📊 View Sample Data
              </button>
              <button
                onClick={() => setShowWelcome(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl border border-slate-700/50 transition-colors"
              >
                📁 Import My Data
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800">
              <p className="text-[11px] text-slate-600">Created by</p>
              <p className="text-xs font-bold text-slate-400 mt-0.5">Edison Latag</p>
              <p className="text-[10px] text-slate-600">STT-PH Change Management · v2.0.0</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Top Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => setSidebarOpen(o => !o)} className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors lg:hidden">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-white tracking-tight leading-none">Change Ticket Monitor</h1>
              <p className="text-[10px] text-slate-500 leading-none mt-0.5">STT-PH-MAKATI · Operations Dashboard</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 ml-2">
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-xs text-slate-400 font-medium">STT-PH-MAKATI</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 ml-4 bg-slate-800/60 rounded-xl p-1">
            {(['dashboard', 'tickets', 'analytics'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                {tab === 'dashboard' ? '📊 Dashboard' : tab === 'tickets' ? '🎫 Tickets' : '📈 Analytics'}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700/50">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-slate-300 font-semibold">{currentMonth}</span>
            </div>

            <div className="relative p-2 rounded-lg bg-slate-800 border border-slate-700/50">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-green-400 font-semibold uppercase tracking-wider">Live</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-lg">
              EL
            </div>
          </div>
        </div>

        <div className="md:hidden flex border-t border-slate-800/60">
          {(['dashboard', 'tickets', 'analytics'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-semibold capitalize transition-colors ${
                activeTab === tab ? 'text-blue-400 border-b-2 border-blue-500' : 'text-slate-500'
              }`}
            >
              {tab === 'dashboard' ? '📊 Dashboard' : tab === 'tickets' ? '🎫 Tickets' : '📈 Analytics'}
            </button>
          ))}
        </div>
      </header>

      {/* ─── Main Content ────────────────────────────────────────────────── */}
      <main className="flex-1 p-4 lg:p-5 space-y-5 max-w-screen-2xl mx-auto w-full">

        {/* ── Empty State ──────────────────────────────────────────────── */}
        {!hasData && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-5 bg-slate-800/60 border border-slate-700/50 rounded-3xl">
                  <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-black text-white">No data loaded</h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                Import a CSV file to get started, or load sample data to explore the dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <button
                onClick={handleLoadSample}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
              >
                📊 Load Sample Data
              </button>
              <div className="flex-1">
                <FilePanel tickets={tickets} onImport={handleImport} />
              </div>
            </div>
          </div>
        )}

        {/* ── DASHBOARD TAB ──────────────────────────────────────────────── */}
        {activeTab === 'dashboard' && hasData && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Operations Overview</h2>
                <p className="text-xs text-slate-500 mt-0.5">All Changes Export · {currentMonth} · Real-time monitoring</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-slate-800 border border-slate-700/50 rounded-lg text-xs text-slate-400">
                  {tickets.length} Total Records
                </span>
                <button
                  onClick={() => setActiveTab('tickets')}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs text-white font-semibold transition-colors shadow-lg shadow-blue-500/20"
                >
                  View All Tickets →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="col-span-1">
                <StatCard label="Total" value={stats.total} icon={<Icon.Total />}
                  color="text-blue-400" bgGradient="linear-gradient(135deg,#1d4ed8,#4f46e5)"
                  trend={12} subtitle="All changes" />
              </div>
              <div className="col-span-1">
                <StatCard label="Approved" value={stats.approved} icon={<Icon.Approved />}
                  color="text-green-400" bgGradient="linear-gradient(135deg,#059669,#10b981)"
                  trend={8} subtitle="CAB & direct" />
              </div>
              <div className="col-span-1">
                <StatCard label="Pending" value={stats.pending} icon={<Icon.Pending />}
                  color="text-amber-400" bgGradient="linear-gradient(135deg,#d97706,#f59e0b)"
                  trend={-3} subtitle="Awaiting review" />
              </div>
              <div className="col-span-1">
                <StatCard label="Rejected" value={stats.rejected} icon={<Icon.Rejected />}
                  color="text-red-400" bgGradient="linear-gradient(135deg,#dc2626,#ef4444)"
                  trend={2} subtitle="Not approved" />
              </div>
              <div className="col-span-1">
                <StatCard label="In Progress" value={stats.inProgress} icon={<Icon.Progress />}
                  color="text-purple-400" bgGradient="linear-gradient(135deg,#7c3aed,#8b5cf6)"
                  trend={0} subtitle="Active now" />
              </div>
              <div className="col-span-1">
                <StatCard label="Emergency" value={stats.emergency} icon={<Icon.Emergency />}
                  color="text-red-400" bgGradient="linear-gradient(135deg,#be123c,#e11d48)"
                  trend={1} subtitle="High priority" />
              </div>
              <div className="col-span-1">
                <StatCard label="Validated" value={stats.validated} icon={<Icon.Validated />}
                  color="text-cyan-400" bgGradient="linear-gradient(135deg,#0891b2,#06b6d4)"
                  trend={5} subtitle="Post-impl. checked" />
              </div>
              <div className="col-span-1">
                <StatCard label="Critical" value={stats.critical} icon={<Icon.Critical />}
                  color="text-orange-400" bgGradient="linear-gradient(135deg,#ea580c,#f97316)"
                  trend={-1} subtitle="Priority: Critical" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2"><MonthlyTrendChart /></div>
              <div className="lg:col-span-1"><AlertsPanel alerts={MOCK_ALERTS} /></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="sm:col-span-1"><StatusPieChart /></div>
              <div className="sm:col-span-1"><RiskRadialChart /></div>
              <div className="sm:col-span-2"><CategoryBarChart /></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-1">
                <FilePanel tickets={tickets} onImport={handleImport} />
              </div>
              <div className="lg:col-span-3">
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-700/50 bg-slate-900/40 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-200 text-sm">Recent Tickets</h3>
                      <p className="text-xs text-slate-500">Latest 6 change entries</p>
                    </div>
                    <button onClick={() => setActiveTab('tickets')} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                      View all →
                    </button>
                  </div>
                  <div className="divide-y divide-slate-700/30">
                    {tickets.slice(0, 6).map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTicket(t)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/20 cursor-pointer transition-colors"
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          t.type === 'Emergency Change Request' ? 'bg-red-500 animate-pulse' :
                          t.type === 'Routine Change Request' ? 'bg-green-500' :
                          t.type === 'Normal Change Request' ? 'bg-blue-500' : 'bg-amber-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-slate-400">{t.ticketNumber}</span>
                            <span className="text-xs text-slate-300 truncate">{t.title}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-slate-500">{t.site}</span>
                            <span className="text-[10px] text-slate-600">·</span>
                            <span className="text-[10px] text-slate-500">{t.plannedStart}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${
                          t.status === 'Approved' || t.status === 'CAB Reviewed and Approved' ? 'bg-green-500/15 text-green-400 border-green-500/30' :
                          t.status === 'Pending' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                          t.status === 'Rejected' ? 'bg-red-500/15 text-red-400 border-red-500/30' :
                          'bg-slate-500/15 text-slate-400 border-slate-500/30'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── TICKETS TAB ──────────────────────────────────────────────────── */}
        {activeTab === 'tickets' && hasData && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">All Change Tickets</h2>
                <p className="text-xs text-slate-500 mt-0.5">{tickets.length} records · Click any row for details</p>
              </div>
              <FilePanel tickets={tickets} onImport={handleImport} />
            </div>
            <TicketTable tickets={tickets} onSelect={setSelectedTicket} />
          </>
        )}

        {/* ── ANALYTICS TAB ────────────────────────────────────────────────── */}
        {activeTab === 'analytics' && hasData && (
          <>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Analytics & Insights</h2>
              <p className="text-xs text-slate-500 mt-0.5">Visual breakdown of change ticket data · {currentMonth}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-green-400">{stats.total ? Math.round((stats.approved / stats.total) * 100) : 0}%</div>
                <div className="text-xs text-slate-500 mt-1">Approval Rate</div>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-red-400">{stats.total ? Math.round((stats.emergency / stats.total) * 100) : 0}%</div>
                <div className="text-xs text-slate-500 mt-1">Emergency Rate</div>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-amber-400">{stats.pending + stats.inProgress}</div>
                <div className="text-xs text-slate-500 mt-1">Awaiting Action</div>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center">
                <div className="text-3xl font-black text-cyan-400">{stats.validated}</div>
                <div className="text-xs text-slate-500 mt-1">Validated</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MonthlyTrendChart />
              <CategoryBarChart />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatusPieChart />
              <RiskRadialChart />
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5">
              <h3 className="font-bold text-slate-200 text-sm mb-4">Site-wise Breakdown</h3>
              <div className="space-y-3">
                {(['STT Makati', 'STT Taguig', 'STT BGC', 'STT Ortigas'] as const).map(site => {
                  const siteTickets = tickets.filter(t => t.site === site);
                  const approved = siteTickets.filter(t => t.status === 'Approved' || t.status === 'CAB Reviewed and Approved').length;
                  const pct = siteTickets.length ? Math.round((approved / siteTickets.length) * 100) : 0;
                  return (
                    <div key={site} className="flex items-center gap-4">
                      <div className="w-28 text-xs text-slate-400 font-medium truncate">{site}</div>
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%` }} />
                      </div>
                      <div className="text-xs text-slate-300 w-16 text-right font-semibold">{pct}% ({siteTickets.length})</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5">
              <h3 className="font-bold text-slate-200 text-sm mb-4">Assignee Workload</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(
                  tickets.reduce((acc, t) => {
                    acc[t.assignee] = (acc[t.assignee] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).sort(([, a], [, b]) => b - a).slice(0, 6).map(([name, count]) => (
                  <div key={name} className="flex items-center gap-3 bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{name}</p>
                      <div className="h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((count / tickets.length) * 300, 100)}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-300">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/60 px-4 py-3 bg-slate-900/50">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-600">STT-PH Change Management System</span>
            <span className="text-[10px] text-slate-700">·</span>
            <span className="text-[10px] text-slate-600">{currentMonth}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {[
              { label: 'Normal', color: 'bg-cyan-500' },
              { label: 'Emergency', color: 'bg-red-500' },
              { label: 'Routine', color: 'bg-green-500' },
              { label: 'Standard', color: 'bg-amber-500' },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-[10px] text-slate-600">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-600">v2.0.0</span>
            <span className="text-[10px] text-slate-700">·</span>
            <span className="text-[10px] text-slate-500 font-semibold">Created by Edison Latag</span>
          </div>
        </div>
      </footer>

      <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
}
