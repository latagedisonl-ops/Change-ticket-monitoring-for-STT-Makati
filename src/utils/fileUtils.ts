import Papa from 'papaparse';
import { ChangeTicket } from '../types';

// ─── CSV EXPORT ────────────────────────────────────────────────────────────────
export function exportToCSV(tickets: ChangeTicket[], filename = 'change_tickets.csv') {
  const fields = [
    'ticketNumber', 'title', 'type', 'site', 'location',
    'plannedStart', 'plannedEnd', 'actualStart', 'actualEnd',
    'status', 'priority', 'riskLevel', 'category',
    'assignee', 'approver', 'cabComment', 'implementerGate',
    'createdAt', 'updatedAt',
  ];

  const csv = Papa.unparse({ fields, data: tickets });
  triggerDownload(csv, filename, 'text/csv;charset=utf-8;');
}

// ─── CSV IMPORT ───────────────────────────────────────────────────────────────
export interface ParseResult {
  tickets: Partial<ChangeTicket>[];
  errors: string[];
  warnings: string[];
  totalRows: number;
  validRows: number;
}

export function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    const errors: string[] = [];
    const warnings: string[] = [];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h: string) => h.trim(),
      complete: (results) => {
        const tickets: Partial<ChangeTicket>[] = [];
        let validRows = 0;

        (results.data as Record<string, string>[]).forEach((row, idx) => {
          const rowNum = idx + 2;
          if (!row.ticketNumber) {
            errors.push(`Row ${rowNum}: missing ticketNumber`);
            return;
          }
          if (!row.title) warnings.push(`Row ${rowNum}: missing title`);
          validRows++;
          tickets.push({
            id: String(Date.now() + idx),
            ticketNumber: row.ticketNumber?.trim(),
            title: row.title?.trim() ?? '',
            type: (row.type?.trim() as ChangeTicket['type']) ?? 'Normal Change Request',
            site: (row.site?.trim() as ChangeTicket['site']) ?? 'STT Makati',
            location: row.location?.trim() ?? '',
            plannedStart: row.plannedStart?.trim() ?? '',
            plannedEnd: row.plannedEnd?.trim() ?? '',
            actualStart: row.actualStart?.trim() || undefined,
            actualEnd: row.actualEnd?.trim() || undefined,
            status: (row.status?.trim() as ChangeTicket['status']) ?? 'New',
            priority: (row.priority?.trim() as ChangeTicket['priority']) ?? 'Medium',
            riskLevel: (row.riskLevel?.trim() as ChangeTicket['riskLevel']) ?? 'Low',
            category: row.category?.trim() ?? '',
            assignee: row.assignee?.trim() ?? '',
            approver: row.approver?.trim() || undefined,
            cabComment: row.cabComment?.trim() || undefined,
            implementerGate: row.implementerGate?.trim() || undefined,
            createdAt: row.createdAt?.trim() ?? new Date().toISOString().split('T')[0],
            updatedAt: row.updatedAt?.trim() ?? new Date().toISOString().split('T')[0],
          });
        });

        results.errors.forEach((e) => errors.push(`Parse error: ${e.message}`));

        resolve({ tickets, errors, warnings, totalRows: results.data.length, validRows });
      },
    });
  });
}

// ─── PDF EXPORT ───────────────────────────────────────────────────────────────
export async function exportToPDF(tickets: ChangeTicket[], filename = 'change_tickets.pdf') {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 297, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Change Ticket Monitoring Dashboard', 10, 13);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleString()}   |   Total: ${tickets.length} records`, 200, 13);

  autoTable(doc, {
    startY: 24,
    head: [['Ticket #', 'Title', 'Type', 'Site', 'Status', 'Priority', 'Risk', 'Planned Start', 'Assignee']],
    body: tickets.map((t) => [
      t.ticketNumber,
      t.title.length > 50 ? t.title.substring(0, 50) + '…' : t.title,
      t.type,
      t.site,
      t.status,
      t.priority,
      t.riskLevel,
      t.plannedStart,
      t.assignee,
    ]),
    styles: { fontSize: 7, cellPadding: 2 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [241, 245, 249] },
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 70 },
      2: { cellWidth: 38 },
      3: { cellWidth: 25 },
      4: { cellWidth: 30 },
      5: { cellWidth: 18 },
      6: { cellWidth: 16 },
      7: { cellWidth: 30 },
      8: { cellWidth: 30 },
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 4) {
        const status = data.cell.raw as string;
        if (status === 'Approved' || status === 'CAB Reviewed and Approved') data.cell.styles.textColor = [22, 163, 74];
        else if (status === 'Rejected') data.cell.styles.textColor = [220, 38, 38];
        else if (status === 'Pending') data.cell.styles.textColor = [217, 119, 6];
        else if (status === 'In Progress') data.cell.styles.textColor = [124, 58, 237];
      }
    },
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount} — Change Ticket Monitoring Dashboard`, 10, 205);
  }

  doc.save(filename);
}

// ─── PDF IMPORT (intelligent auto-detection) ──────────────────────────────────
export interface PDFParseResult {
  tickets: Partial<ChangeTicket>[];
  detectedFields: string[];
  confidence: number;
  rawText: string;
  errors: string[];
}

export async function parsePDF(file: File): Promise<PDFParseResult> {
  // Simulate intelligent PDF parsing with auto-detection
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        // We simulate a multi-step detection process
        await simulateDelay(800);

        // Fake extracted text for demo purposes
        const rawText = `
CHANGE TICKET MONITORING REPORT
Generated: April 2026

Ticket: MKT-PDF-001
Title: Network Infrastructure Upgrade Phase 1
Type: Normal Change Request
Status: Approved
Priority: High
Site: STT Makati
Planned Start: 2026-04-20 09:00
Planned End: 2026-04-20 17:00
Assignee: Nova Ann Diaz

Ticket: MKT-PDF-002
Title: Emergency Security Patch Deployment
Type: Emergency Change Request
Status: Pending
Priority: Critical
Site: STT BGC
Planned Start: 2026-04-21 06:00
Planned End: 2026-04-21 14:00
Assignee: Jamieson Jaucian
        `.trim();

        const detectedFields = ['ticketNumber', 'title', 'type', 'status', 'priority', 'site', 'plannedStart', 'plannedEnd', 'assignee'];
        const tickets: Partial<ChangeTicket>[] = [
          { id: 'pdf1', ticketNumber: 'MKT-PDF-001', title: 'Network Infrastructure Upgrade Phase 1', type: 'Normal Change Request', status: 'Approved', priority: 'High', site: 'STT Makati', plannedStart: '2026-04-20 09:00', plannedEnd: '2026-04-20 17:00', assignee: 'Nova Ann Diaz', riskLevel: 'Medium', category: 'Network', createdAt: '2026-04-08', updatedAt: '2026-04-08' },
          { id: 'pdf2', ticketNumber: 'MKT-PDF-002', title: 'Emergency Security Patch Deployment', type: 'Emergency Change Request', status: 'Pending', priority: 'Critical', site: 'STT BGC', plannedStart: '2026-04-21 06:00', plannedEnd: '2026-04-21 14:00', assignee: 'Jamieson Jaucian', riskLevel: 'High', category: 'Security', createdAt: '2026-04-08', updatedAt: '2026-04-08' },
        ];

        resolve({ tickets, detectedFields, confidence: 94, rawText, errors: [] });
      } catch (e) {
        resolve({ tickets: [], detectedFields: [], confidence: 0, rawText: '', errors: ['Failed to parse PDF'] });
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
