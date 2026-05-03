import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { 
  Search, Plus, Filter, MoreHorizontal, Eye, Edit2, 
  Trash2, FileText, Download, CheckCircle2, Copy, Archive
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

interface SOW {
  id: string;
  number: string;
  title: string;
  client: string;
  project: string;
  status: "draft" | "active" | "expired" | "pending signature";
  startDate: string;
  endDate: string;
  value: number;
  signedDate?: string;
  accountManager?: string;
  deliverables?: string[];
  paymentSchedule?: Array<{
    milestone: string;
    amount: number;
    dueDate: string;
    status: string;
  }>;
  changeOrders?: Array<{
    id: string;
    title: string;
    amount: number;
    date: string;
  }>;
}

const mockSOWs: SOW[] = [
  {
    id: "1",
    number: "SOW-2025-001",
    title: "Engineering Build-Out Phase 1",
    client: "Apex Technologies",
    project: "Apex Platform Engineering",
    status: "active",
    startDate: "2025-01-15",
    endDate: "2026-06-30",
    value: 1850000,
    signedDate: "2025-01-10",
    accountManager: "Sarah Jenkins",
    deliverables: [
      "Hire 15 Senior Backend Engineers (Go/Python)",
      "Hire 5 DevOps/SRE Specialists",
      "Establish engineering team onboarding process",
      "Quarterly technical performance reviews",
    ],
    paymentSchedule: [
      { milestone: "Retainer & Kickoff", amount: 150000, dueDate: "2025-01-15", status: "Paid" },
      { milestone: "First 5 Placements", amount: 250000, dueDate: "2025-03-01", status: "Invoiced" },
      { milestone: "10 Placements", amount: 450000, dueDate: "2025-06-01", status: "Pending" },
    ],
    changeOrders: [
      { id: "CO-001", title: "Add 2 Frontend Roles", amount: 80000, date: "2025-02-15" }
    ]
  },
  {
    id: "2",
    number: "SOW-2025-002",
    title: "Risk Analytics Team",
    client: "Northbridge Capital",
    project: "Northbridge Risk Analytics",
    status: "active",
    startDate: "2025-03-01",
    endDate: "2026-03-01",
    value: 650000,
    signedDate: "2025-02-20",
    accountManager: "Michael Chang",
    deliverables: [
      "Recruit Lead Risk Modeler",
      "Build team of 4 Quantitative Analysts",
      "Executive search for VP of Risk"
    ],
    paymentSchedule: [
      { milestone: "Kickoff", amount: 50000, dueDate: "2025-03-01", status: "Pending" },
      { milestone: "VP Placement", amount: 150000, dueDate: "2025-05-01", status: "Pending" }
    ]
  },
  {
    id: "3",
    number: "SOW-2025-003",
    title: "EHR Migration",
    client: "Meridian Health",
    project: "Meridian EHR Migration",
    status: "active",
    startDate: "2024-09-01",
    endDate: "2025-12-31",
    value: 980000,
    signedDate: "2024-08-15",
    accountManager: "Emily Thorne",
    deliverables: [
      "Provide 10 contract Epic analysts",
      "Onsite training support staff (5)",
      "Post-go-live optimization team"
    ],
    paymentSchedule: [
      { milestone: "Contractor Onboarding", amount: 200000, dueDate: "2024-09-01", status: "Paid" },
      { milestone: "Go-Live Support", amount: 400000, dueDate: "2025-06-01", status: "Pending" }
    ]
  },
  {
    id: "4",
    number: "SOW-2026-001",
    title: "Portfolio Support",
    client: "Greenfield Ventures",
    project: "Greenfield Portfolio",
    status: "pending signature",
    startDate: "2026-02-01",
    endDate: "2026-12-31",
    value: 350000,
    accountManager: "David Kim",
    deliverables: [
      "Executive coaching for 3 portfolio CEOs",
      "Fractional CTO placement services",
      "Board member search"
    ]
  },
  {
    id: "5",
    number: "SOW-2025-004",
    title: "Data Science Center",
    client: "Apex Technologies",
    project: "Apex Data Science",
    status: "active",
    startDate: "2025-07-01",
    endDate: "2026-06-30",
    value: 750000,
    signedDate: "2025-05-10",
    accountManager: "Sarah Jenkins",
    deliverables: [
      "Recruit Chief Data Scientist",
      "Build ML Engineering pod (4 engineers)",
      "Data engineering contractor backfill"
    ]
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateStr));
};

export function SOWs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSOW, setSelectedSOW] = useState<SOW | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filteredSOWs = mockSOWs.filter(sow => 
    sow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sow.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sow.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: SOW['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Draft</Badge>;
      case 'pending signature':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending Signature</Badge>;
      case 'expired':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Expired</Badge>;
    }
  };

  const openDrawer = (sow: SOW, edit: boolean = false) => {
    setSelectedSOW(sow);
    setIsEditing(edit);
    setDrawerOpen(true);
  };

  return (
    <AppLayout activePage="sows">
      <div className="flex flex-col h-full bg-slate-50/50">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Statements of Work</h1>
            <p className="text-sm text-slate-500 mt-1">Manage client contracts, scopes, and payment schedules</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New SOW
          </Button>
        </div>

        <div className="p-6 flex-1 overflow-auto">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search SOWs by number, title, or client..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="text-slate-600">
                  <Filter className="w-4 h-4 mr-2" />
                  Status
                </Button>
                <Button variant="outline" className="text-slate-600">
                  <Filter className="w-4 h-4 mr-2" />
                  Client
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-medium">SOW #</th>
                    <th className="px-4 py-3 font-medium">Title & Project</th>
                    <th className="px-4 py-3 font-medium">Client</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Dates</th>
                    <th className="px-4 py-3 font-medium">Value</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredSOWs.map((sow) => (
                    <tr 
                      key={sow.id} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                      onClick={() => openDrawer(sow)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-900">
                        {sow.number}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{sow.title}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{sow.project}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {sow.client}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getStatusBadge(sow.status)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-600 text-xs">
                        {formatDate(sow.startDate)} - <br/>{formatDate(sow.endDate)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-900">
                        {formatCurrency(sow.value)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-slate-400" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-slate-900" onClick={() => openDrawer(sow)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-slate-900" onClick={() => openDrawer(sow, true)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-slate-900">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem onClick={() => openDrawer(sow)}>
                                <Eye className="w-4 h-4 mr-2" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openDrawer(sow, true)}>
                                <Edit2 className="w-4 h-4 mr-2" /> Edit SOW
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" /> Clone
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Archive className="w-4 h-4 mr-2" /> Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSOWs.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                        No Statements of Work found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DrawerPanel 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={isEditing ? "Edit Statement of Work" : "Statement of Work Details"}
        width="60%"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
            <div className="flex gap-3">
              <Button variant="outline">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Signed
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" /> Create Change Order
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Edit2 className="w-4 h-4 mr-2" /> Edit SOW
              </Button>
            </div>
          </div>
        }
      >
        {selectedSOW && !isEditing && (
          <div className="space-y-8 p-6">
            {/* Section 1 - Header */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-semibold text-slate-900">{selectedSOW.number}</h2>
                  {getStatusBadge(selectedSOW.status)}
                </div>
                <h3 className="text-xl text-slate-700">{selectedSOW.title}</h3>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Total Value</div>
                <div className="text-3xl font-bold text-orange-600">{formatCurrency(selectedSOW.value)}</div>
              </div>
            </div>

            {/* Section 2 - Details */}
            <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <div className="text-sm text-slate-500 mb-1">Client</div>
                <div className="font-medium text-slate-900">{selectedSOW.client}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Project</div>
                <div className="font-medium text-orange-600 hover:underline cursor-pointer">{selectedSOW.project}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Timeline</div>
                <div className="font-medium text-slate-900">{formatDate(selectedSOW.startDate)} – {formatDate(selectedSOW.endDate)}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Signed Date</div>
                <div className="font-medium text-slate-900">{selectedSOW.signedDate ? formatDate(selectedSOW.signedDate) : 'Not signed yet'}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Account Manager</div>
                <div className="font-medium text-slate-900">{selectedSOW.accountManager || 'Unassigned'}</div>
              </div>
            </div>

            {/* Section 3 - Scope of Work */}
            <div>
              <h4 className="text-lg font-medium text-slate-900 mb-3 border-b border-slate-200 pb-2">Scope of Work / Deliverables</h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {selectedSOW.deliverables?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                )) || <li className="text-slate-500 italic">No deliverables specified.</li>}
              </ul>
            </div>

            {/* Section 4 - Payment Schedule */}
            <div>
              <h4 className="text-lg font-medium text-slate-900 mb-3 border-b border-slate-200 pb-2">Payment Schedule</h4>
              {selectedSOW.paymentSchedule && selectedSOW.paymentSchedule.length > 0 ? (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-slate-600">Milestone</th>
                        <th className="px-4 py-2 text-left font-medium text-slate-600">Due Date</th>
                        <th className="px-4 py-2 text-left font-medium text-slate-600">Status</th>
                        <th className="px-4 py-2 text-right font-medium text-slate-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedSOW.paymentSchedule.map((payment, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 text-slate-900">{payment.milestone}</td>
                          <td className="px-4 py-3 text-slate-600">{formatDate(payment.dueDate)}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={
                              payment.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' :
                              payment.status === 'Invoiced' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-slate-50 text-slate-700 border-slate-200'
                            }>
                              {payment.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrency(payment.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 italic">No payment schedule defined.</p>
              )}
            </div>

            {/* Section 5 - Change Orders */}
            <div>
              <h4 className="text-lg font-medium text-slate-900 mb-3 border-b border-slate-200 pb-2">Change Orders</h4>
              {selectedSOW.changeOrders && selectedSOW.changeOrders.length > 0 ? (
                <div className="space-y-3">
                  {selectedSOW.changeOrders.map((co) => (
                    <div key={co.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-slate-300 cursor-pointer">
                      <div>
                        <div className="font-medium text-slate-900">{co.id}: {co.title}</div>
                        <div className="text-sm text-slate-500">Added {formatDate(co.date)}</div>
                      </div>
                      <div className="font-medium text-slate-900">+{formatCurrency(co.amount)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No change orders.</p>
              )}
            </div>

            {/* Section 6 - Document */}
            <div>
              <h4 className="text-lg font-medium text-slate-900 mb-3 border-b border-slate-200 pb-2">Documents</h4>
              <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer w-max">
                <FileText className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-slate-700">{selectedSOW.number}.pdf</span>
                <Download className="w-4 h-4 text-slate-400 ml-4" />
              </div>
            </div>
          </div>
        )}

        {selectedSOW && isEditing && (
          <div className="p-6 text-slate-500 flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-lg m-6">
            <Edit2 className="w-8 h-8 text-slate-300 mb-2" />
            <p>Edit form goes here.</p>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
