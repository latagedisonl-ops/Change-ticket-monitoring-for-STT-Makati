export type ChangeType =
  | 'Normal Change Request'
  | 'Emergency Change Request'
  | 'Routine Change Request'
  | 'Standard Change Request';

export type Status =
  | 'Approved'
  | 'Pending'
  | 'Rejected'
  | 'In Progress'
  | 'Validated'
  | 'New'
  | 'CAB Reviewed and Approved'
  | 'Closed';

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export type Site = 'STT Makati' | 'STT Taguig' | 'STT BGC' | 'STT Ortigas';

export interface ChangeTicket {
  id: string;
  ticketNumber: string;
  title: string;
  type: ChangeType;
  site: Site;
  location: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart?: string;
  actualEnd?: string;
  status: Status;
  priority: Priority;
  assignee: string;
  approver?: string;
  cabComment?: string;
  implementerGate?: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  message: string;
  ticketId?: string;
  timestamp: string;
  read: boolean;
}

export interface DashboardStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  inProgress: number;
  emergency: number;
  overdue: number;
  validated: number;
}

export interface ImportResult {
  success: boolean;
  records: number;
  errors: string[];
  warnings: string[];
}

export type FileOperation = 'idle' | 'loading' | 'success' | 'error';
