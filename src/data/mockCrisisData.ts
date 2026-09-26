import type { 
  Incident, 
  AgentStep, 
  ResourceItem, 
  RouteOption, 
  HospitalItem, 
  ResponsePlan, 
  ActivityLogItem,
  CrisisDataset 
} from '../types/crisis';
import rawCrisesJson from './crisesData.json';

// Type assertion for imported JSON
export const ALL_CRISES_DATA: Record<string, CrisisDataset> = rawCrisesJson.crises as Record<string, CrisisDataset>;

// Extract initial incidents list from the JSON data (all 4 static crises)
export const INITIAL_INCIDENTS: Incident[] = [
  ALL_CRISES_DATA['INC-1024'].incident,
  ALL_CRISES_DATA['INC-1023'].incident,
  ALL_CRISES_DATA['INC-1022'].incident,
  ALL_CRISES_DATA['INC-1021'].incident,
];

// Helper to retrieve all data for any crisis by its ID from the single JSON file
export const getCrisisDataById = (incidentId: string): CrisisDataset => {
  const data = ALL_CRISES_DATA[incidentId];
  if (data) {
    return data;
  }
  // Fallback to INC-1024 if id not found
  return ALL_CRISES_DATA['INC-1024'];
};

// Default initial datasets (INC-1024)
export const INITIAL_AGENTS: AgentStep[] = ALL_CRISES_DATA['INC-1024'].agents;
export const INITIAL_RESOURCES: ResourceItem[] = ALL_CRISES_DATA['INC-1024'].resources;
export const INITIAL_ROUTES: RouteOption[] = ALL_CRISES_DATA['INC-1024'].routes;
export const INITIAL_HOSPITALS: HospitalItem[] = ALL_CRISES_DATA['INC-1024'].hospitals;
export const INITIAL_RESPONSE_PLAN: ResponsePlan = ALL_CRISES_DATA['INC-1024'].responsePlan;
export const INITIAL_ACTIVITY_LOG: ActivityLogItem[] = ALL_CRISES_DATA['INC-1024'].activityLogs;
