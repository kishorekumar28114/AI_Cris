import React, { createContext, useContext, useState, useCallback } from 'react';
import type {
  Incident,
  AgentStep,
  ResourceItem,
  RouteOption,
  HospitalItem,
  ResponsePlan,
  ActivityLogItem,
  NavigationTab
} from '../types/crisis';
import {
  INITIAL_INCIDENTS,
  INITIAL_AGENTS,
  INITIAL_RESOURCES,
  INITIAL_ROUTES,
  INITIAL_HOSPITALS,
  INITIAL_RESPONSE_PLAN,
  INITIAL_ACTIVITY_LOG,
  getCrisisDataById
} from '../data/mockCrisisData';

interface CrisisContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  incidents: Incident[];
  selectedIncident: Incident;
  selectIncident: (id: string, targetTab?: NavigationTab) => void;
  incidentsSubView: 'details' | 'list';
  setIncidentsSubView: (view: 'details' | 'list') => void;
  agents: AgentStep[];
  isAnalyzing: boolean;
  currentSimulatingIndex: number;
  analysisCompleted: boolean;
  runAiAnalysis: () => void;
  resources: ResourceItem[];
  assignResource: (id: string) => void;
  routes: RouteOption[];
  hospitals: HospitalItem[];
  responsePlan: ResponsePlan;
  approvePlan: () => void;
  modifyPlan: (notes: string) => void;
  rejectPlan: (reason: string) => void;
  activityLogs: ActivityLogItem[];
  isCrisisUpdateSimulated: boolean;
  simulateCrisisUpdate: () => void;
  resetSimulation: () => void;
  loadDemoIncident: () => void;
  isArchitectureModalOpen: boolean;
  setIsArchitectureModalOpen: (open: boolean) => void;
  crisisNotification: {
    visible: boolean;
    title: string;
    message: string;
    type: 'critical' | 'info' | 'success';
  } | null;
  dismissCrisisNotification: () => void;
}

const CrisisContext = createContext<CrisisContextType | undefined>(undefined);

export const CrisisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [incidentsSubView, setIncidentsSubView] = useState<'details' | 'list'>('details');
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('INC-1024');
  const [agents, setAgents] = useState<AgentStep[]>(INITIAL_AGENTS);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentSimulatingIndex, setCurrentSimulatingIndex] = useState<number>(-1);
  const [analysisCompleted, setAnalysisCompleted] = useState<boolean>(true);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [routes, setRoutes] = useState<RouteOption[]>(INITIAL_ROUTES);
  const [hospitals, setHospitals] = useState<HospitalItem[]>(INITIAL_HOSPITALS);
  const [responsePlan, setResponsePlan] = useState<ResponsePlan>(INITIAL_RESPONSE_PLAN);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOG);
  const [isCrisisUpdateSimulated, setIsCrisisUpdateSimulated] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [crisisNotification, setCrisisNotification] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'critical' | 'info' | 'success';
  } | null>(null);

  const selectedIncident = incidents.find(inc => inc.id === selectedIncidentId) || incidents[0];

  // Retrieve needed data for the selected crisis from the single JSON file
  const selectIncident = useCallback((id: string, targetTab?: NavigationTab) => {
    setSelectedIncidentId(id);
    const dataset = getCrisisDataById(id);

    setAgents(dataset.agents);
    setResponsePlan(dataset.responsePlan);
    setResources(dataset.resources);
    setRoutes(dataset.routes);
    setHospitals(dataset.hospitals);
    
    // Merge logs to preserve any user actions while prioritizing the selected crisis telemetry
    setActivityLogs(prev => {
      const otherLogs = prev.filter(l => l.incidentId !== id);
      return [...dataset.activityLogs, ...otherLogs];
    });

    setIsAnalyzing(false);
    setCurrentSimulatingIndex(-1);
    setAnalysisCompleted(true);

    // Determine target navigation:
    // When clicking a crisis from Dashboard, navigate to 'incidents' details page!
    if (targetTab === 'incidents') {
      setIncidentsSubView('details');
      setActiveTab('incidents');
    } else if (targetTab) {
      setActiveTab(targetTab);
    } else {
      if (activeTab === 'dashboard') {
        setIncidentsSubView('details');
        setActiveTab('incidents');
      }
      // If already on another tab (e.g. ai-analysis, resources, hospitals), stay on that tab!
    }

    setCrisisNotification({
      visible: true,
      title: `Loaded Incident: ${dataset.incident.id}`,
      message: `Retrieved complete multi-agent pipeline and response data for ${dataset.incident.title} (${dataset.incident.location}) from Crisis JSON Registry.`,
      type: 'info',
    });
  }, [activeTab]);

  const dismissCrisisNotification = useCallback(() => {
    setCrisisNotification(null);
  }, []);

  // Sequential AI Multi-Agent execution simulation for the selected incident
  const runAiAnalysis = useCallback(() => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisCompleted(false);
    setCurrentSimulatingIndex(0);

    const targetDataset = getCrisisDataById(selectedIncidentId);
    const targetAgents = targetDataset.agents;

    // Reset agents to queued
    setAgents(targetAgents.map(a => ({
      ...a,
      status: 'idle',
      badgeText: 'Queued',
    })));

    let currentIndex = 0;
    const totalAgents = targetAgents.length;

    const interval = setInterval(() => {
      if (currentIndex < totalAgents) {
        setCurrentSimulatingIndex(currentIndex);

        // Mark current as running, previous as completed
        setAgents(prev => prev.map((agent, idx) => {
          if (idx === currentIndex) {
            return {
              ...agent,
              status: 'running',
              badgeText: 'Running...',
            };
          } else if (idx < currentIndex) {
            return {
              ...agent,
              status: targetAgents[idx].status,
              badgeText: targetAgents[idx].badgeText,
            };
          }
          return agent;
        }));

        currentIndex++;
      } else {
        clearInterval(interval);
        setCurrentSimulatingIndex(-1);
        setIsAnalyzing(false);
        setAnalysisCompleted(true);
        setAgents(targetAgents);

        // Add to activity log
        const newLog: ActivityLogItem = {
          id: `act-run-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          timeAgo: 'Just now',
          incidentId: selectedIncidentId,
          category: 'AI_AGENT',
          agentName: 'AI / API Orchestrator',
          title: `Multi-Agent Analysis Executed: ${selectedIncidentId}`,
          description: `All 7 specialized AI agents executed and validated for ${targetDataset.incident.title}. Actionable response recommendations compiled.`,
          severity: targetDataset.incident.severity,
        };
        setActivityLogs(prev => [newLog, ...prev]);

        setCrisisNotification({
          visible: true,
          title: `✓ AI Multi-Agent Analysis Complete (${selectedIncidentId})`,
          message: `All 7 specialized agents collaborated and compiled the recommended response plan for ${targetDataset.incident.title}.`,
          type: 'success',
        });
      }
    }, 700);
  }, [isAnalyzing, selectedIncidentId]);

  // Assign resource toggle
  const assignResource = useCallback((id: string) => {
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        const nextStatus = res.status === 'Assigned' ? 'Available' : 'Assigned';
        return {
          ...res,
          status: nextStatus,
        };
      }
      return res;
    }));

    const targetRes = resources.find(r => r.id === id);
    if (targetRes) {
      const isNowAssigned = targetRes.status !== 'Assigned';
      const newLog: ActivityLogItem = {
        id: `act-res-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        timeAgo: 'Just now',
        incidentId: selectedIncidentId,
        category: 'HUMAN_APPROVAL',
        agentName: 'Emergency Coordinator',
        title: `Resource ${targetRes.callsign} Status Updated`,
        description: `${targetRes.name} marked as ${isNowAssigned ? 'Assigned' : 'Available'} for field operations (${selectedIncident.id}).`,
        severity: 'INFO',
      };
      setActivityLogs(prev => [newLog, ...prev]);
    }
  }, [resources, selectedIncidentId, selectedIncident.id]);

  // Human-in-the-loop Approvals
  const approvePlan = useCallback(() => {
    setResponsePlan(prev => ({
      ...prev,
      approvalStatus: 'APPROVED',
      approvalTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      approverName: 'Emergency Operations Coordinator (ID: EOC-COORD-04)',
    }));

    setIncidents(prev => prev.map(inc => {
      if (inc.id === selectedIncidentId) {
        return { ...inc, status: 'Resources Assigned' };
      }
      return inc;
    }));

    const newLog: ActivityLogItem = {
      id: `act-app-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timeAgo: 'Just now',
      incidentId: selectedIncidentId,
      category: 'HUMAN_APPROVAL',
      agentName: 'Emergency Coordinator',
      title: `AI Response Plan Approved for ${selectedIncidentId}`,
      description: `Authorized dispatch and healthcare intake protocols for ${selectedIncident.title}.`,
      severity: selectedIncident.severity,
    };
    setActivityLogs(prev => [newLog, ...prev]);

    setCrisisNotification({
      visible: true,
      title: `✓ Plan Approved by Coordinator (${selectedIncidentId})`,
      message: `Status updated: APPROVED BY EMERGENCY COORDINATOR for ${selectedIncident.title}.`,
      type: 'success',
    });
  }, [selectedIncidentId, selectedIncident.title, selectedIncident.severity]);

  const modifyPlan = useCallback((notes: string) => {
    setResponsePlan(prev => ({
      ...prev,
      approvalStatus: 'MODIFIED',
      approvalTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      approverName: 'Emergency Operations Coordinator (ID: EOC-COORD-04)',
      modifiedNotes: notes,
    }));

    const newLog: ActivityLogItem = {
      id: `act-mod-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timeAgo: 'Just now',
      incidentId: selectedIncidentId,
      category: 'HUMAN_APPROVAL',
      agentName: 'Emergency Coordinator',
      title: `Response Plan Modified for ${selectedIncidentId}`,
      description: `Coordinator adjustments applied to ${selectedIncident.title}: "${notes}"`,
      severity: 'HIGH',
    };
    setActivityLogs(prev => [newLog, ...prev]);

    setCrisisNotification({
      visible: true,
      title: `✎ Plan Modified & Approved (${selectedIncidentId})`,
      message: `Human coordinator adjustments logged for ${selectedIncident.title}.`,
      type: 'info',
    });
  }, [selectedIncidentId, selectedIncident.title]);

  const rejectPlan = useCallback((reason: string) => {
    setResponsePlan(prev => ({
      ...prev,
      approvalStatus: 'REJECTED',
      approvalTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      approverName: 'Emergency Operations Coordinator (ID: EOC-COORD-04)',
      modifiedNotes: `Rejected Reason: ${reason}`,
    }));

    const newLog: ActivityLogItem = {
      id: `act-rej-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timeAgo: 'Just now',
      incidentId: selectedIncidentId,
      category: 'HUMAN_APPROVAL',
      agentName: 'Emergency Coordinator',
      title: `Response Plan Rejected for ${selectedIncidentId}`,
      description: `Plan rejected by command coordinator: ${reason}`,
      severity: 'HIGH',
    };
    setActivityLogs(prev => [newLog, ...prev]);

    setCrisisNotification({
      visible: true,
      title: `✕ Response Plan Rejected (${selectedIncidentId})`,
      message: 'Recommendation dismissed. Incident returned to manual triage coordination.',
      type: 'critical',
    });
  }, [selectedIncidentId]);

  // Dynamic Crisis Simulation: INC-1025 triggers re-evaluation & dynamic reassignment
  const simulateCrisisUpdate = useCallback(() => {
    setIsCrisisUpdateSimulated(true);
    const dataset1025 = getCrisisDataById('INC-1025');
    const newIncident: Incident = dataset1025.incident;

    // Update incidents list: add INC-1025, change INC-1022 priority from HIGH/MEDIUM to LOW/MEDIUM
    setIncidents(prev => {
      const exists = prev.some(i => i.id === 'INC-1025');
      const updatedExisting = prev.map(inc => {
        if (inc.id === 'INC-1022') {
          return {
            ...inc,
            severity: 'LOW' as const, // Priority reduced
            status: 'Monitoring' as const,
          };
        }
        return inc;
      });
      return exists ? updatedExisting : [newIncident, ...updatedExisting];
    });

    // Auto-switch to newly triggered crisis INC-1025
    setSelectedIncidentId('INC-1025');
    setAgents(dataset1025.agents);
    setResponsePlan(dataset1025.responsePlan);
    setResources(dataset1025.resources);
    setRoutes(dataset1025.routes);
    setHospitals(dataset1025.hospitals);

    setActivityLogs(prev => [...dataset1025.activityLogs, ...prev]);

    setCrisisNotification({
      visible: true,
      title: '⚠ DYNAMIC RESOURCE REASSIGNMENT TRIGGERED',
      message: 'New CRITICAL Incident INC-1025 detected on NH-544. AI Orchestrator reallocated Rescue Team R-08 from INC-1022 to INC-1025.',
      type: 'critical',
    });
  }, []);

  const resetSimulation = useCallback(() => {
    setIsCrisisUpdateSimulated(false);
    setIncidents(INITIAL_INCIDENTS);
    setSelectedIncidentId('INC-1024');
    const d1024 = getCrisisDataById('INC-1024');
    setAgents(d1024.agents);
    setResources(d1024.resources);
    setRoutes(d1024.routes);
    setHospitals(d1024.hospitals);
    setResponsePlan(d1024.responsePlan);
    setActivityLogs(d1024.activityLogs);
    setAnalysisCompleted(true);
    setIsAnalyzing(false);
    setCrisisNotification(null);
  }, []);

  // 1-Click presentation demo loader
  const loadDemoIncident = useCallback(() => {
    resetSimulation();
    selectIncident('INC-1024', 'dashboard');
    setCrisisNotification({
      visible: true,
      title: '🎯 Demo Incident INC-1024 Loaded',
      message: 'Coimbatore Flash Flood scenario with full multi-agent telemetry loaded from JSON registry.',
      type: 'info',
    });
  }, [resetSimulation, selectIncident]);

  return (
    <CrisisContext.Provider
      value={{
        activeTab,
        setActiveTab,
        incidents,
        selectedIncident,
        selectIncident,
        incidentsSubView,
        setIncidentsSubView,
        agents,
        isAnalyzing,
        currentSimulatingIndex,
        analysisCompleted,
        runAiAnalysis,
        resources,
        assignResource,
        routes,
        hospitals,
        responsePlan,
        approvePlan,
        modifyPlan,
        rejectPlan,
        activityLogs,
        isCrisisUpdateSimulated,
        simulateCrisisUpdate,
        resetSimulation,
        loadDemoIncident,
        isArchitectureModalOpen,
        setIsArchitectureModalOpen,
        crisisNotification,
        dismissCrisisNotification,
      }}
    >
      {children}
    </CrisisContext.Provider>
  );
};

export const useCrisis = () => {
  const context = useContext(CrisisContext);
  if (!context) {
    throw new Error('useCrisis must be used within a CrisisProvider');
  }
  return context;
};
