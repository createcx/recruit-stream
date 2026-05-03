import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DrawerPanel } from "@/components/layout/DrawerPanel";
import { useListCompanies, useGetCompany, useDeleteCompany } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Search, Plus, Eye, Pencil, MoreHorizontal, Trash2, Building2, MapPin,
  ExternalLink, Phone, Users, Briefcase, DollarSign, Mail, Calendar,
  ArrowUpRight
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Companies() {
  const [search, setSearch] = useState("");
  const { data: companies, isLoading } = useListCompanies({ search });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: company, isLoading: isLoadingCompany } = useGetCompany(selectedId || 0, {
    query: { enabled: !!selectedId }
  });

  const deleteCompany = useDeleteCompany();

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
    if (confirm("Delete this company? This action cannot be undone.")) {
      await deleteCompany.mutateAsync({ id });
      closeDrawer();
    }
  };

  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "active") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (s === "prospect") return "bg-blue-100 text-blue-700 border-blue-200";
    if (s === "inactive") return "bg-slate-100 text-slate-600 border-slate-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  const renderStatusBadge = (status: string) => (
    <Badge variant="outline" className={`font-medium ${getStatusColor(status)}`}>{status}</Badge>
  );

  return (
    <AppLayout activePage="companies">
      <div className="flex flex-col h-full bg-slate-50">
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
                value={search}
                onChange={e => setSearch(e.target.value)}
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
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7} className="p-4"><Skeleton className="h-10 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : companies?.map(c => (
                  <TableRow
                    key={c.id}
                    className="cursor-pointer group hover:bg-slate-50/80 transition-colors"
                    onClick={() => openDrawer(c.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0">
                          <Building2 className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {c.name}
                          </div>
                          {c.phone && (
                            <div className="text-sm text-slate-500 flex items-center mt-0.5">
                              {c.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{c.industry || "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-slate-600">
                        {c.location && <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />}
                        {c.location || "—"}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{c.size || "—"}</TableCell>
                    <TableCell>{renderStatusBadge(c.status)}</TableCell>
                    <TableCell>
                      {c.website ? (
                        <a
                          href={c.website.startsWith('http') ? c.website : `https://${c.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-orange-600 hover:text-orange-700 flex items-center gap-1.5 text-sm font-medium hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Visit
                        </a>
                      ) : (
                        <span className="text-slate-400 text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                          onClick={e => openDrawer(c.id, e)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                          onClick={e => openDrawer(c.id, e)}
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
                            <DropdownMenuItem onClick={e => openDrawer(c.id, e as any)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={e => openDrawer(c.id, e as any)}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit Company
                            </DropdownMenuItem>
                            <DropdownMenuItem>Clone</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(c.id)}>
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
      </div>

      <DrawerPanel
        open={drawerOpen}
        onClose={closeDrawer}
        title={company ? company.name : "Company Details"}
        actions={
          company ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white min-w-[120px]">
                  Edit Company
                </Button>
                <Button variant="outline" className="border-slate-200">Add Job Order</Button>
                <Button variant="outline" className="border-slate-200">Add Contact</Button>
              </div>
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => company && handleDelete(company.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          ) : undefined
        }
      >
        {isLoadingCompany ? (
          <div className="space-y-4 p-2">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        ) : company && (
          <div className="flex flex-col bg-slate-50/50">
            <div className="space-y-6 p-1">

              {/* Company Header Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                      <Building2 className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{company.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        {company.industry && (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-normal">{company.industry}</Badge>
                        )}
                        {renderStatusBadge(company.status)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Website</div>
                    {company.website ? (
                      <a
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-orange-600 hover:underline flex items-center gap-1"
                      >
                        {company.website} <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <div className="text-sm text-slate-400">—</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Phone</div>
                    <div className="text-sm text-slate-900 font-medium">{company.phone || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Size</div>
                    <div className="text-sm text-slate-900 font-medium">{company.size || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Location</div>
                    <div className="text-sm text-slate-900 font-medium">{company.location || "—"}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">

                  {/* Company Overview */}
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
                          {company.size || "—"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Industry</div>
                        <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-400" />
                          {company.industry || "—"}
                        </div>
                      </div>
                      {company.notes && (
                        <div className="col-span-2 pt-4 border-t border-slate-100">
                          <div className="text-sm text-slate-500 mb-2">Notes</div>
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{company.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Open Jobs */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        Open Jobs
                        <Badge variant="secondary" className="ml-2 bg-slate-100 font-normal">0</Badge>
                      </h3>
                      <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 -mr-2">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="text-sm text-slate-500 italic py-4 text-center border border-dashed border-slate-200 rounded-lg">
                      No active job orders.
                    </div>
                  </div>

                  {/* Active Placements */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      Active Placements
                    </h3>
                    <div className="text-sm text-slate-500 italic py-4 text-center border border-dashed border-slate-200 rounded-lg">
                      No active placements.
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Contacts */}
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
                    <div className="text-sm text-slate-500 italic py-4 text-center border border-dashed border-slate-200 rounded-lg">
                      No contacts yet.
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      Recent Activity
                    </h3>
                    <div className="text-sm text-slate-500 italic py-4 text-center border border-dashed border-slate-200 rounded-lg">
                      No recent activity.
                    </div>
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
