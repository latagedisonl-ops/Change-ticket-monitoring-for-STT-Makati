import { useEffect, useState } from 'react';
import { FileOperation } from '../types';

interface Props {
  operation: FileOperation;
  mode: 'import' | 'export';
  fileType: 'CSV' | 'PDF';
  progress?: number;
  message?: string;
  details?: string[];
  onClose: () => void;
  autoClose?: boolean;
}

const CONFIG = {
  loading: { icon: null, title: 'Processing…', bg: 'from-blue-600 to-indigo-700' },
  success: { icon: '✅', title: 'Success!', bg: 'from-green-600 to-emerald-700' },
  error:   { icon: '❌', title: 'Failed', bg: 'from-red-600 to-rose-700' },
  idle:    { icon: null, title: '', bg: 'from-slate-600 to-slate-700' },
};

export default function FileOperationModal({ operation, mode, fileType, progress = 0, message, details = [], onClose, autoClose = true }: Props) {
  const [visible, setVisible] = useState(false);
  const [animProg, setAnimProg] = useState(0);

  useEffect(() => {
    if (operation !== 'idle') {
      setVisible(true);
      setAnimProg(0);
    }
  }, [operation]);

  useEffect(() => {
    if (operation === 'loading') {
      const timer = setInterval(() => {
        setAnimProg(p => Math.min(p + Math.random() * 8, progress || 95));
      }, 120);
      return () => clearInterval(timer);
    }
    if (operation === 'success' || operation === 'error') {
      setAnimProg(100);
      if (autoClose && operation === 'success') {
        const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, 2500);
        return () => clearTimeout(t);
      }
    }
  }, [operation, progress, autoClose, onClose]);

  if (!visible) return null;

  const cfg = CONFIG[operation];
  const isLoading = operation === 'loading';

  const steps = mode === 'import' && fileType === 'PDF'
    ? ['📄 Reading PDF file…', '🔍 Auto-detecting document format…', '🧠 Mapping fields intelligently…', '✅ Structuring data records…']
    : mode === 'import'
    ? ['📂 Reading CSV file…', '🔎 Validating headers…', '📊 Parsing records…', '✅ Importing data…']
    : fileType === 'PDF'
    ? ['📊 Collecting records…', '🎨 Generating PDF layout…', '📄 Rendering pages…', '💾 Saving file…']
    : ['📊 Collecting records…', '🔤 Formatting CSV…', '💾 Downloading file…', '✅ Complete'];

  const activeStep = Math.floor((animProg / 100) * steps.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${cfg.bg} px-6 py-5`}>
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full border-4 border-white/30 border-t-white animate-spin" />
            ) : (
              <div className="text-3xl">{cfg.icon}</div>
            )}
            <div>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                {fileType} {mode === 'import' ? 'Import' : 'Export'}
              </p>
              <h2 className="text-xl font-bold text-white">{cfg.title}</h2>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-slate-800 px-6 py-5 space-y-4">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>{message || (isLoading ? 'Please wait…' : operation === 'success' ? 'Completed successfully' : 'Operation failed')}</span>
              <span className="font-semibold text-slate-300">{Math.round(animProg)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  operation === 'error' ? 'bg-red-500' :
                  operation === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${animProg}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {steps.map((step, i) => {
              const done = i < activeStep || !isLoading;
              const active = i === activeStep && isLoading;
              return (
                <div key={i} className={`flex items-center gap-2.5 text-xs transition-all duration-300 ${
                  done || !isLoading ? 'text-slate-300' : active ? 'text-blue-400' : 'text-slate-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    (done && !isLoading) || (i < activeStep) ? 'bg-green-500' :
                    active ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'
                  }`}>
                    {((done && !isLoading) || i < activeStep) ? (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : active ? (
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    ) : null}
                  </div>
                  <span className={active ? 'font-semibold' : ''}>{step}</span>
                </div>
              );
            })}
          </div>

          {/* Details */}
          {details.length > 0 && (
            <div className="bg-slate-900/60 rounded-xl p-3 max-h-32 overflow-y-auto">
              {details.map((d, i) => (
                <p key={i} className={`text-[11px] font-mono mb-0.5 ${d.startsWith('⚠') ? 'text-amber-400' : d.startsWith('❌') ? 'text-red-400' : 'text-slate-400'}`}>{d}</p>
              ))}
            </div>
          )}

          {/* PDF auto-detection panel */}
          {mode === 'import' && fileType === 'PDF' && isLoading && animProg > 30 && (
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-3">
              <p className="text-xs font-semibold text-indigo-400 mb-1.5">🧠 AI Auto-Detection Active</p>
              <div className="space-y-1">
                {['Document format: Change Ticket Report ✓', 'Field mapping: 9/9 fields detected ✓', 'Confidence level: 94%'].map((l, i) => (
                  animProg > 40 + i * 15 ? (
                    <p key={i} className="text-[11px] text-slate-400 font-mono">{l}</p>
                  ) : null
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {(operation === 'success' || operation === 'error') && (
            <button
              onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                operation === 'success'
                  ? 'bg-green-600 hover:bg-green-500 text-white'
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
            >
              {operation === 'success' ? 'Done' : 'Close & Retry'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
