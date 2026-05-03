import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, MoreHorizontal, Briefcase, Building2, MapPin, 
  DollarSign, Calendar, Clock, Eye, Edit2, Copy, Archive, Trash2 
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useListCandidates, useGetCandidate, Candidate } from "@workspace/api-client-react";

const STAGES = [
  { id: "new", name: "NEW", color: "bg-blue-100 text-blue-800 border-blue-200", badge: "bg-blue-200 text-blue-900" },
  { id: "submitted", name: "SUBMITTED", color: "bg-purple-100 text-purple-800 border-purple-200", badge: "bg-purple-200 text-purple-900" },
  { id: "interviewing", name: "INTERVIEWING", color: "bg-orange-100 text-orange-800 border-orange-200", badge: "bg-orange-200 text-orange-900" },
  { id: "offer", name: "OFFER", color: "bg-red-100 text-red-800 border-red-200", badge: "bg-red-200 text-red-900" },
  { id: "placed", name: "PLACED", color: "bg-green-100 text-green-800 border-green-200", badge: "bg-green-200 text-green-900" }
];

export default function Pipeline() {
  const { data: candidates, isLoading } = useListCandidates();
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: selectedCandidate, isLoading: isCandidateLoading } = useGetCandidate(selectedCandidateId || 0, {
    query: { enabled: !!selectedCandidateId }
  });

  const handleOpenDrawer = (candidate: Candidate) => {
    setSelectedCandidateId(candidate.id);
    setDrawerOpen(true);
  };

  const getStageConfig = (stageId: string) => {
    const s = stageId.toLowerCase();
    return STAGES.find(stage => stage.id === s) || STAGES[0];
  };

  const getInitials = (name: string) => {
    if (!name) return "R";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <AppLayout activePage="pipeline">
      <div className="flex flex-col h-[calc(100vh)] bg-slate-50 overflow-hidden">
        {/* Page Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white shrink-0 shadow-sm z-10">
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
        <div className="flex-1 overflow-x-auto p-6 bg-slate-50">
          <div className="flex gap-6 h-full min-w-max items-start pb-4">
            {STAGES.map((col) => {
              const colItems = candidates?.filter((c) => c.status.toLowerCase() === col.id) || [];
              return (
                <div key={col.id} className="flex flex-col w-80 max-h-full bg-slate-100/50 rounded-xl border border-slate-200/60 shadow-sm">
                  {/* Column Header */}
                  <div className={`flex items-center justify-between p-3 border-b rounded-t-xl ${col.color}`}>
                    <span className="font-semibold text-sm tracking-wider">{col.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${col.badge}`}>
                      {colItems.length}
                    </span>
                  </div>

                  {/* Column Body */}
                  <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 min-h-[150px]">
                    {isLoading ? (
                      Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-lg" />)
                    ) : colItems.length === 0 ? (
                      <div className="flex items-center justify-center h-24 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                        Drag candidates here
                      </div>
                    ) : (
                      colItems.map((candidate) => (
                        <Card 
                          key={candidate.id} 
                          className="shadow-sm border-slate-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group bg-white"
                          onClick={() => handleOpenDrawer(candidate)}
                        >
                          <CardContent className="p-4 flex flex-col gap-3 relative">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{candidate.name}</h3>
                                <p className="text-sm font-medium text-slate-700 mt-1">{candidate.title || "No Title"}</p>
                              </div>
                              <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-600 -mr-2 -mt-2">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem onClick={() => handleOpenDrawer(candidate)}>
                                      <Eye className="w-4 h-4 mr-2" /> View Details
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-xs text-slate-500">
                              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                              {candidate.location || "Remote"}
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
                              <div className="text-xs text-slate-400 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(candidate.updatedAt).toLocaleDateString()}
                              </div>
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-orange-100 text-orange-700 text-[10px] font-medium border border-orange-200">
                                  {getInitials(candidate.name)}
                                </AvatarFallback>
                              </Avatar>
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
        title="Candidate Application"
        actions={
          <div className="flex items-center justify-between w-full">
            <div className="flex space-x-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Move to Next Stage
              </Button>
              <Button variant="outline" className="border-slate-200">
                Schedule Interview
              </Button>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              Reject
            </Button>
          </div>
        }
      >
        {isCandidateLoading ? (
           <div className="space-y-4">
             <Skeleton className="h-20 w-full" />
             <Skeleton className="h-40 w-full" />
           </div>
        ) : selectedCandidate && (
          <div className="space-y-8 bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
            {/* Section 1: Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-200">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-xl font-bold">
                    {getInitials(selectedCandidate.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedCandidate.name}</h2>
                  <div className="flex items-center mt-1 text-slate-600">
                    <Briefcase className="w-4 h-4 mr-1.5" />
                    <span>{selectedCandidate.title || "Applicant"}</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStageConfig(selectedCandidate.status).color.replace('bg-', 'bg-').replace('100', '50')}`}>
                {getStageConfig(selectedCandidate.status).name}
              </div>
            </div>

            {/* Section 2: Snapshot */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Candidate Snapshot</h3>
              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Current Title</div>
                  <div className="font-medium text-slate-900">{selectedCandidate.title || "—"}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Expected Salary</div>
                  <div className="font-medium text-slate-900 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-slate-400" />
                    {selectedCandidate.salary || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Location</div>
                  <div className="font-medium text-slate-900 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                    {selectedCandidate.location || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-2">Key Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills?.map((skill, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Next Steps */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Pipeline Action</h3>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-xs text-slate-500 mb-1.5">Update Stage</label>
                  <Select value={selectedCandidate.status.toLowerCase()}>
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
              </div>
            </div>

          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
