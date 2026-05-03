import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListFinancials, useGetFinancial } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, DollarSign, CheckCircle2, Clock, AlertCircle, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";

const formatCurrency = (val?: number) =>
  val != null ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val) : "—";

export default function Financials() {
  const [search, setSearch] = useState("");
  const { data: financials, isLoading } = useListFinancials({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: financial, isLoading: isFinancialLoading } = useGetFinancial(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const openDrawer = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedId(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedId(null), 300);
  };

  const handleDelete = (_id: number) => {
    alert("Delete not yet available for this record type.");
  };

  const getStatusStyle = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "paid") return { color: "bg-green-50 text-green-700 border-green-200", icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    if (s === "overdue") return { color: "bg-red-50 text-red-700 border-red-200", icon: <AlertCircle className="w-3.5 h-3.5" /> };
    return { color: "bg-amber-50 text-amber-700 border-amber-200", icon: <Clock className="w-3.5 h-3.5" /> };
  };

  return (
    <AppLayout activePage="financials">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Financials</h1>
            <p className="text-sm text-slate-500 mt-1">Invoices, payments, and financial records</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Invoice
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search invoices..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{financials?.length || 0} invoices</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Invoice #</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Client</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Type</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">Amount</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Due Date</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7} className="p-4"><Skeleton className="h-10 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : financials?.map(f => {
                  const st = getStatusStyle(f.status);
                  return (
                    <TableRow
                      key={f.id}
                      className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                      onClick={() => openDrawer(f.id)}
                    >
                      <TableCell>
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors font-mono text-sm">{f.invoiceNum}</div>
                      </TableCell>
                      <TableCell className="text-slate-700 font-medium">{f.client}</TableCell>
                      <TableCell className="text-slate-500 text-sm">{f.type}</TableCell>
                      <TableCell className="text-right font-semibold text-slate-900">{formatCurrency(f.amount)}</TableCell>
                      <TableCell className="text-slate-500 text-sm">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                          {f.dueDate || "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`font-medium flex items-center gap-1.5 w-fit ${st.color}`}>
                          {st.icon}{f.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(f.id, e)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(f.id, e)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem onClick={e => openDrawer(f.id, e as any)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(f.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DrawerPanel
        open={drawerOpen}
        onClose={closeDrawer}
        title={financial ? `Invoice ${financial.invoiceNum}` : "Invoice Details"}
        actions={
          financial ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Edit Invoice</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Mark as Paid</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Send Reminder</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => financial && handleDelete(financial.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isFinancialLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : financial && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Invoice Number</div>
                  <h2 className="text-3xl font-bold text-slate-900 font-mono">{financial.invoiceNum}</h2>
                  <span className="text-orange-600 font-medium mt-1 inline-block">{financial.client}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Amount</div>
                  <div className="text-3xl font-bold text-slate-900">{formatCurrency(financial.amount)}</div>
                  <Badge variant="outline" className={`font-medium mt-2 ${getStatusStyle(financial.status).color}`}>
                    {financial.status}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Invoice Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Type</div>
                    <div className="text-sm font-semibold text-slate-900">{financial.type}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">GL Code</div>
                    <div className="text-sm font-semibold text-slate-900 font-mono">{financial.glCode || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Due Date</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                      {financial.dueDate || "—"}
                    </div>
                  </div>
                </div>
              </div>

              {financial.notes && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Notes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{financial.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
