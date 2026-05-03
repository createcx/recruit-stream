import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListClients, useGetClient, useDeleteClient } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, TrendingUp, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const formatCurrency = (val?: number) =>
  val != null ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val) : "—";

export default function Clients() {
  const [search, setSearch] = useState("");
  const { data: clients, isLoading } = useListClients({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: client, isLoading: isClientLoading } = useGetClient(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const deleteClient = useDeleteClient();

  const openDrawer = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedId(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedId(null), 300);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this client? This action cannot be undone.")) {
      await deleteClient.mutateAsync({ id });
      closeDrawer();
    }
  };

  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "active") return "bg-green-50 text-green-700 border-green-200";
    if (s === "prospect") return "bg-blue-50 text-blue-700 border-blue-200";
    if (s === "churned") return "bg-red-50 text-red-700 border-red-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <AppLayout activePage="clients">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your client portfolio and relationships</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Client
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search clients..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{clients?.length || 0} clients</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Client Name</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Industry</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Location</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">ARR</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6} className="p-4"><Skeleton className="h-10 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : clients?.map(c => (
                  <TableRow
                    key={c.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(c.id)}
                  >
                    <TableCell>
                      <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{c.name}</div>
                    </TableCell>
                    <TableCell className="text-slate-600">{c.industry || "—"}</TableCell>
                    <TableCell className="text-slate-600">
                      <span className="flex items-center gap-1.5">
                        {c.location && <MapPin className="w-3.5 h-3.5 text-slate-400" />}
                        {c.location || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-900">{formatCurrency(c.arr)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getStatusColor(c.status)}`}>{c.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(c.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(c.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={e => openDrawer(c.id, e as any)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Client</DropdownMenuItem>
                            <DropdownMenuItem>Add Contact</DropdownMenuItem>
                            <DropdownMenuItem>Create Job Order</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(c.id)}>Delete</DropdownMenuItem>
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
        title={client ? client.name : "Client Details"}
        actions={
          client ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Edit Client</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Add Contact</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Create Job Order</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => client && handleDelete(client.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isClientLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : client && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{client.name}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className={`font-medium ${getStatusColor(client.status)}`}>{client.status}</Badge>
                      {client.industry && <span className="text-sm text-slate-500">{client.industry}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">ARR</div>
                    <div className="text-2xl font-bold text-orange-600">{formatCurrency(client.arr)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Industry</div>
                    <div className="text-sm font-semibold text-slate-900">{client.industry || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Location</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {client.location || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Annual Revenue</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                      {formatCurrency(client.arr)}
                    </div>
                  </div>
                </div>
              </div>

              {client.notes && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Notes</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{client.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
