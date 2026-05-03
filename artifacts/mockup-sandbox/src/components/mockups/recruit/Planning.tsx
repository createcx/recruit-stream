import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Users, 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Briefcase,
  AlertCircle,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Types
type Assignment = {
  id: string;
  projectName: string;
  clientName: string;
  role: string;
  hoursPerWeek: number;
  startDate: string;
  endDate: string;
  color: string;
};

type Resource = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  assignments: { [week: string]: Assignment | null };
};

// Data
const weeks = [
  { id: "w1", label: "May 4" },
  { id: "w2", label: "May 11" },
  { id: "w3", label: "May 18" },
  { id: "w4", label: "May 25" },
  { id: "w5", label: "Jun 1" },
  { id: "w6", label: "Jun 8" },
  { id: "w7", label: "Jun 15" },
  { id: "w8", label: "Jun 22" },
];

const apexPlatform: Assignment = {
  id: "a1",
  projectName: "Apex Platform",
  clientName: "Apex Corp",
  role: "Senior Frontend Engineer",
  hoursPerWeek: 40,
  startDate: "May 4, 2026",
  endDate: "Jun 26, 2026",
  color: "bg-orange-100 text-orange-800 border-orange-200",
};

const northbridge: Assignment = {
  id: "a2",
  projectName: "Northbridge",
  clientName: "Northbridge Fin",
  role: "Backend Developer",
  hoursPerWeek: 32,
  startDate: "May 4, 2026",
  endDate: "May 29, 2026",
  color: "bg-blue-100 text-blue-800 border-blue-200",
};

const apexData: Assignment = {
  id: "a3",
  projectName: "Apex Data",
  clientName: "Apex Corp",
  role: "Data Engineer",
  hoursPerWeek: 24,
  startDate: "May 4, 2026",
  endDate: "Jun 26, 2026",
  color: "bg-purple-100 text-purple-800 border-purple-200",
};

const meridian: Assignment = {
  id: "a4",
  projectName: "Meridian",
  clientName: "Meridian Health",
  role: "UX Designer",
  hoursPerWeek: 36,
  startDate: "May 4, 2026",
  endDate: "Jun 12, 2026",
  color: "bg-teal-100 text-teal-800 border-teal-200",
};

const resources: Resource[] = [
  {
    id: "r1",
    name: "Rachel Kim",
    role: "Senior Engineer",
    avatar: "RK",
    assignments: { w1: apexPlatform, w2: apexPlatform, w3: apexPlatform, w4: apexPlatform, w5: apexPlatform, w6: apexPlatform, w7: apexPlatform, w8: apexPlatform }
  },
  {
    id: "r2",
    name: "David Walsh",
    role: "Backend Dev",
    avatar: "DW",
    assignments: { w1: northbridge, w2: northbridge, w3: northbridge, w4: northbridge, w5: null, w6: null, w7: null, w8: null }
  },
  {
    id: "r3",
    name: "Sarah Lin",
    role: "Data Engineer",
    avatar: "SL",
    assignments: { w1: apexData, w2: apexData, w3: apexData, w4: apexData, w5: apexData, w6: apexData, w7: apexData, w8: apexData }
  },
  {
    id: "r4",
    name: "Tom Nguyen",
    role: "Frontend Dev",
    avatar: "TN",
    assignments: { w1: apexPlatform, w2: apexPlatform, w3: apexPlatform, w4: apexPlatform, w5: apexPlatform, w6: apexPlatform, w7: apexPlatform, w8: apexPlatform }
  },
  {
    id: "r5",
    name: "Amy Foster",
    role: "UX Designer",
    avatar: "AF",
    assignments: { w1: meridian, w2: meridian, w3: meridian, w4: meridian, w5: meridian, w6: meridian, w7: null, w8: null }
  },
  {
    id: "r6",
    name: "Mark Davis",
    role: "Product Manager",
    avatar: "MD",
    assignments: { w1: null, w2: null, w3: null, w4: null, w5: null, w6: null, w7: null, w8: null }
  }
];

const forecasts = [
  { id: "f1", role: "DevOps Engineer", project: "Starlight Migration", startDate: "Jun 1, 2026", skills: ["AWS", "Terraform", "Kubernetes"] },
  { id: "f2", role: "React Developer", project: "Northbridge V2", startDate: "Jun 15, 2026", skills: ["React", "TypeScript", "Tailwind"] },
  { id: "f3", role: "Data Scientist", project: "Meridian Analytics", startDate: "Jul 1, 2026", skills: ["Python", "SQL", "Machine Learning"] },
];

export function Planning() {
  const [selectedAssignment, setSelectedAssignment] = useState<{resource: Resource, assignment: Assignment} | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = (resource: Resource, assignment: Assignment) => {
    setSelectedAssignment({ resource, assignment });
    setDrawerOpen(true);
  };

  return (
    <AppLayout activePage="planning">
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden bg-gray-50/50">
        <header className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Planning</h1>
            <p className="text-sm text-gray-500 mt-1">Resource allocation and capacity forecasting</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              May 2026 - Jun 2026
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Assignment
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Capacity Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Resources</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">FTE Utilized</p>
                <p className="text-2xl font-bold text-gray-900">4.3</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">FTE Available</p>
                <p className="text-2xl font-bold text-gray-900">1.7</p>
              </div>
            </div>
          </section>

          {/* Planning Grid */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
              <div className="w-64 p-4 border-r border-gray-200 flex-shrink-0">Resource</div>
              <div className="flex-1 grid grid-cols-8">
                {weeks.map((week) => (
                  <div key={week.id} className="p-4 border-r border-gray-200 last:border-0 text-center">
                    {week.label}
                  </div>
                ))}
              </div>
              <div className="w-32 p-4 text-center flex-shrink-0">Actions</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {resources.map((resource) => (
                <div key={resource.id} className="flex hover:bg-gray-50/50 transition-colors">
                  <div className="w-64 p-3 border-r border-gray-200 flex-shrink-0 flex items-center justify-between group">
                    <div className="flex items-center gap-3 truncate">
                      <Avatar className="w-8 h-8 rounded-md">
                        <AvatarFallback className="bg-gray-100 text-gray-700 rounded-md text-xs">{resource.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <p className="text-sm font-medium text-gray-900 truncate">{resource.name}</p>
                        <p className="text-xs text-gray-500 truncate">{resource.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-8">
                    {weeks.map((week) => {
                      const assignment = resource.assignments[week.id];
                      return (
                        <div key={week.id} className="p-2 border-r border-gray-200 last:border-0 h-16 flex items-center justify-center relative group">
                          {assignment ? (
                            <button 
                              onClick={() => openDrawer(resource, assignment)}
                              className={`w-full h-full rounded border ${assignment.color} p-1 text-left flex flex-col justify-center cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-orange-400 transition-all`}
                            >
                              <span className="text-xs font-semibold truncate leading-tight">{assignment.projectName}</span>
                              <span className="text-[10px] opacity-80 truncate">{assignment.hoursPerWeek}h/wk</span>
                            </button>
                          ) : (
                            <div className="w-full h-full rounded border border-green-200 bg-green-50 text-green-700 flex items-center justify-center text-xs font-medium">
                              Available
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="w-32 p-3 flex-shrink-0 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900" onClick={() => resource.assignments.w1 ? openDrawer(resource, resource.assignments.w1) : null}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900" onClick={() => resource.assignments.w1 ? openDrawer(resource, resource.assignments.w1) : null}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Clone</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Demand Forecast */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Demand Forecast</h2>
              <p className="text-sm text-gray-500">Upcoming resource needs</p>
            </div>
            <div className="divide-y divide-gray-200">
              {forecasts.map((forecast) => (
                <div key={forecast.id} className="p-4 sm:px-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-medium text-gray-900">{forecast.role}</h3>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-none">
                        {forecast.project}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Starts {forecast.startDate}
                      </div>
                      <div className="flex gap-1">
                        {forecast.skills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="shrink-0 border-gray-300">
                    <Search className="w-4 h-4 mr-2" />
                    Find Candidate
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <DrawerPanel 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title="Assignment Details"
      >
        {selectedAssignment && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <Avatar className="w-16 h-16 rounded-xl">
                  <AvatarFallback className="bg-orange-100 text-orange-700 text-xl rounded-xl">
                    {selectedAssignment.resource.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAssignment.resource.name}</h2>
                  <p className="text-gray-500 font-medium">{selectedAssignment.resource.role}</p>
                </div>
              </div>

              <section>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Assignment Detail</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-500">Project Name</div>
                    <div className="col-span-2 font-medium text-gray-900 flex items-center gap-2">
                      {selectedAssignment.assignment.projectName}
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-500">Client</div>
                    <div className="col-span-2 font-medium text-gray-900">{selectedAssignment.assignment.clientName}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-500">Role</div>
                    <div className="col-span-2 font-medium text-gray-900">{selectedAssignment.assignment.role}</div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Schedule</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-500">Start Date</div>
                    <div className="col-span-2 font-medium text-gray-900">{selectedAssignment.assignment.startDate}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-500">End Date</div>
                    <div className="col-span-2 font-medium text-gray-900">{selectedAssignment.assignment.endDate}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-500">Hours/week</div>
                    <div className="col-span-2 font-medium text-gray-900">{selectedAssignment.assignment.hoursPerWeek}h</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-gray-500">Total Hours</div>
                    <div className="col-span-2 font-medium text-gray-900">
                      {selectedAssignment.assignment.hoursPerWeek * 8}h (est. 8 weeks)
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Notes</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-600">
                  <p>Standard assignment block. Requires weekly syncs with the {selectedAssignment.assignment.clientName} product team.</p>
                </div>
              </section>

            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Edit Assignment
              </Button>
              <Button variant="outline" className="border-gray-300">
                Extend Assignment
              </Button>
              <div className="flex-1"></div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                End Assignment
              </Button>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
