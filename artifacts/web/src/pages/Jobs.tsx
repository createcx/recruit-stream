import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { 
  Eye, Pencil, MoreHorizontal, Plus, Search, Filter, Trash2, Briefcase, 
  MapPin, Clock, CalendarDays, ArrowRight, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useListJobs, useGetJob, useDeleteJob } from "@workspace/api-client-react";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const { data: jobs, isLoading } = useListJobs({ search });
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: selectedJob, isLoading: isJobLoading } = useGetJob(selectedJobId || 0, {
    query: { enabled: !!selectedJobId }
  });

  const deleteJob = useDeleteJob();

  const handleOpenDrawer = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedJobId(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedJobId(null), 300);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob.mutateAsync({ id });
      closeDrawer();
    }
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    switch(s) {
      case "active": return "bg-green-100 text-green-700 border-green-200";
      case "on hold": return "bg-amber-100 text-amber-700 border-amber-200";
      case "closed": return "bg-slate-100 text-slate-700 border-slate-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getPriorityColor = (priority?: string) => {
    if (!priority) return "bg-slate-50 text-slate-600 border-slate-100";
    const p = priority.toLowerCase();
    switch(p) {
      case "high": return "bg-red-50 text-red-600 border-red-100";
      case "medium": return "bg-blue-50 text-blue-600 border-blue-100";
      case "low": return "bg-slate-50 text-slate-600 border-slate-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <AppLayout activePage="jobs">
      <div className="flex flex-col h-full bg-slate-50">
        {/* Header */}
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Job Orders</h1>
            <p className="text-sm text-slate-500 mt-1">Manage open requisitions and pipelines</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Job Order
          </Button>
        </header>

        {/* Toolbar */}
        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search jobs by title or company..." 
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 text-slate-600 border-slate-200">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center gap-2 ml-auto text-sm text-slate-500 font-medium">
            <span>Showing {jobs?.length || 0} jobs</span>
          </div>
        </div>

        {/* List View */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="px-4 py-3 font-medium">Job Title</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Status & Priority</th>
                  <th className="px-4 py-3 font-medium text-center">Openings</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={6} className="px-4 py-4"><Skeleton className="h-12 w-full" /></td>
                    </tr>
                  ))
                ) : jobs?.map((job) => (
                  <tr 
                    key={job.id} 
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => handleOpenDrawer(job.id)}
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {job.title}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">{job.salary || "Salary TBD"} • {job.type || "Full-time"}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-700">{job.company}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {job.location || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </Badge>
                        <Badge variant="outline" className={`font-medium ${getPriorityColor(job.priority)}`}>
                          {job.priority || "Normal"}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">
                        {job.openings || 1}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" onClick={(e) => handleOpenDrawer(job.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={(e) => handleOpenDrawer(job.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={(e) => handleOpenDrawer(job.id, e)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Job</DropdownMenuItem>
                            <DropdownMenuItem>Clone</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(job.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DrawerPanel 
        open={drawerOpen} 
        onClose={closeDrawer}
        title={selectedJob ? "Job Details" : ""}
      >
        {isJobLoading ? (
          <div className="space-y-4">
             <Skeleton className="h-10 w-2/3" />
             <Skeleton className="h-6 w-1/3" />
             <div className="grid grid-cols-4 gap-4 mt-8">
               <Skeleton className="h-20 w-full" />
               <Skeleton className="h-20 w-full" />
               <Skeleton className="h-20 w-full" />
               <Skeleton className="h-20 w-full" />
             </div>
             <Skeleton className="h-40 w-full mt-8" />
          </div>
        ) : selectedJob && (
          <div className="flex flex-col h-full bg-white rounded-lg border border-slate-100">
            {/* Drawer Body - Scrollable */}
            <div className="flex-1 overflow-auto p-8 space-y-10">
              
              {/* Section 1 - Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedJob.title}</h2>
                    <span className="text-lg font-medium text-orange-600 mt-1 inline-block">
                      {selectedJob.company}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-500">Job ID</div>
                    <div className="text-slate-900 font-mono text-sm mt-0.5">#{selectedJob.id}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                    <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
                    {selectedJob.location || "Remote"}
                  </span>
                  <span className="flex items-center text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                    <Briefcase className="w-4 h-4 mr-1.5 text-slate-400" />
                    {selectedJob.type || "Full-time"}
                  </span>
                  <Badge variant="outline" className={`font-medium px-2.5 py-1 ${getStatusColor(selectedJob.status)}`}>
                    {selectedJob.status}
                  </Badge>
                  <Badge variant="outline" className={`font-medium px-2.5 py-1 ${getPriorityColor(selectedJob.priority)}`}>
                    {selectedJob.priority || "Normal"} Priority
                  </Badge>
                </div>
              </div>

              {/* Section 2 - Details Grid */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Key Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Salary Range</div>
                    <div className="text-sm font-semibold text-slate-900">{selectedJob.salary || "TBD"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Openings</div>
                    <div className="text-sm font-semibold text-slate-900">{selectedJob.openings || 1} positions</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Posted Date</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center">
                      <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {new Date(selectedJob.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Deadline</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {selectedJob.deadline ? new Date(selectedJob.deadline).toLocaleDateString() : "Open"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 & 4 - Description & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Description</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {selectedJob.description || "No description provided."}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements && selectedJob.requirements.length > 0 ? selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-3 shrink-0"></span>
                        {req}
                      </li>
                    )) : (
                      <span className="text-sm text-slate-500">No specific requirements listed.</span>
                    )}
                  </ul>
                </div>
              </div>

            </div>

            {/* Drawer Footer CTA */}
            <div className="px-8 py-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between sticky bottom-0 rounded-b-lg">
              <div className="flex items-center gap-3">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">
                  Edit Job
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 font-medium bg-white hover:bg-slate-50">
                  Add Submission
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">
                  Close Job
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(selectedJob.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
