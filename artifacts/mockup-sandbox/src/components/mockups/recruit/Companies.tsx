import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Eye,
  Pencil,
  MoreHorizontal,
  Building2,
  MapPin,
  ExternalLink,
  Phone,
  Users,
  Briefcase,
  DollarSign,
  Mail,
  Calendar,
  Clock,
  Trash2,
  Plus,
  ArrowUpRight,
  Search
} from "lucide-react";

// Mock Data
const companiesData = [
  {
    id: "comp-01",
    name: "Acme Technologies",
    industry: "Software",
    location: "San Francisco, CA",
    size: "Large (500-1000)",
    status: "Active",
    website: "acme.com",
    phone: "+1 (415) 555-0198",
    founded: "2010",
    revenue: "$50M-100M",
    primaryContact: { name: "John Smith", email: "john@acme.com", title: "VP Engineering" },
    openJobs: [
      { id: "j-01", title: "Senior React Developer", status: "Sourcing" },
      { id: "j-02", title: "Product Manager", status: "Interviewing" },
    ],
    placements: [
      { id: "p-01", name: "Carol Thompson", role: "DevOps Lead", fee: "$21,000", date: "Oct 12, 2023" },
    ],
    contacts: [
      { id: "c-01", name: "John Smith", title: "VP Engineering", email: "john@acme.com" },
      { id: "c-02", name: "Sarah Jenkins", title: "HR Director", email: "sarah.j@acme.com" },
    ],
    timeline: [
      { id: "t-01", action: "Job order created", target: "Senior React Developer", date: "2 days ago", icon: Briefcase },
      { id: "t-02", action: "Note added", target: "Discussed Q4 hiring plans", date: "1 week ago", icon: Mail },
      { id: "t-03", action: "Placement closed", target: "Carol Thompson as DevOps Lead", date: "Oct 12, 2023", icon: DollarSign },
    ]
  },
  {
    id: "comp-02",
    name: "Globex Corporation",
    industry: "Manufacturing",
    location: "Chicago, IL",
    size: "Enterprise (10k+)",
    status: "Prospect",
    website: "globex.com",
    phone: "+1 (312) 555-0122",
    founded: "1985",
    revenue: "$1B+",
    primaryContact: { name: "Michael Chang", email: "m.chang@globex.com", title: "Talent Acquisition" },
    openJobs: [],
    placements: [],
    contacts: [
      { id: "c-03", name: "Michael Chang", title: "Talent Acquisition", email: "m.chang@globex.com" }
    ],
    timeline: [
      { id: "t-04", action: "Intro call completed", target: "Michael Chang", date: "Yesterday", icon: Phone },
    ]
  },
  {
    id: "comp-03",
    name: "Stark Industries",
    industry: "Defense",
    location: "Los Angeles, CA",
    size: "Enterprise (10k+)",
    status: "Inactive",
    website: "stark.com",
    phone: "+1 (213) 555-0199",
    founded: "1939",
    revenue: "$10B+",
    primaryContact: { name: "Virginia Potts", email: "pepper@stark.com", title: "CEO" },
    openJobs: [
      { id: "j-03", title: "AI Research Scientist", status: "Offer Stage" }
    ],
    placements: [
      { id: "p-02", name: "James Rhodes", title: "Security Liaison", fee: "$45,000", date: "Jan 15, 2023" }
    ],
    contacts: [
      { id: "c-04", name: "Virginia Potts", title: "CEO", email: "pepper@stark.com" },
      { id: "c-05", name: "Harold Hogan", title: "Head of Security", email: "happy@stark.com" }
    ],
    timeline: [
      { id: "t-05", action: "Offer extended", target: "AI Research Scientist role", date: "3 hours ago", icon: Clock },
    ]
  }
];

export function Companies() {
  const [selectedCompany, setSelectedCompany] = useState<typeof companiesData[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleRowClick = (company: typeof companiesData[0]) => {
    setSelectedCompany(company);
    setIsEditMode(false);
    setDrawerOpen(true);
  };

  const handleEditClick = (company: typeof companiesData[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCompany(company);
    setIsEditMode(true);
    setDrawerOpen(true);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">Active</Badge>;
      case "Prospect":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">Prospect</Badge>;
      case "Inactive":
        return <Badge variant="secondary" className="text-slate-600 border-slate-200">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout activePage="companies">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2 mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
            <p className="text-muted-foreground mt-1">Manage client organizations and prospects</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-1/2 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="pl-8 bg-white"
            />
          </div>
          <Button variant="outline" className="text-slate-600">
            Filters
          </Button>
        </div>

        <div className="rounded-md border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="w-[300px]">Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Website</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companiesData.map((company) => (
                <TableRow 
                  key={company.id} 
                  className="cursor-pointer group hover:bg-slate-50/80 transition-colors"
                  onClick={() => handleRowClick(company)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0">
                        <Building2 className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {company.name}
                        </div>
                        <div className="text-sm text-slate-500 flex items-center mt-0.5">
                          {company.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{company.industry}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {company.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{company.size}</TableCell>
                  <TableCell>{renderStatusBadge(company.status)}</TableCell>
                  <TableCell>
                    <a 
                      href={`https://${company.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-orange-600 hover:text-orange-700 flex items-center gap-1.5 text-sm font-medium hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Visit
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        onClick={() => handleRowClick(company)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        onClick={(e) => handleEditClick(company, e)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleRowClick(company)}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => handleEditClick(company, e as any)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit Company
                          </DropdownMenuItem>
                          <DropdownMenuItem>Clone</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
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

      {/* Detail Drawer */}
      <DrawerPanel 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={isEditMode ? "Edit Company" : "Company Details"}
      >
        {selectedCompany && (
          <div className="flex flex-col h-full bg-slate-50/50">
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Section 1: Company Header */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                      <Building2 className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{selectedCompany.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-normal">{selectedCompany.industry}</Badge>
                        {renderStatusBadge(selectedCompany.status)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Website</div>
                    <a href={`https://${selectedCompany.website}`} className="text-sm font-medium text-orange-600 hover:underline flex items-center gap-1">
                      {selectedCompany.website} <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Phone</div>
                    <div className="text-sm text-slate-900 font-medium">{selectedCompany.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Founded</div>
                    <div className="text-sm text-slate-900 font-medium">{selectedCompany.founded}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Location</div>
                    <div className="text-sm text-slate-900 font-medium">{selectedCompany.location}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Section 2: Details */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      Company Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Company Size</div>
                        <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          {selectedCompany.size}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Estimated Revenue</div>
                        <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          {selectedCompany.revenue}
                        </div>
                      </div>
                      <div className="col-span-2 pt-4 border-t border-slate-100">
                        <div className="text-sm text-slate-500 mb-2">Primary Contact</div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 font-medium flex items-center justify-center border border-orange-200">
                            {selectedCompany.primaryContact.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{selectedCompany.primaryContact.name}</div>
                            <div className="text-xs text-slate-500">{selectedCompany.primaryContact.title} • {selectedCompany.primaryContact.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Open Jobs */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        Open Jobs
                        <Badge variant="secondary" className="ml-2 bg-slate-100 font-normal">{selectedCompany.openJobs.length}</Badge>
                      </h3>
                      <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 -mr-2">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                    {selectedCompany.openJobs.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCompany.openJobs.map(job => (
                          <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div>
                              <div className="text-sm font-medium text-slate-900 group-hover:text-orange-600 transition-colors">{job.title}</div>
                              <div className="text-xs text-slate-500 mt-0.5">ID: {job.id}</div>
                            </div>
                            <Badge variant="outline" className="bg-white font-normal">{job.status}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 italic py-4 text-center border border-dashed border-slate-200 rounded-lg">No active job orders.</div>
                    )}
                  </div>

                  {/* Section 4: Placements */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      Active Placements
                    </h3>
                    {selectedCompany.placements.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCompany.placements.map(placement => (
                          <div key={placement.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                            <div>
                              <div className="text-sm font-medium text-slate-900">{placement.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{placement.role} • {placement.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-emerald-600">{placement.fee} fee</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500 italic py-4 text-center border border-dashed border-slate-200 rounded-lg">No active placements.</div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Section 5: Contacts */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        Contacts
                      </h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50 -mr-2">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {selectedCompany.contacts.map(contact => (
                        <div key={contact.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 shrink-0">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{contact.name}</div>
                            <div className="text-xs text-slate-500">{contact.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {contact.email}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 6: Timeline */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-6 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      Recent Activity
                    </h3>
                    <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-2">
                      {selectedCompany.timeline.map((event, i) => (
                        <div key={event.id} className="relative pl-6">
                          <div className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                            <event.icon className="w-3 h-3 text-slate-500" />
                          </div>
                          <div className="text-sm font-medium text-slate-900">{event.action}</div>
                          <div className="text-sm text-slate-500 mt-0.5">{event.target}</div>
                          <div className="text-xs text-slate-400 mt-1.5">{event.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTAs */}
            <div className="p-6 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white min-w-[120px]">
                  {isEditMode ? "Save Changes" : "Edit Company"}
                </Button>
                <Button variant="outline" className="border-slate-200">Add Job Order</Button>
                <Button variant="outline" className="border-slate-200">Add Contact</Button>
              </div>
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}