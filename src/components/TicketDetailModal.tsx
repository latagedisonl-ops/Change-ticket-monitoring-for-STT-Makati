import { ChangeTicket } from '../types';

interface Props {
  ticket: ChangeTicket | null;
  onClose: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  'Approved': 'bg-green-500/20 text-green-400 border-green-500/40',
  'CAB Reviewed and Approved': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  'Validated': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  'Pending': 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  'Rejected': 'bg-red-500/20 text-red-400 border-red-500/40',
  'In Progress': 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  'New': 'bg-slate-500/20 text-slate-400 border-slate-500/40',
};

const RISK_COLORS: Record<string, string> = {
  High: 'text-red-400',
  Medium: 'text-amber-400',
  Low: 'text-green-400',
};

const Field = ({ label, value, mono }: { label: string; value?: string; mono?: boolean }) => (
  <div className="space-y-0.5">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
    <p className={`text-sm text-slate-200 ${mono ? 'font-mono' : ''} ${!value ? 'text-slate-600 italic' : ''}`}>
      {value || 'N/A'}
    </p>
  </div>
);

export default function TicketDetailModal({ ticket, onClose }: Props) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 border-b border-slate-700/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {ticket.ticketNumber}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLES[ticket.status] || 'bg-slate-600/20 text-slate-400'}`}>
                  {ticket.status}
                </span>
                <span className={`text-xs font-semibold ml-auto ${RISK_COLORS[ticket.riskLevel]}`}>
                  {ticket.riskLevel} Risk
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-100 leading-snug">{ticket.title}</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Type & Priority row */}
          <div className="flex gap-3 flex-wrap">
            {[
              { label: 'Type', val: ticket.type },
              { label: 'Priority', val: ticket.priority },
              { label: 'Category', val: ticket.category },
              { label: 'Site', val: ticket.site },
              { label: 'Location', val: ticket.location },
            ].map(({ label, val }) => (
              <div key={label} className="bg-slate-900/50 rounded-lg px-3 py-2 border border-slate-700/30 flex-1 min-w-24">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{label}</p>
                <p className="text-sm text-slate-200 font-medium mt-0.5">{val}</p>
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-700/30">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Timeline</p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Planned Start" value={ticket.plannedStart} mono />
              <Field label="Planned End" value={ticket.plannedEnd} mono />
              <Field label="Actual Start" value={ticket.actualStart} mono />
              <Field label="Actual End" value={ticket.actualEnd} mono />
            </div>
          </div>

          {/* People */}
          <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-700/30">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Personnel</p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Assignee" value={ticket.assignee} />
              <Field label="Approver" value={ticket.approver} />
              <Field label="CAB Comment" value={ticket.cabComment} />
              <Field label="Implementer Gate" value={ticket.implementerGate} />
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Created At" value={ticket.createdAt} mono />
            <Field label="Updated At" value={ticket.updatedAt} mono />
          </div>

          {/* Progress indicator for in-progress tickets */}
          {ticket.status === 'In Progress' && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-purple-400 font-semibold">Implementation in Progress</span>
                <span className="text-purple-300">~60%</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: '60%' }} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900/40 border-t border-slate-700/30 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm text-slate-200 transition-colors font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
