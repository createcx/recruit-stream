import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Users, Briefcase, Building2, DollarSign, 
  UserCheck, Send, Trophy, Clock, 
  Eye, Edit2, MoreHorizontal, Calendar, 
  AlignLeft, User, MessageSquare, Tag, 
  CheckCircle, Trash2, Mail, Phone,
  Coffee, Target
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell 
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// --- Sample Data ---

const stats = [
  { label: "Total Candidates", value: "4", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Open Jobs", value: "2", icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "Companies", value: "3", icon: Building2, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Total Revenue", value: "$21,000", icon: DollarSign, color: "text-green-500", bg: "bg-green-50" },
  { label: "Active Candidates", value: "3", icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Submissions Month", value: "4", icon: Send, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Placements Month", value: "1", icon: Trophy, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Avg Days to Place", value: "18d", icon: Clock, color: "text-rose-500", bg: "bg-rose-50" },
];

const placementData = [
  { month: "Jan 2026", placements: 2 },
  { month: "Feb 2026", placements: 4 },
  { month: "Mar 2026", placements: 3 },
  { month: "Apr 2026", placements: 6 },
  { month: "May 2026", placements: 5 },
];

const pipelineData = [
  { stage: "Submitted", count: 1, fill: "#f59e0b" },
  { stage: "Placed", count: 1, fill: "#10b981" },
  { stage: "New", count: 1, fill: "#3b82f6" },
  { stage: "Interviewing", count: 1, fill: "#8b5cf6" },
];

const recentActivities = [
  {
    id: 1,
    type: "Email",
    typeBadge: "bg-blue-100 text-blue-700",
    icon: Mail,
    description: "Sent initial outreach regarding Sr. React Developer role.",
    candidate: "Sarah Connor",
    company: "Cyberdyne Systems",
    date: "Today, 10:30 AM",
    loggedBy: "Alex Mercer",
    notes: "She seemed interested based on her recent LinkedIn post. Will follow up next Tuesday if no response.",
  },
  {
    id: 2,
    type: "Call",
    typeBadge: "bg-purple-100 text-purple-700",
    icon: Phone,
    description: "Screening call completed.",
    candidate: "John Smith",
    company: "Acme Corp",
    date: "Today, 09:15 AM",
    loggedBy: "Alex Mercer",
    notes: "Very strong technical background. Wants $150k base minimum. Moving to technical interview.",
  },
  {
    id: 3,
    type: "Meeting",
    typeBadge: "bg-amber-100 text-amber-700",
    icon: Coffee,
    description: "Coffee chat with hiring manager.",
    candidate: "N/A",
    company: "TechFlow Inc",
    date: "Yesterday, 2:00 PM",
    loggedBy: "Samantha Lee",
    notes: "Discussed Q3 hiring needs. They are looking to expand their design team by 3 headcounts.",
  },
  {
    id: 4,
    type: "Submission",
    typeBadge: "bg-emerald-100 text-emerald-700",
    icon: Send,
    description: "Submitted resume for review.",
    candidate: "Emily Chen",
    company: "Globex Corporation",
    date: "Yesterday, 11:45 AM",
    loggedBy: "Alex Mercer",
    notes: "Submitted via portal. Highlighted her 5 years of React Native experience in the cover note.",
  },
  {
    id: 5,
    type: "Interview",
    typeBadge: "bg-indigo-100 text-indigo-700",
    icon: Users,
    description: "Final round interview scheduled.",
    candidate: "Michael Chang",
    company: "Initech",
    date: "May 10, 3:30 PM",
    loggedBy: "Samantha Lee",
    notes: "Panel interview with CTO and VP of Engineering. Prepped candidate on systems design questions.",
  },
  {
    id: 6,
    type: "Status Change",
    typeBadge: "bg-gray-100 text-gray-700",
    icon: Target,
    description: "Moved to Placed status.",
    candidate: "Jessica Alba",
    company: "Stark Industries",
    date: "May 9, 10:00 AM",
    loggedBy: "Alex Mercer",
    notes: "Offer accepted! Start date is June 1st. Sent placement gift basket.",
  },
];

export function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [drawerMode, setDrawerMode] = useState<"view" | "edit">("view");

  const openDrawer = (activity: any, mode: "view" | "edit" = "view") => {
    setSelectedActivity(activity);
    setDrawerMode(mode);
    setDrawerOpen(true);
  };

  return (
    <AppLayout activePage="dashboard">
      <div className="p-8 max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Here's what's happening today.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Download Report</Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">New Activity</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={i} 
                className="hover:shadow-md transition-shadow cursor-pointer group border-gray-200"
                onClick={() => console.log(`Clicked ${stat.label}`)}
              >
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-xs text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity mt-2 font-medium">
                      View all →
                    </p>
                  </div>
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Placements Trend (12 months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={placementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <RechartsTooltip 
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="placements" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800">Pipeline by Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pipelineData} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }} width={90} />
                    <RechartsTooltip cursor={{ fill: '#f3f4f6' }} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-orange-500 font-medium hover:text-orange-600">View All</Button>
            </div>
          </CardHeader>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group"
              >
                <div 
                  className="flex items-center gap-4 flex-1 cursor-pointer"
                  onClick={() => openDrawer(activity, "view")}
                >
                  <div className={`${activity.typeBadge} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {activity.candidate}</span>
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {activity.company}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {activity.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 pl-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-orange-500" onClick={() => openDrawer(activity, "view")}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-orange-500" onClick={() => openDrawer(activity, "edit")}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => openDrawer(activity, "view")}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDrawer(activity, "edit")}>Edit Activity</DropdownMenuItem>
                      <DropdownMenuItem>Clone</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:bg-red-50">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity Detail Drawer */}
      <DrawerPanel
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerMode === "view" ? "Activity Details" : "Edit Activity"}
        size="lg"
      >
        {selectedActivity && (
          <div className="flex flex-col h-full h-[calc(100vh-80px)]">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Header Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${selectedActivity.typeBadge} w-12 h-12 rounded-full flex items-center justify-center`}>
                    <selectedActivity.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <Badge variant="outline" className={`${selectedActivity.typeBadge} border-transparent mb-1`}>
                      {selectedActivity.type}
                    </Badge>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedActivity.description}</h2>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 flex items-center justify-end gap-1"><Calendar className="h-4 w-4" /> Date</p>
                  <p className="font-medium text-gray-900 mt-0.5">{selectedActivity.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5"><User className="h-4 w-4" /> Related Candidate</p>
                  <p className="text-sm font-semibold text-indigo-600 hover:underline cursor-pointer">{selectedActivity.candidate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Building2 className="h-4 w-4" /> Related Company</p>
                  <p className="text-sm font-semibold text-indigo-600 hover:underline cursor-pointer">{selectedActivity.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Tag className="h-4 w-4" /> Logged By</p>
                  <p className="text-sm font-medium text-gray-900">{selectedActivity.loggedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5"><CheckCircle className="h-4 w-4" /> Status</p>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Completed</Badge>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b pb-2">
                  <AlignLeft className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">Notes & Details</h3>
                </div>
                
                {drawerMode === "edit" ? (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="notes">Activity Notes</Label>
                    <Textarea 
                      id="notes" 
                      defaultValue={selectedActivity.notes}
                      className="min-h-[150px] resize-none focus-visible:ring-orange-500"
                    />
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4 shadow-sm text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedActivity.notes}
                  </div>
                )}
              </div>

              {/* Timeline / Log (Mock) */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Activity Log</h3>
                <div className="relative pl-4 border-l-2 border-gray-100 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-white"></div>
                    <p className="text-sm text-gray-900 font-medium">Activity Created</p>
                    <p className="text-xs text-gray-500">{selectedActivity.date} by {selectedActivity.loggedBy}</p>
                  </div>
                  {drawerMode === "view" && (
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                      <p className="text-sm text-gray-900 font-medium">Marked as Completed</p>
                      <p className="text-xs text-gray-500">{selectedActivity.date} by {selectedActivity.loggedBy}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Footer CTAs */}
            <div className="p-4 border-t bg-gray-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {drawerMode === "view" ? (
                  <Button 
                    onClick={() => setDrawerMode("edit")}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Edit Activity
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setDrawerMode("view")}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Save Changes
                  </Button>
                )}
                
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Follow-up
                </Button>
                
                {drawerMode === "view" && (
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Add Note
                  </Button>
                )}
              </div>
              
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </DrawerPanel>

    </AppLayout>
  );
}
