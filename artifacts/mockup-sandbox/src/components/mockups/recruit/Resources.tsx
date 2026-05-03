import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Eye, 
  Pencil, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Trash2, 
  Download,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  UserCheck,
  Building,
  DollarSign
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const RESOURCES = [
  {
    id: "res-1",
    name: "Rachel Kim",
    title: "Senior PM",
    initials: "RK",
    skills: ["Project Management", "Agile", "Scrum"],
    certifications: ["PMP", "CSM"],
    assignedTo: "Apex Platform Engineering",
    client: "Apex Corp",
    rate: "$125/hr",
    utilization: 100,
    status: "active",
    location: "San Francisco, CA",
    email: "rachel.kim@example.com",
    phone: "+1 (555) 123-4567",
    role: "Lead Project Manager",
    startDate: "Oct 12, 2023",
    hoursPerWeek: 40,
    timeLog: [
      { week: "Oct 16 - Oct 22", hours: 40, status: "Approved" },
      { week: "Oct 9 - Oct 15", hours: 40, status: "Approved" },
      { week: "Oct 2 - Oct 8", hours: 42, status: "Approved" },
      { week: "Sep 25 - Oct 1", hours: 38, status: "Approved" },
    ],
    history: [
      { project: "FinTech App Redesign", client: "Nexus Bank", duration: "Jan 2023 - Sep 2023", role: "Project Manager" },
      { project: "Cloud Migration", client: "TechCorp", duration: "Mar 2022 - Dec 2022", role: "Scrum Master" },
    ]
  },
  {
    id: "res-2",
    name: "David Walsh",
    title: "Business Analyst",
    initials: "DW",
    skills: ["Analysis", "SQL", "Tableau"],
    certifications: ["CBAP"],
    assignedTo: "Northbridge Risk Analytics",
    client: "Northbridge",
    rate: "$95/hr",
    utilization: 80,
    status: "active",
    location: "New York, NY",
    email: "david.w@example.com",
    phone: "+1 (555) 234-5678",
    role: "Senior BA",
    startDate: "Nov 01, 2023",
    hoursPerWeek: 32,
    timeLog: [
      { week: "Oct 16 - Oct 22", hours: 32, status: "Pending" },
      { week: "Oct 9 - Oct 15", hours: 32, status: "Approved" },
      { week: "Oct 2 - Oct 8", hours: 32, status: "Approved" },
      { week: "Sep 25 - Oct 1", hours: 35, status: "Approved" },
    ],
    history: [
      { project: "Data Warehouse Setup", client: "Globex", duration: "Feb 2023 - Oct 2023", role: "Business Analyst" },
    ]
  },
  {
    id: "res-3",
    name: "Sarah Lin",
    title: "Data Engineer",
    initials: "SL",
    skills: ["Python", "Spark", "SQL", "AWS"],
    certifications: ["AWS Data Analytics"],
    assignedTo: "Apex Data Science Center",
    client: "Apex Corp",
    rate: "$110/hr",
    utilization: 60,
    status: "active",
    location: "Austin, TX",
    email: "sarah.lin@example.com",
    phone: "+1 (555) 345-6789",
    role: "Data Engineer",
    startDate: "Aug 15, 2023",
    hoursPerWeek: 24,
    timeLog: [
      { week: "Oct 16 - Oct 22", hours: 24, status: "Approved" },
      { week: "Oct 9 - Oct 15", hours: 20, status: "Approved" },
      { week: "Oct 2 - Oct 8", hours: 24, status: "Approved" },
      { week: "Sep 25 - Oct 1", hours: 28, status: "Approved" },
    ],
    history: [
      { project: "ETL Pipeline Optimization", client: "Initech", duration: "Jan 2022 - Jul 2023", role: "Data Engineer" },
      { project: "Machine Learning Platform", client: "Soylent Corp", duration: "May 2020 - Dec 2021", role: "Junior Data Engineer" },
    ]
  },
  {
    id: "res-4",
    name: "Tom Nguyen",
    title: "Frontend Dev",
    initials: "TN",
    skills: ["React", "TypeScript", "Tailwind"],
    certifications: [],
    assignedTo: "Apex Platform Engineering",
    client: "Apex Corp",
    rate: "$105/hr",
    utilization: 100,
    status: "active",
    location: "Remote (Seattle, WA)",
    email: "tom.n@example.com",
    phone: "+1 (555) 456-7890",
    role: "Senior Frontend Engineer",
    startDate: "Sep 01, 2023",
    hoursPerWeek: 40,
    timeLog: [
      { week: "Oct 16 - Oct 22", hours: 40, status: "Approved" },
      { week: "Oct 9 - Oct 15", hours: 40, status: "Approved" },
      { week: "Oct 2 - Oct 8", hours: 40, status: "Approved" },
      { week: "Sep 25 - Oct 1", hours: 40, status: "Approved" },
    ],
    history: [
      { project: "E-commerce Redesign", client: "Acme Corp", duration: "Mar 2022 - Aug 2023", role: "UI Developer" },
    ]
  },
  {
    id: "res-5",
    name: "Amy Foster",
    title: "QA Lead",
    initials: "AF",
    skills: ["Testing", "Selenium", "Cypress"],
    certifications: ["ISTQB"],
    assignedTo: "Meridian EHR Migration",
    client: "Meridian Health",
    rate: "$90/hr",
    utilization: 90,
    status: "active",
    location: "Chicago, IL",
    email: "amy.foster@example.com",
    phone: "+1 (555) 567-8901",
    role: "QA Automation Lead",
    startDate: "Jul 10, 2023",
    hoursPerWeek: 36,
    timeLog: [
      { week: "Oct 16 - Oct 22", hours: 36, status: "Approved" },
      { week: "Oct 9 - Oct 15", hours: 36, status: "Approved" },
      { week: "Oct 2 - Oct 8", hours: 40, status: "Approved" },
      { week: "Sep 25 - Oct 1", hours: 36, status: "Approved" },
    ],
    history: [
      { project: "Mobile App Testing", client: "Stark Industries", duration: "Nov 2021 - Jun 2023", role: "QA Engineer" },
      { project: "API Test Automation", client: "Wayne Enterprises", duration: "Jan 2020 - Oct 2021", role: "SDET" },
    ]
  },
  {
    id: "res-6",
    name: "Mark Davis",
    title: "DevOps Engineer",
    initials: "MD",
    skills: ["AWS", "Docker", "K8s", "Terraform"],
    certifications: ["AWS DevOps Pro", "CKA"],
    assignedTo: "—",
    client: "—",
    rate: "$115/hr",
    utilization: 0,
    status: "available",
    location: "Denver, CO",
    email: "mark.davis@example.com",
    phone: "+1 (555) 678-9012",
    role: "—",
    startDate: "—",
    hoursPerWeek: 0,
    timeLog: [],
    history: [
      { project: "Infrastructure as Code", client: "Massive Dynamic", duration: "Mar 2022 - Sep 2023", role: "DevOps Engineer" },
      { project: "CI/CD Pipeline Build", client: "Cyberdyne Systems", duration: "Feb 2020 - Feb 2022", role: "Systems Admin" },
    ]
  }
];

export function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<typeof RESOURCES[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const openDrawer = (resource: typeof RESOURCES[0], edit = false) => {
    setSelected(resource);
    setEditMode(edit);
    setDrawerOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Active</Badge>;
      case 'available':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Available</Badge>;
      case 'on-leave':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200">On Leave</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout activePage="resources">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Resources</h2>
            <p className="text-slate-500 mt-1">Manage placed consultants, staff, and their allocations.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="hidden sm:flex">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex flex-1 gap-4 items-center w-full">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search resources, skills..."
                className="pl-9 w-full bg-slate-50 border-slate-200 focus-visible:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10 border-dashed text-slate-600">
                <Filter className="mr-2 h-4 w-4" /> Status
              </Button>
              <Button variant="outline" size="sm" className="h-10 border-dashed text-slate-600">
                <Filter className="mr-2 h-4 w-4" /> Availability
              </Button>
              <Button variant="outline" size="sm" className="h-10 border-dashed text-slate-600">
                <Filter className="mr-2 h-4 w-4" /> Skills
              </Button>
            </div>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            {RESOURCES.length} resources
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Name & Title</th>
                  <th className="px-6 py-4">Skills</th>
                  <th className="px-6 py-4">Assigned To</th>
                  <th className="px-6 py-4">Rate</th>
                  <th className="px-6 py-4 w-48">Availability</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RESOURCES.map((resource) => (
                  <tr 
                    key={resource.id} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    onClick={() => openDrawer(resource)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-slate-200">
                          <AvatarFallback className="bg-orange-100 text-orange-700 text-xs font-medium">
                            {resource.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-slate-900">{resource.name}</div>
                          <div className="text-slate-500 text-xs">{resource.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {resource.skills.slice(0, 2).map(skill => (
                          <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-600 font-normal text-[10px] px-1.5 py-0">
                            {skill}
                          </Badge>
                        ))}
                        {resource.skills.length > 2 && (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal text-[10px] px-1.5 py-0">
                            +{resource.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{resource.assignedTo}</div>
                      <div className="text-xs text-slate-500">{resource.client}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {resource.rate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={resource.utilization} 
                          className="h-2 w-full bg-slate-100" 
                          indicatorClassName={resource.utilization >= 100 ? "bg-orange-500" : resource.utilization > 0 ? "bg-blue-500" : "bg-slate-300"}
                        />
                        <span className="text-xs font-medium text-slate-600 w-9 text-right">{resource.utilization}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(resource.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" onClick={() => openDrawer(resource)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-600" onClick={() => openDrawer(resource, true)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => openDrawer(resource)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDrawer(resource, true)}>Edit Resource</DropdownMenuItem>
                            <DropdownMenuItem>Log Time</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete Resource</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
            <div>Showing 1 to {RESOURCES.length} of {RESOURCES.length} resources</div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Panel */}
      <DrawerPanel 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={editMode ? "Edit Resource" : "Resource Details"}
        width="60%"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline">Log Time</Button>
              <Button variant="outline">Assign to Project</Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                {editMode ? "Save Changes" : "Edit Resource"}
              </Button>
            </div>
          </div>
        }
      >
        {selected && (
          <div className="flex flex-col space-y-8">
            {/* Section 1: Header & Status */}
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16 border-2 border-slate-100 shadow-sm">
                  <AvatarFallback className="bg-orange-100 text-orange-700 text-xl font-bold">
                    {selected.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selected.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-600 font-medium">{selected.title}</span>
                    <span className="text-slate-300">•</span>
                    {getStatusBadge(selected.status)}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {selected.email}</div>
                    <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {selected.phone}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {selected.location}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[120px]">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Utilization</div>
                <div className="relative h-16 w-16">
                  {/* Fake circular gauge */}
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className={selected.utilization >= 100 ? "text-orange-500" : selected.utilization > 0 ? "text-blue-500" : "text-slate-300"}
                      strokeDasharray={`${selected.utilization}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                    <span className="text-sm font-bold text-slate-800">{selected.utilization}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Skills & Certifications */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-slate-400" /> Skills & Qualifications
              </h4>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-4">
                <div>
                  <div className="text-xs text-slate-500 mb-2 font-medium">Core Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-white border border-slate-200 text-slate-700 px-2 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selected.certifications.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-500 mb-2 font-medium">Certifications</div>
                    <div className="flex flex-wrap gap-2">
                      {selected.certifications.map(cert => (
                        <Badge key={cert} variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 px-2 py-1">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Current Assignment */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-400" /> Current Assignment
              </h4>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                {selected.assignedTo !== "—" ? (
                  <>
                    <div className="bg-orange-50 border-b border-orange-100 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-orange-900 text-lg">{selected.assignedTo}</div>
                          <div className="flex items-center gap-1.5 text-orange-700 text-sm mt-1">
                            <Building className="h-3.5 w-3.5" /> {selected.client}
                          </div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100">
                          {selected.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-white p-4 grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">Start Date</div>
                        <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" /> {selected.startDate}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">Allocation</div>
                        <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-slate-400" /> {selected.hoursPerWeek} hrs/week
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1">Bill Rate</div>
                        <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-slate-400" /> {selected.rate}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center bg-slate-50">
                    <Briefcase className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                    <h5 className="font-medium text-slate-700">No active assignment</h5>
                    <p className="text-sm text-slate-500 mt-1">This resource is currently on the bench and available for new projects.</p>
                    <Button variant="outline" className="mt-4 border-dashed bg-white">Assign to Project</Button>
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Time Log */}
            {selected.timeLog.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" /> Time Log (This Month)
                  </h4>
                  <Button variant="link" className="text-orange-600 h-auto p-0 text-sm">View full timesheet</Button>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2 font-medium text-left">Week</th>
                        <th className="px-4 py-2 font-medium text-right">Hours Logged</th>
                        <th className="px-4 py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {selected.timeLog.map((log, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-700">{log.week}</td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-800">{log.hours}h</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={log.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                              {log.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Section 5: Project History */}
            {selected.history.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-slate-400" /> Project History
                </h4>
                <div className="space-y-3">
                  {selected.history.map((hist, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-lg bg-white hover:border-slate-300 transition-colors">
                      <div>
                        <div className="font-semibold text-slate-800">{hist.project}</div>
                        <div className="text-sm text-slate-500 mt-0.5">{hist.client} • {hist.role}</div>
                      </div>
                      <div className="mt-2 sm:mt-0 text-sm font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                        {hist.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
