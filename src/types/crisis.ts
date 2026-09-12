export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type IncidentStatus = 
  | 'AI Analysis'
  | 'Awaiting Approval'
  | 'Resources Assigned'
  | 'Monitoring'
  | 'Resolved';

export interface Incident {
  id: string;
  title: string;
  type: 'Flood' | 'Road Accident' | 'Fire' | 'Earthquake' | 'Landslide';
  location: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  reportedTime: string;
  timeAgo: string;
  affectedPeople: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  infrastructureImpact: 'High' | 'Medium' | 'Low';
  weatherCondition: string;
  evidenceSummary: string;
  coordinates: { x: number; y: number }; // SVG grid coordinates 0-1000, 0-600
  isDemoPrimary?: boolean;
}

export interface AgentStep {
  id: string;
  name: string;
  shortRole: string;
  status: 'idle' | 'running' | 'completed' | 'verified' | 'critical' | 'ready';
  badgeText: string;
  summary: string;
  technicalDetails: string[];
  confidence: number;
  runDurationMs: number;
}

export interface ResourceItem {
  id: string;
  callsign: string;
  name: string;
  type: 'Rescue Team' | 'Ambulance' | 'Emergency Vehicle' | 'Personnel Squad';
  distanceKm: number;
  etaMinutes: number;
  status: 'Available' | 'Assigned' | 'En Route' | 'Backup';
  recommendation: 'ASSIGN' | 'BACKUP' | 'STANDBY';
  assignedToIncidentId?: string;
  assignedIncidentName?: string;
  personnelCount: number;
  specialization: string;
}

export interface RouteOption {
  id: string;
  name: string;
  code: string;
  type: 'recommended' | 'alternative';
  distanceKm: number;
  etaMinutes: number;
  roadCondition: string;
  status: string;
  hazardNote: string;
  pathD: string; // SVG path data
  isRecommended: boolean;
  clearanceLevel: string;
}

export interface HospitalItem {
  id: string;
  name: string;
  emergency: 'Available' | 'Limited' | 'Full';
  icu: 'Available' | 'Limited' | 'Full';
  capacityPercent: number;
  distanceKm: number;
  travelMinutes: number;
  recommendation: 'BEST MATCH' | 'ALTERNATIVE';
  traumaLevel: string;
  availableBeds: number;
  totalBeds: number;
  contact: string;
  locationArea: string;
}

export interface ResponsePlan {
  id: string;
  incidentId: string;
  incidentTitle: string;
  incidentLocation: string;
  priority: SeverityLevel;
  generatedAt: string;
  actions: string[];
  justifications: {
    factor: string;
    agent: string;
    assessment: string;
    confidence: string;
  }[];
  approvalStatus: 'PENDING_APPROVAL' | 'APPROVED' | 'MODIFIED' | 'REJECTED';
  approvalTimestamp?: string;
  approverName?: string;
  modifiedNotes?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  timeAgo: string;
  incidentId?: string;
  category: 'AI_AGENT' | 'SYSTEM' | 'HUMAN_APPROVAL' | 'CRISIS_ALERT';
  agentName?: string;
  title: string;
  description: string;
  severity?: SeverityLevel | 'INFO';
}

export type NavigationTab = 
  | 'dashboard'
  | 'incidents'
  | 'ai-analysis'
  | 'resources'
  | 'routes'
  | 'hospitals'
  | 'response-plans'
  | 'activity-log';
