import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { DrawerPanel } from "./_shared/DrawerPanel";
import { Button } from "@/components/ui/button";
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
  MoreHorizontal,
  Plus,
  TrendingUp,
  DollarSign,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Briefcase,
  Users,
  Copy,
  Archive
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Placement {
  id: string;
  candidate: string;
  role: string;
  company: string;
  startDate: string;
  salary: number;
  feeAmount: number;
  type: string;
  status: "active" | "completed";
  feePercent: number;
  invoiceNum: string;
  paymentStatus: "Paid" | "Pending";
  endDate?: string;
  guaranteePeriod: string;
  guaranteePassed: number;
}

const placementsData: Placement[] = [
  {
    id: "pl-1",
    candidate: "Carol Thompson",
    role: "DevOps Lead",
    company: "Acme Technologies",
    startDate: "2025-02-01",
    salary: 140000,
    feeAmount: 21000,
    type: "Contract",
    status: "active",
    feePercent: 15,
    invoiceNum: "INV-2025-001",
    paymentStatus: "Paid",
    endDate: "2026-01-31",
    guaranteePeriod: "90 days",
    guaranteePassed: 100,
  },
  {
    id: "pl-2",
    candidate: "Alice Johnson",
    role: "Senior React Engineer",
    company: "TechCorp Solutions",
    startDate: "2025-05-01",
    salary: 145000,
    feeAmount: 18125,
    type: "Permanent",
    status: "active",
    feePercent: 12.5,
    invoiceNum: "INV-2025-042",
    paymentStatus: "Pending",
    guaranteePeriod: "90 days",
    guaranteePassed: 10,
  },
  {
    id: "pl-3",
    candidate: "Bob Martinez",
    role: "VP Product",
    company: "Global Staffing Inc",
    startDate: "2024-11-15",
    salary: 185000,
    feeAmount: 27750,
    type: "Permanent",
    status: "active",
    feePercent: 15,
    invoiceNum: "INV-2024-118",
    paymentStatus: "Paid",
    guaranteePeriod: "180 days",
    guaranteePassed: 85,
  },
  {
    id: "pl-4",
    candidate: "Dave Kim",
    role: "Data Scientist",
    company: "Acme Technologies",
    startDate: "2024-08-01",
    salary: 165000,
    feeAmount: 20625,
    type: "Contract",
    status: "completed",
    feePercent: 12.5,
    invoiceNum: "INV-2024-085",
    paymentStatus: "Paid",
    endDate: "2025-02-01",
    guaranteePeriod: "90 days",
    guaranteePassed: 100,
  },
];

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

export function Placements() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const openDrawer = (id: string, edit = false) => {
    setSelectedId(id);
    setEditMode(edit);
    setDrawerOpen(true);
  };

  const selected = placementsData.find((p) => p.id === selectedId) || null;

  return (
    <AppLayout activePage="placements">
      <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Placements</h1>
            <p className="text-sm text-slate-500 mt-1">
              Track and manage successful candidate placements and revenue.
            </p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-sm transition-all duration-200 h-10 px-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Placement
          </Button>
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-slate-500">
                Total Revenue
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$87,500</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-slate-500">
                Avg Fee
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$21,875</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-slate-500">
                Active Placements
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">3</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-slate-500">
                Avg Salary
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$158,750</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/80 border-b border-slate-200">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">
                  Candidate
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">
                  Role & Company
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">
                  Start Date
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-4 px-6">
                  Salary
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-4 px-6">
                  Fee
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center py-4 px-6">
                  Type
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center py-4 px-6">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-4 px-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placementsData.map((p) => (
                <TableRow 
                  key={p.id} 
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer border-slate-100"
                  onClick={() => openDrawer(p.id)}
                >
                  <TableCell className="font-medium text-slate-900 px-6 py-4">{p.candidate}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="text-slate-900 font-medium">{p.role}</div>
                    <div className="text-slate-500 text-sm mt-0.5">{p.company}</div>
                  </TableCell>
                  <TableCell className="text-slate-600 px-6 py-4">{p.startDate}</TableCell>
                  <TableCell className="text-right font-medium text-slate-700 px-6 py-4">{formatCurrency(p.salary)}</TableCell>
                  <TableCell className="text-right font-medium text-orange-600 px-6 py-4">
                    {formatCurrency(p.feeAmount)}
                  </TableCell>
                  <TableCell className="text-center text-slate-600 px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {p.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-center px-6 py-4">
                    {p.status === "active" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 font-medium whitespace-nowrap"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 font-medium whitespace-nowrap"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6 py-4">
                    <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDrawer(p.id);
                        }}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDrawer(p.id, true);
                        }}
                        title="Edit Placement"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 z-50">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openDrawer(p.id); }}>
                            <Eye className="mr-2 h-4 w-4 text-slate-500" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openDrawer(p.id, true); }}>
                            <Edit2 className="mr-2 h-4 w-4 text-slate-500" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Copy className="mr-2 h-4 w-4 text-slate-500" />
                            Clone
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Archive className="mr-2 h-4 w-4 text-slate-500" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                            Delete
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
        onClose={() => setDrawerOpen(false)}
        title={editMode ? "Edit Placement" : "Placement Details"}
        actions={
          <div className="flex w-full items-center">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white font-medium mr-3">
              {editMode ? "Save Changes" : "Edit Placement"}
            </Button>
            {!editMode && (
              <>
                <Button variant="outline" className="border-slate-300 text-slate-700 mr-3 font-medium">
                  Generate Invoice
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 font-medium">
                  Mark Guarantee Expired
                </Button>
              </>
            )}
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        }
      >
        {selected && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Section 1: Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{selected.candidate}</h2>
                  {selected.status === "active" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-slate-600 text-lg flex items-center">
                  <span className="font-medium">{selected.role}</span>
                  <span className="mx-2 text-slate-300">&bull;</span>
                  <span className="text-slate-500">{selected.company}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Fee Amount</div>
                <div className="text-3xl font-bold text-orange-600 tracking-tight">{formatCurrency(selected.feeAmount)}</div>
              </div>
            </div>

            {/* Section 2: Financial Details */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                Financial Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/50 p-5 rounded-xl border border-slate-100">
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Salary</div>
                  <div className="font-semibold text-slate-900 text-lg">{formatCurrency(selected.salary)}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Fee %</div>
                  <div className="font-semibold text-slate-900 text-lg">{selected.feePercent}%</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Invoice #</div>
                  <div className="font-semibold text-slate-900 text-sm mt-1">{selected.invoiceNum}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Payment Status</div>
                  <div className="mt-1">
                    {selected.paymentStatus === "Paid" ? (
                      <span className="inline-flex items-center text-sm font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-sm font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Clock className="w-3.5 h-3.5 mr-1" /> Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Placement Details */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                Placement Details
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Start Date</div>
                  <div className="font-medium text-slate-900">{selected.startDate}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Contract Type</div>
                  <div className="font-medium text-slate-900">
                    {selected.type} {selected.type === "Contract" && <span className="text-slate-500 font-normal ml-1">(12 months)</span>}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">End Date</div>
                  <div className="font-medium text-slate-900">{selected.endDate || "—"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Guarantee Period</div>
                  <div className="font-medium text-slate-900">{selected.guaranteePeriod}</div>
                </div>
              </div>
            </div>

            {/* Section 4: Guarantee Tracker */}
            <div>
              <div className="flex items-end justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Guarantee Tracker</h3>
                <span className="text-sm font-semibold text-slate-700">{selected.guaranteePassed}% Passed</span>
              </div>
              <Progress 
                value={selected.guaranteePassed} 
                className="h-3"
                indicatorClassName={selected.guaranteePassed === 100 ? 'bg-green-500' : 'bg-orange-500'}
              />
              <div className="flex justify-between text-xs font-medium text-slate-400 mt-2">
                <span>Start</span>
                <span>{selected.guaranteePeriod}</span>
              </div>
            </div>

            {/* Section 5: Activity Timeline */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5">Activity Timeline</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 md:px-0 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-slate-900">Payment received</div>
                      <time className="text-xs font-medium text-slate-500">Mar 15, 2025</time>
                    </div>
                    <div className="text-sm text-slate-600">Fully paid</div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 md:px-0 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-slate-900">Invoice sent</div>
                      <time className="text-xs font-medium text-slate-500">Feb 10, 2025</time>
                    </div>
                    <div className="text-sm text-slate-600">Net 30</div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-slate-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 absolute left-0 md:left-1/2"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-8 md:ml-0 md:px-0 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-slate-900">Placement confirmed</div>
                      <time className="text-xs font-medium text-slate-500">Jan 20, 2025</time>
                    </div>
                    <div className="text-sm text-slate-600">Offer accepted</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
