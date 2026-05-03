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
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Eye,
  Edit2,
  MoreHorizontal,
  Plus,
  FileText,
  Trash2,
  Calendar,
  User,
  Building,
  ArrowRight,
  Clock,
  CheckCircle,
  FileSignature,
} from "lucide-react";

type Status = "draft" | "approved" | "pending" | "rejected";

interface ChangeOrder {
  id: string;
  number: string;
  title: string;
  sow: string;
  client: string;
  status: Status;
  submittedDate: string;
  budgetImpact: number;
}

const mockData: ChangeOrder[] = [
  {
    id: "co-1",
    number: "CO-001",
    title: "Additional DevOps Resources",
    sow: "SOW-2025-001",
    client: "Apex Technologies",
    status: "approved",
    submittedDate: "2025-03-15",
    budgetImpact: 120000,
  },
  {
    id: "co-2",
    number: "CO-002",
    title: "Extended Timeline Q4",
    sow: "SOW-2025-003",
    client: "Meridian Health",
    status: "pending",
    submittedDate: "2025-10-01",
    budgetImpact: 85000,
  },
  {
    id: "co-3",
    number: "CO-003",
    title: "Reduced Scope Phase 2",
    sow: "SOW-2025-002",
    client: "Northbridge Capital",
    status: "approved",
    submittedDate: "2025-06-01",
    budgetImpact: -50000,
  },
  {
    id: "co-4",
    number: "CO-004",
    title: "Additional Analytics Resources",
    sow: "SOW-2025-004",
    client: "Apex Technologies",
    status: "draft",
    submittedDate: "2026-04-15",
    budgetImpact: 95000,
  },
];

const statusStyles = {
  approved: "bg-green-100 text-green-700 hover:bg-green-100",
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  draft: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
};

export function ChangeOrders() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ChangeOrder | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredData = mockData.filter(
    (co) =>
      co.title.toLowerCase().includes(search.toLowerCase()) ||
      co.number.toLowerCase().includes(search.toLowerCase()) ||
      co.client.toLowerCase().includes(search.toLowerCase()) ||
      co.sow.toLowerCase().includes(search.toLowerCase())
  );

  const openDrawer = (co: ChangeOrder, edit = false) => {
    setSelected(co);
    setIsEditMode(edit);
    setDrawerOpen(true);
  };

  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0;
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
    return isNegative ? `-${formatted}` : `+${formatted}`;
  };

  return (
    <AppLayout activePage="change-orders">
      <div className="flex h-full flex-col">
        {/* Page Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Change Orders</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage scope and budget amendments to existing SOWs
            </p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            New Change Order
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-8 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search COs, SOWs, or clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
            <Button variant="outline" className="bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Status
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-8 bg-slate-50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="w-[300px] font-medium text-slate-500">CO & TITLE</TableHead>
                  <TableHead className="font-medium text-slate-500">SOW</TableHead>
                  <TableHead className="font-medium text-slate-500">CLIENT</TableHead>
                  <TableHead className="font-medium text-slate-500">STATUS</TableHead>
                  <TableHead className="font-medium text-slate-500">SUBMITTED</TableHead>
                  <TableHead className="text-right font-medium text-slate-500">BUDGET IMPACT</TableHead>
                  <TableHead className="w-[120px] text-right font-medium text-slate-500">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((co) => (
                  <TableRow 
                    key={co.id} 
                    className="group cursor-pointer hover:bg-slate-50"
                    onClick={() => openDrawer(co)}
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">{co.number}</span>
                        <span className="text-sm text-slate-500">{co.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-slate-600">
                        <FileSignature className="h-4 w-4 mr-2 text-slate-400" />
                        {co.sow}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-slate-600">
                        <Building className="h-4 w-4 mr-2 text-slate-400" />
                        {co.client}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`capitalize ${statusStyles[co.status]}`}>
                        {co.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {co.submittedDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-medium ${co.budgetImpact >= 0 ? "text-green-600" : "text-orange-600"}`}>
                        {formatCurrency(co.budgetImpact)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900" onClick={() => openDrawer(co)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900" onClick={() => openDrawer(co, true)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => openDrawer(co)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openDrawer(co, true)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Clone</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={isEditMode ? "Edit Change Order" : "Change Order Details"}
        >
          {selected && (
            <div className="flex flex-col h-full bg-slate-50">
              <div className="flex-1 overflow-auto p-6 space-y-8">
                
                {/* Section 1 - Header */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{selected.number}</h2>
                      <Badge variant="secondary" className={`capitalize ${statusStyles[selected.status]}`}>
                        {selected.status}
                      </Badge>
                    </div>
                    <p className="text-lg text-slate-600">{selected.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Budget Impact</p>
                    <p className={`text-3xl font-bold ${selected.budgetImpact >= 0 ? "text-green-600" : "text-orange-600"}`}>
                      {formatCurrency(selected.budgetImpact)}
                    </p>
                  </div>
                </div>

                {/* Section 2 - Details */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Properties</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Related SOW</p>
                      <a href="#" className="flex items-center text-sm font-medium text-blue-600 hover:underline">
                        <FileSignature className="h-4 w-4 mr-2" />
                        {selected.sow}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Client</p>
                      <div className="flex items-center text-sm font-medium text-slate-900">
                        <Building className="h-4 w-4 mr-2 text-slate-400" />
                        {selected.client}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Submitted By</p>
                      <div className="flex items-center text-sm text-slate-700">
                        <User className="h-4 w-4 mr-2 text-slate-400" />
                        Sarah Jenkins
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Submitted Date</p>
                      <div className="flex items-center text-sm text-slate-700">
                        <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                        {selected.submittedDate}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Approved By</p>
                      <div className="flex items-center text-sm text-slate-700">
                        <User className="h-4 w-4 mr-2 text-slate-400" />
                        {selected.status === 'approved' ? 'Michael Chen' : '—'}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Approved Date</p>
                      <div className="flex items-center text-sm text-slate-700">
                        <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                        {selected.status === 'approved' ? '2025-03-18' : '—'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3 - Reason */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Reason for Change</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Client requested additional resources to accelerate the deployment phase. This change order provisions two additional senior DevOps engineers for a duration of 3 months to assist with the cloud migration and infrastructure as code implementation. This ensures we meet the revised Q3 launch deadline.
                  </p>
                </div>

                {/* Section 4 - Scope Changes */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Scope Changes</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-red-50/50 p-4 rounded-lg border border-red-100">
                      <h4 className="text-sm font-medium text-red-800 mb-3 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
                        Current Scope
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                        <li>1x DevOps Engineer (6 months)</li>
                        <li>Standard SLA support</li>
                        <li>Single region deployment</li>
                      </ul>
                    </div>
                    <div className="bg-green-50/50 p-4 rounded-lg border border-green-100">
                      <h4 className="text-sm font-medium text-green-800 mb-3 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                        New Scope
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                        <li>3x DevOps Engineers (6 months)</li>
                        <li>24/7 Enhanced SLA support</li>
                        <li>Multi-region active-active deployment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 5 - Approval Trail */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Approval Trail</h3>
                  <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-slate-200">
                    <div className="relative">
                      <span className="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-slate-400" />
                      </span>
                      <p className="text-sm font-medium text-slate-900">Submitted</p>
                      <p className="text-xs text-slate-500 mt-1">Sarah Jenkins • {selected.submittedDate}</p>
                    </div>
                    
                    <div className="relative">
                      <span className={`absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-white border-2 ${selected.status === 'approved' || selected.status === 'rejected' ? 'border-green-500' : 'border-blue-500'} flex items-center justify-center`}>
                        {(selected.status === 'approved' || selected.status === 'rejected') ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <Clock className="w-3 h-3 text-blue-500" />
                        )}
                      </span>
                      <p className="text-sm font-medium text-slate-900">Reviewed by Finance</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {(selected.status === 'approved' || selected.status === 'rejected') 
                          ? 'David Smith • 2025-03-16' 
                          : 'Pending review'}
                      </p>
                    </div>

                    <div className="relative">
                      <span className={`absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-white border-2 ${selected.status === 'approved' ? 'border-green-500' : selected.status === 'rejected' ? 'border-red-500' : 'border-slate-300'} flex items-center justify-center`}>
                        {selected.status === 'approved' && <CheckCircle className="w-3 h-3 text-green-500" />}
                      </span>
                      <p className="text-sm font-medium text-slate-900">Final Approval</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {selected.status === 'approved' 
                          ? 'Michael Chen • 2025-03-18' 
                          : selected.status === 'rejected'
                          ? 'Rejected by Michael Chen'
                          : 'Pending final sign-off'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Drawer Footer / CTAs */}
              <div className="p-6 bg-white border-t border-slate-200 flex items-center justify-between">
                <div className="flex gap-3">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white font-medium">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Change Order
                  </Button>
                  {selected.status === 'draft' && (
                    <Button variant="outline" className="border-slate-300">
                      Submit for Approval
                    </Button>
                  )}
                  <Button variant="outline" className="border-slate-300">
                    <FileText className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  {(selected.status === 'pending' || selected.status === 'draft') && (
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                      Reject
                    </Button>
                  )}
                </div>
                <Button variant="ghost" className="text-slate-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DrawerPanel>
      </div>
    </AppLayout>
  );
}
