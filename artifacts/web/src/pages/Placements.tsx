import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal, Plus, TrendingUp, DollarSign, Calendar, Eye, Edit2, Trash2, CheckCircle2, Clock, Briefcase, Users, Copy, Archive
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useListPlacements, useGetPlacement, useDeletePlacement } from "@workspace/api-client-react";

const formatCurrency = (val?: number) => {
  if (!val) return "$0";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
};

export default function Placements() {
  const { data: placements, isLoading } = useListPlacements();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { data: selectedPlacement, isLoading: isPlacementLoading } = useGetPlacement(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const deletePlacement = useDeletePlacement();

  const openDrawer = (id: number, edit = false) => {
    setSelectedId(id);
    setEditMode(edit);
    setDrawerOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this placement?")) {
      await deletePlacement.mutateAsync({ id });
      setDrawerOpen(false);
    }
  };

  // Calculate totals
  const totalRevenue = placements?.reduce((sum, p) => sum + (p.feeAmount || 0), 0) || 0;
  const activeCount = placements?.filter(p => p.status.toLowerCase() === "active").length || 0;
  const avgFee = placements?.length ? totalRevenue / placements.length : 0;
  const totalSalary = placements?.reduce((sum, p) => sum + (p.salary || 0), 0) || 0;
  const avgSalary = placements?.length ? totalSalary / placements.length : 0;

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
              <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-slate-500">Avg Fee</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(avgFee)}</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-slate-500">Active Placements</CardTitle>
              <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{activeCount}</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-slate-500">Avg Salary</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(avgSalary)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/80 border-b border-slate-200">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Candidate</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Role & Company</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Start Date</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-4 px-6">Salary</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-4 px-6">Fee</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center py-4 px-6">Type</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center py-4 px-6">Status</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right py-4 px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={8} className="p-4"><Skeleton className="h-10 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : placements?.map((p) => (
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
                  <TableCell className="text-slate-600 px-6 py-4">{new Date(p.startDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-medium text-slate-700 px-6 py-4">{formatCurrency(p.salary)}</TableCell>
                  <TableCell className="text-right font-medium text-orange-600 px-6 py-4">
                    {formatCurrency(p.feeAmount)}
                  </TableCell>
                  <TableCell className="text-center text-slate-600 px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {p.type || "Permanent"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center px-6 py-4">
                    {p.status.toLowerCase() === "active" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6 py-4">
                    <div className="flex justify-end items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100" onClick={() => openDrawer(p.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100" onClick={() => openDrawer(p.id, true)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 z-50">
                          <DropdownMenuItem onClick={() => openDrawer(p.id)}><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDrawer(p.id, true)}><Edit2 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(p.id)}>
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" /> Delete
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
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => selectedPlacement && handleDelete(selectedPlacement.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        }
      >
        {isPlacementLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : selectedPlacement && (
          <div className="space-y-8 bg-white p-6 border border-slate-100 rounded-lg shadow-sm">
            {/* Section 1: Header */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedPlacement.candidate}</h2>
                  {selectedPlacement.status.toLowerCase() === "active" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">Active</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">Completed</Badge>
                  )}
                </div>
                <p className="text-slate-600 text-lg flex items-center">
                  <span className="font-medium">{selectedPlacement.role}</span>
                  <span className="mx-2 text-slate-300">&bull;</span>
                  <span className="text-slate-500">{selectedPlacement.company}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Fee Amount</div>
                <div className="text-3xl font-bold text-orange-600 tracking-tight">{formatCurrency(selectedPlacement.feeAmount)}</div>
              </div>
            </div>

            {/* Section 2: Financial Details */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-slate-400" /> Financial Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/50 p-5 rounded-xl border border-slate-100">
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Salary</div>
                  <div className="font-semibold text-slate-900 text-lg">{formatCurrency(selectedPlacement.salary)}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Fee %</div>
                  <div className="font-semibold text-slate-900 text-lg">{selectedPlacement.feePercent}%</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Invoice #</div>
                  <div className="font-semibold text-slate-900 text-sm mt-1">{selectedPlacement.invoiceNum || "Pending"}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Payment Status</div>
                  <div className="mt-1">
                    {selectedPlacement.paymentStatus === "Paid" ? (
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
                <Calendar className="w-4 h-4 mr-2 text-slate-400" /> Placement Details
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Start Date</div>
                  <div className="font-medium text-slate-900">{new Date(selectedPlacement.startDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Contract Type</div>
                  <div className="font-medium text-slate-900">{selectedPlacement.type || "Permanent"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">End Date</div>
                  <div className="font-medium text-slate-900">{selectedPlacement.endDate ? new Date(selectedPlacement.endDate).toLocaleDateString() : "—"}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Guarantee Period</div>
                  <div className="font-medium text-slate-900">{selectedPlacement.guaranteePeriod || "90 Days"}</div>
                </div>
              </div>
            </div>

          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
