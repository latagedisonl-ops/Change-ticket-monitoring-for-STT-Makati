import { useRef, useState } from 'react';
import { ChangeTicket, FileOperation } from '../types';
import { exportToCSV, exportToPDF, parseCSV, parsePDF } from '../utils/fileUtils';
import FileOperationModal from './FileOperationModal';

interface Props {
  tickets: ChangeTicket[];
  onImport: (tickets: Partial<ChangeTicket>[]) => void;
}

type ActiveOp = { operation: FileOperation; mode: 'import' | 'export'; fileType: 'CSV' | 'PDF'; message?: string; details?: string[] } | null;

export default function FilePanel({ tickets, onImport }: Props) {
  const [activeOp, setActiveOp] = useState<ActiveOp>(null);
  const csvRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  const startOp = (mode: 'import' | 'export', fileType: 'CSV' | 'PDF') => {
    setActiveOp({ operation: 'loading', mode, fileType });
  };

  // ─── Export handlers ────────────────────────────────────────────────────────
  const handleCSVExport = async () => {
    startOp('export', 'CSV');
    await delay(2200);
    try {
      exportToCSV(tickets, `change_tickets_${datestamp()}.csv`);
      setActiveOp({ operation: 'success', mode: 'export', fileType: 'CSV', message: `${tickets.length} records exported successfully`, details: [`✅ Exported ${tickets.length} change tickets`, `✅ File: change_tickets_${datestamp()}.csv`] });
    } catch {
      setActiveOp({ operation: 'error', mode: 'export', fileType: 'CSV', message: 'Export failed', details: ['❌ Unable to generate CSV file'] });
    }
  };

  const handlePDFExport = async () => {
    startOp('export', 'PDF');
    await delay(3000);
    try {
      await exportToPDF(tickets, `change_tickets_${datestamp()}.pdf`);
      setActiveOp({ operation: 'success', mode: 'export', fileType: 'PDF', message: `PDF generated with ${tickets.length} records`, details: [`✅ ${tickets.length} rows rendered`, '✅ Landscape A4 format', `✅ File: change_tickets_${datestamp()}.pdf`] });
    } catch {
      setActiveOp({ operation: 'error', mode: 'export', fileType: 'PDF', message: 'PDF generation failed', details: ['❌ Failed to render PDF'] });
    }
  };

  // ─── Import handlers ────────────────────────────────────────────────────────
  const handleCSVImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    startOp('import', 'CSV');
    await delay(500);
    try {
      const result = await parseCSV(file);
      if (result.errors.length > 0 && result.validRows === 0) {
        setActiveOp({ operation: 'error', mode: 'import', fileType: 'CSV', message: `Import failed — ${result.errors.length} errors`, details: result.errors.map(e => `❌ ${e}`) });
      } else {
        onImport(result.tickets);
        const details = [
          `✅ ${result.validRows} valid records imported`,
          ...result.warnings.map(w => `⚠️ ${w}`),
          ...result.errors.map(e => `❌ ${e}`),
        ];
        setActiveOp({ operation: 'success', mode: 'import', fileType: 'CSV', message: `${result.validRows} records imported`, details });
      }
    } catch {
      setActiveOp({ operation: 'error', mode: 'import', fileType: 'CSV', message: 'Parse error', details: ['❌ Failed to parse CSV file'] });
    }
    e.target.value = '';
  };

  const handlePDFImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    startOp('import', 'PDF');
    await delay(600);
    try {
      const result = await parsePDF(file);
      if (result.errors.length > 0 && result.tickets.length === 0) {
        setActiveOp({ operation: 'error', mode: 'import', fileType: 'PDF', message: 'PDF parsing failed', details: result.errors.map(e => `❌ ${e}`) });
      } else {
        onImport(result.tickets);
        setActiveOp({
          operation: 'success', mode: 'import', fileType: 'PDF',
          message: `${result.tickets.length} records detected (${result.confidence}% confidence)`,
          details: [
            `✅ ${result.tickets.length} change tickets extracted`,
            `✅ ${result.detectedFields.length} fields auto-mapped`,
            `✅ Detection confidence: ${result.confidence}%`,
            ...result.errors.map(e => `❌ ${e}`),
          ],
        });
      }
    } catch {
      setActiveOp({ operation: 'error', mode: 'import', fileType: 'PDF', message: 'PDF parsing failed', details: ['❌ Unable to process PDF'] });
    }
    e.target.value = '';
  };

  return (
    <>
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-200 text-sm">Data Management</h3>
            <p className="text-xs text-slate-500">Import & Export Operations</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* CSV Section */}
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-green-500/20 rounded-lg">
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-300">CSV Format</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => csvRef.current?.click()}
                className="w-full py-2 px-3 rounded-lg bg-slate-700/60 hover:bg-green-500/20 border border-slate-600/50 hover:border-green-500/50 text-xs text-slate-300 hover:text-green-300 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import CSV
              </button>
              <button
                onClick={handleCSVExport}
                className="w-full py-2 px-3 rounded-lg bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 hover:border-green-500/60 text-xs text-green-300 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-2 leading-tight">Comma-separated values, UTF-8 encoded, all fields included</p>
          </div>

          {/* PDF Section */}
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-red-500/20 rounded-lg">
                <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-300">PDF Format</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => pdfRef.current?.click()}
                className="w-full py-2 px-3 rounded-lg bg-slate-700/60 hover:bg-red-500/20 border border-slate-600/50 hover:border-red-500/50 text-xs text-slate-300 hover:text-red-300 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import PDF
                <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-indigo-500/30 text-indigo-400 rounded-full">AI</span>
              </button>
              <button
                onClick={handlePDFExport}
                className="w-full py-2 px-3 rounded-lg bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 hover:border-red-500/60 text-xs text-red-300 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export PDF
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-2 leading-tight">Intelligent auto-detection maps PDF content to structured records</p>
          </div>
        </div>

        {/* Hidden inputs */}
        <input ref={csvRef} type="file" accept=".csv" className="hidden" onChange={handleCSVImport} />
        <input ref={pdfRef} type="file" accept=".pdf" className="hidden" onChange={handlePDFImport} />

        {/* Format hint */}
        <div className="mt-3 bg-slate-900/30 rounded-lg p-2.5 border border-slate-700/20">
          <p className="text-[10px] text-slate-500 font-semibold mb-1">Expected CSV columns:</p>
          <p className="text-[10px] text-slate-600 font-mono leading-relaxed">
            ticketNumber, title, type, site, location, plannedStart, plannedEnd, status, priority, riskLevel, category, assignee, approver, cabComment
          </p>
        </div>
      </div>

      {/* Modal */}
      {activeOp && (
        <FileOperationModal
          operation={activeOp.operation}
          mode={activeOp.mode}
          fileType={activeOp.fileType}
          message={activeOp.message}
          details={activeOp.details}
          onClose={() => setActiveOp(null)}
        />
      )}
    </>
  );
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
const datestamp = () => new Date().toISOString().slice(0, 10);
