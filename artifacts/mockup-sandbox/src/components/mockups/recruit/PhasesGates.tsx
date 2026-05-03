import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  Eye, 
  Edit2, 
  MoreHorizontal, 
  Filter, 
  Search, 
  ChevronDown,
  Trash2,
  Calendar,
  User,
  ShieldAlert,
  Plus
} from "lucide-react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";

const PROJECTS = [
  {
    id: "proj-1",
    name: "Apex Platform Engineering",
    currentPhase: "Phase 3: Development",
    phaseStatus: "in-progress",
    gateStatus: "passed",
    completionPct: 52,
    nextMilestone: "Code Review Gate 2026-05-15",
  },
  {
    id: "proj-2",
    name: "Northbridge Risk Analytics",
    currentPhase: "Phase 2: Design",
    phaseStatus: "completed",
    gateStatus: "passed",
    completionPct: 42,
    nextMilestone: "Testing Gate 2026-04-01",
  },
  {
    id: "proj-3",
    name: "Meridian EHR Migration",
    currentPhase: "Phase 4: Testing",
    phaseStatus: "at-risk",
    gateStatus: "pending",
    completionPct: 83,
    nextMilestone: "UAT Gate 2025-11-30",
  },
  {
    id: "proj-4",
    name: "Greenfield Portfolio",
    currentPhase: "Phase 1: Discovery",
    phaseStatus: "not-started",
    gateStatus: "not-reached",
    completionPct: 0,
    nextMilestone: "Kickoff Gate 2026-03-01",
  },
  {
    id: "proj-5",
    name: "Apex Data Science",
    currentPhase: "Phase 2: Development",
    phaseStatus: "in-progress",
    gateStatus: "passed",
    completionPct: 24,
    nextMilestone: "Data Pipeline Gate 2026-06-15",
  }
];

const PHASE_DETAILS = [
  { name: "Phase 1: Discovery", status: "completed", date: "Jan 15, 2026" },
  { name: "Phase 2: Design", status: "completed", date: "Feb 28, 2026" },
  { name: "Phase 3: Development", status: "active", date: "In Progress" },
  { name: "Phase 4: Testing", status: "upcoming", date: "Scheduled" },
  { name: "Phase 5: Deployment", status: "upcoming", date: "Scheduled" },
];

const GATE_CRITERIA = [
  { label: "Architecture review sign-off", checked: true },
  { label: "Security compliance check", checked: true },
  { label: "Code coverage > 80%", checked: false },
  { label: "Performance baseline established", checked: false },
];

const RISKS = [
  { title: "Resource constraint in QA team", severity: "high", notes: "Need additional headcount or external contractor by next month." },
  { title: "Dependency delay on API v3", severity: "medium", notes: "Core services team pushed release back by 2 weeks." },
];

const APPROVERS = [
  { name: "Sarah Jenkins", role: "Technical Director", status: "approved" },
  { name: "Marcus Chen", role: "Product Manager", status: "pending" },
];

export function PhasesGates() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  const openDrawer = (id: string, edit: boolean = false) => {
    setSelectedProjectId(id);
    setEditMode(edit);
    setDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed":
      case "passed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "in-progress":
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "at-risk":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
      case "upcoming":
      case "not-started":
      case "not-reached":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <AppLayout activePage="phases">
      <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Phases & Gates</h1>
              <p className="text-sm text-slate-500 mt-1">Project milestones and approval gate tracking</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                New Phase
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer min-w-[160px]">
                <option>All Projects</option>
                <option>Active</option>
                <option>At Risk</option>
                <option>Completed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer min-w-[160px]">
                <option>All Statuses</option>
                <option>In Progress</option>
                <option>Pending Gate</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Current Phase</th>
                  <th className="px-6 py-4">Phase Status</th>
                  <th className="px-6 py-4">Gate Status</th>
                  <th className="px-6 py-4">Completion</th>
                  <th className="px-6 py-4">Next Milestone</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PROJECTS.map((project) => (
                  <tr 
                    key={project.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => openDrawer(project.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{project.name}</div>
                      <div className="text-sm text-slate-500 mt-0.5">{project.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-700">{project.currentPhase}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.phaseStatus)}`}>
                        {formatStatus(project.phaseStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.gateStatus)}`}>
                        {formatStatus(project.gateStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${project.completionPct > 80 ? 'bg-emerald-500' : project.completionPct < 30 ? 'bg-orange-500' : 'bg-blue-500'}`}
                            style={{ width: `${project.completionPct}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600 w-8">{project.completionPct}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-700 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                        {project.nextMilestone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-1" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => openDrawer(project.id)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors tooltip-trigger"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openDrawer(project.id, true)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors tooltip-trigger"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setMenuOpenId(menuOpenId === project.id ? null : project.id)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          
                          {menuOpenId === project.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-10">
                              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">View</button>
                              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Edit</button>
                              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Clone</button>
                              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Archive</button>
                              <div className="h-px bg-slate-100 my-1"></div>
                              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <DrawerPanel open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editMode ? "Edit Phase Details" : "Phase Details"}>
        {selectedProject ? (
          <div className="flex flex-col h-full bg-white">
            <div className="flex-1 overflow-y-auto">
              
              {/* Section 1: Header & Progress */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{selectedProject.name}</h2>
                    <p className="text-slate-500 text-sm mt-1">{selectedProject.currentPhase}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedProject.phaseStatus)}`}>
                    {formatStatus(selectedProject.phaseStatus)}
                  </span>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                    <span className="text-sm font-semibold text-slate-900">{selectedProject.completionPct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${selectedProject.completionPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Section 2: Phase List */}
                <section>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Phase Breakdown</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {PHASE_DETAILS.map((phase, idx) => (
                      <div key={idx} className="relative flex items-center justify-between group">
                        <div className="flex items-center space-x-4 w-full bg-white p-3 rounded-lg border border-slate-100 shadow-sm group-hover:border-slate-300 transition-colors z-10">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                            phase.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 
                            phase.status === 'active' ? 'bg-white border-blue-500 text-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]' : 
                            'bg-white border-slate-300 text-slate-300'
                          }`}>
                            {phase.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3 h-3 fill-current" />}
                          </div>
                          <div className="flex-1 flex justify-between items-center">
                            <span className={`text-sm font-medium ${phase.status === 'upcoming' ? 'text-slate-500' : 'text-slate-900'}`}>
                              {phase.name}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {phase.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 3: Gate Checklist */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Gate Criteria</h3>
                    <div className="text-xs text-slate-500 flex items-center">
                      <User className="w-3.5 h-3.5 mr-1" />
                      Owner: Sarah J.
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-3">
                    {GATE_CRITERIA.map((criterion, idx) => (
                      <label key={idx} className="flex items-start space-x-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input 
                            type="checkbox" 
                            defaultChecked={criterion.checked}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                        </div>
                        <span className={`text-sm ${criterion.checked ? 'text-slate-500 line-through' : 'text-slate-700 font-medium group-hover:text-slate-900'}`}>
                          {criterion.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 4: Risks */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Risks & Issues</h3>
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Add Risk</button>
                  </div>
                  <div className="space-y-3">
                    {RISKS.map((risk, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <ShieldAlert className={`w-5 h-5 mt-0.5 ${risk.severity === 'high' ? 'text-red-500' : 'text-orange-500'}`} />
                            <div>
                              <h4 className="text-sm font-semibold text-slate-900">{risk.title}</h4>
                              <p className="text-sm text-slate-600 mt-1">{risk.notes}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            risk.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {risk.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Section 5: Approvers */}
                <section>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Gate Approvers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {APPROVERS.map((approver, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm">
                          {approver.name.charAt(0)}{approver.name.split(' ')[1].charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{approver.name}</p>
                          <p className="text-xs text-slate-500 truncate">{approver.role}</p>
                        </div>
                        <div>
                          {approver.status === 'approved' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
              </div>
            </div>

            {/* Footer CTAs */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="px-5 py-2.5 bg-[#F97316] text-white text-sm font-medium rounded-md hover:bg-[#EA580C] shadow-sm transition-colors">
                  Update Phase
                </button>
                <button className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 shadow-sm transition-colors">
                  Submit for Gate Review
                </button>
                <button className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 shadow-sm transition-colors">
                  Flag Risk
                </button>
              </div>
              <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">No project selected</div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
