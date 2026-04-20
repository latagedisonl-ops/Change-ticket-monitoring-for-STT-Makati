import { ChangeTicket, Alert } from '../types';

export const MOCK_TICKETS: ChangeTicket[] = [
  {
    id: '1', ticketNumber: 'MKT-001', title: 'MKD-RI4-Net: IT Systems & Network Connectivity Internet Connection Cable MAIN Circuit Migration', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-RI4', plannedStart: '2026-04-08 10:00', plannedEnd: '2026-04-08 18:00', status: 'Approved', priority: 'High', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Medium', category: 'Network', createdAt: '2026-04-01', updatedAt: '2026-04-07', implementerGate: 'Approved'
  },
  {
    id: '2', ticketNumber: 'MKT-002', title: 'MKD-RI4-Net: IT Systems & Network Connectivity Internet Connection Cable DR1 Circuit Migration', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-RI4', plannedStart: '2026-04-08 10:00', plannedEnd: '2026-04-08 18:00', status: 'Approved', priority: 'High', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Medium', category: 'Network', createdAt: '2026-04-01', updatedAt: '2026-04-07', implementerGate: 'Approved'
  },
  {
    id: '3', ticketNumber: 'MKT-003', title: 'MKD-BI-sn: Building & Network Connectivity Windows Patch Management', type: 'Emergency Change Request', site: 'STT Makati', location: 'MKD-BI', plannedStart: '2026-04-09 08:00', plannedEnd: '2026-04-09 12:00', status: 'Pending', priority: 'Critical', assignee: 'Jamieson Jaucian', riskLevel: 'High', category: 'Security', createdAt: '2026-04-02', updatedAt: '2026-04-08', implementerGate: 'Pending'
  },
  {
    id: '4', ticketNumber: 'MKT-004', title: 'MKD-AI-hac: UPS Portal (D3R) Database replace upgrade', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-AI', plannedStart: '2026-04-10 09:00', plannedEnd: '2026-04-10 17:00', status: 'Validated', priority: 'Medium', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Low', category: 'Infrastructure', createdAt: '2026-04-03', updatedAt: '2026-04-09', implementerGate: 'Approved'
  },
  {
    id: '5', ticketNumber: 'MKT-005', title: 'MKD-PM-Quality: o Air/Flo: Airdryer System Preventive Maintenance of Piping Management System', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-11 07:00', plannedEnd: '2026-04-11 16:00', status: 'Approved', priority: 'Low', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Maintenance', createdAt: '2026-04-04', updatedAt: '2026-04-10', implementerGate: 'Approved'
  },
  {
    id: '6', ticketNumber: 'MKT-006', title: 'MKD-PM-Quality: o CCHP Abnormal Duct Preventive Maintenance of All Duct Fans and Blowers', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-12 08:00', plannedEnd: '2026-04-12 17:00', status: 'Pending', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Maintenance', createdAt: '2026-04-04', updatedAt: '2026-04-10', implementerGate: 'New'
  },
  {
    id: '7', ticketNumber: 'MKT-007', title: 'MKD-PM-Quality: o CCHP Preventive Maintenance of PAC-1C, EC series Data Hall C', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-13 08:00', plannedEnd: '2026-04-13 17:00', status: 'Approved', priority: 'Low', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Maintenance', createdAt: '2026-04-04', updatedAt: '2026-04-10', implementerGate: 'Approved'
  },
  {
    id: '8', ticketNumber: 'MKT-008', title: 'MKD-PM-Quality: o CCHP Preventive Maintenance of PAC-1D, PAU series Data Hall D', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-14 08:00', plannedEnd: '2026-04-14 17:00', status: 'Validated', priority: 'Low', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Maintenance', createdAt: '2026-04-05', updatedAt: '2026-04-11', implementerGate: 'Approved'
  },
  {
    id: '9', ticketNumber: 'MKT-009', title: 'MKD-PM-Quality: o UPC Preventive Maintenance on UPS Battery System FA', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-15 08:00', plannedEnd: '2026-04-15 17:00', status: 'Approved', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Medium', category: 'Power', createdAt: '2026-04-05', updatedAt: '2026-04-11', implementerGate: 'Approved'
  },
  {
    id: '10', ticketNumber: 'MKT-010', title: 'MKD-AI-sec: Building Management System Infrastructure Upgrade of FARC Components running IBM C1 BMS', type: 'Emergency Change Request', site: 'STT Makati', location: 'MKD-AI', plannedStart: '2026-04-16 06:00', plannedEnd: '2026-04-16 20:00', status: 'Rejected', priority: 'Critical', assignee: 'Jamieson Jaucian', riskLevel: 'High', category: 'Security', createdAt: '2026-04-06', updatedAt: '2026-04-12', implementerGate: 'Rejected'
  },
  {
    id: '11', ticketNumber: 'MKT-011', title: 'MKD-CO-AI hac: Crane Control Services Internal Cords cabling on a Floating Crane On-reel cabling', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-CO', plannedStart: '2026-04-17 09:00', plannedEnd: '2026-04-17 17:00', status: 'Approved', priority: 'Medium', assignee: 'STT Makati', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Low', category: 'Infrastructure', createdAt: '2026-04-06', updatedAt: '2026-04-13', implementerGate: 'Approved'
  },
  {
    id: '12', ticketNumber: 'MKT-012', title: 'MKD-AI-hac: ADNOC-CAC Replacement of GCTUPi to DRS2 for Cage DR-RI and B', type: 'Emergency Change Request', site: 'STT Makati', location: 'MKD-AI', plannedStart: '2026-04-18 08:00', plannedEnd: '2026-04-18 18:00', status: 'Pending', priority: 'Critical', assignee: 'Jamieson Jaucian', riskLevel: 'High', category: 'Network', createdAt: '2026-04-07', updatedAt: '2026-04-14', implementerGate: 'Pending'
  },
  {
    id: '13', ticketNumber: 'MKT-013', title: 'MKD-AI-Net: Monitoring BMS (Building Management System) to POD Close Out Activities', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-AI', plannedStart: '2026-04-08 09:00', plannedEnd: '2026-04-08 17:00', actualStart: '2026-04-08 09:15', actualEnd: '2026-04-08 17:30', status: 'CAB Reviewed and Approved', priority: 'High', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Medium', category: 'Infrastructure', createdAt: '2026-04-01', updatedAt: '2026-04-08', implementerGate: 'Approved'
  },
  {
    id: '14', ticketNumber: 'MKT-014', title: 'MKD-AI-Net: Full Fiber Pump Facility Preventive Maintenance of Diesel Fuel Pumps', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-AI', plannedStart: '2026-04-19 08:00', plannedEnd: '2026-04-19 17:00', status: 'New', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Maintenance', createdAt: '2026-04-08', updatedAt: '2026-04-14', implementerGate: 'New'
  },
  {
    id: '15', ticketNumber: 'MKT-015', title: 'MKD-PM-Quality: o Network Prevention Services Power On Backup Packs battery replacement on Cage RI-Room 2', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-20 09:00', plannedEnd: '2026-04-20 17:00', status: 'Approved', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Medium', category: 'Power', createdAt: '2026-04-08', updatedAt: '2026-04-15', implementerGate: 'Approved'
  },
  {
    id: '16', ticketNumber: 'MKT-016', title: 'MKD-PM-Quality: o ContinuumWare Prevention Service Inspect of LSCS A Facility-Data Data Cls Preventive Rate Gate', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-21 08:00', plannedEnd: '2026-04-21 17:00', status: 'Validated', priority: 'Low', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Maintenance', createdAt: '2026-04-09', updatedAt: '2026-04-15', implementerGate: 'Approved'
  },
  {
    id: '17', ticketNumber: 'MKT-017', title: 'MKD-PM-Quality: o Generator - 1 hr Load Testing', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-22 08:00', plannedEnd: '2026-04-22 10:00', status: 'Approved', priority: 'High', assignee: 'Nova Ann Diaz', riskLevel: 'High', category: 'Power', createdAt: '2026-04-09', updatedAt: '2026-04-16', implementerGate: 'Approved'
  },
  {
    id: '18', ticketNumber: 'MKT-018', title: 'MKD-PM-Quality: Electrical Generator-5 - 1 hr Load Testing', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-22 10:00', plannedEnd: '2026-04-22 12:00', status: 'Approved', priority: 'High', assignee: 'Nova Ann Diaz', riskLevel: 'High', category: 'Power', createdAt: '2026-04-09', updatedAt: '2026-04-16', implementerGate: 'Approved'
  },
  {
    id: '19', ticketNumber: 'MKT-019', title: 'MKD-PM-Quality: Electrical Generator-6 - 1 hr Load Testing', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-22 12:00', plannedEnd: '2026-04-22 14:00', status: 'Pending', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Medium', category: 'Power', createdAt: '2026-04-09', updatedAt: '2026-04-16', implementerGate: 'New'
  },
  {
    id: '20', ticketNumber: 'MKT-020', title: 'MKD-PM-Quality: Electrical Generator-7 - 1 hr Load Testing', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-22 14:00', plannedEnd: '2026-04-22 16:00', status: 'Approved', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Medium', category: 'Power', createdAt: '2026-04-09', updatedAt: '2026-04-16', implementerGate: 'Approved'
  },
  {
    id: '21', ticketNumber: 'MKT-021', title: 'MKD-PM-Quality: Checklists Generator-8 - 1 hr Load Testing', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-23 08:00', plannedEnd: '2026-04-23 10:00', status: 'Validated', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Power', createdAt: '2026-04-10', updatedAt: '2026-04-17', implementerGate: 'Approved'
  },
  {
    id: '22', ticketNumber: 'MKT-022', title: 'MKD-PM-Quality: Checklists Generator-A - 1 hr Management Division, 8 systems Maintenance of BMS', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-PM', plannedStart: '2026-04-23 10:00', plannedEnd: '2026-04-23 13:00', status: 'Approved', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Medium', category: 'Infrastructure', createdAt: '2026-04-10', updatedAt: '2026-04-17', implementerGate: 'Approved'
  },
  {
    id: '23', ticketNumber: 'MKT-023', title: 'MKD-Mainly: Electrical D8 - Distribution Board Power Colour-class Testing', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-Main', plannedStart: '2026-04-24 09:00', plannedEnd: '2026-04-24 17:00', status: 'Approved', priority: 'High', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Medium', category: 'Power', createdAt: '2026-04-10', updatedAt: '2026-04-18', implementerGate: 'Approved'
  },
  {
    id: '24', ticketNumber: 'MKT-024', title: 'MKD-CO-Al hac: Crane Control Services Internal Cords cabling on a Floating Crane On-reel cabling', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-CO', plannedStart: '2026-04-25 09:00', plannedEnd: '2026-04-25 17:00', status: 'Rejected', priority: 'Low', assignee: 'STT Makati', riskLevel: 'Low', category: 'Infrastructure', createdAt: '2026-04-11', updatedAt: '2026-04-19', implementerGate: 'Rejected'
  },
  {
    id: '25', ticketNumber: 'MKT-025', title: 'MKD-Virtually Building Entrance Point Codes Elevated Pest Control', type: 'Routine Change Request', site: 'STT Makati', location: 'MKD-Virtual', plannedStart: '2026-04-26 08:00', plannedEnd: '2026-04-26 12:00', status: 'Approved', priority: 'Low', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Facility', createdAt: '2026-04-11', updatedAt: '2026-04-19', implementerGate: 'Approved'
  },
  {
    id: '26', ticketNumber: 'MKT-026', title: 'MKD-AI-hac: ADNOC-ORACLE PAST - DUCT ADJUSTMENTS-ROOF STACKING AND REPATH-INFO OF MKD', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-AI', plannedStart: '2026-04-27 07:00', plannedEnd: '2026-04-27 19:00', status: 'In Progress', priority: 'High', assignee: 'Nova Ann Diaz', riskLevel: 'High', category: 'Infrastructure', createdAt: '2026-04-12', updatedAt: '2026-04-20', implementerGate: 'Approved'
  },
  {
    id: '27', ticketNumber: 'MKT-027', title: 'MKD-Mainly: Electrical D8 - Distribution Board Power Colour Loss Testing', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-Main', plannedStart: '2026-04-28 09:00', plannedEnd: '2026-04-28 17:00', status: 'Approved', priority: 'High', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Medium', category: 'Power', createdAt: '2026-04-12', updatedAt: '2026-04-21', implementerGate: 'Approved'
  },
  {
    id: '28', ticketNumber: 'MKT-028', title: 'MKD-Quality: in GCHP-Security CCTV/PABX Defects #Sorted Railing Effect', type: 'Emergency Change Request', site: 'STT Makati', location: 'MKD-Q', plannedStart: '2026-04-09 08:00', plannedEnd: '2026-04-09 16:00', status: 'Pending', priority: 'Critical', assignee: 'Jamieson Jaucian', riskLevel: 'High', category: 'Security', createdAt: '2026-04-13', updatedAt: '2026-04-22', implementerGate: 'Pending'
  },
  {
    id: '29', ticketNumber: 'MKT-029', title: 'MKD-CO-Al hac: Crane Control Services Internal Cords cabling on a Floating Crane On-reel cabling - Phase 2', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-CO', plannedStart: '2026-04-29 09:00', plannedEnd: '2026-04-29 17:00', status: 'New', priority: 'Medium', assignee: 'STT Makati', riskLevel: 'Low', category: 'Infrastructure', createdAt: '2026-04-13', updatedAt: '2026-04-22', implementerGate: 'New'
  },
  {
    id: '30', ticketNumber: 'MKT-030', title: 'MKD-AI-hac: Telecomm Services Hand-point PIN Notification verification', type: 'Normal Change Request', site: 'STT Makati', location: 'MKD-AI', plannedStart: '2026-04-30 09:00', plannedEnd: '2026-04-30 17:00', status: 'Approved', priority: 'Medium', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Low', category: 'Network', createdAt: '2026-04-14', updatedAt: '2026-04-23', implementerGate: 'Approved'
  },
  {
    id: '31', ticketNumber: 'MKT-031', title: 'MKD-AI-hac: Non-Colo Services En-nota Facilities Related Installation of Temporary Works on AP Gallery', type: 'Normal Change Request', site: 'STT Taguig', location: 'TGG-AI', plannedStart: '2026-04-15 08:00', plannedEnd: '2026-04-15 17:00', status: 'Approved', priority: 'Low', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'CAB Reviewed and Approved', riskLevel: 'Low', category: 'Facility', createdAt: '2026-04-14', updatedAt: '2026-04-23', implementerGate: 'Approved'
  },
  {
    id: '32', ticketNumber: 'MKT-032', title: 'MKD-AI-hac: Non-Colo Services En-nota Facilities Related Installation of Safety Banners On Building', type: 'Normal Change Request', site: 'STT Taguig', location: 'TGG-AI', plannedStart: '2026-04-16 08:00', plannedEnd: '2026-04-16 17:00', status: 'In Progress', priority: 'Medium', assignee: 'Nova Ann Diaz', riskLevel: 'Low', category: 'Facility', createdAt: '2026-04-14', updatedAt: '2026-04-23', implementerGate: 'Approved'
  },
  {
    id: '33', ticketNumber: 'MKT-033', title: 'Emergency Change: AI-hac: Non-AI-hac: Building-Isolation Smoke Closing of Dome Tank', type: 'Emergency Change Request', site: 'STT BGC', location: 'BGC-AI', plannedStart: '2026-04-17 09:00', plannedEnd: '2026-04-17 21:00', status: 'Rejected', priority: 'Critical', assignee: 'Jamieson Jaucian', riskLevel: 'High', category: 'Safety', createdAt: '2026-04-15', updatedAt: '2026-04-24', implementerGate: 'Rejected'
  },
  {
    id: '34', ticketNumber: 'MKT-034', title: 'MKD-AI-hac: Non-Colo Services En-nota Facilities Related Installation of Geo-Connection Safety Monitor Frame and Ramps', type: 'Normal Change Request', site: 'STT Ortigas', location: 'ORT-AI', plannedStart: '2026-04-18 08:00', plannedEnd: '2026-04-18 17:00', status: 'Approved', priority: 'Medium', assignee: 'Nova Ann Diaz', approver: 'CAB', cabComment: 'STT-MC CAB Reviewed and Successfully Implemented', riskLevel: 'Medium', category: 'Facility', createdAt: '2026-04-15', updatedAt: '2026-04-24', implementerGate: 'Approved'
  },
  {
    id: '35', ticketNumber: 'MKT-035', title: 'Emergency Change Request: AI hac STT-AIR building: Inspection for ADNOC-CAC Replacement of GTS to load test at Data Hall', type: 'Emergency Change Request', site: 'STT Makati', location: 'MKD-AI', plannedStart: '2026-04-19 07:00', plannedEnd: '2026-04-19 19:00', status: 'Approved', priority: 'Critical', assignee: 'Jamieson Jaucian', approver: 'CAB', cabComment: 'DCAS Reviewed and Approved', riskLevel: 'High', category: 'Infrastructure', createdAt: '2026-04-16', updatedAt: '2026-04-25', implementerGate: 'Approved'
  },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'a1', type: 'critical', message: 'Emergency change MKT-003 requires immediate CAB approval', ticketId: 'MKT-003', timestamp: '2026-04-08 08:45', read: false },
  { id: 'a2', type: 'warning', message: 'MKT-012 planned window starts in 2 hours — no approver assigned', ticketId: 'MKT-012', timestamp: '2026-04-08 09:10', read: false },
  { id: 'a3', type: 'critical', message: 'MKT-010 was REJECTED by CAB — escalation required', ticketId: 'MKT-010', timestamp: '2026-04-08 09:30', read: false },
  { id: 'a4', type: 'warning', message: 'MKT-019 is overdue: planned end time has passed', ticketId: 'MKT-019', timestamp: '2026-04-08 10:00', read: false },
  { id: 'a5', type: 'info', message: 'MKT-013 successfully closed — post-implementation review pending', ticketId: 'MKT-013', timestamp: '2026-04-08 10:15', read: true },
  { id: 'a6', type: 'success', message: 'MKT-035 implemented and approved by DCAS without issue', ticketId: 'MKT-035', timestamp: '2026-04-08 10:30', read: true },
  { id: 'a7', type: 'warning', message: '5 Routine change tickets scheduled for April 22 — resource conflict possible', timestamp: '2026-04-08 11:00', read: false },
  { id: 'a8', type: 'critical', message: 'MKT-028 emergency change window opened — CCTV/PABX systems at risk', ticketId: 'MKT-028', timestamp: '2026-04-08 11:20', read: false },
  { id: 'a9', type: 'info', message: 'CSV export of April batch completed — 35 records exported', timestamp: '2026-04-08 11:45', read: true },
  { id: 'a10', type: 'success', message: 'MKT-034 successfully implemented at STT Ortigas', ticketId: 'MKT-034', timestamp: '2026-04-08 12:00', read: true },
];

export const MONTHLY_TREND = [
  { month: 'Jan', normal: 22, emergency: 3, routine: 18, standard: 8 },
  { month: 'Feb', normal: 25, emergency: 5, routine: 20, standard: 10 },
  { month: 'Mar', normal: 30, emergency: 4, routine: 22, standard: 9 },
  { month: 'Apr', normal: 35, emergency: 6, routine: 24, standard: 11 },
  { month: 'May', normal: 28, emergency: 2, routine: 19, standard: 7 },
  { month: 'Jun', normal: 32, emergency: 7, routine: 25, standard: 12 },
];

export const STATUS_DISTRIBUTION = [
  { name: 'Approved', value: 18, color: '#22c55e' },
  { name: 'Pending', value: 6, color: '#f59e0b' },
  { name: 'Validated', value: 4, color: '#3b82f6' },
  { name: 'In Progress', value: 2, color: '#8b5cf6' },
  { name: 'Rejected', value: 3, color: '#ef4444' },
  { name: 'New', value: 2, color: '#6b7280' },
];

export const RISK_DATA = [
  { name: 'Low', value: 15, color: '#22c55e' },
  { name: 'Medium', value: 12, color: '#f59e0b' },
  { name: 'High', value: 8, color: '#ef4444' },
];

export const CATEGORY_DATA = [
  { category: 'Maintenance', count: 12 },
  { category: 'Power', count: 8 },
  { category: 'Network', count: 6 },
  { category: 'Security', count: 4 },
  { category: 'Infrastructure', count: 5 },
  { category: 'Facility', count: 3 },
  { category: 'Safety', count: 2 },
];
