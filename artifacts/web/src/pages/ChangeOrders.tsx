import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListChangeOrders, useGetChangeOrder } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, TrendingUp, TrendingDown, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

const formatCurrency = (val?: number) =>
  val != null ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val) : "—";

export default function ChangeOrders() {
  const [search, setSearch] = useState("");
  const { data: orders, isLoading } = useListChangeOrders({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: order, isLoading: isOrderLoading } = useGetChangeOrder(selectedId || 0, {
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

  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "approved") return "bg-green-50 text-green-700 border-green-200";
    if (s === "pending" || s === "review") return "bg-amber-50 text-amber-700 border-amber-200";
    if (s === "rejected") return "bg-red-50 text-red-600 border-red-200";
    if (s === "draft") return "bg-slate-100 text-slate-600 border-slate-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <AppLayout activePage="change-orders">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Change Orders</h1>
            <p className="text-sm text-slate-500 mt-1">Track scope and budget changes to SOWs</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Change Order
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search change orders..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{orders?.length || 0} change orders</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Title</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Client</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">SOW</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">Delta Value</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Requested By</TableHead>
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
                ) : orders?.map(o => (
                  <TableRow
                    key={o.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(o.id)}
                  >
                    <TableCell>
                      <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{o.title}</div>
                    </TableCell>
                    <TableCell className="text-slate-600">{o.client}</TableCell>
                    <TableCell className="text-slate-500 text-sm font-mono">{o.sowId ? `SOW-${o.sowId}` : "—"}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-semibold flex items-center justify-end gap-1 ${(o.deltaValue || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {(o.deltaValue || 0) >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {formatCurrency(Math.abs(o.deltaValue || 0))}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{o.requestedBy || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getStatusColor(o.status)}`}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(o.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(o.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={e => openDrawer(o.id, e as any)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Change Order</DropdownMenuItem>
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reject</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(o.id)}>Delete</DropdownMenuItem>
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
      </div>

      <DrawerPanel
        open={drawerOpen}
        onClose={closeDrawer}
        title={order ? order.title : "Change Order Details"}
        actions={
          order ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Edit Change Order</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Approve</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Reject</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => order && handleDelete(order.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isOrderLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : order && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{order.title}</h2>
                  <span className="text-orange-600 font-medium mt-1 inline-block">{order.client}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Delta Value</div>
                  <div className={`text-2xl font-bold ${(order.deltaValue || 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {(order.deltaValue || 0) >= 0 ? "+" : ""}{formatCurrency(order.deltaValue)}
                  </div>
                  <Badge variant="outline" className={`font-medium mt-2 ${getStatusColor(order.status)}`}>{order.status}</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">SOW Reference</div>
                    <div className="text-sm font-semibold text-slate-900 font-mono flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      {order.sowId ? `SOW-${order.sowId}` : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Requested By</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {order.requestedBy || "—"}
                    </div>
                  </div>
                </div>
              </div>

              {order.rationale && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Rationale</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{order.rationale}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
