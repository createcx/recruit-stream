import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListResources, useGetResource } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, User, Briefcase, DollarSign, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Resources() {
  const [search, setSearch] = useState("");
  const { data: resources, isLoading } = useListResources({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: resource, isLoading: isResourceLoading } = useGetResource(selectedId || 0, {
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
    if (s === "active" || s === "available") return "bg-green-50 text-green-700 border-green-200";
    if (s === "busy" || s === "allocated") return "bg-orange-50 text-orange-700 border-orange-200";
    if (s === "inactive") return "bg-slate-100 text-slate-600 border-slate-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  const getUtilizationColor = (pct: number) => {
    if (pct >= 90) return "bg-red-500";
    if (pct >= 70) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <AppLayout activePage="resources">
      <div className="flex flex-col h-full bg-slate-50">
        <header className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resources</h1>
            <p className="text-sm text-slate-500 mt-1">Manage team capacity and resource allocation</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Resource
          </Button>
        </header>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search resources..."
              className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm focus-visible:ring-orange-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">{resources?.length || 0} resources</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Name</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Title</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Project</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Utilization</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-3">Rate</TableHead>
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
                ) : resources?.map(r => (
                  <TableRow
                    key={r.id}
                    className="hover:bg-slate-50/80 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(r.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-semibold text-sm">
                          {r.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{r.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{r.title}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{r.project || "—"}</TableCell>
                    <TableCell className="w-[160px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${getUtilizationColor(r.utilization || 0)}`}
                            style={{ width: `${r.utilization || 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600 w-8 text-right">{r.utilization}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium text-sm">${r.rate}/hr</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium ${getStatusColor(r.status)}`}>{r.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700" onClick={e => openDrawer(r.id, e)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-orange-500" onClick={e => openDrawer(r.id, e)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={e => openDrawer(r.id, e as any)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Resource</DropdownMenuItem>
                            <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                            <DropdownMenuItem>Update Skills</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(r.id)}>Delete</DropdownMenuItem>
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
        title={resource ? resource.name : "Resource Details"}
        actions={
          resource ? (
            <div className="flex w-full items-center gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm font-medium px-6">Edit Resource</Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50">Assign to Project</Button>
              <Button variant="outline" className="border-slate-200 text-slate-500 bg-transparent hover:bg-slate-100">Update Skills</Button>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => resource && handleDelete(resource.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ) : undefined
        }
      >
        {isResourceLoading ? (
          <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40 w-full" /></div>
        ) : resource && (
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-orange-700 font-bold text-2xl">
                  {resource.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{resource.name}</h2>
                  <p className="text-slate-500 mt-1">{resource.title}</p>
                  <Badge variant="outline" className={`font-medium mt-2 ${getStatusColor(resource.status)}`}>{resource.status}</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Allocation</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Current Project</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {resource.project || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">Hourly Rate</div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      ${resource.rate}/hr
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-slate-500 font-medium mb-2">Utilization</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${getUtilizationColor(resource.utilization || 0)}`}
                          style={{ width: `${resource.utilization || 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 w-10">{resource.utilization}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {resource.skills && resource.skills.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.skills.map(s => (
                      <Badge key={s} variant="secondary" className="font-medium">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DrawerPanel>
    </AppLayout>
  );
}
