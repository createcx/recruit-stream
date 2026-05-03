import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Search, 
  Filter, 
  MapPin, 
  Eye, 
  Edit2, 
  MoreVertical, 
  Plus, 
  ChevronDown,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Clock,
  ExternalLink,
  Trash2,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface TimelineEvent {
  id: string;
  type: string;
  description: string;
  date: string;
}

interface Submission {
  id: string;
  jobTitle: string;
  company: string;
  status: string;
  date: string;
}

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  status: "active" | "placed" | "rejected";
  skills: string[];
  salary: string;
  availability: string;
  visa: string;
  linkedIn: string;
  applications: number;
  placements: number;
  submissions: Submission[];
  timeline: TimelineEvent[];
  notes: string;
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.example.com",
    phone: "+1 555-0101",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    status: "active",
    skills: ["React", "Node.js", "TypeScript"],
    salary: "$145,000",
    availability: "Immediately",
    visa: "US Citizen",
    linkedIn: "linkedin.com/in/alicejohnson",
    applications: 3,
    placements: 0,
    submissions: [
      { id: "s1", jobTitle: "Senior Frontend Engineer", company: "TechCorp", status: "Interviewing", date: "May 3, 2024" },
      { id: "s2", jobTitle: "Full Stack Developer", company: "StartupX", status: "Submitted", date: "May 1, 2024" }
    ],
    timeline: [
      { id: "t1", type: "Call", description: "Initial screening call", date: "May 2, 2024" },
      { id: "t2", type: "Email", description: "Sent JD for TechCorp", date: "May 1, 2024" },
      { id: "t3", type: "Review", description: "Profile reviewed", date: "Apr 28, 2024" }
    ],
    notes: "Strong candidate for senior roles. Excellent React skills."
  },
  {
    id: 2,
    name: "Bob Martinez",
    email: "bob.martinez@email.example.com",
    phone: "+1 555-0202",
    title: "Product Manager",
    location: "Los Angeles, CA",
    status: "active",
    skills: ["Product Strategy", "Agile", "Roadmapping"],
    salary: "$135,000",
    availability: "2 Weeks",
    visa: "US Citizen",
    linkedIn: "linkedin.com/in/bobmartinez",
    applications: 1,
    placements: 0,
    submissions: [
      { id: "s3", jobTitle: "Product Lead", company: "Innovate Inc", status: "Rejected", date: "Apr 15, 2024" }
    ],
    timeline: [
      { id: "t4", type: "Review", description: "Resume updated", date: "Apr 20, 2024" }
    ],
    notes: "Great communication. Looking for leadership roles."
  },
  {
    id: 3,
    name: "Carol Thompson",
    email: "carol.thompson@email.example.com",
    phone: "+1 555-0303",
    title: "DevOps Engineer",
    location: "Chicago, IL",
    status: "placed",
    skills: ["Kubernetes", "Docker", "CI/CD"],
    salary: "$155,000",
    availability: "Unavailable",
    visa: "H1B",
    linkedIn: "linkedin.com/in/carolthompson",
    applications: 2,
    placements: 1,
    submissions: [
      { id: "s4", jobTitle: "Site Reliability Engineer", company: "CloudNet", status: "Placed", date: "Mar 10, 2024" }
    ],
    timeline: [
      { id: "t5", type: "Placement", description: "Placed at CloudNet", date: "Mar 10, 2024" }
    ],
    notes: "Excellent infrastructure knowledge."
  },
  {
    id: 4,
    name: "Dave Kim",
    email: "dave.kim@email.example.com",
    phone: "+1 555-0404",
    title: "Data Scientist",
    location: "Austin, TX",
    status: "active",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    salary: "$165,000",
    availability: "4 Weeks",
    visa: "US Citizen",
    linkedIn: "linkedin.com/in/davekim",
    applications: 4,
    placements: 0,
    submissions: [
      { id: "s5", jobTitle: "ML Engineer", company: "AI Solutions", status: "Offer Stage", date: "May 4, 2024" }
    ],
    timeline: [
      { id: "t6", type: "Interview", description: "Final round interview", date: "May 4, 2024" },
      { id: "t7", type: "Interview", description: "Technical screen", date: "Apr 28, 2024" }
    ],
    notes: "Strong math background. Prefers remote work."
  },
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export function Candidates() {
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = (candidate: Candidate) => {
    setSelected(candidate);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const drawerActions = selected ? (
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
      <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 hover:text-red-700">
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
              <p className="text-sm text-slate-500 mt-1">4 total</p>
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
                {candidates.map((candidate) => (
                  <TableRow 
                    key={candidate.id} 
                    className="group hover:bg-slate-50/80 border-slate-100 transition-colors cursor-pointer"
                    onClick={() => openDrawer(candidate)}
                  >
                    <TableCell className="py-4">
                      <div className="font-medium text-slate-900">{candidate.name}</div>
                      <div className="text-sm text-slate-500 mt-0.5">{candidate.email}</div>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">
                      {candidate.title}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {candidate.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      {candidate.status === "active" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 capitalize hover:bg-green-50">
                          {candidate.status}
                        </Badge>
                      ) : candidate.status === "placed" ? (
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 capitalize hover:bg-teal-50">
                          {candidate.status}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 capitalize hover:bg-red-50">
                          {candidate.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[250px]">
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.slice(0, 2).map(skill => (
                          <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 2 && (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-normal text-xs">
                            +{candidate.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {candidate.salary}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" onClick={() => openDrawer(candidate)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" onClick={() => openDrawer(candidate)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openDrawer(candidate)}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDrawer(candidate)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Clone</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700">Delete</DropdownMenuItem>
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
        {selected && (
          <div className="flex flex-col gap-8">
            {/* Section 1 - Profile Header */}
            <div className="flex gap-6 items-start">
              <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-2xl font-bold shrink-0">
                {getInitials(selected.name)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selected.name}</h2>
                    <p className="text-lg text-slate-600 mt-1">{selected.title}</p>
                  </div>
                  <Badge variant="outline" className={`capitalize ${selected.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-teal-50 text-teal-700 border-teal-200'}`}>
                    {selected.status}
                  </Badge>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {selected.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {selected.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {selected.location}
                  </div>
                </div>

                <div className="mt-4 flex gap-4">
                  <div className="bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium uppercase">Applications</div>
                    <div className="text-lg font-semibold text-slate-900">{selected.applications}</div>
                  </div>
                  <div className="bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium uppercase">Placements</div>
                    <div className="text-lg font-semibold text-slate-900">{selected.placements}</div>
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
                    {selected.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-sm font-medium text-slate-500 block">Salary Expectation</span>
                    <span className="text-slate-900">{selected.salary}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500 block">Availability</span>
                    <span className="text-slate-900">{selected.availability}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500 block">Visa Status</span>
                    <span className="text-slate-900">{selected.visa}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500 block">Social</span>
                    <a href={`https://${selected.linkedIn}`} className="text-blue-600 hover:underline flex items-center gap-1 mt-1">
                      {selected.linkedIn}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Section 3 - Submissions */}
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
                    {selected.submissions.length > 0 ? (
                      selected.submissions.map(sub => (
                        <TableRow key={sub.id}>
                          <TableCell className="font-medium text-slate-900">{sub.jobTitle}</TableCell>
                          <TableCell className="text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                              {sub.company}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-slate-600 font-normal">
                              {sub.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-500 text-sm">{sub.date}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-slate-500">
                          No submissions yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Section 4 - Activity Timeline */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-slate-900">Activity Timeline</h3>
              <div className="pl-4 border-l-2 border-slate-200 ml-2 space-y-6 mt-2">
                {selected.timeline.map((event, i) => (
                  <div key={event.id} className="relative">
                    <div className="absolute -left-[25px] mt-1 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-white" />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal text-xs">
                          {event.type}
                        </Badge>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.date}
                        </span>
                      </div>
                      <p className="text-slate-900 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Section 5 - Notes */}
            <div className="flex flex-col gap-4 pb-8">
              <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
              <Textarea 
                className="min-h-[100px] bg-yellow-50/50 border-yellow-200 focus-visible:ring-yellow-400 text-slate-700"
                defaultValue={selected.notes}
                placeholder="Add notes about this candidate..."
              />
            </div>

          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
