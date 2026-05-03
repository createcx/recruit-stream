import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Building2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Briefcase,
  Users,
  FileText,
  Clock,
  Trash2,
  ChevronDown,
  Plus
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

interface Client {
  id: string;
  name: string;
  industry: string;
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  activeProjects: number;
  activePlacements: number;
  totalRevenue: number;
  contractType: string;
  status: "active" | "prospect" | "churned";
  contacts: number;
  contractDetails: {
    msaSigned: string;
    renewalDate: string;
    feeSchedule: string;
  };
  timeline: {
    date: string;
    event: string;
    user: string;
  }[];
}

const clientsData: Client[] = [
  {
    id: "CL-001",
    name: "Acme Technologies",
    industry: "Software",
    primaryContact: { name: "John Smith", title: "VP Engineering", email: "john@acme.com", phone: "(555) 123-4567" },
    activeProjects: 2,
    activePlacements: 2,
    totalRevenue: 39125,
    contractType: "MSA",
    status: "active",
    contacts: 4,
    contractDetails: {
      msaSigned: "2024-01-15",
      renewalDate: "2025-01-15",
      feeSchedule: "15% perm / $85/hr contract"
    },
    timeline: [
      { date: "Oct 15, 2024", event: "Signed new SOW for Frontend Engineer role", user: "Sarah Jenkins" },
      { date: "Sep 28, 2024", event: "Quarterly business review completed", user: "Michael Chen" },
      { date: "Sep 10, 2024", event: "Placed candidate: Alex Wong (Senior DevOps)", user: "Sarah Jenkins" }
    ]
  },
  {
    id: "CL-002",
    name: "TechCorp Solutions",
    industry: "Consulting",
    primaryContact: { name: "Sarah Lee", title: "Director of HR", email: "slee@techcorp.io", phone: "(555) 987-6543" },
    activeProjects: 1,
    activePlacements: 1,
    totalRevenue: 18125,
    contractType: "SOW",
    status: "active",
    contacts: 2,
    contractDetails: {
      msaSigned: "2023-11-05",
      renewalDate: "2024-11-05",
      feeSchedule: "20% perm only"
    },
    timeline: [
      { date: "Oct 12, 2024", event: "Invoice #INV-2024-089 paid", user: "System" },
      { date: "Sep 15, 2024", event: "Opened new req: Product Manager", user: "David Miller" }
    ]
  },
  {
    id: "CL-003",
    name: "Northbridge Capital",
    industry: "Finance",
    primaryContact: { name: "David Brown", title: "CTO", email: "dbrown@northbridge.com", phone: "(555) 456-7890" },
    activeProjects: 1,
    activePlacements: 0,
    totalRevenue: 0,
    contractType: "MSA",
    status: "prospect",
    contacts: 3,
    contractDetails: {
      msaSigned: "2024-10-01",
      renewalDate: "2025-10-01",
      feeSchedule: "18% perm / $95/hr contract"
    },
    timeline: [
      { date: "Oct 05, 2024", event: "MSA signed and executed", user: "Amanda Cole" },
      { date: "Oct 01, 2024", event: "Legal review completed", user: "Amanda Cole" },
      { date: "Sep 20, 2024", event: "Initial discovery call", user: "Amanda Cole" }
    ]
  },
  {
    id: "CL-004",
    name: "Meridian Health Systems",
    industry: "Healthcare",
    primaryContact: { name: "Dr. Amy Foster", title: "Head of Talent", email: "afoster@meridian.org", phone: "(555) 234-5678" },
    activeProjects: 1,
    activePlacements: 0,
    totalRevenue: 0,
    contractType: "T&M",
    status: "active",
    contacts: 5,
    contractDetails: {
      msaSigned: "2024-05-20",
      renewalDate: "2025-05-20",
      feeSchedule: "$110/hr contract only"
    },
    timeline: [
      { date: "Oct 18, 2024", event: "Submitted 3 candidates for Clinical IT Specialist", user: "Michael Chen" },
      { date: "Oct 10, 2024", event: "Role intake meeting completed", user: "Michael Chen" }
    ]
  },
  {
    id: "CL-005",
    name: "Apex Technologies",
    industry: "Software",
    primaryContact: { name: "Mike Chen", title: "VP Engineering", email: "mike.c@apextech.co", phone: "(555) 345-6789" },
    activeProjects: 2,
    activePlacements: 0,
    totalRevenue: 0,
    contractType: "MSA",
    status: "prospect",
    contacts: 2,
    contractDetails: {
      msaSigned: "Pending",
      renewalDate: "N/A",
      feeSchedule: "Negotiating (target 20%)"
    },
    timeline: [
      { date: "Oct 20, 2024", event: "Follow-up email sent regarding redlines", user: "Sarah Jenkins" },
      { date: "Oct 14, 2024", event: "Sent MSA for review", user: "Sarah Jenkins" }
    ]
  }
];

export function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleRowClick = (client: Client) => {
    setSelectedClient(client);
    setDrawerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "prospect": return "bg-blue-100 text-blue-800 border-blue-200";
      case "churned": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <AppLayout activePage="clients">
      <div className="flex-1 overflow-auto bg-gray-50/50">
        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
              <p className="text-sm text-muted-foreground">Manage your active staffing agreements and company relationships.</p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>

          <Card>
            <div className="p-4 border-b flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="w-4 h-4 mr-2" />
                  Status
                  <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                </Button>
                <Button variant="outline" size="sm" className="h-9">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Industry
                  <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead className="text-center">Active Projects</TableHead>
                  <TableHead className="text-center">Placements</TableHead>
                  <TableHead className="text-right">Total Revenue</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientsData.map((client) => (
                  <TableRow 
                    key={client.id}
                    className="cursor-pointer hover:bg-gray-50/50"
                    onClick={() => handleRowClick(client)}
                  >
                    <TableCell>
                      <div className="font-medium text-gray-900">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.industry}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{client.primaryContact.name}</div>
                      <div className="text-xs text-muted-foreground">{client.primaryContact.title}</div>
                    </TableCell>
                    <TableCell className="text-center text-sm font-medium">
                      {client.activeProjects}
                    </TableCell>
                    <TableCell className="text-center text-sm font-medium">
                      {client.activePlacements}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      ${client.totalRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">{client.contractType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`capitalize font-medium ${getStatusColor(client.status)}`}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-gray-900" onClick={() => handleRowClick(client)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-gray-900">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-gray-900">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleRowClick(client)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Client</DropdownMenuItem>
                            <DropdownMenuItem>Clone</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>

      <DrawerPanel open={drawerOpen} onOpenChange={setDrawerOpen} width="60%">
        {selectedClient && (
          <div className="flex flex-col h-full bg-white">
            {/* Drawer Header */}
            <div className="px-6 py-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                      <Building2 className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">{selectedClient.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-normal">
                          {selectedClient.industry}
                        </Badge>
                        <Badge variant="outline" className={`capitalize font-medium ${getStatusColor(selectedClient.status)}`}>
                          {selectedClient.status}
                        </Badge>
                        <Badge variant="outline" className="font-normal">{selectedClient.contractType}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-8">
                {/* Section 2: Key Metrics */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Key Metrics</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <Card className="shadow-sm border-gray-100">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Active Projects</span>
                          <Briefcase className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="text-2xl font-semibold">{selectedClient.activeProjects}</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm border-gray-100">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Total Revenue</span>
                          <DollarSign className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="text-2xl font-semibold">${selectedClient.totalRevenue.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm border-gray-100">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Placements</span>
                          <Users className="w-4 h-4 text-purple-500" />
                        </div>
                        <div className="text-2xl font-semibold">{selectedClient.activePlacements}</div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm border-gray-100">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Contacts</span>
                          <Mail className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="text-2xl font-semibold">{selectedClient.contacts}</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Grid for Active Projects & Contacts */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Section 3: Active Projects */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Projects</h3>
                      <Button variant="ghost" size="sm" className="h-6 text-xs text-orange-600 hover:text-orange-700">View All</Button>
                    </div>
                    <Card className="shadow-sm border-gray-100">
                      <div className="divide-y divide-gray-100">
                        <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                          <div>
                            <div className="text-sm font-medium text-gray-900">Frontend Engineer</div>
                            <div className="text-xs text-muted-foreground mt-0.5">3 candidates in pipeline</div>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Sourcing</Badge>
                        </div>
                        <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                          <div>
                            <div className="text-sm font-medium text-gray-900">Product Manager</div>
                            <div className="text-xs text-muted-foreground mt-0.5">1 candidate interviewing</div>
                          </div>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Interviewing</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Section 4: Key Contacts */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Key Contacts</h3>
                      <Button variant="ghost" size="sm" className="h-6 text-xs text-orange-600 hover:text-orange-700">Add Contact</Button>
                    </div>
                    <Card className="shadow-sm border-gray-100">
                      <div className="divide-y divide-gray-100">
                        <div className="p-3 flex items-center gap-3 hover:bg-gray-50">
                          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-medium text-xs">
                            {selectedClient.primaryContact.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {selectedClient.primaryContact.name}
                              <Badge variant="secondary" className="ml-2 text-[10px] h-4 px-1 bg-gray-100">Primary</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground truncate">{selectedClient.primaryContact.title}</div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-900"><Mail className="h-3 w-3" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-900"><Phone className="h-3 w-3" /></Button>
                          </div>
                        </div>
                        {selectedClient.contacts > 1 && (
                          <div className="p-3 flex items-center gap-3 hover:bg-gray-50">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-xs">
                              AT
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">Alex Thompson</div>
                              <div className="text-xs text-muted-foreground truncate">Billing Contact</div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-900"><Mail className="h-3 w-3" /></Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-900"><Phone className="h-3 w-3" /></Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Section 5: Contract Info */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Contract Details</h3>
                  </div>
                  <Card className="shadow-sm border-gray-100">
                    <CardContent className="p-5">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5" /> MSA Signed
                          </div>
                          <div className="text-sm font-medium">{selectedClient.contractDetails.msaSigned}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" /> Renewal Date
                          </div>
                          <div className="text-sm font-medium">{selectedClient.contractDetails.renewalDate}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5" /> Fee Schedule
                          </div>
                          <div className="text-sm font-medium">{selectedClient.contractDetails.feeSchedule}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Section 6: Activity Timeline */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Recent Activity</h3>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-orange-600 hover:text-orange-700">Add Note</Button>
                  </div>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {selectedClient.timeline.map((event, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                            <div className="font-bold text-slate-900 text-sm">{event.user}</div>
                            <time className="text-xs font-medium text-orange-600">{event.date}</time>
                          </div>
                          <div className="text-sm text-slate-500">{event.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between mt-auto">
              <div className="flex gap-2">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                  Edit Client
                </Button>
                <Button variant="outline" className="bg-white">
                  Add Project
                </Button>
                <Button variant="outline" className="bg-white">
                  View Contract
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
