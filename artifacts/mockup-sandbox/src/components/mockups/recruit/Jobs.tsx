import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Eye, 
  Pencil, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Briefcase, 
  MapPin, 
  Clock, 
  Building2, 
  Users, 
  CalendarDays,
  Target,
  ArrowRight
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../../ui/dropdown-menu";

const JOBS_DATA = [
  {
    id: "JOB-001",
    title: "Senior React Engineer",
    salary: "$130k - $160k",
    company: "Stripe",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    status: "Active",
    priority: "High",
    openings: 2,
    posted: "2026-04-01",
    deadline: "2026-06-30",
    description: "We are looking for an experienced Senior React Engineer to join our core payments team. You will be responsible for architecting and building highly scalable, complex frontend applications that process millions of transactions daily. The ideal candidate has deep expertise in React performance optimization, state management, and modern testing methodologies.",
    requirements: [
      "5+ years of production experience with React and TypeScript",
      "Deep understanding of React rendering behavior and performance optimization techniques",
      "Experience building complex state management using Context, Zustand, or Redux",
      "Track record of mentoring junior engineers and leading technical architecture discussions",
      "Strong background in testing (Jest, React Testing Library, Cypress/Playwright)"
    ],
    pipeline: {
      new: 1,
      submitted: 0,
      interviewing: 1,
      offer: 0,
      placed: 0
    },
    matches: [
      { id: 1, name: "Sarah Jenkins", title: "Frontend Lead at Square", score: 92, avatar: "/__mockup/images/avatar1.jpg" },
      { id: 2, name: "David Chen", title: "Senior UI Engineer at Plaid", score: 88, avatar: "/__mockup/images/avatar2.jpg" }
    ]
  },
  {
    id: "JOB-002",
    title: "Product Marketing Manager",
    salary: "$110k - $140k",
    company: "Notion",
    location: "New York, NY (Remote)",
    type: "Full-time",
    status: "Active",
    priority: "Medium",
    openings: 1,
    posted: "2026-04-10",
    deadline: "2026-05-30",
    description: "Notion is seeking a Product Marketing Manager to lead our upcoming enterprise product launches. You will work closely with product, sales, and design teams to craft compelling narratives and positioning.",
    requirements: [
      "4+ years of B2B product marketing experience",
      "Excellent written and verbal communication skills",
      "Experience executing go-to-market strategies",
      "Ability to thrive in a fast-paced environment",
      "Data-driven approach to campaign evaluation"
    ],
    pipeline: { new: 3, submitted: 2, interviewing: 0, offer: 0, placed: 0 },
    matches: []
  },
  {
    id: "JOB-003",
    title: "Data Scientist",
    salary: "$140k - $175k",
    company: "Airbnb",
    location: "Seattle, WA",
    type: "Contract",
    status: "On Hold",
    priority: "Low",
    openings: 3,
    posted: "2026-03-15",
    deadline: "2026-07-15",
    description: "Join Airbnb's pricing team to develop sophisticated machine learning models that optimize pricing recommendations for hosts worldwide.",
    requirements: [
      "MS or PhD in quantitative field",
      "Proficiency in Python, SQL, and ML frameworks (PyTorch/TensorFlow)",
      "Experience with dynamic pricing models",
      "Strong analytical and problem-solving skills",
      "Ability to translate business needs into technical solutions"
    ],
    pipeline: { new: 0, submitted: 5, interviewing: 2, offer: 1, placed: 0 },
    matches: []
  }
];

export function Jobs() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS_DATA[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (job: typeof JOBS_DATA[0], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedJob(job);
    setDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "On Hold": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "High": return "bg-red-50 text-red-600 border-red-100";
      case "Medium": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Low": return "bg-gray-50 text-gray-600 border-gray-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
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
              placeholder="Search jobs by title, company, or ID..." 
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 text-slate-600 border-slate-200">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center gap-2 ml-auto text-sm text-slate-500 font-medium">
            <span>Showing {JOBS_DATA.length} jobs</span>
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
                {JOBS_DATA.map((job) => (
                  <tr 
                    key={job.id} 
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => handleOpenDrawer(job)}
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {job.title}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">{job.salary} • {job.type}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-700">{job.company}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {job.location}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </Badge>
                        <Badge variant="outline" className={`font-medium ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">
                        {job.openings}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" onClick={(e) => handleOpenDrawer(job, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={(e) => handleOpenDrawer(job, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={(e) => handleOpenDrawer(job, e)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Job</DropdownMenuItem>
                            <DropdownMenuItem>Clone</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">Delete</DropdownMenuItem>
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
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={selectedJob ? "Job Details" : ""}
        width="w-[60%]"
      >
        {selectedJob && (
          <div className="flex flex-col h-full bg-white">
            {/* Drawer Body - Scrollable */}
            <div className="flex-1 overflow-auto p-8 space-y-10">
              
              {/* Section 1 - Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedJob.title}</h2>
                    <a href="#" className="text-lg font-medium text-orange-600 hover:underline mt-1 inline-block">
                      {selectedJob.company}
                    </a>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-500">Job ID</div>
                    <div className="text-slate-900 font-mono text-sm mt-0.5">{selectedJob.id}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                    <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                    <Briefcase className="w-4 h-4 mr-1.5 text-slate-400" />
                    {selectedJob.type}
                  </span>
                  <Badge variant="outline" className={`font-medium px-2.5 py-1 ${getStatusColor(selectedJob.status)}`}>
                    {selectedJob.status}
                  </Badge>
                  <Badge variant="outline" className={`font-medium px-2.5 py-1 ${getPriorityColor(selectedJob.priority)}`}>
                    {selectedJob.priority}
                  </Badge>
                </div>
              </div>

              {/* Section 2 - Details Grid */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Key Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Salary Range</div>
                    <div className="text-sm font-semibold text-slate-900">{selectedJob.salary}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Openings</div>
                    <div className="text-sm font-semibold text-slate-900">{selectedJob.openings} positions</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Posted Date</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center">
                      <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {selectedJob.posted}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Deadline</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {selectedJob.deadline}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5 - Pipeline Summary */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Pipeline Summary</h3>
                <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4 border border-slate-100">
                  {Object.entries(selectedJob.pipeline).map(([stage, count], index, arr) => (
                    <React.Fragment key={stage}>
                      <div className="text-center flex-1">
                        <div className="text-2xl font-bold text-slate-900">{count}</div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">{stage}</div>
                      </div>
                      {index < arr.length - 1 && (
                        <div className="w-px h-8 bg-slate-200"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Section 3 & 4 - Description & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Description</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {selectedJob.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-3 shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 6 - Matched Candidates */}
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Top Matched Candidates</h3>
                  <Button variant="link" className="text-orange-600 text-sm h-auto p-0 font-medium">
                    View all matches <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
                
                {selectedJob.matches.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedJob.matches.map(candidate => (
                      <div key={candidate.id} className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 bg-white hover:border-orange-200 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                        <Avatar className="h-10 w-10 border border-slate-100">
                          <AvatarFallback className="bg-orange-50 text-orange-700 font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 text-sm group-hover:text-orange-600 transition-colors truncate">{candidate.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5 truncate">{candidate.title}</div>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <div className="flex items-center justify-center bg-green-50 text-green-700 font-bold text-xs px-2 py-1 rounded-md border border-green-100">
                            <Target className="w-3 h-3 mr-1" />
                            {candidate.score}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-100 border-dashed">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 font-medium">No candidates matched yet.</p>
                    <Button variant="link" className="text-orange-600 text-sm h-auto p-0 mt-1">Run AI Matcher</Button>
                  </div>
                )}
              </div>

            </div>

            {/* Drawer Footer CTA */}
            <div className="px-8 py-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between sticky bottom-0 z-10">
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
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
