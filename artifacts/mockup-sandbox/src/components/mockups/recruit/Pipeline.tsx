import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, MoreHorizontal, Briefcase, Building2, MapPin, 
  DollarSign, Calendar, FileText, ChevronDown, Clock, 
  Eye, Edit2, Copy, Archive, Trash2 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PipelineCandidate {
  id: string;
  name: string;
  initials: string;
  stage: string;
  jobTitle: string;
  company: string;
  salary: string;
  location: string;
  skills: string[];
  lastUpdated: string;
  history: { stage: string; date: string; user: string }[];
  notes: string;
}

const STAGES = [
  { id: "new", name: "NEW", color: "bg-blue-100 text-blue-800 border-blue-200", badge: "bg-blue-200 text-blue-900" },
  { id: "submitted", name: "SUBMITTED", color: "bg-purple-100 text-purple-800 border-purple-200", badge: "bg-purple-200 text-purple-900" },
  { id: "interviewing", name: "INTERVIEWING", color: "bg-orange-100 text-orange-800 border-orange-200", badge: "bg-orange-200 text-orange-900" },
  { id: "offer", name: "OFFER", color: "bg-red-100 text-red-800 border-red-200", badge: "bg-red-200 text-red-900" },
  { id: "placed", name: "PLACED", color: "bg-green-100 text-green-800 border-green-200", badge: "bg-green-200 text-green-900" },
  { id: "rejected", name: "REJECTED", color: "bg-slate-100 text-slate-800 border-slate-200", badge: "bg-slate-200 text-slate-900" }
];

const CANDIDATES: PipelineCandidate[] = [
  {
    id: "1",
    name: "Dave Kim",
    initials: "DK",
    stage: "new",
    jobTitle: "Senior React Engineer",
    company: "Acme Technologies",
    salary: "$145k",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Tailwind"],
    lastUpdated: "Today",
    history: [
      { stage: "New", date: "4/25", user: "Sarah Jenkins" }
    ],
    notes: "Reviewing resume. Strong background in React."
  },
  {
    id: "2",
    name: "Bob Martinez",
    initials: "BM",
    stage: "submitted",
    jobTitle: "VP of Product",
    company: "TechCorp Solutions",
    salary: "$160k",
    location: "Austin, TX (Remote)",
    skills: ["Product Strategy", "Agile", "Leadership"],
    lastUpdated: "Yesterday",
    history: [
      { stage: "New", date: "4/20", user: "Sarah Jenkins" },
      { stage: "Submitted", date: "4/28", user: "Mike Ross" }
    ],
    notes: "Submitted to hiring manager. Waiting on feedback."
  },
  {
    id: "3",
    name: "Alice Johnson",
    initials: "AJ",
    stage: "interviewing",
    jobTitle: "Senior React Engineer",
    company: "Acme Technologies",
    salary: "$130k",
    location: "New York, NY",
    skills: ["React", "Node.js", "AWS"],
    lastUpdated: "2 days ago",
    history: [
      { stage: "New", date: "4/15", user: "Sarah Jenkins" },
      { stage: "Submitted", date: "4/18", user: "Mike Ross" },
      { stage: "Interviewing", date: "5/2", user: "Sarah Jenkins" }
    ],
    notes: "Strong technical background. Positive feedback from hiring manager."
  },
  {
    id: "4",
    name: "Carol Thompson",
    initials: "CT",
    stage: "placed",
    jobTitle: "DevOps Lead",
    company: "Acme Technologies",
    salary: "$180k",
    location: "Seattle, WA",
    skills: ["Kubernetes", "Terraform", "CI/CD"],
    lastUpdated: "1 week ago",
    history: [
      { stage: "New", date: "3/10", user: "Mike Ross" },
      { stage: "Submitted", date: "3/15", user: "Sarah Jenkins" },
      { stage: "Interviewing", date: "3/20", user: "Mike Ross" },
      { stage: "Offer", date: "4/05", user: "Sarah Jenkins" },
      { stage: "Placed", date: "4/10", user: "Mike Ross" }
    ],
    notes: "Offer accepted. Starts next month."
  }
];

export function Pipeline() {
  const [candidates, setCandidates] = useState<PipelineCandidate[]>(CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<PipelineCandidate | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleOpenDrawer = (candidate: PipelineCandidate, isEdit: boolean = false) => {
    setSelectedCandidate(candidate);
    setEditMode(isEdit);
    setDrawerOpen(true);
  };

  const getStageConfig = (stageId: string) => STAGES.find(s => s.id === stageId) || STAGES[0];

  return (
    <AppLayout activePage="pipeline">
      <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
        {/* Page Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Pipeline</h1>
            <p className="text-sm text-slate-500 mt-1">Manage active candidates across all stages</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="frontend">Senior React Engineer</SelectItem>
                <SelectItem value="vp">VP of Product</SelectItem>
                <SelectItem value="devops">DevOps Lead</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-4 h-full min-w-max items-start">
            {STAGES.map((col) => {
              const colItems = candidates.filter((c) => c.stage === col.id);
              return (
                <div key={col.id} className="flex flex-col w-80 max-h-full bg-slate-100/50 rounded-xl border border-slate-200">
                  {/* Column Header */}
                  <div className={`flex items-center justify-between p-3 border-b rounded-t-xl ${col.color}`}>
                    <span className="font-semibold text-sm tracking-wider">{col.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${col.badge}`}>
                      {colItems.length}
                    </span>
                  </div>

                  {/* Column Body */}
                  <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 min-h-[150px]">
                    {colItems.length === 0 ? (
                      <div className="flex items-center justify-center h-24 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                        Drag candidates here
                      </div>
                    ) : (
                      colItems.map((candidate) => (
                        <Card 
                          key={candidate.id} 
                          className="shadow-sm border-slate-200/60 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
                          onClick={() => handleOpenDrawer(candidate)}
                        >
                          <CardContent className="p-4 flex flex-col gap-3 relative">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{candidate.name}</h3>
                                <p className="text-sm font-medium text-slate-700 mt-1">{candidate.jobTitle}</p>
                              </div>
                              <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-600 -mr-2 -mt-2">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem onClick={() => handleOpenDrawer(candidate, false)}>
                                      <Eye className="w-4 h-4 mr-2" /> View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleOpenDrawer(candidate, true)}>
                                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="w-4 h-4 mr-2" /> Clone
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Archive className="w-4 h-4 mr-2" /> Archive
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-xs text-slate-500">
                              <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                              {candidate.company}
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
                              <div className="text-xs text-slate-400 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {candidate.lastUpdated}
                              </div>
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200">
                                  {candidate.initials}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            
                            {/* Inline eye button on hover */}
                            <div className="absolute bottom-4 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                               <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm" onClick={(e) => { e.stopPropagation(); handleOpenDrawer(candidate, false); }}>
                                 <Eye className="h-3 w-3 text-slate-500" />
                               </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      <DrawerPanel
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editMode ? "Edit Candidate Application" : "Candidate Application"}
        actions={
          <div className="flex items-center justify-between w-full">
            <div className="flex space-x-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Move to Next Stage
              </Button>
              <Button variant="outline" className="border-slate-200">
                Schedule Interview
              </Button>
              <Button variant="outline" className="border-slate-200">
                Add Note
              </Button>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              Reject
            </Button>
          </div>
        }
      >
        {selectedCandidate && (
          <div className="space-y-8">
            {/* Section 1: Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-200">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-xl font-bold">
                    {selectedCandidate.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedCandidate.name}</h2>
                  <div className="flex items-center mt-1 text-slate-600">
                    <Briefcase className="w-4 h-4 mr-1.5" />
                    <span>{selectedCandidate.jobTitle}</span>
                    <span className="mx-2 text-slate-300">•</span>
                    <Building2 className="w-4 h-4 mr-1.5" />
                    <span>{selectedCandidate.company}</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStageConfig(selectedCandidate.stage).color.replace('bg-', 'bg-').replace('100', '50')}`}>
                {getStageConfig(selectedCandidate.stage).name}
              </div>
            </div>

            {/* Section 2: Snapshot */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Candidate Snapshot</h3>
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Current Title</div>
                  <div className="font-medium text-slate-900">{selectedCandidate.jobTitle}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Expected Salary</div>
                  <div className="font-medium text-slate-900 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-slate-400" />
                    {selectedCandidate.salary}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Location</div>
                  <div className="font-medium text-slate-900 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                    {selectedCandidate.location}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-2">Key Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Stage History */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Stage History</h3>
              <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
                {selectedCandidate.history.map((event, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-slate-900">{event.stage}</span>
                        <span className="text-xs text-slate-500">{event.date}</span>
                      </div>
                      <div className="text-sm text-slate-500">
                        Logged by <span className="font-medium text-slate-700">{event.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Interview Notes */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex justify-between items-center">
                <span>Interview Notes</span>
                <button className="text-orange-600 hover:text-orange-700 text-xs font-medium flex items-center normal-case">
                  <Edit2 className="w-3 h-3 mr-1" /> Edit Notes
                </button>
              </h3>
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-slate-800 leading-relaxed">
                  {selectedCandidate.notes}
                </p>
              </div>
            </div>

            {/* Section 5: Next Steps */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Next Steps</h3>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-xs text-slate-500 mb-1.5">Update Stage</label>
                  <Select value={selectedCandidate.stage}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGES.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-slate-500 mb-1.5">Action</label>
                  <Button variant="outline" className="w-full justify-center bg-white border-slate-200">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    Schedule Next Interview
                  </Button>
                </div>
              </div>
            </div>

            {/* Section 6: Related Documents */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Related Documents</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group bg-white shadow-sm">
                  <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 group-hover:text-orange-600 transition-colors">Resume.pdf</div>
                    <div className="text-xs text-slate-500">Updated 2 days ago</div>
                  </div>
                </a>
                <a href="#" className="flex items-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group bg-white shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 group-hover:text-orange-600 transition-colors">Cover Letter.pdf</div>
                    <div className="text-xs text-slate-500">Updated 2 days ago</div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
