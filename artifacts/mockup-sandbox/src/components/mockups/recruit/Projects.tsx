import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, ChevronDown, MoreHorizontal, Plus, 
  Eye, Pencil, Trash2, FileText, Calendar, 
  CheckCircle2, Clock, PlayCircle, Users, ExternalLink 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Project {
  id: string;
  name: string;
  manager: string;
  client: string;
  status: "active" | "planning" | "completed";
  budget: string;
  spent: string;
  remaining: string;
  percentUsed: number;
  dates: string;
}

const projectsData: Project[] = [
  {
    id: "1",
    name: "Apex Platform Engineering Build-Out",
    manager: "Rachel Kim",
    client: "Apex Technologies",
    status: "active",
    budget: "$1,850,000",
    spent: "$920,000",
    remaining: "$930,000",
    percentUsed: 50,
    dates: "2025-01-15 to 2026-06-30",
  },
  {
    id: "2",
    name: "Northbridge Risk Analytics Team",
    manager: "David Walsh",
    client: "Northbridge Capital",
    status: "active",
    budget: "$650,000",
    spent: "$275,000",
    remaining: "$375,000",
    percentUsed: 42,
    dates: "2025-03-01 to 2026-03-01",
  },
  {
    id: "3",
    name: "Meridian EHR Migration",
    manager: "Rachel Kim",
    client: "Meridian Health Systems",
    status: "active",
    budget: "$980,000",
    spent: "$810,000",
    remaining: "$170,000",
    percentUsed: 83,
    dates: "2024-09-01 to 2025-12-31",
  },
  {
    id: "4",
    name: "Greenfield Portfolio Support",
    manager: "David Walsh",
    client: "Greenfield Ventures",
    status: "planning",
    budget: "$350,000",
    spent: "—",
    remaining: "$350,000",
    percentUsed: 0,
    dates: "2026-02-01 to 2026-12-31",
  },
  {
    id: "5",
    name: "Apex Data Science Center",
    manager: "Sarah Lin",
    client: "Apex Technologies",
    status: "active",
    budget: "$750,000",
    spent: "$180,000",
    remaining: "$570,000",
    percentUsed: 24,
    dates: "2025-07-01 to 2026-06-30",
  },
];

const spendData = [
  { month: 'Jan', spend: 65000 },
  { month: 'Feb', spend: 85000 },
  { month: 'Mar', spend: 120000 },
  { month: 'Apr', spend: 190000 },
  { month: 'May', spend: 240000 },
  { month: 'Jun', spend: 220000 },
];

const resources = [
  { id: 1, name: "Sarah Jenkins", role: "Sr. Platform Engineer", hours: "40 hrs/wk", rate: "$185/hr" },
  { id: 2, name: "Marcus Torres", role: "DevOps Specialist", hours: "40 hrs/wk", rate: "$165/hr" },
  { id: 3, name: "Elena Rostova", role: "Cloud Architect", hours: "20 hrs/wk", rate: "$225/hr" },
  { id: 4, name: "James Wilson", role: "QA Automation", hours: "30 hrs/wk", rate: "$135/hr" },
];

const milestones = [
  { id: 1, name: "Phase 1: Infrastructure Setup", status: "completed", date: "Feb 28, 2025" },
  { id: 2, name: "Phase 2: Core Platform Services", status: "in-progress", date: "Apr 30, 2025" },
  { id: 3, name: "Phase 3: Developer Portal", status: "upcoming", date: "Jul 15, 2025" },
  { id: 4, name: "Phase 4: Migration & Go-Live", status: "upcoming", date: "Oct 31, 2025" },
];

const timeline = [
  { id: 1, title: "Change Order #2 Approved", description: "Added 1 QA Engineer for Phase 2", date: "Mar 12, 2025", type: "document" },
  { id: 2, title: "Milestone Reached", description: "Phase 1: Infrastructure Setup completed ahead of schedule", date: "Feb 25, 2025", type: "success" },
  { id: 3, title: "Project Kickoff", description: "Initial stakeholder meeting and resource onboarding", date: "Jan 15, 2025", type: "meeting" },
];

function getProgressColor(percent: number) {
  if (percent === 0) return "bg-gray-200";
  if (percent >= 80) return "bg-red-500";
  if (percent >= 60) return "bg-yellow-500";
  return "bg-green-500";
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border-0">Active</Badge>;
    case "planning":
      return <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-0">Planning</Badge>;
    case "completed":
      return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0">Completed</Badge>;
    default:
      return null;
  }
}

export function Projects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openDrawer = (project: Project, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // clear after animation
  };

  const DrawerActions = (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-2">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0">
          Edit Project
        </Button>
        <Button variant="outline">Add Resource</Button>
        <Button variant="outline">Create Change Order</Button>
        <Button variant="outline">View SOW</Button>
      </div>
      <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
        <Trash2 className="w-4 h-4 mr-2" /> Delete
      </Button>
    </div>
  );

  return (
    <AppLayout activePage="projects">
      <div className="flex-1 space-y-6 p-8 pt-6 bg-gray-50/30 min-h-full">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Projects</h2>
            <p className="text-sm text-gray-500 mt-1">5 total projects</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-sm transition-colors">
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              className="pl-9 bg-white border-gray-200 shadow-sm focus-visible:ring-orange-500 h-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white border-gray-200 text-gray-700 shadow-sm h-10 px-4 font-normal">
                {statusFilter} <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => setStatusFilter("All Statuses")}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Planning")}>Planning</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-gray-200">
                <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider h-11 px-6">PROJECT</TableHead>
                <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider h-11 px-6">CLIENT</TableHead>
                <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider h-11 px-6">STATUS</TableHead>
                <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider h-11 px-6">BUDGET</TableHead>
                <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider h-11 px-6">SPENT</TableHead>
                <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider h-11 px-6 w-[220px]">REMAINING</TableHead>
                <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider h-11 px-6">DATES</TableHead>
                <TableHead className="text-right font-medium text-xs text-gray-500 uppercase tracking-wider h-11 px-6">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsData.map((project) => (
                <TableRow 
                  key={project.id} 
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0 group cursor-pointer"
                  onClick={() => openDrawer(project)}
                >
                  <TableCell className="px-6 py-4 align-top">
                    <div className="font-medium text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{project.manager}</div>
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top text-gray-700 text-sm">
                    {project.client}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    {getStatusBadge(project.status)}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top text-gray-700 text-sm">
                    {project.budget}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top text-gray-700 text-sm">
                    {project.spent}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top">
                    <div className="flex flex-col space-y-2">
                      <span className="text-gray-900 text-sm font-medium">{project.remaining}</span>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getProgressColor(project.percentUsed)}`}
                          style={{ width: `${project.percentUsed}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top text-gray-500 text-sm tabular-nums">
                    {project.dates}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-top text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900" onClick={(e) => openDrawer(project, e)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900" onClick={(e) => openDrawer(project, e)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openDrawer(project); }}>
                            <Eye className="w-4 h-4 mr-2" /> View Project
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openDrawer(project); }}>
                            <Pencil className="w-4 h-4 mr-2" /> Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="w-4 h-4 mr-2" /> Clone
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <FileText className="w-4 h-4 mr-2" /> Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
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

      <DrawerPanel
        open={drawerOpen}
        onClose={closeDrawer}
        title={selectedProject ? selectedProject.name : "Project Details"}
        subtitle={selectedProject ? `Client: ${selectedProject.client}` : ""}
        actions={DrawerActions}
      >
        {selectedProject && (
          <div className="space-y-8 pb-10">
            {/* Section 1: Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-gray-500 font-medium">{selectedProject.client}</span>
                  {getStatusBadge(selectedProject.status)}
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  {selectedProject.manager.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Project Manager</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedProject.manager}</p>
                </div>
              </div>
            </div>

            {/* Section 2: Budget Overview */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" /> Budget Overview
              </h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="shadow-sm border-gray-100">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Budget</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="text-2xl font-bold text-gray-900">{selectedProject.budget}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-100">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="text-2xl font-bold text-gray-900">{selectedProject.spent}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-100">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="text-2xl font-bold text-gray-900">{selectedProject.remaining}</div>
                    <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getProgressColor(selectedProject.percentUsed)}`}
                        style={{ width: `${selectedProject.percentUsed}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="h-64 w-full border border-gray-100 rounded-xl p-4 bg-white shadow-sm">
                <p className="text-sm font-medium text-gray-500 mb-4">Monthly Spend</p>
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={spendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="spend" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Section 3: Resources */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" /> Resources Assigned
              </h4>
              <div className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="font-medium text-xs text-gray-500 h-9">NAME</TableHead>
                      <TableHead className="font-medium text-xs text-gray-500 h-9">ROLE</TableHead>
                      <TableHead className="font-medium text-xs text-gray-500 h-9">ALLOCATION</TableHead>
                      <TableHead className="font-medium text-xs text-gray-500 h-9 text-right">RATE</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((res) => (
                      <TableRow key={res.id}>
                        <TableCell className="font-medium text-sm text-gray-900 py-3">{res.name}</TableCell>
                        <TableCell className="text-sm text-gray-500 py-3">{res.role}</TableCell>
                        <TableCell className="text-sm text-gray-500 py-3">{res.hours}</TableCell>
                        <TableCell className="text-sm text-gray-500 py-3 text-right">{res.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Section 4: Milestones */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gray-400" /> Milestones
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="border border-gray-100 p-4 rounded-xl shadow-sm bg-white flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{milestone.name}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {milestone.date}
                      </p>
                    </div>
                    {milestone.status === "completed" && <Badge className="bg-green-50 text-green-700 border-0">Completed</Badge>}
                    {milestone.status === "in-progress" && <Badge className="bg-blue-50 text-blue-700 border-0">In Progress</Badge>}
                    {milestone.status === "upcoming" && <Badge className="bg-gray-50 text-gray-600 border-0">Upcoming</Badge>}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: SOW Details */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" /> SOW Details
              </h4>
              <div className="border border-gray-100 p-5 rounded-xl shadow-sm bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">SOW-2025-001</p>
                    <p className="text-sm text-gray-500 mt-0.5">Signed on Jan 10, 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Document <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>

            {/* Section 6: Activity Timeline */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" /> Activity Timeline
              </h4>
              <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm">
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <div key={item.id} className="relative pl-6">
                      {i !== timeline.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-gray-200" />
                      )}
                      <div className={`absolute left-0 top-1.5 h-6 w-6 rounded-full flex items-center justify-center ${
                        item.type === 'document' ? 'bg-blue-100 text-blue-600' :
                        item.type === 'success' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {item.type === 'document' ? <FileText className="w-3 h-3" /> :
                         item.type === 'success' ? <CheckCircle2 className="w-3 h-3" /> :
                         <PlayCircle className="w-3 h-3" />}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
