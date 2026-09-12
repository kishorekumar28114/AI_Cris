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
  INITIAL_ACTIVITY_LOG 
} from '../data/mockCrisisData';

interface CrisisContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  incidents: Incident[];
  selectedIncident: Incident;
  selectIncident: (id: string) => void;
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
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('INC-1024');
  const [agents, setAgents] = useState<AgentStep[]>(INITIAL_AGENTS);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentSimulatingIndex, setCurrentSimulatingIndex] = useState<number>(-1);
  const [analysisCompleted, setAnalysisCompleted] = useState<boolean>(true);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [routes] = useState<RouteOption[]>(INITIAL_ROUTES);
  const [hospitals] = useState<HospitalItem[]>(INITIAL_HOSPITALS);
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

  const selectIncident = useCallback((id: string) => {
    setSelectedIncidentId(id);
    setActiveTab('ai-analysis');
  }, []);

  const dismissCrisisNotification = useCallback(() => {
    setCrisisNotification(null);
  }, []);

  // Sequential AI Multi-Agent execution simulation
  const runAiAnalysis = useCallback(() => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisCompleted(false);
    setCurrentSimulatingIndex(0);

    // Reset agents to idle
    setAgents(prev => prev.map(a => ({
      ...a,
      status: 'idle',
      badgeText: 'Queued',
    })));

    let currentIndex = 0;
    const totalAgents = INITIAL_AGENTS.length;

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
              status: INITIAL_AGENTS[idx].status,
              badgeText: INITIAL_AGENTS[idx].badgeText,
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
        setAgents(INITIAL_AGENTS);

        // Add to activity log
        const newLog: ActivityLogItem = {
          id: `act-run-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          timeAgo: 'Just now',
          incidentId: selectedIncidentId,
          category: 'AI_AGENT',
          agentName: 'AI / API Orchestrator',
          title: 'Sequential Multi-Agent Analysis Completed',
          description: 'All 7 specialized AI agents executed and validated. Actionable response recommendations compiled.',
          severity: 'CRITICAL',
        };
        setActivityLogs(prev => [newLog, ...prev]);

        setCrisisNotification({
          visible: true,
          title: '✓ AI Multi-Agent Analysis Complete',
          message: 'All 7 specialized agents collaborated and compiled the recommended response plan for INC-1024.',
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
        description: `${targetRes.name} marked as ${isNowAssigned ? 'Assigned' : 'Available'} for field operations.`,
        severity: 'INFO',
      };
      setActivityLogs(prev => [newLog, ...prev]);
    }
  }, [resources, selectedIncidentId]);

  // Human-in-the-loop Approvals
  const approvePlan = useCallback(() => {
    setResponsePlan(prev => ({
      ...prev,
      approvalStatus: 'APPROVED',
      approvalTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      approverName: 'Emergency Operations Coordinator (ID: EOC-COORD-04)',
    }));

    setIncidents(prev => prev.map(inc => {
      if (inc.id === 'INC-1024') {
        return { ...inc, status: 'Resources Assigned' };
      }
      return inc;
    }));

    const newLog: ActivityLogItem = {
      id: `act-app-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      timeAgo: 'Just now',
      incidentId: 'INC-1024',
      category: 'HUMAN_APPROVAL',
      agentName: 'Emergency Coordinator',
      title: 'AI Response Plan Approved by Human Coordinator',
      description: 'Authorized dispatch of Rescue Unit R-12, Paramedic A-04, and hospital intake at Kovai Medical Center.',
      severity: 'CRITICAL',
    };
    setActivityLogs(prev => [newLog, ...prev]);

    setCrisisNotification({
      visible: true,
      title: '✓ Plan Approved by Emergency Coordinator',
      message: 'Status updated: APPROVED BY EMERGENCY COORDINATOR. Authorized for field coordination dispatch.',
      type: 'success',
    });
  }, []);

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
      incidentId: 'INC-1024',
      category: 'HUMAN_APPROVAL',
      agentName: 'Emergency Coordinator',
      title: 'AI Response Plan Modified by Human Coordinator',
      description: `Coordinator adjustments applied: "${notes}"`,
      severity: 'HIGH',
    };
    setActivityLogs(prev => [newLog, ...prev]);

    setCrisisNotification({
      visible: true,
      title: '✎ Plan Modified & Approved with Changes',
      message: 'Human adjustments logged and appended to operations manifest.',
      type: 'info',
    });
  }, []);

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
      incidentId: 'INC-1024',
      category: 'HUMAN_APPROVAL',
      agentName: 'Emergency Coordinator',
      title: 'AI Response Plan Rejected by Human Coordinator',
      description: `Plan rejected by command coordinator: ${reason}`,
      severity: 'HIGH',
    };
    setActivityLogs(prev => [newLog, ...prev]);

    setCrisisNotification({
      visible: true,
      title: '✕ Response Plan Rejected',
      message: 'Recommendation dismissed. Incident returned to manual triage coordination.',
      type: 'critical',
    });
  }, []);

  // Dynamic Crisis Simulation: INC-1025 triggers re-evaluation & dynamic reassignment
  const simulateCrisisUpdate = useCallback(() => {
    setIsCrisisUpdateSimulated(true);

    const newIncident: Incident = {
      id: 'INC-1025',
      title: 'Severe Multi-Vehicle Pileup on Coimbatore Highway',
      type: 'Road Accident',
      location: 'Coimbatore Highway (km 14)',
      severity: 'CRITICAL',
      status: 'Awaiting Approval',
      reportedTime: '08:48 AM',
      timeAgo: 'Just now',
      affectedPeople: '22 casualties & trapped vehicles',
      urgency: 'Critical',
      infrastructureImpact: 'High',
      weatherCondition: 'Torrential downpour & poor visibility',
      evidenceSummary: 'Highway patrol dashcam & emergency toll plaza sensor SOS.',
      coordinates: { x: 610, y: 190 },
    };

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

    // Reassign Rescue Team R-08 from INC-1022 to INC-1025
    setResources(prev => prev.map(res => {
      if (res.callsign === 'R-08') {
        return {
          ...res,
          assignedToIncidentId: 'INC-1025',
          assignedIncidentName: 'INC-1025 Highway Crash (Coimbatore)',
          status: 'Assigned',
          recommendation: 'ASSIGN',
        };
      }
      return res;
    }));

    // Add activity log entries showing multi-agent re-evaluation
    const revalLogs: ActivityLogItem[] = [
      {
        id: `act-reassign-${Date.now()}-1`,
        timestamp: '08:48:30 AM',
        timeAgo: 'Just now',
        incidentId: 'INC-1025',
        category: 'CRISIS_ALERT',
        agentName: 'AI / API Orchestrator',
        title: '⚠ DYNAMIC RESOURCE REASSIGNMENT TRIGGERED',
        description: 'Rescue Team R-08 dynamically reassigned from INC-1022 (Fire, downgraded to LOW) to new CRITICAL incident INC-1025.',
        severity: 'CRITICAL',
      },
      {
        id: `act-reassign-${Date.now()}-2`,
        timestamp: '08:48:15 AM',
        timeAgo: 'Just now',
        incidentId: 'INC-1025',
        category: 'AI_AGENT',
        agentName: 'Severity Assessment Agent',
        title: 'Dynamic Priority Recalculation',
        description: 'INC-1025 classified as CRITICAL (95/100). INC-1022 containment confirmed -> priority downgraded to LOW.',
        severity: 'HIGH',
      },
      {
        id: `act-reassign-${Date.now()}-3`,
        timestamp: '08:48:02 AM',
        timeAgo: 'Just now',
        incidentId: 'INC-1025',
        category: 'AI_AGENT',
        agentName: 'Resource Coordination Agent',
        title: 'Adaptive Reallocation Executed',
        description: 'Resource contention resolved via priority matrix: transferred heavy extrication unit R-08 to high-casualty corridor.',
        severity: 'CRITICAL',
      },
    ];

    setActivityLogs(prev => [...revalLogs, ...prev]);

    setCrisisNotification({
      visible: true,
      title: '⚠ Dynamic Resource Reassignment Executed',
      message: 'New CRITICAL Incident INC-1025 detected. AI Orchestrator reallocated Rescue Team R-08 from INC-1022 to INC-1025.',
      type: 'critical',
    });
  }, []);

  const resetSimulation = useCallback(() => {
    setIsCrisisUpdateSimulated(false);
    setIncidents(INITIAL_INCIDENTS);
    setSelectedIncidentId('INC-1024');
    setAgents(INITIAL_AGENTS);
    setResources(INITIAL_RESOURCES);
    setResponsePlan(INITIAL_RESPONSE_PLAN);
    setActivityLogs(INITIAL_ACTIVITY_LOG);
    setAnalysisCompleted(true);
    setIsAnalyzing(false);
    setCrisisNotification(null);
  }, []);

  // 1-Click presentation demo loader
  const loadDemoIncident = useCallback(() => {
    resetSimulation();
    setSelectedIncidentId('INC-1024');
    setActiveTab('dashboard');
    setCrisisNotification({
      visible: true,
      title: '🎯 Demo Incident INC-1024 Loaded',
      message: 'Ready for faculty review presentation: Coimbatore Flash Flood scenario with full multi-agent telemetry.',
      type: 'info',
    });
  }, [resetSimulation]);

  return (
    <CrisisContext.Provider
      value={{
        activeTab,
        setActiveTab,
        incidents,
        selectedIncident,
        selectIncident,
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
