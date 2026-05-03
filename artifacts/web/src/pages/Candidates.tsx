import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { 
  Search, Filter, MapPin, Eye, Edit2, MoreVertical, Plus, ChevronDown, Trash2, 
  Mail, Phone, Briefcase, FileText, Clock, ExternalLink, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useListCandidates, useGetCandidate, useDeleteCandidate } from "@workspace/api-client-react";

export default function Candidates() {
  const [search, setSearch] = useState("");
  const { data: candidates, isLoading } = useListCandidates({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: selectedCandidate, isLoading: isCandidateLoading } = useGetCandidate(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const openDrawer = (id: number) => {
    setSelectedId(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedId(null), 300);
  };

  const deleteCandidate = useDeleteCandidate();

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await deleteCandidate.mutateAsync({ id });
      closeDrawer();
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "R";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const drawerActions = selectedCandidate ? (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Edit Candidate
        </Button>
        <Button variant="outline" className="border-slate-300 text-slate-700">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Interview
        </Button>
        <Button variant="outline" className="border-slate-300 text-slate-700">
          <FileText className="w-4 h-4 mr-2" />
          Add Note
        </Button>
        <Button variant="ghost" className="text-slate-500">
          Archive
        </Button>
      </div>
      <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleDelete(selectedCandidate.id)}>
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  ) : null;

  return (
    <AppLayout activePage="candidates">
      <div className="flex flex-col h-full bg-slate-50">
        <div className="p-8 pb-4 flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Candidates</h1>
              <p className="text-sm text-slate-500 mt-1">{candidates?.length || 0} total</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search candidates..." 
                className="pl-9 bg-white border-slate-200"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white border-slate-200 text-slate-700">
                  <Filter className="w-4 h-4 mr-2 text-slate-400" />
                  All Statuses
                  <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem>All Statuses</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Placed</DropdownMenuItem>
                <DropdownMenuItem>Rejected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="px-8 pb-8 flex-1">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-200">
                  <TableHead className="font-semibold text-slate-600 w-[250px]">NAME</TableHead>
                  <TableHead className="font-semibold text-slate-600">TITLE</TableHead>
                  <TableHead className="font-semibold text-slate-600">LOCATION</TableHead>
                  <TableHead className="font-semibold text-slate-600">STATUS</TableHead>
                  <TableHead className="font-semibold text-slate-600 max-w-[250px]">SKILLS</TableHead>
                  <TableHead className="font-semibold text-slate-600">SALARY</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7}><Skeleton className="h-12 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : candidates?.map((candidate) => (
                  <TableRow 
                    key={candidate.id} 
                    className="group hover:bg-slate-50/80 border-slate-100 transition-colors cursor-pointer"
                    onClick={() => openDrawer(candidate.id)}
                  >
                    <TableCell className="py-4">
                      <div className="font-medium text-slate-900">{candidate.name}</div>
                      <div className="text-sm text-slate-500 mt-0.5">{candidate.email}</div>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">
                      {candidate.title || "—"}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {candidate.location || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {candidate.status.toLowerCase() === "active" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 capitalize hover:bg-green-50">
                          {candidate.status}
                        </Badge>
                      ) : candidate.status.toLowerCase() === "placed" ? (
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 capitalize hover:bg-teal-50">
                          {candidate.status}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 capitalize hover:bg-blue-50">
                          {candidate.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[250px]">
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills?.slice(0, 2).map(skill => (
                          <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills && candidate.skills.length > 2 && (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal text-xs">
                            +{candidate.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {candidate.salary || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" onClick={() => openDrawer(candidate.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" onClick={() => openDrawer(candidate.id)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openDrawer(candidate.id)}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDrawer(candidate.id)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Clone</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700" onClick={() => handleDelete(candidate.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DrawerPanel
        open={drawerOpen}
        onClose={closeDrawer}
        title="Candidate Profile"
        actions={drawerActions}
      >
        {isCandidateLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : selectedCandidate && (
          <div className="flex flex-col gap-8 pb-4">
            {/* Section 1 - Profile Header */}
            <div className="flex gap-6 items-start">
              <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-2xl font-bold shrink-0">
                {getInitials(selectedCandidate.name)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedCandidate.name}</h2>
                    <p className="text-lg text-slate-600 mt-1">{selectedCandidate.title || "No Title"}</p>
                  </div>
                  <Badge variant="outline" className={`capitalize ${selectedCandidate.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-teal-50 text-teal-700 border-teal-200'}`}>
                    {selectedCandidate.status}
                  </Badge>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {selectedCandidate.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {selectedCandidate.phone || "—"}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {selectedCandidate.location || "—"}
                  </div>
                </div>

                <div className="mt-4 flex gap-4">
                  <div className="bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium uppercase">Applications</div>
                    <div className="text-lg font-semibold text-slate-900">0</div>
                  </div>
                  <div className="bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium uppercase">Placements</div>
                    <div className="text-lg font-semibold text-slate-900">0</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Section 2 - Details */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-slate-900">Details</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-slate-500">Skills</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedCandidate.skills && selectedCandidate.skills.length > 0 ? (
                      selectedCandidate.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 font-normal">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-slate-500">No skills listed</span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-sm font-medium text-slate-500 block">Salary Expectation</span>
                    <span className="text-slate-900">{selectedCandidate.salary || "—"}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500 block">Availability</span>
                    <span className="text-slate-900">{selectedCandidate.availability || "—"}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500 block">Visa Status</span>
                    <span className="text-slate-900">{selectedCandidate.visa || "—"}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500 block">Social</span>
                    {selectedCandidate.linkedIn ? (
                      <a href={selectedCandidate.linkedIn.startsWith('http') ? selectedCandidate.linkedIn : `https://${selectedCandidate.linkedIn}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 mt-1">
                        {selectedCandidate.linkedIn}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Section 3 - Recent Submissions */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900">Recent Submissions</h3>
                <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">View All</Button>
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-slate-500">
                        No submissions yet
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Section 4 - Activity Timeline */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-slate-900">Activity Timeline</h3>
              <div className="text-sm text-slate-500 italic py-4 text-center border border-dashed border-slate-200 rounded-lg">
                No recent activity.
              </div>
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Section 5 - Notes */}
            <div className="flex flex-col gap-4 pb-8">
              <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
              <Textarea 
                className="min-h-[100px] bg-yellow-50/50 border-yellow-200 focus-visible:ring-yellow-400 text-slate-700"
                defaultValue={selectedCandidate.notes}
                placeholder="Add notes about this candidate..."
              />
            </div>

          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
