import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Eye, Pencil, MoreHorizontal, Calendar, Clock, User, Building2, 
  Briefcase, Trash2, Paperclip, ChevronDown, CheckCircle2, 
  MessageSquare, Phone, Mail, FileText, CalendarDays, Search, Filter, Plus
} from "lucide-react";

// Types
type ActivityType = "Call" | "Email" | "Meeting" | "Interview" | "Placement" | "Note";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  date: string;
  time: string;
  candidate: string;
  company: string;
  job: string;
  description: string;
  duration?: string;
  outcome?: string;
  notes?: string;
}

// Sample Data
const mockActivities: Activity[] = [
  {
    id: "act-01",
    type: "Call",
    title: "Initial screening call",
    date: "Today",
    time: "10:30 AM",
    candidate: "Alice Johnson",
    company: "Acme Technologies",
    job: "Senior React Engineer",
    description: "Discussed background and current role. Candidate is open to new opportunities.",
    duration: "45 minutes",
    outcome: "Positive",
    notes: "Alice was very impressive. Strong React/Node expertise. Recommended for senior role. Following up with technical assessment."
  },
  {
    id: "act-02",
    type: "Email",
    title: "Sent assessment link",
    date: "Today",
    time: "11:15 AM",
    candidate: "Alice Johnson",
    company: "Acme Technologies",
    job: "Senior React Engineer",
    description: "Forwarded HackerRank link for technical screening.",
  },
  {
    id: "act-03",
    type: "Meeting",
    title: "Hiring Manager Sync",
    date: "Today",
    time: "2:00 PM",
    candidate: "David Chen",
    company: "Global Systems Inc",
    job: "VP of Engineering",
    description: "Reviewed feedback from final round interviews.",
    duration: "30 minutes",
    outcome: "Offer Stage",
    notes: "Manager loved David's leadership experience. Proceeding to offer stage."
  },
  {
    id: "act-04",
    type: "Interview",
    title: "Onsite Technical Round",
    date: "Yesterday",
    time: "9:00 AM",
    candidate: "Sarah Williams",
    company: "Innovate AI",
    job: "Machine Learning Engineer",
    description: "4-hour onsite loop with the core ML team.",
    duration: "4 hours",
    outcome: "Pending Feedback",
  },
  {
    id: "act-05",
    type: "Note",
    title: "Left voicemail",
    date: "Yesterday",
    time: "4:45 PM",
    candidate: "Michael Brown",
    company: "TechNova",
    job: "Product Manager",
    description: "Tried to reach out regarding the PM role. Left a VM.",
  },
  {
    id: "act-06",
    type: "Placement",
    title: "Offer Accepted!",
    date: "Yesterday",
    time: "5:30 PM",
    candidate: "Emily Davis",
    company: "CloudScale",
    job: "DevOps Engineer",
    description: "Emily signed the offer letter. Start date set for next month.",
  },
  {
    id: "act-07",
    type: "Email",
    title: "Cold outreach",
    date: "Oct 12, 2023",
    time: "10:00 AM",
    candidate: "James Wilson",
    company: "Unknown",
    job: "Unknown",
    description: "Sent initial outreach email via LinkedIn.",
  },
  {
    id: "act-08",
    type: "Call",
    title: "Salary Negotiation",
    date: "Oct 12, 2023",
    time: "1:30 PM",
    candidate: "Jessica Lee",
    company: "FinTech Solutions",
    job: "Data Scientist",
    description: "Discussed base and equity expectations.",
    duration: "15 minutes",
    outcome: "Counter-offer expected",
  },
  {
    id: "act-09",
    type: "Interview",
    title: "Cultural Fit Interview",
    date: "Oct 11, 2023",
    time: "11:00 AM",
    candidate: "Robert Taylor",
    company: "HealthTech Corp",
    job: "Frontend Developer",
    description: "Met with HR and team lead.",
    duration: "60 minutes",
    outcome: "Positive",
  },
  {
    id: "act-10",
    type: "Meeting",
    title: "Client Intake Sync",
    date: "Oct 11, 2023",
    time: "3:00 PM",
    candidate: "-",
    company: "Nexus Dynamics",
    job: "Multiple Roles",
    description: "Gathered requirements for 3 new open headcounts.",
    duration: "45 minutes",
  },
  {
    id: "act-11",
    type: "Note",
    title: "Updated resume received",
    date: "Oct 10, 2023",
    time: "9:15 AM",
    candidate: "William Martinez",
    company: "CyberSecure",
    job: "Security Analyst",
    description: "William sent over his latest resume with updated certifications.",
  },
  {
    id: "act-12",
    type: "Email",
    title: "Rejection notification",
    date: "Oct 10, 2023",
    time: "4:00 PM",
    candidate: "Amanda Garcia",
    company: "Retail Giant",
    job: "UX Designer",
    description: "Sent standard rejection template after portfolio review.",
  }
];

// Helper to group by date
const groupedActivities = mockActivities.reduce((acc, activity) => {
  if (!acc[activity.date]) {
    acc[activity.date] = [];
  }
  acc[activity.date].push(activity);
  return acc;
}, {} as Record<string, Activity[]>);

const getTypeIcon = (type: ActivityType) => {
  switch (type) {
    case "Call": return <Phone className="h-4 w-4" />;
    case "Email": return <Mail className="h-4 w-4" />;
    case "Meeting": return <CalendarDays className="h-4 w-4" />;
    case "Interview": return <MessageSquare className="h-4 w-4" />;
    case "Placement": return <CheckCircle2 className="h-4 w-4" />;
    case "Note": return <FileText className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getTypeColor = (type: ActivityType) => {
  switch (type) {
    case "Call": return "bg-blue-100 text-blue-700 border-blue-200 ring-blue-500";
    case "Email": return "bg-purple-100 text-purple-700 border-purple-200 ring-purple-500";
    case "Meeting": return "bg-teal-100 text-teal-700 border-teal-200 ring-teal-500";
    case "Interview": return "bg-orange-100 text-orange-700 border-orange-200 ring-orange-500";
    case "Placement": return "bg-emerald-100 text-emerald-700 border-emerald-200 ring-emerald-500";
    case "Note": return "bg-gray-100 text-gray-700 border-gray-200 ring-gray-500";
    default: return "bg-gray-100 text-gray-700 border-gray-200 ring-gray-500";
  }
};

export function Activities() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All Types");

  const handleOpenDrawer = (activity: Activity, edit = false) => {
    setSelectedActivity(activity);
    setEditMode(edit);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setSelectedActivity(null);
      setEditMode(false);
    }, 300);
  };

  return (
    <AppLayout activePage="activities">
      <div className="flex-1 overflow-auto bg-slate-50">
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
              <p className="text-sm text-gray-500 mt-1">12 total activities logged</p>
            </div>
            <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              <Plus className="w-4 h-4" />
              Log Activity
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search activities..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <select 
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white cursor-pointer"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Call</option>
                  <option>Email</option>
                  <option>Meeting</option>
                  <option>Interview</option>
                  <option>Placement</option>
                  <option>Note</option>
                </select>
                <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Last 7 Days</span>
              </button>
            </div>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {Object.entries(groupedActivities).map(([date, activities]) => (
              <div key={date} className="relative z-10">
                <div className="flex items-center justify-start md:justify-center mb-4 sticky top-4 z-20">
                  <span className="bg-white border border-slate-200 shadow-sm px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 uppercase tracking-wider ml-10 md:ml-0">
                    {date}
                  </span>
                </div>

                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="relative flex items-start gap-4 md:gap-6 group cursor-pointer"
                      onClick={() => handleOpenDrawer(activity)}
                    >
                      {/* Timeline Dot */}
                      <div className={`mt-1.5 flex-none w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10 bg-white ${getTypeColor(activity.type).split(' ')[1]} ${getTypeColor(activity.type).split(' ')[0]}`}>
                        {getTypeIcon(activity.type)}
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(activity.type).split(' ').slice(0, 3).join(' ')}`}>
                                {activity.type}
                              </span>
                              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {activity.time}
                              </span>
                            </div>
                            <h3 className="text-base font-semibold text-slate-900 mb-1">{activity.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{activity.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                              {activity.candidate !== "-" && (
                                <div className="flex items-center gap-1.5">
                                  <User className="h-3.5 w-3.5 text-slate-400" />
                                  <span className="font-medium text-slate-700 hover:text-orange-600 hover:underline">{activity.candidate}</span>
                                </div>
                              )}
                              {activity.company !== "Unknown" && (
                                <div className="flex items-center gap-1.5">
                                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                  <span className="font-medium text-slate-700 hover:text-orange-600 hover:underline">{activity.company}</span>
                                </div>
                              )}
                              {activity.job !== "Unknown" && (
                                <div className="flex items-center gap-1.5">
                                  <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                                  <span className="font-medium text-slate-700 hover:text-orange-600 hover:underline">{activity.job}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <button 
                              className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              onClick={() => handleOpenDrawer(activity)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                              onClick={() => handleOpenDrawer(activity, true)}
                              title="Edit Activity"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <div className="relative group/menu">
                              <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                              <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-slate-200 py-1 hidden group-hover/menu:block z-50">
                                <button className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-orange-600">Clone</button>
                                <button className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-orange-600">Archive</button>
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">Delete</button>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={handleCloseDrawer}
          />
          <div className="relative w-full max-w-2xl w-[60%] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {selectedActivity && (
              <>
                <div className="flex-1 overflow-y-auto">
                  {/* Header */}
                  <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border mb-3 ${getTypeColor(selectedActivity.type).split(' ').slice(0, 3).join(' ')}`}>
                          {getTypeIcon(selectedActivity.type)}
                          {selectedActivity.type}
                        </span>
                        {editMode ? (
                          <input 
                            type="text" 
                            defaultValue={selectedActivity.title}
                            className="text-2xl font-bold text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <h2 className="text-2xl font-bold text-slate-900">{selectedActivity.title}</h2>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {selectedActivity.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {selectedActivity.time}
                          </span>
                        </div>
                      </div>
                      <button onClick={handleCloseDrawer} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* Details Section */}
                    <section>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Details</h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Related Candidate</label>
                          {editMode ? (
                            <select className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500">
                              <option>{selectedActivity.candidate}</option>
                              <option>David Chen</option>
                            </select>
                          ) : (
                            <a href="#" className="text-sm font-medium text-orange-600 hover:underline flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {selectedActivity.candidate}
                            </a>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Related Company</label>
                          {editMode ? (
                            <select className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500">
                              <option>{selectedActivity.company}</option>
                              <option>Global Systems Inc</option>
                            </select>
                          ) : (
                            <a href="#" className="text-sm font-medium text-orange-600 hover:underline flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              {selectedActivity.company}
                            </a>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Related Job</label>
                          {editMode ? (
                            <select className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500">
                              <option>{selectedActivity.job}</option>
                              <option>VP of Engineering</option>
                            </select>
                          ) : (
                            <a href="#" className="text-sm font-medium text-orange-600 hover:underline flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              {selectedActivity.job}
                            </a>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Duration</label>
                          {editMode ? (
                            <input type="text" defaultValue={selectedActivity.duration || ""} className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                          ) : (
                            <p className="text-sm text-slate-900">{selectedActivity.duration || "-"}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Outcome</label>
                          {editMode ? (
                            <input type="text" defaultValue={selectedActivity.outcome || ""} className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                          ) : (
                            <p className="text-sm font-medium text-emerald-600 bg-emerald-50 inline-flex px-2 py-0.5 rounded">{selectedActivity.outcome || "-"}</p>
                          )}
                        </div>
                      </div>
                    </section>

                    <div className="h-px bg-slate-200"></div>

                    {/* Notes Section */}
                    <section>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Notes</h3>
                      {editMode ? (
                        <textarea 
                          className="w-full min-h-[120px] text-sm border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3"
                          defaultValue={selectedActivity.notes || selectedActivity.description}
                        />
                      ) : (
                        <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                          {selectedActivity.notes || selectedActivity.description}
                        </div>
                      )}
                    </section>

                    <div className="h-px bg-slate-200"></div>

                    {/* Follow-up Section */}
                    <section>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Follow-up</h3>
                      <div className="flex items-end gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-500 mb-1">Schedule follow-up by</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value="Oct 15, 2023" 
                              readOnly
                              className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 pl-10 bg-slate-50" 
                            />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-500 mb-1">Assigned to</label>
                          <div className="relative">
                            <select className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 appearance-none bg-slate-50">
                              <option>Me (Jane Doe)</option>
                              <option>John Smith</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Attachments Section */}
                    <section>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Attachments</h3>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white hover:border-orange-300 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded text-slate-500 group-hover:text-orange-600 transition-colors">
                              <Paperclip className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">Interview Notes.pdf</p>
                              <p className="text-xs text-slate-500">1.2 MB • Added today</p>
                            </div>
                          </div>
                          <button className="text-sm font-medium text-orange-600 hover:text-orange-700 opacity-0 group-hover:opacity-100 transition-opacity">
                            Download
                          </button>
                        </div>
                        
                        {editMode && (
                          <button className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-slate-300 rounded-lg text-sm font-medium text-slate-500 hover:border-orange-400 hover:text-orange-600 transition-colors">
                            <Paperclip className="h-4 w-4" />
                            Upload Attachment
                          </button>
                        )}
                      </div>
                    </section>

                  </div>
                </div>

                {/* Footer CTAs */}
                <div className="border-t border-slate-200 bg-slate-50 px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm"
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? "Save Changes" : "Edit Activity"}
                    </button>
                    {!editMode && (
                      <>
                        <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                          Schedule Follow-up
                        </button>
                        <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-slate-400" />
                          Mark Complete
                        </button>
                      </>
                    )}
                  </div>
                  <button className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-colors" title="Delete Activity">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
